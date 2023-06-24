function smoothScroll(selector){
    document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
    });
}