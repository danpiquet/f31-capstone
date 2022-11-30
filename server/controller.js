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
            total,
            tithing,
            savings,
            spending
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

        if(!tithingInput){
            children[index].tithing = children[index].tithing
        }else{
            children[index].tithing += tithingInput
        }
        

        res.status(200).send(children)


    }

}