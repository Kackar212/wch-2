function scrollAnimation (getState) {
  const { currentPosition, hasReachedEnd } = getState();

  window.scroll(0, currentPosition);

  if (!hasReachedEnd) {
    requestAnimationFrame(() => scrollAnimation(getState), 1000 / 60)
  }
}

const updateScroll = (isDirectionFromTop, state, setCurrentPositionAsEnd) => () => {
  const { step, currentPosition, end } = state;

  state.currentPosition = isDirectionFromTop ? currentPosition + step : currentPosition - step;
  state.step += 1;
  state.hasReachedEnd = isDirectionFromTop ? currentPosition >= end : currentPosition <= end;

  const isScrollBeyondEnd = isDirectionFromTop ? currentPosition > end : currentPosition < end;
  setCurrentPositionAsEnd(isScrollBeyondEnd);

  return state;
}

function scrollState(section, smooth = true) {
  let currentPosition = window.scrollY || window.pageYOffset
  
  let end = currentPosition + section.getBoundingClientRect().top - 70;
  
  if (!smooth) return () => end;

  let step = 30.0;

  function setCurrentPositionAsEnd(condition) {
    if (condition) this.currentPosition = this.end;
  }

  const state = { currentPosition, end, step };
  return updateScroll(currentPosition < end, state, setCurrentPositionAsEnd.bind(state));
}

function scrollToSection(id, smooth = true) {
  if (!id) return;

  const section = document.querySelector(id);
  const getState = scrollState(section, smooth);

  if (smooth) {
    requestAnimationFrame(() => scrollAnimation(getState), 1000 / 60);
  } else {
    window.scrollTo(0, getState());
  }
}

export { scrollToSection };