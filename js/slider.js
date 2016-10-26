// JavaScript plugin tutorial: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin
// Plugin wth similar functionality: Wallop https://github.com/peduarte/wallop

(function() {

    // ***** CONSTRUCTOR *****
    this.coolSlider = function(selector) {

        // basic elements definition
        this.slides = Array.prototype.slice.call(document.getElementsByClassName(selector),0);
        this.activeSlideIndex = this.slides.indexOf(document.getElementsByClassName("is-active"));
        this.prevBtn = document.getElementsByClassName("m-slider_btnPrev");
        this.nextBtn = document.getElementsByClassName("m-slider_btnNext");

        // setup first slide as active slide
        if (this.activeSlideIndex === -1) {
            this.activeSlideIndex = 0;
            addClass(this.slides[this.activeSlideIndex], "is-active");
        }

        if (this.activeSlideIndex == 0) {
            addClass(this.nextBtn[0], "is-active");
        }

        // functions call
        this.bindEvents();

         // default settings
         var defaults = {
            width: "100%",
            buttons: "true",
            autoplay: "true",
            slideTime: "300"
        }

        // rewrite custom settings
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    // ***** PUBLIC METHODS *****

    // prev button functionality
    coolSlider.prototype.prev = function () {
        if (0 != this.activeSlideIndex) {
            if (this.slides.length-1 == this.activeSlideIndex) {
                addClass(this.nextBtn[0], "is-active");
            }
            removeClass(this.slides[this.activeSlideIndex], "is-active");
            this.activeSlideIndex = this.activeSlideIndex-1;
            addClass(this.slides[this.activeSlideIndex], "is-active");
            if (0 == this.activeSlideIndex) {
                removeClass(this.prevBtn[0], "is-active");
            }
        }
    };

    // next button functionality
    coolSlider.prototype.next = function () {
        if (this.slides.length-1 != this.activeSlideIndex) {
            removeClass(this.slides[this.activeSlideIndex], "is-active");
            this.activeSlideIndex = this.activeSlideIndex+1;
            addClass(this.slides[this.activeSlideIndex], "is-active");
            if (1 == this.activeSlideIndex) {
                addClass(this.prevBtn[0], "is-active");
            }
            if (this.slides.length-1 == this.activeSlideIndex) {
                removeClass(this.nextBtn[0], "is-active");
            }
        }
    };

    // events catch
    coolSlider.prototype.bindEvents = function () {

        var self = this;

        if (this.prevBtn) {
            this.prevBtn[0].addEventListener("click", function (e) {
                e.preventDefault();
                self.prev();
            });
        }

        if (this.nextBtn) {
            this.nextBtn[0].addEventListener("click", function (e) {
                e.preventDefault();
                self.next();
            });
        }

    };

    // ***** PRIVATE METHODS *****

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    };

    // add class to selector
    function addClass(element, className) {
        if (!element) { return; }
        element.className = (element.className + ' ' + className).trim();
    };

    // remove class from selector
    function removeClass(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '').trim();
    };

}());
