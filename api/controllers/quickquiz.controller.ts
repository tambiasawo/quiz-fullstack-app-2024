import crypto from "node:crypto";

function getCategory(chosenCategory: string) {
  let category;
  switch (chosenCategory) {
    case "General Knowledge":
      category = "9";
      break;
    case "Entertainment: Music":
      category = "12";
      break;
    case "Entertainment: Movies":
      category = "14";
      break;
    case "Science & Nature":
      category = "17";
      break;
    default:
      category = "";
      break;
  }
  return category;
}
//use arr.slice() to get questionsfrom 0 to 5 for pagination

export const QuickQuizController = async (req, res, next) => {
  const { amount, difficulty, category, type } = req.query;
  let page = 1;
  const REQUEST_URL = `${process.env.BASE_URL}/api.php?amount=${
    amount ? Number(amount) : 5
  }&category=${getCategory(category)}&type=${type || ""}&difficulty=${
    difficulty || ""
  }`;
  console.log({ REQUEST_URL });
  try {
    const response = await fetch(REQUEST_URL);
    const data = await response.json();

    const results = data.results?.map((question) => {
      let randomIndex = Math.floor(
        Math.random() * question.incorrect_answers.length + 1
      );
      let answers = [...question.incorrect_answers];
      answers.splice(randomIndex, 0, question.correct_answer);
      let id = crypto.randomUUID();

      return {
        id,
        question: question.question,
        answers,
        correctAnswer: question.correct_answer,
      };
    });

    switch (data.response_code) {
      case 0:
        return res.status(200).json({
          data: { results, count: results.length, page },
          message: "Successful Request",
          success: true,
        });
      case 1:
        return res.status(404).json({
          message: "No Results: Could not return results.",
          success: false,
          data: { results: [], count: 0 },
        });
      case 2:
        return res.status(400).json({
          message:
            "Invalid Parameter Contains an invalid parameter: Arguements passed in aren't valid",
          success: false,
          data: { results: [], count: 0 },
        });
        //  https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
      case 5:
        return res.status(409).json({
          message:
            "Rate Limit: Too many requests have occurred. Each IP can only access the API once every 5 seconds",
          success: false,
          data: { results: [], count: 0 },
        });
      default:
        break;
    }
  } catch (err) {
    next(err);
  }
};
