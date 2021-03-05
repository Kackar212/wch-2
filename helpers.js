import { setCurrentPageLink } from "./menu.js";

function getHamburgerContentNextState(content) {
  return content.textContent.includes('Open menu') ? 'Close menu' : 'Open menu'
}

function getId(clickedLink) {
  const {
    hash
  } = clickedLink;
  return hash;
}

function removeCurrentPageLinkAttributes(currentPageLink) {
  if (currentPageLink) {
    currentPageLink.removeAttribute('aria-current');
    currentPageLink.classList.remove('header__link--current');
  }
}

function toggleAttribute(el, attrName, attrValue) {
  if (el.getAttribute(attrName)) {
    el.removeAttribute(attrName);
  } else {
    el.setAttribute(attrName, attrValue);
  }
}

function toggleCurrentPageLinkAttributes(link) {
  toggleAttribute(link, 'aria-current', 'page');
  link.classList.toggle('header__link--current');
}

function updateHash(clickedLink, state = {}) {
  history.pushState(state, '', clickedLink.href);
}

function isOpen(hamburger) {
  return hamburger.getAttribute('aria-expanded') === 'true';
}

function setCurrentPageLinkOnReload() {
  if (location.hash) {
    const link = document.querySelector(`.header__link[href="${location.hash}"]`);
    setCurrentPageLink({ target: link });
  }
}

export {
  updateHash,
  toggleCurrentPageLinkAttributes,
  getId,
  getHamburgerContentNextState,
  isOpen,
  setCurrentPageLinkOnReload
}