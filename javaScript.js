//Run this function when page loade
displayTasks();

//Define Most used variables
let taskInputValue = document.getElementById('userInput');
let addTaskBtn = document.getElementById('push');
let saveTaskBtn = document.getElementById('save');
let deleteAll = document.getElementById('deleteAll');
let searchInput = document.getElementById('searchBar')

// get item from local storage

function getStorage(){
    let tasksObj;
    let webTasks = localStorage.getItem('localtasks');
    if(webTasks == null){
        tasksObj = [];
    }else{
        tasksObj = JSON.parse(webTasks);
    }
    return tasksObj;
}

//set item in local storage

function setStorage(data){
    localStorage.setItem('localtasks', JSON.stringify(data))
}

//Add event Listner to task button
addTaskBtn.addEventListener('click', addToStorage)

// Add task to Local Storage
function addToStorage(){
    let addtaskInputVal = taskInputValue.value;
    if(addtaskInputVal.trim()!= 0){
        let tasksObj = getStorage();
        tasksObj.push(addtaskInputVal);
        setStorage(tasksObj);
        taskInputValue.value = "";
        displayTasks();
    }else{
        let snackBar = document.getElementById('snackBar');
        snackBar.className = "show";
        setTimeout(function(){
            snackBar.className = snackBar.className.replace("show", "");
        }, 3000)
    }
}

// Display task on Page
function displayTasks(){
    let addedTasksList = document.getElementById('tasks');
    let tasksObj = getStorage();
    let html = "";
    tasksObj.forEach((item, index)=>{
        html += `<div id="task">
        <span id="taskName">
            ${index + 1}. ${item} 
        </span>
        <div id="actions">
            <button id="edit" onclick="editTask(${index})" ><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button id="delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
    </div>`
    })
    if(tasksObj.length != 0){
        addedTasksList.innerHTML = html;
    }else{
        addedTasksList.innerHTML = `<span id="noTask">There are no task to show!</span>`
    }
}

//Edit task

function editTask(index){
    let tasksObj = getStorage();
    taskInputValue.value = tasksObj[index];
    let saveIndex = document.getElementById('saveIndex');
    saveIndex.value = index;
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

// Add event listner to save task button
saveTaskBtn.addEventListener('click', saveTasks);

// Save Tasks

function saveTasks(){
    let tasksObj = getStorage()
    saveIndex = document.getElementById('saveIndex').value;
    tasksObj[saveIndex] = taskInputValue.value;
    setStorage(tasksObj);
    displayTasks();
    taskInputValue.value = "";
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
}

//Delete tasks
function deleteTask(index){
    let tasksObj = getStorage();
    tasksObj.splice(index, 1);
    setStorage(tasksObj);
    displayTasks();
}


// Add event listner to delete all buttons
// deleteAll.addEventListener('click', deleteAllTasks);
// deleteAll.addEventListener('click', deleteAllTasks)

//Delete All tasks
function deleteAllTasks(){
    let tasksObj = getStorage();
    if(tasksObj != null ){
        tasksObj = []
    }
    setStorage(tasksObj);
    displayTasks();
    taskInputValue.value = "";
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
}

// Add event listner to Search Input
searchInput.addEventListener('input', searchTasks);

// Search task
function searchTasks(){
    inputValue = searchInput.value;
    inputValue = inputValue.replace(/^./, str => str.toUpperCase());
    let tasks = document.querySelectorAll('#task');
    Array.from(tasks).forEach(function(element){
        let taskTxt = element.getElementsByTagName('span')[0].innerText;
        if(taskTxt.includes(inputValue)){
            element.style.display = "block";
            element.style.display = "flex";
        }else{
            element.style.display = "none";
        }
    })
}