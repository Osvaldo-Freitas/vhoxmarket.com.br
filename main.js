    const form = document.getElementById('contactForm');
    const telInput = document.getElementById('tel');
    const formContainer = document.getElementById('form-container');
    const thanksScreen = document.getElementById('thanks-screen');
    const userNameSpan = document.getElementById('user-name');
    
    // Menu Lógica Global
        const menu = document.getElementById('mobile-menu');
        document.getElementById('open-menu').addEventListener('click', () => menu.classList.add('active'));
        document.getElementById('close-menu').addEventListener('click', () => menu.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => menu.classList.remove('active')));

    // FAQ Accordion Logic
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                faqItem.classList.toggle('active');
            });
        });

    // Máscara de Telefone (Formata enquanto digita)
    telInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Função de Validação
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão

        let isValid = true;

        // Limpa erros anteriores
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.form-input').forEach(el => el.style.borderColor = '#e2e8f0');

        // Valida Nome
        const nome = document.getElementById('nome');
        if (nome.value.trim().length < 3) {
            document.getElementById('error-nome').style.display = 'block';
            nome.style.borderColor = '#dc2626';
            isValid = false;
        }

        // Valida E-mail (Regex simples)
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('error-email').style.display = 'block';
            email.style.borderColor = '#dc2626';
            isValid = false;
        }

        // Valida Telefone (Mínimo de caracteres para ser um tel válido)
        if (telInput.value.length < 14) {
            document.getElementById('error-tel').style.display = 'block';
            telInput.style.borderColor = '#dc2626';
            isValid = false;
        }

        // Valida Select
        const local = document.getElementById('local');
        if (local.value === "") {
            document.getElementById('error-local').style.display = 'block';
            local.style.borderColor = '#dc2626';
            isValid = false;
        }

        if (isValid) {
                // Efeito de Redirecionamento para a página de Obrigado
                userNameSpan.innerText = nome.value.split(' ')[0];
                formContainer.style.display = 'none';
                thanksScreen.style.display = 'block';
                window.scrollTo({ top: document.getElementById('contato').offsetTop, behavior: 'smooth' });
            }

            // Interceptação para mostrar tela de sucesso (Opcional, o Formspree já tem uma própria, mas esta deixa mais bonito)
        const form = document.getElementById('contactForm');
        form.onsubmit = function() {
            // Se quiser que o usuário fique na sua página, você pode usar AJAX, 
            // mas o padrão do Formspree funciona muito bem redirecionando para o sucesso deles.
        };

    });