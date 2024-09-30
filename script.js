let tasks = [];
let deletedTasks = [];

function addTask() {
    const taskInput = document.getElementById('task');
    const dateInput = document.getElementById('date');
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (task && date) {
        tasks.push({ task, date });
        taskInput.value = '';
        dateInput.value = '';
        taskInput.focus();
        renderTasks();
    } else {
        alert("Please enter both a task and a date.");
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((item, index) => {
        taskList.innerHTML += `
            <li>
                ${item.date} - ${item.task} 
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            </li>`;
    });
}

function renderDeletedTasks() {
    const deletedTaskList = document.getElementById('deletedTaskList');
    deletedTaskList.innerHTML = '';

    deletedTasks.forEach((item, index) => {
        deletedTaskList.innerHTML += `
            <li>
                ${item.date} - ${item.task} 
                <button onclick="restoreTask(${index})">Restore</button>
            </li>`;
    });
}

function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].task);
    const newDate = prompt("Edit your date:", tasks[index].date);
    if (newTask && newDate) {
        tasks[index] = { task: newTask, date: newDate };
        renderTasks();
    }
}

function deleteTask(index) {
    deletedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    renderTasks();
    renderDeletedTasks();
}

function restoreTask(index) {
    tasks.push(deletedTasks[index]);
    deletedTasks.splice(index, 1);
    renderTasks();
    renderDeletedTasks();
}

function updateTasks() {
    renderTasks();  // Refresh the displayed tasks
    alert("Task list updated!");  // Optional notification
}
