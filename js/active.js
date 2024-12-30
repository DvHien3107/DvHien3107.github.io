
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    
    const countForm = document.getElementById("count-form");
    const countInput = document.getElementById("count-input");
    const countDateInput = document.getElementById("count-date-input");
    const countList = document.getElementById("count-task-list");
    // const resetBtn = document.getElementById("reset-btn");
    const themeToggle = document.getElementById("theme-toggle");

    const defaultTasks = [
        // {
        //     id: 1,
        //     text: "Create a Pen",
        //     completed: false,
        //     progress: 0,
        //     dueDate: "2024-11-30"
        // },

        // {
        //     id: 2,
        //     text: "Train HTML, CSS and Javascript",
        //     completed: true,
        //     progress: 100,
        //     dueDate: "2024-12-05"
        // }
    ];

    let tasks = [...defaultTasks];
    let nextId = 1;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.className = `task-item${task.completed ? " completed" : ""}`;
            li.dataset.id = task.id;
            li.innerHTML = `
            <div class="task-header">
                <span class="drag-handle">☰</span>
                <span class="task-title">${task.text}</span>
                <div class="task-actions">
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>

            <div class="task-content">
                <div class="task-row">
                    <span class="task-label">Progress:</span>
                    <div class="progress-container">
                        <progress value="${task.progress}" max="100"></progress>
                        <span class="progress-value">${task.progress}%</span>
                    </div>
                </div>

                <div class="task-row due-date-row">
                    <input type="checkbox" ${task.completed ? "checked" : ""}>
                    <span class="task-label">Due Date:</span>
                    <input type="date" value="${task.dueDate || ""}">
                </div>
            </div>    
        `;

            const checkbox = li.querySelector('.due-date-row input[type="checkbox"]');
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                li.classList.toggle("completed", task.completed);
                saveTasks();
            });

            const dateInput = li.querySelector('input[type="date"]');
            dateInput.addEventListener("change", () => {
                task.dueDate = dateInput.value;
                saveTasks();
            });

            const progressBar = li.querySelector("progress");
            const progressValue = li.querySelector(".progress-value");
            progressBar.addEventListener("click", (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickPosition = e.clientX - rect.left;
                const progressPercentage = (clickPosition / rect.width) * 100;
                task.progress = Math.round(progressPercentage);
                progressBar.value = task.progress;
                progressValue.textContent = `${task.progress}%`;
                saveTasks();
            });

            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                tasks = tasks.filter((t) => t.id !== task.id);
                renderTasks();
                saveTasks();
            });

            taskList.appendChild(li);
        });

        //Enabling drag and drop functionality

        new Sortable(taskList, {
            animation: 150,
            handle: ".drag-handle",
            onEnd: function (evt) {
                const itemEl = evt.item;
                const newIndex = evt.newIndex;
                const oldIndex = evt.oldIndex;

                //Updating tasks array

                const [movedTask] = tasks.splice(oldIndex, 1);
                tasks.splice(newIndex, 0, movedTask);

                saveTasks();
            }
        });
    }

    function resetTasks() {
        tasks = [...defaultTasks];
        saveTasks();
        renderTasks();
    }

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({
                id: nextId++,
                text: taskText,
                completed: false,
                progress: 0,
                dueDate: ""
            });
            taskInput.value = "";
            renderTasks();
            saveTasks();
        }
    });

    // resetBtn.addEventListener("click", resetTasks);

    //Loading tasks from localStorage if available

    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        nextId = Math.max(...tasks.map((t) => t.id)) + 1;
    }


    //Time updated 

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
        $(".time").text(timeString||'Loading...');
    }

    updateTime();
    setInterval(updateTime, 1000);

    //Theme changing

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
        themeToggle.innerHTML = document.body.classList.contains("light-mode") ? '<ion-icon name="sunny-outline"></ion-icon>' : '<ion-icon name="moon-outline"></ion-icon>';
    })
    
    const loadTheme = () =>{
        const theme = localStorage.getItem("theme");
        if(theme === "light"){
            document.body.classList.add("light-mode");
            themeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
        }else{
            document.body.classList.add("dark-mode");

            themeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
        }
    }

    loadTheme();
    
    setTimeout(()=>{
        renderTasks();
        renderCounts();
    }, 1000);
    let nextCountId  = 1


    let counts = [];
    const savedCounts = localStorage.getItem("counts");
    if (savedCounts) {
        counts = JSON.parse(savedCounts);
        nextCountId = Math.max(...counts.map((t) => t.id)) + 1;
    }

    function saveCounts() {
        localStorage.setItem("counts", JSON.stringify(counts));
    }
    function renderCounts() {
        countList.innerHTML = "";
        counts.forEach((task) => {
            let dayMoment = moment(task.dueDate, 'yyyy-MM-DD');
            
            let diffday = moment().diff(dayMoment, 'days');
            const li = document.createElement("li");
            li.className = `task-item${task.completed ? " completed" : ""}`;
            li.dataset.id = task.id;
            li.innerHTML = `
            <div class="task-header">
                <span class="drag-handle"></span>
                <span class="task-title">${task.text}</span>
                <div class="task-actions">
                    <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>

            <div class="task-content">
                <div class="task-row">
                    <span class="task-label">Progress:</span>
                    <div class="progress-container">
                        <span class="progress-value">${diffday} Ngày</span>
                    </div>
                </div>

                <div class="due-date-row" style="margin-bottom: 10px;">
                    <span class="task-label">Date:</span>
                    <span class="task-label">${dayMoment.format('DD/MM/yyyy')}</span>
                </div>
            </div>       
        `;


            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                counts = counts.filter((t) => t.id !== task.id);
                renderCounts();
                saveCounts();
            });

            countList.appendChild(li);
        });

        //Enabling drag and drop functionality

        new Sortable(taskList, {
            animation: 150,
            handle: ".drag-handle",
            onEnd: function (evt) {
                const itemEl = evt.item;
                const newIndex = evt.newIndex;
                const oldIndex = evt.oldIndex;

                //Updating tasks array

                const [movedTask] = counts.splice(oldIndex, 1);
                counts.splice(newIndex, 0, movedTask);

                saveCounts();
            }
        });
    }

    countForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = countInput.value.trim();
        const countDate = countDateInput.value.trim();
        if (taskText) {
            counts.push({
                id: nextCountId++,
                text: taskText,
                completed: false,
                progress: 0,
                dueDate: countDate
            });
            countInput.value = "";
            renderCounts();
            saveCounts();
        }
    });