# My frontend boilerplate

* coffeescript
* backbone
* lodash (underscore)
* zepto (jQuery)
* handlebars
* compass
* connect (proxy + easymock)
* livereload
* assemble
* testem
* mocha + expect
* sinon

## setup

```
% bunle install
% npm install
% bower install
```

## start develop

```
% grunt
:

% open http://localhost:9000/
```

### livereload

* chrome
  * https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

## test

```
# running on PhantomJS and Chrome
% grunt testem:run:app
or
# running on PhantomJS
% grunt testem:ci:app
```

## easymock

```
npm install -g easymock
cd easymock
easymock
```
