function scrollLeft() {
    const container = document.querySelector('.categories-wrapper');
    container.scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight() {
    const container = document.querySelector('.categories-wrapper');
    container.scrollBy({ left: 300, behavior: 'smooth' });
}
