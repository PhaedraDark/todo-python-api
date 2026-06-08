from fastapi import FastAPI
from pydantic import BaseModel

class Task(BaseModel):
    descr: str
    completed: bool

app = FastAPI()

todo_list = []

@app.get("/tasks")
def read_list():
    return todo_list

@app.post("/tasks")
def add_task(todo_task: Task):
    task = todo_task.descr
    todo_list.append({"descr": task, "completed": False})
    return {"msg": "Task added."}

@app.delete("/tasks/{id}")
def delete_task(id: str):
    for task in todo_list:
        if task["descr"] == id:
            todo_list.remove(task)
            return {"msg": "Task removed."}
        
    return {"msg": "Task not found."}

@app.patch("/tasks/{id}")
def complete_task(descr: str):
    for task in todo_list:
        if task["descr"] == descr:
            task["completed"] = not task["completed"]

    return {"msg": "Task not found."}