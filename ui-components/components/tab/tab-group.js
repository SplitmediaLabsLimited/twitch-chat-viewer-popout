/* globals Polymer */

(function()
{
	'use strict';

	new Polymer(
	{
		ready: function()
		{
			this.onMutation(this, this.onContentUpdate);
		},

		onContentUpdate: function()
		{
			this.fire('tab-updated', {});
			this.onMutation(this, this.onContentUpdate);
		},

		onTabClick: function(event)
		{
			if (!(/xui-tab/i).test(event.target.tagName))
			{
				return false;
			}

			var tabs = [].slice.call(this.querySelectorAll('xui-tab'));

			tabs.forEach(function(tab)
			{
				tab.selected = (tab === event.target);
			});

			this.fire('tab-click', { target: event.target });
		}
	});
})();