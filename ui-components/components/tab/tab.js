/* globals Polymer */

(function()
{
	'use strict';

	new Polymer(
	{
		publish:
		{
			selected: { value: false, reflect: true },
			section: { reflect: true }
		},

		selectedChanged: function()
		{
			if (this.tabContent === undefined)
			{
				this.tabContent = this.nextElementSibling;
			}

			if (this.tabContent !== undefined && 
				(/xui-tab-content/i).test(this.tabContent.tagName))
			{
				this.tabContent.selected = this.selected;
			}
		},

		setContents: function(tabContent)
		{
			this.tabContent = tabContent;
		},

		ready: function()
		{
			// try assigning tab content elements with same section attribute
			var contents = [].slice.call(this.parentElement.querySelectorAll(
				"xui-tab-content"));

			for (var i = 0; i < contents.length; ++i)
			{
				var section = contents[i].getAttribute("section");
				if (section === this.getAttribute("section"))
				{
					this.setContents(contents[i]);
					break;
				}
			}
		}
	});
})();