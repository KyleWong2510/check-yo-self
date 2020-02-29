var taskTitleInput = document.querySelector('.task-title-input');
var taskInput = document.querySelector('.task-input');
var taskDisplay = document.querySelector('.task-display');
var createTaskBtn = document.querySelector('.create-task-btn');
var taskDisplay = document.querySelector('.task-display');
var taskList = document.getElementsByClassName('task-list');
var deleteTaskBtn = document.querySelector('.delete-task-btn');

createTaskBtn.addEventListener('click', displayTask);
taskDisplay.addEventListener('click', deleteTask);

var task = new Task();

var tasksCard = []; 
var toDoList = new ToDoList(tasksCard);

function displayTask() {
  if(taskInput.value !== ''){
    taskDisplay.innerHTML += `
    <div class="task-list">
      <img class="delete-task-btn" src="assets/delete.svg">
      <p class="task-list-item">${taskInput.value}</p>
    </div>`;
  }
  createTaskInstance();
  taskInput.value = '';

}; 

function createTaskInstance() {
  var newTask = new Task(`'${taskInput.value}'`);
}


function deleteTask(event) {
  console.log(event.target);
  if (event.target.classList.contains('delete-task-btn')){
    event.target.parentNode.remove();
  }
}