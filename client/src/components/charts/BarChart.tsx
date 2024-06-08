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
        "Attempt 1": (score / questionsCount) * 100,
      };
      const existingObjIndex = acc.findIndex(
        (item) => item.name === itemToInsert.name
      );
      if (existingObjIndex !== -1) {
        acc[existingObjIndex][`Attempt ${count}`] =
          (score / questionsCount) * 100;
        count++;
      } else {
        acc.push(itemToInsert);
      }
      return acc;
    }, []);

  console.log({ groupedData });
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
          <Chart
            width={700}
            height={300}
            data={groupedData}
            margin={{
              top: 35,
              right: 30,
              left: 0,
              bottom: 5,
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
              fill="#8884d8"
              barSize={"2%"}
              activeBar={<Rectangle fill="#fe9d73" stroke="" />}
            />
            <Bar
              dataKey="Attempt 3"
              fill="#8884d8"
              barSize={"2%"}
              activeBar={<Rectangle fill="#fe9d73" stroke="" />}
            />
          </Chart>
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
