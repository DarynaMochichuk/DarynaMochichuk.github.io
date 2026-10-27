const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const sortSelect = document.getElementById('sortSelect');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Збереження у сховище та перерендер
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Форматування дати 
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

// Додавання нового завдання по Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        const newTask = {
            id: Date.now(),
            text: taskInput.value.trim(),
            completed: false,
            date: new Date().toISOString()
        };
        tasks.push(newTask);
        taskInput.value = '';
        saveAndRender();
    }
});

// Відображення завдань з урахуванням сортування/фільтрації
function renderTasks() {
    taskList.innerHTML = '';
    const filter = sortSelect.value;

    let filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) {
            li.classList.add('completed');
        }

        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';

        // Чекбокс 
        if (!task.completed) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                task.completed = true;
                saveAndRender();
            });
            taskInfo.appendChild(checkbox);
        }

        const spanText = document.createElement('span');
        spanText.className = 'task-text';
        spanText.textContent = task.text;
        taskInfo.appendChild(spanText);

        // Редагування по подвійному кліку
        spanText.addEventListener('dblclick', () => {
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.className = 'edit-input';
            inputEdit.value = task.text;

            li.replaceChild(inputEdit, taskInfo);
            inputEdit.focus();

            inputEdit.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (inputEdit.value.trim() !== '') {
                        task.text = inputEdit.value.trim();
                        saveAndRender();
                    }
                }
            });

            inputEdit.addEventListener('blur', () => {
                if (inputEdit.value.trim() !== '') {
                    task.text = inputEdit.value.trim();
                    saveAndRender();
                } else {
                    renderTasks();
                }
            });
        });

        li.appendChild(taskInfo);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        dateSpan.textContent = formatDate(task.date);
        li.appendChild(dateSpan);

        // Кнопка видалення (хрестик)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveAndRender();
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

sortSelect.addEventListener('change', renderTasks);

// Початкове завантаження
renderTasks();