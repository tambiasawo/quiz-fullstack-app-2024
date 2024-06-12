import Mark from "../models/Marks.model";

export const SaveMarksController = async (req, res, next) => {
  const { marks, userId, scoreCount, marksId } = req.body;

  try {
    const newMark = new Mark({
      marks,
      userId,
      scoreCount,
      marksId,
    });
    const addedMark = await Mark.create(newMark);
    if (!addedMark) {
      throw new Error(
        "An error occured. Could not save marks. Please try again"
      );
    }
    return res.status(201).json({ success: true, mark: addedMark });
  } catch (err) {
    next(err);
  }
};

export const GetMarksController = async (req, res, next) => {
  try {
    const marks = await Mark.find({ userId: req.params.id });
    if (!marks) {
      return res.status(404).json({
        success: false,
        message: "No score found. You haven't taken any test yet",
        scores: [],
      });
    }
    return res.status(200).json({ success: true, results: marks });
  } catch (err) {
    next(err);
  }
};
