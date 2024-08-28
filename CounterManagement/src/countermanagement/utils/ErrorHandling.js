define([
    'i18n!countermanagement/dictionary.json',
    'widgets/InlineMessage',
    'widgets/Dialog'
], function(dictionary, InlineMessage, Dialog) {
    return {
        /**
         * Error handling based on the status of the errorStatus or XMLHttpRequest object
         *
         * @method handle
         * @param error {Object} {data: {errorCode: int}, xhr: XMLHttpRequest}
         * @param target {HTML element} If target is defined, message will be attached to it as a inline message
         *                              otherwise will be displayed as a popup
         * @returns {Object} Created HTML error message
         */
        handle: function(error, target) {
            if (!error || !error.xhr) { return; } // Blocking an unwanted usage during unit tests
            var header, description, serverStatus;
            var errorStatus = error.xhr.getStatus().toString();
            if (error.data && error.data.errorCode) {
                serverStatus = error.data.errorCode.toString();
            }
            if (serverStatus && serverStatus !== '-1' && dictionary.errors.internal[serverStatus]) {
                header = dictionary.errors.internal[serverStatus].header;
                description = dictionary.errors.internal[serverStatus].description;
            }
            else if (dictionary.errors.generic[errorStatus]) {
                header = dictionary.errors.generic[errorStatus].header;
                description = dictionary.errors.generic[errorStatus].description;
            }
            else {
                header = dictionary.errors.generic.unknown.header;
                description = dictionary.errors.generic.unknown.description;
            }
            if (target) {
                this.message = new InlineMessage({
                    header: header,
                    description: description,
                    icon: 'error'
                });
                this.message.getElement().setStyle('margin-top', '20px');
                this.message.attachTo(target);
                return this.message;
            }
            else {
                this.errorWindow = new Dialog({
                    type: 'error',
                    header: header,
                    content: description,
                    buttons: [{
                        caption: dictionary.buttons.ok,
                        action: function() {
                            this.errorWindow.destroy();
                        }.bind(this)
                    }]
                });
                this.errorWindow.show();
                return this.errorWindow;
            }
        }
    };
});
