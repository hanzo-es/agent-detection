var assert = require('assert');
var AgentDetection  = require('./../src/agent-detection');
var agentDetection = new AgentDetection();

//REAL USERAGENTLIST FROM http://www.useragentstring.com/pages/useragentstring.php
var userAgentList = [
  {
    uaList : [
      'Mozilla/5.0 (Linux; U; Android 2.1-update1; es-mx; SonyEricssonE10a Build/2.0.A.0.504) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17',
      'Mozilla/5.0 (Linux; U; Android 1.6; ar-us; SonyEricssonX10i Build/R2BA026) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
    ],
    testingFunction : 'isLegacyAndroid',
    testingClass: 'ua-legacy-android'
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
