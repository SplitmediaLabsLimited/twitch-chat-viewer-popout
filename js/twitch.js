/* globals require, Promise */

(function() {

  'use strict';

  var xjs = require('xjs');
  var Item = xjs.Item;
  var configObj = {};
  var myItem;
  var sourceWindow = xjs.SourcePluginWindow.getInstance();

  xjs.ready()
  .then(Item.getCurrentSource)
  .then(function(item) {
    myItem = item;
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
    // change xjsScript.src, because this one's pointed to localhost
    return myItem.setBrowserJS('(function(){var existingXJS=document.getElementById("xjsInject"),xjs,Item,configObj={},sourceWindow;if(!document.getElementById("xjsInject")){var xjsScript=document.createElement("script");xjsScript.id="xjsInject";var body=document.querySelector("body");body.appendChild(xjsScript),xjsScript.onload=function(){xjs=require("xjs"),Item=xjs.Item,xjs.ready().then(Item.getCurrentSource).then(function(n){myItem=n}),sourceWindow=xjs.SourcePluginWindow.getInstance(),sourceWindow.on("save-config",function(n){configObj=n,Item.getCurrentSource().then(function(n){n.saveConfig(configObj).then(function(){var t=location.href,e=t.substring(21,t.length-13);configObj.hasOwnProperty("channel")&&""!=configObj.channel&&configObj.channel!=e&&n.setName("Twitch Chat Viewer via HTML5 ("+configObj.channel+")").then(function(){location.href="http://www.twitch.tv/"+configObj.channel+"/chat?popout="})})})})},xjsScript.src="http://localhost/Script_Plugin/twitch_chat_source_css/js/xjs.js"}})();');
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

})();