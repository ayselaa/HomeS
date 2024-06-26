// JavaScript autoComplete v1.0.4
// https://github.com/Pixabay/JavaScript-autoComplete
var autoComplete = function () { function e(e) { function t(e, t) { return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className) } function o(e, t, o) { e.attachEvent ? e.attachEvent("on" + t, o) : e.addEventListener(t, o) } function s(e, t, o) { e.detachEvent ? e.detachEvent("on" + t, o) : e.removeEventListener(t, o) } function n(e, s, n, l) { o(l || document, s, function (o) { for (var s, l = o.target || o.srcElement; l && !(s = t(l, e));)l = l.parentElement; s && n.call(l, o) }) } if (document.querySelector) { var l = { selector: 0, source: 0, minChars: 3, delay: 150, offsetLeft: 0, offsetTop: 1, cache: 1, menuClass: "", renderItem: function (e, t) { t = t.replace(/[-\/\\^$$*+?.()|[\]{}]/g, "\\$$&"); var o = new RegExp("(" + t.split(" ").join("|") + ")", "gi"); return '<div class="autocomplete-suggestion" data-val="' + e + '">' + e.replace(o, "<b>$$1</b>") + "</div>" }, onSelect: function () { } }; for (var c in e) e.hasOwnProperty(c) && (l[c] = e[c]); for (var a = "object" == typeof l.selector ? [l.selector] : document.querySelectorAll(l.selector), u = 0; u < a.length; u++) { var i = a[u]; i.sc = document.createElement("div"), i.sc.className = "autocomplete-suggestions " + l.menuClass, i.autocompleteAttr = i.getAttribute("autocomplete"), i.setAttribute("autocomplete", "off"), i.cache = {}, i.last_val = "", i.updateSC = function (e, t) { var o = i.getBoundingClientRect(); if (i.sc.style.left = Math.round(o.left + (window.pageXOffset || document.documentElement.scrollLeft) + l.offsetLeft) + "px", i.sc.style.top = Math.round(o.bottom + (window.pageYOffset || document.documentElement.scrollTop) + l.offsetTop) + "px", i.sc.style.width = Math.round(o.right - o.left) + "px", !e && (i.sc.style.display = "block", i.sc.maxHeight || (i.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(i.sc, null) : i.sc.currentStyle).maxHeight)), i.sc.suggestionHeight || (i.sc.suggestionHeight = i.sc.querySelector(".autocomplete-suggestion").offsetHeight), i.sc.suggestionHeight)) if (t) { var s = i.sc.scrollTop, n = t.getBoundingClientRect().top - i.sc.getBoundingClientRect().top; n + i.sc.suggestionHeight - i.sc.maxHeight > 0 ? i.sc.scrollTop = n + i.sc.suggestionHeight + s - i.sc.maxHeight : 0 > n && (i.sc.scrollTop = n + s) } else i.sc.scrollTop = 0 }, o(window, "resize", i.updateSC), document.body.appendChild(i.sc), n("autocomplete-suggestion", "mouseleave", function () { var e = i.sc.querySelector(".autocomplete-suggestion.selected"); e && setTimeout(function () { e.className = e.className.replace("selected", "") }, 20) }, i.sc), n("autocomplete-suggestion", "mouseover", function () { var e = i.sc.querySelector(".autocomplete-suggestion.selected"); e && (e.className = e.className.replace("selected", "")), this.className += " selected" }, i.sc), n("autocomplete-suggestion", "mousedown", function (e) { if (t(this, "autocomplete-suggestion")) { var o = this.getAttribute("data-val"); i.value = o, l.onSelect(e, o, this), i.sc.style.display = "none" } }, i.sc), i.blurHandler = function () { try { var e = document.querySelector(".autocomplete-suggestions:hover") } catch (t) { var e = 0 } e ? i !== document.activeElement && setTimeout(function () { i.focus() }, 20) : (i.last_val = i.value, i.sc.style.display = "none", setTimeout(function () { i.sc.style.display = "none" }, 350)) }, o(i, "blur", i.blurHandler); var r = function (e) { var t = i.value; if (i.cache[t] = e, e.length && t.length >= l.minChars) { for (var o = "", s = 0; s < e.length; s++)o += l.renderItem(e[s], t); i.sc.innerHTML = o, i.updateSC(0) } else i.sc.style.display = "none" }; i.keydownHandler = function (e) { var t = window.event ? e.keyCode : e.which; if ((40 == t || 38 == t) && i.sc.innerHTML) { var o, s = i.sc.querySelector(".autocomplete-suggestion.selected"); return s ? (o = 40 == t ? s.nextSibling : s.previousSibling, o ? (s.className = s.className.replace("selected", ""), o.className += " selected", i.value = o.getAttribute("data-val")) : (s.className = s.className.replace("selected", ""), i.value = i.last_val, o = 0)) : (o = 40 == t ? i.sc.querySelector(".autocomplete-suggestion") : i.sc.childNodes[i.sc.childNodes.length - 1], o.className += " selected", i.value = o.getAttribute("data-val")), i.updateSC(0, o), !1 } if (27 == t) i.value = i.last_val, i.sc.style.display = "none"; else if (13 == t || 9 == t) { var s = i.sc.querySelector(".autocomplete-suggestion.selected"); s && "none" != i.sc.style.display && (l.onSelect(e, s.getAttribute("data-val"), s), setTimeout(function () { i.sc.style.display = "none" }, 20)) } }, o(i, "keydown", i.keydownHandler), i.keyupHandler = function (e) { var t = window.event ? e.keyCode : e.which; if (!t || (35 > t || t > 40) && 13 != t && 27 != t) { var o = i.value; if (o.length >= l.minChars) { if (o != i.last_val) { if (i.last_val = o, clearTimeout(i.timer), l.cache) { if (o in i.cache) return void r(i.cache[o]); for (var s = 1; s < o.length - l.minChars; s++) { var n = o.slice(0, o.length - s); if (n in i.cache && !i.cache[n].length) return void r([]) } } i.timer = setTimeout(function () { l.source(o, r) }, l.delay) } } else i.last_val = o, i.sc.style.display = "none" } }, o(i, "keyup", i.keyupHandler), i.focusHandler = function (e) { i.last_val = "\n", i.keyupHandler(e) }, l.minChars || o(i, "focus", i.focusHandler) } this.destroy = function () { for (var e = 0; e < a.length; e++) { var t = a[e]; s(window, "resize", t.updateSC), s(t, "blur", t.blurHandler), s(t, "focus", t.focusHandler), s(t, "keydown", t.keydownHandler), s(t, "keyup", t.keyupHandler), t.autocompleteAttr ? t.setAttribute("autocomplete", t.autocompleteAttr) : t.removeAttribute("autocomplete"), document.body.removeChild(t.sc), t = null } } } } return e }(); !function () { "function" == typeof define && define.amd ? define("autoComplete", function () { return autoComplete }) : "undefined" != typeof module && module.exports ? module.exports = autoComplete : window.autoComplete = autoComplete }();
/*!
 * formbouncerjs v1.4.5
 * A lightweight form validation script that augments native HTML5 form validation elements and attributes.
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/bouncer
 *
 * ################################################################################################################
 * ### MODIFIED by UDG ###
 * Modifications in 'init'-, 'publicAPIs.destroy'-, 'blurHandler'-Method and 'patternMismatch'-Method. New method 'preventBlurHandler' added.
 * -> Prevents short flickering of validation messages for checkboxes
 * -> Prevents multiple bindings of eventlisteners for document
 * -> Fixes missingValue field type for selects. (changed from 'select' to 'select-one')
 * ################################################################################################################
 */

/* jshint ignore:start */
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

    // Full polyfill for browsers with no classList support
    // Including IE < Edge missing SVGElement.classList
    if (!("classList" in document.createElement("_"))
        || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

        (function (view) {

            "use strict";

            if (!('Element' in view)) return;

            var
                classListProp = "classList"
                , protoProp = "prototype"
                , elemCtrProto = view.Element[protoProp]
                , objCtr = Object
                , strTrim = String[protoProp].trim || function () {
                    return this.replace(/^\s+|\s+$$/g, "");
                }
                , arrIndexOf = Array[protoProp].indexOf || function (item) {
                    var
                        i = 0
                        , len = this.length
                        ;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                }
                // Vendors: please allow content code to instantiate DOMExceptions
                , DOMEx = function (type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message;
                }
                , checkTokenAndGetIndex = function (classList, token) {
                    if (token === "") {
                        throw new DOMEx(
                            "SYNTAX_ERR"
                            , "An invalid or illegal string was specified"
                        );
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx(
                            "INVALID_CHARACTER_ERR"
                            , "String contains an invalid character"
                        );
                    }
                    return arrIndexOf.call(classList, token);
                }
                , ClassList = function (elem) {
                    var
                        trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                        , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                        , i = 0
                        , len = classes.length
                        ;
                    for (; i < len; i++) {
                        this.push(classes[i]);
                    }
                    this._updateClassName = function () {
                        elem.setAttribute("class", this.toString());
                    };
                }
                , classListProto = ClassList[protoProp] = []
                , classListGetter = function () {
                    return new ClassList(this);
                }
                ;
            // Most DOMException implementations don't allow calling DOMException's toString()
            // on non-DOMExceptions. Error's toString() is sufficient here.
            DOMEx[protoProp] = Error[protoProp];
            classListProto.item = function (i) {
                return this[i] || null;
            };
            classListProto.contains = function (token) {
                token += "";
                return checkTokenAndGetIndex(this, token) !== -1;
            };
            classListProto.add = function () {
                var
                    tokens = arguments
                    , i = 0
                    , l = tokens.length
                    , token
                    , updated = false
                    ;
                do {
                    token = tokens[i] + "";
                    if (checkTokenAndGetIndex(this, token) === -1) {
                        this.push(token);
                        updated = true;
                    }
                }
                while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };
            classListProto.remove = function () {
                var
                    tokens = arguments
                    , i = 0
                    , l = tokens.length
                    , token
                    , updated = false
                    , index
                    ;
                do {
                    token = tokens[i] + "";
                    index = checkTokenAndGetIndex(this, token);
                    while (index !== -1) {
                        this.splice(index, 1);
                        updated = true;
                        index = checkTokenAndGetIndex(this, token);
                    }
                }
                while (++i < l);

                if (updated) {
                    this._updateClassName();
                }
            };
            classListProto.toggle = function (token, force) {
                token += "";

                var
                    result = this.contains(token)
                    , method = result ?
                        force !== true && "remove"
                        :
                        force !== false && "add"
                    ;

                if (method) {
                    this[method](token);
                }

                if (force === true || force === false) {
                    return force;
                } else {
                    return !result;
                }
            };
            classListProto.toString = function () {
                return this.join(" ");
            };

            if (objCtr.defineProperty) {
                var classListPropDesc = {
                    get: classListGetter
                    , enumerable: true
                    , configurable: true
                };
                try {
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                } catch (ex) { // IE 8 doesn't support enumerable:true
                    // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                    // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                    if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                        classListPropDesc.enumerable = false;
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    }
                }
            } else if (objCtr[protoProp].__defineGetter__) {
                elemCtrProto.__defineGetter__(classListProp, classListGetter);
            }

        }(self));

    }

    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
        "use strict";

        var testElement = document.createElement("_");

        testElement.classList.add("c1", "c2");

        // Polyfill for IE 10/11 and Firefox <26, where classList.add and
        // classList.remove exist but support only one argument at a time.
        if (!testElement.classList.contains("c2")) {
            var createMethod = function (method) {
                var original = DOMTokenList.prototype[method];

                DOMTokenList.prototype[method] = function (token) {
                    var i, len = arguments.length;

                    for (i = 0; i < len; i++) {
                        token = arguments[i];
                        original.call(this, token);
                    }
                };
            };
            createMethod('add');
            createMethod('remove');
        }

        testElement.classList.toggle("c3", false);

        // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
        // support the second argument.
        if (testElement.classList.contains("c3")) {
            var _toggle = DOMTokenList.prototype.toggle;

            DOMTokenList.prototype.toggle = function (token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                    return force;
                } else {
                    return _toggle.call(this, token);
                }
            };

        }

        testElement = null;
    }());

}
/* jshint ignore:end */
/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
        var el = this;
        var ancestor = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (ancestor.matches(s)) return ancestor;
            ancestor = ancestor.parentElement;
        } while (ancestor !== null);
        return null;
    };
}
/**
 * CustomEvent() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], (function () {
            return factory(root);
        }));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.Bouncer = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

    'use strict';

    //
    // Variables
    //

    var eventBindingInitialized = false,
        defaults = {

            // Classes & IDs

            fieldClass: 'error',
            errorClass: 'error-message',
            fieldPrefix: 'bouncer-field_',
            errorPrefix: 'bouncer-error_',

            // Patterns
            patterns: {
                email: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$$/,
                url: /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$$/,
                number: /^(?:[-+]?[0-9]*[.,]?[0-9]+)$$/,
                color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$$/,
                date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
                time: /^(?:(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]))$$/,
                month: /^(?:(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])))$$/
            },

            // Custom Validations
            customValidations: {},

            // Messages
            messageAfterField: true,
            messageCustom: 'data-bouncer-message',
            messageTarget: 'data-bouncer-target',
            messages: {
                missingValue: {
                    checkbox: 'This field is required.',
                    radio: 'Please select a value.',
                    'select-one': 'Please select a value.',
                    'select-multiple': 'Please select at least one value.',
                    default: 'Please fill out this field.'
                },
                patternMismatch: {
                    email: 'Please enter a valid email address.',
                    url: 'Please enter a URL.',
                    number: 'Please enter a number',
                    color: 'Please match the following format: #rrggbb',
                    date: 'Please use the YYYY-MM-DD format',
                    time: 'Please use the 24-hour time format. Ex. 23:00',
                    month: 'Please use the YYYY-MM format',
                    default: 'Please match the requested format.'
                },
                outOfRange: {
                    over: 'Please select a value that is no more than {max}.',
                    under: 'Please select a value that is no less than {min}.'
                },
                wrongLength: {
                    over: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.',
                    under: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.'
                },
                fallback: 'There was an error with this field.'
            },

            // Form Submission
            disableSubmit: false,

            // Custom Events
            emitEvents: true

        };


    //
    // Methods
    //

    /**
     * A wrapper for Array.prototype.forEach() for non-arrays
     * @param  {Array-like} arr      The array-like object
     * @param  {Function}   callback The callback to run
     */
    var forEach = function (arr, callback) {
        Array.prototype.forEach.call(arr, callback);
    };

    /**
     * Merge two or more objects together.
     * @param   {Object}   objects  The objects to merge together
     * @returns {Object}            Merged values of defaults and options
     */
    var extend = function () {
        var merged = {};
        forEach(arguments, (function (obj) {
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) return;
                if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
                    merged[key] = extend(merged[key], obj[key]);
                } else {
                    merged[key] = obj[key];
                }
                // merged[key] = obj[key];
            }
        }));
        return merged;
    };

    /**
     * Emit a custom event
     * @param  {String} type    The event type
     * @param  {Object} options The settings object
     * @param  {Node}   anchor  The anchor element
     * @param  {Node}   toggle  The toggle element
     */
    var emitEvent = function (elem, type, details) {
        if (typeof window.CustomEvent !== 'function') return;
        var event = new CustomEvent(type, {
            bubbles: true,
            detail: details || {}
        });
        elem.dispatchEvent(event);
    };

    /**
     * Add the `novalidate` attribute to all forms
     * @param {Boolean} remove  If true, remove the `novalidate` attribute
     */
    var addNoValidate = function (selector) {
        forEach(document.querySelectorAll(selector), (function (form) {
            form.setAttribute('novalidate', true);
        }));
    };

    /**
     * Remove the `novalidate` attribute to all forms
     */
    var removeNoValidate = function (selector) {
        forEach(document.querySelectorAll(selector), (function (form) {
            form.removeAttribute('novalidate');
        }));
    };

    /**
     * Check if a required field is missing its value
     * @param  {Node} field The field to check
     * @return {Boolean}       It true, field is missing it's value
     */
    var missingValue = function (field) {

        // If not required, bail
        if (!field.hasAttribute('required')) return false;

        // Handle checkboxes
        if (field.type === 'checkbox') {
            return !field.checked;
        }

        // Get the field value length
        var length = field.value.length;

        // Handle radio buttons
        if (field.type === 'radio') {
            length = Array.prototype.filter.call(field.form.querySelectorAll('[name="' + escapeCharacters(field.name) + '"]'), (function (btn) {
                return btn.checked;
            })).length;
        }

        // Check for value
        return length < 1;

    };

    /**
     * Check if field value doesn't match a patter.
     * @param  {Node}   field    The field to check
     * @param  {Object} settings The plugin settings
     * @see https://www.w3.org/TR/html51/sec-forms.html#the-pattern-attribute
     * @return {Boolean}         If true, there's a pattern mismatch
     */
    var patternMismatch = function (field, settings) {
        // Fixes an issue, that all email fields will be validated by the default email pattern. Those who have no 'required'-attribute too.
        if (field.type === 'email' && !field.hasAttribute('required')) {
            return false;
        }

        // Check if there's a pattern to match
        var pattern = field.getAttribute('pattern');
        pattern = pattern ? new RegExp('^(?:' + pattern + ')$$') : settings.patterns[field.type];
        if (!pattern || !field.value || field.value.length < 1) return false;

        // Validate the pattern
        return field.value.match(pattern) ? false : true;

    };

    /**
     * Check if field value is out-of-range
     * @param  {Node}    field    The field to check
     * @return {String}           Returns 'over', 'under', or false
     */
    var outOfRange = function (field) {

        // Make sure field has value
        if (!field.value || field.value.length < 1) return false;

        // Check for range
        var max = field.getAttribute('max');
        var min = field.getAttribute('min');

        // Check validity
        var num = parseFloat(field.value);
        if (max && num > max) return 'over';
        if (min && num < min) return 'under';
        return false;

    };

    /**
     * Check if the field value is too long or too short
     * @param  {Node}   field    The field to check
     * @return {String}           Returns 'over', 'under', or false
     */
    var wrongLength = function (field) {

        // Make sure field has value
        if (!field.value || field.value.length < 1) return false;

        // Check for min/max length
        var max = field.getAttribute('maxlength');
        var min = field.getAttribute('minlength');

        // Check validity
        var length = field.value.length;
        if (max && length > max) return 'over';
        if (min && length < min) return 'under';
        return false;

    };

    /**
     * Test for standard field validations
     * @param  {Node}   field    The field to test
     * @param  {Object} settings The plugin settings
     * @return {Object}          The tests and their results
     */
    var runValidations = function (field, settings) {
        return {
            missingValue: missingValue(field),
            patternMismatch: patternMismatch(field, settings),
            outOfRange: outOfRange(field),
            wrongLength: wrongLength(field)
        };
    };

    /**
     * Run any provided custom validations
     * @param  {Node}   field       The field to test
     * @param  {Object} errors      The existing errors
     * @param  {Object} validations The custom validations to run
     * @param  {Object} settings    The plugin settings
     * @return {Object}             The tests and their results
     */
    var customValidations = function (field, errors, validations, settings) {
        for (var test in validations) {
            if (validations.hasOwnProperty(test)) {
                errors[test] = validations[test](field, settings);
            }
        }
        return errors;
    };

    /**
     * Check if a field has any errors
     * @param  {Object}  errors The validation test results
     * @return {Boolean}        Returns true if there are errors
     */
    var hasErrors = function (errors) {
        for (var type in errors) {
            if (errors[type]) return true;
        }
        return false;
    };

    /**
     * Check a field for errors
     * @param  {Node} field      The field to test
     * @param  {Object} settings The plugin settings
     * @return {Object}          The field validity and errors
     */
    var getErrors = function (field, settings) {

        // Get standard validation errors
        var errors = runValidations(field, settings);

        // Check for custom validations
        errors = customValidations(field, errors, settings.customValidations, settings);

        return {
            valid: !hasErrors(errors),
            errors: errors
        };

    };

    /**
     * Escape special characters for use with querySelector
     * @author Mathias Bynens
     * @link https://github.com/mathiasbynens/CSS.escape
     * @param {String} id The anchor ID to escape
     */
    var escapeCharacters = function (id) {

        var string = String(id);
        var length = string.length;
        var index = -1;
        var codeUnit;
        var result = '';
        var firstCodeUnit = string.charCodeAt(0);
        while (++index < length) {
            codeUnit = string.charCodeAt(index);
            // Note: thereâ€™s no need to special-case astral symbols, surrogate
            // pairs, or lone surrogates.

            // If the character is NULL (U+0000), then throw an
            // `InvalidCharacterError` exception and terminate these steps.
            if (codeUnit === 0x0000) {
                throw new InvalidCharacterError(
                    'Invalid character: the input contains U+0000.'
                );
            }

            if (
                // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
                // U+007F, [â€¦]
                (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
                // If the character is the first character and is in the range [0-9]
                // (U+0030 to U+0039), [â€¦]
                (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
                // If the character is the second character and is in the range [0-9]
                // (U+0030 to U+0039) and the first character is a `-` (U+002D), [â€¦]
                (
                    index === 1 &&
                    codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
                    firstCodeUnit === 0x002D
                )
            ) {
                // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
                result += '\\' + codeUnit.toString(16) + ' ';
                continue;
            }

            // If the character is not handled by one of the above rules and is
            // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
            // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
            // U+005A), or [a-z] (U+0061 to U+007A), [â€¦]
            if (
                codeUnit >= 0x0080 ||
                codeUnit === 0x002D ||
                codeUnit === 0x005F ||
                codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
                codeUnit >= 0x0041 && codeUnit <= 0x005A ||
                codeUnit >= 0x0061 && codeUnit <= 0x007A
            ) {
                // the character itself
                result += string.charAt(index);
                continue;
            }

            // Otherwise, the escaped character.
            // http://dev.w3.org/csswg/cssom/#escape-a-character
            result += '\\' + string.charAt(index);

        }

        // Return sanitized hash
        return result;

    };

    /**
     * Get or create an ID for a field
     * @param  {Node}    field    The field
     * @param  {Object}  settings The plugin settings
     * @param  {Boolean} create   If true, create an ID if there isn't one
     * @return {String}           The field ID
     */
    var getFieldID = function (field, settings, create) {
        var id = field.name ? field.name : field.id;
        if (!id && create) {
            id = settings.fieldPrefix + Math.floor(Math.random() * 999);
            field.id = id;
        }
        if (field.type === 'checkbox') {
            id += '_' + (field.value || field.id);
        }
        return id;
    };

    /**
     * Special handling for radio buttons and checkboxes wrapped in labels.
     * @param  {Node} field The field with the error
     * @return {Node}       The field to show the error on
     */
    var getErrorField = function (field) {

        // If the field is a radio button, get the last item in the radio group
        // @todo if location is before, get first item
        if (field.type === 'radio' && field.name) {
            var group = field.form.querySelectorAll('[name="' + escapeCharacters(field.name) + '"]');
            field = group[group.length - 1];
        }

        // Get the associated label for radio button or checkbox
        if (field.type === 'radio' || field.type === 'checkbox') {
            var label = field.closest('label') || field.form.querySelector('[for="' + field.id + '"]');
            field = label || field;
        }

        return field;

    };

    /**
     * Get the location for a field's error message
     * @param  {Node}   field    The field
     * @param  {Node}   target   The target for error message
     * @param  {Object} settings The plugin settings
     * @return {Node}            The error location
     */
    var getErrorLocation = function (field, target, settings) {

        // Check for a custom error message
        var selector = field.getAttribute(settings.messageTarget);
        if (selector) {
            var location = field.form.querySelector(selector);
            if (location) {
                // @bugfix by @HaroldPutman
                // https://github.com/cferdinandi/bouncer/pull/28
                return location.firstChild || location.appendChild(document.createTextNode(''));
            }
        }

        // If the message should come after the field
        if (settings.messageAfterField) {
            return target.nextSibling;
        }

        // If it should come before
        return target;

    };

    /**
     * Create a validation error message node
     * @param  {Node} field      The field
     * @param  {Object} settings The plugin settings
     * @return {Node}            The error message node
     */
    var createError = function (field, settings) {

        // Create the error message
        var error = document.createElement('div');
        error.className = settings.errorClass;
        error.id = settings.errorPrefix + getFieldID(field, settings, true);

        // If the field is a radio button or checkbox, grab the last field label
        var fieldTarget = getErrorField(field);

        // Inject the error message into the DOM
        var location = getErrorLocation(field, fieldTarget, settings);
        location.parentNode.insertBefore(error, location);

        return error;

    };

    /**
     * Get the error message test
     * @param  {Node}            field    The field to get an error message for
     * @param  {Object}          errors   The errors on the field
     * @param  {Object}          settings The plugin settings
     * @return {String|Function}          The error message
     */
    var getErrorMessage = function (field, errors, settings) {

        // Variables
        var messages = settings.messages;

        // Missing value error
        if (errors.missingValue) {
            return messages.missingValue[field.type] || messages.missingValue.default;
        }

        // Numbers that are out of range
        if (errors.outOfRange) {
            return messages.outOfRange[errors.outOfRange].replace('{max}', field.getAttribute('max')).replace('{min}', field.getAttribute('min')).replace('{length}', field.value.length);
        }

        // Values that are too long or short
        if (errors.wrongLength) {
            return messages.wrongLength[errors.wrongLength].replace('{maxLength}', field.getAttribute('maxlength')).replace('{minLength}', field.getAttribute('minlength')).replace('{length}', field.value.length);
        }

        // Pattern mismatch error
        if (errors.patternMismatch) {
            var custom = field.getAttribute(settings.messageCustom);
            if (custom) return custom;
            return messages.patternMismatch[field.type] || messages.patternMismatch.default;
        }

        // Custom validations
        for (var test in settings.customValidations) {
            if (settings.customValidations.hasOwnProperty(test)) {
                if (errors[test] && messages[test]) return messages[test];
            }
        }

        // Fallback error message
        return messages.fallback;

    };

    /**
     * Add error attributes to a field
     * @param  {Node}   field    The field with the error message
     * @param  {Node}   error    The error message
     * @param  {Object} settings The plugin settings
     */
    var addErrorAttributes = function (field, error, settings) {
        field.classList.add(settings.fieldClass);
        field.setAttribute('aria-describedby', error.id);
        field.setAttribute('aria-invalid', true);
    };

    /**
     * Show error attributes on a field or radio/checkbox group
     * @param  {Node}   field    The field with the error message
     * @param  {Node}   error    The error message
     * @param  {Object} settings The plugin settings
     */
    var showErrorAttributes = function (field, error, settings) {

        // If field is a radio button, add attributes to every button in the group
        if (field.type === 'radio' && field.name) {
            Array.prototype.forEach.call(document.querySelectorAll('[name="' + field.name + '"]'), (function (button) {
                addErrorAttributes(button, error, settings);
            }));
        }

        // Otherwise, add an error class and aria attribute to the field
        addErrorAttributes(field, error, settings);

    };

    /**
     * Show an error message in the DOM
     * @param  {Node} field      The field to show an error message for
     * @param  {Object}          errors   The errors on the field
     * @param  {Object}          settings The plugin settings
     */
    var showError = function (field, errors, settings) {

        // Get/create an error message
        var error = field.form.querySelector('#' + escapeCharacters(settings.errorPrefix + getFieldID(field, settings))) || createError(field, settings);
        var msg = getErrorMessage(field, errors, settings);
        error.textContent = typeof msg === 'function' ? msg(field, settings) : msg;

        // Add error attributes
        showErrorAttributes(field, error, settings);

        // Emit custom event
        if (settings.emitEvents) {
            emitEvent(field, 'bouncerShowError', {
                errors: errors
            });
        }

    };

    /**
     * Remove error attributes from a field
     * @param  {Node}   field    The field with the error message
     * @param  {Node}   error    The error message
     * @param  {Object} settings The plugin settings
     */
    var removeAttributes = function (field, settings) {
        field.classList.remove(settings.fieldClass);
        field.removeAttribute('aria-describedby');
        field.removeAttribute('aria-invalid');
    };

    /**
     * Remove error attributes from the field or radio group
     * @param  {Node}   field    The field with the error message
     * @param  {Node}   error    The error message
     * @param  {Object} settings The plugin settings
     */
    var removeErrorAttributes = function (field, settings) {

        // If field is a radio button, remove attributes from every button in the group
        if (field.type === 'radio' && field.name) {
            Array.prototype.forEach.call(document.querySelectorAll('[name="' + field.name + '"]'), (function (button) {
                removeAttributes(button, settings);
            }));
            return;
        }

        // Otherwise, add an error class and aria attribute to the field
        removeAttributes(field, settings);

    };

    /**
     * Remove an error message from the DOM
     * @param  {Node} field      The field with the error message
     * @param  {Object} settings The plugin settings
     */
    var removeError = function (field, settings) {

        // Get the error message for this field
        var error = field.form.querySelector('#' + escapeCharacters(settings.errorPrefix + getFieldID(field, settings)));
        if (!error) return;

        // Remove the error
        error.parentNode.removeChild(error);

        // Remove error and a11y from the field
        removeErrorAttributes(field, settings);

        // Emit custom event
        if (settings.emitEvents) {
            emitEvent(field, 'bouncerRemoveError');
        }

    };

    /**
     * Remove errors from all fields
     * @param  {String} selector The selector for the form
     * @param  {Object} settings The plugin settings
     */
    var removeAllErrors = function (selector, settings) {
        forEach(document.querySelectorAll(selector), (function (form) {
            forEach(form.querySelectorAll('input, select, textarea'), (function (field) {
                removeError(field, settings);
            }));
        }));
    };

    /**
     * The plugin constructor
     * @param {String} selector The selector to use for forms to be validated
     * @param {Object} options  User settings [optional]
     */
    var Constructor = function (selector, options) {

        //
        // Variables
        //

        var publicAPIs = {};
        var settings;


        //
        // Methods
        //

        /**
         * Validate a field
         * @param  {Node} field     The field to validate
         * @param  {Object} options Validation options
         * @return {Object}         The validity state and errors
         */
        publicAPIs.validate = function (field, options) {

            // Don't validate submits, buttons, file and reset inputs, and disabled and readonly fields
            if (field.disabled || field.readOnly || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

            // Local settings
            var _settings = extend(settings, options || {});

            // Check for errors
            var isValid = getErrors(field, _settings);

            // If valid, remove any error messages
            if (isValid.valid) {
                removeError(field, _settings);
                return;
            }

            // Otherwise, show an error message
            showError(field, isValid.errors, _settings);

            return isValid;

        };

        /**
         * Validate all fields in a form or section
         * @param  {Node} target The form or section to validate fields in
         * @return {Array}       An array of fields with errors
         */
        publicAPIs.validateAll = function (target) {
            return Array.prototype.filter.call(target.querySelectorAll('input, select, textarea'), (function (field) {
                var validate = publicAPIs.validate(field);
                return validate && !validate.valid;
            }));
        };

        /**
         * Run a validation on field blur
         */
        var blurHandler = function (event) {

            // Only run if the field is in a form to be validated
            if (!event.target.form || !event.target.form.matches(selector)) return;

            // Remove prevent-blur data attribute if exists and prevents validation on blur
            if (event.target.dataset['preventBlur']) {
                delete event.target.dataset['preventBlur'];
                return;
            }

            // Validate the field
            publicAPIs.validate(event.target);

        };

        /**
         * Prevents validation on field blur (necessary for some cases)
         */
        var preventBlurHandler = function (event) {
            var element = document.getElementById(event.target.htmlFor);

            // Only run if the field is in a form to be validated
            if (!event.target.form || !event.target.form.matches(selector)) return;

            // Sets prevent-blur data attribute to prevent the next validation on blur.
            if (element && element.type && element.type === 'checkbox' && element.checked === false) {
                element.dataset.preventBlur = true;
            }
        };

        /**
         * Run a validation on a fields with errors when the value changes
         */
        var inputHandler = function (event) {

            // Only run if the field is in a form to be validated
            if (!event.target.form || !event.target.form.matches(selector)) return;

            // Only run on fields with errors
            if (!event.target.classList.contains(settings.fieldClass)) return;

            // Validate the field
            publicAPIs.validate(event.target);

        };

        /**
         * Validate an entire form when it's submitted
         */
        var submitHandler = function (event) {

            // Only run on matching elements
            if (!event.target.matches(selector)) return;

            // Prevent form submission
            event.preventDefault();

            // Validate each field
            var errors = publicAPIs.validateAll(event.target);

            // If there are errors, focus on the first one
            if (errors.length > 0) {
                errors[0].focus();
                emitEvent(event.target, 'bouncerFormInvalid', { errors: errors });
                return;
            }

            // Otherwise, submit if not disabled
            if (!settings.disableSubmit) {
                event.target.submit();
            }

            // Emit custom event
            if (settings.emitEvents) {
                emitEvent(event.target, 'bouncerFormValid');
            }

        };

        /**
         * Destroy the current plugin instantiation
         */
        publicAPIs.destroy = function () {

            // Remove event listeners
            document.removeEventListener('blur', blurHandler, true);
            document.removeEventListener('input', inputHandler, false);
            document.removeEventListener('click', inputHandler, false);
            document.removeEventListener('submit', submitHandler, false);
            document.removeEventListener('mousedown', preventBlurHandler, false);
            document.removeEventListener('touchstart', preventBlurHandler, false);

            // Remove all errors
            removeAllErrors(selector, settings);

            // Remove novalidate attribute
            removeNoValidate(selector);

            // Emit custom event
            if (settings.emitEvents) {
                emitEvent(document, 'bouncerDestroyed', {
                    settings: settings
                });
            }

            // Reset settings
            settings = null;

        };

        /**
         * Instantiate a new instance of the plugin
         */
        var init = function () {
            // Create settings
            settings = extend(defaults, options || {});

            // Add novalidate attribute
            addNoValidate(selector);

            // Prevents binding of multiple event listeners on document
            if (!eventBindingInitialized) {
                // Event Listeners
                document.addEventListener('blur', blurHandler, true);
                document.addEventListener('input', inputHandler, false);
                document.addEventListener('click', inputHandler, false);
                document.addEventListener('submit', submitHandler, false);
                document.addEventListener('mousedown', preventBlurHandler, false);
                document.addEventListener('touchstart', preventBlurHandler, false);

                eventBindingInitialized = true;
            }

            // Emit custom event
            if (settings.emitEvents) {
                emitEvent(document, 'bouncerInitialized', {
                    settings: settings
                });
            }
        };

        //
        // Inits & Event Listeners
        //

        init();
        return publicAPIs;

    };


    //
    // Return the constructor
    //

    return Constructor;

}));

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.7.3
 *
 * Copyright 2018 Chart.js Contributors
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function (t) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else { ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Chart = t() } }(function () { return function o(r, s, l) { function u(e, t) { if (!s[e]) { if (!r[e]) { var i = "function" == typeof require && require; if (!t && i) return i(e, !0); if (d) return d(e, !0); var n = new Error("Cannot find module '" + e + "'"); throw n.code = "MODULE_NOT_FOUND", n } var a = s[e] = { exports: {} }; r[e][0].call(a.exports, function (t) { return u(r[e][1][t] || t) }, a, a.exports, o, r, s, l) } return s[e].exports } for (var d = "function" == typeof require && require, t = 0; t < l.length; t++)u(l[t]); return u }({ 1: [function (t, e, i) { }, {}], 2: [function (t, e, i) { var o = t(6); function n(t) { if (t) { var e = [0, 0, 0], i = 1, n = t.match(/^#([a-fA-F0-9]{3})$$/i); if (n) { n = n[1]; for (var a = 0; a < e.length; a++)e[a] = parseInt(n[a] + n[a], 16) } else if (n = t.match(/^#([a-fA-F0-9]{6})$$/i)) { n = n[1]; for (a = 0; a < e.length; a++)e[a] = parseInt(n.slice(2 * a, 2 * a + 2), 16) } else if (n = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$$/i)) { for (a = 0; a < e.length; a++)e[a] = parseInt(n[a + 1]); i = parseFloat(n[4]) } else if (n = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$$/i)) { for (a = 0; a < e.length; a++)e[a] = Math.round(2.55 * parseFloat(n[a + 1])); i = parseFloat(n[4]) } else if (n = t.match(/(\w+)/)) { if ("transparent" == n[1]) return [0, 0, 0, 0]; if (!(e = o[n[1]])) return } for (a = 0; a < e.length; a++)e[a] = d(e[a], 0, 255); return i = i || 0 == i ? d(i, 0, 1) : 1, e[3] = i, e } } function a(t) { if (t) { var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/); if (e) { var i = parseFloat(e[4]); return [d(parseInt(e[1]), 0, 360), d(parseFloat(e[2]), 0, 100), d(parseFloat(e[3]), 0, 100), d(isNaN(i) ? 1 : i, 0, 1)] } } } function r(t) { if (t) { var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/); if (e) { var i = parseFloat(e[4]); return [d(parseInt(e[1]), 0, 360), d(parseFloat(e[2]), 0, 100), d(parseFloat(e[3]), 0, 100), d(isNaN(i) ? 1 : i, 0, 1)] } } } function s(t, e) { return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")" } function l(t, e) { return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")" } function u(t, e) { return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")" } function d(t, e, i) { return Math.min(Math.max(e, t), i) } function c(t) { var e = t.toString(16).toUpperCase(); return e.length < 2 ? "0" + e : e } e.exports = { getRgba: n, getHsla: a, getRgb: function (t) { var e = n(t); return e && e.slice(0, 3) }, getHsl: function (t) { var e = a(t); return e && e.slice(0, 3) }, getHwb: r, getAlpha: function (t) { var e = n(t); { if (e) return e[3]; if (e = a(t)) return e[3]; if (e = r(t)) return e[3] } }, hexString: function (t) { return "#" + c(t[0]) + c(t[1]) + c(t[2]) }, rgbString: function (t, e) { if (e < 1 || t[3] && t[3] < 1) return s(t, e); return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")" }, rgbaString: s, percentString: function (t, e) { if (e < 1 || t[3] && t[3] < 1) return l(t, e); var i = Math.round(t[0] / 255 * 100), n = Math.round(t[1] / 255 * 100), a = Math.round(t[2] / 255 * 100); return "rgb(" + i + "%, " + n + "%, " + a + "%)" }, percentaString: l, hslString: function (t, e) { if (e < 1 || t[3] && t[3] < 1) return u(t, e); return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)" }, hslaString: u, hwbString: function (t, e) { void 0 === e && (e = void 0 !== t[3] ? t[3] : 1); return "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")" }, keyword: function (t) { return h[t.slice(0, 3)] } }; var h = {}; for (var f in o) h[o[f]] = f }, { 6: 6 }], 3: [function (t, e, i) { var d = t(5), n = t(2), r = function (t) { return t instanceof r ? t : this instanceof r ? (this.valid = !1, this.values = { rgb: [0, 0, 0], hsl: [0, 0, 0], hsv: [0, 0, 0], hwb: [0, 0, 0], cmyk: [0, 0, 0, 0], alpha: 1 }, void ("string" == typeof t ? (e = n.getRgba(t)) ? this.setValues("rgb", e) : (e = n.getHsla(t)) ? this.setValues("hsl", e) : (e = n.getHwb(t)) && this.setValues("hwb", e) : "object" == typeof t && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e)))) : new r(t); var e }; r.prototype = { isValid: function () { return this.valid }, rgb: function () { return this.setSpace("rgb", arguments) }, hsl: function () { return this.setSpace("hsl", arguments) }, hsv: function () { return this.setSpace("hsv", arguments) }, hwb: function () { return this.setSpace("hwb", arguments) }, cmyk: function () { return this.setSpace("cmyk", arguments) }, rgbArray: function () { return this.values.rgb }, hslArray: function () { return this.values.hsl }, hsvArray: function () { return this.values.hsv }, hwbArray: function () { var t = this.values; return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb }, cmykArray: function () { return this.values.cmyk }, rgbaArray: function () { var t = this.values; return t.rgb.concat([t.alpha]) }, hslaArray: function () { var t = this.values; return t.hsl.concat([t.alpha]) }, alpha: function (t) { return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this) }, red: function (t) { return this.setChannel("rgb", 0, t) }, green: function (t) { return this.setChannel("rgb", 1, t) }, blue: function (t) { return this.setChannel("rgb", 2, t) }, hue: function (t) { return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t) }, saturation: function (t) { return this.setChannel("hsl", 1, t) }, lightness: function (t) { return this.setChannel("hsl", 2, t) }, saturationv: function (t) { return this.setChannel("hsv", 1, t) }, whiteness: function (t) { return this.setChannel("hwb", 1, t) }, blackness: function (t) { return this.setChannel("hwb", 2, t) }, value: function (t) { return this.setChannel("hsv", 2, t) }, cyan: function (t) { return this.setChannel("cmyk", 0, t) }, magenta: function (t) { return this.setChannel("cmyk", 1, t) }, yellow: function (t) { return this.setChannel("cmyk", 2, t) }, black: function (t) { return this.setChannel("cmyk", 3, t) }, hexString: function () { return n.hexString(this.values.rgb) }, rgbString: function () { return n.rgbString(this.values.rgb, this.values.alpha) }, rgbaString: function () { return n.rgbaString(this.values.rgb, this.values.alpha) }, percentString: function () { return n.percentString(this.values.rgb, this.values.alpha) }, hslString: function () { return n.hslString(this.values.hsl, this.values.alpha) }, hslaString: function () { return n.hslaString(this.values.hsl, this.values.alpha) }, hwbString: function () { return n.hwbString(this.values.hwb, this.values.alpha) }, keyword: function () { return n.keyword(this.values.rgb, this.values.alpha) }, rgbNumber: function () { var t = this.values.rgb; return t[0] << 16 | t[1] << 8 | t[2] }, luminosity: function () { for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) { var n = t[i] / 255; e[i] = n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4) } return .2126 * e[0] + .7152 * e[1] + .0722 * e[2] }, contrast: function (t) { var e = this.luminosity(), i = t.luminosity(); return i < e ? (e + .05) / (i + .05) : (i + .05) / (e + .05) }, level: function (t) { var e = this.contrast(t); return 7.1 <= e ? "AAA" : 4.5 <= e ? "AA" : "" }, dark: function () { var t = this.values.rgb; return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128 }, light: function () { return !this.dark() }, negate: function () { for (var t = [], e = 0; e < 3; e++)t[e] = 255 - this.values.rgb[e]; return this.setValues("rgb", t), this }, lighten: function (t) { var e = this.values.hsl; return e[2] += e[2] * t, this.setValues("hsl", e), this }, darken: function (t) { var e = this.values.hsl; return e[2] -= e[2] * t, this.setValues("hsl", e), this }, saturate: function (t) { var e = this.values.hsl; return e[1] += e[1] * t, this.setValues("hsl", e), this }, desaturate: function (t) { var e = this.values.hsl; return e[1] -= e[1] * t, this.setValues("hsl", e), this }, whiten: function (t) { var e = this.values.hwb; return e[1] += e[1] * t, this.setValues("hwb", e), this }, blacken: function (t) { var e = this.values.hwb; return e[2] += e[2] * t, this.setValues("hwb", e), this }, greyscale: function () { var t = this.values.rgb, e = .3 * t[0] + .59 * t[1] + .11 * t[2]; return this.setValues("rgb", [e, e, e]), this }, clearer: function (t) { var e = this.values.alpha; return this.setValues("alpha", e - e * t), this }, opaquer: function (t) { var e = this.values.alpha; return this.setValues("alpha", e + e * t), this }, rotate: function (t) { var e = this.values.hsl, i = (e[0] + t) % 360; return e[0] = i < 0 ? 360 + i : i, this.setValues("hsl", e), this }, mix: function (t, e) { var i = this, n = t, a = void 0 === e ? .5 : e, o = 2 * a - 1, r = i.alpha() - n.alpha(), s = ((o * r == -1 ? o : (o + r) / (1 + o * r)) + 1) / 2, l = 1 - s; return this.rgb(s * i.red() + l * n.red(), s * i.green() + l * n.green(), s * i.blue() + l * n.blue()).alpha(i.alpha() * a + n.alpha() * (1 - a)) }, toJSON: function () { return this.rgb() }, clone: function () { var t, e, i = new r, n = this.values, a = i.values; for (var o in n) n.hasOwnProperty(o) && (t = n[o], "[object Array]" === (e = {}.toString.call(t)) ? a[o] = t.slice(0) : "[object Number]" === e ? a[o] = t : console.error("unexpected color value:", t)); return i } }, r.prototype.spaces = { rgb: ["red", "green", "blue"], hsl: ["hue", "saturation", "lightness"], hsv: ["hue", "saturation", "value"], hwb: ["hue", "whiteness", "blackness"], cmyk: ["cyan", "magenta", "yellow", "black"] }, r.prototype.maxes = { rgb: [255, 255, 255], hsl: [360, 100, 100], hsv: [360, 100, 100], hwb: [360, 100, 100], cmyk: [100, 100, 100, 100] }, r.prototype.getValues = function (t) { for (var e = this.values, i = {}, n = 0; n < t.length; n++)i[t.charAt(n)] = e[t][n]; return 1 !== e.alpha && (i.a = e.alpha), i }, r.prototype.setValues = function (t, e) { var i, n, a = this.values, o = this.spaces, r = this.maxes, s = 1; if (this.valid = !0, "alpha" === t) s = e; else if (e.length) a[t] = e.slice(0, t.length), s = e[t.length]; else if (void 0 !== e[t.charAt(0)]) { for (i = 0; i < t.length; i++)a[t][i] = e[t.charAt(i)]; s = e.a } else if (void 0 !== e[o[t][0]]) { var l = o[t]; for (i = 0; i < t.length; i++)a[t][i] = e[l[i]]; s = e.alpha } if (a.alpha = Math.max(0, Math.min(1, void 0 === s ? a.alpha : s)), "alpha" === t) return !1; for (i = 0; i < t.length; i++)n = Math.max(0, Math.min(r[t][i], a[t][i])), a[t][i] = Math.round(n); for (var u in o) u !== t && (a[u] = d[t][u](a[t])); return !0 }, r.prototype.setSpace = function (t, e) { var i = e[0]; return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this) }, r.prototype.setChannel = function (t, e, i) { var n = this.values[t]; return void 0 === i ? n[e] : (i === n[e] || (n[e] = i, this.setValues(t, n)), this) }, "undefined" != typeof window && (window.Color = r), e.exports = r }, { 2: 2, 5: 5 }], 4: [function (t, e, i) { function a(t) { var e, i, n = t[0] / 255, a = t[1] / 255, o = t[2] / 255, r = Math.min(n, a, o), s = Math.max(n, a, o), l = s - r; return s == r ? e = 0 : n == s ? e = (a - o) / l : a == s ? e = 2 + (o - n) / l : o == s && (e = 4 + (n - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), i = (r + s) / 2, [e, 100 * (s == r ? 0 : i <= .5 ? l / (s + r) : l / (2 - s - r)), 100 * i] } function n(t) { var e, i, n = t[0], a = t[1], o = t[2], r = Math.min(n, a, o), s = Math.max(n, a, o), l = s - r; return i = 0 == s ? 0 : l / s * 1e3 / 10, s == r ? e = 0 : n == s ? e = (a - o) / l : a == s ? e = 2 + (o - n) / l : o == s && (e = 4 + (n - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), [e, i, s / 255 * 1e3 / 10] } function o(t) { var e = t[0], i = t[1], n = t[2]; return [a(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(i, n))), 100 * (n = 1 - 1 / 255 * Math.max(e, Math.max(i, n)))] } function s(t) { var e, i = t[0] / 255, n = t[1] / 255, a = t[2] / 255; return [100 * ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - a))) / (1 - e) || 0), 100 * ((1 - n - e) / (1 - e) || 0), 100 * ((1 - a - e) / (1 - e) || 0), 100 * e] } function l(t) { return S[JSON.stringify(t)] } function u(t) { var e = t[0] / 255, i = t[1] / 255, n = t[2] / 255; return [100 * (.4124 * (e = .04045 < e ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (i = .04045 < i ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92) + .1805 * (n = .04045 < n ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92)), 100 * (.2126 * e + .7152 * i + .0722 * n), 100 * (.0193 * e + .1192 * i + .9505 * n)] } function d(t) { var e = u(t), i = e[0], n = e[1], a = e[2]; return n /= 100, a /= 108.883, i = .008856 < (i /= 95.047) ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, [116 * (n = .008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (i - n), 200 * (n - (a = .008856 < a ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116))] } function c(t) { var e, i, n, a, o, r = t[0] / 360, s = t[1] / 100, l = t[2] / 100; if (0 == s) return [o = 255 * l, o, o]; e = 2 * l - (i = l < .5 ? l * (1 + s) : l + s - l * s), a = [0, 0, 0]; for (var u = 0; u < 3; u++)(n = r + 1 / 3 * -(u - 1)) < 0 && n++, 1 < n && n--, o = 6 * n < 1 ? e + 6 * (i - e) * n : 2 * n < 1 ? i : 3 * n < 2 ? e + (i - e) * (2 / 3 - n) * 6 : e, a[u] = 255 * o; return a } function h(t) { var e = t[0] / 60, i = t[1] / 100, n = t[2] / 100, a = Math.floor(e) % 6, o = e - Math.floor(e), r = 255 * n * (1 - i), s = 255 * n * (1 - i * o), l = 255 * n * (1 - i * (1 - o)); n *= 255; switch (a) { case 0: return [n, l, r]; case 1: return [s, n, r]; case 2: return [r, n, l]; case 3: return [r, s, n]; case 4: return [l, r, n]; case 5: return [n, r, s] } } function f(t) { var e, i, n, a, o = t[0] / 360, s = t[1] / 100, l = t[2] / 100, u = s + l; switch (1 < u && (s /= u, l /= u), n = 6 * o - (e = Math.floor(6 * o)), 0 != (1 & e) && (n = 1 - n), a = s + n * ((i = 1 - l) - s), e) { default: case 6: case 0: r = i, g = a, b = s; break; case 1: r = a, g = i, b = s; break; case 2: r = s, g = i, b = a; break; case 3: r = s, g = a, b = i; break; case 4: r = a, g = s, b = i; break; case 5: r = i, g = s, b = a }return [255 * r, 255 * g, 255 * b] } function p(t) { var e = t[0] / 100, i = t[1] / 100, n = t[2] / 100, a = t[3] / 100; return [255 * (1 - Math.min(1, e * (1 - a) + a)), 255 * (1 - Math.min(1, i * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a))] } function m(t) { var e, i, n, a = t[0] / 100, o = t[1] / 100, r = t[2] / 100; return i = -.9689 * a + 1.8758 * o + .0415 * r, n = .0557 * a + -.204 * o + 1.057 * r, e = .0031308 < (e = 3.2406 * a + -1.5372 * o + -.4986 * r) ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, i = .0031308 < i ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, n = .0031308 < n ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (i = Math.min(Math.max(0, i), 1)), 255 * (n = Math.min(Math.max(0, n), 1))] } function v(t) { var e = t[0], i = t[1], n = t[2]; return i /= 100, n /= 108.883, e = .008856 < (e /= 95.047) ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (i = .008856 < i ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (e - i), 200 * (i - (n = .008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))] } function x(t) { var e, i, n, a, o = t[0], r = t[1], s = t[2]; return a = o <= 8 ? (i = 100 * o / 903.3) / 100 * 7.787 + 16 / 116 : (i = 100 * Math.pow((o + 16) / 116, 3), Math.pow(i / 100, 1 / 3)), [e = e / 95.047 <= .008856 ? e = 95.047 * (r / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(r / 500 + a, 3), i, n = n / 108.883 <= .008859 ? n = 108.883 * (a - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - s / 200, 3)] } function y(t) { var e, i = t[0], n = t[1], a = t[2]; return (e = 360 * Math.atan2(a, n) / 2 / Math.PI) < 0 && (e += 360), [i, Math.sqrt(n * n + a * a), e] } function k(t) { return m(x(t)) } function M(t) { var e, i = t[0], n = t[1]; return e = t[2] / 360 * 2 * Math.PI, [i, n * Math.cos(e), n * Math.sin(e)] } function w(t) { return C[t] } e.exports = { rgb2hsl: a, rgb2hsv: n, rgb2hwb: o, rgb2cmyk: s, rgb2keyword: l, rgb2xyz: u, rgb2lab: d, rgb2lch: function (t) { return y(d(t)) }, hsl2rgb: c, hsl2hsv: function (t) { var e = t[0], i = t[1] / 100, n = t[2] / 100; return 0 !== n ? [e, 100 * (2 * (i *= (n *= 2) <= 1 ? n : 2 - n) / (n + i)), 100 * ((n + i) / 2)] : [0, 0, 0] }, hsl2hwb: function (t) { return o(c(t)) }, hsl2cmyk: function (t) { return s(c(t)) }, hsl2keyword: function (t) { return l(c(t)) }, hsv2rgb: h, hsv2hsl: function (t) { var e, i, n = t[0], a = t[1] / 100, o = t[2] / 100; return e = a * o, [n, 100 * (e = (e /= (i = (2 - a) * o) <= 1 ? i : 2 - i) || 0), 100 * (i /= 2)] }, hsv2hwb: function (t) { return o(h(t)) }, hsv2cmyk: function (t) { return s(h(t)) }, hsv2keyword: function (t) { return l(h(t)) }, hwb2rgb: f, hwb2hsl: function (t) { return a(f(t)) }, hwb2hsv: function (t) { return n(f(t)) }, hwb2cmyk: function (t) { return s(f(t)) }, hwb2keyword: function (t) { return l(f(t)) }, cmyk2rgb: p, cmyk2hsl: function (t) { return a(p(t)) }, cmyk2hsv: function (t) { return n(p(t)) }, cmyk2hwb: function (t) { return o(p(t)) }, cmyk2keyword: function (t) { return l(p(t)) }, keyword2rgb: w, keyword2hsl: function (t) { return a(w(t)) }, keyword2hsv: function (t) { return n(w(t)) }, keyword2hwb: function (t) { return o(w(t)) }, keyword2cmyk: function (t) { return s(w(t)) }, keyword2lab: function (t) { return d(w(t)) }, keyword2xyz: function (t) { return u(w(t)) }, xyz2rgb: m, xyz2lab: v, xyz2lch: function (t) { return y(v(t)) }, lab2xyz: x, lab2rgb: k, lab2lch: y, lch2lab: M, lch2xyz: function (t) { return x(M(t)) }, lch2rgb: function (t) { return k(M(t)) } }; var C = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, S = {}; for (var _ in C) S[JSON.stringify(C[_])] = _ }, {}], 5: [function (t, e, i) { var a = t(4), o = function () { return new u }; for (var n in a) { o[n + "Raw"] = function (e) { return function (t) { return "number" == typeof t && (t = Array.prototype.slice.call(arguments)), a[e](t) } }(n); var r = /(\w+)2(\w+)/.exec(n), s = r[1], l = r[2]; (o[s] = o[s] || {})[l] = o[n] = function (n) { return function (t) { "number" == typeof t && (t = Array.prototype.slice.call(arguments)); var e = a[n](t); if ("string" == typeof e || void 0 === e) return e; for (var i = 0; i < e.length; i++)e[i] = Math.round(e[i]); return e } }(n) } var u = function () { this.convs = {} }; u.prototype.routeSpace = function (t, e) { var i = e[0]; return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i)) }, u.prototype.setValues = function (t, e) { return this.space = t, this.convs = {}, this.convs[t] = e, this }, u.prototype.getValues = function (t) { var e = this.convs[t]; if (!e) { var i = this.space, n = this.convs[i]; e = o[i][t](n), this.convs[t] = e } return e }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (e) { u.prototype[e] = function (t) { return this.routeSpace(e, arguments) } }), e.exports = o }, { 4: 4 }], 6: [function (t, e, i) { "use strict"; e.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] } }, {}], 7: [function (t, e, i) { var n = t(30)(); n.helpers = t(46), t(28)(n), n.Animation = t(22), n.animationService = t(23), n.defaults = t(26), n.Element = t(27), n.elements = t(41), n.Interaction = t(29), n.layouts = t(31), n.platform = t(49), n.plugins = t(32), n.Scale = t(33), n.scaleService = t(34), n.Ticks = t(35), n.Tooltip = t(36), t(24)(n), t(25)(n), t(56)(n), t(54)(n), t(55)(n), t(57)(n), t(58)(n), t(59)(n), t(15)(n), t(16)(n), t(17)(n), t(18)(n), t(19)(n), t(20)(n), t(21)(n), t(8)(n), t(9)(n), t(10)(n), t(11)(n), t(12)(n), t(13)(n), t(14)(n); var a = t(50); for (var o in a) a.hasOwnProperty(o) && n.plugins.register(a[o]); n.platform.initialize(), e.exports = n, "undefined" != typeof window && (window.Chart = n), n.Legend = a.legend._element, n.Title = a.title._element, n.pluginService = n.plugins, n.PluginBase = n.Element.extend({}), n.canvasHelpers = n.helpers.canvas, n.layoutService = n.layouts }, { 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 41: 41, 46: 46, 49: 49, 50: 50, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 8: 8, 9: 9 }], 8: [function (t, e, i) { "use strict"; e.exports = function (i) { i.Bar = function (t, e) { return e.type = "bar", new i(t, e) } } }, {}], 9: [function (t, e, i) { "use strict"; e.exports = function (i) { i.Bubble = function (t, e) { return e.type = "bubble", new i(t, e) } } }, {}], 10: [function (t, e, i) { "use strict"; e.exports = function (i) { i.Doughnut = function (t, e) { return e.type = "doughnut", new i(t, e) } } }, {}], 11: [function (t, e, i) { "use strict"; e.exports = function (i) { i.Line = function (t, e) { return e.type = "line", new i(t, e) } } }, {}], 12: [function (t, e, i) { "use strict"; e.exports = function (i) { i.PolarArea = function (t, e) { return e.type = "polarArea", new i(t, e) } } }, {}], 13: [function (t, e, i) { "use strict"; e.exports = function (i) { i.Radar = function (t, e) { return e.type = "radar", new i(t, e) } } }, {}], 14: [function (t, e, i) { "use strict"; e.exports = function (i) { i.Scatter = function (t, e) { return e.type = "scatter", new i(t, e) } } }, {}], 15: [function (t, e, i) { "use strict"; var n = t(26), a = t(41), S = t(46); n._set("bar", { hover: { mode: "label" }, scales: { xAxes: [{ type: "category", categoryPercentage: .8, barPercentage: .9, offset: !0, gridLines: { offsetGridLines: !0 } }], yAxes: [{ type: "linear" }] } }), n._set("horizontalBar", { hover: { mode: "index", axis: "y" }, scales: { xAxes: [{ type: "linear", position: "bottom" }], yAxes: [{ position: "left", type: "category", categoryPercentage: .8, barPercentage: .9, offset: !0, gridLines: { offsetGridLines: !0 } }] }, elements: { rectangle: { borderSkipped: "left" } }, tooltips: { callbacks: { title: function (t, e) { var i = ""; return 0 < t.length && (t[0].yLabel ? i = t[0].yLabel : 0 < e.labels.length && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i }, label: function (t, e) { return (e.datasets[t.datasetIndex].label || "") + ": " + t.xLabel } }, mode: "index", axis: "y" } }), e.exports = function (e) { e.controllers.bar = e.DatasetController.extend({ dataElementType: a.Rectangle, initialize: function () { var t; e.DatasetController.prototype.initialize.apply(this, arguments), (t = this.getMeta()).stack = this.getDataset().stack, t.bar = !0 }, update: function (t) { var e, i, n = this.getMeta().data; for (this._ruler = this.getRuler(), e = 0, i = n.length; e < i; ++e)this.updateElement(n[e], e, t) }, updateElement: function (t, e, i) { var n = this, a = n.chart, o = n.getMeta(), r = n.getDataset(), s = t.custom || {}, l = a.options.elements.rectangle; t._xScale = n.getScaleForId(o.xAxisID), t._yScale = n.getScaleForId(o.yAxisID), t._datasetIndex = n.index, t._index = e, t._model = { datasetLabel: r.label, label: a.data.labels[e], borderSkipped: s.borderSkipped ? s.borderSkipped : l.borderSkipped, backgroundColor: s.backgroundColor ? s.backgroundColor : S.valueAtIndexOrDefault(r.backgroundColor, e, l.backgroundColor), borderColor: s.borderColor ? s.borderColor : S.valueAtIndexOrDefault(r.borderColor, e, l.borderColor), borderWidth: s.borderWidth ? s.borderWidth : S.valueAtIndexOrDefault(r.borderWidth, e, l.borderWidth) }, n.updateElementGeometry(t, e, i), t.pivot() }, updateElementGeometry: function (t, e, i) { var n = this, a = t._model, o = n.getValueScale(), r = o.getBasePixel(), s = o.isHorizontal(), l = n._ruler || n.getRuler(), u = n.calculateBarValuePixels(n.index, e), d = n.calculateBarIndexPixels(n.index, e, l); a.horizontal = s, a.base = i ? r : u.base, a.x = s ? i ? r : u.head : d.center, a.y = s ? d.center : i ? r : u.head, a.height = s ? d.size : void 0, a.width = s ? void 0 : d.size }, getValueScaleId: function () { return this.getMeta().yAxisID }, getIndexScaleId: function () { return this.getMeta().xAxisID }, getValueScale: function () { return this.getScaleForId(this.getValueScaleId()) }, getIndexScale: function () { return this.getScaleForId(this.getIndexScaleId()) }, _getStacks: function (t) { var e, i, n = this.chart, a = this.getIndexScale().options.stacked, o = void 0 === t ? n.data.datasets.length : t + 1, r = []; for (e = 0; e < o; ++e)(i = n.getDatasetMeta(e)).bar && n.isDatasetVisible(e) && (!1 === a || !0 === a && -1 === r.indexOf(i.stack) || void 0 === a && (void 0 === i.stack || -1 === r.indexOf(i.stack))) && r.push(i.stack); return r }, getStackCount: function () { return this._getStacks().length }, getStackIndex: function (t, e) { var i = this._getStacks(t), n = void 0 !== e ? i.indexOf(e) : -1; return -1 === n ? i.length - 1 : n }, getRuler: function () { var t, e, i = this.getIndexScale(), n = this.getStackCount(), a = this.index, o = i.isHorizontal(), r = o ? i.left : i.top, s = r + (o ? i.width : i.height), l = []; for (t = 0, e = this.getMeta().data.length; t < e; ++t)l.push(i.getPixelForValue(null, t, a)); return { min: S.isNullOrUndef(i.options.barThickness) ? function (t, e) { var i, n, a, o, r = t.isHorizontal() ? t.width : t.height, s = t.getTicks(); for (a = 1, o = e.length; a < o; ++a)r = Math.min(r, e[a] - e[a - 1]); for (a = 0, o = s.length; a < o; ++a)n = t.getPixelForTick(a), r = 0 < a ? Math.min(r, n - i) : r, i = n; return r }(i, l) : -1, pixels: l, start: r, end: s, stackCount: n, scale: i } }, calculateBarValuePixels: function (t, e) { var i, n, a, o, r, s, l = this.chart, u = this.getMeta(), d = this.getValueScale(), c = l.data.datasets, h = d.getRightValue(c[t].data[e]), f = d.options.stacked, g = u.stack, p = 0; if (f || void 0 === f && void 0 !== g) for (i = 0; i < t; ++i)(n = l.getDatasetMeta(i)).bar && n.stack === g && n.controller.getValueScaleId() === d.id && l.isDatasetVisible(i) && (a = d.getRightValue(c[i].data[e]), (h < 0 && a < 0 || 0 <= h && 0 < a) && (p += a)); return o = d.getPixelForValue(p), { size: s = ((r = d.getPixelForValue(p + h)) - o) / 2, base: o, head: r, center: r + s / 2 } }, calculateBarIndexPixels: function (t, e, i) { var n, a, o, r, s, l, u, d, c, h, f, g, p, m, v, b, x, y = i.scale.options, k = "flex" === y.barThickness ? (c = e, f = y, p = (h = i).pixels, m = p[c], v = 0 < c ? p[c - 1] : null, b = c < p.length - 1 ? p[c + 1] : null, x = f.categoryPercentage, null === v && (v = m - (null === b ? h.end - m : b - m)), null === b && (b = m + m - v), g = m - (m - v) / 2 * x, { chunk: (b - v) / 2 * x / h.stackCount, ratio: f.barPercentage, start: g }) : (n = e, a = i, l = (o = y).barThickness, u = a.stackCount, d = a.pixels[n], s = S.isNullOrUndef(l) ? (r = a.min * o.categoryPercentage, o.barPercentage) : (r = l * u, 1), { chunk: r / u, ratio: s, start: d - r / 2 }), M = this.getStackIndex(t, this.getMeta().stack), w = k.start + k.chunk * M + k.chunk / 2, C = Math.min(S.valueOrDefault(y.maxBarThickness, 1 / 0), k.chunk * k.ratio); return { base: w - C / 2, head: w + C / 2, center: w, size: C } }, draw: function () { var t = this.chart, e = this.getValueScale(), i = this.getMeta().data, n = this.getDataset(), a = i.length, o = 0; for (S.canvas.clipArea(t.ctx, t.chartArea); o < a; ++o)isNaN(e.getRightValue(n.data[o])) || i[o].draw(); S.canvas.unclipArea(t.ctx) } }), e.controllers.horizontalBar = e.controllers.bar.extend({ getValueScaleId: function () { return this.getMeta().xAxisID }, getIndexScaleId: function () { return this.getMeta().yAxisID } }) } }, { 26: 26, 41: 41, 46: 46 }], 16: [function (t, e, i) { "use strict"; var n = t(26), a = t(41), g = t(46); n._set("bubble", { hover: { mode: "single" }, scales: { xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }], yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }] }, tooltips: { callbacks: { title: function () { return "" }, label: function (t, e) { var i = e.datasets[t.datasetIndex].label || "", n = e.datasets[t.datasetIndex].data[t.index]; return i + ": (" + t.xLabel + ", " + t.yLabel + ", " + n.r + ")" } } } }), e.exports = function (t) { t.controllers.bubble = t.DatasetController.extend({ dataElementType: a.Point, update: function (i) { var n = this, t = n.getMeta().data; g.each(t, function (t, e) { n.updateElement(t, e, i) }) }, updateElement: function (t, e, i) { var n = this, a = n.getMeta(), o = t.custom || {}, r = n.getScaleForId(a.xAxisID), s = n.getScaleForId(a.yAxisID), l = n._resolveElementOptions(t, e), u = n.getDataset().data[e], d = n.index, c = i ? r.getPixelForDecimal(.5) : r.getPixelForValue("object" == typeof u ? u : NaN, e, d), h = i ? s.getBasePixel() : s.getPixelForValue(u, e, d); t._xScale = r, t._yScale = s, t._options = l, t._datasetIndex = d, t._index = e, t._model = { backgroundColor: l.backgroundColor, borderColor: l.borderColor, borderWidth: l.borderWidth, hitRadius: l.hitRadius, pointStyle: l.pointStyle, rotation: l.rotation, radius: i ? 0 : l.radius, skip: o.skip || isNaN(c) || isNaN(h), x: c, y: h }, t.pivot() }, setHoverStyle: function (t) { var e = t._model, i = t._options; t.$$previousStyle = { backgroundColor: e.backgroundColor, borderColor: e.borderColor, borderWidth: e.borderWidth, radius: e.radius }, e.backgroundColor = g.valueOrDefault(i.hoverBackgroundColor, g.getHoverColor(i.backgroundColor)), e.borderColor = g.valueOrDefault(i.hoverBorderColor, g.getHoverColor(i.borderColor)), e.borderWidth = g.valueOrDefault(i.hoverBorderWidth, i.borderWidth), e.radius = i.radius + i.hoverRadius }, _resolveElementOptions: function (t, e) { var i, n, a, o = this.chart, r = o.data.datasets[this.index], s = t.custom || {}, l = o.options.elements.point, u = g.options.resolve, d = r.data[e], c = {}, h = { chart: o, dataIndex: e, dataset: r, datasetIndex: this.index }, f = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle", "rotation"]; for (i = 0, n = f.length; i < n; ++i)c[a = f[i]] = u([s[a], r[a], l[a]], h, e); return c.radius = u([s.radius, d ? d.r : void 0, r.radius, l.radius], h, e), c } }) } }, { 26: 26, 41: 41, 46: 46 }], 17: [function (t, e, i) { "use strict"; var n = t(26), a = t(41), A = t(46); n._set("doughnut", { animation: { animateRotate: !0, animateScale: !1 }, hover: { mode: "single" }, legendCallback: function (t) { var e = []; e.push('<ul class="' + t.id + '-legend">'); var i = t.data, n = i.datasets, a = i.labels; if (n.length) for (var o = 0; o < n[0].data.length; ++o)e.push('<li><span style="background-color:' + n[0].backgroundColor[o] + '"></span>'), a[o] && e.push(a[o]), e.push("</li>"); return e.push("</ul>"), e.join("") }, legend: { labels: { generateLabels: function (l) { var u = l.data; return u.labels.length && u.datasets.length ? u.labels.map(function (t, e) { var i = l.getDatasetMeta(0), n = u.datasets[0], a = i.data[e], o = a && a.custom || {}, r = A.valueAtIndexOrDefault, s = l.options.elements.arc; return { text: t, fillStyle: o.backgroundColor ? o.backgroundColor : r(n.backgroundColor, e, s.backgroundColor), strokeStyle: o.borderColor ? o.borderColor : r(n.borderColor, e, s.borderColor), lineWidth: o.borderWidth ? o.borderWidth : r(n.borderWidth, e, s.borderWidth), hidden: isNaN(n.data[e]) || i.data[e].hidden, index: e } }) : [] } }, onClick: function (t, e) { var i, n, a, o = e.index, r = this.chart; for (i = 0, n = (r.data.datasets || []).length; i < n; ++i)(a = r.getDatasetMeta(i)).data[o] && (a.data[o].hidden = !a.data[o].hidden); r.update() } }, cutoutPercentage: 50, rotation: -.5 * Math.PI, circumference: 2 * Math.PI, tooltips: { callbacks: { title: function () { return "" }, label: function (t, e) { var i = e.labels[t.index], n = ": " + e.datasets[t.datasetIndex].data[t.index]; return A.isArray(i) ? (i = i.slice())[0] += n : i += n, i } } } }), n._set("pie", A.clone(n.doughnut)), n._set("pie", { cutoutPercentage: 0 }), e.exports = function (t) { t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({ dataElementType: a.Arc, linkScales: A.noop, getRingIndex: function (t) { for (var e = 0, i = 0; i < t; ++i)this.chart.isDatasetVisible(i) && ++e; return e }, update: function (i) { var n = this, t = n.chart, e = t.chartArea, a = t.options, o = a.elements.arc, r = e.right - e.left - o.borderWidth, s = e.bottom - e.top - o.borderWidth, l = Math.min(r, s), u = { x: 0, y: 0 }, d = n.getMeta(), c = a.cutoutPercentage, h = a.circumference; if (h < 2 * Math.PI) { var f = a.rotation % (2 * Math.PI), g = (f += 2 * Math.PI * (f >= Math.PI ? -1 : f < -Math.PI ? 1 : 0)) + h, p = Math.cos(f), m = Math.sin(f), v = Math.cos(g), b = Math.sin(g), x = f <= 0 && 0 <= g || f <= 2 * Math.PI && 2 * Math.PI <= g, y = f <= .5 * Math.PI && .5 * Math.PI <= g || f <= 2.5 * Math.PI && 2.5 * Math.PI <= g, k = f <= -Math.PI && -Math.PI <= g || f <= Math.PI && Math.PI <= g, M = f <= .5 * -Math.PI && .5 * -Math.PI <= g || f <= 1.5 * Math.PI && 1.5 * Math.PI <= g, w = c / 100, C = k ? -1 : Math.min(p * (p < 0 ? 1 : w), v * (v < 0 ? 1 : w)), S = M ? -1 : Math.min(m * (m < 0 ? 1 : w), b * (b < 0 ? 1 : w)), _ = x ? 1 : Math.max(p * (0 < p ? 1 : w), v * (0 < v ? 1 : w)), D = y ? 1 : Math.max(m * (0 < m ? 1 : w), b * (0 < b ? 1 : w)), P = .5 * (_ - C), I = .5 * (D - S); l = Math.min(r / P, s / I), u = { x: -.5 * (_ + C), y: -.5 * (D + S) } } t.borderWidth = n.getMaxBorderWidth(d.data), t.outerRadius = Math.max((l - t.borderWidth) / 2, 0), t.innerRadius = Math.max(c ? t.outerRadius / 100 * c : 0, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), t.offsetX = u.x * t.outerRadius, t.offsetY = u.y * t.outerRadius, d.total = n.calculateTotal(), n.outerRadius = t.outerRadius - t.radiusLength * n.getRingIndex(n.index), n.innerRadius = Math.max(n.outerRadius - t.radiusLength, 0), A.each(d.data, function (t, e) { n.updateElement(t, e, i) }) }, updateElement: function (t, e, i) { var n = this, a = n.chart, o = a.chartArea, r = a.options, s = r.animation, l = (o.left + o.right) / 2, u = (o.top + o.bottom) / 2, d = r.rotation, c = r.rotation, h = n.getDataset(), f = i && s.animateRotate ? 0 : t.hidden ? 0 : n.calculateCircumference(h.data[e]) * (r.circumference / (2 * Math.PI)), g = i && s.animateScale ? 0 : n.innerRadius, p = i && s.animateScale ? 0 : n.outerRadius, m = A.valueAtIndexOrDefault; A.extend(t, { _datasetIndex: n.index, _index: e, _model: { x: l + a.offsetX, y: u + a.offsetY, startAngle: d, endAngle: c, circumference: f, outerRadius: p, innerRadius: g, label: m(h.label, e, a.data.labels[e]) } }); var v = t._model, b = t.custom || {}, x = A.valueAtIndexOrDefault, y = this.chart.options.elements.arc; v.backgroundColor = b.backgroundColor ? b.backgroundColor : x(h.backgroundColor, e, y.backgroundColor), v.borderColor = b.borderColor ? b.borderColor : x(h.borderColor, e, y.borderColor), v.borderWidth = b.borderWidth ? b.borderWidth : x(h.borderWidth, e, y.borderWidth), i && s.animateRotate || (v.startAngle = 0 === e ? r.rotation : n.getMeta().data[e - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot() }, calculateTotal: function () { var i, n = this.getDataset(), t = this.getMeta(), a = 0; return A.each(t.data, function (t, e) { i = n.data[e], isNaN(i) || t.hidden || (a += Math.abs(i)) }), a }, calculateCircumference: function (t) { var e = this.getMeta().total; return 0 < e && !isNaN(t) ? 2 * Math.PI * (Math.abs(t) / e) : 0 }, getMaxBorderWidth: function (t) { for (var e, i, n = 0, a = this.index, o = t.length, r = 0; r < o; r++)n = (n = n < (e = t[r]._model ? t[r]._model.borderWidth : 0) ? e : n) < (i = t[r]._chart ? t[r]._chart.config.data.datasets[a].hoverBorderWidth : 0) ? i : n; return n } }) } }, { 26: 26, 41: 41, 46: 46 }], 18: [function (t, e, i) { "use strict"; var n = t(26), a = t(41), g = t(46); n._set("line", { showLines: !0, spanGaps: !1, hover: { mode: "label" }, scales: { xAxes: [{ type: "category", id: "x-axis-0" }], yAxes: [{ type: "linear", id: "y-axis-0" }] } }), e.exports = function (t) { function f(t, e) { return g.valueOrDefault(t.showLine, e.showLines) } t.controllers.line = t.DatasetController.extend({ datasetElementType: a.Line, dataElementType: a.Point, update: function (t) { var e, i, n, a = this, o = a.getMeta(), r = o.dataset, s = o.data || [], l = a.chart.options, u = l.elements.line, d = a.getScaleForId(o.yAxisID), c = a.getDataset(), h = f(c, l); for (h && (n = r.custom || {}, void 0 !== c.tension && void 0 === c.lineTension && (c.lineTension = c.tension), r._scale = d, r._datasetIndex = a.index, r._children = s, r._model = { spanGaps: c.spanGaps ? c.spanGaps : l.spanGaps, tension: n.tension ? n.tension : g.valueOrDefault(c.lineTension, u.tension), backgroundColor: n.backgroundColor ? n.backgroundColor : c.backgroundColor || u.backgroundColor, borderWidth: n.borderWidth ? n.borderWidth : c.borderWidth || u.borderWidth, borderColor: n.borderColor ? n.borderColor : c.borderColor || u.borderColor, borderCapStyle: n.borderCapStyle ? n.borderCapStyle : c.borderCapStyle || u.borderCapStyle, borderDash: n.borderDash ? n.borderDash : c.borderDash || u.borderDash, borderDashOffset: n.borderDashOffset ? n.borderDashOffset : c.borderDashOffset || u.borderDashOffset, borderJoinStyle: n.borderJoinStyle ? n.borderJoinStyle : c.borderJoinStyle || u.borderJoinStyle, fill: n.fill ? n.fill : void 0 !== c.fill ? c.fill : u.fill, steppedLine: n.steppedLine ? n.steppedLine : g.valueOrDefault(c.steppedLine, u.stepped), cubicInterpolationMode: n.cubicInterpolationMode ? n.cubicInterpolationMode : g.valueOrDefault(c.cubicInterpolationMode, u.cubicInterpolationMode) }, r.pivot()), e = 0, i = s.length; e < i; ++e)a.updateElement(s[e], e, t); for (h && 0 !== r._model.tension && a.updateBezierControlPoints(), e = 0, i = s.length; e < i; ++e)s[e].pivot() }, getPointBackgroundColor: function (t, e) { var i = this.chart.options.elements.point.backgroundColor, n = this.getDataset(), a = t.custom || {}; return a.backgroundColor ? i = a.backgroundColor : n.pointBackgroundColor ? i = g.valueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i }, getPointBorderColor: function (t, e) { var i = this.chart.options.elements.point.borderColor, n = this.getDataset(), a = t.custom || {}; return a.borderColor ? i = a.borderColor : n.pointBorderColor ? i = g.valueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i }, getPointBorderWidth: function (t, e) { var i = this.chart.options.elements.point.borderWidth, n = this.getDataset(), a = t.custom || {}; return isNaN(a.borderWidth) ? !isNaN(n.pointBorderWidth) || g.isArray(n.pointBorderWidth) ? i = g.valueAtIndexOrDefault(n.pointBorderWidth, e, i) : isNaN(n.borderWidth) || (i = n.borderWidth) : i = a.borderWidth, i }, getPointRotation: function (t, e) { var i = this.chart.options.elements.point.rotation, n = this.getDataset(), a = t.custom || {}; return isNaN(a.rotation) ? isNaN(n.pointRotation) && !g.isArray(n.pointRotation) || (i = g.valueAtIndexOrDefault(n.pointRotation, e, i)) : i = a.rotation, i }, updateElement: function (t, e, i) { var n, a, o = this, r = o.getMeta(), s = t.custom || {}, l = o.getDataset(), u = o.index, d = l.data[e], c = o.getScaleForId(r.yAxisID), h = o.getScaleForId(r.xAxisID), f = o.chart.options.elements.point; void 0 !== l.radius && void 0 === l.pointRadius && (l.pointRadius = l.radius), void 0 !== l.hitRadius && void 0 === l.pointHitRadius && (l.pointHitRadius = l.hitRadius), n = h.getPixelForValue("object" == typeof d ? d : NaN, e, u), a = i ? c.getBasePixel() : o.calculatePointY(d, e, u), t._xScale = h, t._yScale = c, t._datasetIndex = u, t._index = e, t._model = { x: n, y: a, skip: s.skip || isNaN(n) || isNaN(a), radius: s.radius || g.valueAtIndexOrDefault(l.pointRadius, e, f.radius), pointStyle: s.pointStyle || g.valueAtIndexOrDefault(l.pointStyle, e, f.pointStyle), rotation: o.getPointRotation(t, e), backgroundColor: o.getPointBackgroundColor(t, e), borderColor: o.getPointBorderColor(t, e), borderWidth: o.getPointBorderWidth(t, e), tension: r.dataset._model ? r.dataset._model.tension : 0, steppedLine: !!r.dataset._model && r.dataset._model.steppedLine, hitRadius: s.hitRadius || g.valueAtIndexOrDefault(l.pointHitRadius, e, f.hitRadius) } }, calculatePointY: function (t, e, i) { var n, a, o, r = this.chart, s = this.getMeta(), l = this.getScaleForId(s.yAxisID), u = 0, d = 0; if (l.options.stacked) { for (n = 0; n < i; n++)if (a = r.data.datasets[n], "line" === (o = r.getDatasetMeta(n)).type && o.yAxisID === l.id && r.isDatasetVisible(n)) { var c = Number(l.getRightValue(a.data[e])); c < 0 ? d += c || 0 : u += c || 0 } var h = Number(l.getRightValue(t)); return h < 0 ? l.getPixelForValue(d + h) : l.getPixelForValue(u + h) } return l.getPixelForValue(t) }, updateBezierControlPoints: function () { var t, e, i, n, a = this.getMeta(), o = this.chart.chartArea, r = a.data || []; function s(t, e, i) { return Math.max(Math.min(t, i), e) } if (a.dataset._model.spanGaps && (r = r.filter(function (t) { return !t._model.skip })), "monotone" === a.dataset._model.cubicInterpolationMode) g.splineCurveMonotone(r); else for (t = 0, e = r.length; t < e; ++t)i = r[t]._model, n = g.splineCurve(g.previousItem(r, t)._model, i, g.nextItem(r, t)._model, a.dataset._model.tension), i.controlPointPreviousX = n.previous.x, i.controlPointPreviousY = n.previous.y, i.controlPointNextX = n.next.x, i.controlPointNextY = n.next.y; if (this.chart.options.elements.line.capBezierPoints) for (t = 0, e = r.length; t < e; ++t)(i = r[t]._model).controlPointPreviousX = s(i.controlPointPreviousX, o.left, o.right), i.controlPointPreviousY = s(i.controlPointPreviousY, o.top, o.bottom), i.controlPointNextX = s(i.controlPointNextX, o.left, o.right), i.controlPointNextY = s(i.controlPointNextY, o.top, o.bottom) }, draw: function () { var t, e = this.chart, i = this.getMeta(), n = i.data || [], a = e.chartArea, o = n.length, r = 0; for (f(this.getDataset(), e.options) && (t = (i.dataset._model.borderWidth || 0) / 2, g.canvas.clipArea(e.ctx, { left: a.left, right: a.right, top: a.top - t, bottom: a.bottom + t }), i.dataset.draw(), g.canvas.unclipArea(e.ctx)); r < o; ++r)n[r].draw(a) }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], i = t._index, n = t.custom || {}, a = t._model; t.$$previousStyle = { backgroundColor: a.backgroundColor, borderColor: a.borderColor, borderWidth: a.borderWidth, radius: a.radius }, a.backgroundColor = n.hoverBackgroundColor || g.valueAtIndexOrDefault(e.pointHoverBackgroundColor, i, g.getHoverColor(a.backgroundColor)), a.borderColor = n.hoverBorderColor || g.valueAtIndexOrDefault(e.pointHoverBorderColor, i, g.getHoverColor(a.borderColor)), a.borderWidth = n.hoverBorderWidth || g.valueAtIndexOrDefault(e.pointHoverBorderWidth, i, a.borderWidth), a.radius = n.hoverRadius || g.valueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius) } }) } }, { 26: 26, 41: 41, 46: 46 }], 19: [function (t, e, i) { "use strict"; var n = t(26), a = t(41), k = t(46); n._set("polarArea", { scale: { type: "radialLinear", angleLines: { display: !1 }, gridLines: { circular: !0 }, pointLabels: { display: !1 }, ticks: { beginAtZero: !0 } }, animation: { animateRotate: !0, animateScale: !0 }, startAngle: -.5 * Math.PI, legendCallback: function (t) { var e = []; e.push('<ul class="' + t.id + '-legend">'); var i = t.data, n = i.datasets, a = i.labels; if (n.length) for (var o = 0; o < n[0].data.length; ++o)e.push('<li><span style="background-color:' + n[0].backgroundColor[o] + '"></span>'), a[o] && e.push(a[o]), e.push("</li>"); return e.push("</ul>"), e.join("") }, legend: { labels: { generateLabels: function (s) { var l = s.data; return l.labels.length && l.datasets.length ? l.labels.map(function (t, e) { var i = s.getDatasetMeta(0), n = l.datasets[0], a = i.data[e].custom || {}, o = k.valueAtIndexOrDefault, r = s.options.elements.arc; return { text: t, fillStyle: a.backgroundColor ? a.backgroundColor : o(n.backgroundColor, e, r.backgroundColor), strokeStyle: a.borderColor ? a.borderColor : o(n.borderColor, e, r.borderColor), lineWidth: a.borderWidth ? a.borderWidth : o(n.borderWidth, e, r.borderWidth), hidden: isNaN(n.data[e]) || i.data[e].hidden, index: e } }) : [] } }, onClick: function (t, e) { var i, n, a, o = e.index, r = this.chart; for (i = 0, n = (r.data.datasets || []).length; i < n; ++i)(a = r.getDatasetMeta(i)).data[o].hidden = !a.data[o].hidden; r.update() } }, tooltips: { callbacks: { title: function () { return "" }, label: function (t, e) { return e.labels[t.index] + ": " + t.yLabel } } } }), e.exports = function (t) { t.controllers.polarArea = t.DatasetController.extend({ dataElementType: a.Arc, linkScales: k.noop, update: function (i) { var t, e, n, a = this, o = a.getDataset(), r = a.getMeta(), s = a.chart.options.startAngle || 0, l = a._starts = [], u = a._angles = []; for (a._updateRadius(), r.count = a.countVisibleElements(), t = 0, e = o.data.length; t < e; t++)l[t] = s, n = a._computeAngle(t), s += u[t] = n; k.each(r.data, function (t, e) { a.updateElement(t, e, i) }) }, _updateRadius: function () { var t = this, e = t.chart, i = e.chartArea, n = e.options, a = n.elements.arc, o = Math.min(i.right - i.left, i.bottom - i.top); e.outerRadius = Math.max((o - a.borderWidth / 2) / 2, 0), e.innerRadius = Math.max(n.cutoutPercentage ? e.outerRadius / 100 * n.cutoutPercentage : 1, 0), e.radiusLength = (e.outerRadius - e.innerRadius) / e.getVisibleDatasetCount(), t.outerRadius = e.outerRadius - e.radiusLength * t.index, t.innerRadius = t.outerRadius - e.radiusLength }, updateElement: function (t, e, i) { var n = this, a = n.chart, o = n.getDataset(), r = a.options, s = r.animation, l = a.scale, u = a.data.labels, d = l.xCenter, c = l.yCenter, h = r.startAngle, f = t.hidden ? 0 : l.getDistanceFromCenterForValue(o.data[e]), g = n._starts[e], p = g + (t.hidden ? 0 : n._angles[e]), m = s.animateScale ? 0 : l.getDistanceFromCenterForValue(o.data[e]); k.extend(t, { _datasetIndex: n.index, _index: e, _scale: l, _model: { x: d, y: c, innerRadius: 0, outerRadius: i ? m : f, startAngle: i && s.animateRotate ? h : g, endAngle: i && s.animateRotate ? h : p, label: k.valueAtIndexOrDefault(u, e, u[e]) } }); var v = this.chart.options.elements.arc, b = t.custom || {}, x = k.valueAtIndexOrDefault, y = t._model; y.backgroundColor = b.backgroundColor ? b.backgroundColor : x(o.backgroundColor, e, v.backgroundColor), y.borderColor = b.borderColor ? b.borderColor : x(o.borderColor, e, v.borderColor), y.borderWidth = b.borderWidth ? b.borderWidth : x(o.borderWidth, e, v.borderWidth), t.pivot() }, countVisibleElements: function () { var i = this.getDataset(), t = this.getMeta(), n = 0; return k.each(t.data, function (t, e) { isNaN(i.data[e]) || t.hidden || n++ }), n }, _computeAngle: function (t) { var e = this, i = this.getMeta().count, n = e.getDataset(), a = e.getMeta(); if (isNaN(n.data[t]) || a.data[t].hidden) return 0; var o = { chart: e.chart, dataIndex: t, dataset: n, datasetIndex: e.index }; return k.options.resolve([e.chart.options.elements.arc.angle, 2 * Math.PI / i], o, t) } }) } }, { 26: 26, 41: 41, 46: 46 }], 20: [function (t, e, i) { "use strict"; var n = t(26), a = t(41), u = t(46); n._set("radar", { scale: { type: "radialLinear" }, elements: { line: { tension: 0 } } }), e.exports = function (t) { t.controllers.radar = t.DatasetController.extend({ datasetElementType: a.Line, dataElementType: a.Point, linkScales: u.noop, update: function (i) { var n = this, t = n.getMeta(), e = t.dataset, a = t.data, o = e.custom || {}, r = n.getDataset(), s = n.chart.options.elements.line, l = n.chart.scale; void 0 !== r.tension && void 0 === r.lineTension && (r.lineTension = r.tension), u.extend(t.dataset, { _datasetIndex: n.index, _scale: l, _children: a, _loop: !0, _model: { tension: o.tension ? o.tension : u.valueOrDefault(r.lineTension, s.tension), backgroundColor: o.backgroundColor ? o.backgroundColor : r.backgroundColor || s.backgroundColor, borderWidth: o.borderWidth ? o.borderWidth : r.borderWidth || s.borderWidth, borderColor: o.borderColor ? o.borderColor : r.borderColor || s.borderColor, fill: o.fill ? o.fill : void 0 !== r.fill ? r.fill : s.fill, borderCapStyle: o.borderCapStyle ? o.borderCapStyle : r.borderCapStyle || s.borderCapStyle, borderDash: o.borderDash ? o.borderDash : r.borderDash || s.borderDash, borderDashOffset: o.borderDashOffset ? o.borderDashOffset : r.borderDashOffset || s.borderDashOffset, borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : r.borderJoinStyle || s.borderJoinStyle } }), t.dataset.pivot(), u.each(a, function (t, e) { n.updateElement(t, e, i) }, n), n.updateBezierControlPoints() }, updateElement: function (t, e, i) { var n = this, a = t.custom || {}, o = n.getDataset(), r = n.chart.scale, s = n.chart.options.elements.point, l = r.getPointPositionForValue(e, o.data[e]); void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), void 0 !== o.hitRadius && void 0 === o.pointHitRadius && (o.pointHitRadius = o.hitRadius), u.extend(t, { _datasetIndex: n.index, _index: e, _scale: r, _model: { x: i ? r.xCenter : l.x, y: i ? r.yCenter : l.y, tension: a.tension ? a.tension : u.valueOrDefault(o.lineTension, n.chart.options.elements.line.tension), radius: a.radius ? a.radius : u.valueAtIndexOrDefault(o.pointRadius, e, s.radius), backgroundColor: a.backgroundColor ? a.backgroundColor : u.valueAtIndexOrDefault(o.pointBackgroundColor, e, s.backgroundColor), borderColor: a.borderColor ? a.borderColor : u.valueAtIndexOrDefault(o.pointBorderColor, e, s.borderColor), borderWidth: a.borderWidth ? a.borderWidth : u.valueAtIndexOrDefault(o.pointBorderWidth, e, s.borderWidth), pointStyle: a.pointStyle ? a.pointStyle : u.valueAtIndexOrDefault(o.pointStyle, e, s.pointStyle), rotation: a.rotation ? a.rotation : u.valueAtIndexOrDefault(o.pointRotation, e, s.rotation), hitRadius: a.hitRadius ? a.hitRadius : u.valueAtIndexOrDefault(o.pointHitRadius, e, s.hitRadius) } }), t._model.skip = a.skip ? a.skip : isNaN(t._model.x) || isNaN(t._model.y) }, updateBezierControlPoints: function () { var a = this.chart.chartArea, o = this.getMeta(); u.each(o.data, function (t, e) { var i = t._model, n = u.splineCurve(u.previousItem(o.data, e, !0)._model, i, u.nextItem(o.data, e, !0)._model, i.tension); i.controlPointPreviousX = Math.max(Math.min(n.previous.x, a.right), a.left), i.controlPointPreviousY = Math.max(Math.min(n.previous.y, a.bottom), a.top), i.controlPointNextX = Math.max(Math.min(n.next.x, a.right), a.left), i.controlPointNextY = Math.max(Math.min(n.next.y, a.bottom), a.top), t.pivot() }) }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], i = t.custom || {}, n = t._index, a = t._model; t.$$previousStyle = { backgroundColor: a.backgroundColor, borderColor: a.borderColor, borderWidth: a.borderWidth, radius: a.radius }, a.radius = i.hoverRadius ? i.hoverRadius : u.valueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), a.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : u.valueAtIndexOrDefault(e.pointHoverBackgroundColor, n, u.getHoverColor(a.backgroundColor)), a.borderColor = i.hoverBorderColor ? i.hoverBorderColor : u.valueAtIndexOrDefault(e.pointHoverBorderColor, n, u.getHoverColor(a.borderColor)), a.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : u.valueAtIndexOrDefault(e.pointHoverBorderWidth, n, a.borderWidth) } }) } }, { 26: 26, 41: 41, 46: 46 }], 21: [function (t, e, i) { "use strict"; t(26)._set("scatter", { hover: { mode: "single" }, scales: { xAxes: [{ id: "x-axis-1", type: "linear", position: "bottom" }], yAxes: [{ id: "y-axis-1", type: "linear", position: "left" }] }, showLines: !1, tooltips: { callbacks: { title: function () { return "" }, label: function (t) { return "(" + t.xLabel + ", " + t.yLabel + ")" } } } }), e.exports = function (t) { t.controllers.scatter = t.controllers.line } }, { 26: 26 }], 22: [function (t, e, i) { "use strict"; var n = t(27); i = e.exports = n.extend({ chart: null, currentStep: 0, numSteps: 60, easing: "", render: null, onAnimationProgress: null, onAnimationComplete: null }); Object.defineProperty(i.prototype, "animationObject", { get: function () { return this } }), Object.defineProperty(i.prototype, "chartInstance", { get: function () { return this.chart }, set: function (t) { this.chart = t } }) }, { 27: 27 }], 23: [function (t, e, i) { "use strict"; var n = t(26), o = t(46); n._set("global", { animation: { duration: 1e3, easing: "easeOutQuart", onProgress: o.noop, onComplete: o.noop } }), e.exports = { frameDuration: 17, animations: [], dropFrames: 0, request: null, addAnimation: function (t, e, i, n) { var a, o, r = this.animations; for (e.chart = t, n || (t.animating = !0), a = 0, o = r.length; a < o; ++a)if (r[a].chart === t) return void (r[a] = e); r.push(e), 1 === r.length && this.requestAnimationFrame() }, cancelAnimation: function (e) { var t = o.findIndex(this.animations, function (t) { return t.chart === e }); -1 !== t && (this.animations.splice(t, 1), e.animating = !1) }, requestAnimationFrame: function () { var t = this; null === t.request && (t.request = o.requestAnimFrame.call(window, function () { t.request = null, t.startDigest() })) }, startDigest: function () { var t = this, e = Date.now(), i = 0; 1 < t.dropFrames && (i = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1), t.advance(1 + i); var n = Date.now(); t.dropFrames += (n - e) / t.frameDuration, 0 < t.animations.length && t.requestAnimationFrame() }, advance: function (t) { for (var e, i, n = this.animations, a = 0; a < n.length;)i = (e = n[a]).chart, e.currentStep = (e.currentStep || 0) + t, e.currentStep = Math.min(e.currentStep, e.numSteps), o.callback(e.render, [i, e], i), o.callback(e.onAnimationProgress, [e], i), e.currentStep >= e.numSteps ? (o.callback(e.onAnimationComplete, [e], i), i.animating = !1, n.splice(a, 1)) : ++a } } }, { 26: 26, 46: 46 }], 24: [function (t, e, i) { "use strict"; var s = t(22), l = t(23), c = t(26), h = t(46), a = t(29), o = t(31), f = t(49), g = t(32), p = t(34), n = t(36); e.exports = function (u) { function d(t) { return "top" === t || "bottom" === t } u.types = {}, u.instances = {}, u.controllers = {}, h.extend(u.prototype, { construct: function (t, e) { var i, n, a = this; (n = (i = (i = e) || {}).data = i.data || {}).datasets = n.datasets || [], n.labels = n.labels || [], i.options = h.configMerge(c.global, c[i.type], i.options || {}), e = i; var o = f.acquireContext(t, e), r = o && o.canvas, s = r && r.height, l = r && r.width; a.id = h.uid(), a.ctx = o, a.canvas = r, a.config = e, a.width = l, a.height = s, a.aspectRatio = s ? l / s : null, a.options = e.options, a._bufferedRender = !1, (a.chart = a).controller = a, u.instances[a.id] = a, Object.defineProperty(a, "data", { get: function () { return a.config.data }, set: function (t) { a.config.data = t } }), o && r ? (a.initialize(), a.update()) : console.error("Failed to create chart: can't acquire context from the given item") }, initialize: function () { var t = this; return g.notify(t, "beforeInit"), h.retinaScale(t, t.options.devicePixelRatio), t.bindEvents(), t.options.responsive && t.resize(!0), t.ensureScalesHaveIDs(), t.buildOrUpdateScales(), t.initToolTip(), g.notify(t, "afterInit"), t }, clear: function () { return h.canvas.clear(this), this }, stop: function () { return l.cancelAnimation(this), this }, resize: function (t) { var e = this, i = e.options, n = e.canvas, a = i.maintainAspectRatio && e.aspectRatio || null, o = Math.max(0, Math.floor(h.getMaximumWidth(n))), r = Math.max(0, Math.floor(a ? o / a : h.getMaximumHeight(n))); if ((e.width !== o || e.height !== r) && (n.width = e.width = o, n.height = e.height = r, n.style.width = o + "px", n.style.height = r + "px", h.retinaScale(e, i.devicePixelRatio), !t)) { var s = { width: o, height: r }; g.notify(e, "resize", [s]), e.options.onResize && e.options.onResize(e, s), e.stop(), e.update({ duration: e.options.responsiveAnimationDuration }) } }, ensureScalesHaveIDs: function () { var t = this.options, e = t.scales || {}, i = t.scale; h.each(e.xAxes, function (t, e) { t.id = t.id || "x-axis-" + e }), h.each(e.yAxes, function (t, e) { t.id = t.id || "y-axis-" + e }), i && (i.id = i.id || "scale") }, buildOrUpdateScales: function () { var r = this, t = r.options, s = r.scales || {}, e = [], l = Object.keys(s).reduce(function (t, e) { return t[e] = !1, t }, {}); t.scales && (e = e.concat((t.scales.xAxes || []).map(function (t) { return { options: t, dtype: "category", dposition: "bottom" } }), (t.scales.yAxes || []).map(function (t) { return { options: t, dtype: "linear", dposition: "left" } }))), t.scale && e.push({ options: t.scale, dtype: "radialLinear", isDefault: !0, dposition: "chartArea" }), h.each(e, function (t) { var e = t.options, i = e.id, n = h.valueOrDefault(e.type, t.dtype); d(e.position) !== d(t.dposition) && (e.position = t.dposition), l[i] = !0; var a = null; if (i in s && s[i].type === n) (a = s[i]).options = e, a.ctx = r.ctx, a.chart = r; else { var o = p.getScaleConstructor(n); if (!o) return; a = new o({ id: i, type: n, options: e, ctx: r.ctx, chart: r }), s[a.id] = a } a.mergeTicksOptions(), t.isDefault && (r.scale = a) }), h.each(l, function (t, e) { t || delete s[e] }), r.scales = s, p.addScalesToLayout(this) }, buildOrUpdateControllers: function () { var o = this, r = [], s = []; return h.each(o.data.datasets, function (t, e) { var i = o.getDatasetMeta(e), n = t.type || o.config.type; if (i.type && i.type !== n && (o.destroyDatasetMeta(e), i = o.getDatasetMeta(e)), i.type = n, r.push(i.type), i.controller) i.controller.updateIndex(e), i.controller.linkScales(); else { var a = u.controllers[i.type]; if (void 0 === a) throw new Error('"' + i.type + '" is not a chart type.'); i.controller = new a(o, e), s.push(i.controller) } }, o), s }, resetElements: function () { var i = this; h.each(i.data.datasets, function (t, e) { i.getDatasetMeta(e).controller.reset() }, i) }, reset: function () { this.resetElements(), this.tooltip.initialize() }, update: function (t) { var e, i, n = this; if (t && "object" == typeof t || (t = { duration: t, lazy: arguments[1] }), i = (e = n).options, h.each(e.scales, function (t) { o.removeBox(e, t) }), i = h.configMerge(u.defaults.global, u.defaults[e.config.type], i), e.options = e.config.options = i, e.ensureScalesHaveIDs(), e.buildOrUpdateScales(), e.tooltip._options = i.tooltips, e.tooltip.initialize(), g._invalidate(n), !1 !== g.notify(n, "beforeUpdate")) { n.tooltip._data = n.data; var a = n.buildOrUpdateControllers(); h.each(n.data.datasets, function (t, e) { n.getDatasetMeta(e).controller.buildOrUpdateElements() }, n), n.updateLayout(), n.options.animation && n.options.animation.duration && h.each(a, function (t) { t.reset() }), n.updateDatasets(), n.tooltip.initialize(), n.lastActive = [], g.notify(n, "afterUpdate"), n._bufferedRender ? n._bufferedRequest = { duration: t.duration, easing: t.easing, lazy: t.lazy } : n.render(t) } }, updateLayout: function () { !1 !== g.notify(this, "beforeLayout") && (o.update(this, this.width, this.height), g.notify(this, "afterScaleUpdate"), g.notify(this, "afterLayout")) }, updateDatasets: function () { if (!1 !== g.notify(this, "beforeDatasetsUpdate")) { for (var t = 0, e = this.data.datasets.length; t < e; ++t)this.updateDataset(t); g.notify(this, "afterDatasetsUpdate") } }, updateDataset: function (t) { var e = this.getDatasetMeta(t), i = { meta: e, index: t }; !1 !== g.notify(this, "beforeDatasetUpdate", [i]) && (e.controller.update(), g.notify(this, "afterDatasetUpdate", [i])) }, render: function (t) { var e = this; t && "object" == typeof t || (t = { duration: t, lazy: arguments[1] }); var i = t.duration, n = t.lazy; if (!1 !== g.notify(e, "beforeRender")) { var a = e.options.animation, o = function (t) { g.notify(e, "afterRender"), h.callback(a && a.onComplete, [t], e) }; if (a && (void 0 !== i && 0 !== i || void 0 === i && 0 !== a.duration)) { var r = new s({ numSteps: (i || a.duration) / 16.66, easing: t.easing || a.easing, render: function (t, e) { var i = h.easing.effects[e.easing], n = e.currentStep, a = n / e.numSteps; t.draw(i(a), a, n) }, onAnimationProgress: a.onProgress, onAnimationComplete: o }); l.addAnimation(e, r, i, n) } else e.draw(), o(new s({ numSteps: 0, chart: e })); return e } }, draw: function (t) { var e = this; e.clear(), h.isNullOrUndef(t) && (t = 1), e.transition(t), e.width <= 0 || e.height <= 0 || !1 !== g.notify(e, "beforeDraw", [t]) && (h.each(e.boxes, function (t) { t.draw(e.chartArea) }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e._drawTooltip(t), g.notify(e, "afterDraw", [t])) }, transition: function (t) { for (var e = 0, i = (this.data.datasets || []).length; e < i; ++e)this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.transition(t); this.tooltip.transition(t) }, drawDatasets: function (t) { var e = this; if (!1 !== g.notify(e, "beforeDatasetsDraw", [t])) { for (var i = (e.data.datasets || []).length - 1; 0 <= i; --i)e.isDatasetVisible(i) && e.drawDataset(i, t); g.notify(e, "afterDatasetsDraw", [t]) } }, drawDataset: function (t, e) { var i = this.getDatasetMeta(t), n = { meta: i, index: t, easingValue: e }; !1 !== g.notify(this, "beforeDatasetDraw", [n]) && (i.controller.draw(e), g.notify(this, "afterDatasetDraw", [n])) }, _drawTooltip: function (t) { var e = this.tooltip, i = { tooltip: e, easingValue: t }; !1 !== g.notify(this, "beforeTooltipDraw", [i]) && (e.draw(), g.notify(this, "afterTooltipDraw", [i])) }, getElementAtEvent: function (t) { return a.modes.single(this, t) }, getElementsAtEvent: function (t) { return a.modes.label(this, t, { intersect: !0 }) }, getElementsAtXAxis: function (t) { return a.modes["x-axis"](this, t, { intersect: !0 }) }, getElementsAtEventForMode: function (t, e, i) { var n = a.modes[e]; return "function" == typeof n ? n(this, t, i) : [] }, getDatasetAtEvent: function (t) { return a.modes.dataset(this, t, { intersect: !0 }) }, getDatasetMeta: function (t) { var e = this.data.datasets[t]; e._meta || (e._meta = {}); var i = e._meta[this.id]; return i || (i = e._meta[this.id] = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null }), i }, getVisibleDatasetCount: function () { for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e)this.isDatasetVisible(e) && t++; return t }, isDatasetVisible: function (t) { var e = this.getDatasetMeta(t); return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden }, generateLegend: function () { return this.options.legendCallback(this) }, destroyDatasetMeta: function (t) { var e = this.id, i = this.data.datasets[t], n = i._meta && i._meta[e]; n && (n.controller.destroy(), delete i._meta[e]) }, destroy: function () { var t, e, i = this, n = i.canvas; for (i.stop(), t = 0, e = i.data.datasets.length; t < e; ++t)i.destroyDatasetMeta(t); n && (i.unbindEvents(), h.canvas.clear(i), f.releaseContext(i.ctx), i.canvas = null, i.ctx = null), g.notify(i, "destroy"), delete u.instances[i.id] }, toBase64Image: function () { return this.canvas.toDataURL.apply(this.canvas, arguments) }, initToolTip: function () { var t = this; t.tooltip = new n({ _chart: t, _chartInstance: t, _data: t.data, _options: t.options.tooltips }, t) }, bindEvents: function () { var e = this, i = e._listeners = {}, n = function () { e.eventHandler.apply(e, arguments) }; h.each(e.options.events, function (t) { f.addEventListener(e, t, n), i[t] = n }), e.options.responsive && (n = function () { e.resize() }, f.addEventListener(e, "resize", n), i.resize = n) }, unbindEvents: function () { var i = this, t = i._listeners; t && (delete i._listeners, h.each(t, function (t, e) { f.removeEventListener(i, e, t) })) }, updateHoverStyle: function (t, e, i) { var n, a, o, r = i ? "setHoverStyle" : "removeHoverStyle"; for (a = 0, o = t.length; a < o; ++a)(n = t[a]) && this.getDatasetMeta(n._datasetIndex).controller[r](n) }, eventHandler: function (t) { var e = this, i = e.tooltip; if (!1 !== g.notify(e, "beforeEvent", [t])) { e._bufferedRender = !0, e._bufferedRequest = null; var n = e.handleEvent(t); i && (n = i._start ? i.handleEvent(t) : n | i.handleEvent(t)), g.notify(e, "afterEvent", [t]); var a = e._bufferedRequest; return a ? e.render(a) : n && !e.animating && (e.stop(), e.render({ duration: e.options.hover.animationDuration, lazy: !0 })), e._bufferedRender = !1, e._bufferedRequest = null, e } }, handleEvent: function (t) { var e, i = this, n = i.options || {}, a = n.hover; return i.lastActive = i.lastActive || [], "mouseout" === t.type ? i.active = [] : i.active = i.getElementsAtEventForMode(t, a.mode, a), h.callback(n.onHover || n.hover.onHover, [t.native, i.active], i), "mouseup" !== t.type && "click" !== t.type || n.onClick && n.onClick.call(i, t.native, i.active), i.lastActive.length && i.updateHoverStyle(i.lastActive, a.mode, !1), i.active.length && a.mode && i.updateHoverStyle(i.active, a.mode, !0), e = !h.arrayEquals(i.active, i.lastActive), i.lastActive = i.active, e } }), u.Controller = u } }, { 22: 22, 23: 23, 26: 26, 29: 29, 31: 31, 32: 32, 34: 34, 36: 36, 46: 46, 49: 49 }], 25: [function (t, e, i) { "use strict"; var s = t(46); e.exports = function (t) { var o = ["push", "pop", "shift", "splice", "unshift"]; function r(e, t) { var i = e._chartjs; if (i) { var n = i.listeners, a = n.indexOf(t); -1 !== a && n.splice(a, 1), 0 < n.length || (o.forEach(function (t) { delete e[t] }), delete e._chartjs) } } t.DatasetController = function (t, e) { this.initialize(t, e) }, s.extend(t.DatasetController.prototype, { datasetElementType: null, dataElementType: null, initialize: function (t, e) { this.chart = t, this.index = e, this.linkScales(), this.addElements() }, updateIndex: function (t) { this.index = t }, linkScales: function () { var t = this, e = t.getMeta(), i = t.getDataset(); null !== e.xAxisID && e.xAxisID in t.chart.scales || (e.xAxisID = i.xAxisID || t.chart.options.scales.xAxes[0].id), null !== e.yAxisID && e.yAxisID in t.chart.scales || (e.yAxisID = i.yAxisID || t.chart.options.scales.yAxes[0].id) }, getDataset: function () { return this.chart.data.datasets[this.index] }, getMeta: function () { return this.chart.getDatasetMeta(this.index) }, getScaleForId: function (t) { return this.chart.scales[t] }, reset: function () { this.update(!0) }, destroy: function () { this._data && r(this._data, this) }, createMetaDataset: function () { var t = this.datasetElementType; return t && new t({ _chart: this.chart, _datasetIndex: this.index }) }, createMetaData: function (t) { var e = this.dataElementType; return e && new e({ _chart: this.chart, _datasetIndex: this.index, _index: t }) }, addElements: function () { var t, e, i = this.getMeta(), n = this.getDataset().data || [], a = i.data; for (t = 0, e = n.length; t < e; ++t)a[t] = a[t] || this.createMetaData(t); i.dataset = i.dataset || this.createMetaDataset() }, addElementAndReset: function (t) { var e = this.createMetaData(t); this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0) }, buildOrUpdateElements: function () { var a, t, e = this, i = e.getDataset(), n = i.data || (i.data = []); e._data !== n && (e._data && r(e._data, e), t = e, (a = n)._chartjs ? a._chartjs.listeners.push(t) : (Object.defineProperty(a, "_chartjs", { configurable: !0, enumerable: !1, value: { listeners: [t] } }), o.forEach(function (t) { var i = "onData" + t.charAt(0).toUpperCase() + t.slice(1), n = a[t]; Object.defineProperty(a, t, { configurable: !0, enumerable: !1, value: function () { var e = Array.prototype.slice.call(arguments), t = n.apply(this, e); return s.each(a._chartjs.listeners, function (t) { "function" == typeof t[i] && t[i].apply(t, e) }), t } }) })), e._data = n), e.resyncElements() }, update: s.noop, transition: function (t) { for (var e = this.getMeta(), i = e.data || [], n = i.length, a = 0; a < n; ++a)i[a].transition(t); e.dataset && e.dataset.transition(t) }, draw: function () { var t = this.getMeta(), e = t.data || [], i = e.length, n = 0; for (t.dataset && t.dataset.draw(); n < i; ++n)e[n].draw() }, removeHoverStyle: function (t) { s.merge(t._model, t.$$previousStyle || {}), delete t.$$previousStyle }, setHoverStyle: function (t) { var e = this.chart.data.datasets[t._datasetIndex], i = t._index, n = t.custom || {}, a = s.valueAtIndexOrDefault, o = s.getHoverColor, r = t._model; t.$$previousStyle = { backgroundColor: r.backgroundColor, borderColor: r.borderColor, borderWidth: r.borderWidth }, r.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : a(e.hoverBackgroundColor, i, o(r.backgroundColor)), r.borderColor = n.hoverBorderColor ? n.hoverBorderColor : a(e.hoverBorderColor, i, o(r.borderColor)), r.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : a(e.hoverBorderWidth, i, r.borderWidth) }, resyncElements: function () { var t = this.getMeta(), e = this.getDataset().data, i = t.data.length, n = e.length; n < i ? t.data.splice(n, i - n) : i < n && this.insertElements(i, n - i) }, insertElements: function (t, e) { for (var i = 0; i < e; ++i)this.addElementAndReset(t + i) }, onDataPush: function () { this.insertElements(this.getDataset().data.length - 1, arguments.length) }, onDataPop: function () { this.getMeta().data.pop() }, onDataShift: function () { this.getMeta().data.shift() }, onDataSplice: function (t, e) { this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2) }, onDataUnshift: function () { this.insertElements(0, arguments.length) } }), t.DatasetController.extend = s.inherits } }, { 46: 46 }], 26: [function (t, e, i) { "use strict"; var n = t(46); e.exports = { _set: function (t, e) { return n.merge(this[t] || (this[t] = {}), e) } } }, { 46: 46 }], 27: [function (t, e, i) { "use strict"; var g = t(3), n = t(46); var a = function (t) { n.extend(this, t), this.initialize.apply(this, arguments) }; n.extend(a.prototype, { initialize: function () { this.hidden = !1 }, pivot: function () { var t = this; return t._view || (t._view = n.clone(t._model)), t._start = {}, t }, transition: function (t) { var e = this, i = e._model, n = e._start, a = e._view; return i && 1 !== t ? (a || (a = e._view = {}), n || (n = e._start = {}), function (t, e, i, n) { var a, o, r, s, l, u, d, c, h, f = Object.keys(i); for (a = 0, o = f.length; a < o; ++a)if (u = i[r = f[a]], e.hasOwnProperty(r) || (e[r] = u), (s = e[r]) !== u && "_" !== r[0]) { if (t.hasOwnProperty(r) || (t[r] = s), (d = typeof u) == typeof (l = t[r])) if ("string" === d) { if ((c = g(l)).valid && (h = g(u)).valid) { e[r] = h.mix(c, n).rgbString(); continue } } else if ("number" === d && isFinite(l) && isFinite(u)) { e[r] = l + (u - l) * n; continue } e[r] = u } }(n, a, i, t)) : (e._view = i, e._start = null), e }, tooltipPosition: function () { return { x: this._model.x, y: this._model.y } }, hasValue: function () { return n.isNumber(this._model.x) && n.isNumber(this._model.y) } }), a.extend = n.inherits, e.exports = a }, { 3: 3, 46: 46 }], 28: [function (t, e, i) { "use strict"; var n = t(3), a = t(26), g = t(46), l = t(34); e.exports = function () { function d(t, e, i) { var n; return "string" == typeof t ? (n = parseInt(t, 10), -1 !== t.indexOf("%") && (n = n / 100 * e.parentNode[i])) : n = t, n } function c(t) { return null != t && "none" !== t } function e(t, e, i) { var n = document.defaultView, a = g._getParentNode(t), o = n.getComputedStyle(t)[e], r = n.getComputedStyle(a)[e], s = c(o), l = c(r), u = Number.POSITIVE_INFINITY; return s || l ? Math.min(s ? d(o, t, i) : u, l ? d(r, a, i) : u) : "none" } g.configMerge = function () { return g.merge(g.clone(arguments[0]), [].slice.call(arguments, 1), { merger: function (t, e, i, n) { var a = e[t] || {}, o = i[t]; "scales" === t ? e[t] = g.scaleMerge(a, o) : "scale" === t ? e[t] = g.merge(a, [l.getScaleDefaults(o.type), o]) : g._merger(t, e, i, n) } }) }, g.scaleMerge = function () { return g.merge(g.clone(arguments[0]), [].slice.call(arguments, 1), { merger: function (t, e, i, n) { if ("xAxes" === t || "yAxes" === t) { var a, o, r, s = i[t].length; for (e[t] || (e[t] = []), a = 0; a < s; ++a)r = i[t][a], o = g.valueOrDefault(r.type, "xAxes" === t ? "category" : "linear"), a >= e[t].length && e[t].push({}), !e[t][a].type || r.type && r.type !== e[t][a].type ? g.merge(e[t][a], [l.getScaleDefaults(o), r]) : g.merge(e[t][a], r) } else g._merger(t, e, i, n) } }) }, g.where = function (t, e) { if (g.isArray(t) && Array.prototype.filter) return t.filter(e); var i = []; return g.each(t, function (t) { e(t) && i.push(t) }), i }, g.findIndex = Array.prototype.findIndex ? function (t, e, i) { return t.findIndex(e, i) } : function (t, e, i) { i = void 0 === i ? t : i; for (var n = 0, a = t.length; n < a; ++n)if (e.call(i, t[n], n, t)) return n; return -1 }, g.findNextWhere = function (t, e, i) { g.isNullOrUndef(i) && (i = -1); for (var n = i + 1; n < t.length; n++) { var a = t[n]; if (e(a)) return a } }, g.findPreviousWhere = function (t, e, i) { g.isNullOrUndef(i) && (i = t.length); for (var n = i - 1; 0 <= n; n--) { var a = t[n]; if (e(a)) return a } }, g.isNumber = function (t) { return !isNaN(parseFloat(t)) && isFinite(t) }, g.almostEquals = function (t, e, i) { return Math.abs(t - e) < i }, g.almostWhole = function (t, e) { var i = Math.round(t); return i - e < t && t < i + e }, g.max = function (t) { return t.reduce(function (t, e) { return isNaN(e) ? t : Math.max(t, e) }, Number.NEGATIVE_INFINITY) }, g.min = function (t) { return t.reduce(function (t, e) { return isNaN(e) ? t : Math.min(t, e) }, Number.POSITIVE_INFINITY) }, g.sign = Math.sign ? function (t) { return Math.sign(t) } : function (t) { return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1 }, g.log10 = Math.log10 ? function (t) { return Math.log10(t) } : function (t) { var e = Math.log(t) * Math.LOG10E, i = Math.round(e); return t === Math.pow(10, i) ? i : e }, g.toRadians = function (t) { return t * (Math.PI / 180) }, g.toDegrees = function (t) { return t * (180 / Math.PI) }, g.getAngleFromPoint = function (t, e) { var i = e.x - t.x, n = e.y - t.y, a = Math.sqrt(i * i + n * n), o = Math.atan2(n, i); return o < -.5 * Math.PI && (o += 2 * Math.PI), { angle: o, distance: a } }, g.distanceBetweenPoints = function (t, e) { return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) }, g.aliasPixel = function (t) { return t % 2 == 0 ? 0 : .5 }, g.splineCurve = function (t, e, i, n) { var a = t.skip ? e : t, o = e, r = i.skip ? e : i, s = Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2)), l = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)), u = s / (s + l), d = l / (s + l), c = n * (u = isNaN(u) ? 0 : u), h = n * (d = isNaN(d) ? 0 : d); return { previous: { x: o.x - c * (r.x - a.x), y: o.y - c * (r.y - a.y) }, next: { x: o.x + h * (r.x - a.x), y: o.y + h * (r.y - a.y) } } }, g.EPSILON = Number.EPSILON || 1e-14, g.splineCurveMonotone = function (t) { var e, i, n, a, o, r, s, l, u, d = (t || []).map(function (t) { return { model: t._model, deltaK: 0, mK: 0 } }), c = d.length; for (e = 0; e < c; ++e)if (!(n = d[e]).model.skip) { if (i = 0 < e ? d[e - 1] : null, (a = e < c - 1 ? d[e + 1] : null) && !a.model.skip) { var h = a.model.x - n.model.x; n.deltaK = 0 !== h ? (a.model.y - n.model.y) / h : 0 } !i || i.model.skip ? n.mK = n.deltaK : !a || a.model.skip ? n.mK = i.deltaK : this.sign(i.deltaK) !== this.sign(n.deltaK) ? n.mK = 0 : n.mK = (i.deltaK + n.deltaK) / 2 } for (e = 0; e < c - 1; ++e)n = d[e], a = d[e + 1], n.model.skip || a.model.skip || (g.almostEquals(n.deltaK, 0, this.EPSILON) ? n.mK = a.mK = 0 : (o = n.mK / n.deltaK, r = a.mK / n.deltaK, (l = Math.pow(o, 2) + Math.pow(r, 2)) <= 9 || (s = 3 / Math.sqrt(l), n.mK = o * s * n.deltaK, a.mK = r * s * n.deltaK))); for (e = 0; e < c; ++e)(n = d[e]).model.skip || (i = 0 < e ? d[e - 1] : null, a = e < c - 1 ? d[e + 1] : null, i && !i.model.skip && (u = (n.model.x - i.model.x) / 3, n.model.controlPointPreviousX = n.model.x - u, n.model.controlPointPreviousY = n.model.y - u * n.mK), a && !a.model.skip && (u = (a.model.x - n.model.x) / 3, n.model.controlPointNextX = n.model.x + u, n.model.controlPointNextY = n.model.y + u * n.mK)) }, g.nextItem = function (t, e, i) { return i ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1] }, g.previousItem = function (t, e, i) { return i ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1] }, g.niceNum = function (t, e) { var i = Math.floor(g.log10(t)), n = t / Math.pow(10, i); return (e ? n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10 : n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * Math.pow(10, i) }, g.requestAnimFrame = "undefined" == typeof window ? function (t) { t() } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) { return window.setTimeout(t, 1e3 / 60) }, g.getRelativePosition = function (t, e) { var i, n, a = t.originalEvent || t, o = t.target || t.srcElement, r = o.getBoundingClientRect(), s = a.touches; n = s && 0 < s.length ? (i = s[0].clientX, s[0].clientY) : (i = a.clientX, a.clientY); var l = parseFloat(g.getStyle(o, "padding-left")), u = parseFloat(g.getStyle(o, "padding-top")), d = parseFloat(g.getStyle(o, "padding-right")), c = parseFloat(g.getStyle(o, "padding-bottom")), h = r.right - r.left - l - d, f = r.bottom - r.top - u - c; return { x: i = Math.round((i - r.left - l) / h * o.width / e.currentDevicePixelRatio), y: n = Math.round((n - r.top - u) / f * o.height / e.currentDevicePixelRatio) } }, g.getConstraintWidth = function (t) { return e(t, "max-width", "clientWidth") }, g.getConstraintHeight = function (t) { return e(t, "max-height", "clientHeight") }, g._calculatePadding = function (t, e, i) { return -1 < (e = g.getStyle(t, e)).indexOf("%") ? i / parseInt(e, 10) : parseInt(e, 10) }, g._getParentNode = function (t) { var e = t.parentNode; return e && e.host && (e = e.host), e }, g.getMaximumWidth = function (t) { var e = g._getParentNode(t); if (!e) return t.clientWidth; var i = e.clientWidth, n = i - g._calculatePadding(e, "padding-left", i) - g._calculatePadding(e, "padding-right", i), a = g.getConstraintWidth(t); return isNaN(a) ? n : Math.min(n, a) }, g.getMaximumHeight = function (t) { var e = g._getParentNode(t); if (!e) return t.clientHeight; var i = e.clientHeight, n = i - g._calculatePadding(e, "padding-top", i) - g._calculatePadding(e, "padding-bottom", i), a = g.getConstraintHeight(t); return isNaN(a) ? n : Math.min(n, a) }, g.getStyle = function (t, e) { return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e) }, g.retinaScale = function (t, e) { var i = t.currentDevicePixelRatio = e || "undefined" != typeof window && window.devicePixelRatio || 1; if (1 !== i) { var n = t.canvas, a = t.height, o = t.width; n.height = a * i, n.width = o * i, t.ctx.scale(i, i), n.style.height || n.style.width || (n.style.height = a + "px", n.style.width = o + "px") } }, g.fontString = function (t, e, i) { return e + " " + t + "px " + i }, g.longestText = function (e, t, i, n) { var a = (n = n || {}).data = n.data || {}, o = n.garbageCollect = n.garbageCollect || []; n.font !== t && (a = n.data = {}, o = n.garbageCollect = [], n.font = t), e.font = t; var r = 0; g.each(i, function (t) { null != t && !0 !== g.isArray(t) ? r = g.measureText(e, a, o, r, t) : g.isArray(t) && g.each(t, function (t) { null == t || g.isArray(t) || (r = g.measureText(e, a, o, r, t)) }) }); var s = o.length / 2; if (s > i.length) { for (var l = 0; l < s; l++)delete a[o[l]]; o.splice(0, s) } return r }, g.measureText = function (t, e, i, n, a) { var o = e[a]; return o || (o = e[a] = t.measureText(a).width, i.push(a)), n < o && (n = o), n }, g.numberOfLabelLines = function (t) { var e = 1; return g.each(t, function (t) { g.isArray(t) && t.length > e && (e = t.length) }), e }, g.color = n ? function (t) { return t instanceof CanvasGradient && (t = a.global.defaultColor), n(t) } : function (t) { return console.error("Color.js not found!"), t }, g.getHoverColor = function (t) { return t instanceof CanvasPattern ? t : g.color(t).saturate(.5).darken(.1).rgbString() } } }, { 26: 26, 3: 3, 34: 34, 46: 46 }], 29: [function (t, e, i) { "use strict"; var n = t(46); function s(t, e) { return t.native ? { x: t.x, y: t.y } : n.getRelativePosition(t, e) } function l(t, e) { var i, n, a, o, r; for (n = 0, o = t.data.datasets.length; n < o; ++n)if (t.isDatasetVisible(n)) for (a = 0, r = (i = t.getDatasetMeta(n)).data.length; a < r; ++a) { var s = i.data[a]; s._view.skip || e(s) } } function u(t, e) { var i = []; return l(t, function (t) { t.inRange(e.x, e.y) && i.push(t) }), i } function d(t, n, a, o) { var r = Number.POSITIVE_INFINITY, s = []; return l(t, function (t) { if (!a || t.inRange(n.x, n.y)) { var e = t.getCenterPoint(), i = o(n, e); i < r ? (s = [t], r = i) : i === r && s.push(t) } }), s } function c(t) { var a = -1 !== t.indexOf("x"), o = -1 !== t.indexOf("y"); return function (t, e) { var i = a ? Math.abs(t.x - e.x) : 0, n = o ? Math.abs(t.y - e.y) : 0; return Math.sqrt(Math.pow(i, 2) + Math.pow(n, 2)) } } function a(n, t, e) { var i = s(t, n); e.axis = e.axis || "x"; var a = c(e.axis), o = e.intersect ? u(n, i) : d(n, i, !1, a), r = []; return o.length ? (n.data.datasets.forEach(function (t, e) { if (n.isDatasetVisible(e)) { var i = n.getDatasetMeta(e).data[o[0]._index]; i && !i._view.skip && r.push(i) } }), r) : [] } e.exports = { modes: { single: function (t, e) { var i = s(e, t), n = []; return l(t, function (t) { if (t.inRange(i.x, i.y)) return n.push(t), n }), n.slice(0, 1) }, label: a, index: a, dataset: function (t, e, i) { var n = s(e, t); i.axis = i.axis || "xy"; var a = c(i.axis), o = i.intersect ? u(t, n) : d(t, n, !1, a); return 0 < o.length && (o = t.getDatasetMeta(o[0]._datasetIndex).data), o }, "x-axis": function (t, e) { return a(t, e, { intersect: !1 }) }, point: function (t, e) { return u(t, s(e, t)) }, nearest: function (t, e, i) { var n = s(e, t); i.axis = i.axis || "xy"; var a = c(i.axis), o = d(t, n, i.intersect, a); return 1 < o.length && o.sort(function (t, e) { var i = t.getArea() - e.getArea(); return 0 === i && (i = t._datasetIndex - e._datasetIndex), i }), o.slice(0, 1) }, x: function (t, e, i) { var n = s(e, t), a = [], o = !1; return l(t, function (t) { t.inXRange(n.x) && a.push(t), t.inRange(n.x, n.y) && (o = !0) }), i.intersect && !o && (a = []), a }, y: function (t, e, i) { var n = s(e, t), a = [], o = !1; return l(t, function (t) { t.inYRange(n.y) && a.push(t), t.inRange(n.x, n.y) && (o = !0) }), i.intersect && !o && (a = []), a } } } }, { 46: 46 }], 30: [function (t, e, i) { "use strict"; t(26)._set("global", { responsive: !0, responsiveAnimationDuration: 0, maintainAspectRatio: !0, events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"], hover: { onHover: null, mode: "nearest", intersect: !0, animationDuration: 400 }, onClick: null, defaultColor: "rgba(0,0,0,0.1)", defaultFontColor: "#666", defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", defaultFontSize: 12, defaultFontStyle: "normal", showLines: !0, elements: {}, layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } } }), e.exports = function () { var t = function (t, e) { return this.construct(t, e), this }; return t.Chart = t } }, { 26: 26 }], 31: [function (t, e, i) { "use strict"; var B = t(46); function W(t, e) { return B.where(t, function (t) { return t.position === e }) } function V(t, a) { t.forEach(function (t, e) { return t._tmpIndex_ = e, t }), t.sort(function (t, e) { var i = a ? e : t, n = a ? t : e; return i.weight === n.weight ? i._tmpIndex_ - n._tmpIndex_ : i.weight - n.weight }), t.forEach(function (t) { delete t._tmpIndex_ }) } e.exports = { defaults: {}, addBox: function (t, e) { t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, t.boxes.push(e) }, removeBox: function (t, e) { var i = t.boxes ? t.boxes.indexOf(e) : -1; -1 !== i && t.boxes.splice(i, 1) }, configure: function (t, e, i) { for (var n, a = ["fullWidth", "position", "weight"], o = a.length, r = 0; r < o; ++r)n = a[r], i.hasOwnProperty(n) && (e[n] = i[n]) }, update: function (e, i, t) { if (e) { var n = e.options.layout || {}, a = B.options.toPadding(n.padding), o = a.left, r = a.right, s = a.top, l = a.bottom, u = W(e.boxes, "left"), d = W(e.boxes, "right"), c = W(e.boxes, "top"), h = W(e.boxes, "bottom"), f = W(e.boxes, "chartArea"); V(u, !0), V(d, !1), V(c, !0), V(h, !1); var g = i - o - r, p = t - s - l, m = p / 2, v = (i - g / 2) / (u.length + d.length), b = (t - m) / (c.length + h.length), x = g, y = p, k = []; B.each(u.concat(d, c, h), function (t) { var e, i = t.isHorizontal(); i ? (e = t.update(t.fullWidth ? g : x, b), y -= e.height) : (e = t.update(v, y), x -= e.width), k.push({ horizontal: i, minSize: e, box: t }) }); var M = 0, w = 0, C = 0, S = 0; B.each(c.concat(h), function (t) { if (t.getPadding) { var e = t.getPadding(); M = Math.max(M, e.left), w = Math.max(w, e.right) } }), B.each(u.concat(d), function (t) { if (t.getPadding) { var e = t.getPadding(); C = Math.max(C, e.top), S = Math.max(S, e.bottom) } }); var _ = o, D = r, P = s, I = l; B.each(u.concat(d), z), B.each(u, function (t) { _ += t.width }), B.each(d, function (t) { D += t.width }), B.each(c.concat(h), z), B.each(c, function (t) { P += t.height }), B.each(h, function (t) { I += t.height }), B.each(u.concat(d), function (e) { var t = B.findNextWhere(k, function (t) { return t.box === e }), i = { left: 0, right: 0, top: P, bottom: I }; t && e.update(t.minSize.width, y, i) }), _ = o, D = r, P = s, I = l, B.each(u, function (t) { _ += t.width }), B.each(d, function (t) { D += t.width }), B.each(c, function (t) { P += t.height }), B.each(h, function (t) { I += t.height }); var A = Math.max(M - _, 0); _ += A, D += Math.max(w - D, 0); var T = Math.max(C - P, 0); P += T, I += Math.max(S - I, 0); var F = t - P - I, O = i - _ - D; O === x && F === y || (B.each(u, function (t) { t.height = F }), B.each(d, function (t) { t.height = F }), B.each(c, function (t) { t.fullWidth || (t.width = O) }), B.each(h, function (t) { t.fullWidth || (t.width = O) }), y = F, x = O); var R = o + A, L = s + T; B.each(u.concat(c), N), R += x, L += y, B.each(d, N), B.each(h, N), e.chartArea = { left: _, top: P, right: _ + x, bottom: P + y }, B.each(f, function (t) { t.left = e.chartArea.left, t.top = e.chartArea.top, t.right = e.chartArea.right, t.bottom = e.chartArea.bottom, t.update(x, y) }) } function z(e) { var t = B.findNextWhere(k, function (t) { return t.box === e }); if (t) if (e.isHorizontal()) { var i = { left: Math.max(_, M), right: Math.max(D, w), top: 0, bottom: 0 }; e.update(e.fullWidth ? g : x, p / 2, i) } else e.update(t.minSize.width, y) } function N(t) { t.isHorizontal() ? (t.left = t.fullWidth ? o : _, t.right = t.fullWidth ? i - r : _ + x, t.top = L, t.bottom = L + t.height, L = t.bottom) : (t.left = R, t.right = R + t.width, t.top = P, t.bottom = P + y, R = t.right) } } } }, { 46: 46 }], 32: [function (t, e, i) { "use strict"; var r = t(26), s = t(46); r._set("global", { plugins: {} }), e.exports = { _plugins: [], _cacheId: 0, register: function (t) { var e = this._plugins;[].concat(t).forEach(function (t) { -1 === e.indexOf(t) && e.push(t) }), this._cacheId++ }, unregister: function (t) { var i = this._plugins;[].concat(t).forEach(function (t) { var e = i.indexOf(t); -1 !== e && i.splice(e, 1) }), this._cacheId++ }, clear: function () { this._plugins = [], this._cacheId++ }, count: function () { return this._plugins.length }, getAll: function () { return this._plugins }, notify: function (t, e, i) { var n, a, o, r, s, l = this.descriptors(t), u = l.length; for (n = 0; n < u; ++n)if ("function" == typeof (s = (o = (a = l[n]).plugin)[e]) && ((r = [t].concat(i || [])).push(a.options), !1 === s.apply(o, r))) return !1; return !0 }, descriptors: function (t) { var e = t.$$plugins || (t.$$plugins = {}); if (e.id === this._cacheId) return e.descriptors; var n = [], a = [], i = t && t.config || {}, o = i.options && i.options.plugins || {}; return this._plugins.concat(i.plugins || []).forEach(function (t) { if (-1 === n.indexOf(t)) { var e = t.id, i = o[e]; !1 !== i && (!0 === i && (i = s.clone(r.global.plugins[e])), n.push(t), a.push({ plugin: t, options: i || {} })) } }), e.descriptors = a, e.id = this._cacheId, a }, _invalidate: function (t) { delete t.$$plugins } } }, { 26: 26, 46: 46 }], 33: [function (t, e, i) { "use strict"; var y = t(26), n = t(27), H = t(46), a = t(35); function k(t) { var e, i, n = []; for (e = 0, i = t.length; e < i; ++e)n.push(t[e].label); return n } function j(t, e, i) { var n = t.getPixelForTick(e); return i && (n -= 0 === e ? (t.getPixelForTick(1) - n) / 2 : (n - t.getPixelForTick(e - 1)) / 2), n } function M(t, e, i) { return H.isArray(e) ? H.longestText(t, i, e) : t.measureText(e).width } function w(t) { var e = H.valueOrDefault, i = y.global, n = e(t.fontSize, i.defaultFontSize), a = e(t.fontStyle, i.defaultFontStyle), o = e(t.fontFamily, i.defaultFontFamily); return { size: n, style: a, family: o, font: H.fontString(n, a, o) } } function C(t) { return H.options.toLineHeight(H.valueOrDefault(t.lineHeight, 1.2), H.valueOrDefault(t.fontSize, y.global.defaultFontSize)) } y._set("scale", { display: !0, position: "left", offset: !1, gridLines: { display: !0, color: "rgba(0, 0, 0, 0.1)", lineWidth: 1, drawBorder: !0, drawOnChartArea: !0, drawTicks: !0, tickMarkLength: 10, zeroLineWidth: 1, zeroLineColor: "rgba(0,0,0,0.25)", zeroLineBorderDash: [], zeroLineBorderDashOffset: 0, offsetGridLines: !1, borderDash: [], borderDashOffset: 0 }, scaleLabel: { display: !1, labelString: "", lineHeight: 1.2, padding: { top: 4, bottom: 4 } }, ticks: { beginAtZero: !1, minRotation: 0, maxRotation: 50, mirror: !1, padding: 0, reverse: !1, display: !0, autoSkip: !0, autoSkipPadding: 0, labelOffset: 0, callback: a.formatters.values, minor: {}, major: {} } }), e.exports = n.extend({ getPadding: function () { return { left: this.paddingLeft || 0, top: this.paddingTop || 0, right: this.paddingRight || 0, bottom: this.paddingBottom || 0 } }, getTicks: function () { return this._ticks }, mergeTicksOptions: function () { var t = this.options.ticks; for (var e in !1 === t.minor && (t.minor = { display: !1 }), !1 === t.major && (t.major = { display: !1 }), t) "major" !== e && "minor" !== e && (void 0 === t.minor[e] && (t.minor[e] = t[e]), void 0 === t.major[e] && (t.major[e] = t[e])) }, beforeUpdate: function () { H.callback(this.options.beforeUpdate, [this]) }, update: function (t, e, i) { var n, a, o, r, s, l, u = this; for (u.beforeUpdate(), u.maxWidth = t, u.maxHeight = e, u.margins = H.extend({ left: 0, right: 0, top: 0, bottom: 0 }, i), u.longestTextCache = u.longestTextCache || {}, u.beforeSetDimensions(), u.setDimensions(), u.afterSetDimensions(), u.beforeDataLimits(), u.determineDataLimits(), u.afterDataLimits(), u.beforeBuildTicks(), s = u.buildTicks() || [], u.afterBuildTicks(), u.beforeTickToLabelConversion(), o = u.convertTicksToLabels(s) || u.ticks, u.afterTickToLabelConversion(), n = 0, a = (u.ticks = o).length; n < a; ++n)r = o[n], (l = s[n]) ? l.label = r : s.push(l = { label: r, major: !1 }); return u._ticks = s, u.beforeCalculateTickRotation(), u.calculateTickRotation(), u.afterCalculateTickRotation(), u.beforeFit(), u.fit(), u.afterFit(), u.afterUpdate(), u.minSize }, afterUpdate: function () { H.callback(this.options.afterUpdate, [this]) }, beforeSetDimensions: function () { H.callback(this.options.beforeSetDimensions, [this]) }, setDimensions: function () { var t = this; t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0 }, afterSetDimensions: function () { H.callback(this.options.afterSetDimensions, [this]) }, beforeDataLimits: function () { H.callback(this.options.beforeDataLimits, [this]) }, determineDataLimits: H.noop, afterDataLimits: function () { H.callback(this.options.afterDataLimits, [this]) }, beforeBuildTicks: function () { H.callback(this.options.beforeBuildTicks, [this]) }, buildTicks: H.noop, afterBuildTicks: function () { H.callback(this.options.afterBuildTicks, [this]) }, beforeTickToLabelConversion: function () { H.callback(this.options.beforeTickToLabelConversion, [this]) }, convertTicksToLabels: function () { var t = this.options.ticks; this.ticks = this.ticks.map(t.userCallback || t.callback, this) }, afterTickToLabelConversion: function () { H.callback(this.options.afterTickToLabelConversion, [this]) }, beforeCalculateTickRotation: function () { H.callback(this.options.beforeCalculateTickRotation, [this]) }, calculateTickRotation: function () { var t = this, e = t.ctx, i = t.options.ticks, n = k(t._ticks), a = w(i); e.font = a.font; var o = i.minRotation || 0; if (n.length && t.options.display && t.isHorizontal()) for (var r, s = H.longestText(e, a.font, n, t.longestTextCache), l = s, u = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; u < l && o < i.maxRotation;) { var d = H.toRadians(o); if (r = Math.cos(d), Math.sin(d) * s > t.maxHeight) { o--; break } o++, l = r * s } t.labelRotation = o }, afterCalculateTickRotation: function () { H.callback(this.options.afterCalculateTickRotation, [this]) }, beforeFit: function () { H.callback(this.options.beforeFit, [this]) }, fit: function () { var t = this, e = t.minSize = { width: 0, height: 0 }, i = k(t._ticks), n = t.options, a = n.ticks, o = n.scaleLabel, r = n.gridLines, s = n.display, l = t.isHorizontal(), u = w(a), d = n.gridLines.tickMarkLength; if (e.width = l ? t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : s && r.drawTicks ? d : 0, e.height = l ? s && r.drawTicks ? d : 0 : t.maxHeight, o.display && s) { var c = C(o) + H.options.toPadding(o.padding).height; l ? e.height += c : e.width += c } if (a.display && s) { var h = H.longestText(t.ctx, u.font, i, t.longestTextCache), f = H.numberOfLabelLines(i), g = .5 * u.size, p = t.options.ticks.padding; if (l) { t.longestLabelWidth = h; var m = H.toRadians(t.labelRotation), v = Math.cos(m), b = Math.sin(m) * h + u.size * f + g * (f - 1) + g; e.height = Math.min(t.maxHeight, e.height + b + p), t.ctx.font = u.font; var x = M(t.ctx, i[0], u.font), y = M(t.ctx, i[i.length - 1], u.font); 0 !== t.labelRotation ? (t.paddingLeft = "bottom" === n.position ? v * x + 3 : v * g + 3, t.paddingRight = "bottom" === n.position ? v * g + 3 : v * y + 3) : (t.paddingLeft = x / 2 + 3, t.paddingRight = y / 2 + 3) } else a.mirror ? h = 0 : h += p + g, e.width = Math.min(t.maxWidth, e.width + h), t.paddingTop = u.size / 2, t.paddingBottom = u.size / 2 } t.handleMargins(), t.width = e.width, t.height = e.height }, handleMargins: function () { var t = this; t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0)) }, afterFit: function () { H.callback(this.options.afterFit, [this]) }, isHorizontal: function () { return "top" === this.options.position || "bottom" === this.options.position }, isFullWidth: function () { return this.options.fullWidth }, getRightValue: function (t) { if (H.isNullOrUndef(t)) return NaN; if ("number" == typeof t && !isFinite(t)) return NaN; if (t) if (this.isHorizontal()) { if (void 0 !== t.x) return this.getRightValue(t.x) } else if (void 0 !== t.y) return this.getRightValue(t.y); return t }, getLabelForIndex: H.noop, getPixelForValue: H.noop, getValueForPixel: H.noop, getPixelForTick: function (t) { var e = this, i = e.options.offset; if (e.isHorizontal()) { var n = (e.width - (e.paddingLeft + e.paddingRight)) / Math.max(e._ticks.length - (i ? 0 : 1), 1), a = n * t + e.paddingLeft; i && (a += n / 2); var o = e.left + Math.round(a); return o += e.isFullWidth() ? e.margins.left : 0 } var r = e.height - (e.paddingTop + e.paddingBottom); return e.top + t * (r / (e._ticks.length - 1)) }, getPixelForDecimal: function (t) { var e = this; if (e.isHorizontal()) { var i = (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft, n = e.left + Math.round(i); return n += e.isFullWidth() ? e.margins.left : 0 } return e.top + t * e.height }, getBasePixel: function () { return this.getPixelForValue(this.getBaseValue()) }, getBaseValue: function () { var t = this.min, e = this.max; return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0 }, _autoSkip: function (t) { var e, i, n, a, o = this, r = o.isHorizontal(), s = o.options.ticks.minor, l = t.length, u = H.toRadians(o.labelRotation), d = Math.cos(u), c = o.longestLabelWidth * d, h = []; for (s.maxTicksLimit && (a = s.maxTicksLimit), r && (e = !1, (c + s.autoSkipPadding) * l > o.width - (o.paddingLeft + o.paddingRight) && (e = 1 + Math.floor((c + s.autoSkipPadding) * l / (o.width - (o.paddingLeft + o.paddingRight)))), a && a < l && (e = Math.max(e, Math.floor(l / a)))), i = 0; i < l; i++)n = t[i], (1 < e && 0 < i % e || i % e == 0 && l <= i + e) && i !== l - 1 && delete n.label, h.push(n); return h }, draw: function (S) { var _ = this, D = _.options; if (D.display) { var r = _.ctx, P = y.global, I = D.ticks.minor, t = D.ticks.major || I, A = D.gridLines, e = D.scaleLabel, T = 0 !== _.labelRotation, F = _.isHorizontal(), O = I.autoSkip ? _._autoSkip(_.getTicks()) : _.getTicks(), s = H.valueOrDefault(I.fontColor, P.defaultFontColor), l = w(I), u = H.valueOrDefault(t.fontColor, P.defaultFontColor), d = w(t), R = A.drawTicks ? A.tickMarkLength : 0, i = H.valueOrDefault(e.fontColor, P.defaultFontColor), n = w(e), a = H.options.toPadding(e.padding), L = H.toRadians(_.labelRotation), z = [], N = _.options.gridLines.lineWidth, B = "right" === D.position ? _.left : _.right - N - R, W = "right" === D.position ? _.left + R : _.right, V = "bottom" === D.position ? _.top + N : _.bottom - R - N, E = "bottom" === D.position ? _.top + N + R : _.bottom + N; if (H.each(O, function (t, e) { if (!H.isNullOrUndef(t.label)) { var i, n, a, o, r, s, l, u, d, c, h, f, g, p, m = t.label; o = e === _.zeroLineIndex && D.offset === A.offsetGridLines ? (i = A.zeroLineWidth, n = A.zeroLineColor, a = A.zeroLineBorderDash, A.zeroLineBorderDashOffset) : (i = H.valueAtIndexOrDefault(A.lineWidth, e), n = H.valueAtIndexOrDefault(A.color, e), a = H.valueOrDefault(A.borderDash, P.borderDash), H.valueOrDefault(A.borderDashOffset, P.borderDashOffset)); var v = "middle", b = "middle", x = I.padding; if (F) { var y = R + x; p = "bottom" === D.position ? (b = T ? "middle" : "top", v = T ? "right" : "center", _.top + y) : (b = T ? "middle" : "bottom", v = T ? "left" : "center", _.bottom - y); var k = j(_, e, A.offsetGridLines && 1 < O.length); k < _.left && (n = "rgba(0,0,0,0)"), k += H.aliasPixel(i), g = _.getPixelForTick(e) + I.labelOffset, r = l = d = h = k, s = V, u = E, c = S.top, f = S.bottom + N } else { var M, w = "left" === D.position; M = I.mirror ? (v = w ? "left" : "right", x) : (v = w ? "right" : "left", R + x), g = w ? _.right - M : _.left + M; var C = j(_, e, A.offsetGridLines && 1 < O.length); C < _.top && (n = "rgba(0,0,0,0)"), C += H.aliasPixel(i), p = _.getPixelForTick(e) + I.labelOffset, r = B, l = W, d = S.left, h = S.right + N, s = u = c = f = C } z.push({ tx1: r, ty1: s, tx2: l, ty2: u, x1: d, y1: c, x2: h, y2: f, labelX: g, labelY: p, glWidth: i, glColor: n, glBorderDash: a, glBorderDashOffset: o, rotation: -1 * L, label: m, major: t.major, textBaseline: b, textAlign: v }) } }), H.each(z, function (t) { if (A.display && (r.save(), r.lineWidth = t.glWidth, r.strokeStyle = t.glColor, r.setLineDash && (r.setLineDash(t.glBorderDash), r.lineDashOffset = t.glBorderDashOffset), r.beginPath(), A.drawTicks && (r.moveTo(t.tx1, t.ty1), r.lineTo(t.tx2, t.ty2)), A.drawOnChartArea && (r.moveTo(t.x1, t.y1), r.lineTo(t.x2, t.y2)), r.stroke(), r.restore()), I.display) { r.save(), r.translate(t.labelX, t.labelY), r.rotate(t.rotation), r.font = t.major ? d.font : l.font, r.fillStyle = t.major ? u : s, r.textBaseline = t.textBaseline, r.textAlign = t.textAlign; var e = t.label; if (H.isArray(e)) for (var i = e.length, n = 1.5 * l.size, a = _.isHorizontal() ? 0 : -n * (i - 1) / 2, o = 0; o < i; ++o)r.fillText("" + e[o], 0, a), a += n; else r.fillText(e, 0, 0); r.restore() } }), e.display) { var o, c, h = 0, f = C(e) / 2; if (F) o = _.left + (_.right - _.left) / 2, c = "bottom" === D.position ? _.bottom - f - a.bottom : _.top + f + a.top; else { var g = "left" === D.position; o = g ? _.left + f + a.top : _.right - f - a.top, c = _.top + (_.bottom - _.top) / 2, h = g ? -.5 * Math.PI : .5 * Math.PI } r.save(), r.translate(o, c), r.rotate(h), r.textAlign = "center", r.textBaseline = "middle", r.fillStyle = i, r.font = n.font, r.fillText(e.labelString, 0, 0), r.restore() } if (A.drawBorder) { r.lineWidth = H.valueAtIndexOrDefault(A.lineWidth, 0), r.strokeStyle = H.valueAtIndexOrDefault(A.color, 0); var p = _.left, m = _.right + N, v = _.top, b = _.bottom + N, x = H.aliasPixel(r.lineWidth); F ? (v = b = "top" === D.position ? _.bottom : _.top, v += x, b += x) : (p = m = "left" === D.position ? _.right : _.left, p += x, m += x), r.beginPath(), r.moveTo(p, v), r.lineTo(m, b), r.stroke() } } } }) }, { 26: 26, 27: 27, 35: 35, 46: 46 }], 34: [function (t, e, i) { "use strict"; var n = t(26), a = t(46), o = t(31); e.exports = { constructors: {}, defaults: {}, registerScaleType: function (t, e, i) { this.constructors[t] = e, this.defaults[t] = a.clone(i) }, getScaleConstructor: function (t) { return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0 }, getScaleDefaults: function (t) { return this.defaults.hasOwnProperty(t) ? a.merge({}, [n.scale, this.defaults[t]]) : {} }, updateScaleDefaults: function (t, e) { this.defaults.hasOwnProperty(t) && (this.defaults[t] = a.extend(this.defaults[t], e)) }, addScalesToLayout: function (e) { a.each(e.scales, function (t) { t.fullWidth = t.options.fullWidth, t.position = t.options.position, t.weight = t.options.weight, o.addBox(e, t) }) } } }, { 26: 26, 31: 31, 46: 46 }], 35: [function (t, e, i) { "use strict"; var l = t(46); e.exports = { formatters: { values: function (t) { return l.isArray(t) ? t : "" + t }, linear: function (t, e, i) { var n = 3 < i.length ? i[2] - i[1] : i[1] - i[0]; 1 < Math.abs(n) && t !== Math.floor(t) && (n = t - Math.floor(t)); var a = l.log10(Math.abs(n)), o = ""; if (0 !== t) if (Math.max(Math.abs(i[0]), Math.abs(i[i.length - 1])) < 1e-4) { var r = l.log10(Math.abs(t)); o = t.toExponential(Math.floor(r) - Math.floor(a)) } else { var s = -1 * Math.floor(a); s = Math.max(Math.min(s, 20), 0), o = t.toFixed(s) } else o = "0"; return o }, logarithmic: function (t, e, i) { var n = t / Math.pow(10, Math.floor(l.log10(t))); return 0 === t ? "0" : 1 === n || 2 === n || 5 === n || 0 === e || e === i.length - 1 ? t.toExponential() : "" } } } }, { 46: 46 }], 36: [function (t, e, i) { "use strict"; var n = t(26), a = t(27), R = t(46); n._set("global", { tooltips: { enabled: !0, custom: null, mode: "nearest", position: "average", intersect: !0, backgroundColor: "rgba(0,0,0,0.8)", titleFontStyle: "bold", titleSpacing: 2, titleMarginBottom: 6, titleFontColor: "#fff", titleAlign: "left", bodySpacing: 2, bodyFontColor: "#fff", bodyAlign: "left", footerFontStyle: "bold", footerSpacing: 2, footerMarginTop: 6, footerFontColor: "#fff", footerAlign: "left", yPadding: 6, xPadding: 6, caretPadding: 2, caretSize: 5, cornerRadius: 6, multiKeyBackground: "#fff", displayColors: !0, borderColor: "rgba(0,0,0,0)", borderWidth: 0, callbacks: { beforeTitle: R.noop, title: function (t, e) { var i = "", n = e.labels, a = n ? n.length : 0; if (0 < t.length) { var o = t[0]; o.xLabel ? i = o.xLabel : 0 < a && o.index < a && (i = n[o.index]) } return i }, afterTitle: R.noop, beforeBody: R.noop, beforeLabel: R.noop, label: function (t, e) { var i = e.datasets[t.datasetIndex].label || ""; return i && (i += ": "), i += t.yLabel }, labelColor: function (t, e) { var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view; return { borderColor: i.borderColor, backgroundColor: i.backgroundColor } }, labelTextColor: function () { return this._options.bodyFontColor }, afterLabel: R.noop, afterBody: R.noop, beforeFooter: R.noop, footer: R.noop, afterFooter: R.noop } } }); var L = { average: function (t) { if (!t.length) return !1; var e, i, n = 0, a = 0, o = 0; for (e = 0, i = t.length; e < i; ++e) { var r = t[e]; if (r && r.hasValue()) { var s = r.tooltipPosition(); n += s.x, a += s.y, ++o } } return { x: Math.round(n / o), y: Math.round(a / o) } }, nearest: function (t, e) { var i, n, a, o = e.x, r = e.y, s = Number.POSITIVE_INFINITY; for (i = 0, n = t.length; i < n; ++i) { var l = t[i]; if (l && l.hasValue()) { var u = l.getCenterPoint(), d = R.distanceBetweenPoints(e, u); d < s && (s = d, a = l) } } if (a) { var c = a.tooltipPosition(); o = c.x, r = c.y } return { x: o, y: r } } }; function h(t, e) { var i = R.color(t); return i.alpha(e * i.alpha()).rgbaString() } function r(t, e) { return e && (R.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t } function s(t) { return ("string" == typeof t || t instanceof String) && -1 < t.indexOf("\n") ? t.split("\n") : t } function z(t) { var e = n.global, i = R.valueOrDefault; return { xPadding: t.xPadding, yPadding: t.yPadding, xAlign: t.xAlign, yAlign: t.yAlign, bodyFontColor: t.bodyFontColor, _bodyFontFamily: i(t.bodyFontFamily, e.defaultFontFamily), _bodyFontStyle: i(t.bodyFontStyle, e.defaultFontStyle), _bodyAlign: t.bodyAlign, bodyFontSize: i(t.bodyFontSize, e.defaultFontSize), bodySpacing: t.bodySpacing, titleFontColor: t.titleFontColor, _titleFontFamily: i(t.titleFontFamily, e.defaultFontFamily), _titleFontStyle: i(t.titleFontStyle, e.defaultFontStyle), titleFontSize: i(t.titleFontSize, e.defaultFontSize), _titleAlign: t.titleAlign, titleSpacing: t.titleSpacing, titleMarginBottom: t.titleMarginBottom, footerFontColor: t.footerFontColor, _footerFontFamily: i(t.footerFontFamily, e.defaultFontFamily), _footerFontStyle: i(t.footerFontStyle, e.defaultFontStyle), footerFontSize: i(t.footerFontSize, e.defaultFontSize), _footerAlign: t.footerAlign, footerSpacing: t.footerSpacing, footerMarginTop: t.footerMarginTop, caretSize: t.caretSize, cornerRadius: t.cornerRadius, backgroundColor: t.backgroundColor, opacity: 0, legendColorBackground: t.multiKeyBackground, displayColors: t.displayColors, borderColor: t.borderColor, borderWidth: t.borderWidth } } function o(t) { return r([], s(t)) } (e.exports = a.extend({ initialize: function () { this._model = z(this._options), this._lastActive = [] }, getTitle: function () { var t = this._options.callbacks, e = t.beforeTitle.apply(this, arguments), i = t.title.apply(this, arguments), n = t.afterTitle.apply(this, arguments), a = []; return a = r(a = r(a = r(a, s(e)), s(i)), s(n)) }, getBeforeBody: function () { return o(this._options.callbacks.beforeBody.apply(this, arguments)) }, getBody: function (t, i) { var n = this, a = n._options.callbacks, o = []; return R.each(t, function (t) { var e = { before: [], lines: [], after: [] }; r(e.before, s(a.beforeLabel.call(n, t, i))), r(e.lines, a.label.call(n, t, i)), r(e.after, s(a.afterLabel.call(n, t, i))), o.push(e) }), o }, getAfterBody: function () { return o(this._options.callbacks.afterBody.apply(this, arguments)) }, getFooter: function () { var t = this._options.callbacks, e = t.beforeFooter.apply(this, arguments), i = t.footer.apply(this, arguments), n = t.afterFooter.apply(this, arguments), a = []; return a = r(a = r(a = r(a, s(e)), s(i)), s(n)) }, update: function (t) { var e, i, n, a, o, r, s, l, u, d, c, h, f, g, p, m, v, b, x, y, k = this, M = k._options, w = k._model, C = k._model = z(M), S = k._active, _ = k._data, D = { xAlign: w.xAlign, yAlign: w.yAlign }, P = { x: w.x, y: w.y }, I = { width: w.width, height: w.height }, A = { x: w.caretX, y: w.caretY }; if (S.length) { C.opacity = 1; var T = [], F = []; A = L[M.position].call(k, S, k._eventPosition); var O = []; for (e = 0, i = S.length; e < i; ++e)O.push((m = S[e], b = v = void 0, v = m._xScale, b = m._yScale || m._scale, x = m._index, y = m._datasetIndex, { xLabel: v ? v.getLabelForIndex(x, y) : "", yLabel: b ? b.getLabelForIndex(x, y) : "", index: x, datasetIndex: y, x: m._model.x, y: m._model.y })); M.filter && (O = O.filter(function (t) { return M.filter(t, _) })), M.itemSort && (O = O.sort(function (t, e) { return M.itemSort(t, e, _) })), R.each(O, function (t) { T.push(M.callbacks.labelColor.call(k, t, k._chart)), F.push(M.callbacks.labelTextColor.call(k, t, k._chart)) }), C.title = k.getTitle(O, _), C.beforeBody = k.getBeforeBody(O, _), C.body = k.getBody(O, _), C.afterBody = k.getAfterBody(O, _), C.footer = k.getFooter(O, _), C.x = Math.round(A.x), C.y = Math.round(A.y), C.caretPadding = M.caretPadding, C.labelColors = T, C.labelTextColors = F, C.dataPoints = O, D = function (t, e) { var i, n, a, o, r, s = t._model, l = t._chart, u = t._chart.chartArea, d = "center", c = "center"; s.y < e.height ? c = "top" : s.y > l.height - e.height && (c = "bottom"); var h = (u.left + u.right) / 2, f = (u.top + u.bottom) / 2; n = "center" === c ? (i = function (t) { return t <= h }, function (t) { return h < t }) : (i = function (t) { return t <= e.width / 2 }, function (t) { return t >= l.width - e.width / 2 }), a = function (t) { return t + e.width + s.caretSize + s.caretPadding > l.width }, o = function (t) { return t - e.width - s.caretSize - s.caretPadding < 0 }, r = function (t) { return t <= f ? "top" : "bottom" }, i(s.x) ? (d = "left", a(s.x) && (d = "center", c = r(s.y))) : n(s.x) && (d = "right", o(s.x) && (d = "center", c = r(s.y))); var g = t._options; return { xAlign: g.xAlign ? g.xAlign : d, yAlign: g.yAlign ? g.yAlign : c } }(this, I = function (t, e) { var i = t._chart.ctx, n = 2 * e.yPadding, a = 0, o = e.body, r = o.reduce(function (t, e) { return t + e.before.length + e.lines.length + e.after.length }, 0); r += e.beforeBody.length + e.afterBody.length; var s = e.title.length, l = e.footer.length, u = e.titleFontSize, d = e.bodyFontSize, c = e.footerFontSize; n += s * u, n += s ? (s - 1) * e.titleSpacing : 0, n += s ? e.titleMarginBottom : 0, n += r * d, n += r ? (r - 1) * e.bodySpacing : 0, n += l ? e.footerMarginTop : 0, n += l * c, n += l ? (l - 1) * e.footerSpacing : 0; var h = 0, f = function (t) { a = Math.max(a, i.measureText(t).width + h) }; return i.font = R.fontString(u, e._titleFontStyle, e._titleFontFamily), R.each(e.title, f), i.font = R.fontString(d, e._bodyFontStyle, e._bodyFontFamily), R.each(e.beforeBody.concat(e.afterBody), f), h = e.displayColors ? d + 2 : 0, R.each(o, function (t) { R.each(t.before, f), R.each(t.lines, f), R.each(t.after, f) }), h = 0, i.font = R.fontString(c, e._footerFontStyle, e._footerFontFamily), R.each(e.footer, f), { width: a += 2 * e.xPadding, height: n } }(this, C)), n = C, a = I, o = D, r = k._chart, s = n.x, l = n.y, u = n.caretSize, d = n.caretPadding, c = n.cornerRadius, h = o.xAlign, f = o.yAlign, g = u + d, p = c + d, "right" === h ? s -= a.width : "center" === h && ((s -= a.width / 2) + a.width > r.width && (s = r.width - a.width), s < 0 && (s = 0)), "top" === f ? l += g : l -= "bottom" === f ? a.height + g : a.height / 2, "center" === f ? "left" === h ? s += g : "right" === h && (s -= g) : "left" === h ? s -= p : "right" === h && (s += p), P = { x: s, y: l } } else C.opacity = 0; return C.xAlign = D.xAlign, C.yAlign = D.yAlign, C.x = P.x, C.y = P.y, C.width = I.width, C.height = I.height, C.caretX = A.x, C.caretY = A.y, k._model = C, t && M.custom && M.custom.call(k, C), k }, drawCaret: function (t, e) { var i = this._chart.ctx, n = this._view, a = this.getCaretPosition(t, e, n); i.lineTo(a.x1, a.y1), i.lineTo(a.x2, a.y2), i.lineTo(a.x3, a.y3) }, getCaretPosition: function (t, e, i) { var n, a, o, r, s, l, u = i.caretSize, d = i.cornerRadius, c = i.xAlign, h = i.yAlign, f = t.x, g = t.y, p = e.width, m = e.height; if ("center" === h) s = g + m / 2, l = "left" === c ? (a = (n = f) - u, o = n, r = s + u, s - u) : (a = (n = f + p) + u, o = n, r = s - u, s + u); else if (o = (n = "left" === c ? (a = f + d + u) - u : "right" === c ? (a = f + p - d - u) - u : (a = i.caretX) - u, a + u), "top" === h) s = (r = g) - u, l = r; else { s = (r = g + m) + u, l = r; var v = o; o = n, n = v } return { x1: n, x2: a, x3: o, y1: r, y2: s, y3: l } }, drawTitle: function (t, e, i, n) { var a = e.title; if (a.length) { i.textAlign = e._titleAlign, i.textBaseline = "top"; var o, r, s = e.titleFontSize, l = e.titleSpacing; for (i.fillStyle = h(e.titleFontColor, n), i.font = R.fontString(s, e._titleFontStyle, e._titleFontFamily), o = 0, r = a.length; o < r; ++o)i.fillText(a[o], t.x, t.y), t.y += s + l, o + 1 === a.length && (t.y += e.titleMarginBottom - l) } }, drawBody: function (n, a, o, r) { var s = a.bodyFontSize, e = a.bodySpacing, t = a.body; o.textAlign = a._bodyAlign, o.textBaseline = "top", o.font = R.fontString(s, a._bodyFontStyle, a._bodyFontFamily); var i = 0, l = function (t) { o.fillText(t, n.x + i, n.y), n.y += s + e }; o.fillStyle = h(a.bodyFontColor, r), R.each(a.beforeBody, l); var u = a.displayColors; i = u ? s + 2 : 0, R.each(t, function (t, e) { var i = h(a.labelTextColors[e], r); o.fillStyle = i, R.each(t.before, l), R.each(t.lines, function (t) { u && (o.fillStyle = h(a.legendColorBackground, r), o.fillRect(n.x, n.y, s, s), o.lineWidth = 1, o.strokeStyle = h(a.labelColors[e].borderColor, r), o.strokeRect(n.x, n.y, s, s), o.fillStyle = h(a.labelColors[e].backgroundColor, r), o.fillRect(n.x + 1, n.y + 1, s - 2, s - 2), o.fillStyle = i), l(t) }), R.each(t.after, l) }), i = 0, R.each(a.afterBody, l), n.y -= e }, drawFooter: function (e, i, n, t) { var a = i.footer; a.length && (e.y += i.footerMarginTop, n.textAlign = i._footerAlign, n.textBaseline = "top", n.fillStyle = h(i.footerFontColor, t), n.font = R.fontString(i.footerFontSize, i._footerFontStyle, i._footerFontFamily), R.each(a, function (t) { n.fillText(t, e.x, e.y), e.y += i.footerFontSize + i.footerSpacing })) }, drawBackground: function (t, e, i, n, a) { i.fillStyle = h(e.backgroundColor, a), i.strokeStyle = h(e.borderColor, a), i.lineWidth = e.borderWidth; var o = e.xAlign, r = e.yAlign, s = t.x, l = t.y, u = n.width, d = n.height, c = e.cornerRadius; i.beginPath(), i.moveTo(s + c, l), "top" === r && this.drawCaret(t, n), i.lineTo(s + u - c, l), i.quadraticCurveTo(s + u, l, s + u, l + c), "center" === r && "right" === o && this.drawCaret(t, n), i.lineTo(s + u, l + d - c), i.quadraticCurveTo(s + u, l + d, s + u - c, l + d), "bottom" === r && this.drawCaret(t, n), i.lineTo(s + c, l + d), i.quadraticCurveTo(s, l + d, s, l + d - c), "center" === r && "left" === o && this.drawCaret(t, n), i.lineTo(s, l + c), i.quadraticCurveTo(s, l, s + c, l), i.closePath(), i.fill(), 0 < e.borderWidth && i.stroke() }, draw: function () { var t = this._chart.ctx, e = this._view; if (0 !== e.opacity) { var i = { width: e.width, height: e.height }, n = { x: e.x, y: e.y }, a = Math.abs(e.opacity < .001) ? 0 : e.opacity, o = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length; this._options.enabled && o && (this.drawBackground(n, e, t, i, a), n.x += e.xPadding, n.y += e.yPadding, this.drawTitle(n, e, t, a), this.drawBody(n, e, t, a), this.drawFooter(n, e, t, a)) } }, handleEvent: function (t) { var e, i = this, n = i._options; return i._lastActive = i._lastActive || [], "mouseout" === t.type ? i._active = [] : i._active = i._chart.getElementsAtEventForMode(t, n.mode, n), (e = !R.arrayEquals(i._active, i._lastActive)) && (i._lastActive = i._active, (n.enabled || n.custom) && (i._eventPosition = { x: t.x, y: t.y }, i.update(!0), i.pivot())), e } })).positioners = L }, { 26: 26, 27: 27, 46: 46 }], 37: [function (t, e, i) { "use strict"; var n = t(26), a = t(27), d = t(46); n._set("global", { elements: { arc: { backgroundColor: n.global.defaultColor, borderColor: "#fff", borderWidth: 2 } } }), e.exports = a.extend({ inLabelRange: function (t) { var e = this._view; return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2) }, inRange: function (t, e) { var i = this._view; if (i) { for (var n = d.getAngleFromPoint(i, { x: t, y: e }), a = n.angle, o = n.distance, r = i.startAngle, s = i.endAngle; s < r;)s += 2 * Math.PI; for (; s < a;)a -= 2 * Math.PI; for (; a < r;)a += 2 * Math.PI; var l = r <= a && a <= s, u = o >= i.innerRadius && o <= i.outerRadius; return l && u } return !1 }, getCenterPoint: function () { var t = this._view, e = (t.startAngle + t.endAngle) / 2, i = (t.innerRadius + t.outerRadius) / 2; return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i } }, getArea: function () { var t = this._view; return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2)) }, tooltipPosition: function () { var t = this._view, e = t.startAngle + (t.endAngle - t.startAngle) / 2, i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius; return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i } }, draw: function () { var t = this._chart.ctx, e = this._view, i = e.startAngle, n = e.endAngle; t.beginPath(), t.arc(e.x, e.y, e.outerRadius, i, n), t.arc(e.x, e.y, e.innerRadius, n, i, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke() } }) }, { 26: 26, 27: 27, 46: 46 }], 38: [function (t, e, i) { "use strict"; var n = t(26), a = t(27), d = t(46), c = n.global; n._set("global", { elements: { line: { tension: .4, backgroundColor: c.defaultColor, borderWidth: 3, borderColor: c.defaultColor, borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", capBezierPoints: !0, fill: !0 } } }), e.exports = a.extend({ draw: function () { var t, e, i, n, a = this._view, o = this._chart.ctx, r = a.spanGaps, s = this._children.slice(), l = c.elements.line, u = -1; for (this._loop && s.length && s.push(s[0]), o.save(), o.lineCap = a.borderCapStyle || l.borderCapStyle, o.setLineDash && o.setLineDash(a.borderDash || l.borderDash), o.lineDashOffset = a.borderDashOffset || l.borderDashOffset, o.lineJoin = a.borderJoinStyle || l.borderJoinStyle, o.lineWidth = a.borderWidth || l.borderWidth, o.strokeStyle = a.borderColor || c.defaultColor, o.beginPath(), u = -1, t = 0; t < s.length; ++t)e = s[t], i = d.previousItem(s, t), n = e._view, 0 === t ? n.skip || (o.moveTo(n.x, n.y), u = t) : (i = -1 === u ? i : s[u], n.skip || (u !== t - 1 && !r || -1 === u ? o.moveTo(n.x, n.y) : d.canvas.lineTo(o, i._view, e._view), u = t)); o.stroke(), o.restore() } }) }, { 26: 26, 27: 27, 46: 46 }], 39: [function (t, e, i) { "use strict"; var u = t(26), n = t(27), d = t(46), c = u.global.defaultColor; function a(t) { var e = this._view; return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius } u._set("global", { elements: { point: { radius: 3, pointStyle: "circle", backgroundColor: c, borderColor: c, borderWidth: 1, hitRadius: 1, hoverRadius: 4, hoverBorderWidth: 1 } } }), e.exports = n.extend({ inRange: function (t, e) { var i = this._view; return !!i && Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(i.hitRadius + i.radius, 2) }, inLabelRange: a, inXRange: a, inYRange: function (t) { var e = this._view; return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius }, getCenterPoint: function () { var t = this._view; return { x: t.x, y: t.y } }, getArea: function () { return Math.PI * Math.pow(this._view.radius, 2) }, tooltipPosition: function () { var t = this._view; return { x: t.x, y: t.y, padding: t.radius + t.borderWidth } }, draw: function (t) { var e = this._view, i = this._model, n = this._chart.ctx, a = e.pointStyle, o = e.rotation, r = e.radius, s = e.x, l = e.y; e.skip || (void 0 === t || i.x >= t.left && 1.01 * t.right >= i.x && i.y >= t.top && 1.01 * t.bottom >= i.y) && (n.strokeStyle = e.borderColor || c, n.lineWidth = d.valueOrDefault(e.borderWidth, u.global.elements.point.borderWidth), n.fillStyle = e.backgroundColor || c, d.canvas.drawPoint(n, a, r, s, l, o)) } }) }, { 26: 26, 27: 27, 46: 46 }], 40: [function (t, e, i) { "use strict"; var n = t(26), a = t(27); function l(t) { return void 0 !== t._view.width } function o(t) { var e, i, n, a, o = t._view; if (l(t)) { var r = o.width / 2; e = o.x - r, i = o.x + r, n = Math.min(o.y, o.base), a = Math.max(o.y, o.base) } else { var s = o.height / 2; e = Math.min(o.x, o.base), i = Math.max(o.x, o.base), n = o.y - s, a = o.y + s } return { left: e, top: n, right: i, bottom: a } } n._set("global", { elements: { rectangle: { backgroundColor: n.global.defaultColor, borderColor: n.global.defaultColor, borderSkipped: "bottom", borderWidth: 0 } } }), e.exports = a.extend({ draw: function () { var t, e, i, n, a, o, r, s = this._chart.ctx, l = this._view, u = l.borderWidth; if (r = l.horizontal ? (t = l.base, e = l.x, i = l.y - l.height / 2, n = l.y + l.height / 2, a = t < e ? 1 : -1, o = 1, l.borderSkipped || "left") : (t = l.x - l.width / 2, e = l.x + l.width / 2, a = 1, o = (i = l.y) < (n = l.base) ? 1 : -1, l.borderSkipped || "bottom"), u) { var d = Math.min(Math.abs(t - e), Math.abs(i - n)), c = (u = d < u ? d : u) / 2, h = t + ("left" !== r ? c * a : 0), f = e + ("right" !== r ? -c * a : 0), g = i + ("top" !== r ? c * o : 0), p = n + ("bottom" !== r ? -c * o : 0); h !== f && (i = g, n = p), g !== p && (t = h, e = f) } s.beginPath(), s.fillStyle = l.backgroundColor, s.strokeStyle = l.borderColor, s.lineWidth = u; var m = [[t, n], [t, i], [e, i], [e, n]], v = ["bottom", "left", "top", "right"].indexOf(r, 0); function b(t) { return m[(v + t) % 4] } -1 === v && (v = 0); var x = b(0); s.moveTo(x[0], x[1]); for (var y = 1; y < 4; y++)x = b(y), s.lineTo(x[0], x[1]); s.fill(), u && s.stroke() }, height: function () { var t = this._view; return t.base - t.y }, inRange: function (t, e) { var i = !1; if (this._view) { var n = o(this); i = t >= n.left && t <= n.right && e >= n.top && e <= n.bottom } return i }, inLabelRange: function (t, e) { if (!this._view) return !1; var i = o(this); return l(this) ? t >= i.left && t <= i.right : e >= i.top && e <= i.bottom }, inXRange: function (t) { var e = o(this); return t >= e.left && t <= e.right }, inYRange: function (t) { var e = o(this); return t >= e.top && t <= e.bottom }, getCenterPoint: function () { var t, e, i = this._view; return e = l(this) ? (t = i.x, (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, i.y), { x: t, y: e } }, getArea: function () { var t = this._view; return t.width * Math.abs(t.y - t.base) }, tooltipPosition: function () { var t = this._view; return { x: t.x, y: t.y } } }) }, { 26: 26, 27: 27 }], 41: [function (t, e, i) { "use strict"; e.exports = {}, e.exports.Arc = t(37), e.exports.Line = t(38), e.exports.Point = t(39), e.exports.Rectangle = t(40) }, { 37: 37, 38: 38, 39: 39, 40: 40 }], 42: [function (t, e, i) { "use strict"; var n = t(43); i = e.exports = { clear: function (t) { t.ctx.clearRect(0, 0, t.width, t.height) }, roundedRect: function (t, e, i, n, a, o) { if (o) { var r = Math.min(o, a / 2 - 1e-7, n / 2 - 1e-7); t.moveTo(e + r, i), t.lineTo(e + n - r, i), t.arcTo(e + n, i, e + n, i + r, r), t.lineTo(e + n, i + a - r), t.arcTo(e + n, i + a, e + n - r, i + a, r), t.lineTo(e + r, i + a), t.arcTo(e, i + a, e, i + a - r, r), t.lineTo(e, i + r), t.arcTo(e, i, e + r, i, r), t.closePath(), t.moveTo(e, i) } else t.rect(e, i, n, a) }, drawPoint: function (t, e, i, n, a, o) { var r, s, l, u, d, c; if (o = o || 0, !e || "object" != typeof e || "[object HTMLImageElement]" !== (r = e.toString()) && "[object HTMLCanvasElement]" !== r) { if (!(isNaN(i) || i <= 0)) { switch (t.save(), t.translate(n, a), t.rotate(o * Math.PI / 180), t.beginPath(), e) { default: t.arc(0, 0, i, 0, 2 * Math.PI), t.closePath(); break; case "triangle": d = (s = 3 * i / Math.sqrt(3)) * Math.sqrt(3) / 2, t.moveTo(-s / 2, d / 3), t.lineTo(s / 2, d / 3), t.lineTo(0, -2 * d / 3), t.closePath(); break; case "rect": c = 1 / Math.SQRT2 * i, t.rect(-c, -c, 2 * c, 2 * c); break; case "rectRounded": var h = i / Math.SQRT2, f = -h, g = -h, p = Math.SQRT2 * i; this.roundedRect(t, f, g, p, p, .425 * i); break; case "rectRot": c = 1 / Math.SQRT2 * i, t.moveTo(-c, 0), t.lineTo(0, c), t.lineTo(c, 0), t.lineTo(0, -c), t.closePath(); break; case "cross": t.moveTo(0, i), t.lineTo(0, -i), t.moveTo(-i, 0), t.lineTo(i, 0); break; case "crossRot": l = Math.cos(Math.PI / 4) * i, u = Math.sin(Math.PI / 4) * i, t.moveTo(-l, -u), t.lineTo(l, u), t.moveTo(-l, u), t.lineTo(l, -u); break; case "star": t.moveTo(0, i), t.lineTo(0, -i), t.moveTo(-i, 0), t.lineTo(i, 0), l = Math.cos(Math.PI / 4) * i, u = Math.sin(Math.PI / 4) * i, t.moveTo(-l, -u), t.lineTo(l, u), t.moveTo(-l, u), t.lineTo(l, -u); break; case "line": t.moveTo(-i, 0), t.lineTo(i, 0); break; case "dash": t.moveTo(0, 0), t.lineTo(i, 0) }t.fill(), t.stroke(), t.restore() } } else t.drawImage(e, n - e.width / 2, a - e.height / 2, e.width, e.height) }, clipArea: function (t, e) { t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip() }, unclipArea: function (t) { t.restore() }, lineTo: function (t, e, i, n) { if (i.steppedLine) return "after" === i.steppedLine && !n || "after" !== i.steppedLine && n ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y), void t.lineTo(i.x, i.y); i.tension ? t.bezierCurveTo(n ? e.controlPointPreviousX : e.controlPointNextX, n ? e.controlPointPreviousY : e.controlPointNextY, n ? i.controlPointNextX : i.controlPointPreviousX, n ? i.controlPointNextY : i.controlPointPreviousY, i.x, i.y) : t.lineTo(i.x, i.y) } }; n.clear = i.clear, n.drawRoundedRectangle = function (t) { t.beginPath(), i.roundedRect.apply(i, arguments) } }, { 43: 43 }], 43: [function (t, e, i) { "use strict"; var n, d = { noop: function () { }, uid: (n = 0, function () { return n++ }), isNullOrUndef: function (t) { return null == t }, isArray: Array.isArray ? Array.isArray : function (t) { return "[object Array]" === Object.prototype.toString.call(t) }, isObject: function (t) { return null !== t && "[object Object]" === Object.prototype.toString.call(t) }, valueOrDefault: function (t, e) { return void 0 === t ? e : t }, valueAtIndexOrDefault: function (t, e, i) { return d.valueOrDefault(d.isArray(t) ? t[e] : t, i) }, callback: function (t, e, i) { if (t && "function" == typeof t.call) return t.apply(i, e) }, each: function (t, e, i, n) { var a, o, r; if (d.isArray(t)) if (o = t.length, n) for (a = o - 1; 0 <= a; a--)e.call(i, t[a], a); else for (a = 0; a < o; a++)e.call(i, t[a], a); else if (d.isObject(t)) for (o = (r = Object.keys(t)).length, a = 0; a < o; a++)e.call(i, t[r[a]], r[a]) }, arrayEquals: function (t, e) { var i, n, a, o; if (!t || !e || t.length !== e.length) return !1; for (i = 0, n = t.length; i < n; ++i)if (a = t[i], o = e[i], a instanceof Array && o instanceof Array) { if (!d.arrayEquals(a, o)) return !1 } else if (a !== o) return !1; return !0 }, clone: function (t) { if (d.isArray(t)) return t.map(d.clone); if (d.isObject(t)) { for (var e = {}, i = Object.keys(t), n = i.length, a = 0; a < n; ++a)e[i[a]] = d.clone(t[i[a]]); return e } return t }, _merger: function (t, e, i, n) { var a = e[t], o = i[t]; d.isObject(a) && d.isObject(o) ? d.merge(a, o, n) : e[t] = d.clone(o) }, _mergerIf: function (t, e, i) { var n = e[t], a = i[t]; d.isObject(n) && d.isObject(a) ? d.mergeIf(n, a) : e.hasOwnProperty(t) || (e[t] = d.clone(a)) }, merge: function (t, e, i) { var n, a, o, r, s, l = d.isArray(e) ? e : [e], u = l.length; if (!d.isObject(t)) return t; for (n = (i = i || {}).merger || d._merger, a = 0; a < u; ++a)if (e = l[a], d.isObject(e)) for (s = 0, r = (o = Object.keys(e)).length; s < r; ++s)n(o[s], t, e, i); return t }, mergeIf: function (t, e) { return d.merge(t, e, { merger: d._mergerIf }) }, extend: function (i) { for (var t = function (t, e) { i[e] = t }, e = 1, n = arguments.length; e < n; ++e)d.each(arguments[e], t); return i }, inherits: function (t) { var e = this, i = t && t.hasOwnProperty("constructor") ? t.constructor : function () { return e.apply(this, arguments) }, n = function () { this.constructor = i }; return n.prototype = e.prototype, i.prototype = new n, i.extend = d.inherits, t && d.extend(i.prototype, t), i.__super__ = e.prototype, i } }; (e.exports = d).callCallback = d.callback, d.indexOf = function (t, e, i) { return Array.prototype.indexOf.call(t, e, i) }, d.getValueOrDefault = d.valueOrDefault, d.getValueAtIndexOrDefault = d.valueAtIndexOrDefault }, {}], 44: [function (t, e, i) { "use strict"; var n = t(43), a = { linear: function (t) { return t }, easeInQuad: function (t) { return t * t }, easeOutQuad: function (t) { return -t * (t - 2) }, easeInOutQuad: function (t) { return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1) }, easeInCubic: function (t) { return t * t * t }, easeOutCubic: function (t) { return (t -= 1) * t * t + 1 }, easeInOutCubic: function (t) { return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2) }, easeInQuart: function (t) { return t * t * t * t }, easeOutQuart: function (t) { return -((t -= 1) * t * t * t - 1) }, easeInOutQuart: function (t) { return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2) }, easeInQuint: function (t) { return t * t * t * t * t }, easeOutQuint: function (t) { return (t -= 1) * t * t * t * t + 1 }, easeInOutQuint: function (t) { return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2) }, easeInSine: function (t) { return 1 - Math.cos(t * (Math.PI / 2)) }, easeOutSine: function (t) { return Math.sin(t * (Math.PI / 2)) }, easeInOutSine: function (t) { return -.5 * (Math.cos(Math.PI * t) - 1) }, easeInExpo: function (t) { return 0 === t ? 0 : Math.pow(2, 10 * (t - 1)) }, easeOutExpo: function (t) { return 1 === t ? 1 : 1 - Math.pow(2, -10 * t) }, easeInOutExpo: function (t) { return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t)) }, easeInCirc: function (t) { return 1 <= t ? t : -(Math.sqrt(1 - t * t) - 1) }, easeOutCirc: function (t) { return Math.sqrt(1 - (t -= 1) * t) }, easeInOutCirc: function (t) { return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1) }, easeInElastic: function (t) { var e = 1.70158, i = 0, n = 1; return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), e = n < 1 ? (n = 1, i / 4) : i / (2 * Math.PI) * Math.asin(1 / n), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i)) }, easeOutElastic: function (t) { var e = 1.70158, i = 0, n = 1; return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), e = n < 1 ? (n = 1, i / 4) : i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / i) + 1) }, easeInOutElastic: function (t) { var e = 1.70158, i = 0, n = 1; return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (i || (i = .45), e = n < 1 ? (n = 1, i / 4) : i / (2 * Math.PI) * Math.asin(1 / n), t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * .5 + 1) }, easeInBack: function (t) { return t * t * (2.70158 * t - 1.70158) }, easeOutBack: function (t) { return (t -= 1) * t * (2.70158 * t + 1.70158) + 1 }, easeInOutBack: function (t) { var e = 1.70158; return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2) }, easeInBounce: function (t) { return 1 - a.easeOutBounce(1 - t) }, easeOutBounce: function (t) { return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375 }, easeInOutBounce: function (t) { return t < .5 ? .5 * a.easeInBounce(2 * t) : .5 * a.easeOutBounce(2 * t - 1) + .5 } }; e.exports = { effects: a }, n.easingEffects = a }, { 43: 43 }], 45: [function (t, e, i) { "use strict"; var r = t(43); e.exports = { toLineHeight: function (t, e) { var i = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$$/); if (!i || "normal" === i[1]) return 1.2 * e; switch (t = +i[2], i[3]) { case "px": return t; case "%": t /= 100 }return e * t }, toPadding: function (t) { var e, i, n, a; return r.isObject(t) ? (e = +t.top || 0, i = +t.right || 0, n = +t.bottom || 0, a = +t.left || 0) : e = i = n = a = +t || 0, { top: e, right: i, bottom: n, left: a, height: e + n, width: a + i } }, resolve: function (t, e, i) { var n, a, o; for (n = 0, a = t.length; n < a; ++n)if (void 0 !== (o = t[n]) && (void 0 !== e && "function" == typeof o && (o = o(e)), void 0 !== i && r.isArray(o) && (o = o[i]), void 0 !== o)) return o } } }, { 43: 43 }], 46: [function (t, e, i) { "use strict"; e.exports = t(43), e.exports.easing = t(44), e.exports.canvas = t(42), e.exports.options = t(45) }, { 42: 42, 43: 43, 44: 44, 45: 45 }], 47: [function (t, e, i) { e.exports = { acquireContext: function (t) { return t && t.canvas && (t = t.canvas), t && t.getContext("2d") || null } } }, {}], 48: [function (t, e, i) { "use strict"; var f = t(46), g = "$$chartjs", p = "chartjs-", m = p + "render-monitor", v = p + "render-animation", b = ["animationstart", "webkitAnimationStart"], s = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" }; function l(t, e) { var i = f.getStyle(t, e), n = i && i.match(/^(\d+)(\.\d+)?px$$/); return n ? Number(n[1]) : void 0 } var n = !!function () { var t = !1; try { var e = Object.defineProperty({}, "passive", { get: function () { t = !0 } }); window.addEventListener("e", null, e) } catch (t) { } return t }() && { passive: !0 }; function x(t, e, i) { t.addEventListener(e, i, n) } function r(t, e, i) { t.removeEventListener(e, i, n) } function y(t, e, i, n, a) { return { type: t, chart: e, native: a || null, x: void 0 !== i ? i : null, y: void 0 !== n ? n : null } } function a(e, t, i) { var n, a, o, r, s, l, u, d, c = e[g] || (e[g] = {}), h = c.resizer = function (t) { var e = document.createElement("div"), i = p + "size-monitor", n = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"; e.style.cssText = n, e.className = i, e.innerHTML = '<div class="' + i + '-expand" style="' + n + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + i + '-shrink" style="' + n + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>'; var a = e.childNodes[0], o = e.childNodes[1]; e._reset = function () { a.scrollLeft = 1e6, a.scrollTop = 1e6, o.scrollLeft = 1e6, o.scrollTop = 1e6 }; var r = function () { e._reset(), t() }; return x(a, "scroll", r.bind(a, "expand")), x(o, "scroll", r.bind(o, "shrink")), e }((o = !(n = function () { if (c.resizer) return t(y("resize", i)) }), r = [], function () { r = Array.prototype.slice.call(arguments), a = a || this, o || (o = !0, f.requestAnimFrame.call(window, function () { o = !1, n.apply(a, r) })) })); l = function () { if (c.resizer) { var t = e.parentNode; t && t !== h.parentNode && t.insertBefore(h, t.firstChild), h._reset() } }, u = (s = e)[g] || (s[g] = {}), d = u.renderProxy = function (t) { t.animationName === v && l() }, f.each(b, function (t) { x(s, t, d) }), u.reflow = !!s.offsetParent, s.classList.add(m) } function o(t) { var e, i, n, a = t[g] || {}, o = a.resizer; delete a.resizer, i = (e = t)[g] || {}, (n = i.renderProxy) && (f.each(b, function (t) { r(e, t, n) }), delete i.renderProxy), e.classList.remove(m), o && o.parentNode && o.parentNode.removeChild(o) } e.exports = { _enabled: "undefined" != typeof window && "undefined" != typeof document, initialize: function () { var t, e, i, n = "from{opacity:0.99}to{opacity:1}"; e = "@-webkit-keyframes " + v + "{" + n + "}@keyframes " + v + "{" + n + "}." + m + "{-webkit-animation:" + v + " 0.001s;animation:" + v + " 0.001s;}", i = (t = this)._style || document.createElement("style"), t._style || (e = "/* Chart.js */\n" + e, (t._style = i).setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(i)), i.appendChild(document.createTextNode(e)) }, acquireContext: function (t, e) { "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas); var i = t && t.getContext && t.getContext("2d"); return i && i.canvas === t ? (function (t, e) { var i = t.style, n = t.getAttribute("height"), a = t.getAttribute("width"); if (t[g] = { initial: { height: n, width: a, style: { display: i.display, height: i.height, width: i.width } } }, i.display = i.display || "block", null === a || "" === a) { var o = l(t, "width"); void 0 !== o && (t.width = o) } if (null === n || "" === n) if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2); else { var r = l(t, "height"); void 0 !== o && (t.height = r) } }(t, e), i) : null }, releaseContext: function (t) { var i = t.canvas; if (i[g]) { var n = i[g].initial;["height", "width"].forEach(function (t) { var e = n[t]; f.isNullOrUndef(e) ? i.removeAttribute(t) : i.setAttribute(t, e) }), f.each(n.style || {}, function (t, e) { i.style[e] = t }), i.width = i.width, delete i[g] } }, addEventListener: function (o, t, r) { var e = o.canvas; if ("resize" !== t) { var i = r[g] || (r[g] = {}); x(e, t, (i.proxies || (i.proxies = {}))[o.id + "_" + t] = function (t) { var e, i, n, a; r((i = o, n = s[(e = t).type] || e.type, a = f.getRelativePosition(e, i), y(n, i, a.x, a.y, e))) }) } else a(e, r, o) }, removeEventListener: function (t, e, i) { var n = t.canvas; if ("resize" !== e) { var a = ((i[g] || {}).proxies || {})[t.id + "_" + e]; a && r(n, e, a) } else o(n) } }, f.addEvent = x, f.removeEvent = r }, { 46: 46 }], 49: [function (t, e, i) { "use strict"; var n = t(46), a = t(47), o = t(48), r = o._enabled ? o : a; e.exports = n.extend({ initialize: function () { }, acquireContext: function () { }, releaseContext: function () { }, addEventListener: function () { }, removeEventListener: function () { } }, r) }, { 46: 46, 47: 47, 48: 48 }], 50: [function (t, e, i) { "use strict"; e.exports = {}, e.exports.filler = t(51), e.exports.legend = t(52), e.exports.title = t(53) }, { 51: 51, 52: 52, 53: 53 }], 51: [function (t, e, i) { "use strict"; var u = t(26), h = t(41), d = t(46); u._set("global", { plugins: { filler: { propagate: !0 } } }); var f = { dataset: function (t) { var e = t.fill, i = t.chart, n = i.getDatasetMeta(e), a = n && i.isDatasetVisible(e) && n.dataset._children || [], o = a.length || 0; return o ? function (t, e) { return e < o && a[e]._view || null } : null }, boundary: function (t) { var e = t.boundary, i = e ? e.x : null, n = e ? e.y : null; return function (t) { return { x: null === i ? t.x : i, y: null === n ? t.y : n } } } }; function g(t, e, i) { var n, a = t._model || {}, o = a.fill; if (void 0 === o && (o = !!a.backgroundColor), !1 === o || null === o) return !1; if (!0 === o) return "origin"; if (n = parseFloat(o, 10), isFinite(n) && Math.floor(n) === n) return "-" !== o[0] && "+" !== o[0] || (n = e + n), !(n === e || n < 0 || i <= n) && n; switch (o) { case "bottom": return "start"; case "top": return "end"; case "zero": return "origin"; case "origin": case "start": case "end": return o; default: return !1 } } function p(t) { var e, i = t.el._model || {}, n = t.el._scale || {}, a = t.fill, o = null; if (isFinite(a)) return null; if ("start" === a ? o = void 0 === i.scaleBottom ? n.bottom : i.scaleBottom : "end" === a ? o = void 0 === i.scaleTop ? n.top : i.scaleTop : void 0 !== i.scaleZero ? o = i.scaleZero : n.getBasePosition ? o = n.getBasePosition() : n.getBasePixel && (o = n.getBasePixel()), null != o) { if (void 0 !== o.x && void 0 !== o.y) return o; if ("number" == typeof o && isFinite(o)) return { x: (e = n.isHorizontal()) ? o : null, y: e ? null : o } } return null } function m(t, e, i) { var n, a = t[e].fill, o = [e]; if (!i) return a; for (; !1 !== a && -1 === o.indexOf(a);) { if (!isFinite(a)) return a; if (!(n = t[a])) return !1; if (n.visible) return a; o.push(a), a = n.fill } return !1 } function x(t) { return t && !t.skip } function y(t, e, i, n, a) { var o; if (n && a) { for (t.moveTo(e[0].x, e[0].y), o = 1; o < n; ++o)d.canvas.lineTo(t, e[o - 1], e[o]); for (t.lineTo(i[a - 1].x, i[a - 1].y), o = a - 1; 0 < o; --o)d.canvas.lineTo(t, i[o], i[o - 1], !0) } } e.exports = { id: "filler", afterDatasetsUpdate: function (t, e) { var i, n, a, o, r, s, l, u = (t.data.datasets || []).length, d = e.propagate, c = []; for (n = 0; n < u; ++n)o = null, (a = (i = t.getDatasetMeta(n)).dataset) && a._model && a instanceof h.Line && (o = { visible: t.isDatasetVisible(n), fill: g(a, n, u), chart: t, el: a }), i.$$filler = o, c.push(o); for (n = 0; n < u; ++n)(o = c[n]) && (o.fill = m(c, n, d), o.boundary = p(o), o.mapper = (l = void 0, s = (r = o).fill, !(l = "dataset") === s ? null : (isFinite(s) || (l = "boundary"), f[l](r)))) }, beforeDatasetDraw: function (t, e) { var i = e.meta.$$filler; if (i) { var n = t.ctx, a = i.el, o = a._view, r = a._children || [], s = i.mapper, l = o.backgroundColor || u.global.defaultColor; s && l && r.length && (d.canvas.clipArea(n, t.chartArea), function (t, e, i, n, a, o) { var r, s, l, u, d, c, h, f = e.length, g = n.spanGaps, p = [], m = [], v = 0, b = 0; for (t.beginPath(), r = 0, s = f + !!o; r < s; ++r)d = i(u = e[l = r % f]._view, l, n), c = x(u), h = x(d), c && h ? (v = p.push(u), b = m.push(d)) : v && b && (g ? (c && p.push(u), h && m.push(d)) : (y(t, p, m, v, b), v = b = 0, p = [], m = [])); y(t, p, m, v, b), t.closePath(), t.fillStyle = a, t.fill() }(n, r, s, o, l, a._loop), d.canvas.unclipArea(n)) } } } }, { 26: 26, 41: 41, 46: 46 }], 52: [function (t, e, i) { "use strict"; var _ = t(26), n = t(27), D = t(46), a = t(31), o = D.noop; function P(t, e) { return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth } _._set("global", { legend: { display: !0, position: "top", fullWidth: !0, reverse: !1, weight: 1e3, onClick: function (t, e) { var i = e.datasetIndex, n = this.chart, a = n.getDatasetMeta(i); a.hidden = null === a.hidden ? !n.data.datasets[i].hidden : null, n.update() }, onHover: null, labels: { boxWidth: 40, padding: 10, generateLabels: function (i) { var t = i.data; return D.isArray(t.datasets) ? t.datasets.map(function (t, e) { return { text: t.label, fillStyle: D.isArray(t.backgroundColor) ? t.backgroundColor[0] : t.backgroundColor, hidden: !i.isDatasetVisible(e), lineCap: t.borderCapStyle, lineDash: t.borderDash, lineDashOffset: t.borderDashOffset, lineJoin: t.borderJoinStyle, lineWidth: t.borderWidth, strokeStyle: t.borderColor, pointStyle: t.pointStyle, datasetIndex: e } }, this) : [] } } }, legendCallback: function (t) { var e = []; e.push('<ul class="' + t.id + '-legend">'); for (var i = 0; i < t.data.datasets.length; i++)e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '"></span>'), t.data.datasets[i].label && e.push(t.data.datasets[i].label), e.push("</li>"); return e.push("</ul>"), e.join("") } }); var r = n.extend({ initialize: function (t) { D.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1 }, beforeUpdate: o, update: function (t, e, i) { var n = this; return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize }, afterUpdate: o, beforeSetDimensions: o, setDimensions: function () { var t = this; t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 } }, afterSetDimensions: o, beforeBuildLabels: o, buildLabels: function () { var e = this, i = e.options.labels || {}, t = D.callback(i.generateLabels, [e.chart], e) || []; i.filter && (t = t.filter(function (t) { return i.filter(t, e.chart.data) })), e.options.reverse && t.reverse(), e.legendItems = t }, afterBuildLabels: o, beforeFit: o, fit: function () { var n = this, t = n.options, a = t.labels, e = t.display, o = n.ctx, i = _.global, r = D.valueOrDefault, s = r(a.fontSize, i.defaultFontSize), l = r(a.fontStyle, i.defaultFontStyle), u = r(a.fontFamily, i.defaultFontFamily), d = D.fontString(s, l, u), c = n.legendHitBoxes = [], h = n.minSize, f = n.isHorizontal(); if (h.height = f ? (h.width = n.maxWidth, e ? 10 : 0) : (h.width = e ? 10 : 0, n.maxHeight), e) if (o.font = d, f) { var g = n.lineWidths = [0], p = n.legendItems.length ? s + a.padding : 0; o.textAlign = "left", o.textBaseline = "top", D.each(n.legendItems, function (t, e) { var i = P(a, s) + s / 2 + o.measureText(t.text).width; g[g.length - 1] + i + a.padding >= n.width && (p += s + a.padding, g[g.length] = n.left), c[e] = { left: 0, top: 0, width: i, height: s }, g[g.length - 1] += i + a.padding }), h.height += p } else { var m = a.padding, v = n.columnWidths = [], b = a.padding, x = 0, y = 0, k = s + m; D.each(n.legendItems, function (t, e) { var i = P(a, s) + s / 2 + o.measureText(t.text).width; y + k > h.height && (b += x + a.padding, v.push(x), y = x = 0), x = Math.max(x, i), y += k, c[e] = { left: 0, top: 0, width: i, height: s } }), b += x, v.push(x), h.width += b } n.width = h.width, n.height = h.height }, afterFit: o, isHorizontal: function () { return "top" === this.options.position || "bottom" === this.options.position }, draw: function () { var c = this, h = c.options, f = h.labels, g = _.global, p = g.elements.line, m = c.width, v = c.lineWidths; if (h.display) { var b, x = c.ctx, y = D.valueOrDefault, t = y(f.fontColor, g.defaultFontColor), k = y(f.fontSize, g.defaultFontSize), e = y(f.fontStyle, g.defaultFontStyle), i = y(f.fontFamily, g.defaultFontFamily), n = D.fontString(k, e, i); x.textAlign = "left", x.textBaseline = "middle", x.lineWidth = .5, x.strokeStyle = t, x.fillStyle = t, x.font = n; var M = P(f, k), w = c.legendHitBoxes, C = c.isHorizontal(); b = C ? { x: c.left + (m - v[0]) / 2, y: c.top + f.padding, line: 0 } : { x: c.left + f.padding, y: c.top + f.padding, line: 0 }; var S = k + f.padding; D.each(c.legendItems, function (t, e) { var i, n, a, o, r, s = x.measureText(t.text).width, l = M + k / 2 + s, u = b.x, d = b.y; C ? m <= u + l && (d = b.y += S, b.line++, u = b.x = c.left + (m - v[b.line]) / 2) : d + S > c.bottom && (u = b.x = u + c.columnWidths[b.line] + f.padding, d = b.y = c.top + f.padding, b.line++), function (t, e, i) { if (!(isNaN(M) || M <= 0)) { x.save(), x.fillStyle = y(i.fillStyle, g.defaultColor), x.lineCap = y(i.lineCap, p.borderCapStyle), x.lineDashOffset = y(i.lineDashOffset, p.borderDashOffset), x.lineJoin = y(i.lineJoin, p.borderJoinStyle), x.lineWidth = y(i.lineWidth, p.borderWidth), x.strokeStyle = y(i.strokeStyle, g.defaultColor); var n = 0 === y(i.lineWidth, p.borderWidth); if (x.setLineDash && x.setLineDash(y(i.lineDash, p.borderDash)), h.labels && h.labels.usePointStyle) { var a = k * Math.SQRT2 / 2, o = a / Math.SQRT2, r = t + o, s = e + o; D.canvas.drawPoint(x, i.pointStyle, a, r, s) } else n || x.strokeRect(t, e, M, k), x.fillRect(t, e, M, k); x.restore() } }(u, d, t), w[e].left = u, w[e].top = d, i = t, n = s, o = M + (a = k / 2) + u, r = d + a, x.fillText(i.text, o, r), i.hidden && (x.beginPath(), x.lineWidth = 2, x.moveTo(o, r), x.lineTo(o + n, r), x.stroke()), C ? b.x += l + f.padding : b.y += S }) } }, handleEvent: function (t) { var e = this, i = e.options, n = "mouseup" === t.type ? "click" : t.type, a = !1; if ("mousemove" === n) { if (!i.onHover) return } else { if ("click" !== n) return; if (!i.onClick) return } var o = t.x, r = t.y; if (o >= e.left && o <= e.right && r >= e.top && r <= e.bottom) for (var s = e.legendHitBoxes, l = 0; l < s.length; ++l) { var u = s[l]; if (o >= u.left && o <= u.left + u.width && r >= u.top && r <= u.top + u.height) { if ("click" === n) { i.onClick.call(e, t.native, e.legendItems[l]), a = !0; break } if ("mousemove" === n) { i.onHover.call(e, t.native, e.legendItems[l]), a = !0; break } } } return a } }); function s(t, e) { var i = new r({ ctx: t.ctx, options: e, chart: t }); a.configure(t, i, e), a.addBox(t, i), t.legend = i } e.exports = { id: "legend", _element: r, beforeInit: function (t) { var e = t.options.legend; e && s(t, e) }, beforeUpdate: function (t) { var e = t.options.legend, i = t.legend; e ? (D.mergeIf(e, _.global.legend), i ? (a.configure(t, i, e), i.options = e) : s(t, e)) : i && (a.removeBox(t, i), delete t.legend) }, afterEvent: function (t, e) { var i = t.legend; i && i.handleEvent(e) } } }, { 26: 26, 27: 27, 31: 31, 46: 46 }], 53: [function (t, e, i) { "use strict"; var M = t(26), n = t(27), w = t(46), a = t(31), o = w.noop; M._set("global", { title: { display: !1, fontStyle: "bold", fullWidth: !0, lineHeight: 1.2, padding: 10, position: "top", text: "", weight: 2e3 } }); var r = n.extend({ initialize: function (t) { w.extend(this, t), this.legendHitBoxes = [] }, beforeUpdate: o, update: function (t, e, i) { var n = this; return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = e, n.margins = i, n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize }, afterUpdate: o, beforeSetDimensions: o, setDimensions: function () { var t = this; t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 } }, afterSetDimensions: o, beforeBuildLabels: o, buildLabels: o, afterBuildLabels: o, beforeFit: o, fit: function () { var t = this, e = w.valueOrDefault, i = t.options, n = i.display, a = e(i.fontSize, M.global.defaultFontSize), o = t.minSize, r = w.isArray(i.text) ? i.text.length : 1, s = w.options.toLineHeight(i.lineHeight, a), l = n ? r * s + 2 * i.padding : 0; t.isHorizontal() ? (o.width = t.maxWidth, o.height = l) : (o.width = l, o.height = t.maxHeight), t.width = o.width, t.height = o.height }, afterFit: o, isHorizontal: function () { var t = this.options.position; return "top" === t || "bottom" === t }, draw: function () { var t = this, e = t.ctx, i = w.valueOrDefault, n = t.options, a = M.global; if (n.display) { var o, r, s, l = i(n.fontSize, a.defaultFontSize), u = i(n.fontStyle, a.defaultFontStyle), d = i(n.fontFamily, a.defaultFontFamily), c = w.fontString(l, u, d), h = w.options.toLineHeight(n.lineHeight, l), f = h / 2 + n.padding, g = 0, p = t.top, m = t.left, v = t.bottom, b = t.right; e.fillStyle = i(n.fontColor, a.defaultFontColor), e.font = c, t.isHorizontal() ? (r = m + (b - m) / 2, s = p + f, o = b - m) : (r = "left" === n.position ? m + f : b - f, s = p + (v - p) / 2, o = v - p, g = Math.PI * ("left" === n.position ? -.5 : .5)), e.save(), e.translate(r, s), e.rotate(g), e.textAlign = "center", e.textBaseline = "middle"; var x = n.text; if (w.isArray(x)) for (var y = 0, k = 0; k < x.length; ++k)e.fillText(x[k], 0, y, o), y += h; else e.fillText(x, 0, 0, o); e.restore() } } }); function s(t, e) { var i = new r({ ctx: t.ctx, options: e, chart: t }); a.configure(t, i, e), a.addBox(t, i), t.titleBlock = i } e.exports = { id: "title", _element: r, beforeInit: function (t) { var e = t.options.title; e && s(t, e) }, beforeUpdate: function (t) { var e = t.options.title, i = t.titleBlock; e ? (w.mergeIf(e, M.global.title), i ? (a.configure(t, i, e), i.options = e) : s(t, e)) : i && (a.removeBox(t, i), delete t.titleBlock) } } }, { 26: 26, 27: 27, 31: 31, 46: 46 }], 54: [function (t, e, i) { "use strict"; var n = t(33), a = t(34); e.exports = function () { var t = n.extend({ getLabels: function () { var t = this.chart.data; return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels }, determineDataLimits: function () { var t, e = this, i = e.getLabels(); e.minIndex = 0, e.maxIndex = i.length - 1, void 0 !== e.options.ticks.min && (t = i.indexOf(e.options.ticks.min), e.minIndex = -1 !== t ? t : e.minIndex), void 0 !== e.options.ticks.max && (t = i.indexOf(e.options.ticks.max), e.maxIndex = -1 !== t ? t : e.maxIndex), e.min = i[e.minIndex], e.max = i[e.maxIndex] }, buildTicks: function () { var t = this, e = t.getLabels(); t.ticks = 0 === t.minIndex && t.maxIndex === e.length - 1 ? e : e.slice(t.minIndex, t.maxIndex + 1) }, getLabelForIndex: function (t, e) { var i = this, n = i.chart.data, a = i.isHorizontal(); return n.yLabels && !a ? i.getRightValue(n.datasets[e].data[t]) : i.ticks[t - i.minIndex] }, getPixelForValue: function (t, e) { var i, n = this, a = n.options.offset, o = Math.max(n.maxIndex + 1 - n.minIndex - (a ? 0 : 1), 1); if (null != t && (i = n.isHorizontal() ? t.x : t.y), void 0 !== i || void 0 !== t && isNaN(e)) { t = i || t; var r = n.getLabels().indexOf(t); e = -1 !== r ? r : e } if (n.isHorizontal()) { var s = n.width / o, l = s * (e - n.minIndex); return a && (l += s / 2), n.left + Math.round(l) } var u = n.height / o, d = u * (e - n.minIndex); return a && (d += u / 2), n.top + Math.round(d) }, getPixelForTick: function (t) { return this.getPixelForValue(this.ticks[t], t + this.minIndex, null) }, getValueForPixel: function (t) { var e = this, i = e.options.offset, n = Math.max(e._ticks.length - (i ? 0 : 1), 1), a = e.isHorizontal(), o = (a ? e.width : e.height) / n; return t -= a ? e.left : e.top, i && (t -= o / 2), (t <= 0 ? 0 : Math.round(t / o)) + e.minIndex }, getBasePixel: function () { return this.bottom } }); a.registerScaleType("category", t, { position: "bottom" }) } }, { 33: 33, 34: 34 }], 55: [function (t, e, i) { "use strict"; var n = t(26), c = t(46), a = t(34), o = t(35); e.exports = function (t) { var e = { position: "left", ticks: { callback: o.formatters.linear } }, i = t.LinearScaleBase.extend({ determineDataLimits: function () { var r = this, s = r.options, l = r.chart, t = l.data.datasets, e = r.isHorizontal(); function u(t) { return e ? t.xAxisID === r.id : t.yAxisID === r.id } r.min = null, r.max = null; var n = s.stacked; if (void 0 === n && c.each(t, function (t, e) { if (!n) { var i = l.getDatasetMeta(e); l.isDatasetVisible(e) && u(i) && void 0 !== i.stack && (n = !0) } }), s.stacked || n) { var d = {}; c.each(t, function (t, e) { var n = l.getDatasetMeta(e), i = [n.type, void 0 === s.stacked && void 0 === n.stack ? e : "", n.stack].join("."); void 0 === d[i] && (d[i] = { positiveValues: [], negativeValues: [] }); var a = d[i].positiveValues, o = d[i].negativeValues; l.isDatasetVisible(e) && u(n) && c.each(t.data, function (t, e) { var i = +r.getRightValue(t); isNaN(i) || n.data[e].hidden || (a[e] = a[e] || 0, o[e] = o[e] || 0, s.relativePoints ? a[e] = 100 : i < 0 ? o[e] += i : a[e] += i) }) }), c.each(d, function (t) { var e = t.positiveValues.concat(t.negativeValues), i = c.min(e), n = c.max(e); r.min = null === r.min ? i : Math.min(r.min, i), r.max = null === r.max ? n : Math.max(r.max, n) }) } else c.each(t, function (t, e) { var n = l.getDatasetMeta(e); l.isDatasetVisible(e) && u(n) && c.each(t.data, function (t, e) { var i = +r.getRightValue(t); isNaN(i) || n.data[e].hidden || (null === r.min ? r.min = i : i < r.min && (r.min = i), null === r.max ? r.max = i : i > r.max && (r.max = i)) }) }); r.min = isFinite(r.min) && !isNaN(r.min) ? r.min : 0, r.max = isFinite(r.max) && !isNaN(r.max) ? r.max : 1, this.handleTickRangeOptions() }, getTickLimit: function () { var t, e = this.options.ticks; if (this.isHorizontal()) t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.width / 50)); else { var i = c.valueOrDefault(e.fontSize, n.global.defaultFontSize); t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.height / (2 * i))) } return t }, handleDirectionalChanges: function () { this.isHorizontal() || this.ticks.reverse() }, getLabelForIndex: function (t, e) { return +this.getRightValue(this.chart.data.datasets[e].data[t]) }, getPixelForValue: function (t) { var e = this, i = e.start, n = +e.getRightValue(t), a = e.end - i; return e.isHorizontal() ? e.left + e.width / a * (n - i) : e.bottom - e.height / a * (n - i) }, getValueForPixel: function (t) { var e = this, i = e.isHorizontal(), n = i ? e.width : e.height, a = (i ? t - e.left : e.bottom - t) / n; return e.start + (e.end - e.start) * a }, getPixelForTick: function (t) { return this.getPixelForValue(this.ticksAsNumbers[t]) } }); a.registerScaleType("linear", i, e) } }, { 26: 26, 34: 34, 35: 35, 46: 46 }], 56: [function (t, e, i) { "use strict"; var c = t(46), n = t(33); e.exports = function (t) { var e = c.noop; t.LinearScaleBase = n.extend({ getRightValue: function (t) { return "string" == typeof t ? +t : n.prototype.getRightValue.call(this, t) }, handleTickRangeOptions: function () { var t = this, e = t.options.ticks; if (e.beginAtZero) { var i = c.sign(t.min), n = c.sign(t.max); i < 0 && n < 0 ? t.max = 0 : 0 < i && 0 < n && (t.min = 0) } var a = void 0 !== e.min || void 0 !== e.suggestedMin, o = void 0 !== e.max || void 0 !== e.suggestedMax; void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (null === t.min ? t.min = e.suggestedMin : t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (null === t.max ? t.max = e.suggestedMax : t.max = Math.max(t.max, e.suggestedMax)), a !== o && t.min >= t.max && (a ? t.max = t.min + 1 : t.min = t.max - 1), t.min === t.max && (t.max++, e.beginAtZero || t.min--) }, getTickLimit: e, handleDirectionalChanges: e, buildTicks: function () { var t = this, e = t.options.ticks, i = t.getTickLimit(), n = { maxTicks: i = Math.max(2, i), min: e.min, max: e.max, precision: e.precision, stepSize: c.valueOrDefault(e.fixedStepSize, e.stepSize) }, a = t.ticks = function (t, e) { var i, n, a, o = []; if (t.stepSize && 0 < t.stepSize) a = t.stepSize; else { var r = c.niceNum(e.max - e.min, !1); a = c.niceNum(r / (t.maxTicks - 1), !0), void 0 !== (n = t.precision) && (i = Math.pow(10, n), a = Math.ceil(a * i) / i) } var s = Math.floor(e.min / a) * a, l = Math.ceil(e.max / a) * a; c.isNullOrUndef(t.min) || c.isNullOrUndef(t.max) || !t.stepSize || c.almostWhole((t.max - t.min) / t.stepSize, a / 1e3) && (s = t.min, l = t.max); var u = (l - s) / a; u = c.almostEquals(u, Math.round(u), a / 1e3) ? Math.round(u) : Math.ceil(u), a < (n = 1) && (n = Math.pow(10, 1 - Math.floor(c.log10(a))), s = Math.round(s * n) / n, l = Math.round(l * n) / n), o.push(void 0 !== t.min ? t.min : s); for (var d = 1; d < u; ++d)o.push(Math.round((s + d * a) * n) / n); return o.push(void 0 !== t.max ? t.max : l), o }(n, t); t.handleDirectionalChanges(), t.max = c.max(a), t.min = c.min(a), e.reverse ? (a.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max) }, convertTicksToLabels: function () { var t = this; t.ticksAsNumbers = t.ticks.slice(), t.zeroLineIndex = t.ticks.indexOf(0), n.prototype.convertTicksToLabels.call(t) } }) } }, { 33: 33, 46: 46 }], 57: [function (t, e, i) { "use strict"; var h = t(46), n = t(33), a = t(34), o = t(35); e.exports = function (c) { var t = { position: "left", ticks: { callback: o.formatters.logarithmic } }, e = n.extend({ determineDataLimits: function () { var r = this, i = r.options, s = r.chart, t = s.data.datasets, e = r.isHorizontal(); function l(t) { return e ? t.xAxisID === r.id : t.yAxisID === r.id } r.min = null, r.max = null, r.minNotZero = null; var n = i.stacked; if (void 0 === n && h.each(t, function (t, e) { if (!n) { var i = s.getDatasetMeta(e); s.isDatasetVisible(e) && l(i) && void 0 !== i.stack && (n = !0) } }), i.stacked || n) { var u = {}; h.each(t, function (t, e) { var a = s.getDatasetMeta(e), o = [a.type, void 0 === i.stacked && void 0 === a.stack ? e : "", a.stack].join("."); s.isDatasetVisible(e) && l(a) && (void 0 === u[o] && (u[o] = []), h.each(t.data, function (t, e) { var i = u[o], n = +r.getRightValue(t); isNaN(n) || a.data[e].hidden || n < 0 || (i[e] = i[e] || 0, i[e] += n) })) }), h.each(u, function (t) { if (0 < t.length) { var e = h.min(t), i = h.max(t); r.min = null === r.min ? e : Math.min(r.min, e), r.max = null === r.max ? i : Math.max(r.max, i) } }) } else h.each(t, function (t, e) { var n = s.getDatasetMeta(e); s.isDatasetVisible(e) && l(n) && h.each(t.data, function (t, e) { var i = +r.getRightValue(t); isNaN(i) || n.data[e].hidden || i < 0 || (null === r.min ? r.min = i : i < r.min && (r.min = i), null === r.max ? r.max = i : i > r.max && (r.max = i), 0 !== i && (null === r.minNotZero || i < r.minNotZero) && (r.minNotZero = i)) }) }); this.handleTickRangeOptions() }, handleTickRangeOptions: function () { var t = this, e = t.options.ticks, i = h.valueOrDefault; t.min = i(e.min, t.min), t.max = i(e.max, t.max), t.min === t.max && (0 !== t.min && null !== t.min ? (t.min = Math.pow(10, Math.floor(h.log10(t.min)) - 1), t.max = Math.pow(10, Math.floor(h.log10(t.max)) + 1)) : (t.min = 1, t.max = 10)), null === t.min && (t.min = Math.pow(10, Math.floor(h.log10(t.max)) - 1)), null === t.max && (t.max = 0 !== t.min ? Math.pow(10, Math.floor(h.log10(t.min)) + 1) : 10), null === t.minNotZero && (0 < t.min ? t.minNotZero = t.min : t.max < 1 ? t.minNotZero = Math.pow(10, Math.floor(h.log10(t.max))) : t.minNotZero = 1) }, buildTicks: function () { var t = this, e = t.options.ticks, i = !t.isHorizontal(), n = { min: e.min, max: e.max }, a = t.ticks = function (t, e) { var i, n, a = [], o = h.valueOrDefault, r = o(t.min, Math.pow(10, Math.floor(h.log10(e.min)))), s = Math.floor(h.log10(e.max)), l = Math.ceil(e.max / Math.pow(10, s)); 0 === r ? (i = Math.floor(h.log10(e.minNotZero)), n = Math.floor(e.minNotZero / Math.pow(10, i)), a.push(r), r = n * Math.pow(10, i)) : (i = Math.floor(h.log10(r)), n = Math.floor(r / Math.pow(10, i))); for (var u = i < 0 ? Math.pow(10, Math.abs(i)) : 1; a.push(r), 10 == ++n && (n = 1, u = 0 <= ++i ? 1 : u), r = Math.round(n * Math.pow(10, i) * u) / u, i < s || i === s && n < l;); var d = o(t.max, r); return a.push(d), a }(n, t); t.max = h.max(a), t.min = h.min(a), e.reverse ? (i = !i, t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max), i && a.reverse() }, convertTicksToLabels: function () { this.tickValues = this.ticks.slice(), n.prototype.convertTicksToLabels.call(this) }, getLabelForIndex: function (t, e) { return +this.getRightValue(this.chart.data.datasets[e].data[t]) }, getPixelForTick: function (t) { return this.getPixelForValue(this.tickValues[t]) }, _getFirstTickValue: function (t) { var e = Math.floor(h.log10(t)); return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e) }, getPixelForValue: function (t) { var e, i, n, a, o, r = this, s = r.options.ticks.reverse, l = h.log10, u = r._getFirstTickValue(r.minNotZero), d = 0; return t = +r.getRightValue(t), o = s ? (n = r.end, a = r.start, -1) : (n = r.start, a = r.end, 1), i = r.isHorizontal() ? (e = r.width, s ? r.right : r.left) : (e = r.height, o *= -1, s ? r.top : r.bottom), t !== n && (0 === n && (e -= d = h.getValueOrDefault(r.options.ticks.fontSize, c.defaults.global.defaultFontSize), n = u), 0 !== t && (d += e / (l(a) - l(n)) * (l(t) - l(n))), i += o * d), i }, getValueForPixel: function (t) { var e, i, n, a, o = this, r = o.options.ticks.reverse, s = h.log10, l = o._getFirstTickValue(o.minNotZero); if (n = r ? (i = o.end, o.start) : (i = o.start, o.end), (a = o.isHorizontal() ? (e = o.width, r ? o.right - t : t - o.left) : (e = o.height, r ? t - o.top : o.bottom - t)) !== i) { if (0 === i) { var u = h.getValueOrDefault(o.options.ticks.fontSize, c.defaults.global.defaultFontSize); a -= u, e -= u, i = l } a *= s(n) - s(i), a /= e, a = Math.pow(10, s(i) + a) } return a } }); a.registerScaleType("logarithmic", e, t) } }, { 33: 33, 34: 34, 35: 35, 46: 46 }], 58: [function (t, e, i) { "use strict"; var n = t(26), k = t(46), a = t(34), o = t(35); e.exports = function (e) { var v = n.global, t = { display: !0, animate: !0, position: "chartArea", angleLines: { display: !0, color: "rgba(0, 0, 0, 0.1)", lineWidth: 1 }, gridLines: { circular: !1 }, ticks: { showLabelBackdrop: !0, backdropColor: "rgba(255,255,255,0.75)", backdropPaddingY: 2, backdropPaddingX: 2, callback: o.formatters.linear }, pointLabels: { display: !0, fontSize: 10, callback: function (t) { return t } } }; function b(t) { var e = t.options; return e.angleLines.display || e.pointLabels.display ? t.chart.data.labels.length : 0 } function x(t) { var e = t.options.pointLabels, i = k.valueOrDefault(e.fontSize, v.defaultFontSize), n = k.valueOrDefault(e.fontStyle, v.defaultFontStyle), a = k.valueOrDefault(e.fontFamily, v.defaultFontFamily); return { size: i, style: n, family: a, font: k.fontString(i, n, a) } } function m(t, e, i, n, a) { return t === n || t === a ? { start: e - i / 2, end: e + i / 2 } : t < n || a < t ? { start: e - i - 5, end: e } : { start: e, end: e + i + 5 } } function y(t, e, i, n) { if (k.isArray(e)) for (var a = i.y, o = 1.5 * n, r = 0; r < e.length; ++r)t.fillText(e[r], i.x, a), a += o; else t.fillText(e, i.x, i.y) } function s(t) { return k.isNumber(t) ? t : 0 } var i = e.LinearScaleBase.extend({ setDimensions: function () { var t = this, e = t.options, i = e.ticks; t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2); var n = k.min([t.height, t.width]), a = k.valueOrDefault(i.fontSize, v.defaultFontSize); t.drawingArea = e.display ? n / 2 - (a / 2 + i.backdropPaddingY) : n / 2 }, determineDataLimits: function () { var a = this, i = a.chart, o = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY; k.each(i.data.datasets, function (t, e) { if (i.isDatasetVisible(e)) { var n = i.getDatasetMeta(e); k.each(t.data, function (t, e) { var i = +a.getRightValue(t); isNaN(i) || n.data[e].hidden || (o = Math.min(i, o), r = Math.max(i, r)) }) } }), a.min = o === Number.POSITIVE_INFINITY ? 0 : o, a.max = r === Number.NEGATIVE_INFINITY ? 0 : r, a.handleTickRangeOptions() }, getTickLimit: function () { var t = this.options.ticks, e = k.valueOrDefault(t.fontSize, v.defaultFontSize); return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e))) }, convertTicksToLabels: function () { var t = this; e.LinearScaleBase.prototype.convertTicksToLabels.call(t), t.pointLabels = t.chart.data.labels.map(t.options.pointLabels.callback, t) }, getLabelForIndex: function (t, e) { return +this.getRightValue(this.chart.data.datasets[e].data[t]) }, fit: function () { var t, e; this.options.pointLabels.display ? function (t) { var e, i, n, a = x(t), o = Math.min(t.height / 2, t.width / 2), r = { r: t.width, l: 0, t: t.height, b: 0 }, s = {}; t.ctx.font = a.font, t._pointLabelSizes = []; var l, u, d, c = b(t); for (e = 0; e < c; e++) { n = t.getPointPosition(e, o), l = t.ctx, u = a.size, d = t.pointLabels[e] || "", i = k.isArray(d) ? { w: k.longestText(l, l.font, d), h: d.length * u + 1.5 * (d.length - 1) * u } : { w: l.measureText(d).width, h: u }, t._pointLabelSizes[e] = i; var h = t.getIndexAngle(e), f = k.toDegrees(h) % 360, g = m(f, n.x, i.w, 0, 180), p = m(f, n.y, i.h, 90, 270); g.start < r.l && (r.l = g.start, s.l = h), g.end > r.r && (r.r = g.end, s.r = h), p.start < r.t && (r.t = p.start, s.t = h), p.end > r.b && (r.b = p.end, s.b = h) } t.setReductions(o, r, s) }(this) : (t = this, e = Math.min(t.height / 2, t.width / 2), t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0)) }, setReductions: function (t, e, i) { var n = e.l / Math.sin(i.l), a = Math.max(e.r - this.width, 0) / Math.sin(i.r), o = -e.t / Math.cos(i.t), r = -Math.max(e.b - this.height, 0) / Math.cos(i.b); n = s(n), a = s(a), o = s(o), r = s(r), this.drawingArea = Math.min(Math.round(t - (n + a) / 2), Math.round(t - (o + r) / 2)), this.setCenterPoint(n, a, o, r) }, setCenterPoint: function (t, e, i, n) { var a = this, o = a.width - e - a.drawingArea, r = t + a.drawingArea, s = i + a.drawingArea, l = a.height - n - a.drawingArea; a.xCenter = Math.round((r + o) / 2 + a.left), a.yCenter = Math.round((s + l) / 2 + a.top) }, getIndexAngle: function (t) { return t * (2 * Math.PI / b(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360 }, getDistanceFromCenterForValue: function (t) { var e = this; if (null === t) return 0; var i = e.drawingArea / (e.max - e.min); return e.options.ticks.reverse ? (e.max - t) * i : (t - e.min) * i }, getPointPosition: function (t, e) { var i = this.getIndexAngle(t) - Math.PI / 2; return { x: Math.round(Math.cos(i) * e) + this.xCenter, y: Math.round(Math.sin(i) * e) + this.yCenter } }, getPointPositionForValue: function (t, e) { return this.getPointPosition(t, this.getDistanceFromCenterForValue(e)) }, getBasePosition: function () { var t = this.min, e = this.max; return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0) }, draw: function () { var o = this, t = o.options, r = t.gridLines, s = t.ticks, l = k.valueOrDefault; if (t.display) { var u = o.ctx, d = this.getIndexAngle(0), c = l(s.fontSize, v.defaultFontSize), e = l(s.fontStyle, v.defaultFontStyle), i = l(s.fontFamily, v.defaultFontFamily), h = k.fontString(c, e, i); k.each(o.ticks, function (t, e) { if (0 < e || s.reverse) { var i = o.getDistanceFromCenterForValue(o.ticksAsNumbers[e]); if (r.display && 0 !== e && function (t, e, i, n) { var a = t.ctx; if (a.strokeStyle = k.valueAtIndexOrDefault(e.color, n - 1), a.lineWidth = k.valueAtIndexOrDefault(e.lineWidth, n - 1), t.options.gridLines.circular) a.beginPath(), a.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI), a.closePath(), a.stroke(); else { var o = b(t); if (0 === o) return; a.beginPath(); var r = t.getPointPosition(0, i); a.moveTo(r.x, r.y); for (var s = 1; s < o; s++)r = t.getPointPosition(s, i), a.lineTo(r.x, r.y); a.closePath(), a.stroke() } }(o, r, i, e), s.display) { var n = l(s.fontColor, v.defaultFontColor); if (u.font = h, u.save(), u.translate(o.xCenter, o.yCenter), u.rotate(d), s.showLabelBackdrop) { var a = u.measureText(t).width; u.fillStyle = s.backdropColor, u.fillRect(-a / 2 - s.backdropPaddingX, -i - c / 2 - s.backdropPaddingY, a + 2 * s.backdropPaddingX, c + 2 * s.backdropPaddingY) } u.textAlign = "center", u.textBaseline = "middle", u.fillStyle = n, u.fillText(t, 0, -i), u.restore() } } }), (t.angleLines.display || t.pointLabels.display) && function (t) { var e = t.ctx, i = t.options, n = i.angleLines, a = i.pointLabels; e.lineWidth = n.lineWidth, e.strokeStyle = n.color; var o, r, s, l, u = t.getDistanceFromCenterForValue(i.ticks.reverse ? t.min : t.max), d = x(t); e.textBaseline = "top"; for (var c = b(t) - 1; 0 <= c; c--) { if (n.display) { var h = t.getPointPosition(c, u); e.beginPath(), e.moveTo(t.xCenter, t.yCenter), e.lineTo(h.x, h.y), e.stroke(), e.closePath() } if (a.display) { var f = t.getPointPosition(c, u + 5), g = k.valueAtIndexOrDefault(a.fontColor, c, v.defaultFontColor); e.font = d.font, e.fillStyle = g; var p = t.getIndexAngle(c), m = k.toDegrees(p); e.textAlign = 0 === (l = m) || 180 === l ? "center" : l < 180 ? "left" : "right", o = m, r = t._pointLabelSizes[c], s = f, 90 === o || 270 === o ? s.y -= r.h / 2 : (270 < o || o < 90) && (s.y -= r.h), y(e, t.pointLabels[c] || "", f, d.size) } } }(o) } } }); a.registerScaleType("radialLinear", i, t) } }, { 26: 26, 34: 34, 35: 35, 46: 46 }], 59: [function (t, e, i) { "use strict"; var x = t(1); x = "function" == typeof x ? x : window.moment; var r = t(26), m = t(46), n = t(33), a = t(34), p = Number.MIN_SAFE_INTEGER || -9007199254740991, v = Number.MAX_SAFE_INTEGER || 9007199254740991, y = { millisecond: { common: !0, size: 1, steps: [1, 2, 5, 10, 20, 50, 100, 250, 500] }, second: { common: !0, size: 1e3, steps: [1, 2, 5, 10, 15, 30] }, minute: { common: !0, size: 6e4, steps: [1, 2, 5, 10, 15, 30] }, hour: { common: !0, size: 36e5, steps: [1, 2, 3, 6, 12] }, day: { common: !0, size: 864e5, steps: [1, 2, 5] }, week: { common: !1, size: 6048e5, steps: [1, 2, 3, 4] }, month: { common: !0, size: 2628e6, steps: [1, 2, 3] }, quarter: { common: !1, size: 7884e6, steps: [1, 2, 3, 4] }, year: { common: !0, size: 3154e7 } }, k = Object.keys(y); function b(t, e) { return t - e } function M(t) { var e, i, n, a = {}, o = []; for (e = 0, i = t.length; e < i; ++e)a[n = t[e]] || (a[n] = !0, o.push(n)); return o } function w(t, e, i, n) { var a = function (t, e, i) { for (var n, a, o, r = 0, s = t.length - 1; 0 <= r && r <= s;) { if (a = t[(n = r + s >> 1) - 1] || null, o = t[n], !a) return { lo: null, hi: o }; if (o[e] < i) r = n + 1; else { if (!(a[e] > i)) return { lo: a, hi: o }; s = n - 1 } } return { lo: o, hi: null } }(t, e, i), o = a.lo ? a.hi ? a.lo : t[t.length - 2] : t[0], r = a.lo ? a.hi ? a.hi : t[t.length - 1] : t[1], s = r[e] - o[e], l = s ? (i - o[e]) / s : 0, u = (r[n] - o[n]) * l; return o[n] + u } function C(t, e) { var i = e.parser, n = e.parser || e.format; return "function" == typeof i ? i(t) : "string" == typeof t && "string" == typeof n ? x(t, n) : (t instanceof x || (t = x(t)), t.isValid() ? t : "function" == typeof n ? n(t) : t) } function S(t, e) { if (m.isNullOrUndef(t)) return null; var i = e.options.time, n = C(e.getRightValue(t), i); return n.isValid() ? (i.round && n.startOf(i.round), n.valueOf()) : null } function _(t) { for (var e = k.indexOf(t) + 1, i = k.length; e < i; ++e)if (y[k[e]].common) return k[e] } function D(t, e, i, n) { var a, o = n.time, r = o.unit || function (t, e, i, n) { var a, o, r, s = k.length; for (a = k.indexOf(t); a < s - 1; ++a)if (r = (o = y[k[a]]).steps ? o.steps[o.steps.length - 1] : v, o.common && Math.ceil((i - e) / (r * o.size)) <= n) return k[a]; return k[s - 1] }(o.minUnit, t, e, i), s = _(r), l = m.valueOrDefault(o.stepSize, o.unitStepSize), u = "week" === r && o.isoWeekday, d = n.ticks.major.enabled, c = y[r], h = x(t), f = x(e), g = []; for (l || (l = function (t, e, i, n) { var a, o, r, s = e - t, l = y[i], u = l.size, d = l.steps; if (!d) return Math.ceil(s / (n * u)); for (a = 0, o = d.length; a < o && (r = d[a], !(Math.ceil(s / (u * r)) <= n)); ++a); return r }(t, e, r, i)), u && (h = h.isoWeekday(u), f = f.isoWeekday(u)), h = h.startOf(u ? "day" : r), (f = f.startOf(u ? "day" : r)) < e && f.add(1, r), a = x(h), d && s && !u && !o.round && (a.startOf(s), a.add(~~((h - a) / (c.size * l)) * l, r)); a < f; a.add(l, r))g.push(+a); return g.push(+a), g } e.exports = function () { var t = n.extend({ initialize: function () { if (!x) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com"); this.mergeTicksOptions(), n.prototype.initialize.call(this) }, update: function () { var t = this.options; return t.time && t.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), n.prototype.update.apply(this, arguments) }, getRightValue: function (t) { return t && void 0 !== t.t && (t = t.t), n.prototype.getRightValue.call(this, t) }, determineDataLimits: function () { var t, e, i, n, a, o, r = this, s = r.chart, l = r.options.time, u = l.unit || "day", d = v, c = p, h = [], f = [], g = []; for (t = 0, i = s.data.labels.length; t < i; ++t)g.push(S(s.data.labels[t], r)); for (t = 0, i = (s.data.datasets || []).length; t < i; ++t)if (s.isDatasetVisible(t)) if (a = s.data.datasets[t].data, m.isObject(a[0])) for (f[t] = [], e = 0, n = a.length; e < n; ++e)o = S(a[e], r), h.push(o), f[t][e] = o; else h.push.apply(h, g), f[t] = g.slice(0); else f[t] = []; g.length && (g = M(g).sort(b), d = Math.min(d, g[0]), c = Math.max(c, g[g.length - 1])), h.length && (h = M(h).sort(b), d = Math.min(d, h[0]), c = Math.max(c, h[h.length - 1])), d = S(l.min, r) || d, c = S(l.max, r) || c, d = d === v ? +x().startOf(u) : d, c = c === p ? +x().endOf(u) + 1 : c, r.min = Math.min(d, c), r.max = Math.max(d + 1, c), r._horizontal = r.isHorizontal(), r._table = [], r._timestamps = { data: h, datasets: f, labels: g } }, buildTicks: function () { var t, e, i, n, a, o, r, s, l, u, d, c, h = this, f = h.min, g = h.max, p = h.options, m = p.time, v = [], b = []; switch (p.ticks.source) { case "data": v = h._timestamps.data; break; case "labels": v = h._timestamps.labels; break; case "auto": default: v = D(f, g, h.getLabelCapacity(f), p) }for ("ticks" === p.bounds && v.length && (f = v[0], g = v[v.length - 1]), f = S(m.min, h) || f, g = S(m.max, h) || g, t = 0, e = v.length; t < e; ++t)f <= (i = v[t]) && i <= g && b.push(i); return h.min = f, h.max = g, h._unit = m.unit || function (t, e, i, n) { var a, o, r = x.duration(x(n).diff(x(i))); for (a = k.length - 1; a >= k.indexOf(e); a--)if (o = k[a], y[o].common && r.as(o) >= t.length) return o; return k[e ? k.indexOf(e) : 0] }(b, m.minUnit, h.min, h.max), h._majorUnit = _(h._unit), h._table = function (t, e, i, n) { if ("linear" === n || !t.length) return [{ time: e, pos: 0 }, { time: i, pos: 1 }]; var a, o, r, s, l, u = [], d = [e]; for (a = 0, o = t.length; a < o; ++a)e < (s = t[a]) && s < i && d.push(s); for (d.push(i), a = 0, o = d.length; a < o; ++a)l = d[a + 1], r = d[a - 1], s = d[a], void 0 !== r && void 0 !== l && Math.round((l + r) / 2) === s || u.push({ time: s, pos: a / (o - 1) }); return u }(h._timestamps.data, f, g, p.distribution), h._offsets = (n = h._table, a = b, o = f, r = g, c = d = 0, (s = p).offset && a.length && (s.time.min || (l = 1 < a.length ? a[1] : r, u = a[0], d = (w(n, "time", l, "pos") - w(n, "time", u, "pos")) / 2), s.time.max || (l = a[a.length - 1], u = 1 < a.length ? a[a.length - 2] : o, c = (w(n, "time", l, "pos") - w(n, "time", u, "pos")) / 2)), { left: d, right: c }), h._labelFormat = function (t, e) { var i, n, a, o = t.length; for (i = 0; i < o; i++) { if (0 !== (n = C(t[i], e)).millisecond()) return "MMM D, YYYY h:mm:ss.SSS a"; 0 === n.second() && 0 === n.minute() && 0 === n.hour() || (a = !0) } return a ? "MMM D, YYYY h:mm:ss a" : "MMM D, YYYY" }(h._timestamps.data, m), function (t, e) { var i, n, a, o, r = []; for (i = 0, n = t.length; i < n; ++i)a = t[i], o = !!e && a === +x(a).startOf(e), r.push({ value: a, major: o }); return r }(b, h._majorUnit) }, getLabelForIndex: function (t, e) { var i = this.chart.data, n = this.options.time, a = i.labels && t < i.labels.length ? i.labels[t] : "", o = i.datasets[e].data[t]; return m.isObject(o) && (a = this.getRightValue(o)), n.tooltipFormat ? C(a, n).format(n.tooltipFormat) : "string" == typeof a ? a : C(a, n).format(this._labelFormat) }, tickFormatFunction: function (t, e, i, n) { var a = this.options, o = t.valueOf(), r = a.time.displayFormats, s = r[this._unit], l = this._majorUnit, u = r[l], d = t.clone().startOf(l).valueOf(), c = a.ticks.major, h = c.enabled && l && u && o === d, f = t.format(n || (h ? u : s)), g = h ? c : a.ticks.minor, p = m.valueOrDefault(g.callback, g.userCallback); return p ? p(f, e, i) : f }, convertTicksToLabels: function (t) { var e, i, n = []; for (e = 0, i = t.length; e < i; ++e)n.push(this.tickFormatFunction(x(t[e].value), e, t)); return n }, getPixelForOffset: function (t) { var e = this, i = e._horizontal ? e.width : e.height, n = e._horizontal ? e.left : e.top, a = w(e._table, "time", t, "pos"); return n + i * (e._offsets.left + a) / (e._offsets.left + 1 + e._offsets.right) }, getPixelForValue: function (t, e, i) { var n = null; if (void 0 !== e && void 0 !== i && (n = this._timestamps.datasets[i][e]), null === n && (n = S(t, this)), null !== n) return this.getPixelForOffset(n) }, getPixelForTick: function (t) { var e = this.getTicks(); return 0 <= t && t < e.length ? this.getPixelForOffset(e[t].value) : null }, getValueForPixel: function (t) { var e = this, i = e._horizontal ? e.width : e.height, n = e._horizontal ? e.left : e.top, a = (i ? (t - n) / i : 0) * (e._offsets.left + 1 + e._offsets.left) - e._offsets.right, o = w(e._table, "pos", a, "time"); return x(o) }, getLabelWidth: function (t) { var e = this.options.ticks, i = this.ctx.measureText(t).width, n = m.toRadians(e.maxRotation), a = Math.cos(n), o = Math.sin(n); return i * a + m.valueOrDefault(e.fontSize, r.global.defaultFontSize) * o }, getLabelCapacity: function (t) { var e = this.options.time.displayFormats.millisecond, i = this.tickFormatFunction(x(t), 0, [], e), n = this.getLabelWidth(i), a = this.isHorizontal() ? this.width : this.height, o = Math.floor(a / n); return 0 < o ? o : 1 } }); a.registerScaleType("time", t, { position: "bottom", distribution: "linear", bounds: "data", time: { parser: !1, format: !1, unit: !1, round: !1, displayFormat: !1, isoWeekday: !1, minUnit: "millisecond", displayFormats: { millisecond: "h:mm:ss.SSS a", second: "h:mm:ss a", minute: "h:mm a", hour: "hA", day: "MMM D", week: "ll", month: "MMM YYYY", quarter: "[Q]Q - YYYY", year: "YYYY" } }, ticks: { autoSkip: !1, source: "auto", major: { enabled: !1 } } }) } }, { 1: 1, 26: 26, 33: 33, 34: 34, 46: 46 }] }, {}, [7])(7) });
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.WHATWGFetch = {})));
}(this, (function (exports) {
    'use strict';

    var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob:
            'FileReader' in self &&
            'Blob' in self &&
            (function () {
                try {
                    new Blob();
                    return true
                } catch (e) {
                    return false
                }
            })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
    };

    function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj)
    }

    if (support.arrayBuffer) {
        var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]'
        ];

        var isArrayBufferView =
            ArrayBuffer.isView ||
            function (obj) {
                return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
            };
    }

    function normalizeName(name) {
        if (typeof name !== 'string') {
            name = String(name);
        }
        if (/[^a-z0-9\-#$$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name')
        }
        return name.toLowerCase()
    }

    function normalizeValue(value) {
        if (typeof value !== 'string') {
            value = String(value);
        }
        return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
        var iterator = {
            next: function () {
                var value = items.shift();
                return { done: value === undefined, value: value }
            }
        };

        if (support.iterable) {
            iterator[Symbol.iterator] = function () {
                return iterator
            };
        }

        return iterator
    }

    function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
                this.append(name, value);
            }, this);
        } else if (Array.isArray(headers)) {
            headers.forEach(function (header) {
                this.append(header[0], header[1]);
            }, this);
        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name]);
            }, this);
        }
    }

    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ', ' + value : value;
    };

    Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null
    };

    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name))
    };

    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this);
            }
        }
    };

    Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push(name);
        });
        return iteratorFor(items)
    };

    Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) {
            items.push(value);
        });
        return iteratorFor(items)
    };

    Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push([name, value]);
        });
        return iteratorFor(items)
    };

    if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
        return new Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function () {
                reject(reader.error);
            };
        })
    }

    function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise
    }

    function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise
    }

    function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);

        for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join('')
    }

    function bufferClone(buf) {
        if (buf.slice) {
            return buf.slice(0)
        } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer
        }
    }

    function Body() {
        this.bodyUsed = false;

        this._initBody = function (body) {
            this._bodyInit = body;
            if (!body) {
                this._bodyText = '';
            } else if (typeof body === 'string') {
                this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                // IE 10-11 can't handle a DataView body.
                this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body);
            } else {
                this._bodyText = body = Object.prototype.toString.call(body);
            }

            if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                    this.headers.set('content-type', 'text/plain;charset=UTF-8');
                } else if (this._bodyBlob && this._bodyBlob.type) {
                    this.headers.set('content-type', this._bodyBlob.type);
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                }
            }
        };

        if (support.blob) {
            this.blob = function () {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected
                }

                if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob)
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]))
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as blob')
                } else {
                    return Promise.resolve(new Blob([this._bodyText]))
                }
            };

            this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                    return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                } else {
                    return this.blob().then(readBlobAsArrayBuffer)
                }
            };
        }

        this.text = function () {
            var rejected = consumed(this);
            if (rejected) {
                return rejected
            }

            if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
            } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text')
            } else {
                return Promise.resolve(this._bodyText)
            }
        };

        if (support.formData) {
            this.formData = function () {
                return this.text().then(decode)
            };
        }

        this.json = function () {
            return this.text().then(JSON.parse)
        };

        return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method
    }

    function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (input instanceof Request) {
            if (input.bodyUsed) {
                throw new TypeError('Already read')
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
                this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
                body = input._bodyInit;
                input.bodyUsed = true;
            }
        } else {
            this.url = String(input);
        }

        this.credentials = options.credentials || this.credentials || 'same-origin';
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.signal = options.signal || this.signal;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body);
    }

    Request.prototype.clone = function () {
        return new Request(this, { body: this._bodyInit })
    };

    function decode(body) {
        var form = new FormData();
        body
            .trim()
            .split('&')
            .forEach(function (bytes) {
                if (bytes) {
                    var split = bytes.split('=');
                    var name = split.shift().replace(/\+/g, ' ');
                    var value = split.join('=').replace(/\+/g, ' ');
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            });
        return form
    }

    function parseHeaders(rawHeaders) {
        var headers = new Headers();
        // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
        // https://tools.ietf.org/html/rfc7230#section-3.2
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
        preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(':');
            var key = parts.shift().trim();
            if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value);
            }
        });
        return headers
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
        if (!options) {
            options = {};
        }

        this.type = 'default';
        this.status = options.status === undefined ? 200 : options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
        })
    };

    Response.error = function () {
        var response = new Response(null, { status: 0, statusText: '' });
        response.type = 'error';
        return response
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
        }

        return new Response(null, { status: status, headers: { location: url } })
    };

    exports.DOMException = self.DOMException;
    try {
        new exports.DOMException();
    } catch (err) {
        exports.DOMException = function (message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
        };
        exports.DOMException.prototype = Object.create(Error.prototype);
        exports.DOMException.prototype.constructor = exports.DOMException;
    }

    function fetch(input, init) {
        return new Promise(function (resolve, reject) {
            var request = new Request(input, init);

            if (request.signal && request.signal.aborted) {
                return reject(new exports.DOMException('Aborted', 'AbortError'))
            }

            var xhr = new XMLHttpRequest();

            function abortXhr() {
                xhr.abort();
            }

            xhr.onload = function () {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                };
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options));
            };

            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };

            xhr.ontimeout = function () {
                reject(new TypeError('Network request failed'));
            };

            xhr.onabort = function () {
                reject(new exports.DOMException('Aborted', 'AbortError'));
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                xhr.withCredentials = true;
            } else if (request.credentials === 'omit') {
                xhr.withCredentials = false;
            }

            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob';
            }

            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value);
            });

            if (request.signal) {
                request.signal.addEventListener('abort', abortXhr);

                xhr.onreadystatechange = function () {
                    // DONE (success or failure)
                    if (xhr.readyState === 4) {
                        request.signal.removeEventListener('abort', abortXhr);
                    }
                };
            }

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        })
    }

    fetch.polyfill = true;

    if (!self.fetch) {
        self.fetch = fetch;
        self.Headers = Headers;
        self.Request = Request;
        self.Response = Response;
    }

    exports.Headers = Headers;
    exports.Request = Request;
    exports.Response = Response;
    exports.fetch = fetch;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

/*
 * forEach Polyfill
 *
 * 2015-12-27
 *
 * By Feifei Hang, http://feifeihang.info
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
'use strict';
(function () {
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function forEach(callback, thisArg) {
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }
            var array = this;
            thisArg = thisArg || this;
            for (var i = 0, l = array.length; i !== l; ++i) {
                callback.call(thisArg, array[i], i, array);
            }
        };
    }

    if (typeof NodeList.prototype.forEach !== 'function') {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
})();

/**!

 @license
 handlebars v4.0.12

 Copyright (C) 2011-2017 by Yehuda Katz

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */
!function (t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Handlebars = e() : t.Handlebars = e() }(this, function () { return function (t) { var e = {}; function r(s) { if (e[s]) return e[s].exports; var i = e[s] = { exports: {}, id: s, loaded: !1 }; return t[s].call(i.exports, i, i.exports, r), i.loaded = !0, i.exports } return r.m = t, r.c = e, r.p = "", r(0) }([function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0; var i = s(r(2)), n = s(r(35)), a = r(36), o = r(41), c = s(r(42)), l = s(r(39)), h = s(r(34)), p = i.default.create; function u() { var t = p(); return t.compile = function (e, r) { return o.compile(e, r, t) }, t.precompile = function (e, r) { return o.precompile(e, r, t) }, t.AST = n.default, t.Compiler = o.Compiler, t.JavaScriptCompiler = c.default, t.Parser = a.parser, t.parse = a.parse, t } var f = u(); f.create = u, h.default(f), f.Visitor = l.default, f.default = f, e.default = f, t.exports = e.default }, function (t, e) { "use strict"; e.default = function (t) { return t && t.__esModule ? t : { default: t } }, e.__esModule = !0 }, function (t, e, r) { "use strict"; var s = r(3).default, i = r(1).default; e.__esModule = !0; var n = s(r(4)), a = i(r(21)), o = i(r(6)), c = s(r(5)), l = s(r(22)), h = i(r(34)); function p() { var t = new n.HandlebarsEnvironment; return c.extend(t, n), t.SafeString = a.default, t.Exception = o.default, t.Utils = c, t.escapeExpression = c.escapeExpression, t.VM = l, t.template = function (e) { return l.template(e, t) }, t } var u = p(); u.create = p, h.default(u), u.default = u, e.default = u, t.exports = e.default }, function (t, e) { "use strict"; e.default = function (t) { if (t && t.__esModule) return t; var e = {}; if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]); return e.default = t, e }, e.__esModule = !0 }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0, e.HandlebarsEnvironment = h; var i = r(5), n = s(r(6)), a = r(10), o = r(18), c = s(r(20)); e.VERSION = "4.0.12"; e.COMPILER_REVISION = 7; e.REVISION_CHANGES = { 1: "<= 1.0.rc.2", 2: "== 1.0.0-rc.3", 3: "== 1.0.0-rc.4", 4: "== 1.x.x", 5: "== 2.0.0-alpha.x", 6: ">= 2.0.0-beta.1", 7: ">= 4.0.0" }; var l = "[object Object]"; function h(t, e, r) { this.helpers = t || {}, this.partials = e || {}, this.decorators = r || {}, a.registerDefaultHelpers(this), o.registerDefaultDecorators(this) } h.prototype = { constructor: h, logger: c.default, log: c.default.log, registerHelper: function (t, e) { if (i.toString.call(t) === l) { if (e) throw new n.default("Arg not supported with multiple helpers"); i.extend(this.helpers, t) } else this.helpers[t] = e }, unregisterHelper: function (t) { delete this.helpers[t] }, registerPartial: function (t, e) { if (i.toString.call(t) === l) i.extend(this.partials, t); else { if (void 0 === e) throw new n.default('Attempting to register a partial called "' + t + '" as undefined'); this.partials[t] = e } }, unregisterPartial: function (t) { delete this.partials[t] }, registerDecorator: function (t, e) { if (i.toString.call(t) === l) { if (e) throw new n.default("Arg not supported with multiple decorators"); i.extend(this.decorators, t) } else this.decorators[t] = e }, unregisterDecorator: function (t) { delete this.decorators[t] } }; var p = c.default.log; e.log = p, e.createFrame = i.createFrame, e.logger = c.default }, function (t, e) { "use strict"; e.__esModule = !0, e.extend = a, e.indexOf = function (t, e) { for (var r = 0, s = t.length; r < s; r++)if (t[r] === e) return r; return -1 }, e.escapeExpression = function (t) { if ("string" != typeof t) { if (t && t.toHTML) return t.toHTML(); if (null == t) return ""; if (!t) return t + ""; t = "" + t } if (!i.test(t)) return t; return t.replace(s, n) }, e.isEmpty = function (t) { return !t && 0 !== t || !(!l(t) || 0 !== t.length) }, e.createFrame = function (t) { var e = a({}, t); return e._parent = t, e }, e.blockParams = function (t, e) { return t.path = e, t }, e.appendContextPath = function (t, e) { return (t ? t + "." : "") + e }; var r = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;", "=": "&#x3D;" }, s = /[&<>"'`=]/g, i = /[&<>"'`=]/; function n(t) { return r[t] } function a(t) { for (var e = 1; e < arguments.length; e++)for (var r in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], r) && (t[r] = arguments[e][r]); return t } var o = Object.prototype.toString; e.toString = o; var c = function (t) { return "function" == typeof t }; c(/x/) && (e.isFunction = c = function (t) { return "function" == typeof t && "[object Function]" === o.call(t) }), e.isFunction = c; var l = Array.isArray || function (t) { return !(!t || "object" != typeof t) && "[object Array]" === o.call(t) }; e.isArray = l }, function (t, e, r) { "use strict"; var s = r(7).default; e.__esModule = !0; var i = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"]; function n(t, e) { var r = e && e.loc, a = void 0, o = void 0; r && (t += " - " + (a = r.start.line) + ":" + (o = r.start.column)); for (var c = Error.prototype.constructor.call(this, t), l = 0; l < i.length; l++)this[i[l]] = c[i[l]]; Error.captureStackTrace && Error.captureStackTrace(this, n); try { r && (this.lineNumber = a, s ? Object.defineProperty(this, "column", { value: o, enumerable: !0 }) : this.column = o) } catch (t) { } } n.prototype = new Error, e.default = n, t.exports = e.default }, function (t, e, r) { t.exports = { default: r(8), __esModule: !0 } }, function (t, e, r) { var s = r(9); t.exports = function (t, e, r) { return s.setDesc(t, e, r) } }, function (t, e) { var r = Object; t.exports = { create: r.create, getProto: r.getPrototypeOf, isEnum: {}.propertyIsEnumerable, getDesc: r.getOwnPropertyDescriptor, setDesc: r.defineProperty, setDescs: r.defineProperties, getKeys: r.keys, getNames: r.getOwnPropertyNames, getSymbols: r.getOwnPropertySymbols, each: [].forEach } }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0, e.registerDefaultHelpers = function (t) { i.default(t), n.default(t), a.default(t), o.default(t), c.default(t), l.default(t), h.default(t) }; var i = s(r(11)), n = s(r(12)), a = s(r(13)), o = s(r(14)), c = s(r(15)), l = s(r(16)), h = s(r(17)) }, function (t, e, r) { "use strict"; e.__esModule = !0; var s = r(5); e.default = function (t) { t.registerHelper("blockHelperMissing", function (e, r) { var i = r.inverse, n = r.fn; if (!0 === e) return n(this); if (!1 === e || null == e) return i(this); if (s.isArray(e)) return e.length > 0 ? (r.ids && (r.ids = [r.name]), t.helpers.each(e, r)) : i(this); if (r.data && r.ids) { var a = s.createFrame(r.data); a.contextPath = s.appendContextPath(r.data.contextPath, r.name), r = { data: a } } return n(e, r) }) }, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0; var i = r(5), n = s(r(6)); e.default = function (t) { t.registerHelper("each", function (t, e) { if (!e) throw new n.default("Must pass iterator to #each"); var r = e.fn, s = e.inverse, a = 0, o = "", c = void 0, l = void 0; function h(e, s, n) { c && (c.key = e, c.index = s, c.first = 0 === s, c.last = !!n, l && (c.contextPath = l + e)), o += r(t[e], { data: c, blockParams: i.blockParams([t[e], e], [l + e, null]) }) } if (e.data && e.ids && (l = i.appendContextPath(e.data.contextPath, e.ids[0]) + "."), i.isFunction(t) && (t = t.call(this)), e.data && (c = i.createFrame(e.data)), t && "object" == typeof t) if (i.isArray(t)) for (var p = t.length; a < p; a++)a in t && h(a, a, a === t.length - 1); else { var u = void 0; for (var f in t) t.hasOwnProperty(f) && (void 0 !== u && h(u, a - 1), u = f, a++); void 0 !== u && h(u, a - 1, !0) } return 0 === a && (o = s(this)), o }) }, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0; var i = s(r(6)); e.default = function (t) { t.registerHelper("helperMissing", function () { if (1 !== arguments.length) throw new i.default('Missing helper: "' + arguments[arguments.length - 1].name + '"') }) }, t.exports = e.default }, function (t, e, r) { "use strict"; e.__esModule = !0; var s = r(5); e.default = function (t) { t.registerHelper("if", function (t, e) { return s.isFunction(t) && (t = t.call(this)), !e.hash.includeZero && !t || s.isEmpty(t) ? e.inverse(this) : e.fn(this) }), t.registerHelper("unless", function (e, r) { return t.helpers.if.call(this, e, { fn: r.inverse, inverse: r.fn, hash: r.hash }) }) }, t.exports = e.default }, function (t, e) { "use strict"; e.__esModule = !0, e.default = function (t) { t.registerHelper("log", function () { for (var e = [void 0], r = arguments[arguments.length - 1], s = 0; s < arguments.length - 1; s++)e.push(arguments[s]); var i = 1; null != r.hash.level ? i = r.hash.level : r.data && null != r.data.level && (i = r.data.level), e[0] = i, t.log.apply(t, e) }) }, t.exports = e.default }, function (t, e) { "use strict"; e.__esModule = !0, e.default = function (t) { t.registerHelper("lookup", function (t, e) { return t && t[e] }) }, t.exports = e.default }, function (t, e, r) { "use strict"; e.__esModule = !0; var s = r(5); e.default = function (t) { t.registerHelper("with", function (t, e) { s.isFunction(t) && (t = t.call(this)); var r = e.fn; if (s.isEmpty(t)) return e.inverse(this); var i = e.data; return e.data && e.ids && ((i = s.createFrame(e.data)).contextPath = s.appendContextPath(e.data.contextPath, e.ids[0])), r(t, { data: i, blockParams: s.blockParams([t], [i && i.contextPath]) }) }) }, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0, e.registerDefaultDecorators = function (t) { i.default(t) }; var i = s(r(19)) }, function (t, e, r) { "use strict"; e.__esModule = !0; var s = r(5); e.default = function (t) { t.registerDecorator("inline", function (t, e, r, i) { var n = t; return e.partials || (e.partials = {}, n = function (i, n) { var a = r.partials; r.partials = s.extend({}, a, e.partials); var o = t(i, n); return r.partials = a, o }), e.partials[i.args[0]] = i.fn, n }) }, t.exports = e.default }, function (t, e, r) { "use strict"; e.__esModule = !0; var s = r(5), i = { methodMap: ["debug", "info", "warn", "error"], level: "info", lookupLevel: function (t) { if ("string" == typeof t) { var e = s.indexOf(i.methodMap, t.toLowerCase()); t = e >= 0 ? e : parseInt(t, 10) } return t }, log: function (t) { if (t = i.lookupLevel(t), "undefined" != typeof console && i.lookupLevel(i.level) <= t) { var e = i.methodMap[t]; console[e] || (e = "log"); for (var r = arguments.length, s = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)s[n - 1] = arguments[n]; console[e].apply(console, s) } } }; e.default = i, t.exports = e.default }, function (t, e) { "use strict"; function r(t) { this.string = t } e.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function () { return "" + this.string }, e.default = r, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(23).default, i = r(3).default, n = r(1).default; e.__esModule = !0, e.checkRevision = function (t) { var e = t && t[0] || 1, r = c.COMPILER_REVISION; if (e !== r) { if (e < r) { var s = c.REVISION_CHANGES[r], i = c.REVISION_CHANGES[e]; throw new o.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + s + ") or downgrade your runtime to an older version (" + i + ").") } throw new o.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").") } }, e.template = function (t, e) { if (!e) throw new o.default("No environment passed to template"); if (!t || !t.main) throw new o.default("Unknown template object: " + typeof t); t.main.decorator = t.main_d, e.VM.checkRevision(t.compiler); var r = { strict: function (t, e) { if (!(e in t)) throw new o.default('"' + e + '" not defined in ' + t); return t[e] }, lookup: function (t, e) { for (var r = t.length, s = 0; s < r; s++)if (t[s] && null != t[s][e]) return t[s][e] }, lambda: function (t, e) { return "function" == typeof t ? t.call(e) : t }, escapeExpression: a.escapeExpression, invokePartial: function (r, s, i) { i.hash && (s = a.extend({}, s, i.hash), i.ids && (i.ids[0] = !0)); r = e.VM.resolvePartial.call(this, r, s, i); var n = e.VM.invokePartial.call(this, r, s, i); null == n && e.compile && (i.partials[i.name] = e.compile(r, t.compilerOptions, e), n = i.partials[i.name](s, i)); { if (null != n) { if (i.indent) { for (var c = n.split("\n"), l = 0, h = c.length; l < h && (c[l] || l + 1 !== h); l++)c[l] = i.indent + c[l]; n = c.join("\n") } return n } throw new o.default("The partial " + i.name + " could not be compiled when running in runtime-only mode") } }, fn: function (e) { var r = t[e]; return r.decorator = t[e + "_d"], r }, programs: [], program: function (t, e, r, s, i) { var n = this.programs[t], a = this.fn(t); return e || i || s || r ? n = l(this, t, a, e, r, s, i) : n || (n = this.programs[t] = l(this, t, a)), n }, data: function (t, e) { for (; t && e--;)t = t._parent; return t }, merge: function (t, e) { var r = t || e; return t && e && t !== e && (r = a.extend({}, e, t)), r }, nullContext: s({}), noop: e.VM.noop, compilerInfo: t.compiler }; function i(e) { var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = s.data; i._setup(s), !s.partial && t.useData && (n = function (t, e) { e && "root" in e || ((e = e ? c.createFrame(e) : {}).root = t); return e }(e, n)); var a = void 0, o = t.useBlockParams ? [] : void 0; function l(e) { return "" + t.main(r, e, r.helpers, r.partials, n, o, a) } return t.useDepths && (a = s.depths ? e != s.depths[0] ? [e].concat(s.depths) : s.depths : [e]), (l = p(t.main, l, r, s.depths || [], n, o))(e, s) } return i.isTop = !0, i._setup = function (s) { s.partial ? (r.helpers = s.helpers, r.partials = s.partials, r.decorators = s.decorators) : (r.helpers = r.merge(s.helpers, e.helpers), t.usePartial && (r.partials = r.merge(s.partials, e.partials)), (t.usePartial || t.useDecorators) && (r.decorators = r.merge(s.decorators, e.decorators))) }, i._child = function (e, s, i, n) { if (t.useBlockParams && !i) throw new o.default("must pass block params"); if (t.useDepths && !n) throw new o.default("must pass parent depths"); return l(r, e, t[e], s, 0, i, n) }, i }, e.wrapProgram = l, e.resolvePartial = function (t, e, r) { t ? t.call || r.name || (r.name = t, t = r.partials[t]) : t = "@partial-block" === r.name ? r.data["partial-block"] : r.partials[r.name]; return t }, e.invokePartial = function (t, e, r) { var s = r.data && r.data["partial-block"]; r.partial = !0, r.ids && (r.data.contextPath = r.ids[0] || r.data.contextPath); var i = void 0; r.fn && r.fn !== h && function () { r.data = c.createFrame(r.data); var t = r.fn; i = r.data["partial-block"] = function (e) { var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]; return r.data = c.createFrame(r.data), r.data["partial-block"] = s, t(e, r) }, t.partials && (r.partials = a.extend({}, r.partials, t.partials)) }(); void 0 === t && i && (t = i); { if (void 0 === t) throw new o.default("The partial " + r.name + " could not be found"); if (t instanceof Function) return t(e, r) } }, e.noop = h; var a = i(r(5)), o = n(r(6)), c = r(4); function l(t, e, r, s, i, n, a) { function o(e) { var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = a; return !a || e == a[0] || e === t.nullContext && null === a[0] || (o = [e].concat(a)), r(t, e, t.helpers, t.partials, i.data || s, n && [i.blockParams].concat(n), o) } return (o = p(r, o, t, a, s, n)).program = e, o.depth = a ? a.length : 0, o.blockParams = i || 0, o } function h() { return "" } function p(t, e, r, s, i, n) { if (t.decorator) { var o = {}; e = t.decorator(e, o, r, s && s[0], i, n, s), a.extend(e, o) } return e } }, function (t, e, r) { t.exports = { default: r(24), __esModule: !0 } }, function (t, e, r) { r(25), t.exports = r(30).Object.seal }, function (t, e, r) { var s = r(26); r(27)("seal", function (t) { return function (e) { return t && s(e) ? t(e) : e } }) }, function (t, e) { t.exports = function (t) { return "object" == typeof t ? null !== t : "function" == typeof t } }, function (t, e, r) { var s = r(28), i = r(30), n = r(33); t.exports = function (t, e) { var r = (i.Object || {})[t] || Object[t], a = {}; a[t] = e(r), s(s.S + s.F * n(function () { r(1) }), "Object", a) } }, function (t, e, r) { var s = r(29), i = r(30), n = r(31), a = "prototype", o = function (t, e, r) { var c, l, h, p = t & o.F, u = t & o.G, f = t & o.S, d = t & o.P, m = t & o.B, g = t & o.W, v = u ? i : i[e] || (i[e] = {}), y = u ? s : f ? s[e] : (s[e] || {})[a]; u && (r = e); for (c in r) (l = !p && y && c in y) && c in v || (h = l ? y[c] : r[c], v[c] = u && "function" != typeof y[c] ? r[c] : m && l ? n(h, s) : g && y[c] == h ? function (t) { var e = function (e) { return this instanceof t ? new t(e) : t(e) }; return e[a] = t[a], e }(h) : d && "function" == typeof h ? n(Function.call, h) : h, d && ((v[a] || (v[a] = {}))[c] = h)) }; o.F = 1, o.G = 2, o.S = 4, o.P = 8, o.B = 16, o.W = 32, t.exports = o }, function (t, e) { var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = r) }, function (t, e) { var r = t.exports = { version: "1.2.6" }; "number" == typeof __e && (__e = r) }, function (t, e, r) { var s = r(32); t.exports = function (t, e, r) { if (s(t), void 0 === e) return t; switch (r) { case 1: return function (r) { return t.call(e, r) }; case 2: return function (r, s) { return t.call(e, r, s) }; case 3: return function (r, s, i) { return t.call(e, r, s, i) } }return function () { return t.apply(e, arguments) } } }, function (t, e) { t.exports = function (t) { if ("function" != typeof t) throw TypeError(t + " is not a function!"); return t } }, function (t, e) { t.exports = function (t) { try { return !!t() } catch (t) { return !0 } } }, function (t, e) { (function (r) { "use strict"; e.__esModule = !0, e.default = function (t) { var e = void 0 !== r ? r : window, s = e.Handlebars; t.noConflict = function () { return e.Handlebars === t && (e.Handlebars = s), t } }, t.exports = e.default }).call(e, function () { return this }()) }, function (t, e) { "use strict"; e.__esModule = !0; var r = { helpers: { helperExpression: function (t) { return "SubExpression" === t.type || ("MustacheStatement" === t.type || "BlockStatement" === t.type) && !!(t.params && t.params.length || t.hash) }, scopedId: function (t) { return /^\.|this\b/.test(t.original) }, simpleId: function (t) { return 1 === t.parts.length && !r.helpers.scopedId(t) && !t.depth } } }; e.default = r, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default, i = r(3).default; e.__esModule = !0, e.parse = function (t, e) { if ("Program" === t.type) return t; return n.default.yy = l, l.locInfo = function (t) { return new l.SourceLocation(e && e.srcName, t) }, new a.default(e).accept(n.default.parse(t)) }; var n = s(r(37)), a = s(r(38)), o = i(r(40)), c = r(5); e.parser = n.default; var l = {}; c.extend(l, o) }, function (t, e) { "use strict"; e.__esModule = !0; var r = function () { var t = { trace: function () { }, yy: {}, symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, partialBlock: 12, content: 13, COMMENT: 14, CONTENT: 15, openRawBlock: 16, rawBlock_repetition_plus0: 17, END_RAW_BLOCK: 18, OPEN_RAW_BLOCK: 19, helperName: 20, openRawBlock_repetition0: 21, openRawBlock_option0: 22, CLOSE_RAW_BLOCK: 23, openBlock: 24, block_option0: 25, closeBlock: 26, openInverse: 27, block_option1: 28, OPEN_BLOCK: 29, openBlock_repetition0: 30, openBlock_option0: 31, openBlock_option1: 32, CLOSE: 33, OPEN_INVERSE: 34, openInverse_repetition0: 35, openInverse_option0: 36, openInverse_option1: 37, openInverseChain: 38, OPEN_INVERSE_CHAIN: 39, openInverseChain_repetition0: 40, openInverseChain_option0: 41, openInverseChain_option1: 42, inverseAndProgram: 43, INVERSE: 44, inverseChain: 45, inverseChain_option0: 46, OPEN_ENDBLOCK: 47, OPEN: 48, mustache_repetition0: 49, mustache_option0: 50, OPEN_UNESCAPED: 51, mustache_repetition1: 52, mustache_option1: 53, CLOSE_UNESCAPED: 54, OPEN_PARTIAL: 55, partialName: 56, partial_repetition0: 57, partial_option0: 58, openPartialBlock: 59, OPEN_PARTIAL_BLOCK: 60, openPartialBlock_repetition0: 61, openPartialBlock_option0: 62, param: 63, sexpr: 64, OPEN_SEXPR: 65, sexpr_repetition0: 66, sexpr_option0: 67, CLOSE_SEXPR: 68, hash: 69, hash_repetition_plus0: 70, hashSegment: 71, ID: 72, EQUALS: 73, blockParams: 74, OPEN_BLOCK_PARAMS: 75, blockParams_repetition_plus0: 76, CLOSE_BLOCK_PARAMS: 77, path: 78, dataName: 79, STRING: 80, NUMBER: 81, BOOLEAN: 82, UNDEFINED: 83, NULL: 84, DATA: 85, pathSegments: 86, SEP: 87, $$accept: 0, $$end: 1 }, terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" }, productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]], performAction: function (t, e, r, s, i, n, a) { var o = n.length - 1; switch (i) { case 1: return n[o - 1]; case 2: this.$$ = s.prepareProgram(n[o]); break; case 3: case 4: case 5: case 6: case 7: case 8: this.$$ = n[o]; break; case 9: this.$$ = { type: "CommentStatement", value: s.stripComment(n[o]), strip: s.stripFlags(n[o], n[o]), loc: s.locInfo(this._$$) }; break; case 10: this.$$ = { type: "ContentStatement", original: n[o], value: n[o], loc: s.locInfo(this._$$) }; break; case 11: this.$$ = s.prepareRawBlock(n[o - 2], n[o - 1], n[o], this._$$); break; case 12: this.$$ = { path: n[o - 3], params: n[o - 2], hash: n[o - 1] }; break; case 13: this.$$ = s.prepareBlock(n[o - 3], n[o - 2], n[o - 1], n[o], !1, this._$$); break; case 14: this.$$ = s.prepareBlock(n[o - 3], n[o - 2], n[o - 1], n[o], !0, this._$$); break; case 15: this.$$ = { open: n[o - 5], path: n[o - 4], params: n[o - 3], hash: n[o - 2], blockParams: n[o - 1], strip: s.stripFlags(n[o - 5], n[o]) }; break; case 16: case 17: this.$$ = { path: n[o - 4], params: n[o - 3], hash: n[o - 2], blockParams: n[o - 1], strip: s.stripFlags(n[o - 5], n[o]) }; break; case 18: this.$$ = { strip: s.stripFlags(n[o - 1], n[o - 1]), program: n[o] }; break; case 19: var c = s.prepareBlock(n[o - 2], n[o - 1], n[o], n[o], !1, this._$$), l = s.prepareProgram([c], n[o - 1].loc); l.chained = !0, this.$$ = { strip: n[o - 2].strip, program: l, chain: !0 }; break; case 20: this.$$ = n[o]; break; case 21: this.$$ = { path: n[o - 1], strip: s.stripFlags(n[o - 2], n[o]) }; break; case 22: case 23: this.$$ = s.prepareMustache(n[o - 3], n[o - 2], n[o - 1], n[o - 4], s.stripFlags(n[o - 4], n[o]), this._$$); break; case 24: this.$$ = { type: "PartialStatement", name: n[o - 3], params: n[o - 2], hash: n[o - 1], indent: "", strip: s.stripFlags(n[o - 4], n[o]), loc: s.locInfo(this._$$) }; break; case 25: this.$$ = s.preparePartialBlock(n[o - 2], n[o - 1], n[o], this._$$); break; case 26: this.$$ = { path: n[o - 3], params: n[o - 2], hash: n[o - 1], strip: s.stripFlags(n[o - 4], n[o]) }; break; case 27: case 28: this.$$ = n[o]; break; case 29: this.$$ = { type: "SubExpression", path: n[o - 3], params: n[o - 2], hash: n[o - 1], loc: s.locInfo(this._$$) }; break; case 30: this.$$ = { type: "Hash", pairs: n[o], loc: s.locInfo(this._$$) }; break; case 31: this.$$ = { type: "HashPair", key: s.id(n[o - 2]), value: n[o], loc: s.locInfo(this._$$) }; break; case 32: this.$$ = s.id(n[o - 1]); break; case 33: case 34: this.$$ = n[o]; break; case 35: this.$$ = { type: "StringLiteral", value: n[o], original: n[o], loc: s.locInfo(this._$$) }; break; case 36: this.$$ = { type: "NumberLiteral", value: Number(n[o]), original: Number(n[o]), loc: s.locInfo(this._$$) }; break; case 37: this.$$ = { type: "BooleanLiteral", value: "true" === n[o], original: "true" === n[o], loc: s.locInfo(this._$$) }; break; case 38: this.$$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: s.locInfo(this._$$) }; break; case 39: this.$$ = { type: "NullLiteral", original: null, value: null, loc: s.locInfo(this._$$) }; break; case 40: case 41: this.$$ = n[o]; break; case 42: this.$$ = s.preparePath(!0, n[o], this._$$); break; case 43: this.$$ = s.preparePath(!1, n[o], this._$$); break; case 44: n[o - 2].push({ part: s.id(n[o]), original: n[o], separator: n[o - 1] }), this.$$ = n[o - 2]; break; case 45: this.$$ = [{ part: s.id(n[o]), original: n[o] }]; break; case 46: this.$$ = []; break; case 47: n[o - 1].push(n[o]); break; case 48: this.$$ = [n[o]]; break; case 49: n[o - 1].push(n[o]); break; case 50: this.$$ = []; break; case 51: n[o - 1].push(n[o]); break; case 58: this.$$ = []; break; case 59: n[o - 1].push(n[o]); break; case 64: this.$$ = []; break; case 65: n[o - 1].push(n[o]); break; case 70: this.$$ = []; break; case 71: n[o - 1].push(n[o]); break; case 78: this.$$ = []; break; case 79: n[o - 1].push(n[o]); break; case 82: this.$$ = []; break; case 83: n[o - 1].push(n[o]); break; case 86: this.$$ = []; break; case 87: n[o - 1].push(n[o]); break; case 90: this.$$ = []; break; case 91: n[o - 1].push(n[o]); break; case 94: this.$$ = []; break; case 95: n[o - 1].push(n[o]); break; case 98: this.$$ = [n[o]]; break; case 99: n[o - 1].push(n[o]); break; case 100: this.$$ = [n[o]]; break; case 101: n[o - 1].push(n[o]) } }, table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }], defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] }, parseError: function (t, e) { throw new Error(t) }, parse: function (t) { var e = this, r = [0], s = [null], i = [], n = this.table, a = "", o = 0, c = 0, l = 0; this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, void 0 === this.lexer.yylloc && (this.lexer.yylloc = {}); var h = this.lexer.yylloc; i.push(h); var p = this.lexer.options && this.lexer.options.ranges; "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError); for (var u, f, d, m, g, v, y, k, S, b, _ = {}; ;) { if (d = r[r.length - 1], this.defaultActions[d] ? m = this.defaultActions[d] : (null !== u && void 0 !== u || (b = void 0, "number" != typeof (b = e.lexer.lex() || 1) && (b = e.symbols_[b] || b), u = b), m = n[d] && n[d][u]), void 0 === m || !m.length || !m[0]) { var P = ""; if (!l) { S = []; for (v in n[d]) this.terminals_[v] && v > 2 && S.push("'" + this.terminals_[v] + "'"); P = this.lexer.showPosition ? "Parse error on line " + (o + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + S.join(", ") + ", got '" + (this.terminals_[u] || u) + "'" : "Parse error on line " + (o + 1) + ": Unexpected " + (1 == u ? "end of input" : "'" + (this.terminals_[u] || u) + "'"), this.parseError(P, { text: this.lexer.match, token: this.terminals_[u] || u, line: this.lexer.yylineno, loc: h, expected: S }) } } if (m[0] instanceof Array && m.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + d + ", token: " + u); switch (m[0]) { case 1: r.push(u), s.push(this.lexer.yytext), i.push(this.lexer.yylloc), r.push(m[1]), u = null, f ? (u = f, f = null) : (c = this.lexer.yyleng, a = this.lexer.yytext, o = this.lexer.yylineno, h = this.lexer.yylloc, l > 0 && l--); break; case 2: if (y = this.productions_[m[1]][1], _.$$ = s[s.length - y], _._$$ = { first_line: i[i.length - (y || 1)].first_line, last_line: i[i.length - 1].last_line, first_column: i[i.length - (y || 1)].first_column, last_column: i[i.length - 1].last_column }, p && (_._$$.range = [i[i.length - (y || 1)].range[0], i[i.length - 1].range[1]]), void 0 !== (g = this.performAction.call(_, a, c, o, this.yy, m[1], s, i))) return g; y && (r = r.slice(0, -1 * y * 2), s = s.slice(0, -1 * y), i = i.slice(0, -1 * y)), r.push(this.productions_[m[1]][0]), s.push(_.$$), i.push(_._$$), k = n[r[r.length - 2]][r[r.length - 1]], r.push(k); break; case 3: return !0 } } return !0 } }, e = { EOF: 1, parseError: function (t, e) { if (!this.yy.parser) throw new Error(t); this.yy.parser.parseError(t, e) }, setInput: function (t) { return this._input = t, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this }, input: function () { var t = this._input[0]; return this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t, t.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t }, unput: function (t) { var e = t.length, r = t.split(/(?:\r\n?|\n)/g); this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e - 1), this.offset -= e; var s = this.match.split(/(?:\r\n?|\n)/g); this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), r.length - 1 && (this.yylineno -= r.length - 1); var i = this.yylloc.range; return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: r ? (r.length === s.length ? this.yylloc.first_column : 0) + s[s.length - r.length].length - r[0].length : this.yylloc.first_column - e }, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - e]), this }, more: function () { return this._more = !0, this }, less: function (t) { this.unput(this.match.slice(t)) }, pastInput: function () { var t = this.matched.substr(0, this.matched.length - this.match.length); return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "") }, upcomingInput: function () { var t = this.match; return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "") }, showPosition: function () { var t = this.pastInput(), e = new Array(t.length + 1).join("-"); return t + this.upcomingInput() + "\n" + e + "^" }, next: function () { if (this.done) return this.EOF; var t, e, r, s, i; this._input || (this.done = !0), this._more || (this.yytext = "", this.match = ""); for (var n = this._currentRules(), a = 0; a < n.length && (!(r = this._input.match(this.rules[n[a]])) || e && !(r[0].length > e[0].length) || (e = r, s = a, this.options.flex)); a++); return e ? ((i = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += i.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], t = this.performAction.call(this, this.yy, this, n[s], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), t || void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno }) }, lex: function () { var t = this.next(); return void 0 !== t ? t : this.lex() }, begin: function (t) { this.conditionStack.push(t) }, popState: function () { return this.conditionStack.pop() }, _currentRules: function () { return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules }, topState: function () { return this.conditionStack[this.conditionStack.length - 2] }, pushState: function (t) { this.begin(t) }, options: {}, performAction: function (t, e, r, s) { function i(t, r) { return e.yytext = e.yytext.substr(t, e.yyleng - r) } switch (r) { case 0: if ("\\\\" === e.yytext.slice(-2) ? (i(0, 1), this.begin("mu")) : "\\" === e.yytext.slice(-1) ? (i(0, 1), this.begin("emu")) : this.begin("mu"), e.yytext) return 15; break; case 1: return 15; case 2: return this.popState(), 15; case 3: return this.begin("raw"), 15; case 4: return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (e.yytext = e.yytext.substr(5, e.yyleng - 9), "END_RAW_BLOCK"); case 5: return 15; case 6: return this.popState(), 14; case 7: return 65; case 8: return 68; case 9: return 19; case 10: return this.popState(), this.begin("raw"), 23; case 11: return 55; case 12: return 60; case 13: return 29; case 14: return 47; case 15: case 16: return this.popState(), 44; case 17: return 34; case 18: return 39; case 19: return 51; case 20: return 48; case 21: this.unput(e.yytext), this.popState(), this.begin("com"); break; case 22: return this.popState(), 14; case 23: return 48; case 24: return 73; case 25: case 26: return 72; case 27: return 87; case 28: break; case 29: return this.popState(), 54; case 30: return this.popState(), 33; case 31: return e.yytext = i(1, 2).replace(/\\"/g, '"'), 80; case 32: return e.yytext = i(1, 2).replace(/\\'/g, "'"), 80; case 33: return 85; case 34: case 35: return 82; case 36: return 83; case 37: return 84; case 38: return 81; case 39: return 75; case 40: return 77; case 41: return 72; case 42: return e.yytext = e.yytext.replace(/\\([\\\]])/g, "$$1"), 72; case 43: return "INVALID"; case 44: return 5 } }, rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$$)/], conditions: { mu: { rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], inclusive: !1 }, emu: { rules: [2], inclusive: !1 }, com: { rules: [6], inclusive: !1 }, raw: { rules: [3, 4, 5], inclusive: !1 }, INITIAL: { rules: [0, 1, 44], inclusive: !0 } } }; function r() { this.yy = {} } return t.lexer = e, r.prototype = t, t.Parser = r, new r }(); e.default = r, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0; var i = s(r(39)); function n() { var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]; this.options = t } function a(t, e, r) { void 0 === e && (e = t.length); var s = t[e - 1], i = t[e - 2]; return s ? "ContentStatement" === s.type ? (i || !r ? /\r?\n\s*?$$/ : /(^|\r?\n)\s*?$$/).test(s.original) : void 0 : r } function o(t, e, r) { void 0 === e && (e = -1); var s = t[e + 1], i = t[e + 2]; return s ? "ContentStatement" === s.type ? (i || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$$)/).test(s.original) : void 0 : r } function c(t, e, r) { var s = t[null == e ? 0 : e + 1]; if (s && "ContentStatement" === s.type && (r || !s.rightStripped)) { var i = s.value; s.value = s.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, ""), s.rightStripped = s.value !== i } } function l(t, e, r) { var s = t[null == e ? t.length - 1 : e - 1]; if (s && "ContentStatement" === s.type && (r || !s.leftStripped)) { var i = s.value; return s.value = s.value.replace(r ? /\s+$$/ : /[ \t]+$$/, ""), s.leftStripped = s.value !== i, s.leftStripped } } n.prototype = new i.default, n.prototype.Program = function (t) { var e = !this.options.ignoreStandalone, r = !this.isRootSeen; this.isRootSeen = !0; for (var s = t.body, i = 0, n = s.length; i < n; i++) { var h = s[i], p = this.accept(h); if (p) { var u = a(s, i, r), f = o(s, i, r), d = p.openStandalone && u, m = p.closeStandalone && f, g = p.inlineStandalone && u && f; p.close && c(s, i, !0), p.open && l(s, i, !0), e && g && (c(s, i), l(s, i) && "PartialStatement" === h.type && (h.indent = /([ \t]+$$)/.exec(s[i - 1].original)[1])), e && d && (c((h.program || h.inverse).body), l(s, i)), e && m && (c(s, i), l((h.inverse || h.program).body)) } } return t }, n.prototype.BlockStatement = n.prototype.DecoratorBlock = n.prototype.PartialBlockStatement = function (t) { this.accept(t.program), this.accept(t.inverse); var e = t.program || t.inverse, r = t.program && t.inverse, s = r, i = r; if (r && r.chained) for (s = r.body[0].program; i.chained;)i = i.body[i.body.length - 1].program; var n = { open: t.openStrip.open, close: t.closeStrip.close, openStandalone: o(e.body), closeStandalone: a((s || e).body) }; if (t.openStrip.close && c(e.body, null, !0), r) { var h = t.inverseStrip; h.open && l(e.body, null, !0), h.close && c(s.body, null, !0), t.closeStrip.open && l(i.body, null, !0), !this.options.ignoreStandalone && a(e.body) && o(s.body) && (l(e.body), c(s.body)) } else t.closeStrip.open && l(e.body, null, !0); return n }, n.prototype.Decorator = n.prototype.MustacheStatement = function (t) { return t.strip }, n.prototype.PartialStatement = n.prototype.CommentStatement = function (t) { var e = t.strip || {}; return { inlineStandalone: !0, open: e.open, close: e.close } }, e.default = n, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0; var i = s(r(6)); function n() { this.parents = [] } function a(t) { this.acceptRequired(t, "path"), this.acceptArray(t.params), this.acceptKey(t, "hash") } function o(t) { a.call(this, t), this.acceptKey(t, "program"), this.acceptKey(t, "inverse") } function c(t) { this.acceptRequired(t, "name"), this.acceptArray(t.params), this.acceptKey(t, "hash") } n.prototype = { constructor: n, mutating: !1, acceptKey: function (t, e) { var r = this.accept(t[e]); if (this.mutating) { if (r && !n.prototype[r.type]) throw new i.default('Unexpected node type "' + r.type + '" found when accepting ' + e + " on " + t.type); t[e] = r } }, acceptRequired: function (t, e) { if (this.acceptKey(t, e), !t[e]) throw new i.default(t.type + " requires " + e) }, acceptArray: function (t) { for (var e = 0, r = t.length; e < r; e++)this.acceptKey(t, e), t[e] || (t.splice(e, 1), e--, r--) }, accept: function (t) { if (t) { if (!this[t.type]) throw new i.default("Unknown type: " + t.type, t); this.current && this.parents.unshift(this.current), this.current = t; var e = this[t.type](t); return this.current = this.parents.shift(), !this.mutating || e ? e : !1 !== e ? t : void 0 } }, Program: function (t) { this.acceptArray(t.body) }, MustacheStatement: a, Decorator: a, BlockStatement: o, DecoratorBlock: o, PartialStatement: c, PartialBlockStatement: function (t) { c.call(this, t), this.acceptKey(t, "program") }, ContentStatement: function () { }, CommentStatement: function () { }, SubExpression: a, PathExpression: function () { }, StringLiteral: function () { }, NumberLiteral: function () { }, BooleanLiteral: function () { }, UndefinedLiteral: function () { }, NullLiteral: function () { }, Hash: function (t) { this.acceptArray(t.pairs) }, HashPair: function (t) { this.acceptRequired(t, "value") } }, e.default = n, t.exports = e.default }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0, e.SourceLocation = function (t, e) { this.source = t, this.start = { line: e.first_line, column: e.first_column }, this.end = { line: e.last_line, column: e.last_column } }, e.id = function (t) { return /^\[.*\]$$/.test(t) ? t.substr(1, t.length - 2) : t }, e.stripFlags = function (t, e) { return { open: "~" === t.charAt(2), close: "~" === e.charAt(e.length - 3) } }, e.stripComment = function (t) { return t.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$$/, "") }, e.preparePath = function (t, e, r) { r = this.locInfo(r); for (var s = t ? "@" : "", n = [], a = 0, o = 0, c = e.length; o < c; o++) { var l = e[o].part, h = e[o].original !== l; if (s += (e[o].separator || "") + l, h || ".." !== l && "." !== l && "this" !== l) n.push(l); else { if (n.length > 0) throw new i.default("Invalid path: " + s, { loc: r }); ".." === l && a++ } } return { type: "PathExpression", data: t, depth: a, parts: n, original: s, loc: r } }, e.prepareMustache = function (t, e, r, s, i, n) { var a = s.charAt(3) || s.charAt(2), o = "{" !== a && "&" !== a; return { type: /\*/.test(s) ? "Decorator" : "MustacheStatement", path: t, params: e, hash: r, escaped: o, strip: i, loc: this.locInfo(n) } }, e.prepareRawBlock = function (t, e, r, s) { n(t, r), s = this.locInfo(s); var i = { type: "Program", body: e, strip: {}, loc: s }; return { type: "BlockStatement", path: t.path, params: t.params, hash: t.hash, program: i, openStrip: {}, inverseStrip: {}, closeStrip: {}, loc: s } }, e.prepareBlock = function (t, e, r, s, a, o) { s && s.path && n(t, s); var c = /\*/.test(t.open); e.blockParams = t.blockParams; var l = void 0, h = void 0; if (r) { if (c) throw new i.default("Unexpected inverse block on decorator", r); r.chain && (r.program.body[0].closeStrip = s.strip), h = r.strip, l = r.program } a && (a = l, l = e, e = a); return { type: c ? "DecoratorBlock" : "BlockStatement", path: t.path, params: t.params, hash: t.hash, program: e, inverse: l, openStrip: t.strip, inverseStrip: h, closeStrip: s && s.strip, loc: this.locInfo(o) } }, e.prepareProgram = function (t, e) { if (!e && t.length) { var r = t[0].loc, s = t[t.length - 1].loc; r && s && (e = { source: r.source, start: { line: r.start.line, column: r.start.column }, end: { line: s.end.line, column: s.end.column } }) } return { type: "Program", body: t, strip: {}, loc: e } }, e.preparePartialBlock = function (t, e, r, s) { return n(t, r), { type: "PartialBlockStatement", name: t.path, params: t.params, hash: t.hash, program: e, openStrip: t.strip, closeStrip: r && r.strip, loc: this.locInfo(s) } }; var i = s(r(6)); function n(t, e) { if (e = e.path ? e.path.original : e, t.path.original !== e) { var r = { loc: t.path.loc }; throw new i.default(t.path.original + " doesn't match " + e, r) } } }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0, e.Compiler = c, e.precompile = function (t, e, r) { if (null == t || "string" != typeof t && "Program" !== t.type) throw new i.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + t); "data" in (e = e || {}) || (e.data = !0); e.compat && (e.useDepths = !0); var s = r.parse(t, e), n = (new r.Compiler).compile(s, e); return (new r.JavaScriptCompiler).compile(n, e) }, e.compile = function (t, e, r) { void 0 === e && (e = {}); if (null == t || "string" != typeof t && "Program" !== t.type) throw new i.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + t); "data" in (e = n.extend({}, e)) || (e.data = !0); e.compat && (e.useDepths = !0); var s = void 0; function a() { var s = r.parse(t, e), i = (new r.Compiler).compile(s, e), n = (new r.JavaScriptCompiler).compile(i, e, void 0, !0); return r.template(n) } function o(t, e) { return s || (s = a()), s.call(this, t, e) } return o._setup = function (t) { return s || (s = a()), s._setup(t) }, o._child = function (t, e, r, i) { return s || (s = a()), s._child(t, e, r, i) }, o }; var i = s(r(6)), n = r(5), a = s(r(35)), o = [].slice; function c() { } function l(t, e) { if (t === e) return !0; if (n.isArray(t) && n.isArray(e) && t.length === e.length) { for (var r = 0; r < t.length; r++)if (!l(t[r], e[r])) return !1; return !0 } } function h(t) { if (!t.path.parts) { var e = t.path; t.path = { type: "PathExpression", data: !1, depth: 0, parts: [e.original + ""], original: e.original + "", loc: e.loc } } } c.prototype = { compiler: c, equals: function (t) { var e = this.opcodes.length; if (t.opcodes.length !== e) return !1; for (var r = 0; r < e; r++) { var s = this.opcodes[r], i = t.opcodes[r]; if (s.opcode !== i.opcode || !l(s.args, i.args)) return !1 } e = this.children.length; for (r = 0; r < e; r++)if (!this.children[r].equals(t.children[r])) return !1; return !0 }, guid: 0, compile: function (t, e) { this.sourceNode = [], this.opcodes = [], this.children = [], this.options = e, this.stringParams = e.stringParams, this.trackIds = e.trackIds, e.blockParams = e.blockParams || []; var r = e.knownHelpers; if (e.knownHelpers = { helperMissing: !0, blockHelperMissing: !0, each: !0, if: !0, unless: !0, with: !0, log: !0, lookup: !0 }, r) for (var s in r) this.options.knownHelpers[s] = r[s]; return this.accept(t) }, compileProgram: function (t) { var e = (new this.compiler).compile(t, this.options), r = this.guid++; return this.usePartial = this.usePartial || e.usePartial, this.children[r] = e, this.useDepths = this.useDepths || e.useDepths, r }, accept: function (t) { if (!this[t.type]) throw new i.default("Unknown type: " + t.type, t); this.sourceNode.unshift(t); var e = this[t.type](t); return this.sourceNode.shift(), e }, Program: function (t) { this.options.blockParams.unshift(t.blockParams); for (var e = t.body, r = e.length, s = 0; s < r; s++)this.accept(e[s]); return this.options.blockParams.shift(), this.isSimple = 1 === r, this.blockParams = t.blockParams ? t.blockParams.length : 0, this }, BlockStatement: function (t) { h(t); var e = t.program, r = t.inverse; e = e && this.compileProgram(e), r = r && this.compileProgram(r); var s = this.classifySexpr(t); "helper" === s ? this.helperSexpr(t, e, r) : "simple" === s ? (this.simpleSexpr(t), this.opcode("pushProgram", e), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("blockValue", t.path.original)) : (this.ambiguousSexpr(t, e, r), this.opcode("pushProgram", e), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append") }, DecoratorBlock: function (t) { var e = t.program && this.compileProgram(t.program), r = this.setupFullMustacheParams(t, e, void 0), s = t.path; this.useDecorators = !0, this.opcode("registerDecorator", r.length, s.original) }, PartialStatement: function (t) { this.usePartial = !0; var e = t.program; e && (e = this.compileProgram(t.program)); var r = t.params; if (r.length > 1) throw new i.default("Unsupported number of partial arguments: " + r.length, t); r.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : r.push({ type: "PathExpression", parts: [], depth: 0 })); var s = t.name.original, n = "SubExpression" === t.name.type; n && this.accept(t.name), this.setupFullMustacheParams(t, e, void 0, !0); var a = t.indent || ""; this.options.preventIndent && a && (this.opcode("appendContent", a), a = ""), this.opcode("invokePartial", n, s, a), this.opcode("append") }, PartialBlockStatement: function (t) { this.PartialStatement(t) }, MustacheStatement: function (t) { this.SubExpression(t), t.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append") }, Decorator: function (t) { this.DecoratorBlock(t) }, ContentStatement: function (t) { t.value && this.opcode("appendContent", t.value) }, CommentStatement: function () { }, SubExpression: function (t) { h(t); var e = this.classifySexpr(t); "simple" === e ? this.simpleSexpr(t) : "helper" === e ? this.helperSexpr(t) : this.ambiguousSexpr(t) }, ambiguousSexpr: function (t, e, r) { var s = t.path, i = s.parts[0], n = null != e || null != r; this.opcode("getContext", s.depth), this.opcode("pushProgram", e), this.opcode("pushProgram", r), s.strict = !0, this.accept(s), this.opcode("invokeAmbiguous", i, n) }, simpleSexpr: function (t) { var e = t.path; e.strict = !0, this.accept(e), this.opcode("resolvePossibleLambda") }, helperSexpr: function (t, e, r) { var s = this.setupFullMustacheParams(t, e, r), n = t.path, o = n.parts[0]; if (this.options.knownHelpers[o]) this.opcode("invokeKnownHelper", s.length, o); else { if (this.options.knownHelpersOnly) throw new i.default("You specified knownHelpersOnly, but used the unknown helper " + o, t); n.strict = !0, n.falsy = !0, this.accept(n), this.opcode("invokeHelper", s.length, n.original, a.default.helpers.simpleId(n)) } }, PathExpression: function (t) { this.addDepth(t.depth), this.opcode("getContext", t.depth); var e = t.parts[0], r = a.default.helpers.scopedId(t), s = !t.depth && !r && this.blockParamIndex(e); s ? this.opcode("lookupBlockParam", s, t.parts) : e ? t.data ? (this.options.data = !0, this.opcode("lookupData", t.depth, t.parts, t.strict)) : this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, r) : this.opcode("pushContext") }, StringLiteral: function (t) { this.opcode("pushString", t.value) }, NumberLiteral: function (t) { this.opcode("pushLiteral", t.value) }, BooleanLiteral: function (t) { this.opcode("pushLiteral", t.value) }, UndefinedLiteral: function () { this.opcode("pushLiteral", "undefined") }, NullLiteral: function () { this.opcode("pushLiteral", "null") }, Hash: function (t) { var e = t.pairs, r = 0, s = e.length; for (this.opcode("pushHash"); r < s; r++)this.pushParam(e[r].value); for (; r--;)this.opcode("assignToHash", e[r].key); this.opcode("popHash") }, opcode: function (t) { this.opcodes.push({ opcode: t, args: o.call(arguments, 1), loc: this.sourceNode[0].loc }) }, addDepth: function (t) { t && (this.useDepths = !0) }, classifySexpr: function (t) { var e = a.default.helpers.simpleId(t.path), r = e && !!this.blockParamIndex(t.path.parts[0]), s = !r && a.default.helpers.helperExpression(t), i = !r && (s || e); if (i && !s) { var n = t.path.parts[0], o = this.options; o.knownHelpers[n] ? s = !0 : o.knownHelpersOnly && (i = !1) } return s ? "helper" : i ? "ambiguous" : "simple" }, pushParams: function (t) { for (var e = 0, r = t.length; e < r; e++)this.pushParam(t[e]) }, pushParam: function (t) { var e = null != t.value ? t.value : t.original || ""; if (this.stringParams) e.replace && (e = e.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), t.depth && this.addDepth(t.depth), this.opcode("getContext", t.depth || 0), this.opcode("pushStringParam", e, t.type), "SubExpression" === t.type && this.accept(t); else { if (this.trackIds) { var r = void 0; if (!t.parts || a.default.helpers.scopedId(t) || t.depth || (r = this.blockParamIndex(t.parts[0])), r) { var s = t.parts.slice(1).join("."); this.opcode("pushId", "BlockParam", r, s) } else (e = t.original || e).replace && (e = e.replace(/^this(?:\.|$$)/, "").replace(/^\.\//, "").replace(/^\.$$/, "")), this.opcode("pushId", t.type, e) } this.accept(t) } }, setupFullMustacheParams: function (t, e, r, s) { var i = t.params; return this.pushParams(i), this.opcode("pushProgram", e), this.opcode("pushProgram", r), t.hash ? this.accept(t.hash) : this.opcode("emptyHash", s), i }, blockParamIndex: function (t) { for (var e = 0, r = this.options.blockParams.length; e < r; e++) { var s = this.options.blockParams[e], i = s && n.indexOf(s, t); if (s && i >= 0) return [e, i] } } } }, function (t, e, r) { "use strict"; var s = r(1).default; e.__esModule = !0; var i = r(4), n = s(r(6)), a = r(5), o = s(r(43)); function c(t) { this.value = t } function l() { } l.prototype = { nameLookup: function (t, e) { return l.isValidJavaScriptVariableName(e) ? [t, ".", e] : [t, "[", JSON.stringify(e), "]"] }, depthedLookup: function (t) { return [this.aliasable("container.lookup"), '(depths, "', t, '")'] }, compilerInfo: function () { var t = i.COMPILER_REVISION; return [t, i.REVISION_CHANGES[t]] }, appendToBuffer: function (t, e, r) { return a.isArray(t) || (t = [t]), t = this.source.wrap(t, e), this.environment.isSimple ? ["return ", t, ";"] : r ? ["buffer += ", t, ";"] : (t.appendToBuffer = !0, t) }, initializeBuffer: function () { return this.quotedString("") }, compile: function (t, e, r, s) { this.environment = t, this.options = e, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !s, this.name = this.environment.name, this.isChild = !!r, this.context = r || { decorators: [], programs: [], environments: [] }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = { list: [] }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(t, e), this.useDepths = this.useDepths || t.useDepths || t.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || t.useBlockParams; var i = t.opcodes, a = void 0, o = void 0, c = void 0, l = void 0; for (c = 0, l = i.length; c < l; c++)a = i[c], this.source.currentLocation = a.loc, o = o || a.loc, this[a.opcode].apply(this, a.args); if (this.source.currentLocation = o, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new n.default("Compile completed with content left on stack"); this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend("var decorators = container.decorators;\n"), this.decorators.push("return fn;"), s ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), this.decorators.push("}\n"), this.decorators = this.decorators.merge())); var h = this.createFunctionContext(s); if (this.isChild) return h; var p = { compiler: this.compilerInfo(), main: h }; this.decorators && (p.main_d = this.decorators, p.useDecorators = !0); var u = this.context, f = u.programs, d = u.decorators; for (c = 0, l = f.length; c < l; c++)f[c] && (p[c] = f[c], d[c] && (p[c + "_d"] = d[c], p.useDecorators = !0)); return this.environment.usePartial && (p.usePartial = !0), this.options.data && (p.useData = !0), this.useDepths && (p.useDepths = !0), this.useBlockParams && (p.useBlockParams = !0), this.options.compat && (p.compat = !0), s ? p.compilerOptions = this.options : (p.compiler = JSON.stringify(p.compiler), this.source.currentLocation = { start: { line: 1, column: 0 } }, p = this.objectLiteral(p), e.srcName ? (p = p.toStringWithSourceMap({ file: e.destName })).map = p.map && p.map.toString() : p = p.toString()), p }, preamble: function () { this.lastContext = 0, this.source = new o.default(this.options.srcName), this.decorators = new o.default(this.options.srcName) }, createFunctionContext: function (t) { var e = "", r = this.stackVars.concat(this.registers.list); r.length > 0 && (e += ", " + r.join(", ")); var s = 0; for (var i in this.aliases) { var n = this.aliases[i]; this.aliases.hasOwnProperty(i) && n.children && n.referenceCount > 1 && (e += ", alias" + ++s + "=" + i, n.children[0] = "alias" + s) } var a = ["container", "depth0", "helpers", "partials", "data"]; (this.useBlockParams || this.useDepths) && a.push("blockParams"), this.useDepths && a.push("depths"); var o = this.mergeSource(e); return t ? (a.push(o), Function.apply(this, a)) : this.source.wrap(["function(", a.join(","), ") {\n  ", o, "}"]) }, mergeSource: function (t) { var e = this.environment.isSimple, r = !this.forceBuffer, s = void 0, i = void 0, n = void 0, a = void 0; return this.source.each(function (t) { t.appendToBuffer ? (n ? t.prepend("  + ") : n = t, a = t) : (n && (i ? n.prepend("buffer += ") : s = !0, a.add(";"), n = a = void 0), i = !0, e || (r = !1)) }), r ? n ? (n.prepend("return "), a.add(";")) : i || this.source.push('return "";') : (t += ", buffer = " + (s ? "" : this.initializeBuffer()), n ? (n.prepend("return buffer + "), a.add(";")) : this.source.push("return buffer;")), t && this.source.prepend("var " + t.substring(2) + (s ? "" : ";\n")), this.source.merge() }, blockValue: function (t) { var e = this.aliasable("helpers.blockHelperMissing"), r = [this.contextName(0)]; this.setupHelperArgs(t, 0, r); var s = this.popStack(); r.splice(1, 0, s), this.push(this.source.functionCall(e, "call", r)) }, ambiguousBlockValue: function () { var t = this.aliasable("helpers.blockHelperMissing"), e = [this.contextName(0)]; this.setupHelperArgs("", 0, e, !0), this.flushInline(); var r = this.topStack(); e.splice(1, 0, r), this.pushSource(["if (!", this.lastHelper, ") { ", r, " = ", this.source.functionCall(t, "call", e), "}"]) }, appendContent: function (t) { this.pendingContent ? t = this.pendingContent + t : this.pendingLocation = this.source.currentLocation, this.pendingContent = t }, append: function () { if (this.isInline()) this.replaceStack(function (t) { return [" != null ? ", t, ' : ""'] }), this.pushSource(this.appendToBuffer(this.popStack())); else { var t = this.popStack(); this.pushSource(["if (", t, " != null) { ", this.appendToBuffer(t, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"]) } }, appendEscaped: function () { this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"])) }, getContext: function (t) { this.lastContext = t }, pushContext: function () { this.pushStackLiteral(this.contextName(this.lastContext)) }, lookupOnContext: function (t, e, r, s) { var i = 0; s || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(t[i++])), this.resolvePath("context", t, i, e, r) }, lookupBlockParam: function (t, e) { this.useBlockParams = !0, this.push(["blockParams[", t[0], "][", t[1], "]"]), this.resolvePath("context", e, 1) }, lookupData: function (t, e, r) { t ? this.pushStackLiteral("container.data(data, " + t + ")") : this.pushStackLiteral("data"), this.resolvePath("data", e, 0, !0, r) }, resolvePath: function (t, e, r, s, i) { var n = this; if (this.options.strict || this.options.assumeObjects) this.push(function (t, e, r, s) { var i = e.popStack(), n = 0, a = r.length; t && a--; for (; n < a; n++)i = e.nameLookup(i, r[n], s); return t ? [e.aliasable("container.strict"), "(", i, ", ", e.quotedString(r[n]), ")"] : i }(this.options.strict && i, this, e, t)); else for (var a = e.length; r < a; r++)this.replaceStack(function (i) { var a = n.nameLookup(i, e[r], t); return s ? [" && ", a] : [" != null ? ", a, " : ", i] }) }, resolvePossibleLambda: function () { this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]) }, pushStringParam: function (t, e) { this.pushContext(), this.pushString(e), "SubExpression" !== e && ("string" == typeof t ? this.pushString(t) : this.pushStackLiteral(t)) }, emptyHash: function (t) { this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(t ? "undefined" : "{}") }, pushHash: function () { this.hash && this.hashes.push(this.hash), this.hash = { values: [], types: [], contexts: [], ids: [] } }, popHash: function () { var t = this.hash; this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(t.ids)), this.stringParams && (this.push(this.objectLiteral(t.contexts)), this.push(this.objectLiteral(t.types))), this.push(this.objectLiteral(t.values)) }, pushString: function (t) { this.pushStackLiteral(this.quotedString(t)) }, pushLiteral: function (t) { this.pushStackLiteral(t) }, pushProgram: function (t) { null != t ? this.pushStackLiteral(this.programExpression(t)) : this.pushStackLiteral(null) }, registerDecorator: function (t, e) { var r = this.nameLookup("decorators", e, "decorator"), s = this.setupHelperArgs(e, t); this.decorators.push(["fn = ", this.decorators.functionCall(r, "", ["fn", "props", "container", s]), " || fn;"]) }, invokeHelper: function (t, e, r) { var s = this.popStack(), i = this.setupHelper(t, e), n = r ? [i.name, " || "] : "", a = ["("].concat(n, s); this.options.strict || a.push(" || ", this.aliasable("helpers.helperMissing")), a.push(")"), this.push(this.source.functionCall(a, "call", i.callParams)) }, invokeKnownHelper: function (t, e) { var r = this.setupHelper(t, e); this.push(this.source.functionCall(r.name, "call", r.callParams)) }, invokeAmbiguous: function (t, e) { this.useRegister("helper"); var r = this.popStack(); this.emptyHash(); var s = this.setupHelper(0, t, e), i = ["(", "(helper = ", this.lastHelper = this.nameLookup("helpers", t, "helper"), " || ", r, ")"]; this.options.strict || (i[0] = "(helper = ", i.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))), this.push(["(", i, s.paramsInit ? ["),(", s.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", s.callParams), " : helper))"]) }, invokePartial: function (t, e, r) { var s = [], i = this.setupParams(e, 1, s); t && (e = this.popStack(), delete i.name), r && (i.indent = JSON.stringify(r)), i.helpers = "helpers", i.partials = "partials", i.decorators = "container.decorators", t ? s.unshift(e) : s.unshift(this.nameLookup("partials", e, "partial")), this.options.compat && (i.depths = "depths"), i = this.objectLiteral(i), s.push(i), this.push(this.source.functionCall("container.invokePartial", "", s)) }, assignToHash: function (t) { var e = this.popStack(), r = void 0, s = void 0, i = void 0; this.trackIds && (i = this.popStack()), this.stringParams && (s = this.popStack(), r = this.popStack()); var n = this.hash; r && (n.contexts[t] = r), s && (n.types[t] = s), i && (n.ids[t] = i), n.values[t] = e }, pushId: function (t, e, r) { "BlockParam" === t ? this.pushStackLiteral("blockParams[" + e[0] + "].path[" + e[1] + "]" + (r ? " + " + JSON.stringify("." + r) : "")) : "PathExpression" === t ? this.pushString(e) : "SubExpression" === t ? this.pushStackLiteral("true") : this.pushStackLiteral("null") }, compiler: l, compileChildren: function (t, e) { for (var r = t.children, s = void 0, i = void 0, n = 0, a = r.length; n < a; n++) { s = r[n], i = new this.compiler; var o = this.matchExistingProgram(s); if (null == o) { this.context.programs.push(""); var c = this.context.programs.length; s.index = c, s.name = "program" + c, this.context.programs[c] = i.compile(s, e, this.context, !this.precompile), this.context.decorators[c] = i.decorators, this.context.environments[c] = s, this.useDepths = this.useDepths || i.useDepths, this.useBlockParams = this.useBlockParams || i.useBlockParams, s.useDepths = this.useDepths, s.useBlockParams = this.useBlockParams } else s.index = o.index, s.name = "program" + o.index, this.useDepths = this.useDepths || o.useDepths, this.useBlockParams = this.useBlockParams || o.useBlockParams } }, matchExistingProgram: function (t) { for (var e = 0, r = this.context.environments.length; e < r; e++) { var s = this.context.environments[e]; if (s && s.equals(t)) return s } }, programExpression: function (t) { var e = this.environment.children[t], r = [e.index, "data", e.blockParams]; return (this.useBlockParams || this.useDepths) && r.push("blockParams"), this.useDepths && r.push("depths"), "container.program(" + r.join(", ") + ")" }, useRegister: function (t) { this.registers[t] || (this.registers[t] = !0, this.registers.list.push(t)) }, push: function (t) { return t instanceof c || (t = this.source.wrap(t)), this.inlineStack.push(t), t }, pushStackLiteral: function (t) { this.push(new c(t)) }, pushSource: function (t) { this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), t && this.source.push(t) }, replaceStack: function (t) { var e = ["("], r = void 0, s = void 0, i = void 0; if (!this.isInline()) throw new n.default("replaceStack on non-inline"); var a = this.popStack(!0); if (a instanceof c) e = ["(", r = [a.value]], i = !0; else { s = !0; var o = this.incrStack(); e = ["((", this.push(o), " = ", a, ")"], r = this.topStack() } var l = t.call(this, r); i || this.popStack(), s && this.stackSlot--, this.push(e.concat(l, ")")) }, incrStack: function () { return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName() }, topStackName: function () { return "stack" + this.stackSlot }, flushInline: function () { var t = this.inlineStack; this.inlineStack = []; for (var e = 0, r = t.length; e < r; e++) { var s = t[e]; if (s instanceof c) this.compileStack.push(s); else { var i = this.incrStack(); this.pushSource([i, " = ", s, ";"]), this.compileStack.push(i) } } }, isInline: function () { return this.inlineStack.length }, popStack: function (t) { var e = this.isInline(), r = (e ? this.inlineStack : this.compileStack).pop(); if (!t && r instanceof c) return r.value; if (!e) { if (!this.stackSlot) throw new n.default("Invalid stack pop"); this.stackSlot-- } return r }, topStack: function () { var t = this.isInline() ? this.inlineStack : this.compileStack, e = t[t.length - 1]; return e instanceof c ? e.value : e }, contextName: function (t) { return this.useDepths && t ? "depths[" + t + "]" : "depth" + t }, quotedString: function (t) { return this.source.quotedString(t) }, objectLiteral: function (t) { return this.source.objectLiteral(t) }, aliasable: function (t) { var e = this.aliases[t]; return e ? (e.referenceCount++, e) : ((e = this.aliases[t] = this.source.wrap(t)).aliasable = !0, e.referenceCount = 1, e) }, setupHelper: function (t, e, r) { var s = []; return { params: s, paramsInit: this.setupHelperArgs(e, t, s, r), name: this.nameLookup("helpers", e, "helper"), callParams: [this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})")].concat(s) } }, setupParams: function (t, e, r) { var s = {}, i = [], n = [], a = [], o = !r, c = void 0; o && (r = []), s.name = this.quotedString(t), s.hash = this.popStack(), this.trackIds && (s.hashIds = this.popStack()), this.stringParams && (s.hashTypes = this.popStack(), s.hashContexts = this.popStack()); var l = this.popStack(), h = this.popStack(); (h || l) && (s.fn = h || "container.noop", s.inverse = l || "container.noop"); for (var p = e; p--;)c = this.popStack(), r[p] = c, this.trackIds && (a[p] = this.popStack()), this.stringParams && (n[p] = this.popStack(), i[p] = this.popStack()); return o && (s.args = this.source.generateArray(r)), this.trackIds && (s.ids = this.source.generateArray(a)), this.stringParams && (s.types = this.source.generateArray(n), s.contexts = this.source.generateArray(i)), this.options.data && (s.data = "data"), this.useBlockParams && (s.blockParams = "blockParams"), s }, setupHelperArgs: function (t, e, r, s) { var i = this.setupParams(t, e, r); return i = this.objectLiteral(i), s ? (this.useRegister("options"), r.push("options"), ["options=", i]) : r ? (r.push(i), "") : i } }, function () { for (var t = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), e = l.RESERVED_WORDS = {}, r = 0, s = t.length; r < s; r++)e[t[r]] = !0 }(), l.isValidJavaScriptVariableName = function (t) { return !l.RESERVED_WORDS[t] && /^[a-zA-Z_$$][0-9a-zA-Z_$$]*$$/.test(t) }, e.default = l, t.exports = e.default }, function (t, e, r) { "use strict"; e.__esModule = !0; var s = r(5), i = void 0; try { } catch (t) { } function n(t, e, r) { if (s.isArray(t)) { for (var i = [], n = 0, a = t.length; n < a; n++)i.push(e.wrap(t[n], r)); return i } return "boolean" == typeof t || "number" == typeof t ? t + "" : t } function a(t) { this.srcFile = t, this.source = [] } i || ((i = function (t, e, r, s) { this.src = "", s && this.add(s) }).prototype = { add: function (t) { s.isArray(t) && (t = t.join("")), this.src += t }, prepend: function (t) { s.isArray(t) && (t = t.join("")), this.src = t + this.src }, toStringWithSourceMap: function () { return { code: this.toString() } }, toString: function () { return this.src } }), a.prototype = { isEmpty: function () { return !this.source.length }, prepend: function (t, e) { this.source.unshift(this.wrap(t, e)) }, push: function (t, e) { this.source.push(this.wrap(t, e)) }, merge: function () { var t = this.empty(); return this.each(function (e) { t.add(["  ", e, "\n"]) }), t }, each: function (t) { for (var e = 0, r = this.source.length; e < r; e++)t(this.source[e]) }, empty: function () { var t = this.currentLocation || { start: {} }; return new i(t.start.line, t.start.column, this.srcFile) }, wrap: function (t) { var e = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || { start: {} } : arguments[1]; return t instanceof i ? t : (t = n(t, this, e), new i(e.start.line, e.start.column, this.srcFile, t)) }, functionCall: function (t, e, r) { return r = this.generateList(r), this.wrap([t, e ? "." + e + "(" : "(", r, ")"]) }, quotedString: function (t) { return '"' + (t + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"' }, objectLiteral: function (t) { var e = []; for (var r in t) if (t.hasOwnProperty(r)) { var s = n(t[r], this); "undefined" !== s && e.push([this.quotedString(r), ":", s]) } var i = this.generateList(e); return i.prepend("{"), i.add("}"), i }, generateList: function (t) { for (var e = this.empty(), r = 0, s = t.length; r < s; r++)r && e.add(","), e.add(n(t[r], this)); return e }, generateArray: function (t) { var e = this.generateList(t); return e.prepend("["), e.add("]"), e } }, e.default = a, t.exports = e.default }]) });

/**
 * @license
 * Lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
; (function () {
    function n(n, t, r) { switch (r.length) { case 0: return n.call(t); case 1: return n.call(t, r[0]); case 2: return n.call(t, r[0], r[1]); case 3: return n.call(t, r[0], r[1], r[2]) }return n.apply(t, r) } function t(n, t, r, e) { for (var u = -1, i = null == n ? 0 : n.length; ++u < i;) { var o = n[u]; t(e, o, r(o), n) } return e } function r(n, t) { for (var r = -1, e = null == n ? 0 : n.length; ++r < e && false !== t(n[r], r, n);); return n } function e(n, t) { for (var r = null == n ? 0 : n.length; r-- && false !== t(n[r], r, n);); return n } function u(n, t) {
        for (var r = -1, e = null == n ? 0 : n.length; ++r < e;)if (!t(n[r], r, n)) return false;
        return true
    } function i(n, t) { for (var r = -1, e = null == n ? 0 : n.length, u = 0, i = []; ++r < e;) { var o = n[r]; t(o, r, n) && (i[u++] = o) } return i } function o(n, t) { return !(null == n || !n.length) && -1 < v(n, t, 0) } function f(n, t, r) { for (var e = -1, u = null == n ? 0 : n.length; ++e < u;)if (r(t, n[e])) return true; return false } function c(n, t) { for (var r = -1, e = null == n ? 0 : n.length, u = Array(e); ++r < e;)u[r] = t(n[r], r, n); return u } function a(n, t) { for (var r = -1, e = t.length, u = n.length; ++r < e;)n[u + r] = t[r]; return n } function l(n, t, r, e) {
        var u = -1, i = null == n ? 0 : n.length; for (e && i && (r = n[++u]); ++u < i;)r = t(r, n[u], u, n);
        return r
    } function s(n, t, r, e) { var u = null == n ? 0 : n.length; for (e && u && (r = n[--u]); u--;)r = t(r, n[u], u, n); return r } function h(n, t) { for (var r = -1, e = null == n ? 0 : n.length; ++r < e;)if (t(n[r], r, n)) return true; return false } function p(n, t, r) { var e; return r(n, function (n, r, u) { if (t(n, r, u)) return e = r, false }), e } function _(n, t, r, e) { var u = n.length; for (r += e ? 1 : -1; e ? r-- : ++r < u;)if (t(n[r], r, n)) return r; return -1 } function v(n, t, r) { if (t === t) n: { --r; for (var e = n.length; ++r < e;)if (n[r] === t) { n = r; break n } n = -1 } else n = _(n, d, r); return n } function g(n, t, r, e) {
        --r; for (var u = n.length; ++r < u;)if (e(n[r], t)) return r; return -1
    } function d(n) { return n !== n } function y(n, t) { var r = null == n ? 0 : n.length; return r ? m(n, t) / r : F } function b(n) { return function (t) { return null == t ? T : t[n] } } function x(n) { return function (t) { return null == n ? T : n[t] } } function j(n, t, r, e, u) { return u(n, function (n, u, i) { r = e ? (e = false, n) : t(r, n, u, i) }), r } function w(n, t) { var r = n.length; for (n.sort(t); r--;)n[r] = n[r].c; return n } function m(n, t) {
        for (var r, e = -1, u = n.length; ++e < u;) { var i = t(n[e]); i !== T && (r = r === T ? i : r + i) } return r;
    } function A(n, t) { for (var r = -1, e = Array(n); ++r < n;)e[r] = t(r); return e } function k(n, t) { return c(t, function (t) { return [t, n[t]] }) } function E(n) { return function (t) { return n(t) } } function S(n, t) { return c(t, function (t) { return n[t] }) } function O(n, t) { return n.has(t) } function I(n, t) { for (var r = -1, e = n.length; ++r < e && -1 < v(t, n[r], 0);); return r } function R(n, t) { for (var r = n.length; r-- && -1 < v(t, n[r], 0);); return r } function z(n) { return "\\" + Ln[n] } function W(n) {
        var t = -1, r = Array(n.size); return n.forEach(function (n, e) {
            r[++t] = [e, n];
        }), r
    } function U(n, t) { return function (r) { return n(t(r)) } } function B(n, t) { for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) { var o = n[r]; o !== t && "__lodash_placeholder__" !== o || (n[r] = "__lodash_placeholder__", i[u++] = r) } return i } function L(n) { var t = -1, r = Array(n.size); return n.forEach(function (n) { r[++t] = n }), r } function C(n) { var t = -1, r = Array(n.size); return n.forEach(function (n) { r[++t] = [n, n] }), r } function D(n) { if (Rn.test(n)) { for (var t = On.lastIndex = 0; On.test(n);)++t; n = t } else n = Qn(n); return n } function M(n) {
        return Rn.test(n) ? n.match(On) || [] : n.split("");
    } var T, $$ = 1 / 0, F = NaN, N = [["ary", 128], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", 32], ["partialRight", 64], ["rearg", 256]], P = /\b__p\+='';/g, Z = /\b(__p\+=)''\+/g, q = /(__e\(.*?\)|\b__t\))\+'';/g, V = /&(?:amp|lt|gt|quot|#39);/g, K = /[&<>"']/g, G = RegExp(V.source), H = RegExp(K.source), J = /<%-([\s\S]+?)%>/g, Y = /<%([\s\S]+?)%>/g, Q = /<%=([\s\S]+?)%>/g, X = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, nn = /^\w*$$/, tn = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$$))/g, rn = /[\\^$$.*+?()[\]{}|]/g, en = RegExp(rn.source), un = /^\s+|\s+$$/g, on = /^\s+/, fn = /\s+$$/, cn = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, an = /\{\n\/\* \[wrapped with (.+)\] \*/, ln = /,? & /, sn = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, hn = /\\(\\)?/g, pn = /\$$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, _n = /\w*$$/, vn = /^[-+]0x[0-9a-f]+$$/i, gn = /^0b[01]+$$/i, dn = /^\[object .+?Constructor\]$$/, yn = /^0o[0-7]+$$/i, bn = /^(?:0|[1-9]\d*)$$/, xn = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, jn = /($$^)/, wn = /['\n\r\u2028\u2029\\]/g, mn = "[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?)*", An = "(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])" + mn, kn = "(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]?|[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])", En = RegExp("['\u2019]", "g"), Sn = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g"), On = RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|" + kn + mn, "g"), In = RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])|\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])|\\d+", An].join("|"), "g"), Rn = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]"), zn = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Wn = "Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ clearTimeout isFinite parseInt setTimeout".split(" "), Un = {};
    Un["[object Float32Array]"] = Un["[object Float64Array]"] = Un["[object Int8Array]"] = Un["[object Int16Array]"] = Un["[object Int32Array]"] = Un["[object Uint8Array]"] = Un["[object Uint8ClampedArray]"] = Un["[object Uint16Array]"] = Un["[object Uint32Array]"] = true, Un["[object Arguments]"] = Un["[object Array]"] = Un["[object ArrayBuffer]"] = Un["[object Boolean]"] = Un["[object DataView]"] = Un["[object Date]"] = Un["[object Error]"] = Un["[object Function]"] = Un["[object Map]"] = Un["[object Number]"] = Un["[object Object]"] = Un["[object RegExp]"] = Un["[object Set]"] = Un["[object String]"] = Un["[object WeakMap]"] = false;
    var Bn = {}; Bn["[object Arguments]"] = Bn["[object Array]"] = Bn["[object ArrayBuffer]"] = Bn["[object DataView]"] = Bn["[object Boolean]"] = Bn["[object Date]"] = Bn["[object Float32Array]"] = Bn["[object Float64Array]"] = Bn["[object Int8Array]"] = Bn["[object Int16Array]"] = Bn["[object Int32Array]"] = Bn["[object Map]"] = Bn["[object Number]"] = Bn["[object Object]"] = Bn["[object RegExp]"] = Bn["[object Set]"] = Bn["[object String]"] = Bn["[object Symbol]"] = Bn["[object Uint8Array]"] = Bn["[object Uint8ClampedArray]"] = Bn["[object Uint16Array]"] = Bn["[object Uint32Array]"] = true,
        Bn["[object Error]"] = Bn["[object Function]"] = Bn["[object WeakMap]"] = false; var Ln = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Cn = parseFloat, Dn = parseInt, Mn = typeof global == "object" && global && global.Object === Object && global, Tn = typeof self == "object" && self && self.Object === Object && self, $$n = Mn || Tn || Function("return this")(), Fn = typeof exports == "object" && exports && !exports.nodeType && exports, Nn = Fn && typeof module == "object" && module && !module.nodeType && module, Pn = Nn && Nn.exports === Fn, Zn = Pn && Mn.process, qn = function () {
            try { var n = Nn && Nn.require && Nn.require("util").types; return n ? n : Zn && Zn.binding && Zn.binding("util") } catch (n) { }
        }(), Vn = qn && qn.isArrayBuffer, Kn = qn && qn.isDate, Gn = qn && qn.isMap, Hn = qn && qn.isRegExp, Jn = qn && qn.isSet, Yn = qn && qn.isTypedArray, Qn = b("length"), Xn = x({
            "\xc0": "A", "\xc1": "A", "\xc2": "A", "\xc3": "A", "\xc4": "A", "\xc5": "A", "\xe0": "a", "\xe1": "a", "\xe2": "a", "\xe3": "a", "\xe4": "a", "\xe5": "a", "\xc7": "C", "\xe7": "c", "\xd0": "D", "\xf0": "d", "\xc8": "E", "\xc9": "E", "\xca": "E", "\xcb": "E", "\xe8": "e", "\xe9": "e", "\xea": "e", "\xeb": "e",
            "\xcc": "I", "\xcd": "I", "\xce": "I", "\xcf": "I", "\xec": "i", "\xed": "i", "\xee": "i", "\xef": "i", "\xd1": "N", "\xf1": "n", "\xd2": "O", "\xd3": "O", "\xd4": "O", "\xd5": "O", "\xd6": "O", "\xd8": "O", "\xf2": "o", "\xf3": "o", "\xf4": "o", "\xf5": "o", "\xf6": "o", "\xf8": "o", "\xd9": "U", "\xda": "U", "\xdb": "U", "\xdc": "U", "\xf9": "u", "\xfa": "u", "\xfb": "u", "\xfc": "u", "\xdd": "Y", "\xfd": "y", "\xff": "y", "\xc6": "Ae", "\xe6": "ae", "\xde": "Th", "\xfe": "th", "\xdf": "ss", "\u0100": "A", "\u0102": "A", "\u0104": "A", "\u0101": "a", "\u0103": "a", "\u0105": "a",
            "\u0106": "C", "\u0108": "C", "\u010a": "C", "\u010c": "C", "\u0107": "c", "\u0109": "c", "\u010b": "c", "\u010d": "c", "\u010e": "D", "\u0110": "D", "\u010f": "d", "\u0111": "d", "\u0112": "E", "\u0114": "E", "\u0116": "E", "\u0118": "E", "\u011a": "E", "\u0113": "e", "\u0115": "e", "\u0117": "e", "\u0119": "e", "\u011b": "e", "\u011c": "G", "\u011e": "G", "\u0120": "G", "\u0122": "G", "\u011d": "g", "\u011f": "g", "\u0121": "g", "\u0123": "g", "\u0124": "H", "\u0126": "H", "\u0125": "h", "\u0127": "h", "\u0128": "I", "\u012a": "I", "\u012c": "I", "\u012e": "I", "\u0130": "I",
            "\u0129": "i", "\u012b": "i", "\u012d": "i", "\u012f": "i", "\u0131": "i", "\u0134": "J", "\u0135": "j", "\u0136": "K", "\u0137": "k", "\u0138": "k", "\u0139": "L", "\u013b": "L", "\u013d": "L", "\u013f": "L", "\u0141": "L", "\u013a": "l", "\u013c": "l", "\u013e": "l", "\u0140": "l", "\u0142": "l", "\u0143": "N", "\u0145": "N", "\u0147": "N", "\u014a": "N", "\u0144": "n", "\u0146": "n", "\u0148": "n", "\u014b": "n", "\u014c": "O", "\u014e": "O", "\u0150": "O", "\u014d": "o", "\u014f": "o", "\u0151": "o", "\u0154": "R", "\u0156": "R", "\u0158": "R", "\u0155": "r", "\u0157": "r",
            "\u0159": "r", "\u015a": "S", "\u015c": "S", "\u015e": "S", "\u0160": "S", "\u015b": "s", "\u015d": "s", "\u015f": "s", "\u0161": "s", "\u0162": "T", "\u0164": "T", "\u0166": "T", "\u0163": "t", "\u0165": "t", "\u0167": "t", "\u0168": "U", "\u016a": "U", "\u016c": "U", "\u016e": "U", "\u0170": "U", "\u0172": "U", "\u0169": "u", "\u016b": "u", "\u016d": "u", "\u016f": "u", "\u0171": "u", "\u0173": "u", "\u0174": "W", "\u0175": "w", "\u0176": "Y", "\u0177": "y", "\u0178": "Y", "\u0179": "Z", "\u017b": "Z", "\u017d": "Z", "\u017a": "z", "\u017c": "z", "\u017e": "z", "\u0132": "IJ",
            "\u0133": "ij", "\u0152": "Oe", "\u0153": "oe", "\u0149": "'n", "\u017f": "s"
        }), nt = x({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }), tt = x({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }), rt = function x(mn) {
            function An(n) { if (yu(n) && !ff(n) && !(n instanceof Ln)) { if (n instanceof On) return n; if (oi.call(n, "__wrapped__")) return Fe(n) } return new On(n) } function kn() { } function On(n, t) { this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = T } function Ln(n) {
                this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = 4294967295, this.__views__ = []
            } function Mn(n) { var t = -1, r = null == n ? 0 : n.length; for (this.clear(); ++t < r;) { var e = n[t]; this.set(e[0], e[1]) } } function Tn(n) { var t = -1, r = null == n ? 0 : n.length; for (this.clear(); ++t < r;) { var e = n[t]; this.set(e[0], e[1]) } } function Fn(n) { var t = -1, r = null == n ? 0 : n.length; for (this.clear(); ++t < r;) { var e = n[t]; this.set(e[0], e[1]) } } function Nn(n) {
                var t = -1, r = null == n ? 0 : n.length; for (this.__data__ = new Fn; ++t < r;)this.add(n[t]);
            } function Zn(n) { this.size = (this.__data__ = new Tn(n)).size } function qn(n, t) { var r, e = ff(n), u = !e && of(n), i = !e && !u && af(n), o = !e && !u && !i && _f(n), u = (e = e || u || i || o) ? A(n.length, ni) : [], f = u.length; for (r in n) !t && !oi.call(n, r) || e && ("length" == r || i && ("offset" == r || "parent" == r) || o && ("buffer" == r || "byteLength" == r || "byteOffset" == r) || Se(r, f)) || u.push(r); return u } function Qn(n) { var t = n.length; return t ? n[ir(0, t - 1)] : T } function et(n, t) { return De(Lr(n), pt(t, 0, n.length)) } function ut(n) { return De(Lr(n)) } function it(n, t, r) {
                (r === T || lu(n[t], r)) && (r !== T || t in n) || st(n, t, r);
            } function ot(n, t, r) { var e = n[t]; oi.call(n, t) && lu(e, r) && (r !== T || t in n) || st(n, t, r) } function ft(n, t) { for (var r = n.length; r--;)if (lu(n[r][0], t)) return r; return -1 } function ct(n, t, r, e) { return uo(n, function (n, u, i) { t(e, n, r(n), i) }), e } function at(n, t) { return n && Cr(t, Wu(t), n) } function lt(n, t) { return n && Cr(t, Uu(t), n) } function st(n, t, r) { "__proto__" == t && Ai ? Ai(n, t, { configurable: true, enumerable: true, value: r, writable: true }) : n[t] = r } function ht(n, t) {
                for (var r = -1, e = t.length, u = Ku(e), i = null == n; ++r < e;)u[r] = i ? T : Ru(n, t[r]); return u;
            } function pt(n, t, r) { return n === n && (r !== T && (n = n <= r ? n : r), t !== T && (n = n >= t ? n : t)), n } function _t(n, t, e, u, i, o) {
                var f, c = 1 & t, a = 2 & t, l = 4 & t; if (e && (f = i ? e(n, u, i, o) : e(n)), f !== T) return f; if (!du(n)) return n; if (u = ff(n)) { if (f = me(n), !c) return Lr(n, f) } else { var s = vo(n), h = "[object Function]" == s || "[object GeneratorFunction]" == s; if (af(n)) return Ir(n, c); if ("[object Object]" == s || "[object Arguments]" == s || h && !i) { if (f = a || h ? {} : Ae(n), !c) return a ? Mr(n, lt(f, n)) : Dr(n, at(f, n)) } else { if (!Bn[s]) return i ? n : {}; f = ke(n, s, c) } } if (o || (o = new Zn),
                    i = o.get(n)) return i; if (o.set(n, f), pf(n)) return n.forEach(function (r) { f.add(_t(r, t, e, r, n, o)) }), f; if (sf(n)) return n.forEach(function (r, u) { f.set(u, _t(r, t, e, u, n, o)) }), f; var a = l ? a ? ve : _e : a ? Uu : Wu, p = u ? T : a(n); return r(p || n, function (r, u) { p && (u = r, r = n[u]), ot(f, u, _t(r, t, e, u, n, o)) }), f
            } function vt(n) { var t = Wu(n); return function (r) { return gt(r, n, t) } } function gt(n, t, r) { var e = r.length; if (null == n) return !e; for (n = Qu(n); e--;) { var u = r[e], i = t[u], o = n[u]; if (o === T && !(u in n) || !i(o)) return false } return true } function dt(n, t, r) {
                if (typeof n != "function") throw new ti("Expected a function");
                return bo(function () { n.apply(T, r) }, t)
            } function yt(n, t, r, e) { var u = -1, i = o, a = true, l = n.length, s = [], h = t.length; if (!l) return s; r && (t = c(t, E(r))), e ? (i = f, a = false) : 200 <= t.length && (i = O, a = false, t = new Nn(t)); n: for (; ++u < l;) { var p = n[u], _ = null == r ? p : r(p), p = e || 0 !== p ? p : 0; if (a && _ === _) { for (var v = h; v--;)if (t[v] === _) continue n; s.push(p) } else i(t, _, e) || s.push(p) } return s } function bt(n, t) { var r = true; return uo(n, function (n, e, u) { return r = !!t(n, e, u) }), r } function xt(n, t, r) {
                for (var e = -1, u = n.length; ++e < u;) {
                    var i = n[e], o = t(i); if (null != o && (f === T ? o === o && !wu(o) : r(o, f))) var f = o, c = i;
                } return c
            } function jt(n, t) { var r = []; return uo(n, function (n, e, u) { t(n, e, u) && r.push(n) }), r } function wt(n, t, r, e, u) { var i = -1, o = n.length; for (r || (r = Ee), u || (u = []); ++i < o;) { var f = n[i]; 0 < t && r(f) ? 1 < t ? wt(f, t - 1, r, e, u) : a(u, f) : e || (u[u.length] = f) } return u } function mt(n, t) { return n && oo(n, t, Wu) } function At(n, t) { return n && fo(n, t, Wu) } function kt(n, t) { return i(t, function (t) { return _u(n[t]) }) } function Et(n, t) { t = Sr(t, n); for (var r = 0, e = t.length; null != n && r < e;)n = n[Me(t[r++])]; return r && r == e ? n : T } function St(n, t, r) {
                return t = t(n),
                    ff(n) ? t : a(t, r(n))
            } function Ot(n) { if (null == n) return n === T ? "[object Undefined]" : "[object Null]"; if (mi && mi in Qu(n)) { var t = oi.call(n, mi), r = n[mi]; try { n[mi] = T; var e = true } catch (n) { } var u = ai.call(n); e && (t ? n[mi] = r : delete n[mi]), n = u } else n = ai.call(n); return n } function It(n, t) { return n > t } function Rt(n, t) { return null != n && oi.call(n, t) } function zt(n, t) { return null != n && t in Qu(n) } function Wt(n, t, r) {
                for (var e = r ? f : o, u = n[0].length, i = n.length, a = i, l = Ku(i), s = 1 / 0, h = []; a--;) {
                    var p = n[a]; a && t && (p = c(p, E(t))), s = Ci(p.length, s),
                        l[a] = !r && (t || 120 <= u && 120 <= p.length) ? new Nn(a && p) : T
                } var p = n[0], _ = -1, v = l[0]; n: for (; ++_ < u && h.length < s;) { var g = p[_], d = t ? t(g) : g, g = r || 0 !== g ? g : 0; if (v ? !O(v, d) : !e(h, d, r)) { for (a = i; --a;) { var y = l[a]; if (y ? !O(y, d) : !e(n[a], d, r)) continue n } v && v.push(d), h.push(g) } } return h
            } function Ut(n, t, r, e) { return mt(n, function (n, u, i) { t(e, r(n), u, i) }), e } function Bt(t, r, e) { return r = Sr(r, t), t = 2 > r.length ? t : Et(t, hr(r, 0, -1)), r = null == t ? t : t[Me(Ve(r))], null == r ? T : n(r, t, e) } function Lt(n) { return yu(n) && "[object Arguments]" == Ot(n) } function Ct(n) {
                return yu(n) && "[object ArrayBuffer]" == Ot(n)
            } function Dt(n) { return yu(n) && "[object Date]" == Ot(n) } function Mt(n, t, r, e, u) {
                if (n === t) return true; if (null == n || null == t || !yu(n) && !yu(t)) return n !== n && t !== t; n: {
                    var i = ff(n), o = ff(t), f = i ? "[object Array]" : vo(n), c = o ? "[object Array]" : vo(t), f = "[object Arguments]" == f ? "[object Object]" : f, c = "[object Arguments]" == c ? "[object Object]" : c, a = "[object Object]" == f, o = "[object Object]" == c; if ((c = f == c) && af(n)) { if (!af(t)) { t = false; break n } i = true, a = false } if (c && !a) u || (u = new Zn), t = i || _f(n) ? se(n, t, r, e, Mt, u) : he(n, t, f, r, e, Mt, u); else {
                        if (!(1 & r) && (i = a && oi.call(n, "__wrapped__"), f = o && oi.call(t, "__wrapped__"), i || f)) { n = i ? n.value() : n, t = f ? t.value() : t, u || (u = new Zn), t = Mt(n, t, r, e, u); break n } if (c) t: if (u || (u = new Zn), i = 1 & r, f = _e(n), o = f.length, c = _e(t).length, o == c || i) {
                            for (a = o; a--;) { var l = f[a]; if (!(i ? l in t : oi.call(t, l))) { t = false; break t } } if ((c = u.get(n)) && u.get(t)) t = c == t; else {
                                c = true, u.set(n, t), u.set(t, n); for (var s = i; ++a < o;) {
                                    var l = f[a], h = n[l], p = t[l]; if (e) var _ = i ? e(p, h, l, t, n, u) : e(h, p, l, n, t, u); if (_ === T ? h !== p && !Mt(h, p, r, e, u) : !_) { c = false; break } s || (s = "constructor" == l);
                                } c && !s && (r = n.constructor, e = t.constructor, r != e && "constructor" in n && "constructor" in t && !(typeof r == "function" && r instanceof r && typeof e == "function" && e instanceof e) && (c = false)), u.delete(n), u.delete(t), t = c
                            }
                        } else t = false; else t = false
                    }
                } return t
            } function Tt(n) { return yu(n) && "[object Map]" == vo(n) } function $$t(n, t, r, e) {
                var u = r.length, i = u, o = !e; if (null == n) return !i; for (n = Qu(n); u--;) { var f = r[u]; if (o && f[2] ? f[1] !== n[f[0]] : !(f[0] in n)) return false } for (; ++u < i;) {
                    var f = r[u], c = f[0], a = n[c], l = f[1]; if (o && f[2]) {
                        if (a === T && !(c in n)) return false;
                    } else { if (f = new Zn, e) var s = e(a, l, c, n, t, f); if (s === T ? !Mt(l, a, 3, e, f) : !s) return false }
                } return true
            } function Ft(n) { return !(!du(n) || ci && ci in n) && (_u(n) ? hi : dn).test(Te(n)) } function Nt(n) { return yu(n) && "[object RegExp]" == Ot(n) } function Pt(n) { return yu(n) && "[object Set]" == vo(n) } function Zt(n) { return yu(n) && gu(n.length) && !!Un[Ot(n)] } function qt(n) { return typeof n == "function" ? n : null == n ? $$u : typeof n == "object" ? ff(n) ? Jt(n[0], n[1]) : Ht(n) : Zu(n) } function Vt(n) {
                if (!ze(n)) return Bi(n); var t, r = []; for (t in Qu(n)) oi.call(n, t) && "constructor" != t && r.push(t);
                return r
            } function Kt(n, t) { return n < t } function Gt(n, t) { var r = -1, e = su(n) ? Ku(n.length) : []; return uo(n, function (n, u, i) { e[++r] = t(n, u, i) }), e } function Ht(n) { var t = xe(n); return 1 == t.length && t[0][2] ? We(t[0][0], t[0][1]) : function (r) { return r === n || $$t(r, n, t) } } function Jt(n, t) { return Ie(n) && t === t && !du(t) ? We(Me(n), t) : function (r) { var e = Ru(r, n); return e === T && e === t ? zu(r, n) : Mt(t, e, 3) } } function Yt(n, t, r, e, u) {
                n !== t && oo(t, function (i, o) {
                    if (du(i)) {
                        u || (u = new Zn); var f = u, c = Be(n, o), a = Be(t, o), l = f.get(a); if (!l) {
                            var l = e ? e(c, a, o + "", n, t, f) : T, s = l === T;
                            if (s) { var h = ff(a), p = !h && af(a), _ = !h && !p && _f(a), l = a; h || p || _ ? ff(c) ? l = c : hu(c) ? l = Lr(c) : p ? (s = false, l = Ir(a, true)) : _ ? (s = false, l = zr(a, true)) : l = [] : xu(a) || of(a) ? (l = c, of(c) ? l = Ou(c) : du(c) && !_u(c) || (l = Ae(a))) : s = false } s && (f.set(a, l), Yt(l, a, r, e, f), f.delete(a))
                        } it(n, o, l)
                    } else f = e ? e(Be(n, o), i, o + "", n, t, u) : T, f === T && (f = i), it(n, o, f)
                }, Uu)
            } function Qt(n, t) { var r = n.length; if (r) return t += 0 > t ? r : 0, Se(t, r) ? n[t] : T } function Xt(n, t, r) {
                var e = -1; return t = c(t.length ? t : [$$u], E(ye())), n = Gt(n, function (n, r, u) {
                    return {
                        a: c(t, function (t) { return t(n) }),
                        b: ++e, c: n
                    }
                }), w(n, function (n, t) { var e; n: { e = -1; for (var u = n.a, i = t.a, o = u.length, f = r.length; ++e < o;) { var c = Wr(u[e], i[e]); if (c) { if (e >= f) { e = c; break n } e = c * ("desc" == r[e] ? -1 : 1); break n } } e = n.b - t.b } return e })
            } function nr(n, t) { return tr(n, t, function (t, r) { return zu(n, r) }) } function tr(n, t, r) { for (var e = -1, u = t.length, i = {}; ++e < u;) { var o = t[e], f = Et(n, o); r(f, o) && lr(i, Sr(o, n), f) } return i } function rr(n) { return function (t) { return Et(t, n) } } function er(n, t, r, e) {
                var u = e ? g : v, i = -1, o = t.length, f = n; for (n === t && (t = Lr(t)), r && (f = c(n, E(r))); ++i < o;)for (var a = 0, l = t[i], l = r ? r(l) : l; -1 < (a = u(f, l, a, e));)f !== n && xi.call(f, a, 1),
                    xi.call(n, a, 1); return n
            } function ur(n, t) { for (var r = n ? t.length : 0, e = r - 1; r--;) { var u = t[r]; if (r == e || u !== i) { var i = u; Se(u) ? xi.call(n, u, 1) : xr(n, u) } } return n } function ir(n, t) { return n + Ii(Ti() * (t - n + 1)) } function or(n, t) { var r = ""; if (!n || 1 > t || 9007199254740991 < t) return r; do t % 2 && (r += n), (t = Ii(t / 2)) && (n += n); while (t); return r } function fr(n, t) { return xo(Ue(n, t, $$u), n + "") } function cr(n) { return Qn(Lu(n)) } function ar(n, t) { var r = Lu(n); return De(r, pt(t, 0, r.length)) } function lr(n, t, r, e) {
                if (!du(n)) return n; t = Sr(t, n); for (var u = -1, i = t.length, o = i - 1, f = n; null != f && ++u < i;) {
                    var c = Me(t[u]), a = r; if (u != o) { var l = f[c], a = e ? e(l, c, f) : T; a === T && (a = du(l) ? l : Se(t[u + 1]) ? [] : {}) } ot(f, c, a), f = f[c]
                } return n
            } function sr(n) { return De(Lu(n)) } function hr(n, t, r) { var e = -1, u = n.length; for (0 > t && (t = -t > u ? 0 : u + t), r = r > u ? u : r, 0 > r && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0, r = Ku(u); ++e < u;)r[e] = n[e + t]; return r } function pr(n, t) { var r; return uo(n, function (n, e, u) { return r = t(n, e, u), !r }), !!r } function _r(n, t, r) {
                var e = 0, u = null == n ? e : n.length; if (typeof t == "number" && t === t && 2147483647 >= u) {
                    for (; e < u;) {
                        var i = e + u >>> 1, o = n[i]; null !== o && !wu(o) && (r ? o <= t : o < t) ? e = i + 1 : u = i;
                    } return u
                } return vr(n, t, $$u, r)
            } function vr(n, t, r, e) { t = r(t); for (var u = 0, i = null == n ? 0 : n.length, o = t !== t, f = null === t, c = wu(t), a = t === T; u < i;) { var l = Ii((u + i) / 2), s = r(n[l]), h = s !== T, p = null === s, _ = s === s, v = wu(s); (o ? e || _ : a ? _ && (e || h) : f ? _ && h && (e || !p) : c ? _ && h && !p && (e || !v) : p || v ? 0 : e ? s <= t : s < t) ? u = l + 1 : i = l } return Ci(i, 4294967294) } function gr(n, t) { for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) { var o = n[r], f = t ? t(o) : o; if (!r || !lu(f, c)) { var c = f; i[u++] = 0 === o ? 0 : o } } return i } function dr(n) { return typeof n == "number" ? n : wu(n) ? F : +n } function yr(n) {
                if (typeof n == "string") return n; if (ff(n)) return c(n, yr) + ""; if (wu(n)) return ro ? ro.call(n) : ""; var t = n + ""; return "0" == t && 1 / n == -$$ ? "-0" : t
            } function br(n, t, r) { var e = -1, u = o, i = n.length, c = true, a = [], l = a; if (r) c = false, u = f; else if (200 <= i) { if (u = t ? null : so(n)) return L(u); c = false, u = O, l = new Nn } else l = t ? [] : a; n: for (; ++e < i;) { var s = n[e], h = t ? t(s) : s, s = r || 0 !== s ? s : 0; if (c && h === h) { for (var p = l.length; p--;)if (l[p] === h) continue n; t && l.push(h), a.push(s) } else u(l, h, r) || (l !== a && l.push(h), a.push(s)) } return a } function xr(n, t) {
                return t = Sr(t, n),
                    n = 2 > t.length ? n : Et(n, hr(t, 0, -1)), null == n || delete n[Me(Ve(t))]
            } function jr(n, t, r, e) { for (var u = n.length, i = e ? u : -1; (e ? i-- : ++i < u) && t(n[i], i, n);); return r ? hr(n, e ? 0 : i, e ? i + 1 : u) : hr(n, e ? i + 1 : 0, e ? u : i) } function wr(n, t) { var r = n; return r instanceof Ln && (r = r.value()), l(t, function (n, t) { return t.func.apply(t.thisArg, a([n], t.args)) }, r) } function mr(n, t, r) { var e = n.length; if (2 > e) return e ? br(n[0]) : []; for (var u = -1, i = Ku(e); ++u < e;)for (var o = n[u], f = -1; ++f < e;)f != u && (i[u] = yt(i[u] || o, n[f], t, r)); return br(wt(i, 1), t, r) } function Ar(n, t, r) {
                for (var e = -1, u = n.length, i = t.length, o = {}; ++e < u;)r(o, n[e], e < i ? t[e] : T); return o
            } function kr(n) { return hu(n) ? n : [] } function Er(n) { return typeof n == "function" ? n : $$u } function Sr(n, t) { return ff(n) ? n : Ie(n, t) ? [n] : jo(Iu(n)) } function Or(n, t, r) { var e = n.length; return r = r === T ? e : r, !t && r >= e ? n : hr(n, t, r) } function Ir(n, t) { if (t) return n.slice(); var r = n.length, r = gi ? gi(r) : new n.constructor(r); return n.copy(r), r } function Rr(n) { var t = new n.constructor(n.byteLength); return new vi(t).set(new vi(n)), t } function zr(n, t) {
                return new n.constructor(t ? Rr(n.buffer) : n.buffer, n.byteOffset, n.length);
            } function Wr(n, t) { if (n !== t) { var r = n !== T, e = null === n, u = n === n, i = wu(n), o = t !== T, f = null === t, c = t === t, a = wu(t); if (!f && !a && !i && n > t || i && o && c && !f && !a || e && o && c || !r && c || !u) return 1; if (!e && !i && !a && n < t || a && r && u && !e && !i || f && r && u || !o && u || !c) return -1 } return 0 } function Ur(n, t, r, e) { var u = -1, i = n.length, o = r.length, f = -1, c = t.length, a = Li(i - o, 0), l = Ku(c + a); for (e = !e; ++f < c;)l[f] = t[f]; for (; ++u < o;)(e || u < i) && (l[r[u]] = n[u]); for (; a--;)l[f++] = n[u++]; return l } function Br(n, t, r, e) {
                var u = -1, i = n.length, o = -1, f = r.length, c = -1, a = t.length, l = Li(i - f, 0), s = Ku(l + a);
                for (e = !e; ++u < l;)s[u] = n[u]; for (l = u; ++c < a;)s[l + c] = t[c]; for (; ++o < f;)(e || u < i) && (s[l + r[o]] = n[u++]); return s
            } function Lr(n, t) { var r = -1, e = n.length; for (t || (t = Ku(e)); ++r < e;)t[r] = n[r]; return t } function Cr(n, t, r, e) { var u = !r; r || (r = {}); for (var i = -1, o = t.length; ++i < o;) { var f = t[i], c = e ? e(r[f], n[f], f, r, n) : T; c === T && (c = n[f]), u ? st(r, f, c) : ot(r, f, c) } return r } function Dr(n, t) { return Cr(n, po(n), t) } function Mr(n, t) { return Cr(n, _o(n), t) } function Tr(n, r) {
                return function (e, u) {
                    var i = ff(e) ? t : ct, o = r ? r() : {}; return i(e, n, ye(u, 2), o);
                }
            } function $$r(n) { return fr(function (t, r) { var e = -1, u = r.length, i = 1 < u ? r[u - 1] : T, o = 2 < u ? r[2] : T, i = 3 < n.length && typeof i == "function" ? (u--, i) : T; for (o && Oe(r[0], r[1], o) && (i = 3 > u ? T : i, u = 1), t = Qu(t); ++e < u;)(o = r[e]) && n(t, o, e, i); return t }) } function Fr(n, t) { return function (r, e) { if (null == r) return r; if (!su(r)) return n(r, e); for (var u = r.length, i = t ? u : -1, o = Qu(r); (t ? i-- : ++i < u) && false !== e(o[i], i, o);); return r } } function Nr(n) {
                return function (t, r, e) {
                    var u = -1, i = Qu(t); e = e(t); for (var o = e.length; o--;) {
                        var f = e[n ? o : ++u]; if (false === r(i[f], f, i)) break;
                    } return t
                }
            } function Pr(n, t, r) { function e() { return (this && this !== $$n && this instanceof e ? i : n).apply(u ? r : this, arguments) } var u = 1 & t, i = Vr(n); return e } function Zr(n) { return function (t) { t = Iu(t); var r = Rn.test(t) ? M(t) : T, e = r ? r[0] : t.charAt(0); return t = r ? Or(r, 1).join("") : t.slice(1), e[n]() + t } } function qr(n) { return function (t) { return l(Mu(Du(t).replace(En, "")), n, "") } } function Vr(n) {
                return function () {
                    var t = arguments; switch (t.length) {
                        case 0: return new n; case 1: return new n(t[0]); case 2: return new n(t[0], t[1]); case 3:
                            return new n(t[0], t[1], t[2]); case 4: return new n(t[0], t[1], t[2], t[3]); case 5: return new n(t[0], t[1], t[2], t[3], t[4]); case 6: return new n(t[0], t[1], t[2], t[3], t[4], t[5]); case 7: return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6])
                    }var r = eo(n.prototype), t = n.apply(r, t); return du(t) ? t : r
                }
            } function Kr(t, r, e) {
                function u() {
                    for (var o = arguments.length, f = Ku(o), c = o, a = de(u); c--;)f[c] = arguments[c]; return c = 3 > o && f[0] !== a && f[o - 1] !== a ? [] : B(f, a), o -= c.length, o < e ? ue(t, r, Jr, u.placeholder, T, f, c, T, T, e - o) : n(this && this !== $$n && this instanceof u ? i : t, this, f);
                } var i = Vr(t); return u
            } function Gr(n) { return function (t, r, e) { var u = Qu(t); if (!su(t)) { var i = ye(r, 3); t = Wu(t), r = function (n) { return i(u[n], n, u) } } return r = n(t, r, e), -1 < r ? u[i ? t[r] : r] : T } } function Hr(n) {
                return pe(function (t) {
                    var r = t.length, e = r, u = On.prototype.thru; for (n && t.reverse(); e--;) { var i = t[e]; if (typeof i != "function") throw new ti("Expected a function"); if (u && !o && "wrapper" == ge(i)) var o = new On([], true) } for (e = o ? e : r; ++e < r;)var i = t[e], u = ge(i), f = "wrapper" == u ? ho(i) : T, o = f && Re(f[0]) && 424 == f[1] && !f[4].length && 1 == f[9] ? o[ge(f[0])].apply(o, f[3]) : 1 == i.length && Re(i) ? o[u]() : o.thru(i);
                    return function () { var n = arguments, e = n[0]; if (o && 1 == n.length && ff(e)) return o.plant(e).value(); for (var u = 0, n = r ? t[u].apply(this, n) : e; ++u < r;)n = t[u].call(this, n); return n }
                })
            } function Jr(n, t, r, e, u, i, o, f, c, a) {
                function l() {
                    for (var d = arguments.length, y = Ku(d), b = d; b--;)y[b] = arguments[b]; if (_) { var x, j = de(l), b = y.length; for (x = 0; b--;)y[b] === j && ++x } if (e && (y = Ur(y, e, u, _)), i && (y = Br(y, i, o, _)), d -= x, _ && d < a) return j = B(y, j), ue(n, t, Jr, l.placeholder, r, y, j, f, c, a - d); if (j = h ? r : this, b = p ? j[n] : n, d = y.length, f) {
                        x = y.length; for (var w = Ci(f.length, x), m = Lr(y); w--;) {
                            var A = f[w]; y[w] = Se(A, x) ? m[A] : T
                        }
                    } else v && 1 < d && y.reverse(); return s && c < d && (y.length = c), this && this !== $$n && this instanceof l && (b = g || Vr(b)), b.apply(j, y)
                } var s = 128 & t, h = 1 & t, p = 2 & t, _ = 24 & t, v = 512 & t, g = p ? T : Vr(n); return l
            } function Yr(n, t) { return function (r, e) { return Ut(r, n, t(e), {}) } } function Qr(n, t) { return function (r, e) { var u; if (r === T && e === T) return t; if (r !== T && (u = r), e !== T) { if (u === T) return e; typeof r == "string" || typeof e == "string" ? (r = yr(r), e = yr(e)) : (r = dr(r), e = dr(e)), u = n(r, e) } return u } } function Xr(t) {
                return pe(function (r) {
                    return r = c(r, E(ye())), fr(function (e) { var u = this; return t(r, function (t) { return n(t, u, e) }) })
                })
            } function ne(n, t) { t = t === T ? " " : yr(t); var r = t.length; return 2 > r ? r ? or(t, n) : t : (r = or(t, Oi(n / D(t))), Rn.test(t) ? Or(M(r), 0, n).join("") : r.slice(0, n)) } function te(t, r, e, u) { function i() { for (var r = -1, c = arguments.length, a = -1, l = u.length, s = Ku(l + c), h = this && this !== $$n && this instanceof i ? f : t; ++a < l;)s[a] = u[a]; for (; c--;)s[a++] = arguments[++r]; return n(h, o ? e : this, s) } var o = 1 & r, f = Vr(t); return i } function re(n) {
                return function (t, r, e) {
                    e && typeof e != "number" && Oe(t, r, e) && (r = e = T), t = Au(t), r === T ? (r = t, t = 0) : r = Au(r), e = e === T ? t < r ? 1 : -1 : Au(e); var u = -1; r = Li(Oi((r - t) / (e || 1)), 0); for (var i = Ku(r); r--;)i[n ? r : ++u] = t, t += e; return i
                }
            } function ee(n) { return function (t, r) { return typeof t == "string" && typeof r == "string" || (t = Su(t), r = Su(r)), n(t, r) } } function ue(n, t, r, e, u, i, o, f, c, a) { var l = 8 & t, s = l ? o : T; o = l ? T : o; var h = l ? i : T; return i = l ? T : i, t = (t | (l ? 32 : 64)) & ~(l ? 64 : 32), 4 & t || (t &= -4), u = [n, t, u, h, s, i, o, f, c, a], r = r.apply(T, u), Re(n) && yo(r, u), r.placeholder = e, Le(r, n, t) } function ie(n) {
                var t = Yu[n]; return function (n, r) { if (n = Su(n), r = null == r ? 0 : Ci(ku(r), 292)) { var e = (Iu(n) + "e").split("e"), e = t(e[0] + "e" + (+e[1] + r)), e = (Iu(e) + "e").split("e"); return +(e[0] + "e" + (+e[1] - r)) } return t(n) }
            } function oe(n) { return function (t) { var r = vo(t); return "[object Map]" == r ? W(t) : "[object Set]" == r ? C(t) : k(t, n(t)) } } function fe(n, t, r, e, u, i, o, f) {
                var c = 2 & t; if (!c && typeof n != "function") throw new ti("Expected a function"); var a = e ? e.length : 0; if (a || (t &= -97, e = u = T), o = o === T ? o : Li(ku(o), 0), f = f === T ? f : ku(f), a -= u ? u.length : 0, 64 & t) {
                    var l = e, s = u; e = u = T
                } var h = c ? T : ho(n); return i = [n, t, r, e, u, l, s, i, o, f], h && (r = i[1], n = h[1], t = r | n, e = 128 == n && 8 == r || 128 == n && 256 == r && i[7].length <= h[8] || 384 == n && h[7].length <= h[8] && 8 == r, 131 > t || e) && (1 & n && (i[2] = h[2], t |= 1 & r ? 0 : 4), (r = h[3]) && (e = i[3], i[3] = e ? Ur(e, r, h[4]) : r, i[4] = e ? B(i[3], "__lodash_placeholder__") : h[4]), (r = h[5]) && (e = i[5], i[5] = e ? Br(e, r, h[6]) : r, i[6] = e ? B(i[5], "__lodash_placeholder__") : h[6]), (r = h[7]) && (i[7] = r), 128 & n && (i[8] = null == i[8] ? h[8] : Ci(i[8], h[8])), null == i[9] && (i[9] = h[9]), i[0] = h[0], i[1] = t), n = i[0], t = i[1],
                    r = i[2], e = i[3], u = i[4], f = i[9] = i[9] === T ? c ? 0 : n.length : Li(i[9] - a, 0), !f && 24 & t && (t &= -25), c = t && 1 != t ? 8 == t || 16 == t ? Kr(n, t, f) : 32 != t && 33 != t || u.length ? Jr.apply(T, i) : te(n, t, r, e) : Pr(n, t, r), Le((h ? co : yo)(c, i), n, t)
            } function ce(n, t, r, e) { return n === T || lu(n, ei[r]) && !oi.call(e, r) ? t : n } function ae(n, t, r, e, u, i) { return du(n) && du(t) && (i.set(t, n), Yt(n, t, T, ae, i), i.delete(t)), n } function le(n) { return xu(n) ? T : n } function se(n, t, r, e, u, i) {
                var o = 1 & r, f = n.length, c = t.length; if (f != c && !(o && c > f)) return false; if ((c = i.get(n)) && i.get(t)) return c == t;
                var c = -1, a = true, l = 2 & r ? new Nn : T; for (i.set(n, t), i.set(t, n); ++c < f;) { var s = n[c], p = t[c]; if (e) var _ = o ? e(p, s, c, t, n, i) : e(s, p, c, n, t, i); if (_ !== T) { if (_) continue; a = false; break } if (l) { if (!h(t, function (n, t) { if (!O(l, t) && (s === n || u(s, n, r, e, i))) return l.push(t) })) { a = false; break } } else if (s !== p && !u(s, p, r, e, i)) { a = false; break } } return i.delete(n), i.delete(t), a
            } function he(n, t, r, e, u, i, o) {
                switch (r) {
                    case "[object DataView]": if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset) break; n = n.buffer, t = t.buffer; case "[object ArrayBuffer]":
                        if (n.byteLength != t.byteLength || !i(new vi(n), new vi(t))) break; return true; case "[object Boolean]": case "[object Date]": case "[object Number]": return lu(+n, +t); case "[object Error]": return n.name == t.name && n.message == t.message; case "[object RegExp]": case "[object String]": return n == t + ""; case "[object Map]": var f = W; case "[object Set]": if (f || (f = L), n.size != t.size && !(1 & e)) break; return (r = o.get(n)) ? r == t : (e |= 2, o.set(n, t), t = se(f(n), f(t), e, u, i, o), o.delete(n), t); case "[object Symbol]": if (to) return to.call(n) == to.call(t)
                }
                return false
            } function pe(n) { return xo(Ue(n, T, Ze), n + "") } function _e(n) { return St(n, Wu, po) } function ve(n) { return St(n, Uu, _o) } function ge(n) { for (var t = n.name + "", r = Gi[t], e = oi.call(Gi, t) ? r.length : 0; e--;) { var u = r[e], i = u.func; if (null == i || i == n) return u.name } return t } function de(n) { return (oi.call(An, "placeholder") ? An : n).placeholder } function ye() { var n = An.iteratee || Fu, n = n === Fu ? qt : n; return arguments.length ? n(arguments[0], arguments[1]) : n } function be(n, t) {
                var r = n.__data__, e = typeof t; return ("string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
            } function xe(n) { for (var t = Wu(n), r = t.length; r--;) { var e = t[r], u = n[e]; t[r] = [e, u, u === u && !du(u)] } return t } function je(n, t) { var r = null == n ? T : n[t]; return Ft(r) ? r : T } function we(n, t, r) { t = Sr(t, n); for (var e = -1, u = t.length, i = false; ++e < u;) { var o = Me(t[e]); if (!(i = null != n && r(n, o))) break; n = n[o] } return i || ++e != u ? i : (u = null == n ? 0 : n.length, !!u && gu(u) && Se(o, u) && (ff(n) || of(n))) } function me(n) { var t = n.length, r = new n.constructor(t); return t && "string" == typeof n[0] && oi.call(n, "index") && (r.index = n.index, r.input = n.input), r } function Ae(n) {
                return typeof n.constructor != "function" || ze(n) ? {} : eo(di(n))
            } function ke(n, t, r) {
                var e = n.constructor; switch (t) {
                    case "[object ArrayBuffer]": return Rr(n); case "[object Boolean]": case "[object Date]": return new e(+n); case "[object DataView]": return t = r ? Rr(n.buffer) : n.buffer, new n.constructor(t, n.byteOffset, n.byteLength); case "[object Float32Array]": case "[object Float64Array]": case "[object Int8Array]": case "[object Int16Array]": case "[object Int32Array]": case "[object Uint8Array]": case "[object Uint8ClampedArray]":
                    case "[object Uint16Array]": case "[object Uint32Array]": return zr(n, r); case "[object Map]": return new e; case "[object Number]": case "[object String]": return new e(n); case "[object RegExp]": return t = new n.constructor(n.source, _n.exec(n)), t.lastIndex = n.lastIndex, t; case "[object Set]": return new e; case "[object Symbol]": return to ? Qu(to.call(n)) : {}
                }
            } function Ee(n) { return ff(n) || of(n) || !!(ji && n && n[ji]) } function Se(n, t) {
                var r = typeof n; return t = null == t ? 9007199254740991 : t, !!t && ("number" == r || "symbol" != r && bn.test(n)) && -1 < n && 0 == n % 1 && n < t;
            } function Oe(n, t, r) { if (!du(r)) return false; var e = typeof t; return !!("number" == e ? su(r) && Se(t, r.length) : "string" == e && t in r) && lu(r[t], n) } function Ie(n, t) { if (ff(n)) return false; var r = typeof n; return !("number" != r && "symbol" != r && "boolean" != r && null != n && !wu(n)) || (nn.test(n) || !X.test(n) || null != t && n in Qu(t)) } function Re(n) { var t = ge(n), r = An[t]; return typeof r == "function" && t in Ln.prototype && (n === r || (t = ho(r), !!t && n === t[0])) } function ze(n) { var t = n && n.constructor; return n === (typeof t == "function" && t.prototype || ei) } function We(n, t) {
                return function (r) { return null != r && (r[n] === t && (t !== T || n in Qu(r))) }
            } function Ue(t, r, e) { return r = Li(r === T ? t.length - 1 : r, 0), function () { for (var u = arguments, i = -1, o = Li(u.length - r, 0), f = Ku(o); ++i < o;)f[i] = u[r + i]; for (i = -1, o = Ku(r + 1); ++i < r;)o[i] = u[i]; return o[r] = e(f), n(t, this, o) } } function Be(n, t) { if ("__proto__" != t) return n[t] } function Le(n, t, r) {
                var e = t + ""; t = xo; var u, i = $$e; return u = (u = e.match(an)) ? u[1].split(ln) : [], r = i(u, r), (i = r.length) && (u = i - 1, r[u] = (1 < i ? "& " : "") + r[u], r = r.join(2 < i ? ", " : " "), e = e.replace(cn, "{\n/* [wrapped with " + r + "] */\n")),
                    t(n, e)
            } function Ce(n) { var t = 0, r = 0; return function () { var e = Di(), u = 16 - (e - r); if (r = e, 0 < u) { if (800 <= ++t) return arguments[0] } else t = 0; return n.apply(T, arguments) } } function De(n, t) { var r = -1, e = n.length, u = e - 1; for (t = t === T ? e : t; ++r < t;) { var e = ir(r, u), i = n[e]; n[e] = n[r], n[r] = i } return n.length = t, n } function Me(n) { if (typeof n == "string" || wu(n)) return n; var t = n + ""; return "0" == t && 1 / n == -$$ ? "-0" : t } function Te(n) { if (null != n) { try { return ii.call(n) } catch (n) { } return n + "" } return "" } function $$e(n, t) {
                return r(N, function (r) {
                    var e = "_." + r[0];
                    t & r[1] && !o(n, e) && n.push(e)
                }), n.sort()
            } function Fe(n) { if (n instanceof Ln) return n.clone(); var t = new On(n.__wrapped__, n.__chain__); return t.__actions__ = Lr(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t } function Ne(n, t, r) { var e = null == n ? 0 : n.length; return e ? (r = null == r ? 0 : ku(r), 0 > r && (r = Li(e + r, 0)), _(n, ye(t, 3), r)) : -1 } function Pe(n, t, r) { var e = null == n ? 0 : n.length; if (!e) return -1; var u = e - 1; return r !== T && (u = ku(r), u = 0 > r ? Li(e + u, 0) : Ci(u, e - 1)), _(n, ye(t, 3), u, true) } function Ze(n) {
                return (null == n ? 0 : n.length) ? wt(n, 1) : [];
            } function qe(n) { return n && n.length ? n[0] : T } function Ve(n) { var t = null == n ? 0 : n.length; return t ? n[t - 1] : T } function Ke(n, t) { return n && n.length && t && t.length ? er(n, t) : n } function Ge(n) { return null == n ? n : $$i.call(n) } function He(n) { if (!n || !n.length) return []; var t = 0; return n = i(n, function (n) { if (hu(n)) return t = Li(n.length, t), true }), A(t, function (t) { return c(n, b(t)) }) } function Je(t, r) { if (!t || !t.length) return []; var e = He(t); return null == r ? e : c(e, function (t) { return n(r, T, t) }) } function Ye(n) {
                return n = An(n), n.__chain__ = true, n;
            } function Qe(n, t) { return t(n) } function Xe() { return this } function nu(n, t) { return (ff(n) ? r : uo)(n, ye(t, 3)) } function tu(n, t) { return (ff(n) ? e : io)(n, ye(t, 3)) } function ru(n, t) { return (ff(n) ? c : Gt)(n, ye(t, 3)) } function eu(n, t, r) { return t = r ? T : t, t = n && null == t ? n.length : t, fe(n, 128, T, T, T, T, t) } function uu(n, t) { var r; if (typeof t != "function") throw new ti("Expected a function"); return n = ku(n), function () { return 0 < --n && (r = t.apply(this, arguments)), 1 >= n && (t = T), r } } function iu(n, t, r) {
                return t = r ? T : t, n = fe(n, 8, T, T, T, T, T, t), n.placeholder = iu.placeholder,
                    n
            } function ou(n, t, r) { return t = r ? T : t, n = fe(n, 16, T, T, T, T, T, t), n.placeholder = ou.placeholder, n } function fu(n, t, r) {
                function e(t) { var r = c, e = a; return c = a = T, _ = t, s = n.apply(e, r) } function u(n) { var r = n - p; return n -= _, p === T || r >= t || 0 > r || g && n >= l } function i() { var n = Go(); if (u(n)) return o(n); var r, e = bo; r = n - _, n = t - (n - p), r = g ? Ci(n, l - r) : n, h = e(i, r) } function o(n) { return h = T, d && c ? e(n) : (c = a = T, s) } function f() {
                    var n = Go(), r = u(n); if (c = arguments, a = this, p = n, r) { if (h === T) return _ = n = p, h = bo(i, t), v ? e(n) : s; if (g) return h = bo(i, t), e(p) } return h === T && (h = bo(i, t)),
                        s
                } var c, a, l, s, h, p, _ = 0, v = false, g = false, d = true; if (typeof n != "function") throw new ti("Expected a function"); return t = Su(t) || 0, du(r) && (v = !!r.leading, l = (g = "maxWait" in r) ? Li(Su(r.maxWait) || 0, t) : l, d = "trailing" in r ? !!r.trailing : d), f.cancel = function () { h !== T && lo(h), _ = 0, c = p = a = h = T }, f.flush = function () { return h === T ? s : o(Go()) }, f
            } function cu(n, t) {
                if (typeof n != "function" || null != t && typeof t != "function") throw new ti("Expected a function"); var r = function () {
                    var e = arguments, u = t ? t.apply(this, e) : e[0], i = r.cache; return i.has(u) ? i.get(u) : (e = n.apply(this, e),
                        r.cache = i.set(u, e) || i, e)
                }; return r.cache = new (cu.Cache || Fn), r
            } function au(n) { if (typeof n != "function") throw new ti("Expected a function"); return function () { var t = arguments; switch (t.length) { case 0: return !n.call(this); case 1: return !n.call(this, t[0]); case 2: return !n.call(this, t[0], t[1]); case 3: return !n.call(this, t[0], t[1], t[2]) }return !n.apply(this, t) } } function lu(n, t) { return n === t || n !== n && t !== t } function su(n) { return null != n && gu(n.length) && !_u(n) } function hu(n) { return yu(n) && su(n) } function pu(n) {
                if (!yu(n)) return false;
                var t = Ot(n); return "[object Error]" == t || "[object DOMException]" == t || typeof n.message == "string" && typeof n.name == "string" && !xu(n)
            } function _u(n) { return !!du(n) && (n = Ot(n), "[object Function]" == n || "[object GeneratorFunction]" == n || "[object AsyncFunction]" == n || "[object Proxy]" == n) } function vu(n) { return typeof n == "number" && n == ku(n) } function gu(n) { return typeof n == "number" && -1 < n && 0 == n % 1 && 9007199254740991 >= n } function du(n) { var t = typeof n; return null != n && ("object" == t || "function" == t) } function yu(n) {
                return null != n && typeof n == "object";
            } function bu(n) { return typeof n == "number" || yu(n) && "[object Number]" == Ot(n) } function xu(n) { return !(!yu(n) || "[object Object]" != Ot(n)) && (n = di(n), null === n || (n = oi.call(n, "constructor") && n.constructor, typeof n == "function" && n instanceof n && ii.call(n) == li)) } function ju(n) { return typeof n == "string" || !ff(n) && yu(n) && "[object String]" == Ot(n) } function wu(n) { return typeof n == "symbol" || yu(n) && "[object Symbol]" == Ot(n) } function mu(n) {
                if (!n) return []; if (su(n)) return ju(n) ? M(n) : Lr(n); if (wi && n[wi]) {
                    n = n[wi](); for (var t, r = []; !(t = n.next()).done;)r.push(t.value);
                    return r
                } return t = vo(n), ("[object Map]" == t ? W : "[object Set]" == t ? L : Lu)(n)
            } function Au(n) { return n ? (n = Su(n), n === $$ || n === -$$ ? 1.7976931348623157e308 * (0 > n ? -1 : 1) : n === n ? n : 0) : 0 === n ? n : 0 } function ku(n) { n = Au(n); var t = n % 1; return n === n ? t ? n - t : n : 0 } function Eu(n) { return n ? pt(ku(n), 0, 4294967295) : 0 } function Su(n) {
                if (typeof n == "number") return n; if (wu(n)) return F; if (du(n) && (n = typeof n.valueOf == "function" ? n.valueOf() : n, n = du(n) ? n + "" : n), typeof n != "string") return 0 === n ? n : +n; n = n.replace(un, ""); var t = gn.test(n); return t || yn.test(n) ? Dn(n.slice(2), t ? 2 : 8) : vn.test(n) ? F : +n;
            } function Ou(n) { return Cr(n, Uu(n)) } function Iu(n) { return null == n ? "" : yr(n) } function Ru(n, t, r) { return n = null == n ? T : Et(n, t), n === T ? r : n } function zu(n, t) { return null != n && we(n, t, zt) } function Wu(n) { return su(n) ? qn(n) : Vt(n) } function Uu(n) { if (su(n)) n = qn(n, true); else if (du(n)) { var t, r = ze(n), e = []; for (t in n) ("constructor" != t || !r && oi.call(n, t)) && e.push(t); n = e } else { if (t = [], null != n) for (r in Qu(n)) t.push(r); n = t } return n } function Bu(n, t) {
                if (null == n) return {}; var r = c(ve(n), function (n) { return [n] }); return t = ye(t), tr(n, r, function (n, r) {
                    return t(n, r[0])
                })
            } function Lu(n) { return null == n ? [] : S(n, Wu(n)) } function Cu(n) { return $$f(Iu(n).toLowerCase()) } function Du(n) { return (n = Iu(n)) && n.replace(xn, Xn).replace(Sn, "") } function Mu(n, t, r) { return n = Iu(n), t = r ? T : t, t === T ? zn.test(n) ? n.match(In) || [] : n.match(sn) || [] : n.match(t) || [] } function Tu(n) { return function () { return n } } function $$u(n) { return n } function Fu(n) { return qt(typeof n == "function" ? n : _t(n, 1)) } function Nu(n, t, e) {
                var u = Wu(t), i = kt(t, u); null != e || du(t) && (i.length || !u.length) || (e = t, t = n, n = this, i = kt(t, Wu(t)));
                var o = !(du(e) && "chain" in e && !e.chain), f = _u(n); return r(i, function (r) { var e = t[r]; n[r] = e, f && (n.prototype[r] = function () { var t = this.__chain__; if (o || t) { var r = n(this.__wrapped__); return (r.__actions__ = Lr(this.__actions__)).push({ func: e, args: arguments, thisArg: n }), r.__chain__ = t, r } return e.apply(n, a([this.value()], arguments)) }) }), n
            } function Pu() { } function Zu(n) { return Ie(n) ? b(Me(n)) : rr(n) } function qu() { return [] } function Vu() { return false } mn = null == mn ? $$n : rt.defaults($$n.Object(), mn, rt.pick($$n, Wn)); var Ku = mn.Array, Gu = mn.Date, Hu = mn.Error, Ju = mn.Function, Yu = mn.Math, Qu = mn.Object, Xu = mn.RegExp, ni = mn.String, ti = mn.TypeError, ri = Ku.prototype, ei = Qu.prototype, ui = mn["__core-js_shared__"], ii = Ju.prototype.toString, oi = ei.hasOwnProperty, fi = 0, ci = function () {
                var n = /[^.]+$$/.exec(ui && ui.keys && ui.keys.IE_PROTO || ""); return n ? "Symbol(src)_1." + n : ""
            }(), ai = ei.toString, li = ii.call(Qu), si = $$n._, hi = Xu("^" + ii.call(oi).replace(rn, "\\$$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$$1.*?") + "$$"), pi = Pn ? mn.Buffer : T, _i = mn.Symbol, vi = mn.Uint8Array, gi = pi ? pi.allocUnsafe : T, di = U(Qu.getPrototypeOf, Qu), yi = Qu.create, bi = ei.propertyIsEnumerable, xi = ri.splice, ji = _i ? _i.isConcatSpreadable : T, wi = _i ? _i.iterator : T, mi = _i ? _i.toStringTag : T, Ai = function () {
                try {
                    var n = je(Qu, "defineProperty");
                    return n({}, "", {}), n
                } catch (n) { }
            }(), ki = mn.clearTimeout !== $$n.clearTimeout && mn.clearTimeout, Ei = Gu && Gu.now !== $$n.Date.now && Gu.now, Si = mn.setTimeout !== $$n.setTimeout && mn.setTimeout, Oi = Yu.ceil, Ii = Yu.floor, Ri = Qu.getOwnPropertySymbols, zi = pi ? pi.isBuffer : T, Wi = mn.isFinite, Ui = ri.join, Bi = U(Qu.keys, Qu), Li = Yu.max, Ci = Yu.min, Di = Gu.now, Mi = mn.parseInt, Ti = Yu.random, $$i = ri.reverse, Fi = je(mn, "DataView"), Ni = je(mn, "Map"), Pi = je(mn, "Promise"), Zi = je(mn, "Set"), qi = je(mn, "WeakMap"), Vi = je(Qu, "create"), Ki = qi && new qi, Gi = {}, Hi = Te(Fi), Ji = Te(Ni), Yi = Te(Pi), Qi = Te(Zi), Xi = Te(qi), no = _i ? _i.prototype : T, to = no ? no.valueOf : T, ro = no ? no.toString : T, eo = function () {
                function n() { } return function (t) { return du(t) ? yi ? yi(t) : (n.prototype = t, t = new n, n.prototype = T, t) : {} }
            }(); An.templateSettings = { escape: J, evaluate: Y, interpolate: Q, variable: "", imports: { _: An } }, An.prototype = kn.prototype, An.prototype.constructor = An, On.prototype = eo(kn.prototype), On.prototype.constructor = On, Ln.prototype = eo(kn.prototype), Ln.prototype.constructor = Ln, Mn.prototype.clear = function () { this.__data__ = Vi ? Vi(null) : {}, this.size = 0 }, Mn.prototype.delete = function (n) {
                return n = this.has(n) && delete this.__data__[n],
                    this.size -= n ? 1 : 0, n
            }, Mn.prototype.get = function (n) { var t = this.__data__; return Vi ? (n = t[n], "__lodash_hash_undefined__" === n ? T : n) : oi.call(t, n) ? t[n] : T }, Mn.prototype.has = function (n) { var t = this.__data__; return Vi ? t[n] !== T : oi.call(t, n) }, Mn.prototype.set = function (n, t) { var r = this.__data__; return this.size += this.has(n) ? 0 : 1, r[n] = Vi && t === T ? "__lodash_hash_undefined__" : t, this }, Tn.prototype.clear = function () { this.__data__ = [], this.size = 0 }, Tn.prototype.delete = function (n) {
                var t = this.__data__; return n = ft(t, n), !(0 > n) && (n == t.length - 1 ? t.pop() : xi.call(t, n, 1),
                    --this.size, true)
            }, Tn.prototype.get = function (n) { var t = this.__data__; return n = ft(t, n), 0 > n ? T : t[n][1] }, Tn.prototype.has = function (n) { return -1 < ft(this.__data__, n) }, Tn.prototype.set = function (n, t) { var r = this.__data__, e = ft(r, n); return 0 > e ? (++this.size, r.push([n, t])) : r[e][1] = t, this }, Fn.prototype.clear = function () { this.size = 0, this.__data__ = { hash: new Mn, map: new (Ni || Tn), string: new Mn } }, Fn.prototype.delete = function (n) { return n = be(this, n).delete(n), this.size -= n ? 1 : 0, n }, Fn.prototype.get = function (n) {
                return be(this, n).get(n);
            }, Fn.prototype.has = function (n) { return be(this, n).has(n) }, Fn.prototype.set = function (n, t) { var r = be(this, n), e = r.size; return r.set(n, t), this.size += r.size == e ? 0 : 1, this }, Nn.prototype.add = Nn.prototype.push = function (n) { return this.__data__.set(n, "__lodash_hash_undefined__"), this }, Nn.prototype.has = function (n) { return this.__data__.has(n) }, Zn.prototype.clear = function () { this.__data__ = new Tn, this.size = 0 }, Zn.prototype.delete = function (n) { var t = this.__data__; return n = t.delete(n), this.size = t.size, n }, Zn.prototype.get = function (n) {
                return this.__data__.get(n)
            }, Zn.prototype.has = function (n) { return this.__data__.has(n) }, Zn.prototype.set = function (n, t) { var r = this.__data__; if (r instanceof Tn) { var e = r.__data__; if (!Ni || 199 > e.length) return e.push([n, t]), this.size = ++r.size, this; r = this.__data__ = new Fn(e) } return r.set(n, t), this.size = r.size, this }; var uo = Fr(mt), io = Fr(At, true), oo = Nr(), fo = Nr(true), co = Ki ? function (n, t) { return Ki.set(n, t), n } : $$u, ao = Ai ? function (n, t) { return Ai(n, "toString", { configurable: true, enumerable: false, value: Tu(t), writable: true }) } : $$u, lo = ki || function (n) {
                return $$n.clearTimeout(n)
            }, so = Zi && 1 / L(new Zi([, -0]))[1] == $$ ? function (n) { return new Zi(n) } : Pu, ho = Ki ? function (n) { return Ki.get(n) } : Pu, po = Ri ? function (n) { return null == n ? [] : (n = Qu(n), i(Ri(n), function (t) { return bi.call(n, t) })) } : qu, _o = Ri ? function (n) { for (var t = []; n;)a(t, po(n)), n = di(n); return t } : qu, vo = Ot; (Fi && "[object DataView]" != vo(new Fi(new ArrayBuffer(1))) || Ni && "[object Map]" != vo(new Ni) || Pi && "[object Promise]" != vo(Pi.resolve()) || Zi && "[object Set]" != vo(new Zi) || qi && "[object WeakMap]" != vo(new qi)) && (vo = function (n) {
                var t = Ot(n); if (n = (n = "[object Object]" == t ? n.constructor : T) ? Te(n) : "") switch (n) { case Hi: return "[object DataView]"; case Ji: return "[object Map]"; case Yi: return "[object Promise]"; case Qi: return "[object Set]"; case Xi: return "[object WeakMap]" }return t
            }); var go = ui ? _u : Vu, yo = Ce(co), bo = Si || function (n, t) { return $$n.setTimeout(n, t) }, xo = Ce(ao), jo = function (n) { n = cu(n, function (n) { return 500 === t.size && t.clear(), n }); var t = n.cache; return n }(function (n) {
                var t = []; return 46 === n.charCodeAt(0) && t.push(""), n.replace(tn, function (n, r, e, u) {
                    t.push(e ? u.replace(hn, "$$1") : r || n)
                }), t
            }), wo = fr(function (n, t) { return hu(n) ? yt(n, wt(t, 1, hu, true)) : [] }), mo = fr(function (n, t) { var r = Ve(t); return hu(r) && (r = T), hu(n) ? yt(n, wt(t, 1, hu, true), ye(r, 2)) : [] }), Ao = fr(function (n, t) { var r = Ve(t); return hu(r) && (r = T), hu(n) ? yt(n, wt(t, 1, hu, true), T, r) : [] }), ko = fr(function (n) { var t = c(n, kr); return t.length && t[0] === n[0] ? Wt(t) : [] }), Eo = fr(function (n) { var t = Ve(n), r = c(n, kr); return t === Ve(r) ? t = T : r.pop(), r.length && r[0] === n[0] ? Wt(r, ye(t, 2)) : [] }), So = fr(function (n) {
                var t = Ve(n), r = c(n, kr); return (t = typeof t == "function" ? t : T) && r.pop(),
                    r.length && r[0] === n[0] ? Wt(r, T, t) : []
            }), Oo = fr(Ke), Io = pe(function (n, t) { var r = null == n ? 0 : n.length, e = ht(n, t); return ur(n, c(t, function (n) { return Se(n, r) ? +n : n }).sort(Wr)), e }), Ro = fr(function (n) { return br(wt(n, 1, hu, true)) }), zo = fr(function (n) { var t = Ve(n); return hu(t) && (t = T), br(wt(n, 1, hu, true), ye(t, 2)) }), Wo = fr(function (n) { var t = Ve(n), t = typeof t == "function" ? t : T; return br(wt(n, 1, hu, true), T, t) }), Uo = fr(function (n, t) { return hu(n) ? yt(n, t) : [] }), Bo = fr(function (n) { return mr(i(n, hu)) }), Lo = fr(function (n) {
                var t = Ve(n); return hu(t) && (t = T),
                    mr(i(n, hu), ye(t, 2))
            }), Co = fr(function (n) { var t = Ve(n), t = typeof t == "function" ? t : T; return mr(i(n, hu), T, t) }), Do = fr(He), Mo = fr(function (n) { var t = n.length, t = 1 < t ? n[t - 1] : T, t = typeof t == "function" ? (n.pop(), t) : T; return Je(n, t) }), To = pe(function (n) {
                var t = n.length, r = t ? n[0] : 0, e = this.__wrapped__, u = function (t) { return ht(t, n) }; return !(1 < t || this.__actions__.length) && e instanceof Ln && Se(r) ? (e = e.slice(r, +r + (t ? 1 : 0)), e.__actions__.push({ func: Qe, args: [u], thisArg: T }), new On(e, this.__chain__).thru(function (n) {
                    return t && !n.length && n.push(T),
                        n
                })) : this.thru(u)
            }), $$o = Tr(function (n, t, r) { oi.call(n, r) ? ++n[r] : st(n, r, 1) }), Fo = Gr(Ne), No = Gr(Pe), Po = Tr(function (n, t, r) { oi.call(n, r) ? n[r].push(t) : st(n, r, [t]) }), Zo = fr(function (t, r, e) { var u = -1, i = typeof r == "function", o = su(t) ? Ku(t.length) : []; return uo(t, function (t) { o[++u] = i ? n(r, t, e) : Bt(t, r, e) }), o }), qo = Tr(function (n, t, r) { st(n, r, t) }), Vo = Tr(function (n, t, r) { n[r ? 0 : 1].push(t) }, function () { return [[], []] }), Ko = fr(function (n, t) {
                if (null == n) return []; var r = t.length; return 1 < r && Oe(n, t[0], t[1]) ? t = [] : 2 < r && Oe(t[0], t[1], t[2]) && (t = [t[0]]),
                    Xt(n, wt(t, 1), [])
            }), Go = Ei || function () { return $$n.Date.now() }, Ho = fr(function (n, t, r) { var e = 1; if (r.length) var u = B(r, de(Ho)), e = 32 | e; return fe(n, e, t, r, u) }), Jo = fr(function (n, t, r) { var e = 3; if (r.length) var u = B(r, de(Jo)), e = 32 | e; return fe(t, e, n, r, u) }), Yo = fr(function (n, t) { return dt(n, 1, t) }), Qo = fr(function (n, t, r) { return dt(n, Su(t) || 0, r) }); cu.Cache = Fn; var Xo = fr(function (t, r) {
                r = 1 == r.length && ff(r[0]) ? c(r[0], E(ye())) : c(wt(r, 1), E(ye())); var e = r.length; return fr(function (u) {
                    for (var i = -1, o = Ci(u.length, e); ++i < o;)u[i] = r[i].call(this, u[i]);
                    return n(t, this, u)
                })
            }), nf = fr(function (n, t) { return fe(n, 32, T, t, B(t, de(nf))) }), tf = fr(function (n, t) { return fe(n, 64, T, t, B(t, de(tf))) }), rf = pe(function (n, t) { return fe(n, 256, T, T, T, t) }), ef = ee(It), uf = ee(function (n, t) { return n >= t }), of = Lt(function () { return arguments }()) ? Lt : function (n) { return yu(n) && oi.call(n, "callee") && !bi.call(n, "callee") }, ff = Ku.isArray, cf = Vn ? E(Vn) : Ct, af = zi || Vu, lf = Kn ? E(Kn) : Dt, sf = Gn ? E(Gn) : Tt, hf = Hn ? E(Hn) : Nt, pf = Jn ? E(Jn) : Pt, _f = Yn ? E(Yn) : Zt, vf = ee(Kt), gf = ee(function (n, t) { return n <= t }), df = $$r(function (n, t) {
                if (ze(t) || su(t)) Cr(t, Wu(t), n); else for (var r in t) oi.call(t, r) && ot(n, r, t[r])
            }), yf = $$r(function (n, t) { Cr(t, Uu(t), n) }), bf = $$r(function (n, t, r, e) { Cr(t, Uu(t), n, e) }), xf = $$r(function (n, t, r, e) { Cr(t, Wu(t), n, e) }), jf = pe(ht), wf = fr(function (n, t) { n = Qu(n); var r = -1, e = t.length, u = 2 < e ? t[2] : T; for (u && Oe(t[0], t[1], u) && (e = 1); ++r < e;)for (var u = t[r], i = Uu(u), o = -1, f = i.length; ++o < f;) { var c = i[o], a = n[c]; (a === T || lu(a, ei[c]) && !oi.call(n, c)) && (n[c] = u[c]) } return n }), mf = fr(function (t) { return t.push(T, ae), n(Of, T, t) }), Af = Yr(function (n, t, r) {
                null != t && typeof t.toString != "function" && (t = ai.call(t)), n[t] = r
            }, Tu($$u)), kf = Yr(function (n, t, r) { null != t && typeof t.toString != "function" && (t = ai.call(t)), oi.call(n, t) ? n[t].push(r) : n[t] = [r] }, ye), Ef = fr(Bt), Sf = $$r(function (n, t, r) { Yt(n, t, r) }), Of = $$r(function (n, t, r, e) { Yt(n, t, r, e) }), If = pe(function (n, t) { var r = {}; if (null == n) return r; var e = false; t = c(t, function (t) { return t = Sr(t, n), e || (e = 1 < t.length), t }), Cr(n, ve(n), r), e && (r = _t(r, 7, le)); for (var u = t.length; u--;)xr(r, t[u]); return r }), Rf = pe(function (n, t) {
                return null == n ? {} : nr(n, t);
            }), zf = oe(Wu), Wf = oe(Uu), Uf = qr(function (n, t, r) { return t = t.toLowerCase(), n + (r ? Cu(t) : t) }), Bf = qr(function (n, t, r) { return n + (r ? "-" : "") + t.toLowerCase() }), Lf = qr(function (n, t, r) { return n + (r ? " " : "") + t.toLowerCase() }), Cf = Zr("toLowerCase"), Df = qr(function (n, t, r) { return n + (r ? "_" : "") + t.toLowerCase() }), Mf = qr(function (n, t, r) { return n + (r ? " " : "") + $$f(t) }), Tf = qr(function (n, t, r) { return n + (r ? " " : "") + t.toUpperCase() }), $$f = Zr("toUpperCase"), Ff = fr(function (t, r) { try { return n(t, T, r) } catch (n) { return pu(n) ? n : new Hu(n) } }), Nf = pe(function (n, t) {
                return r(t, function (t) { t = Me(t), st(n, t, Ho(n[t], n)) }), n
            }), Pf = Hr(), Zf = Hr(true), qf = fr(function (n, t) { return function (r) { return Bt(r, n, t) } }), Vf = fr(function (n, t) { return function (r) { return Bt(n, r, t) } }), Kf = Xr(c), Gf = Xr(u), Hf = Xr(h), Jf = re(), Yf = re(true), Qf = Qr(function (n, t) { return n + t }, 0), Xf = ie("ceil"), nc = Qr(function (n, t) { return n / t }, 1), tc = ie("floor"), rc = Qr(function (n, t) { return n * t }, 1), ec = ie("round"), uc = Qr(function (n, t) { return n - t }, 0); return An.after = function (n, t) {
                if (typeof t != "function") throw new ti("Expected a function");
                return n = ku(n), function () { if (1 > --n) return t.apply(this, arguments) }
            }, An.ary = eu, An.assign = df, An.assignIn = yf, An.assignInWith = bf, An.assignWith = xf, An.at = jf, An.before = uu, An.bind = Ho, An.bindAll = Nf, An.bindKey = Jo, An.castArray = function () { if (!arguments.length) return []; var n = arguments[0]; return ff(n) ? n : [n] }, An.chain = Ye, An.chunk = function (n, t, r) { if (t = (r ? Oe(n, t, r) : t === T) ? 1 : Li(ku(t), 0), r = null == n ? 0 : n.length, !r || 1 > t) return []; for (var e = 0, u = 0, i = Ku(Oi(r / t)); e < r;)i[u++] = hr(n, e, e += t); return i }, An.compact = function (n) {
                for (var t = -1, r = null == n ? 0 : n.length, e = 0, u = []; ++t < r;) {
                    var i = n[t]; i && (u[e++] = i)
                } return u
            }, An.concat = function () { var n = arguments.length; if (!n) return []; for (var t = Ku(n - 1), r = arguments[0]; n--;)t[n - 1] = arguments[n]; return a(ff(r) ? Lr(r) : [r], wt(t, 1)) }, An.cond = function (t) { var r = null == t ? 0 : t.length, e = ye(); return t = r ? c(t, function (n) { if ("function" != typeof n[1]) throw new ti("Expected a function"); return [e(n[0]), n[1]] }) : [], fr(function (e) { for (var u = -1; ++u < r;) { var i = t[u]; if (n(i[0], this, e)) return n(i[1], this, e) } }) }, An.conforms = function (n) { return vt(_t(n, 1)) }, An.constant = Tu,
                An.countBy = $$o, An.create = function (n, t) { var r = eo(n); return null == t ? r : at(r, t) }, An.curry = iu, An.curryRight = ou, An.debounce = fu, An.defaults = wf, An.defaultsDeep = mf, An.defer = Yo, An.delay = Qo, An.difference = wo, An.differenceBy = mo, An.differenceWith = Ao, An.drop = function (n, t, r) { var e = null == n ? 0 : n.length; return e ? (t = r || t === T ? 1 : ku(t), hr(n, 0 > t ? 0 : t, e)) : [] }, An.dropRight = function (n, t, r) { var e = null == n ? 0 : n.length; return e ? (t = r || t === T ? 1 : ku(t), t = e - t, hr(n, 0, 0 > t ? 0 : t)) : [] }, An.dropRightWhile = function (n, t) {
                    return n && n.length ? jr(n, ye(t, 3), true, true) : [];
                }, An.dropWhile = function (n, t) { return n && n.length ? jr(n, ye(t, 3), true) : [] }, An.fill = function (n, t, r, e) { var u = null == n ? 0 : n.length; if (!u) return []; for (r && typeof r != "number" && Oe(n, t, r) && (r = 0, e = u), u = n.length, r = ku(r), 0 > r && (r = -r > u ? 0 : u + r), e = e === T || e > u ? u : ku(e), 0 > e && (e += u), e = r > e ? 0 : Eu(e); r < e;)n[r++] = t; return n }, An.filter = function (n, t) { return (ff(n) ? i : jt)(n, ye(t, 3)) }, An.flatMap = function (n, t) { return wt(ru(n, t), 1) }, An.flatMapDeep = function (n, t) { return wt(ru(n, t), $$) }, An.flatMapDepth = function (n, t, r) {
                    return r = r === T ? 1 : ku(r),
                        wt(ru(n, t), r)
                }, An.flatten = Ze, An.flattenDeep = function (n) { return (null == n ? 0 : n.length) ? wt(n, $$) : [] }, An.flattenDepth = function (n, t) { return null != n && n.length ? (t = t === T ? 1 : ku(t), wt(n, t)) : [] }, An.flip = function (n) { return fe(n, 512) }, An.flow = Pf, An.flowRight = Zf, An.fromPairs = function (n) { for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r;) { var u = n[t]; e[u[0]] = u[1] } return e }, An.functions = function (n) { return null == n ? [] : kt(n, Wu(n)) }, An.functionsIn = function (n) { return null == n ? [] : kt(n, Uu(n)) }, An.groupBy = Po, An.initial = function (n) {
                    return (null == n ? 0 : n.length) ? hr(n, 0, -1) : []
                }, An.intersection = ko, An.intersectionBy = Eo, An.intersectionWith = So, An.invert = Af, An.invertBy = kf, An.invokeMap = Zo, An.iteratee = Fu, An.keyBy = qo, An.keys = Wu, An.keysIn = Uu, An.map = ru, An.mapKeys = function (n, t) { var r = {}; return t = ye(t, 3), mt(n, function (n, e, u) { st(r, t(n, e, u), n) }), r }, An.mapValues = function (n, t) { var r = {}; return t = ye(t, 3), mt(n, function (n, e, u) { st(r, e, t(n, e, u)) }), r }, An.matches = function (n) { return Ht(_t(n, 1)) }, An.matchesProperty = function (n, t) { return Jt(n, _t(t, 1)) }, An.memoize = cu,
                An.merge = Sf, An.mergeWith = Of, An.method = qf, An.methodOf = Vf, An.mixin = Nu, An.negate = au, An.nthArg = function (n) { return n = ku(n), fr(function (t) { return Qt(t, n) }) }, An.omit = If, An.omitBy = function (n, t) { return Bu(n, au(ye(t))) }, An.once = function (n) { return uu(2, n) }, An.orderBy = function (n, t, r, e) { return null == n ? [] : (ff(t) || (t = null == t ? [] : [t]), r = e ? T : r, ff(r) || (r = null == r ? [] : [r]), Xt(n, t, r)) }, An.over = Kf, An.overArgs = Xo, An.overEvery = Gf, An.overSome = Hf, An.partial = nf, An.partialRight = tf, An.partition = Vo, An.pick = Rf, An.pickBy = Bu, An.property = Zu,
                An.propertyOf = function (n) { return function (t) { return null == n ? T : Et(n, t) } }, An.pull = Oo, An.pullAll = Ke, An.pullAllBy = function (n, t, r) { return n && n.length && t && t.length ? er(n, t, ye(r, 2)) : n }, An.pullAllWith = function (n, t, r) { return n && n.length && t && t.length ? er(n, t, T, r) : n }, An.pullAt = Io, An.range = Jf, An.rangeRight = Yf, An.rearg = rf, An.reject = function (n, t) { return (ff(n) ? i : jt)(n, au(ye(t, 3))) }, An.remove = function (n, t) {
                    var r = []; if (!n || !n.length) return r; var e = -1, u = [], i = n.length; for (t = ye(t, 3); ++e < i;) {
                        var o = n[e]; t(o, e, n) && (r.push(o),
                            u.push(e))
                    } return ur(n, u), r
                }, An.rest = function (n, t) { if (typeof n != "function") throw new ti("Expected a function"); return t = t === T ? t : ku(t), fr(n, t) }, An.reverse = Ge, An.sampleSize = function (n, t, r) { return t = (r ? Oe(n, t, r) : t === T) ? 1 : ku(t), (ff(n) ? et : ar)(n, t) }, An.set = function (n, t, r) { return null == n ? n : lr(n, t, r) }, An.setWith = function (n, t, r, e) { return e = typeof e == "function" ? e : T, null == n ? n : lr(n, t, r, e) }, An.shuffle = function (n) { return (ff(n) ? ut : sr)(n) }, An.slice = function (n, t, r) {
                    var e = null == n ? 0 : n.length; return e ? (r && typeof r != "number" && Oe(n, t, r) ? (t = 0,
                        r = e) : (t = null == t ? 0 : ku(t), r = r === T ? e : ku(r)), hr(n, t, r)) : []
                }, An.sortBy = Ko, An.sortedUniq = function (n) { return n && n.length ? gr(n) : [] }, An.sortedUniqBy = function (n, t) { return n && n.length ? gr(n, ye(t, 2)) : [] }, An.split = function (n, t, r) { return r && typeof r != "number" && Oe(n, t, r) && (t = r = T), r = r === T ? 4294967295 : r >>> 0, r ? (n = Iu(n)) && (typeof t == "string" || null != t && !hf(t)) && (t = yr(t), !t && Rn.test(n)) ? Or(M(n), 0, r) : n.split(t, r) : [] }, An.spread = function (t, r) {
                    if (typeof t != "function") throw new ti("Expected a function"); return r = null == r ? 0 : Li(ku(r), 0),
                        fr(function (e) { var u = e[r]; return e = Or(e, 0, r), u && a(e, u), n(t, this, e) })
                }, An.tail = function (n) { var t = null == n ? 0 : n.length; return t ? hr(n, 1, t) : [] }, An.take = function (n, t, r) { return n && n.length ? (t = r || t === T ? 1 : ku(t), hr(n, 0, 0 > t ? 0 : t)) : [] }, An.takeRight = function (n, t, r) { var e = null == n ? 0 : n.length; return e ? (t = r || t === T ? 1 : ku(t), t = e - t, hr(n, 0 > t ? 0 : t, e)) : [] }, An.takeRightWhile = function (n, t) { return n && n.length ? jr(n, ye(t, 3), false, true) : [] }, An.takeWhile = function (n, t) { return n && n.length ? jr(n, ye(t, 3)) : [] }, An.tap = function (n, t) {
                    return t(n),
                        n
                }, An.throttle = function (n, t, r) { var e = true, u = true; if (typeof n != "function") throw new ti("Expected a function"); return du(r) && (e = "leading" in r ? !!r.leading : e, u = "trailing" in r ? !!r.trailing : u), fu(n, t, { leading: e, maxWait: t, trailing: u }) }, An.thru = Qe, An.toArray = mu, An.toPairs = zf, An.toPairsIn = Wf, An.toPath = function (n) { return ff(n) ? c(n, Me) : wu(n) ? [n] : Lr(jo(Iu(n))) }, An.toPlainObject = Ou, An.transform = function (n, t, e) {
                    var u = ff(n), i = u || af(n) || _f(n); if (t = ye(t, 4), null == e) {
                        var o = n && n.constructor; e = i ? u ? new o : [] : du(n) && _u(o) ? eo(di(n)) : {};
                    } return (i ? r : mt)(n, function (n, r, u) { return t(e, n, r, u) }), e
                }, An.unary = function (n) { return eu(n, 1) }, An.union = Ro, An.unionBy = zo, An.unionWith = Wo, An.uniq = function (n) { return n && n.length ? br(n) : [] }, An.uniqBy = function (n, t) { return n && n.length ? br(n, ye(t, 2)) : [] }, An.uniqWith = function (n, t) { return t = typeof t == "function" ? t : T, n && n.length ? br(n, T, t) : [] }, An.unset = function (n, t) { return null == n || xr(n, t) }, An.unzip = He, An.unzipWith = Je, An.update = function (n, t, r) { return null != n && (r = Er(r), n = lr(n, t, r(Et(n, t)), void 0)), n }, An.updateWith = function (n, t, r, e) {
                    return e = typeof e == "function" ? e : T, null != n && (r = Er(r), n = lr(n, t, r(Et(n, t)), e)), n
                }, An.values = Lu, An.valuesIn = function (n) { return null == n ? [] : S(n, Uu(n)) }, An.without = Uo, An.words = Mu, An.wrap = function (n, t) { return nf(Er(t), n) }, An.xor = Bo, An.xorBy = Lo, An.xorWith = Co, An.zip = Do, An.zipObject = function (n, t) { return Ar(n || [], t || [], ot) }, An.zipObjectDeep = function (n, t) { return Ar(n || [], t || [], lr) }, An.zipWith = Mo, An.entries = zf, An.entriesIn = Wf, An.extend = yf, An.extendWith = bf, Nu(An, An), An.add = Qf, An.attempt = Ff, An.camelCase = Uf, An.capitalize = Cu,
                An.ceil = Xf, An.clamp = function (n, t, r) { return r === T && (r = t, t = T), r !== T && (r = Su(r), r = r === r ? r : 0), t !== T && (t = Su(t), t = t === t ? t : 0), pt(Su(n), t, r) }, An.clone = function (n) { return _t(n, 4) }, An.cloneDeep = function (n) { return _t(n, 5) }, An.cloneDeepWith = function (n, t) { return t = typeof t == "function" ? t : T, _t(n, 5, t) }, An.cloneWith = function (n, t) { return t = typeof t == "function" ? t : T, _t(n, 4, t) }, An.conformsTo = function (n, t) { return null == t || gt(n, t, Wu(t)) }, An.deburr = Du, An.defaultTo = function (n, t) { return null == n || n !== n ? t : n }, An.divide = nc, An.endsWith = function (n, t, r) {
                    n = Iu(n), t = yr(t); var e = n.length, e = r = r === T ? e : pt(ku(r), 0, e); return r -= t.length, 0 <= r && n.slice(r, e) == t
                }, An.eq = lu, An.escape = function (n) { return (n = Iu(n)) && H.test(n) ? n.replace(K, nt) : n }, An.escapeRegExp = function (n) { return (n = Iu(n)) && en.test(n) ? n.replace(rn, "\\$$&") : n }, An.every = function (n, t, r) { var e = ff(n) ? u : bt; return r && Oe(n, t, r) && (t = T), e(n, ye(t, 3)) }, An.find = Fo, An.findIndex = Ne, An.findKey = function (n, t) { return p(n, ye(t, 3), mt) }, An.findLast = No, An.findLastIndex = Pe, An.findLastKey = function (n, t) {
                    return p(n, ye(t, 3), At);
                }, An.floor = tc, An.forEach = nu, An.forEachRight = tu, An.forIn = function (n, t) { return null == n ? n : oo(n, ye(t, 3), Uu) }, An.forInRight = function (n, t) { return null == n ? n : fo(n, ye(t, 3), Uu) }, An.forOwn = function (n, t) { return n && mt(n, ye(t, 3)) }, An.forOwnRight = function (n, t) { return n && At(n, ye(t, 3)) }, An.get = Ru, An.gt = ef, An.gte = uf, An.has = function (n, t) { return null != n && we(n, t, Rt) }, An.hasIn = zu, An.head = qe, An.identity = $$u, An.includes = function (n, t, r, e) {
                    return n = su(n) ? n : Lu(n), r = r && !e ? ku(r) : 0, e = n.length, 0 > r && (r = Li(e + r, 0)), ju(n) ? r <= e && -1 < n.indexOf(t, r) : !!e && -1 < v(n, t, r);
                }, An.indexOf = function (n, t, r) { var e = null == n ? 0 : n.length; return e ? (r = null == r ? 0 : ku(r), 0 > r && (r = Li(e + r, 0)), v(n, t, r)) : -1 }, An.inRange = function (n, t, r) { return t = Au(t), r === T ? (r = t, t = 0) : r = Au(r), n = Su(n), n >= Ci(t, r) && n < Li(t, r) }, An.invoke = Ef, An.isArguments = of, An.isArray = ff, An.isArrayBuffer = cf, An.isArrayLike = su, An.isArrayLikeObject = hu, An.isBoolean = function (n) { return true === n || false === n || yu(n) && "[object Boolean]" == Ot(n) }, An.isBuffer = af, An.isDate = lf, An.isElement = function (n) { return yu(n) && 1 === n.nodeType && !xu(n) }, An.isEmpty = function (n) {
                    if (null == n) return true; if (su(n) && (ff(n) || typeof n == "string" || typeof n.splice == "function" || af(n) || _f(n) || of(n))) return !n.length; var t = vo(n); if ("[object Map]" == t || "[object Set]" == t) return !n.size; if (ze(n)) return !Vt(n).length; for (var r in n) if (oi.call(n, r)) return false; return true
                }, An.isEqual = function (n, t) { return Mt(n, t) }, An.isEqualWith = function (n, t, r) { var e = (r = typeof r == "function" ? r : T) ? r(n, t) : T; return e === T ? Mt(n, t, T, r) : !!e }, An.isError = pu, An.isFinite = function (n) { return typeof n == "number" && Wi(n) }, An.isFunction = _u,
                An.isInteger = vu, An.isLength = gu, An.isMap = sf, An.isMatch = function (n, t) { return n === t || $$t(n, t, xe(t)) }, An.isMatchWith = function (n, t, r) { return r = typeof r == "function" ? r : T, $$t(n, t, xe(t), r) }, An.isNaN = function (n) { return bu(n) && n != +n }, An.isNative = function (n) { if (go(n)) throw new Hu("Unsupported core-js use. Try https://npms.io/search?q=ponyfill."); return Ft(n) }, An.isNil = function (n) { return null == n }, An.isNull = function (n) { return null === n }, An.isNumber = bu, An.isObject = du, An.isObjectLike = yu, An.isPlainObject = xu, An.isRegExp = hf,
                An.isSafeInteger = function (n) { return vu(n) && -9007199254740991 <= n && 9007199254740991 >= n }, An.isSet = pf, An.isString = ju, An.isSymbol = wu, An.isTypedArray = _f, An.isUndefined = function (n) { return n === T }, An.isWeakMap = function (n) { return yu(n) && "[object WeakMap]" == vo(n) }, An.isWeakSet = function (n) { return yu(n) && "[object WeakSet]" == Ot(n) }, An.join = function (n, t) { return null == n ? "" : Ui.call(n, t) }, An.kebabCase = Bf, An.last = Ve, An.lastIndexOf = function (n, t, r) {
                    var e = null == n ? 0 : n.length; if (!e) return -1; var u = e; if (r !== T && (u = ku(r), u = 0 > u ? Li(e + u, 0) : Ci(u, e - 1)),
                        t === t) n: { for (r = u + 1; r--;)if (n[r] === t) { n = r; break n } n = r } else n = _(n, d, u, true); return n
                }, An.lowerCase = Lf, An.lowerFirst = Cf, An.lt = vf, An.lte = gf, An.max = function (n) { return n && n.length ? xt(n, $$u, It) : T }, An.maxBy = function (n, t) { return n && n.length ? xt(n, ye(t, 2), It) : T }, An.mean = function (n) { return y(n, $$u) }, An.meanBy = function (n, t) { return y(n, ye(t, 2)) }, An.min = function (n) { return n && n.length ? xt(n, $$u, Kt) : T }, An.minBy = function (n, t) { return n && n.length ? xt(n, ye(t, 2), Kt) : T }, An.stubArray = qu, An.stubFalse = Vu, An.stubObject = function () {
                    return {}
                }, An.stubString = function () { return "" }, An.stubTrue = function () { return true }, An.multiply = rc, An.nth = function (n, t) { return n && n.length ? Qt(n, ku(t)) : T }, An.noConflict = function () { return $$n._ === this && ($$n._ = si), this }, An.noop = Pu, An.now = Go, An.pad = function (n, t, r) { n = Iu(n); var e = (t = ku(t)) ? D(n) : 0; return !t || e >= t ? n : (t = (t - e) / 2, ne(Ii(t), r) + n + ne(Oi(t), r)) }, An.padEnd = function (n, t, r) { n = Iu(n); var e = (t = ku(t)) ? D(n) : 0; return t && e < t ? n + ne(t - e, r) : n }, An.padStart = function (n, t, r) {
                    n = Iu(n); var e = (t = ku(t)) ? D(n) : 0; return t && e < t ? ne(t - e, r) + n : n;
                }, An.parseInt = function (n, t, r) { return r || null == t ? t = 0 : t && (t = +t), Mi(Iu(n).replace(on, ""), t || 0) }, An.random = function (n, t, r) { if (r && typeof r != "boolean" && Oe(n, t, r) && (t = r = T), r === T && (typeof t == "boolean" ? (r = t, t = T) : typeof n == "boolean" && (r = n, n = T)), n === T && t === T ? (n = 0, t = 1) : (n = Au(n), t === T ? (t = n, n = 0) : t = Au(t)), n > t) { var e = n; n = t, t = e } return r || n % 1 || t % 1 ? (r = Ti(), Ci(n + r * (t - n + Cn("1e-" + ((r + "").length - 1))), t)) : ir(n, t) }, An.reduce = function (n, t, r) { var e = ff(n) ? l : j, u = 3 > arguments.length; return e(n, ye(t, 4), r, u, uo) }, An.reduceRight = function (n, t, r) {
                    var e = ff(n) ? s : j, u = 3 > arguments.length; return e(n, ye(t, 4), r, u, io)
                }, An.repeat = function (n, t, r) { return t = (r ? Oe(n, t, r) : t === T) ? 1 : ku(t), or(Iu(n), t) }, An.replace = function () { var n = arguments, t = Iu(n[0]); return 3 > n.length ? t : t.replace(n[1], n[2]) }, An.result = function (n, t, r) { t = Sr(t, n); var e = -1, u = t.length; for (u || (u = 1, n = T); ++e < u;) { var i = null == n ? T : n[Me(t[e])]; i === T && (e = u, i = r), n = _u(i) ? i.call(n) : i } return n }, An.round = ec, An.runInContext = x, An.sample = function (n) { return (ff(n) ? Qn : cr)(n) }, An.size = function (n) {
                    if (null == n) return 0;
                    if (su(n)) return ju(n) ? D(n) : n.length; var t = vo(n); return "[object Map]" == t || "[object Set]" == t ? n.size : Vt(n).length
                }, An.snakeCase = Df, An.some = function (n, t, r) { var e = ff(n) ? h : pr; return r && Oe(n, t, r) && (t = T), e(n, ye(t, 3)) }, An.sortedIndex = function (n, t) { return _r(n, t) }, An.sortedIndexBy = function (n, t, r) { return vr(n, t, ye(r, 2)) }, An.sortedIndexOf = function (n, t) { var r = null == n ? 0 : n.length; if (r) { var e = _r(n, t); if (e < r && lu(n[e], t)) return e } return -1 }, An.sortedLastIndex = function (n, t) { return _r(n, t, true) }, An.sortedLastIndexBy = function (n, t, r) {
                    return vr(n, t, ye(r, 2), true)
                }, An.sortedLastIndexOf = function (n, t) { if (null == n ? 0 : n.length) { var r = _r(n, t, true) - 1; if (lu(n[r], t)) return r } return -1 }, An.startCase = Mf, An.startsWith = function (n, t, r) { return n = Iu(n), r = null == r ? 0 : pt(ku(r), 0, n.length), t = yr(t), n.slice(r, r + t.length) == t }, An.subtract = uc, An.sum = function (n) { return n && n.length ? m(n, $$u) : 0 }, An.sumBy = function (n, t) { return n && n.length ? m(n, ye(t, 2)) : 0 }, An.template = function (n, t, r) {
                    var e = An.templateSettings; r && Oe(n, t, r) && (t = T), n = Iu(n), t = bf({}, t, e, ce), r = bf({}, t.imports, e.imports, ce);
                    var u, i, o = Wu(r), f = S(r, o), c = 0; r = t.interpolate || jn; var a = "__p+='"; r = Xu((t.escape || jn).source + "|" + r.source + "|" + (r === Q ? pn : jn).source + "|" + (t.evaluate || jn).source + "|$$", "g"); var l = "sourceURL" in t ? "//# sourceURL=" + t.sourceURL + "\n" : ""; if (n.replace(r, function (t, r, e, o, f, l) { return e || (e = o), a += n.slice(c, l).replace(wn, z), r && (u = true, a += "'+__e(" + r + ")+'"), f && (i = true, a += "';" + f + ";\n__p+='"), e && (a += "'+((__t=(" + e + "))==null?'':__t)+'"), c = l + t.length, t }), a += "';", (t = t.variable) || (a = "with(obj){" + a + "}"), a = (i ? a.replace(P, "") : a).replace(Z, "$$1").replace(q, "$$1;"),
                        a = "function(" + (t || "obj") + "){" + (t ? "" : "obj||(obj={});") + "var __t,__p=''" + (u ? ",__e=_.escape" : "") + (i ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + a + "return __p}", t = Ff(function () { return Ju(o, l + "return " + a).apply(T, f) }), t.source = a, pu(t)) throw t; return t
                }, An.times = function (n, t) { if (n = ku(n), 1 > n || 9007199254740991 < n) return []; var r = 4294967295, e = Ci(n, 4294967295); for (t = ye(t), n -= 4294967295, e = A(e, t); ++r < n;)t(r); return e }, An.toFinite = Au, An.toInteger = ku, An.toLength = Eu, An.toLower = function (n) {
                    return Iu(n).toLowerCase()
                }, An.toNumber = Su, An.toSafeInteger = function (n) { return n ? pt(ku(n), -9007199254740991, 9007199254740991) : 0 === n ? n : 0 }, An.toString = Iu, An.toUpper = function (n) { return Iu(n).toUpperCase() }, An.trim = function (n, t, r) { return (n = Iu(n)) && (r || t === T) ? n.replace(un, "") : n && (t = yr(t)) ? (n = M(n), r = M(t), t = I(n, r), r = R(n, r) + 1, Or(n, t, r).join("")) : n }, An.trimEnd = function (n, t, r) { return (n = Iu(n)) && (r || t === T) ? n.replace(fn, "") : n && (t = yr(t)) ? (n = M(n), t = R(n, M(t)) + 1, Or(n, 0, t).join("")) : n }, An.trimStart = function (n, t, r) {
                    return (n = Iu(n)) && (r || t === T) ? n.replace(on, "") : n && (t = yr(t)) ? (n = M(n), t = I(n, M(t)), Or(n, t).join("")) : n
                }, An.truncate = function (n, t) {
                    var r = 30, e = "..."; if (du(t)) var u = "separator" in t ? t.separator : u, r = "length" in t ? ku(t.length) : r, e = "omission" in t ? yr(t.omission) : e; n = Iu(n); var i = n.length; if (Rn.test(n)) var o = M(n), i = o.length; if (r >= i) return n; if (i = r - D(e), 1 > i) return e; if (r = o ? Or(o, 0, i).join("") : n.slice(0, i), u === T) return r + e; if (o && (i += r.length - i), hf(u)) {
                        if (n.slice(i).search(u)) {
                            var f = r; for (u.global || (u = Xu(u.source, Iu(_n.exec(u)) + "g")),
                                u.lastIndex = 0; o = u.exec(f);)var c = o.index; r = r.slice(0, c === T ? i : c)
                        }
                    } else n.indexOf(yr(u), i) != i && (u = r.lastIndexOf(u), -1 < u && (r = r.slice(0, u))); return r + e
                }, An.unescape = function (n) { return (n = Iu(n)) && G.test(n) ? n.replace(V, tt) : n }, An.uniqueId = function (n) { var t = ++fi; return Iu(n) + t }, An.upperCase = Tf, An.upperFirst = $$f, An.each = nu, An.eachRight = tu, An.first = qe, Nu(An, function () { var n = {}; return mt(An, function (t, r) { oi.call(An.prototype, r) || (n[r] = t) }), n }(), { chain: false }), An.VERSION = "4.17.11", r("bind bindKey curry curryRight partial partialRight".split(" "), function (n) {
                    An[n].placeholder = An
                }), r(["drop", "take"], function (n, t) { Ln.prototype[n] = function (r) { r = r === T ? 1 : Li(ku(r), 0); var e = this.__filtered__ && !t ? new Ln(this) : this.clone(); return e.__filtered__ ? e.__takeCount__ = Ci(r, e.__takeCount__) : e.__views__.push({ size: Ci(r, 4294967295), type: n + (0 > e.__dir__ ? "Right" : "") }), e }, Ln.prototype[n + "Right"] = function (t) { return this.reverse()[n](t).reverse() } }), r(["filter", "map", "takeWhile"], function (n, t) {
                    var r = t + 1, e = 1 == r || 3 == r; Ln.prototype[n] = function (n) {
                        var t = this.clone(); return t.__iteratees__.push({
                            iteratee: ye(n, 3), type: r
                        }), t.__filtered__ = t.__filtered__ || e, t
                    }
                }), r(["head", "last"], function (n, t) { var r = "take" + (t ? "Right" : ""); Ln.prototype[n] = function () { return this[r](1).value()[0] } }), r(["initial", "tail"], function (n, t) { var r = "drop" + (t ? "" : "Right"); Ln.prototype[n] = function () { return this.__filtered__ ? new Ln(this) : this[r](1) } }), Ln.prototype.compact = function () { return this.filter($$u) }, Ln.prototype.find = function (n) { return this.filter(n).head() }, Ln.prototype.findLast = function (n) {
                    return this.reverse().find(n);
                }, Ln.prototype.invokeMap = fr(function (n, t) { return typeof n == "function" ? new Ln(this) : this.map(function (r) { return Bt(r, n, t) }) }), Ln.prototype.reject = function (n) { return this.filter(au(ye(n))) }, Ln.prototype.slice = function (n, t) { n = ku(n); var r = this; return r.__filtered__ && (0 < n || 0 > t) ? new Ln(r) : (0 > n ? r = r.takeRight(-n) : n && (r = r.drop(n)), t !== T && (t = ku(t), r = 0 > t ? r.dropRight(-t) : r.take(t - n)), r) }, Ln.prototype.takeRightWhile = function (n) { return this.reverse().takeWhile(n).reverse() }, Ln.prototype.toArray = function () {
                    return this.take(4294967295);
                }, mt(Ln.prototype, function (n, t) {
                    var r = /^(?:filter|find|map|reject)|While$$/.test(t), e = /^(?:head|last)$$/.test(t), u = An[e ? "take" + ("last" == t ? "Right" : "") : t], i = e || /^find/.test(t); u && (An.prototype[t] = function () {
                        var t = this.__wrapped__, o = e ? [1] : arguments, f = t instanceof Ln, c = o[0], l = f || ff(t), s = function (n) { return n = u.apply(An, a([n], o)), e && h ? n[0] : n }; l && r && typeof c == "function" && 1 != c.length && (f = l = false); var h = this.__chain__, p = !!this.__actions__.length, c = i && !h, f = f && !p; return !i && l ? (t = f ? t : new Ln(this), t = n.apply(t, o), t.__actions__.push({
                            func: Qe, args: [s], thisArg: T
                        }), new On(t, h)) : c && f ? n.apply(this, o) : (t = this.thru(s), c ? e ? t.value()[0] : t.value() : t)
                    })
                }), r("pop push shift sort splice unshift".split(" "), function (n) { var t = ri[n], r = /^(?:push|sort|unshift)$$/.test(n) ? "tap" : "thru", e = /^(?:pop|shift)$$/.test(n); An.prototype[n] = function () { var n = arguments; if (e && !this.__chain__) { var u = this.value(); return t.apply(ff(u) ? u : [], n) } return this[r](function (r) { return t.apply(ff(r) ? r : [], n) }) } }), mt(Ln.prototype, function (n, t) {
                    var r = An[t]; if (r) {
                        var e = r.name + "";
                        (Gi[e] || (Gi[e] = [])).push({ name: t, func: r })
                    }
                }), Gi[Jr(T, 2).name] = [{ name: "wrapper", func: T }], Ln.prototype.clone = function () { var n = new Ln(this.__wrapped__); return n.__actions__ = Lr(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = Lr(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = Lr(this.__views__), n }, Ln.prototype.reverse = function () {
                    if (this.__filtered__) { var n = new Ln(this); n.__dir__ = -1, n.__filtered__ = true } else n = this.clone(), n.__dir__ *= -1; return n;
                }, Ln.prototype.value = function () {
                    var n, t = this.__wrapped__.value(), r = this.__dir__, e = ff(t), u = 0 > r, i = e ? t.length : 0; n = 0; for (var o = i, f = this.__views__, c = -1, a = f.length; ++c < a;) { var l = f[c], s = l.size; switch (l.type) { case "drop": n += s; break; case "dropRight": o -= s; break; case "take": o = Ci(o, n + s); break; case "takeRight": n = Li(n, o - s) } } if (n = { start: n, end: o }, o = n.start, f = n.end, n = f - o, o = u ? f : o - 1, f = this.__iteratees__, c = f.length, a = 0, l = Ci(n, this.__takeCount__), !e || !u && i == n && l == n) return wr(t, this.__actions__); e = []; n: for (; n-- && a < l;) {
                        for (o += r,
                            u = -1, i = t[o]; ++u < c;) { var h = f[u], s = h.type, h = (0, h.iteratee)(i); if (2 == s) i = h; else if (!h) { if (1 == s) continue n; break n } } e[a++] = i
                    } return e
                }, An.prototype.at = To, An.prototype.chain = function () { return Ye(this) }, An.prototype.commit = function () { return new On(this.value(), this.__chain__) }, An.prototype.next = function () { this.__values__ === T && (this.__values__ = mu(this.value())); var n = this.__index__ >= this.__values__.length; return { done: n, value: n ? T : this.__values__[this.__index__++] } }, An.prototype.plant = function (n) {
                    for (var t, r = this; r instanceof kn;) {
                        var e = Fe(r); e.__index__ = 0, e.__values__ = T, t ? u.__wrapped__ = e : t = e; var u = e, r = r.__wrapped__
                    } return u.__wrapped__ = n, t
                }, An.prototype.reverse = function () { var n = this.__wrapped__; return n instanceof Ln ? (this.__actions__.length && (n = new Ln(this)), n = n.reverse(), n.__actions__.push({ func: Qe, args: [Ge], thisArg: T }), new On(n, this.__chain__)) : this.thru(Ge) }, An.prototype.toJSON = An.prototype.valueOf = An.prototype.value = function () { return wr(this.__wrapped__, this.__actions__) }, An.prototype.first = An.prototype.head, wi && (An.prototype[wi] = Xe),
                An
        }(); typeof define == "function" && typeof define.amd == "object" && define.amd ? ($$n._ = rt, define(function () { return rt })) : Nn ? ((Nn.exports = rt)._ = rt, Fn._ = rt) : $$n._ = rt
}).call(this);
/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function (t, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Macy = n() }(this, function () { "use strict"; function t(t, n) { var e = void 0; return function () { e && clearTimeout(e), e = setTimeout(t, n) } } function n(t, n) { for (var e = t.length, r = e, o = []; e--;)o.push(n(t[r - e - 1])); return o } function e(t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; if (window.Promise) return A(t, n, e); t.recalculate(!0, !0) } function r(t) { for (var n = t.options, e = t.responsiveOptions, r = t.keys, o = t.docWidth, i = void 0, s = 0; s < r.length; s++) { var a = parseInt(r[s], 10); o >= a && (i = n.breakAt[a], O(i, e)) } return e } function o(t) { for (var n = t.options, e = t.responsiveOptions, r = t.keys, o = t.docWidth, i = void 0, s = r.length - 1; s >= 0; s--) { var a = parseInt(r[s], 10); o <= a && (i = n.breakAt[a], O(i, e)) } return e } function i(t) { var n = t.useContainerForBreakpoints ? t.container.clientWidth : window.innerWidth, e = { columns: t.columns }; b(t.margin) ? e.margin = { x: t.margin.x, y: t.margin.y } : e.margin = { x: t.margin, y: t.margin }; var i = Object.keys(t.breakAt); return t.mobileFirst ? r({ options: t, responsiveOptions: e, keys: i, docWidth: n }) : o({ options: t, responsiveOptions: e, keys: i, docWidth: n }) } function s(t) { return i(t).columns } function a(t) { return i(t).margin } function c(t) { var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], e = s(t), r = a(t).x, o = 100 / e; if (!n) return o; if (1 === e) return "100%"; var i = "px"; if ("string" == typeof r) { var c = parseFloat(r); i = r.replace(c, ""), r = c } return r = (e - 1) * r / e, "%" === i ? o - r + "%" : "calc(" + o + "% - " + r + i + ")" } function u(t, n) { var e = s(t.options), r = 0, o = void 0, i = void 0; if (1 === ++n) return 0; i = a(t.options).x; var u = "px"; if ("string" == typeof i) { var l = parseFloat(i, 10); u = i.replace(l, ""), i = l } return o = (i - (e - 1) * i / e) * (n - 1), r += c(t.options, !1) * (n - 1), "%" === u ? r + o + "%" : "calc(" + r + "% + " + o + u + ")" } function l(t) { var n = 0, e = t.container, r = t.rows; v(r, function (t) { n = t > n ? t : n }), e.style.height = n + "px" } function p(t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], o = s(t.options), i = a(t.options).y; M(t, o, e), v(n, function (n) { var e = 0, o = parseInt(n.offsetHeight, 10); isNaN(o) || (t.rows.forEach(function (n, r) { n < t.rows[e] && (e = r) }), n.style.position = "absolute", n.style.top = t.rows[e] + "px", n.style.left = "" + t.cols[e], t.rows[e] += isNaN(o) ? 0 : o + i, r && (n.dataset.macyComplete = 1)) }), r && (t.tmpRows = null), l(t) } function f(t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], o = s(t.options), i = a(t.options).y; M(t, o, e), v(n, function (n) { t.lastcol === o && (t.lastcol = 0); var e = C(n, "height"); e = parseInt(n.offsetHeight, 10), isNaN(e) || (n.style.position = "absolute", n.style.top = t.rows[t.lastcol] + "px", n.style.left = "" + t.cols[t.lastcol], t.rows[t.lastcol] += isNaN(e) ? 0 : e + i, t.lastcol += 1, r && (n.dataset.macyComplete = 1)) }), r && (t.tmpRows = null), l(t) } var h = function t(n, e) { if (!(this instanceof t)) return new t(n, e); if (n && n.nodeName) return n; if (n = n.replace(/^\s*/, "").replace(/\s*$$/, ""), e) return this.byCss(n, e); for (var r in this.selectors) if (e = r.split("/"), new RegExp(e[1], e[2]).test(n)) return this.selectors[r](n); return this.byCss(n) }; h.prototype.byCss = function (t, n) { return (n || document).querySelectorAll(t) }, h.prototype.selectors = {}, h.prototype.selectors[/^\.[\w\-]+$$/] = function (t) { return document.getElementsByClassName(t.substring(1)) }, h.prototype.selectors[/^\w+$$/] = function (t) { return document.getElementsByTagName(t) }, h.prototype.selectors[/^\#[\w\-]+$$/] = function (t) { return document.getElementById(t.substring(1)) }; var v = function (t, n) { for (var e = t.length, r = e; e--;)n(t[r - e - 1]) }, m = function () { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; this.running = !1, this.events = [], this.add(t) }; m.prototype.run = function () { if (!this.running && this.events.length > 0) { var t = this.events.shift(); this.running = !0, t(), this.running = !1, this.run() } }, m.prototype.add = function () { var t = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; return !!n && (Array.isArray(n) ? v(n, function (n) { return t.add(n) }) : (this.events.push(n), void this.run())) }, m.prototype.clear = function () { this.events = [] }; var d = function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return this.instance = t, this.data = n, this }, y = function () { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; this.events = {}, this.instance = t }; y.prototype.on = function () { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; return !(!t || !n) && (Array.isArray(this.events[t]) || (this.events[t] = []), this.events[t].push(n)) }, y.prototype.emit = function () { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; if (!t || !Array.isArray(this.events[t])) return !1; var e = new d(this.instance, n); v(this.events[t], function (t) { return t(e) }) }; var g = function (t) { return !("naturalHeight" in t && t.naturalHeight + t.naturalWidth === 0) || t.width + t.height !== 0 }, E = function (t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; return new Promise(function (t, e) { if (n.complete) return g(n) ? t(n) : e(n); n.addEventListener("load", function () { return g(n) ? t(n) : e(n) }), n.addEventListener("error", function () { return e(n) }) }).then(function (n) { e && t.emit(t.constants.EVENT_IMAGE_LOAD, { img: n }) }).catch(function (n) { return t.emit(t.constants.EVENT_IMAGE_ERROR, { img: n }) }) }, w = function (t, e) { var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; return n(e, function (n) { return E(t, n, r) }) }, A = function (t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; return Promise.all(w(t, n, e)).then(function () { t.emit(t.constants.EVENT_IMAGE_COMPLETE) }) }, I = function (n) { return t(function () { n.emit(n.constants.EVENT_RESIZE), n.queue.add(function () { return n.recalculate(!0, !0) }) }, 100) }, N = function (t) { if (t.container = h(t.options.container), t.container instanceof h || !t.container) return !!t.options.debug && console.error("Error: Container not found"); t.container.length && (t.container = t.container[0]), t.options.container = t.container, t.container.style.position = "relative" }, T = function (t) { t.queue = new m, t.events = new y(t), t.rows = [], t.resizer = I(t) }, L = function (t) { var n = h("img", t.container); window.addEventListener("resize", t.resizer), t.on(t.constants.EVENT_IMAGE_LOAD, function () { return t.recalculate(!1, !1) }), t.on(t.constants.EVENT_IMAGE_COMPLETE, function () { return t.recalculate(!0, !0) }), t.options.useOwnImageLoader || e(t, n, !t.options.waitForImages), t.emit(t.constants.EVENT_INITIALIZED) }, _ = function (t) { N(t), T(t), L(t) }, b = function (t) { return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t) }, O = function (t, n) { b(t) || (n.columns = t), b(t) && t.columns && (n.columns = t.columns), b(t) && t.margin && !b(t.margin) && (n.margin = { x: t.margin, y: t.margin }), b(t) && t.margin && b(t.margin) && t.margin.x && (n.margin.x = t.margin.x), b(t) && t.margin && b(t.margin) && t.margin.y && (n.margin.y = t.margin.y) }, C = function (t, n) { return window.getComputedStyle(t, null).getPropertyValue(n) }, M = function (t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; if (t.lastcol || (t.lastcol = 0), t.rows.length < 1 && (e = !0), e) { t.rows = [], t.cols = [], t.lastcol = 0; for (var r = n - 1; r >= 0; r--)t.rows[r] = 0, t.cols[r] = u(t, r) } else if (t.tmpRows) { t.rows = []; for (var r = n - 1; r >= 0; r--)t.rows[r] = t.tmpRows[r] } else { t.tmpRows = []; for (var r = n - 1; r >= 0; r--)t.tmpRows[r] = t.rows[r] } }, V = function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], r = n ? t.container.children : h(':scope > *:not([data-macy-complete="1"])', t.container); r = Array.from(r).filter(function (t) { return null !== t.offsetParent }); var o = c(t.options); return v(r, function (t) { n && (t.dataset.macyComplete = 0), t.style.width = o }), t.options.trueOrder ? (f(t, r, n, e), t.emit(t.constants.EVENT_RECALCULATED)) : (p(t, r, n, e), t.emit(t.constants.EVENT_RECALCULATED)) }, R = function () { return !!window.Promise }, x = Object.assign || function (t) { for (var n = 1; n < arguments.length; n++) { var e = arguments[n]; for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]) } return t }; Array.from || (Array.from = function (t) { for (var n = 0, e = []; n < t.length;)e.push(t[n++]); return e }); var k = { columns: 4, margin: 2, trueOrder: !1, waitForImages: !1, useImageLoader: !0, breakAt: {}, useOwnImageLoader: !1, onInit: !1, cancelLegacy: !1, useContainerForBreakpoints: !1 }; !function () { try { document.createElement("a").querySelector(":scope *") } catch (t) { !function () { function t(t) { return function (e) { if (e && n.test(e)) { var r = this.getAttribute("id"); r || (this.id = "q" + Math.floor(9e6 * Math.random()) + 1e6), arguments[0] = e.replace(n, "#" + this.id); var o = t.apply(this, arguments); return null === r ? this.removeAttribute("id") : r || (this.id = r), o } return t.apply(this, arguments) } } var n = /:scope\b/gi, e = t(Element.prototype.querySelector); Element.prototype.querySelector = function (t) { return e.apply(this, arguments) }; var r = t(Element.prototype.querySelectorAll); Element.prototype.querySelectorAll = function (t) { return r.apply(this, arguments) } }() } }(); var q = function t() { var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : k; if (!(this instanceof t)) return new t(n); this.options = {}, x(this.options, k, n), this.options.cancelLegacy && !R() || _(this) }; return q.init = function (t) { return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new q(t) }, q.prototype.recalculateOnImageLoad = function () { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; return e(this, h("img", this.container), !t) }, q.prototype.runOnImageLoad = function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = h("img", this.container); return this.on(this.constants.EVENT_IMAGE_COMPLETE, t), n && this.on(this.constants.EVENT_IMAGE_LOAD, t), e(this, r, n) }, q.prototype.recalculate = function () { var t = this, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]; return e && this.queue.clear(), this.queue.add(function () { return V(t, n, e) }) }, q.prototype.remove = function () { window.removeEventListener("resize", this.resizer), v(this.container.children, function (t) { t.removeAttribute("data-macy-complete"), t.removeAttribute("style") }), this.container.removeAttribute("style") }, q.prototype.reInit = function () { this.recalculate(!0, !0), this.emit(this.constants.EVENT_INITIALIZED), window.addEventListener("resize", this.resizer), this.container.style.position = "relative" }, q.prototype.on = function (t, n) { this.events.on(t, n) }, q.prototype.emit = function (t, n) { this.events.emit(t, n) }, q.constants = { EVENT_INITIALIZED: "macy.initialized", EVENT_RECALCULATED: "macy.recalculated", EVENT_IMAGE_LOAD: "macy.image.load", EVENT_IMAGE_ERROR: "macy.image.error", EVENT_IMAGE_COMPLETE: "macy.images.complete", EVENT_RESIZE: "macy.resize" }, q.prototype.constants = q.constants, q });

/*! nouislider - 14.6.1 - 8/17/2020 */
!function (t) { "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t() }(function () { "use strict"; var lt = "14.6.1"; function ut(t) { t.parentElement.removeChild(t) } function a(t) { return null != t } function ct(t) { t.preventDefault() } function o(t) { return "number" == typeof t && !isNaN(t) && isFinite(t) } function pt(t, e, r) { 0 < r && (ht(t, e), setTimeout(function () { mt(t, e) }, r)) } function ft(t) { return Math.max(Math.min(t, 100), 0) } function dt(t) { return Array.isArray(t) ? t : [t] } function e(t) { var e = (t = String(t)).split("."); return 1 < e.length ? e[1].length : 0 } function ht(t, e) { t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e } function mt(t, e) { t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$$)", "gi"), " ") } function gt(t) { var e = void 0 !== window.pageXOffset, r = "CSS1Compat" === (t.compatMode || ""); return { x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft, y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop } } function c(t, e) { return 100 / (e - t) } function p(t, e, r) { return 100 * e / (t[r + 1] - t[r]) } function f(t, e) { for (var r = 1; t >= e[r];)r += 1; return r } function r(t, e, r) { if (r >= t.slice(-1)[0]) return 100; var n, i, o = f(r, t), s = t[o - 1], a = t[o], l = e[o - 1], u = e[o]; return l + (i = r, p(n = [s, a], n[0] < 0 ? i + Math.abs(n[0]) : i - n[0], 0) / c(l, u)) } function n(t, e, r, n) { if (100 === n) return n; var i, o, s = f(n, t), a = t[s - 1], l = t[s]; return r ? (l - a) / 2 < n - a ? l : a : e[s - 1] ? t[s - 1] + (i = n - t[s - 1], o = e[s - 1], Math.round(i / o) * o) : n } function s(t, e, r) { var n; if ("number" == typeof e && (e = [e]), !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' contains invalid value."); if (!o(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !o(e[0])) throw new Error("noUiSlider (" + lt + "): 'range' value isn't numeric."); r.xPct.push(n), r.xVal.push(e[0]), n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]), r.xHighestCompleteStep.push(0) } function l(t, e, r) { if (e) if (r.xVal[t] !== r.xVal[t + 1]) { r.xSteps[t] = p([r.xVal[t], r.xVal[t + 1]], e, 0) / c(r.xPct[t], r.xPct[t + 1]); var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t], i = Math.ceil(Number(n.toFixed(3)) - 1), o = r.xVal[t] + r.xNumSteps[t] * i; r.xHighestCompleteStep[t] = o } else r.xSteps[t] = r.xHighestCompleteStep[t] = r.xVal[t] } function i(t, e, r) { var n; this.xPct = [], this.xVal = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = e; var i = []; for (n in t) t.hasOwnProperty(n) && i.push([t[n], n]); for (i.length && "object" == typeof i[0][0] ? i.sort(function (t, e) { return t[0][0] - e[0][0] }) : i.sort(function (t, e) { return t[0] - e[0] }), n = 0; n < i.length; n++)s(i[n][1], i[n][0], this); for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++)l(n, this.xNumSteps[n], this) } i.prototype.getDistance = function (t) { var e, r = []; for (e = 0; e < this.xNumSteps.length - 1; e++) { var n = this.xNumSteps[e]; if (n && t / n % 1 != 0) throw new Error("noUiSlider (" + lt + "): 'limit', 'margin' and 'padding' of " + this.xPct[e] + "% range must be divisible by step."); r[e] = p(this.xVal, t, e) } return r }, i.prototype.getAbsoluteDistance = function (t, e, r) { var n, i = 0; if (t < this.xPct[this.xPct.length - 1]) for (; t > this.xPct[i + 1];)i++; else t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2); r || t !== this.xPct[i + 1] || i++; var o = 1, s = e[i], a = 0, l = 0, u = 0, c = 0; for (n = r ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i]) : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]); 0 < s;)a = this.xPct[i + 1 + c] - this.xPct[i + c], 100 < e[i + c] * o + 100 - 100 * n ? (l = a * n, o = (s - 100 * n) / e[i + c], n = 1) : (l = e[i + c] * a / 100 * o, o = 0), r ? (u -= l, 1 <= this.xPct.length + c && c--) : (u += l, 1 <= this.xPct.length - c && c++), s = e[i + c] * o; return t + u }, i.prototype.toStepping = function (t) { return t = r(this.xVal, this.xPct, t) }, i.prototype.fromStepping = function (t) { return function (t, e, r) { if (100 <= r) return t.slice(-1)[0]; var n, i = f(r, e), o = t[i - 1], s = t[i], a = e[i - 1], l = e[i]; return n = [o, s], (r - a) * c(a, l) * (n[1] - n[0]) / 100 + n[0] }(this.xVal, this.xPct, t) }, i.prototype.getStep = function (t) { return t = n(this.xPct, this.xSteps, this.snap, t) }, i.prototype.getDefaultStep = function (t, e, r) { var n = f(t, this.xPct); return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r }, i.prototype.getNearbySteps = function (t) { var e = f(t, this.xPct); return { stepBefore: { startValue: this.xVal[e - 2], step: this.xNumSteps[e - 2], highestStep: this.xHighestCompleteStep[e - 2] }, thisStep: { startValue: this.xVal[e - 1], step: this.xNumSteps[e - 1], highestStep: this.xHighestCompleteStep[e - 1] }, stepAfter: { startValue: this.xVal[e], step: this.xNumSteps[e], highestStep: this.xHighestCompleteStep[e] } } }, i.prototype.countStepDecimals = function () { var t = this.xNumSteps.map(e); return Math.max.apply(null, t) }, i.prototype.convert = function (t) { return this.getStep(this.toStepping(t)) }; var u = { to: function (t) { return void 0 !== t && t.toFixed(2) }, from: Number }, d = { target: "target", base: "base", origin: "origin", handle: "handle", handleLower: "handle-lower", handleUpper: "handle-upper", touchArea: "touch-area", horizontal: "horizontal", vertical: "vertical", background: "background", connect: "connect", connects: "connects", ltr: "ltr", rtl: "rtl", textDirectionLtr: "txt-dir-ltr", textDirectionRtl: "txt-dir-rtl", draggable: "draggable", drag: "state-drag", tap: "state-tap", active: "active", tooltip: "tooltip", pips: "pips", pipsHorizontal: "pips-horizontal", pipsVertical: "pips-vertical", marker: "marker", markerHorizontal: "marker-horizontal", markerVertical: "marker-vertical", markerNormal: "marker-normal", markerLarge: "marker-large", markerSub: "marker-sub", value: "value", valueHorizontal: "value-horizontal", valueVertical: "value-vertical", valueNormal: "value-normal", valueLarge: "value-large", valueSub: "value-sub" }; function h(t) { if ("object" == typeof (e = t) && "function" == typeof e.to && "function" == typeof e.from) return !0; var e; throw new Error("noUiSlider (" + lt + "): 'format' requires 'to' and 'from' methods.") } function m(t, e) { if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'step' is not numeric."); t.singleStep = e } function g(t, e) { if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'keyboardPageMultiplier' is not numeric."); t.keyboardPageMultiplier = e } function v(t, e) { if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'keyboardDefaultStep' is not numeric."); t.keyboardDefaultStep = e } function b(t, e) { if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'range' is not an object."); if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider (" + lt + "): Missing 'min' or 'max' in 'range'."); if (e.min === e.max) throw new Error("noUiSlider (" + lt + "): 'range' 'min' and 'max' cannot be equal."); t.spectrum = new i(e, t.snap, t.singleStep) } function x(t, e) { if (e = dt(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider (" + lt + "): 'start' option is incorrect."); t.handles = e.length, t.start = e } function S(t, e) { if ("boolean" != typeof (t.snap = e)) throw new Error("noUiSlider (" + lt + "): 'snap' option must be a boolean.") } function w(t, e) { if ("boolean" != typeof (t.animate = e)) throw new Error("noUiSlider (" + lt + "): 'animate' option must be a boolean.") } function y(t, e) { if ("number" != typeof (t.animationDuration = e)) throw new Error("noUiSlider (" + lt + "): 'animationDuration' option must be a number.") } function E(t, e) { var r, n = [!1]; if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) { for (r = 1; r < t.handles; r++)n.push(e); n.push(!1) } else { if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider (" + lt + "): 'connect' option doesn't match handle count."); n = e } t.connect = n } function C(t, e) { switch (e) { case "horizontal": t.ort = 0; break; case "vertical": t.ort = 1; break; default: throw new Error("noUiSlider (" + lt + "): 'orientation' option is invalid.") } } function P(t, e) { if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'margin' option must be numeric."); 0 !== e && (t.margin = t.spectrum.getDistance(e)) } function N(t, e) { if (!o(e)) throw new Error("noUiSlider (" + lt + "): 'limit' option must be numeric."); if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider (" + lt + "): 'limit' option is only supported on linear sliders with 2 or more handles.") } function k(t, e) { var r; if (!o(e) && !Array.isArray(e)) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers."); if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1])) throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers."); if (0 !== e) { for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], r = 0; r < t.spectrum.xNumSteps.length - 1; r++)if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider (" + lt + "): 'padding' option must be a positive number(s)."); var n = e[0] + e[1], i = t.spectrum.xVal[0]; if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i)) throw new Error("noUiSlider (" + lt + "): 'padding' option must not exceed 100% of the range.") } } function U(t, e) { switch (e) { case "ltr": t.dir = 0; break; case "rtl": t.dir = 1; break; default: throw new Error("noUiSlider (" + lt + "): 'direction' option was not recognized.") } } function A(t, e) { if ("string" != typeof e) throw new Error("noUiSlider (" + lt + "): 'behaviour' must be a string containing options."); var r = 0 <= e.indexOf("tap"), n = 0 <= e.indexOf("drag"), i = 0 <= e.indexOf("fixed"), o = 0 <= e.indexOf("snap"), s = 0 <= e.indexOf("hover"), a = 0 <= e.indexOf("unconstrained"); if (i) { if (2 !== t.handles) throw new Error("noUiSlider (" + lt + "): 'fixed' behaviour must be used with 2 handles"); P(t, t.start[1] - t.start[0]) } if (a && (t.margin || t.limit)) throw new Error("noUiSlider (" + lt + "): 'unconstrained' behaviour cannot be used with margin or limit"); t.events = { tap: r || o, drag: n, fixed: i, snap: o, hover: s, unconstrained: a } } function V(t, e) { if (!1 !== e) if (!0 === e) { t.tooltips = []; for (var r = 0; r < t.handles; r++)t.tooltips.push(!0) } else { if (t.tooltips = dt(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider (" + lt + "): must pass a formatter for all handles."); t.tooltips.forEach(function (t) { if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider (" + lt + "): 'tooltips' must be passed a formatter or 'false'.") }) } } function D(t, e) { h(t.ariaFormat = e) } function M(t, e) { h(t.format = e) } function O(t, e) { if ("boolean" != typeof (t.keyboardSupport = e)) throw new Error("noUiSlider (" + lt + "): 'keyboardSupport' option must be a boolean.") } function L(t, e) { t.documentElement = e } function z(t, e) { if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider (" + lt + "): 'cssPrefix' must be a string or `false`."); t.cssPrefix = e } function H(t, e) { if ("object" != typeof e) throw new Error("noUiSlider (" + lt + "): 'cssClasses' must be an object."); if ("string" == typeof t.cssPrefix) for (var r in t.cssClasses = {}, e) e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]); else t.cssClasses = e } function vt(e) { var r = { margin: 0, limit: 0, padding: 0, animate: !0, animationDuration: 300, ariaFormat: u, format: u }, n = { step: { r: !1, t: m }, keyboardPageMultiplier: { r: !1, t: g }, keyboardDefaultStep: { r: !1, t: v }, start: { r: !0, t: x }, connect: { r: !0, t: E }, direction: { r: !0, t: U }, snap: { r: !1, t: S }, animate: { r: !1, t: w }, animationDuration: { r: !1, t: y }, range: { r: !0, t: b }, orientation: { r: !1, t: C }, margin: { r: !1, t: P }, limit: { r: !1, t: N }, padding: { r: !1, t: k }, behaviour: { r: !0, t: A }, ariaFormat: { r: !1, t: D }, format: { r: !1, t: M }, tooltips: { r: !1, t: V }, keyboardSupport: { r: !0, t: O }, documentElement: { r: !1, t: L }, cssPrefix: { r: !0, t: z }, cssClasses: { r: !0, t: H } }, i = { connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal", keyboardSupport: !0, cssPrefix: "noUi-", cssClasses: d, keyboardPageMultiplier: 5, keyboardDefaultStep: 10 }; e.format && !e.ariaFormat && (e.ariaFormat = e.format), Object.keys(n).forEach(function (t) { if (!a(e[t]) && void 0 === i[t]) { if (n[t].r) throw new Error("noUiSlider (" + lt + "): '" + t + "' is required."); return !0 } n[t].t(r, a(e[t]) ? e[t] : i[t]) }), r.pips = e.pips; var t = document.createElement("div"), o = void 0 !== t.style.msTransform, s = void 0 !== t.style.transform; r.transformRule = s ? "transform" : o ? "msTransform" : "webkitTransform"; return r.style = [["left", "top"], ["right", "bottom"]][r.dir][r.ort], r } function j(t, b, o) { var l, u, s, c, i, a, e, p, f = window.navigator.pointerEnabled ? { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" } : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" }, d = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () { var t = !1; try { var e = Object.defineProperty({}, "passive", { get: function () { t = !0 } }); window.addEventListener("test", null, e) } catch (t) { } return t }(), h = t, y = b.spectrum, x = [], S = [], m = [], g = 0, v = {}, w = t.ownerDocument, E = b.documentElement || w.documentElement, C = w.body, P = -1, N = 0, k = 1, U = 2, A = "rtl" === w.dir || 1 === b.ort ? 0 : 100; function V(t, e) { var r = w.createElement("div"); return e && ht(r, e), t.appendChild(r), r } function D(t, e) { var r = V(t, b.cssClasses.origin), n = V(r, b.cssClasses.handle); return V(n, b.cssClasses.touchArea), n.setAttribute("data-handle", e), b.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function (t) { return function (t, e) { if (O() || L(e)) return !1; var r = ["Left", "Right"], n = ["Down", "Up"], i = ["PageDown", "PageUp"], o = ["Home", "End"]; b.dir && !b.ort ? r.reverse() : b.ort && !b.dir && (n.reverse(), i.reverse()); var s, a = t.key.replace("Arrow", ""), l = a === i[0], u = a === i[1], c = a === n[0] || a === r[0] || l, p = a === n[1] || a === r[1] || u, f = a === o[0], d = a === o[1]; if (!(c || p || f || d)) return !0; if (t.preventDefault(), p || c) { var h = b.keyboardPageMultiplier, m = c ? 0 : 1, g = at(e), v = g[m]; if (null === v) return !1; !1 === v && (v = y.getDefaultStep(S[e], c, b.keyboardDefaultStep)), (u || l) && (v *= h), v = Math.max(v, 1e-7), v *= c ? -1 : 1, s = x[e] + v } else s = d ? b.spectrum.xVal[b.spectrum.xVal.length - 1] : b.spectrum.xVal[0]; return rt(e, y.toStepping(s), !0, !0), J("slide", e), J("update", e), J("change", e), J("set", e), !1 }(t, e) })), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", b.ort ? "vertical" : "horizontal"), 0 === e ? ht(n, b.cssClasses.handleLower) : e === b.handles - 1 && ht(n, b.cssClasses.handleUpper), r } function M(t, e) { return !!e && V(t, b.cssClasses.connect) } function r(t, e) { return !!b.tooltips[e] && V(t.firstChild, b.cssClasses.tooltip) } function O() { return h.hasAttribute("disabled") } function L(t) { return u[t].hasAttribute("disabled") } function z() { i && (G("update.tooltips"), i.forEach(function (t) { t && ut(t) }), i = null) } function H() { z(), i = u.map(r), $$("update.tooltips", function (t, e, r) { if (i[e]) { var n = t[e]; !0 !== b.tooltips[e] && (n = b.tooltips[e].to(r[e])), i[e].innerHTML = n } }) } function j(e, i, o) { var s = w.createElement("div"), a = []; a[N] = b.cssClasses.valueNormal, a[k] = b.cssClasses.valueLarge, a[U] = b.cssClasses.valueSub; var l = []; l[N] = b.cssClasses.markerNormal, l[k] = b.cssClasses.markerLarge, l[U] = b.cssClasses.markerSub; var u = [b.cssClasses.valueHorizontal, b.cssClasses.valueVertical], c = [b.cssClasses.markerHorizontal, b.cssClasses.markerVertical]; function p(t, e) { var r = e === b.cssClasses.value, n = r ? a : l; return e + " " + (r ? u : c)[b.ort] + " " + n[t] } return ht(s, b.cssClasses.pips), ht(s, 0 === b.ort ? b.cssClasses.pipsHorizontal : b.cssClasses.pipsVertical), Object.keys(e).forEach(function (t) { !function (t, e, r) { if ((r = i ? i(e, r) : r) !== P) { var n = V(s, !1); n.className = p(r, b.cssClasses.marker), n.style[b.style] = t + "%", N < r && ((n = V(s, !1)).className = p(r, b.cssClasses.value), n.setAttribute("data-value", e), n.style[b.style] = t + "%", n.innerHTML = o.to(e)) } }(t, e[t][0], e[t][1]) }), s } function F() { c && (ut(c), c = null) } function R(t) { F(); var m, g, v, b, e, r, x, S, w, n = t.mode, i = t.density || 1, o = t.filter || !1, s = function (t, e, r) { if ("range" === t || "steps" === t) return y.xVal; if ("count" === t) { if (e < 2) throw new Error("noUiSlider (" + lt + "): 'values' (>= 2) required for mode 'count'."); var n = e - 1, i = 100 / n; for (e = []; n--;)e[n] = n * i; e.push(100), t = "positions" } return "positions" === t ? e.map(function (t) { return y.fromStepping(r ? y.getStep(t) : t) }) : "values" === t ? r ? e.map(function (t) { return y.fromStepping(y.getStep(y.toStepping(t))) }) : e : void 0 }(n, t.values || !1, t.stepped || !1), a = (m = i, g = n, v = s, b = {}, e = y.xVal[0], r = y.xVal[y.xVal.length - 1], S = x = !1, w = 0, (v = v.slice().sort(function (t, e) { return t - e }).filter(function (t) { return !this[t] && (this[t] = !0) }, {}))[0] !== e && (v.unshift(e), x = !0), v[v.length - 1] !== r && (v.push(r), S = !0), v.forEach(function (t, e) { var r, n, i, o, s, a, l, u, c, p, f = t, d = v[e + 1], h = "steps" === g; if (h && (r = y.xNumSteps[e]), r || (r = d - f), !1 !== f) for (void 0 === d && (d = f), r = Math.max(r, 1e-7), n = f; n <= d; n = (n + r).toFixed(7) / 1) { for (u = (s = (o = y.toStepping(n)) - w) / m, p = s / (c = Math.round(u)), i = 1; i <= c; i += 1)b[(a = w + i * p).toFixed(5)] = [y.fromStepping(a), 0]; l = -1 < v.indexOf(n) ? k : h ? U : N, !e && x && n !== d && (l = 0), n === d && S || (b[o.toFixed(5)] = [n, l]), w = o } }), b), l = t.format || { to: Math.round }; return c = h.appendChild(j(a, o, l)) } function T() { var t = l.getBoundingClientRect(), e = "offset" + ["Width", "Height"][b.ort]; return 0 === b.ort ? t.width || l[e] : t.height || l[e] } function B(n, i, o, s) { var e = function (t) { return !!(t = function (t, e, r) { var n, i, o = 0 === t.type.indexOf("touch"), s = 0 === t.type.indexOf("mouse"), a = 0 === t.type.indexOf("pointer"); 0 === t.type.indexOf("MSPointer") && (a = !0); if (o) { var l = function (t) { return t.target === r || r.contains(t.target) || t.target.shadowRoot && t.target.shadowRoot.contains(r) }; if ("touchstart" === t.type) { var u = Array.prototype.filter.call(t.touches, l); if (1 < u.length) return !1; n = u[0].pageX, i = u[0].pageY } else { var c = Array.prototype.find.call(t.changedTouches, l); if (!c) return !1; n = c.pageX, i = c.pageY } } e = e || gt(w), (s || a) && (n = t.clientX + e.x, i = t.clientY + e.y); return t.pageOffset = e, t.points = [n, i], t.cursor = s || a, t }(t, s.pageOffset, s.target || i)) && (!(O() && !s.doNotReject) && (e = h, r = b.cssClasses.tap, !((e.classList ? e.classList.contains(r) : new RegExp("\\b" + r + "\\b").test(e.className)) && !s.doNotReject) && (!(n === f.start && void 0 !== t.buttons && 1 < t.buttons) && ((!s.hover || !t.buttons) && (d || t.preventDefault(), t.calcPoint = t.points[b.ort], void o(t, s)))))); var e, r }, r = []; return n.split(" ").forEach(function (t) { i.addEventListener(t, e, !!d && { passive: !0 }), r.push([t, e]) }), r } function q(t) { var e, r, n, i, o, s, a = 100 * (t - (e = l, r = b.ort, n = e.getBoundingClientRect(), i = e.ownerDocument, o = i.documentElement, s = gt(i), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0), r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft)) / T(); return a = ft(a), b.dir ? 100 - a : a } function X(t, e) { "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e) } function Y(t, e) { if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return _(t, e); var r = (b.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint); Z(0 < r, 100 * r / e.baseSize, e.locations, e.handleNumbers) } function _(t, e) { e.handle && (mt(e.handle, b.cssClasses.active), g -= 1), e.listeners.forEach(function (t) { E.removeEventListener(t[0], t[1]) }), 0 === g && (mt(h, b.cssClasses.drag), et(), t.cursor && (C.style.cursor = "", C.removeEventListener("selectstart", ct))), e.handleNumbers.forEach(function (t) { J("change", t), J("set", t), J("end", t) }) } function I(t, e) { if (e.handleNumbers.some(L)) return !1; var r; 1 === e.handleNumbers.length && (r = u[e.handleNumbers[0]].children[0], g += 1, ht(r, b.cssClasses.active)); t.stopPropagation(); var n = [], i = B(f.move, E, Y, { target: t.target, handle: r, listeners: n, startCalcPoint: t.calcPoint, baseSize: T(), pageOffset: t.pageOffset, handleNumbers: e.handleNumbers, buttonsProperty: t.buttons, locations: S.slice() }), o = B(f.end, E, _, { target: t.target, handle: r, listeners: n, doNotReject: !0, handleNumbers: e.handleNumbers }), s = B("mouseout", E, X, { target: t.target, handle: r, listeners: n, doNotReject: !0, handleNumbers: e.handleNumbers }); n.push.apply(n, i.concat(o, s)), t.cursor && (C.style.cursor = getComputedStyle(t.target).cursor, 1 < u.length && ht(h, b.cssClasses.drag), C.addEventListener("selectstart", ct, !1)), e.handleNumbers.forEach(function (t) { J("start", t) }) } function n(t) { if (!t.buttons && !t.touches) return !1; t.stopPropagation(); var i, o, s, e = q(t.calcPoint), r = (i = e, s = !(o = 100), u.forEach(function (t, e) { if (!L(e)) { var r = S[e], n = Math.abs(r - i); (n < o || n <= o && r < i || 100 === n && 100 === o) && (s = e, o = n) } }), s); if (!1 === r) return !1; b.events.snap || pt(h, b.cssClasses.tap, b.animationDuration), rt(r, e, !0, !0), et(), J("slide", r, !0), J("update", r, !0), J("change", r, !0), J("set", r, !0), b.events.snap && I(t, { handleNumbers: [r] }) } function W(t) { var e = q(t.calcPoint), r = y.getStep(e), n = y.fromStepping(r); Object.keys(v).forEach(function (t) { "hover" === t.split(".")[0] && v[t].forEach(function (t) { t.call(a, n) }) }) } function $$(t, e) { v[t] = v[t] || [], v[t].push(e), "update" === t.split(".")[0] && u.forEach(function (t, e) { J("update", e) }) } function G(t) { var n = t && t.split(".")[0], i = n && t.substring(n.length); Object.keys(v).forEach(function (t) { var e = t.split(".")[0], r = t.substring(e.length); n && n !== e || i && i !== r || delete v[t] }) } function J(r, n, i) { Object.keys(v).forEach(function (t) { var e = t.split(".")[0]; r === e && v[t].forEach(function (t) { t.call(a, x.map(b.format.to), n, x.slice(), i || !1, S.slice(), a) }) }) } function K(t, e, r, n, i, o) { var s; return 1 < u.length && !b.events.unconstrained && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.margin, 0), r = Math.max(r, s)), i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.margin, 1), r = Math.min(r, s))), 1 < u.length && b.limit && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.limit, 0), r = Math.min(r, s)), i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.limit, 1), r = Math.max(r, s))), b.padding && (0 === e && (s = y.getAbsoluteDistance(0, b.padding[0], 0), r = Math.max(r, s)), e === u.length - 1 && (s = y.getAbsoluteDistance(100, b.padding[1], 1), r = Math.min(r, s))), !((r = ft(r = y.getStep(r))) === t[e] && !o) && r } function Q(t, e) { var r = b.ort; return (r ? e : t) + ", " + (r ? t : e) } function Z(t, n, r, e) { var i = r.slice(), o = [!t, t], s = [t, !t]; e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach(function (t, e) { var r = K(i, t, i[t] + n, o[e], s[e], !1); !1 === r ? n = 0 : (n = r - i[t], i[t] = r) }) : o = s = [!0]; var a = !1; e.forEach(function (t, e) { a = rt(t, r[t] + n, o[e], s[e]) || a }), a && e.forEach(function (t) { J("update", t), J("slide", t) }) } function tt(t, e) { return b.dir ? 100 - t - e : t } function et() { m.forEach(function (t) { var e = 50 < S[t] ? -1 : 1, r = 3 + (u.length + e * t); u[t].style.zIndex = r }) } function rt(t, e, r, n) { return !1 !== (e = K(S, t, e, r, n, !1)) && (function (t, e) { S[t] = e, x[t] = y.fromStepping(e); var r = "translate(" + Q(10 * (tt(e, 0) - A) + "%", "0") + ")"; u[t].style[b.transformRule] = r, nt(t), nt(t + 1) }(t, e), !0) } function nt(t) { if (s[t]) { var e = 0, r = 100; 0 !== t && (e = S[t - 1]), t !== s.length - 1 && (r = S[t]); var n = r - e, i = "translate(" + Q(tt(e, n) + "%", "0") + ")", o = "scale(" + Q(n / 100, "1") + ")"; s[t].style[b.transformRule] = i + " " + o } } function it(t, e) { return null === t || !1 === t || void 0 === t ? S[e] : ("number" == typeof t && (t = String(t)), t = b.format.from(t), !1 === (t = y.toStepping(t)) || isNaN(t) ? S[e] : t) } function ot(t, e) { var r = dt(t), n = void 0 === S[0]; e = void 0 === e || !!e, b.animate && !n && pt(h, b.cssClasses.tap, b.animationDuration), m.forEach(function (t) { rt(t, it(r[t], t), !0, !1) }); for (var i = 1 === m.length ? 0 : 1; i < m.length; ++i)m.forEach(function (t) { rt(t, S[t], !0, !0) }); et(), m.forEach(function (t) { J("update", t), null !== r[t] && e && J("set", t) }) } function st() { var t = x.map(b.format.to); return 1 === t.length ? t[0] : t } function at(t) { var e = S[t], r = y.getNearbySteps(e), n = x[t], i = r.thisStep.step, o = null; if (b.snap) return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null]; !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === e ? i = null : 0 === e && (o = null); var s = y.countStepDecimals(); return null !== i && !1 !== i && (i = Number(i.toFixed(s))), null !== o && !1 !== o && (o = Number(o.toFixed(s))), [o, i] } return ht(e = h, b.cssClasses.target), 0 === b.dir ? ht(e, b.cssClasses.ltr) : ht(e, b.cssClasses.rtl), 0 === b.ort ? ht(e, b.cssClasses.horizontal) : ht(e, b.cssClasses.vertical), ht(e, "rtl" === getComputedStyle(e).direction ? b.cssClasses.textDirectionRtl : b.cssClasses.textDirectionLtr), l = V(e, b.cssClasses.base), function (t, e) { var r = V(e, b.cssClasses.connects); u = [], (s = []).push(M(r, t[0])); for (var n = 0; n < b.handles; n++)u.push(D(e, n)), m[n] = n, s.push(M(r, t[n + 1])) }(b.connect, l), (p = b.events).fixed || u.forEach(function (t, e) { B(f.start, t.children[0], I, { handleNumbers: [e] }) }), p.tap && B(f.start, l, n, {}), p.hover && B(f.move, l, W, { hover: !0 }), p.drag && s.forEach(function (t, e) { if (!1 !== t && 0 !== e && e !== s.length - 1) { var r = u[e - 1], n = u[e], i = [t]; ht(t, b.cssClasses.draggable), p.fixed && (i.push(r.children[0]), i.push(n.children[0])), i.forEach(function (t) { B(f.start, t, I, { handles: [r, n], handleNumbers: [e - 1, e] }) }) } }), ot(b.start), b.pips && R(b.pips), b.tooltips && H(), $$("update", function (t, e, s, r, a) { m.forEach(function (t) { var e = u[t], r = K(S, t, 0, !0, !0, !0), n = K(S, t, 100, !0, !0, !0), i = a[t], o = b.ariaFormat.to(s[t]); r = y.fromStepping(r).toFixed(1), n = y.fromStepping(n).toFixed(1), i = y.fromStepping(i).toFixed(1), e.children[0].setAttribute("aria-valuemin", r), e.children[0].setAttribute("aria-valuemax", n), e.children[0].setAttribute("aria-valuenow", i), e.children[0].setAttribute("aria-valuetext", o) }) }), a = { destroy: function () { for (var t in b.cssClasses) b.cssClasses.hasOwnProperty(t) && mt(h, b.cssClasses[t]); for (; h.firstChild;)h.removeChild(h.firstChild); delete h.noUiSlider }, steps: function () { return m.map(at) }, on: $$, off: G, get: st, set: ot, setHandle: function (t, e, r) { if (!(0 <= (t = Number(t)) && t < m.length)) throw new Error("noUiSlider (" + lt + "): invalid handle number, got: " + t); rt(t, it(e, t), !0, !0), J("update", t), r && J("set", t) }, reset: function (t) { ot(b.start, t) }, __moveHandles: function (t, e, r) { Z(t, e, S, r) }, options: o, updateOptions: function (e, t) { var r = st(), n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"]; n.forEach(function (t) { void 0 !== e[t] && (o[t] = e[t]) }); var i = vt(o); n.forEach(function (t) { void 0 !== e[t] && (b[t] = i[t]) }), y = i.spectrum, b.margin = i.margin, b.limit = i.limit, b.padding = i.padding, b.pips ? R(b.pips) : F(), b.tooltips ? H() : z(), S = [], ot(e.start || r, t) }, target: h, removePips: F, removeTooltips: z, getTooltips: function () { return i }, getOrigins: function () { return u }, pips: R } } return { __spectrum: i, version: lt, cssClasses: d, create: function (t, e) { if (!t || !t.nodeName) throw new Error("noUiSlider (" + lt + "): create requires a single element, got: " + t); if (t.noUiSlider) throw new Error("noUiSlider (" + lt + "): Slider was already initialized."); var r = j(t, vt(e), e); return t.noUiSlider = r } } });
/*PinchZoom.js
Copyright (c) Manuel Stofer 2013 - today

Author: Manuel Stofer (mst@rtp.ch)
Version: 2.3.4

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// polyfills
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

if (typeof Array.from != 'function') {
    Array.from = function (object) {
        return [].slice.call(object);
    };
}

// utils
var buildElement = function (str) {
    // empty string as title argument required by IE and Edge
    var tmp = document.implementation.createHTMLDocument('');
    tmp.body.innerHTML = str;
    return Array.from(tmp.body.children)[0];
};

var triggerEvent = function (el, name) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, false);
    el.dispatchEvent(event);
};

var definePinchZoom = function () {

    /**
     * Pinch zoom
     * @param el
     * @param options
     * @constructor
     */
    var PinchZoom = function (el, options) {
        this.el = el;
        this.zoomFactor = 1;
        this.lastScale = 1;
        this.offset = {
            x: 0,
            y: 0
        };
        this.initialOffset = {
            x: 0,
            y: 0,
        };
        this.options = Object.assign({}, this.defaults, options);
        this.setupMarkup();
        this.bindEvents();
        this.update();

        // The image may already be loaded when PinchZoom is initialized,
        // and then the load event (which trigger update) will never fire.
        if (this.isImageLoaded(this.el)) {
            this.updateAspectRatio();
            this.setupOffsets();
        }

        this.enable();

    },
        sum = function (a, b) {
            return a + b;
        },
        isCloseTo = function (value, expected) {
            return value > expected - 0.01 && value < expected + 0.01;
        };

    PinchZoom.prototype = {

        defaults: {
            tapZoomFactor: 2,
            zoomOutFactor: 1.3,
            animationDuration: 300,
            maxZoom: 4,
            minZoom: 0.5,
            draggableUnzoomed: true,
            lockDragAxis: false,
            setOffsetsOnce: false,
            use2d: true,
            zoomStartEventName: 'pz_zoomstart',
            zoomUpdateEventName: 'pz_zoomupdate',
            zoomEndEventName: 'pz_zoomend',
            dragStartEventName: 'pz_dragstart',
            dragUpdateEventName: 'pz_dragupdate',
            dragEndEventName: 'pz_dragend',
            doubleTapEventName: 'pz_doubletap',
            verticalPadding: 0,
            horizontalPadding: 0,
            onZoomStart: null,
            onZoomEnd: null,
            onZoomUpdate: null,
            onDragStart: null,
            onDragEnd: null,
            onDragUpdate: null,
            onDoubleTap: null
        },

        /**
         * Event handler for 'dragstart'
         * @param event
         */
        handleDragStart: function (event) {
            triggerEvent(this.el, this.options.dragStartEventName);
            if (typeof this.options.onDragStart == "function") {
                this.options.onDragStart(this, event)
            }
            this.stopAnimation();
            this.lastDragPosition = false;
            this.hasInteraction = true;
            this.handleDrag(event);
        },

        /**
         * Event handler for 'drag'
         * @param event
         */
        handleDrag: function (event) {
            var touch = this.getTouches(event)[0];
            this.drag(touch, this.lastDragPosition);
            this.offset = this.sanitizeOffset(this.offset);
            this.lastDragPosition = touch;
        },

        handleDragEnd: function () {
            triggerEvent(this.el, this.options.dragEndEventName);
            if (typeof this.options.onDragEnd == "function") {
                this.options.onDragEnd(this, event)
            }
            this.end();
        },

        /**
         * Event handler for 'zoomstart'
         * @param event
         */
        handleZoomStart: function (event) {
            triggerEvent(this.el, this.options.zoomStartEventName);
            if (typeof this.options.onZoomStart == "function") {
                this.options.onZoomStart(this, event)
            }
            this.stopAnimation();
            this.lastScale = 1;
            this.nthZoom = 0;
            this.lastZoomCenter = false;
            this.hasInteraction = true;
        },

        /**
         * Event handler for 'zoom'
         * @param event
         */
        handleZoom: function (event, newScale) {
            // a relative scale factor is used
            var touchCenter = this.getTouchCenter(this.getTouches(event)),
                scale = newScale / this.lastScale;
            this.lastScale = newScale;

            // the first touch events are thrown away since they are not precise
            this.nthZoom += 1;
            if (this.nthZoom > 3) {

                this.scale(scale, touchCenter);
                this.drag(touchCenter, this.lastZoomCenter);
            }
            this.lastZoomCenter = touchCenter;
        },

        handleZoomEnd: function () {
            triggerEvent(this.el, this.options.zoomEndEventName);
            if (typeof this.options.onZoomEnd == "function") {
                this.options.onZoomEnd(this, event)
            }
            this.end();
        },

        /**
         * Event handler for 'doubletap'
         * @param event
         */
        handleDoubleTap: function (event) {
            var center = this.getTouches(event)[0],
                zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
                startZoomFactor = this.zoomFactor,
                updateProgress = (function (progress) {
                    this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }).bind(this);

            if (this.hasInteraction) {
                return;
            }

            this.isDoubleTap = true;

            if (startZoomFactor > zoomFactor) {
                center = this.getCurrentZoomCenter();
            }

            this.animate(this.options.animationDuration, updateProgress, this.swing);
            triggerEvent(this.el, this.options.doubleTapEventName);
            if (typeof this.options.onDoubleTap == "function") {
                this.options.onDoubleTap(this, event)
            }
        },

        /**
         * Compute the initial offset
         *
         * the element should be centered in the container upon initialization
         */
        computeInitialOffset: function () {
            this.initialOffset = {
                x: -Math.abs(this.el.offsetWidth * this.getInitialZoomFactor() - this.container.offsetWidth) / 2,
                y: -Math.abs(this.el.offsetHeight * this.getInitialZoomFactor() - this.container.offsetHeight) / 2,
            };
        },

        /**
         * Reset current image offset to that of the initial offset
         */
        resetOffset: function () {
            this.offset.x = this.initialOffset.x;
            this.offset.y = this.initialOffset.y;
        },

        /**
         * Determine if image is loaded
         */
        isImageLoaded: function (el) {
            if (el.nodeName === 'IMG') {
                return el.complete && el.naturalHeight !== 0;
            } else {
                return Array.from(el.querySelectorAll('img')).every(this.isImageLoaded);
            }
        },

        setupOffsets: function () {
            if (this.options.setOffsetsOnce && this._isOffsetsSet) {
                return;
            }

            this._isOffsetsSet = true;

            this.computeInitialOffset();
            this.resetOffset();
        },

        /**
         * Max / min values for the offset
         * @param offset
         * @return {Object} the sanitized offset
         */
        sanitizeOffset: function (offset) {
            var elWidth = this.el.offsetWidth * this.getInitialZoomFactor() * this.zoomFactor;
            var elHeight = this.el.offsetHeight * this.getInitialZoomFactor() * this.zoomFactor;
            var maxX = elWidth - this.getContainerX() + this.options.horizontalPadding,
                maxY = elHeight - this.getContainerY() + this.options.verticalPadding,
                maxOffsetX = Math.max(maxX, 0),
                maxOffsetY = Math.max(maxY, 0),
                minOffsetX = Math.min(maxX, 0) - this.options.horizontalPadding,
                minOffsetY = Math.min(maxY, 0) - this.options.verticalPadding;

            return {
                x: Math.min(Math.max(offset.x, minOffsetX), maxOffsetX),
                y: Math.min(Math.max(offset.y, minOffsetY), maxOffsetY)
            };
        },

        /**
         * Scale to a specific zoom factor (not relative)
         * @param zoomFactor
         * @param center
         */
        scaleTo: function (zoomFactor, center) {
            this.scale(zoomFactor / this.zoomFactor, center);
        },

        /**
         * Scales the element from specified center
         * @param scale
         * @param center
         */
        scale: function (scale, center) {
            scale = this.scaleZoomFactor(scale);
            this.addOffset({
                x: (scale - 1) * (center.x + this.offset.x),
                y: (scale - 1) * (center.y + this.offset.y)
            });
            triggerEvent(this.el, this.options.zoomUpdateEventName);
            if (typeof this.options.onZoomUpdate == "function") {
                this.options.onZoomUpdate(this, event)
            }
        },

        /**
         * Scales the zoom factor relative to current state
         * @param scale
         * @return the actual scale (can differ because of max min zoom factor)
         */
        scaleZoomFactor: function (scale) {
            var originalZoomFactor = this.zoomFactor;
            this.zoomFactor *= scale;
            this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
            return this.zoomFactor / originalZoomFactor;
        },

        /**
         * Determine if the image is in a draggable state
         *
         * When the image can be dragged, the drag event is acted upon and cancelled.
         * When not draggable, the drag event bubbles through this component.
         *
         * @return {Boolean}
         */
        canDrag: function () {
            return this.options.draggableUnzoomed || !isCloseTo(this.zoomFactor, 1);
        },

        /**
         * Drags the element
         * @param center
         * @param lastCenter
         */
        drag: function (center, lastCenter) {
            if (lastCenter) {
                if (this.options.lockDragAxis) {
                    // lock scroll to position that was changed the most
                    if (Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
                        this.addOffset({
                            x: -(center.x - lastCenter.x),
                            y: 0
                        });
                    } else {
                        this.addOffset({
                            y: -(center.y - lastCenter.y),
                            x: 0
                        });
                    }
                } else {
                    this.addOffset({
                        y: -(center.y - lastCenter.y),
                        x: -(center.x - lastCenter.x)
                    });
                }
                triggerEvent(this.el, this.options.dragUpdateEventName);
                if (typeof this.options.onDragUpdate == "function") {
                    this.options.onDragUpdate(this, event)
                }
            }
        },

        /**
         * Calculates the touch center of multiple touches
         * @param touches
         * @return {Object}
         */
        getTouchCenter: function (touches) {
            return this.getVectorAvg(touches);
        },

        /**
         * Calculates the average of multiple vectors (x, y values)
         */
        getVectorAvg: function (vectors) {
            return {
                x: vectors.map(function (v) {
                    return v.x;
                }).reduce(sum) / vectors.length,
                y: vectors.map(function (v) {
                    return v.y;
                }).reduce(sum) / vectors.length
            };
        },

        /**
         * Adds an offset
         * @param offset the offset to add
         * @return return true when the offset change was accepted
         */
        addOffset: function (offset) {
            this.offset = {
                x: this.offset.x + offset.x,
                y: this.offset.y + offset.y
            };
        },

        sanitize: function () {
            if (this.zoomFactor < this.options.zoomOutFactor) {
                this.zoomOutAnimation();
            } else if (this.isInsaneOffset(this.offset)) {
                this.sanitizeOffsetAnimation();
            }
        },

        /**
         * Checks if the offset is ok with the current zoom factor
         * @param offset
         * @return {Boolean}
         */
        isInsaneOffset: function (offset) {
            var sanitizedOffset = this.sanitizeOffset(offset);
            return sanitizedOffset.x !== offset.x ||
                sanitizedOffset.y !== offset.y;
        },

        /**
         * Creates an animation moving to a sane offset
         */
        sanitizeOffsetAnimation: function () {
            var targetOffset = this.sanitizeOffset(this.offset),
                startOffset = {
                    x: this.offset.x,
                    y: this.offset.y
                },
                updateProgress = (function (progress) {
                    this.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
                    this.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
                    this.update();
                }).bind(this);

            this.animate(
                this.options.animationDuration,
                updateProgress,
                this.swing
            );
        },

        /**
         * Zooms back to the original position,
         * (no offset and zoom factor 1)
         */
        zoomOutAnimation: function () {
            if (this.zoomFactor === 1) {
                return;
            }

            var startZoomFactor = this.zoomFactor,
                zoomFactor = 1,
                center = this.getCurrentZoomCenter(),
                updateProgress = (function (progress) {
                    this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }).bind(this);

            this.animate(
                this.options.animationDuration,
                updateProgress,
                this.swing
            );
        },

        /**
         * Updates the container aspect ratio
         *
         * Any previous container height must be cleared before re-measuring the
         * parent height, since it depends implicitly on the height of any of its children
         */
        updateAspectRatio: function () {
            this.unsetContainerY();
            this.setContainerY(this.container.parentElement.offsetHeight);
        },

        /**
         * Calculates the initial zoom factor (for the element to fit into the container)
         * @return {number} the initial zoom factor
         */
        getInitialZoomFactor: function () {
            var xZoomFactor = this.container.offsetWidth / this.el.offsetWidth;
            var yZoomFactor = this.container.offsetHeight / this.el.offsetHeight;

            return Math.min(xZoomFactor, yZoomFactor);
        },

        /**
         * Calculates the aspect ratio of the element
         * @return the aspect ratio
         */
        getAspectRatio: function () {
            return this.el.offsetWidth / this.el.offsetHeight;
        },

        /**
         * Calculates the virtual zoom center for the current offset and zoom factor
         * (used for reverse zoom)
         * @return {Object} the current zoom center
         */
        getCurrentZoomCenter: function () {
            var offsetLeft = this.offset.x - this.initialOffset.x;
            var centerX = -1 * this.offset.x - offsetLeft / (1 / this.zoomFactor - 1);

            var offsetTop = this.offset.y - this.initialOffset.y;
            var centerY = -1 * this.offset.y - offsetTop / (1 / this.zoomFactor - 1);

            return {
                x: centerX,
                y: centerY
            };
        },

        /**
         * Returns the touches of an event relative to the container offset
         * @param event
         * @return array touches
         */
        getTouches: function (event) {
            var rect = this.container.getBoundingClientRect();
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            var posTop = rect.top + scrollTop;
            var posLeft = rect.left + scrollLeft;

            return Array.prototype.slice.call(event.touches).map(function (touch) {
                return {
                    x: touch.pageX - posLeft,
                    y: touch.pageY - posTop,
                };
            });
        },

        /**
         * Animation loop
         * does not support simultaneous animations
         * @param duration
         * @param framefn
         * @param timefn
         * @param callback
         */
        animate: function (duration, framefn, timefn, callback) {
            var startTime = new Date().getTime(),
                renderFrame = (function () {
                    if (!this.inAnimation) {
                        return;
                    }
                    var frameTime = new Date().getTime() - startTime,
                        progress = frameTime / duration;
                    if (frameTime >= duration) {
                        framefn(1);
                        if (callback) {
                            callback();
                        }
                        this.update();
                        this.stopAnimation();
                        this.update();
                    } else {
                        if (timefn) {
                            progress = timefn(progress);
                        }
                        framefn(progress);
                        this.update();
                        requestAnimationFrame(renderFrame);
                    }
                }).bind(this);
            this.inAnimation = true;
            requestAnimationFrame(renderFrame);
        },

        /**
         * Stops the animation
         */
        stopAnimation: function () {
            this.inAnimation = false;
        },

        /**
         * Swing timing function for animations
         * @param p
         * @return {Number}
         */
        swing: function (p) {
            return -Math.cos(p * Math.PI) / 2 + 0.5;
        },

        getContainerX: function () {
            return this.container.offsetWidth;
        },

        getContainerY: function () {
            return this.container.offsetHeight;
        },

        setContainerY: function (y) {
            return this.container.style.height = y + 'px';
        },

        unsetContainerY: function () {
            this.container.style.height = null;
        },

        /**
         * Creates the expected html structure
         */
        setupMarkup: function () {
            this.container = buildElement('<div class="pinch-zoom-container"></div>');
            this.el.parentNode.insertBefore(this.container, this.el);
            this.container.appendChild(this.el);

            this.container.style.overflow = 'hidden';
            this.container.style.position = 'relative';

            this.el.style.webkitTransformOrigin = '0% 0%';
            this.el.style.mozTransformOrigin = '0% 0%';
            this.el.style.msTransformOrigin = '0% 0%';
            this.el.style.oTransformOrigin = '0% 0%';
            this.el.style.transformOrigin = '0% 0%';

            this.el.style.position = 'absolute';
        },

        end: function () {
            this.hasInteraction = false;
            this.sanitize();
            this.update();
        },

        /**
         * Binds all required event listeners
         */
        bindEvents: function () {
            var self = this;
            detectGestures(this.container, this);

            window.addEventListener('resize', this.update.bind(this));
            Array.from(this.el.querySelectorAll('img')).forEach(function (imgEl) {
                imgEl.addEventListener('load', self.update.bind(self));
            });

            if (this.el.nodeName === 'IMG') {
                this.el.addEventListener('load', this.update.bind(this));
            }
        },

        /**
         * Updates the css values according to the current zoom factor and offset
         */
        update: function (event) {
            if (this.updatePlaned) {
                return;
            }
            this.updatePlaned = true;

            window.setTimeout((function () {
                this.updatePlaned = false;

                if (event && event.type === 'resize') {
                    this.updateAspectRatio();
                    this.setupOffsets();
                }

                if (event && event.type === 'load') {
                    this.updateAspectRatio();
                    this.setupOffsets();
                }

                var zoomFactor = this.getInitialZoomFactor() * this.zoomFactor,
                    offsetX = -this.offset.x / zoomFactor,
                    offsetY = -this.offset.y / zoomFactor,
                    transform3d = 'scale3d(' + zoomFactor + ', ' + zoomFactor + ',1) ' +
                        'translate3d(' + offsetX + 'px,' + offsetY + 'px,0px)',
                    transform2d = 'scale(' + zoomFactor + ', ' + zoomFactor + ') ' +
                        'translate(' + offsetX + 'px,' + offsetY + 'px)',
                    removeClone = (function () {
                        if (this.clone) {
                            this.clone.parentNode.removeChild(this.clone);
                            delete this.clone;
                        }
                    }).bind(this);

                // Scale 3d and translate3d are faster (at least on ios)
                // but they also reduce the quality.
                // PinchZoom uses the 3d transformations during interactions
                // after interactions it falls back to 2d transformations
                if (!this.options.use2d || this.hasInteraction || this.inAnimation) {
                    this.is3d = true;
                    removeClone();

                    this.el.style.webkitTransform = transform3d;
                    this.el.style.mozTransform = transform2d;
                    this.el.style.msTransform = transform2d;
                    this.el.style.oTransform = transform2d;
                    this.el.style.transform = transform3d;
                } else {
                    // When changing from 3d to 2d transform webkit has some glitches.
                    // To avoid this, a copy of the 3d transformed element is displayed in the
                    // foreground while the element is converted from 3d to 2d transform
                    if (this.is3d) {
                        this.clone = this.el.cloneNode(true);
                        this.clone.style.pointerEvents = 'none';
                        this.container.appendChild(this.clone);
                        window.setTimeout(removeClone, 200);
                    }

                    this.el.style.webkitTransform = transform2d;
                    this.el.style.mozTransform = transform2d;
                    this.el.style.msTransform = transform2d;
                    this.el.style.oTransform = transform2d;
                    this.el.style.transform = transform2d;

                    this.is3d = false;
                }
            }).bind(this), 0);
        },

        /**
         * Enables event handling for gestures
         */
        enable: function () {
            this.enabled = true;
        },

        /**
         * Disables event handling for gestures
         */
        disable: function () {
            this.enabled = false;
        }
    };

    var detectGestures = function (el, target) {
        var interaction = null,
            fingers = 0,
            lastTouchStart = null,
            startTouches = null,

            setInteraction = function (newInteraction, event) {
                if (interaction !== newInteraction) {

                    if (interaction && !newInteraction) {
                        switch (interaction) {
                            case "zoom":
                                target.handleZoomEnd(event);
                                break;
                            case 'drag':
                                target.handleDragEnd(event);
                                break;
                        }
                    }

                    switch (newInteraction) {
                        case 'zoom':
                            target.handleZoomStart(event);
                            break;
                        case 'drag':
                            target.handleDragStart(event);
                            break;
                    }
                }
                interaction = newInteraction;
            },

            updateInteraction = function (event) {
                if (fingers === 2) {
                    setInteraction('zoom');
                } else if (fingers === 1 && target.canDrag()) {
                    setInteraction('drag', event);
                } else {
                    setInteraction(null, event);
                }
            },

            targetTouches = function (touches) {
                return Array.from(touches).map(function (touch) {
                    return {
                        x: touch.pageX,
                        y: touch.pageY
                    };
                });
            },

            getDistance = function (a, b) {
                var x, y;
                x = a.x - b.x;
                y = a.y - b.y;
                return Math.sqrt(x * x + y * y);
            },

            calculateScale = function (startTouches, endTouches) {
                var startDistance = getDistance(startTouches[0], startTouches[1]),
                    endDistance = getDistance(endTouches[0], endTouches[1]);
                return endDistance / startDistance;
            },

            cancelEvent = function (event) {
                event.stopPropagation();
                event.preventDefault();
            },

            detectDoubleTap = function (event) {
                var time = (new Date()).getTime();

                if (fingers > 1) {
                    lastTouchStart = null;
                }

                if (time - lastTouchStart < 300) {
                    cancelEvent(event);

                    target.handleDoubleTap(event);
                    switch (interaction) {
                        case "zoom":
                            target.handleZoomEnd(event);
                            break;
                        case 'drag':
                            target.handleDragEnd(event);
                            break;
                    }
                } else {
                    target.isDoubleTap = false;
                }

                if (fingers === 1) {
                    lastTouchStart = time;
                }
            },
            firstMove = true;

        el.addEventListener('touchstart', function (event) {
            if (target.enabled) {
                firstMove = true;
                fingers = event.touches.length;
                detectDoubleTap(event);
            }
        });

        el.addEventListener('touchmove', function (event) {
            if (target.enabled && !target.isDoubleTap) {
                if (firstMove) {
                    updateInteraction(event);
                    if (interaction) {
                        cancelEvent(event);
                    }
                    startTouches = targetTouches(event.touches);
                } else {
                    switch (interaction) {
                        case 'zoom':
                            if (startTouches.length == 2 && event.touches.length == 2) {
                                target.handleZoom(event, calculateScale(startTouches, targetTouches(event.touches)));
                            }
                            break;
                        case 'drag':
                            target.handleDrag(event);
                            break;
                    }
                    if (interaction) {
                        cancelEvent(event);
                        target.update();
                    }
                }

                firstMove = false;
            }
        });

        el.addEventListener('touchend', function (event) {
            if (target.enabled) {
                fingers = event.touches.length;
                updateInteraction(event);
            }
        });
    };

    return PinchZoom;
};

var PinchZoom = definePinchZoom();

//export default PinchZoom;

"object" == typeof navigator && function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Plyr = t() }(this, (function () {
    "use strict"; !function () { if ("undefined" != typeof window) try { var e = new window.CustomEvent("test", { cancelable: !0 }); if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default") } catch (e) { var t = function (e, t) { var n, i; return (t = t || {}).bubbles = !!t.bubbles, t.cancelable = !!t.cancelable, (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i = n.preventDefault, n.preventDefault = function () { i.call(this); try { Object.defineProperty(this, "defaultPrevented", { get: function () { return !0 } }) } catch (e) { this.defaultPrevented = !0 } }, n }; t.prototype = window.Event.prototype, window.CustomEvent = t } }(); var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; function t(e, t) { return e(t = { exports: {} }, t.exports), t.exports } var n = function (e) { return e && e.Math == Math && e }, i = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || function () { return this }() || Function("return this")(), r = function (e) { try { return !!e() } catch (e) { return !0 } }, o = !r((function () { return 7 != Object.defineProperty({}, 1, { get: function () { return 7 } })[1] })), a = {}.propertyIsEnumerable, s = Object.getOwnPropertyDescriptor, l = { f: s && !a.call({ 1: 2 }, 1) ? function (e) { var t = s(this, e); return !!t && t.enumerable } : a }, c = function (e, t) { return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t } }, u = {}.toString, h = function (e) { return u.call(e).slice(8, -1) }, f = "".split, d = r((function () { return !Object("z").propertyIsEnumerable(0) })) ? function (e) { return "String" == h(e) ? f.call(e, "") : Object(e) } : Object, p = function (e) { if (null == e) throw TypeError("Can't call method on " + e); return e }, m = function (e) { return d(p(e)) }, g = function (e) { return "object" == typeof e ? null !== e : "function" == typeof e }, v = function (e, t) { if (!g(e)) return e; var n, i; if (t && "function" == typeof (n = e.toString) && !g(i = n.call(e))) return i; if ("function" == typeof (n = e.valueOf) && !g(i = n.call(e))) return i; if (!t && "function" == typeof (n = e.toString) && !g(i = n.call(e))) return i; throw TypeError("Can't convert object to primitive value") }, y = {}.hasOwnProperty, b = function (e, t) { return y.call(e, t) }, w = i.document, k = g(w) && g(w.createElement), T = function (e) { return k ? w.createElement(e) : {} }, S = !o && !r((function () { return 7 != Object.defineProperty(T("div"), "a", { get: function () { return 7 } }).a })), E = Object.getOwnPropertyDescriptor, A = { f: o ? E : function (e, t) { if (e = m(e), t = v(t, !0), S) try { return E(e, t) } catch (e) { } if (b(e, t)) return c(!l.f.call(e, t), e[t]) } }, C = function (e) { if (!g(e)) throw TypeError(String(e) + " is not an object"); return e }, P = Object.defineProperty, x = { f: o ? P : function (e, t, n) { if (C(e), t = v(t, !0), C(n), S) try { return P(e, t, n) } catch (e) { } if ("get" in n || "set" in n) throw TypeError("Accessors not supported"); return "value" in n && (e[t] = n.value), e } }, O = o ? function (e, t, n) { return x.f(e, t, c(1, n)) } : function (e, t, n) { return e[t] = n, e }, I = function (e, t) { try { O(i, e, t) } catch (n) { i[e] = t } return t }, L = "__core-js_shared__", j = i[L] || I(L, {}), N = Function.toString; "function" != typeof j.inspectSource && (j.inspectSource = function (e) { return N.call(e) }); var R, M, _, U = j.inspectSource, D = i.WeakMap, F = "function" == typeof D && /native code/.test(U(D)), q = t((function (e) { (e.exports = function (e, t) { return j[e] || (j[e] = void 0 !== t ? t : {}) })("versions", []).push({ version: "3.7.0", mode: "global", copyright: "Â© 2020 Denis Pushkarev (zloirock.ru)" }) })), H = 0, B = Math.random(), V = function (e) { return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++H + B).toString(36) }, z = q("keys"), W = function (e) { return z[e] || (z[e] = V(e)) }, K = {}, $$ = i.WeakMap; if (F) { var Y = j.state || (j.state = new $$), G = Y.get, X = Y.has, Q = Y.set; R = function (e, t) { return t.facade = e, Q.call(Y, e, t), t }, M = function (e) { return G.call(Y, e) || {} }, _ = function (e) { return X.call(Y, e) } } else { var J = W("state"); K[J] = !0, R = function (e, t) { return t.facade = e, O(e, J, t), t }, M = function (e) { return b(e, J) ? e[J] : {} }, _ = function (e) { return b(e, J) } } var Z, ee = { set: R, get: M, has: _, enforce: function (e) { return _(e) ? M(e) : R(e, {}) }, getterFor: function (e) { return function (t) { var n; if (!g(t) || (n = M(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required"); return n } } }, te = t((function (e) { var t = ee.get, n = ee.enforce, r = String(String).split("String"); (e.exports = function (e, t, o, a) { var s, l = !!a && !!a.unsafe, c = !!a && !!a.enumerable, u = !!a && !!a.noTargetGet; "function" == typeof o && ("string" != typeof t || b(o, "name") || O(o, "name", t), (s = n(o)).source || (s.source = r.join("string" == typeof t ? t : ""))), e !== i ? (l ? !u && e[t] && (c = !0) : delete e[t], c ? e[t] = o : O(e, t, o)) : c ? e[t] = o : I(t, o) })(Function.prototype, "toString", (function () { return "function" == typeof this && t(this).source || U(this) })) })), ne = i, ie = function (e) { return "function" == typeof e ? e : void 0 }, re = function (e, t) { return arguments.length < 2 ? ie(ne[e]) || ie(i[e]) : ne[e] && ne[e][t] || i[e] && i[e][t] }, oe = Math.ceil, ae = Math.floor, se = function (e) { return isNaN(e = +e) ? 0 : (e > 0 ? ae : oe)(e) }, le = Math.min, ce = function (e) { return e > 0 ? le(se(e), 9007199254740991) : 0 }, ue = Math.max, he = Math.min, fe = function (e, t) { var n = se(e); return n < 0 ? ue(n + t, 0) : he(n, t) }, de = function (e) { return function (t, n, i) { var r, o = m(t), a = ce(o.length), s = fe(i, a); if (e && n != n) { for (; a > s;)if ((r = o[s++]) != r) return !0 } else for (; a > s; s++)if ((e || s in o) && o[s] === n) return e || s || 0; return !e && -1 } }, pe = { includes: de(!0), indexOf: de(!1) }, me = pe.indexOf, ge = function (e, t) { var n, i = m(e), r = 0, o = []; for (n in i) !b(K, n) && b(i, n) && o.push(n); for (; t.length > r;)b(i, n = t[r++]) && (~me(o, n) || o.push(n)); return o }, ve = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], ye = ve.concat("length", "prototype"), be = { f: Object.getOwnPropertyNames || function (e) { return ge(e, ye) } }, we = { f: Object.getOwnPropertySymbols }, ke = re("Reflect", "ownKeys") || function (e) { var t = be.f(C(e)), n = we.f; return n ? t.concat(n(e)) : t }, Te = function (e, t) { for (var n = ke(t), i = x.f, r = A.f, o = 0; o < n.length; o++) { var a = n[o]; b(e, a) || i(e, a, r(t, a)) } }, Se = /#|\.prototype\./, Ee = function (e, t) { var n = Ce[Ae(e)]; return n == xe || n != Pe && ("function" == typeof t ? r(t) : !!t) }, Ae = Ee.normalize = function (e) { return String(e).replace(Se, ".").toLowerCase() }, Ce = Ee.data = {}, Pe = Ee.NATIVE = "N", xe = Ee.POLYFILL = "P", Oe = Ee, Ie = A.f, Le = function (e, t) { var n, r, o, a, s, l = e.target, c = e.global, u = e.stat; if (n = c ? i : u ? i[l] || I(l, {}) : (i[l] || {}).prototype) for (r in t) { if (a = t[r], o = e.noTargetGet ? (s = Ie(n, r)) && s.value : n[r], !Oe(c ? r : l + (u ? "." : "#") + r, e.forced) && void 0 !== o) { if (typeof a == typeof o) continue; Te(a, o) } (e.sham || o && o.sham) && O(a, "sham", !0), te(n, r, a, e) } }, je = !!Object.getOwnPropertySymbols && !r((function () { return !String(Symbol()) })), Ne = je && !Symbol.sham && "symbol" == typeof Symbol.iterator, Re = Array.isArray || function (e) { return "Array" == h(e) }, Me = function (e) { return Object(p(e)) }, _e = Object.keys || function (e) { return ge(e, ve) }, Ue = o ? Object.defineProperties : function (e, t) { C(e); for (var n, i = _e(t), r = i.length, o = 0; r > o;)x.f(e, n = i[o++], t[n]); return e }, De = re("document", "documentElement"), Fe = W("IE_PROTO"), qe = function () { }, He = function (e) { return "<script>" + e + "</" + "script>" }, Be = function () { try { Z = document.domain && new ActiveXObject("htmlfile") } catch (e) { } var e, t; Be = Z ? function (e) { e.write(He("")), e.close(); var t = e.parentWindow.Object; return e = null, t }(Z) : ((t = T("iframe")).style.display = "none", De.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(He("document.F=Object")), e.close(), e.F); for (var n = ve.length; n--;)delete Be.prototype[ve[n]]; return Be() }; K[Fe] = !0; var Ve = Object.create || function (e, t) { var n; return null !== e ? (qe.prototype = C(e), n = new qe, qe.prototype = null, n[Fe] = e) : n = Be(), void 0 === t ? n : Ue(n, t) }, ze = be.f, We = {}.toString, Ke = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], $$e = { f: function (e) { return Ke && "[object Window]" == We.call(e) ? function (e) { try { return ze(e) } catch (e) { return Ke.slice() } }(e) : ze(m(e)) } }, Ye = q("wks"), Ge = i.Symbol, Xe = Ne ? Ge : Ge && Ge.withoutSetter || V, Qe = function (e) { return b(Ye, e) || (je && b(Ge, e) ? Ye[e] = Ge[e] : Ye[e] = Xe("Symbol." + e)), Ye[e] }, Je = { f: Qe }, Ze = x.f, et = function (e) { var t = ne.Symbol || (ne.Symbol = {}); b(t, e) || Ze(t, e, { value: Je.f(e) }) }, tt = x.f, nt = Qe("toStringTag"), it = function (e, t, n) { e && !b(e = n ? e : e.prototype, nt) && tt(e, nt, { configurable: !0, value: t }) }, rt = function (e) { if ("function" != typeof e) throw TypeError(String(e) + " is not a function"); return e }, ot = function (e, t, n) { if (rt(e), void 0 === t) return e; switch (n) { case 0: return function () { return e.call(t) }; case 1: return function (n) { return e.call(t, n) }; case 2: return function (n, i) { return e.call(t, n, i) }; case 3: return function (n, i, r) { return e.call(t, n, i, r) } }return function () { return e.apply(t, arguments) } }, at = Qe("species"), st = function (e, t) { var n; return Re(e) && ("function" != typeof (n = e.constructor) || n !== Array && !Re(n.prototype) ? g(n) && null === (n = n[at]) && (n = void 0) : n = void 0), new (void 0 === n ? Array : n)(0 === t ? 0 : t) }, lt = [].push, ct = function (e) { var t = 1 == e, n = 2 == e, i = 3 == e, r = 4 == e, o = 6 == e, a = 5 == e || o; return function (s, l, c, u) { for (var h, f, p = Me(s), m = d(p), g = ot(l, c, 3), v = ce(m.length), y = 0, b = u || st, w = t ? b(s, v) : n ? b(s, 0) : void 0; v > y; y++)if ((a || y in m) && (f = g(h = m[y], y, p), e)) if (t) w[y] = f; else if (f) switch (e) { case 3: return !0; case 5: return h; case 6: return y; case 2: lt.call(w, h) } else if (r) return !1; return o ? -1 : i || r ? r : w } }, ut = { forEach: ct(0), map: ct(1), filter: ct(2), some: ct(3), every: ct(4), find: ct(5), findIndex: ct(6) }, ht = ut.forEach, ft = W("hidden"), dt = "Symbol", pt = Qe("toPrimitive"), mt = ee.set, gt = ee.getterFor(dt), vt = Object.prototype, yt = i.Symbol, bt = re("JSON", "stringify"), wt = A.f, kt = x.f, Tt = $$e.f, St = l.f, Et = q("symbols"), At = q("op-symbols"), Ct = q("string-to-symbol-registry"), Pt = q("symbol-to-string-registry"), xt = q("wks"), Ot = i.QObject, It = !Ot || !Ot.prototype || !Ot.prototype.findChild, Lt = o && r((function () { return 7 != Ve(kt({}, "a", { get: function () { return kt(this, "a", { value: 7 }).a } })).a })) ? function (e, t, n) { var i = wt(vt, t); i && delete vt[t], kt(e, t, n), i && e !== vt && kt(vt, t, i) } : kt, jt = function (e, t) { var n = Et[e] = Ve(yt.prototype); return mt(n, { type: dt, tag: e, description: t }), o || (n.description = t), n }, Nt = Ne ? function (e) { return "symbol" == typeof e } : function (e) { return Object(e) instanceof yt }, Rt = function (e, t, n) { e === vt && Rt(At, t, n), C(e); var i = v(t, !0); return C(n), b(Et, i) ? (n.enumerable ? (b(e, ft) && e[ft][i] && (e[ft][i] = !1), n = Ve(n, { enumerable: c(0, !1) })) : (b(e, ft) || kt(e, ft, c(1, {})), e[ft][i] = !0), Lt(e, i, n)) : kt(e, i, n) }, Mt = function (e, t) { C(e); var n = m(t), i = _e(n).concat(Ft(n)); return ht(i, (function (t) { o && !_t.call(n, t) || Rt(e, t, n[t]) })), e }, _t = function (e) { var t = v(e, !0), n = St.call(this, t); return !(this === vt && b(Et, t) && !b(At, t)) && (!(n || !b(this, t) || !b(Et, t) || b(this, ft) && this[ft][t]) || n) }, Ut = function (e, t) { var n = m(e), i = v(t, !0); if (n !== vt || !b(Et, i) || b(At, i)) { var r = wt(n, i); return !r || !b(Et, i) || b(n, ft) && n[ft][i] || (r.enumerable = !0), r } }, Dt = function (e) { var t = Tt(m(e)), n = []; return ht(t, (function (e) { b(Et, e) || b(K, e) || n.push(e) })), n }, Ft = function (e) { var t = e === vt, n = Tt(t ? At : m(e)), i = []; return ht(n, (function (e) { !b(Et, e) || t && !b(vt, e) || i.push(Et[e]) })), i }; if (je || (te((yt = function () { if (this instanceof yt) throw TypeError("Symbol is not a constructor"); var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0, t = V(e), n = function (e) { this === vt && n.call(At, e), b(this, ft) && b(this[ft], t) && (this[ft][t] = !1), Lt(this, t, c(1, e)) }; return o && It && Lt(vt, t, { configurable: !0, set: n }), jt(t, e) }).prototype, "toString", (function () { return gt(this).tag })), te(yt, "withoutSetter", (function (e) { return jt(V(e), e) })), l.f = _t, x.f = Rt, A.f = Ut, be.f = $$e.f = Dt, we.f = Ft, Je.f = function (e) { return jt(Qe(e), e) }, o && (kt(yt.prototype, "description", { configurable: !0, get: function () { return gt(this).description } }), te(vt, "propertyIsEnumerable", _t, { unsafe: !0 }))), Le({ global: !0, wrap: !0, forced: !je, sham: !je }, { Symbol: yt }), ht(_e(xt), (function (e) { et(e) })), Le({ target: dt, stat: !0, forced: !je }, { for: function (e) { var t = String(e); if (b(Ct, t)) return Ct[t]; var n = yt(t); return Ct[t] = n, Pt[n] = t, n }, keyFor: function (e) { if (!Nt(e)) throw TypeError(e + " is not a symbol"); if (b(Pt, e)) return Pt[e] }, useSetter: function () { It = !0 }, useSimple: function () { It = !1 } }), Le({ target: "Object", stat: !0, forced: !je, sham: !o }, { create: function (e, t) { return void 0 === t ? Ve(e) : Mt(Ve(e), t) }, defineProperty: Rt, defineProperties: Mt, getOwnPropertyDescriptor: Ut }), Le({ target: "Object", stat: !0, forced: !je }, { getOwnPropertyNames: Dt, getOwnPropertySymbols: Ft }), Le({ target: "Object", stat: !0, forced: r((function () { we.f(1) })) }, { getOwnPropertySymbols: function (e) { return we.f(Me(e)) } }), bt) { var qt = !je || r((function () { var e = yt(); return "[null]" != bt([e]) || "{}" != bt({ a: e }) || "{}" != bt(Object(e)) })); Le({ target: "JSON", stat: !0, forced: qt }, { stringify: function (e, t, n) { for (var i, r = [e], o = 1; arguments.length > o;)r.push(arguments[o++]); if (i = t, (g(t) || void 0 !== e) && !Nt(e)) return Re(t) || (t = function (e, t) { if ("function" == typeof i && (t = i.call(this, e, t)), !Nt(t)) return t }), r[1] = t, bt.apply(null, r) } }) } yt.prototype[pt] || O(yt.prototype, pt, yt.prototype.valueOf), it(yt, dt), K[ft] = !0; var Ht = x.f, Bt = i.Symbol; if (o && "function" == typeof Bt && (!("description" in Bt.prototype) || void 0 !== Bt().description)) { var Vt = {}, zt = function () { var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]), t = this instanceof zt ? new Bt(e) : void 0 === e ? Bt() : Bt(e); return "" === e && (Vt[t] = !0), t }; Te(zt, Bt); var Wt = zt.prototype = Bt.prototype; Wt.constructor = zt; var Kt = Wt.toString, $$t = "Symbol(test)" == String(Bt("test")), Yt = /^Symbol\((.*)\)[^)]+$$/; Ht(Wt, "description", { configurable: !0, get: function () { var e = g(this) ? this.valueOf() : this, t = Kt.call(e); if (b(Vt, e)) return ""; var n = $$t ? t.slice(7, -1) : t.replace(Yt, "$$1"); return "" === n ? void 0 : n } }), Le({ global: !0, forced: !0 }, { Symbol: zt }) } et("iterator"); var Gt = function (e, t) { var n = [][e]; return !!n && r((function () { n.call(null, t || function () { throw 1 }, 1) })) }, Xt = Object.defineProperty, Qt = {}, Jt = function (e) { throw e }, Zt = function (e, t) { if (b(Qt, e)) return Qt[e]; t || (t = {}); var n = [][e], i = !!b(t, "ACCESSORS") && t.ACCESSORS, a = b(t, 0) ? t[0] : Jt, s = b(t, 1) ? t[1] : void 0; return Qt[e] = !!n && !r((function () { if (i && !o) return !0; var e = { length: -1 }; i ? Xt(e, 1, { enumerable: !0, get: Jt }) : e[1] = 1, n.call(e, a, s) })) }, en = ut.forEach, tn = Gt("forEach"), nn = Zt("forEach"), rn = tn && nn ? [].forEach : function (e) { return en(this, e, arguments.length > 1 ? arguments[1] : void 0) }; Le({ target: "Array", proto: !0, forced: [].forEach != rn }, { forEach: rn }); var on = pe.indexOf, an = [].indexOf, sn = !!an && 1 / [1].indexOf(1, -0) < 0, ln = Gt("indexOf"), cn = Zt("indexOf", { ACCESSORS: !0, 1: 0 }); Le({ target: "Array", proto: !0, forced: sn || !ln || !cn }, { indexOf: function (e) { return sn ? an.apply(this, arguments) || 0 : on(this, e, arguments.length > 1 ? arguments[1] : void 0) } }); var un = Qe("unscopables"), hn = Array.prototype; null == hn[un] && x.f(hn, un, { configurable: !0, value: Ve(null) }); var fn, dn, pn, mn = function (e) { hn[un][e] = !0 }, gn = {}, vn = !r((function () { function e() { } return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype })), yn = W("IE_PROTO"), bn = Object.prototype, wn = vn ? Object.getPrototypeOf : function (e) { return e = Me(e), b(e, yn) ? e[yn] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? bn : null }, kn = Qe("iterator"), Tn = !1;[].keys && ("next" in (pn = [].keys()) ? (dn = wn(wn(pn))) !== Object.prototype && (fn = dn) : Tn = !0), null == fn && (fn = {}), b(fn, kn) || O(fn, kn, (function () { return this })); var Sn = { IteratorPrototype: fn, BUGGY_SAFARI_ITERATORS: Tn }, En = Sn.IteratorPrototype, An = function () { return this }, Cn = function (e, t, n) { var i = t + " Iterator"; return e.prototype = Ve(En, { next: c(1, n) }), it(e, i, !1), gn[i] = An, e }, Pn = Object.setPrototypeOf || ("__proto__" in {} ? function () { var e, t = !1, n = {}; try { (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array } catch (e) { } return function (n, i) { return C(n), function (e) { if (!g(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype") }(i), t ? e.call(n, i) : n.__proto__ = i, n } }() : void 0), xn = Sn.IteratorPrototype, On = Sn.BUGGY_SAFARI_ITERATORS, In = Qe("iterator"), Ln = "keys", jn = "values", Nn = "entries", Rn = function () { return this }, Mn = function (e, t, n, i, r, o, a) { Cn(n, t, i); var s, l, c, u = function (e) { if (e === r && m) return m; if (!On && e in d) return d[e]; switch (e) { case Ln: case jn: case Nn: return function () { return new n(this, e) } }return function () { return new n(this) } }, h = t + " Iterator", f = !1, d = e.prototype, p = d[In] || d["@@iterator"] || r && d[r], m = !On && p || u(r), g = "Array" == t && d.entries || p; if (g && (s = wn(g.call(new e)), xn !== Object.prototype && s.next && (wn(s) !== xn && (Pn ? Pn(s, xn) : "function" != typeof s[In] && O(s, In, Rn)), it(s, h, !0))), r == jn && p && p.name !== jn && (f = !0, m = function () { return p.call(this) }), d[In] !== m && O(d, In, m), gn[t] = m, r) if (l = { values: u(jn), keys: o ? m : u(Ln), entries: u(Nn) }, a) for (c in l) (On || f || !(c in d)) && te(d, c, l[c]); else Le({ target: t, proto: !0, forced: On || f }, l); return l }, _n = "Array Iterator", Un = ee.set, Dn = ee.getterFor(_n), Fn = Mn(Array, "Array", (function (e, t) { Un(this, { type: _n, target: m(e), index: 0, kind: t }) }), (function () { var e = Dn(this), t = e.target, n = e.kind, i = e.index++; return !t || i >= t.length ? (e.target = void 0, { value: void 0, done: !0 }) : "keys" == n ? { value: i, done: !1 } : "values" == n ? { value: t[i], done: !1 } : { value: [i, t[i]], done: !1 } }), "values"); gn.Arguments = gn.Array, mn("keys"), mn("values"), mn("entries"); var qn = [].join, Hn = d != Object, Bn = Gt("join", ","); Le({ target: "Array", proto: !0, forced: Hn || !Bn }, { join: function (e) { return qn.call(m(this), void 0 === e ? "," : e) } }); var Vn, zn, Wn = function (e, t, n) { var i = v(t); i in e ? x.f(e, i, c(0, n)) : e[i] = n }, Kn = re("navigator", "userAgent") || "", $$n = i.process, Yn = $$n && $$n.versions, Gn = Yn && Yn.v8; Gn ? zn = (Vn = Gn.split("."))[0] + Vn[1] : Kn && (!(Vn = Kn.match(/Edge\/(\d+)/)) || Vn[1] >= 74) && (Vn = Kn.match(/Chrome\/(\d+)/)) && (zn = Vn[1]); var Xn = zn && +zn, Qn = Qe("species"), Jn = function (e) { return Xn >= 51 || !r((function () { var t = []; return (t.constructor = {})[Qn] = function () { return { foo: 1 } }, 1 !== t[e](Boolean).foo })) }, Zn = Jn("slice"), ei = Zt("slice", { ACCESSORS: !0, 0: 0, 1: 2 }), ti = Qe("species"), ni = [].slice, ii = Math.max; Le({ target: "Array", proto: !0, forced: !Zn || !ei }, { slice: function (e, t) { var n, i, r, o = m(this), a = ce(o.length), s = fe(e, a), l = fe(void 0 === t ? a : t, a); if (Re(o) && ("function" != typeof (n = o.constructor) || n !== Array && !Re(n.prototype) ? g(n) && null === (n = n[ti]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return ni.call(o, s, l); for (i = new (void 0 === n ? Array : n)(ii(l - s, 0)), r = 0; s < l; s++, r++)s in o && Wn(i, r, o[s]); return i.length = r, i } }); var ri = {}; ri[Qe("toStringTag")] = "z"; var oi = "[object z]" === String(ri), ai = Qe("toStringTag"), si = "Arguments" == h(function () { return arguments }()), li = oi ? h : function (e) { var t, n, i; return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) { try { return e[t] } catch (e) { } }(t = Object(e), ai)) ? n : si ? h(t) : "Object" == (i = h(t)) && "function" == typeof t.callee ? "Arguments" : i }, ci = oi ? {}.toString : function () { return "[object " + li(this) + "]" }; oi || te(Object.prototype, "toString", ci, { unsafe: !0 }); var ui = function () { var e = C(this), t = ""; return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t }; function hi(e, t) { return RegExp(e, t) } var fi = { UNSUPPORTED_Y: r((function () { var e = hi("a", "y"); return e.lastIndex = 2, null != e.exec("abcd") })), BROKEN_CARET: r((function () { var e = hi("^r", "gy"); return e.lastIndex = 2, null != e.exec("str") })) }, di = RegExp.prototype.exec, pi = String.prototype.replace, mi = di, gi = function () { var e = /a/, t = /b*/g; return di.call(e, "a"), di.call(t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex }(), vi = fi.UNSUPPORTED_Y || fi.BROKEN_CARET, yi = void 0 !== /()??/.exec("")[1]; (gi || yi || vi) && (mi = function (e) { var t, n, i, r, o = this, a = vi && o.sticky, s = ui.call(o), l = o.source, c = 0, u = e; return a && (-1 === (s = s.replace("y", "")).indexOf("g") && (s += "g"), u = String(e).slice(o.lastIndex), o.lastIndex > 0 && (!o.multiline || o.multiline && "\n" !== e[o.lastIndex - 1]) && (l = "(?: " + l + ")", u = " " + u, c++), n = new RegExp("^(?:" + l + ")", s)), yi && (n = new RegExp("^" + l + "$$(?!\\s)", s)), gi && (t = o.lastIndex), i = di.call(a ? n : o, u), a ? i ? (i.input = i.input.slice(c), i[0] = i[0].slice(c), i.index = o.lastIndex, o.lastIndex += i[0].length) : o.lastIndex = 0 : gi && i && (o.lastIndex = o.global ? i.index + i[0].length : t), yi && i && i.length > 1 && pi.call(i[0], n, (function () { for (r = 1; r < arguments.length - 2; r++)void 0 === arguments[r] && (i[r] = void 0) })), i }); var bi = mi; Le({ target: "RegExp", proto: !0, forced: /./.exec !== bi }, { exec: bi }); var wi = "toString", ki = RegExp.prototype, Ti = ki.toString, Si = r((function () { return "/a/b" != Ti.call({ source: "a", flags: "b" }) })), Ei = Ti.name != wi; (Si || Ei) && te(RegExp.prototype, wi, (function () { var e = C(this), t = String(e.source), n = e.flags; return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in ki) ? ui.call(e) : n) }), { unsafe: !0 }); var Ai = function (e) { return function (t, n) { var i, r, o = String(p(t)), a = se(n), s = o.length; return a < 0 || a >= s ? e ? "" : void 0 : (i = o.charCodeAt(a)) < 55296 || i > 56319 || a + 1 === s || (r = o.charCodeAt(a + 1)) < 56320 || r > 57343 ? e ? o.charAt(a) : i : e ? o.slice(a, a + 2) : r - 56320 + (i - 55296 << 10) + 65536 } }, Ci = { codeAt: Ai(!1), charAt: Ai(!0) }, Pi = Ci.charAt, xi = "String Iterator", Oi = ee.set, Ii = ee.getterFor(xi); Mn(String, "String", (function (e) { Oi(this, { type: xi, string: String(e), index: 0 }) }), (function () { var e, t = Ii(this), n = t.string, i = t.index; return i >= n.length ? { value: void 0, done: !0 } : (e = Pi(n, i), t.index += e.length, { value: e, done: !1 }) })); var Li = Qe("species"), ji = !r((function () { var e = /./; return e.exec = function () { var e = []; return e.groups = { a: "7" }, e }, "7" !== "".replace(e, "$$<a>") })), Ni = "$$0" === "a".replace(/./, "$$0"), Ri = Qe("replace"), Mi = !!/./[Ri] && "" === /./[Ri]("a", "$$0"), _i = !r((function () { var e = /(?:)/, t = e.exec; e.exec = function () { return t.apply(this, arguments) }; var n = "ab".split(e); return 2 !== n.length || "a" !== n[0] || "b" !== n[1] })), Ui = function (e, t, n, i) { var o = Qe(e), a = !r((function () { var t = {}; return t[o] = function () { return 7 }, 7 != ""[e](t) })), s = a && !r((function () { var t = !1, n = /a/; return "split" === e && ((n = {}).constructor = {}, n.constructor[Li] = function () { return n }, n.flags = "", n[o] = /./[o]), n.exec = function () { return t = !0, null }, n[o](""), !t })); if (!a || !s || "replace" === e && (!ji || !Ni || Mi) || "split" === e && !_i) { var l = /./[o], c = n(o, ""[e], (function (e, t, n, i, r) { return t.exec === bi ? a && !r ? { done: !0, value: l.call(t, n, i) } : { done: !0, value: e.call(n, t, i) } : { done: !1 } }), { REPLACE_KEEPS_$$0: Ni, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: Mi }), u = c[0], h = c[1]; te(String.prototype, e, u), te(RegExp.prototype, o, 2 == t ? function (e, t) { return h.call(e, this, t) } : function (e) { return h.call(e, this) }) } i && O(RegExp.prototype[o], "sham", !0) }, Di = Ci.charAt, Fi = function (e, t, n) { return t + (n ? Di(e, t).length : 1) }, qi = function (e, t) { var n = e.exec; if ("function" == typeof n) { var i = n.call(e, t); if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null"); return i } if ("RegExp" !== h(e)) throw TypeError("RegExp#exec called on incompatible receiver"); return bi.call(e, t) }, Hi = Math.max, Bi = Math.min, Vi = Math.floor, zi = /\$$([$$&'`]|\d\d?|<[^>]*>)/g, Wi = /\$$([$$&'`]|\d\d?)/g; Ui("replace", 2, (function (e, t, n, i) { var r = i.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE, o = i.REPLACE_KEEPS_$$0, a = r ? "$$" : "$$0"; return [function (n, i) { var r = p(this), o = null == n ? void 0 : n[e]; return void 0 !== o ? o.call(n, r, i) : t.call(String(r), n, i) }, function (e, i) { if (!r && o || "string" == typeof i && -1 === i.indexOf(a)) { var l = n(t, e, this, i); if (l.done) return l.value } var c = C(e), u = String(this), h = "function" == typeof i; h || (i = String(i)); var f = c.global; if (f) { var d = c.unicode; c.lastIndex = 0 } for (var p = []; ;) { var m = qi(c, u); if (null === m) break; if (p.push(m), !f) break; "" === String(m[0]) && (c.lastIndex = Fi(u, ce(c.lastIndex), d)) } for (var g, v = "", y = 0, b = 0; b < p.length; b++) { m = p[b]; for (var w = String(m[0]), k = Hi(Bi(se(m.index), u.length), 0), T = [], S = 1; S < m.length; S++)T.push(void 0 === (g = m[S]) ? g : String(g)); var E = m.groups; if (h) { var A = [w].concat(T, k, u); void 0 !== E && A.push(E); var P = String(i.apply(void 0, A)) } else P = s(w, u, k, T, E, i); k >= y && (v += u.slice(y, k) + P, y = k + w.length) } return v + u.slice(y) }]; function s(e, n, i, r, o, a) { var s = i + e.length, l = r.length, c = Wi; return void 0 !== o && (o = Me(o), c = zi), t.call(a, c, (function (t, a) { var c; switch (a.charAt(0)) { case "$$": return "$$"; case "&": return e; case "`": return n.slice(0, i); case "'": return n.slice(s); case "<": c = o[a.slice(1, -1)]; break; default: var u = +a; if (0 === u) return t; if (u > l) { var h = Vi(u / 10); return 0 === h ? t : h <= l ? void 0 === r[h - 1] ? a.charAt(1) : r[h - 1] + a.charAt(1) : t } c = r[u - 1] }return void 0 === c ? "" : c })) } })); var Ki = Object.is || function (e, t) { return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t }; Ui("search", 1, (function (e, t, n) { return [function (t) { var n = p(this), i = null == t ? void 0 : t[e]; return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n)) }, function (e) { var i = n(t, e, this); if (i.done) return i.value; var r = C(e), o = String(this), a = r.lastIndex; Ki(a, 0) || (r.lastIndex = 0); var s = qi(r, o); return Ki(r.lastIndex, a) || (r.lastIndex = a), null === s ? -1 : s.index }] })); var $$i = Qe("match"), Yi = function (e) { var t; return g(e) && (void 0 !== (t = e[$$i]) ? !!t : "RegExp" == h(e)) }, Gi = Qe("species"), Xi = function (e, t) { var n, i = C(e).constructor; return void 0 === i || null == (n = C(i)[Gi]) ? t : rt(n) }, Qi = [].push, Ji = Math.min, Zi = 4294967295, er = !r((function () { return !RegExp(Zi, "y") })); Ui("split", 2, (function (e, t, n) { var i; return i = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (e, n) { var i = String(p(this)), r = void 0 === n ? Zi : n >>> 0; if (0 === r) return []; if (void 0 === e) return [i]; if (!Yi(e)) return t.call(i, e, r); for (var o, a, s, l = [], c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), u = 0, h = new RegExp(e.source, c + "g"); (o = bi.call(h, i)) && !((a = h.lastIndex) > u && (l.push(i.slice(u, o.index)), o.length > 1 && o.index < i.length && Qi.apply(l, o.slice(1)), s = o[0].length, u = a, l.length >= r));)h.lastIndex === o.index && h.lastIndex++; return u === i.length ? !s && h.test("") || l.push("") : l.push(i.slice(u)), l.length > r ? l.slice(0, r) : l } : "0".split(void 0, 0).length ? function (e, n) { return void 0 === e && 0 === n ? [] : t.call(this, e, n) } : t, [function (t, n) { var r = p(this), o = null == t ? void 0 : t[e]; return void 0 !== o ? o.call(t, r, n) : i.call(String(r), t, n) }, function (e, r) { var o = n(i, e, this, r, i !== t); if (o.done) return o.value; var a = C(e), s = String(this), l = Xi(a, RegExp), c = a.unicode, u = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (er ? "y" : "g"), h = new l(er ? a : "^(?:" + a.source + ")", u), f = void 0 === r ? Zi : r >>> 0; if (0 === f) return []; if (0 === s.length) return null === qi(h, s) ? [s] : []; for (var d = 0, p = 0, m = []; p < s.length;) { h.lastIndex = er ? p : 0; var g, v = qi(h, er ? s : s.slice(p)); if (null === v || (g = Ji(ce(h.lastIndex + (er ? 0 : p)), s.length)) === d) p = Fi(s, p, c); else { if (m.push(s.slice(d, p)), m.length === f) return m; for (var y = 1; y <= v.length - 1; y++)if (m.push(v[y]), m.length === f) return m; p = d = g } } return m.push(s.slice(d)), m }] }), !er); var tr = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 }; for (var nr in tr) { var ir = i[nr], rr = ir && ir.prototype; if (rr && rr.forEach !== rn) try { O(rr, "forEach", rn) } catch (e) { rr.forEach = rn } } var or = Qe("iterator"), ar = Qe("toStringTag"), sr = Fn.values; for (var lr in tr) { var cr = i[lr], ur = cr && cr.prototype; if (ur) { if (ur[or] !== sr) try { O(ur, or, sr) } catch (e) { ur[or] = sr } if (ur[ar] || O(ur, ar, lr), tr[lr]) for (var hr in Fn) if (ur[hr] !== Fn[hr]) try { O(ur, hr, Fn[hr]) } catch (e) { ur[hr] = Fn[hr] } } } var fr = Qe("iterator"), dr = !r((function () { var e = new URL("b?a=1&b=2&c=3", "http://a"), t = e.searchParams, n = ""; return e.pathname = "c%20d", t.forEach((function (e, i) { t.delete("b"), n += i + e })), !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[fr] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://Ñ‚ÐµÑÑ‚").host || "#%D0%B1" !== new URL("http://a#Ð±").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host })), pr = function (e, t, n) { if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation"); return e }, mr = Object.assign, gr = Object.defineProperty, vr = !mr || r((function () { if (o && 1 !== mr({ b: 1 }, mr(gr({}, "a", { enumerable: !0, get: function () { gr(this, "b", { value: 3, enumerable: !1 }) } }), { b: 2 })).b) return !0; var e = {}, t = {}, n = Symbol(), i = "abcdefghijklmnopqrst"; return e[n] = 7, i.split("").forEach((function (e) { t[e] = e })), 7 != mr({}, e)[n] || _e(mr({}, t)).join("") != i })) ? function (e, t) { for (var n = Me(e), i = arguments.length, r = 1, a = we.f, s = l.f; i > r;)for (var c, u = d(arguments[r++]), h = a ? _e(u).concat(a(u)) : _e(u), f = h.length, p = 0; f > p;)c = h[p++], o && !s.call(u, c) || (n[c] = u[c]); return n } : mr, yr = function (e) { var t = e.return; if (void 0 !== t) return C(t.call(e)).value }, br = function (e, t, n, i) { try { return i ? t(C(n)[0], n[1]) : t(n) } catch (t) { throw yr(e), t } }, wr = Qe("iterator"), kr = Array.prototype, Tr = function (e) { return void 0 !== e && (gn.Array === e || kr[wr] === e) }, Sr = Qe("iterator"), Er = function (e) { if (null != e) return e[Sr] || e["@@iterator"] || gn[li(e)] }, Ar = function (e) { var t, n, i, r, o, a, s = Me(e), l = "function" == typeof this ? this : Array, c = arguments.length, u = c > 1 ? arguments[1] : void 0, h = void 0 !== u, f = Er(s), d = 0; if (h && (u = ot(u, c > 2 ? arguments[2] : void 0, 2)), null == f || l == Array && Tr(f)) for (n = new l(t = ce(s.length)); t > d; d++)a = h ? u(s[d], d) : s[d], Wn(n, d, a); else for (o = (r = f.call(s)).next, n = new l; !(i = o.call(r)).done; d++)a = h ? br(r, u, [i.value, d], !0) : i.value, Wn(n, d, a); return n.length = d, n }, Cr = 2147483647, Pr = /[^\0-\u007E]/, xr = /[.\u3002\uFF0E\uFF61]/g, Or = "Overflow: input needs wider integers to process", Ir = Math.floor, Lr = String.fromCharCode, jr = function (e) { return e + 22 + 75 * (e < 26) }, Nr = function (e, t, n) { var i = 0; for (e = n ? Ir(e / 700) : e >> 1, e += Ir(e / t); e > 455; i += 36)e = Ir(e / 35); return Ir(i + 36 * e / (e + 38)) }, Rr = function (e) { var t, n, i = [], r = (e = function (e) { for (var t = [], n = 0, i = e.length; n < i;) { var r = e.charCodeAt(n++); if (r >= 55296 && r <= 56319 && n < i) { var o = e.charCodeAt(n++); 56320 == (64512 & o) ? t.push(((1023 & r) << 10) + (1023 & o) + 65536) : (t.push(r), n--) } else t.push(r) } return t }(e)).length, o = 128, a = 0, s = 72; for (t = 0; t < e.length; t++)(n = e[t]) < 128 && i.push(Lr(n)); var l = i.length, c = l; for (l && i.push("-"); c < r;) { var u = Cr; for (t = 0; t < e.length; t++)(n = e[t]) >= o && n < u && (u = n); var h = c + 1; if (u - o > Ir((Cr - a) / h)) throw RangeError(Or); for (a += (u - o) * h, o = u, t = 0; t < e.length; t++) { if ((n = e[t]) < o && ++a > Cr) throw RangeError(Or); if (n == o) { for (var f = a, d = 36; ; d += 36) { var p = d <= s ? 1 : d >= s + 26 ? 26 : d - s; if (f < p) break; var m = f - p, g = 36 - p; i.push(Lr(jr(p + m % g))), f = Ir(m / g) } i.push(Lr(jr(f))), s = Nr(a, h, c == l), a = 0, ++c } } ++a, ++o } return i.join("") }, Mr = function (e, t, n) { for (var i in t) te(e, i, t[i], n); return e }, _r = function (e) { var t = Er(e); if ("function" != typeof t) throw TypeError(String(e) + " is not iterable"); return C(t.call(e)) }, Ur = re("fetch"), Dr = re("Headers"), Fr = Qe("iterator"), qr = "URLSearchParams", Hr = "URLSearchParamsIterator", Br = ee.set, Vr = ee.getterFor(qr), zr = ee.getterFor(Hr), Wr = /\+/g, Kr = Array(4), $$r = function (e) { return Kr[e - 1] || (Kr[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi")) }, Yr = function (e) { try { return decodeURIComponent(e) } catch (t) { return e } }, Gr = function (e) { var t = e.replace(Wr, " "), n = 4; try { return decodeURIComponent(t) } catch (e) { for (; n;)t = t.replace($$r(n--), Yr); return t } }, Xr = /[!'()~]|%20/g, Qr = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" }, Jr = function (e) { return Qr[e] }, Zr = function (e) { return encodeURIComponent(e).replace(Xr, Jr) }, eo = function (e, t) { if (t) for (var n, i, r = t.split("&"), o = 0; o < r.length;)(n = r[o++]).length && (i = n.split("="), e.push({ key: Gr(i.shift()), value: Gr(i.join("=")) })) }, to = function (e) { this.entries.length = 0, eo(this.entries, e) }, no = function (e, t) { if (e < t) throw TypeError("Not enough arguments") }, io = Cn((function (e, t) { Br(this, { type: Hr, iterator: _r(Vr(e).entries), kind: t }) }), "Iterator", (function () { var e = zr(this), t = e.kind, n = e.iterator.next(), i = n.value; return n.done || (n.value = "keys" === t ? i.key : "values" === t ? i.value : [i.key, i.value]), n })), ro = function () { pr(this, ro, qr); var e, t, n, i, r, o, a, s, l, c = arguments.length > 0 ? arguments[0] : void 0, u = this, h = []; if (Br(u, { type: qr, entries: h, updateURL: function () { }, updateSearchParams: to }), void 0 !== c) if (g(c)) if ("function" == typeof (e = Er(c))) for (n = (t = e.call(c)).next; !(i = n.call(t)).done;) { if ((a = (o = (r = _r(C(i.value))).next).call(r)).done || (s = o.call(r)).done || !o.call(r).done) throw TypeError("Expected sequence with length 2"); h.push({ key: a.value + "", value: s.value + "" }) } else for (l in c) b(c, l) && h.push({ key: l, value: c[l] + "" }); else eo(h, "string" == typeof c ? "?" === c.charAt(0) ? c.slice(1) : c : c + "") }, oo = ro.prototype; Mr(oo, { append: function (e, t) { no(arguments.length, 2); var n = Vr(this); n.entries.push({ key: e + "", value: t + "" }), n.updateURL() }, delete: function (e) { no(arguments.length, 1); for (var t = Vr(this), n = t.entries, i = e + "", r = 0; r < n.length;)n[r].key === i ? n.splice(r, 1) : r++; t.updateURL() }, get: function (e) { no(arguments.length, 1); for (var t = Vr(this).entries, n = e + "", i = 0; i < t.length; i++)if (t[i].key === n) return t[i].value; return null }, getAll: function (e) { no(arguments.length, 1); for (var t = Vr(this).entries, n = e + "", i = [], r = 0; r < t.length; r++)t[r].key === n && i.push(t[r].value); return i }, has: function (e) { no(arguments.length, 1); for (var t = Vr(this).entries, n = e + "", i = 0; i < t.length;)if (t[i++].key === n) return !0; return !1 }, set: function (e, t) { no(arguments.length, 1); for (var n, i = Vr(this), r = i.entries, o = !1, a = e + "", s = t + "", l = 0; l < r.length; l++)(n = r[l]).key === a && (o ? r.splice(l--, 1) : (o = !0, n.value = s)); o || r.push({ key: a, value: s }), i.updateURL() }, sort: function () { var e, t, n, i = Vr(this), r = i.entries, o = r.slice(); for (r.length = 0, n = 0; n < o.length; n++) { for (e = o[n], t = 0; t < n; t++)if (r[t].key > e.key) { r.splice(t, 0, e); break } t === n && r.push(e) } i.updateURL() }, forEach: function (e) { for (var t, n = Vr(this).entries, i = ot(e, arguments.length > 1 ? arguments[1] : void 0, 3), r = 0; r < n.length;)i((t = n[r++]).value, t.key, this) }, keys: function () { return new io(this, "keys") }, values: function () { return new io(this, "values") }, entries: function () { return new io(this, "entries") } }, { enumerable: !0 }), te(oo, Fr, oo.entries), te(oo, "toString", (function () { for (var e, t = Vr(this).entries, n = [], i = 0; i < t.length;)e = t[i++], n.push(Zr(e.key) + "=" + Zr(e.value)); return n.join("&") }), { enumerable: !0 }), it(ro, qr), Le({ global: !0, forced: !dr }, { URLSearchParams: ro }), dr || "function" != typeof Ur || "function" != typeof Dr || Le({ global: !0, enumerable: !0, forced: !0 }, { fetch: function (e) { var t, n, i, r = [e]; return arguments.length > 1 && (g(t = arguments[1]) && (n = t.body, li(n) === qr && ((i = t.headers ? new Dr(t.headers) : new Dr).has("content-type") || i.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), t = Ve(t, { body: c(0, String(n)), headers: c(0, i) }))), r.push(t)), Ur.apply(this, r) } }); var ao, so = { URLSearchParams: ro, getState: Vr }, lo = Ci.codeAt, co = i.URL, uo = so.URLSearchParams, ho = so.getState, fo = ee.set, po = ee.getterFor("URL"), mo = Math.floor, go = Math.pow, vo = "Invalid scheme", yo = "Invalid host", bo = "Invalid port", wo = /[A-Za-z]/, ko = /[\d+-.A-Za-z]/, To = /\d/, So = /^(0x|0X)/, Eo = /^[0-7]+$$/, Ao = /^\d+$$/, Co = /^[\dA-Fa-f]+$$/, Po = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/, xo = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/, Oo = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$$/g, Io = /[\u0009\u000A\u000D]/g, Lo = function (e, t) { var n, i, r; if ("[" == t.charAt(0)) { if ("]" != t.charAt(t.length - 1)) return yo; if (!(n = No(t.slice(1, -1)))) return yo; e.host = n } else if (Ho(e)) { if (t = function (e) { var t, n, i = [], r = e.toLowerCase().replace(xr, ".").split("."); for (t = 0; t < r.length; t++)n = r[t], i.push(Pr.test(n) ? "xn--" + Rr(n) : n); return i.join(".") }(t), Po.test(t)) return yo; if (null === (n = jo(t))) return yo; e.host = n } else { if (xo.test(t)) return yo; for (n = "", i = Ar(t), r = 0; r < i.length; r++)n += Fo(i[r], Mo); e.host = n } }, jo = function (e) { var t, n, i, r, o, a, s, l = e.split("."); if (l.length && "" == l[l.length - 1] && l.pop(), (t = l.length) > 4) return e; for (n = [], i = 0; i < t; i++) { if ("" == (r = l[i])) return e; if (o = 10, r.length > 1 && "0" == r.charAt(0) && (o = So.test(r) ? 16 : 8, r = r.slice(8 == o ? 1 : 2)), "" === r) a = 0; else { if (!(10 == o ? Ao : 8 == o ? Eo : Co).test(r)) return e; a = parseInt(r, o) } n.push(a) } for (i = 0; i < t; i++)if (a = n[i], i == t - 1) { if (a >= go(256, 5 - t)) return null } else if (a > 255) return null; for (s = n.pop(), i = 0; i < n.length; i++)s += n[i] * go(256, 3 - i); return s }, No = function (e) { var t, n, i, r, o, a, s, l = [0, 0, 0, 0, 0, 0, 0, 0], c = 0, u = null, h = 0, f = function () { return e.charAt(h) }; if (":" == f()) { if (":" != e.charAt(1)) return; h += 2, u = ++c } for (; f();) { if (8 == c) return; if (":" != f()) { for (t = n = 0; n < 4 && Co.test(f());)t = 16 * t + parseInt(f(), 16), h++, n++; if ("." == f()) { if (0 == n) return; if (h -= n, c > 6) return; for (i = 0; f();) { if (r = null, i > 0) { if (!("." == f() && i < 4)) return; h++ } if (!To.test(f())) return; for (; To.test(f());) { if (o = parseInt(f(), 10), null === r) r = o; else { if (0 == r) return; r = 10 * r + o } if (r > 255) return; h++ } l[c] = 256 * l[c] + r, 2 != ++i && 4 != i || c++ } if (4 != i) return; break } if (":" == f()) { if (h++, !f()) return } else if (f()) return; l[c++] = t } else { if (null !== u) return; h++, u = ++c } } if (null !== u) for (a = c - u, c = 7; 0 != c && a > 0;)s = l[c], l[c--] = l[u + a - 1], l[u + --a] = s; else if (8 != c) return; return l }, Ro = function (e) { var t, n, i, r; if ("number" == typeof e) { for (t = [], n = 0; n < 4; n++)t.unshift(e % 256), e = mo(e / 256); return t.join(".") } if ("object" == typeof e) { for (t = "", i = function (e) { for (var t = null, n = 1, i = null, r = 0, o = 0; o < 8; o++)0 !== e[o] ? (r > n && (t = i, n = r), i = null, r = 0) : (null === i && (i = o), ++r); return r > n && (t = i, n = r), t }(e), n = 0; n < 8; n++)r && 0 === e[n] || (r && (r = !1), i === n ? (t += n ? ":" : "::", r = !0) : (t += e[n].toString(16), n < 7 && (t += ":"))); return "[" + t + "]" } return e }, Mo = {}, _o = vr({}, Mo, { " ": 1, '"': 1, "<": 1, ">": 1, "`": 1 }), Uo = vr({}, _o, { "#": 1, "?": 1, "{": 1, "}": 1 }), Do = vr({}, Uo, { "/": 1, ":": 1, ";": 1, "=": 1, "@": 1, "[": 1, "\\": 1, "]": 1, "^": 1, "|": 1 }), Fo = function (e, t) { var n = lo(e, 0); return n > 32 && n < 127 && !b(t, e) ? e : encodeURIComponent(e) }, qo = { ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443 }, Ho = function (e) { return b(qo, e.scheme) }, Bo = function (e) { return "" != e.username || "" != e.password }, Vo = function (e) { return !e.host || e.cannotBeABaseURL || "file" == e.scheme }, zo = function (e, t) { var n; return 2 == e.length && wo.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n) }, Wo = function (e) { var t; return e.length > 1 && zo(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t) }, Ko = function (e) { var t = e.path, n = t.length; !n || "file" == e.scheme && 1 == n && zo(t[0], !0) || t.pop() }, $$o = function (e) { return "." === e || "%2e" === e.toLowerCase() }, Yo = {}, Go = {}, Xo = {}, Qo = {}, Jo = {}, Zo = {}, ea = {}, ta = {}, na = {}, ia = {}, ra = {}, oa = {}, aa = {}, sa = {}, la = {}, ca = {}, ua = {}, ha = {}, fa = {}, da = {}, pa = {}, ma = function (e, t, n, i) { var r, o, a, s, l, c = n || Yo, u = 0, h = "", f = !1, d = !1, p = !1; for (n || (e.scheme = "", e.username = "", e.password = "", e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(Oo, "")), t = t.replace(Io, ""), r = Ar(t); u <= r.length;) { switch (o = r[u], c) { case Yo: if (!o || !wo.test(o)) { if (n) return vo; c = Xo; continue } h += o.toLowerCase(), c = Go; break; case Go: if (o && (ko.test(o) || "+" == o || "-" == o || "." == o)) h += o.toLowerCase(); else { if (":" != o) { if (n) return vo; h = "", c = Xo, u = 0; continue } if (n && (Ho(e) != b(qo, h) || "file" == h && (Bo(e) || null !== e.port) || "file" == e.scheme && !e.host)) return; if (e.scheme = h, n) return void (Ho(e) && qo[e.scheme] == e.port && (e.port = null)); h = "", "file" == e.scheme ? c = sa : Ho(e) && i && i.scheme == e.scheme ? c = Qo : Ho(e) ? c = ta : "/" == r[u + 1] ? (c = Jo, u++) : (e.cannotBeABaseURL = !0, e.path.push(""), c = fa) } break; case Xo: if (!i || i.cannotBeABaseURL && "#" != o) return vo; if (i.cannotBeABaseURL && "#" == o) { e.scheme = i.scheme, e.path = i.path.slice(), e.query = i.query, e.fragment = "", e.cannotBeABaseURL = !0, c = pa; break } c = "file" == i.scheme ? sa : Zo; continue; case Qo: if ("/" != o || "/" != r[u + 1]) { c = Zo; continue } c = na, u++; break; case Jo: if ("/" == o) { c = ia; break } c = ha; continue; case Zo: if (e.scheme = i.scheme, o == ao) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query; else if ("/" == o || "\\" == o && Ho(e)) c = ea; else if ("?" == o) e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = "", c = da; else { if ("#" != o) { e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.path.pop(), c = ha; continue } e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, e.path = i.path.slice(), e.query = i.query, e.fragment = "", c = pa } break; case ea: if (!Ho(e) || "/" != o && "\\" != o) { if ("/" != o) { e.username = i.username, e.password = i.password, e.host = i.host, e.port = i.port, c = ha; continue } c = ia } else c = na; break; case ta: if (c = na, "/" != o || "/" != h.charAt(u + 1)) continue; u++; break; case na: if ("/" != o && "\\" != o) { c = ia; continue } break; case ia: if ("@" == o) { f && (h = "%40" + h), f = !0, a = Ar(h); for (var m = 0; m < a.length; m++) { var g = a[m]; if (":" != g || p) { var v = Fo(g, Do); p ? e.password += v : e.username += v } else p = !0 } h = "" } else if (o == ao || "/" == o || "?" == o || "#" == o || "\\" == o && Ho(e)) { if (f && "" == h) return "Invalid authority"; u -= Ar(h).length + 1, h = "", c = ra } else h += o; break; case ra: case oa: if (n && "file" == e.scheme) { c = ca; continue } if (":" != o || d) { if (o == ao || "/" == o || "?" == o || "#" == o || "\\" == o && Ho(e)) { if (Ho(e) && "" == h) return yo; if (n && "" == h && (Bo(e) || null !== e.port)) return; if (s = Lo(e, h)) return s; if (h = "", c = ua, n) return; continue } "[" == o ? d = !0 : "]" == o && (d = !1), h += o } else { if ("" == h) return yo; if (s = Lo(e, h)) return s; if (h = "", c = aa, n == oa) return } break; case aa: if (!To.test(o)) { if (o == ao || "/" == o || "?" == o || "#" == o || "\\" == o && Ho(e) || n) { if ("" != h) { var y = parseInt(h, 10); if (y > 65535) return bo; e.port = Ho(e) && y === qo[e.scheme] ? null : y, h = "" } if (n) return; c = ua; continue } return bo } h += o; break; case sa: if (e.scheme = "file", "/" == o || "\\" == o) c = la; else { if (!i || "file" != i.scheme) { c = ha; continue } if (o == ao) e.host = i.host, e.path = i.path.slice(), e.query = i.query; else if ("?" == o) e.host = i.host, e.path = i.path.slice(), e.query = "", c = da; else { if ("#" != o) { Wo(r.slice(u).join("")) || (e.host = i.host, e.path = i.path.slice(), Ko(e)), c = ha; continue } e.host = i.host, e.path = i.path.slice(), e.query = i.query, e.fragment = "", c = pa } } break; case la: if ("/" == o || "\\" == o) { c = ca; break } i && "file" == i.scheme && !Wo(r.slice(u).join("")) && (zo(i.path[0], !0) ? e.path.push(i.path[0]) : e.host = i.host), c = ha; continue; case ca: if (o == ao || "/" == o || "\\" == o || "?" == o || "#" == o) { if (!n && zo(h)) c = ha; else if ("" == h) { if (e.host = "", n) return; c = ua } else { if (s = Lo(e, h)) return s; if ("localhost" == e.host && (e.host = ""), n) return; h = "", c = ua } continue } h += o; break; case ua: if (Ho(e)) { if (c = ha, "/" != o && "\\" != o) continue } else if (n || "?" != o) if (n || "#" != o) { if (o != ao && (c = ha, "/" != o)) continue } else e.fragment = "", c = pa; else e.query = "", c = da; break; case ha: if (o == ao || "/" == o || "\\" == o && Ho(e) || !n && ("?" == o || "#" == o)) { if (".." === (l = (l = h).toLowerCase()) || "%2e." === l || ".%2e" === l || "%2e%2e" === l ? (Ko(e), "/" == o || "\\" == o && Ho(e) || e.path.push("")) : $$o(h) ? "/" == o || "\\" == o && Ho(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && zo(h) && (e.host && (e.host = ""), h = h.charAt(0) + ":"), e.path.push(h)), h = "", "file" == e.scheme && (o == ao || "?" == o || "#" == o)) for (; e.path.length > 1 && "" === e.path[0];)e.path.shift(); "?" == o ? (e.query = "", c = da) : "#" == o && (e.fragment = "", c = pa) } else h += Fo(o, Uo); break; case fa: "?" == o ? (e.query = "", c = da) : "#" == o ? (e.fragment = "", c = pa) : o != ao && (e.path[0] += Fo(o, Mo)); break; case da: n || "#" != o ? o != ao && ("'" == o && Ho(e) ? e.query += "%27" : e.query += "#" == o ? "%23" : Fo(o, Mo)) : (e.fragment = "", c = pa); break; case pa: o != ao && (e.fragment += Fo(o, _o)) }u++ } }, ga = function (e) { var t, n, i = pr(this, ga, "URL"), r = arguments.length > 1 ? arguments[1] : void 0, a = String(e), s = fo(i, { type: "URL" }); if (void 0 !== r) if (r instanceof ga) t = po(r); else if (n = ma(t = {}, String(r))) throw TypeError(n); if (n = ma(s, a, null, t)) throw TypeError(n); var l = s.searchParams = new uo, c = ho(l); c.updateSearchParams(s.query), c.updateURL = function () { s.query = String(l) || null }, o || (i.href = ya.call(i), i.origin = ba.call(i), i.protocol = wa.call(i), i.username = ka.call(i), i.password = Ta.call(i), i.host = Sa.call(i), i.hostname = Ea.call(i), i.port = Aa.call(i), i.pathname = Ca.call(i), i.search = Pa.call(i), i.searchParams = xa.call(i), i.hash = Oa.call(i)) }, va = ga.prototype, ya = function () { var e = po(this), t = e.scheme, n = e.username, i = e.password, r = e.host, o = e.port, a = e.path, s = e.query, l = e.fragment, c = t + ":"; return null !== r ? (c += "//", Bo(e) && (c += n + (i ? ":" + i : "") + "@"), c += Ro(r), null !== o && (c += ":" + o)) : "file" == t && (c += "//"), c += e.cannotBeABaseURL ? a[0] : a.length ? "/" + a.join("/") : "", null !== s && (c += "?" + s), null !== l && (c += "#" + l), c }, ba = function () { var e = po(this), t = e.scheme, n = e.port; if ("blob" == t) try { return new URL(t.path[0]).origin } catch (e) { return "null" } return "file" != t && Ho(e) ? t + "://" + Ro(e.host) + (null !== n ? ":" + n : "") : "null" }, wa = function () { return po(this).scheme + ":" }, ka = function () { return po(this).username }, Ta = function () { return po(this).password }, Sa = function () { var e = po(this), t = e.host, n = e.port; return null === t ? "" : null === n ? Ro(t) : Ro(t) + ":" + n }, Ea = function () { var e = po(this).host; return null === e ? "" : Ro(e) }, Aa = function () { var e = po(this).port; return null === e ? "" : String(e) }, Ca = function () { var e = po(this), t = e.path; return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : "" }, Pa = function () { var e = po(this).query; return e ? "?" + e : "" }, xa = function () { return po(this).searchParams }, Oa = function () { var e = po(this).fragment; return e ? "#" + e : "" }, Ia = function (e, t) { return { get: e, set: t, configurable: !0, enumerable: !0 } }; if (o && Ue(va, { href: Ia(ya, (function (e) { var t = po(this), n = String(e), i = ma(t, n); if (i) throw TypeError(i); ho(t.searchParams).updateSearchParams(t.query) })), origin: Ia(ba), protocol: Ia(wa, (function (e) { var t = po(this); ma(t, String(e) + ":", Yo) })), username: Ia(ka, (function (e) { var t = po(this), n = Ar(String(e)); if (!Vo(t)) { t.username = ""; for (var i = 0; i < n.length; i++)t.username += Fo(n[i], Do) } })), password: Ia(Ta, (function (e) { var t = po(this), n = Ar(String(e)); if (!Vo(t)) { t.password = ""; for (var i = 0; i < n.length; i++)t.password += Fo(n[i], Do) } })), host: Ia(Sa, (function (e) { var t = po(this); t.cannotBeABaseURL || ma(t, String(e), ra) })), hostname: Ia(Ea, (function (e) { var t = po(this); t.cannotBeABaseURL || ma(t, String(e), oa) })), port: Ia(Aa, (function (e) { var t = po(this); Vo(t) || ("" == (e = String(e)) ? t.port = null : ma(t, e, aa)) })), pathname: Ia(Ca, (function (e) { var t = po(this); t.cannotBeABaseURL || (t.path = [], ma(t, e + "", ua)) })), search: Ia(Pa, (function (e) { var t = po(this); "" == (e = String(e)) ? t.query = null : ("?" == e.charAt(0) && (e = e.slice(1)), t.query = "", ma(t, e, da)), ho(t.searchParams).updateSearchParams(t.query) })), searchParams: Ia(xa), hash: Ia(Oa, (function (e) { var t = po(this); "" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)), t.fragment = "", ma(t, e, pa)) : t.fragment = null })) }), te(va, "toJSON", (function () { return ya.call(this) }), { enumerable: !0 }), te(va, "toString", (function () { return ya.call(this) }), { enumerable: !0 }), co) { var La = co.createObjectURL, ja = co.revokeObjectURL; La && te(ga, "createObjectURL", (function (e) { return La.apply(co, arguments) })), ja && te(ga, "revokeObjectURL", (function (e) { return ja.apply(co, arguments) })) } function Na(e) { return (Na = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) } function Ra(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } function Ma(e, t) { for (var n = 0; n < t.length; n++) { var i = t[n]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i) } } function _a(e, t, n) { return t && Ma(e.prototype, t), n && Ma(e, n), e } function Ua(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e } function Da(e, t) { var n = Object.keys(e); if (Object.getOwnPropertySymbols) { var i = Object.getOwnPropertySymbols(e); t && (i = i.filter((function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), n.push.apply(n, i) } return n } function Fa(e) { for (var t = 1; t < arguments.length; t++) { var n = null != arguments[t] ? arguments[t] : {}; t % 2 ? Da(Object(n), !0).forEach((function (t) { Ua(e, t, n[t]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Da(Object(n)).forEach((function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t)) })) } return e } function qa(e, t) { if (null == e) return {}; var n, i, r = function (e, t) { if (null == e) return {}; var n, i, r = {}, o = Object.keys(e); for (i = 0; i < o.length; i++)n = o[i], t.indexOf(n) >= 0 || (r[n] = e[n]); return r }(e, t); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); for (i = 0; i < o.length; i++)n = o[i], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]) } return r } function Ha(e, t) { return function (e) { if (Array.isArray(e)) return e }(e) || function (e, t) { if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return; var n = [], i = !0, r = !1, o = void 0; try { for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0); } catch (e) { r = !0, o = e } finally { try { i || null == s.return || s.return() } finally { if (r) throw o } } return n }(e, t) || Va(e, t) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function Ba(e) { return function (e) { if (Array.isArray(e)) return za(e) }(e) || function (e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || Va(e) || function () { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function Va(e, t) { if (e) { if ("string" == typeof e) return za(e, t); var n = Object.prototype.toString.call(e).slice(8, -1); return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$$/.test(n) ? za(e, t) : void 0 } } function za(e, t) { (null == t || t > e.length) && (t = e.length); for (var n = 0, i = new Array(t); n < t; n++)i[n] = e[n]; return i } it(ga, "URL"), Le({ global: !0, forced: !dr, sham: !o }, { URL: ga }), function (e) { var t = function () { try { return !!Symbol.iterator } catch (e) { return !1 } }(), n = function (e) { var n = { next: function () { var t = e.shift(); return { done: void 0 === t, value: t } } }; return t && (n[Symbol.iterator] = function () { return n }), n }, i = function (e) { return encodeURIComponent(e).replace(/%20/g, "+") }, r = function (e) { return decodeURIComponent(String(e).replace(/\+/g, " ")) }; (function () { try { var t = e.URLSearchParams; return "a=1" === new t("?a=1").toString() && "function" == typeof t.prototype.set && "function" == typeof t.prototype.entries } catch (e) { return !1 } })() || function () { var r = function e(t) { Object.defineProperty(this, "_entries", { writable: !0, value: {} }); var n = Na(t); if ("undefined" === n); else if ("string" === n) "" !== t && this._fromString(t); else if (t instanceof e) { var i = this; t.forEach((function (e, t) { i.append(t, e) })) } else { if (null === t || "object" !== n) throw new TypeError("Unsupported input's type for URLSearchParams"); if ("[object Array]" === Object.prototype.toString.call(t)) for (var r = 0; r < t.length; r++) { var o = t[r]; if ("[object Array]" !== Object.prototype.toString.call(o) && 2 === o.length) throw new TypeError("Expected [string, any] as entry at index " + r + " of URLSearchParams's input"); this.append(o[0], o[1]) } else for (var a in t) t.hasOwnProperty(a) && this.append(a, t[a]) } }, o = r.prototype; o.append = function (e, t) { e in this._entries ? this._entries[e].push(String(t)) : this._entries[e] = [String(t)] }, o.delete = function (e) { delete this._entries[e] }, o.get = function (e) { return e in this._entries ? this._entries[e][0] : null }, o.getAll = function (e) { return e in this._entries ? this._entries[e].slice(0) : [] }, o.has = function (e) { return e in this._entries }, o.set = function (e, t) { this._entries[e] = [String(t)] }, o.forEach = function (e, t) { var n; for (var i in this._entries) if (this._entries.hasOwnProperty(i)) { n = this._entries[i]; for (var r = 0; r < n.length; r++)e.call(t, n[r], i, this) } }, o.keys = function () { var e = []; return this.forEach((function (t, n) { e.push(n) })), n(e) }, o.values = function () { var e = []; return this.forEach((function (t) { e.push(t) })), n(e) }, o.entries = function () { var e = []; return this.forEach((function (t, n) { e.push([n, t]) })), n(e) }, t && (o[Symbol.iterator] = o.entries), o.toString = function () { var e = []; return this.forEach((function (t, n) { e.push(i(n) + "=" + i(t)) })), e.join("&") }, e.URLSearchParams = r }(); var o = e.URLSearchParams.prototype; "function" != typeof o.sort && (o.sort = function () { var e = this, t = []; this.forEach((function (n, i) { t.push([i, n]), e._entries || e.delete(i) })), t.sort((function (e, t) { return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0 })), e._entries && (e._entries = {}); for (var n = 0; n < t.length; n++)this.append(t[n][0], t[n][1]) }), "function" != typeof o._fromString && Object.defineProperty(o, "_fromString", { enumerable: !1, configurable: !1, writable: !1, value: function (e) { if (this._entries) this._entries = {}; else { var t = []; this.forEach((function (e, n) { t.push(n) })); for (var n = 0; n < t.length; n++)this.delete(t[n]) } var i, o = (e = e.replace(/^\?/, "")).split("&"); for (n = 0; n < o.length; n++)i = o[n].split("="), this.append(r(i[0]), i.length > 1 ? r(i[1]) : "") } }) }(void 0 !== e ? e : "undefined" != typeof window ? window : "undefined" != typeof self ? self : e), function (e) { if (function () { try { var t = new e.URL("b", "http://a"); return t.pathname = "c d", "http://a/c%20d" === t.href && t.searchParams } catch (e) { return !1 } }() || function () { var t = e.URL, n = function (t, n) { "string" != typeof t && (t = String(t)), n && "string" != typeof n && (n = String(n)); var i, r = document; if (n && (void 0 === e.location || n !== e.location.href)) { n = n.toLowerCase(), (i = (r = document.implementation.createHTMLDocument("")).createElement("base")).href = n, r.head.appendChild(i); try { if (0 !== i.href.indexOf(n)) throw new Error(i.href) } catch (e) { throw new Error("URL unable to set base " + n + " due to " + e) } } var o = r.createElement("a"); o.href = t, i && (r.body.appendChild(o), o.href = o.href); var a = r.createElement("input"); if (a.type = "url", a.value = t, ":" === o.protocol || !/:/.test(o.href) || !a.checkValidity() && !n) throw new TypeError("Invalid URL"); Object.defineProperty(this, "_anchorElement", { value: o }); var s = new e.URLSearchParams(this.search), l = !0, c = !0, u = this;["append", "delete", "set"].forEach((function (e) { var t = s[e]; s[e] = function () { t.apply(s, arguments), l && (c = !1, u.search = s.toString(), c = !0) } })), Object.defineProperty(this, "searchParams", { value: s, enumerable: !0 }); var h = void 0; Object.defineProperty(this, "_updateSearchParams", { enumerable: !1, configurable: !1, writable: !1, value: function () { this.search !== h && (h = this.search, c && (l = !1, this.searchParams._fromString(this.search), l = !0)) } }) }, i = n.prototype;["hash", "host", "hostname", "port", "protocol"].forEach((function (e) { !function (e) { Object.defineProperty(i, e, { get: function () { return this._anchorElement[e] }, set: function (t) { this._anchorElement[e] = t }, enumerable: !0 }) }(e) })), Object.defineProperty(i, "search", { get: function () { return this._anchorElement.search }, set: function (e) { this._anchorElement.search = e, this._updateSearchParams() }, enumerable: !0 }), Object.defineProperties(i, { toString: { get: function () { var e = this; return function () { return e.href } } }, href: { get: function () { return this._anchorElement.href.replace(/\?$$/, "") }, set: function (e) { this._anchorElement.href = e, this._updateSearchParams() }, enumerable: !0 }, pathname: { get: function () { return this._anchorElement.pathname.replace(/(^\/?)/, "/") }, set: function (e) { this._anchorElement.pathname = e }, enumerable: !0 }, origin: { get: function () { var e = { "http:": 80, "https:": 443, "ftp:": 21 }[this._anchorElement.protocol], t = this._anchorElement.port != e && "" !== this._anchorElement.port; return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "") }, enumerable: !0 }, password: { get: function () { return "" }, set: function (e) { }, enumerable: !0 }, username: { get: function () { return "" }, set: function (e) { }, enumerable: !0 } }), n.createObjectURL = function (e) { return t.createObjectURL.apply(t, arguments) }, n.revokeObjectURL = function (e) { return t.revokeObjectURL.apply(t, arguments) }, e.URL = n }(), void 0 !== e.location && !("origin" in e.location)) { var t = function () { return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : "") }; try { Object.defineProperty(e.location, "origin", { get: t, enumerable: !0 }) } catch (n) { setInterval((function () { e.location.origin = t() }), 100) } } }(void 0 !== e ? e : "undefined" != typeof window ? window : "undefined" != typeof self ? self : e); var Wa = Qe("isConcatSpreadable"), Ka = 9007199254740991, $$a = "Maximum allowed index exceeded", Ya = Xn >= 51 || !r((function () { var e = []; return e[Wa] = !1, e.concat()[0] !== e })), Ga = Jn("concat"), Xa = function (e) { if (!g(e)) return !1; var t = e[Wa]; return void 0 !== t ? !!t : Re(e) }; Le({ target: "Array", proto: !0, forced: !Ya || !Ga }, { concat: function (e) { var t, n, i, r, o, a = Me(this), s = st(a, 0), l = 0; for (t = -1, i = arguments.length; t < i; t++)if (Xa(o = -1 === t ? a : arguments[t])) { if (l + (r = ce(o.length)) > Ka) throw TypeError($$a); for (n = 0; n < r; n++, l++)n in o && Wn(s, l, o[n]) } else { if (l >= Ka) throw TypeError($$a); Wn(s, l++, o) } return s.length = l, s } }); var Qa = ut.filter, Ja = Jn("filter"), Za = Zt("filter"); Le({ target: "Array", proto: !0, forced: !Ja || !Za }, { filter: function (e) { return Qa(this, e, arguments.length > 1 ? arguments[1] : void 0) } }); var es = ut.find, ts = "find", ns = !0, is = Zt(ts); ts in [] && Array(1).find((function () { ns = !1 })), Le({ target: "Array", proto: !0, forced: ns || !is }, { find: function (e) { return es(this, e, arguments.length > 1 ? arguments[1] : void 0) } }), mn(ts); var rs = Qe("iterator"), os = !1; try { var as = 0, ss = { next: function () { return { done: !!as++ } }, return: function () { os = !0 } }; ss[rs] = function () { return this }, Array.from(ss, (function () { throw 2 })) } catch (e) { } var ls = function (e, t) { if (!t && !os) return !1; var n = !1; try { var i = {}; i[rs] = function () { return { next: function () { return { done: n = !0 } } } }, e(i) } catch (e) { } return n }, cs = !ls((function (e) { Array.from(e) })); Le({ target: "Array", stat: !0, forced: cs }, { from: Ar }); var us = pe.includes, hs = Zt("indexOf", { ACCESSORS: !0, 1: 0 }); Le({ target: "Array", proto: !0, forced: !hs }, { includes: function (e) { return us(this, e, arguments.length > 1 ? arguments[1] : void 0) } }), mn("includes"); var fs = ut.map, ds = Jn("map"), ps = Zt("map"); Le({ target: "Array", proto: !0, forced: !ds || !ps }, { map: function (e) { return fs(this, e, arguments.length > 1 ? arguments[1] : void 0) } }); var ms = function (e, t, n) { var i, r; return Pn && "function" == typeof (i = t.constructor) && i !== n && g(r = i.prototype) && r !== n.prototype && Pn(e, r), e }, gs = "\t\n\v\f\r  áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff", vs = "[" + gs + "]", ys = RegExp("^" + vs + vs + "*"), bs = RegExp(vs + vs + "*$$"), ws = function (e) { return function (t) { var n = String(p(t)); return 1 & e && (n = n.replace(ys, "")), 2 & e && (n = n.replace(bs, "")), n } }, ks = { start: ws(1), end: ws(2), trim: ws(3) }, Ts = be.f, Ss = A.f, Es = x.f, As = ks.trim, Cs = "Number", Ps = i.Number, xs = Ps.prototype, Os = h(Ve(xs)) == Cs, Is = function (e) { var t, n, i, r, o, a, s, l, c = v(e, !1); if ("string" == typeof c && c.length > 2) if (43 === (t = (c = As(c)).charCodeAt(0)) || 45 === t) { if (88 === (n = c.charCodeAt(2)) || 120 === n) return NaN } else if (48 === t) { switch (c.charCodeAt(1)) { case 66: case 98: i = 2, r = 49; break; case 79: case 111: i = 8, r = 55; break; default: return +c }for (a = (o = c.slice(2)).length, s = 0; s < a; s++)if ((l = o.charCodeAt(s)) < 48 || l > r) return NaN; return parseInt(o, i) } return +c }; if (Oe(Cs, !Ps(" 0o1") || !Ps("0b1") || Ps("+0x1"))) { for (var Ls, js = function (e) { var t = arguments.length < 1 ? 0 : e, n = this; return n instanceof js && (Os ? r((function () { xs.valueOf.call(n) })) : h(n) != Cs) ? ms(new Ps(Is(t)), n, js) : Is(t) }, Ns = o ? Ts(Ps) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), Rs = 0; Ns.length > Rs; Rs++)b(Ps, Ls = Ns[Rs]) && !b(js, Ls) && Es(js, Ls, Ss(Ps, Ls)); js.prototype = xs, xs.constructor = js, te(i, Cs, js) } var Ms = r((function () { _e(1) })); Le({ target: "Object", stat: !0, forced: Ms }, { keys: function (e) { return _e(Me(e)) } }); var _s = function (e) { if (Yi(e)) throw TypeError("The method doesn't accept regular expressions"); return e }, Us = Qe("match"), Ds = function (e) { var t = /./; try { "/./"[e](t) } catch (n) { try { return t[Us] = !1, "/./"[e](t) } catch (e) { } } return !1 }; Le({ target: "String", proto: !0, forced: !Ds("includes") }, { includes: function (e) { return !!~String(p(this)).indexOf(_s(e), arguments.length > 1 ? arguments[1] : void 0) } }); var Fs = !r((function () { return Object.isExtensible(Object.preventExtensions({})) })), qs = t((function (e) { var t = x.f, n = V("meta"), i = 0, r = Object.isExtensible || function () { return !0 }, o = function (e) { t(e, n, { value: { objectID: "O" + ++i, weakData: {} } }) }, a = e.exports = { REQUIRED: !1, fastKey: function (e, t) { if (!g(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e; if (!b(e, n)) { if (!r(e)) return "F"; if (!t) return "E"; o(e) } return e[n].objectID }, getWeakData: function (e, t) { if (!b(e, n)) { if (!r(e)) return !0; if (!t) return !1; o(e) } return e[n].weakData }, onFreeze: function (e) { return Fs && a.REQUIRED && r(e) && !b(e, n) && o(e), e } }; K[n] = !0 })), Hs = (qs.REQUIRED, qs.fastKey, qs.getWeakData, qs.onFreeze, function (e, t) { this.stopped = e, this.result = t }), Bs = function (e, t, n) { var i, r, o, a, s, l, c, u = n && n.that, h = !(!n || !n.AS_ENTRIES), f = !(!n || !n.IS_ITERATOR), d = !(!n || !n.INTERRUPTED), p = ot(t, u, 1 + h + d), m = function (e) { return i && yr(i), new Hs(!0, e) }, g = function (e) { return h ? (C(e), d ? p(e[0], e[1], m) : p(e[0], e[1])) : d ? p(e, m) : p(e) }; if (f) i = e; else { if ("function" != typeof (r = Er(e))) throw TypeError("Target is not iterable"); if (Tr(r)) { for (o = 0, a = ce(e.length); a > o; o++)if ((s = g(e[o])) && s instanceof Hs) return s; return new Hs(!1) } i = r.call(e) } for (l = i.next; !(c = l.call(i)).done;) { try { s = g(c.value) } catch (e) { throw yr(i), e } if ("object" == typeof s && s && s instanceof Hs) return s } return new Hs(!1) }, Vs = qs.getWeakData, zs = ee.set, Ws = ee.getterFor, Ks = ut.find, $$s = ut.findIndex, Ys = 0, Gs = function (e) { return e.frozen || (e.frozen = new Xs) }, Xs = function () { this.entries = [] }, Qs = function (e, t) { return Ks(e.entries, (function (e) { return e[0] === t })) }; Xs.prototype = { get: function (e) { var t = Qs(this, e); if (t) return t[1] }, has: function (e) { return !!Qs(this, e) }, set: function (e, t) { var n = Qs(this, e); n ? n[1] = t : this.entries.push([e, t]) }, delete: function (e) { var t = $$s(this.entries, (function (t) { return t[0] === e })); return ~t && this.entries.splice(t, 1), !!~t } }; var Js = { getConstructor: function (e, t, n, i) { var r = e((function (e, o) { pr(e, r, t), zs(e, { type: t, id: Ys++, frozen: void 0 }), null != o && Bs(o, e[i], { that: e, AS_ENTRIES: n }) })), o = Ws(t), a = function (e, t, n) { var i = o(e), r = Vs(C(t), !0); return !0 === r ? Gs(i).set(t, n) : r[i.id] = n, e }; return Mr(r.prototype, { delete: function (e) { var t = o(this); if (!g(e)) return !1; var n = Vs(e); return !0 === n ? Gs(t).delete(e) : n && b(n, t.id) && delete n[t.id] }, has: function (e) { var t = o(this); if (!g(e)) return !1; var n = Vs(e); return !0 === n ? Gs(t).has(e) : n && b(n, t.id) } }), Mr(r.prototype, n ? { get: function (e) { var t = o(this); if (g(e)) { var n = Vs(e); return !0 === n ? Gs(t).get(e) : n ? n[t.id] : void 0 } }, set: function (e, t) { return a(this, e, t) } } : { add: function (e) { return a(this, e, !0) } }), r } }, Zs = (t((function (e) { var t, n = ee.enforce, o = !i.ActiveXObject && "ActiveXObject" in i, a = Object.isExtensible, s = function (e) { return function () { return e(this, arguments.length ? arguments[0] : void 0) } }, l = e.exports = function (e, t, n) { var o = -1 !== e.indexOf("Map"), a = -1 !== e.indexOf("Weak"), s = o ? "set" : "add", l = i[e], c = l && l.prototype, u = l, h = {}, f = function (e) { var t = c[e]; te(c, e, "add" == e ? function (e) { return t.call(this, 0 === e ? 0 : e), this } : "delete" == e ? function (e) { return !(a && !g(e)) && t.call(this, 0 === e ? 0 : e) } : "get" == e ? function (e) { return a && !g(e) ? void 0 : t.call(this, 0 === e ? 0 : e) } : "has" == e ? function (e) { return !(a && !g(e)) && t.call(this, 0 === e ? 0 : e) } : function (e, n) { return t.call(this, 0 === e ? 0 : e, n), this }) }; if (Oe(e, "function" != typeof l || !(a || c.forEach && !r((function () { (new l).entries().next() }))))) u = n.getConstructor(t, e, o, s), qs.REQUIRED = !0; else if (Oe(e, !0)) { var d = new u, p = d[s](a ? {} : -0, 1) != d, m = r((function () { d.has(1) })), v = ls((function (e) { new l(e) })), y = !a && r((function () { for (var e = new l, t = 5; t--;)e[s](t, t); return !e.has(-0) })); v || ((u = t((function (t, n) { pr(t, u, e); var i = ms(new l, t, u); return null != n && Bs(n, i[s], { that: i, AS_ENTRIES: o }), i }))).prototype = c, c.constructor = u), (m || y) && (f("delete"), f("has"), o && f("get")), (y || p) && f(s), a && c.clear && delete c.clear } return h[e] = u, Le({ global: !0, forced: u != l }, h), it(u, e), a || n.setStrong(u, e, o), u }("WeakMap", s, Js); if (F && o) { t = Js.getConstructor(s, "WeakMap", !0), qs.REQUIRED = !0; var c = l.prototype, u = c.delete, h = c.has, f = c.get, d = c.set; Mr(c, { delete: function (e) { if (g(e) && !a(e)) { var i = n(this); return i.frozen || (i.frozen = new t), u.call(this, e) || i.frozen.delete(e) } return u.call(this, e) }, has: function (e) { if (g(e) && !a(e)) { var i = n(this); return i.frozen || (i.frozen = new t), h.call(this, e) || i.frozen.has(e) } return h.call(this, e) }, get: function (e) { if (g(e) && !a(e)) { var i = n(this); return i.frozen || (i.frozen = new t), h.call(this, e) ? f.call(this, e) : i.frozen.get(e) } return f.call(this, e) }, set: function (e, i) { if (g(e) && !a(e)) { var r = n(this); r.frozen || (r.frozen = new t), h.call(this, e) ? d.call(this, e, i) : r.frozen.set(e, i) } else d.call(this, e, i); return this } }) } })), ut.every), el = Gt("every"), tl = Zt("every"); Le({ target: "Array", proto: !0, forced: !el || !tl }, { every: function (e) { return Zs(this, e, arguments.length > 1 ? arguments[1] : void 0) } }), Le({ target: "Object", stat: !0, forced: Object.assign !== vr }, { assign: vr }); var nl = ks.trim; Le({ target: "String", proto: !0, forced: function (e) { return r((function () { return !!gs[e]() || "â€‹Â…á Ž" != "â€‹Â…á Ž"[e]() || gs[e].name !== e })) }("trim") }, { trim: function () { return nl(this) } }); var il = ut.some, rl = Gt("some"), ol = Zt("some"); Le({ target: "Array", proto: !0, forced: !rl || !ol }, { some: function (e) { return il(this, e, arguments.length > 1 ? arguments[1] : void 0) } }); var al = "".repeat || function (e) { var t = String(p(this)), n = "", i = se(e); if (i < 0 || i == 1 / 0) throw RangeError("Wrong number of repetitions"); for (; i > 0; (i >>>= 1) && (t += t))1 & i && (n += t); return n }, sl = 1..toFixed, ll = Math.floor, cl = function (e, t, n) { return 0 === t ? n : t % 2 == 1 ? cl(e, t - 1, n * e) : cl(e * e, t / 2, n) }, ul = sl && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !r((function () { sl.call({}) })); Le({ target: "Number", proto: !0, forced: ul }, { toFixed: function (e) { var t, n, i, r, o = function (e) { if ("number" != typeof e && "Number" != h(e)) throw TypeError("Incorrect invocation"); return +e }(this), a = se(e), s = [0, 0, 0, 0, 0, 0], l = "", c = "0", u = function (e, t) { for (var n = -1, i = t; ++n < 6;)i += e * s[n], s[n] = i % 1e7, i = ll(i / 1e7) }, f = function (e) { for (var t = 6, n = 0; --t >= 0;)n += s[t], s[t] = ll(n / e), n = n % e * 1e7 }, d = function () { for (var e = 6, t = ""; --e >= 0;)if ("" !== t || 0 === e || 0 !== s[e]) { var n = String(s[e]); t = "" === t ? n : t + al.call("0", 7 - n.length) + n } return t }; if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits"); if (o != o) return "NaN"; if (o <= -1e21 || o >= 1e21) return String(o); if (o < 0 && (l = "-", o = -o), o > 1e-21) if (n = (t = function (e) { for (var t = 0, n = e; n >= 4096;)t += 12, n /= 4096; for (; n >= 2;)t += 1, n /= 2; return t }(o * cl(2, 69, 1)) - 69) < 0 ? o * cl(2, -t, 1) : o / cl(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) { for (u(0, n), i = a; i >= 7;)u(1e7, 0), i -= 7; for (u(cl(10, i, 1), 0), i = t - 1; i >= 23;)f(1 << 23), i -= 23; f(1 << i), u(1, 1), f(2), c = d() } else u(0, n), u(1 << -t, 0), c = d() + al.call("0", a); return c = a > 0 ? l + ((r = c.length) <= a ? "0." + al.call("0", a - r) + c : c.slice(0, r - a) + "." + c.slice(r - a)) : l + c } }); var hl = l.f, fl = function (e) { return function (t) { for (var n, i = m(t), r = _e(i), a = r.length, s = 0, l = []; a > s;)n = r[s++], o && !hl.call(i, n) || l.push(e ? [n, i[n]] : i[n]); return l } }, dl = { entries: fl(!0), values: fl(!1) }, pl = dl.entries; Le({ target: "Object", stat: !0 }, { entries: function (e) { return pl(e) } }); var ml = dl.values; Le({ target: "Object", stat: !0 }, { values: function (e) { return ml(e) } }), Le({ target: "Number", stat: !0 }, { isNaN: function (e) { return e != e } }); var gl = A.f, vl = r((function () { gl(1) })); function yl(e, t) { for (var n = 0; n < t.length; n++) { var i = t[n]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i) } } function bl(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e } function wl(e, t) { var n = Object.keys(e); if (Object.getOwnPropertySymbols) { var i = Object.getOwnPropertySymbols(e); t && (i = i.filter((function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), n.push.apply(n, i) } return n } function kl(e) { for (var t = 1; t < arguments.length; t++) { var n = null != arguments[t] ? arguments[t] : {}; t % 2 ? wl(Object(n), !0).forEach((function (t) { bl(e, t, n[t]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wl(Object(n)).forEach((function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t)) })) } return e } Le({ target: "Object", stat: !0, forced: !o || vl, sham: !o }, { getOwnPropertyDescriptor: function (e, t) { return gl(m(e), t) } }), Le({ target: "Object", stat: !0, sham: !o }, { getOwnPropertyDescriptors: function (e) { for (var t, n, i = m(e), r = A.f, o = ke(i), a = {}, s = 0; o.length > s;)void 0 !== (n = r(i, t = o[s++])) && Wn(a, t, n); return a } }), Ui("match", 1, (function (e, t, n) { return [function (t) { var n = p(this), i = null == t ? void 0 : t[e]; return void 0 !== i ? i.call(t, n) : new RegExp(t)[e](String(n)) }, function (e) { var i = n(t, e, this); if (i.done) return i.value; var r = C(e), o = String(this); if (!r.global) return qi(r, o); var a = r.unicode; r.lastIndex = 0; for (var s, l = [], c = 0; null !== (s = qi(r, o));) { var u = String(s[0]); l[c] = u, "" === u && (r.lastIndex = Fi(o, ce(r.lastIndex), a)), c++ } return 0 === c ? null : l }] })); var Tl = { addCSS: !0, thumbWidth: 15, watch: !0 }; function Sl(e, t) { return function () { return Array.from(document.querySelectorAll(t)).includes(this) }.call(e, t) } var El = function (e) { return null != e ? e.constructor : null }, Al = function (e, t) { return !!(e && t && e instanceof t) }, Cl = function (e) { return null == e }, Pl = function (e) { return El(e) === Object }, xl = function (e) { return El(e) === String }, Ol = function (e) { return Array.isArray(e) }, Il = function (e) { return Al(e, NodeList) }, Ll = xl, jl = Ol, Nl = Il, Rl = function (e) { return Al(e, Element) }, Ml = function (e) { return Al(e, Event) }, _l = function (e) { return Cl(e) || (xl(e) || Ol(e) || Il(e)) && !e.length || Pl(e) && !Object.keys(e).length }; function Ul(e, t) { if (1 > t) { var n = function (e) { var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$$/); return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0 }(t); return parseFloat(e.toFixed(n)) } return Math.round(e / t) * t } var Dl, Fl, ql, Hl = function () { function e(t, n) { (function (e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") })(this, e), Rl(t) ? this.element = t : Ll(t) && (this.element = document.querySelector(t)), Rl(this.element) && _l(this.element.rangeTouch) && (this.config = kl({}, Tl, {}, n), this.init()) } return function (e, t, n) { t && yl(e.prototype, t), n && yl(e, n) }(e, [{ key: "init", value: function () { e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this) } }, { key: "destroy", value: function () { e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null) } }, { key: "listeners", value: function (e) { var t = this, n = e ? "addEventListener" : "removeEventListener";["touchstart", "touchmove", "touchend"].forEach((function (e) { t.element[n](e, (function (e) { return t.set(e) }), !1) })) } }, { key: "get", value: function (t) { if (!e.enabled || !Ml(t)) return null; var n, i = t.target, r = t.changedTouches[0], o = parseFloat(i.getAttribute("min")) || 0, a = parseFloat(i.getAttribute("max")) || 100, s = parseFloat(i.getAttribute("step")) || 1, l = i.getBoundingClientRect(), c = 100 / l.width * (this.config.thumbWidth / 2) / 100; return 0 > (n = 100 / l.width * (r.clientX - l.left)) ? n = 0 : 100 < n && (n = 100), 50 > n ? n -= (100 - 2 * n) * c : 50 < n && (n += 2 * (n - 50) * c), o + Ul(n / 100 * (a - o), s) } }, { key: "set", value: function (t) { e.enabled && Ml(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function (e, t) { if (e && t) { var n = new Event(t, { bubbles: !0 }); e.dispatchEvent(n) } }(t.target, "touchend" === t.type ? "change" : "input")) } }], [{ key: "setup", value: function (t) { var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, i = null; if (_l(t) || Ll(t) ? i = Array.from(document.querySelectorAll(Ll(t) ? t : 'input[type="range"]')) : Rl(t) ? i = [t] : Nl(t) ? i = Array.from(t) : jl(t) && (i = t.filter(Rl)), _l(i)) return null; var r = kl({}, Tl, {}, n); if (Ll(t) && r.watch) { var o = new MutationObserver((function (n) { Array.from(n).forEach((function (n) { Array.from(n.addedNodes).forEach((function (n) { Rl(n) && Sl(n, t) && new e(n, r) })) })) })); o.observe(document.body, { childList: !0, subtree: !0 }) } return i.map((function (t) { return new e(t, n) })) } }, { key: "enabled", get: function () { return "ontouchstart" in document.documentElement } }]), e }(), Bl = i.Promise, Vl = Qe("species"), zl = function (e) { var t = re(e), n = x.f; o && t && !t[Vl] && n(t, Vl, { configurable: !0, get: function () { return this } }) }, Wl = /(iphone|ipod|ipad).*applewebkit/i.test(Kn), Kl = "process" == h(i.process), $$l = i.location, Yl = i.setImmediate, Gl = i.clearImmediate, Xl = i.process, Ql = i.MessageChannel, Jl = i.Dispatch, Zl = 0, ec = {}, tc = "onreadystatechange", nc = function (e) { if (ec.hasOwnProperty(e)) { var t = ec[e]; delete ec[e], t() } }, ic = function (e) { return function () { nc(e) } }, rc = function (e) { nc(e.data) }, oc = function (e) { i.postMessage(e + "", $$l.protocol + "//" + $$l.host) }; Yl && Gl || (Yl = function (e) { for (var t = [], n = 1; arguments.length > n;)t.push(arguments[n++]); return ec[++Zl] = function () { ("function" == typeof e ? e : Function(e)).apply(void 0, t) }, Dl(Zl), Zl }, Gl = function (e) { delete ec[e] }, Kl ? Dl = function (e) { Xl.nextTick(ic(e)) } : Jl && Jl.now ? Dl = function (e) { Jl.now(ic(e)) } : Ql && !Wl ? (ql = (Fl = new Ql).port2, Fl.port1.onmessage = rc, Dl = ot(ql.postMessage, ql, 1)) : i.addEventListener && "function" == typeof postMessage && !i.importScripts && $$l && "file:" !== $$l.protocol && !r(oc) ? (Dl = oc, i.addEventListener("message", rc, !1)) : Dl = tc in T("script") ? function (e) { De.appendChild(T("script")).onreadystatechange = function () { De.removeChild(this), nc(e) } } : function (e) { setTimeout(ic(e), 0) }); var ac, sc, lc, cc, uc, hc, fc, dc, pc = { set: Yl, clear: Gl }, mc = A.f, gc = pc.set, vc = i.MutationObserver || i.WebKitMutationObserver, yc = i.document, bc = i.process, wc = i.Promise, kc = mc(i, "queueMicrotask"), Tc = kc && kc.value; Tc || (ac = function () { var e, t; for (Kl && (e = bc.domain) && e.exit(); sc;) { t = sc.fn, sc = sc.next; try { t() } catch (e) { throw sc ? cc() : lc = void 0, e } } lc = void 0, e && e.enter() }, !Wl && !Kl && vc && yc ? (uc = !0, hc = yc.createTextNode(""), new vc(ac).observe(hc, { characterData: !0 }), cc = function () { hc.data = uc = !uc }) : wc && wc.resolve ? (fc = wc.resolve(void 0), dc = fc.then, cc = function () { dc.call(fc, ac) }) : cc = Kl ? function () { bc.nextTick(ac) } : function () { gc.call(i, ac) }); var Sc, Ec, Ac, Cc, Pc = Tc || function (e) { var t = { fn: e, next: void 0 }; lc && (lc.next = t), sc || (sc = t, cc()), lc = t }, xc = function (e) { var t, n; this.promise = new e((function (e, i) { if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor"); t = e, n = i })), this.resolve = rt(t), this.reject = rt(n) }, Oc = { f: function (e) { return new xc(e) } }, Ic = function (e, t) { if (C(e), g(t) && t.constructor === e) return t; var n = Oc.f(e); return (0, n.resolve)(t), n.promise }, Lc = function (e) { try { return { error: !1, value: e() } } catch (e) { return { error: !0, value: e } } }, jc = pc.set, Nc = Qe("species"), Rc = "Promise", Mc = ee.get, _c = ee.set, Uc = ee.getterFor(Rc), Dc = Bl, Fc = i.TypeError, qc = i.document, Hc = i.process, Bc = re("fetch"), Vc = Oc.f, zc = Vc, Wc = !!(qc && qc.createEvent && i.dispatchEvent), Kc = "function" == typeof PromiseRejectionEvent, $$c = "unhandledrejection", Yc = Oe(Rc, (function () { if (!(U(Dc) !== String(Dc))) { if (66 === Xn) return !0; if (!Kl && !Kc) return !0 } if (Xn >= 51 && /native code/.test(Dc)) return !1; var e = Dc.resolve(1), t = function (e) { e((function () { }), (function () { })) }; return (e.constructor = {})[Nc] = t, !(e.then((function () { })) instanceof t) })), Gc = Yc || !ls((function (e) { Dc.all(e).catch((function () { })) })), Xc = function (e) { var t; return !(!g(e) || "function" != typeof (t = e.then)) && t }, Qc = function (e, t) { if (!e.notified) { e.notified = !0; var n = e.reactions; Pc((function () { for (var i = e.value, r = 1 == e.state, o = 0; n.length > o;) { var a, s, l, c = n[o++], u = r ? c.ok : c.fail, h = c.resolve, f = c.reject, d = c.domain; try { u ? (r || (2 === e.rejection && tu(e), e.rejection = 1), !0 === u ? a = i : (d && d.enter(), a = u(i), d && (d.exit(), l = !0)), a === c.promise ? f(Fc("Promise-chain cycle")) : (s = Xc(a)) ? s.call(a, h, f) : h(a)) : f(i) } catch (e) { d && !l && d.exit(), f(e) } } e.reactions = [], e.notified = !1, t && !e.rejection && Zc(e) })) } }, Jc = function (e, t, n) { var r, o; Wc ? ((r = qc.createEvent("Event")).promise = t, r.reason = n, r.initEvent(e, !1, !0), i.dispatchEvent(r)) : r = { promise: t, reason: n }, !Kc && (o = i["on" + e]) ? o(r) : e === $$c && function (e, t) { var n = i.console; n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t)) }("Unhandled promise rejection", n) }, Zc = function (e) { jc.call(i, (function () { var t, n = e.facade, i = e.value; if (eu(e) && (t = Lc((function () { Kl ? Hc.emit("unhandledRejection", i, n) : Jc($$c, n, i) })), e.rejection = Kl || eu(e) ? 2 : 1, t.error)) throw t.value })) }, eu = function (e) { return 1 !== e.rejection && !e.parent }, tu = function (e) { jc.call(i, (function () { var t = e.facade; Kl ? Hc.emit("rejectionHandled", t) : Jc("rejectionhandled", t, e.value) })) }, nu = function (e, t, n) { return function (i) { e(t, i, n) } }, iu = function (e, t, n) { e.done || (e.done = !0, n && (e = n), e.value = t, e.state = 2, Qc(e, !0)) }, ru = function (e, t, n) { if (!e.done) { e.done = !0, n && (e = n); try { if (e.facade === t) throw Fc("Promise can't be resolved itself"); var i = Xc(t); i ? Pc((function () { var n = { done: !1 }; try { i.call(t, nu(ru, n, e), nu(iu, n, e)) } catch (t) { iu(n, t, e) } })) : (e.value = t, e.state = 1, Qc(e, !1)) } catch (t) { iu({ done: !1 }, t, e) } } }; Yc && (Dc = function (e) { pr(this, Dc, Rc), rt(e), Sc.call(this); var t = Mc(this); try { e(nu(ru, t), nu(iu, t)) } catch (e) { iu(t, e) } }, (Sc = function (e) { _c(this, { type: Rc, done: !1, notified: !1, parent: !1, reactions: [], rejection: !1, state: 0, value: void 0 }) }).prototype = Mr(Dc.prototype, { then: function (e, t) { var n = Uc(this), i = Vc(Xi(this, Dc)); return i.ok = "function" != typeof e || e, i.fail = "function" == typeof t && t, i.domain = Kl ? Hc.domain : void 0, n.parent = !0, n.reactions.push(i), 0 != n.state && Qc(n, !1), i.promise }, catch: function (e) { return this.then(void 0, e) } }), Ec = function () { var e = new Sc, t = Mc(e); this.promise = e, this.resolve = nu(ru, t), this.reject = nu(iu, t) }, Oc.f = Vc = function (e) { return e === Dc || e === Ac ? new Ec(e) : zc(e) }, "function" == typeof Bl && (Cc = Bl.prototype.then, te(Bl.prototype, "then", (function (e, t) { var n = this; return new Dc((function (e, t) { Cc.call(n, e, t) })).then(e, t) }), { unsafe: !0 }), "function" == typeof Bc && Le({ global: !0, enumerable: !0, forced: !0 }, { fetch: function (e) { return Ic(Dc, Bc.apply(i, arguments)) } }))), Le({ global: !0, wrap: !0, forced: Yc }, { Promise: Dc }), it(Dc, Rc, !1), zl(Rc), Ac = re(Rc), Le({ target: Rc, stat: !0, forced: Yc }, { reject: function (e) { var t = Vc(this); return t.reject.call(void 0, e), t.promise } }), Le({ target: Rc, stat: !0, forced: Yc }, { resolve: function (e) { return Ic(this, e) } }), Le({ target: Rc, stat: !0, forced: Gc }, { all: function (e) { var t = this, n = Vc(t), i = n.resolve, r = n.reject, o = Lc((function () { var n = rt(t.resolve), o = [], a = 0, s = 1; Bs(e, (function (e) { var l = a++, c = !1; o.push(void 0), s++, n.call(t, e).then((function (e) { c || (c = !0, o[l] = e, --s || i(o)) }), r) })), --s || i(o) })); return o.error && r(o.value), n.promise }, race: function (e) { var t = this, n = Vc(t), i = n.reject, r = Lc((function () { var r = rt(t.resolve); Bs(e, (function (e) { r.call(t, e).then(n.resolve, i) })) })); return r.error && i(r.value), n.promise } }); var ou, au = A.f, su = "".startsWith, lu = Math.min, cu = Ds("startsWith"), uu = !(cu || (ou = au(String.prototype, "startsWith"), !ou || ou.writable)); Le({ target: "String", proto: !0, forced: !uu && !cu }, { startsWith: function (e) { var t = String(p(this)); _s(e); var n = ce(lu(arguments.length > 1 ? arguments[1] : void 0, t.length)), i = String(e); return su ? su.call(t, i, n) : t.slice(n, n + i.length) === i } }); var hu, fu, du, pu = function (e) { return null != e ? e.constructor : null }, mu = function (e, t) { return Boolean(e && t && e instanceof t) }, gu = function (e) { return null == e }, vu = function (e) { return pu(e) === Object }, yu = function (e) { return pu(e) === String }, bu = function (e) { return pu(e) === Function }, wu = function (e) { return Array.isArray(e) }, ku = function (e) { return mu(e, NodeList) }, Tu = function (e) { return gu(e) || (yu(e) || wu(e) || ku(e)) && !e.length || vu(e) && !Object.keys(e).length }, Su = gu, Eu = vu, Au = function (e) { return pu(e) === Number && !Number.isNaN(e) }, Cu = yu, Pu = function (e) { return pu(e) === Boolean }, xu = bu, Ou = wu, Iu = ku, Lu = function (e) { return mu(e, Element) }, ju = function (e) { return mu(e, Event) }, Nu = function (e) { return mu(e, KeyboardEvent) }, Ru = function (e) { return mu(e, TextTrack) || !gu(e) && yu(e.kind) }, Mu = function (e) { return mu(e, Promise) && bu(e.then) }, _u = function (e) { if (mu(e, window.URL)) return !0; if (!yu(e)) return !1; var t = e; e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e)); try { return !Tu(new URL(t).hostname) } catch (e) { return !1 } }, Uu = Tu, Du = (hu = document.createElement("span"), fu = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }, du = Object.keys(fu).find((function (e) { return void 0 !== hu.style[e] })), !!Cu(du) && fu[du]); function Fu(e, t) { setTimeout((function () { try { e.hidden = !0, e.offsetHeight, e.hidden = !1 } catch (e) { } }), t) } var qu = {
        isIE:
            /* @cc_on!@ */
            !!document.documentMode, isEdge: window.navigator.userAgent.includes("Edge"), isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent), isIPhone: /(iPhone|iPod)/gi.test(navigator.platform), isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
    }, Hu = function (e) { return function (t, n, i, r) { rt(n); var o = Me(t), a = d(o), s = ce(o.length), l = e ? s - 1 : 0, c = e ? -1 : 1; if (i < 2) for (; ;) { if (l in a) { r = a[l], l += c; break } if (l += c, e ? l < 0 : s <= l) throw TypeError("Reduce of empty array with no initial value") } for (; e ? l >= 0 : s > l; l += c)l in a && (r = n(r, a[l], l, o)); return r } }, Bu = { left: Hu(!1), right: Hu(!0) }.left, Vu = Gt("reduce"), zu = Zt("reduce", { 1: 0 }); function Wu(e, t) { return t.split(".").reduce((function (e, t) { return e && e[t] }), e) } function Ku() { for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)n[i - 1] = arguments[i]; if (!n.length) return e; var r = n.shift(); return Eu(r) ? (Object.keys(r).forEach((function (t) { Eu(r[t]) ? (Object.keys(e).includes(t) || Object.assign(e, Ua({}, t, {})), Ku(e[t], r[t])) : Object.assign(e, Ua({}, t, r[t])) })), Ku.apply(void 0, [e].concat(n))) : e } function $$u(e, t) { var n = e.length ? e : [e]; Array.from(n).reverse().forEach((function (e, n) { var i = n > 0 ? t.cloneNode(!0) : t, r = e.parentNode, o = e.nextSibling; i.appendChild(e), o ? r.insertBefore(i, o) : r.appendChild(i) })) } function Yu(e, t) { Lu(e) && !Uu(t) && Object.entries(t).filter((function (e) { var t = Ha(e, 2)[1]; return !Su(t) })).forEach((function (t) { var n = Ha(t, 2), i = n[0], r = n[1]; return e.setAttribute(i, r) })) } function Gu(e, t, n) { var i = document.createElement(e); return Eu(t) && Yu(i, t), Cu(n) && (i.innerText = n), i } function Xu(e, t, n, i) { Lu(t) && t.appendChild(Gu(e, n, i)) } function Qu(e) { Iu(e) || Ou(e) ? Array.from(e).forEach(Qu) : Lu(e) && Lu(e.parentNode) && e.parentNode.removeChild(e) } function Ju(e) { if (Lu(e)) for (var t = e.childNodes.length; t > 0;)e.removeChild(e.lastChild), t -= 1 } function Zu(e, t) { return Lu(t) && Lu(t.parentNode) && Lu(e) ? (t.parentNode.replaceChild(e, t), e) : null } function eh(e, t) { if (!Cu(e) || Uu(e)) return {}; var n = {}, i = Ku({}, t); return e.split(",").forEach((function (e) { var t = e.trim(), r = t.replace(".", ""), o = t.replace(/[[\]]/g, "").split("="), a = Ha(o, 1)[0], s = o.length > 1 ? o[1].replace(/["']/g, "") : ""; switch (t.charAt(0)) { case ".": Cu(i.class) ? n.class = "".concat(i.class, " ").concat(r) : n.class = r; break; case "#": n.id = t.replace("#", ""); break; case "[": n[a] = s } })), Ku(i, n) } function th(e, t) { if (Lu(e)) { var n = t; Pu(n) || (n = !e.hidden), e.hidden = n } } function nh(e, t, n) { if (Iu(e)) return Array.from(e).map((function (e) { return nh(e, t, n) })); if (Lu(e)) { var i = "toggle"; return void 0 !== n && (i = n ? "add" : "remove"), e.classList[i](t), e.classList.contains(t) } return !1 } function ih(e, t) { return Lu(e) && e.classList.contains(t) } function rh(e, t) { var n = Element.prototype; return (n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function () { return Array.from(document.querySelectorAll(t)).includes(this) }).call(e, t) } function oh(e) { return this.elements.container.querySelectorAll(e) } function ah(e) { return this.elements.container.querySelector(e) } function sh() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; Lu(e) && (e.focus({ preventScroll: !0 }), t && nh(e, this.config.classNames.tabFocus)) } Le({ target: "Array", proto: !0, forced: !Vu || !zu || !Kl && Xn > 79 && Xn < 83 }, { reduce: function (e) { return Bu(this, e, arguments.length, arguments.length > 1 ? arguments[1] : void 0) } }); var lh, ch = { "audio/ogg": "vorbis", "audio/wav": "1", "video/webm": "vp8, vorbis", "video/mp4": "avc1.42E01E, mp4a.40.2", "video/ogg": "theora" }, uh = { audio: "canPlayType" in document.createElement("audio"), video: "canPlayType" in document.createElement("video"), check: function (e, t, n) { var i = qu.isIPhone && n && uh.playsinline, r = uh[e] || "html5" !== t; return { api: r, ui: r && uh.rangeInput && ("video" !== e || !qu.isIPhone || i) } }, pip: !(qu.isIPhone || !xu(Gu("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || Gu("video").disablePictureInPicture)), airplay: xu(window.WebKitPlaybackTargetAvailabilityEvent), playsinline: "playsInline" in document.createElement("video"), mime: function (e) { if (Uu(e)) return !1; var t = Ha(e.split("/"), 1)[0], n = e; if (!this.isHTML5 || t !== this.type) return !1; Object.keys(ch).includes(n) && (n += '; codecs="'.concat(ch[e], '"')); try { return Boolean(n && this.media.canPlayType(n).replace(/no/, "")) } catch (e) { return !1 } }, textTracks: "textTracks" in document.createElement("video"), rangeInput: (lh = document.createElement("input"), lh.type = "range", "range" === lh.type), touch: "ontouchstart" in document.documentElement, transitions: !1 !== Du, reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches }, hh = function () { var e = !1; try { var t = Object.defineProperty({}, "passive", { get: function () { return e = !0, null } }); window.addEventListener("test", null, t), window.removeEventListener("test", null, t) } catch (e) { } return e }(); function fh(e, t, n) { var i = this, r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5]; if (e && "addEventListener" in e && !Uu(t) && xu(n)) { var s = t.split(" "), l = a; hh && (l = { passive: o, capture: a }), s.forEach((function (t) { i && i.eventListeners && r && i.eventListeners.push({ element: e, type: t, callback: n, options: l }), e[r ? "addEventListener" : "removeEventListener"](t, n, l) })) } } function dh(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 ? arguments[2] : void 0, i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]; fh.call(this, e, t, n, !0, i, r) } function ph(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 ? arguments[2] : void 0, i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]; fh.call(this, e, t, n, !1, i, r) } function mh(e) { var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0, r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = function a() { ph(e, n, a, r, o); for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++)l[c] = arguments[c]; i.apply(t, l) }; fh.call(this, e, n, a, !0, r, o) } function gh(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}; if (Lu(e) && !Uu(t)) { var r = new CustomEvent(t, { bubbles: n, detail: Fa(Fa({}, i), {}, { plyr: this }) }); e.dispatchEvent(r) } } function vh() { this && this.eventListeners && (this.eventListeners.forEach((function (e) { var t = e.element, n = e.type, i = e.callback, r = e.options; t.removeEventListener(n, i, r) })), this.eventListeners = []) } function yh() { var e = this; return new Promise((function (t) { return e.ready ? setTimeout(t, 0) : dh.call(e, e.elements.container, "ready", t) })).then((function () { })) } function bh(e) { Mu(e) && e.then(null, (function () { })) } function wh(e) { return !!(Ou(e) || Cu(e) && e.includes(":")) && (Ou(e) ? e : e.split(":")).map(Number).every(Au) } function kh(e) { if (!Ou(e) || !e.every(Au)) return null; var t = Ha(e, 2), n = t[0], i = t[1], r = function e(t, n) { return 0 === n ? t : e(n, t % n) }(n, i); return [n / r, i / r] } function Th(e) { var t = function (e) { return wh(e) ? e.split(":").map(Number) : null }, n = t(e); if (null === n && (n = t(this.config.ratio)), null === n && !Uu(this.embed) && Ou(this.embed.ratio) && (n = this.embed.ratio), null === n && this.isHTML5) { var i = this.media; n = kh([i.videoWidth, i.videoHeight]) } return n } function Sh(e) { if (!this.isVideo) return {}; var t = this.elements.wrapper, n = Th.call(this, e), i = Ha(Ou(n) ? n : [0, 0], 2), r = 100 / i[0] * i[1]; if (t.style.paddingBottom = "".concat(r, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) { var o = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10), a = (o - r) / (o / 50); this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = "translateY(-".concat(a, "%)") } else this.isHTML5 && t.classList.toggle(this.config.classNames.videoFixedRatio, null !== n); return { padding: r, ratio: n } } var Eh = { getSources: function () { var e = this; return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter((function (t) { var n = t.getAttribute("type"); return !!Uu(n) || uh.mime.call(e, n) })) : [] }, getQualityOptions: function () { return this.config.quality.forced ? this.config.quality.options : Eh.getSources.call(this).map((function (e) { return Number(e.getAttribute("size")) })).filter(Boolean) }, setup: function () { if (this.isHTML5) { var e = this; e.options.speed = e.config.speed.options, Uu(this.config.ratio) || Sh.call(e), Object.defineProperty(e.media, "quality", { get: function () { var t = Eh.getSources.call(e).find((function (t) { return t.getAttribute("src") === e.source })); return t && Number(t.getAttribute("size")) }, set: function (t) { if (e.quality !== t) { if (e.config.quality.forced && xu(e.config.quality.onChange)) e.config.quality.onChange(t); else { var n = Eh.getSources.call(e).find((function (e) { return Number(e.getAttribute("size")) === t })); if (!n) return; var i = e.media, r = i.currentTime, o = i.paused, a = i.preload, s = i.readyState, l = i.playbackRate; e.media.src = n.getAttribute("src"), ("none" !== a || s) && (e.once("loadedmetadata", (function () { e.speed = l, e.currentTime = r, o || bh(e.play()) })), e.media.load()) } gh.call(e, e.media, "qualitychange", !1, { quality: t }) } } }) } }, cancelRequests: function () { this.isHTML5 && (Qu(Eh.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests")) } }; function Ah(e) { return Ou(e) ? e.filter((function (t, n) { return e.indexOf(t) === n })) : e } var Ch = x.f, Ph = be.f, xh = ee.set, Oh = Qe("match"), Ih = i.RegExp, Lh = Ih.prototype, jh = /a/g, Nh = /a/g, Rh = new Ih(jh) !== jh, Mh = fi.UNSUPPORTED_Y; if (o && Oe("RegExp", !Rh || Mh || r((function () { return Nh[Oh] = !1, Ih(jh) != jh || Ih(Nh) == Nh || "/a/i" != Ih(jh, "i") })))) { for (var _h = function (e, t) { var n, i = this instanceof _h, r = Yi(e), o = void 0 === t; if (!i && r && e.constructor === _h && o) return e; Rh ? r && !o && (e = e.source) : e instanceof _h && (o && (t = ui.call(e)), e = e.source), Mh && (n = !!t && t.indexOf("y") > -1) && (t = t.replace(/y/g, "")); var a = ms(Rh ? new Ih(e, t) : Ih(e, t), i ? this : Lh, _h); return Mh && n && xh(a, { sticky: n }), a }, Uh = function (e) { e in _h || Ch(_h, e, { configurable: !0, get: function () { return Ih[e] }, set: function (t) { Ih[e] = t } }) }, Dh = Ph(Ih), Fh = 0; Dh.length > Fh;)Uh(Dh[Fh++]); Lh.constructor = _h, _h.prototype = Lh, te(i, "RegExp", _h) } function qh(e) { for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)n[i - 1] = arguments[i]; return Uu(e) ? e : e.toString().replace(/{(\d+)}/g, (function (e, t) { return n[t].toString() })) } zl("RegExp"); var Hh = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""; return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:$${}()|[\]/\\])/g, "\\$$1"), "g"), n.toString()) }, Bh = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""; return e.toString().replace(/\w\S*/g, (function (e) { return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase() })) }; function Vh() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = e.toString(); return t = Hh(t, "-", " "), t = Hh(t, "_", " "), t = Bh(t), Hh(t, " ", "") } function zh(e) { var t = document.createElement("div"); return t.appendChild(e), t.innerHTML } var Wh = { pip: "PIP", airplay: "AirPlay", html5: "HTML5", vimeo: "Vimeo", youtube: "YouTube" }, Kh = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; if (Uu(e) || Uu(t)) return ""; var n = Wu(t.i18n, e); if (Uu(n)) return Object.keys(Wh).includes(e) ? Wh[e] : ""; var i = { "{seektime}": t.seekTime, "{title}": t.title }; return Object.entries(i).forEach((function (e) { var t = Ha(e, 2), i = t[0], r = t[1]; n = Hh(n, i, r) })), n }, $$h = function () { function e(t) { Ra(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key } return _a(e, [{ key: "get", value: function (t) { if (!e.supported || !this.enabled) return null; var n = window.localStorage.getItem(this.key); if (Uu(n)) return null; var i = JSON.parse(n); return Cu(t) && t.length ? i[t] : i } }, { key: "set", value: function (t) { if (e.supported && this.enabled && Eu(t)) { var n = this.get(); Uu(n) && (n = {}), Ku(n, t), window.localStorage.setItem(this.key, JSON.stringify(n)) } } }], [{ key: "supported", get: function () { try { if (!("localStorage" in window)) return !1; var e = "___test"; return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0 } catch (e) { return !1 } } }]), e }(); function Yh(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text"; return new Promise((function (n, i) { try { var r = new XMLHttpRequest; if (!("withCredentials" in r)) return; r.addEventListener("load", (function () { if ("text" === t) try { n(JSON.parse(r.responseText)) } catch (e) { n(r.responseText) } else n(r.response) })), r.addEventListener("error", (function () { throw new Error(r.status) })), r.open("GET", e, !0), r.responseType = t, r.send() } catch (e) { i(e) } })) } function Gh(e, t) { if (Cu(e)) { var n = "cache", i = Cu(t), r = function () { return null !== document.getElementById(t) }, o = function (e, t) { e.innerHTML = t, i && r() || document.body.insertAdjacentElement("afterbegin", e) }; if (!i || !r()) { var a = $$h.supported, s = document.createElement("div"); if (s.setAttribute("hidden", ""), i && s.setAttribute("id", t), a) { var l = window.localStorage.getItem("".concat(n, "-").concat(t)); if (null !== l) { var c = JSON.parse(l); o(s, c.content) } } Yh(e).then((function (e) { Uu(e) || (a && window.localStorage.setItem("".concat(n, "-").concat(t), JSON.stringify({ content: e })), o(s, e)) })).catch((function () { })) } } } var Xh = Math.ceil, Qh = Math.floor; Le({ target: "Math", stat: !0 }, { trunc: function (e) { return (e > 0 ? Qh : Xh)(e) } }); var Jh = function (e) { return Math.trunc(e / 60 / 60 % 60, 10) }, Zh = function (e) { return Math.trunc(e / 60 % 60, 10) }, ef = function (e) { return Math.trunc(e % 60, 10) }; function tf() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; if (!Au(e)) return tf(void 0, t, n); var i = function (e) { return "0".concat(e).slice(-2) }, r = Jh(e), o = Zh(e), a = ef(e); return r = t || r > 0 ? "".concat(r, ":") : "", "".concat(n && e > 0 ? "-" : "").concat(r).concat(i(o), ":").concat(i(a)) } var nf = { getIconUrl: function () { var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || qu.isIE && !window.svg4everybody; return { url: this.config.iconUrl, cors: e } }, findElements: function () { try { return this.elements.controls = ah.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = { play: oh.call(this, this.config.selectors.buttons.play), pause: ah.call(this, this.config.selectors.buttons.pause), restart: ah.call(this, this.config.selectors.buttons.restart), rewind: ah.call(this, this.config.selectors.buttons.rewind), fastForward: ah.call(this, this.config.selectors.buttons.fastForward), mute: ah.call(this, this.config.selectors.buttons.mute), pip: ah.call(this, this.config.selectors.buttons.pip), airplay: ah.call(this, this.config.selectors.buttons.airplay), settings: ah.call(this, this.config.selectors.buttons.settings), captions: ah.call(this, this.config.selectors.buttons.captions), fullscreen: ah.call(this, this.config.selectors.buttons.fullscreen) }, this.elements.progress = ah.call(this, this.config.selectors.progress), this.elements.inputs = { seek: ah.call(this, this.config.selectors.inputs.seek), volume: ah.call(this, this.config.selectors.inputs.volume) }, this.elements.display = { buffer: ah.call(this, this.config.selectors.display.buffer), currentTime: ah.call(this, this.config.selectors.display.currentTime), duration: ah.call(this, this.config.selectors.display.duration) }, Lu(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), !0 } catch (e) { return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1 } }, createIcon: function (e, t) { var n = "http://www.w3.org/2000/svg", i = nf.getIconUrl.call(this), r = "".concat(i.cors ? "" : i.url, "#").concat(this.config.iconPrefix), o = document.createElementNS(n, "svg"); Yu(o, Ku(t, { "aria-hidden": "true", focusable: "false" })); var a = document.createElementNS(n, "use"), s = "".concat(r, "-").concat(e); return "href" in a && a.setAttributeNS("http://www.w3.org/1999/xlink", "href", s), a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", s), o.appendChild(a), o }, createLabel: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = Kh(e, this.config), i = Fa(Fa({}, t), {}, { class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ") }); return Gu("span", i, n) }, createBadge: function (e) { if (Uu(e)) return null; var t = Gu("span", { class: this.config.classNames.menu.value }); return t.appendChild(Gu("span", { class: this.config.classNames.menu.badge }, e)), t }, createButton: function (e, t) { var n = this, i = Ku({}, t), r = function () { var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString(); return (e = Vh(e)).charAt(0).toLowerCase() + e.slice(1) }(e), o = { element: "button", toggle: !1, label: null, icon: null, labelPressed: null, iconPressed: null }; switch (["element", "icon", "label"].forEach((function (e) { Object.keys(i).includes(e) && (o[e] = i[e], delete i[e]) })), "button" !== o.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some((function (e) { return e === n.config.classNames.control })) || Ku(i, { class: "".concat(i.class, " ").concat(this.config.classNames.control) }) : i.class = this.config.classNames.control, e) { case "play": o.toggle = !0, o.label = "play", o.labelPressed = "pause", o.icon = "play", o.iconPressed = "pause"; break; case "mute": o.toggle = !0, o.label = "mute", o.labelPressed = "unmute", o.icon = "volume", o.iconPressed = "muted"; break; case "captions": o.toggle = !0, o.label = "enableCaptions", o.labelPressed = "disableCaptions", o.icon = "captions-off", o.iconPressed = "captions-on"; break; case "fullscreen": o.toggle = !0, o.label = "enterFullscreen", o.labelPressed = "exitFullscreen", o.icon = "enter-fullscreen", o.iconPressed = "exit-fullscreen"; break; case "play-large": i.class += " ".concat(this.config.classNames.control, "--overlaid"), r = "play", o.label = "play", o.icon = "play"; break; default: Uu(o.label) && (o.label = r), Uu(o.icon) && (o.icon = e) }var a = Gu(o.element); return o.toggle ? (a.appendChild(nf.createIcon.call(this, o.iconPressed, { class: "icon--pressed" })), a.appendChild(nf.createIcon.call(this, o.icon, { class: "icon--not-pressed" })), a.appendChild(nf.createLabel.call(this, o.labelPressed, { class: "label--pressed" })), a.appendChild(nf.createLabel.call(this, o.label, { class: "label--not-pressed" }))) : (a.appendChild(nf.createIcon.call(this, o.icon)), a.appendChild(nf.createLabel.call(this, o.label))), Ku(i, eh(this.config.selectors.buttons[r], i)), Yu(a, i), "play" === r ? (Ou(this.elements.buttons[r]) || (this.elements.buttons[r] = []), this.elements.buttons[r].push(a)) : this.elements.buttons[r] = a, a }, createRange: function (e, t) { var n = Gu("input", Ku(eh(this.config.selectors.inputs[e]), { type: "range", min: 0, max: 100, step: .01, value: 0, autocomplete: "off", role: "slider", "aria-label": Kh(e, this.config), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": 0 }, t)); return this.elements.inputs[e] = n, nf.updateRangeFill.call(this, n), Hl.setup(n), n }, createProgress: function (e, t) { var n = Gu("progress", Ku(eh(this.config.selectors.display[e]), { min: 0, max: 100, value: 0, role: "progressbar", "aria-hidden": !0 }, t)); if ("volume" !== e) { n.appendChild(Gu("span", null, "0")); var i = { played: "played", buffer: "buffered" }[e], r = i ? Kh(i, this.config) : ""; n.innerText = "% ".concat(r.toLowerCase()) } return this.elements.display[e] = n, n }, createTime: function (e, t) { var n = eh(this.config.selectors.display[e], t), i = Gu("div", Ku(n, { class: "".concat(n.class ? n.class : "", " ").concat(this.config.classNames.display.time, " ").trim(), "aria-label": Kh(e, this.config) }), "00:00"); return this.elements.display[e] = i, i }, bindMenuItemShortcuts: function (e, t) { var n = this; dh.call(this, e, "keydown keyup", (function (i) { if ([32, 38, 39, 40].includes(i.which) && (i.preventDefault(), i.stopPropagation(), "keydown" !== i.type)) { var r, o = rh(e, '[role="menuitemradio"]'); if (!o && [32, 39].includes(i.which)) nf.showMenuPanel.call(n, t, !0); else 32 !== i.which && (40 === i.which || o && 39 === i.which ? (r = e.nextElementSibling, Lu(r) || (r = e.parentNode.firstElementChild)) : (r = e.previousElementSibling, Lu(r) || (r = e.parentNode.lastElementChild)), sh.call(n, r, !0)) } }), !1), dh.call(this, e, "keyup", (function (e) { 13 === e.which && nf.focusFirstMenuItem.call(n, null, !0) })) }, createMenuItem: function (e) { var t = this, n = e.value, i = e.list, r = e.type, o = e.title, a = e.badge, s = void 0 === a ? null : a, l = e.checked, c = void 0 !== l && l, u = eh(this.config.selectors.inputs[r]), h = Gu("button", Ku(u, { type: "button", role: "menuitemradio", class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(), "aria-checked": c, value: n })), f = Gu("span"); f.innerHTML = o, Lu(s) && f.appendChild(s), h.appendChild(f), Object.defineProperty(h, "checked", { enumerable: !0, get: function () { return "true" === h.getAttribute("aria-checked") }, set: function (e) { e && Array.from(h.parentNode.children).filter((function (e) { return rh(e, '[role="menuitemradio"]') })).forEach((function (e) { return e.setAttribute("aria-checked", "false") })), h.setAttribute("aria-checked", e ? "true" : "false") } }), this.listeners.bind(h, "click keyup", (function (e) { if (!Nu(e) || 32 === e.which) { switch (e.preventDefault(), e.stopPropagation(), h.checked = !0, r) { case "language": t.currentTrack = Number(n); break; case "quality": t.quality = n; break; case "speed": t.speed = parseFloat(n) }nf.showMenuPanel.call(t, "home", Nu(e)) } }), r, !1), nf.bindMenuItemShortcuts.call(this, h, r), i.appendChild(h) }, formatTime: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; if (!Au(e)) return e; var n = Jh(this.duration) > 0; return tf(e, n, t) }, updateTimeDisplay: function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; Lu(e) && Au(t) && (e.innerText = nf.formatTime(t, n)) }, updateVolume: function () { this.supported.ui && (Lu(this.elements.inputs.volume) && nf.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), Lu(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume)) }, setRange: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0; Lu(e) && (e.value = t, nf.updateRangeFill.call(this, e)) }, updateProgress: function (e) { var t = this; if (this.supported.ui && ju(e)) { var n = 0; if (e) switch (e.type) { case "timeupdate": case "seeking": case "seeked": n = function (e, t) { return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2) }(this.currentTime, this.duration), "timeupdate" === e.type && nf.setRange.call(this, this.elements.inputs.seek, n); break; case "playing": case "progress": !function (e, n) { var i = Au(n) ? n : 0, r = Lu(e) ? e : t.elements.display.buffer; if (Lu(r)) { r.value = i; var o = r.getElementsByTagName("span")[0]; Lu(o) && (o.childNodes[0].nodeValue = i) } }(this.elements.display.buffer, 100 * this.buffered) } } }, updateRangeFill: function (e) { var t = ju(e) ? e.target : e; if (Lu(t) && "range" === t.getAttribute("type")) { if (rh(t, this.config.selectors.inputs.seek)) { t.setAttribute("aria-valuenow", this.currentTime); var n = nf.formatTime(this.currentTime), i = nf.formatTime(this.duration), r = Kh("seekLabel", this.config); t.setAttribute("aria-valuetext", r.replace("{currentTime}", n).replace("{duration}", i)) } else if (rh(t, this.config.selectors.inputs.volume)) { var o = 100 * t.value; t.setAttribute("aria-valuenow", o), t.setAttribute("aria-valuetext", "".concat(o.toFixed(1), "%")) } else t.setAttribute("aria-valuenow", t.value); qu.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%")) } }, updateSeekTooltip: function (e) { var t = this; if (this.config.tooltips.seek && Lu(this.elements.inputs.seek) && Lu(this.elements.display.seekTooltip) && 0 !== this.duration) { var n = "".concat(this.config.classNames.tooltip, "--visible"), i = function (e) { return nh(t.elements.display.seekTooltip, n, e) }; if (this.touch) i(!1); else { var r = 0, o = this.elements.progress.getBoundingClientRect(); if (ju(e)) r = 100 / o.width * (e.pageX - o.left); else { if (!ih(this.elements.display.seekTooltip, n)) return; r = parseFloat(this.elements.display.seekTooltip.style.left, 10) } r < 0 ? r = 0 : r > 100 && (r = 100), nf.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * r), this.elements.display.seekTooltip.style.left = "".concat(r, "%"), ju(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type) } } }, timeUpdate: function (e) { var t = !Lu(this.elements.display.duration) && this.config.invertTime; nf.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || nf.updateProgress.call(this, e) }, durationUpdate: function () { if (this.supported.ui && (this.config.invertTime || !this.currentTime)) { if (this.duration >= Math.pow(2, 32)) return th(this.elements.display.currentTime, !0), void th(this.elements.progress, !0); Lu(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration); var e = Lu(this.elements.display.duration); !e && this.config.displayDuration && this.paused && nf.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && nf.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), nf.updateSeekTooltip.call(this) } }, toggleMenuButton: function (e, t) { th(this.elements.settings.buttons[e], !t) }, updateSetting: function (e, t, n) { var i = this.elements.settings.panels[e], r = null, o = t; if ("captions" === e) r = this.currentTrack; else { if (r = Uu(n) ? this[e] : n, Uu(r) && (r = this.config[e].default), !Uu(this.options[e]) && !this.options[e].includes(r)) return void this.debug.warn("Unsupported value of '".concat(r, "' for ").concat(e)); if (!this.config[e].options.includes(r)) return void this.debug.warn("Disabled value of '".concat(r, "' for ").concat(e)) } if (Lu(o) || (o = i && i.querySelector('[role="menu"]')), Lu(o)) { this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = nf.getLabel.call(this, e, r); var a = o && o.querySelector('[value="'.concat(r, '"]')); Lu(a) && (a.checked = !0) } }, getLabel: function (e, t) { switch (e) { case "speed": return 1 === t ? Kh("normal", this.config) : "".concat(t, "&times;"); case "quality": if (Au(t)) { var n = Kh("qualityLabel.".concat(t), this.config); return n.length ? n : "".concat(t, "p") } return Bh(t); case "captions": return af.getLabel.call(this); default: return null } }, setQualityMenu: function (e) { var t = this; if (Lu(this.elements.settings.panels.quality)) { var n = "quality", i = this.elements.settings.panels.quality.querySelector('[role="menu"]'); Ou(e) && (this.options.quality = Ah(e).filter((function (e) { return t.config.quality.options.includes(e) }))); var r = !Uu(this.options.quality) && this.options.quality.length > 1; if (nf.toggleMenuButton.call(this, n, r), Ju(i), nf.checkMenu.call(this), r) { var o = function (e) { var n = Kh("qualityBadge.".concat(e), t.config); return n.length ? nf.createBadge.call(t, n) : null }; this.options.quality.sort((function (e, n) { var i = t.config.quality.options; return i.indexOf(e) > i.indexOf(n) ? 1 : -1 })).forEach((function (e) { nf.createMenuItem.call(t, { value: e, list: i, type: n, title: nf.getLabel.call(t, "quality", e), badge: o(e) }) })), nf.updateSetting.call(this, n, i) } } }, setCaptionsMenu: function () { var e = this; if (Lu(this.elements.settings.panels.captions)) { var t = "captions", n = this.elements.settings.panels.captions.querySelector('[role="menu"]'), i = af.getTracks.call(this), r = Boolean(i.length); if (nf.toggleMenuButton.call(this, t, r), Ju(n), nf.checkMenu.call(this), r) { var o = i.map((function (t, i) { return { value: i, checked: e.captions.toggled && e.currentTrack === i, title: af.getLabel.call(e, t), badge: t.language && nf.createBadge.call(e, t.language.toUpperCase()), list: n, type: "language" } })); o.unshift({ value: -1, checked: !this.captions.toggled, title: Kh("disabled", this.config), list: n, type: "language" }), o.forEach(nf.createMenuItem.bind(this)), nf.updateSetting.call(this, t, n) } } }, setSpeedMenu: function () { var e = this; if (Lu(this.elements.settings.panels.speed)) { var t = "speed", n = this.elements.settings.panels.speed.querySelector('[role="menu"]'); this.options.speed = this.options.speed.filter((function (t) { return t >= e.minimumSpeed && t <= e.maximumSpeed })); var i = !Uu(this.options.speed) && this.options.speed.length > 1; nf.toggleMenuButton.call(this, t, i), Ju(n), nf.checkMenu.call(this), i && (this.options.speed.forEach((function (i) { nf.createMenuItem.call(e, { value: i, list: n, type: t, title: nf.getLabel.call(e, "speed", i) }) })), nf.updateSetting.call(this, t, n)) } }, checkMenu: function () { var e = this.elements.settings.buttons, t = !Uu(e) && Object.values(e).some((function (e) { return !e.hidden })); th(this.elements.settings.menu, !t) }, focusFirstMenuItem: function (e) { var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; if (!this.elements.settings.popup.hidden) { var n = e; Lu(n) || (n = Object.values(this.elements.settings.panels).find((function (e) { return !e.hidden }))); var i = n.querySelector('[role^="menuitem"]'); sh.call(this, i, t) } }, toggleMenu: function (e) { var t = this.elements.settings.popup, n = this.elements.buttons.settings; if (Lu(t) && Lu(n)) { var i = t.hidden, r = i; if (Pu(e)) r = e; else if (Nu(e) && 27 === e.which) r = !1; else if (ju(e)) { var o = xu(e.composedPath) ? e.composedPath()[0] : e.target, a = t.contains(o); if (a || !a && e.target !== n && r) return } n.setAttribute("aria-expanded", r), th(t, !r), nh(this.elements.container, this.config.classNames.menu.open, r), r && Nu(e) ? nf.focusFirstMenuItem.call(this, null, !0) : r || i || sh.call(this, n, Nu(e)) } }, getMenuSize: function (e) { var t = e.cloneNode(!0); t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t); var n = t.scrollWidth, i = t.scrollHeight; return Qu(t), { width: n, height: i } }, showMenuPanel: function () { var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t)); if (Lu(i)) { var r = i.parentNode, o = Array.from(r.children).find((function (e) { return !e.hidden })); if (uh.transitions && !uh.reducedMotion) { r.style.width = "".concat(o.scrollWidth, "px"), r.style.height = "".concat(o.scrollHeight, "px"); var a = nf.getMenuSize.call(this, i), s = function t(n) { n.target === r && ["width", "height"].includes(n.propertyName) && (r.style.width = "", r.style.height = "", ph.call(e, r, Du, t)) }; dh.call(this, r, Du, s), r.style.width = "".concat(a.width, "px"), r.style.height = "".concat(a.height, "px") } th(o, !0), th(i, !1), nf.focusFirstMenuItem.call(this, i, n) } }, setDownloadUrl: function () { var e = this.elements.buttons.download; Lu(e) && e.setAttribute("href", this.download) }, create: function (e) { var t = this, n = nf.bindMenuItemShortcuts, i = nf.createButton, r = nf.createProgress, o = nf.createRange, a = nf.createTime, s = nf.setQualityMenu, l = nf.setSpeedMenu, c = nf.showMenuPanel; this.elements.controls = null, Ou(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large")); var u = Gu("div", eh(this.config.selectors.controls.wrapper)); this.elements.controls = u; var h = { class: "plyr__controls__item" }; return Ah(Ou(this.config.controls) ? this.config.controls : []).forEach((function (s) { if ("restart" === s && u.appendChild(i.call(t, "restart", h)), "rewind" === s && u.appendChild(i.call(t, "rewind", h)), "play" === s && u.appendChild(i.call(t, "play", h)), "fast-forward" === s && u.appendChild(i.call(t, "fast-forward", h)), "progress" === s) { var l = Gu("div", { class: "".concat(h.class, " plyr__progress__container") }), f = Gu("div", eh(t.config.selectors.progress)); if (f.appendChild(o.call(t, "seek", { id: "plyr-seek-".concat(e.id) })), f.appendChild(r.call(t, "buffer")), t.config.tooltips.seek) { var d = Gu("span", { class: t.config.classNames.tooltip }, "00:00"); f.appendChild(d), t.elements.display.seekTooltip = d } t.elements.progress = f, l.appendChild(t.elements.progress), u.appendChild(l) } if ("current-time" === s && u.appendChild(a.call(t, "currentTime", h)), "duration" === s && u.appendChild(a.call(t, "duration", h)), "mute" === s || "volume" === s) { var p = t.elements.volume; if (Lu(p) && u.contains(p) || (p = Gu("div", Ku({}, h, { class: "".concat(h.class, " plyr__volume").trim() })), t.elements.volume = p, u.appendChild(p)), "mute" === s && p.appendChild(i.call(t, "mute")), "volume" === s && !qu.isIos) { var m = { max: 1, step: .05, value: t.config.volume }; p.appendChild(o.call(t, "volume", Ku(m, { id: "plyr-volume-".concat(e.id) }))) } } if ("captions" === s && u.appendChild(i.call(t, "captions", h)), "settings" === s && !Uu(t.config.settings)) { var g = Gu("div", Ku({}, h, { class: "".concat(h.class, " plyr__menu").trim(), hidden: "" })); g.appendChild(i.call(t, "settings", { "aria-haspopup": !0, "aria-controls": "plyr-settings-".concat(e.id), "aria-expanded": !1 })); var v = Gu("div", { class: "plyr__menu__container", id: "plyr-settings-".concat(e.id), hidden: "" }), y = Gu("div"), b = Gu("div", { id: "plyr-settings-".concat(e.id, "-home") }), w = Gu("div", { role: "menu" }); b.appendChild(w), y.appendChild(b), t.elements.settings.panels.home = b, t.config.settings.forEach((function (i) { var r = Gu("button", Ku(eh(t.config.selectors.buttons.settings), { type: "button", class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"), role: "menuitem", "aria-haspopup": !0, hidden: "" })); n.call(t, r, i), dh.call(t, r, "click", (function () { c.call(t, i, !1) })); var o = Gu("span", null, Kh(i, t.config)), a = Gu("span", { class: t.config.classNames.menu.value }); a.innerHTML = e[i], o.appendChild(a), r.appendChild(o), w.appendChild(r); var s = Gu("div", { id: "plyr-settings-".concat(e.id, "-").concat(i), hidden: "" }), l = Gu("button", { type: "button", class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back") }); l.appendChild(Gu("span", { "aria-hidden": !0 }, Kh(i, t.config))), l.appendChild(Gu("span", { class: t.config.classNames.hidden }, Kh("menuBack", t.config))), dh.call(t, s, "keydown", (function (e) { 37 === e.which && (e.preventDefault(), e.stopPropagation(), c.call(t, "home", !0)) }), !1), dh.call(t, l, "click", (function () { c.call(t, "home", !1) })), s.appendChild(l), s.appendChild(Gu("div", { role: "menu" })), y.appendChild(s), t.elements.settings.buttons[i] = r, t.elements.settings.panels[i] = s })), v.appendChild(y), g.appendChild(v), u.appendChild(g), t.elements.settings.popup = v, t.elements.settings.menu = g } if ("pip" === s && uh.pip && u.appendChild(i.call(t, "pip", h)), "airplay" === s && uh.airplay && u.appendChild(i.call(t, "airplay", h)), "download" === s) { var k = Ku({}, h, { element: "a", href: t.download, target: "_blank" }); t.isHTML5 && (k.download = ""); var T = t.config.urls.download; !_u(T) && t.isEmbed && Ku(k, { icon: "logo-".concat(t.provider), label: t.provider }), u.appendChild(i.call(t, "download", k)) } "fullscreen" === s && u.appendChild(i.call(t, "fullscreen", h)) })), this.isHTML5 && s.call(this, Eh.getQualityOptions.call(this)), l.call(this), u }, inject: function () { var e = this; if (this.config.loadSprite) { var t = nf.getIconUrl.call(this); t.cors && Gh(t.url, "sprite-plyr") } this.id = Math.floor(1e4 * Math.random()); var n = null; this.elements.controls = null; var i = { id: this.id, seektime: this.config.seekTime, title: this.config.title }, r = !0; xu(this.config.controls) && (this.config.controls = this.config.controls.call(this, i)), this.config.controls || (this.config.controls = []), Lu(this.config.controls) || Cu(this.config.controls) ? n = this.config.controls : (n = nf.create.call(this, { id: this.id, seektime: this.config.seekTime, speed: this.speed, quality: this.quality, captions: af.getLabel.call(this) }), r = !1); var o, a; if (r && Cu(this.config.controls) && (o = n, Object.entries(i).forEach((function (e) { var t = Ha(e, 2), n = t[0], i = t[1]; o = Hh(o, "{".concat(n, "}"), i) })), n = o), Cu(this.config.selectors.controls.container) && (a = document.querySelector(this.config.selectors.controls.container)), Lu(a) || (a = this.elements.container), a[Lu(n) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", n), Lu(this.elements.controls) || nf.findElements.call(this), !Uu(this.elements.buttons)) { var s = function (t) { var n = e.config.classNames.controlPressed; Object.defineProperty(t, "pressed", { enumerable: !0, get: function () { return ih(t, n) }, set: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; nh(t, n, e) } }) }; Object.values(this.elements.buttons).filter(Boolean).forEach((function (e) { Ou(e) || Iu(e) ? Array.from(e).filter(Boolean).forEach(s) : s(e) })) } if (qu.isEdge && Fu(a), this.config.tooltips.controls) { var l = this.config, c = l.classNames, u = l.selectors, h = "".concat(u.controls.wrapper, " ").concat(u.labels, " .").concat(c.hidden), f = oh.call(this, h); Array.from(f).forEach((function (t) { nh(t, e.config.classNames.hidden, !1), nh(t, e.config.classNames.tooltip, !0) })) } } }; function rf(e) { var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = e; if (t) { var i = document.createElement("a"); i.href = n, n = i.href } try { return new URL(n) } catch (e) { return null } } function of(e) { var t = new URLSearchParams; return Eu(e) && Object.entries(e).forEach((function (e) { var n = Ha(e, 2), i = n[0], r = n[1]; t.set(i, r) })), t } var af = { setup: function () { if (this.supported.ui) if (!this.isVideo || this.isYouTube || this.isHTML5 && !uh.textTracks) Ou(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && nf.setCaptionsMenu.call(this); else { if (Lu(this.elements.captions) || (this.elements.captions = Gu("div", eh(this.config.selectors.captions)), function (e, t) { Lu(e) && Lu(t) && t.parentNode.insertBefore(e, t.nextSibling) }(this.elements.captions, this.elements.wrapper)), qu.isIE && window.URL) { var e = this.media.querySelectorAll("track"); Array.from(e).forEach((function (e) { var t = e.getAttribute("src"), n = rf(t); null !== n && n.hostname !== window.location.href.hostname && ["http:", "https:"].includes(n.protocol) && Yh(t, "blob").then((function (t) { e.setAttribute("src", window.URL.createObjectURL(t)) })).catch((function () { Qu(e) })) })) } var t = Ah((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((function (e) { return e.split("-")[0] }))), n = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase(); if ("auto" === n) n = Ha(t, 1)[0]; var i = this.storage.get("captions"); if (Pu(i) || (i = this.config.captions.active), Object.assign(this.captions, { toggled: !1, active: i, language: n, languages: t }), this.isHTML5) { var r = this.config.captions.update ? "addtrack removetrack" : "removetrack"; dh.call(this, this.media.textTracks, r, af.update.bind(this)) } setTimeout(af.update.bind(this), 0) } }, update: function () { var e = this, t = af.getTracks.call(this, !0), n = this.captions, i = n.active, r = n.language, o = n.meta, a = n.currentTrackNode, s = Boolean(t.find((function (e) { return e.language === r }))); this.isHTML5 && this.isVideo && t.filter((function (e) { return !o.get(e) })).forEach((function (t) { e.debug.log("Track added", t), o.set(t, { default: "showing" === t.mode }), "showing" === t.mode && (t.mode = "hidden"), dh.call(e, t, "cuechange", (function () { return af.updateCues.call(e) })) })), (s && this.language !== r || !t.includes(a)) && (af.setLanguage.call(this, r), af.toggle.call(this, i && s)), nh(this.elements.container, this.config.classNames.captions.enabled, !Uu(t)), Ou(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && nf.setCaptionsMenu.call(this) }, toggle: function (e) { var t = this, n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]; if (this.supported.ui) { var i = this.captions.toggled, r = this.config.classNames.captions.active, o = Su(e) ? !i : e; if (o !== i) { if (n || (this.captions.active = o, this.storage.set({ captions: o })), !this.language && o && !n) { var a = af.getTracks.call(this), s = af.findTrack.call(this, [this.captions.language].concat(Ba(this.captions.languages)), !0); return this.captions.language = s.language, void af.set.call(this, a.indexOf(s)) } this.elements.buttons.captions && (this.elements.buttons.captions.pressed = o), nh(this.elements.container, r, o), this.captions.toggled = o, nf.updateSetting.call(this, "captions"), gh.call(this, this.media, o ? "captionsenabled" : "captionsdisabled") } setTimeout((function () { o && t.captions.toggled && (t.captions.currentTrackNode.mode = "hidden") })) } }, set: function (e) { var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = af.getTracks.call(this); if (-1 !== e) if (Au(e)) if (e in n) { if (this.captions.currentTrack !== e) { this.captions.currentTrack = e; var i = n[e], r = i || {}, o = r.language; this.captions.currentTrackNode = i, nf.updateSetting.call(this, "captions"), t || (this.captions.language = o, this.storage.set({ language: o })), this.isVimeo && this.embed.enableTextTrack(o), gh.call(this, this.media, "languagechange") } af.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && af.updateCues.call(this) } else this.debug.warn("Track not found", e); else this.debug.warn("Invalid caption argument", e); else af.toggle.call(this, !1, t) }, setLanguage: function (e) { var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]; if (Cu(e)) { var n = e.toLowerCase(); this.captions.language = n; var i = af.getTracks.call(this), r = af.findTrack.call(this, [n]); af.set.call(this, i.indexOf(r), t) } else this.debug.warn("Invalid language argument", e) }, getTracks: function () { var e = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], n = Array.from((this.media || {}).textTracks || []); return n.filter((function (n) { return !e.isHTML5 || t || e.captions.meta.has(n) })).filter((function (e) { return ["captions", "subtitles"].includes(e.kind) })) }, findTrack: function (e) { var t, n = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = af.getTracks.call(this), o = function (e) { return Number((n.captions.meta.get(e) || {}).default) }, a = Array.from(r).sort((function (e, t) { return o(t) - o(e) })); return e.every((function (e) { return !(t = a.find((function (t) { return t.language === e }))) })), t || (i ? a[0] : void 0) }, getCurrentTrack: function () { return af.getTracks.call(this)[this.currentTrack] }, getLabel: function (e) { var t = e; return !Ru(t) && uh.textTracks && this.captions.toggled && (t = af.getCurrentTrack.call(this)), Ru(t) ? Uu(t.label) ? Uu(t.language) ? Kh("enabled", this.config) : e.language.toUpperCase() : t.label : Kh("disabled", this.config) }, updateCues: function (e) { if (this.supported.ui) if (Lu(this.elements.captions)) if (Su(e) || Array.isArray(e)) { var t = e; if (!t) { var n = af.getCurrentTrack.call(this); t = Array.from((n || {}).activeCues || []).map((function (e) { return e.getCueAsHTML() })).map(zh) } var i = t.map((function (e) { return e.trim() })).join("\n"); if (i !== this.elements.captions.innerHTML) { Ju(this.elements.captions); var r = Gu("span", eh(this.config.selectors.caption)); r.innerHTML = i, this.elements.captions.appendChild(r), gh.call(this, this.media, "cuechange") } } else this.debug.warn("updateCues: Invalid input", e); else this.debug.warn("No captions element to render to") } }, sf = { enabled: !0, title: "", debug: !1, autoplay: !1, autopause: !0, playsinline: !0, seekTime: 10, volume: 1, muted: !1, duration: null, displayDuration: !0, invertTime: !0, toggleInvert: !0, ratio: null, clickToPlay: !0, hideControls: !0, resetOnEnd: !1, disableContextMenu: !0, loadSprite: !0, iconPrefix: "plyr", iconUrl: "https://cdn.plyr.io/3.6.3/plyr.svg", blankVideo: "https://cdn.plyr.io/static/blank.mp4", quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240], forced: !1, onChange: null }, loop: { active: !1 }, speed: { selected: 1, options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4] }, keyboard: { focused: !0, global: !1 }, tooltips: { controls: !1, seek: !0 }, captions: { active: !1, language: "auto", update: !1 }, fullscreen: { enabled: !0, fallback: !0, iosNative: !1 }, storage: { enabled: !0, key: "plyr" }, controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"], settings: ["captions", "quality", "speed"], i18n: { restart: "Restart", rewind: "Rewind {seektime}s", play: "Play", pause: "Pause", fastForward: "Forward {seektime}s", seek: "Seek", seekLabel: "{currentTime} of {duration}", played: "Played", buffered: "Buffered", currentTime: "Current time", duration: "Duration", volume: "Volume", mute: "Mute", unmute: "Unmute", enableCaptions: "Enable captions", disableCaptions: "Disable captions", download: "Download", enterFullscreen: "Enter fullscreen", exitFullscreen: "Exit fullscreen", frameTitle: "Player for {title}", captions: "Captions", settings: "Settings", pip: "PIP", menuBack: "Go back to previous menu", speed: "Speed", normal: "Normal", quality: "Quality", loop: "Loop", start: "Start", end: "End", all: "All", reset: "Reset", disabled: "Disabled", enabled: "Enabled", advertisement: "Ad", qualityBadge: { 2160: "4K", 1440: "HD", 1080: "HD", 720: "HD", 576: "SD", 480: "SD" } }, urls: { download: null, vimeo: { sdk: "https://player.vimeo.com/api/player.js", iframe: "https://player.vimeo.com/video/{0}?{1}", api: "https://vimeo.com/api/oembed.json?url={0}" }, youtube: { sdk: "https://www.youtube.com/iframe_api", api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}" }, googleIMA: { sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js" } }, listeners: { seek: null, play: null, pause: null, restart: null, rewind: null, fastForward: null, mute: null, volume: null, captions: null, download: null, fullscreen: null, pip: null, airplay: null, speed: null, quality: null, loop: null, language: null }, events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"], selectors: { editable: "input, textarea, select, [contenteditable]", container: ".plyr", controls: { container: null, wrapper: ".plyr__controls" }, labels: "[data-plyr]", buttons: { play: '[data-plyr="play"]', pause: '[data-plyr="pause"]', restart: '[data-plyr="restart"]', rewind: '[data-plyr="rewind"]', fastForward: '[data-plyr="fast-forward"]', mute: '[data-plyr="mute"]', captions: '[data-plyr="captions"]', download: '[data-plyr="download"]', fullscreen: '[data-plyr="fullscreen"]', pip: '[data-plyr="pip"]', airplay: '[data-plyr="airplay"]', settings: '[data-plyr="settings"]', loop: '[data-plyr="loop"]' }, inputs: { seek: '[data-plyr="seek"]', volume: '[data-plyr="volume"]', speed: '[data-plyr="speed"]', language: '[data-plyr="language"]', quality: '[data-plyr="quality"]' }, display: { currentTime: ".plyr__time--current", duration: ".plyr__time--duration", buffer: ".plyr__progress__buffer", loop: ".plyr__progress__loop", volume: ".plyr__volume--display" }, progress: ".plyr__progress", captions: ".plyr__captions", caption: ".plyr__caption" }, classNames: { type: "plyr--{0}", provider: "plyr--{0}", video: "plyr__video-wrapper", embed: "plyr__video-embed", videoFixedRatio: "plyr__video-wrapper--fixed-ratio", embedContainer: "plyr__video-embed__container", poster: "plyr__poster", posterEnabled: "plyr__poster-enabled", ads: "plyr__ads", control: "plyr__control", controlPressed: "plyr__control--pressed", playing: "plyr--playing", paused: "plyr--paused", stopped: "plyr--stopped", loading: "plyr--loading", hover: "plyr--hover", tooltip: "plyr__tooltip", cues: "plyr__cues", hidden: "plyr__sr-only", hideControls: "plyr--hide-controls", isIos: "plyr--is-ios", isTouch: "plyr--is-touch", uiSupported: "plyr--full-ui", noTransition: "plyr--no-transition", display: { time: "plyr__time" }, menu: { value: "plyr__menu__value", badge: "plyr__badge", open: "plyr--menu-open" }, captions: { enabled: "plyr--captions-enabled", active: "plyr--captions-active" }, fullscreen: { enabled: "plyr--fullscreen-enabled", fallback: "plyr--fullscreen-fallback" }, pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" }, airplay: { supported: "plyr--airplay-supported", active: "plyr--airplay-active" }, tabFocus: "plyr__tab-focus", previewThumbnails: { thumbContainer: "plyr__preview-thumb", thumbContainerShown: "plyr__preview-thumb--is-shown", imageContainer: "plyr__preview-thumb__image-container", timeContainer: "plyr__preview-thumb__time-container", scrubbingContainer: "plyr__preview-scrubbing", scrubbingContainerShown: "plyr__preview-scrubbing--is-shown" } }, attributes: { embed: { provider: "data-plyr-provider", id: "data-plyr-embed-id" } }, ads: { enabled: !1, publisherId: "", tagUrl: "" }, previewThumbnails: { enabled: !1, src: "" }, vimeo: { byline: !1, portrait: !1, title: !1, speed: !0, transparent: !1, customControls: !0, referrerPolicy: null, premium: !1 }, youtube: { rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, customControls: !0, noCookie: !1 } }, lf = "picture-in-picture", cf = "inline", uf = { html5: "html5", youtube: "youtube", vimeo: "vimeo" }, hf = "audio", ff = "video"; var df = function () { }, pf = function () { function e() { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; Ra(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled") } return _a(e, [{ key: "log", get: function () { return this.enabled ? Function.prototype.bind.call(console.log, console) : df } }, { key: "warn", get: function () { return this.enabled ? Function.prototype.bind.call(console.warn, console) : df } }, { key: "error", get: function () { return this.enabled ? Function.prototype.bind.call(console.error, console) : df } }]), e }(), mf = function () { function e(t) { var n = this; Ra(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = { x: 0, y: 0 }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function (e, t) { return (Element.prototype.closest || function () { var e = this; do { if (rh.matches(e, t)) return e; e = e.parentElement || e.parentNode } while (null !== e && 1 === e.nodeType); return null }).call(e, t) }(this.player.elements.container, t.config.fullscreen.container), dh.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), (function () { n.onChange() })), dh.call(this.player, this.player.elements.container, "dblclick", (function (e) { Lu(n.player.elements.controls) && n.player.elements.controls.contains(e.target) || n.player.listeners.proxy(e, n.toggle, "fullscreen") })), dh.call(this, this.player.elements.container, "keydown", (function (e) { return n.trapFocus(e) })), this.update() } return _a(e, [{ key: "onChange", value: function () { if (this.enabled) { var e = this.player.elements.buttons.fullscreen; Lu(e) && (e.pressed = this.active); var t = this.target === this.player.media ? this.target : this.player.elements.container; gh.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0) } } }, { key: "toggleFallback", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; if (e ? this.scrollPosition = { x: window.scrollX || 0, y: window.scrollY || 0 } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", nh(this.target, this.player.config.classNames.fullscreen.fallback, e), qu.isIos) { var t = document.head.querySelector('meta[name="viewport"]'), n = "viewport-fit=cover"; t || (t = document.createElement("meta")).setAttribute("name", "viewport"); var i = Cu(t.content) && t.content.includes(n); e ? (this.cleanupViewport = !i, i || (t.content += ",".concat(n))) : this.cleanupViewport && (t.content = t.content.split(",").filter((function (e) { return e.trim() !== n })).join(",")) } this.onChange() } }, { key: "trapFocus", value: function (e) { if (!qu.isIos && this.active && "Tab" === e.key && 9 === e.keyCode) { var t = document.activeElement, n = oh.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"), i = Ha(n, 1)[0], r = n[n.length - 1]; t !== r || e.shiftKey ? t === i && e.shiftKey && (r.focus(), e.preventDefault()) : (i.focus(), e.preventDefault()) } } }, { key: "update", value: function () { var t; this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : e.native ? "Native" : "Fallback", this.player.debug.log("".concat(t, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled"); nh(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled) } }, { key: "enter", value: function () { this.enabled && (qu.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !e.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? Uu(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({ navigationUI: "hide" })) } }, { key: "exit", value: function () { if (this.enabled) if (qu.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), bh(this.player.play()); else if (!e.native || this.forceFallback) this.toggleFallback(!1); else if (this.prefix) { if (!Uu(this.prefix)) { var t = "moz" === this.prefix ? "Cancel" : "Exit"; document["".concat(this.prefix).concat(t).concat(this.property)]() } } else (document.cancelFullScreen || document.exitFullscreen).call(document) } }, { key: "toggle", value: function () { this.active ? this.exit() : this.enter() } }, { key: "usingNative", get: function () { return e.native && !this.forceFallback } }, { key: "enabled", get: function () { return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo } }, { key: "active", get: function () { if (!this.enabled) return !1; if (!e.native || this.forceFallback) return ih(this.target, this.player.config.classNames.fullscreen.fallback); var t = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement; return t && t.shadowRoot ? t === this.target.getRootNode().host : t === this.target } }, { key: "target", get: function () { return qu.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container } }], [{ key: "native", get: function () { return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) } }, { key: "prefix", get: function () { if (xu(document.exitFullscreen)) return ""; var e = ""; return ["webkit", "moz", "ms"].some((function (t) { return !(!xu(document["".concat(t, "ExitFullscreen")]) && !xu(document["".concat(t, "CancelFullScreen")])) && (e = t, !0) })), e } }, { key: "property", get: function () { return "moz" === this.prefix ? "FullScreen" : "Fullscreen" } }]), e }(), gf = Math.sign || function (e) { return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1 }; function vf(e) { var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1; return new Promise((function (n, i) { var r = new Image, o = function () { delete r.onload, delete r.onerror, (r.naturalWidth >= t ? n : i)(r) }; Object.assign(r, { onload: o, onerror: o, src: e }) })) } Le({ target: "Math", stat: !0 }, { sign: gf }); var yf = { addStyleHook: function () { nh(this.elements.container, this.config.selectors.container.replace(".", ""), !0), nh(this.elements.container, this.config.classNames.uiSupported, this.supported.ui) }, toggleNativeControls: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls") }, build: function () { var e = this; if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void yf.toggleNativeControls.call(this, !0); Lu(this.elements.controls) || (nf.inject.call(this), this.listeners.controls()), yf.toggleNativeControls.call(this), this.isHTML5 && af.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, nf.updateVolume.call(this), nf.timeUpdate.call(this), yf.checkPlaying.call(this), nh(this.elements.container, this.config.classNames.pip.supported, uh.pip && this.isHTML5 && this.isVideo), nh(this.elements.container, this.config.classNames.airplay.supported, uh.airplay && this.isHTML5), nh(this.elements.container, this.config.classNames.isIos, qu.isIos), nh(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout((function () { gh.call(e, e.media, "ready") }), 0), yf.setTitle.call(this), this.poster && yf.setPoster.call(this, this.poster, !1).catch((function () { })), this.config.duration && nf.durationUpdate.call(this) }, setTitle: function () { var e = Kh("play", this.config); if (Cu(this.config.title) && !Uu(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach((function (t) { t.setAttribute("aria-label", e) })), this.isEmbed) { var t = ah.call(this, "iframe"); if (!Lu(t)) return; var n = Uu(this.config.title) ? "video" : this.config.title, i = Kh("frameTitle", this.config); t.setAttribute("title", i.replace("{title}", n)) } }, togglePoster: function (e) { nh(this.elements.container, this.config.classNames.posterEnabled, e) }, setPoster: function (e) { var t = this, n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]; return n && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), yh.call(this).then((function () { return vf(e) })).catch((function (n) { throw e === t.poster && yf.togglePoster.call(t, !1), n })).then((function () { if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster") })).then((function () { return Object.assign(t.elements.poster.style, { backgroundImage: "url('".concat(e, "')"), backgroundSize: "" }), yf.togglePoster.call(t, !0), e }))) }, checkPlaying: function (e) { var t = this; nh(this.elements.container, this.config.classNames.playing, this.playing), nh(this.elements.container, this.config.classNames.paused, this.paused), nh(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((function (e) { Object.assign(e, { pressed: t.playing }), e.setAttribute("aria-label", Kh(t.playing ? "pause" : "play", t.config)) })), ju(e) && "timeupdate" === e.type || yf.toggleControls.call(this) }, checkLoading: function (e) { var t = this; this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout((function () { nh(t.elements.container, t.config.classNames.loading, t.loading), yf.toggleControls.call(t) }), this.loading ? 250 : 0) }, toggleControls: function (e) { var t = this.elements.controls; if (t && this.config.hideControls) { var n = this.touch && this.lastSeekTime + 2e3 > Date.now(); this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || n)) } }, migrateStyles: function () { var e = this; Object.values(Fa({}, this.media.style)).filter((function (e) { return !Uu(e) && Cu(e) && e.startsWith("--plyr") })).forEach((function (t) { e.elements.container.style.setProperty(t, e.media.style.getPropertyValue(t)), e.media.style.removeProperty(t) })), Uu(this.media.style) && this.media.removeAttribute("style") } }, bf = function () { function e(t) { Ra(this, e), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this) } return _a(e, [{ key: "handleKey", value: function (e) { var t = this.player, n = t.elements, i = e.keyCode ? e.keyCode : e.which, r = "keydown" === e.type, o = r && i === this.lastKey; if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && Au(i)) { if (r) { var a = document.activeElement; if (Lu(a)) { var s = t.config.selectors.editable; if (a !== n.inputs.seek && rh(a, s)) return; if (32 === e.which && rh(a, 'button, [role^="menuitem"]')) return } switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) { case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: o || (t.currentTime = t.duration / 10 * (i - 48)); break; case 32: case 75: o || bh(t.togglePlay()); break; case 38: t.increaseVolume(.1); break; case 40: t.decreaseVolume(.1); break; case 77: o || (t.muted = !t.muted); break; case 39: t.forward(); break; case 37: t.rewind(); break; case 70: t.fullscreen.toggle(); break; case 67: o || t.toggleCaptions(); break; case 76: t.loop = !t.loop }27 === i && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = i } else this.lastKey = null } } }, { key: "toggleMenu", value: function (e) { nf.toggleMenu.call(this.player, e) } }, { key: "firstTouch", value: function () { var e = this.player, t = e.elements; e.touch = !0, nh(t.container, e.config.classNames.isTouch, !0) } }, { key: "setTabFocus", value: function (e) { var t = this.player, n = t.elements; if (clearTimeout(this.focusTimer), "keydown" !== e.type || 9 === e.which) { "keydown" === e.type && (this.lastKeyDown = e.timeStamp); var i, r = e.timeStamp - this.lastKeyDown <= 20; if ("focus" !== e.type || r) i = t.config.classNames.tabFocus, nh(oh.call(t, ".".concat(i)), i, !1), "focusout" !== e.type && (this.focusTimer = setTimeout((function () { var e = document.activeElement; n.container.contains(e) && nh(document.activeElement, t.config.classNames.tabFocus, !0) }), 10)) } } }, { key: "global", value: function () { var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = this.player; t.config.keyboard.global && fh.call(t, window, "keydown keyup", this.handleKey, e, !1), fh.call(t, document.body, "click", this.toggleMenu, e), mh.call(t, document.body, "touchstart", this.firstTouch), fh.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0) } }, { key: "container", value: function () { var e = this.player, t = e.config, n = e.elements, i = e.timers; !t.keyboard.global && t.keyboard.focused && dh.call(e, n.container, "keydown keyup", this.handleKey, !1), dh.call(e, n.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (function (t) { var r = n.controls; r && "enterfullscreen" === t.type && (r.pressed = !1, r.hover = !1); var o = 0;["touchstart", "touchmove", "mousemove"].includes(t.type) && (yf.toggleControls.call(e, !0), o = e.touch ? 3e3 : 2e3), clearTimeout(i.controls), i.controls = setTimeout((function () { return yf.toggleControls.call(e, !1) }), o) })); var r = function (t) { if (!t) return Sh.call(e); var i = n.container.getBoundingClientRect(), r = i.width, o = i.height; return Sh.call(e, "".concat(r, ":").concat(o)) }, o = function () { clearTimeout(i.resized), i.resized = setTimeout(r, 50) }; dh.call(e, n.container, "enterfullscreen exitfullscreen", (function (t) { var i = e.fullscreen, a = i.target, s = i.usingNative; if (a === n.container && (e.isEmbed || !Uu(e.config.ratio))) { var l = "enterfullscreen" === t.type, c = r(l); c.padding; !function (t, n, i) { if (e.isVimeo && !e.config.vimeo.premium) { var r = e.elements.wrapper.firstChild, o = Ha(t, 2)[1], a = Ha(Th.call(e), 2), s = a[0], l = a[1]; r.style.maxWidth = i ? "".concat(o / l * s, "px") : null, r.style.margin = i ? "0 auto" : null } }(c.ratio, 0, l), l && setTimeout((function () { return Fu(n.container) }), 100), s || (l ? dh.call(e, window, "resize", o) : ph.call(e, window, "resize", o)) } })) } }, { key: "media", value: function () { var e = this, t = this.player, n = t.elements; if (dh.call(t, t.media, "timeupdate seeking seeked", (function (e) { return nf.timeUpdate.call(t, e) })), dh.call(t, t.media, "durationchange loadeddata loadedmetadata", (function (e) { return nf.durationUpdate.call(t, e) })), dh.call(t, t.media, "ended", (function () { t.isHTML5 && t.isVideo && t.config.resetOnEnd && (t.restart(), t.pause()) })), dh.call(t, t.media, "progress playing seeking seeked", (function (e) { return nf.updateProgress.call(t, e) })), dh.call(t, t.media, "volumechange", (function (e) { return nf.updateVolume.call(t, e) })), dh.call(t, t.media, "playing play pause ended emptied timeupdate", (function (e) { return yf.checkPlaying.call(t, e) })), dh.call(t, t.media, "waiting canplay seeked playing", (function (e) { return yf.checkLoading.call(t, e) })), t.supported.ui && t.config.clickToPlay && !t.isAudio) { var i = ah.call(t, ".".concat(t.config.classNames.video)); if (!Lu(i)) return; dh.call(t, n.container, "click", (function (r) { ([n.container, i].includes(r.target) || i.contains(r.target)) && (t.touch && t.config.hideControls || (t.ended ? (e.proxy(r, t.restart, "restart"), e.proxy(r, (function () { bh(t.play()) }), "play")) : e.proxy(r, (function () { bh(t.togglePlay()) }), "play"))) })) } t.supported.ui && t.config.disableContextMenu && dh.call(t, n.wrapper, "contextmenu", (function (e) { e.preventDefault() }), !1), dh.call(t, t.media, "volumechange", (function () { t.storage.set({ volume: t.volume, muted: t.muted }) })), dh.call(t, t.media, "ratechange", (function () { nf.updateSetting.call(t, "speed"), t.storage.set({ speed: t.speed }) })), dh.call(t, t.media, "qualitychange", (function (e) { nf.updateSetting.call(t, "quality", null, e.detail.quality) })), dh.call(t, t.media, "ready qualitychange", (function () { nf.setDownloadUrl.call(t) })); var r = t.config.events.concat(["keyup", "keydown"]).join(" "); dh.call(t, t.media, r, (function (e) { var i = e.detail, r = void 0 === i ? {} : i; "error" === e.type && (r = t.media.error), gh.call(t, n.container, e.type, !0, r) })) } }, { key: "proxy", value: function (e, t, n) { var i = this.player, r = i.config.listeners[n], o = !0; xu(r) && (o = r.call(i, e)), !1 !== o && xu(t) && t.call(i, e) } }, { key: "bind", value: function (e, t, n, i) { var r = this, o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], a = this.player, s = a.config.listeners[i], l = xu(s); dh.call(a, e, t, (function (e) { return r.proxy(e, n, i) }), o && !l) } }, { key: "controls", value: function () { var e = this, t = this.player, n = t.elements, i = qu.isIE ? "change" : "input"; if (n.buttons.play && Array.from(n.buttons.play).forEach((function (n) { e.bind(n, "click", (function () { bh(t.togglePlay()) }), "play") })), this.bind(n.buttons.restart, "click", t.restart, "restart"), this.bind(n.buttons.rewind, "click", (function () { t.lastSeekTime = Date.now(), t.rewind() }), "rewind"), this.bind(n.buttons.fastForward, "click", (function () { t.lastSeekTime = Date.now(), t.forward() }), "fastForward"), this.bind(n.buttons.mute, "click", (function () { t.muted = !t.muted }), "mute"), this.bind(n.buttons.captions, "click", (function () { return t.toggleCaptions() })), this.bind(n.buttons.download, "click", (function () { gh.call(t, t.media, "download") }), "download"), this.bind(n.buttons.fullscreen, "click", (function () { t.fullscreen.toggle() }), "fullscreen"), this.bind(n.buttons.pip, "click", (function () { t.pip = "toggle" }), "pip"), this.bind(n.buttons.airplay, "click", t.airplay, "airplay"), this.bind(n.buttons.settings, "click", (function (e) { e.stopPropagation(), e.preventDefault(), nf.toggleMenu.call(t, e) }), null, !1), this.bind(n.buttons.settings, "keyup", (function (e) { var n = e.which;[13, 32].includes(n) && (13 !== n ? (e.preventDefault(), e.stopPropagation(), nf.toggleMenu.call(t, e)) : nf.focusFirstMenuItem.call(t, null, !0)) }), null, !1), this.bind(n.settings.menu, "keydown", (function (e) { 27 === e.which && nf.toggleMenu.call(t, e) })), this.bind(n.inputs.seek, "mousedown mousemove", (function (e) { var t = n.progress.getBoundingClientRect(), i = 100 / t.width * (e.pageX - t.left); e.currentTarget.setAttribute("seek-value", i) })), this.bind(n.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (function (e) { var n = e.currentTarget, i = e.keyCode ? e.keyCode : e.which, r = "play-on-seeked"; if (!Nu(e) || 39 === i || 37 === i) { t.lastSeekTime = Date.now(); var o = n.hasAttribute(r), a = ["mouseup", "touchend", "keyup"].includes(e.type); o && a ? (n.removeAttribute(r), bh(t.play())) : !a && t.playing && (n.setAttribute(r, ""), t.pause()) } })), qu.isIos) { var r = oh.call(t, 'input[type="range"]'); Array.from(r).forEach((function (t) { return e.bind(t, i, (function (e) { return Fu(e.target) })) })) } this.bind(n.inputs.seek, i, (function (e) { var n = e.currentTarget, i = n.getAttribute("seek-value"); Uu(i) && (i = n.value), n.removeAttribute("seek-value"), t.currentTime = i / n.max * t.duration }), "seek"), this.bind(n.progress, "mouseenter mouseleave mousemove", (function (e) { return nf.updateSeekTooltip.call(t, e) })), this.bind(n.progress, "mousemove touchmove", (function (e) { var n = t.previewThumbnails; n && n.loaded && n.startMove(e) })), this.bind(n.progress, "mouseleave touchend click", (function () { var e = t.previewThumbnails; e && e.loaded && e.endMove(!1, !0) })), this.bind(n.progress, "mousedown touchstart", (function (e) { var n = t.previewThumbnails; n && n.loaded && n.startScrubbing(e) })), this.bind(n.progress, "mouseup touchend", (function (e) { var n = t.previewThumbnails; n && n.loaded && n.endScrubbing(e) })), qu.isWebkit && Array.from(oh.call(t, 'input[type="range"]')).forEach((function (n) { e.bind(n, "input", (function (e) { return nf.updateRangeFill.call(t, e.target) })) })), t.config.toggleInvert && !Lu(n.display.duration) && this.bind(n.display.currentTime, "click", (function () { 0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, nf.timeUpdate.call(t)) })), this.bind(n.inputs.volume, i, (function (e) { t.volume = e.target.value }), "volume"), this.bind(n.controls, "mouseenter mouseleave", (function (e) { n.controls.hover = !t.touch && "mouseenter" === e.type })), n.fullscreen && Array.from(n.fullscreen.children).filter((function (e) { return !e.contains(n.container) })).forEach((function (i) { e.bind(i, "mouseenter mouseleave", (function (e) { n.controls.hover = !t.touch && "mouseenter" === e.type })) })), this.bind(n.controls, "mousedown mouseup touchstart touchend touchcancel", (function (e) { n.controls.pressed = ["mousedown", "touchstart"].includes(e.type) })), this.bind(n.controls, "focusin", (function () { var i = t.config, r = t.timers; nh(n.controls, i.classNames.noTransition, !0), yf.toggleControls.call(t, !0), setTimeout((function () { nh(n.controls, i.classNames.noTransition, !1) }), 0); var o = e.touch ? 3e3 : 4e3; clearTimeout(r.controls), r.controls = setTimeout((function () { return yf.toggleControls.call(t, !1) }), o) })), this.bind(n.inputs.volume, "wheel", (function (e) { var n = e.webkitDirectionInvertedFromDevice, i = Ha([e.deltaX, -e.deltaY].map((function (e) { return n ? -e : e })), 2), r = i[0], o = i[1], a = Math.sign(Math.abs(r) > Math.abs(o) ? r : o); t.increaseVolume(a / 50); var s = t.media.volume; (1 === a && s < 1 || -1 === a && s > 0) && e.preventDefault() }), "volume", !1) } }]), e }(), wf = Jn("splice"), kf = Zt("splice", { ACCESSORS: !0, 0: 0, 1: 2 }), Tf = Math.max, Sf = Math.min, Ef = 9007199254740991, Af = "Maximum allowed length exceeded"; Le({ target: "Array", proto: !0, forced: !wf || !kf }, { splice: function (e, t) { var n, i, r, o, a, s, l = Me(this), c = ce(l.length), u = fe(e, c), h = arguments.length; if (0 === h ? n = i = 0 : 1 === h ? (n = 0, i = c - u) : (n = h - 2, i = Sf(Tf(se(t), 0), c - u)), c + n - i > Ef) throw TypeError(Af); for (r = st(l, i), o = 0; o < i; o++)(a = u + o) in l && Wn(r, o, l[a]); if (r.length = i, n < i) { for (o = u; o < c - i; o++)s = o + n, (a = o + i) in l ? l[s] = l[a] : delete l[s]; for (o = c; o > c - i + n; o--)delete l[o - 1] } else if (n > i) for (o = c - i; o > u; o--)s = o + n - 1, (a = o + i - 1) in l ? l[s] = l[a] : delete l[s]; for (o = 0; o < n; o++)l[o + u] = arguments[o + 2]; return l.length = c - i + n, r } }); var Cf = t((function (e, t) { e.exports = function () { var e = function () { }, t = {}, n = {}, i = {}; function r(e, t) { e = e.push ? e : [e]; var r, o, a, s = [], l = e.length, c = l; for (r = function (e, n) { n.length && s.push(e), --c || t(s) }; l--;)o = e[l], (a = n[o]) ? r(o, a) : (i[o] = i[o] || []).push(r) } function o(e, t) { if (e) { var r = i[e]; if (n[e] = t, r) for (; r.length;)r[0](e, t), r.splice(0, 1) } } function a(t, n) { t.call && (t = { success: t }), n.length ? (t.error || e)(n) : (t.success || e)(t) } function s(t, n, i, r) { var o, a, l = document, c = i.async, u = (i.numRetries || 0) + 1, h = i.before || e, f = t.replace(/[\?|#].*$$/, ""), d = t.replace(/^(css|img)!/, ""); r = r || 0, /(^css!|\.css$$)/.test(f) ? ((a = l.createElement("link")).rel = "stylesheet", a.href = d, (o = "hideFocus" in a) && a.relList && (o = 0, a.rel = "preload", a.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$$)/.test(f) ? (a = l.createElement("img")).src = d : ((a = l.createElement("script")).src = t, a.async = void 0 === c || c), a.onload = a.onerror = a.onbeforeload = function (e) { var l = e.type[0]; if (o) try { a.sheet.cssText.length || (l = "e") } catch (e) { 18 != e.code && (l = "e") } if ("e" == l) { if ((r += 1) < u) return s(t, n, i, r) } else if ("preload" == a.rel && "style" == a.as) return a.rel = "stylesheet"; n(t, l, e.defaultPrevented) }, !1 !== h(t, a) && l.head.appendChild(a) } function l(e, t, n) { var i, r, o = (e = e.push ? e : [e]).length, a = o, l = []; for (i = function (e, n, i) { if ("e" == n && l.push(e), "b" == n) { if (!i) return; l.push(e) } --o || t(l) }, r = 0; r < a; r++)s(e[r], i, n) } function c(e, n, i) { var r, s; if (n && n.trim && (r = n), s = (r ? i : n) || {}, r) { if (r in t) throw "LoadJS"; t[r] = !0 } function c(t, n) { l(e, (function (e) { a(s, e), t && a({ success: t, error: n }, e), o(r, e) }), s) } if (s.returnPromise) return new Promise(c); c() } return c.ready = function (e, t) { return r(e, (function (e) { a(t, e) })), c }, c.done = function (e) { o(e, []) }, c.reset = function () { t = {}, n = {}, i = {} }, c.isDefined = function (e) { return e in t }, c }() })); function Pf(e) { return new Promise((function (t, n) { Cf(e, { success: t, error: n }) })) } function xf(e) { e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, gh.call(this, this.media, e ? "play" : "pause")) } var Of = { setup: function () { var e = this; nh(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Sh.call(e), Eu(window.Vimeo) ? Of.ready.call(e) : Pf(e.config.urls.vimeo.sdk).then((function () { Of.ready.call(e) })).catch((function (t) { e.debug.warn("Vimeo SDK (player.js) failed to load", t) })) }, ready: function () { var e = this, t = this, n = t.config.vimeo, i = n.premium, r = n.referrerPolicy, o = qa(n, ["premium", "referrerPolicy"]); i && Object.assign(o, { controls: !1, sidedock: !1 }); var a = of(Fa({ loop: t.config.loop.active, autoplay: t.autoplay, muted: t.muted, gesture: "media", playsinline: !this.config.fullscreen.iosNative }, o)), s = t.media.getAttribute("src"); Uu(s) && (s = t.media.getAttribute(t.config.attributes.embed.id)); var l, c = Uu(l = s) ? null : Au(Number(l)) ? l : l.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$$2 : l, u = Gu("iframe"), h = qh(t.config.urls.vimeo.iframe, c, a); if (u.setAttribute("src", h), u.setAttribute("allowfullscreen", ""), u.setAttribute("allow", "autoplay,fullscreen,picture-in-picture"), Uu(r) || u.setAttribute("referrerPolicy", r), i || !n.customControls) u.setAttribute("data-poster", t.poster), t.media = Zu(u, t.media); else { var f = Gu("div", { class: t.config.classNames.embedContainer, "data-poster": t.poster }); f.appendChild(u), t.media = Zu(f, t.media) } n.customControls || Yh(qh(t.config.urls.vimeo.api, h)).then((function (e) { !Uu(e) && e.thumbnail_url && yf.setPoster.call(t, e.thumbnail_url).catch((function () { })) })), t.embed = new window.Vimeo.Player(u, { autopause: t.config.autopause, muted: t.muted }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function () { return xf.call(t, !0), t.embed.play() }, t.media.pause = function () { return xf.call(t, !1), t.embed.pause() }, t.media.stop = function () { t.pause(), t.currentTime = 0 }; var d = t.media.currentTime; Object.defineProperty(t.media, "currentTime", { get: function () { return d }, set: function (e) { var n = t.embed, i = t.media, r = t.paused, o = t.volume, a = r && !n.hasPlayed; i.seeking = !0, gh.call(t, i, "seeking"), Promise.resolve(a && n.setVolume(0)).then((function () { return n.setCurrentTime(e) })).then((function () { return a && n.pause() })).then((function () { return a && n.setVolume(o) })).catch((function () { })) } }); var p = t.config.speed.selected; Object.defineProperty(t.media, "playbackRate", { get: function () { return p }, set: function (e) { t.embed.setPlaybackRate(e).then((function () { p = e, gh.call(t, t.media, "ratechange") })).catch((function () { t.options.speed = [1] })) } }); var m = t.config.volume; Object.defineProperty(t.media, "volume", { get: function () { return m }, set: function (e) { t.embed.setVolume(e).then((function () { m = e, gh.call(t, t.media, "volumechange") })) } }); var g = t.config.muted; Object.defineProperty(t.media, "muted", { get: function () { return g }, set: function (e) { var n = !!Pu(e) && e; t.embed.setVolume(n ? 0 : t.config.volume).then((function () { g = n, gh.call(t, t.media, "volumechange") })) } }); var v, y = t.config.loop; Object.defineProperty(t.media, "loop", { get: function () { return y }, set: function (e) { var n = Pu(e) ? e : t.config.loop.active; t.embed.setLoop(n).then((function () { y = n })) } }), t.embed.getVideoUrl().then((function (e) { v = e, nf.setDownloadUrl.call(t) })).catch((function (t) { e.debug.warn(t) })), Object.defineProperty(t.media, "currentSrc", { get: function () { return v } }), Object.defineProperty(t.media, "ended", { get: function () { return t.currentTime === t.duration } }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then((function (n) { var i = Ha(n, 2), r = i[0], o = i[1]; t.embed.ratio = [r, o], Sh.call(e) })), t.embed.setAutopause(t.config.autopause).then((function (e) { t.config.autopause = e })), t.embed.getVideoTitle().then((function (n) { t.config.title = n, yf.setTitle.call(e) })), t.embed.getCurrentTime().then((function (e) { d = e, gh.call(t, t.media, "timeupdate") })), t.embed.getDuration().then((function (e) { t.media.duration = e, gh.call(t, t.media, "durationchange") })), t.embed.getTextTracks().then((function (e) { t.media.textTracks = e, af.setup.call(t) })), t.embed.on("cuechange", (function (e) { var n = e.cues, i = (void 0 === n ? [] : n).map((function (e) { return function (e) { var t = document.createDocumentFragment(), n = document.createElement("div"); return t.appendChild(n), n.innerHTML = e, t.firstChild.innerText }(e.text) })); af.updateCues.call(t, i) })), t.embed.on("loaded", (function () { (t.embed.getPaused().then((function (e) { xf.call(t, !e), e || gh.call(t, t.media, "playing") })), Lu(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1) })), t.embed.on("bufferstart", (function () { gh.call(t, t.media, "waiting") })), t.embed.on("bufferend", (function () { gh.call(t, t.media, "playing") })), t.embed.on("play", (function () { xf.call(t, !0), gh.call(t, t.media, "playing") })), t.embed.on("pause", (function () { xf.call(t, !1) })), t.embed.on("timeupdate", (function (e) { t.media.seeking = !1, d = e.seconds, gh.call(t, t.media, "timeupdate") })), t.embed.on("progress", (function (e) { t.media.buffered = e.percent, gh.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && gh.call(t, t.media, "canplaythrough"), t.embed.getDuration().then((function (e) { e !== t.media.duration && (t.media.duration = e, gh.call(t, t.media, "durationchange")) })) })), t.embed.on("seeked", (function () { t.media.seeking = !1, gh.call(t, t.media, "seeked") })), t.embed.on("ended", (function () { t.media.paused = !0, gh.call(t, t.media, "ended") })), t.embed.on("error", (function (e) { t.media.error = e, gh.call(t, t.media, "error") })), n.customControls && setTimeout((function () { return yf.build.call(t) }), 0) } }; function If(e) { e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, gh.call(this, this.media, e ? "play" : "pause")) } function Lf(e) { return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0 } var jf = { setup: function () { var e = this; if (nh(this.elements.wrapper, this.config.classNames.embed, !0), Eu(window.YT) && xu(window.YT.Player)) jf.ready.call(this); else { var t = window.onYouTubeIframeAPIReady; window.onYouTubeIframeAPIReady = function () { xu(t) && t(), jf.ready.call(e) }, Pf(this.config.urls.youtube.sdk).catch((function (t) { e.debug.warn("YouTube API failed to load", t) })) } }, getTitle: function (e) { var t = this; Yh(qh(this.config.urls.youtube.api, e)).then((function (e) { if (Eu(e)) { var n = e.title, i = e.height, r = e.width; t.config.title = n, yf.setTitle.call(t), t.embed.ratio = [r, i] } Sh.call(t) })).catch((function () { Sh.call(t) })) }, ready: function () { var e = this, t = e.config.youtube, n = e.media && e.media.getAttribute("id"); if (Uu(n) || !n.startsWith("youtube-")) { var i = e.media.getAttribute("src"); Uu(i) && (i = e.media.getAttribute(this.config.attributes.embed.id)); var r, o, a = Uu(r = i) ? null : r.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$$2 : r, s = Gu("div", { id: (o = e.provider, "".concat(o, "-").concat(Math.floor(1e4 * Math.random()))), "data-poster": t.customControls ? e.poster : void 0 }); if (e.media = Zu(s, e.media), t.customControls) { var l = function (e) { return "https://i.ytimg.com/vi/".concat(a, "/").concat(e, "default.jpg") }; vf(l("maxres"), 121).catch((function () { return vf(l("sd"), 121) })).catch((function () { return vf(l("hq")) })).then((function (t) { return yf.setPoster.call(e, t.src) })).then((function (t) { t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover") })).catch((function () { })) } e.embed = new window.YT.Player(e.media, { videoId: a, host: Lf(t), playerVars: Ku({}, { autoplay: e.config.autoplay ? 1 : 0, hl: e.config.hl, controls: e.supported.ui && t.customControls ? 0 : 1, disablekb: 1, playsinline: e.config.fullscreen.iosNative ? 0 : 1, cc_load_policy: e.captions.active ? 1 : 0, cc_lang_pref: e.config.captions.language, widget_referrer: window ? window.location.href : null }, t), events: { onError: function (t) { if (!e.media.error) { var n = t.data, i = { 2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.", 5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.", 100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.", 101: "The owner of the requested video does not allow it to be played in embedded players.", 150: "The owner of the requested video does not allow it to be played in embedded players." }[n] || "An unknown error occured"; e.media.error = { code: n, message: i }, gh.call(e, e.media, "error") } }, onPlaybackRateChange: function (t) { var n = t.target; e.media.playbackRate = n.getPlaybackRate(), gh.call(e, e.media, "ratechange") }, onReady: function (n) { if (!xu(e.media.play)) { var i = n.target; jf.getTitle.call(e, a), e.media.play = function () { If.call(e, !0), i.playVideo() }, e.media.pause = function () { If.call(e, !1), i.pauseVideo() }, e.media.stop = function () { i.stopVideo() }, e.media.duration = i.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", { get: function () { return Number(i.getCurrentTime()) }, set: function (t) { e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, gh.call(e, e.media, "seeking"), i.seekTo(t) } }), Object.defineProperty(e.media, "playbackRate", { get: function () { return i.getPlaybackRate() }, set: function (e) { i.setPlaybackRate(e) } }); var r = e.config.volume; Object.defineProperty(e.media, "volume", { get: function () { return r }, set: function (t) { r = t, i.setVolume(100 * r), gh.call(e, e.media, "volumechange") } }); var o = e.config.muted; Object.defineProperty(e.media, "muted", { get: function () { return o }, set: function (t) { var n = Pu(t) ? t : o; o = n, i[n ? "mute" : "unMute"](), i.setVolume(100 * r), gh.call(e, e.media, "volumechange") } }), Object.defineProperty(e.media, "currentSrc", { get: function () { return i.getVideoUrl() } }), Object.defineProperty(e.media, "ended", { get: function () { return e.currentTime === e.duration } }); var s = i.getAvailablePlaybackRates(); e.options.speed = s.filter((function (t) { return e.config.speed.options.includes(t) })), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), gh.call(e, e.media, "timeupdate"), gh.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval((function () { e.media.buffered = i.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && gh.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), gh.call(e, e.media, "canplaythrough")) }), 200), t.customControls && setTimeout((function () { return yf.build.call(e) }), 50) } }, onStateChange: function (n) { var i = n.target; switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(n.data) && (e.media.seeking = !1, gh.call(e, e.media, "seeked")), n.data) { case -1: gh.call(e, e.media, "timeupdate"), e.media.buffered = i.getVideoLoadedFraction(), gh.call(e, e.media, "progress"); break; case 0: If.call(e, !1), e.media.loop ? (i.stopVideo(), i.playVideo()) : gh.call(e, e.media, "ended"); break; case 1: t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (If.call(e, !0), gh.call(e, e.media, "playing"), e.timers.playing = setInterval((function () { gh.call(e, e.media, "timeupdate") }), 50), e.media.duration !== i.getDuration() && (e.media.duration = i.getDuration(), gh.call(e, e.media, "durationchange"))); break; case 2: e.muted || e.embed.unMute(), If.call(e, !1); break; case 3: gh.call(e, e.media, "waiting") }gh.call(e, e.elements.container, "statechange", !1, { code: n.data }) } } }) } } }, Nf = { setup: function () { this.media ? (nh(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), nh(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && nh(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = Gu("div", { class: this.config.classNames.video }), $$u(this.media, this.elements.wrapper), this.elements.poster = Gu("div", { class: this.config.classNames.poster, hidden: "" }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? Eh.setup.call(this) : this.isYouTube ? jf.setup.call(this) : this.isVimeo && Of.setup.call(this)) : this.debug.warn("No media element found!") } }, Rf = function () { function e(t) { var n = this; Ra(this, e), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = { container: null, displayContainer: null }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((function (e, t) { n.on("loaded", e), n.on("error", t) })), this.load() } return _a(e, [{ key: "load", value: function () { var e = this; this.enabled && (Eu(window.google) && Eu(window.google.ima) ? this.ready() : Pf(this.player.config.urls.googleIMA.sdk).then((function () { e.ready() })).catch((function () { e.trigger("error", new Error("Google IMA SDK failed to load")) }))) } }, { key: "ready", value: function () { var e, t = this; this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then((function () { t.clearSafetyTimer("onAdsManagerLoaded()") })), this.listeners(), this.setupIMA() } }, { key: "setupIMA", value: function () { var e = this; this.elements.container = Gu("div", { class: this.player.config.classNames.ads }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (function (t) { return e.onAdsManagerLoaded(t) }), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (function (t) { return e.onAdError(t) }), !1), this.requestAds() } }, { key: "requestAds", value: function () { var e = this.player.elements.container; try { var t = new google.ima.AdsRequest; t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t) } catch (e) { this.onAdError(e) } } }, { key: "pollCountdown", value: function () { var e = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; if (!t) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text"); var n = function () { var t = tf(Math.max(e.manager.getRemainingTime(), 0)), n = "".concat(Kh("advertisement", e.player.config), " - ").concat(t); e.elements.container.setAttribute("data-badge-text", n) }; this.countdownTimer = setInterval(n, 100) } }, { key: "onAdsManagerLoaded", value: function (e) { var t = this; if (this.enabled) { var n = new google.ima.AdsRenderingSettings; n.restoreCustomPlaybackStateOnAdBreakComplete = !0, n.enablePreloading = !0, this.manager = e.getAdsManager(this.player, n), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (function (e) { return t.onAdError(e) })), Object.keys(google.ima.AdEvent.Type).forEach((function (e) { t.manager.addEventListener(google.ima.AdEvent.Type[e], (function (e) { return t.onAdEvent(e) })) })), this.trigger("loaded") } } }, { key: "addCuePoints", value: function () { var e = this; Uu(this.cuePoints) || this.cuePoints.forEach((function (t) { if (0 !== t && -1 !== t && t < e.player.duration) { var n = e.player.elements.progress; if (Lu(n)) { var i = 100 / e.player.duration * t, r = Gu("span", { class: e.player.config.classNames.cues }); r.style.left = "".concat(i.toString(), "%"), n.appendChild(r) } } })) } }, { key: "onAdEvent", value: function (e) { var t = this, n = this.player.elements.container, i = e.getAd(), r = e.getAdData(); switch (function (e) { gh.call(t.player, t.player.media, "ads".concat(e.replace(/_/g, "").toLowerCase())) }(e.type), e.type) { case google.ima.AdEvent.Type.LOADED: this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = n.offsetWidth, i.height = n.offsetHeight); break; case google.ima.AdEvent.Type.STARTED: this.manager.setVolume(this.player.volume); break; case google.ima.AdEvent.Type.ALL_ADS_COMPLETED: this.player.ended ? this.loadAds() : this.loader.contentComplete(); break; case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED: this.pauseContent(); break; case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED: this.pollCountdown(), this.resumeContent(); break; case google.ima.AdEvent.Type.LOG: r.adError && this.player.debug.warn("Non-fatal ad error: ".concat(r.adError.getMessage())) } } }, { key: "onAdError", value: function (e) { this.cancel(), this.player.debug.warn("Ads error", e) } }, { key: "listeners", value: function () { var e, t = this, n = this.player.elements.container; this.player.on("canplay", (function () { t.addCuePoints() })), this.player.on("ended", (function () { t.loader.contentComplete() })), this.player.on("timeupdate", (function () { e = t.player.currentTime })), this.player.on("seeked", (function () { var n = t.player.currentTime; Uu(t.cuePoints) || t.cuePoints.forEach((function (i, r) { e < i && i < n && (t.manager.discardAdBreak(), t.cuePoints.splice(r, 1)) })) })), window.addEventListener("resize", (function () { t.manager && t.manager.resize(n.offsetWidth, n.offsetHeight, google.ima.ViewMode.NORMAL) })) } }, { key: "play", value: function () { var e = this, t = this.player.elements.container; this.managerPromise || this.resumeContent(), this.managerPromise.then((function () { e.manager.setVolume(e.player.volume), e.elements.displayContainer.initialize(); try { e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0 } catch (t) { e.onAdError(t) } })).catch((function () { })) } }, { key: "resumeContent", value: function () { this.elements.container.style.zIndex = "", this.playing = !1, bh(this.player.media.play()) } }, { key: "pauseContent", value: function () { this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause() } }, { key: "cancel", value: function () { this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds() } }, { key: "loadAds", value: function () { var e = this; this.managerPromise.then((function () { e.manager && e.manager.destroy(), e.managerPromise = new Promise((function (t) { e.on("loaded", t), e.player.debug.log(e.manager) })), e.initialized = !1, e.requestAds() })).catch((function () { })) } }, { key: "trigger", value: function (e) { for (var t = this, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)i[r - 1] = arguments[r]; var o = this.events[e]; Ou(o) && o.forEach((function (e) { xu(e) && e.apply(t, i) })) } }, { key: "on", value: function (e, t) { return Ou(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this } }, { key: "startSafetyTimer", value: function (e, t) { var n = this; this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout((function () { n.cancel(), n.clearSafetyTimer("startSafetyTimer()") }), e) } }, { key: "clearSafetyTimer", value: function (e) { Su(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e)), clearTimeout(this.safetyTimer), this.safetyTimer = null) } }, { key: "enabled", get: function () { var e = this.config; return this.player.isHTML5 && this.player.isVideo && e.enabled && (!Uu(e.publisherId) || _u(e.tagUrl)) } }, { key: "tagUrl", get: function () { var e = this.config; if (_u(e.tagUrl)) return e.tagUrl; var t = { AV_PUBLISHERID: "58c25bb0073ef448b1087ad6", AV_CHANNELID: "5a0458dc28a06145e4519d21", AV_URL: window.location.hostname, cb: Date.now(), AV_WIDTH: 640, AV_HEIGHT: 480, AV_CDIM2: e.publisherId }; return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(of(t)) } }]), e }(), Mf = ut.findIndex, _f = "findIndex", Uf = !0, Df = Zt(_f); _f in [] && Array(1).findIndex((function () { Uf = !1 })), Le({ target: "Array", proto: !0, forced: Uf || !Df }, { findIndex: function (e) { return Mf(this, e, arguments.length > 1 ? arguments[1] : void 0) } }), mn(_f); var Ff = Math.min, qf = [].lastIndexOf, Hf = !!qf && 1 / [1].lastIndexOf(1, -0) < 0, Bf = Gt("lastIndexOf"), Vf = Zt("indexOf", { ACCESSORS: !0, 1: 0 }), zf = Hf || !Bf || !Vf ? function (e) { if (Hf) return qf.apply(this, arguments) || 0; var t = m(this), n = ce(t.length), i = n - 1; for (arguments.length > 1 && (i = Ff(i, se(arguments[1]))), i < 0 && (i = n + i); i >= 0; i--)if (i in t && t[i] === e) return i || 0; return -1 } : qf; Le({ target: "Array", proto: !0, forced: zf !== [].lastIndexOf }, { lastIndexOf: zf }); var Wf = function (e, t) { var n = {}; return e > t.width / t.height ? (n.width = t.width, n.height = 1 / e * t.width) : (n.height = t.height, n.width = e * t.height), n }, Kf = function () { function e(t) { Ra(this, e), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = { thumb: {}, scrubbing: {} }, this.load() } return _a(e, [{ key: "load", value: function () { var e = this; this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then((function () { e.enabled && (e.render(), e.determineContainerAutoSizing(), e.loaded = !0) })) } }, { key: "getThumbnails", value: function () { var e = this; return new Promise((function (t) { var n = e.player.config.previewThumbnails.src; if (Uu(n)) throw new Error("Missing previewThumbnails.src config attribute"); var i = function () { e.thumbnails.sort((function (e, t) { return e.height - t.height })), e.player.debug.log("Preview thumbnails", e.thumbnails), t() }; if (xu(n)) n((function (t) { e.thumbnails = t, i() })); else { var r = (Cu(n) ? [n] : n).map((function (t) { return e.getThumbnail(t) })); Promise.all(r).then(i) } })) } }, { key: "getThumbnail", value: function (e) { var t = this; return new Promise((function (n) { Yh(e).then((function (i) { var r, o, a = { frames: (r = i, o = [], r.split(/\r\n\r\n|\n\n|\r\r/).forEach((function (e) { var t = {}; e.split(/\r\n|\n|\r/).forEach((function (e) { if (Au(t.startTime)) { if (!Uu(e.trim()) && Uu(t.text)) { var n = e.trim().split("#xywh="), i = Ha(n, 1); if (t.text = i[0], n[1]) { var r = Ha(n[1].split(","), 4); t.x = r[0], t.y = r[1], t.w = r[2], t.h = r[3] } } } else { var o = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/); o && (t.startTime = 60 * Number(o[1] || 0) * 60 + 60 * Number(o[2]) + Number(o[3]) + Number("0.".concat(o[4])), t.endTime = 60 * Number(o[6] || 0) * 60 + 60 * Number(o[7]) + Number(o[8]) + Number("0.".concat(o[9]))) } })), t.text && o.push(t) })), o), height: null, urlPrefix: "" }; a.frames[0].text.startsWith("/") || a.frames[0].text.startsWith("http://") || a.frames[0].text.startsWith("https://") || (a.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1)); var s = new Image; s.onload = function () { a.height = s.naturalHeight, a.width = s.naturalWidth, t.thumbnails.push(a), n() }, s.src = a.urlPrefix + a.frames[0].text })) })) } }, { key: "startMove", value: function (e) { if (this.loaded && ju(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) { if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100); else { var t = this.player.elements.progress.getBoundingClientRect(), n = 100 / t.width * (e.pageX - t.left); this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = tf(this.seekTime) } this.showImageAtCurrentTime() } } }, { key: "endMove", value: function () { this.toggleThumbContainer(!1, !0) } }, { key: "startScrubbing", value: function (e) { (Su(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime())) } }, { key: "endScrubbing", value: function () { var e = this; this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : mh.call(this.player, this.player.media, "timeupdate", (function () { e.mouseDown || e.toggleScrubbingContainer(!1) })) } }, { key: "listeners", value: function () { var e = this; this.player.on("play", (function () { e.toggleThumbContainer(!1, !0) })), this.player.on("seeked", (function () { e.toggleThumbContainer(!1) })), this.player.on("timeupdate", (function () { e.lastTime = e.player.media.currentTime })) } }, { key: "render", value: function () { this.elements.thumb.container = Gu("div", { class: this.player.config.classNames.previewThumbnails.thumbContainer }), this.elements.thumb.imageContainer = Gu("div", { class: this.player.config.classNames.previewThumbnails.imageContainer }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer); var e = Gu("div", { class: this.player.config.classNames.previewThumbnails.timeContainer }); this.elements.thumb.time = Gu("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), Lu(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = Gu("div", { class: this.player.config.classNames.previewThumbnails.scrubbingContainer }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container) } }, { key: "destroy", value: function () { this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove() } }, { key: "showImageAtCurrentTime", value: function () { var e = this; this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos(); var t = this.thumbnails[0].frames.findIndex((function (t) { return e.seekTime >= t.startTime && e.seekTime <= t.endTime })), n = t >= 0, i = 0; this.mouseDown || this.toggleThumbContainer(n), n && (this.thumbnails.forEach((function (n, r) { e.loadedImages.includes(n.frames[t].text) && (i = r) })), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(i))) } }, { key: "loadImage", value: function () { var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = this.showingThumb, i = this.thumbnails[t], r = i.urlPrefix, o = i.frames[n], a = i.frames[n].text, s = r + a; if (this.currentImageElement && this.currentImageElement.dataset.filename === a) this.showImage(this.currentImageElement, o, t, n, a, !1), this.currentImageElement.dataset.index = n, this.removeOldImages(this.currentImageElement); else { this.loadingImage && this.usingSprites && (this.loadingImage.onload = null); var l = new Image; l.src = s, l.dataset.index = n, l.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log("Loading image: ".concat(s)), l.onload = function () { return e.showImage(l, o, t, n, a, !0) }, this.loadingImage = l, this.removeOldImages(l) } } }, { key: "showImage", value: function (e, t, n, i, r) { var o = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5]; this.player.debug.log("Showing thumb: ".concat(r, ". num: ").concat(i, ". qual: ").concat(n, ". newimg: ").concat(o)), this.setImageSizeAndOffset(e, t), o && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(r) || this.loadedImages.push(r)), this.preloadNearby(i, !0).then(this.preloadNearby(i, !1)).then(this.getHigherQuality(n, e, t, r)) } }, { key: "removeOldImages", value: function (e) { var t = this; Array.from(this.currentImageContainer.children).forEach((function (n) { if ("img" === n.tagName.toLowerCase()) { var i = t.usingSprites ? 500 : 1e3; if (n.dataset.index !== e.dataset.index && !n.dataset.deleting) { n.dataset.deleting = !0; var r = t.currentImageContainer; setTimeout((function () { r.removeChild(n), t.player.debug.log("Removing thumb: ".concat(n.dataset.filename)) }), i) } } })) } }, { key: "preloadNearby", value: function (e) { var t = this, n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]; return new Promise((function (i) { setTimeout((function () { var r = t.thumbnails[0].frames[e].text; if (t.showingThumbFilename === r) { var o; o = n ? t.thumbnails[0].frames.slice(e) : t.thumbnails[0].frames.slice(0, e).reverse(); var a = !1; o.forEach((function (e) { var n = e.text; if (n !== r && !t.loadedImages.includes(n)) { a = !0, t.player.debug.log("Preloading thumb filename: ".concat(n)); var o = t.thumbnails[0].urlPrefix + n, s = new Image; s.src = o, s.onload = function () { t.player.debug.log("Preloaded thumb filename: ".concat(n)), t.loadedImages.includes(n) || t.loadedImages.push(n), i() } } })), a || i() } }), 300) })) } }, { key: "getHigherQuality", value: function (e, t, n, i) { var r = this; if (e < this.thumbnails.length - 1) { var o = t.naturalHeight; this.usingSprites && (o = n.h), o < this.thumbContainerHeight && setTimeout((function () { r.showingThumbFilename === i && (r.player.debug.log("Showing higher quality thumb for: ".concat(i)), r.loadImage(e + 1)) }), 300) } } }, { key: "toggleThumbContainer", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = this.player.config.classNames.previewThumbnails.thumbContainerShown; this.elements.thumb.container.classList.toggle(n, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null) } }, { key: "toggleScrubbingContainer", value: function () { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown; this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null) } }, { key: "determineContainerAutoSizing", value: function () { (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0) } }, { key: "setThumbContainerSizeAndPos", value: function () { if (this.sizeSpecifiedInCSS) { if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) { var e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio); this.elements.thumb.imageContainer.style.width = "".concat(e, "px") } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) { var t = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio); this.elements.thumb.imageContainer.style.height = "".concat(t, "px") } } else { var n = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio); this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(n, "px") } this.setThumbContainerPos() } }, { key: "setThumbContainerPos", value: function () { var e = this.player.elements.progress.getBoundingClientRect(), t = this.player.elements.container.getBoundingClientRect(), n = this.elements.thumb.container, i = t.left - e.left + 10, r = t.right - e.left - n.clientWidth - 10, o = this.mousePosX - e.left - n.clientWidth / 2; o < i && (o = i), o > r && (o = r), n.style.left = "".concat(o, "px") } }, { key: "setScrubbingContainerSize", value: function () { var e = Wf(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight }), t = e.width, n = e.height; this.elements.scrubbing.container.style.width = "".concat(t, "px"), this.elements.scrubbing.container.style.height = "".concat(n, "px") } }, { key: "setImageSizeAndOffset", value: function (e, t) { if (this.usingSprites) { var n = this.thumbContainerHeight / t.h; e.style.height = "".concat(e.naturalHeight * n, "px"), e.style.width = "".concat(e.naturalWidth * n, "px"), e.style.left = "-".concat(t.x * n, "px"), e.style.top = "-".concat(t.y * n, "px") } } }, { key: "enabled", get: function () { return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled } }, { key: "currentImageContainer", get: function () { return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer } }, { key: "usingSprites", get: function () { return Object.keys(this.thumbnails[0].frames[0]).includes("w") } }, { key: "thumbAspectRatio", get: function () { return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height } }, { key: "thumbContainerHeight", get: function () { return this.mouseDown ? Wf(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight }).height : this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4) } }, { key: "currentImageElement", get: function () { return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement }, set: function (e) { this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e } }]), e }(), $$f = { insertElements: function (e, t) { var n = this; Cu(t) ? Xu(e, this.media, { src: t }) : Ou(t) && t.forEach((function (t) { Xu(e, n.media, t) })) }, change: function (e) { var t = this; Wu(e, "sources.length") ? (Eh.cancelRequests.call(this), this.destroy.call(this, (function () { t.options.quality = [], Qu(t.media), t.media = null, Lu(t.elements.container) && t.elements.container.removeAttribute("class"); var n = e.sources, i = e.type, r = Ha(n, 1)[0], o = r.provider, a = void 0 === o ? uf.html5 : o, s = r.src, l = "html5" === a ? i : "div", c = "html5" === a ? {} : { src: s }; Object.assign(t, { provider: a, type: i, supported: uh.check(i, a, t.config.playsinline), media: Gu(l, c) }), t.elements.container.appendChild(t.media), Pu(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), Uu(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), yf.addStyleHook.call(t), t.isHTML5 && $$f.insertElements.call(t, "source", n), t.config.title = e.title, Nf.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && $$f.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && yf.build.call(t), t.isHTML5 && t.media.load(), Uu(e.previewThumbnails) || (Object.assign(t.config.previewThumbnails, e.previewThumbnails), t.previewThumbnails && t.previewThumbnails.loaded && (t.previewThumbnails.destroy(), t.previewThumbnails = null), t.config.previewThumbnails.enabled && (t.previewThumbnails = new Kf(t))), t.fullscreen.update() }), !0)) : this.debug.warn("Invalid source format") } }; var Yf, Gf = function () { function e(t, n) { var i = this; if (Ra(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = uh.touch, this.media = t, Cu(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || Iu(this.media) || Ou(this.media)) && (this.media = this.media[0]), this.config = Ku({}, sf, e.defaults, n || {}, function () { try { return JSON.parse(i.media.getAttribute("data-plyr-config")) } catch (e) { return {} } }()), this.elements = { container: null, fullscreen: null, captions: null, buttons: {}, display: {}, progress: {}, inputs: {}, settings: { popup: null, menu: null, panels: {}, buttons: {} } }, this.captions = { active: null, currentTrack: -1, meta: new WeakMap }, this.fullscreen = { active: !1 }, this.options = { speed: [], quality: [] }, this.debug = new pf(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", uh), !Su(this.media) && Lu(this.media)) if (this.media.plyr) this.debug.warn("Target already setup"); else if (this.config.enabled) if (uh.check().api) { var r = this.media.cloneNode(!0); r.autoplay = !1, this.elements.original = r; var o = this.media.tagName.toLowerCase(), a = null, s = null; switch (o) { case "div": if (a = this.media.querySelector("iframe"), Lu(a)) { if (s = rf(a.getAttribute("src")), this.provider = function (e) { return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$$/.test(e) ? uf.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? uf.vimeo : null }(s.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", s.search.length) { var l = ["1", "true"]; l.includes(s.searchParams.get("autoplay")) && (this.config.autoplay = !0), l.includes(s.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = l.includes(s.searchParams.get("playsinline")), this.config.youtube.hl = s.searchParams.get("hl")) : this.config.playsinline = !0 } } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider); if (Uu(this.provider) || !Object.keys(uf).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider"); this.type = ff; break; case "video": case "audio": this.type = o, this.provider = uf.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0); break; default: return void this.debug.error("Setup failed: unsupported type") }this.supported = uh.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new bf(this), this.storage = new $$h(this), this.media.plyr = this, Lu(this.elements.container) || (this.elements.container = Gu("div", { tabindex: 0 }), $$u(this.media, this.elements.container)), yf.migrateStyles.call(this), yf.addStyleHook.call(this), Nf.setup.call(this), this.config.debug && dh.call(this, this.elements.container, this.config.events.join(" "), (function (e) { i.debug.log("event: ".concat(e.type)) })), this.fullscreen = new mf(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && yf.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Rf(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", (function () { return bh(i.play()) })), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new Kf(this))) : this.debug.error("Setup failed: no support") } else this.debug.error("Setup failed: no support"); else this.debug.error("Setup failed: disabled by config"); else this.debug.error("Setup failed: no suitable element passed") } return _a(e, [{ key: "play", value: function () { var e = this; return xu(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then((function () { return e.ads.play() })).catch((function () { return bh(e.media.play()) })), this.media.play()) : null } }, { key: "pause", value: function () { return this.playing && xu(this.media.pause) ? this.media.pause() : null } }, { key: "togglePlay", value: function (e) { return (Pu(e) ? e : !this.playing) ? this.play() : this.pause() } }, { key: "stop", value: function () { this.isHTML5 ? (this.pause(), this.restart()) : xu(this.media.stop) && this.media.stop() } }, { key: "restart", value: function () { this.currentTime = 0 } }, { key: "rewind", value: function (e) { this.currentTime -= Au(e) ? e : this.config.seekTime } }, { key: "forward", value: function (e) { this.currentTime += Au(e) ? e : this.config.seekTime } }, { key: "increaseVolume", value: function (e) { var t = this.media.muted ? 0 : this.volume; this.volume = t + (Au(e) ? e : 0) } }, { key: "decreaseVolume", value: function (e) { this.increaseVolume(-e) } }, { key: "toggleCaptions", value: function (e) { af.toggle.call(this, e, !1) } }, { key: "airplay", value: function () { uh.airplay && this.media.webkitShowPlaybackTargetPicker() } }, { key: "toggleControls", value: function (e) { if (this.supported.ui && !this.isAudio) { var t = ih(this.elements.container, this.config.classNames.hideControls), n = void 0 === e ? void 0 : !e, i = nh(this.elements.container, this.config.classNames.hideControls, n); if (i && Ou(this.config.controls) && this.config.controls.includes("settings") && !Uu(this.config.settings) && nf.toggleMenu.call(this, !1), i !== t) { var r = i ? "controlshidden" : "controlsshown"; gh.call(this, this.media, r) } return !i } return !1 } }, { key: "on", value: function (e, t) { dh.call(this, this.elements.container, e, t) } }, { key: "once", value: function (e, t) { mh.call(this, this.elements.container, e, t) } }, { key: "off", value: function (e, t) { ph(this.elements.container, e, t) } }, { key: "destroy", value: function (e) { var t = this, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]; if (this.ready) { var i = function () { document.body.style.overflow = "", t.embed = null, n ? (Object.keys(t.elements).length && (Qu(t.elements.buttons.play), Qu(t.elements.captions), Qu(t.elements.controls), Qu(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), xu(e) && e()) : (vh.call(t), Eh.cancelRequests.call(t), Zu(t.elements.original, t.elements.container), gh.call(t, t.elements.original, "destroyed", !0), xu(e) && e.call(t.elements.original), t.ready = !1, setTimeout((function () { t.elements = null, t.media = null }), 200)) }; this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (yf.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && xu(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200)) } } }, { key: "supports", value: function (e) { return uh.mime.call(this, e) } }, { key: "isHTML5", get: function () { return this.provider === uf.html5 } }, { key: "isEmbed", get: function () { return this.isYouTube || this.isVimeo } }, { key: "isYouTube", get: function () { return this.provider === uf.youtube } }, { key: "isVimeo", get: function () { return this.provider === uf.vimeo } }, { key: "isVideo", get: function () { return this.type === ff } }, { key: "isAudio", get: function () { return this.type === hf } }, { key: "playing", get: function () { return Boolean(this.ready && !this.paused && !this.ended) } }, { key: "paused", get: function () { return Boolean(this.media.paused) } }, { key: "stopped", get: function () { return Boolean(this.paused && 0 === this.currentTime) } }, { key: "ended", get: function () { return Boolean(this.media.ended) } }, { key: "currentTime", set: function (e) { if (this.duration) { var t = Au(e) && e > 0; this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds")) } }, get: function () { return Number(this.media.currentTime) } }, { key: "buffered", get: function () { var e = this.media.buffered; return Au(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0 } }, { key: "seeking", get: function () { return Boolean(this.media.seeking) } }, { key: "duration", get: function () { var e = parseFloat(this.config.duration), t = (this.media || {}).duration, n = Au(t) && t !== 1 / 0 ? t : 0; return e || n } }, { key: "volume", set: function (e) { var t = e; Cu(t) && (t = Number(t)), Au(t) || (t = this.storage.get("volume")), Au(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !Uu(e) && this.muted && t > 0 && (this.muted = !1) }, get: function () { return Number(this.media.volume) } }, { key: "muted", set: function (e) { var t = e; Pu(t) || (t = this.storage.get("muted")), Pu(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t }, get: function () { return Boolean(this.media.muted) } }, { key: "hasAudio", get: function () { return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length))) } }, { key: "speed", set: function (e) { var t = this, n = null; Au(e) && (n = e), Au(n) || (n = this.storage.get("speed")), Au(n) || (n = this.config.speed.selected); var i = this.minimumSpeed, r = this.maximumSpeed; n = function () { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255; return Math.min(Math.max(e, t), n) }(n, i, r), this.config.speed.selected = n, setTimeout((function () { t.media.playbackRate = n }), 0) }, get: function () { return Number(this.media.playbackRate) } }, { key: "minimumSpeed", get: function () { return this.isYouTube ? Math.min.apply(Math, Ba(this.options.speed)) : this.isVimeo ? .5 : .0625 } }, { key: "maximumSpeed", get: function () { return this.isYouTube ? Math.max.apply(Math, Ba(this.options.speed)) : this.isVimeo ? 2 : 16 } }, { key: "quality", set: function (e) { var t = this.config.quality, n = this.options.quality; if (n.length) { var i = [!Uu(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(Au), r = !0; if (!n.includes(i)) { var o = function (e, t) { return Ou(e) && e.length ? e.reduce((function (e, n) { return Math.abs(n - t) < Math.abs(e - t) ? n : e })) : null }(n, i); this.debug.warn("Unsupported quality option: ".concat(i, ", using ").concat(o, " instead")), i = o, r = !1 } t.selected = i, this.media.quality = i, r && this.storage.set({ quality: i }) } }, get: function () { return this.media.quality } }, { key: "loop", set: function (e) { var t = Pu(e) ? e : this.config.loop.active; this.config.loop.active = t, this.media.loop = t }, get: function () { return Boolean(this.media.loop) } }, { key: "source", set: function (e) { $$f.change.call(this, e) }, get: function () { return this.media.currentSrc } }, { key: "download", get: function () { var e = this.config.urls.download; return _u(e) ? e : this.source }, set: function (e) { _u(e) && (this.config.urls.download = e, nf.setDownloadUrl.call(this)) } }, { key: "poster", set: function (e) { this.isVideo ? yf.setPoster.call(this, e, !1).catch((function () { })) : this.debug.warn("Poster can only be set for video") }, get: function () { return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null } }, { key: "ratio", get: function () { if (!this.isVideo) return null; var e = kh(Th.call(this)); return Ou(e) ? e.join(":") : e }, set: function (e) { this.isVideo ? Cu(e) && wh(e) ? (this.config.ratio = e, Sh.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e, ")")) : this.debug.warn("Aspect ratio can only be set for video") } }, { key: "autoplay", set: function (e) { var t = Pu(e) ? e : this.config.autoplay; this.config.autoplay = t }, get: function () { return Boolean(this.config.autoplay) } }, { key: "currentTrack", set: function (e) { af.set.call(this, e, !1) }, get: function () { var e = this.captions, t = e.toggled, n = e.currentTrack; return t ? n : -1 } }, { key: "language", set: function (e) { af.setLanguage.call(this, e, !1) }, get: function () { return (af.getCurrentTrack.call(this) || {}).language } }, { key: "pip", set: function (e) { if (uh.pip) { var t = Pu(e) ? e : !this.pip; xu(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? lf : cf), xu(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture()) } }, get: function () { return uh.pip ? Uu(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === lf : null } }], [{ key: "supported", value: function (e, t, n) { return uh.check(e, t, n) } }, { key: "loadSprite", value: function (e, t) { return Gh(e, t) } }, { key: "setup", value: function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = null; return Cu(t) ? i = Array.from(document.querySelectorAll(t)) : Iu(t) ? i = Array.from(t) : Ou(t) && (i = t.filter(Lu)), Uu(i) ? null : i.map((function (t) { return new e(t, n) })) } }]), e }(); return Gf.defaults = (Yf = sf, JSON.parse(JSON.stringify(Yf))), Gf
}));
//# sourceMappingURL=plyr.polyfilled.min.js.map
/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */(function (e, t) { 'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t() })(this, function () { 'use strict'; function e(e) { return e && '[object Function]' === {}.toString.call(e) } function t(e, t) { if (1 !== e.nodeType) return []; var o = e.ownerDocument.defaultView, n = o.getComputedStyle(e, null); return t ? n[t] : n } function o(e) { return 'HTML' === e.nodeName ? e : e.parentNode || e.host } function n(e) { if (!e) return document.body; switch (e.nodeName) { case 'HTML': case 'BODY': return e.ownerDocument.body; case '#document': return e.body; }var i = t(e), r = i.overflow, p = i.overflowX, s = i.overflowY; return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e)) } function r(e) { return 11 === e ? pe : 10 === e ? se : pe || se } function p(e) { if (!e) return document.documentElement; for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;)n = (e = e.nextElementSibling).offsetParent; var i = n && n.nodeName; return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement } function s(e) { var t = e.nodeName; return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e) } function d(e) { return null === e.parentNode ? e : d(e.parentNode) } function a(e, t) { if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement; var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, n = o ? e : t, i = o ? t : e, r = document.createRange(); r.setStart(n, 0), r.setEnd(i, 0); var l = r.commonAncestorContainer; if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l); var f = d(e); return f.host ? a(f.host, t) : a(e, d(t).host) } function l(e) { var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top', o = 'top' === t ? 'scrollTop' : 'scrollLeft', n = e.nodeName; if ('BODY' === n || 'HTML' === n) { var i = e.ownerDocument.documentElement, r = e.ownerDocument.scrollingElement || i; return r[o] } return e[o] } function f(e, t) { var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], n = l(t, 'top'), i = l(t, 'left'), r = o ? -1 : 1; return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e } function m(e, t) { var o = 'x' === t ? 'Left' : 'Top', n = 'Left' == o ? 'Right' : 'Bottom'; return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10) } function h(e, t, o, n) { return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0) } function c(e) { var t = e.body, o = e.documentElement, n = r(10) && getComputedStyle(o); return { height: h('Height', t, o, n), width: h('Width', t, o, n) } } function g(e) { return fe({}, e, { right: e.left + e.width, bottom: e.top + e.height }) } function u(e) { var o = {}; try { if (r(10)) { o = e.getBoundingClientRect(); var n = l(e, 'top'), i = l(e, 'left'); o.top += n, o.left += i, o.bottom += n, o.right += i } else o = e.getBoundingClientRect() } catch (t) { } var p = { left: o.left, top: o.top, width: o.right - o.left, height: o.bottom - o.top }, s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {}, d = s.width || e.clientWidth || p.right - p.left, a = s.height || e.clientHeight || p.bottom - p.top, f = e.offsetWidth - d, h = e.offsetHeight - a; if (f || h) { var u = t(e); f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h } return g(p) } function b(e, o) { var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], p = r(10), s = 'HTML' === o.nodeName, d = u(e), a = u(o), l = n(e), m = t(o), h = parseFloat(m.borderTopWidth, 10), c = parseFloat(m.borderLeftWidth, 10); i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0)); var b = g({ top: d.top - a.top - h, left: d.left - a.left - c, width: d.width, height: d.height }); if (b.marginTop = 0, b.marginLeft = 0, !p && s) { var w = parseFloat(m.marginTop, 10), y = parseFloat(m.marginLeft, 10); b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y } return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b } function w(e) { var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], o = e.ownerDocument.documentElement, n = b(e, o), i = ee(o.clientWidth, window.innerWidth || 0), r = ee(o.clientHeight, window.innerHeight || 0), p = t ? 0 : l(o), s = t ? 0 : l(o, 'left'), d = { top: p - n.top + n.marginTop, left: s - n.left + n.marginLeft, width: i, height: r }; return g(d) } function y(e) { var n = e.nodeName; if ('BODY' === n || 'HTML' === n) return !1; if ('fixed' === t(e, 'position')) return !0; var i = o(e); return !!i && y(i) } function E(e) { if (!e || !e.parentElement || r()) return document.documentElement; for (var o = e.parentElement; o && 'none' === t(o, 'transform');)o = o.parentElement; return o || document.documentElement } function v(e, t, i, r) { var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], s = { top: 0, left: 0 }, d = p ? E(e) : a(e, t); if ('viewport' === r) s = w(d, p); else { var l; 'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r; var f = b(l, d, p); if ('HTML' === l.nodeName && !y(d)) { var m = c(e.ownerDocument), h = m.height, g = m.width; s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left } else s = f } i = i || 0; var u = 'number' == typeof i; return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s } function x(e) { var t = e.width, o = e.height; return t * o } function O(e, t, o, n, i) { var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0; if (-1 === e.indexOf('auto')) return e; var p = v(o, n, r, i), s = { top: { width: p.width, height: t.top - p.top }, right: { width: p.right - t.right, height: p.height }, bottom: { width: p.width, height: p.bottom - t.bottom }, left: { width: t.left - p.left, height: p.height } }, d = Object.keys(s).map(function (e) { return fe({ key: e }, s[e], { area: x(s[e]) }) }).sort(function (e, t) { return t.area - e.area }), a = d.filter(function (e) { var t = e.width, n = e.height; return t >= o.clientWidth && n >= o.clientHeight }), l = 0 < a.length ? a[0].key : d[0].key, f = e.split('-')[1]; return l + (f ? '-' + f : '') } function L(e, t, o) { var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, i = n ? E(t) : a(t, o); return b(o, i, n) } function S(e) { var t = e.ownerDocument.defaultView, o = t.getComputedStyle(e), n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0), i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0), r = { width: e.offsetWidth + i, height: e.offsetHeight + n }; return r } function T(e) { var t = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }; return e.replace(/left|right|bottom|top/g, function (e) { return t[e] }) } function C(e, t, o) { o = o.split('-')[0]; var n = S(e), i = { width: n.width, height: n.height }, r = -1 !== ['right', 'left'].indexOf(o), p = r ? 'top' : 'left', s = r ? 'left' : 'top', d = r ? 'height' : 'width', a = r ? 'width' : 'height'; return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i } function D(e, t) { return Array.prototype.find ? e.find(t) : e.filter(t)[0] } function N(e, t, o) { if (Array.prototype.findIndex) return e.findIndex(function (e) { return e[t] === o }); var n = D(e, function (e) { return e[t] === o }); return e.indexOf(n) } function P(t, o, n) { var i = void 0 === n ? t : t.slice(0, N(t, 'name', n)); return i.forEach(function (t) { t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!'); var n = t['function'] || t.fn; t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t)) }), o } function k() { if (!this.state.isDestroyed) { var e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} }; e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = C(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e)) } } function W(e, t) { return e.some(function (e) { var o = e.name, n = e.enabled; return n && o === t }) } function B(e) { for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) { var i = t[n], r = i ? '' + i + o : e; if ('undefined' != typeof document.body.style[r]) return r } return null } function H() { return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this } function A(e) { var t = e.ownerDocument; return t ? t.defaultView : window } function M(e, t, o, i) { var r = 'BODY' === e.nodeName, p = r ? e.ownerDocument.defaultView : e; p.addEventListener(t, o, { passive: !0 }), r || M(n(p.parentNode), t, o, i), i.push(p) } function F(e, t, o, i) { o.updateBound = i, A(e).addEventListener('resize', o.updateBound, { passive: !0 }); var r = n(e); return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o } function I() { this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate)) } function R(e, t) { return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) { e.removeEventListener('scroll', t.updateBound) }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t } function U() { this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state)) } function Y(e) { return '' !== e && !isNaN(parseFloat(e)) && isFinite(e) } function V(e, t) { Object.keys(t).forEach(function (o) { var n = ''; -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n }) } function j(e, t) { Object.keys(t).forEach(function (o) { var n = t[o]; !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]) }) } function q(e, t) { var o = e.offsets, n = o.popper, i = o.reference, r = $$, p = function (e) { return e }, s = r(i.width), d = r(n.width), a = -1 !== ['left', 'right'].indexOf(e.placement), l = -1 !== e.placement.indexOf('-'), f = t ? a || l || s % 2 == d % 2 ? r : Z : p, m = t ? r : p; return { left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left), top: m(n.top), bottom: m(n.bottom), right: f(n.right) } } function K(e, t, o) { var n = D(e, function (e) { var o = e.name; return o === t }), i = !!n && e.some(function (e) { return e.name === o && e.enabled && e.order < n.order }); if (!i) { var r = '`' + t + '`'; console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!') } return i } function z(e) { return 'end' === e ? 'start' : 'start' === e ? 'end' : e } function G(e) { var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], o = ce.indexOf(e), n = ce.slice(o + 1).concat(ce.slice(0, o)); return t ? n.reverse() : n } function _(e, t, o, n) { var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), r = +i[1], p = i[2]; if (!r) return e; if (0 === p.indexOf('%')) { var s; switch (p) { case '%p': s = o; break; case '%': case '%r': default: s = n; }var d = g(s); return d[t] / 100 * r } if ('vh' === p || 'vw' === p) { var a; return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r } return r } function X(e, t, o, n) { var i = [0, 0], r = -1 !== ['right', 'left'].indexOf(n), p = e.split(/(\+|\-)/).map(function (e) { return e.trim() }), s = p.indexOf(D(p, function (e) { return -1 !== e.search(/,|\s/) })); p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.'); var d = /\s*,\s*|\s+/, a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))]; return a = a.map(function (e, n) { var i = (1 === n ? !r : r) ? 'height' : 'width', p = !1; return e.reduce(function (e, t) { return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t) }, []).map(function (e) { return _(e, i, t, o) }) }), a.forEach(function (e, t) { e.forEach(function (o, n) { Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1)) }) }), i } function J(e, t) { var o, n = t.offset, i = e.placement, r = e.offsets, p = r.popper, s = r.reference, d = i.split('-')[0]; return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e } for (var Q = Math.min, Z = Math.floor, $$ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1)if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) { ne = 1; break } var i = te && window.Promise, re = i ? function (e) { var t = !1; return function () { t || (t = !0, window.Promise.resolve().then(function () { t = !1, e() })) } } : function (e) { var t = !1; return function () { t || (t = !0, setTimeout(function () { t = !1, e() }, ne)) } }, pe = te && !!(window.MSInputMethodContext && document.documentMode), se = te && /MSIE 10/.test(navigator.userAgent), de = function (e, t) { if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function') }, ae = function () { function e(e, t) { for (var o, n = 0; n < t.length; n++)o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o) } return function (t, o, n) { return o && e(t.prototype, o), n && e(t, n), t } }(), le = function (e, t, o) { return t in e ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = o, e }, fe = Object.assign || function (e) { for (var t, o = 1; o < arguments.length; o++)for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); return e }, me = te && /Firefox/i.test(navigator.userAgent), he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'], ce = he.slice(3), ge = { FLIP: 'flip', CLOCKWISE: 'clockwise', COUNTERCLOCKWISE: 'counterclockwise' }, ue = function () { function t(o, n) { var i = this, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}; de(this, t), this.scheduleUpdate = function () { return requestAnimationFrame(i.update) }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) { i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {}) }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) { return fe({ name: e }, i.options.modifiers[e]) }).sort(function (e, t) { return e.order - t.order }), this.modifiers.forEach(function (t) { t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state) }), this.update(); var p = this.options.eventsEnabled; p && this.enableEventListeners(), this.state.eventsEnabled = p } return ae(t, [{ key: 'update', value: function () { return k.call(this) } }, { key: 'destroy', value: function () { return H.call(this) } }, { key: 'enableEventListeners', value: function () { return I.call(this) } }, { key: 'disableEventListeners', value: function () { return U.call(this) } }]), t }(); return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = { placement: 'bottom', positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () { }, onUpdate: function () { }, modifiers: { shift: { order: 100, enabled: !0, fn: function (e) { var t = e.placement, o = t.split('-')[0], n = t.split('-')[1]; if (n) { var i = e.offsets, r = i.reference, p = i.popper, s = -1 !== ['bottom', 'top'].indexOf(o), d = s ? 'left' : 'top', a = s ? 'width' : 'height', l = { start: le({}, d, r[d]), end: le({}, d, r[d] + r[a] - p[a]) }; e.offsets.popper = fe({}, p, l[n]) } return e } }, offset: { order: 200, enabled: !0, fn: J, offset: 0 }, preventOverflow: { order: 300, enabled: !0, fn: function (e, t) { var o = t.boundariesElement || p(e.instance.popper); e.instance.reference === o && (o = p(o)); var n = B('transform'), i = e.instance.popper.style, r = i.top, s = i.left, d = i[n]; i.top = '', i.left = '', i[n] = ''; var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed); i.top = r, i.left = s, i[n] = d, t.boundaries = a; var l = t.priority, f = e.offsets.popper, m = { primary: function (e) { var o = f[e]; return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o) }, secondary: function (e) { var o = 'right' === e ? 'left' : 'top', n = f[o]; return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n) } }; return l.forEach(function (e) { var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary'; f = fe({}, f, m[t](e)) }), e.offsets.popper = f, e }, priority: ['left', 'right', 'top', 'bottom'], padding: 5, boundariesElement: 'scrollParent' }, keepTogether: { order: 400, enabled: !0, fn: function (e) { var t = e.offsets, o = t.popper, n = t.reference, i = e.placement.split('-')[0], r = Z, p = -1 !== ['top', 'bottom'].indexOf(i), s = p ? 'right' : 'bottom', d = p ? 'left' : 'top', a = p ? 'width' : 'height'; return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e } }, arrow: { order: 500, enabled: !0, fn: function (e, o) { var n; if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e; var i = o.element; if ('string' == typeof i) { if (i = e.instance.popper.querySelector(i), !i) return e; } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e; var r = e.placement.split('-')[0], p = e.offsets, s = p.popper, d = p.reference, a = -1 !== ['left', 'right'].indexOf(r), l = a ? 'height' : 'width', f = a ? 'Top' : 'Left', m = f.toLowerCase(), h = a ? 'left' : 'top', c = a ? 'bottom' : 'right', u = S(i)[l]; d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper); var b = d[m] + d[l] / 2 - u / 2, w = t(e.instance.popper), y = parseFloat(w['margin' + f], 10), E = parseFloat(w['border' + f + 'Width'], 10), v = b - e.offsets.popper[m] - y - E; return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $$(v)), le(n, h, ''), n), e }, element: '[x-arrow]' }, flip: { order: 600, enabled: !0, fn: function (e, t) { if (W(e.instance.modifiers, 'inner')) return e; if (e.flipped && e.placement === e.originalPlacement) return e; var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), n = e.placement.split('-')[0], i = T(n), r = e.placement.split('-')[1] || '', p = []; switch (t.behavior) { case ge.FLIP: p = [n, i]; break; case ge.CLOCKWISE: p = G(n); break; case ge.COUNTERCLOCKWISE: p = G(n, !0); break; default: p = t.behavior; }return p.forEach(function (s, d) { if (n !== s || p.length === d + 1) return e; n = e.placement.split('-')[0], i = T(n); var a = e.offsets.popper, l = e.offsets.reference, f = Z, m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom), h = f(a.left) < f(o.left), c = f(a.right) > f(o.right), g = f(a.top) < f(o.top), u = f(a.bottom) > f(o.bottom), b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u, w = -1 !== ['top', 'bottom'].indexOf(n), y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u), E = !!t.flipVariationsByContent && (w && 'start' === r && c || w && 'end' === r && h || !w && 'start' === r && u || !w && 'end' === r && g), v = y || E; (m || b || v) && (e.flipped = !0, (m || b) && (n = p[d + 1]), v && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, C(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip')) }), e }, behavior: 'flip', padding: 5, boundariesElement: 'viewport', flipVariations: !1, flipVariationsByContent: !1 }, inner: { order: 700, enabled: !1, fn: function (e) { var t = e.placement, o = t.split('-')[0], n = e.offsets, i = n.popper, r = n.reference, p = -1 !== ['left', 'right'].indexOf(o), s = -1 === ['top', 'left'].indexOf(o); return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e } }, hide: { order: 800, enabled: !0, fn: function (e) { if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e; var t = e.offsets.reference, o = D(e.instance.modifiers, function (e) { return 'preventOverflow' === e.name }).boundaries; if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) { if (!0 === e.hide) return e; e.hide = !0, e.attributes['x-out-of-boundaries'] = '' } else { if (!1 === e.hide) return e; e.hide = !1, e.attributes['x-out-of-boundaries'] = !1 } return e } }, computeStyle: { order: 850, enabled: !0, fn: function (e, t) { var o = t.x, n = t.y, i = e.offsets.popper, r = D(e.instance.modifiers, function (e) { return 'applyStyle' === e.name }).gpuAcceleration; void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'); var s, d, a = void 0 === r ? t.gpuAcceleration : r, l = p(e.instance.popper), f = u(l), m = { position: i.position }, h = q(e, 2 > window.devicePixelRatio || !me), c = 'bottom' === o ? 'top' : 'bottom', g = 'right' === n ? 'left' : 'right', b = B('transform'); if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform'; else { var w = 'bottom' == c ? -1 : 1, y = 'right' == g ? -1 : 1; m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g } var E = { "x-placement": e.placement }; return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e }, gpuAcceleration: !0, x: 'bottom', y: 'right' }, applyStyle: { order: 900, enabled: !0, fn: function (e) { return V(e.instance.popper, e.styles), j(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && V(e.arrowElement, e.arrowStyles), e }, onLoad: function (e, t, o, n, i) { var r = L(i, t, e, o.positionFixed), p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding); return t.setAttribute('x-placement', p), V(t, { position: o.positionFixed ? 'fixed' : 'absolute' }), o }, gpuAcceleration: void 0 } } }, ue });
//# sourceMappingURL=popper.min.js.map

// Rivets.js + Sightglass.js
// version: 0.9.3
// author: Michael Richards
// license: MIT
(function () { function t(t, s, i, h) { return new e(t, s, i, h) } function e(t, e, i, h) { this.options = h || {}, this.options.adapters = this.options.adapters || {}, this.obj = t, this.keypath = e, this.callback = i, this.objectPath = [], this.update = this.update.bind(this), this.parse(), s(this.target = this.realize()) && this.set(!0, this.key, this.target, this.callback) } function s(t) { return "object" == typeof t && null !== t } function i(t) { throw new Error("[sightglass] " + t) } t.adapters = {}, e.tokenize = function (t, e, s) { var i, h, a = [], o = { i: s, path: "" }; for (i = 0; i < t.length; i++)h = t.charAt(i), ~e.indexOf(h) ? (a.push(o), o = { i: h, path: "" }) : o.path += h; return a.push(o), a }, e.prototype.parse = function () { var s, h, a = this.interfaces(); a.length || i("Must define at least one adapter interface."), ~a.indexOf(this.keypath[0]) ? (s = this.keypath[0], h = this.keypath.substr(1)) : ("undefined" == typeof (s = this.options.root || t.root) && i("Must define a default root adapter."), h = this.keypath), this.tokens = e.tokenize(h, a, s), this.key = this.tokens.pop() }, e.prototype.realize = function () { var t, e = this.obj, i = !1; return this.tokens.forEach(function (h, a) { s(e) ? ("undefined" != typeof this.objectPath[a] ? e !== (t = this.objectPath[a]) && (this.set(!1, h, t, this.update), this.set(!0, h, e, this.update), this.objectPath[a] = e) : (this.set(!0, h, e, this.update), this.objectPath[a] = e), e = this.get(h, e)) : (i === !1 && (i = a), (t = this.objectPath[a]) && this.set(!1, h, t, this.update)) }, this), i !== !1 && this.objectPath.splice(i), e }, e.prototype.update = function () { var t, e; (t = this.realize()) !== this.target && (s(this.target) && this.set(!1, this.key, this.target, this.callback), s(t) && this.set(!0, this.key, t, this.callback), e = this.value(), this.target = t, (this.value() instanceof Function || this.value() !== e) && this.callback()) }, e.prototype.value = function () { return s(this.target) ? this.get(this.key, this.target) : void 0 }, e.prototype.setValue = function (t) { s(this.target) && this.adapter(this.key).set(this.target, this.key.path, t) }, e.prototype.get = function (t, e) { return this.adapter(t).get(e, t.path) }, e.prototype.set = function (t, e, s, i) { var h = t ? "observe" : "unobserve"; this.adapter(e)[h](s, e.path, i) }, e.prototype.interfaces = function () { var e = Object.keys(this.options.adapters); return Object.keys(t.adapters).forEach(function (t) { ~e.indexOf(t) || e.push(t) }), e }, e.prototype.adapter = function (e) { return this.options.adapters[e.i] || t.adapters[e.i] }, e.prototype.unobserve = function () { var t; this.tokens.forEach(function (e, s) { (t = this.objectPath[s]) && this.set(!1, e, t, this.update) }, this), s(this.target) && this.set(!1, this.key, this.target, this.callback) }, "undefined" != typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define([], function () { return this.sightglass = t }) : this.sightglass = t }).call(this);
(function () { var t, e, i, n, r = function (t, e) { return function () { return t.apply(e, arguments) } }, s = [].slice, o = {}.hasOwnProperty, u = function (t, e) { function i() { this.constructor = t } for (var n in e) o.call(e, n) && (t[n] = e[n]); return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t }, l = [].indexOf || function (t) { for (var e = 0, i = this.length; i > e; e++)if (e in this && this[e] === t) return e; return -1 }; t = { options: ["prefix", "templateDelimiters", "rootInterface", "preloadData", "handler", "executeFunctions"], extensions: ["binders", "formatters", "components", "adapters"], "public": { binders: {}, components: {}, formatters: {}, adapters: {}, prefix: "rv", templateDelimiters: ["{", "}"], rootInterface: ".", preloadData: !0, executeFunctions: !1, iterationAlias: function (t) { return "%" + t + "%" }, handler: function (t, e, i) { return this.call(t, e, i.view.models) }, configure: function (e) { var i, n, r, s; null == e && (e = {}); for (r in e) if (s = e[r], "binders" === r || "components" === r || "formatters" === r || "adapters" === r) for (n in s) i = s[n], t[r][n] = i; else t["public"][r] = s }, bind: function (e, i, n) { var r; return null == i && (i = {}), null == n && (n = {}), r = new t.View(e, i, n), r.bind(), r }, init: function (e, i, n) { var r, s, o; if (null == n && (n = {}), null == i && (i = document.createElement("div")), e = t["public"].components[e], s = e.template.call(this, i), s instanceof HTMLElement) { for (; i.firstChild;)i.removeChild(i.firstChild); i.appendChild(s) } else i.innerHTML = s; return r = e.initialize.call(this, i, n), o = new t.View(i, r), o.bind(), o } } }, window.jQuery || window.$$ ? (n = "on" in jQuery.prototype ? ["on", "off"] : ["bind", "unbind"], e = n[0], i = n[1], t.Util = { bindEvent: function (t, i, n) { return jQuery(t)[e](i, n) }, unbindEvent: function (t, e, n) { return jQuery(t)[i](e, n) }, getInputValue: function (t) { var e; return e = jQuery(t), "checkbox" === e.attr("type") ? e.is(":checked") : e.val() } }) : t.Util = { bindEvent: function () { return "addEventListener" in window ? function (t, e, i) { return t.addEventListener(e, i, !1) } : function (t, e, i) { return t.attachEvent("on" + e, i) } }(), unbindEvent: function () { return "removeEventListener" in window ? function (t, e, i) { return t.removeEventListener(e, i, !1) } : function (t, e, i) { return t.detachEvent("on" + e, i) } }(), getInputValue: function (t) { var e, i, n, r; if ("checkbox" === t.type) return t.checked; if ("select-multiple" === t.type) { for (r = [], i = 0, n = t.length; n > i; i++)e = t[i], e.selected && r.push(e.value); return r } return t.value } }, t.TypeParser = function () { function t() { } return t.types = { primitive: 0, keypath: 1 }, t.parse = function (t) { return /^'.*'$$|^".*"$$/.test(t) ? { type: this.types.primitive, value: t.slice(1, -1) } : "true" === t ? { type: this.types.primitive, value: !0 } : "false" === t ? { type: this.types.primitive, value: !1 } : "null" === t ? { type: this.types.primitive, value: null } : "undefined" === t ? { type: this.types.primitive, value: void 0 } : "" === t ? { type: this.types.primitive, value: void 0 } : isNaN(Number(t)) === !1 ? { type: this.types.primitive, value: Number(t) } : { type: this.types.keypath, value: t } }, t }(), t.TextTemplateParser = function () { function t() { } return t.types = { text: 0, binding: 1 }, t.parse = function (t, e) { var i, n, r, s, o, u, l; for (u = [], s = t.length, i = 0, n = 0; s > n;) { if (i = t.indexOf(e[0], n), 0 > i) { u.push({ type: this.types.text, value: t.slice(n) }); break } if (i > 0 && i > n && u.push({ type: this.types.text, value: t.slice(n, i) }), n = i + e[0].length, i = t.indexOf(e[1], n), 0 > i) { o = t.slice(n - e[1].length), r = u[u.length - 1], (null != r ? r.type : void 0) === this.types.text ? r.value += o : u.push({ type: this.types.text, value: o }); break } l = t.slice(n, i).trim(), u.push({ type: this.types.binding, value: l }), n = i + e[1].length } return u }, t }(), t.View = function () { function e(e, i, n) { var s, o, u, l, h, a, p, d, c, f, b, v, m; for (this.els = e, this.models = i, null == n && (n = {}), this.update = r(this.update, this), this.publish = r(this.publish, this), this.sync = r(this.sync, this), this.unbind = r(this.unbind, this), this.bind = r(this.bind, this), this.select = r(this.select, this), this.traverse = r(this.traverse, this), this.build = r(this.build, this), this.buildBinding = r(this.buildBinding, this), this.bindingRegExp = r(this.bindingRegExp, this), this.options = r(this.options, this), this.els.jquery || this.els instanceof Array || (this.els = [this.els]), c = t.extensions, h = 0, p = c.length; p > h; h++) { if (o = c[h], this[o] = {}, n[o]) { f = n[o]; for (s in f) u = f[s], this[o][s] = u } b = t["public"][o]; for (s in b) u = b[s], null == (l = this[o])[s] && (l[s] = u) } for (v = t.options, a = 0, d = v.length; d > a; a++)o = v[a], this[o] = null != (m = n[o]) ? m : t["public"][o]; this.build() } return e.prototype.options = function () { var e, i, n, r, s; for (i = {}, s = t.extensions.concat(t.options), n = 0, r = s.length; r > n; n++)e = s[n], i[e] = this[e]; return i }, e.prototype.bindingRegExp = function () { return new RegExp("^" + this.prefix + "-") }, e.prototype.buildBinding = function (e, i, n, r) { var s, o, u, l, h, a, p; return h = {}, p = function () { var t, e, i, n; for (i = r.match(/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$$/g), n = [], t = 0, e = i.length; e > t; t++)a = i[t], n.push(a.trim()); return n }(), s = function () { var t, e, i, n; for (i = p.shift().split("<"), n = [], t = 0, e = i.length; e > t; t++)o = i[t], n.push(o.trim()); return n }(), l = s.shift(), h.formatters = p, (u = s.shift()) && (h.dependencies = u.split(/\s+/)), this.bindings.push(new t[e](this, i, n, l, h)) }, e.prototype.build = function () { var e, i, n, r, s; for (this.bindings = [], i = function (e) { return function (n) { var r, s, o, u, l, h, a, p, d, c, f, b, v; if (3 === n.nodeType) { if (l = t.TextTemplateParser, (o = e.templateDelimiters) && (p = l.parse(n.data, o)).length && (1 !== p.length || p[0].type !== l.types.text)) { for (d = 0, f = p.length; f > d; d++)a = p[d], h = document.createTextNode(a.value), n.parentNode.insertBefore(h, n), 1 === a.type && e.buildBinding("TextBinding", h, null, a.value); n.parentNode.removeChild(n) } } else 1 === n.nodeType && (r = e.traverse(n)); if (!r) for (v = function () { var t, e, i, r; for (i = n.childNodes, r = [], t = 0, e = i.length; e > t; t++)u = i[t], r.push(u); return r }(), c = 0, b = v.length; b > c; c++)s = v[c], i(s) } }(this), s = this.els, n = 0, r = s.length; r > n; n++)e = s[n], i(e); this.bindings.sort(function (t, e) { var i, n; return ((null != (i = e.binder) ? i.priority : void 0) || 0) - ((null != (n = t.binder) ? n.priority : void 0) || 0) }) }, e.prototype.traverse = function (e) { var i, n, r, s, o, u, l, h, a, p, d, c, f, b, v, m; for (s = this.bindingRegExp(), o = "SCRIPT" === e.nodeName || "STYLE" === e.nodeName, b = e.attributes, p = 0, c = b.length; c > p; p++)if (i = b[p], s.test(i.name)) { if (h = i.name.replace(s, ""), !(r = this.binders[h])) { v = this.binders; for (u in v) a = v[u], "*" !== u && -1 !== u.indexOf("*") && (l = new RegExp("^" + u.replace(/\*/g, ".+") + "$$"), l.test(h) && (r = a)) } r || (r = this.binders["*"]), r.block && (o = !0, n = [i]) } for (m = n || e.attributes, d = 0, f = m.length; f > d; d++)i = m[d], s.test(i.name) && (h = i.name.replace(s, ""), this.buildBinding("Binding", e, h, i.value)); return o || (h = e.nodeName.toLowerCase(), this.components[h] && !e._bound && (this.bindings.push(new t.ComponentBinding(this, e, h)), o = !0)), o }, e.prototype.select = function (t) { var e, i, n, r, s; for (r = this.bindings, s = [], i = 0, n = r.length; n > i; i++)e = r[i], t(e) && s.push(e); return s }, e.prototype.bind = function () { var t, e, i, n; for (n = this.bindings, e = 0, i = n.length; i > e; e++)t = n[e], t.bind() }, e.prototype.unbind = function () { var t, e, i, n; for (n = this.bindings, e = 0, i = n.length; i > e; e++)t = n[e], t.unbind() }, e.prototype.sync = function () { var t, e, i, n; for (n = this.bindings, e = 0, i = n.length; i > e; e++)t = n[e], "function" == typeof t.sync && t.sync() }, e.prototype.publish = function () { var t, e, i, n; for (n = this.select(function (t) { var e; return null != (e = t.binder) ? e.publishes : void 0 }), e = 0, i = n.length; i > e; e++)t = n[e], t.publish() }, e.prototype.update = function (t) { var e, i, n, r, s, o; null == t && (t = {}); for (i in t) n = t[i], this.models[i] = n; for (o = this.bindings, r = 0, s = o.length; s > r; r++)e = o[r], "function" == typeof e.update && e.update(t) }, e }(), t.Binding = function () { function e(t, e, i, n, s) { this.view = t, this.el = e, this.type = i, this.keypath = n, this.options = null != s ? s : {}, this.getValue = r(this.getValue, this), this.update = r(this.update, this), this.unbind = r(this.unbind, this), this.bind = r(this.bind, this), this.publish = r(this.publish, this), this.sync = r(this.sync, this), this.set = r(this.set, this), this.eventHandler = r(this.eventHandler, this), this.formattedValue = r(this.formattedValue, this), this.parseFormatterArguments = r(this.parseFormatterArguments, this), this.parseTarget = r(this.parseTarget, this), this.observe = r(this.observe, this), this.setBinder = r(this.setBinder, this), this.formatters = this.options.formatters || [], this.dependencies = [], this.formatterObservers = {}, this.model = void 0, this.setBinder() } return e.prototype.setBinder = function () { var t, e, i, n; if (!(this.binder = this.view.binders[this.type])) { n = this.view.binders; for (t in n) i = n[t], "*" !== t && -1 !== t.indexOf("*") && (e = new RegExp("^" + t.replace(/\*/g, ".+") + "$$"), e.test(this.type) && (this.binder = i, this.args = new RegExp("^" + t.replace(/\*/g, "(.+)") + "$$").exec(this.type), this.args.shift())) } return this.binder || (this.binder = this.view.binders["*"]), this.binder instanceof Function ? this.binder = { routine: this.binder } : void 0 }, e.prototype.observe = function (e, i, n) { return t.sightglass(e, i, n, { root: this.view.rootInterface, adapters: this.view.adapters }) }, e.prototype.parseTarget = function () { var e; return e = t.TypeParser.parse(this.keypath), e.type === t.TypeParser.types.primitive ? this.value = e.value : (this.observer = this.observe(this.view.models, this.keypath, this.sync), this.model = this.observer.target) }, e.prototype.parseFormatterArguments = function (e, i) { var n, r, s, o, u, l, h; for (e = function () { var i, n, s; for (s = [], i = 0, n = e.length; n > i; i++)r = e[i], s.push(t.TypeParser.parse(r)); return s }(), o = [], n = l = 0, h = e.length; h > l; n = ++l)r = e[n], o.push(r.type === t.TypeParser.types.primitive ? r.value : ((u = this.formatterObservers)[i] || (u[i] = {}), (s = this.formatterObservers[i][n]) ? void 0 : (s = this.observe(this.view.models, r.value, this.sync), this.formatterObservers[i][n] = s), s.value())); return o }, e.prototype.formattedValue = function (t) { var e, i, n, r, o, u, l, h, a; for (h = this.formatters, i = u = 0, l = h.length; l > u; i = ++u)n = h[i], e = n.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g), r = e.shift(), n = this.view.formatters[r], o = this.parseFormatterArguments(e, i), (null != n ? n.read : void 0) instanceof Function ? t = (a = n.read).call.apply(a, [this.model, t].concat(s.call(o))) : n instanceof Function && (t = n.call.apply(n, [this.model, t].concat(s.call(o)))); return t }, e.prototype.eventHandler = function (t) { var e, i; return i = (e = this).view.handler, function (n) { return i.call(t, this, n, e) } }, e.prototype.set = function (e) { var i; return e = e instanceof Function && !this.binder["function"] && t["public"].executeFunctions ? this.formattedValue(e.call(this.model)) : this.formattedValue(e), null != (i = this.binder.routine) ? i.call(this, this.el, e) : void 0 }, e.prototype.sync = function () { var t, e; return this.set(function () { var i, n, r, s, o, u, l; if (this.observer) { if (this.model !== this.observer.target) { for (o = this.dependencies, i = 0, r = o.length; r > i; i++)e = o[i], e.unobserve(); if (this.dependencies = [], null != (this.model = this.observer.target) && (null != (u = this.options.dependencies) ? u.length : void 0)) for (l = this.options.dependencies, n = 0, s = l.length; s > n; n++)t = l[n], e = this.observe(this.model, t, this.sync), this.dependencies.push(e) } return this.observer.value() } return this.value }.call(this)) }, e.prototype.publish = function () { var t, e, i, n, r, o, u, l, h, a, p, d, c; if (this.observer) { for (l = this.getValue(this.el), o = this.formatters.length - 1, p = this.formatters.slice(0).reverse(), i = h = 0, a = p.length; a > h; i = ++h)n = p[i], e = o - i, t = n.split(/\s+/), r = t.shift(), u = this.parseFormatterArguments(t, e), (null != (d = this.view.formatters[r]) ? d.publish : void 0) && (l = (c = this.view.formatters[r]).publish.apply(c, [l].concat(s.call(u)))); return this.observer.setValue(l) } }, e.prototype.bind = function () { var t, e, i, n, r, s, o; if (this.parseTarget(), null != (r = this.binder.bind) && r.call(this, this.el), null != this.model && (null != (s = this.options.dependencies) ? s.length : void 0)) for (o = this.options.dependencies, i = 0, n = o.length; n > i; i++)t = o[i], e = this.observe(this.model, t, this.sync), this.dependencies.push(e); return this.view.preloadData ? this.sync() : void 0 }, e.prototype.unbind = function () { var t, e, i, n, r, s, o, u, l, h; for (null != (o = this.binder.unbind) && o.call(this, this.el), null != (u = this.observer) && u.unobserve(), l = this.dependencies, r = 0, s = l.length; s > r; r++)n = l[r], n.unobserve(); this.dependencies = [], h = this.formatterObservers; for (i in h) { e = h[i]; for (t in e) n = e[t], n.unobserve() } return this.formatterObservers = {} }, e.prototype.update = function (t) { var e, i; return null == t && (t = {}), this.model = null != (e = this.observer) ? e.target : void 0, null != (i = this.binder.update) ? i.call(this, t) : void 0 }, e.prototype.getValue = function (e) { return this.binder && null != this.binder.getValue ? this.binder.getValue.call(this, e) : t.Util.getInputValue(e) }, e }(), t.ComponentBinding = function (e) { function i(e, i, n) { var s, o, u, h, a, p, d, c; for (this.view = e, this.el = i, this.type = n, this.unbind = r(this.unbind, this), this.bind = r(this.bind, this), this.locals = r(this.locals, this), this.component = this.view.components[this.type], this["static"] = {}, this.observers = {}, this.upstreamObservers = {}, o = e.bindingRegExp(), d = this.el.attributes || [], a = 0, p = d.length; p > a; a++)s = d[a], o.test(s.name) || (u = this.camelCase(s.name), h = t.TypeParser.parse(s.value), l.call(null != (c = this.component["static"]) ? c : [], u) >= 0 ? this["static"][u] = s.value : h.type === t.TypeParser.types.primitive ? this["static"][u] = h.value : this.observers[u] = s.value) } return u(i, e), i.prototype.sync = function () { }, i.prototype.update = function () { }, i.prototype.publish = function () { }, i.prototype.locals = function () { var t, e, i, n, r, s; i = {}, r = this["static"]; for (t in r) n = r[t], i[t] = n; s = this.observers; for (t in s) e = s[t], i[t] = e.value(); return i }, i.prototype.camelCase = function (t) { return t.replace(/-([a-z])/g, function (t) { return t[1].toUpperCase() }) }, i.prototype.bind = function () { var e, i, n, r, s, o, u, l, h, a, p, d, c, f, b, v, m, y, g, w; if (!this.bound) { f = this.observers; for (i in f) n = f[i], this.observers[i] = this.observe(this.view.models, n, function (t) { return function (e) { return function () { return t.componentView.models[e] = t.observers[e].value() } } }(this).call(this, i)); this.bound = !0 } if (null != this.componentView) this.componentView.bind(); else { for (this.el.innerHTML = this.component.template.call(this), u = this.component.initialize.call(this, this.el, this.locals()), this.el._bound = !0, o = {}, b = t.extensions, a = 0, d = b.length; d > a; a++) { if (s = b[a], o[s] = {}, this.component[s]) { v = this.component[s]; for (e in v) l = v[e], o[s][e] = l } m = this.view[s]; for (e in m) l = m[e], null == (h = o[s])[e] && (h[e] = l) } for (y = t.options, p = 0, c = y.length; c > p; p++)s = y[p], o[s] = null != (g = this.component[s]) ? g : this.view[s]; this.componentView = new t.View(Array.prototype.slice.call(this.el.childNodes), u, o), this.componentView.bind(), w = this.observers; for (i in w) r = w[i], this.upstreamObservers[i] = this.observe(this.componentView.models, i, function (t) { return function (e, i) { return function () { return i.setValue(t.componentView.models[e]) } } }(this).call(this, i, r)) } }, i.prototype.unbind = function () { var t, e, i, n, r; i = this.upstreamObservers; for (t in i) e = i[t], e.unobserve(); n = this.observers; for (t in n) e = n[t], e.unobserve(); return null != (r = this.componentView) ? r.unbind.call(this) : void 0 }, i }(t.Binding), t.TextBinding = function (t) { function e(t, e, i, n, s) { this.view = t, this.el = e, this.type = i, this.keypath = n, this.options = null != s ? s : {}, this.sync = r(this.sync, this), this.formatters = this.options.formatters || [], this.dependencies = [], this.formatterObservers = {} } return u(e, t), e.prototype.binder = { routine: function (t, e) { return t.data = null != e ? e : "" } }, e.prototype.sync = function () { return e.__super__.sync.apply(this, arguments) }, e }(t.Binding), t["public"].binders.text = function (t, e) { return null != t.textContent ? t.textContent = null != e ? e : "" : t.innerText = null != e ? e : "" }, t["public"].binders.html = function (t, e) { return t.innerHTML = null != e ? e : "" }, t["public"].binders.show = function (t, e) { return t.style.display = e ? "" : "none" }, t["public"].binders.hide = function (t, e) { return t.style.display = e ? "none" : "" }, t["public"].binders.enabled = function (t, e) { return t.disabled = !e }, t["public"].binders.disabled = function (t, e) { return t.disabled = !!e }, t["public"].binders.checked = { publishes: !0, priority: 2e3, bind: function (e) { return t.Util.bindEvent(e, "change", this.publish) }, unbind: function (e) { return t.Util.unbindEvent(e, "change", this.publish) }, routine: function (t, e) { var i; return t.checked = "radio" === t.type ? (null != (i = t.value) ? i.toString() : void 0) === (null != e ? e.toString() : void 0) : !!e } }, t["public"].binders.unchecked = { publishes: !0, priority: 2e3, bind: function (e) { return t.Util.bindEvent(e, "change", this.publish) }, unbind: function (e) { return t.Util.unbindEvent(e, "change", this.publish) }, routine: function (t, e) { var i; return t.checked = "radio" === t.type ? (null != (i = t.value) ? i.toString() : void 0) !== (null != e ? e.toString() : void 0) : !e } }, t["public"].binders.value = { publishes: !0, priority: 3e3, bind: function (e) { return "INPUT" !== e.tagName || "radio" !== e.type ? (this.event = "SELECT" === e.tagName ? "change" : "input", t.Util.bindEvent(e, this.event, this.publish)) : void 0 }, unbind: function (e) { return "INPUT" !== e.tagName || "radio" !== e.type ? t.Util.unbindEvent(e, this.event, this.publish) : void 0 }, routine: function (t, e) { var i, n, r, s, o, u, h; if ("INPUT" === t.tagName && "radio" === t.type) return t.setAttribute("value", e); if (null != window.jQuery) { if (t = jQuery(t), (null != e ? e.toString() : void 0) !== (null != (s = t.val()) ? s.toString() : void 0)) return t.val(null != e ? e : "") } else if ("select-multiple" === t.type) { if (null != e) { for (h = [], n = 0, r = t.length; r > n; n++)i = t[n], h.push(i.selected = (o = i.value, l.call(e, o) >= 0)); return h } } else if ((null != e ? e.toString() : void 0) !== (null != (u = t.value) ? u.toString() : void 0)) return t.value = null != e ? e : "" } }, t["public"].binders["if"] = { block: !0, priority: 4e3, bind: function (t) { var e, i; return null == this.marker ? (e = [this.view.prefix, this.type].join("-").replace("--", "-"), i = t.getAttribute(e), this.marker = document.createComment(" rivets: " + this.type + " " + i + " "), this.bound = !1, t.removeAttribute(e), t.parentNode.insertBefore(this.marker, t), t.parentNode.removeChild(t)) : void 0 }, unbind: function () { return this.nested ? (this.nested.unbind(), this.bound = !1) : void 0 }, routine: function (e, i) { var n, r, s, o; if (!!i == !this.bound) { if (i) { s = {}, o = this.view.models; for (n in o) r = o[n], s[n] = r; return (this.nested || (this.nested = new t.View(e, s, this.view.options()))).bind(), this.marker.parentNode.insertBefore(e, this.marker.nextSibling), this.bound = !0 } return e.parentNode.removeChild(e), this.nested.unbind(), this.bound = !1 } }, update: function (t) { var e; return null != (e = this.nested) ? e.update(t) : void 0 } }, t["public"].binders.unless = { block: !0, priority: 4e3, bind: function (e) { return t["public"].binders["if"].bind.call(this, e) }, unbind: function () { return t["public"].binders["if"].unbind.call(this) }, routine: function (e, i) { return t["public"].binders["if"].routine.call(this, e, !i) }, update: function (e) { return t["public"].binders["if"].update.call(this, e) } }, t["public"].binders["on-*"] = { "function": !0, priority: 1e3, unbind: function (e) { return this.handler ? t.Util.unbindEvent(e, this.args[0], this.handler) : void 0 }, routine: function (e, i) { return this.handler && t.Util.unbindEvent(e, this.args[0], this.handler), t.Util.bindEvent(e, this.args[0], this.handler = this.eventHandler(i)) } }, t["public"].binders["each-*"] = { block: !0, priority: 4e3, bind: function (t) { var e, i, n, r, s; if (null == this.marker) e = [this.view.prefix, this.type].join("-").replace("--", "-"), this.marker = document.createComment(" rivets: " + this.type + " "), this.iterated = [], t.removeAttribute(e), t.parentNode.insertBefore(this.marker, t), t.parentNode.removeChild(t); else for (s = this.iterated, n = 0, r = s.length; r > n; n++)i = s[n], i.bind() }, unbind: function () { var t, e, i, n; if (null != this.iterated) for (n = this.iterated, e = 0, i = n.length; i > e; e++)t = n[e], t.unbind() }, routine: function (e, i) { var n, r, s, o, u, l, h, a, p, d, c, f, b, v, m, y, g, w, k, x; if (h = this.args[0], i = i || [], this.iterated.length > i.length) for (w = Array(this.iterated.length - i.length), f = 0, m = w.length; m > f; f++)s = w[f], c = this.iterated.pop(), c.unbind(), this.marker.parentNode.removeChild(c.els[0]); for (o = b = 0, y = i.length; y > b; o = ++b)if (l = i[o], r = { index: o }, r[t["public"].iterationAlias(h)] = o, r[h] = l, null == this.iterated[o]) { k = this.view.models; for (u in k) l = k[u], null == r[u] && (r[u] = l); p = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker, a = this.view.options(), a.preloadData = !0, d = e.cloneNode(!0), c = new t.View(d, r, a), c.bind(), this.iterated.push(c), this.marker.parentNode.insertBefore(d, p.nextSibling) } else this.iterated[o].models[h] !== l && this.iterated[o].update(r); if ("OPTION" === e.nodeName) for (x = this.view.bindings, v = 0, g = x.length; g > v; v++)n = x[v], n.el === this.marker.parentNode && "value" === n.type && n.sync() }, update: function (t) { var e, i, n, r, s, o, u; e = {}; for (i in t) n = t[i], i !== this.args[0] && (e[i] = n); for (u = this.iterated, s = 0, o = u.length; o > s; s++)r = u[s], r.update(e) } }, t["public"].binders["class-*"] = function (t, e) { var i; return i = " " + t.className + " ", !e == (-1 !== i.indexOf(" " + this.args[0] + " ")) ? t.className = e ? "" + t.className + " " + this.args[0] : i.replace(" " + this.args[0] + " ", " ").trim() : void 0 }, t["public"].binders["*"] = function (t, e) { return null != e ? t.setAttribute(this.type, e) : t.removeAttribute(this.type) }, t["public"].formatters.call = function () { var t, e; return e = arguments[0], t = 2 <= arguments.length ? s.call(arguments, 1) : [], e.call.apply(e, [this].concat(s.call(t))) }, t["public"].adapters["."] = { id: "_rv", counter: 0, weakmap: {}, weakReference: function (t) { var e, i, n; return t.hasOwnProperty(this.id) || (e = this.counter++, Object.defineProperty(t, this.id, { value: e })), (i = this.weakmap)[n = t[this.id]] || (i[n] = { callbacks: {} }) }, cleanupWeakReference: function (t, e) { return Object.keys(t.callbacks).length || t.pointers && Object.keys(t.pointers).length ? void 0 : delete this.weakmap[e] }, stubFunction: function (t, e) { var i, n, r; return n = t[e], i = this.weakReference(t), r = this.weakmap, t[e] = function () { var e, s, o, u, l, h, a, p, d, c; u = n.apply(t, arguments), a = i.pointers; for (o in a) for (s = a[o], c = null != (p = null != (d = r[o]) ? d.callbacks[s] : void 0) ? p : [], l = 0, h = c.length; h > l; l++)e = c[l], e(); return u } }, observeMutations: function (t, e, i) { var n, r, s, o, u, h; if (Array.isArray(t)) { if (s = this.weakReference(t), null == s.pointers) for (s.pointers = {}, r = ["push", "pop", "shift", "unshift", "sort", "reverse", "splice"], u = 0, h = r.length; h > u; u++)n = r[u], this.stubFunction(t, n); if (null == (o = s.pointers)[e] && (o[e] = []), l.call(s.pointers[e], i) < 0) return s.pointers[e].push(i) } }, unobserveMutations: function (t, e, i) { var n, r, s; return Array.isArray(t) && null != t[this.id] && (r = this.weakmap[t[this.id]]) && (s = r.pointers[e]) ? ((n = s.indexOf(i)) >= 0 && s.splice(n, 1), s.length || delete r.pointers[e], this.cleanupWeakReference(r, t[this.id])) : void 0 }, observe: function (t, e, i) { var n, r, s; return n = this.weakReference(t).callbacks, null == n[e] && (n[e] = [], r = Object.getOwnPropertyDescriptor(t, e), (null != r ? r.get : void 0) || (null != r ? r.set : void 0) || (s = t[e], Object.defineProperty(t, e, { enumerable: !0, get: function () { return s }, set: function (i) { return function (r) { var o, u, h, a, p; if (r !== s && (i.unobserveMutations(s, t[i.id], e), s = r, u = i.weakmap[t[i.id]])) { if (n = u.callbacks, n[e]) for (p = n[e].slice(), h = 0, a = p.length; a > h; h++)o = p[h], l.call(n[e], o) >= 0 && o(); return i.observeMutations(r, t[i.id], e) } } }(this) }))), l.call(n[e], i) < 0 && n[e].push(i), this.observeMutations(t[e], t[this.id], e) }, unobserve: function (t, e, i) { var n, r, s; return (s = this.weakmap[t[this.id]]) && (n = s.callbacks[e]) ? ((r = n.indexOf(i)) >= 0 && (n.splice(r, 1), n.length || (delete s.callbacks[e], this.unobserveMutations(t[e], t[this.id], e))), this.cleanupWeakReference(s, t[this.id])) : void 0 }, get: function (t, e) { return t[e] }, set: function (t, e, i) { return t[e] = i } }, t.factory = function (e) { return t.sightglass = e, t["public"]._ = t, t["public"] }, "object" == typeof ("undefined" != typeof module && null !== module ? module.exports : void 0) ? module.exports = t.factory(require("sightglass")) : "function" == typeof define && define.amd ? define(["sightglass"], function (e) { return this.rivets = t.factory(e) }) : this.rivets = t.factory(sightglass) }).call(this);
/**
 * Modified Plugin v.2.9.1 by UDG
 *
 * - on line 2617 in 'render'-function:
 *   -> added 'startAutoplay();' after stopAutoplay call -- This is necessary to prevent that autoplay stops if a user clicks on one of the navigation buttons
 *
 * - on line 2817/2818 in 'setAutoplayTimer'-function:
 *   -> added 'clearInterval(autoplayTimer);' -- always clears the still existing interval before a new one is created
 *   -> added 'autoplayTimer = null;' -- unset variable and reset interval completely
 *
 * - on line 2828 in 'stopAutoplayTimer'-function:
 *   -> added 'autoplayTimer = null;' -- to reset the defined interval correctly, otherwise there is an issue with the timing of the interval (like random interval)
 */

var tns = (function () {
    // Object.keys
    if (!Object.keys) {
        Object.keys = function (object) {
            var keys = [];
            for (var name in object) {
                if (Object.prototype.hasOwnProperty.call(object, name)) {
                    keys.push(name);
                }
            }
            return keys;
        };
    }

    // ChildNode.remove
    if (!("remove" in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    var win = window;

    var raf = win.requestAnimationFrame
        || win.webkitRequestAnimationFrame
        || win.mozRequestAnimationFrame
        || win.msRequestAnimationFrame
        || function (cb) { return setTimeout(cb, 16); };

    var win$$1 = window;

    var caf = win$$1.cancelAnimationFrame
        || win$$1.mozCancelAnimationFrame
        || function (id) { clearTimeout(id); };

    function extend() {
        var obj, name, copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;

        for (; i < length; i++) {
            if ((obj = arguments[i]) !== null) {
                for (name in obj) {
                    copy = obj[name];

                    if (target === copy) {
                        continue;
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }

    function checkStorageValue(value) {
        return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
    }

    function setLocalStorage(storage, key, value, access) {
        if (access) {
            try { storage.setItem(key, value); } catch (e) { }
        }
        return value;
    }

    function getSlideId() {
        var id = window.tnsId;
        window.tnsId = !id ? 1 : id + 1;

        return 'tns' + window.tnsId;
    }

    function getBody() {
        var doc = document,
            body = doc.body;

        if (!body) {
            body = doc.createElement('body');
            body.fake = true;
        }

        return body;
    }

    var docElement = document.documentElement;

    function setFakeBody(body) {
        var docOverflow = '';
        if (body.fake) {
            docOverflow = docElement.style.overflow;
            //avoid crashing IE8, if background image is used
            body.style.background = '';
            //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
            body.style.overflow = docElement.style.overflow = 'hidden';
            docElement.appendChild(body);
        }

        return docOverflow;
    }

    function resetFakeBody(body, docOverflow) {
        if (body.fake) {
            body.remove();
            docElement.style.overflow = docOverflow;
            // Trigger layout so kinetic scrolling isn't disabled in iOS6+
            // eslint-disable-next-line
            docElement.offsetHeight;
        }
    }

    // get css-calc

    function calc() {
        var doc = document,
            body = getBody(),
            docOverflow = setFakeBody(body),
            div = doc.createElement('div'),
            result = false;

        body.appendChild(div);
        try {
            var str = '(10px * 10)',
                vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
                val;
            for (var i = 0; i < 3; i++) {
                val = vals[i];
                div.style.width = val;
                if (div.offsetWidth === 100) {
                    result = val.replace(str, '');
                    break;
                }
            }
        } catch (e) { }

        body.fake ? resetFakeBody(body, docOverflow) : div.remove();

        return result;
    }

    // get subpixel support value

    function percentageLayout() {
        // check subpixel layout supporting
        var doc = document,
            body = getBody(),
            docOverflow = setFakeBody(body),
            wrapper = doc.createElement('div'),
            outer = doc.createElement('div'),
            str = '',
            count = 70,
            perPage = 3,
            supported = false;

        wrapper.className = "tns-t-subp2";
        outer.className = "tns-t-ct";

        for (var i = 0; i < count; i++) {
            str += '<div></div>';
        }

        outer.innerHTML = str;
        wrapper.appendChild(outer);
        body.appendChild(wrapper);

        supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;

        body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();

        return supported;
    }

    function mediaquerySupport() {
        var doc = document,
            body = getBody(),
            docOverflow = setFakeBody(body),
            div = doc.createElement('div'),
            style = doc.createElement('style'),
            rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
            position;

        style.type = 'text/css';
        div.className = 'tns-mq-test';

        body.appendChild(style);
        body.appendChild(div);

        if (style.styleSheet) {
            style.styleSheet.cssText = rule;
        } else {
            style.appendChild(doc.createTextNode(rule));
        }

        position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];

        body.fake ? resetFakeBody(body, docOverflow) : div.remove();

        return position === "absolute";
    }

    // create and append style sheet
    function createStyleSheet(media) {
        // Create the <style> tag
        var style = document.createElement("style");
        // style.setAttribute("type", "text/css");

        // Add a media (and/or media query) here if you'd like!
        // style.setAttribute("media", "screen")
        // style.setAttribute("media", "only screen and (max-width : 1024px)")
        if (media) { style.setAttribute("media", media); }

        // WebKit hack :(
        // style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.querySelector('head').appendChild(style);

        return style.sheet ? style.sheet : style.styleSheet;
    }

    // cross browsers addRule method
    function addCSSRule(sheet, selector, rules, index) {
        // return raf(function() {
        'insertRule' in sheet ?
            sheet.insertRule(selector + '{' + rules + '}', index) :
            sheet.addRule(selector, rules, index);
        // });
    }

    // cross browsers addRule method
    function removeCSSRule(sheet, index) {
        // return raf(function() {
        'deleteRule' in sheet ?
            sheet.deleteRule(index) :
            sheet.removeRule(index);
        // });
    }

    function getCssRulesLength(sheet) {
        var rule = ('insertRule' in sheet) ? sheet.cssRules : sheet.rules;
        return rule.length;
    }

    function toDegree(y, x) {
        return Math.atan2(y, x) * (180 / Math.PI);
    }

    function getTouchDirection(angle, range) {
        var direction = false,
            gap = Math.abs(90 - Math.abs(angle));

        if (gap >= 90 - range) {
            direction = 'horizontal';
        } else if (gap <= range) {
            direction = 'vertical';
        }

        return direction;
    }

    // https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
    function forEach(arr, callback, scope) {
        for (var i = 0, l = arr.length; i < l; i++) {
            callback.call(scope, arr[i], i);
        }
    }

    var classListSupport = 'classList' in document.createElement('_');

    var hasClass = classListSupport ?
        function (el, str) { return el.classList.contains(str); } :
        function (el, str) { return el.className.indexOf(str) >= 0; };

    var addClass = classListSupport ?
        function (el, str) {
            if (!hasClass(el, str)) { el.classList.add(str); }
        } :
        function (el, str) {
            if (!hasClass(el, str)) { el.className += ' ' + str; }
        };

    var removeClass = classListSupport ?
        function (el, str) {
            if (hasClass(el, str)) { el.classList.remove(str); }
        } :
        function (el, str) {
            if (hasClass(el, str)) { el.className = el.className.replace(str, ''); }
        };

    function hasAttr(el, attr) {
        return el.hasAttribute(attr);
    }

    function getAttr(el, attr) {
        return el.getAttribute(attr);
    }

    function isNodeList(el) {
        // Only NodeList has the "item()" function
        return typeof el.item !== "undefined";
    }

    function setAttrs(els, attrs) {
        els = (isNodeList(els) || els instanceof Array) ? els : [els];
        if (Object.prototype.toString.call(attrs) !== '[object Object]') { return; }

        for (var i = els.length; i--;) {
            for (var key in attrs) {
                els[i].setAttribute(key, attrs[key]);
            }
        }
    }

    function removeAttrs(els, attrs) {
        els = (isNodeList(els) || els instanceof Array) ? els : [els];
        attrs = (attrs instanceof Array) ? attrs : [attrs];

        var attrLength = attrs.length;
        for (var i = els.length; i--;) {
            for (var j = attrLength; j--;) {
                els[i].removeAttribute(attrs[j]);
            }
        }
    }

    function arrayFromNodeList(nl) {
        var arr = [];
        for (var i = 0, l = nl.length; i < l; i++) {
            arr.push(nl[i]);
        }
        return arr;
    }

    function hideElement(el, forceHide) {
        if (el.style.display !== 'none') { el.style.display = 'none'; }
    }

    function showElement(el, forceHide) {
        if (el.style.display === 'none') { el.style.display = ''; }
    }

    function isVisible(el) {
        return window.getComputedStyle(el).display !== 'none';
    }

    function whichProperty(props) {
        if (typeof props === 'string') {
            var arr = [props],
                Props = props.charAt(0).toUpperCase() + props.substr(1),
                prefixes = ['Webkit', 'Moz', 'ms', 'O'];

            prefixes.forEach(function (prefix) {
                if (prefix !== 'ms' || props === 'transform') {
                    arr.push(prefix + Props);
                }
            });

            props = arr;
        }

        var el = document.createElement('fakeelement'),
            len = props.length;
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (el.style[prop] !== undefined) { return prop; }
        }

        return false; // explicit for ie9-
    }

    function has3DTransforms(tf) {
        if (!tf) { return false; }
        if (!window.getComputedStyle) { return false; }

        var doc = document,
            body = getBody(),
            docOverflow = setFakeBody(body),
            el = doc.createElement('p'),
            has3d,
            cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';

        cssTF += 'transform';

        // Add it to the body to get the computed style
        body.insertBefore(el, null);

        el.style[tf] = 'translate3d(1px,1px,1px)';
        has3d = window.getComputedStyle(el).getPropertyValue(cssTF);

        body.fake ? resetFakeBody(body, docOverflow) : el.remove();

        return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }

    // get transitionend, animationend based on transitionDuration
    // @propin: string
    // @propOut: string, first-letter uppercase
    // Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
    function getEndProperty(propIn, propOut) {
        var endProp = false;
        if (/^Webkit/.test(propIn)) {
            endProp = 'webkit' + propOut + 'End';
        } else if (/^O/.test(propIn)) {
            endProp = 'o' + propOut + 'End';
        } else if (propIn) {
            endProp = propOut.toLowerCase() + 'end';
        }
        return endProp;
    }

    // Test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener("test", null, opts);
    } catch (e) { }
    var passiveOption = supportsPassive ? { passive: true } : false;

    function addEvents(el, obj, preventScrolling) {
        for (var prop in obj) {
            var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
            el.addEventListener(prop, obj[prop], option);
        }
    }

    function removeEvents(el, obj) {
        for (var prop in obj) {
            var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? passiveOption : false;
            el.removeEventListener(prop, obj[prop], option);
        }
    }

    function Events() {
        return {
            topics: {},
            on: function (eventName, fn) {
                this.topics[eventName] = this.topics[eventName] || [];
                this.topics[eventName].push(fn);
            },
            off: function (eventName, fn) {
                if (this.topics[eventName]) {
                    for (var i = 0; i < this.topics[eventName].length; i++) {
                        if (this.topics[eventName][i] === fn) {
                            this.topics[eventName].splice(i, 1);
                            break;
                        }
                    }
                }
            },
            emit: function (eventName, data) {
                data.type = eventName;
                if (this.topics[eventName]) {
                    this.topics[eventName].forEach(function (fn) {
                        fn(data, eventName);
                    });
                }
            }
        };
    }

    function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
        var tick = Math.min(duration, 10),
            unit = (to.indexOf('%') >= 0) ? '%' : 'px',
            to = to.replace(unit, ''),
            from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
            positionTick = (to - from) / duration * tick,
            running;

        setTimeout(moveElement, tick);
        function moveElement() {
            duration -= tick;
            from += positionTick;
            element.style[attr] = prefix + from + unit + postfix;
            if (duration > 0) {
                setTimeout(moveElement, tick);
            } else {
                callback();
            }
        }
    }

    var tns = function (options) {
        options = extend({
            container: '.slider',
            mode: 'carousel',
            axis: 'horizontal',
            items: 1,
            gutter: 0,
            edgePadding: 0,
            fixedWidth: false,
            autoWidth: false,
            viewportMax: false,
            slideBy: 1,
            center: false,
            controls: true,
            controlsPosition: 'top',
            controlsText: ['prev', 'next'],
            controlsContainer: false,
            prevButton: false,
            nextButton: false,
            nav: true,
            navPosition: 'top',
            navContainer: false,
            navAsThumbnails: false,
            arrowKeys: false,
            speed: 300,
            autoplay: false,
            autoplayPosition: 'top',
            autoplayTimeout: 5000,
            autoplayDirection: 'forward',
            autoplayText: ['start', 'stop'],
            autoplayHoverPause: false,
            autoplayButton: false,
            autoplayButtonOutput: true,
            autoplayResetOnVisibility: true,
            animateIn: 'tns-fadeIn',
            animateOut: 'tns-fadeOut',
            animateNormal: 'tns-normal',
            animateDelay: false,
            loop: true,
            rewind: false,
            autoHeight: false,
            responsive: false,
            lazyload: false,
            lazyloadSelector: '.tns-lazy-img',
            touch: true,
            mouseDrag: false,
            swipeAngle: 15,
            nested: false,
            preventActionWhenRunning: false,
            preventScrollOnTouch: false,
            freezable: true,
            onInit: false,
            useLocalStorage: true
        }, options || {});

        var doc = document,
            win = window,
            KEYS = {
                ENTER: 13,
                SPACE: 32,
                LEFT: 37,
                RIGHT: 39
            },
            tnsStorage = {},
            localStorageAccess = options.useLocalStorage;

        if (localStorageAccess) {
            // check browser version and local storage access
            var browserInfo = navigator.userAgent;
            var uid = new Date;

            try {
                tnsStorage = win.localStorage;
                if (tnsStorage) {
                    tnsStorage.setItem(uid, uid);
                    localStorageAccess = tnsStorage.getItem(uid) == uid;
                    tnsStorage.removeItem(uid);
                } else {
                    localStorageAccess = false;
                }
                if (!localStorageAccess) { tnsStorage = {}; }
            } catch (e) {
                localStorageAccess = false;
            }

            if (localStorageAccess) {
                // remove storage when browser version changes
                if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
                    ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function (item) { tnsStorage.removeItem(item); });
                }
                // update browserInfo
                localStorage['tnsApp'] = browserInfo;
            }
        }

        var CALC = tnsStorage['tC'] ? checkStorageValue(tnsStorage['tC']) : setLocalStorage(tnsStorage, 'tC', calc(), localStorageAccess),
            PERCENTAGELAYOUT = tnsStorage['tPL'] ? checkStorageValue(tnsStorage['tPL']) : setLocalStorage(tnsStorage, 'tPL', percentageLayout(), localStorageAccess),
            CSSMQ = tnsStorage['tMQ'] ? checkStorageValue(tnsStorage['tMQ']) : setLocalStorage(tnsStorage, 'tMQ', mediaquerySupport(), localStorageAccess),
            TRANSFORM = tnsStorage['tTf'] ? checkStorageValue(tnsStorage['tTf']) : setLocalStorage(tnsStorage, 'tTf', whichProperty('transform'), localStorageAccess),
            HAS3DTRANSFORMS = tnsStorage['t3D'] ? checkStorageValue(tnsStorage['t3D']) : setLocalStorage(tnsStorage, 't3D', has3DTransforms(TRANSFORM), localStorageAccess),
            TRANSITIONDURATION = tnsStorage['tTDu'] ? checkStorageValue(tnsStorage['tTDu']) : setLocalStorage(tnsStorage, 'tTDu', whichProperty('transitionDuration'), localStorageAccess),
            TRANSITIONDELAY = tnsStorage['tTDe'] ? checkStorageValue(tnsStorage['tTDe']) : setLocalStorage(tnsStorage, 'tTDe', whichProperty('transitionDelay'), localStorageAccess),
            ANIMATIONDURATION = tnsStorage['tADu'] ? checkStorageValue(tnsStorage['tADu']) : setLocalStorage(tnsStorage, 'tADu', whichProperty('animationDuration'), localStorageAccess),
            ANIMATIONDELAY = tnsStorage['tADe'] ? checkStorageValue(tnsStorage['tADe']) : setLocalStorage(tnsStorage, 'tADe', whichProperty('animationDelay'), localStorageAccess),
            TRANSITIONEND = tnsStorage['tTE'] ? checkStorageValue(tnsStorage['tTE']) : setLocalStorage(tnsStorage, 'tTE', getEndProperty(TRANSITIONDURATION, 'Transition'), localStorageAccess),
            ANIMATIONEND = tnsStorage['tAE'] ? checkStorageValue(tnsStorage['tAE']) : setLocalStorage(tnsStorage, 'tAE', getEndProperty(ANIMATIONDURATION, 'Animation'), localStorageAccess);

        // get element nodes from selectors
        var supportConsoleWarn = win.console && typeof win.console.warn === "function",
            tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
            optionsElements = {};

        tnsList.forEach(function (item) {
            if (typeof options[item] === 'string') {
                var str = options[item],
                    el = doc.querySelector(str);
                optionsElements[item] = str;

                if (el && el.nodeName) {
                    options[item] = el;
                } else {
                    if (supportConsoleWarn) { console.warn('Can\'t find', options[item]); }
                    return;
                }
            }
        });

        // make sure at least 1 slide
        if (options.container.children.length < 1) {
            if (supportConsoleWarn) { console.warn('No slides found in', options.container); }
            return;
        }

        // update options
        var responsive = options.responsive,
            nested = options.nested,
            carousel = options.mode === 'carousel' ? true : false;

        if (responsive) {
            // apply responsive[0] to options and remove it
            if (0 in responsive) {
                options = extend(options, responsive[0]);
                delete responsive[0];
            }

            var responsiveTem = {};
            for (var key in responsive) {
                var val = responsive[key];
                // update responsive
                // from: 300: 2
                // to:
                //   300: {
                //     items: 2
                //   }
                val = typeof val === 'number' ? { items: val } : val;
                responsiveTem[key] = val;
            }
            responsive = responsiveTem;
            responsiveTem = null;
        }

        // update options
        function updateOptions(obj) {
            for (var key in obj) {
                if (!carousel) {
                    if (key === 'slideBy') { obj[key] = 'page'; }
                    if (key === 'edgePadding') { obj[key] = false; }
                    if (key === 'autoHeight') { obj[key] = false; }
                }

                // update responsive options
                if (key === 'responsive') { updateOptions(obj[key]); }
            }
        }
        if (!carousel) { updateOptions(options); }


        // === define and set variables ===
        if (!carousel) {
            options.axis = 'horizontal';
            options.slideBy = 'page';
            options.edgePadding = false;

            var animateIn = options.animateIn,
                animateOut = options.animateOut,
                animateDelay = options.animateDelay,
                animateNormal = options.animateNormal;
        }

        var horizontal = options.axis === 'horizontal' ? true : false,
            outerWrapper = doc.createElement('div'),
            innerWrapper = doc.createElement('div'),
            middleWrapper,
            container = options.container,
            containerParent = container.parentNode,
            containerHTML = container.outerHTML,
            slideItems = container.children,
            slideCount = slideItems.length,
            breakpointZone,
            windowWidth = getWindowWidth(),
            isOn = false;
        if (responsive) { setBreakpointZone(); }
        if (carousel) { container.className += ' tns-vpfix'; }

        // fixedWidth: viewport > rightBoundary > indexMax
        var autoWidth = options.autoWidth,
            fixedWidth = getOption('fixedWidth'),
            edgePadding = getOption('edgePadding'),
            gutter = getOption('gutter'),
            viewport = getViewportWidth(),
            center = getOption('center'),
            items = !autoWidth ? Math.floor(getOption('items')) : 1,
            slideBy = getOption('slideBy'),
            viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
            arrowKeys = getOption('arrowKeys'),
            speed = getOption('speed'),
            rewind = options.rewind,
            loop = rewind ? false : options.loop,
            autoHeight = getOption('autoHeight'),
            controls = getOption('controls'),
            controlsText = getOption('controlsText'),
            nav = getOption('nav'),
            touch = getOption('touch'),
            mouseDrag = getOption('mouseDrag'),
            autoplay = getOption('autoplay'),
            autoplayTimeout = getOption('autoplayTimeout'),
            autoplayText = getOption('autoplayText'),
            autoplayHoverPause = getOption('autoplayHoverPause'),
            autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
            sheet = createStyleSheet(),
            lazyload = options.lazyload,
            lazyloadSelector = options.lazyloadSelector,
            slidePositions, // collection of slide positions
            slideItemsOut = [],
            cloneCount = loop ? getCloneCountForLoop() : 0,
            slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
            hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
            rightBoundary = fixedWidth ? getRightBoundary() : null,
            updateIndexBeforeTransform = (!carousel || !loop) ? true : false,
            // transform
            transformAttr = horizontal ? 'left' : 'top',
            transformPrefix = '',
            transformPostfix = '',
            // index
            getIndexMax = (function () {
                if (fixedWidth) {
                    return function () { return center && !loop ? slideCount - 1 : Math.ceil(- rightBoundary / (fixedWidth + gutter)); };
                } else if (autoWidth) {
                    return function () {
                        for (var i = slideCountNew; i--;) {
                            if (slidePositions[i] >= - rightBoundary) { return i; }
                        }
                    };
                } else {
                    return function () {
                        if (center && carousel && !loop) {
                            return slideCount - 1;
                        } else {
                            return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
                        }
                    };
                }
            })(),
            index = getStartIndex(getOption('startIndex')),
            indexCached = index,
            displayIndex = getCurrentSlide(),
            indexMin = 0,
            indexMax = !autoWidth ? getIndexMax() : null,
            // resize
            resizeTimer,
            preventActionWhenRunning = options.preventActionWhenRunning,
            swipeAngle = options.swipeAngle,
            moveDirectionExpected = swipeAngle ? '?' : true,
            running = false,
            onInit = options.onInit,
            events = new Events(),
            // id, class
            newContainerClasses = ' tns-slider tns-' + options.mode,
            slideId = container.id || getSlideId(),
            disable = getOption('disable'),
            disabled = false,
            freezable = options.freezable,
            freeze = freezable && !autoWidth ? getFreeze() : false,
            frozen = false,
            controlsEvents = {
                'click': onControlsClick,
                'keydown': onControlsKeydown
            },
            navEvents = {
                'click': onNavClick,
                'keydown': onNavKeydown
            },
            hoverEvents = {
                'mouseover': mouseoverPause,
                'mouseout': mouseoutRestart
            },
            visibilityEvent = { 'visibilitychange': onVisibilityChange },
            docmentKeydownEvent = { 'keydown': onDocumentKeydown },
            touchEvents = {
                'touchstart': onPanStart,
                'touchmove': onPanMove,
                'touchend': onPanEnd,
                'touchcancel': onPanEnd
            }, dragEvents = {
                'mousedown': onPanStart,
                'mousemove': onPanMove,
                'mouseup': onPanEnd,
                'mouseleave': onPanEnd
            },
            hasControls = hasOption('controls'),
            hasNav = hasOption('nav'),
            navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
            hasAutoplay = hasOption('autoplay'),
            hasTouch = hasOption('touch'),
            hasMouseDrag = hasOption('mouseDrag'),
            slideActiveClass = 'tns-slide-active',
            imgCompleteClass = 'tns-complete',
            imgEvents = {
                'load': onImgLoaded,
                'error': onImgFailed
            },
            imgsComplete,
            liveregionCurrent,
            preventScroll = options.preventScrollOnTouch === 'force' ? true : false;

        // controls
        if (hasControls) {
            var controlsContainer = options.controlsContainer,
                controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
                prevButton = options.prevButton,
                nextButton = options.nextButton,
                prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
                nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
                prevIsButton,
                nextIsButton;
        }

        // nav
        if (hasNav) {
            var navContainer = options.navContainer,
                navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
                navItems,
                pages = autoWidth ? slideCount : getPages(),
                pagesCached = 0,
                navClicked = -1,
                navCurrentIndex = getCurrentNavIndex(),
                navCurrentIndexCached = navCurrentIndex,
                navActiveClass = 'tns-nav-active',
                navStr = 'Carousel Page ',
                navStrCurrent = ' (Current Slide)';
        }

        // autoplay
        if (hasAutoplay) {
            var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
                autoplayButton = options.autoplayButton,
                autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
                autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
                autoplayTimer,
                animating,
                autoplayHoverPaused,
                autoplayUserPaused,
                autoplayVisibilityPaused;
        }

        if (hasTouch || hasMouseDrag) {
            var initPosition = {},
                lastPosition = {},
                translateInit,
                disX,
                disY,
                panStart = false,
                rafIndex,
                getDist = horizontal ?
                    function (a, b) { return a.x - b.x; } :
                    function (a, b) { return a.y - b.y; };
        }

        // disable slider when slidecount <= items
        if (!autoWidth) { resetVariblesWhenDisable(disable || freeze); }

        if (TRANSFORM) {
            transformAttr = TRANSFORM;
            transformPrefix = 'translate';

            if (HAS3DTRANSFORMS) {
                transformPrefix += horizontal ? '3d(' : '3d(0px, ';
                transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
            } else {
                transformPrefix += horizontal ? 'X(' : 'Y(';
                transformPostfix = ')';
            }

        }

        if (carousel) { container.className = container.className.replace('tns-vpfix', ''); }
        initStructure();
        initSheet();
        initSliderTransform();

        // === COMMON FUNCTIONS === //
        function resetVariblesWhenDisable(condition) {
            if (condition) {
                controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
            }
        }

        function getCurrentSlide() {
            var tem = carousel ? index - cloneCount : index;
            while (tem < 0) { tem += slideCount; }
            return tem % slideCount + 1;
        }

        function getStartIndex(ind) {
            ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
            return carousel ? ind + cloneCount : ind;
        }

        function getAbsIndex(i) {
            if (i == null) { i = index; }

            if (carousel) { i -= cloneCount; }
            while (i < 0) { i += slideCount; }

            return Math.floor(i % slideCount);
        }

        function getCurrentNavIndex() {
            var absIndex = getAbsIndex(),
                result;

            result = navAsThumbnails ? absIndex :
                fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) :
                    Math.floor(absIndex / items);

            // set active nav to the last one when reaches the right edge
            if (!loop && carousel && index === indexMax) { result = pages - 1; }

            return result;
        }

        function getItemsMax() {
            // fixedWidth or autoWidth while viewportMax is not available
            if (autoWidth || (fixedWidth && !viewportMax)) {
                return slideCount - 1;
                // most cases
            } else {
                var str = fixedWidth ? 'fixedWidth' : 'items',
                    arr = [];

                if (fixedWidth || options[str] < slideCount) { arr.push(options[str]); }

                if (responsive) {
                    for (var bp in responsive) {
                        var tem = responsive[bp][str];
                        if (tem && (fixedWidth || tem < slideCount)) { arr.push(tem); }
                    }
                }

                if (!arr.length) { arr.push(0); }

                return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
            }
        }

        function getCloneCountForLoop() {
            var itemsMax = getItemsMax(),
                result = carousel ? Math.ceil((itemsMax * 5 - slideCount) / 2) : (itemsMax * 4 - slideCount);
            result = Math.max(itemsMax, result);

            return hasOption('edgePadding') ? result + 1 : result;
        }

        function getWindowWidth() {
            return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        }

        function getInsertPosition(pos) {
            return pos === 'top' ? 'afterbegin' : 'beforeend';
        }

        function getClientWidth(el) {
            var div = doc.createElement('div'), rect, width;
            el.appendChild(div);
            rect = div.getBoundingClientRect();
            width = rect.right - rect.left;
            div.remove();
            return width || getClientWidth(el.parentNode);
        }

        function getViewportWidth() {
            var gap = edgePadding ? edgePadding * 2 - gutter : 0;
            return getClientWidth(containerParent) - gap;
        }

        function hasOption(item) {
            if (options[item]) {
                return true;
            } else {
                if (responsive) {
                    for (var bp in responsive) {
                        if (responsive[bp][item]) { return true; }
                    }
                }
                return false;
            }
        }

        // get option:
        // fixed width: viewport, fixedWidth, gutter => items
        // others: window width => all variables
        // all: items => slideBy
        function getOption(item, ww) {
            if (ww == null) { ww = windowWidth; }

            if (item === 'items' && fixedWidth) {
                return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;

            } else {
                var result = options[item];

                if (responsive) {
                    for (var bp in responsive) {
                        // bp: convert string to number
                        if (ww >= parseInt(bp)) {
                            if (item in responsive[bp]) { result = responsive[bp][item]; }
                        }
                    }
                }

                if (item === 'slideBy' && result === 'page') { result = getOption('items'); }
                if (!carousel && (item === 'slideBy' || item === 'items')) { result = Math.floor(result); }

                return result;
            }
        }

        function getSlideMarginLeft(i) {
            return CALC ?
                CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' :
                i * 100 / slideCountNew + '%';
        }

        function getInnerWrapperStyles(edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
            var str = '';

            if (edgePaddingTem !== undefined) {
                var gap = edgePaddingTem;
                if (gutterTem) { gap -= gutterTem; }
                str = horizontal ?
                    'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' :
                    'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
            } else if (gutterTem && !fixedWidthTem) {
                var gutterTemUnit = '-' + gutterTem + 'px',
                    dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
                str = 'margin: 0 ' + dir + ';';
            }

            if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) { str += getTransitionDurationStyle(speedTem); }
            return str;
        }

        function getContainerWidth(fixedWidthTem, gutterTem, itemsTem) {
            if (fixedWidthTem) {
                return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
            } else {
                return CALC ?
                    CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' :
                    slideCountNew * 100 / itemsTem + '%';
            }
        }

        function getSlideWidthStyle(fixedWidthTem, gutterTem, itemsTem) {
            var width;

            if (fixedWidthTem) {
                width = (fixedWidthTem + gutterTem) + 'px';
            } else {
                if (!carousel) { itemsTem = Math.floor(itemsTem); }
                var dividend = carousel ? slideCountNew : itemsTem;
                width = CALC ?
                    CALC + '(100% / ' + dividend + ')' :
                    100 / dividend + '%';
            }

            width = 'width:' + width;

            // inner slider: overwrite outer slider styles
            return nested !== 'inner' ? width + ';' : width + ' !important;';
        }

        function getSlideGutterStyle(gutterTem) {
            var str = '';

            // gutter maybe interger || 0
            // so can't use 'if (gutter)'
            if (gutterTem !== false) {
                var prop = horizontal ? 'padding-' : 'margin-',
                    dir = horizontal ? 'right' : 'bottom';
                str = prop + dir + ': ' + gutterTem + 'px;';
            }

            return str;
        }

        function getCSSPrefix(name, num) {
            var prefix = name.substring(0, name.length - num).toLowerCase();
            if (prefix) { prefix = '-' + prefix + '-'; }

            return prefix;
        }

        function getTransitionDurationStyle(speed) {
            return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
        }

        function getAnimationDurationStyle(speed) {
            return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
        }

        function initStructure() {
            var classOuter = 'tns-outer',
                classInner = 'tns-inner',
                hasGutter = hasOption('gutter');

            outerWrapper.className = classOuter;
            innerWrapper.className = classInner;
            outerWrapper.id = slideId + '-ow';
            innerWrapper.id = slideId + '-iw';

            // set container properties
            if (container.id === '') { container.id = slideId; }
            newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
            newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';
            if (autoWidth) { newContainerClasses += ' tns-autowidth'; }
            newContainerClasses += ' tns-' + options.axis;
            container.className += newContainerClasses;

            // add constrain layer for carousel
            if (carousel) {
                middleWrapper = doc.createElement('div');
                middleWrapper.id = slideId + '-mw';
                middleWrapper.className = 'tns-ovh';

                outerWrapper.appendChild(middleWrapper);
                middleWrapper.appendChild(innerWrapper);
            } else {
                outerWrapper.appendChild(innerWrapper);
            }

            if (autoHeight) {
                var wp = middleWrapper ? middleWrapper : innerWrapper;
                wp.className += ' tns-ah';
            }

            containerParent.insertBefore(outerWrapper, container);
            innerWrapper.appendChild(container);

            // add id, class, aria attributes
            // before clone slides
            forEach(slideItems, function (item, i) {
                addClass(item, 'tns-item');
                if (!item.id) { item.id = slideId + '-item' + i; }
                if (!carousel && animateNormal) { addClass(item, animateNormal); }
                setAttrs(item, {
                    'aria-hidden': 'true',
                    'tabindex': '-1'
                });
            });

            // ## clone slides
            // carousel: n + slides + n
            // gallery:      slides + n
            if (cloneCount) {
                var fragmentBefore = doc.createDocumentFragment(),
                    fragmentAfter = doc.createDocumentFragment();

                for (var j = cloneCount; j--;) {
                    var num = j % slideCount,
                        cloneFirst = slideItems[num].cloneNode(true);
                    removeAttrs(cloneFirst, 'id');
                    fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

                    if (carousel) {
                        var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
                        removeAttrs(cloneLast, 'id');
                        fragmentBefore.appendChild(cloneLast);
                    }
                }

                container.insertBefore(fragmentBefore, container.firstChild);
                container.appendChild(fragmentAfter);
                slideItems = container.children;
            }

        }

        function initSliderTransform() {
            // ## images loaded/failed
            if (hasOption('autoHeight') || autoWidth || !horizontal) {
                var imgs = container.querySelectorAll('img');

                // add complete class if all images are loaded/failed
                forEach(imgs, function (img) {
                    var src = img.src;

                    if (src && src.indexOf('data:image') < 0) {
                        addEvents(img, imgEvents);
                        img.src = '';
                        img.src = src;
                        addClass(img, 'loading');
                    } else if (!lazyload) {
                        imgLoaded(img);
                    }
                });

                // All imgs are completed
                raf(function () { imgsLoadedCheck(arrayFromNodeList(imgs), function () { imgsComplete = true; }); });

                // Check imgs in window only for auto height
                if (!autoWidth && horizontal) { imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1)); }

                lazyload ? initSliderTransformStyleCheck() : raf(function () { imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck); });

            } else {
                // set container transform property
                if (carousel) { doContainerTransformSilent(); }

                // update slider tools and events
                initTools();
                initEvents();
            }
        }

        function initSliderTransformStyleCheck() {
            if (autoWidth) {
                // check styles application
                var num = loop ? index : slideCount - 1;
                (function stylesApplicationCheck() {
                    slideItems[num - 1].getBoundingClientRect().right.toFixed(2) === slideItems[num].getBoundingClientRect().left.toFixed(2) ?
                        initSliderTransformCore() :
                        setTimeout(function () { stylesApplicationCheck(); }, 16);
                })();
            } else {
                initSliderTransformCore();
            }
        }


        function initSliderTransformCore() {
            // run Fn()s which are rely on image loading
            if (!horizontal || autoWidth) {
                setSlidePositions();

                if (autoWidth) {
                    rightBoundary = getRightBoundary();
                    if (freezable) { freeze = getFreeze(); }
                    indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=
                    resetVariblesWhenDisable(disable || freeze);
                } else {
                    updateContentWrapperHeight();
                }
            }

            // set container transform property
            if (carousel) { doContainerTransformSilent(); }

            // update slider tools and events
            initTools();
            initEvents();
        }

        function initSheet() {
            // gallery:
            // set animation classes and left value for gallery slider
            if (!carousel) {
                for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
                    var item = slideItems[i];
                    item.style.left = (i - index) * 100 / items + '%';
                    addClass(item, animateIn);
                    removeClass(item, animateNormal);
                }
            }

            // #### LAYOUT

            // ## INLINE-BLOCK VS FLOAT

            // ## PercentageLayout:
            // slides: inline-block
            // remove blank space between slides by set font-size: 0

            // ## Non PercentageLayout:
            // slides: float
            //         margin-right: -100%
            //         margin-left: ~

            // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing
            if (horizontal) {
                if (PERCENTAGELAYOUT || autoWidth) {
                    addCSSRule(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', getCssRulesLength(sheet));
                    addCSSRule(sheet, '#' + slideId, 'font-size:0;', getCssRulesLength(sheet));
                } else if (carousel) {
                    forEach(slideItems, function (slide, i) {
                        slide.style.marginLeft = getSlideMarginLeft(i);
                    });
                }
            }


            // ## BASIC STYLES
            if (CSSMQ) {
                // middle wrapper style
                if (TRANSITIONDURATION) {
                    var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
                    addCSSRule(sheet, '#' + slideId + '-mw', str, getCssRulesLength(sheet));
                }

                // inner wrapper styles
                str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
                addCSSRule(sheet, '#' + slideId + '-iw', str, getCssRulesLength(sheet));

                // container styles
                if (carousel) {
                    str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
                    if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
                    addCSSRule(sheet, '#' + slideId, str, getCssRulesLength(sheet));
                }

                // slide styles
                str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';
                if (options.gutter) { str += getSlideGutterStyle(options.gutter); }
                // set gallery items transition-duration
                if (!carousel) {
                    if (TRANSITIONDURATION) { str += getTransitionDurationStyle(speed); }
                    if (ANIMATIONDURATION) { str += getAnimationDurationStyle(speed); }
                }
                if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }

                // non CSS mediaqueries: IE8
                // ## update inner wrapper, container, slides if needed
                // set inline styles for inner wrapper & container
                // insert stylesheet (one line) for slides only (since slides are many)
            } else {
                // middle wrapper styles
                update_carousel_transition_duration();

                // inner wrapper styles
                innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight);

                // container styles
                if (carousel && horizontal && !autoWidth) {
                    container.style.width = getContainerWidth(fixedWidth, gutter, items);
                }

                // slide styles
                var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';
                if (gutter) { str += getSlideGutterStyle(gutter); }

                // append to the last line
                if (str) { addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet)); }
            }

            // ## MEDIAQUERIES
            if (responsive && CSSMQ) {
                for (var bp in responsive) {
                    // bp: convert string to number
                    bp = parseInt(bp);

                    var opts = responsive[bp],
                        str = '',
                        middleWrapperStr = '',
                        innerWrapperStr = '',
                        containerStr = '',
                        slideStr = '',
                        itemsBP = !autoWidth ? getOption('items', bp) : null,
                        fixedWidthBP = getOption('fixedWidth', bp),
                        speedBP = getOption('speed', bp),
                        edgePaddingBP = getOption('edgePadding', bp),
                        autoHeightBP = getOption('autoHeight', bp),
                        gutterBP = getOption('gutter', bp);

                    // middle wrapper string
                    if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
                        middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
                    }

                    // inner wrapper string
                    if ('edgePadding' in opts || 'gutter' in opts) {
                        innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
                    }

                    // container string
                    if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || (fixedWidth && 'gutter' in opts))) {
                        containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
                    }
                    if (TRANSITIONDURATION && 'speed' in opts) {
                        containerStr += getTransitionDurationStyle(speedBP);
                    }
                    if (containerStr) {
                        containerStr = '#' + slideId + '{' + containerStr + '}';
                    }

                    // slide string
                    if ('fixedWidth' in opts || (fixedWidth && 'gutter' in opts) || !carousel && 'items' in opts) {
                        slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
                    }
                    if ('gutter' in opts) {
                        slideStr += getSlideGutterStyle(gutterBP);
                    }
                    // set gallery items transition-duration
                    if (!carousel && 'speed' in opts) {
                        if (TRANSITIONDURATION) { slideStr += getTransitionDurationStyle(speedBP); }
                        if (ANIMATIONDURATION) { slideStr += getAnimationDurationStyle(speedBP); }
                    }
                    if (slideStr) { slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}'; }

                    // add up
                    str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;

                    if (str) {
                        sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
                    }
                }
            }
        }

        function initTools() {
            // == slides ==
            updateSlideStatus();

            // == live region ==
            outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + '</span>  of ' + slideCount + '</div>');
            liveregionCurrent = outerWrapper.querySelector('.tns-liveregion .current');

            // == autoplayInit ==
            if (hasAutoplay) {
                var txt = autoplay ? 'stop' : 'start';
                if (autoplayButton) {
                    setAttrs(autoplayButton, { 'data-action': txt });
                } else if (options.autoplayButtonOutput) {
                    outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
                    autoplayButton = outerWrapper.querySelector('[data-action]');
                }

                // add event
                if (autoplayButton) {
                    addEvents(autoplayButton, { 'click': toggleAutoplay });
                }

                if (autoplay) {
                    startAutoplay();
                    if (autoplayHoverPause) { addEvents(container, hoverEvents); }
                    if (autoplayResetOnVisibility) { addEvents(container, visibilityEvent); }
                }
            }

            // == navInit ==
            if (hasNav) {
                var initIndex = !carousel ? 0 : cloneCount;
                // customized nav
                // will not hide the navs in case they're thumbnails
                if (navContainer) {
                    setAttrs(navContainer, { 'aria-label': 'Carousel Pagination' });
                    navItems = navContainer.children;
                    forEach(navItems, function (item, i) {
                        setAttrs(item, {
                            'data-nav': i,
                            'tabindex': '-1',
                            'aria-label': navStr + (i + 1),
                            'aria-controls': slideId,
                        });
                    });

                    // generated nav
                } else {
                    var navHtml = '',
                        hiddenStr = navAsThumbnails ? '' : 'style="display:none"';
                    for (var i = 0; i < slideCount; i++) {
                        // hide nav items by default
                        navHtml += '<button data-nav="' + i + '" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) + '"></button>';
                    }
                    navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
                    outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);

                    navContainer = outerWrapper.querySelector('.tns-nav');
                    navItems = navContainer.children;
                }

                updateNavVisibility();

                // add transition
                if (TRANSITIONDURATION) {
                    var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
                        str = 'transition: all ' + speed / 1000 + 's';

                    if (prefix) {
                        str = '-' + prefix + '-' + str;
                    }

                    addCSSRule(sheet, '[aria-controls^=' + slideId + '-item]', str, getCssRulesLength(sheet));
                }

                setAttrs(navItems[navCurrentIndex], { 'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent });
                removeAttrs(navItems[navCurrentIndex], 'tabindex');
                addClass(navItems[navCurrentIndex], navActiveClass);

                // add events
                addEvents(navContainer, navEvents);
            }



            // == controlsInit ==
            if (hasControls) {
                if (!controlsContainer && (!prevButton || !nextButton)) {
                    outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[0] + '</button><button data-controls="next" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[1] + '</button></div>');

                    controlsContainer = outerWrapper.querySelector('.tns-controls');
                }

                if (!prevButton || !nextButton) {
                    prevButton = controlsContainer.children[0];
                    nextButton = controlsContainer.children[1];
                }

                if (options.controlsContainer) {
                    setAttrs(controlsContainer, {
                        'aria-label': 'Carousel Navigation',
                        'tabindex': '0'
                    });
                }

                if (options.controlsContainer || (options.prevButton && options.nextButton)) {
                    setAttrs([prevButton, nextButton], {
                        'aria-controls': slideId,
                        'tabindex': '-1',
                    });
                }

                if (options.controlsContainer || (options.prevButton && options.nextButton)) {
                    setAttrs(prevButton, { 'data-controls': 'prev' });
                    setAttrs(nextButton, { 'data-controls': 'next' });
                }

                prevIsButton = isButton(prevButton);
                nextIsButton = isButton(nextButton);

                updateControlsStatus();

                // add events
                if (controlsContainer) {
                    addEvents(controlsContainer, controlsEvents);
                } else {
                    addEvents(prevButton, controlsEvents);
                    addEvents(nextButton, controlsEvents);
                }
            }

            // hide tools if needed
            disableUI();
        }

        function initEvents() {
            // add events
            if (carousel && TRANSITIONEND) {
                var eve = {};
                eve[TRANSITIONEND] = onTransitionEnd;
                addEvents(container, eve);
            }

            if (touch) { addEvents(container, touchEvents, options.preventScrollOnTouch); }
            if (mouseDrag) { addEvents(container, dragEvents); }
            if (arrowKeys) { addEvents(doc, docmentKeydownEvent); }

            if (nested === 'inner') {
                events.on('outerResized', function () {
                    resizeTasks();
                    events.emit('innerLoaded', info());
                });
            } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
                addEvents(win, { 'resize': onResize });
            }

            if (autoHeight) {
                if (nested === 'outer') {
                    events.on('innerLoaded', doAutoHeight);
                } else if (!disable) { doAutoHeight(); }
            }

            doLazyLoad();
            if (disable) { disableSlider(); } else if (freeze) { freezeSlider(); }

            events.on('indexChanged', additionalUpdates);
            if (nested === 'inner') { events.emit('innerLoaded', info()); }
            if (typeof onInit === 'function') { onInit(info()); }
            isOn = true;
        }

        function destroy() {
            // sheet
            sheet.disabled = true;
            if (sheet.ownerNode) { sheet.ownerNode.remove(); }

            // remove win event listeners
            removeEvents(win, { 'resize': onResize });

            // arrowKeys, controls, nav
            if (arrowKeys) { removeEvents(doc, docmentKeydownEvent); }
            if (controlsContainer) { removeEvents(controlsContainer, controlsEvents); }
            if (navContainer) { removeEvents(navContainer, navEvents); }

            // autoplay
            removeEvents(container, hoverEvents);
            removeEvents(container, visibilityEvent);
            if (autoplayButton) { removeEvents(autoplayButton, { 'click': toggleAutoplay }); }
            if (autoplay) { clearInterval(autoplayTimer); }

            // container
            if (carousel && TRANSITIONEND) {
                var eve = {};
                eve[TRANSITIONEND] = onTransitionEnd;
                removeEvents(container, eve);
            }
            if (touch) { removeEvents(container, touchEvents); }
            if (mouseDrag) { removeEvents(container, dragEvents); }

            // cache Object values in options && reset HTML
            var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];

            tnsList.forEach(function (item, i) {
                var el = item === 'container' ? outerWrapper : options[item];

                if (typeof el === 'object') {
                    var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
                        parentEl = el.parentNode;
                    el.outerHTML = htmlList[i];
                    options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
                }
            });


            // reset variables
            tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = resizeTimer = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = disX = disY = panStart = rafIndex = getDist = touch = mouseDrag = null;
            // check variables
            // [animateIn, animateOut, animateDelay, animateNormal, horizontal, outerWrapper, innerWrapper, container, containerParent, containerHTML, slideItems, slideCount, breakpointZone, windowWidth, autoWidth, fixedWidth, edgePadding, gutter, viewport, items, slideBy, viewportMax, arrowKeys, speed, rewind, loop, autoHeight, sheet, lazyload, slidePositions, slideItemsOut, cloneCount, slideCountNew, hasRightDeadZone, rightBoundary, updateIndexBeforeTransform, transformAttr, transformPrefix, transformPostfix, getIndexMax, index, indexCached, indexMin, indexMax, resizeTimer, swipeAngle, moveDirectionExpected, running, onInit, events, newContainerClasses, slideId, disable, disabled, freezable, freeze, frozen, controlsEvents, navEvents, hoverEvents, visibilityEvent, docmentKeydownEvent, touchEvents, dragEvents, hasControls, hasNav, navAsThumbnails, hasAutoplay, hasTouch, hasMouseDrag, slideActiveClass, imgCompleteClass, imgEvents, imgsComplete, controls, controlsText, controlsContainer, controlsContainerHTML, prevButton, nextButton, prevIsButton, nextIsButton, nav, navContainer, navContainerHTML, navItems, pages, pagesCached, navClicked, navCurrentIndex, navCurrentIndexCached, navActiveClass, navStr, navStrCurrent, autoplay, autoplayTimeout, autoplayDirection, autoplayText, autoplayHoverPause, autoplayButton, autoplayButtonHTML, autoplayResetOnVisibility, autoplayHtmlStrings, autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused, initPosition, lastPosition, translateInit, disX, disY, panStart, rafIndex, getDist, touch, mouseDrag ].forEach(function(item) { if (item !== null) { console.log(item); } });

            for (var a in this) {
                if (a !== 'rebuild') { this[a] = null; }
            }
            isOn = false;
        }

        // === ON RESIZE ===
        // responsive || fixedWidth || autoWidth || !horizontal
        function onResize(e) {
            raf(function () { resizeTasks(getEvent(e)); });
        }

        function resizeTasks(e) {
            if (!isOn) { return; }
            if (nested === 'outer') { events.emit('outerResized', info(e)); }
            windowWidth = getWindowWidth();
            var bpChanged,
                breakpointZoneTem = breakpointZone,
                needContainerTransform = false;

            if (responsive) {
                setBreakpointZone();
                bpChanged = breakpointZoneTem !== breakpointZone;
                // if (hasRightDeadZone) { needContainerTransform = true; } // *?
                if (bpChanged) { events.emit('newBreakpointStart', info(e)); }
            }

            var indChanged,
                itemsChanged,
                itemsTem = items,
                disableTem = disable,
                freezeTem = freeze,
                arrowKeysTem = arrowKeys,
                controlsTem = controls,
                navTem = nav,
                touchTem = touch,
                mouseDragTem = mouseDrag,
                autoplayTem = autoplay,
                autoplayHoverPauseTem = autoplayHoverPause,
                autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
                indexTem = index;

            if (bpChanged) {
                var fixedWidthTem = fixedWidth,
                    autoHeightTem = autoHeight,
                    controlsTextTem = controlsText,
                    centerTem = center,
                    autoplayTextTem = autoplayText;

                if (!CSSMQ) {
                    var gutterTem = gutter,
                        edgePaddingTem = edgePadding;
                }
            }

            // get option:
            // fixed width: viewport, fixedWidth, gutter => items
            // others: window width => all variables
            // all: items => slideBy
            arrowKeys = getOption('arrowKeys');
            controls = getOption('controls');
            nav = getOption('nav');
            touch = getOption('touch');
            center = getOption('center');
            mouseDrag = getOption('mouseDrag');
            autoplay = getOption('autoplay');
            autoplayHoverPause = getOption('autoplayHoverPause');
            autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');

            if (bpChanged) {
                disable = getOption('disable');
                fixedWidth = getOption('fixedWidth');
                speed = getOption('speed');
                autoHeight = getOption('autoHeight');
                controlsText = getOption('controlsText');
                autoplayText = getOption('autoplayText');
                autoplayTimeout = getOption('autoplayTimeout');

                if (!CSSMQ) {
                    edgePadding = getOption('edgePadding');
                    gutter = getOption('gutter');
                }
            }
            // update options
            resetVariblesWhenDisable(disable);

            viewport = getViewportWidth(); // <= edgePadding, gutter
            if ((!horizontal || autoWidth) && !disable) {
                setSlidePositions();
                if (!horizontal) {
                    updateContentWrapperHeight(); // <= setSlidePositions
                    needContainerTransform = true;
                }
            }
            if (fixedWidth || autoWidth) {
                rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
                // fixedWidth: <= viewport, fixedWidth, gutter
                indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
                // fixedWidth: <= rightBoundary, fixedWidth, gutter
            }

            if (bpChanged || fixedWidth) {
                items = getOption('items');
                slideBy = getOption('slideBy');
                itemsChanged = items !== itemsTem;

                if (itemsChanged) {
                    if (!fixedWidth && !autoWidth) { indexMax = getIndexMax(); } // <= items
                    // check index before transform in case
                    // slider reach the right edge then items become bigger
                    updateIndex();
                }
            }

            if (bpChanged) {
                if (disable !== disableTem) {
                    if (disable) {
                        disableSlider();
                    } else {
                        enableSlider(); // <= slidePositions, rightBoundary, indexMax
                    }
                }
            }

            if (freezable && (bpChanged || fixedWidth || autoWidth)) {
                freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
                // <= fixedWidth: fixedWidth, gutter, rightBoundary
                // <= others: items

                if (freeze !== freezeTem) {
                    if (freeze) {
                        doContainerTransform(getContainerTransformValue(getStartIndex(0)));
                        freezeSlider();
                    } else {
                        unfreezeSlider();
                        needContainerTransform = true;
                    }
                }
            }

            resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility
            if (!autoplay) { autoplayHoverPause = autoplayResetOnVisibility = false; }

            if (arrowKeys !== arrowKeysTem) {
                arrowKeys ?
                    addEvents(doc, docmentKeydownEvent) :
                    removeEvents(doc, docmentKeydownEvent);
            }
            if (controls !== controlsTem) {
                if (controls) {
                    if (controlsContainer) {
                        showElement(controlsContainer);
                    } else {
                        if (prevButton) { showElement(prevButton); }
                        if (nextButton) { showElement(nextButton); }
                    }
                } else {
                    if (controlsContainer) {
                        hideElement(controlsContainer);
                    } else {
                        if (prevButton) { hideElement(prevButton); }
                        if (nextButton) { hideElement(nextButton); }
                    }
                }
            }
            if (nav !== navTem) {
                nav ?
                    showElement(navContainer) :
                    hideElement(navContainer);
            }
            if (touch !== touchTem) {
                touch ?
                    addEvents(container, touchEvents, options.preventScrollOnTouch) :
                    removeEvents(container, touchEvents);
            }
            if (mouseDrag !== mouseDragTem) {
                mouseDrag ?
                    addEvents(container, dragEvents) :
                    removeEvents(container, dragEvents);
            }
            if (autoplay !== autoplayTem) {
                if (autoplay) {
                    if (autoplayButton) { showElement(autoplayButton); }
                    if (!animating && !autoplayUserPaused) { startAutoplay(); }
                } else {
                    if (autoplayButton) { hideElement(autoplayButton); }
                    if (animating) { stopAutoplay(); }
                }
            }
            if (autoplayHoverPause !== autoplayHoverPauseTem) {
                autoplayHoverPause ?
                    addEvents(container, hoverEvents) :
                    removeEvents(container, hoverEvents);
            }
            if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
                autoplayResetOnVisibility ?
                    addEvents(doc, visibilityEvent) :
                    removeEvents(doc, visibilityEvent);
            }

            if (bpChanged) {
                if (fixedWidth !== fixedWidthTem || center !== centerTem) { needContainerTransform = true; }

                if (autoHeight !== autoHeightTem) {
                    if (!autoHeight) { innerWrapper.style.height = ''; }
                }

                if (controls && controlsText !== controlsTextTem) {
                    prevButton.innerHTML = controlsText[0];
                    nextButton.innerHTML = controlsText[1];
                }

                if (autoplayButton && autoplayText !== autoplayTextTem) {
                    var i = autoplay ? 1 : 0,
                        html = autoplayButton.innerHTML,
                        len = html.length - autoplayTextTem[i].length;
                    if (html.substring(len) === autoplayTextTem[i]) {
                        autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
                    }
                }
            } else {
                if (center && (fixedWidth || autoWidth)) { needContainerTransform = true; }
            }

            if (itemsChanged || fixedWidth && !autoWidth) {
                pages = getPages();
                updateNavVisibility();
            }

            indChanged = index !== indexTem;
            if (indChanged) {
                events.emit('indexChanged', info());
                needContainerTransform = true;
            } else if (itemsChanged) {
                if (!indChanged) { additionalUpdates(); }
            } else if (fixedWidth || autoWidth) {
                doLazyLoad();
                updateSlideStatus();
                updateLiveRegion();
            }

            if (itemsChanged && !carousel) { updateGallerySlidePositions(); }

            if (!disable && !freeze) {
                // non-meduaqueries: IE8
                if (bpChanged && !CSSMQ) {
                    // middle wrapper styles
                    if (autoHeight !== autoheightTem || speed !== speedTem) {
                        update_carousel_transition_duration();
                    }

                    // inner wrapper styles
                    if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
                        innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
                    }

                    if (horizontal) {
                        // container styles
                        if (carousel) {
                            container.style.width = getContainerWidth(fixedWidth, gutter, items);
                        }

                        // slide styles
                        var str = getSlideWidthStyle(fixedWidth, gutter, items) +
                            getSlideGutterStyle(gutter);

                        // remove the last line and
                        // add new styles
                        removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
                        addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
                    }
                }

                // auto height
                if (autoHeight) { doAutoHeight(); }

                if (needContainerTransform) {
                    doContainerTransformSilent();
                    indexCached = index;
                }
            }

            if (bpChanged) { events.emit('newBreakpointEnd', info(e)); }
        }





        // === INITIALIZATION FUNCTIONS === //
        function getFreeze() {
            if (!fixedWidth && !autoWidth) {
                var a = center ? items - (items - 1) / 2 : items;
                return slideCount <= a;
            }

            var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
                vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;

            if (center) {
                vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
            }

            return width <= vp;
        }

        function setBreakpointZone() {
            breakpointZone = 0;
            for (var bp in responsive) {
                bp = parseInt(bp); // convert string to number
                if (windowWidth >= bp) { breakpointZone = bp; }
            }
        }

        // (slideBy, indexMin, indexMax) => index
        var updateIndex = (function () {
            return loop ?
                carousel ?
                    // loop + carousel
                    function () {
                        var leftEdge = indexMin,
                            rightEdge = indexMax;

                        leftEdge += slideBy;
                        rightEdge -= slideBy;

                        // adjust edges when has edge paddings
                        // or fixed-width slider with extra space on the right side
                        if (edgePadding) {
                            leftEdge += 1;
                            rightEdge -= 1;
                        } else if (fixedWidth) {
                            if ((viewport + gutter) % (fixedWidth + gutter)) { rightEdge -= 1; }
                        }

                        if (cloneCount) {
                            if (index > rightEdge) {
                                index -= slideCount;
                            } else if (index < leftEdge) {
                                index += slideCount;
                            }
                        }
                    } :
                    // loop + gallery
                    function () {
                        if (index > indexMax) {
                            while (index >= indexMin + slideCount) { index -= slideCount; }
                        } else if (index < indexMin) {
                            while (index <= indexMax - slideCount) { index += slideCount; }
                        }
                    } :
                // non-loop
                function () {
                    index = Math.max(indexMin, Math.min(indexMax, index));
                };
        })();

        function disableUI() {
            if (!autoplay && autoplayButton) { hideElement(autoplayButton); }
            if (!nav && navContainer) { hideElement(navContainer); }
            if (!controls) {
                if (controlsContainer) {
                    hideElement(controlsContainer);
                } else {
                    if (prevButton) { hideElement(prevButton); }
                    if (nextButton) { hideElement(nextButton); }
                }
            }
        }

        function enableUI() {
            if (autoplay && autoplayButton) { showElement(autoplayButton); }
            if (nav && navContainer) { showElement(navContainer); }
            if (controls) {
                if (controlsContainer) {
                    showElement(controlsContainer);
                } else {
                    if (prevButton) { showElement(prevButton); }
                    if (nextButton) { showElement(nextButton); }
                }
            }
        }

        function freezeSlider() {
            if (frozen) { return; }

            // remove edge padding from inner wrapper
            if (edgePadding) { innerWrapper.style.margin = '0px'; }

            // add class tns-transparent to cloned slides
            if (cloneCount) {
                var str = 'tns-transparent';
                for (var i = cloneCount; i--;) {
                    if (carousel) { addClass(slideItems[i], str); }
                    addClass(slideItems[slideCountNew - i - 1], str);
                }
            }

            // update tools
            disableUI();

            frozen = true;
        }

        function unfreezeSlider() {
            if (!frozen) { return; }

            // restore edge padding for inner wrapper
            // for mordern browsers
            if (edgePadding && CSSMQ) { innerWrapper.style.margin = ''; }

            // remove class tns-transparent to cloned slides
            if (cloneCount) {
                var str = 'tns-transparent';
                for (var i = cloneCount; i--;) {
                    if (carousel) { removeClass(slideItems[i], str); }
                    removeClass(slideItems[slideCountNew - i - 1], str);
                }
            }

            // update tools
            enableUI();

            frozen = false;
        }

        function disableSlider() {
            if (disabled) { return; }

            sheet.disabled = true;
            container.className = container.className.replace(newContainerClasses.substring(1), '');
            removeAttrs(container, ['style']);
            if (loop) {
                for (var j = cloneCount; j--;) {
                    if (carousel) { hideElement(slideItems[j]); }
                    hideElement(slideItems[slideCountNew - j - 1]);
                }
            }

            // vertical slider
            if (!horizontal || !carousel) { removeAttrs(innerWrapper, ['style']); }

            // gallery
            if (!carousel) {
                for (var i = index, l = index + slideCount; i < l; i++) {
                    var item = slideItems[i];
                    removeAttrs(item, ['style']);
                    removeClass(item, animateIn);
                    removeClass(item, animateNormal);
                }
            }

            // update tools
            disableUI();

            disabled = true;
        }

        function enableSlider() {
            if (!disabled) { return; }

            sheet.disabled = false;
            container.className += newContainerClasses;
            doContainerTransformSilent();

            if (loop) {
                for (var j = cloneCount; j--;) {
                    if (carousel) { showElement(slideItems[j]); }
                    showElement(slideItems[slideCountNew - j - 1]);
                }
            }

            // gallery
            if (!carousel) {
                for (var i = index, l = index + slideCount; i < l; i++) {
                    var item = slideItems[i],
                        classN = i < index + items ? animateIn : animateNormal;
                    item.style.left = (i - index) * 100 / items + '%';
                    addClass(item, classN);
                }
            }

            // update tools
            enableUI();

            disabled = false;
        }

        function updateLiveRegion() {
            var str = getLiveRegionStr();
            if (liveregionCurrent.innerHTML !== str) { liveregionCurrent.innerHTML = str; }
        }

        function getLiveRegionStr() {
            var arr = getVisibleSlideRange(),
                start = arr[0] + 1,
                end = arr[1] + 1;
            return start === end ? start + '' : start + ' to ' + end;
        }

        function getVisibleSlideRange(val) {
            if (val == null) { val = getContainerTransformValue(); }
            var start = index, end, rangestart, rangeend;

            // get range start, range end for autoWidth and fixedWidth
            if (center || edgePadding) {
                if (autoWidth || fixedWidth) {
                    rangestart = - (parseFloat(val) + edgePadding);
                    rangeend = rangestart + viewport + edgePadding * 2;
                }
            } else {
                if (autoWidth) {
                    rangestart = slidePositions[index];
                    rangeend = rangestart + viewport;
                }
            }

            // get start, end
            // - check auto width
            if (autoWidth) {
                slidePositions.forEach(function (point, i) {
                    if (i < slideCountNew) {
                        if ((center || edgePadding) && point <= rangestart + 0.5) { start = i; }
                        if (rangeend - point >= 0.5) { end = i; }
                    }
                });

                // - check percentage width, fixed width
            } else {

                if (fixedWidth) {
                    var cell = fixedWidth + gutter;
                    if (center || edgePadding) {
                        start = Math.floor(rangestart / cell);
                        end = Math.ceil(rangeend / cell - 1);
                    } else {
                        end = start + Math.ceil(viewport / cell) - 1;
                    }

                } else {
                    if (center || edgePadding) {
                        var a = items - 1;
                        if (center) {
                            start -= a / 2;
                            end = index + a / 2;
                        } else {
                            end = index + a;
                        }

                        if (edgePadding) {
                            var b = edgePadding * items / viewport;
                            start -= b;
                            end += b;
                        }

                        start = Math.floor(start);
                        end = Math.ceil(end);
                    } else {
                        end = start + items - 1;
                    }
                }

                start = Math.max(start, 0);
                end = Math.min(end, slideCountNew - 1);
            }

            return [start, end];
        }

        function doLazyLoad() {
            if (lazyload && !disable) {
                getImageArray.apply(null, getVisibleSlideRange()).forEach(function (img) {
                    if (!hasClass(img, imgCompleteClass)) {
                        // stop propagation transitionend event to container
                        var eve = {};
                        eve[TRANSITIONEND] = function (e) { e.stopPropagation(); };
                        addEvents(img, eve);

                        addEvents(img, imgEvents);

                        // update src
                        img.src = getAttr(img, 'data-src');

                        // update srcset
                        var srcset = getAttr(img, 'data-srcset');
                        if (srcset) { img.srcset = srcset; }

                        addClass(img, 'loading');
                    }
                });
            }
        }

        function onImgLoaded(e) {
            imgLoaded(getTarget(e));
        }

        function onImgFailed(e) {
            imgFailed(getTarget(e));
        }

        function imgLoaded(img) {
            addClass(img, 'loaded');
            imgCompleted(img);
        }

        function imgFailed(img) {
            addClass(img, 'failed');
            imgCompleted(img);
        }

        function imgCompleted(img) {
            addClass(img, 'tns-complete');
            removeClass(img, 'loading');
            removeEvents(img, imgEvents);
        }

        function getImageArray(start, end) {
            var imgs = [];
            while (start <= end) {
                forEach(slideItems[start].querySelectorAll('img'), function (img) { imgs.push(img); });
                start++;
            }

            return imgs;
        }

        // check if all visible images are loaded
        // and update container height if it's done
        function doAutoHeight() {
            var imgs = getImageArray.apply(null, getVisibleSlideRange());
            raf(function () { imgsLoadedCheck(imgs, updateInnerWrapperHeight); });
        }

        function imgsLoadedCheck(imgs, cb) {
            // directly execute callback function if all images are complete
            if (imgsComplete) { return cb(); }

            // check selected image classes otherwise
            imgs.forEach(function (img, index) {
                if (hasClass(img, imgCompleteClass)) { imgs.splice(index, 1); }
            });

            // execute callback function if selected images are all complete
            if (!imgs.length) { return cb(); }

            // otherwise execute this functiona again
            raf(function () { imgsLoadedCheck(imgs, cb); });
        }

        function additionalUpdates() {
            doLazyLoad();
            updateSlideStatus();
            updateLiveRegion();
            updateControlsStatus();
            updateNavStatus();
        }


        function update_carousel_transition_duration() {
            if (carousel && autoHeight) {
                middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
            }
        }

        function getMaxSlideHeight(slideStart, slideRange) {
            var heights = [];
            for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
                heights.push(slideItems[i].offsetHeight);
            }

            return Math.max.apply(null, heights);
        }

        // update inner wrapper height
        // 1. get the max-height of the visible slides
        // 2. set transitionDuration to speed
        // 3. update inner wrapper height to max-height
        // 4. set transitionDuration to 0s after transition done
        function updateInnerWrapperHeight() {
            var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
                wp = middleWrapper ? middleWrapper : innerWrapper;

            if (wp.style.height !== maxHeight) { wp.style.height = maxHeight + 'px'; }
        }

        // get the distance from the top edge of the first slide to each slide
        // (init) => slidePositions
        function setSlidePositions() {
            slidePositions = [0];
            var attr = horizontal ? 'left' : 'top',
                attr2 = horizontal ? 'right' : 'bottom',
                base = slideItems[0].getBoundingClientRect()[attr];

            forEach(slideItems, function (item, i) {
                // skip the first slide
                if (i) { slidePositions.push(item.getBoundingClientRect()[attr] - base); }
                // add the end edge
                if (i === slideCountNew - 1) { slidePositions.push(item.getBoundingClientRect()[attr2] - base); }
            });
        }

        // update slide
        function updateSlideStatus() {
            var range = getVisibleSlideRange(),
                start = range[0],
                end = range[1];

            forEach(slideItems, function (item, i) {
                // show slides
                if (i >= start && i <= end) {
                    if (hasAttr(item, 'aria-hidden')) {
                        removeAttrs(item, ['aria-hidden', 'tabindex']);
                        addClass(item, slideActiveClass);
                    }
                    // hide slides
                } else {
                    if (!hasAttr(item, 'aria-hidden')) {
                        setAttrs(item, {
                            'aria-hidden': 'true',
                            'tabindex': '-1'
                        });
                        removeClass(item, slideActiveClass);
                    }
                }
            });
        }

        // gallery: update slide position
        function updateGallerySlidePositions() {
            var l = index + Math.min(slideCount, items);
            for (var i = slideCountNew; i--;) {
                var item = slideItems[i];

                if (i >= index && i < l) {
                    // add transitions to visible slides when adjusting their positions
                    addClass(item, 'tns-moving');

                    item.style.left = (i - index) * 100 / items + '%';
                    addClass(item, animateIn);
                    removeClass(item, animateNormal);
                } else if (item.style.left) {
                    item.style.left = '';
                    addClass(item, animateNormal);
                    removeClass(item, animateIn);
                }

                // remove outlet animation
                removeClass(item, animateOut);
            }

            // removing '.tns-moving'
            setTimeout(function () {
                forEach(slideItems, function (el) {
                    removeClass(el, 'tns-moving');
                });
            }, 300);
        }

        // set tabindex on Nav
        function updateNavStatus() {
            // get current nav
            if (nav) {
                navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
                navClicked = -1;

                if (navCurrentIndex !== navCurrentIndexCached) {
                    var navPrev = navItems[navCurrentIndexCached],
                        navCurrent = navItems[navCurrentIndex];

                    setAttrs(navPrev, {
                        'tabindex': '-1',
                        'aria-label': navStr + (navCurrentIndexCached + 1)
                    });
                    removeClass(navPrev, navActiveClass);

                    setAttrs(navCurrent, { 'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent });
                    removeAttrs(navCurrent, 'tabindex');
                    addClass(navCurrent, navActiveClass);

                    navCurrentIndexCached = navCurrentIndex;
                }
            }
        }

        function getLowerCaseNodeName(el) {
            return el.nodeName.toLowerCase();
        }

        function isButton(el) {
            return getLowerCaseNodeName(el) === 'button';
        }

        function isAriaDisabled(el) {
            return el.getAttribute('aria-disabled') === 'true';
        }

        function disEnableElement(isButton, el, val) {
            if (isButton) {
                el.disabled = val;
            } else {
                el.setAttribute('aria-disabled', val.toString());
            }
        }

        // set 'disabled' to true on controls when reach the edges
        function updateControlsStatus() {
            if (!controls || rewind || loop) { return; }

            var prevDisabled = (prevIsButton) ? prevButton.disabled : isAriaDisabled(prevButton),
                nextDisabled = (nextIsButton) ? nextButton.disabled : isAriaDisabled(nextButton),
                disablePrev = (index <= indexMin) ? true : false,
                disableNext = (!rewind && index >= indexMax) ? true : false;

            if (disablePrev && !prevDisabled) {
                disEnableElement(prevIsButton, prevButton, true);
            }
            if (!disablePrev && prevDisabled) {
                disEnableElement(prevIsButton, prevButton, false);
            }
            if (disableNext && !nextDisabled) {
                disEnableElement(nextIsButton, nextButton, true);
            }
            if (!disableNext && nextDisabled) {
                disEnableElement(nextIsButton, nextButton, false);
            }
        }

        // set duration
        function resetDuration(el, str) {
            if (TRANSITIONDURATION) { el.style[TRANSITIONDURATION] = str; }
        }

        function getSliderWidth() {
            return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
        }

        function getCenterGap(num) {
            if (num == null) { num = index; }

            var gap = edgePadding ? gutter : 0;
            return autoWidth ? ((viewport - gap) - (slidePositions[num + 1] - slidePositions[num] - gutter)) / 2 :
                fixedWidth ? (viewport - fixedWidth) / 2 :
                    (items - 1) / 2;
        }

        function getRightBoundary() {
            var gap = edgePadding ? gutter : 0,
                result = (viewport + gap) - getSliderWidth();

            if (center && !loop) {
                result = fixedWidth ? - (fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() :
                    getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
            }
            if (result > 0) { result = 0; }

            return result;
        }

        function getContainerTransformValue(num) {
            if (num == null) { num = index; }

            var val;
            if (horizontal && !autoWidth) {
                if (fixedWidth) {
                    val = - (fixedWidth + gutter) * num;
                    if (center) { val += getCenterGap(); }
                } else {
                    var denominator = TRANSFORM ? slideCountNew : items;
                    if (center) { num -= getCenterGap(); }
                    val = - num * 100 / denominator;
                }
            } else {
                val = - slidePositions[num];
                if (center && autoWidth) {
                    val += getCenterGap();
                }
            }

            if (hasRightDeadZone) { val = Math.max(val, rightBoundary); }

            val += (horizontal && !autoWidth && !fixedWidth) ? '%' : 'px';

            return val;
        }

        function doContainerTransformSilent(val) {
            resetDuration(container, '0s');
            doContainerTransform(val);
        }

        function doContainerTransform(val) {
            if (val == null) { val = getContainerTransformValue(); }
            container.style[transformAttr] = transformPrefix + val + transformPostfix;
        }

        function animateSlide(number, classOut, classIn, isOut) {
            var l = number + items;
            if (!loop) { l = Math.min(l, slideCountNew); }

            for (var i = number; i < l; i++) {
                var item = slideItems[i];

                // set item positions
                if (!isOut) { item.style.left = (i - index) * 100 / items + '%'; }

                if (animateDelay && TRANSITIONDELAY) {
                    item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
                }
                removeClass(item, classOut);
                addClass(item, classIn);

                if (isOut) { slideItemsOut.push(item); }
            }
        }

        // make transfer after click/drag:
        // 1. change 'transform' property for mordern browsers
        // 2. change 'left' property for legacy browsers
        var transformCore = (function () {
            return carousel ?
                function () {
                    resetDuration(container, '');
                    if (TRANSITIONDURATION || !speed) {
                        // for morden browsers with non-zero duration or
                        // zero duration for all browsers
                        doContainerTransform();
                        // run fallback function manually
                        // when duration is 0 / container is hidden
                        if (!speed || !isVisible(container)) { onTransitionEnd(); }

                    } else {
                        // for old browser with non-zero duration
                        jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
                    }

                    if (!horizontal) { updateContentWrapperHeight(); }
                } :
                function () {
                    slideItemsOut = [];

                    var eve = {};
                    eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
                    removeEvents(slideItems[indexCached], eve);
                    addEvents(slideItems[index], eve);

                    animateSlide(indexCached, animateIn, animateOut, true);
                    animateSlide(index, animateNormal, animateIn);

                    // run fallback function manually
                    // when transition or animation not supported / duration is 0
                    if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) { onTransitionEnd(); }
                };
        })();

        function render(e, sliderMoved) {
            if (updateIndexBeforeTransform) { updateIndex(); }

            // render when slider was moved (touch or drag) even though index may not change
            if (index !== indexCached || sliderMoved) {
                // events
                events.emit('indexChanged', info());
                events.emit('transitionStart', info());
                if (autoHeight) { doAutoHeight(); }

                // pause autoplay when click or keydown from user
                if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) { stopAutoplay(); startAutoplay(); }

                running = true;
                transformCore();
            }
        }

        /*
         * Transfer prefixed properties to the same format
         * CSS: -Webkit-Transform => webkittransform
         * JS: WebkitTransform => webkittransform
         * @param {string} str - property
         *
         */
        function strTrans(str) {
            return str.toLowerCase().replace(/-/g, '');
        }

        // AFTER TRANSFORM
        // Things need to be done after a transfer:
        // 1. check index
        // 2. add classes to visible slide
        // 3. disable controls buttons when reach the first/last slide in non-loop slider
        // 4. update nav status
        // 5. lazyload images
        // 6. update container height
        function onTransitionEnd(event) {
            // check running on gallery mode
            // make sure trantionend/animationend events run only once
            if (carousel || running) {
                events.emit('transitionEnd', info(event));

                if (!carousel && slideItemsOut.length > 0) {
                    for (var i = 0; i < slideItemsOut.length; i++) {
                        var item = slideItemsOut[i];
                        // set item positions
                        item.style.left = '';

                        if (ANIMATIONDELAY && TRANSITIONDELAY) {
                            item.style[ANIMATIONDELAY] = '';
                            item.style[TRANSITIONDELAY] = '';
                        }
                        removeClass(item, animateOut);
                        addClass(item, animateNormal);
                    }
                }

                /* update slides, nav, controls after checking ...
                 * => legacy browsers who don't support 'event'
                 *    have to check event first, otherwise event.target will cause an error
                 * => or 'gallery' mode:
                 *   + event target is slide item
                 * => or 'carousel' mode:
                 *   + event target is container,
                 *   + event.property is the same with transform attribute
                 */
                if (!event ||
                    !carousel && event.target.parentNode === container ||
                    event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {

                    if (!updateIndexBeforeTransform) {
                        var indexTem = index;
                        updateIndex();
                        if (index !== indexTem) {
                            events.emit('indexChanged', info());

                            doContainerTransformSilent();
                        }
                    }

                    if (nested === 'inner') { events.emit('innerLoaded', info()); }
                    running = false;
                    indexCached = index;
                }
            }

        }

        // # ACTIONS
        function goTo(targetIndex, e) {
            if (freeze) { return; }

            // prev slideBy
            if (targetIndex === 'prev') {
                onControlsClick(e, -1);

                // next slideBy
            } else if (targetIndex === 'next') {
                onControlsClick(e, 1);

                // go to exact slide
            } else {
                if (running) {
                    if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
                }

                var absIndex = getAbsIndex(),
                    indexGap = 0;

                if (targetIndex === 'first') {
                    indexGap = - absIndex;
                } else if (targetIndex === 'last') {
                    indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
                } else {
                    if (typeof targetIndex !== 'number') { targetIndex = parseInt(targetIndex); }

                    if (!isNaN(targetIndex)) {
                        // from directly called goTo function
                        if (!e) { targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex)); }

                        indexGap = targetIndex - absIndex;
                    }
                }

                // gallery: make sure new page won't overlap with current page
                if (!carousel && indexGap && Math.abs(indexGap) < items) {
                    var factor = indexGap > 0 ? 1 : -1;
                    indexGap += (index + indexGap - slideCount) >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
                }

                index += indexGap;

                // make sure index is in range
                if (carousel && loop) {
                    if (index < indexMin) { index += slideCount; }
                    if (index > indexMax) { index -= slideCount; }
                }

                // if index is changed, start rendering
                if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
                    render(e);
                }

            }
        }

        // on controls click
        function onControlsClick(e, dir) {
            if (running) {
                if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
            }
            var passEventObject;

            if (!dir) {
                e = getEvent(e);
                var target = getTarget(e);

                while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) { target = target.parentNode; }

                var targetIn = [prevButton, nextButton].indexOf(target);
                if (targetIn >= 0) {
                    passEventObject = true;
                    dir = targetIn === 0 ? -1 : 1;
                }
            }

            if (rewind) {
                if (index === indexMin && dir === -1) {
                    goTo('last', e);
                    return;
                } else if (index === indexMax && dir === 1) {
                    goTo('first', e);
                    return;
                }
            }

            if (dir) {
                index += slideBy * dir;
                if (autoWidth) { index = Math.floor(index); }
                // pass e when click control buttons or keydown
                render((passEventObject || (e && e.type === 'keydown')) ? e : null);
            }
        }

        // on nav click
        function onNavClick(e) {
            if (running) {
                if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
            }

            e = getEvent(e);
            var target = getTarget(e), navIndex;

            // find the clicked nav item
            while (target !== navContainer && !hasAttr(target, 'data-nav')) { target = target.parentNode; }
            if (hasAttr(target, 'data-nav')) {
                var navIndex = navClicked = Number(getAttr(target, 'data-nav')),
                    targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
                    targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
                goTo(targetIndex, e);

                if (navCurrentIndex === navIndex) {
                    if (animating) { stopAutoplay(); }
                    navClicked = -1; // reset navClicked
                }
            }
        }

        // autoplay functions
        function setAutoplayTimer() {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
            autoplayTimer = setInterval(function () {
                onControlsClick(null, autoplayDirection);
            }, autoplayTimeout);

            animating = true;
        }

        function stopAutoplayTimer() {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
            animating = false;
        }

        function updateAutoplayButton(action, txt) {
            setAttrs(autoplayButton, { 'data-action': action });
            autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
        }

        function startAutoplay() {
            setAutoplayTimer();
            if (autoplayButton) { updateAutoplayButton('stop', autoplayText[1]); }
        }

        function stopAutoplay() {
            stopAutoplayTimer();
            if (autoplayButton) { updateAutoplayButton('start', autoplayText[0]); }
        }

        // programaitcally play/pause the slider
        function play() {
            if (autoplay && !animating) {
                startAutoplay();
                autoplayUserPaused = false;
            }
        }
        function pause() {
            if (animating) {
                stopAutoplay();
                autoplayUserPaused = true;
            }
        }

        function toggleAutoplay() {
            if (animating) {
                stopAutoplay();
                autoplayUserPaused = true;
            } else {
                startAutoplay();
                autoplayUserPaused = false;
            }
        }

        function onVisibilityChange() {
            if (doc.hidden) {
                if (animating) {
                    stopAutoplayTimer();
                    autoplayVisibilityPaused = true;
                }
            } else if (autoplayVisibilityPaused) {
                setAutoplayTimer();
                autoplayVisibilityPaused = false;
            }
        }

        function mouseoverPause() {
            if (animating) {
                stopAutoplayTimer();
                autoplayHoverPaused = true;
            }
        }

        function mouseoutRestart() {
            if (autoplayHoverPaused) {
                setAutoplayTimer();
                autoplayHoverPaused = false;
            }
        }

        // keydown events on document
        function onDocumentKeydown(e) {
            e = getEvent(e);
            var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

            if (keyIndex >= 0) {
                onControlsClick(e, keyIndex === 0 ? -1 : 1);
            }
        }

        // on key control
        function onControlsKeydown(e) {
            e = getEvent(e);
            var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

            if (keyIndex >= 0) {
                if (keyIndex === 0) {
                    if (!prevButton.disabled) { onControlsClick(e, -1); }
                } else if (!nextButton.disabled) {
                    onControlsClick(e, 1);
                }
            }
        }

        // set focus
        function setFocus(el) {
            el.focus();
        }

        // on key nav
        function onNavKeydown(e) {
            e = getEvent(e);
            var curElement = doc.activeElement;
            if (!hasAttr(curElement, 'data-nav')) { return; }

            // var code = e.keyCode,
            var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
                navIndex = Number(getAttr(curElement, 'data-nav'));

            if (keyIndex >= 0) {
                if (keyIndex === 0) {
                    if (navIndex > 0) { setFocus(navItems[navIndex - 1]); }
                } else if (keyIndex === 1) {
                    if (navIndex < pages - 1) { setFocus(navItems[navIndex + 1]); }
                } else {
                    navClicked = navIndex;
                    goTo(navIndex, e);
                }
            }
        }

        function getEvent(e) {
            e = e || win.event;
            return isTouchEvent(e) ? e.changedTouches[0] : e;
        }
        function getTarget(e) {
            return e.target || win.event.srcElement;
        }

        function isTouchEvent(e) {
            return e.type.indexOf('touch') >= 0;
        }

        function preventDefaultBehavior(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }

        function getMoveDirectionExpected() {
            return getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
        }

        function onPanStart(e) {
            if (running) {
                if (preventActionWhenRunning) { return; } else { onTransitionEnd(); }
            }

            if (autoplay && animating) { stopAutoplayTimer(); }

            panStart = true;
            if (rafIndex) {
                caf(rafIndex);
                rafIndex = null;
            }

            var $$ = getEvent(e);
            events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));

            if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
                preventDefaultBehavior(e);
            }

            lastPosition.x = initPosition.x = $$.clientX;
            lastPosition.y = initPosition.y = $$.clientY;
            if (carousel) {
                translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
                resetDuration(container, '0s');
            }
        }

        function onPanMove(e) {
            if (panStart) {
                var $$ = getEvent(e);
                lastPosition.x = $$.clientX;
                lastPosition.y = $$.clientY;

                if (carousel) {
                    if (!rafIndex) { rafIndex = raf(function () { panUpdate(e); }); }
                } else {
                    if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
                    if (moveDirectionExpected) { preventScroll = true; }
                }

                if (preventScroll) { e.preventDefault(); }
            }
        }

        function panUpdate(e) {
            if (!moveDirectionExpected) {
                panStart = false;
                return;
            }
            caf(rafIndex);
            if (panStart) { rafIndex = raf(function () { panUpdate(e); }); }

            if (moveDirectionExpected === '?') { moveDirectionExpected = getMoveDirectionExpected(); }
            if (moveDirectionExpected) {
                if (!preventScroll && isTouchEvent(e)) { preventScroll = true; }

                try {
                    if (e.type) { events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e)); }
                } catch (err) { }

                var x = translateInit,
                    dist = getDist(lastPosition, initPosition);
                if (!horizontal || fixedWidth || autoWidth) {
                    x += dist;
                    x += 'px';
                } else {
                    var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
                    x += percentageX;
                    x += '%';
                }

                container.style[transformAttr] = transformPrefix + x + transformPostfix;
            }
        }

        function onPanEnd(e) {
            if (panStart) {
                if (rafIndex) {
                    caf(rafIndex);
                    rafIndex = null;
                }
                if (carousel) { resetDuration(container, ''); }
                panStart = false;

                var $$ = getEvent(e);
                lastPosition.x = $$.clientX;
                lastPosition.y = $$.clientY;
                var dist = getDist(lastPosition, initPosition);

                if (Math.abs(dist)) {
                    // drag vs click
                    if (!isTouchEvent(e)) {
                        // prevent "click"
                        var target = getTarget(e);
                        addEvents(target, {
                            'click': function preventClick(e) {
                                preventDefaultBehavior(e);
                                removeEvents(target, { 'click': preventClick });
                            }
                        });
                    }

                    if (carousel) {
                        rafIndex = raf(function () {
                            if (horizontal && !autoWidth) {
                                var indexMoved = - dist * items / (viewport + gutter);
                                indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
                                index += indexMoved;
                            } else {
                                var moved = - (translateInit + dist);
                                if (moved <= 0) {
                                    index = indexMin;
                                } else if (moved >= slidePositions[slideCountNew - 1]) {
                                    index = indexMax;
                                } else {
                                    var i = 0;
                                    while (i < slideCountNew && moved >= slidePositions[i]) {
                                        index = i;
                                        if (moved > slidePositions[i] && dist < 0) { index += 1; }
                                        i++;
                                    }
                                }
                            }

                            render(e, dist);
                            events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
                        });
                    } else {
                        if (moveDirectionExpected) {
                            onControlsClick(e, dist > 0 ? -1 : 1);
                        }
                    }
                }
            }

            // reset
            if (options.preventScrollOnTouch === 'auto') { preventScroll = false; }
            if (swipeAngle) { moveDirectionExpected = '?'; }
            if (autoplay && !animating) { setAutoplayTimer(); }
        }

        // === RESIZE FUNCTIONS === //
        // (slidePositions, index, items) => vertical_conentWrapper.height
        function updateContentWrapperHeight() {
            var wp = middleWrapper ? middleWrapper : innerWrapper;
            wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
        }

        function getPages() {
            var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
            return Math.min(Math.ceil(rough), slideCount);
        }

        /*
         * 1. update visible nav items list
         * 2. add "hidden" attributes to previous visible nav items
         * 3. remove "hidden" attrubutes to new visible nav items
         */
        function updateNavVisibility() {
            if (!nav || navAsThumbnails) { return; }

            if (pages !== pagesCached) {
                var min = pagesCached,
                    max = pages,
                    fn = showElement;

                if (pagesCached > pages) {
                    min = pages;
                    max = pagesCached;
                    fn = hideElement;
                }

                while (min < max) {
                    fn(navItems[min]);
                    min++;
                }

                // cache pages
                pagesCached = pages;
            }
        }

        function info(e) {
            return {
                container: container,
                slideItems: slideItems,
                navContainer: navContainer,
                navItems: navItems,
                controlsContainer: controlsContainer,
                hasControls: hasControls,
                prevButton: prevButton,
                nextButton: nextButton,
                items: items,
                slideBy: slideBy,
                cloneCount: cloneCount,
                slideCount: slideCount,
                slideCountNew: slideCountNew,
                index: index,
                indexCached: indexCached,
                displayIndex: getCurrentSlide(),
                navCurrentIndex: navCurrentIndex,
                navCurrentIndexCached: navCurrentIndexCached,
                pages: pages,
                pagesCached: pagesCached,
                sheet: sheet,
                isOn: isOn,
                event: e || {},
            };
        }

        return {
            version: '2.9.1',
            getInfo: info,
            events: events,
            goTo: goTo,
            play: play,
            pause: pause,
            isOn: isOn,
            updateSliderHeight: updateInnerWrapperHeight,
            refresh: initSliderTransform,
            destroy: destroy,
            rebuild: function () {
                return tns(extend(options, optionsElements));
            }
        };
    };

    return tns;
})();

!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], e) : (t = t || self).tippy = e(t.Popper) }(this, function (t) { "use strict"; t = t && t.hasOwnProperty("default") ? t.default : t; function e() { return (e = Object.assign || function (t) { for (var e = 1; e < arguments.length; e++) { var a = arguments[e]; for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]) } return t }).apply(this, arguments) } var a = "undefined" != typeof window && "undefined" != typeof document, r = a ? navigator.userAgent : "", n = /MSIE |Trident\//.test(r), i = /UCBrowser\//.test(r), o = a && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream, p = { a11y: !0, allowHTML: !0, animateFill: !0, animation: "shift-away", appendTo: function () { return document.body }, aria: "describedby", arrow: !1, arrowType: "sharp", boundary: "scrollParent", content: "", delay: 0, distance: 10, duration: [325, 275], flip: !0, flipBehavior: "flip", flipOnUpdate: !1, followCursor: !1, hideOnClick: !0, ignoreAttributes: !1, inertia: !1, interactive: !1, interactiveBorder: 2, interactiveDebounce: 0, lazy: !0, maxWidth: 350, multiple: !1, offset: 0, onHidden: function () { }, onHide: function () { }, onMount: function () { }, onShow: function () { }, onShown: function () { }, onTrigger: function () { }, placement: "top", popperOptions: {}, role: "tooltip", showOnInit: !1, size: "regular", sticky: !1, target: "", theme: "dark", touch: !0, touchHold: !1, trigger: "mouseenter focus", triggerTarget: null, updateDuration: 0, wait: null, zIndex: 9999 }, s = ["arrow", "arrowType", "boundary", "distance", "flip", "flipBehavior", "flipOnUpdate", "offset", "placement", "popperOptions"], c = a ? Element.prototype : {}, l = c.matches || c.matchesSelector || c.webkitMatchesSelector || c.mozMatchesSelector || c.msMatchesSelector; function d(t) { return [].slice.call(t) } function f(t, e) { return m(t, function (t) { return l.call(t, e) }) } function m(t, e) { for (; t;) { if (e(t)) return t; t = t.parentElement } return null } var u = { passive: !0 }, b = 4, y = "x-placement", v = "x-out-of-boundaries", h = "tippy-iOS", x = "tippy-active", g = "tippy-popper", w = "tippy-tooltip", k = "tippy-content", A = "tippy-backdrop", E = "tippy-arrow", C = "tippy-roundarrow", L = ".".concat(g), X = ".".concat(w), Y = ".".concat(k), T = ".".concat(A), I = ".".concat(E), S = ".".concat(C), O = !1; function z() { O || (O = !0, o && document.body.classList.add(h), window.performance && document.addEventListener("mousemove", H)) } var M = 0; function H() { var t = performance.now(); t - M < 20 && (O = !1, document.removeEventListener("mousemove", H), o || document.body.classList.remove(h)), M = t } function V() { var t = document.activeElement; t && t.blur && t._tippy && t.blur() } var _ = Object.keys(p); function N(t, e) { return {}.hasOwnProperty.call(t, e) } function P(t, e, a) { if (Array.isArray(t)) { var r = t[e]; return null == r ? a : r } return t } function D(t, e) { return 0 === e ? t : function (r) { clearTimeout(a), a = setTimeout(function () { t(r) }, e) }; var a } function q(t, e) { return t && t.modifiers && t.modifiers[e] } function B(t, e) { return t.indexOf(e) > -1 } function F(t) { return t instanceof Element } function j(t) { return !(!t || !N(t, "isVirtual")) || F(t) } function U(t, e) { return "function" == typeof t ? t.apply(null, e) : t } function W(t, e) { t.filter(function (t) { return "flip" === t.name })[0].enabled = e } function R() { return document.createElement("div") } function J(t, e) { t.forEach(function (t) { t && (t.style.transitionDuration = "".concat(e, "ms")) }) } function G(t, e) { t.forEach(function (t) { t && t.setAttribute("data-state", e) }) } function K(t, a) { var r = e({}, a, { content: U(a.content, [t]) }, a.ignoreAttributes ? {} : function (t) { return _.reduce(function (e, a) { var r = (t.getAttribute("data-tippy-".concat(a)) || "").trim(); if (!r) return e; if ("content" === a) e[a] = r; else try { e[a] = JSON.parse(r) } catch (t) { e[a] = r } return e }, {}) }(t)); return (r.arrow || i) && (r.animateFill = !1), r } function Q(t, e) { Object.keys(t).forEach(function (t) { if (!N(e, t)) throw new Error("[tippy]: `".concat(t, "` is not a valid option")) }) } function Z(t, e) { t.innerHTML = F(e) ? e.innerHTML : e } function $$(t, e) { if (F(e.content)) Z(t, ""), t.appendChild(e.content); else if ("function" != typeof e.content) { t[e.allowHTML ? "innerHTML" : "textContent"] = e.content } } function tt(t) { return { tooltip: t.querySelector(X), backdrop: t.querySelector(T), content: t.querySelector(Y), arrow: t.querySelector(I) || t.querySelector(S) } } function et(t) { t.setAttribute("data-inertia", "") } function at(t) { var e = R(); return "round" === t ? (e.className = C, Z(e, '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>')) : e.className = E, e } function rt() { var t = R(); return t.className = A, t.setAttribute("data-state", "hidden"), t } function nt(t, e) { t.setAttribute("tabindex", "-1"), e.setAttribute("data-interactive", "") } function it(t, e, a) { var r = i && void 0 !== document.body.style.webkitTransition ? "webkitTransitionEnd" : "transitionend"; t[e + "EventListener"](r, a) } function ot(t) { var e = t.getAttribute(y); return e ? e.split("-")[0] : "" } function pt(t, e, a) { a.split(" ").forEach(function (a) { t.classList[e](a + "-theme") }) } function st(t, e) { var a = R(); a.className = g, a.id = "tippy-".concat(t), a.style.zIndex = "" + e.zIndex, a.style.position = "absolute", a.style.top = "0", a.style.left = "0", e.role && a.setAttribute("role", e.role); var r = R(); r.className = w, r.style.maxWidth = e.maxWidth + ("number" == typeof e.maxWidth ? "px" : ""), r.setAttribute("data-size", e.size), r.setAttribute("data-animation", e.animation), r.setAttribute("data-state", "hidden"), pt(r, "add", e.theme); var n = R(); return n.className = k, n.setAttribute("data-state", "hidden"), e.interactive && nt(a, r), e.arrow && r.appendChild(at(e.arrowType)), e.animateFill && (r.appendChild(rt()), r.setAttribute("data-animatefill", "")), e.inertia && et(r), $$(n, e), r.appendChild(n), a.appendChild(r), a } function ct(t, e, a) { var r = tt(t), n = r.tooltip, i = r.content, o = r.backdrop, p = r.arrow; t.style.zIndex = "" + a.zIndex, n.setAttribute("data-size", a.size), n.setAttribute("data-animation", a.animation), n.style.maxWidth = a.maxWidth + ("number" == typeof a.maxWidth ? "px" : ""), a.role ? t.setAttribute("role", a.role) : t.removeAttribute("role"), e.content !== a.content && $$(i, a), !e.animateFill && a.animateFill ? (n.appendChild(rt()), n.setAttribute("data-animatefill", "")) : e.animateFill && !a.animateFill && (n.removeChild(o), n.removeAttribute("data-animatefill")), !e.arrow && a.arrow ? n.appendChild(at(a.arrowType)) : e.arrow && !a.arrow && n.removeChild(p), e.arrow && a.arrow && e.arrowType !== a.arrowType && n.replaceChild(at(a.arrowType), p), !e.interactive && a.interactive ? nt(t, n) : e.interactive && !a.interactive && function (t, e) { t.removeAttribute("tabindex"), e.removeAttribute("data-interactive") }(t, n), !e.inertia && a.inertia ? et(n) : e.inertia && !a.inertia && function (t) { t.removeAttribute("data-inertia") }(n), e.theme !== a.theme && (pt(n, "remove", e.theme), pt(n, "add", a.theme)) } var lt = 1, dt = []; function ft(a, r) { var i, o, c, h, g, w = K(a, r); if (!w.multiple && a._tippy) return null; var k, A, E, C, X, Y = !1, T = !1, I = !1, S = !1, z = [], M = D(ht, w.interactiveDebounce), H = lt++, V = st(H, w), _ = tt(V), j = { id: H, reference: a, popper: V, popperChildren: _, popperInstance: null, props: w, state: { isEnabled: !0, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1 }, clearDelayTimeouts: Tt, set: It, setContent: function (t) { It({ content: t }) }, show: St, hide: Ot, enable: function () { j.state.isEnabled = !0 }, disable: function () { j.state.isEnabled = !1 }, destroy: function (t) { if (j.state.isDestroyed) return; T = !0, j.state.isMounted && Ot(0); bt(), delete a._tippy; var e = j.props.target; e && t && F(a) && d(a.querySelectorAll(e)).forEach(function (t) { t._tippy && t._tippy.destroy() }); j.popperInstance && j.popperInstance.destroy(); T = !1, j.state.isDestroyed = !0 } }; return a._tippy = j, V._tippy = j, ut(), w.lazy || Ct(), w.showOnInit && Lt(), !w.a11y || w.target || (!F(X = $$()) || l.call(X, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") && !X.hasAttribute("disabled")) || $$().setAttribute("tabindex", "0"), V.addEventListener("mouseenter", function (t) { j.props.interactive && j.state.isVisible && "mouseenter" === i && Lt(t, !0) }), V.addEventListener("mouseleave", function () { j.props.interactive && "mouseenter" === i && document.addEventListener("mousemove", M) }), j; function R() { document.removeEventListener("mousemove", yt) } function Z() { document.body.removeEventListener("mouseleave", Xt), document.removeEventListener("mousemove", M), dt = dt.filter(function (t) { return t !== M }) } function $$() { return j.props.triggerTarget || a } function et() { document.addEventListener("click", Yt, !0) } function at() { document.removeEventListener("click", Yt, !0) } function rt() { return [j.popperChildren.tooltip, j.popperChildren.backdrop, j.popperChildren.content] } function nt() { var t = j.props.followCursor; return t && "focus" !== i || O && "initial" === t } function pt(t, e) { var a = j.popperChildren.tooltip; function r(t) { t.target === a && (it(a, "remove", r), e()) } if (0 === t) return e(); it(a, "remove", E), it(a, "add", r), E = r } function mt(t, e) { var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; $$().addEventListener(t, e, a), z.push({ eventType: t, handler: e, options: a }) } function ut() { j.props.touchHold && !j.props.target && (mt("touchstart", vt, u), mt("touchend", xt, u)), j.props.trigger.trim().split(" ").forEach(function (t) { if ("manual" !== t) if (j.props.target) switch (t) { case "mouseenter": mt("mouseover", wt), mt("mouseout", kt); break; case "focus": mt("focusin", wt), mt("focusout", kt); break; case "click": mt(t, wt) } else switch (mt(t, vt), t) { case "mouseenter": mt("mouseleave", xt); break; case "focus": mt(n ? "focusout" : "blur", gt) } }) } function bt() { z.forEach(function (t) { var e = t.eventType, a = t.handler, r = t.options; $$().removeEventListener(e, a, r) }), z = [] } function yt(t) { var r = o = t, n = r.clientX, i = r.clientY; if (C) { var p = m(t.target, function (t) { return t === a }), s = a.getBoundingClientRect(), c = j.props.followCursor, l = "horizontal" === c, d = "vertical" === c, f = B(["top", "bottom"], ot(V)), u = V.getAttribute(y), b = !!u && !!u.split("-")[1], v = f ? V.offsetWidth : V.offsetHeight, h = v / 2, x = f ? 0 : b ? v : h, g = f ? b ? v : h : 0; !p && j.props.interactive || (j.popperInstance.reference = e({}, j.popperInstance.reference, { referenceNode: a, clientWidth: 0, clientHeight: 0, getBoundingClientRect: function () { return { width: f ? v : 0, height: f ? 0 : v, top: (l ? s.top : i) - x, bottom: (l ? s.bottom : i) + x, left: (d ? s.left : n) - g, right: (d ? s.right : n) + g } } }), j.popperInstance.update()), "initial" === c && j.state.isVisible && R() } } function vt(t) { j.state.isEnabled && !At(t) && (j.state.isVisible || (i = t.type, t instanceof MouseEvent && (o = t, dt.forEach(function (e) { return e(t) }))), "click" === t.type && !1 !== j.props.hideOnClick && j.state.isVisible ? Xt() : Lt(t)) } function ht(t) { var e = f(t.target, L) === V, r = m(t.target, function (t) { return t === a }); e || r || function (t, e, a, r) { if (!t) return !0; var n = a.clientX, i = a.clientY, o = r.interactiveBorder, p = r.distance, s = e.top - i > ("top" === t ? o + p : o), c = i - e.bottom > ("bottom" === t ? o + p : o), l = e.left - n > ("left" === t ? o + p : o), d = n - e.right > ("right" === t ? o + p : o); return s || c || l || d }(ot(V), V.getBoundingClientRect(), t, j.props) && (Z(), Xt()) } function xt(t) { if (!At(t)) return j.props.interactive ? (document.body.addEventListener("mouseleave", Xt), document.addEventListener("mousemove", M), void dt.push(M)) : void Xt() } function gt(t) { t.target === $$() && (j.props.interactive && t.relatedTarget && V.contains(t.relatedTarget) || Xt()) } function wt(t) { f(t.target, j.props.target) && Lt(t) } function kt(t) { f(t.target, j.props.target) && Xt() } function At(t) { var e = "ontouchstart" in window, a = B(t.type, "touch"), r = j.props.touchHold; return e && O && r && !a || O && !r && a } function Et() { !S && A && (S = !0, function (t) { t.offsetHeight }(V), A()) } function Ct() { var r = j.props.popperOptions, n = j.popperChildren, i = n.tooltip, o = n.arrow, p = q(r, "preventOverflow"); function s(t) { j.props.flip && !j.props.flipOnUpdate && (t.flipped && (j.popperInstance.options.placement = t.placement), W(j.popperInstance.modifiers, !1)), i.setAttribute(y, t.placement), !1 !== t.attributes[v] ? i.setAttribute(v, "") : i.removeAttribute(v), k && k !== t.placement && I && (i.style.transition = "none", requestAnimationFrame(function () { i.style.transition = "" })), k = t.placement, I = j.state.isVisible; var a = ot(V), r = i.style; r.top = r.bottom = r.left = r.right = "", r[a] = -(j.props.distance - 10) + "px"; var n = p && void 0 !== p.padding ? p.padding : b, o = "number" == typeof n, s = e({ top: o ? n : n.top, bottom: o ? n : n.bottom, left: o ? n : n.left, right: o ? n : n.right }, !o && n); s[a] = o ? n + j.props.distance : (n[a] || 0) + j.props.distance, j.popperInstance.modifiers.filter(function (t) { return "preventOverflow" === t.name })[0].padding = s, C = s } var c = e({ eventsEnabled: !1, placement: j.props.placement }, r, { modifiers: e({}, r ? r.modifiers : {}, { preventOverflow: e({ boundariesElement: j.props.boundary, padding: b }, p), arrow: e({ element: o, enabled: !!o }, q(r, "arrow")), flip: e({ enabled: j.props.flip, padding: j.props.distance + b, behavior: j.props.flipBehavior }, q(r, "flip")), offset: e({ offset: j.props.offset }, q(r, "offset")) }), onCreate: function (t) { s(t), Et(), r && r.onCreate && r.onCreate(t) }, onUpdate: function (t) { s(t), Et(), r && r.onUpdate && r.onUpdate(t) } }); j.popperInstance = new t(a, V, c) } function Lt(t, a) { if (Tt(), !j.state.isVisible) { if (j.props.target) return function (t) { if (t) { var a = f(t.target, j.props.target); a && !a._tippy && ft(a, e({}, j.props, { content: U(r.content, [a]), appendTo: r.appendTo, target: "", showOnInit: !0 })) } }(t); if (Y = !0, t && !a && j.props.onTrigger(j, t), j.props.wait) return j.props.wait(j, t); nt() && !j.state.isMounted && (j.popperInstance || Ct(), document.addEventListener("mousemove", yt)), et(); var n = P(j.props.delay, 0, p.delay); n ? c = setTimeout(function () { St() }, n) : St() } } function Xt() { if (Tt(), !j.state.isVisible) return R(), void at(); Y = !1; var t = P(j.props.delay, 1, p.delay); t ? h = setTimeout(function () { j.state.isVisible && Ot() }, t) : g = requestAnimationFrame(function () { Ot() }) } function Yt(t) { if (!j.props.interactive || !V.contains(t.target)) { if ($$().contains(t.target)) { if (O) return; if (j.state.isVisible && B(j.props.trigger, "click")) return } !0 === j.props.hideOnClick && (Tt(), Ot()) } } function Tt() { clearTimeout(c), clearTimeout(h), cancelAnimationFrame(g) } function It(t) { Q(t = t || {}, p), bt(); var r = j.props, n = K(a, e({}, j.props, {}, t, { ignoreAttributes: !0 })); n.ignoreAttributes = N(t, "ignoreAttributes") ? t.ignoreAttributes || !1 : r.ignoreAttributes, j.props = n, ut(), Z(), M = D(ht, n.interactiveDebounce), ct(V, r, n), j.popperChildren = tt(V), j.popperInstance && (s.some(function (e) { return N(t, e) && t[e] !== r[e] }) ? (j.popperInstance.destroy(), Ct(), j.state.isVisible && j.popperInstance.enableEventListeners(), j.props.followCursor && o && yt(o)) : j.popperInstance.update()) } function St() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : P(j.props.duration, 0, p.duration[1]); if (!j.state.isDestroyed && j.state.isEnabled && (!O || j.props.touch) && !$$().hasAttribute("disabled") && !1 !== j.props.onShow(j)) { et(), V.style.visibility = "visible", j.state.isVisible = !0, j.props.interactive && $$().classList.add(x); var e = rt(); J(e.concat(V), 0), A = function () { if (j.state.isVisible) { var r = nt(); r && o ? yt(o) : r || j.popperInstance.update(), j.popperChildren.backdrop && (j.popperChildren.content.style.transitionDelay = Math.round(t / 12) + "ms"), j.props.sticky && function () { J([V], n ? 0 : j.props.updateDuration); var t = a.getBoundingClientRect(); !function e() { var r = a.getBoundingClientRect(); t.top === r.top && t.right === r.right && t.bottom === r.bottom && t.left === r.left || j.popperInstance.scheduleUpdate(), t = r, j.state.isMounted && requestAnimationFrame(e) }() }(), J([V], j.props.updateDuration), J(e, t), G(e, "visible"), function (t, e) { pt(t, e) }(t, function () { j.props.aria && $$().setAttribute("aria-".concat(j.props.aria), V.id), j.props.onShown(j), j.state.isShown = !0 }) } }, function () { S = !1; var t = nt(); j.popperInstance ? (W(j.popperInstance.modifiers, j.props.flip), t || (j.popperInstance.reference = a, j.popperInstance.enableEventListeners()), j.popperInstance.scheduleUpdate()) : (Ct(), t || j.popperInstance.enableEventListeners()); var e = j.props.appendTo, r = "parent" === e ? a.parentNode : U(e, [a]); r.contains(V) || (r.appendChild(V), j.props.onMount(j), j.state.isMounted = !0) }() } } function Ot() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : P(j.props.duration, 1, p.duration[1]); if (!j.state.isDestroyed && (j.state.isEnabled || T) && (!1 !== j.props.onHide(j) || T)) { at(), V.style.visibility = "hidden", j.state.isVisible = !1, j.state.isShown = !1, I = !1, j.props.interactive && $$().classList.remove(x); var e = rt(); J(e, t), G(e, "hidden"), function (t, e) { pt(t, function () { !j.state.isVisible && V.parentNode && V.parentNode.contains(V) && e() }) }(t, function () { Y || R(), j.props.aria && $$().removeAttribute("aria-".concat(j.props.aria)), j.popperInstance.disableEventListeners(), j.popperInstance.options.placement = j.props.placement, V.parentNode.removeChild(V), j.props.onHidden(j), j.state.isMounted = !1 }) } } } var mt = !1; function ut(t, a) { Q(a || {}, p), mt || (document.addEventListener("touchstart", z, u), window.addEventListener("blur", V), mt = !0); var r, n = e({}, p, {}, a); r = t, "[object Object]" !== {}.toString.call(r) || r.addEventListener || function (t) { var e = { isVirtual: !0, attributes: t.attributes || {}, contains: function () { }, setAttribute: function (e, a) { t.attributes[e] = a }, getAttribute: function (e) { return t.attributes[e] }, removeAttribute: function (e) { delete t.attributes[e] }, hasAttribute: function (e) { return e in t.attributes }, addEventListener: function () { }, removeEventListener: function () { }, classList: { classNames: {}, add: function (e) { t.classList.classNames[e] = !0 }, remove: function (e) { delete t.classList.classNames[e] }, contains: function (e) { return e in t.classList.classNames } } }; for (var a in e) t[a] = e[a] }(t); var i = function (t) { if (j(t)) return [t]; if (t instanceof NodeList) return d(t); if (Array.isArray(t)) return t; try { return d(document.querySelectorAll(t)) } catch (t) { return [] } }(t).reduce(function (t, e) { var a = e && ft(e, n); return a && t.push(a), t }, []); return j(t) ? i[0] : i } return ut.version = "4.3.5", ut.defaults = p, ut.setDefaults = function (t) { Object.keys(t).forEach(function (e) { p[e] = t[e] }) }, ut.hideAll = function () { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.exclude, a = t.duration; d(document.querySelectorAll(L)).forEach(function (t) { var r, n = t._tippy; if (n) { var i = !1; e && (i = (r = e)._tippy && !l.call(r, L) ? n.reference === e : t === e.popper), i || n.hide(a) } }) }, ut.group = function (t) { var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = a.delay, n = void 0 === r ? t[0].props.delay : r, i = a.duration, o = void 0 === i ? 0 : i, p = !1; function s(t) { p = t, f() } function c(e) { e._originalProps.onShow(e), t.forEach(function (t) { t.set({ duration: o }), t.state.isVisible && t.hide() }), s(!0) } function l(t) { t._originalProps.onHide(t), s(!1) } function d(t) { t._originalProps.onShown(t), t.set({ duration: t._originalProps.duration }) } function f() { t.forEach(function (t) { t.set({ onShow: c, onShown: d, onHide: l, delay: p ? [0, Array.isArray(n) ? n[1] : n] : n, duration: p ? o : t._originalProps.duration }) }) } t.forEach(function (t) { t._originalProps ? t.set(t._originalProps) : t._originalProps = e({}, t.props) }), f() }, a && setTimeout(function () { d(document.querySelectorAll("[data-tippy]")).forEach(function (t) { var e = t.getAttribute("data-tippy"); e && ut(t, { content: e }) }) }), function (t) { if (a) { var e = document.createElement("style"); e.type = "text/css", e.textContent = t, e.setAttribute("data-tippy-stylesheet", ""); var r = document.head, n = r.querySelector("style,link"); n ? r.insertBefore(e, n) : r.appendChild(e) } }('.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{transition-timing-function:cubic-bezier(.165,.84,.44,1);max-width:calc(100% - 8px);pointer-events:none;outline:0}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-7px;bottom:-6.5px;-webkit-transform-origin:50% 0;transform-origin:50% 0;margin:0 3px}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 3px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(-10px);transform:perspective(700px) translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateX(60deg);transform:perspective(700px) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=top] [data-animation=scale]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px) scale(.5);transform:translateY(-10px) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-7px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;margin:0 3px}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 3px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(10px);transform:perspective(700px) translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateX(-60deg);transform:perspective(700px) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=scale]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px) scale(.5);transform:translateY(10px) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-12px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%;margin:3px 0}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(-10px);transform:perspective(700px) translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateY(-60deg);transform:perspective(700px) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=left] [data-animation=scale]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px) scale(.5);transform:translateX(-10px) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-12px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%;margin:3px 0}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(10px);transform:perspective(700px) translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateY(60deg);transform:perspective(700px) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=right] [data-animation=scale]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px) scale(.5);transform:translateX(10px) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;padding:.3125rem .5625rem;line-height:1.4;text-align:center;background-color:#333}.tippy-tooltip[data-size=small]{padding:.1875rem .375rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.375rem .75rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:initial}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] .tippy-roundarrow path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:18px;height:7px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}'), ut });
//# sourceMappingURL=index.all.min.js.map

(function (factory) {

    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define([], factory);

    } else if (typeof exports === 'object') {

        // Node/CommonJS
        module.exports = factory();

    } else {

        // Browser globals
        window.wNumb = factory();
    }

}(function () {

    'use strict';

    var FormatOptions = [
        'decimals',
        'thousand',
        'mark',
        'prefix',
        'suffix',
        'encoder',
        'decoder',
        'negativeBefore',
        'negative',
        'edit',
        'undo'
    ];

    // General

    // Reverse a string
    function strReverse(a) {
        return a.split('').reverse().join('');
    }

    // Check if a string starts with a specified prefix.
    function strStartsWith(input, match) {
        return input.substring(0, match.length) === match;
    }

    // Check is a string ends in a specified suffix.
    function strEndsWith(input, match) {
        return input.slice(-1 * match.length) === match;
    }

    // Throw an error if formatting options are incompatible.
    function throwEqualError(F, a, b) {
        if ((F[a] || F[b]) && (F[a] === F[b])) {
            throw new Error(a);
        }
    }

    // Check if a number is finite and not NaN
    function isValidNumber(input) {
        return typeof input === 'number' && isFinite(input);
    }

    // Provide rounding-accurate toFixed method.
    // Borrowed: http://stackoverflow.com/a/21323330/775265
    function toFixed(value, exp) {
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
        value = value.toString().split('e');
        return (+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp))).toFixed(exp);
    }


    // Formatting

    // Accept a number as input, output formatted string.
    function formatTo(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {

        var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

        // Apply user encoder to the input.
        // Expected outcome: number.
        if (encoder) {
            input = encoder(input);
        }

        // Stop if no valid number was provided, the number is infinite or NaN.
        if (!isValidNumber(input)) {
            return false;
        }

        // Rounding away decimals might cause a value of -0
        // when using very small ranges. Remove those cases.
        if (decimals !== false && parseFloat(input.toFixed(decimals)) === 0) {
            input = 0;
        }

        // Formatting is done on absolute numbers,
        // decorated by an optional negative symbol.
        if (input < 0) {
            inputIsNegative = true;
            input = Math.abs(input);
        }

        // Reduce the number of decimals to the specified option.
        if (decimals !== false) {
            input = toFixed(input, decimals);
        }

        // Transform the number into a string, so it can be split.
        input = input.toString();

        // Break the number on the decimal separator.
        if (input.indexOf('.') !== -1) {
            inputPieces = input.split('.');

            inputBase = inputPieces[0];

            if (mark) {
                inputDecimals = mark + inputPieces[1];
            }

        } else {

            // If it isn't split, the entire number will do.
            inputBase = input;
        }

        // Group numbers in sets of three.
        if (thousand) {
            inputBase = strReverse(inputBase).match(/.{1,3}/g);
            inputBase = strReverse(inputBase.join(strReverse(thousand)));
        }

        // If the number is negative, prefix with negation symbol.
        if (inputIsNegative && negativeBefore) {
            output += negativeBefore;
        }

        // Prefix the number
        if (prefix) {
            output += prefix;
        }

        // Normal negative option comes after the prefix. Defaults to '-'.
        if (inputIsNegative && negative) {
            output += negative;
        }

        // Append the actual number.
        output += inputBase;
        output += inputDecimals;

        // Apply the suffix.
        if (suffix) {
            output += suffix;
        }

        // Run the output through a user-specified post-formatter.
        if (edit) {
            output = edit(output, originalInput);
        }

        // All done.
        return output;
    }

    // Accept a sting as input, output decoded number.
    function formatFrom(decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input) {

        var originalInput = input, inputIsNegative, output = '';

        // User defined pre-decoder. Result must be a non empty string.
        if (undo) {
            input = undo(input);
        }

        // Test the input. Can't be empty.
        if (!input || typeof input !== 'string') {
            return false;
        }

        // If the string starts with the negativeBefore value: remove it.
        // Remember is was there, the number is negative.
        if (negativeBefore && strStartsWith(input, negativeBefore)) {
            input = input.replace(negativeBefore, '');
            inputIsNegative = true;
        }

        // Repeat the same procedure for the prefix.
        if (prefix && strStartsWith(input, prefix)) {
            input = input.replace(prefix, '');
        }

        // And again for negative.
        if (negative && strStartsWith(input, negative)) {
            input = input.replace(negative, '');
            inputIsNegative = true;
        }

        // Remove the suffix.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
        if (suffix && strEndsWith(input, suffix)) {
            input = input.slice(0, -1 * suffix.length);
        }

        // Remove the thousand grouping.
        if (thousand) {
            input = input.split(thousand).join('');
        }

        // Set the decimal separator back to period.
        if (mark) {
            input = input.replace(mark, '.');
        }

        // Prepend the negative symbol.
        if (inputIsNegative) {
            output += '-';
        }

        // Add the number
        output += input;

        // Trim all non-numeric characters (allow '.' and '-');
        output = output.replace(/[^0-9\.\-.]/g, '');

        // The value contains no parse-able number.
        if (output === '') {
            return false;
        }

        // Covert to number.
        output = Number(output);

        // Run the user-specified post-decoder.
        if (decoder) {
            output = decoder(output);
        }

        // Check is the output is valid, otherwise: return false.
        if (!isValidNumber(output)) {
            return false;
        }

        return output;
    }


    // Framework

    // Validate formatting options
    function validate(inputOptions) {

        var i, optionName, optionValue,
            filteredOptions = {};

        if (inputOptions['suffix'] === undefined) {
            inputOptions['suffix'] = inputOptions['postfix'];
        }

        for (i = 0; i < FormatOptions.length; i += 1) {

            optionName = FormatOptions[i];
            optionValue = inputOptions[optionName];

            if (optionValue === undefined) {

                // Only default if negativeBefore isn't set.
                if (optionName === 'negative' && !filteredOptions.negativeBefore) {
                    filteredOptions[optionName] = '-';
                    // Don't set a default for mark when 'thousand' is set.
                } else if (optionName === 'mark' && filteredOptions.thousand !== '.') {
                    filteredOptions[optionName] = '.';
                } else {
                    filteredOptions[optionName] = false;
                }

                // Floating points in JS are stable up to 7 decimals.
            } else if (optionName === 'decimals') {
                if (optionValue >= 0 && optionValue < 8) {
                    filteredOptions[optionName] = optionValue;
                } else {
                    throw new Error(optionName);
                }

                // These options, when provided, must be functions.
            } else if (optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo') {
                if (typeof optionValue === 'function') {
                    filteredOptions[optionName] = optionValue;
                } else {
                    throw new Error(optionName);
                }

                // Other options are strings.
            } else {

                if (typeof optionValue === 'string') {
                    filteredOptions[optionName] = optionValue;
                } else {
                    throw new Error(optionName);
                }
            }
        }

        // Some values can't be extracted from a
        // string if certain combinations are present.
        throwEqualError(filteredOptions, 'mark', 'thousand');
        throwEqualError(filteredOptions, 'prefix', 'negative');
        throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

        return filteredOptions;
    }

    // Pass all options as function arguments
    function passAll(options, method, input) {
        var i, args = [];

        // Add all options in order of FormatOptions
        for (i = 0; i < FormatOptions.length; i += 1) {
            args.push(options[FormatOptions[i]]);
        }

        // Append the input, then call the method, presenting all
        // options as arguments.
        args.push(input);
        return method.apply('', args);
    }

    function wNumb(options) {

        if (!(this instanceof wNumb)) {
            return new wNumb(options);
        }

        if (typeof options !== "object") {
            return;
        }

        options = validate(options);

        // Call 'formatTo' with proper arguments.
        this.to = function (input) {
            return passAll(options, formatTo, input);
        };

        // Call 'formatFrom' with proper arguments.
        this.from = function (input) {
            return passAll(options, formatFrom, input);
        };
    }

    return wNumb;

}));