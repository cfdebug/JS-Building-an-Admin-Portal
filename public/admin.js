
// Your Code Here
async function main() {

    let response = await fetch('http://127.0.0.1:3001/listBooks')
    let books = await response.json()

    books.forEach(function(book){
        createList(book);

    })
}

let uList = document.createElement("ul")
let mainDiv = document.getElementById('root');
mainDiv.appendChild(uList);

function createList(book){
    let element = document.createElement("li");
    let input = document.createElement('input');
    let saveBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    element.textContent = book.title;
    element.id = book.id;
    element.classList.add('form-label');
    input.value = book.quantity;
    input.classList.add('form-control');
    saveBtn.textContent = "Save";
    saveBtn.id = 'basic-addon2';
    saveBtn.addEventListener("click",function(quantity){
        let options = { method: 'PATCH', headers: {'Content-Type':'application/json'},body: JSON.stringify({'id':book.id, 'quantity':input.value})}
        fetch('http://127.0.0.1:3001/updateBook',options);
    });
    deleteBtn.textContent = "Delete";
    deleteBtn.id = 'basic-addon2';
    deleteBtn.style.background = 'red';
    deleteBtn.addEventListener("click",function(quantity){
        let options = { method: 'DELETE', headers: {'Content-Type':'application/json'},body: JSON.stringify({'id':book.id})}
        fetch(`http://127.0.0.1:3001/removeBook/${book.id}`,options);
    });

    uList.appendChild(element);
    element.appendChild(input);
    element.appendChild(saveBtn);
    element.appendChild(deleteBtn);
}

main()