var assert = require('assert');
var jsdom = require('jsdom-global')();
var path = require('path');
var AgentDetection, agentDetection, w;

var AGENT_DETECTION_REL_PATH = './../src/agent-detection';


//SIMULATE PROPS

// {
//   userAgent : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
// };

//REAL USERAGENTLIST FROM https://www.whatismybrowser.com/developers/tools/user-agent-parser/browse
var userAgentList = [
  {
    uaList : [
      'Mozilla/5.0 (Linux; U; Android 1.6; ar-us; SonyEricssonX10i Build/R2BA026) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
    ],
    testingFunction : 'isLegacyAndroid',
    testingClass: 'ua-legacy-android'
  },
  {
    uaList : [
      'Mozilla/5.0 (Linux; Android 7.0; Pixel C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36',
    ],
    testingFunction : 'isAndroid',
    testingClass: 'ua-android'
  },
  /*
  {
    uaList : [
      'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
    ],
    testingFunction : 'isLegacyIOS',
    testingClass: 'ua-legacy-ios'
  },
  {
    uaList : [
      'Mozilla/5.0 (iPad; CPU OS 8_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)',
    ],
    testingFunction : 'isIOS',
    testingClass: 'ua-ios'
  },
  {
    uaList : [
      'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
      'Mozilla/5.0 (Linux; U; Android 1.6; ar-us; SonyEricssonX10i Build/R2BA026) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
    ],
    testingFunction : 'isLegacyTouch',
    testingClass: 'ua-legacy-touch'
  },
  {
    uaList : [
      'Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 630) like Gecko',
    ],
    testingFunction : 'isMobileIE',
    testingClass: 'ua-mobile-ie'
  },
  {
    uaList : [
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; CognosRCP)',
    ],
    testingFunction : 'isIE8',
    testingClass: 'ua-ie8'
  },
  {
    uaList : [
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; SiteKiosk 7.8 Build 328)',
    ],
    testingFunction : 'isIE9',
    testingClass: 'ua-ie9'
  },
  {
    uaList : [
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch; MALNJS)',
    ],
    testingFunction : 'isIE10',
    testingClass: 'ua-ie10'
  },
  {
    uaList : [
      'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; TNJB; rv:11.0) like Gecko',
    ],
    testingFunction : 'isIE11',
    testingClass: 'ua-ie11'
  },
  {
    uaList : [
      'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; TNJB; rv:11.0) like Gecko',
    ],
    testingFunction : 'isWindows',
    testingClass: 'ua-windows'
  },*/
];

nonUserAgentList = [
  {
    testingFunction : 'isIE',
    testingClass: 'ua-ie'

  },
  {
    testingFunction : 'isIEEdge',
    testingClass: 'ua-ie-edge'
  },
  {
    testingFunction : 'isFirefox',
    testingClass: 'ua-firefox'
  },
];

var setup = function() {
  this.jsdom = require('jsdom-global')();
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
    // function(){/* no opp*/};
    assert.equal(true, agentDetection.isTouch());
  });

  it ('should have the class ua-touch for isTouch()', function () {
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-touch'));
  });

});

describe('Test the !isTouch()', function () {
  // before (function () {
  //   console.log("!!!",window.ontouchstart);
  //   //window = {};
  //   console.log("!!!",window.ontouchstart);
  // });
  // before (function () {
  //   console.log("!!!",window.ontouchstart);
  //   delete window.ontouchstart;
  //   window = {};
  //   console.log("!!!",window.ontouchstart);
  // });

  beforeEach(function () {
    setup.call(this);
  });


  afterEach(function () {
    teardown.call(this);
  });

  it ('should return false for isTouch() when no touchstart', function () {
    console.log('ontouchstart' in window, agentDetection.isTouch());
    assert.equal(false, agentDetection.isTouch());
  });

  it ('should have the class ua-no-touch for isTouch()', function () {
    console.log(agentDetection.getClasses());
    assert.notEqual(-1, agentDetection.getClasses().indexOf('ua-no-touch'));
  });
});


/*
describe('Test the isUA (userAgent based) functions', function () {

  for (var i=0; i<userAgentList.length;i++) {
    var uaTest = userAgentList[i];
    var uaList = uaTest.uaList;

    if (uaList.length>0){
      for (var j=0;j<uaList.length;j++) {
        var currentUA = uaList[j];
        agentDetection.setUA(currentUA);

        it('should return true for ' + uaTest.testingFunction + '  on: ' + agentDetection.getUA() , function() {
          assert.equal(true , agentDetection[uaTest.testingFunction]() );
        });

        it('should add the class \"' + uaTest.testingClass + '\"', function() {
          assert.notEqual(-1, agentDetection.getClasses().indexOf(uaTest.testingClass) );
        });
      }
    }
  }
});


describe('Test the isUA (nonUserAgent based) functions', function () {
  for (var i=0; i<nonUserAgentList.length;i++) {
    var uaTest = nonUserAgentList[i];
    //agentDetection.setUA("!");
    it('should return true for ' + uaTest.testingFunction, function () {
      assert.equal(true, agentDetection[uaTest.testingFunction]());
    });

    it('should add the class \"' + uaTest.testingClass + '\"', function() {
      assert.notEqual(-1, agentDetection.getClasses().indexOf(uaTest.testingClass) );
   });
  }
});
*/
