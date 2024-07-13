let form = document.querySelector("#form");

form.addEventListener("submit", async function (event) {

  event.preventDefault();
  let amountSpend = document.getElementById("amount").value;
  let descriptionAdded = document.getElementById("text").value; 
  let categorySelected = document.getElementById("category").value;
  let id = document.getElementById('expenseId').value

  const isEditing = id ? 'true':'false'

  let newExpense = {
    id :id,
    amount:amountSpend,
    description:descriptionAdded,
    category:categorySelected
  }

try{
  const url = isEditing === 'true' ? `http://localhost:4000/expense/edit-expense` : `http://localhost:4000/expense/add-expense`;
 const response = await fetch(url,{
  method:'POST',
  body:JSON.stringify(newExpense),
  headers:{
    'Content-Type':'application/json'
  }
 })
 const data = response.json()
 const ex = data.expense
 console.log(ex)
 if(!response.ok){
  throw new Error('problem in adding expense')
 }

}
catch(error){
  console.log(error)
}
 form.reset();

});


document.addEventListener('DOMContentLoaded',()=>{
  displayExpense()
})


async function displayExpense() {

  try{
    const response = await fetch('http://localhost:4000/expense/get-expense')
    if(!response.ok){
      throw new Error('problem fetching data')
    }
    const data = await response.json()
    console.log(data.expense)

    let expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
 
  data.expense.forEach((element, index) => {
    
     let expenseMade = document.createElement("li");
     expenseMade.className = "exp-made ";
     expenseMade.classList.add("list-group-item");
   
     expenseMade.textContent = `Amount: ${element.amount}, Description: ${element.description}, Category: ${element.category}`;
 
     // Adding Edit-Expense-button
     let editButton = document.createElement("button");
     let editButtonText = document.createTextNode("Edit Expense");
     editButton.appendChild(editButtonText);
     editButton.className = "edit-btn btn btn-outline-warning btn-sm";  
     editButton.style.margin = "10px"
 
     expenseMade.appendChild(editButton);
 
     editButton.addEventListener("click", function (event) {
      console.log(element)
       editExpense(event,element.id);
     });
 
     // Adding Delete-Expense-button
     let deleteButton = document.createElement("button");
     let deleteButtonText = document.createTextNode("Delete Expense");
     deleteButton.appendChild(deleteButtonText);
     deleteButton.className = "del-btn btn btn-dark btn-sm";
 
     expenseMade.appendChild(deleteButton);
 
     deleteButton.addEventListener("click", function (event) {
       deleteExpense(event, index,element.id);
     });
 
     expenseList.appendChild(expenseMade);
   });

  }
  catch(err){
    console.log(err)
  }

 
}

// Defining edit-expense function
async function editExpense(event,expenseId) {
  try {
    const response = await fetch(`http://localhost:4000/expense/edit-expense/${expenseId}`);
    if (!response.ok) {
      throw new Error('Problem in fetching data to edit');
    }
    const dataToEdit = await response.json();
  

    event.target.classList.contains("del-btn") ||
    event.target.classList.contains("btn-dark") ||
    event.target.classList.contains("btn-sm")
  
    let expenseToDelete = event.target.parentElement;
    expenseList.removeChild(expenseToDelete);

    document.getElementById("amount").value = dataToEdit.expense.amount;
    document.getElementById("text").value = dataToEdit.expense.description;
    document.getElementById("category").value = dataToEdit.expense.category;
    document.getElementById("expenseId").value = dataToEdit.expense.id;

  } catch (err) {
    console.log(err);
  }
}



// Deleting Expenses made on clicking delete button
let expenseList = document.getElementById("expenseList");

async function deleteExpense(event, index,expenseId) {
  try{
    const response = await fetch('http://localhost:4000/expense/delete-expense',{
      method:'POST',
      body:JSON.stringify({id:expenseId}),
      headers:{
        'Content-type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error('problem occured while deleting')
    }
    
      event.target.classList.contains("del-btn") ||
      event.target.classList.contains("btn-dark") ||
      event.target.classList.contains("btn-sm")
  
      let expenseToDelete = event.target.parentElement;
      expenseList.removeChild(expenseToDelete);
  }
  catch(error){
    console.log(error)
  }

}
