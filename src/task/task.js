export class Task {
  constructor(
    taskId,
    projectId,
    title,
    dueDate,
    priority,
    description,
    notes,
    projectName,
    newTaskStatus,
  ) {
    this.projectId = projectId;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.notes = notes;
    this.projectName = projectName;
    this.status = newTaskStatus;
    this.id = String(taskId);
  }
}
