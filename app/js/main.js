/**
 * @file Demonstrate an Imageslider to slide through images using arrows or keyboard arrows.
 * @author: Mannar Hielal <mannar.hielal@liip.ch>
 * @version 1.0
 * How next and prev button work:
 * 
 */

document.addEventListener("DOMContentLoaded", function () {

    let elements = document.querySelectorAll(".imageslider__item");
    let nextBtn = document.querySelector(".imageslider__nav--next");
    let prevBtn = document.querySelector(".imageslider__nav--prev");
    let counter = 1;

    // the counter divs
    let htmlCounterTotal = document.querySelector(".imageslider__counter--total");
    let htmlCounterCurrent = document.querySelector(".imageslider__counter--current");
    let dots = document.querySelector(".dot");
    let stopBtn = document.querySelector(".imageslider__btn--stop");

    let options = { 'effect': 'fade', 'controls': true, 'automatic': false };

    let automatic = options['automatic'];
    let controls = options['controls'];
    stopBtn.addEventListener('click', checkAutomatic);

    var refreshIntervalId;

    function autoPlay(automatic) {
        toggleControls();
        if (automatic) {
            refreshIntervalId = setInterval(navNext, 3000);
        }
        else {
            clearInterval(refreshIntervalId);
        }
        console.log(automatic);
    }
    function checkAutomatic() {
        if (!automatic) { automatic = true; }
        else { automatic = false; }
        autoPlay(automatic);
    }
    function toggleControls() {
        let arrows = document.querySelectorAll(".imageslider__nav");
        console.log(arrows);
        for (let i = 0; i < arrows.length; i++) {
            arrows[i].classList.toggle('hidden');
        }
    }

    // setting the counter content
    htmlCounterTotal.textContent = elements.length;
    htmlCounterCurrent.textContent = counter;

    function setActiveSlide(current, nextIndex) {
        let activeClass = ".imageslider__item--" + nextIndex;
        let targetedElement = document.querySelector(activeClass);
        // remove active class from all elements
        current.classList.remove('active');
        // add active class to the targetedElement
        targetedElement.classList.add('active');
        // set the content of dynamisch current counter
        htmlCounterCurrent.textContent = nextIndex;


    }
    /**
     * Function: Next navigation
     */
    function navNext() {
        let element = document.querySelector(".imageslider__item.active");
        counter++;
        if (counter > 1 && !automatic) {
            prevBtn.classList.remove('hidden');
        }
        if (counter > elements.length) counter = 1;
        setActiveSlide(element, counter);
        if (counter == elements.length) {
            nextBtn.classList.add('hidden');
        }
    }

    /**
     * Function: prev navigation
     */

    function navPrev() {
        let element = document.querySelector(".imageslider__item.active");
        counter--;
        if (counter > 0 && !automatic) {
            nextBtn.classList.remove('hidden');
        }
        if (counter <= 0) {
            counter = elements.length;
        }
        setActiveSlide(element, counter);
        if (counter == 1) {
            prevBtn.classList.add('hidden');
        }
    }
    nextBtn.addEventListener('click', navNext);
    prevBtn.addEventListener('click', navPrev);
    window.addEventListener("keyup", function (e) {
        if (e.keyCode === 39) navNext();
    });
    window.addEventListener("keyup", function (e) {
        if (e.keyCode === 37) navPrev();
    });
});

