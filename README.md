# My backbone boilerplate

* coffeescript
* backbone
* lodash (underscore)
* jquery
* handlebars
* compass
* connect (proxy + easymock)
* livereload
* testem
* mocha + expect
* sinon
* notify (growl or notification center)

## setup

```
% bunle install
% npm install -g grunt-cli bower
% npm install
% bower install
```

## start develop

```
% grunt
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
