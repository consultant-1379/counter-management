/*global  describe, sinon, beforeEach, afterEach, it*/
define([
    'jscore/core',
    'countermanagement/widgets/treeList/TreeList',
    'i18n!countermanagement/dictionary.json'
], function(core, TreeList, dictionary) {
    'use strict';

    describe('widgets/TreeList', function() {

        var treeList,
            sandbox;

        before(function() {
            sandbox = sinon.sandbox.create();
        });

        beforeEach(function() {
            function onSelectFlexFilters() {

            }
            treeList =  new TreeList({
                title: dictionary.flexFilter.title,
                message: dictionary.flexFilter.message,
                onSelect: onSelectFlexFilters,
                items: [],
                totalRoots: 0
            });
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('onViewReady', function() {
            it('should be call change the view', function() {

                //Assemble
                sandbox.stub(treeList, 'changeView');

                //Act
                treeList.onViewReady();


                //Assert
                expect(treeList).to.be.object;
                expect(treeList.changeView.callCount).to.equal(1);
            });
        });

        describe('initData', function() {
            [
                {
                    description: 'should prepare data for tree of level 1',
                    data: {
                        items: [
                            {
                                id: 1,
                                parent: null
                            },
                            {
                                id: 2,
                                parent: null
                            }
                        ],
                        totalItems: 2
                    },
                    expected: {
                        data: {
                            'null': [
                                {
                                    id: 1,
                                    parent: null
                                },
                                {
                                    id: 2,
                                    parent: null
                                }
                            ]
                        },
                        currentData: {
                            'null': [
                                {
                                    id: 1,
                                    parent: null
                                },
                                {
                                    id: 2,
                                    parent: null
                                }
                            ]
                        },
                        dataMap: {
                            '1': {
                                id: 1,
                                parent: null
                            },
                            '2': {
                                id: 2,
                                parent: null
                            }
                        },
                        ids: [1, 2],
                        totalRootItems: 2

                    }
                },
                {
                    description: 'should prepare data for tree of level 2',
                    data: {
                        items: [
                            {
                                id: 1,
                                parent: null
                            },
                            {
                                id: 2,
                                parent: null
                            },
                            {
                                id: 3,
                                parent: 2
                            }
                        ],
                        totalItems: 2
                    },
                    expected: {
                        data: {
                            '2': [
                                {
                                    id: 3,
                                    parent: 2
                                }
                            ],
                            'null': [
                                {
                                    id: 1,
                                    parent: null
                                },
                                {
                                    id: 2,
                                    parent: null
                                }
                            ]
                        },
                        currentData: {
                            '2': [
                                {
                                    id: 3,
                                    parent: 2
                                }
                            ],
                            'null': [
                                {
                                    id: 1,
                                    parent: null
                                },
                                {
                                    id: 2,
                                    parent: null
                                }
                            ]
                        },
                        dataMap: {
                            '1': {
                                id: 1,
                                parent: null
                            },
                            '2': {
                                id: 2,
                                parent: null
                            },
                            '3': {
                                id: 3,
                                parent: 2
                            }
                        },
                        ids: [1, 2, 3],
                        totalRootItems: 2

                    }
                }

            ].forEach(function(test) {
                it(test.description, function() {
                    //Act
                    treeList.initData(test.data);


                    //Assert
                    expect(treeList.data).to.eql(test.expected.data);
                    expect(treeList.currentData).to.eql(test.expected.currentData);
                    expect(treeList.dataMap).to.eql(test.expected.dataMap);
                    expect(treeList.ids).to.eql(test.expected.ids);
                    expect(treeList.totalRootItems).to.eql(test.expected.totalRootItems);
                });
            });
        });

        describe('load', function() {
            it('should be load data and change the view', function() {

                //Assemble
                sandbox.stub(treeList, 'initData');
                sandbox.stub(treeList, 'changeView');
                sandbox.spy(treeList, 'getTotalChildren');

                var data = {
                    items: [
                        {
                            id: 1,
                            parent: null
                        },
                        {
                            id: 2,
                            parent: null
                        },
                        {
                            id: 3,
                            parent: 2
                        }
                    ],
                    totalItems: 2
                };

                //Act
                treeList.load(data);


                //Assert
                expect(treeList.initData.callCount).to.equal(1);
                expect(treeList.changeView.callCount).to.equal(1);
                expect(treeList.getTotalChildren.callCount).to.equal(1);
            });
        });

        describe('changeView', function() {
            it('should be show inline message for empty items (node not selected)', function() {
                var message = {
                    nodeNotSelected: 'Node Not Select'
                };

                //Assemble
                sandbox.spy(treeList, 'showInlineMessage');
                treeList.items = [];
                treeList.totalRootItems = 0;
                treeList.message = message;

                //Act
                treeList.changeView();

                //Assert
                expect(treeList.visualisation).to.be.undefined;
                expect(treeList.inlineMessage.options).to.be.object;
                expect(treeList.showInlineMessage.callCount).to.equal(1);
                expect(treeList.showInlineMessage.firstCall.calledWith(message.nodeNotSelected)).to.equal(true);
            });

            it('should be show tree for items with roots', function() {
                var message = {
                    notAvailable: 'Node Not Select'
                };

                //Assemble
                sandbox.stub(treeList, 'resize');
                treeList.items = ['1'];
                treeList.totalRootItems = 1;
                treeList.message = message;

                //Act
                treeList.changeView();

                //Assert
                expect(treeList.visualisation.options).to.be.object;
                expect(treeList.inlineMessage).to.be.undefined;
                expect(treeList.resize.callCount).to.equal(1);
            });

            it('should be show inline message for items with empty roots', function() {
                var message = {
                    notAvailable: 'Not available'
                };

                //Assemble
                sandbox.spy(treeList, 'showInlineMessage');
                treeList.items = ['a'];
                treeList.totalRootItems = 0;
                treeList.message = message;

                //Act
                treeList.changeView();

                //Assert
                expect(treeList.visualisation).to.be.undefined;
                expect(treeList.inlineMessage.options).to.be.object;
                expect(treeList.showInlineMessage.callCount).to.equal(1);
                expect(treeList.showInlineMessage.firstCall.calledWith(message.notAvailable)).to.equal(true);
            });
        });

        describe('showInlineMessage', function() {
            it('should be show in line message', function() {

                //Assemble
                var message = 'abc';
                treeList.inlineMessage = undefined;
                sandbox.stub(treeList, 'changeView');

                //Act
                treeList.showInlineMessage(message);


                //Assert
                expect(treeList.inlineMessage.options.header).to.be.equal(message);
                expect(treeList.inlineMessage.view).to.be.object;

            });
        });

        describe('select', function() {
            it('should be unselect all and select items on tree', function() {

                //Assemble
                treeList.visualisation = {
                    unselectAll: function() {},
                    select: function() {}

                };
                sandbox.stub(treeList.visualisation, 'unselectAll');
                sandbox.stub(treeList.visualisation, 'select');

                //Act
                treeList.select();


                //Assert
                expect(treeList.visualisation.unselectAll.callCount).to.equal(1);
                expect(treeList.visualisation.select.callCount).to.equal(1);
            });
        });

        describe('subscribeVisualisationEvents', function() {
            it('should be subscribe visualisation events', function() {

                //Assemble
                treeList.visualisation = {
                    addEventHandler: function() {}

                };
                sandbox.stub(treeList.visualisation, 'addEventHandler');

                //Act
                treeList.subscribeVisualisationEvents();

                //Assert
                expect(treeList.visualisation.addEventHandler.callCount).to.equal(1);

            });
        });

        describe('getDataFromMapper', function() {
            it('should be set tree for empty mapping data with some selection', function() {
                //Assemble
                sandbox.stub(treeList, 'changeView');
                treeList.visualisation = {
                    getSelectedIds: function() { return []; },
                    getExpansions: function() { return []; },
                };
                treeList.currentData = 0;
                treeList.totalRootItems = 0;
                var data = [];
                var ids = ['1'];

                //Act
                treeList.getDataFromMapper(data, ids);

                //Assert
                expect(treeList).to.be.object;
                expect(treeList.currentData).to.be.eql({});
                expect(treeList.totalRootItems).to.be.equal(0);
                expect(treeList.changeView.callCount).to.equal(1);
            });

            it('should be set tree for mapping data with some selection', function() {
                //Assemble
                sandbox.stub(treeList, 'changeView');
                treeList.visualisation = {
                    getSelectedIds: function() { return []; },
                    getExpansions: function() { return []; }
                };
                treeList.currentData = 0;
                treeList.totalRootItems = 0;
                var data = [{
                    id: '1',
                    parent: 'null'
                }];
                var ids = ['1'];

                //Act
                treeList.getDataFromMapper(data, ids);

                //Assert
                expect(treeList.currentData).to.be.eql({ 'null': data});
                expect(treeList.totalRootItems).to.be.equal(1);
                expect(treeList.changeView.callCount).to.equal(1);
            });

            it('should be set full tree for empty selection and empty mapping data', function() {
                //Assemble
                sandbox.stub(treeList, 'changeView');
                var data = [];
                var ids = [];
                var tree = [
                    {
                        id: '1',
                        parent: 'null'
                    },
                    {
                        id: '2',
                        parent: 'null'
                    }
                ];

                treeList.visualisation = {
                    getSelectedIds: function() { return []; },
                    getExpansions: function() { return []; }
                };
                treeList.items = tree;
                treeList.currentData = [];
                treeList.totalRootItems = 0;

                //Act
                treeList.getDataFromMapper(data, ids);

                //Assert
                expect(treeList.currentData).to.be.eql({ 'null': tree});
                expect(treeList.totalRootItems).to.be.equal(2);
                expect(treeList.changeView.callCount).to.equal(1);
            });
        });

        describe('initializeFilter', function() {
            it('should be setup filter', function() {

                //Assemble
                var inputEventVerifier = 0;
                var iconEventVerifier = 0;
                treeList.view = {
                    getFilterInput: function() { return { addEventHandler: function() { return ++inputEventVerifier; }}; },
                    getFilterIconButton: function() { return { addEventHandler: function() { return ++iconEventVerifier; }}; },
                };
                sandbox.stub(treeList, 'changeView');
                sandbox.stub(treeList, 'filterData');
                treeList.filterInput;
                treeList.filterIcon;

                //Act
                treeList.initializeFilter();

                //Assert
                expect(treeList.filterInput).to.be.not.undefined;
                expect(treeList.filterIcon).to.be.not.undefined;
                expect(inputEventVerifier).to.be.equal(1);
                expect(iconEventVerifier).to.be.equal(1);

            });

            it('should be execute onFilterChange when filter input changed', function(done) {

                //Assemble
                sandbox.stub(treeList, 'changeView');
                sandbox.stub(treeList, 'filterData', function() {
                    return {};
                });

                //Act
                treeList.filterInput.trigger('input');

                //Assert
                setTimeout(function() {
                    expect(treeList.filterData.callCount).to.equal(1);
                    expect(treeList.changeView.callCount).to.equal(1);
                    done();
                }, 600);
            });

        });

        describe('filterData', function() {
            var items = [
                {
                    checkbox: { value: 'abc' },
                    children: 2,
                    id: 'abc',
                    label: 'abc',
                    parent: null
                },
                {
                    checkbox: { value: 'acd' },
                    children: 1,
                    id: 'acd',
                    label: 'acd',
                    parent: null
                },
                {
                    checkbox: { value: 'bcd' },
                    children: 0,
                    id: 'bcd',
                    label: 'bcd',
                    parent: null
                },
                {
                    checkbox: { value: 'abc1' },
                    children: 0,
                    id: 'abc1',
                    label: 'abc1',
                    parent: 'abc'
                },
                {
                    checkbox: { value: 'abc2' },
                    children: 0,
                    id: 'abc2',
                    label: 'abc2',
                    parent: 'abc'
                },
                {
                    checkbox: { value: 'efg' },
                    children: 0,
                    id: 'efg',
                    label: 'efg',
                    parent: 'acd'
                }
            ];
            function onSelectFlexFilters() {

            }
            var tree =  new TreeList({
                title: dictionary.flexFilter.title,
                message: dictionary.flexFilter.message,
                onSelect: onSelectFlexFilters,
                items: items,
                totalRoots: 3
            });

            [
                {
                    description: 'should be return full tree for undefined filter string',
                    filterStr: undefined,
                    expected: {
                        'null': [
                            {
                                checkbox: { value: 'abc' },
                                children: 2,
                                id: 'abc',
                                label: 'abc',
                                parent: null
                            },
                            {
                                checkbox: { value: 'acd' },
                                children: 1,
                                id: 'acd',
                                label: 'acd',
                                parent: null
                            },
                            {
                                checkbox: { value: 'bcd' },
                                children: 0,
                                id: 'bcd',
                                label: 'bcd',
                                parent: null
                            }
                        ],
                        'abc': [
                            {
                                checkbox: { value: 'abc1' },
                                children: 0,
                                id: 'abc1',
                                label: 'abc1',
                                parent: 'abc'
                            },
                            {
                                checkbox: { value: 'abc2' },
                                children: 0,
                                id: 'abc2',
                                label: 'abc2',
                                parent: 'abc'
                            }
                        ],
                        'acd': [
                            {
                                checkbox: { value: 'efg' },
                                children: 0,
                                id: 'efg',
                                label: 'efg',
                                parent: 'acd'
                            }
                        ],
                        'bcd': []
                    }
                },
                {
                    description: 'should be return empty tree for empty filter string',
                    filterStr: ' ',
                    expected: {
                        'null': [],
                        'abc': [],
                        'acd': []
                    }
                },
                {
                    description: 'should be return empty tree for non-exist filter string',
                    filterStr: 'aaaaaaa',
                    expected: {
                        'null': [],
                        'abc': [],
                        'acd': []
                    }
                },
                {
                    description: 'should be return filtered tree for exist filter string ',
                    filterStr: 'ab',
                    expected: {
                        'null': [
                            {
                                checkbox: { value: 'abc' },
                                children: 2,
                                id: 'abc',
                                label: 'abc',
                                parent: null
                            }
                        ],
                        'abc': [
                            {
                                checkbox: { value: 'abc1' },
                                children: 0,
                                id: 'abc1',
                                label: 'abc1',
                                parent: 'abc'
                            },
                            {
                                checkbox: { value: 'abc2' },
                                children: 0,
                                id: 'abc2',
                                label: 'abc2',
                                parent: 'abc'
                            }
                        ],
                        'acd': []
                    }
                },
                {
                    description: 'should be return root with it\'s all children for root filter string',
                    filterStr: 'acd',
                    expected: {
                        'null': [
                            {
                                checkbox: { value: 'acd' },
                                children: 1,
                                id: 'acd',
                                label: 'acd',
                                parent: null
                            }
                        ],
                        'acd': [
                            {
                                checkbox: { value: 'efg' },
                                children: 0,
                                id: 'efg',
                                label: 'efg',
                                parent: 'acd'
                            }
                        ],
                        'abc': []
                    }
                },
                {
                    description: 'should be return root with it\'s children(filtered) for child filter string',
                    filterStr: 'g',
                    expected: {
                        'null': [
                            {
                                checkbox: { value: 'acd' },
                                children: 1,
                                id: 'acd',
                                label: 'acd',
                                parent: null
                            }
                        ],
                        'abc': [],
                        'acd': [
                            {
                                checkbox: { value: 'efg' },
                                children: 0,
                                id: 'efg',
                                label: 'efg',
                                parent: 'acd'
                            }
                        ]
                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {

                    //Assemble
                    sandbox.stub(tree, 'changeView');
                    tree.items = items;

                    //Act
                    var actual = tree.filterData(test.filterStr);


                    //Assert
                    expect(actual).to.be.eql(test.expected);

                });
            });
        });

        describe('getTotalChildren', function() {
            [
                {
                    description: 'should be return 0 for empty tree',
                    currentData: {},
                    expected: 0,
                    totalRootItems: 0
                },
                {
                    description: 'should be return all root items, for tree (with 1 level)',
                    currentData: {
                        'null': [1, 2, 4, 6, 7]
                    },
                    expected: 5,
                    totalRootItems: 5
                },
                {
                    description: 'should be return all items except roots, for tree (with 2 level)',
                    currentData: {
                        'null': [1, 2, 4, 6, 7],
                        'a': [3, 9],
                        'b': [5]
                    },
                    expected: 3,
                    totalRootItems: 5
                }
            ].forEach(function(test) {
                it(test.description, function() {

                    //Assemble
                    sandbox.stub(treeList, 'changeView');
                    treeList.currentData = test.currentData;
                    treeList.totalRootItems=  test.totalRootItems;

                    //Act
                    var actual = treeList.getTotalChildren();


                    //Assert
                    expect(actual).to.be.equal(test.expected);

                });
            });


        });

    });
});
