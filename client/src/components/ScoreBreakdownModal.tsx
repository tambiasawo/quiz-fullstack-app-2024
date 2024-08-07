import { IoMdCheckmark } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import { Box, Skeleton } from "@mui/material";
import { Mark } from "../store/features/question/questionSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  bgcolor: "#37373e",
  borderRadius: "10px",
  p: 4,
};

const ScoreBreakdownModal = ({
  open,
  handleClose,
  quizData,
  marks,
  isFetching,
}: {
  open: boolean;
  handleClose: () => void;
  marks: Mark[];
  quizData: {
    score: number;
    category: string;
    questionCount: number;
  };
  isFetching: boolean;
}) => {
  const percentScore = Math.floor(
    (quizData.score / quizData.questionCount) * 100
  );

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
      <Box
        sx={{ ...style }}
        className="w-[350px] md:w-[700px] h-[650px] md:h-[700px] relative"
      >
        <span className="absolute top-2 right-2 md:hidden">
          <IoIosCloseCircleOutline size={25} onClick={handleClose} />
        </span>
        <h2 className="text-3xl text-[#a6abff] text-center">Score Breakdown</h2>
        <div className="flex text-xl justify-between items-center gap-5">
          <span> Category: Any </span>
          <span
            className={percentScore < 50 ? `text-red-500` : "text-green-500"}
          >
            Score: {percentScore}%{" "}
          </span>
        </div>
        <ol className="space-y-4 h-[75vh] overflow-y-auto">
          {marks?.map((mark: Mark) => {
            return (
              <li key={mark.id} className="pb-3">
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
