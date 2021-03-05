export const hamburger = document.querySelector('.hamburger__btn');
export const anchorsContainer = document.querySelector('.header__list');
export const inputs = document.querySelectorAll('.form__input');
export const menuList = document.querySelector(`.header__list#menu-list`)

export function getCurrentPageLink() {
  return anchorsContainer.querySelector('.header__link[aria-current="page"]');
}
