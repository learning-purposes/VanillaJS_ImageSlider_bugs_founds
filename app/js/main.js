/**
 * @file Demonstrate an Imageslider to slide through images using arrows or keyboard arrows.
 * @author: Mannar Hielal <mannar.hielal@liip.ch>
 * @version 1.0
 * How next and prev button work:
 * 
 */

document.addEventListener("DOMContentLoaded", function () {

    let elements = document.querySelectorAll(".imageslider__item");
    let imageslider = document.querySelector(".imageslider");
    let nextBtn = document.querySelector(".imageslider__nav--next");
    let prevBtn = document.querySelector(".imageslider__nav--prev");
    let fadeBtn = document.querySelector(".effect__item--fade");
    let slideBtn = document.querySelector(".effect__item--slide");
    let infinateBtn = document.querySelector(".effect__item--infinate");
    let autoPlayBtn = document.querySelector(".effect__item--autoPlay");


    let controlDots = document.querySelector(".control--dots");
    let counter = 1;


    // the counter divs
    let htmlCounterTotal = document.querySelector(".imageslider__counter--total");
    let htmlCounterCurrent = document.querySelector(".imageslider__counter--current");
    htmlCounterTotal.textContent = elements.length;
    htmlCounterCurrent.textContent = counter;
    var refreshIntervalId;

    // the parameters of the effects
    let options = { 'effect': "fade", 'controls': true, 'autoplay': false, 'infinate': false };
    let autoPlay = options['autoplay'];
    let controls = options['controls'];
    let effect = options['effect'];
    let infinate = options['infinate'];


    autoPlayFun(autoPlay, controls);

    function autoPlayFun(autoPlay, controls) {

        if (autoPlay == true) {
            controls = false;
            toggleControls(controls);

            refreshIntervalId = setInterval(navNext, 3000);
        }
        if (autoPlay == false) {
            controls = true;
            toggleControls(controls);
            clearInterval(refreshIntervalId);
        }
    }

    function toggleAutoplay() {
        if (!autoPlay) {
            autoPlay = true;
        }
        else { autoPlay = false; }
    }

    function toggleControls(controls) {
        let arrows = document.querySelectorAll(".imageslider__nav");
        if (controls == false) {
            for (let i = 0; i < arrows.length; i++) {
                arrows[i].classList.add('hidden');
            }
        }
        if (controls == true) {
            for (let i = 0; i < arrows.length; i++) {
                arrows[i].classList.remove('hidden');
            }
        }

    }

    function setActiveSlide(current, nextIndex, effect) {
        let activeClass = ".imageslider__item--" + nextIndex;
        let targetedElement = document.querySelector(activeClass);
        if (effect == 'fade') {
            imageslider.classList.remove('effect--slide');
            // remove active class from all elements
            current.classList.remove('active');
            // add active class to the targetedElement
            targetedElement.classList.add('active');
        }
        if (effect == 'slide') {
            current.classList.remove('fade');
            current.classList.remove('active');
            // add active class to the targetedElement
            targetedElement.classList.add('active');
            imageslider.classList.add('effect--slide');
        }
        // set the content of dynamisch current counter
        htmlCounterCurrent.textContent = nextIndex;


    }

    /**
     * Function: Next navigation
     */
    function navNext() {
        console.log("-----" + infinate);
        let element = document.querySelector(".imageslider__item.active");
        counter++;
        if (counter > 1 && !autoPlay) {
            prevBtn.classList.remove('hidden');
        }

        // keep looping: when you reach last slide set the beginning to the last slide
        if (infinate == true) {
            if (counter >= elements.length) {
                counter = 1;
                nextBtn.classList.remove('hidden');
            }
        }
        // no loop: when you reach the last slide, hide the next 
        if (infinate == false) {
            if (counter >= elements.length) {
                nextBtn.classList.add('hidden');
            }
            if (counter > elements.length) {
                counter = 1;
            }
        }
        setActiveSlide(element, counter, effect);
    }

    /**
     * Function: prev navigation
     */

    function navPrev() {
        let element = document.querySelector(".imageslider__item.active");

        counter--;

        if (counter > 0 && !autoPlay) {
            nextBtn.classList.remove('hidden');
        }
        // keep looping: when you reach first slide set the beginning to the last slide
        if (infinate == true) {
            if (counter <= 1) {
                counter = elements.length;
                prevBtn.classList.remove('hidden');
            }
        }
        // no loop: when you reach the first slide 
        if (infinate == false) {
            if (counter <= 1) {
                counter = 1;
                prevBtn.classList.add('hidden');
            }
        }
        setActiveSlide(element, counter, effect);

    }
    function toggleInfinate() {
        if (!infinate) {
            infinate = true;
        }
        else {
            infinate = false;
        }

    }

    // function slide() {
    //     let element = document.querySelector(".imageslider__item.active");
    //     effect = 'slide';
    //     counter++;
    //     console.log(counter);
    //     for (let i = 0; i < elements.length; i++) {
    //         elements[i].classList.remove('fade');
    //     }

    //     setActiveSlide(element, counter, effect);
    // }

    nextBtn.addEventListener('click', navNext);
    prevBtn.addEventListener('click', navPrev);
    autoPlayBtn.addEventListener('click', function () {

        toggleAutoplay();
        autoPlayFun(autoPlay, controls);
        autoPlayBtn.classList.toggle('effect--active');
    });

    fadeBtn.addEventListener('click', function () {
        effect = "fade";
        slideBtn.classList.remove('effect--active');
        fadeBtn.classList.toggle('effect--active');
    });
    slideBtn.addEventListener('click', function () {
        effect = "slide";
        fadeBtn.classList.remove('effect--active');
        slideBtn.classList.toggle('effect--active');
    });
    infinateBtn.addEventListener('click', function () {
        toggleInfinate();
        controls = true;
        autoPlay = false;
        autoPlayFun(autoPlay, controls);
        autoPlayBtn.classList.remove('effect--active');
        infinateBtn.classList.toggle('effect--active');
    });
    window.addEventListener("keyup", function (e) {
        if (e.keyCode === 39) navNext();
    });
    window.addEventListener("keyup", function (e) {
        if (e.keyCode === 37) navPrev();
    });
});

