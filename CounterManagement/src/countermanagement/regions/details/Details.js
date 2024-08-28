define([
    'jscore/core',
    './DetailsView',
    'i18n!countermanagement/dictionary.json',
    '../../utils/Rest',
    '../../utils/ErrorHandling',
    'widgets/InlineMessage',
    'widgets/Loader',
    '../../widgets/counterDetails/CounterDetails'
], function(core, View, dictionary, Rest, ErrorHandling, InlineMessage, Loader, CounterDetails) {
    'use strict';

    return core.Region.extend({
        View: View,

        init: function() {
            this.message = null;
            this.loader = null;
            this.selectedCounterName = null;
            this.counterDetails = null;
        },

        onStart: function() {
            this.getEventBus().subscribe('onCounterSelection', this.onCounterSelection, this);
            this.getEventBus().subscribe('onDetailsPanel:open', this.getCounterDetails, this);
        },

        onViewReady: function() {
            this.clearCounterDetails();
        },

        onStop: function() {
        },

        showLoader: function() {
            if (this.loader) {
                this.loader.destroy();
                this.loader = null;
            }
            this.loader = new Loader();
            this.loader.attachTo(this.getElement());
        },

        hideLoader: function() {
            if (this.loader) {
                this.loader.destroy();
                this.loader = null;
            }
        },

        getSelectedCounter: function() {
            return this.selectedCounterName;
        },

        setSelectedCounter: function(selectedCounterName) {
            this.selectedCounterName = selectedCounterName;
        },

        onCounterSelection: function(selectedCounterName) {
            this.setSelectedCounter(selectedCounterName);
            this.getCounterDetails();
        },

        getCounterDetails: function() {
            if (this.getSelectedCounter() && this.options.app.slidingPanel.isShown('right')) {
                this.fetchCounterDetails(this.getSelectedCounter());
            } else {
                this.clearCounterDetails();
            }
        },

        fetchCounterDetails: function(selectedCounterName) {
            this.showLoader();
            Rest.getFlexCounterDetails(selectedCounterName)
                .then(
                    function(data) {
                        this.hideLoader();
                        this.onFetchDetailsSuccess(data);
                    }.bind(this)
                )
                .catch(
                    function(xhr) {
                        this.hideLoader();
                        this.clearMessage();
                        this.message = ErrorHandling.handle(xhr, this.view.getMessageArea());
                        this.view.toggleMessageArea();
                    }.bind(this)
                );
        },

        clearMessage: function() {
            if (this.message) {
                this.message.destroy();
                this.message = null;
            }
        },

        onFetchDetailsSuccess: function(response) {
            this.showCounterDetails(response);
        },

        showCounterDetails: function(counterDetailsData) {
            if (this.counterDetails) {
                this.counterDetails.destroy();
                this.counterDetails = null;
            }
            this.counterDetails = new CounterDetails({data: counterDetailsData});
            this.counterDetails.attachTo(this.view.getContentArea());
            this.view.toggleContentArea();
        },

        clearCounterDetails: function() {
            this.clearMessage();
            this.message = new InlineMessage({
                header: dictionary.details.defaultDetailsMessageTitle,
                description: dictionary.details.defaultDetailsMessageText,
                icon: 'infoMsgIndicator'
            });
            this.message.attachTo(this.view.getMessageArea());
            this.view.toggleMessageArea();
        },

    });
});
