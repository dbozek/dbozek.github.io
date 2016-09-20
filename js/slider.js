
// JavaScript plugin tutorial: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin
// Plugin wzorcowy: Wallop https://github.com/peduarte/wallop

(function() {

    // konstruktor
    this.coolSlider = function() {

        // Create global element references
        this.slides = Array.prototype.slice.call(document.getElementsByClassName("m-slider_listElem"),0);
        this.activeSlideIndex = this.slides.indexOf(document.getElementsByClassName("is-active"));
        this.prevBtn = document.getElementsByClassName("m-slider_btnPrev");
        this.nextBtn = document.getElementsByClassName("m-slider_btnNext");

        this.bindEvents();
        this.createCustomEvent();

         // ustawienia domyślne
         var defaults = {
            width: "100%"
        }

        // przypisanie ustawień z wywołania obiektu
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    // ***** Public Methods *****

    coolSlider.prototype.prev = function () {
        removeClass(this.slides[this.activeSlideIndex], "is-active");
        addClass(this.slides[this.activeSlideIndex-1], "is-active");
    };

    coolSlider.prototype.next = function () {
        removeClass(this.slides[this.activeSlideIndex], "is-active");
        addClass(this.slides[this.activeSlideIndex+1], "is-active");
    };

    // obsuga zdarzeń
    coolSlider.prototype.bindEvents = function () {

        if (this.prevBtn) {
            this.prevBtn.addEventListener("click", function (event) {
                event.preventDefault();
                this.prev();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener("click", function (event) {
                event.preventDefault();
                this.next();
            });
        }

    };

    // ***** Private Methods *****

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function addClass(element, className) {
        if (!element) { return; }
        element.className = (element.className + ' ' + className).trim();
    }

    function removeClass(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '').trim();
    }

}());
