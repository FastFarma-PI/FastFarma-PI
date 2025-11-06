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
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
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


    // ProductList carousel
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
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });


    
   // Back to top button
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

function mascara(m,t,e){
  var cursor = t.selectionStart;
  var texto = t.value;
  texto = texto.replace(/\D/g,'');
  var l = texto.length;
  var lm = m.length;
  if(window.event) {                  
     id = e.keyCode;
  } else if(e.which){                 
     id = e.which;
  }
  cursorfixo=false;
  if(cursor < l)cursorfixo=true;
  var livre = false;
  if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
  ii=0;
  mm=0;
  if(!livre){
     if(id!=8){
        t.value="";
        j=0;
        for(i=0;i<lm;i++){
           if(m.substr(i,1)=="#"){
              t.value+=texto.substr(j,1);
              j++;
           }else if(m.substr(i,1)!="#"){
                    t.value+=m.substr(i,1);
                  }
                  if(id!=8 && !cursorfixo)cursor++;
                  if((j)==l+1)break;
                      
        } 	
     }
  }
  if(cursorfixo && !livre)cursor--;
    t.setSelectionRange(cursor, cursor);
}
    
const btnFinalizar = document.getElementById("btnFinalizar");
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", function () {
    const campos = document.querySelectorAll("#checkoutForm input[required]");
    let valido = true;

    campos.forEach(campo => {
      const erroMsg = document.getElementById("erro-" + campo.id);
      if (campo.value.trim() === "") {
        campo.style.border = "2px solid red";
        erroMsg.textContent = "Preencha este campo obrigatório.";
        valido = false;
      } else {
        campo.style.border = "";
        erroMsg.textContent = "";
      }
    });

    if (valido) alert("Pedido finalizado com sucesso!");
  });
}

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
