let todoList = [];
let countText = document.getElementById("taskCount")
countText.textContent = "You have no tasks to do."

// functions & buttons
// fetch from GET /tasks
const baseUrl = "https://todo-python-api-zezw.onrender.com"
async function getList() {
    const response = await fetch(`${baseUrl}/tasks`);
    const json = await response.json();
    todoList = json;
    displayList()
}

// add using API
async function addAPI(task) {
    const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            descr: task.descr
        })
    })
}

async function deleteAPI(id) {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
}

async function patchAPI(id) {
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
}

getList()

// refresh the list to show changes & update text beneath
// also saves
function displayList() {
    let list = " ";
    let toBeDone = []

    for (let i = 0; i<todoList.length; i++) {
        if (i % 2 == 0 && !todoList[i].completed) {
        list += `<li data-index=${todoList[i].id}><span class="taskText"> ${todoList[i].descr}</span><button class="delete">Delete</button></li>`
        } else if (i % 2 == 0 && todoList[i].completed) {
        list += `<li data-index=${todoList[i].id}><span class="taskText completed"> ${todoList[i].descr}</span><button class="delete">Delete</button></li>`;
        toBeDone.push(todoList[i]); 
        } else if (todoList[i].completed) {
        list += `<li data-index=${todoList[i].id} class="odd"><span class="taskText completed"> ${todoList[i].descr}</span><button class="delete">Delete</button></li>`;
        toBeDone.push(todoList[i]); 
        } else {
        list += `<li data-index=${todoList[i].id} class="odd"><span class="taskText"> ${todoList[i].descr}</span><button class="delete">Delete</button></li>`
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
}


// add items to list via click or enter
let button = document.getElementById("addTask");
// add button clicked
button.addEventListener("click", function() {
    let taskInput = document.getElementById("newTask");
    let task = {
        descr: taskInput.value 
        }
        if (task.descr === "") {
            return;
        }
        addAPI(task); 
        getList();
})
// press enter in textbox
let newTask = document.getElementById("newTask");
newTask.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    let taskInput = document.getElementById("newTask");
    let task = {
        descr: taskInput.value 
        }
    if (task.descr === "") {
        return;
    }
    addAPI(task); 
    getList();
}
})

document.getElementById("todoList").addEventListener("click", function(event) {
    if (event.target.className.includes("delete")) {
        deleteAPI(event.target.parentElement.dataset.index);
    }
    if (event.target.className.includes("taskText")) {
        patchAPI(event.target.parentElement.dataset.index);
    }
    getList()
})

