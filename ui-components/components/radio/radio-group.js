/* globals Polymer */

(function()
{
	'use strict';

	new Polymer(
	{
		publish:
		{
			value: { value: null, reflect: true }
		},

		eventDelegates:
		{
			select: 'onSelect'
		},

		onSelect: function(event)
		{
			if (event.target.selected)
			{
				this.value = event.target.value;
			}
		},

		valueChanged: function()
		{
			var radios = this.querySelectorAll('xui-radio');

			for (var i = 0; i < radios.length; i++)
			{
				var radio = radios[i];

				radio.selected = (this.value === radio.value);
			}
		}
	});
})();