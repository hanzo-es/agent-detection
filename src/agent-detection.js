(function (window, undefined) {

  'use strict';

  var AgentDetection = function (uaContent) {

    var ua = uaContent || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : '');

    if (!(this instanceof AgentDetection)) {
      return new AgentDetection(uaContent);
    }


    //////////////////
    // PRIVATE METHODS& PROPS
    //////////////////

    //returns ua filtered
    var isUA = function(text) {
      return ua.toLowerCase().indexOf(text) > -1;
    };


    //////////////////
    // PUBLIC METHODS
    //////////////////

    // public ua accesor
    this.getUA = function () {
      return ua;
    };

    // public set for testing purposes
    this.setUA = function (uaContent) {
      ua = uaContent;
      return this;
    };


    //////////////////
    // DETECTORS
    //////////////////

    // is touch device (has touch functionalities)
    this.isTouch = function() {
      //console.log(window);
      return ('ontouchstart' in window);
    },

    // Old Android
    this.isLegacyAndroid = function() {
      return isUA('android 1') ||
             isUA('android 2') ||
             isUA('android 3') ||
             isUA('android 4');
    },

    // Android
    this.isAndroid = function() {
      return isUA('android') && !this.isLegacyAndroid();
    },

    // Old IOS
    this.isLegacyIOS = function() {
      return isUA('iphone os 4') || isUA('cpu os 4') ||
             isUA('iphone os 5') || isUA('cpu os 5') ||
             isUA('iphone os 6') || isUA('cpu os 6') ||
             isUA('iphone os 7') || isUA('cpu os 7');
    },

    // IOS
    this.isIOS = function() {
      return (isUA('iphone os') || isUA('cpu os')) && !this.isLegacyIOS();
    },

    // Old touch
    this.isLegacyTouch = function() {
      return  this.isLegacyAndroid() || this.isLegacyIOS();
    },

    // Internet Explorer Mobile
    this.isMobileIE = function() {
      return isUA('iemobile');
    },

    // Internet Explorer 8
    this.isIE8 = function() {
      return isUA('trident/4') && !this.isMobileIE();
    },

    // Internet Explorer 9
    this.isIE9 = function() {
      return isUA('trident/5') && !this.isMSIE10() && !this.isMobileIE();
    },

    // Internet Explorer 10 mobile
    this.isMSIE10 = function() {
      return isUA('msie 10');
    },

    // Internet Explorer 10 Desktop
    this.isIE10 = function() {
      return isUA('trident/6') || this.isMSIE10() && !this.isMobileIE();
    },

    // Internet Explorer 11
    this.isIE11 = function() {
      return isUA('trident/7') && !this.isMobileIE();
    },

    // Internet Explorer 6-11
    this.isIE = function() {
      return false || !!document.documentMode;
    },

    // Edge 20+
    this.isIEEdge = function() {
      return !this.isIE() && !!window.StyleMedia;
    },

    // Windows environement
    this.isWindows = function() {
      return isUA('windows');
    },

    // Firefox 1.0+
    this.isFirefox = function() {
      return typeof window.InstallTrigger !== 'undefined';
    },

    // Opera 8.0+
    this.isOpera = function() {
      return (!!window.opr && !!window.opr.addons) || !!window.opera || isUA(' OPR/');
    },

    // Chrome on IOS
    this.isIOSChrome = function() {
      return isUA('crios');
    },

    this.isChrome = function() {
      return !!window.chrome && !!window.chrome.webstore;
    },

    // Safari 3.0+ '[object HTMLElementConstructor]'
    this.isSafari = function() {
      return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
      (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window.safari || window.safari.pushNotification);
    },

    // This clunky regex is taken directly from http://detectmobilebrowsers.com/
    this.isMobile = function() {
      var stringCheck = (navigator.userAgent||navigator.vendor||window.opera) || '';
      return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(stringCheck) ||
             /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(stringCheck.substr(0,4));
    },

    // Check for current user agent and adds the css class to HTML DOM tag
    this.getClasses = function() {
      var buffer = '';
      var UA = {
        'ua-touch'          : this.isTouch(),
        'ua-no-touch'       : !this.isTouch(),
        'ua-legacy-android' : this.isLegacyAndroid(),
        'ua-android'        : this.isAndroid(),
        'ua-legacy-ios'     : this.isLegacyIOS(),
        'ua-ios'            : this.isIOS(),
        'ua-legacy-touch'   : this.isLegacyTouch(),
        'ua-mobile-ie'      : this.isMobileIE(),
        'ua-ie8'            : this.isIE8(),
        'ua-ie9'            : this.isIE9(),
        'ua-ie10'           : this.isIE10(),
        'ua-msie10'         : this.isMSIE10(),
        'ua-ie11'           : this.isIE11(),
        'ua-ie'             : this.isIE(),
        'ua-windows'        : this.isWindows(),
        'ua-firefox'        : this.isFirefox(),
        'ua-opera'          : this.isOpera(),
        'ua-ie-edge'        : this.isIEEdge(),
        'ua-ios-chrome'     : this.isIOSChrome(),
        'ua-chrome'         : this.isChrome(),
        'ua-safari'         : this.isSafari(),
        'ua-mobile'         : this.isMobile()
      };
      for (var ua in UA) {
        if (UA.hasOwnProperty(ua) && UA[ua]) {
          buffer += ' '+ua+' ';
        }
      }
      return buffer;
    }

    this.addClasses = function () {
      document.documentElement.className += this.getClasses();
    }

    return this;

  };


  //////////////////
  // EXPORT BY ENVIRONMENT
  //////////////////

  // detect js environment for class content export
  if (typeof(exports) !== 'undefined') {
    // nodejs environement
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = AgentDetection;
    }
    exports.AgentDetection = AgentDetection;
  } else {
    // requirejs environement
    if (typeof(define) === 'function' && define.amd) {
      // use define for export
      define(function () {
        return AgentDetection;
      });
    } else {
      // browser environement (default)
      window.AgentDetection = AgentDetection;
    }
  }

})(typeof window === 'object' ? window : this);
