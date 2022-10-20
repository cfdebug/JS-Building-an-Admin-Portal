// Get Saved Book Inventory
async function mainAdmin() {

    let response = await fetch('https://safe-coast-45128.herokuapp.com/books')
    let books = await response.json()

    books.forEach(function(book){
        createList(book);

    })
}

// Create List Elements
let uList = document.createElement("ul")
let mainDiv = document.getElementById('root');
mainDiv.appendChild(uList);

// Add Books to List with an Input, Title, and Buttons
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
    saveBtn.addEventListener("click",function(){
        let options = { method: 'PUT', headers: {'Content-Type':'application/json'},body: JSON.stringify({'id':book.id, 'quantity':input.value})}
        fetch(`https://safe-coast-45128.herokuapp.com/books/${book.id}`,options);
    });
    deleteBtn.textContent = "Delete";
    deleteBtn.id = 'basic-addon2';
    deleteBtn.style.background = 'red';
    deleteBtn.addEventListener("click",function(){
        let options = { method: 'DELETE', headers: {'Content-Type':'application/json'},body: JSON.stringify({'id':book.id})}
        fetch(`https://safe-coast-45128.herokuapp.com/books/${book.id}`,options);
    });

    uList.appendChild(element);
    element.appendChild(input);
    element.appendChild(saveBtn);
    element.appendChild(deleteBtn);
}

// Add New Book Form
function addForm(){
    let header = document.createElement('h1');
    let title = document.createElement('input');
    let titleLbl = document.createElement('label');
    let desc = document.createElement('input');
    let descLbl = document.createElement('label');
    let img = document.createElement('input');
    let imgLbl = document.createElement('label');
    let addBook = document.createElement('button');

    header.textContent = 'Add a New Book';

    title.id = 'book-title';
    title.classList.add('form-control');
    title.style.marginBottom = '20px';

    titleLbl.setAttribute('for','#book-title')
    titleLbl.classList.add('form-label');
    titleLbl.textContent = "Book Title";

    desc.id = 'book-desc';
    desc.classList.add('form-control');
    desc.style.marginBottom = '20px';

    descLbl.setAttribute('for','#book-desc')
    descLbl.classList.add('form-label');
    descLbl.textContent = "Book Description";

    img.id = 'book-image';
    img.classList.add('form-control');

    imgLbl.setAttribute('for','#book-image')
    imgLbl.classList.add('form-label');
    imgLbl.textContent = "Book Image FileName";

    addBook.textContent = "Add Book";
    addBook.id = 'basic-addon2';
    addBook.addEventListener("click",function(){
        let options = { method: 'POST', headers: {'Content-Type':'application/json'},body: JSON.stringify({'title': title.value, 'year': new Date().getFullYear(), 'description': desc.value, 'quantity': 1, 'imageURL': `assets/${img.value}`})}
        fetch('https://safe-coast-45128.herokuapp.com/books',options);
    });

    document.body.append(header);
    document.body.append(titleLbl);
    document.body.append(title);
    document.body.append(descLbl);
    document.body.append(desc);
    document.body.append(imgLbl);
    document.body.append(img);
    document.body.append(addBook);
}

mainAdmin()
addForm()