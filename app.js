/*
***************************************
***************************************
***************************************
***************************************
***************************************
***************************************
***************************************
*/

const form = document.querySelector('form');
const userInput = document.querySelector('form input');
const submit = document.querySelector('form button[type="submit"]');
const numberOfTasksView = document.querySelector('header p');
const clearAllBtn = document.querySelector('header div button');
let numberOfTasks = 0;
let userTasks = [];


function makeList(userValue) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = userValue;
    const button = document.createElement('button');
    button.className = 'fa-solid fa-trash';
    li.appendChild(p);
    li.appendChild(button);
    ul.appendChild(li);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    
    makeList(userInput.value);
    userTasks.push(userInput.value);
    localStorage.setItem('userTasks', JSON.stringify(userTasks));
    userInput.value = '';
    displayNumberOfTasks();
    disable();
    deleteTask();
    clearAll();
})


/* Disable the button, if the input was empty */
function disable() {
    if (userInput.value === '') {
        userInput.classList.add('empty');
        submit.classList.add('empty');
        submit.disabled = true;
    }
    return false
}
disable();

userInput.addEventListener('input', e => {
    if (userInput.value !== '' && userInput.value.indexOf(' ') != 0) {
        userInput.classList.remove('empty');
        submit.classList.remove('empty');
        submit.disabled = false;
    } else {
        disable();
    }
})

function displayNumberOfTasks() {
    if (userTasks.length !== 0) {
        numberOfTasksView.textContent = `${userTasks.length} tasks`;
        clearAllBtn.style.display = 'block'
    } else {
        numberOfTasksView.textContent = 'You do not have any tasks yet';
        numberOfTasksView.classList.add('empty');
        clearAllBtn.style.display = 'none'
    }
}
displayNumberOfTasks();

function displayUserTasks() {
    if (!localStorage.getItem('userTasks')) {
        console.log('you do not have any storage at this time')
    } else {
        const items = JSON.parse(localStorage.getItem('userTasks'));
        userTasks = items;
        items.forEach((item) => {
            makeList(item);
        })
        displayNumberOfTasks();
    }
}
displayUserTasks();

function deleteTask() {
    const items = document.querySelectorAll('ul li');
    items.forEach(item => {
        const btn = item.querySelector('button');
        btn.addEventListener('click', e => {
            let parent = btn.parentElement;
            let task = parent.firstChild.textContent;
            parent.remove();
            if (userTasks.indexOf(task) !== -1) {
                userTasks.splice(userTasks.indexOf(task), 1);
                displayNumberOfTasks()
            }
            localStorage.setItem('userTasks', JSON.stringify(userTasks));
        })
    })
}
deleteTask();

function clearAll() {
    clearAllBtn.addEventListener('click', e => {
        const items = document.querySelectorAll('ul li');
        items.forEach(item => {
            item.remove()
        }) 
        userTasks = [];
        localStorage.setItem('userTasks', JSON.stringify(userTasks));
        displayNumberOfTasks();
    })
}
clearAll();

/*
***************************************
***************************************
***************************************
***************************************
***************************************
***************************************
***************************************
*/