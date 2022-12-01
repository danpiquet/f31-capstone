const baseURL = 'http://localhost:4000'

const addChild = document.querySelector('#submitNewChild')
const displayChild = document.querySelector('#childDisplay')
const updateTotals = document.querySelector('#updateBtn')

let modal = document.getElementById('addChildModal')
let modalBtn = document.getElementById('addChildBtn')
let span = document.getElementsByClassName('close')[0]

modalBtn.onclick = () => modal.style.display = 'block'

span.onclick = () => modal.style.display = 'none'

window.onclick = (event) => {
    if(event.target == modal) {
        modal.style.display = 'none'
    }
}

const createChildCard = (child) => {
    const newChildCard = document.createElement('section')
    newChildCard.classList.add('child-card')

    
    newChildCard.innerHTML = `
    <h2>${child.name}</h2>
    
    <h3>Total</h3>
    <div class="total">
    <h5>${child.total}</h5>
    </div>
    
    <h5>Tithing</h5>
    <h5>${child.tithing}</h5>
    <h5>Savings</h5>
    <h5>${child.savings}</h5>
    <h5>Spending</h5>
    <h5>${child.spending}</h5>
    
    <br>
    
    <h5>Update budget totals</h5>
    <input id="tithing${child.id}" placeholder="tithing">
    <input id="savings${child.id}" placeholder="savings">
    <input id="spending${child.id}" placeholder="spending">
    
    <br>
    <br>
    <button id="updateBtn${child.id}" onclick="updateChild(${child.id})">Update Totals</button>
    <br>
    <br>
    <button onclick="deleteChild(${child.id})">Delete Child</button>
    `
    displayChild.appendChild(newChildCard)
          
}

const displayChildren = (arr) => {
    for(let i = 0;i < arr.length; i++){
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
    axios.delete(`${baseURL}/deleteChild/${id}`)
    .then((res) => {
        displayChild.innerHTML = ''
        displayChildren(res.data)
    })
    .catch((err) => console.log(err))
}




const updateChild = (id) => {

    let tithingInput = document.querySelector(`#tithing${id}`)     
    let savingsInput = document.querySelector(`#savings${id}`)
    let spendingInput = document.querySelector(`#spending${id}`)

    const bodyObj = {
        tithingInput: tithingInput.value,
        savingsInput: savingsInput.value,
        spendingInput: spendingInput.value
    }


    axios.put(`${baseURL}/editChild/${id}`, bodyObj)
    .then((res) => {
        displayChild.innerHTML = ''
        displayChildren(res.data)
    })
}

addChild.addEventListener('click',createChild)
addChild.onclick = () => modal.style.display = 'none'
// updateTotals.addEventListener('click', updateChild)

getAllChildren()