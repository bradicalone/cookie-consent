"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cookieStorage = {
  getItem: function getItem(key) {
    var cookies = document.cookie.split(';').map(function (cookie) {
      return cookie.split('=');
    }).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key.trim(), value));
    }, {});
    return cookies[key];
  },
  setItem: function setItem(key, value) {
    document.cookie = "".concat(key, "=").concat(value);
  }
};

var showPopUp = function showPopUp() {
  var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var cookiePopUp = document.querySelector('.c-cookie');
  var style = cookiePopUp.style.transform;

  if (!style || show) {
    cookiePopUp.style.transform = "translate3d(".concat(0, "px, 0,0)");
  } else {
    cookiePopUp.removeAttribute('style');
  }
};

var cookieConsent = function cookieConsent() {
  var storageType = cookieStorage;
  var consentPropertyName = 'amasa_consent';

  var shouldShowPopup = function shouldShowPopup() {
    return !storageType.getItem(consentPropertyName);
  };

  var saveToStorage = function saveToStorage() {
    return storageType.setItem(consentPropertyName, true);
  };

  if (shouldShowPopup()) {
    showPopUp(true);
  }

  document.querySelectorAll('.select-ok, .select-privacy-policy, .policy-content-close').forEach(function (btn) {
    btn.onclick = function (e) {
      var className = e.target.className;

      if (className !== 'select-ok') {
        return privacyPolicy.showPrivacyPolicy();
      }

      saveToStorage(); // Add consent true to cookie

      showPopUp(); // Close popup

      privacyPolicy.showPrivacyPolicy(true); // Closes privacy content only if opened (true)
    };
  });
  if (window.innerWidth <= 530) window.onresize = function () {
    return privacyPolicy.startStyles();
  };
};

var privacyPolicy = {
  wrapper: document.querySelector('.content-translate'),
  showPrivacyPolicy: function showPrivacyPolicy() {
    var close = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var transformed = this.wrapper.style.transform;

    if (transformed == 'translate3d(0px, 0px, 0px)' || close) {
      return this.wrapper.style.transform = "translate3d(0px, ".concat(this.getHeight(), "px, 0)"); // Hide Privacy  
    }

    privacyPolicy.wrapper.style.transform = "translate3d(0px, ".concat(0, "px, 0)"); // Show Privacy
  },
  getHeight: function getHeight() {
    return document.querySelector('.policy-content').getBoundingClientRect().height - 15;
  },
  startStyles: function startStyles(callback) {
    var height = privacyPolicy.getHeight();
    privacyPolicy.wrapper.style.transform = "translate3d(0px, ".concat(height, "px, 0)");
    if (callback) setTimeout(function () {
      return callback();
    }, 3000);
  }
};

window.onload = function () {
  privacyPolicy.startStyles(cookieConsent);
};

document.querySelector('.show-cookie').onclick = function (e) {
  return showPopUp();
};
