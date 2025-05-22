import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import CustomToolip from "./CustomToolip";
import CustomLegend from "./CustomLegend";
const CustomPieChart = ({
  data,
  label,
  totalAmount,
  color,
  showTextAnchor,
}) => {
  
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomToolip}/>
        <Legend content={CustomLegend}/>
        {showTextAnchor && (

            <>
            <text x="50%" y="50%" dy={-25} textAnchor="middle"  fill="#666" fontSize="14px" >
                {label}
                
            </text>
            <text x="50%" y="50%" dy={8} textAnchor="middle"  fill="#333" fontSize="24px" fontWeight="semi-bold" >
                {totalAmount} 
            </text>
          
            </>)}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
