import {
  isOpen,
  toggleCurrentPageLinkAttributes,
  updateHash,
  getHamburgerContentNextState,
  getId
} from './helpers.js';
import { scrollToSection } from './scroll.js';
import { getCurrentPageLink, hamburger, menuList } from './elements.js';

function toggleMenu({ currentTarget = hamburger }) {
    currentTarget.setAttribute('aria-expanded', !isOpen(currentTarget));

    const srOnly = currentTarget.querySelector('.btn__content--sr-only');
    srOnly.textContent = getHamburgerContentNextState(srOnly);

    menuList.classList.toggle('header__list--expanded');
}

function setCurrentPageLink(e) {
  console.log(e);
  e.cancelable && e.preventDefault();
  const { isTrusted, target } = e;

  if (target.classList.contains('header__link')) {
    isTrusted && toggleMenu({});

    const currentPageLink = getCurrentPageLink();
    if (currentPageLink) {
      toggleCurrentPageLinkAttributes(currentPageLink);
    }

    toggleCurrentPageLinkAttributes(target);
    
    if (currentPageLink !== target) {
      scrollToSection(getId(target), !!isTrusted);
      updateHash(target);
    }

    if (e.type === 'click') target.blur();
  }
}

export { setCurrentPageLink, toggleMenu };