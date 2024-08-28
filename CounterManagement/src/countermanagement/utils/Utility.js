define([
    'jscore/ext/utils/base/underscore',
    'i18n/AdvancedDateTime'

], function(_, advancedDateTime) {

    return {
        groupByProperty: function(list, property) {
            return _.groupBy(list, function(item) {
                return item[property];
            });
        },

        getMapObject: function(arr, name) {
            var data = {};
            var id = name ? name : 'id';

            if (arr) {
                arr.forEach(function(item) {
                    data[item[id]] = item;
                });
            }

            return data;
        },

        convertToTreeItem: function(list, type) {
            var data = [];
            switch (type) {
            case 'counter':
                data = this._convertCounterToTreeItem(list, 'sourceObject');
                break;
            case 'filter':
                data = this._convertFilterToTreeItem(list);
                break;
            }
            return data;
        },

        _convertFilterToTreeItem: function(flexGroups) {
            return flexGroups.map(function(flexGroup) {
                return {
                    id: flexGroup.flexGroupId,
                    label: flexGroup.flexGroupId,
                    checkbox: {value: flexGroup.flexGroupId},
                    parent: null,
                    children: 0,
                    offset: 0
                };
            });
        },

        _convertCounterToTreeItem: function(baseCounters, property) {
            var baseGroups = this.groupByProperty(baseCounters, property);
            var data = [];

            Object.keys(baseGroups).forEach(function(key) {
                var parent = {
                    id: key, label: key, checkbox: {value: key}, parent: null, children: 0, offset: 0
                };

                if (baseGroups[key].length > 0) {
                    parent.children = baseGroups[key].length;

                    baseGroups[key].forEach(function(baseGroup, index) {
                        data.push({
                            id: baseGroup.baseCounterName,
                            label: baseGroup.baseCounterName,
                            checkbox: {value: baseGroup.baseCounterName},
                            parent: key,
                            children: 0,
                            offset: index
                        });
                    });
                }

                data.push(parent);

            });
            return data;

        },

        invertType: function(type) {
            if (type === 'counter') {
                return 'filter';
            } else if (type === 'filter') {
                return 'counter';
            } else {
                throw new Error('Type must be either counter or filter');
            }
        },

        formatDateAttributes: function(value) {
            var formattedDateString;
            if (value) {
                var date = new Date(value);
                formattedDateString = advancedDateTime(date).mode('international').format('DTS');
            } else {
                formattedDateString = value;
            }
            return formattedDateString;
        }

    };

});
