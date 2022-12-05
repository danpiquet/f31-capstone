const baseURL = 'http://localhost:4000'

const addChild = document.querySelector('#submitNewChild')
const displayChild = document.querySelector('#childDisplay')
const updateTotals = document.querySelector('#updateBtn')

let modal = document.getElementById('addChildModal')
// let modalBtn = document.getElementById('addChildBtn')
let modalBtn = document.getElementById('gooey-button')
let span = document.getElementsByClassName('close')[0]

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

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
    
    <section class="name-header">
    <text class="child-name">${child.name}</text>
    </section>
    
    
    <div id="total">
    <text>Total</text>
    <div class="total-bubble">
    <text class="total">${usdFormatter.format(child.total)}</text>
    </div>
    </div>

    
    <div id="budget-bubbles">

    <div class="budget-icon">
    <div class="budget">
    <text class="sub-total">${usdFormatter.format(child.charity)}</text>
    </div>
    <div class="budget-name">
    <text>Charity</text>
    </div>
    </div>
    
    
    <div class="budget-icon">
    <div class="budget">
    <text class="sub-total">${usdFormatter.format(child.savings)}</text>
    </div>
    <div class="budget-name">
    <text>Savings</text>
    </div>
    </div>
    
    <div class="budget-icon">
    <div class="budget">
    <text class="sub-total">${usdFormatter.format(child.spending)}</text>
    </div>
    <div class="budget-name">
    <text>Spending</text>
    </div>
    </div>

    </div>
    
    <br>
    
    <div class="update-text">
    <text>update budget totals</text>
    </div>

    <div class="input-container">
    <input class="input-box" id="charity${child.id}" placeholder="charity">
    <input class="input-box" id="savings${child.id}" placeholder="savings">
    <input class="input-box" id="spending${child.id}" placeholder="spending">
    </div>
    
    <br>
    <br>
    <div class="btn-container">
    <button class="update-button" id="updateBtn${child.id}" onclick="updateChild(${child.id})">Update Totals</button>
    <br>
    <br>
    <button class="delete-button" onclick="deleteChild(${child.id})">Delete Child</button>
    </div>
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
    const charity = document.querySelector('#charityInput')
    const savings = document.querySelector('#savingsInput')
    const spending = document.querySelector('#spendingInput')

    let bodyObj = {
        name: name.value,
        total: total.value,
        charity: charity.value,
        savings: savings.value,
        spending: spending.value
    }
    axios.post(`${baseURL}/addChild`, bodyObj)
        .then((res) => {
            name.value = ''
            total.value = ''
            charity.value = ''
            savings.value = ''
            spending.value = ''
            displayChildren(res.data)
        })
        .catch((err) => console.log(err))

}

const deleteChild = (id) => {
    if(confirm("Are you sure you want to delete this child's budget card?")===true){
    axios.delete(`${baseURL}/deleteChild/${id}`)
    .then((res) => {
        displayChild.innerHTML = ''
        displayChildren(res.data)
    })
    .catch((err) => console.log(err))
}else{
    alert('Delete Canceled!')
}
}




const updateChild = (id) => {

    let charityInput = document.querySelector(`#charity${id}`)     
    let savingsInput = document.querySelector(`#savings${id}`)
    let spendingInput = document.querySelector(`#spending${id}`)

    if(isNaN(+charityInput.value)){
        alert('Please enter a valid number')
        charityInput.value = ''
        return
    }

    const bodyObj = {
        charityInput: charityInput.value,
        savingsInput: savingsInput.value,
        spendingInput: spendingInput.value
    }

    console.log(bodyObj)

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