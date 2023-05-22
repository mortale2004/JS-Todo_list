// *****************************************************************************
// Selectors
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const ul = document.getElementById("listContainer").firstElementChild;
const saveAll = document.getElementById("saveAll");
const deleteAll = document.getElementById("deleleAll")
let arr = [];



// *****************************************************************************
// Functions

// 1. To edit the text inside the item
const editFunc = (e)=>{
    // changes save button to edit button
    if (e.innerText=="Save")
    {
        e.innerText = "Edit";
        e.classList.replace("btn-success", "btn-warning")
        let newElem = document.createElement("p");
        newElem.innerText = e.previousElementSibling.value;
        e.parentElement.replaceChild(newElem, e.previousElementSibling);
        showMessage(`${e.previousElementSibling.innerText} is Saved`, "success")
    }   // changes edit button to save button
    else if (e.innerText == "Edit")
    {
        
        showMessage( `${e.previousElementSibling.innerText} is Edited`, "warning")
        e.innerText = "Save";
        e.classList.replace("btn-warning", "btn-success")
        let newElem = document.createElement("input");
        newElem.type = "text";
        newElem.value = e.previousElementSibling.innerText;
        e.parentElement.replaceChild(newElem, e.previousElementSibling);
    }
    
}



// 2. To show or remove nothing here when there is no any item in itemscontainer
const nothingHere = ()=>{ 
    const ul = document.getElementById("listContainer").firstElementChild;
    // if there is no any child element in the ul tag then nothing here text is added inside h1 tag.
    if (ul.childElementCount==0)
    {
        ul.innerHTML = `
        <h1> Nothing Here. Plase Add Something..</h1>
        `
    } // if there is child element is present in ul tag then nothing here is removed
    else
    {
        if (ul.firstElementChild.innerText == "Nothing Here. Plase Add Something..")
        ul.firstElementChild.remove();
        
    }
}

// 3. Delete button to delete an item
const deleteItem = (deleteBtn)=>{

    // Delete the element when delete button is clicked
    deleteBtn.parentElement.remove();

    // shows the message that item is deleted
    showMessage(`${deleteBtn.previousElementSibling.previousElementSibling.innerText} is deleted`, "danger")

    // calls the function nothingHere() to check how many items left in ul tag
    nothingHere();
}


// 4. To add a new item
const addItem = (items)=>{

    // if localstorage has nothing then newly created item is added.
    if (items == null)
    {
        const elem = document.createElement("li");
        elem.innerHTML = `
        <p>${input.value}</p>
        <button class="editBtn btn btn-warning mx-1" onclick="editFunc(this)">Edit</button>
        <button class="deleteBtn btn btn-danger mx-1" onclick="deleteItem(this)">Delete</button>
        `
        ul.appendChild(elem);
        showMessage(`${input.value} item is created`, "primary")
        input.value = "";
    }// when local storage have items then this items are added in the document
    else
    {
        items = JSON.parse(items)
        items.forEach((e)=>{
        const elem = document.createElement("li");
        elem.innerHTML = `
        <p>${e}</p>
        <button class="editBtn btn btn-warning mx-1" onclick="editFunc(this)">Edit</button>
        <button class="deleteBtn btn btn-danger mx-1" onclick="deleteItem(this)">Delete</button>
        `
        ul.appendChild(elem);
    })
}    // End of adding Logic
    
   // If new item is added then nothing here is removed from the document
    nothingHere();

}

// 5. To show the message
const showMessage = (message, color) =>{
    let div = document.getElementsByClassName("alert")[0];
    div.className =  `alert alert-${color} alert-dismissible fade show w-75 mx-3`;
    div.innerHTML = `
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    `
    
    // If clicked on close button then alert is closed
    div.lastElementChild.addEventListener("click", ()=>{
        div.classList.remove("show");
    })

    // alert is closed automatically after 4 seconds 
    setTimeout(()=>{
        div.classList.add("invisible");
    },4000)
    
}



// 6. To add items in local storage
const setItem = ()=>{
    // All data in items is collected in array and set into localstorage
    let allParas = Array.from(ul.querySelectorAll("li p"))
    allParas.forEach((para)=>{
        arr.push(para.innerText);
    })
    localStorage.setItem("items", JSON.stringify(arr))
}

// 7. To delete all items in localstorage
const delItem = ()=>{
    // Deletes all items when clicked on delete all
    if (confirm("Are your sure to delete all?"))
    {
        localStorage.clear();
        ul.innerHTML = ""
        nothingHere();
    }

} 


// *****************************************************************************
// Event Listeners

//add new item when clicked on add button
addBtn.addEventListener("click", addItem);
// add new item when pressed key Enter
window.addEventListener("keydown", (e)=>{
    if (e.key==="Enter")
    addItem();
})


//  to save all items localstorage
saveAll.addEventListener("click", setItem);

// to delete all items in the localstorage and webpage 
deleteAll.addEventListener("click", delItem);
// First calling of function


//  If locastorage have nothing then nothing here text is shown
if (localStorage.getItem("items") == null)
{
    nothingHere();
}
else // If localstorage have something then this items are added on webpage.
{
    let items = localStorage.getItem("items")
    addItem(items);
}

