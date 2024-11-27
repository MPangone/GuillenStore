const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", () => {
    let cpf = cpfInput.value.replace(/\D/g, ""); 

    if (cpf.length > 11) {
        cpf = cpf.slice(0, 11);
    }


    if (cpf.length > 3) {
        cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2");
    }
    if (cpf.length > 6) {
        cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    }
    if (cpf.length > 9) {
        cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    }

    cpfInput.value = cpf;
});

const form = document.getElementById("checkout-form");
form.addEventListener("submit", (event) => {
    const cpf = cpfInput.value.replace(/\D/g, ""); 

    if (cpf.length !== 11) {
        alert("O CPF deve conter exatamente 11 números.");
        event.preventDefault(); 
    }
});
