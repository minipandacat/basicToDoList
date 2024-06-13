// const inputBox = document.getElementById(".input_Box");
/*
    Errored because .input_Box is a class not an id
*/
const inputBox = document.getElementById("input_Box");
const listContainer = document.getElementById("listContainer");
const completedCounter = document.getElementById("completedCounter");
const uncompletedCounter = document.getElementById("unfinishedCounter");

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
  
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
  }


// Add task to list
function addTodo() {
    
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please enter a task");
        console.log("No task entered");

        return;
    }

    // Get date and time
    const nowDate = new Date();
    const formatDate = nowDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const nowTime = nowDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   
    // Create li element
    const li = document.createElement("li");
    // Add task to li element
    li.innerHTML = `
        
        <label>
        
            <input type="checkbox">             
            <span>${task}</span>
            <span class="nowDate">${formatDate}</span>
            <span class="nowTime">${nowTime}</span>
        </label>
        
        <span class="editBtn">Edit</span>
        <span class="deleteBtn">Delete</span>
    `;
    
    // Append to list
    listContainer.appendChild(li);

    // Clear input
    inputBox.value = " ";
   
    // Add event listeners
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".editBtn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".deleteBtn");
    
    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);

        updateCounters();
    });

    editBtn.addEventListener("click", function() {
        const updateTask = prompt("Edit task", taskSpan.textContent);
        if (updateTask !== null) {
            taskSpan.textContent = update;

            //removes the completed class if the task is edited to an incomplete task
            li.classList.remove("completed");
             
            //updates the counters
            checkbox.checked = false;
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", function() {
        if(confirm("Are you sure you want to delete this task?")) {
            li.remove(); 
            updateCounters();
        }
    });

    updateCounters();
}

// add task when pressing Enter key
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});


