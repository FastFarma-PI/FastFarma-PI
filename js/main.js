(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm');
        }
    });

    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 0,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    // ProductList carousel
    $(".productList-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{ items:1 },
            576:{ items:1 },
            768:{ items:2 },
            992:{ items:2 },
            1200:{ items:3 }
        }
    });

    // ProductList categories carousel
    $(".productImg-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        items: 1,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    // Single Products carousel
    $(".single-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        dotsData: true,
        loop: true,
        items: 1,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    // Related carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{ items:1 },
            576:{ items:1 },
            768:{ items:2 },
            992:{ items:3 },
            1200:{ items:4 }
        }
    });

    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        var newVal = button.hasClass('btn-plus')
            ? parseFloat(oldValue) + 1
            : Math.max(parseFloat(oldValue) - 1, 0);

        button.parent().parent().find('input').val(newVal);
    });

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);

/*
    VALIDAÇÕES CHECKOUT
*/

// Regex
const regexCep = /^\d{5}-\d{3}$/;
const regexCel = /^\(\d{2}\)\s\d{5}-\d{4}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCartao = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
const regexValidade = /^(0[1-9]|1[0-2])\/\d{2}$/;
const regexCVV = /^\d{3}$/;

// Validações
function validarData(valor) {
    if (valor == "") return false;

    // Converte a data (o T00:00:00 corrige o dia errado)
    let aniversario = new Date(valor + "T00:00:00");
    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Calcula a data limite (18 anos atrás)
    let dataLimite = new Date();
    dataLimite.setFullYear(hoje.getFullYear() - 18);
    dataLimite.setHours(0, 0, 0, 0);

    // Se o aniversário for depois do limite, é menor de idade
    if (aniversario > dataLimite) {
        return false;
    }
    return true;
}

function validarCPF(cpf) {
   var ok = 1;
   var add;
   if (cpf != "") {
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf.length != 11 ||
         cpf == "00000000000" ||
         cpf == "11111111111" ||
         cpf == "22222222222" ||
         cpf == "33333333333" ||
         cpf == "44444444444" ||
         cpf == "55555555555" ||
         cpf == "66666666666" ||
         cpf == "77777777777" ||
         cpf == "88888888888" ||
         cpf == "99999999999")
             ok = 0;

      if (ok == 1) {
         add = 0;
         for (var i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
            var rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
               rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
               ok = 0;
            if (ok == 1) {
               add = 0;
               for (var i = 0; i < 10; i++)
                  add += parseInt(cpf.charAt(i)) * (11 - i);
               rev = 11 - (add % 11);
               if (rev == 10 || rev == 11)
                  rev = 0;
               if (rev != parseInt(cpf.charAt(10)))
                  ok = 0;
            }
        }
        if (ok == 0) {
           return false;
        } else {
           return true;
        }
    }
    return false;
}

// Aplica máscara simples
function mask(input, type) {
    let v = input.value.replace(/\D/g, "");

    if (type === "cpf") {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{2})$/, "$1-$2");
    }

    else if (type === "cnpj") {
        v = v.replace(/(\d{2})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1/$2");
        v = v.replace(/(\d{4})(\d{2})$/, "$1-$2");
    }

    else if (type === "cep") {
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }

    else if (type === "cel") {
        v = v.replace(/(\d{2})(\d)/, "($1) $2");
        v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    else if (type === "cartao") {
        v = v.replace(/(\d{4})(?=\d)/g, "$1 ");
        v = v.substring(0, 19); // 16 dígitos + 3 espaços
    }

    else if (type === "validade") {
        v = v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        v = v.substring(0, 5);
    }

    else if (type === "cvv") {
        v = v.substring(0, 3);
    }

    input.value = v;
}

function setupMasks() {
    const masks = {
        cpf: "cpf",
        cnpj: "cnpj",
        cep: "cep",
        celular: "cel",
        numeroCartao: "cartao",
        validade: "validade",
        CVV: "cvv"
    };

Object.keys(masks).forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener("input", e => {
                 mask(field, masks[id]);
            });
        }
    });
}
setupMasks();

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

function validarCheckout() {
    let ok = true;

    function check(id, validatorFn, message) {
        const el = document.getElementById(id);
        if (!validatorFn(el.value.trim())) {
            fieldError(el, message);
            ok = false;
        } else {
            fieldValid(el);
        }
    }

    check("nome", v => v.length > 1, "Informe seu nome.");
    check("sobrenome", v => v.length > 1, "Informe seu sobrenome.");
    check("cpf", v => validarCPF(v), "CPF inválido.");
    check("endereco", v => v.length > 5, "Informe seu endereço.");
    check("cep", v => regexCep.test(v), "CEP inválido.");
    check("celular", v => regexCel.test(v), "Celular inválido.");
    check("email", v => regexEmail.test(v), "Email inválido.");
    check("numeroCartao", v => regexCartao.test(v), "Número inválido.");
    check("nomeCartao", v => v.length > 3, "Nome inválido.");
    check("validade", v => regexValidade.test(v), "MM/AA inválido.");
    check("cvv", v => regexCVV.test(v), "CVV inválido.");
    check("complemento", v => v.length > 0, "Informe o complemento.");
    check("aniv", v => validarData(v), "Data inválida. Deve ser maior de 18 anos.");

    return ok;
}

// Botão finalizar
const btnFinalizar = document.getElementById("btnFinalizar");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", function (e) {
        e.preventDefault();
        if (validarCheckout()) {
            alert("Pedido finalizado com sucesso!");
            document.getElementById("checkoutForm").reset();
        }
    });
}

/* 
    CONTATO 
*/
const btnEnviar = document.getElementById("btnEnviar");
if (btnEnviar) {
    btnEnviar.addEventListener("click", function () {
        const campos = document.querySelectorAll("#formContato input[required], #formContato textarea[required]");
        let valido = true;

        campos.forEach(campo => {
            const erro = document.getElementById("erro-" + campo.id);
            if (campo.value.trim() === "") {
                campo.style.border = "2px solid red";
                erro.textContent = "Preencha este campo obrigatório.";
                valido = false;
            } else {
                campo.style.border = "";
                erro.textContent = "";
            }
        });

        if (valido) {
            alert("Mensagem enviada com sucesso!");
            document.getElementById("formContato").reset();
        }
    });
}

//// TABLE
var botaoExcluir=document.getElementById('botaoExcluir');
if (botaoExcluir){
    botaoExcluir.addEventListener('click', function(){
        var checks= document.querySelectorAll('.itemExcluir:checked');
        checks.forEach(function(check){
            check.closest('tr').remove();
        });
    });
}