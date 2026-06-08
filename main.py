from fastapi import FastAPI
from pydantic import BaseModel

class Task(BaseModel):
    descr: str

app = FastAPI()

todo_list = []

@app.get("/tasks")
def read_list():
    id = 0
    for i in range(len(todo_list)):
        id += 1
        todo_list[i].update({"id": id})
    return todo_list

@app.post("/tasks")
def add_task(todo_task: Task):
    task = todo_task.descr
    todo_list.append({"id": 0, "descr": task, "completed": False})
    return {"msg": "Task added."}

@app.delete("/tasks/{id}")
def delete_task(id: int):
    for task in todo_list:
        if task["id"] == id:
            todo_list.remove(task)
            return {"msg": "Task removed."}
    return {"msg": "Task not found."}

@app.patch("/tasks/{id}")
def complete_task(id: int):
    for task in todo_list:
        if task["id"] == id:
            task["completed"] = not task["completed"]
            return {"msg": "Task completion status changed."}
    return {"msg": "Task not found."}