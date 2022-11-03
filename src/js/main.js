const slider = document.querySelector("#take-card");
const sliderItems = Array.from(slider.children);
const btnleft = document.querySelector('[data-left="icons"]');
const btnRight = document.querySelector('[data-right="icons"]');
const navigationCircle = document.querySelector('[data-circle="circle"]');

sliderItems.forEach(function (slide, index) {
  if (index !== 0) {
    slide.classList.add("hidden");
  }

  // добавляем индексы
  slide.dataset.index = index;

  // добавляем data атрибут active для первого / астивного слайда
  sliderItems[0].setAttribute("data-active", "");

  //клик по слайдам
  slide.addEventListener("click", function () {
    // скрываем текущий слайд
    slide.classList.add("hidden");
    slide.removeAttribute("data-active");

    // Рсчитываем индех следующего слайда

    const nextSlideIndex = index + 1 === sliderItems.length ? 0 : index + 1;

    console.log(nextSlideIndex);

    //const nextSlideIndex = +slide.dataset.index + 1;

    // находим следующий слайд
    const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
    // Находим следующий слайд
    nextSlide.classList.remove("hidden");
    nextSlide.setAttribute("data-active", "");
  });
});

btnleft.onclick = function () {
  // скрываем текущий слайд
  const currentSlide = slider.querySelector("[data-active]");
  const currentSlideIndex = +currentSlide.dataset.index;
  currentSlide.classList.add("hidden");
  currentSlide.removeAttribute("data-active");

  // показываем текущий слайд
  const nextSlideIndex =
    currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1;
  const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
  nextSlide.classList.remove("hidden");
  nextSlide.setAttribute("data-active", "");
};

btnRight.onclick = function () {
  // скрываем текущий слайд
  const currentSlide = slider.querySelector("[data-active]");
  const currentSlideIndex = +currentSlide.dataset.index;
  currentSlide.classList.add("hidden");
  currentSlide.removeAttribute("data-active");

  // показываем текущий слайд
  const nextSlideIndex =
    currentSlideIndex + 1 === sliderItems.length ? 0 : currentSlideIndex + 1;
  const nextSlide = slider.querySelector(`[data-index="${nextSlideIndex}"]`);
  nextSlide.classList.remove("hidden");
  nextSlide.setAttribute("data-active", "");
};

function showNextSlide(direction) {
  const currentSlide = slider.querySelector("[data-active]");
  const currentSlideIndex = +currentSlide.dataset.index;
  currentSlide.classList.add("hidden");
  currentSlide.removeAttribute("data-active");

  if (direction === "next") {
    currentSlideIndex + 1 === sliderItems.length ? 0 : currentSlideIndex + 1;
  } else if (direction === "prev") {
    currentSlideIndex === 0 ? sliderItems.length - 1 : currentSlideIndex - 1;
  }
}

(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector(".header_list").clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll(".js-scroll");
    links.forEach((each) => {
      each.addEventListener("click", function () {
        const currentTarget = this.getAttribute("href");
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();
