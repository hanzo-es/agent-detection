## INFO ##

Agent detection is an small utility to detect commonly used user agents.
AD, use several test approaches to detect user agents, most common userAgent
chunk strings on the current setted userAgent String,.

Also for several detections AD uses custom checks by functionality like for example
the existence of `documentMode` property on internetExplorer 6-11 user agents.

This utility is intented to be used for add custom cssclasses to the HTML DOM tag <html>
to set custom css properties for different user agents by doing
for example: ```.ua-ie .mycomponent { css only for ua-ie} ```


## Code Example

Require the utility and use the public method to add the classes to <html> tag

```
  AgentDetection  = require('agent-detection');
  agentDetection = new AgentDetection();
  agentDetection.addClasses();
```

Also you can ask in your javascript code for an specific userAgent.
```
  AgentDetection  = require('agent-detection');
  agentDetection = new AgentDetection();

  agentDetection.isTouch();
```


## Installation

To make it available in your projects just install the package

`npm -i --save agent-detection`

And make it available with require
`AgentDetection  = require('agent-detection');`

Or load it as a script.
`<script type="text/javascript" src="src/agent-detection.js"></script>`


## Tests

We use mocha to test the utility, to make the test available in a
headless environment we use jsdom to mock some properties.

To pass the tests.

`npm run test`


## License

The MIT License (MIT)
