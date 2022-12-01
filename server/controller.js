const express = require('express')
const children = require('./db.json')
let globalId = 4

module.exports = {
    getChildren: (req, res) => {
        res.status(200).send(children)
    },
    addChild: (req, res) => {
        const {name, total, tithing, savings, spending} = req.body
        let newChild = {
            id: globalId,
            name,
            total: +total,
            tithing: +tithing,
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

    //need to work on this
    //add and subtract money from each account
    editChild: (req, res) => {
        const {tithingInput, savingsInput, spendingInput} = req.body
        const {id} = req.params
        const index = children.findIndex((el) => +el.id === +id)
        
  
        !tithingInput ? children[index].tithing = +children[index].tithing : children[index].tithing += +tithingInput
        !savingsInput ? children[index].savings = +children[index].savings : children[index].savings += +savingsInput
        !spendingInput ? children[index].spending = +children[index].spending : children[index].spending += +spendingInput
        
        // children[index].total += +tithingInput+ +savingsInput+ +spendingInput
        children[index].total = +children[index].total + +tithingInput
        children[index].total = +children[index].total + +savingsInput
        children[index].total = +children[index].total + +spendingInput

        res.status(200).send(children)
    }
}