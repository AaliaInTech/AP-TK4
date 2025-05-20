// script.js

// --- To-Do App Logic ---
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
taskList.innerHTML = '';
tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">❌</button>`;
    taskList.appendChild(li);
});
}

function addTask() {
const task = taskInput.value.trim();
if (task === '') return;
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
taskInput.value = '';
loadTasks();
}

function deleteTask(index) {
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.splice(index, 1);
localStorage.setItem('tasks', JSON.stringify(tasks));
loadTasks();
}

loadTasks();

// --- Product Listing Logic ---
const products = [
{ name: 'Lip Gloss', category: 'beauty', price: 10, rating: 4.5 },
{ name: 'Wireless Earbuds', category: 'tech', price: 50, rating: 4.8 },
{ name: 'Face Mask', category: 'beauty', price: 5, rating: 4.0 },
{ name: 'Smartwatch', category: 'tech', price: 99, rating: 4.6 }
];

function displayProducts(productList) {
const productGrid = document.getElementById('productGrid');
productGrid.innerHTML = '';
productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
    <h4>${product.name}</h4>
    <p>Category: ${product.category}</p>
    <p>Price: $${product.price}</p>
    <p>Rating: ⭐${product.rating}</p>
    `;
    productGrid.appendChild(card);
});
}

function filterProducts() {
const filter = document.getElementById('categoryFilter').value;
const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
displayProducts(filtered);
}

function sortProducts() {
const sort = document.getElementById('sortOption').value;
const sorted = [...products];
sorted.sort((a, b) => sort === 'rating' ? b.rating - a.rating : a.price - b.price);
displayProducts(sorted);
}

displayProducts(products);

// --- Light/Dark Mode Toggle ---
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌙';
themeToggle.id = 'themeToggle';
document.body.appendChild(themeToggle);

const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);

themeToggle.addEventListener('click', () => {
const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
document.body.classList.remove('light', 'dark');
document.body.classList.add(newTheme);
localStorage.setItem('theme', newTheme);
themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});
