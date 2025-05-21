import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'


const COLORS = ['#875cf5',"#fa2c37","#ff6900","#4f39f6"];
const RecentIncomeWithChart = ({data,totalIncome}) => {
    const [chartData,setChartData]=useState([]);
    
    const prepareChartData=()=>{
        const dataArr=data?.map((itme)=>({
            name:item?.source,
            amount:itme?.amount,
        }));

        setChartData(dataArr);

    };

    useEffect(()=>{
        prepareChartData();

        return ()=>{};
    },[])
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 60 days Income</h5>
        </div>
        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        color={COLORS}/>
    </div>
  )
}

export default RecentIncomeWithChart