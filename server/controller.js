const express = require('express')
const children = require('./db.json')
let globalId = 4

module.exports = {
    getChildren: (req, res) => {
        res.status(200).send(children)
    },
    addChild: (req, res) => {
        const {name, total, charity, savings, spending} = req.body
        let newChild = {
            id: globalId,
            name,
            total: +total,
            charity: +charity,
            savings: +savings,
            spending: +spending
        }
        children.push(newChild)
        globalId++
        res.status(200).send(children)
    },
    deleteChild: (req, res) => {
        const index = children.findIndex((el) => el.id === +req.params.id)

        children.splice(index, 1)
        res.status(200).send(children)
    },

    
    editChild: (req, res) => {
        const {charityInput, savingsInput, spendingInput} = req.body
        const {id} = req.params
        const index = children.findIndex((el) => +el.id === +id)

      
        console.log(children[index])
        console.log(charityInput)
  
        !charityInput ? children[index].charity = +children[index].charity : children[index].charity += +charityInput
        !savingsInput ? children[index].savings = +children[index].savings : children[index].savings += +savingsInput
        !spendingInput ? children[index].spending = +children[index].spending : children[index].spending += +spendingInput
        
        
        children[index].total = +children[index].total + +charityInput
        children[index].total = +children[index].total + +savingsInput
        children[index].total = +children[index].total + +spendingInput

        res.status(200).send(children)
    }
}