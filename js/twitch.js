/* globals require, Promise */

(function() {

  'use strict';

  var xjs = require('xjs');
  var Item = xjs.Item;
  var configObj = {};
  var myItem;
  var sourceWindow

  xjs.ready()
  .then(function () {
    sourceWindow = xjs.SourcePluginWindow.getInstance();
    return Item.getItemList()
  })
  .then(function(item) {
    myItem = item[0];
    listenOnSave()
    return myItem.getName();
  })
  .then(function(name) {
    // change the property name if just added
    var newName = 'Twitch Chat Viewer via HTML5';
    if (name.toLowerCase().substring(0, newName.length) !== newName.toLowerCase()) {
      return myItem.setName('Twitch Chat Viewer via HTML5');
    }
    else {
      return myItem.setName(name);
    }
  })
  .then(function() {
    // inject minified script from scriptInjected.js
    var indexLocation = location.href;
    var indexPath = indexLocation.substring(0, indexLocation.length - 10);
    return myItem.setBrowserJS('(function(){var existingXJS=document.getElementById("xjsInject"),xjs,Source,configObj={},sourceWindow;if(!document.getElementById("xjsInject")){var xjsScript=document.createElement("script");xjsScript.id="xjsInject";var body=document.querySelector("body");body.appendChild(xjsScript),xjsScript.onload=function(){xjs=require("xjs"),Source=xjs.Source,xjs.ready().then(Source.getCurrentSource).then(function(n){myItem=n}),sourceWindow=xjs.SourcePluginWindow.getInstance(),sourceWindow.on("save-config",function(n){configObj=n,Source.getCurrentSource().then(function(n){n.saveConfig(configObj).then(function(){var t=location.href,e=t.substring(21,t.length-13);configObj.hasOwnProperty("channel")&&""!=configObj.channel&&configObj.channel!=e&&n.setName("Twitch Chat Viewer via HTML5 ("+configObj.channel+")").then(function(){location.href="http://www.twitch.tv/"+configObj.channel+"/chat?popout="})})})})},xjsScript.src="' + indexPath +'js/xjs.js"}})();');
  })
  .then(function() {
    return myItem.loadConfig();
  })
  .then(function(config) {
      configObj = config;
      // redirect to twitch pop-out if a channel has been set
      if (configObj.hasOwnProperty('channel') && configObj.channel != '') {
        location.href = 'http://www.twitch.tv/' + configObj.channel + '/chat?popout=';
      }
  });

  // redirect from initial UI into twitch popout if channel is set
  var listenOnSave = function () {
    sourceWindow.on('save-config', function(config) {
      configObj = config;
      myItem.saveConfig(configObj).then(function() {
        if (configObj.hasOwnProperty('channel') && configObj.channel != '') {
          myItem.setName('Twitch Chat Viewer via HTML5 (' + configObj.channel + ')')
          .then(function() {
            location.href = 'http://www.twitch.tv/' + configObj.channel + '/chat?popout=';
          });
        }
      });
    });
  }

})();