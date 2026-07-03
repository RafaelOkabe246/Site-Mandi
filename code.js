
        // ---- Elementos do DOM ----
        const header = document.getElementById('header');
        const navLinksContainer = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        const todasAsSecoes = document.querySelectorAll('.page-section');
        const todosOsLinksNav = document.querySelectorAll('.nav-links li a');
        const formContato = document.getElementById('formContato');
        const formFeedback = document.getElementById('formFeedback');

        // ---- Efeito de scroll no header ----
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // ---- Navegação entre páginas ----
        function navegarPara(pagina) {
            // Esconde todas as seções
            todasAsSecoes.forEach(sec => sec.classList.remove('active-section'));

            // Mostra a seção correspondente
            const secaoAlvo = document.getElementById('pagina-' + pagina);
            if (secaoAlvo) {
                secaoAlvo.classList.add('active-section');
            }

            // Atualiza links ativos
            todosOsLinksNav.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-pagina') === pagina) {
                    link.classList.add('active');
                }
            });

            // Fecha menu mobile se estiver aberto
            if (navLinksContainer.classList.contains('open')) {
                fecharMenu();
            }

            // Scroll suave para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ---- Menu Mobile ----
        function toggleMenu() {
            navLinksContainer.classList.toggle('open');
            menuToggle.classList.toggle('active');
        }

        function fecharMenu() {
            navLinksContainer.classList.remove('open');
            menuToggle.classList.remove('active');
        }

        // Fecha menu ao clicar em um link (mobile)
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('open') &&
                !header.contains(e.target) &&
                !navLinksContainer.contains(e.target)) {
                fecharMenu();
            }
        });

        // ---- Formulário de Contato ----
        function enviarContato(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validação
            if (!nome || !email || !assunto || !mensagem) {
                mostrarFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            if (!validarEmail(email)) {
                mostrarFeedback('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Simula envio (aqui entraria uma chamada de API real)
            console.log('📩 Mensagem enviada:', { nome, email, assunto, mensagem });
            console.log('📅 Data do envio:', new Date().toLocaleString('pt-BR'));

            // Feedback de sucesso
            mostrarFeedback('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            formContato.reset();

            // Limpa feedback após alguns segundos
            setTimeout(() => {
                formFeedback.style.display = 'none';
                formFeedback.className = 'form-feedback';
            }, 5000);
        }

        function mostrarFeedback(mensagem, tipo) {
            formFeedback.textContent = mensagem;
            formFeedback.className = 'form-feedback ' + tipo;
            formFeedback.style.display = 'block';
        }

        function validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        // ---- Inicialização ----
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🌟 Site de Pré-Campanha — Ana Oliveira 4045');
            console.log('📅 Carregado em:', new Date().toLocaleString('pt-BR'));
            console.log('💡 Navegue entre as páginas: Início | Propostas | Contato');

            // Verifica se há 3 de julho (data mencionada no contexto)
            const hoje = new Date();
            if (hoje.getDate() === 3 && hoje.getMonth() === 6) {
                console.log('🎉 Hoje é 3 de julho! Uma data especial para nossa pré-campanha!');
            }
        });

        // ---- Suporte a teclas de atalho (acessibilidade) ----
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                fecharMenu();
            }
        });