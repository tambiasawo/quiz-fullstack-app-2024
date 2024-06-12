import Mark from "../models/Marks.model";

export const SaveMarksController = async (req, res, next) => {
  const { marks, userId, scoreCount } = req.body;

  try {
    const newMark = new Mark({
      marks,
      userId,
      scoreCount,
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
