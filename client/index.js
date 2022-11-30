const baseURL = 'http://localhost:4000'

const addChild = document.querySelector('#addChild')
const displayChild = document.querySelector('#childDisplay')


const createChildCard = (child) => {
    const newChildCard = document.createElement('section')
    newChildCard.classList.add('child-card')

    newChildCard.innerHTML = `
        <h3>${child.name}</h3>

        <h5>Total</h5>
        <h5>${child.total}</h5>

        <button onclick="updateChild(${child.id}, 'minus')">-</button>
        <input id="${child.id} placeholder="amount">
        <button onclick="updateChild(${child.id}, 'add')">+</button>
        
        
        
        <h5>Tithing</h5>
        <h5>${child.tithing}</h5>
        
        <button id="minusTithing${child.id}">-</button>
        <input id="tithing${child.id}" placeholder="amount">
        <button id="addTithing${child.id}">+</button>
        
        
        
        <h5>Savings</h5>
        <h5>${child.savings}</h5>
        
        <button>-</button>
        <input id="" placeholder="amount">
        <button>+</button>
        
        
        
        <h5>Spending</h5>
        <h5>${child.spending}</h5>
        
        <button>-</button>
        <input placeholder="amount">
        <button>+</button>
        <br></br>
        <button onclick="deleteChild(${child.id})">Delete Child</button>
            `
            displayChild.appendChild(newChildCard)

            let tithingInput = document.querySelector(`#tithing${child.id}`)
            let addTithingBtn = document.querySelector(`#addTithing${child.id}`)
            let minusTithingBtn = document.querySelector(`#minusTithing${child.id}`)

            const bodyObj = {
                tithingInput,
                savingsInput,
                spendingInput
            }

            addTithingBtn.addEventListener('click', updateChild(child.id,bodyObj))



}

const displayChildren = (arr) => {
    for(let i = 0;i < arr.length; i++){
        console.log(arr[i])
        createChildCard(arr[i])
    }
}

const getAllChildren = () => {
    axios.get(`${baseURL}/children`)
.then((res) => displayChildren(res.data))
.catch((err) => console.log(err))
}

const createChild = () => {

    displayChild.innerHTML = ''
    const name = document.querySelector('#nameInput')
    const total = document.querySelector('#totalInput')
    const tithing = document.querySelector('#tithingInput')
    const savings = document.querySelector('#savingsInput')
    const spending = document.querySelector('#spendingInput')

    let bodyObj = {
        name: name.value,
        total: total.value,
        tithing: tithing.value,
        savings: savings.value,
        spending: spending.value
    }
    console.log(bodyObj)
    axios.post(`${baseURL}/addChild`, bodyObj)
        .then((res) => {
            name.value = ''
            total.value = ''
            tithing.value = ''
            savings.value = ''
            spending.value = ''
            displayChildren(res.data)
        })
        .catch((err) => console.log(err))

}

const deleteChild = (id) => {
    axios.delete(`${baseURL}/deleteChild/:${id}`)
    .then((res) => {
        displayChild.innerHTML = ''
        displayChildren(res.data)
    })
}

const updateChild = (id, bodyObj) => {

    axios.put(`${baseURL}/editChild/${id}`, bodyObj)
    .then((res) => {
        displayChild.innerHTML = ''
        displayChildren(res.data)
    })
}

addChild.addEventListener('click',createChild)

getAllChildren()