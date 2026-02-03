const apiUrl = '/api/items';

async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();
    renderItems(items);
}

async function addItem() {
    const title = document.getElementById('item-input').value;
    if (!title) return alert('Please enter a title');
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    });
    if (response.ok) {
        fetchItems();
        document.getElementById('item-input').value = '';
    }
}

async function updateItem(id, done) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({done})
    });
    fetchItems()
}

async function deleteItem(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchItems();
}

function renderItems(items) {
    const list = document.getElementById('item-list');
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.addEventListener('change', () => updateItem(item.id, checkbox.checked));
        li.appendChild(checkbox);

        const text = document.createTextNode(item.title);
        li.appendChild(text);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(item.id));
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

document.getElementById('add-item').addEventListener('click', addItem);
fetchItems();