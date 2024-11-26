document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Capturar os dados do formulário
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Simular envio dos dados
    alert(`Compra finalizada com sucesso!\n\nDetalhes:\nNome: ${name}\nCPF: ${cpf}\nEmail: ${email}\nEndereço: ${address}\nPagamento: ${paymentMethod}\n\nUm e-mail de confirmação foi enviado para ${email}.`);
    
    // Limpar carrinho e redirecionar para a página inicial
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});
