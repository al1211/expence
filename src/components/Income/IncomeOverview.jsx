import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import { prepareIncomeBarChartData } from "../../utils/helpers";
import CustomBarChart from "../Charts/CustomBarChart";
const IncomeOverview = ({ transaction, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeBarChartData(transaction);
    setChartData(result);

    return () => {};
  }, [transaction]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg ">Income OverView</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends{" "}
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
