/* globals Polymer */

(function()
{
    'use strict';

    new Polymer(
    {
        publish:
        {
            disabled: { value: false, reflect: true },
            value:    { value: '', reflect: true },
            placeholder: { value: '', reflect: true },
            selected: null,
            name: ''
        },

        eventDelegates:
        {
            click: 'onClick'
        },

        domReady: function()
        {
            this.async(this.valueChanged);
        },
        
        ready: function()
        {
            this.onMutation(this, this.onContentUpdate);
        },

        valueChanged: function()
        {
            var option = this.querySelector(
                'xui-option[value="' + this.value + '"]'
            ), data = option ? option.data : '';

            this.selected = option;

            this.fire('select-changed', { 
                value: this.value, 
                name: this.name, 
                data: data 
            });
        },
        
        onContentUpdate: function()
        {
            this.async(this.valueChanged);
            this.onMutation(this, this.onContentUpdate);
        },

        onClick: function(event)
        {
            this.focus();
            if ((/xui-option$/i).test(event.target.tagName))
            {
                this.value = event.target.value;
                this.blur();
            }
        }
    });
})();