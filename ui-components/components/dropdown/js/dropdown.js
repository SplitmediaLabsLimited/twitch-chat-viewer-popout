/* globals Polymer, document */
(function()
{
    "use strict";
    var self;

    var mouseCancel = function()
        {
            if (event.target != self && !self.contains(event.target))
            {
                self.XUIDropdownClicked();
            }
        },

        keyCancel = function()
        {
            if (event.which == 9) // tab
            {
                self.XUIDropdownClicked();
            }
            else if (event.which == 27) // esc
            {
                self.$.select.focus();
                self.XUIDropdownClicked();
                event.stopPropagation();
            }
            else if (event.which == 33) // page up
            {
                var list = self.$.options;
                var optionCollection = list.querySelectorAll("a");
                var optionCollectionLength = optionCollection.length;

                for (var i = 0; i < optionCollectionLength; i++)
                {
                    if (optionCollection[i].classList.contains("selected"))
                    {
                        var selected = optionCollection[i];
                        if (i > 0)
                        {
                            selected.classList.remove("selected");
                            var steps = Math.floor(list.offsetHeight/selected.offsetHeight) - 1;
                            var newSelected, viewportOffset;

                            if (i >= steps)
                            {
                                newSelected = optionCollection[i-steps];
                            }
                            else
                            {
                                newSelected = optionCollection[0];
                            }
                            newSelected.classList.add("selected");
                            viewportOffset = newSelected.getBoundingClientRect();
                            self.computeScrollTop(viewportOffset, newSelected.offsetHeight + parseFloat(getComputedStyle(newSelected).marginTop) + parseFloat(getComputedStyle(newSelected).marginBottom));
                        }
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            else if (event.which == 34) // page down
            {
                var list = self.$.options;
                var optionCollection = list.querySelectorAll("a");
                var optionCollectionLength = optionCollection.length;

                for (var i = 0; i < optionCollectionLength; i++)
                {
                    if (optionCollection[i].classList.contains("selected"))
                    {
                        var selected = optionCollection[i];
                        if (i < (optionCollectionLength - 1))
                        {
                            selected.classList.remove("selected");
                            var steps = Math.floor(list.offsetHeight/selected.offsetHeight) - 1;
                            var newSelected, viewportOffset;

                            if (i <= optionCollectionLength - 1 - steps)
                            {
                                newSelected = optionCollection[i + steps];
                            }
                            else
                            {
                                newSelected = optionCollection[optionCollectionLength-1];
                            }
                            newSelected.classList.add("selected");
                            viewportOffset = newSelected.getBoundingClientRect();
                            self.computeScrollTop(viewportOffset, newSelected.offsetHeight + parseFloat(getComputedStyle(newSelected).marginTop) + parseFloat(getComputedStyle(newSelected).marginBottom));
                        }
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            else if (event.which == 35) // end
            {
                var list = self.$.options;
                var optionCollection = list.querySelectorAll("a");
                var optionCollectionLength = optionCollection.length;
                var selected = list.querySelector("a.selected");
                var newSelected = optionCollection[optionCollectionLength-1];

                if (newSelected != selected)
                {
                    var viewportOffset = newSelected.getBoundingClientRect();
                    selected.classList.remove("selected");
                    newSelected.classList.add("selected");
                    self.computeScrollTop(viewportOffset, newSelected.offsetHeight + parseFloat(getComputedStyle(newSelected).marginTop) + parseFloat(getComputedStyle(newSelected).marginBottom));
                }
                event.stopPropagation();
                event.preventDefault();                
            }
            else if (event.which == 36) // home
            {
                var list = self.$.options;
                var optionCollection = list.querySelectorAll("a");
                var selected = list.querySelector("a.selected");
                var newSelected = optionCollection[0];

                if (newSelected != selected)
                {
                    var viewportOffset = newSelected.getBoundingClientRect();
                    selected.classList.remove("selected");
                    newSelected.classList.add("selected");
                    self.computeScrollTop(viewportOffset, newSelected.offsetHeight + parseFloat(getComputedStyle(newSelected).marginTop) + parseFloat(getComputedStyle(newSelected).marginBottom));
                }
                event.stopPropagation();
                event.preventDefault();                
            }
            else if (event.which == 38) // up
            {
                var list = self.$.options;
                var optionCollection = list.querySelectorAll("a");
                var optionCollectionLength = optionCollection.length;

                for (var i = 0; i < optionCollectionLength; i++)
                {
                    if (optionCollection[i].classList.contains("selected"))
                    {
                        var selected = optionCollection[i];
                        if (i > 0)
                        {
                            selected.classList.remove("selected");
                            var newSelected = optionCollection[i-1];
                            var viewportOffset = newSelected.getBoundingClientRect();
                            newSelected.classList.add("selected");
                            self.computeScrollTop(viewportOffset, newSelected.offsetHeight + parseFloat(getComputedStyle(newSelected).marginTop) + parseFloat(getComputedStyle(newSelected).marginBottom));
                        }
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            else if (event.which == 40) // down
            {
                var list = self.$.options;
                var optionCollection = list.querySelectorAll("a");
                var optionCollectionLength = optionCollection.length;

                for (var i = 0; i < optionCollectionLength; i++)
                {
                    if (optionCollection[i].classList.contains("selected"))
                    {
                        var selected = optionCollection[i];
                        if (i < (optionCollectionLength - 1))
                        {
                            selected.classList.remove("selected");
                            var newSelected = optionCollection[i+1];
                            var viewportOffset = newSelected.getBoundingClientRect();
                            newSelected.classList.add("selected");
                            self.computeScrollTop(viewportOffset, newSelected.offsetHeight + parseFloat(getComputedStyle(newSelected).marginTop) + parseFloat(getComputedStyle(newSelected).marginBottom));
                        }
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();                
            }
            else if (event.which == 13) // enter
            {
                var selected = self.$.dropdown.querySelector("#options a.selected");
                if (selected != null)
                {
                    selected.click();
                    event.preventDefault();
                }
            }
            else if (event.keyCode >= 65 && event.keyCode <= 90)
            //cycle between values starting with letter
            {
                
            }
        };
    
    function XUIDropdown()
    {
        this.$.options.hidden = true;
        this.updateOptions();   
    }
    
    /**
    * Creates a dropdown
    *
    * @class  XUIDropdown
    * @constructor
    * 
    * @example
    *     <xui-dropdown label="Dropdown Label"></xui-dropdown>
    */
    XUIDropdown.prototype =
    {
       ready: XUIDropdown,
        
        publish:
        {
            /**
             * Label for the dropdown
             *
             * @attribute   label
             * @type        String
             */
            label           : { value: "", reflect: true },
       
            /**
             * Disables/enables the dropdown
             *
             * @attribute   disabled
             * @type        Boolean
             * @default     false
             */
            disabled        : { value: false, reflect: true },
            
            /**
             * Sets selected Option
             *
             * @attribute   selected
             * @type        String
             */
            selected        : { value: "", reflect: true },
            
            /**
             * Sets selected Value
             *
             * @attribute   value
             * @type        String
             */
            value   : { value: "", reflect: true },
            
            /**
             * Sets the available options
             *
             * @attribute   optionlist
             * @type        String
             */
            optionlist      : { value: [], reflect: true }
        },
       
        valueChanged: function(oldValue, newValue)
        {
            if (oldValue == newValue)
            {
                return;
            }

            var selector = "#options a[value='" + newValue + "']";
            var selected = this.$.dropdown.querySelector(selector);
            
            if (selected != null)
            {
                this.selected = newValue;
            }
            this.fire("change");
        },

        computeScrollTop: function(viewportOffset, height)
        {
            var scrollDiv = this.$.options;
            var minTop = scrollDiv.getBoundingClientRect().top;
            var maxTop = scrollDiv.getBoundingClientRect().bottom - height;

            if (viewportOffset.top < minTop)
            {
                var difference = minTop - viewportOffset.top; 
                scrollDiv.scrollTop = scrollDiv.scrollTop - difference; 
            }
            else if (viewportOffset.top > maxTop)
            {
                var difference = viewportOffset.top - maxTop; 
                scrollDiv.scrollTop = scrollDiv.scrollTop + difference;
            }             
        },

        XUIDropdownClicked: function(event)
        {
            var hidden = this.$.options.hidden; 
            this.$.options.hidden = !hidden;

            if (!hidden)
            {
                this.clearSelected();
                document.body.removeEventListener('mousedown', mouseCancel, false);
                document.body.removeEventListener('keydown', keyCancel, false);                
                self = null;
            }
            else
            {
                self = this;
                document.body.addEventListener('mousedown', mouseCancel, false);
                document.body.addEventListener('keydown', keyCancel, false);                
                this.showSelected();
            }

            if(typeof event !== "undefined")
            {
                //this.fire('change', event);
                event.stopPropagation();
                if (event.which == 2)
                {
                    event.preventDefault();
                }
            }
        },
        
        showSelected: function()
        {
            var selector = "#options a[value='" + this.value + "']";
            var selected = this.$.dropdown.querySelector(selector);

            if (selected != null)
            {
                selected.classList.add("selected");
                var viewportOffset = selected.getBoundingClientRect();
                var outerHeight = selected.offsetHeight + parseFloat(getComputedStyle(selected).marginTop) + parseFloat(getComputedStyle(selected).marginBottom);
                this.computeScrollTop(viewportOffset, outerHeight);
            }            
            this.$.select.focus();
        },

        clearSelected: function()
        {
            var selected = this.$.dropdown.querySelectorAll("#options a.selected");
            for (var i = selected.length - 1; i >= 0; i--)
            {
                selected[i].classList.remove("selected");
            };
        },

        onMouseOver: function(event, detail, sender)
        {
            this.clearSelected();
            sender.classList.add("selected");
        },

        selectOptions: function(event, detail, sender)
        {
            if (event.which != undefined && event.which != 1)
            {
                event.preventDefault();
                return;
            }

            this.value = sender.getAttribute('value');
            this.XUIDropdownClicked();
            this.fire("select");
        },
        
        optionlistChanged: function(oldVal, newVal)
        {
            if(typeof newVal !== "undefined")
            {
                if (oldVal != newVal)
                {
                    this.optionlist = newVal;
                    this.updateOptions();
                }
            }
        },
        
        /**
         * Updates the option list
         */
        updateOptions: function()
        {
            var list = [];
            var selectedValue = 0;
            var selectedName = "";
            if(this.optionlist.length > 0)
            {
                selectedValue = this.value;
                selectedName = this.selected;
                list = this.optionlist.slice(0);
            }
            
            this.list = list;
            this.selected = selectedName;
        }
    };
    
    Polymer.call({}, XUIDropdown.prototype);
})();