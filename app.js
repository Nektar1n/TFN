"use strict"

const isMobile = {
    Android: () => {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: () => {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: () => {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: () => {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()){
    document.body.classList.add('_touch')

    let menuArrows=document.querySelectorAll('.menu__arrow')
    if (menuArrows.length>0){
        for (let i=0;i<menuArrows.length;i++){
            const menuArrow=menuArrows[i]
            menuArrow.addEventListener('click',function (e) {
                menuArrow.parentElement.classList.toggle('_active')
            })
        }
    }
}else {
    document.body.classList.add('_pc')
}

const menuLinks=document.querySelectorAll('.menu__link[data-goto]')
const menuBody=document.querySelector('.menu__body')
//меню бургер
const iconMenu=document.querySelector('.menu__icon')
if (iconMenu){
    iconMenu.addEventListener('click',function (e){
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    })
}
//прокрутка при клике
if (menuLinks.length>0){
    menuLinks.forEach(menuLink=>{
        menuLink.addEventListener('click',onMenuLinkClick)
    })
    function onMenuLinkClick(e){
        const menuLink=e.target
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
           const gotoBlock=document.querySelector(menuLink.dataset.goto)
           const gotoBlockValue=gotoBlock.getBoundingClientRect().top+pageYOffset-document.querySelector('header').offsetHeight

            if (iconMenu.classList.contains('_active')){
                document.body.classList.remove('_lock')
                iconMenu.classList.remove('_active')
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top:gotoBlockValue,
                behavior:'smooth'
            });
           e.preventDefault();
        }
    }
}
// console.log('h')
