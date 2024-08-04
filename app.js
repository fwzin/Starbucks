// Seleciona os elementos de controle do carrossel e os itens do carrossel
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .item');
let countItem = items.length;
let active = 1;
let other_1 = null;
let other_2 = null;

// Evento para avançar para o próximo item do carrossel
next.onclick = () => {
    carousel.classList.remove('prev');
    carousel.classList.add('next');
    active = active + 1 >= countItem ? 0 : active + 1;
    other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
    other_2 = active + 1 >= countItem ? 0 : active + 1;
    changeSlider();
}

// Evento para voltar ao item anterior do carrossel
prev.onclick = () => {
    carousel.classList.remove('next');
    carousel.classList.add('prev');
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    other_1 = active + 1 >= countItem ? 0 : active + 1;
    other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
    changeSlider();
}

// Função que atualiza os itens visíveis do carrossel
const changeSlider = () => {
    // Remove as classes dos itens antigos
    let itemOldActive = document.querySelector('.carousel .item.active');
    if(itemOldActive) itemOldActive.classList.remove('active');

    let itemOldOther_1 = document.querySelector('.carousel .item.other_1');
    if(itemOldOther_1) itemOldOther_1.classList.remove('other_1');

    let itemOldOther_2 = document.querySelector('.carousel .item.other_2');
    if(itemOldOther_2) itemOldOther_2.classList.remove('other_2');

    // Reinicia a animação para cada item
    items.forEach(e => {
        e.querySelector('.image img').style.animation = 'none';
        e.querySelector('.image figcaption').style.animation = 'none';
        void e.offsetWidth; // Reflow para reiniciar a animação
        e.querySelector('.image img').style.animation = '';
        e.querySelector('.image figcaption').style.animation = '';
    });

    // Adiciona as classes aos novos itens
    items[active].classList.add('active');
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');

    // Reinicia o autoplay
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        next.click();
    }, 5000);
}

// Inicia o autoplay
let autoPlay = setInterval(() => {
    next.click();
}, 5000);
