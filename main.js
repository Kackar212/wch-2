import { toggleMenu, setCurrentPageLink } from './menu.js';
import { setCurrentPageLinkOnReload } from './helpers.js';
import { hamburger, anchorsContainer, inputs } from './elements.js';

window.addEventListener('keydown', e => e.key === " " && e.preventDefault());
if (history.scrollRestoration && location.hash) {
  history.scrollRestoration = 'manual';
}

hamburger.addEventListener('click', toggleMenu);

anchorsContainer.addEventListener('click', setCurrentPageLink);
anchorsContainer.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.which === 13 || e.which === 32) {
    setCurrentPageLink(e);
  }
});

inputs.forEach(
  input => input.addEventListener('blur', ({ currentTarget }) => {
    const { labels: [ label ] } = currentTarget;
    if (currentTarget.value) {
      label.classList.add('form__label--input-focused');
    } else {
      label.classList.remove('form__label--input-focused');
    }
  })
)

setCurrentPageLinkOnReload();
