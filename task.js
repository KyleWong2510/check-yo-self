class Task {
  constructor(taskId, text, completed) {
    this.taskId = taskId;
    this.text = text;
    this.completed = completed || false;
  }
}