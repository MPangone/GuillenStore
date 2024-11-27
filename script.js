
let currentPage = window.location.pathname.split("/").pop();
const currentHash = window.location.hash;

const navLinks = {
    "index.html": "nav-home",
    "#produtos": "nav-produtos",
    "cart.html": "nav-carrinho",
    "contato.html": "nav-contato"
};

function clearActiveClasses() {
    Object.values(navLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove("active");
        }
    });
}

function updateActiveLink() {
    clearActiveClasses();

    if (currentHash && navLinks[currentHash]) {
        const activeLink = document.getElementById(navLinks[currentHash]);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    } else if (navLinks[currentPage]) {
        const activeLink = document.getElementById(navLinks[currentPage]);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
}

window.addEventListener("hashchange", () => {
    currentPage = window.location.pathname.split("/").pop();
    updateActiveLink();
});


updateActiveLink();


import { API } from "./api/api.js";


function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    window.location.href = "cart.html"; 
}


function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = API.getProducts();
    const cartContainer = document.getElementById("cart-container");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const finalizeButton = document.getElementById("finalizar-compra");

    let subtotal = 0;

    if (cartContainer) {
        cartContainer.innerHTML = ""; 

        cart.forEach(productId => {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                subtotal += product.price;
                const originalPrice = product.originalPrice || product.price; 
                const isDiscounted = originalPrice !== product.price;

                cartContainer.innerHTML += `
                <div class="col-md-12 mb-3">
                    <div class="card d-flex flex-row align-items-center">
                        <img src="/img/${product.id}.jpg" class="cart-img" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">
                                ${isDiscounted ? `<del>R$ ${originalPrice.toFixed(2)}</del>` : ""}
                                <strong>R$ ${product.price.toFixed(2)}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            }
        });

        if (subtotalElement) subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `R$ ${subtotal.toFixed(2)}`;

        if (finalizeButton) finalizeButton.disabled = cart.length === 0;

        if (finalizeButton) {
            finalizeButton.addEventListener("click", () => {
                window.location.href = "checkout.html"; 
            });
        }
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    alert("Carrinho limpo!");
    displayCart();
}

// Lógica de carregamento de produtos
document.addEventListener("DOMContentLoaded", () => {
    if (currentPage === "cart.html") {
        displayCart(); 
        const clearCartButton = document.getElementById("clear-cart");
        if (clearCartButton) {
            clearCartButton.addEventListener("click", clearCart);
        }
    } else {
        const products = API.getProducts();
        const productContainer = document.getElementById("produtos-container");
        if (productContainer) {
            productContainer.innerHTML = ""; 

            products.forEach(product => {
                const originalPrice = product.originalPrice || product.price; 
                const isDiscounted = originalPrice !== product.price;

                productContainer.innerHTML += `
                    <div class="col-md-4">
                        <div class="card product-card">
                            <img src="/img/${product.id}.jpg" class="card-img-top" alt="${product.name}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">
                                    ${isDiscounted ? `<del>R$ ${originalPrice.toFixed(2)}</del>` : ""}
                                    <strong>R$ ${product.price.toFixed(2)}</strong>
                                </p>
                                <button class="btn btn-outline-primary" onclick="addToCart(${product.id})">Comprar</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }
});

// Torna funções disponíveis globalmente
window.addToCart = addToCart;
