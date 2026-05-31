const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countText = document.querySelector("#count");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filters button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

renderTodos();





// ADD TODO
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const text = input.value.trim();

    if(text === ""){
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    saveTodos();

    renderTodos();

    input.value = "";

});





// EVENT DELEGATION
todoList.addEventListener("click", (e) => {

    const li = e.target.closest(".todo-item");

    if(!li){
        return;
    }

    const id = Number(li.dataset.id);





    // DELETE
    if(e.target.classList.contains("delete-btn")){

        todos = todos.filter(todo => todo.id !== id);

    }





    // TOGGLE
    else if(e.target.classList.contains("todo-text")){

        todos = todos.map(todo => {

            if(todo.id === id){
                todo.completed = !todo.completed;
            }

            return todo;
        });
    }

    saveTodos();

    renderTodos();

});





// EDIT TODO
todoList.addEventListener("dblclick", (e) => {

    if(!e.target.classList.contains("todo-text")){
        return;
    }

    const li = e.target.closest(".todo-item");

    const id = Number(li.dataset.id);

    const todo = todos.find(todo => todo.id === id);





    const editInput = document.createElement("input");

    editInput.value = todo.text;

    li.innerHTML = "";

    li.appendChild(editInput);

    editInput.focus();





    editInput.addEventListener("keydown", (e) => {

        if(e.key === "Enter"){

            todo.text = editInput.value.trim();

            saveTodos();

            renderTodos();

        }

    });

});





// FILTER
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        renderTodos();

    });

});





// CLEAR COMPLETED
clearCompletedBtn.addEventListener("click", () => {

    todos = todos.filter(todo => !todo.completed);

    saveTodos();

    renderTodos();

});





// RENDER TODOS
function renderTodos(){

    todoList.innerHTML = "";





    let filteredTodos = todos;





    if(currentFilter === "active"){

        filteredTodos = todos.filter(todo => !todo.completed);

    }





    else if(currentFilter === "completed"){

        filteredTodos = todos.filter(todo => todo.completed);

    }





    filteredTodos.forEach(todo => {

        const li = document.createElement("li");

        li.classList.add("todo-item");

        li.dataset.id = todo.id;





        if(todo.completed){
            li.classList.add("completed");
        }





        const leftDiv = document.createElement("div");

        leftDiv.classList.add("todo-left");





        const span = document.createElement("span");

        span.classList.add("todo-text");

        span.textContent = todo.text;





        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "❌";

        deleteBtn.classList.add("delete-btn");





        leftDiv.appendChild(span);

        li.appendChild(leftDiv);

        li.appendChild(deleteBtn);





        todoList.appendChild(li);

    });





    updateCount();

}





// UPDATE COUNT
function updateCount(){

    const activeTodos = todos.filter(todo => !todo.completed);

    countText.textContent = `${activeTodos.length} items left`;

}





// SAVE LOCALSTORAGE
function saveTodos(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}