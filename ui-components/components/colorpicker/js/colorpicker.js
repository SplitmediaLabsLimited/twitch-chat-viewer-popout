/* globals Polymer, document */
(function()
{
    "use strict";
    var self;
    var mouseCancel = function(event)
        {
            if (event.target != self && !self.contains(event.target))
            {
                cancelChange();
            }
        },

        keyCancel = function(event)
        {
            if (event.which == 27)
            {
                self.$.picker.focus();
                cancelChange();
                event.stopPropagation();
            }
        },

        cancelChange = function()
        {
            document.body.removeEventListener('mousedown', mouseCancel, false);
            document.body.removeEventListener('keydown', keyCancel, false);
            self.$.paletteContainer.hidden = true;
            self.clearSelected();
            self.value = self.oldvalue;
            self = null;
        };

    function XUIColorpicker()
    {
        this.$.paletteContainer.hidden = true;
        this.colorlist = [
            "#000000", "#013380", "#42018C", "#60018C", "#640064", "#800133", "#800000",
            "#561F01", "#412A01", "#808000", "#395001", "#0F6501", "#01422D", "#013E45",

            "#121212", "#0000C5", "#5F01CC", "#8B01CC", "#800080", "#B9014A", "#BE0808",
            "#7E2D01", "#5F3D01", "#988F01", "#486401", "#008000", "#016042", "#015A64",

            "#2C2C2C", "#0000FF", "#7700FF", "#AE00FF", "#960096", "#E8015D", "#E61010",
            "#9D3801", "#774C01", "#B2A801", "#587C01", "#179D01", "#017852", "#008080",

            "#505050", "#0B33FF", "#861DFF", "#B71DFF", "#AB01AB", "#FF1270", "#FF0000",
            "#C24601", "#935E01", "#C9BF01", "#679101", "#1BB801", "#019565", "#00A3A3",
        
            "#888888", "#1F44FF", "#9335FF", "#BF35FF", "#D403D4", "#FF2C80", "#FF3A3A",
            "#E45101", "#AC6E01", "#DBD000", "#79AA01", "#1FD701", "#01AE77", "#00C1C1",
        
            "#C0C0C0", "#3F63FF", "#A253FF", "#C853FF", "#FF00FF", "#FF4A92", "#FF5656",
            "#FF630D", "#CA8101", "#F3E700", "#8BC301", "#00FF00", "#01CC8B", "#00DEDE",
        
            "#FFFFFF", "#627FFF", "#B270FF", "#D170FF", "#FF36E5", "#FF69A4", "#FF7373",
            "#FF7D36", "#E79401", "#FFFF00", "#A2E501", "#58FF3D", "#01EAA0", "#00FFFF",        
        ];
        this.generateSwatches();
    }

    /**
    * Creates a colorpicker
    *
    * @class  XUIColorpicker
    * @constructor
    * 
    * @example
    *     <xui-colorpicker></xui-colorpicker>
    */
    XUIColorpicker.prototype =
    {
        ready: XUIColorpicker,
        
        publish:
        {
            /**
             * Disables/enables the colorpicker
             *
             * @attribute   disabled
             * @type        Boolean
             * @default     false
             */
            disabled        : { value: false, reflect: true },

            /**
             * Whether the colorpicker allows no value(transparent) or not
             *
             * @attribute   allowTransparent
             * @type        Boolean
             * @default     false
             */
            allowTransparent    : { value: false, reflect: true },
            
            /**
             * Setsvalue
             *
             * @attribute   value
             * @type        String
             */
            value   : { value: "", reflect: true },
            
            /**
             * Sets the predefined colors
             *
             * @attribute   optionlist
             * @type        object
             */
            colorlist      : { value: [], reflect: true },

            /**
             * Sets the previous value
             *
             * @attribute   optionlist
             * @type        String
             */
            oldvalue      : { value: "", reflect: true }
        },

        valueChanged: function(oldValue, newValue)
        {
            var isOk  = /#([0-9A-F]{6}$)|#([0-9A-F]{3}$)/i.test(newValue);

            if (!isOk)
            {
                if ((this.allowTransparent && newValue == "#") || newValue == "")
                {

                }
                else
                {
                    this.value = oldValue;
                    return;
                }
            }

            if (newValue.length != 4)
            {
                newValue = (newValue).toUpperCase();
            }
            else
            {
                newValue = (newValue.charAt(0) + newValue.charAt(1) + newValue.charAt(1) + newValue.charAt(2) + newValue.charAt(2) + newValue.charAt(3) + newValue.charAt(3)).toUpperCase();
            }

            this.$.inputColor.value = newValue.replace("#","");

            if (newValue == "#")
            {
                this.$.picker.style.backgroundColor = "transparent";
            }
            else
            {
                this.$.picker.style.backgroundColor = newValue;
            }
            this.fire("change");
        },

        generateSwatches: function()
        {
            var _this = this,
                palette = _this.$.palette,
                colorCount = _this.colorlist.length;

            //remove all children of palette, faster equivalent of innerHTML = ""
            for (var i = palette.childNodes.length - 1; i >= 0; i--)
            {
                palette.removeChild(palette.childNodes[i]);
            }

            for (var i = 0; i < colorCount; i++)
            {
                var color = _this.colorlist[i],
                    swatch = document.createElement("div");

                swatch.classList.add("swatch");
                swatch.setAttribute("hexcolor", color);
                swatch.style.backgroundColor = color;

                swatch.addEventListener("mouseover", function()
                {
                    _this.value = this.getAttribute("hexcolor");
                    _this.clearSelected();
                    this.classList.add("overed");
                });

                swatch.addEventListener("click", function()
                {
                    var hexColor = this.getAttribute("hexcolor");
                    _this.value = hexColor;
                    _this.oldvalue = hexColor;
                    _this.clearSelected();
                    _this.$.paletteContainer.hidden = true;
                    document.body.removeEventListener('mousedown', mouseCancel.bind(_this), false);
                    document.body.removeEventListener('keydown', keyCancel.bind(_this), false);
                    _this.fire("set");
                });

                palette.appendChild(swatch);
            }
        },

        showHidePicker: function(event)
        {
            if (event.which != undefined && event.which != 1)
            {
                return;
            }

            var _this = this,
                paletteContainer = _this.$.paletteContainer,
                hidden = paletteContainer.hidden;
            paletteContainer.hidden = !hidden;

            if (hidden)
            {
                _this.showSelected();
                _this.oldvalue = _this.value;
                self = _this;
                document.body.addEventListener('mousedown', mouseCancel, false);
                document.body.addEventListener('keydown', keyCancel, false);                
            }
            else
            {
                _this.clearSelected();
                document.body.removeEventListener('mousedown', mouseCancel, false);
                document.body.removeEventListener('keydown', keyCancel, false);
                self = null;
                //blur colorpicker
            }            
        },

        showSelected: function()
        {
            var selfValue = this.value,
                paletteContainer = this.$.paletteContainer,
                selector = "[hexcolor='" + selfValue + "']",
                selectedSwatch = paletteContainer.querySelector(selector);

            if (selectedSwatch)
            {
                selectedSwatch.classList.add("selected");    
            }
            this.$.inputColor.value = selfValue.replace("#","");
            this.$.inputColor.focus();
        },

        clearSelected: function()
        {
            var paletteContainer = this.$.paletteContainer;
            var selected = paletteContainer.querySelectorAll(".swatch.selected, .swatch.overed");
            if (selected.length > 0)
            {
                for (var i = selected.length - 1; i >= 0; i--)
                {
                    selected[i].classList.remove("selected", "overed");
                };
            }
        },

        onInputChange: function(event)
        {
            event.stopPropagation();
        },

        onInputKeydown: function(event)
        {
            if (event.which == 13)
            {
                this.value = "#" + this.$.inputColor.value;
                this.oldvalue = this.value;
                this.clearSelected();
                this.showSelected();
                this.fire("set");
            }
            else if (event.which == 9)
            {
                cancelChange();
            }
        },

        onInputDragstart: function(event)
        {
            event.preventDefault();
        },

        onPickerKeydown: function(event)
        {
            if (event.which == 13 || event.which == 32)
            {
                this.$.picker.click();
            }
        },

        reset: function()
        {
            this.value = "";
            this.$.inputColor.value = "";
            this.oldvalue = "";
            this.fire("reset");
        }
    };
    
    Polymer.call({}, XUIColorpicker.prototype);
})();