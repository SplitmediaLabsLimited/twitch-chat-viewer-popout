/* globals Polymer */

(function()
{
	'use strict';

	/**
	 * Creates a button
	 *
	 * @class xui-button
	 * @constructor
	 * 
	 * @example
	 *     <xui-button>text</xui-button>
	 */
	new Polymer(
	{
	    publish:
	    {
	        icon    : '',
	        disabled: { value: false, reflect: true }
	    },

	    disabledChanged: function()
	    {
	        this.$.button.disabled = this.disabled;
	    }
	});

})();