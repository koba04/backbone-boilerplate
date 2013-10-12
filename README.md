# My backbone boilerplate

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
% npm install -g grunt-cli bower easymock
% npm install
% bower install
```

## start develop

```
% bundle exec foreman start
:
% open http://localhost:9000/
```

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
