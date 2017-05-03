var assert = require('assert');
var jsdom = require('jsdom-global')();
var path = require('path');
var AgentDetection, agentDetection, w;

var AGENT_DETECTION_REL_PATH = './../src/agent-detection';

var setup = function(userAgent) {
  this.jsdom = require('jsdom-global')('', {
    userAgent: userAgent,
  });
  AgentDetection  = require(AGENT_DETECTION_REL_PATH);
  agentDetection = new AgentDetection();
};

var teardown = function() {
  this.jsdom();
  var modulePath = path.resolve(__dirname, AGENT_DETECTION_REL_PATH);
  agentDetection = null;
  AgentDetection = null;
  delete require.cache[modulePath + '.js'];
};

describe('Test the isTouch()', function () {
  beforeEach(function () {
    setup.call(this);
    window.ontouchstart = true;
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isTouch() when has touchstart', function () {
    assert.equal(true, agentDetection.isTouch());
  });

  it ('should have the class ua-touch for isTouch()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-touch'));
  });

});

describe('Test the !isTouch()', function () {
  beforeEach(function () {
    setup.call(this);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return false for isTouch() when no touchstart', function () {
    assert.equal(false, agentDetection.isTouch());
  });

  it ('should have the class ua-no-touch for isTouch()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-no-touch'));
  });
});


describe('Test the isLegacyAndroid()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (Linux; U; Android 1.6; ar-us; SonyEricssonX10i Build/R2BA026) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1';
    setup.call(this,ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isLegacyAndroid()', function () {
    assert.equal(true, agentDetection.isLegacyAndroid());
  });

  it ('should have the class ua-legacy-android for isLegacyAndroid()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-legacy-android'));
  });
});

// Android
describe('Test the isAndroid()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isAndroid()', function () {
    assert.equal(true, agentDetection.isAndroid());
  });

  it ('should have the class ua-android for isAndroid()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-android'));
  });
});

// Old IOS
describe('Test the isLegacyIOS()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isLegacyIOS()', function () {
    assert.equal(true, agentDetection.isLegacyIOS());
  });

  it ('should have the class ua-legacy-ios for isLegacyIOS()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-legacy-ios'));
  });
});

// IOS
describe('Test the isIOS()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (iPad; CPU OS 8_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIOS()', function () {
    assert.equal(true, agentDetection.isIOS());
  });

  it ('should have the class ua-ios for isIOS()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ios'));
  });
});

// Old touch
describe('Test the isLegacyTouch()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (Linux; U; Android 1.6; ar-us; SonyEricssonX10i Build/R2BA026) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isLegacyTouch()', function () {
    assert.equal(true, agentDetection.isLegacyTouch());
  });

  it ('should have the class ua-legacy-touch for isLegacyTouch()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-legacy-touch'));
  });
});

// Internet Explorer Mobile
describe('Test the isMobileIE()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 630) like Gecko';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isMobileIE()', function () {
    assert.equal(true, agentDetection.isMobileIE());
  });

  it ('should have the class ua-mobile-ie for isMobileIE()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-mobile-ie'));
  });
});

// Internet Explorer 8
describe('Test the isIE8()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; CognosRCP)';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIE8()', function () {
    assert.equal(true, agentDetection.isIE8());
  });

  it ('should have the class ua-ie8 for isIE8()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ie8'));
  });
});

// Internet Explorer 9
describe('Test the isIE9()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; SiteKiosk 7.8 Build 328)';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIE9()', function () {
    assert.equal(true, agentDetection.isIE9());
  });

  it ('should have the class ua-ie9 for isIE9()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ie9'));
  });
});


// Internet Explorer 10 mobile
describe('Test the isMSIE10()',function() {
  beforeEach(function () {
   var ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for ()', function () {
    assert.equal(true, agentDetection.isMSIE10());
  });

  it ('should have the class ua-msie10 for is()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-msie10'));
  });
});

// Internet Explorer 10 Desktop
describe('Test the isIE10()',function() {
  beforeEach(function () {
  var ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch; MALNJS)';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIE10()', function () {
    assert.equal(true, agentDetection.isIE10());
  });

  it ('should have the class ua-ie10 for isIE10()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ie10'));
  });
});

// Internet Explorer 11
describe('Test the isIE11()',function() {
  beforeEach(function () {
  var ua = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; TNJB; rv:11.0) like Gecko';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIE11()', function () {
    assert.equal(true, agentDetection.isIE11());
  });

  it ('should have the class ua-ie11 for isIE11()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ie11'));
  });
});

// Internet Explorer 6-11
describe('Test the isIE()',function() {
  beforeEach(function () {
    setup.call(this);
    document.documentMode = true;
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIE()', function () {
    assert.equal(true, agentDetection.isIE());
  });

  it ('should have the class ua-ie for is()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ie'));
  });
});


// Edge 20+
describe('Test the isIEEdge()',function() {
  beforeEach(function () {
    setup.call(this);
    window.StyleMedia = {};
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIEEdge()', function () {
    assert.equal(true, agentDetection.isIEEdge());
  });

  it ('should have the class ua-ie-edge for isIEEdge()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ie-edge'));
  });
});


// Windows environement
describe('Test the isWindows()',function() {
  beforeEach(function () {
  var ua = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; TNJB; rv:11.0) like Gecko';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isWindows()', function () {
    assert.equal(true, agentDetection.isWindows());
  });

  it ('should have the class ua-windows for isWindows()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-windows'));
  });
});

// Firefox 1.0+
describe('Test the isFirefox()',function() {
  beforeEach(function () {
    setup.call(this);
    window.InstallTrigger = {};
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isFirefox()', function () {
    assert.equal(true, agentDetection.isFirefox());
  });

  it ('should have the class ua-opera for isFirefox()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-firefox'));
  });
});

// Opera 8.0+
describe('Test the isOpera()',function() {
  beforeEach(function () {
  var ua = 'Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16';
    setup.call(this, ua);
    window.opr = {
      addons : {}
    };
    window.opera = {};
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isOpera()', function () {
    assert.equal(true, agentDetection.isOpera());
  });

  it ('should have the class ua-opera for isOpera()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-opera'));
  });
});


// Chrome on IOS
describe('Test the isIOSChrome()',function() {
  beforeEach(function () {
  var ua = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3';
    setup.call(this, ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isIOSChrome()', function () {
    assert.equal(true, agentDetection.isIOSChrome());
  });

  it ('should have the class ua-ios-chrome for isIOSChrome()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-ios-chrome'));
  });
});

describe('Test the isChrome()',function() {
  beforeEach(function () {
    setup.call(this);
    window.chrome = {
      webstore : {}
    };
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isChrome()', function () {
    assert.equal(true, agentDetection.isChrome());
  });

  it ('should have the class ua-chrome for isChrome()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-chrome'));
  });
});

// Safari 3.0+ '[object HTMLElementConstructor]'
describe('Test the isSafari()',function() {
  beforeEach(function () {
    setup.call(this);

    var toString = function (){ return '[object SafariRemoteNotification]' };
    window.safari = {
      toString: toString,
      pushNotification : {
        toString: toString
      }
    };
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isSafari()', function () {
    assert.equal(true, agentDetection.isSafari());
  });

  it ('should have the class ua-safari for isSafari()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-safari'));
  });
});

// This clunky regex is taken directly from http://detectmobilebrowsers.com/
describe('Test the isMobile()',function() {
  beforeEach(function () {
    var ua = 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+';
    setup.call(this,ua);
  });

  afterEach(function () {
    teardown.call(this);
  });

  it ('should return true for isMobile()', function () {
    assert.equal(true, agentDetection.isMobile());
  });

  it ('should have the class ua-mobile for isMobile()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-mobile'));
  });
});
