var assert = require('assert');
var AgentDetection  = require('./../src/agent-detection');
var agentDetection = new AgentDetection();

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
  },
];


describe('Test the isUA (userAgent based) functions', function () {

  for (var i=0; i<userAgentList.length;i++) {
    var uaTest = userAgentList[i];
    var uaList = uaTest.uaList;

    for (var j=0;j<uaList.length;j++) {
      var currentUA = uaList[j];
      agentDetection.setUA(currentUA);

      it('should return true for ' + uaTest.testingFunction + '  on: ' + currentUA, function() {
        assert.equal(true ,agentDetection[uaTest.testingFunction]() );
      });

      // it('should add the class \"' + uaTest.testingClass + '\"', function() {
      //   assert.notEqual(-1, agentDetection.getClasses().indexOf(uaTest.testingClass) );
      // });
    }
  }
});
