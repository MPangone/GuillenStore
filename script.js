// Obter o nome do arquivo atual ou âncora
let currentPage = window.location.pathname.split("/").pop();
const currentHash = window.location.hash;

// Links do menu com IDs correspondentes
const navLinks = {
    "index.html": "nav-home",
    "#produtos": "nav-produtos",
    "cart.html": "nav-carrinho",
    "contato.html": "nav-contato"
};

// Função para remover a classe active de todos os links
function clearActiveClasses() {
    Object.values(navLinks).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove("active");
        }
    });
}

// Atualizar o estado do menu baseado na página atual ou âncora
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

// Evento para monitorar mudanças na URL (ao clicar em âncoras)
window.addEventListener("hashchange", () => {
    currentPage = window.location.pathname.split("/").pop();
    updateActiveLink();
});

// Atualizar o estado inicial do menu
updateActiveLink();

// Importa a API
import { API } from "./api/api.js";


// Função para adicionar produto ao carrinho
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId); // Adiciona o ID do produto
    localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o localStorage
    window.location.href = "cart.html"; // Redireciona para o carrinho
}

// Função para exibir itens no carrinho
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = API.getProducts();
    const cartContainer = document.getElementById("cart-container");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const finalizeButton = document.getElementById("finalizar-compra");

    let subtotal = 0;

    if (cartContainer) {
        cartContainer.innerHTML = ""; // Limpar carrinho

        cart.forEach(productId => {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                subtotal += product.price;
                cartContainer.innerHTML += `
                <div class="col-md-12 mb-3">
                    <div class="card d-flex flex-row align-items-center">
                        <img src="/img/${product.id}.jpg" class="cart-img" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">R$ ${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
            }
        });

        // Atualizar subtotal e total
        if (subtotalElement) subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `R$ ${subtotal.toFixed(2)}`;

        // Habilitar botão de finalizar compra se houver itens
        if (finalizeButton) finalizeButton.disabled = cart.length === 0;
    }
}

// Função para limpar o carrinho
function clearCart() {
    localStorage.removeItem("cart");
    alert("Carrinho limpo!");
    displayCart(); // Atualiza o carrinho dinamicamente
}

// Lógica de carregamento de produtos
document.addEventListener("DOMContentLoaded", () => {
    if (currentPage === "cart.html") {
        displayCart(); // Exibir itens no carrinho

        // Configurar botão de limpar carrinho
        const clearCartButton = document.getElementById("clear-cart");
        if (clearCartButton) {
            clearCartButton.addEventListener("click", clearCart);
        }
    } else {
        const products = API.getProducts();
        const productContainer = document.getElementById("produtos-container");
        if (productContainer) {
            productContainer.innerHTML = ""; // Limpar container

            products.forEach(product => {
                productContainer.innerHTML += `
                    <div class="col-md-4">
                        <div class="card product-card">
                            <img src="/img/${product.id}.jpg" class="card-img-top" alt="${product.name}">
                            <div class="card-body text-center">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">R$ ${product.price.toFixed(2)}</p>
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