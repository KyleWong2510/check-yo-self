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
  };

  deleteFromStorage() {
    // localStorage.removeItem(`'${this.id}'`);
  };

  updateToDo() {

  };

  updateTask() {

  };
}