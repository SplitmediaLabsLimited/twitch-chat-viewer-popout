/* globals Polymer */
(function()
{
    "use strict";
    
    function XUIListBox()
    {
        if(this.disabled)
        {
            this.$.label.classList.add("disabled");   
            this.$.options.classList.add("disabled");  
        }
        
        
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
    XUIListBox.prototype =
    {
       ready: XUIListBox,
        
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
             * Sets the available options
             *
             * @attribute   optionlist
             * @type        String
             */
            optionlist      : { value: [], reflect: true },
            
            /**
             * Sets the class
             *
             * @attribute   class
             * @type        String
             */
            itemclass       : { value: "", reflect: true },
            
            selected        : { value: "", reflect: true }
        },
        
        selectOptions: function(event)
        {
            var items = this.$.options.getElementsByTagName("a");
            for(var i = 0; i < items.length; i++) 
            {
                items[i].classList.remove("selected");
            }
            event.target.classList.add("selected");
            this.selected = event.target.getAttribute("value");
        }
    };
    
    Polymer.call({}, XUIListBox.prototype);
})();