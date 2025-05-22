import moment from 'moment'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentIncome = ({onSeeMore,transaction}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>
            <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
        </div>

        <div className='mt-6'>
            {transaction?.slice(0,5)?.map((item,index)=>(
                <TransactionInfoCard
                key={index}
                source={item.source}
                icon={item.icon}
                date={moment(item.date).format('DD MMM YYYY')} 
                amount={item.amount}
                type="income"
                hiddenDeleteBtn/>
            ))}
        </div>
    </div>
  )
}

export default RecentIncome