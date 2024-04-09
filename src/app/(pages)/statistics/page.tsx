/** @format */
"use client";
import ContainerBox from "@/app/components/ContainerBox";
import { PieChart } from "@mui/x-charts/PieChart";
import LineChartComponent from "@/app/components/Statistics/LineChartComponent";

const pieParams = { margin: { right: 5 } };
const StatisticsPage = () => {
  return (
    <div className="flex flex-col wrap h-full w-full">
      <h1>Statistics</h1>
      <div className="flex flex-row wrap h-full w-full">
        <ContainerBox title={"Distribution of Study programs"}>
          <div className="flex flex-row wrap h-full w-full items-center justify-center ">
            <div className="flex flex-row wrap h-full w-full items-center justify-center ">
              <LineChartComponent></LineChartComponent>
            </div>
            <div className="flex flex-row wrap h-full w-full items-center justify-center ">
              <PieChart
                series={[
                  { data: [{ value: 10 }, { value: 15 }, { value: 20 }] },
                ]}
                {...pieParams}
              />
            </div>
          </div>
        </ContainerBox>
      </div>{" "}
      <div className="flex flex-row wrap h-full w-full">
        <ContainerBox title={"Distribution of Study programs"}>
          <div className="flex flex-row wrap h-full w-full items-center justify-center ">
            <div className="flex flex-row wrap h-full w-full items-center justify-center ">
              <LineChartComponent></LineChartComponent>
            </div>
            <div className="flex flex-row wrap h-full w-full items-center justify-center ">
              <PieChart
                series={[
                  { data: [{ value: 10 }, { value: 15 }, { value: 20 }] },
                ]}
                {...pieParams}
              />
            </div>
          </div>
        </ContainerBox>
      </div>{" "}
      <div className="flex flex-row wrap h-full w-full">
        <ContainerBox title={"Distribution of Study programs"}>
          <div className="flex flex-row wrap h-full w-full items-center justify-center ">
            <div className="flex flex-row wrap h-full w-full items-center justify-center ">
              <LineChartComponent></LineChartComponent>
            </div>
            <div className="flex flex-row wrap h-full w-full items-center justify-center ">
              <PieChart
                series={[
                  { data: [{ value: 10 }, { value: 15 }, { value: 20 }] },
                ]}
                {...pieParams}
              />
            </div>
          </div>
        </ContainerBox>
      </div>
    </div>
  );
};

export default StatisticsPage;
