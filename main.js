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


createTaskBtn.addEventListener('click', addTask);
taskDisplay.addEventListener('click', deleteTask);
clearAllBtn.addEventListener('click', clearAll);
// makeListBtn.addEventListener('click', makeToDoCard);

var tasksCard = []; 

var toDoList = new ToDoList(id, title, urgent, tasksCard);

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
  var newTask = new Task(`${taskIdNum}`, `${taskInput.value}`, false);
  addToCurrentTasks(newTask);
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


function addToCurrentTasks(newTask) {
  currentTasks.push(newTask);
}

// function makeToDoCard() {
//   var newToDoList = new ToDoList(id, title, urgent, tasks);
//   newToDoList.tasks = currentTasks
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