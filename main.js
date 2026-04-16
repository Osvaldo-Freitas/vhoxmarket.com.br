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

    // Função de Validação e Envio via AJAX
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    let isValid = true;

    // Limpa erros anteriores
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.form-input').forEach(el => el.style.borderColor = '#e2e8f0');

    // Pegar valores
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const local = document.getElementById('local');

    // Validações básicas
    if (nome.value.trim().length < 3) {
        document.getElementById('error-nome').style.display = 'block';
        nome.style.borderColor = '#dc2626';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('error-email').style.display = 'block';
        email.style.borderColor = '#dc2626';
        isValid = false;
    }

    if (tel.value.length < 14) {
        document.getElementById('error-tel').style.display = 'block';
        tel.style.borderColor = '#dc2626';
        isValid = false;
    }

    if (local.value === "") {
        document.getElementById('error-local').style.display = 'block';
        local.style.borderColor = '#dc2626';
        isValid = false;
    }

    // SE ESTIVER TUDO CERTO, ENVIA PARA O FORMSPREE
    if (isValid) {
        const formData = new FormData(this); // Captura todos os dados do formulário
        
        // Adiciona um feedback visual no botão
        const btn = this.querySelector('button');
        const btnOriginalText = btn.innerText;
        btn.innerText = "ENVIANDO...";
        btn.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // SUCESSO: Mostra sua tela de obrigado
                userNameSpan.innerText = nome.value.split(' ')[0];
                formContainer.style.display = 'none';
                thanksScreen.style.display = 'block';
            } else {
                alert("Erro ao enviar. Por favor, tente novamente mais tarde.");
                btn.innerText = btnOriginalText;
                btn.disabled = false;
            }
        }).catch(error => {
            alert("Erro de conexão. Verifique sua internet.");
            btn.innerText = btnOriginalText;
            btn.disabled = false;
        });
    }
});