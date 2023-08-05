// VARIABLES
const groceryList = document.querySelector('#groceryList');
const groceryForm = document.querySelector('#groceryForm');

// retrieve from localStorage
const cart = JSON.parse(localStorage.getItem("groceries")) || []; 
for (let i = 0; i < cart.length; i++) {
    let newItem = document.createElement("li");
    newItem.innerText = cart[i].task;
    newItem.isCompleted = cart[i].isCompleted ? true : false;
    if (newItem.isCompleted) {
      newItem.style.textDecoration = "line-through";
    }
    newItem.classList.add("list-group-item");
    groceryList.appendChild(newItem);
  }
  groceryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newItem = document.createElement("li");
    let groceryValue = document.getElementById("item").value;
    newItem.innerText = groceryValue;
    newItem.isCompleted = false;
    groceryForm.reset();
    newItem.classList.add("list-group-item");
    groceryList.appendChild(newItem);
  
   // save to localStorage
cart.push({ task: newItem.innerText, isCompleted: false });
localStorage.setItem("groceries", JSON.stringify(cart));
  });

  groceryList.addEventListener("click", (event) => {
    let clickedListItem = event.target;
  
    if (!clickedListItem.isCompleted) {
        clickedListItem.style.textDecoration = "line-through";
        clickedListItem.isCompleted = true;
    } else {
        clickedListItem.style.textDecoration = "none";
        clickedListItem.isCompleted = false;
        localStorage.removeItem(JSON.stringify(clickedListItem));
        clickedListItem.innerText = '';
    }
  
    // breaks for duplicates - another option is to have dynamic IDs
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].task === clickedListItem.innerText) {
        cart[i].isCompleted = cart[i].isCompleted;
        localStorage.setItem("groceries", JSON.stringify(cart));
      }
    }
  });
