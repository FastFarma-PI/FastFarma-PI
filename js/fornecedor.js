// Regex usados
const regexCep = /^\d{5}-\d{3}$/;
const regexCel = /^\(\d{2}\)\s\d{5}-\d{4}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

// Máscaras
function mask(input, type) {
    let v = input.value.replace(/\D/g, "");

    if (type === "cep") {
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }

    else if (type === "cel") {
        v = v.replace(/(\d{2})(\d)/, "($1) $2");
        v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    else if (type === "cnpj") {
        v = v.replace(/(\d{2})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1/$2");
        v = v.replace(/(\d{4})(\d{2})$/, "$1-$2");
    }

    input.value = v;
}

// Ativa máscaras
function setupMasks() {
    const masks = {
        cep: "cep",
        celular: "cel",
        cnpj: "cnpj"
    };

    Object.keys(masks).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => mask(el, masks[id]));
        }
    });
}
setupMasks();

// Funções visuais
function fieldError(input, message) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    document.getElementById("erro-" + input.id).textContent = message;
}

function fieldValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    document.getElementById("erro-" + input.id).textContent = "";
}

// Validação principal
function validarCheckout() {
    let ok = true;

    function check(id, validFn, msg) {
        const el = document.getElementById(id);
        if (!validFn(el.value.trim())) {
            fieldError(el, msg);
            ok = false;
        } else {
            fieldValid(el);
        }
    }

    // texto simples
    check("nome", v => v.length > 1, "Informe o código.");
    check("sobrenome", v => v.length > 1, "Informe o nome fantasia.");
    check("endereco", v => v.length > 5, "Informe seu endereço.");
    check("complemento", v => v.length > 0, "Informe o complemento.");
    check("aniv", v => v !== "", "Informe a data de aniversário.");

    // regex
    check("cep", v => regexCep.test(v), "CEP inválido.");
    check("celular", v => regexCel.test(v), "Celular inválido.");
    check("email", v => regexEmail.test(v), "Email inválido.");

    // CNPJ opcional → só valida se usuário digitou algo
    const cnpjVal = document.getElementById("cnpj").value.trim();
    if (cnpjVal.length > 0) {
        check("cnpj", v => regexCNPJ.test(v), "CNPJ inválido.");
    }

    return ok;
}

// Botão
const btnFinalizar = document.getElementById("btnFinalizar");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", e => {
        e.preventDefault();
        if (validarCheckout()) {
            alert("Cadastro realizado com sucesso!");
            document.getElementById("checkoutForm").reset();
        }
    });
}
