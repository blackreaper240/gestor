document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const editId = document.getElementById('editId').value;

    if (title === '') return alert('Escribe un título');

    if (editId) {
        updateTask(editId, title, desc);
    } else {
        const task = {
            id: Date.now(),
            title: title,
            desc: desc
        };
        saveTask(task);
        renderTask(task);
    }

    resetForm();
}

function renderTask(task) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.setAttribute('data-id', task.id);

    li.innerHTML = `
        <div class="task-info">
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
        </div>
        <div class="buttons">
            <button class="btn-edit" onclick="editTask(${task.id})">Editar</button>
            <button class="btn-delete" onclick="deleteTask(${task.id})">Borrar</button>
        </div>
    `;
    list.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.id === id);

    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('editId').value = task.id;
    document.getElementById('btnMain').innerText = "Guardar Cambios";
}

function updateTask(id, title, desc) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(t => {
        if (t.id == id) {
            return { ...t, title: title, desc: desc };
        }
        return t;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    document.getElementById('taskList').innerHTML = '';
    getTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    document.querySelector(`[data-id="${id}"]`).remove();
}

function resetForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('editId').value = '';
    document.getElementById('btnMain').innerText = "Agregar Tarea";
}