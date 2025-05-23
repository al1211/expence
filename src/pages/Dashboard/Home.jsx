import React, { useEffect, useState } from "react";
import DashboradeLayout from "../../components/Layout/DashboradeLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../../utils/apipath";
import axiosInstance from "../../utils/axiosInstance";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSepartor } from "../../utils/helpers";
import RecentTransaction from "../../components/Dashboard/RecentTransaction";
import FinancialOverview from "../../components/Dashboard/FinancialOverview";
import ExpenseTransction from "../../components/Dashboard/ExpenseTransction";
import Last30daysTransaction from "../../components/Dashboard/Last30daysTransaction";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.DASHBOARD.GET_DATA}`
      );

     
      setDashboardData(response.data);
    } catch (err) {
      console.error("Something went wrong. please try agin later:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboradeLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSepartor(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={addThousandSepartor(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Expense"
            value={addThousandSepartor(dashboardData?.totalExpence || 0)}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransaction
            transaction={dashboardData?.recentTransaction}
            onSeeMore={() => navigate("/expense")}
          />
          <FinancialOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpence || 0}
          />
          <ExpenseTransction
            transaction={
              dashboardData?.last30daysExpence?.transaction || []
            }
            onSeeMore={() => navigate("/expense")}
          />
          <Last30daysTransaction
            data={dashboardData?.last30daysExpence?.transaction || []}
          />
          <RecentIncomeWithChart
            data={
              dashboardData?.last60daysIncome?.transaction.slice(0,4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transaction={dashboardData?.last60daysIncome?.transaction || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboradeLayout>
  );
};

export default Home;
