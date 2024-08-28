define([
    'jscore/core',
    'i18n!countermanagement/dictionary.json',
    'template!./_emptyListMessage.html',
    'styles!./_emptyListMessage.less'
], function(core, dictionary, template, style) {

    return core.View.extend({

        getTemplate: function() {
            return template(dictionary);
        },

        getStyle: function() {
            return style;
        },

        getContent: function() {
            return this.getElement().find('.eaCounterManagement-emptyListMessage-content-message');
        },

        setMessageContent: function() {
            var content = this.getContent();
            // Escape the HTML content by setting it as the text content
            content.setText(dictionary.counterTable.infoMessage.noFlexCounterCreated.content);

            // Parse the markdown link syntax
            var escapedContent = content.getProperty('innerHTML');
            escapedContent = escapedContent.replace(/\[/g, '<strong class="eaCounterManagement-emptyListMessage-content-message-highlight">');
            escapedContent = escapedContent.replace(/\]/g, '</strong>');

            // Apply the parsed content
            content.setProperty('innerHTML', escapedContent);
        }
    });
});

