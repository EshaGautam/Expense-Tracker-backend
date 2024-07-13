const path = require('path')
const Expense = require('../models/expense')

exports.getExpenseForm=(req,res,next)=>{
    const formPath = path.join(__dirname,'../views/index.html')
    res.sendFile(formPath)
}
exports.postExpense = (req, res, next) => {
  
    const { amount, description, category } = req.body;
  
    Expense.create({
      amount: amount,
      description: description,
      category: category
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: 'Expense created successfully', expense: result });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Failed to create expense' });
    });
  };

exports.getExpense=(req,res,next)=>{
Expense.findAll()
.then((expense)=>{
    console.log(expense)
    res.status(200).json({expense:expense})
})
.catch((error)=>{
    console.log(error)
})
}


exports.deleteExpense=(req,res,next)=>{
    const {id} = req.body

   Expense.findByPk(JSON.parse(id)).then((expense)=>{
     if(!expense){
        return res.status(404).json({ message: 'expense not found' });
     }
     return expense.destroy()
   })
   .then(() => {
    console.log('expense deleted successfully');
    res.status(200).json({ message: 'expense deleted successfully' });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete expense' });
  });
}


exports.getExpenseToEdit=(req,res,next)=>{

    const expenseIdToEdit = req.params.expenseId

    Expense.findByPk(expenseIdToEdit)
    .then((expense)=>{
        if(!expense){
            return res.status(404).json({ message: 'expense not found' });
        }
        res.status(200).json({ message: 'Expense created successfully', expense: expense  });
    })
      .catch((error) => {
        console.error('Error editing expense:', error);
        res.status(500).json({ message: 'Failed to update expense' });
      });
}


exports.postEditedExpense=(req,res,next)=>{
  const{id,amount,description,category} = req.body
  Expense.findByPk(id)
  .then((expense)=>{
    if(!expense){
      return
    }
    expense.amount = amount
    expense.description = description
    expense.category = category

    return expense.save()
  })
  .catch((error) => {
    console.error('Error editing expense:', error);
    res.status(500).json({ message: 'Failed to update expense' });
  });

}