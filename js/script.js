let allProducts = [];

if (document.getElementById("products")) {
    fetchProducts();
}

if (document.getElementById("product-detail")) {
    loadProductDetail();
}

async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    allProducts = data;
    displayProducts(data);
}

function displayProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
        <div class="card" onclick="goToDetail(${product.id})">
            <img src="${product.image}">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
        </div>`;
    });
}

function goToDetail(id) {
    window.location.href = `product.html?id=${id}`;
}

async function loadProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    document.getElementById("product-detail").innerHTML = `
        <img src="${product.image}">
        <div>
            <h2>${product.title}</h2>
            <h3>$${product.price}</h3>
            <p>${product.description}</p>
            <p><b>Category:</b> ${product.category}</p>
        </div>
    `;
}

function filterProducts(category) {
    if (category === "all") {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(product =>
            product.category.toLowerCase().includes(category)
        );
        displayProducts(filtered);
    }
}

if (document.getElementById("featured-products")) {
    loadFeatured();
}

async function loadFeatured() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    const featured = data.slice(0, 4);

    const container = document.getElementById("featured-products");
    container.innerHTML = "";

    featured.forEach(product => {
        container.innerHTML += `
        <div class="card" onclick="goToDetail(${product.id})">
            <img src="${product.image}">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
        </div>`;
    });
}