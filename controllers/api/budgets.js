const Budget = require('../../models/budget');
const Income = require('../../models/income');
const Expense = require('../../models/expense');

module.exports = {
  create,
  update,
  index,
  getStatisticsData,
};

async function getStatisticsData(req, res) {
  try {
    const budgets = await Budget.find({ user: req.user._id });
    const expenses = await Expense.find({ user: req.user._id });

    const categoryData = {};

    budgets.forEach((budget) => {
      const { category, monthlyBudget } = budget;
      if (!categoryData[category]) {
        categoryData[category] = { budget: monthlyBudget, totalExpense: 0 };
      }
    });

    expenses.forEach((expense) => {
      const { category, amount } = expense;
      if (categoryData[category]) {
        categoryData[category].totalExpense += amount;
      }
    });

    const income = await Income.find({ user: req.user._id });

    res.status(200).json({ categoryData, income, expenses });
  } catch (err) {
    res.status(500).json(err);
  }
}


async function index(req, res) {
  try {
    const budget = await Budget.find({ user: req.user._id });
    console.log('Budget index route hit', budget)
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function update(req, res) {
  console.log('Budget update route hit', req.body)
  try {
    const budget = await Budget.findByIdAndUpdate(
      req.params.id, // Document _id
      req.body, // Update data
      { new: true } // Return the updated document
    );
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json(err);
  }
}

// In the future may need a guard against updating this from the ProfileForm.jsx file
async function create(req, res) {
  console.log(req.body)
  try {
    const budget = await Budget.create(req.body);
    budget.save()
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json(err);
  }
}
