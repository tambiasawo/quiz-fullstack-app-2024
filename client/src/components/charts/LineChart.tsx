import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RootState } from "../../store/store";
import { Scores, useGetScores } from "../../hooks/useScores";
import { monthDayDateFormatter } from "../../utils/dateFormatter";
import Skeleton from "@mui/material/Skeleton";

function LineChart() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const {
    data: { results, success } = { results: [], success: false },
    isFetching,
  } = useGetScores(userId);

  const groupedData = results
    ?.slice()
    ?.filter(
      (item: Scores) =>
        item.category === (selectedCategory ? selectedCategory : "Any")
    )
    .reduce((acc: Array<{ name: string; Score: number }>, curr: Scores) => {
      const { createdAt, questionsCount, score } = curr;
      const { formattedDateWithTIme, formattedDate } =
        monthDayDateFormatter(createdAt);

      const existingObjIndex = acc?.findIndex(
        (item) => item.name === formattedDate
      );
      const existingObjIndexWithDate = acc?.findIndex(
        (item) => item.name === formattedDateWithTIme
      );
      if (existingObjIndex !== -1) {
        if (existingObjIndexWithDate === -1) {
          acc.push({
            name: formattedDateWithTIme,
            Score: (score / questionsCount) * 100,
          });
        }
      } else {
        acc.push({
          name: formattedDate,
          Score: (score / questionsCount) * 100,
        });
      }
      return acc;
    }, []);

  if (isFetching)
    return (
      <Skeleton
        variant="rounded"
        width={650}
        height={290}
        animation="wave"
        className="mx-auto"
      />
    );

  return (
    <>
      {success ? (
        <ResponsiveContainer width="100%" height="100%">
          <div className="flex flex-col gap-5 pr-4">
            <select
              className="w-[25%] text-sm rounded-md ml-5 py-1 outline-none text-black mt-[-20px] "
              name="select cat"
              id="cat"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled selected>
                Category
              </option>
              <option value="Science & Nature">Science</option>
              <option value="General Knowledge">Gen. Know.</option>
              <option value="Entertainment: Music">Enter. Music</option>
              <option value="Entertainment: Movies">Enter. Movies</option>
              <option value="Any">Any</option>
            </select>
            <div className="max-w-[750px] overflow-x-auto">
              <Chart
                width={750}
                height={275}
                data={groupedData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="Score"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </Chart>
            </div>
          </div>
        </ResponsiveContainer>
      ) : (
        <p className="text-center mx-auto">
          There was a problem loading the chart{" "}
        </p>
      )}
    </>
  );
}

export default LineChart;
