import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helpers';
import CustomBarChart from '../Cards/CustomBarChart';

const Last30daysTransaction = ({data}) => {
  const [chartData,setCartData]=useState([]);
  useEffect(()=>{
    const result =prepareExpenseBarChartData(data);
    setCartData(result);

    return ()=>{}
  }
  ,[data])
  console.log("30",data);
  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 days Expenses</h5>
      </div>

      <CustomBarChart data={chartData}/>
    </div>
  )
}

export default Last30daysTransaction