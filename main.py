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
    return "Task added"