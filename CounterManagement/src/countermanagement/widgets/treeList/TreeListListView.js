define([
    'jscore/core',
    'template!./_treeList.html',
    'styles!./_treeList.less'
], function(core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function() {
            return template(this.options);
        },

        getStyle: function() {
            return styles;
        },

        getAllCheckBoxes: function() {
            return this.getElement().findAll('.ebCheckbox');
        },

        getMessageArea: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-message');
        },

        getTreeArea: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree');
        },

        showTreeArea: function() {
            this.getTreeArea().removeStyle('display');
        },

        hideTreeArea: function() {
            this.getTreeArea().setStyle('display', 'none');
        },

        showMessageArea: function() {
            this.getMessageArea().removeStyle('display');
        },

        hideMessageArea: function() {
            this.getMessageArea().setStyle('display', 'none');
        },

        getSelectedNum: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree-selectAndClear-selected-num');
        },

        getClearSelectionLink: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree-selectAndClear-clearSelection-Link');
        },

        getClearSelection: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree-selectAndClear-clearSelection');
        },

        getFilterIconButton: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree-filter-icon');
        },

        getTreeContent: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree-content');
        },

        showClearSelection: function() {
            this.getClearSelection().removeStyle('display');
        },

        hideClearSelection: function() {
            this.getClearSelection().setStyle('display', 'none');
        },

        getFilterInput: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-tree-filter-input');
        },

        getTitleCountSpan: function() {
            return this.getElement().find('.eaCounterManagement-wTreeListWidget-title-count');
        },

        setTitleCount: function(count) {
            this.getTitleCountSpan().setText('(' + count + ')');
        },

        showFilterIconButton: function(filterStr) {
            this.getFilterIconButton().setStyle({display: filterStr !== '' ? 'block' : 'none'});
        }
    });

});
