window.onload = function () {
    generateCalendar();
}

currentDate = new Date(); //The Date function give me the current date in the timezone I'm in
let tasks = []; //A storage for the task

function generateCalendar() {
    const calendar = document.getElementById('calendar')
    calendar.innerHTML = ''; //Clear the board to get a new one
    const month = currentDate.getMonth(); //This one gives me the month
    const monthname = currentDate.toLocaleString('default',{month:"long"}) //Name of month
    const year = currentDate.getFullYear(); //This one gives me the year

    const firstDayofMonth = new Date(year, month, 1);
    const lastDayofMonth = new Date(year, month + 1, 0);

    const firstDayofWeek = firstDayofMonth.getDay();
    const totalDays = lastDayofMonth.getDate()

    for (let i = 0; i < firstDayofWeek; i++){
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    for (let day = 1; day <= totalDays; day++){
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        //In order to have a variable in the id or class then I need to use ` or "Grave" key
        daySquare.id = `day-${day}`;

        // Add tasks to the day square
        tasks.forEach(task => {
            const taskDate = task.date;
            if (taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year) {
                const taskElement = document.createElement("div");
                taskElement.className = "task";
                taskElement.textContent = task.description;
                // Right Click to Delete Task
                taskElement.addEventListener("contextmenu",function(event){
                    event.preventDefault();
                    deleteTask(taskElement);
                });
                // Left Click to Edit Task
                taskElement.addEventListener('click', function(){
                    editTask(taskElement);
                });
                daySquare.appendChild(taskElement);
            }
        });

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            daySquare.classList.add('today');
        }

        calendar.appendChild(daySquare);
    }

    const calendartitle = document.getElementById("year");
    calendartitle.textContent = `${monthname} ${year}`

    //Add transition
    setTimeout(() => {
        calendar.classList.add('transition');
    }, 100)

}

function nextmonth(){
    const calendar = document.getElementById('calendar');
    calendar.classList.remove('transition');

    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

function prevmonth(){
    const calendar = document.getElementById('calendar');
    calendar.classList.remove('transition');

    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function showAddTaskMode() {
    document.getElementById('addTaskMode').style.display = 'block'
}

function closeAddTaskMode() {
    document.getElementById('addTaskMode').style.display = 'none'
}

function addTask(){
    const taskDate = new Date(document.getElementById('task-date').value);
    const taskDesc = document.getElementById('task-desc').value.trim();

    //isNaN is the equivalent to a incorrect number variable
    if(taskDesc && !isNaN(taskDate.getDate())){
        //Add task to storage
        tasks.push({date: taskDate, description: taskDesc});
        //Refresh Calendar
        generateCalendar();
        closeAddTaskMode();
    } else {
        alert("Please enter a valid date and task description!");
    }
}

function deleteTask(taskElement){
    if (confirm("Are you sure you want to delete this task")){
        taskElement.parentNode.removeChild(taskElement);
        //Remove task from storage
        const index = tasks.findIndex(task => task.description === taskElement.textContent);
        if (index !== -1){
            tasks.splice(index, 1);
        }
    }
}

function editTask(taskElement){
    const newTaskDesc = prompt("Edit your task:", taskElement.textContent);
    if(newTaskDesc !== null && newTaskDesc.trim() !== ""){
        taskElement.textContent = newTaskDesc;
        //Update new description of task to the storage
        const index = tasks.findIndex(task => task.description === taskElement.textContent);
        if (index !== -1){
            tasks[index].description = newTaskDesc;
        }
    }
}