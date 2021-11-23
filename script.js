// Variables
const todoInput = document.querySelector("#add-todo-form input");
const todoButton = document.querySelector("#add-todo-form button");
const option = document.querySelector("#option");
const todoList = document.querySelector("#todo-list");

// Events
document.addEventListener('DOMContentLoaded', loadLocalStorage)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", completeTodo);
option.addEventListener("click", filterTodos);

// Functions
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value !== "") {
    // Div
    const div = document.createElement("div");
    div.classList.add("flex");

    // list item
    const listItem = document.createElement("li");
    listItem.innerText = todoInput.value;
    listItem.classList.add("list-item");
    div.appendChild(listItem);

    // Complete Button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    div.appendChild(completeButton);

    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    div.appendChild(trashButton);

    // Add div to todoList
    todoList.appendChild(div);
    // SavetoLocalStorage
    saveToLocalStorage(todoInput.value)
    todoInput.value = "";
  } else {
    alert("Input is Empty!");
  }
}

function completeTodo(event) {
  const target = event.target;
  const parent = target.parentElement;
  const todoListItem = parent.children[0]

  if (target.classList.contains("complete-button")) {
    parent.classList.toggle("complete");
  }

  if (target.classList.contains("trash-button")) {
    parent.classList.add("fall");
    parent.addEventListener("transitionend", (e) => {
      parent.remove();
      removeFromLocalStorage(todoListItem.innerText)
    });
  }
}

function filterTodos(event) {
  const todos = document.querySelectorAll("#todo-list div");

  switch (option.value) {
    case "all":
      todos.forEach((todo) => {
        todo.style.display = "flex";
      });
      break;
    case "completed":
      todos.forEach((todo) => {
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      });
      break;
    case "uncompleted":
      todos.forEach((todo) => {
        todo.classList.contains("complete")
          ? (todo.style.display = "none")
          : (todo.style.display = "flex");
      });
      break;
  }
}

// Local Storage Connection
function saveToLocalStorage(value) {
  let todos;
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  } else {
    todos = []
  }

  todos.push(value)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function removeFromLocalStorage(index) {
  let todos;
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  } else {
    todos = []
  }

  const removedTodo = todos.indexOf(index)
  todos.splice(removedTodo, 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function loadLocalStorage() {
  let todos;
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  } else {
    todos = []
  }

  todos.forEach(todo => {
    // Div
    const div = document.createElement("div");
    div.classList.add("flex");

    // list item
    const listItem = document.createElement("li");
    listItem.innerText = todo;
    listItem.classList.add("list-item");
    div.appendChild(listItem);

    // Complete Button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    div.appendChild(completeButton);

    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    div.appendChild(trashButton);

    // Add div to todoList
    todoList.appendChild(div);
    
  })
}