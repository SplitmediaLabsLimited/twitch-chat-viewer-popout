/* globals Polymer, document */
(function()
{
    var mouse = {}, self,
        drag = function(event)
        {
            mouse = { x : event.clientX, y : event.clientY };
            var minVal = self.min,
                bar = self.$.bar,
                left = mouse.x - bar.getBoundingClientRect().left,
                maxLeft = bar.offsetWidth,
                range = self.max - minVal;

            if (left < 0)
            {
                left = 0;
            }

            if (left > maxLeft)
            {
                left = maxLeft;
            }
            self.value = (((left / maxLeft) * range) + minVal).toFixed(0);
        },
        drop = function(event)
        {
            mouse = { x : event.clientX, y : event.clientY };
            document.removeEventListener("mousemove", drag);    
            document.removeEventListener("mouseup", drop);

            var minVal = self.min,
                bar = self.$.bar,
                left = mouse.x - bar.getBoundingClientRect().left,
                maxLeft = bar.offsetWidth,
                range = self.max - minVal;
                
            if (left < 0)
            {
                left = 0;
            }
            
            if (left > maxLeft)
            {
                left = maxLeft;
            }
            self.value = (((left / maxLeft) * range) + minVal).toFixed(0); 
            self = null;
        };

    function XUIVolumeSlider()
    {
        this.reinitialise();
    }

    /**
    * Creates a volume slider
    *
    * @class  XUIVolumeSlider
    * @constructor
    * 
    * @example
    *     <xui-volume-slider></xui-volume-slider>
    */
    XUIVolumeSlider.prototype =
    {
        ready: XUIVolumeSlider,
        
        publish:
        {
            /**
             * Disables/enables the volume slider
             *
             * @attribute   slider
             * @type        Boolean
             * @default     false
             */
            disabled        : { value: false, reflect: true },

            /**
             * Sets Value
             *
             * @attribute   value
             * @type        integer
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
            max   : { value: 100, reflect: true }
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

            this.reinitialise();
            this.fire("change");
        },

        onBarDown: function(event)
        {
            if (event.which != 1)
            {
                return;
            }
            mouse = { x : event.clientX, y : event.clientY };
            self = this;
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", drop);            
        },

        reinitialise: function()
        {
            var maxLeft = this.$.bar.offsetWidth,
                range = this.max - this.min;

            this.$.level.style.width = ((this.value - this.min) / range) * maxLeft + "px";
            this.setAttribute("title", this.value);
        }
    };
    
    Polymer.call({}, XUIVolumeSlider.prototype);
})();