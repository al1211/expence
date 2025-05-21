import DashboradeLayout from "../../components/Layout/DashboradeLayout";
import { useEffect, useState } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apipath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";

const Income = () => {
  const [incomeData, setIncomeDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [opneAddIncome, setopneAddIncome] = useState(false);
  const token = localStorage.getItem("token");

  // get All Income data details
  const fetchIncomedatails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.INCOME.GET_ALL_INCOME}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setIncomeDate(response.data);
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
      setopneAddIncome(false);  
      toast.success("Income added sussecfully ");
      fetchIncomedatails();

    }catch(err){
      console.log("some err in add income",err.response?.date?.message || err.message,err);
    }
  };

  // delete Income
  const deleteIncome = async (id) => {};

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
              onAddIncome={() => setopneAddIncome(true)}
            />
          </div>
        </div>
        <Modal
          isOpen={opneAddIncome}
          isClose={() => setopneAddIncome(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboradeLayout>
  );
};

export default Income;
