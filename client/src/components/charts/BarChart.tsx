import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ScoreResponseData, useGetScores } from "../../hooks/useScores";
import {
  BarChart as Chart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Skeleton from "@mui/material/Skeleton";

function BarChart() {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const {
    data: { results, success } = { results: [], success: false },
    isFetching,
  }: { data: ScoreResponseData; isFetching: boolean } = useGetScores(userId);
  let count = 2;

  const groupedData = results
    ?.slice()
    .reduce((acc: Array<{ [key: string]: number | string }>, curr) => {
      const { score, questionsCount, category } = curr;
      const itemToInsert = {
        name: category,
        "Attempt 1": `${Math.floor((score / questionsCount) * 100)}`,
      };
      const existingObjIndex = acc.findIndex(
        (item) => item.name === itemToInsert.name
      );
      if (existingObjIndex !== -1) {
        acc[existingObjIndex][`Attempt ${count}`] = Math.floor(
          (score / questionsCount) * 100
        );
        count++;
      } else {
        acc.push(itemToInsert);
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
          <div className="flex flex-col gap-1 pr-4">
            <h1 className="text-center text-sm ">
              Showing Only The Last 3 Attempts Per Category
            </h1>
            <div className="max-w-[750px] overflow-x-auto pb-4">
              <Chart
                width={700}
                height={300}
                data={groupedData}
                margin={{
                  top: 25,
                  right: 30,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar
                  dataKey="Attempt 1"
                  fill="#8884d8"
                  barSize={"2%"}
                  activeBar={<Rectangle fill="#fe9d73" stroke="" />}
                />
                <Bar
                  dataKey="Attempt 2"
                  fill="#82ca9d"
                  barSize={"2%"}
                  activeBar={<Rectangle fill="#fe9d73" stroke="" />}
                />
                <Bar
                  dataKey="Attempt 3"
                  fill="#ffc658"
                  barSize={"2%"}
                  activeBar={<Rectangle fill="#fe9d73" stroke="" />}
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

export default BarChart;
