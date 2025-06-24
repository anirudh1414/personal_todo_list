document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById('todo-input');
    const addtaskbtn = document.getElementById('add-task-btn');
    const todolist = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));

    addtaskbtn.addEventListener('click', () => {
        const tasktext = todoinput.value.trim();
        if (tasktext === "") return;

        const newTask = {
            id: Date.now(),
            text: tasktext,
            completed: false
        };
        tasks.push(newTask);
        todoinput.value = "";
        saveTasks();
        renderTask(newTask);
    });

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('task-id', task.id);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>
        `;

        // Toggle completion
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        // Delete task
        li.querySelector('button').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            li.remove();
        });

        todolist.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
