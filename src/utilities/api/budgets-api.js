import sendRequest from "../send-request";
const BASE_URL = '/api/budgets'; // Adjust the URL to match your endpoint

export async function createBudget(formData) {
  return sendRequest(BASE_URL, 'POST', formData);
}

export async function updateBudget(budgetId, budgetData) {
  console.log('budget-api update function', budgetId, budgetData)
  return sendRequest(`${BASE_URL}/${budgetId}`, 'PUT', budgetData);
}

export async function getBudget() {
  return sendRequest(`${BASE_URL}`, 'GET');
}

export async function getStatisticsData(budgetId) {
  return sendRequest(`${BASE_URL}/statistics`, 'GET');
}