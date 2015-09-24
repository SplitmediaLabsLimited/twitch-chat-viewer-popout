/* global Polymer */
(function()
{
    "use strict";
    
    function XUIOverlay()
    {
        this.$.overlay.style.visibility = (this.visible) ? "visible" : "hidden";
    }
    
    /**
    * Creates a button
    *
    * @class  XUIButton
    * @constructor
    * 
    * @example
    *     <xui-button>text</xui-button>
    */
    XUIOverlay.prototype =
    {
        ready: XUIOverlay,
        
        publish:
        {
            visible: { value: false, reflect: true }
        },
        
        visibleChanged: function()
        {
            this.$.overlay.style.visibility = (this.visible) ? "visible" : "hidden";
        },
        
        toggleOverlay: function(event)
        {
            if(event.target === this.$.overlay)
            {
                this.visible = false;
            }
        }
        
    };
    
    Polymer.call(this, XUIOverlay.prototype);
})();