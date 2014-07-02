HTML Boilerplate TBS3
=====================
Version 3.1.1
## Setup
To begin you first need set a new name for the project in *package.json*.
This name will then be used as a name to the main css and js files. Be sure to not use any spaces or odd characters.

*package.json*
```javascript
{
  "name": "html-boilerplate",
  "version": "0.0.0",
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-jshint": "~0.6.5",
    "grunt-contrib-uglify": "~0.2.4",
    "grunt-contrib-watch": "~0.5.3",
    "grunt-contrib-less": "~0.8.2",
    "grunt-contrib-connect": "~0.5.0",
    "matchdep": "~0.3.0"
  }
}
```

Then change the links for your css and javascript from *html-boilerplate.** to your new name.

### NodeJS & Grunt Setup
Note that the setup proccess 1-2 needs to be done only once per develop enviroment.

1. Install node from [nodejs.org/](http://nodejs.org/)
2. Open console and write `npm install -g grunt-cli`
3. Browse to project directory root in console and write `npm install`

## Grunt Tasks
Grunt tasks are used for the build proccess, the available grunt tasks for this project are the following:

* `grunt server` (*starts a http server, runs the connect and watch task with livereload enabled, no extension needed*)
* `grunt validation` (*validates html files located in root folder*)
* `grunt js` (*runs js files through jshint task searching for any syntax errors, the concat task and uglify task that minifies the js files*)
* `grunt dist-css` (*runs the less task that compiles the less files and minifies the css*)
* `grunt dist` (*runs the dist-js & dist-css tasks*)
* `grunt` (*runs the dist task*)

You can also runt `grunt watch` to watch for changes and automatically run the suitable task. For this task LiveReload is enabled, [see appropriate browser extesions here](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

## Javascript Plugins
To add javascript plugins to the project you add the .js file of the plugin in the */js/plugins/* folder. When you compile the plugin will then be added to the */js/plugins.js* file.

### Modernizr
In production you should always use a customized build instead of the included development version, you get this from [Modernizer download builder](http://modernizr.com/download/).

### Commonly used plugins
* HTML5 Placeholder jQuery Plugin - [github.com/mathiasbynens/jquery-placeholder](https://github.com/mathiasbynens/jquery-placeholder)
* Uniform custom form elements - [github.com/pixelmatrix/uniform](https://github.com/pixelmatrix/uniform)
* Waypoints scroll events - [github.com/imakewebthings/jquery-waypoints](https://github.com/imakewebthings/jquery-waypoints)

## Twitter Bootstrap
Documentation for Twitter Bootstrap 3.X.X can be found at [getbootstrap.com/](http://getbootstrap.com/).

### X-UA-Compatible
In the header of *example.html* (row 9), `<meta http-equiv="X-UA-Compatible" content="IE=edge">` is declared. This will will cause a validation error. Fix this by removing that line of code and add custom header to the *web.config* instead.

*web.config*
```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
   <system.webServer>
      <httpProtocol>
         <customHeaders>
            <clear />
            <add name="X-UA-Compatible" value="IE=edge" />
         </customHeaders>
      </httpProtocol>
   </system.webServer>
</configuration>
```
