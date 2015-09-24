/* globals Polymer */

(function()
{
	'use strict';

	new Polymer(
	{
		publish: 
		{
			text: 		{ value: '', reflect: true },
			rows: 		{ value: 3, reflect: true },
			cols: 	   	{ value: 200, reflect: true },
			wrap:       { value: 'hard', reflect: true },
			disabled:  	{ value: false, reflect: true },
			maxlength: 	{ value: -1, reflect: true }
		},

		ready: function()
		{
			this.text = this.innerHTML;
		},

		textChanged: function()
		{
			this.innerHTML = this.text;
		}
	});
})();