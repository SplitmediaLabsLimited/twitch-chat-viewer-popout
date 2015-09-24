/* globals Polymer */

(function()
{
	'use strict';

	new Polymer(
	{
		publish:
		{
			selected: { value: false, reflect: true },
			disabled: { value: false, reflect: true },
			value: 	  { value: null, reflect: true }
		},

		select: function()
		{
			this.selected = true;
		},

		ready: function()
        {
            this.radio = this.shadowRoot.querySelector('input');
        },

        selectedChanged: function()
        {
        	this.radio.checked = this.selected;

        	this.fire('select');
        },

        disabledChanged: function()
        {
            this.radio.disabled = this.disabled;
        },

		radioChanged: function()
		{
			this.selected = this.radio.checked;
		}
	});
})();