## INFO ##

Agent detection is an small utility to detect commonly used user agents.
AD, use several test approaches to detect user agents, most common userAgent
chunk strings on the current setted userAgent String,.

Also for several detections AD uses custom checks by functionality like for example
the existence of `documentMode` property on internetExplorer 6-11 user agents.

This utility is intented to be used for add custom cssclasses to the HTML DOM tag <html>
to set custom css properties for different user agents by doing
for example: ```.ua-ie .mycoponent { css only for ua-ie} ```

## Code Example

```
AgentDetection  = require(agent-detection);
agentDetection = new AgentDetection();
agentDete
```

## Installation

To make it available in your projects just install the package

`npm -i --save agent-detection`

or load it as a script.
`<script type="text/javascript" src="src/agent-detection.js"></script>`

Next add it to your code.

```
  AgentDetection  = require(agent-detection);
  agentDetection = new AgentDetection();
  agentDetection.addClasses();
```

## Tests

We use mocha to test the utility, to make the test available in a
headless environment we use jsdom to mock some properties.
To pass the tests.

`npm run test`


## License

The MIT License (MIT)
