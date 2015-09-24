/* globals Polymer */

(function()
{
	'use strict';

	new Polymer(
	{
	    publish:
	    {
	        value: { value: '', reflect: true },
	        data: { value: '', reflect: true }
	    },

	    get label()
	    {
	        return this.innerHTML;
	    }
	});
})();