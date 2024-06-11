import Score from "../models/Score.model";

type TopScorers = {
  _id: string;
  category: string;
  questionsCount: number;
  score: number;
  username: string;
};

export const SaveScoreController = async (req, res, next) => {
  const { userId, type, category, score, difficulty, questionsCount } =
    req.body;
  try {
    const newScore = new Score({
      userId,
      type,
      category,
      score,
      difficulty,
      questionsCount,
    });
    const addedScore = await Score.create(newScore);
    if (!addedScore) {
      throw new Error(
        "An error occured. Could not save Score. Please try again"
      );
    }
    return res.status(201).json({ success: true, score: addedScore });
  } catch (err) {
    next(err);
  }
};

export const GetScoresController = async (req, res, next) => {
  try {
    const scores = await Score.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    if (!scores) {
      return res.status(404).json({
        success: false,
        message: "No score found. You haven't taken any test yet",
        scores: [],
      });
    }
    return res.status(200).json({ success: true, results: scores });
  } catch (err) {
    next(err);
  }
};

export const GetTopScoresController = async (req, res, next) => {
  try {
    const scores = await Score.find(
      {},
      { _id: 1, name: 1, score: 1, questionsCount: 1, category: 1 }
    ).populate("userId", "username");

    if (!scores) {
      return res.status(404).json({
        success: false,
        message: "No scores found.",
        scores: [],
      });
    }

    const mappedScorers: TopScorers[] = scores.map((score) => ({
      _id: score._id.toString(),
      score: score.score,
      questionsCount: score.questionsCount,
      category: score.category,
      username: score.userId["username"],
    }));

    const topScorers = mappedScorers.reduce((acc: TopScorers[], userScore) => {
      const { score, category, questionsCount, _id, username } = userScore;
      const existingIndex = acc.findIndex((item) => item.category === category);
      let percentScore = (score / questionsCount) * 100;
      if (existingIndex == -1) {
        acc.push({
          _id,
          score: percentScore,
          questionsCount,
          category,
          username,
        });
      } else {
        const existingScore = acc[existingIndex];
        if (existingScore.score < percentScore) {
          acc[existingIndex].score = percentScore;
        }
      }

      return acc;
    }, []);

    return res.status(200).json({ success: true, results: topScorers });
  } catch (err) {
    next(err);
  }
};
