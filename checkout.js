import { API } from "./api/api.js";


function loadSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = API.getProducts();
    const summaryContainer = document.getElementById("summary-container");
    const totalElement = document.getElementById("total");

    let total = 0;

    if (summaryContainer) {
        summaryContainer.innerHTML = ""; 
        cart.forEach(productId => {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                total += product.price;
                summaryContainer.innerHTML += `
                    <div class="d-flex justify-content-between">
                        <span>${product.name}</span>
                        <span>R$ ${product.price.toFixed(2)}</span>
                    </div>
                `;
            }
        });

        summaryContainer.innerHTML += `
            <hr>
            <div class="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>R$ ${total.toFixed(2)}</strong>
            </div>
        `;

        if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}


document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = API.getProducts();
    let itemsSummary = "";
    let total = 0;

    cart.forEach(productId => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            total += product.price;
            itemsSummary += `- ${product.name} (R$ ${product.price.toFixed(2)})\n`;
        }
    });

    alert(`Compra finalizada com sucesso!\n\nDetalhes:\nNome: ${name}\nCPF: ${cpf}\nEmail: ${email}\nEndereço: ${address}\nPagamento: ${paymentMethod}\n\nItens Comprados:\n${itemsSummary}\nValor Total: R$ ${total.toFixed(2)}\n\nUm e-mail de confirmação foi enviado para ${email}.`);

    localStorage.removeItem("cart");
    window.location.href = "index.html";
});


document.addEventListener("DOMContentLoaded", () => {
    loadSummary();
});