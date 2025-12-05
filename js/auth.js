document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    
    const JWT_SECRET = 'seu_segredo_super_secreto'; 

    // conf toastify 
    const showToast = (message, type = 'success') => {
        let backgroundColor = "#4CAF50"; 
        if (type === 'error') {
            backgroundColor = "#F44336"; 
        } else if (type === 'info') {
            backgroundColor = "#2196F3";
        }

        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true,
            style: {
                background: backgroundColor,
                borderRadius: "5px"
            }
        }).showToast();
    };
    
    // Funções de Simulação JWT (Apenas para demonstração no front-end)
    const generateToken = (payload) => {
        // Expiração em 30 minutos
        const exp = Math.floor(Date.now() / 1000) + (30 * 60); 
        const header = { alg: 'HS256', typ: 'JWT' };
        const data = { ...payload, exp };

        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(data));
        const signature = btoa(JWT_SECRET); // Simulação

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    };

    const validateToken = (token) => {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const encodedPayload = parts[1];
            const payload = JSON.parse(atob(encodedPayload));
            
           // verifica expiração 
            if (payload.exp < Math.floor(Date.now() / 1000)) {
                showToast("Sua sessão expirou (30 min). Faça login novamente.", "error");
                return null; 
            }
            return payload; // Token válido
        } catch (e) {
            return null;
        }
    };

    // gestão local storange 
    const getUsers = () => {
        const users = localStorage.getItem('fastfarma_users');
        return users ? JSON.parse(users) : [];
    };

    const saveUsers = (users) => {
        localStorage.setItem('fastfarma_users', JSON.stringify(users));
    };

    // segurança das rotas 
    const token = localStorage.getItem('fastfarma_token');
    const path = window.location.pathname;
    const isAuthPage = path.includes('login.html') || path.includes('register.html');

    if (token && isAuthPage) {
        // se valido passa
        if (validateToken(token)) {
            window.location.href = 'index.html'; 
        } else {
            // se ficar invalido após 30min ele remove para ficar sem token  
            localStorage.removeItem('fastfarma_token');
        }
    } else if (!token && !isAuthPage) {
        //se invalido 
        window.location.href = 'login.html';
    }


    // Register 
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            const email = document.getElementById('inputEmailRegister').value.trim();
            const password = document.getElementById('inputPasswordRegister').value;
            const confirmPassword = document.getElementById('inputConfirmPassword').value;
            
            let isValid = registerForm.checkValidity();

            const confirmInput = document.getElementById('inputConfirmPassword');
            if (password !== confirmPassword) {
                confirmInput.setCustomValidity("Senhas não conferem");
                confirmInput.classList.add('is-invalid');
                isValid = false;
            } else {
                confirmInput.setCustomValidity("");
                confirmInput.classList.remove('is-invalid');
                confirmInput.classList.add('is-valid');
            }

            if (!isValid) {
                registerForm.classList.add('was-validated');
                showToast("Verifique os dados.", "error");
                return;
            }

            const users = getUsers();
            if (users.find(u => u.email === email)) {
                showToast("Este e-mail já está registrado.", "error");
                return;
            }

            // criação de um hash da senha
            const hashedPassword = btoa(password); 
            users.push({ email, password: hashedPassword });
            saveUsers(users);

            showToast("Registro efetuado! Redirecionando para Login...", "success");
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            
            const inputEmail = document.getElementById('inputEmail');
            const inputPassword = document.getElementById('inputPassword');
            
            inputEmail.classList.remove('is-invalid');
            inputPassword.classList.remove('is-invalid');
            
            const email = inputEmail.value.trim();
            const password = inputPassword.value;

            if (!loginForm.checkValidity()) {
                loginForm.classList.add('was-validated');
                return;
            }

            const users = getUsers();
            // validação entre token da senha
            const user = users.find(u => u.email === email && u.password === btoa(password));

            if (user) {
                
                const token = generateToken({ email: user.email, role: 'user' });
                localStorage.setItem('fastfarma_token', token);
                
                showToast(`Bem-vindo(a), ${user.email}!`, "success");
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);

            } else {
               
                showToast("E-mail ou Senha incorretos. Tente novamente.", "error");
                inputEmail.classList.add('is-invalid');
                inputPassword.classList.add('is-invalid');
                
                // fedback 
                if (inputEmail.nextElementSibling) inputEmail.nextElementSibling.textContent = 'E-mail ou Senha incorretos.';
                if (inputPassword.nextElementSibling) inputPassword.nextElementSibling.textContent = 'E-mail ou Senha incorretos.';
            }
        });
    }

});