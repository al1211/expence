import React, { useEffect, useState } from 'react'
import DashboradeLayout from '../../components/Layout/DashboradeLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { API_PATH } from '../../utils/apipath';
import axiosInstance from '../../utils/axiosInstance';
import InfoCard from '../../components/Cards/InfoCard';

import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard} from 'react-icons/io';
import { addThousandSepartor } from '../../utils/helpers';

const Home = () => {
  useUserAuth();
  const navigate=useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true);

    try{
  
      const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DATA}`);

      if(response.data){
        setDashboardData(response.data);
      }
    }catch(err){
      console.error("Something went wrong. please try agin later:", err);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    return ()=>{}
  }, []);
  return (
    <DashboradeLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
          <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandSepartor(dashboardData?.totalBalance || 0)}
          color="bg-primary"
          />
          <InfoCard
          icon={<LuHandCoins/>}
          label="Total Income"
          value={addThousandSepartor(dashboardData?.totalIncome || 0)}
          color="bg-orange-500"
          />
          <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Expense"
          value={addThousandSepartor(dashboardData?.totalExpense || 0)}
          color="bg-red-500"
          />
        </div>
      </div>
    </DashboradeLayout>
 
  )
}

export default Home