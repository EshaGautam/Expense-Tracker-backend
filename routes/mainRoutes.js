const express = require('express')

const router = express.Router()

const mainControllers = require('../controllers/mainControllers')

router.get('/',mainControllers.getExpenseForm)
router.get('/expense/get-expense',mainControllers.getExpense)
router.post('/expense/add-expense',mainControllers.postExpense)
router.post('/expense/delete-expense',mainControllers.deleteExpense)
router.get('/expense/edit-expense/:expenseId',mainControllers.getExpenseToEdit)
router.post('/expense/edit-expense',mainControllers.postEditedExpense)


module.exports = router