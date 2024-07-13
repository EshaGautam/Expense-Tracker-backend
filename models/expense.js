const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Expense = sequelize.define('expense',{
    id:{
    type:Sequelize.INTEGER,
    allowedNull:false,
    primaryKey:true,
    autoIncrement:true
    },
    amount:{
      type:Sequelize.INTEGER,
      allowedNull:false
    },

    description:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowedNull:false
    }
})


module.exports = Expense