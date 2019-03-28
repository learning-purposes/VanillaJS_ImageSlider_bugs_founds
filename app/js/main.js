/**
 * @file Demonstrate an Imageslider to slide through images using arrows or keyboard arrows.
 * @author: Mannar Hielal <mannar.hielal@liip.ch>
 * @version 1.0
 * How next and prev button work:
 * 
 * Capture the button.
 * Add an event lister to it.
 * Increase/decrease the counter.
 * Get all items/ elements.
 * Remove the class active from all elements.
 * Add the class active to the item with the counter specifically.
 */

document.addEventListener("DOMContentLoaded", function () {

    let elements = document.querySelectorAll(".imageslider__item");
    let nextBtn = document.querySelector(".imageslider__nav--next");
    let prevBtn = document.querySelector(".imageslider__nav--prev");
    let counter = 1;

    // the counter divs
    let htmlCounterTotal = document.querySelector(".imageslider__counter--total");
    let htmlCounterCurrent = document.querySelector(".imageslider__counter--current");

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
        if (counter > elements.length) counter = 1;
        setActiveSlide(element, counter);
    }
    /**
     * Function: prev navigation
     */
    function navPrev() {
        let element = document.querySelector(".imageslider__item.active");
        counter--;
        if (counter <= 0) {
            counter = elements.length;
        }
        setActiveSlide(element, counter);
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

