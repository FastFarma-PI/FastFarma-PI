document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const form = document.getElementById('loginForm');
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');

    const emailValid = 'will@fast.com';
    const passValid = '123';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        inputEmail.classList.remove('is-invalid', 'is-valid');
        inputPassword.classList.remove('is-invalid', 'is-valid');

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        if (email === emailValid && password === passValid) {
            window.location.href="./index.html"
            inputEmail.classList.add('is-valid');
            inputPassword.classList.add('is-valid');
        } else {
            alert('Erro de login. E-mail ou Senha incorretos.');
            
            inputEmail.classList.add('is-invalid');
            inputPassword.classList.add('is-invalid');

            const emailFeedback = inputEmail.nextElementSibling;
            const passwordFeedback = inputPassword.nextElementSibling;
            
            emailFeedback.textContent = 'E-mail ou Senha incorretos.';
            passwordFeedback.textContent = 'E-mail ou Senha incorretos.';
            
            form.classList.remove('was-validated');
        }
    }, false);
});