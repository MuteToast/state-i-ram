const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static('public'));

let items = [];
let idCounter = 1;

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.post('/api/items', (req, res) => {  
    const {title} = req.body;
    if (!title) {
        return res.status(400).json({error: 'Title is required'});
    }
    const newItem = {id: idCounter++, title, done: false};
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const {id} = req.params;
    const {title, done} = req.body;
    const item = items.find(i => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({error: 'Item not found'});
    }
    if (title !== undefined) item.title = title;
    if (done !== undefined) item.done = done;
    res.json(item);
});

app.delete('/api/items/:id', (req, res) => {
    const {id} = req.params;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({error: 'Item not found'});
    }
    items.splice(index, 1);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});