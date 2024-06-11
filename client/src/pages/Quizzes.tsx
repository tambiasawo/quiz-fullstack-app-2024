import QuizBox from "../components/QuizBox";

const Quizzes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 py-3">
      <QuizBox category="Any" imgUrl="/assets/any.png" />
      <QuizBox
        category="General Knowledge"
        imgUrl="/assets/gen-knowledge.png"
      />
      <QuizBox
        category="Entertainment: Music"
        imgUrl="https://img.freepik.com/free-photo/abstract-watercolor-guitar-exploding-with-colorful-motion-generated-by-ai_188544-19725.jpg"
      />
      <QuizBox
        category="Entertainment: Movies"
        imgUrl="https://img.freepik.com/free-photo/assortment-cinema-elements-red-background-with-copy-space_23-2148457848.jpg"
      />
      <QuizBox category="Science & Nature" imgUrl="/assets/science.png" />
      <QuizBox category="Sports" imgUrl="/assets/sports.png" />
    </div>
  );
};

export default Quizzes;
