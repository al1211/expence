import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboradeLayout from "../../components/Layout/DashboradeLayout";
import { API_PATH } from "../../utils/apipath";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverView from "../../components/Expense/ExpenseOverView";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import { data } from "react-router-dom";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expence = () => {
  useUserAuth();
  const [expenseData, setExpenseDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [opneAddExpense, setOpneAddExpense] = useState(false);

  // get All expense data details
  const fetchExpensedatails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATH.EXPENCE.GET_ALL_EXPENCE}`
      );

      if (response.data) {
        setExpenseDate(response.data.expence);
      }
    } catch (err) {
      console.error("some wrond in inocme fecting");
    } finally {
      setLoading(false);
    }
  };

  // handle add expense
  const handleAddExpense = async (income) => {
    const { category, amount, date, icon } = income;

    // validation checks
    if (!category.trim()) {
      toast.error("Category  is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number grather than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATH.EXPENCE.ADD_EXPENCE, {
        category,
        amount,
        date,
        icon,
      });
      setOpneAddExpense(false);
      toast.success("Expense added sussecfully ");
      fetchExpensedatails();
    } catch (err) {
      console.log(
        "some err in add expense",
        err.response?.date?.message || err.message,
        err
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.EXPENCE.DELETE_EXPENCE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details succesfull deleted");
      fetchExpensedatails();
    } catch (err) {
      console.error("error in delete", err);
    }
  };

  // download income

  const handleDownloadExpenseDetails = async () => {};
  useEffect(() => {
    fetchExpensedatails();

    return () => {};
  }, []);
  return (
    <DashboradeLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverView
              transaction={expenseData}
              onExpenseIncome={() => setOpneAddExpense(true)}
            />
            <ExpenseList
              transaction={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
        </div>
        <Modal
          isOpen={opneAddExpense}
          isClose={() => setOpneAddExpense(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          isClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Inocme"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income datails?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboradeLayout>
  );
};

export default Expence;
