let todoList = [];
if (localStorage.getItem("myTodoList") !== null) {
    todoList = JSON.parse(localStorage.getItem("myTodoList"));
    }
let countText = document.getElementById("taskCount")
countText.textContent = "You have no tasks to do."
displayList()

// refresh the list to show changes & update text beneath
// also saves
function displayList() {
    let list = " ";
    let toBeDone = []

    for (let i = 0; i<todoList.length; i++) {
        if (i % 2 == 0 && !todoList[i].completed) {
        list += `<li data-index=${i}><span class="taskText"> ${todoList[i].text}</span><button class="delete">Delete</button></li>`
        } else if (i % 2 == 0 && todoList[i].completed) {
        list += `<li data-index=${i}><span class="taskText completed"> ${todoList[i].text}</span><button class="delete">Delete</button></li>`;
        toBeDone.push(todoList[i]); 
        } else if (todoList[i].completed) {
        list += `<li data-index=${i} class="odd"><span class="taskText completed"> ${todoList[i].text}</span><button class="delete">Delete</button></li>`;
        toBeDone.push(todoList[i]); 
        } else {
        list += `<li data-index=${i} class="odd"><span class="taskText"> ${todoList[i].text}</span><button class="delete">Delete</button></li>`
        }
        }
    document.getElementById("todoList").innerHTML = list;
    
    if (todoList.length - toBeDone.length == 0) {
        countText.textContent = "You have no tasks to do."
    } else if (todoList.length - toBeDone.length == 1) {
        countText.textContent = "You have 1 task to do."
    } else {
        countText.textContent = `You have ${todoList.length - toBeDone.length} tasks to do.`
    }

    document.getElementById("newTask").value = "";

    localStorage.setItem("myTodoList", JSON.stringify(todoList));
}


// add items to list via click or enter
let button = document.getElementById("addTask");
// add button clicked
button.addEventListener("click", function() {
    let taskInput = document.getElementById("newTask");
    let task = {
        text: taskInput.value, 
        completed: false
    }
    if (task.text === "") {
        return;
    }
    todoList.push(task); 

    displayList();
})
// press enter in textbox
let newTask = document.getElementById("newTask");
newTask.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    let taskInput = document.getElementById("newTask");
    let task = {
        text: taskInput.value, 
        completed: false
    }
    if (task.text === "") {
        return;
    }
    todoList.push(task); 

    displayList();
}
})

document.getElementById("todoList").addEventListener("click", function(event) {
    if (event.target.className.includes("delete")) {
        event.target.parentElement.remove();
        todoList.splice(event.target.parentElement.dataset.index, 1);
        displayList();
    }
    if (event.target.className.includes("taskText")) {
        todoList[event.target.parentElement.dataset.index].completed = !todoList[event.target.parentElement.dataset.index].completed;    
        displayList();
    }
})

