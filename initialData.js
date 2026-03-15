// ==================== Initial Data ====================

const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description: "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description: "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description: "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

let allTasks = [...initialTasks];

// ==================== Constants ====================

const MAX_NEW_TASKS = 3;
const VALID_STATUSES = ['todo', 'doing', 'done'];
const COLUMNS = [
  { id: 'todo', title: 'TO DO', color: '#4CB3E6' },
  { id: 'doing', title: 'DOING', color: '#635FC7' },
  { id: 'done', title: 'DONE', color: '#3ECF8E' }
];

let currentTask = null;

// ==================== Functions ====================

function getNextId() {
    if (allTasks.length === 0) {
        return 1;
    }
    const lastTask = allTasks[allTasks.length - 1];
    return lastTask.id + 1;
}

function validateStatus(status) {
    const normalizedStatus = status.toLowerCase().trim();
    return VALID_STATUSES.includes(normalizedStatus);
}

function getTaskFromUser(taskNumber) {
    let title = prompt(`Enter task ${taskNumber} title:`);
    let description = prompt(`Enter task ${taskNumber} description:`);
    let status = prompt(`Enter task ${taskNumber} status (todo, doing, or done):`);
    
    while (!validateStatus(status)) {
        alert("Invalid status. Please enter 'todo', 'doing', or 'done'.");
        status = prompt(`Enter task ${taskNumber} status (todo, doing, or done):`);
    }
    
    return {
        id: getNextId(),
        title: title,
        description: description,
        status: status.toLowerCase().trim()
    };
}

function getCompletedTasks() {
    return allTasks.filter(task => task.status === 'done');
}

function logAllTasks() {
    console.log('All tasks:');
    console.log(allTasks);
}

function logCompletedTasks() {
    const completedTasks = getCompletedTasks();
    console.log('Completed tasks:');
    console.log(completedTasks);
}

function getTasksByStatus(status) {
    return allTasks.filter(task => task.status === status);
}

function createTaskCard(task) {
    const card = document.createElement('article');
    card.className = 'card bg-panel rounded-[12px] p-3 shadow-card text-[13px] leading-[23px] font-bold';
    card.textContent = task.title;
    card.dataset.taskId = task.id;
    card.addEventListener('click', () => openTaskModal(task));
    return card;
}

function createColumn(column, tasks) {
    const columnDiv = document.createElement('div');
    columnDiv.className = 'col-fixed mb-6 md:mb-0';
    
    const header = document.createElement('div');
    header.className = 'flex items-center gap-3 mb-4';
    
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.style.background = column.color;
    
    const title = document.createElement('h4');
    title.className = 'text-[12px] font-semibold leading-[15px]';
    title.textContent = column.title;
    
    const count = document.createElement('span');
    count.className = 'text-[13px] text-muted opacity-80';
    count.textContent = `(${tasks.length})`;
    
    header.appendChild(dot);
    header.appendChild(title);
    header.appendChild(count);
    
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'flex flex-col gap-4';
    
    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        tasksContainer.appendChild(taskCard);
    });
    
    columnDiv.appendChild(header);
    columnDiv.appendChild(tasksContainer);
    
    return columnDiv;
}

function renderBoard() {
    const container = document.getElementById('boardContainer');
    container.innerHTML = '';
    
    COLUMNS.forEach(column => {
        const tasks = getTasksByStatus(column.id);
        const columnElement = createColumn(column, tasks);
        container.appendChild(columnElement);
    });
}

function openTaskModal(task) {
    currentTask = task;
    const modal = document.getElementById('modalBackdrop');
    const titleInput = document.getElementById('taskTitle');
    const descriptionInput = document.getElementById('taskDescription');
    const statusSelect = document.getElementById('taskStatus');
    
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    statusSelect.value = task.status;
    
    modal.classList.add('active');
    setTimeout(() => titleInput.focus(), 100);
}

function closeTaskModal() {
    const modal = document.getElementById('modalBackdrop');
    modal.classList.remove('active');
    currentTask = null;
}

function handleTaskSubmit(event) {
    event.preventDefault();
    
    if (!currentTask) return;
    
    const titleInput = document.getElementById('taskTitle');
    const descriptionInput = document.getElementById('taskDescription');
    const statusSelect = document.getElementById('taskStatus');
    
    currentTask.title = titleInput.value;
    currentTask.description = descriptionInput.value;
    const oldStatus = currentTask.status;
    currentTask.status = statusSelect.value;
    
    if (oldStatus !== currentTask.status) {
        renderBoard();
    } else {
        const card = document.querySelector(`[data-task-id="${currentTask.id}"]`);
        if (card) {
            card.textContent = currentTask.title;
        }
    }
    
    closeTaskModal();
}

function init() {
    renderBoard();
    
    const closeButton = document.getElementById('closeButton');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const taskForm = document.getElementById('taskForm');
    
    closeButton.addEventListener('click', closeTaskModal);
    
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            closeTaskModal();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalBackdrop.classList.contains('active')) {
            closeTaskModal();
        }
    });
    
    taskForm.addEventListener('submit', handleTaskSubmit);
    
    logAllTasks();
    logCompletedTasks();
}

// ==================== Start ====================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
