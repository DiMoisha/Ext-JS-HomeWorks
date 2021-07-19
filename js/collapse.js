"use strict";

/**
 * Функция сворачивания/разворачивания меню
 *  */
 function collapse(menu_class){
    let omenu = document.querySelector('.' + menu_class);
    omenu.classList.toggle('collapse');
}