/* globals Polymer */

(function()
{
	'use strict';

    var self,
        onRaise = function(event)
        {
            //var input = event.target;
            // revert to old value if invalid number
            if(self.type === "number")
            {
                var input = self.$.input;
                if (input.value != self.value)
                {
                    self.value = input.value;     
                }
                input.removeEventListener("mouseout", onRaise);
                document.removeEventListener("mouseup", onRaise);
                self = null;
            }
        };

	new Polymer(
	{
		publish:
		{
			type:        { value: 'text', reflect: true },
			placeholder: { value: '', reflect: true },
            min:         { value: "", reflect: true },
            max:         { value: "", reflect: true }
		},
        
        valueChanged: function(oldValue, newValue)
        {
            if(this.type === "number")
            {
                if (oldValue == newValue)
                {
                    return;
                }

                if (isNaN(newValue) || 
                    (newValue.toString().trim() == "") ||
                    (parseInt(newValue) < parseInt(this.min)) || 
                    (parseInt(newValue) > parseInt(this.max)))
                {
                    this.value = oldValue;
                    return;
                }
                this.$.input.value = newValue;
                this.fire("change");
            }
        },

        typeChanged: function()
        {
            if (this.type === "number" && this.value !== "")
            {
                this._lastValidValue = this.value;
            }
            else
            {
                this._lastValidValue = null;
            }
        },

        onKeyDown : function(event)
        {
            if(this.type === "number")
            {
                if (event.which === 38 || event.which === 40)
                {
                    var _this = this;
                    setTimeout(function()
                    {
                        _this.value = _this.$.input.value;
                    }, 0);
                }
            }
        },

        onKeyPress : function(event)
        {
            if(this.type === "number")
            {
                var acceptKeyPress =
                    // accept numbers
                    (event.which >= 48  && event.which <= 57) ||
                    // accept minus sign.or period
                    (event.which === 45 || event.which === 46) ||
                    (event.which === 13);

                if (event.which === 13)
                {
                    this.value = this.$.input.value;
                }

                if (!acceptKeyPress)
                {
                    event.preventDefault();
                }
                // changed value will still need to be validated in onChange
            }
        },

        onChange : function(event)
        {
            var input = event.target;
            // revert to old value if invalid number
            if(input.type === "number")
            {

                event.stopPropagation();
            }
            else
            {
                this.fire("change"); // need this general case, because the 
                    // change event does not bubble
            }
        },

        onMouseDown : function(event)
        {
            var input = event.target;
            // revert to old value if invalid number
            if(input.type === "number" && event.which == 1)
            {
                input.addEventListener("mouseout", onRaise, false);
                document.addEventListener("mouseup", onRaise, false);
                self = this;
            }
        },

        onInputBlur: function(event)
        {
            this.value = this.$.input.value;
        },

        ready : function()
        {
            this.$.input.addEventListener("mousedown", this.onMouseDown.bind(this));
            this.$.input.addEventListener("change", this.onChange.bind(this));
            this.$.input.addEventListener("keypress", this.onKeyPress.bind(this));
            this.$.input.addEventListener("keydown", this.onKeyDown.bind(this));
            this.$.input.addEventListener("blur", this.onInputBlur.bind(this));
        }
	});
})();