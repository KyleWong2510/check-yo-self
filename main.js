var taskTitleInput = document.querySelector('.task-title-input');
var taskInput = document.querySelector('.task-input');
var titleInput = document.querySelector('.title-input');
var taskDisplay = document.querySelector('.task-display');
var taskList = document.querySelector('.task-list');
var cardDisplay = document.querySelector('#card-display');

var createTaskBtn = document.querySelector('.create-task-btn');
var deleteTaskBtn = document.querySelector('.delete-task-btn');
var clearAllBtn = document.querySelector('.clear-all-btn');
var makeListBtn = document.querySelector('.make-task-list-btn');

var currentTasks = [];
var tasksCard = []; 

createTaskBtn.addEventListener('click', addTask);
taskDisplay.addEventListener('click', deleteTask);
clearAllBtn.addEventListener('click', clearAll);
makeListBtn.addEventListener('click', displayCard);

// var toDoList = new ToDoList(id, title, urgent, tasksCard);

// TASK DISPLAY AND INSTANTIATE TASK OBJECT
function addTask() {
  if (taskInput.value === '') {
    return
  } else {
    createTaskInstance();
    displayTask();
  }
}

function createTaskInstance() {
  var taskIdNum = Date.now();
  var task = taskInput.value;
  var newTask = new Task(taskIdNum, task, false);
  addToCurrentTasks(newTask);
}

function addToCurrentTasks(newTask) {
  currentTasks.push(newTask);
}

function displayTask() {
  taskDisplay.innerHTML = '';
  for (var i = 0; i < currentTasks.length; i++) {
    if (taskInput.value !== ''){
      taskDisplay.innerHTML += `
      <div class="task-list">
        <img class="delete-task-btn" data-id="${currentTasks[i].taskId}" src="assets/delete.svg">
        <p class="task-list-item">${currentTasks[i].text}</p>
      </div>`;
    }
  }
  taskInput.value = '';
}

function deleteTask(event){
  var currentTaskId = event.target.dataset.id;
  event.target.parentNode.remove();
  for (var i = 0; i < currentTasks.length; i++) {
    if (currentTaskId === currentTasks[i].taskId) {
      currentTasks.splice(i, 1);
    };
  };
}

function clearAll() {
  titleInput.value = '';
  taskInput.value = '';
}

// TODO DISPLAY LIST AND INSTANTIATE LIST OBJECT
function displayCard() {
  if (titleInput.value !== '' && taskInput.value === '') {
    // populateCard();
    createList(); 
    clearDisplay();
  }
}

function clearDisplay() {
  taskDisplay.innerHTML = '';
  clearAll();
}

function createList() {
  var listId = Date.now();
  var title = titleInput.value;
  var urgent = false;
  var tasks = currentTasks;
  var newToDoList = new ToDoList(listId, title, urgent, tasks);
  // populateCard(newToDoList);
}

// function populateCard() {
//   cardDisplay.innerHTML += `
//   <div class="task-list-card">
//     <div class="card-contents">
//       <h3>${titleInput.value}</h3>
//       <div class="tasks-section">
//         <div class="task">
//           <img class="checkbox" src="assets/checkbox.svg">
//           <p>Don't ever play yourself.</p>
//         </div>
//         <div class="task">
//           <img class="checkbox" src="assets/checkbox.svg">
//           <p>Every chance I get, I water the plants.</p>
//         </div>
//         <div class="task">
//           <img class="checkbox" src="assets/checkbox.svg">
//           <p>Every chance I get, I water the plants.</p>
//         </div>
//       </div>
//       <div class="card-icons">
//         <div class="urgent">
//           <img src="assets/urgent.svg">
//           <p>Urgent</p>
//         </div>
//         <div class="delete">
//           <img src="assets/delete.svg">
//           <p>Delete</p>
//         </div>
//       </div>
//     </div>
//   </div>`
// }