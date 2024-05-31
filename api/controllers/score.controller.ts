import Score from "../models/Score.model";

export const SaveScoreController = async (req, res, next) => {
  const { userId, type, category, score, difficulty } = req.body;
  console.log({ userId, type, category, score, difficulty });
  try {
    const newScore = new Score({ userId, type, category, score, difficulty });
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
  const { id } = req.params;
  try {
    const scores = await Score.findById(id);
    console.log({ id });
    if (!scores) {
      return res.status(404).json({
        success: false,
        message: "No score found. You haven't taken any test yet",
      });
    }
    console.log({ scores });
  } catch (err) {
    next(err);
  }
};
