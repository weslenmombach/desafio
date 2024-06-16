// Espera o DOM estar completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos do DOM necessários
    const container = document.querySelector('.container');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentElement = document.querySelector('.content');
    const botao1 = contentElement.querySelector('.botao1');
    const botao2 = contentElement.querySelector('.botao2');

    // Array de objetos com as informações de cada conteúdo
    const contents = [
        {
            titulo: 'Música para todos',
            botao1: 'Aproveite o Spotify Free',
            botao2: 'Obter o Spotify Premium',
            showBotao1: true
        },
        {
            titulo: 'As melhores rádios',
            botao1: '',
            botao2: '♫ OUÇA AGORA',
            showBotao1: false
        }
    ];

    let currentIndex = 0;

    // Função para mostrar o conteúdo com animação de transição
    function showContent(index, direction) {
        // Aplica transições de opacidade e transformação ao elemento de conteúdo
        contentElement.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        contentElement.style.opacity = 0;
        contentElement.style.transform = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';

        setTimeout(() => {
            // Atualiza o conteúdo após a transição de saída
            const currentContent = contents[index];
            contentElement.querySelector('.titulo').textContent = currentContent.titulo;
            botao1.textContent = currentContent.botao1;
            botao2.textContent = currentContent.botao2;

            // Mostra ou esconde botão 1 conforme necessário
            botao1.style.display = currentContent.showBotao1 ? 'inline-block' : 'none';

            // Redefine as transições e aplica a transição de entrada
            contentElement.style.transition = 'none';
            contentElement.style.transform = direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)';

            setTimeout(() => {
                // Adiciona transição de entrada para o conteúdo
                contentElement.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                contentElement.style.opacity = 1;
                contentElement.style.transform = 'translateX(0)';
            }, 50); // Tempo de espera antes da transição de entrada
        }, 500); // Duração da transição de saída
    }

    // Adiciona evento de clique nos botões de navegação
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.id === 'esq' ? 'left' : 'right';
            // Atualiza o índice do conteúdo com base na direção do clique
            currentIndex = direction === 'left'
                ? currentIndex > 0 ? currentIndex - 1 : contents.length - 1
                : currentIndex < contents.length - 1 ? currentIndex + 1 : 0;
            showContent(currentIndex, direction); // Mostra o conteúdo atualizado com animação
        });
    });

    // Seleciona elementos de texto e imagens adicionais
    const textContent = document.getElementById('text-content');
    const moreImages = document.getElementById('additional-images');

    // Dados de conteúdo para cada link
    const contentData = {
        link1: {
            h1: 'O que é o Lorem Ipsum?',
            h2: 'Porque é que o usamos?',
            p: 'Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.',
            extra: {
                extraInfo: '<h2>De onde é que ele vem?</h2><p>Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.</p>',
                extraInfo2: '<h2>Onde posso arranjar algum?</h2><p>Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.</p>'
            }
        },
        link2: {
            h1: 'O que é o Lorem Ipsum?',
            h2: 'Porque é que o usamos?',
            p: 'Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.',
            extra: {
                extraInfo: '',
                extraInfo2: ''
            }
        },
        link3: {
            h1: 'O que é o Lorem Ipsum?',
            h2: 'Porque é que o usamos?',
            p: 'Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.',
            extra: {
                extraInfo: '<h2>De onde é que ele vem?</h2><p>Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.</p>',
                extraInfo2: '<h2>Onde posso arranjar algum?</h2><p>Letraset, que continham passagens com Lorem Ipsum, e mais <br> recentemente com os programas de publicação como Aldus PageMaker<br> que incluem versões do Lorem Ipsum.</p>'
            }
        }
    };

    // Função para atualizar o conteúdo do texto com base no ID do link clicado
    function updateTextContent(id) {
        const data = contentData[id];
        // Atualiza o HTML do elemento de texto com os dados correspondentes
        textContent.innerHTML = `
            <h1>${data.h1}</h1>
            <h2>${data.h2}</h2>
            <p>${data.p}</p>
            <div class="extra-content">
                ${data.extra.extraInfo}
                ${data.extra.extraInfo2}
            </div>
        `;
        // Esconde as imagens adicionais e mostra o conteúdo de texto
        moreImages.style.display = 'none';
        textContent.style.display = 'block';

        // Adiciona classe para centralizar conteúdo do link2
        if (id === 'link2') {
            textContent.classList.add('centered-content');
        } else {
            textContent.classList.remove('centered-content');
        }

        // Se o ID for 'link3', anima frases específicas
        if (id === 'link3') {
            animateSpecificPhrases();
        }
    }

    // Função para animar frases específicas do link3
    function animateSpecificPhrases() {
        const phrases = textContent.querySelectorAll('h1, .extra-content h1, .extra-content h2, .extra-content p');

        phrases.forEach((phrase, index) => {
            // Verifica se o texto da frase é específico e adiciona classe de animação
            if (phrase.textContent.trim() === 'O que é o Lorem Ipsum?' || phrase.textContent.includes('De onde é que ele vem?')) {
                setTimeout(() => {
                    phrase.classList.add('animate-text');
                }, index * 100); // Atraso entre cada animação
            }
        });
    }

    // Adiciona evento de clique para cada link e atualiza conteúdo correspondente
    document.getElementById('link1').addEventListener('click', function(event) {
        event.preventDefault();
        updateTextContent('link1');
    });

    document.getElementById('link2').addEventListener('click', function(event) {
        event.preventDefault();
        updateTextContent('link2');
    });

    document.getElementById('link3').addEventListener('click', function(event) {
        event.preventDefault();
        updateTextContent('link3');
    });

    document.getElementById('link4').addEventListener('click', function(event) {
        event.preventDefault();
        // Esconde o conteúdo de texto e mostra as imagens adicionais
        textContent.style.display = 'none';
        moreImages.style.display = 'flex';
    });
});
