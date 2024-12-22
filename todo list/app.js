const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const todoSearch = document.querySelector("#todoSearch");

let todos= [];

runEvents();


function runEvents() {
    form.addEventListener("submit", addTodo);
    // sayfa açıldığında veya yenilendiğinde bunu çalışır
    document.addEventListener("DOMContentLoaded", pageLoaded);
    // element silme
    secondCardBody.addEventListener("click", removeTodoToUI);  
    //tüm elementleri silme
    clearButton.addEventListener("click", clearTodos);
    //arama yapma
    todoSearch.addEventListener("keyup", filterTodos);
}
function filterTodos(e) {
    const aranandeger = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(aranandeger)) {
                todo.setAttribute("style", "display: block")
            } else {
                todo.setAttribute("style", "display: none !important")
            }
        });


    } else {
        showAlert("warning", "todo olmalı...");
    }
}
function clearTodos() {
    todoList.innerHTML = "";
    localStorage.removeItem("todos");
}
function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //storange dan silme
        removeTodoFromStorage(todo.textContent);
    }
}
function removeTodoFromStorage(removeTodo) {
    checkTodosFromStroge();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);

        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}
function pageLoaded() {
    checkTodosFromStroge();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });

}
function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        alert("lütfen bir değer giriniz");
        showAlert("warning","eklenemedi")
    } else {
        //Arayüze ekleme kodları
        addTodoToUI(inputText);
        //storage ekleme kodları
        addTodoToStorage(inputText);
        // uyarı alert i ekleme 
        showAlert("success", "todo Eklendi");
    }

    // F5 engelleme kodu
    e.preventDefault();
}
function addTodoToUI(newTodo) { 
    // eklenecek li elementini oluşturma
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;
    
    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    // sırasıyla elementleri birbirine bağlıyoruz ve en son eklenecek yeri seciyoruz (todoList)
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);


    // ekleme yaptıktan sonra inputu boşaltır
    addInput.value = "";
    

}
function addTodoToStorage(newTodo) {
    checkTodosFromStroge();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}

function checkTodosFromStroge() {
    
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type, message) { 
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2500);    

}