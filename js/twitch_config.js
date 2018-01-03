(function()
{
	window.addEventListener('polymer-ready', function()
	{
		var xjs = require('xjs');
		var system = xjs.System;
		var Item = xjs.Item;
		var configWindow;
		var myItem;
		var configObj = {};
		var DEFAULT_OPACITY = 100;
		var DEFAULT_BACKGROUND = '#';
		var DEFAULT_MESSAGE_COLOR = '#EEEEEE';
		var DEFAULT_VIEWER_FONT = 'Calibri';
		var DEFAULT_MESSAGE_FONT = 'Calibri';
		var DEFAULT_TEXT_SIZE = '14';
		var CUSTOM_TAB_NAME = 'Twitch Chat';

		xjs.ready()
		.then(function() {
			configWindow = xjs.SourcePropsWindow.getInstance();
			// configure tabs in source properties dialog
			configWindow.useTabbedWindow({
				customTabs: [CUSTOM_TAB_NAME],
				tabOrder: [CUSTOM_TAB_NAME, 'Layout', 'Color', 'Transition']
			});
		})
		.then(Item.getItemList)
		.then(function(item) {
			myItem = item[0];

			var display = document.getElementById('display');
			var channelInput = document.getElementsByName('channel')[0];
			var displayBox = display.querySelector('.box');

			var opacity = document.getElementsByName('opacity')[0];
			var fontSelectList = [];
			var fontMessageSelect = document.getElementsByName('fontMessage')[0];
			var fontViewersSelect = document.getElementsByName('fontViewers')[0];

			var chatBoxColor = document.getElementsByName('chatbox')[0];
			chatBoxColor.allowTransparent = true;

			var messageColor = document.getElementsByName('messageColor')[0];
			var textSize = document.getElementsByName('text_size')[0];

			var addComponentEventListeners = function() {
				/*******************************
				 ** opacity slider
				 *******************************/
				opacity.addEventListener('change', function()
				{

				});

				opacity.addEventListener('set', function()
				{
					configObj.opacity = this.value;
					setConfig();
				});

				/*******************************
				 ** font dropdowns
				 *******************************/
				fontMessageSelect.addEventListener('select', function()
				{
					configObj.messageFont = this.value;
					setConfig();
				});

				fontViewersSelect.addEventListener('select', function()
				{
					configObj.viewerFont = this.value;
					setConfig();
				});

				/*******************************
				 ** color pickers
				 *******************************/
				chatBoxColor.addEventListener('change', function()
				{

				});

				chatBoxColor.addEventListener('set', function()
				{
					configObj.boxColor = this.value;
					setConfig();
				});

				chatBoxColor.addEventListener('reset', function()
				{

				});

				messageColor.addEventListener('change', function()
				{

				});

				messageColor.addEventListener('set', function()
				{
					configObj.messageColor = this.value;
					setConfig();
				});

				/*******************************
				 ** Text Size Input number
				 *******************************/
				textSize.addEventListener('change', function()
				{
					configObj.textSize = this.value;
					setConfig();
				});
			};

			document.onselectstart = function(event)
			{
				// disable selection if not input/textarea/xui-input
				var nodeName = event.target.nodeName;
				if (nodeName === 'INPUT' || nodeName === 'TEXTAREA' || nodeName === 'XUI-INPUT')
				{
					return true;
				}
				else
				{
					return false;
				}
			};
			document.oncontextmenu = function(){ return false; };

			var errorMessage = document.getElementsByName('error')[0];

			var	channelConnectButton = document.getElementsByName('connect')[0];
			channelConnectButton.addEventListener('click', function()
			{
				// check if channel is valid/existing
				var remotePath = 'https://api.twitch.tv/kraken/channels/' + channelInput.value + '?client_id=v0xl5lgr9bry2emawhty1qhxe5jmf4';

				var req = new XMLHttpRequest();
				req.open('GET', remotePath);

				req.onload = function()
				{
					if (req.status == 200)
					{
						errorMessage.parentNode.removeAttribute('notfound');
						resizeDisplaySection();

						var channelValue = (channelInput.value).toLowerCase();
						myItem.getURL()
						.then(function(url) {
							configObj.channel = channelValue;
							setConfig(true);
						});;
					}
					else
					{
						errorMessage.textContent = 'Twitch channel not found';
						errorMessage.parentNode.setAttribute('notfound', 'notfound');
						resizeDisplaySection();
					}
				};

				// Handle network errors
				req.onerror = function()
				{
					errorMessage.textContent = 'Please check your internet connection and try again.';
					errorMessage.parentNode.setAttribute('notfound', 'notfound');
					resizeDisplaySection();
				};
				req.setRequestHeader('Access-Control-Allow-Origin', '*');
				req.setRequestHeader('Cache-Control', 'no-cache');
				// Make the request
				req.send();
				// we call this since button has css state for focus
				this.blur();
			});

			var enableChannelConfig = function()
			{
				channelInput.disabled = false;
				channelConnectButton.disabled = false;
			};

			// Remove some unnecessary error logs
			window.OnDialogLoadStart = function() {};
			window.OnDialogTitleChange = function() {};
			window.OnDialogBeforeNavigation = function() {};
			window.SetVolume = function() {};

			/* WINDOW RELATED FUNCTIONS */
			var resizeDisplaySection = function()
			{
				var newHeight = window.innerHeight - parseInt(displayBox.getBoundingClientRect().top) - parseInt(window.getComputedStyle(display,null).getPropertyValue('padding-bottom'));
				displayBox.style.height = newHeight + 'px';
			};

			var getSettings = function()
			{
				// get installed fonts and load them onto the dropdowns
				system.getFonts().then(function(fontArray) {
					var fontSelectList = [];
			    for (var i = 0; i < fontArray.length; i++)
			    {
			    	fontSelectList.push({
			            id: fontArray[i],
			            name: fontArray[i]
			        });
			    };

			    fontMessageSelect.optionlist = fontSelectList;
			    fontViewersSelect.optionlist = fontSelectList;

					return myItem.loadConfig();
				})
				.then(function(config) {
					configObj = config;
					// load configuration settings or use default if not present
					if (!configObj.hasOwnProperty('channel')) {
						configObj.channel = '';
					}
					channelInput.value = configObj.channel;

					if (!configObj.hasOwnProperty('opacity')) {
						configObj.opacity = DEFAULT_OPACITY;
					}
					opacity.value = configObj.opacity;

					if (!configObj.hasOwnProperty('messageColor')) {
						configObj.messageColor = DEFAULT_MESSAGE_COLOR;
					}
					messageColor.value = configObj.messageColor;

					if (!configObj.hasOwnProperty('viewerFont')) {
						configObj.viewerFont = DEFAULT_VIEWER_FONT;
					}
					fontViewersSelect.value = configObj.viewerFont;

					if (!configObj.hasOwnProperty('messageFont')) {
						configObj.messageFont = DEFAULT_MESSAGE_FONT;
					}
					fontMessageSelect.value = configObj.messageFont;

					if (!configObj.hasOwnProperty('textSize')) {
						configObj.textSize = DEFAULT_TEXT_SIZE;
					}
					textSize.value = configObj.textSize;

					if (!configObj.hasOwnProperty('boxColor')) {
						configObj.boxColor = DEFAULT_BACKGROUND;
					}
					chatBoxColor.value = configObj.boxColor;
					enableChannelConfig();

					/*
					 * use setTimeout as a work-around for bug:
					 * eventlisteners added below still are somewhat triggered
					 * by above loading of settings
					 * (maybe due to bubbling/propagation, for further investigation)
					 */
					setTimeout(function(){
						addComponentEventListeners();
					}, 0);
				});
			};

			var setConfig = function(close)
			{
				// set custom css for source based on the configuration settings
				var backgroundString;
				if (configObj.boxColor === '#') {
					backgroundString = 'transparent';
				}
				else {
					var hex = configObj.boxColor.substring(1);
					var r = parseInt(hex.substring(0,2), 16);
					var g = parseInt(hex.substring(2,4), 16);
					var b = parseInt(hex.substring(4,6), 16);
					var a = configObj.opacity/100;
					backgroundString = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
				}
				cssString = '.ember-chat .chat-header{display:none !important}.ember-chat .chat-room{top:0px !important}.ember-chat .chat-messages{bottom:0px !important}.ember-chat .chat-messages .chat-line.admin{display:none !important}.ember-chat .chat-interface{display:none !important}.ember-chat .chat-messages .chat-line .from,.ember-chat .chat-messages .chat-line .to{font-family:%viewerFont%, Arial, sans-serif;pointer-events:none}.ember-chat .chat-messages .chat-line .message{font-family:%messageFont%, Arial, sans-serif;color:%messageColor%}body:not([mode=standby]){background:%boxColor% !important}body:not([mode=standby]) *:not(.badge){background:transparent !important}#noty_bottomCenter_layout_container{display:none !important}.ember-chat .chat-messages .chat-line .badges .badge{background-repeat:no-repeat;background-size:%textSize%;width:%textSize%;height:%textSize%}.ember-chat .chat-messages .chat-line{font-size:%textSize%;line-height:%textSize%}.ember-chat .chat-messages .chat-line .emoticon{height:%emoSize%;vertical-align:middle}.tipsy{display:none !important}';
				cssString = cssString
					.replace(/%textSize%/g, configObj.textSize + 'px')
					.replace(/%emoSize%/g, (parseInt(configObj.textSize)) + 'px')
					.replace('%boxColor%', backgroundString)
					.replace('%viewerFont%', configObj.viewerFont)
					.replace('%messageFont%', configObj.messageFont)
					.replace('%messageColor%', configObj.messageColor);
				myItem.setCustomCSS(cssString).then(function() {
					return myItem.requestSaveConfig(configObj);
				})
				.then(function() {
					if (typeof close !== 'undefined' && close) {
						configWindow.close();
					}
				});
			};

			getSettings();
			resizeDisplaySection();

			configWindow.on('set-selected-tab', function(val) {
				if (val = CUSTOM_TAB_NAME) {
					resizeDisplaySection();
				}
			});

		});

	});
})();