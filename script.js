let tasks = [];
let tasktime = [];

let pending = [];
let completed = [];
let completed_time = [];

const allBox = document.getElementById("All");

const add = () => {
    let taskInput = document.getElementById("task");
    let timeInput = document.getElementById("calender");

    let task = taskInput.value.trim();
    let time = timeInput.value.replace("T", ",");

    if (time !== "" && task !== "") {
        allBox.innerHTML += `<div class="task-box">
                                <div>
                                    <div>${task}</div>
                                    <div class="time-style">${time}</div>
                                </div>
                                <div>
                                    <button class="cancel" onclick="removetask(this)">X</button>
                                </div>
                            </div>`;
        tasks.push(task);
        tasktime.push(time);
        pending.push(task);
        taskInput.value = "";
        timeInput.value = "";
    } else {
        alert("No empty time or task are taken.");
    }
};

const removetask = (btn) => {
    const taskDiv = btn.closest(".task-box");
    if (taskDiv) {
        const taskText = taskDiv.querySelector("div > div").textContent.trim();
        const timeText = taskDiv.querySelector(".time-style").textContent.trim();

        completed.push(taskText);
        completed_time.push(timeText);

        const index = pending.indexOf(taskText);
        if (index !== -1) {
            pending.splice(index, 1);
            tasktime.splice(index, 1);
            tasks.splice(index, 1);
        }

        taskDiv.remove();
    }
};

const navigate = (event, type) => {
    event.preventDefault();

    document.querySelectorAll(".navigate a").forEach(a => a.classList.remove("active-tab"));
    event.target.classList.add("active-tab");

    document.getElementById("All").style.display = "none";
    document.querySelector(".Completed").style.display = "none";
    document.querySelector(".pending").style.display = "none";

    if (type === "All") {
        document.getElementById("All").style.display = "block";
    } else if (type === "completed") {
        const completedList = document.querySelector(".Completed");
        completedList.innerHTML = "";

        completed.forEach((task, i) => {
            completedList.innerHTML += `<div class="task-box">
                                            <div>
                                                <div>${task}</div>
                                                <div class="time-style">${completed_time[i]}</div>
                                            </div>
                                        </div>`;
        });

        completedList.style.display = "block";
    } else if (type === "pending") {
        const pendingList = document.querySelector(".pending");
        pendingList.innerHTML = "";

        pending.forEach((task, i) => {
            pendingList.innerHTML += `<div class="task-box">
                                            <div>
                                                <div>${task}</div>
                                                <div class="time-style">${tasktime[i]}</div>
                                            </div>
                                        </div>`;
        });

        pendingList.style.display = "block";
    }
};
