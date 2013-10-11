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
* foreman
* notify (growl or notification center)

## setup

```
% bunle install
% npm install
% bower install
% npm install -g easymock
```

## start develop

```
% bundle exec foreman start
:
% open http://localhost:9000/
```

### livereload

* chrome
  * https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

### notify

when your os is Mac OSX10.7 (lion), you need install growlnotify from http://growl.info/downloads#generaldownloads

## test

```
# running on PhantomJS and Chrome and Safari
% grunt testem:run:app
or
# running on PhantomJS and Firefox (for Travis.ci)
% grunt testem:ci:app
```
