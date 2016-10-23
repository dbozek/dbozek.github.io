// JavaScript plugin tutorial: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin
// Plugin wzorcowy: Wallop https://github.com/peduarte/wallop

(function() {

    // ***** KONSTRUKTOR *****
    this.coolSlider = function() {

        // definicja elementow podstawowych
        this.slides = Array.prototype.slice.call(document.getElementsByClassName("m-slider_listElem"),0);
        this.activeSlideIndex = this.slides.indexOf(document.getElementsByClassName("is-active"));
        this.prevBtn = document.getElementsByClassName("m-slider_btnPrev");
        this.nextBtn = document.getElementsByClassName("m-slider_btnNext");

        //ustawienie aktywnego slajdu w przypadku braku klasy "is-active"
        if (this.activeSlideIndex === -1) {
            this.activeSlideIndex = 0;
            addClass(this.slides[this.activeSlideIndex], "is-active");
        }

        if (this.activeSlideIndex == 0) {
            addClass(this.nextBtn[0], "is-active");
        }

        //wywolanie funkcji obsługujących slider
        this.bindEvents();

         // ustawienia domyślne
         var defaults = {
            width: "100%"
        }

        // przypisanie ustawień z wywołania obiektu
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

    }

    // ***** METODY PUBLICZNE *****

    //definicja funkcji obslugującej button prev
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

    //definicja funkcji obslugującej button next
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

    // obsługa zdarzeń
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


    // ***** METODY PRYWATNE *****

    //funkcja przepisująca ustawienia domyslne na ustawienia w wywołaniu noweg obiektu
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    //dodanie klasy do elementu
    function addClass(element, className) {
        if (!element) { return; }
        element.className = (element.className + ' ' + className).trim();
    }

    //usunięcie klasy z elementu
    function removeClass(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '').trim();
    }

}());
