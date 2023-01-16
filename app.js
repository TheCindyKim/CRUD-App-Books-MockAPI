const tbData = document.getElementById('tableData');
const addBook = document.getElementById('form-id');
const bookT = document.getElementById('bookTitle');
const bookP = document.getElementById('bookPurchased');
const bookA = document.getElementById('bookAuthor');
const submitBtn = document.querySelector('.btn');

let output = '';

// URL is pulled from Mockapi.io
const url = 'https://63af68ad649c73f572bb3926.mockapi.io/Week12FinalProject_API/books';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <tr>
            
                <td data-id=${post.id} class="title-value">${post.bookName}</td>
                <td data-id=${post.id} class="purchase-value">${post.purchased}</td>
                <td data-id=${post.id} class="author-value">${post.author}</td>
                <td data-id=${post.id}><button class="btn btn-light" id="edit-button">Edit</button></td>	
                <td data-id=${post.id}><button class="btn btn-light" id="delete-button">Delete</button></td>	
            
        </tr>`;
    });

    tbData.innerHTML = output;
}

// GET - Read the post
// Method: GET
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

// EDIT & DELETE
tbData.addEventListener('click', (e) => {
    e.preventDefault();
    let deleteBtn = e.target.id =='delete-button';
    let editBtn = e.target.id =='edit-button';

    let id = e.target.parentElement.dataset.id;

// Delete - remove existing post
// Method: DELETE
    if(deleteBtn) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if(editBtn) {
        const editBook = e.target.parentElement;
        let valueTitle = editBook.querySelector('.title-value').innerHTML;
        let valuePurchased = editBook.querySelector('.purchase-value').innerHTML;
        let valueAuthor = editBook.querySelector('.author-value').innerHTML;
        
        bookT.value = valueTitle;
        bookP.value = valuePurchased;
        bookA.value = valueAuthor;
    }

// Update - update the existing book data
// Method: 'PUT'
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookName: bookT.value,
                purchased: bookP.value,
                author: bookA.value,
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })
});

// Create - Insert new post
// Method: POST
addBook.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            bookName: bookT.value,
            purchased: bookP.value,
            author: bookA.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })

    // Input values to empty after submit
        bookT.value = '';
        bookP.value = '';
        bookA.value = '';
})