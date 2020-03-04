class ToDoList {
  constructor(id, title, urgent, tasks) {
    this.id = id;
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = tasks;
  };

  saveToStorage(array) {
    localStorage.setItem('list', JSON.stringify(array)); 

  };

  retrieveFromStorage() {
    var parsedTasks = JSON.parse(localStorage.getItem('list'));
    displayRetrievedCards(parsedTasks);
    tasksCards = parsedTasks;
    reinstantiateCard();
  };

  deleteFromStorage() {
    // localStorage.removeItem(`'${this.id}'`);
  };

  updateToDo() {
    this.tasks[i].completed = true;
  };

  updateTask(taskID) {
    var completedTask = this.tasks.find(task=>task.taskId == taskID)
    completedTask.completed = !completedTask.completed;
    this.saveToStorage(tasksCards)
  };
}