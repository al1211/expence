import DashboradeLayout from "../../components/Layout/DashboradeLayout";
import { useEffect, useState } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apipath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
const [opneAddIncome, setOpneAddIncome] = useState(false);
  

  // get All Income data details
  const fetchIncomedatails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.INCOME.GET_ALL_INCOME}`);

      if (response.data) {
        setIncomeDate(response.data.income);
      }
    } catch (err) {
      console.error("some wrond in inocme fecting");
    } finally {
      setLoading(false);
    }
  };
 
  // handle add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // validation checks
    if (!source.trim()) {
      toast.error("Source not required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount)<=0) {
      toast.error("Amount should be a valid number grather than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon
      });
      setOpneAddIncome(false);  
      toast.success("Income added sussecfully ");
      fetchIncomedatails();

    }catch(err){
      console.log("some err in add income",err.response?.date?.message || err.message,err);
    }
  };

  // delete Income
  const deleteIncome = async (id) => {
    try{
        await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))
        setOpenDeleteAlert({show:false,data:null});
        toast.success("Income details succesfull deleted");
        fetchIncomedatails();
    }catch(err){
      console.error("error in delete",err);
    }
  };

  // download income

  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomedatails();

    return () => {};
  }, []);
  return (
    <DashboradeLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={() => setOpneAddIncome(true)}
            />
            <IncomeList
            transaction={incomeData}
            onDelete={(id)=>  setOpenDeleteAlert({show:true,data:id})}
            onDownload={handleDownloadIncomeDetails}
            />
          </div>
        </div>
        <Modal
          isOpen={opneAddIncome}
          isClose={() => setOpneAddIncome(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
        isOpen={openDeleteAlert.show}
        isClose={()=>setOpenDeleteAlert({show:false,data:null})}
        title="Delete Inocme">
          <DeleteAlert
          content="Are you sure you want to delete this income datails?"
          onDelete={()=>deleteIncome(openDeleteAlert.data)}/>
        </Modal>
      </div>
    </DashboradeLayout>
  );
};

export default Income;
