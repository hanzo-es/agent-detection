## INFO ##

Agent detection is an small utility to detect commonly used user agents.
It uses several approaches to detect user agents, most common userAgent
chunk strings from the current userAgent String.

It also uses custom checks by feature in some situations, like
the existence of `documentMode` property on internetExplorer 6-11 user agents.

This utility is intented to be used to add custom CSS classes to the HTML DOM element <html> in order 
to style elements in different user agents, by doing for example:

```.ua-ie .mycomponent { css only for ua-ie} ```


## Code Example

Require the utility and use the public method to add the classes to <html> element

```
  var AgentDetection  = require('agent-detection');
  var ag = new AgentDetection();
  ag.addClasses();
```

Also you can ask in your javascript code for an specific userAgent.

```
  var AgentDetection  = require('agent-detection');
  var ag = new AgentDetection();

  if( ag.isTouch() ) { ... }
```


## Installation

To make it available in your projects, just install the package

`npm i --save agent-detection`

And require it with 

`var AgentDetection  = require('agent-detection');`


## Tests

We use mocha to test the utility. To make the test available in a
headless environment we use jsdom to mock some properties.

To run the tests:

`npm run test`


## License

The MIT License (MIT)
