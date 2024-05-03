const slidesWrapper = document.querySelectorAll('[data-role="slide"]');
const controlButtons = document.querySelectorAll('[data-role="slide-control"] button');
let [visibleNdxSlide, maxSlideNdx] = [0, slidesWrapper.length - 1];

controlButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-direction');
    visibleNdxSlide = direction ? getSlideNdx[direction]() : Number(button.id);
    setShowSlide(visibleNdxSlide);
    setActiveNavMarker(visibleNdxSlide);
    setDisabledBtn();
  });
});

const getSlideNdx = {
  prev: () => visibleNdxSlide = visibleNdxSlide ? --visibleNdxSlide : visibleNdxSlide,
  next: () => visibleNdxSlide = visibleNdxSlide === maxSlideNdx ? visibleNdxSlide : ++visibleNdxSlide,
}

function setShowSlide (id) {
  slidesWrapper.forEach(slide => slide.classList.remove('show'));
  slidesWrapper[id].classList.add('show');
}
function setActiveNavMarker (id) {
  controlButtons.forEach((button) => {
    button.classList.remove('active');
    if (Number(button.id) === id) button.classList.add('active');
  });
}

function setDisabledBtn () {
  controlButtons[controlButtons.length - 1].toggleAttribute('disabled', visibleNdxSlide === maxSlideNdx);
  controlButtons[0].toggleAttribute('disabled', visibleNdxSlide === 0);
}



