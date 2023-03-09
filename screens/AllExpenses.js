import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const scheduleNOtificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Local notification",
        body: "This is the body of the notification",
        data: { userName: "han" },
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total:"
      fallbackText="No expenses found... Add one now!"
    />
  );
};

export default AllExpenses;
