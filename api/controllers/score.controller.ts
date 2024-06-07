import Score from "../models/Score.model";

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
