/* globals Polymer */

(function()
{
	'use strict';

	var generatedHashes = [],
		lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
				 '0123456789';

	new Polymer(
	{
		publish: 
		{
			value:  { value: '', reflect: true },
			length: 8,
			initial: ''
		},

		ready: function()
		{
			this.generateHash();
		},

		lengthChanged: function()
		{
			this.ready();
		},

		initialChanged: function()
		{
			this.ready();
		},

		generateHash: function()
		{
			var hash = this.initial;
				
		    for(var i = 0; i < this.length; i++)
		    {
		        hash += lookup.charAt(Math.floor(Math.random() * lookup.length));
		    }

		    if (generatedHashes.indexOf(hash) >= 0)
			{
				return this.generateHash(this.length);
			}

		    this.value = hash;
		    generatedHashes.push(this.value);
		}
	});
})();



