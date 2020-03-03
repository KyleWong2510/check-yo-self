newToDoList = new ToDoList;
var taskTitleInput = document.querySelector('.task-title-input');
var taskInput = document.querySelector('.task-input');
var titleInput = document.querySelector('.title-input');
var taskDisplay = document.querySelector('.task-display');
var taskList = document.querySelector('.task-list');
var cardDisplay = document.querySelector('#card-display');
var emptyToDoMsg = document.querySelector('.empty-to-do-msg');

var createTaskBtn = document.querySelector('.create-task-btn');
var deleteTaskBtn = document.querySelector('.delete-task-btn');
var clearAllBtn = document.querySelector('.clear-all-btn');
var makeListBtn = document.querySelector('.make-task-list-btn');
var parsedTasks = JSON.parse(localStorage.getItem('list'));

var currentTasks = [];
var tasksCards = [];

createTaskBtn.addEventListener('click', addTask);
taskDisplay.addEventListener('click', deleteTask);
clearAllBtn.addEventListener('click', clearAll);
makeListBtn.addEventListener('click', displayCard);

clearAllBtn.disabled = true;
makeListBtn.disabled = true;

window.onload = noListMsgDisplay();

function noListMsgDisplay() {
  if (localStorage.length !== 0) {
    newToDoList.retrieveFromStorage();
    emptySectionMsg();
  }
}

// TASK DISPLAY AND INSTANTIATE TASK OBJECT

function addTask() {
  if (taskInput.value === '') {
    return
  } else {
    createTaskInstance();
    displayTask();
    enableMakeListBtn();
  }
  clearAllBtn.disabled = false;
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
//check if clicked id matches the task id
//if so, update task to task.complete = !task.complete
//save to storage using same key as local storage list array
//check state of completion
//if complete display x and return
//if not display y and return
//use returned to 

function displayTask() {
  taskDisplay.innerHTML = '';
  for (var i = 0; i < currentTasks.length; i++) {
    if (taskInput.value !== '') {
      taskDisplay.innerHTML += `
      <div class="task-list">
        <img class="delete-task-btn" data-id="${currentTasks[i].taskId}" src="assets/delete.svg">
        <p class="task-list-item">${currentTasks[i].text}</p>
      </div>`;
    }
  }
  taskInput.value = '';
}

function deleteTask(event) {
  var currentTaskId = event.target.dataset.id;
  event.target.parentNode.remove();
  for (var i = 0; i < currentTasks.length; i++) {
    if (currentTaskId === currentTasks[i].taskId) {
      currentTasks.splice(i, 1);
    };
  };
}

function clearAll() {
  if (titleInput.value || taskInput.value || taskDisplay.innerHTML) {
    titleInput.value = '';
    taskInput.value = '';
    taskDisplay.innerHTML = ``;
  } else {
    clearAllBtn.disabled = true;
  }
  currentTasks = []
}

function enableMakeListBtn() {
  if (titleInput.value && taskDisplay.innerHTML) {
    makeListBtn.disabled = false
  }
}

function emptySectionMsg() {
  var emptyToDoMsg = document.getElementById('empty-to-do-msg');
  if (cardDisplay.innerHTML !== ``) {
    emptyToDoMsg.classList.add('hide');
  }
}

// TODO LIST DISPLAY AND INSTANTIATE LIST OBJECT

function displayCard() {
  if (titleInput.value !== '' && taskDisplay.innerHTML !== '') {
    createList();
    clearDisplay();
    emptySectionMsg();
  }
}

function clearDisplay() {
  taskDisplay.innerHTML = '';
  clearAll();
  makeListBtn.disabled = true;
}

function createList() {
  var listId = Date.now();
  var title = titleInput.value;
  var urgent = false;
  var tasks = currentTasks;
  var newToDoList = new ToDoList(listId, title, urgent, tasks);
  addToTasksCards(newToDoList);
  populateCard(newToDoList);
  newToDoList.saveToStorage(tasksCards);
}

function addToTasksCards(list) {
  tasksCards.push(list);
}

function populateCard(newToDoList) {
  console.log('currentTasks', currentTasks);
  cardDisplay.insertAdjacentHTML("afterbegin", `
  <div class="task-list-card">
    <div class="card-contents">
      <h3>${newToDoList.title}</h3>
      <div class="tasks-section" data-id="${newToDoList.id}">
        
      </div>
      <div class="card-icons">
        <div class="urgent">
          <img src="assets/urgent.svg">
          <p>Urgent</p>
        </div>
        <div class="delete">
          <img src="assets/delete.svg">
          <p>Delete</p>
        </div>
      </div>
    </div>
  </div>`)
  cardTasks(newToDoList);
}

function cardTasks(newToDoList) {
  var tasksSection = document.querySelector(`.tasks-section[data-id="${newToDoList.id}"]`);
  for (var i = 0; i < newToDoList.tasks.length; i++) {
    tasksSection.innerHTML += `
    <div class="task">
      <img class="checkbox" src="assets/checkbox.svg">
      <p>${newToDoList.tasks[i].text}</p> 
    </div>
    `
  }
}
 
// DISPLAY FROM LOCAL STORAGE

function reinstantiateCard() {
  var instantiatedCards = [];
  for (var i = 0; i < tasksCards.length; i++) {
    var instantiatedTasks = [];
    for (var j = 0; j < tasksCards[i].tasks.length; j++) {
      var reinstantiatedTask = new Task(
        tasksCards[i].tasks[j].taskId,
        tasksCards[i].tasks[j].text,
        tasksCards[i].tasks[j].completed
      );
      instantiatedTasks.push(reinstantiatedTask);
    }
    var reinstantiatedToDoList = new ToDoList(
      tasksCards[i].id, 
      tasksCards[i].title, 
      tasksCards[i].urgent, 
      instantiatedTasks
    );
    instantiatedCards.push(reinstantiatedToDoList);
  }
  tasksCards = instantiatedCards;
  console.log(tasksCards)
}

function displayRetrievedCards(array) {
  for (var i = 0; i < array.length; i++) {
    cardDisplay.insertAdjacentHTML("afterbegin", `
    <div class="task-list-card">
      <div class="card-contents">
        <h3>${array[i].title}</h3>
        <div class="tasks-section">
          ${displayRetrievedTasks(array[i].tasks)}
        </div>
        <div class="card-icons">
          <div class="urgent">
            <img class="urgent-btn" src="assets/urgent.svg">
            <p>Urgent</p>
          </div>
          <div class="delete">
            <img src="assets/delete.svg">
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>`)
  }
}

function displayRetrievedTasks(array) {
  var singleTask = '';
  for (var i = 0; i < array.length; i++) {
    singleTask += `
    <div class="task">
      <img class="checkbox" src="assets/checkbox.svg">
      <p data-id="task-text">${array[i].text}</p> 
    </div>
    `
  }
  return singleTask
}

// CARD BUTTONS TOGGLE

var cardSection = document.querySelector('.masonry')
cardSection.addEventListener('click', cardBtnToggle)

function cardBtnToggle(event){
  checkTaskToggle(event);
  urgentBtnToggle(event)
}

function checkTaskToggle(event) {
  if (event.target.classList.contains('checkbox')){
    var taskCheckbox = event.target.closest('.task');
    taskCheckbox.classList.toggle('checked');
    if (event.target.src.match('assets/checkbox.svg')){
      event.target.src = 'assets/checkbox-active.svg'
    } else {
      event.target.src = 'assets/checkbox.svg';
    }
  }  
}

function urgentBtnToggle(event) {
  if (event.target.classList.contains('urgent-btn')){
    event.target.parentNode.parentNode.parentNode.firstElementChild.nextSibling.nextSibling.classList.toggle('urgentSelected');
    event.target.parentNode.parentNode.parentNode.parentNode.classList.toggle('urgentSelected');
    if (event.target.src.match('assets/urgent.svg')){
      event.target.src = 'assets/urgent-active.svg';
    } else {
      event.target.src = 'assets/urgent.svg'
    }
  }
}

// function deleteToDoList() {
//   for (var i = 0; i < currentTasks[i]; i++){
//     if (currentTasks[i].completed == true)
//   }
// }
