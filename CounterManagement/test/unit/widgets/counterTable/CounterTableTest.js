define([
    'jscore/core',
    'countermanagement/widgets/counterTable/CounterTableLayout',
    'countermanagement/widgets/counterTable/CounterTable',
    'countermanagement/widgets/counterTable/CounterTableColumns',
    'tablelib/Table',
    'tablelib/plugins/ResizableHeader',
    'tablelib/plugins/Selection',
    'tablelib/plugins/SortableHeader',
    'tablelib/plugins/SecondHeader',
    'tablelib/plugins/StickyScrollbar'

], function(core, CounterTableLayout, CounterTable, CounterTableColumns,Table ,ResizableHeader, Selection, SortableHeader, SecondHeader,StickyScrollbar) {
    'use strict';

    describe('CounterTable', function() {

        var classUnderTest,
            sandbox;

        var table_data = [
            { 'counterName': 'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1', 'moClass': 'NRCellCU','status': 'Unpublished', 'filter': 'UeCat2-100UePwrClass0|1', 'modifiedDate': '20190928152828', 'createdBy': 'administrator'} ,
            { 'counterName': 'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4', 'moClass': ' NRCellCU ','status': 'Published', 'filter': 'UeCat4-100|103UePwrClass0|1|4', 'modifiedDate': '20190828152828', 'createdBy': 'user1' } ,
            { 'counterName': 'pmFlexRwrFailPlmnNotAllowed_UeCat7-80UePwrClass10|11|44', 'moClass': ' NRCellCU ','status': 'Published', 'filter': 'UeCat7-80UePwrClass10|11|44', 'modifiedDate': '20160828152828', 'createdBy': ' administrator'}
        ];

        var data = [
            {
                'flexCounterName': 'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1',
                'status': 'UnPublished',
                'createdBy': 'administrator',
                'modified': 1559917413241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsRwrFailNoEutranTarget',
                    'counterDescription': 'Number of UE Releases with Redirection that cannot be performed because there is no defined EUTRAN target.Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection to EUTRAN cannot be performed because there is no defined EUTRAN target.,',
                    'sourceObject': 'NRCellCU',
                    'networkFunction': 'CuCp',
                    'eventName': 'CuCpRwrMobilityDecision'
                },
                'flexFilter': {
                    'flexFilterId': 'UeCat2-100UePwrClass0|1',
                    'flexFilterInstances': [
                        {
                            'flexFilterInstanceName': 'UeCat2-100',
                            'value': [
                                '2-100'
                            ],
                            'flexGroup': {
                                'flexGroupId': 'UeCat',
                                'type': 'enum',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                },
                                'enumMembers': [
                                    {
                                        'key': 'DISABLED',
                                        'value': 0,
                                        'description': 'The resource is totally inoperable and unable to provide service to the user(s).'
                                    },
                                    {
                                        'key': 'ENABLED',
                                        'value': 1,
                                        'description': 'The resource is partially or fully operable and available for use.'
                                    }
                                ]
                            }
                        },
                        {
                            'flexFilterInstanceName': 'UePwrClass0|1',
                            'flexGroup': {
                                'flexGroupId': 'UePwrClass',
                                'type': 'enum',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                },
                                'enumMembers': [
                                    {
                                        'key': 'DISABLED',
                                        'value': 0,
                                        'description': 'The resource is totally inoperable and unable to provide service to the user(s).'
                                    },
                                    {
                                        'key': 'ENABLED',
                                        'value': 1,
                                        'description': 'The resource is partially or fully operable and available for use.'
                                    }
                                ]
                            },
                            'value': [
                                0,
                                1
                            ]
                        }
                    ]
                }
            },
            {
                'flexCounterName': 'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4',
                'status': 'UnPublished',
                'createdBy': 'eskngnn',
                'modified': 1459917403241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsRwrFailPlmnNotAllowed',
                    'counterDescription': 'Number of UE Releases with Redirection that cannot be performed because PLMN is not allowed.\n            Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection cannot be performed because PLMN is not allowed.',
                    'sourceObject': 'NRCellCU',
                    'networkFunction': 'CuCp',
                    'eventName': 'CuCpRwrMobilityDecision'
                },
                'flexFilter': {
                    'flexFilterId': 'UeCat4-100|103UePwrClass0|1|4',
                    'flexFilterInstances': [
                        {
                            'flexFilterInstanceName': 'UeCat4-100|103|190',
                            'flexGroup': {
                                'flexGroupId': 'UeCat',
                                'type': 'enum',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                },
                                'enumMembers': [
                                    {
                                        'key': 'DISABLED',
                                        'value': 0,
                                        'description': 'The resource is totally inoperable and unable to provide service to the user(s).'
                                    },
                                    {
                                        'key': 'ENABLED',
                                        'value': 1,
                                        'description': 'The resource is partially or fully operable and available for use.'
                                    }
                                ]
                            },
                            'value': [
                                '4-100',
                                103,
                                190
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'UePwrClass0|1|4',
                            'flexGroup': {
                                'flexGroupId': 'UePwrClass',
                                'type': 'enum',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                },
                                'enumMembers': [
                                    {
                                        'key': 'DISABLED',
                                        'value': 0,
                                        'description': 'The resource is totally inoperable and unable to provide service to the user(s).'
                                    },
                                    {
                                        'key': 'ENABLED',
                                        'value': 1,
                                        'description': 'The resource is partially or fully operable and available for use.'
                                    }
                                ]
                            },
                            'value': [
                                0,
                                1,
                                4
                            ]
                        }
                    ]
                }
            },
            {
                'flexCounterName': 'pmFlexRwrFailPlmnNotAllowed_UeCat7-80UePwrClass10|11|44',
                'status': 'UnPublished',
                'createdBy': 'administrator',
                'modified': 1359917413241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsRwrFailUeCap',
                    'counterDescription': 'Number of UE Releases with Redirection that cannot be performed because UE is not capable.\n            Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection cannot be performed because UE lacks capabilities required.',
                    'sourceObject': 'NRCellCU',
                    'networkFunction': 'CuCp',
                    'eventName': 'CuCpRwrMobilityDecision'
                },
                'flexFilter': {
                    'flexFilterId': 'UeCat7-80UePwrClass10|11|44',
                    'flexFilterInstances': [
                        {
                            'flexFilterInstanceName': 'UeCat7-80',
                            'flexGroup': {
                                'flexGroupId': 'UeCat',
                                'type': 'enum',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                },
                                'enumMembers': [
                                    {
                                        'key': 'DISABLED',
                                        'value': 0,
                                        'description': 'The resource is totally inoperable and unable to provide service to the user(s).'
                                    },
                                    {
                                        'key': 'ENABLED',
                                        'value': 1,
                                        'description': 'The resource is partially or fully operable and available for use.'
                                    }
                                ]
                            },
                            'value': [
                                '7-80'
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'UePwrClass10|11|44',
                            'flexGroup': {
                                'flexGroupId': 'UePwrClass',
                                'type': 'enum',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                },
                                'enumMembers': [
                                    {
                                        'key': 'DISABLED',
                                        'value': 0,
                                        'description': 'The resource is totally inoperable and unable to provide service to the user(s).'
                                    },
                                    {
                                        'key': 'ENABLED',
                                        'value': 1,
                                        'description': 'The resource is partially or fully operable and available for use.'
                                    }
                                ]
                            },
                            'value': [
                                10,
                                11,
                                44
                            ]
                        }
                    ]
                }
            }];

        beforeEach(function() {
            sandbox = sinon.sandbox.create();

            this.options = {
                showErrorMessage: [],
                tableLayout: {
                    attributes: {
                        tableColumns: {
                            counterName: {width: '360px', visible: 'true', sortMode: ''},
                            status: {width: '150px', visible: 'true', sortMode: ''},
                            moClass: {width: '200px', visible: 'true', sortMode: ''},
                            filter: {width: '305px', visible: 'true', sortMode: ''},
                            createdBy: {width: '200px', visible: 'true', sortMode: ''},
                            modifiedDate: {width: '200px', visible: 'true', sortMode: ''}
                        }
                    }
                },
                flexCounterList: []
            };
            classUnderTest = new CounterTable({ data: [] });
            classUnderTest.counterTableColumns = new CounterTableColumns({
                tableLayout: this.options.tableLayout
            });
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('onViewReady()', function() {

            it('should update the count to 1 if a counter table exists with 1 counter', function() {
                var updateCountOnFilter_spy = sandbox.spy(classUnderTest, 'updateCountOnFilter');

                classUnderTest.tableWidget = {
                    destroy: function() {}
                };

                classUnderTest.onViewReady({data: [data[0]]});

                expect(updateCountOnFilter_spy.callCount).to.equal(2);
                expect(updateCountOnFilter_spy.calledWith(1)).to.equal(true);
            });

            it('should update the number of selected rows if rows were previously selected', function() {
                var setSelectCount_spy = sandbox.spy(classUnderTest.view, 'setSelectCount');

                classUnderTest.tableWidget = {
                    getRows: function() {
                        return ['Row1', 'Row2', 'Row3'];
                    },
                    getSelectedRows: function() {
                        return ['SelectedRow1', 'SelectedRow2'];
                    },
                    destroy: function() {

                    }
                };

                classUnderTest.onViewReady({data: []});

                expect(setSelectCount_spy.callCount).to.equal(1);
                expect(setSelectCount_spy.calledWith('2'), 'should have 2 selected rows').to.equal(true);
            });
        });

        describe('filterResults()', function() {

            it('Should partial Filter filter counter name column for all data', function() {
                var attr = 'counterName';
                var filter = {'counterName': {value: 'pmFlex', comparator: '='}};
                var results = classUnderTest.filterResults(table_data, filter, attr);
                expect(results.length).to.equal(3);
                expect(results[0]['counterName']).to.equal('pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1');
                expect(results[1]['counterName']).to.equal('pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4');
                expect(results[2]['counterName']).to.equal('pmFlexRwrFailPlmnNotAllowed_UeCat7-80UePwrClass10|11|44');
            });
        });

        describe('applyColumnFilter()', function() {

            it('Should partial Filter flex counter name column for 1 data', function() {
                var rows;
                classUnderTest.counterArray = table_data;
                classUnderTest.tableWidget = {
                    getRows: function() {
                        return rows;
                    },
                    getSelectedRows: function() {
                        return [''];
                    },
                    setData: function(data) {
                        rows = data;
                    },
                    getData: function() {
                        return rows;
                    }
                };
                classUnderTest.view.getTableWrapper = function() {
                    return {
                        setStyle: function(attribute, value) {
                            attribute = value;
                        }
                    };
                };
                classUnderTest.applyColumnFilter('counterName','UeCat2','=');
                var results = classUnderTest.tableWidget.getRows();
                expect(results.length).to.equal(1);
                expect(results[0]['counterName']).to.equal('pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1');
            });
        });

        describe('applyColumnOrder()',function() {
            it('Should order the Counter Table columns', function() {
                classUnderTest.applyColumnOrder(classUnderTest.counterTableColumns.getOrderedColumns().columns);
                var orderedColumn = Object.keys(classUnderTest.counterTableColumns.tableLayout.attributes.tableColumns);
                expect(orderedColumn[2]).to.equal('moClass');
                expect(orderedColumn[0]).to.equal('counterName');
                expect(orderedColumn[1]).to.equal('status');
                expect(orderedColumn[3]).to.equal('filter');
                expect(orderedColumn[4]).to.equal('createdBy');
                expect(orderedColumn[5]).to.equal('modifiedDate');
            });
        });

        describe('updateFilterData()',function() {

            it('Should update Filter Data', function() {
                var updateCountOnFilter_spy = sandbox.spy(classUnderTest, 'updateCountOnFilter');
                var rows;
                classUnderTest.counterArray = table_data;
                classUnderTest.tableWidget = {
                    getRows: function() {
                        return rows;
                    },
                    getSelectedRows: function() {
                        return [''];
                    },
                    setData: function(data) {
                        rows = data;
                    },
                    getData: function() {
                        return rows;
                    }
                };

                var filter = {'counterName': {value: 'UeCat', comparator: '='}};
                if (sessionStorage.getItem('counterName') !== null) {
                    sessionStorage.removeItem('counterName');
                }
                sessionStorage.setItem('counterName', JSON.stringify(filter));
                classUnderTest.updateFilterData(classUnderTest.counterTableColumns.getOrderedColumns().columns);
                expect(updateCountOnFilter_spy.callCount).to.equal(1);
                expect(classUnderTest.tableWidget.getRows().length).to.equal(3);
                sessionStorage.clear();
            });
        });

        describe('applyColumnSorting()',function() {

            it('should sort date by ascending order' , function() {
                var rows;
                classUnderTest.tableWidget = {
                    setData: function(data) {
                        rows = data;
                    },
                    getData: function() {
                        return table_data;
                    },
                    setSortIcon: function(sortMode, sortAttr) { this.sortMode = sortMode; this.sortAttr = sortAttr; },

                };
                classUnderTest.view.getTableWrapper = function() {
                    return {
                        setStyle: function(attribute, value) {
                            attribute = value;
                        }
                    };
                };
                classUnderTest.applyColumnSorting('asc','modifiedDate');
                expect(rows[2].counterName).to.equal('pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1');
                expect(rows[1].counterName).to.equal('pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4');
                expect(rows[0].counterName).to.equal('pmFlexRwrFailPlmnNotAllowed_UeCat7-80UePwrClass10|11|44');
            });
        });

        describe('addTableEventHandler()',function() {

            it('should trigger sort callback Handlers of table Widget' , function() {

                var applyColumnSorting_sub = sandbox.stub(classUnderTest,'applyColumnSorting');

                classUnderTest.tableWidget = new Table({
                    plugins: [
                        new StickyScrollbar(),
                        new Selection({
                            checkboxes: true,
                            selectableRows: true,
                            multiselect: true,
                            bind: true
                        }),
                        new ResizableHeader(),
                        new SortableHeader()
                    ],
                    columns: classUnderTest.counterTableColumns.getOrderedColumns().columns,
                    data: table_data
                });

                classUnderTest.view.getTableWrapper = function() {
                    return {
                        addEventHandler: function() {}
                    };
                };

                classUnderTest.addTableEventHandler();
                classUnderTest.tableWidget.trigger('sort','asc','modifiedDate');
                expect(applyColumnSorting_sub.calledOnce).to.equal(true);
            });

        });

        describe('updateSelectedRows()', function() {
            it('should update the selected rows in session', function() {

                var tableWidget = new Table({
                    plugins: [
                        new StickyScrollbar(),
                        new Selection({
                            checkboxes: true,
                            selectableRows: true,
                            multiselect: true,
                            bind: true
                        }),
                        new ResizableHeader(),
                        new SortableHeader()
                    ],
                    columns: classUnderTest.counterTableColumns.getOrderedColumns().columns,
                    data: table_data
                });

                var data = [
                    {'attributes': { 'counterName': 'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1', 'moClass': 'NRCellCU','status': 'Unpublished', 'filter': 'UeCat2-100UePwrClass0|1', 'modifiedDate': '20190928152828', 'createdBy': 'administrator'}} ,
                    {'attributes': { 'counterName': 'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4', 'moClass': ' NRCellCU ','status': 'Published', 'filter': 'UeCat4-100|103UePwrClass0|1|4', 'modifiedDate': '20190828152828', 'createdBy': 'user1' }} ,
                    {'attributes': { 'counterName': 'pmFlexRwrFailPlmnNotAllowed_UeCat7-80UePwrClass10|11|44', 'moClass': ' NRCellCU ','status': 'Published', 'filter': 'UeCat7-80UePwrClass10|11|44', 'modifiedDate': '20160828152828', 'createdBy': ' administrator'} },
                ];

                this.options.flexCounterList = data;

                classUnderTest.view.getTableWrapper = function() {
                    return {
                        addEventHandler: function() {}
                    };
                };

                classUnderTest.tableWidget = {
                    getSelectedRows: function() {
                        return tableWidget.getRows();
                    }
                };
                sessionStorage.clear();
                classUnderTest.updateSelectedRows();
                var sessionStoredRows = JSON.parse(sessionStorage.getItem('selectedCounterRowInfo'));
                expect(sessionStoredRows.length).to.equal(3);
                sessionStorage.clear();

            });
        });

        describe('drawTable()', function() {

            it('should create counter table with data', function() {
                var updateFilterData_spy = sandbox.spy(classUnderTest, 'updateFilterData');
                var applyColumnOrder_spy = sandbox.spy(classUnderTest, 'applyColumnOrder');
                var applyColumnSorting_spy = sandbox.spy(classUnderTest, 'applyColumnSorting');

                classUnderTest.view.getTableWrapper = function() {
                    return {
                        addEventHandler: function() {},
                        setStyle: function(attribute, value) {
                            attribute = value;
                        }
                    };
                };

                classUnderTest.drawTable(data, classUnderTest.counterTableColumns.getOrderedColumns().columns);
                expect(updateFilterData_spy.callCount).to.equal(1);
                expect(applyColumnOrder_spy.callCount).to.equal(1);
                expect(applyColumnSorting_spy.callCount).to.equal(1);
                expect(classUnderTest.tableWidget.getRows().length).to.equal(3);
            });
        });

        describe('onDOMAttach()', function() {
            it('should get the scroll position 300 from session and set to setScrollPosition ', function() {
                var onCallback_spy = sandbox.spy(classUnderTest.view, 'setScrollPosition');

                classUnderTest.view.getTableWrapper = function() {
                    return {
                        getNative: function() {
                            return {
                                scrollTop: function() {
                                    return;
                                }
                            };
                        }
                    };
                };

                var _filter = {'counterName': {value: 'UeCat', comparator: '='}};
                sessionStorage.getItem = function() {
                    return JSON.stringify(_filter);
                };
                classUnderTest.onDOMAttach();

                expect(onCallback_spy.callCount).to.equal(1);
                expect(onCallback_spy.calledWith(_filter)).to.equal(true);
                sessionStorage.clear();
            });
        });

        describe('checkIfRowsSelected()',function() {
            it('should return true if rows are selected',function() {
                classUnderTest.selectedRows.length = 5;
                var check = classUnderTest.checkIfRowsSelected();
                expect(check).to.equal(true);
            });

            it('should return false if no rows are selected',function() {
                classUnderTest.selectedRows.length = 0;
                var check = classUnderTest.checkIfRowsSelected();
                expect(check).to.equal(false);
            });
        });

        describe('Clear Filters', function() {
            it('should reset all filters, reset the table data and hide the filter button', function() {
                var hideFilterClear_spy = sandbox.spy(classUnderTest.view, 'hideFilterClear');
                var setFilterInput_spy = sandbox.spy(classUnderTest.view, 'setFilterInput');
                var rows;
                classUnderTest.tableWidget = {
                    setData: function(data) {
                        rows = data;
                    },
                    getData: function() {
                        return rows;
                    },
                    _columns: []
                };
                classUnderTest.resetAllFilters();
                expect(hideFilterClear_spy.callCount, 'Filter clear button should be hidden').to.equal(1);
                expect(setFilterInput_spy.callCount, 'Filters should be set to blank').to.equal(1);
                expect(setFilterInput_spy.calledWith(''), 'Filters should be set to blank').to.equal(true);
            });

            it('should remove all filters from the session storage', function() {
                var resetTableData = false;

                sandbox.stub(classUnderTest, 'resetTableData', function() {
                    resetTableData = true;
                });

                sessionStorage.clear();
                sessionStorage.setItem('counterName', {'value': 'UeCat', 'comparator': '='});

                classUnderTest.tableWidget = {
                    unselectAllRows: function() {
                        return [];
                    },
                    _columns: classUnderTest.counterTableColumns.getOrderedColumns().columns
                };

                expect(sessionStorage.length).to.equal(1);
                expect(sessionStorage.counterName).not.to.be.undefined;
                classUnderTest.resetAllFilters();
                expect(resetTableData, 'Table data should be reset').to.equal(true);
                expect(sessionStorage.length).to.equal(0);
                expect(sessionStorage.counterName).to.be.undefined;
                sessionStorage.clear();
            });
        });

        describe('populateSelectedRows()', function() {
            it('should read selected data from session', function() {

                classUnderTest.flexCounters = table_data;
                classUnderTest.selectedRows = [0,1];
                classUnderTest.sessionStoredCounter = [
                    'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1',
                    'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4'
                ];

                classUnderTest.populateSelectedRows();

                expect(classUnderTest.getSelectedRows().length).to.equal(2);
            });

        });

        describe('clear Selected',function() {

            it('should set the selected count to zero,remove the clear button, reset all stored data',function() {
                classUnderTest.view.setSelectCount(5);
                classUnderTest.view.showSelectClear();
                classUnderTest.sessionStoredCounter = ['Test1'];
                var hideSelectClear_spy = sandbox.spy(classUnderTest.view, 'hideSelectClear');

                classUnderTest.tableWidget = {
                    unselectAllRows: function() {
                        return [];
                    },
                    _columns: []
                };

                classUnderTest.clearSelected();

                expect(classUnderTest.checkIfRowsSelected(), 'Count should have been set to 0').to.equal(false);
                expect(hideSelectClear_spy.calledOnce).to.equal(true);
                expect(classUnderTest.sessionStoredCounter.length === 0).to.be.true;
            });
        });
    });
});