document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");
    const addTaskBtn = document.getElementById("add-task-btn");
    const openTasksCount = document.getElementById("open-tasks-count"); // Element zur Anzeige der offenen Aufgaben
    const doneTasksCount = document.getElementById("done-tasks-count")
    const canvas = document.getElementById("canvas");
    const exportTaskBtn = document.getElementById("export-task-btn");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Variable für offene Aufgaben
    let amountOpen = 0;
    let amountDone = 0;
    var x = null;
    var y = null;

    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);

    function onMouseUpdate(e) {
        x = e.pageX;
        y = e.pageY;
        //console.log(x, y);
    }

    function getMouseX() {
        return x;
    }

    function getMouseY() {
        return y;
    }

    // Aufgaben aus dem LocalStorage laden
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Anzahl offener Aufgaben berechnen
    tasks.forEach(task => {
        if (!task.completed) {
            amountOpen++;
            amountDone++;
        } else {
            amountDone++;
        }
        ;
        addTaskToDOM(task);
    });

    // Offene Aufgaben anzeigen
    updateOpenTasksCount();

    // Funktion zum Hinzufügen von Aufgaben (für Button und Enter-Taste)
    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === "") return;

        const task = {
            text: taskText,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        addTaskToDOM(task);

        // Offene Aufgabe hinzugefügt
        amountOpen++;
        updateOpenTasksCount();

        newTaskInput.value = "";
    }

    // Aufgabe per Button hinzufügen
    addTaskBtn.addEventListener("click", addTask);

    exportTaskBtn.addEventListener("click", exportTask);

    function exportTask() {
        navigator.clipboard.writeText(JSON.stringify(JSON.stringify(localStorage)));
    }

    // Aufgabe per Enter-Taste hinzufügen
    newTaskInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Aufgabe in DOM einfügen
    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.text}</span><div>
            <button class="edit-btn">Bearbeiten</button>
            <button class="delete-btn">Löschen</button></div>
        `;

        // Aufgabe als erledigt/unerledigt markieren
        li.addEventListener("click", function () {
            task.completed = !task.completed;
            li.classList.toggle("completed");
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // Offene Aufgaben aktualisieren
            if (task.completed) {
                amountOpen--;
            } else {
                amountOpen++;
            }

            updateOpenTasksCount();
        });

        // Aufgabe löschen
        li.querySelector(".delete-btn").addEventListener("click", function (e) {
            amountDone--;
            e.stopPropagation();
            tasks = tasks.filter(t => t !== task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskList.removeChild(li);

            // Offene Aufgaben aktualisieren
            if (!task.completed) {
                amountOpen--;
            }
            updateOpenTasksCount();
        });

        taskList.appendChild(li);
    }

    // Funktion zum Aktualisieren der Anzahl offener Aufgaben
    function updateOpenTasksCount() {
        openTasksCount.textContent = "Offene Aufgaben: " + amountOpen;
        doneTasksCount.textContent = Math.round(((amountDone - amountOpen) / amountDone * 100) * 10) / 10 + "% bearbeitet"
        console.log("AmoundDone" + amountDone);
    }
    const root = document.documentElement;
 
    document.addEventListener('mousemove', evt => {
        let x = evt.clientX / innerWidth;
        let y = evt.clientY / innerHeight;
     
        root.style.setProperty('--mouse-x', x);
        root.style.setProperty('--mouse-y', y);
    });



   

});

//------- Hintergrundanimation -------
/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const ball = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: 0,
    vy: 0,
    radius: 25,
    color: "blue",
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },
};

document.addEventListener('mousemove', function (e) {
    ball.x = e.pageX;
    ball.y = e.pageY;
})

function draw() {
    ctx.fillStyle = "rgb(240 240 240 / 30%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (
        ball.y + ball.vy > canvas.height - ball.radius ||
        ball.y + ball.vy < ball.radius
    ) {
        ball.vy = -ball.vy;
    }
    if (
        ball.x + ball.vx > canvas.width - ball.radius ||
        ball.x + ball.vx < ball.radius
    ) {
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}*/
/*
canvas.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});
*/
raf = window.requestAnimationFrame(draw);
//ball.draw();

window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

