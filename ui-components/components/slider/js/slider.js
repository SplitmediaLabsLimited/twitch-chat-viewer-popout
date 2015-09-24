/* globals Polymer, document */
(function()
{
    "use strict";
    var self, isPressedUp = false, isPressedDown = false, pressedTimer,
        raised = function()
        {
            isPressedUp = false;
            isPressedDown = false;
            clearTimeout(pressedTimer);
            document.removeEventListener("mouseup", raised);
            self.fire("set");
            self = null;
        };

    function XUISlider()
    {
        this.$.inputText.value = this.value;
    }

    /**
    * Creates a slider
    *
    * @class  XUISlider
    * @constructor
    * 
    * @example
    *     <xui-slider></xui-slider>
    */
    XUISlider.prototype =
    {
        ready: XUISlider,
        
        publish:
        {
            /**
             * Disables/enables the slider
             *
             * @attribute   slider
             * @type        Boolean
             * @default     false
             */
            disabled        : { value: false, reflect: true },

            /**
             * if change is due to range
             *
             * @attribute   isRangeChange
             * @type        Boolean
             * @default     false
             */
            isRangeChange : { value: false, reflect: true },

            /**
             * Sets Value
             *
             * @attribute   value
             * @type        String
             */
            value   : { value: 0, reflect: true },

            /**
             * Sets minimum value
             *
             * @attribute   min
             * @type        integer
             */
            min   : { value: 0, reflect: true },

            /**
             * Sets max value
             *
             * @attribute   max
             * @type        integer
             */
            max   : { value: 100, reflect: true },

            /**
             * Sets increment
             *
             * @attribute   step
             * @type        integer
             */
            step   : { value: 1, reflect: true }
        },

        valueChanged: function(oldValue, newValue)
        {
            if (oldValue == newValue)
            {
                return;
            }

            if (isNaN(newValue) || 
                (newValue.toString().trim() == "") ||
                (newValue < this.min) || 
                (newValue > this.max))
            {
                this.value = oldValue;
                return;
            }

            this.$.inputText.value = newValue;
            this.$.inputRange.value = this.value;
            this.fire("change");
        },

        onInputChange: function(event)
        {
            event.stopPropagation();
        },

        onInputDragstart: function(event)
        {
            event.preventDefault();
        },

        startDecrement: function(event)
        {
            if (event.which != 1)
            {
                return;
            }
            isPressedDown = true;
            var delay = 1000;
            var _this = this;
            self = _this;

            var manageDelay = function()
            {
                var pressValue = parseInt(_this.value) - 1;
                if (pressValue >= _this.min)
                {
                    _this.value = pressValue;
                    if (delay > 50)
                    {
                        delay = delay/2;
                    }
                    pressedTimer = setTimeout(manageDelay, delay);
                }
                else
                {
                    raised();
                }
                
            }
            document.addEventListener("mouseup", raised);
            manageDelay(); 
        },

        endDecrement: function()
        {
            if (!isPressedDown)
                return;
            raised();
        },

        startIncrement: function(event)
        {
            if (event.which != 1)
            {
                return;
            }
            isPressedUp = true;
            var delay = 1000;
            var _this = this;
            self = _this;

            var manageDelay = function()
            {
                var pressValue = parseInt(_this.value) + 1;
                if (pressValue <= _this.max)
                {
                    _this.value = pressValue;
                    if (delay > 50)
                    {
                        delay = delay/2;
                    }
                    pressedTimer = setTimeout(manageDelay, delay);
                }
                else
                {
                    raised();
                }
                
            }
            document.addEventListener("mouseup", raised);
            manageDelay();            
        },

        endIncrement: function()
        {
            if (!isPressedUp)
                return;
            raised();
        },

        onRangeInput: function(event)
        {
            this.value = this.$.inputRange.value;
        },

        onRangeChange: function(event)
        {
            this.isRangeChange = true;
            this.value = this.$.inputRange.value;
            this.fire("set");
            event.stopPropagation();
        },

        onInputKeydown: function(event)
        {
            if (event.keyCode == 13)
            {
                this.value = this.$.inputText.value;
                this.fire("set");
            }
            else if (event.keyCode == 38)
            {
                this.value = parseInt(this.$.inputText.value) + 1;
                this.fire("set");
                event.preventDefault();
            }
            else if (event.keyCode == 40)
            {
                this.value = parseInt(this.$.inputText.value) - 1;
                this.fire("set");
                event.preventDefault();
            }
        },

        onInputBlur: function(event)
        {
            this.value = this.$.inputText.value;
            this.fire("set");
        }        
    };
    
    Polymer.call({}, XUISlider.prototype);
})();