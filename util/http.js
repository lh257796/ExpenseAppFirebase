//helper fxns for sending requests
import axios from "axios";

const BACKEND_URL = "https://expense-tracker-1ff58-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData, token) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json?auth=${token}`,
    expenseData
  );
  //firebase wnats the .json particularly for the node to be targeted
  //firebase gives an ID automatically in the response
  const id = response.data.name;
  return id;
}

export async function fetchExpenses(token) {
  const response = await axios.get(`${BACKEND_URL}/expenses.json?auth=${token}`);
  //response in form of key:value pairs
  const expenses = [];

  console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
  //can add a loading spinner in this
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
