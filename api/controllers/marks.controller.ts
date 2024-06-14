import Mark from "../models/Marks.model";

export const SaveMarksController = async (req, res, next) => {
  const { marks, marksId } = req.body;

  try {
    const newMark = new Mark({
      marks,
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

export const GetMarkController = async (req, res, next) => {
  try {
    const mark = await Mark.find(
      { marksId: req.params.id },
      {
        marks: 1,
      }
    );
    if (!mark) {
      return res.status(404).json({
        success: false,
        message: "No marks found. You haven't taken any test yet",
        results: [],
      });
    }
    return res.status(200).json({ success: true, results: mark });
  } catch (err) {
    next(err);
  }
};
