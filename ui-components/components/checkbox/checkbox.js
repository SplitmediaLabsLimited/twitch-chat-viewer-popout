/* globals Polymer */

(function()
{
    'use strict';

    new Polymer(
    {
        publish:
        {
            checked : { value: false, reflect: true },
            disabled: { value: false, reflect: true }
        },

        ready: function()
        {
            this.checkbox = this.shadowRoot.querySelector('input');
        },

        checkedChanged: function()
        {
            this.checkbox.checked = this.checked;
        },

        disabledChanged: function()
        {
            this.checkbox.disabled = this.disabled;
        },

        checkboxChanged: function()
        {
            this.checked = this.checkbox.checked;

            this.fire('change');
        }
    });
})();
