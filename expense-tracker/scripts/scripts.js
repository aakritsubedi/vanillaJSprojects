import Expense from '../scripts/expense.js';

let expense = new Expense();
expense.displayAllExpense();

let expenseForm = document.querySelector('#expense-form');
expenseForm.addEventListener('submit',expense.saveExpense);

let displayDate = document.querySelector('#display-date');
displayDate.innerHTML = new Date();