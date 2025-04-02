import React, { useEffect, useState } from 'react'
import DashboradeLayout from '../../components/Layout/DashboradeLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { API_PATH } from '../../utils/apipath';
import axiosInstance from '../../utils/axiosInstance';

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
      <div className='my-5 mx-auto'>Home</div>
    </DashboradeLayout>
 
  )
}

export default Home