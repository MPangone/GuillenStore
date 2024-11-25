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


import { API } from "./api/api.js";

// Lógica de carregamento de produtos
document.addEventListener("DOMContentLoaded", () => {
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
                            <a href="cart.html" class="btn btn-outline-primary">Comprar</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }
});
