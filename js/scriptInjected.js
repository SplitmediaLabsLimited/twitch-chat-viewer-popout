(function() {

	var existingXJS = document.getElementById('xjsInject');
	var xjs;
	var Item;
	var configObj = {};
	var sourceWindow;

	if (!document.getElementById('xjsInject')) {
	  var xjsScript = document.createElement('script');
	  xjsScript.id = 'xjsInject';

	  var body = document.querySelector('body');
	  body.appendChild(xjsScript);
	  xjsScript.onload = function() {
	      
	    xjs = require('xjs');
	    Item = xjs.Item;
	    xjs.ready()
	      .then(Item.getCurrentSource)
	      .then(function(item) {
	        myItem = item;
	      });
	    sourceWindow = xjs.SourcePluginWindow.getInstance();
	    sourceWindow.on('save-config', function(config) {
	      configObj = config;
	      Item.getCurrentSource().then(function(myItem) {
	        myItem.saveConfig(configObj).then(function() {
	          var formerLocation = location.href;
	          var formerChannel = formerLocation.substring(21, formerLocation.length-13);
	          if (configObj.hasOwnProperty('channel') && configObj.channel != '' && configObj.channel != formerChannel) {
	            myItem.setName('Twitch Chat Viewer via HTML5 (' + configObj.channel + ')')
	            .then(function() {
	              location.href = 'http://www.twitch.tv/' + configObj.channel + '/chat?popout=';
	            });
	          }
	        });
	      });
	    });
	  };
	  xjsScript.src = 'http://localhost/Script_Plugin/twitch_chat_source_css/js/xjs.js';
	}
  
})();