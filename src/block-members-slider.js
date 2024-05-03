import { nodeMembers } from './creat-members.js';

const cardsWrapper = window['block-members-cards'];
const controls = document.querySelectorAll('[data-role="slider-btn"]');
const countElems = document.querySelectorAll('[data-role="visible-count"]');

cardsWrapper.innerHTML = nodeMembers.join(''); //Инитим карточки в доме
const slideWidth = Number(cardsWrapper.querySelector('.block-members__card').clientWidth);
const showSlides = Math.round(cardsWrapper.clientWidth / slideWidth);
const [firstMembers, lastMembers] = [nodeMembers.slice(0, showSlides), nodeMembers.slice(-showSlides)];
const slidesWithFakeCards = [...lastMembers, ...nodeMembers, ...firstMembers ];
const allCards = slidesWithFakeCards.length;
let swipeWidth = -slideWidth * showSlides; // Стартуем с 4 / 3 / 2 слайда (он же первый)

cardsWrapper.innerHTML = slidesWithFakeCards.join(''); //добавляем карточки с "фейковыми слайдами"
cardsWrapper.style.transform = `translateX(${-slideWidth * showSlides}px)`;

setVisibleCount();
let intervalSwipe = setInterval(() => Swipe.next(), 4000);

controls.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-direction');
    Swipe[direction]();
    clearInterval(intervalSwipe);
    intervalSwipe = setInterval(() => Swipe.next(), 4000);
  });
});

const Swipe = new function () {
  this.next = () => {
    if (swipeWidth !== -slideWidth * (allCards - showSlides)) {
      cardsWrapper.style.transition = '500ms';
      swipeWidth -= slideWidth * showSlides;
      cardsWrapper.style.transform = `translateX(${swipeWidth}px)`;
      setVisibleCount();
    }

    cardsWrapper.addEventListener('transitionend',()=> {
      if (swipeWidth === -slideWidth * (allCards - showSlides)) {
        cardsWrapper.style.transition = '0ms';
        swipeWidth = -slideWidth * showSlides;
        cardsWrapper.style.transform = `translateX(${swipeWidth}px)`;
        setVisibleCount();
      }
    }, {once: true});
  }

  this.prev = () => {
    if (swipeWidth !== 0) {
      cardsWrapper.style.transition = '500ms';
      swipeWidth += slideWidth * showSlides;
      cardsWrapper.style.transform = `translateX(${swipeWidth}px)`;
      setVisibleCount();
    }

    cardsWrapper.addEventListener('transitionend',()=> {
      if (swipeWidth === 0) {
        cardsWrapper.style.transition = '0ms';
        swipeWidth = -slideWidth * (allCards - (showSlides * 2));
        cardsWrapper.style.transform = `translateX(${swipeWidth}px)`;
        setVisibleCount();
      }
    }, {once: true});
  }
}

function setVisibleCount () {
  let visibleCount = Math. abs(swipeWidth / slideWidth);
  if (visibleCount <= 6 && visibleCount !== 0 ) {
    countElems.forEach((elem)=> elem.innerHTML = visibleCount.toString());
  }
}