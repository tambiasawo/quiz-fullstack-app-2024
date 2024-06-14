import { IoMdCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import { Box, Skeleton } from "@mui/material";
import { Mark } from "../store/features/question/questionSlice";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  color: "black",
  bgcolor: "background.paper",
  borderRadius: "10px",
  /* height: "90%",
  overflowY: "scroll", */
  p: 4,
};

const ScoreBreakdownModal = ({
  open,
  handleClose,
  quizData,
  isFetching,
}: {
  open: boolean;
  handleClose: any;
  quizData: any;
  isFetching: boolean;
}) => {
  if (isFetching) {
    return (
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={"100vh"}
        animation="wave"
      />
    );
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }}>
        <h2 className="text-3xl text-black text-center">Score Breakdown</h2>
        <div className="flex text-xl justify-between items-center gap-5">
          <span> Category: Any </span>
          <span>
            Score: {(quizData.score / quizData.questionCount) * 100}%{" "}
          </span>
        </div>
        <ol className="space-y-4 h-[75vh] overflow-y-auto">
          {quizData.quizMarks?.map((mark: Mark) => {
            return (
              <li key={mark.id}>
                <p style={{ display: "ruby-text", paddingBottom: "7px" }}>
                  Question: {mark.question}
                  {"  "}
                  {mark.answer === mark.correctAnswer ? (
                    <IoMdCheckmark color="green" size={20} />
                  ) : (
                    <IoCloseOutline color="red" size={20} />
                  )}
                </p>
                <p> Your Answer: {mark.answer}</p>
                <p> Correct Answer: {mark.correctAnswer}</p>
              </li>
            );
          })}
        </ol>
      </Box>
    </Modal>
  );
};

export default ScoreBreakdownModal;
