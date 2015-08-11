# Havana static

[![Build Status](https://travis-ci.org/colinmeinke/havana-static.svg?branch=master)](https://travis-ci.org/colinmeinke/havana-static)
[![Dependency status](https://david-dm.org/colinmeinke/havana-static.svg)](https://david-dm.org/colinmeinke/havana-static.svg)

A static response handler.

Havana static works with a server side response/request
dispatcher such as
[Havana server](https://github.com/colinmeinke/havana-server)
or a library with an interchangeable API. When a dispatcher
publishes a `response.received` event, Havana static will
search the defined static directory for the resource. If
Havana static matches the resource it will publish a
`response.send` event, publishing the response data for
consumption by the dispatcher. If Havana static does not
match the resource it will publish a `response.handler.error`
event to notify the dispatcher that it has not matched the
resource.

## How to install

```
npm install havana-static
```

## How to use

```javascript
import Event from 'havana-event';
import path from 'path';
import Server from 'havana-server';
import Static from 'havana-static';

const event = new Event();

const reporting = {
  'level': 2, 
  'reporter': console.log,
};

const server = new Server({
  'event': event,
  'reporting': reporting,
});

new Static({
  'event': event,
  'reporting': reporting,
  'rootDir': __dirname,
  'staticDir': 'public',
});

server.listen( 3000 );
```

## Event list

Events take the form of
[Havana event](https://github.com/colinmeinke/havana-event)
or a library with an interchangeable API.

### Publish

- `response.handler.register`: Signifies that Havana static
  will now attempt to handle requests.
- `response.send`: Signifies that Havana static has matched
  a request, publishing the response data for consumption by
  a request/response dispatcher.
- `response.handler.error`: Signifies that Havana static was
  unable to match a request.

### Subscribe

- `request.received`: Allows a request/response dispatcher
  to notify Havana static that it has received a request,
  publishing the request data for consumption by Havana
  static.

## ES2015+

Havana static is written using ES2015+ syntax.

However, by default this module will use an ES5
compatible file that has been compiled using
[Babel](https://babeljs.io).

Havana static currently requires the 
[Babel polyfill](https://babeljs.io/docs/usage/polyfill).
In the `dist` directory there are two files, the default
`static.js` and `static.with-polyfill.js` that includes
the Babel browser polyfill.
