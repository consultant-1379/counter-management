/*global  describe, sinon, before, beforeEach, afterEach, it*/
define([
    'jscore/core',
    'countermanagement/widgets/filterCounterMapping/FilterCounterMapping'
], function(core, ListItem) {
    'use strict';

    describe('widgets/FilterCounterMapping', function() {

        var sandbox,
            objectUnderTest;

        before(function() {
            sandbox = sinon.sandbox.create();
        });

        beforeEach(function() {
            objectUnderTest = new ListItem({
                baseCounters: [
                    {
                        'baseCounterName': 'bc1',
                        'sourceObject': 's1',
                        'basedOnEvent': [
                            'ev1'
                        ]
                    },
                    {
                        'baseCounterName': 'bc2',
                        'sourceObject': 's1',
                        'basedOnEvent': [
                            'ev1',
                            'ev2'
                        ]
                    }
                ],
                flexFilters: [
                    {
                        flexGroupName: 'Flex Group 1',
                        flexGroupId: 'fg1'
                    },
                    {
                        flexGroupName: 'Flex Group 2',
                        flexGroupId: 'fg2'
                    }
                ],
                events: [
                    {
                        'eventName': 'ev1',
                        'applicableFlexGroupIds': [
                            'fg1'
                        ]
                    },
                    {
                        'eventName': 'ev2',
                        'applicableFlexGroupIds': [
                            'fg2'
                        ]
                    }
                ]
            });
        });

        afterEach(function() {
            sandbox.restore();
            objectUnderTest = undefined;
        });

        describe('init()', function() {

            objectUnderTest = new ListItem({
                baseCounters: [],
                flexFilters: [],
                events: []
            });

            it('Should call prepareData', function() {

                //Assemble
                sandbox.stub(objectUnderTest, 'prepareData');

                //Act
                objectUnderTest.init();

                //Assert
                expect(objectUnderTest).to.be.object;
                expect(objectUnderTest.prepareData.callCount).to.equal(1);
            });
        });

        describe('onViewReady()', function() {
            //Assemble
            objectUnderTest.flexFilter = undefined;
            objectUnderTest.baseCounter = undefined;

            //Act
            objectUnderTest.onViewReady();

            it('Should create flexFilter with passed data', function() {

                //Assert
                expect(objectUnderTest.flexFilter).to.be.object;
                expect(objectUnderTest.flexFilter.ids).to.eql(['fg1', 'fg2']);
                expect(objectUnderTest.flexFilter.totalItems).to.equal(2);
                expect(objectUnderTest.flexFilter.totalRootItems).to.equal(2);
            });

            it('Should create baseCounter with passed data', function() {

                //Assert
                expect(objectUnderTest.baseCounter).to.be.object;
                expect(objectUnderTest.baseCounter.ids).to.eql(['bc1', 'bc2', 's1']);
                expect(objectUnderTest.baseCounter.totalItems).to.equal(2);
                expect(objectUnderTest.baseCounter.totalRootItems).to.equal(1);
            });
        });

        describe('load()', function() {
            [
                {
                    description: 'Should call load on baseCounter and flexFilter',
                    data: {
                        baseCounters: [],
                        flexFilters: [],
                        events: []
                    },
                    expected: {
                        ids: [],
                        totalItems: 0,
                        totalRootItems: 0

                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {
                    //Assemble
                    sandbox.stub(objectUnderTest.baseCounter, 'load');
                    sandbox.stub(objectUnderTest.flexFilter, 'load');


                    //Act
                    objectUnderTest.load(test.data);

                    //Assert
                    expect(objectUnderTest.baseCounter.load.callCount).to.equal(1);
                    expect(objectUnderTest.flexFilter.load.callCount).to.equal(1);

                });
            });
        });

        describe('prepareData()', function() {
            [
                {
                    description: 'Should prepare data for undefined',
                    data: {
                        baseCounters: undefined,
                        flexFilters: undefined,
                        events: undefined
                    },
                    expected: {
                        baseCounters: [],
                        flexFilters: [],
                        events: [],
                        map: {
                            counter: [],
                            filter: []
                        }

                    }
                },
                {
                    description: 'Should prepare data for all empty',
                    data: {
                        baseCounters: [],
                        flexFilters: [],
                        events: []
                    },
                    expected: {
                        baseCounters: [],
                        flexFilters: [],
                        events: [],
                        map: {
                            counter: [],
                            filter: []
                        }

                    }
                },
                {
                    description: 'Should prepare data for non empty',
                    data: {
                        baseCounters: [{baseCounterName: 1}, {baseCounterName: 2}],
                        flexFilters: [{flexGroupId: 3}],
                        events: [{id: 4}]
                    },
                    expected: {
                        baseCounters: [{baseCounterName: 1}, {baseCounterName: 2}],
                        flexFilters: [{flexGroupId: 3}],
                        events: [{id: 4}],
                        map: {
                            counter: {
                                1: {baseCounterName: 1},
                                2: {baseCounterName: 2}
                            },
                            filter: {
                                3: {flexGroupId: 3}
                            }
                        }

                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {

                    //Assemble
                    sandbox.stub(objectUnderTest, 'PrepareMappingData');
                    sandbox.stub(objectUnderTest, 'prepareEventMapData');

                    //Act
                    objectUnderTest.prepareData(test.data);

                    //Assert
                    expect(objectUnderTest.baseCounters).to.eql(test.expected.baseCounters);
                    expect(objectUnderTest.flexFilters).to.eql(test.expected.flexFilters);
                    expect(objectUnderTest.events).to.eql(test.expected.events);
                    expect(objectUnderTest.map).to.eql(test.expected.map);
                    expect(objectUnderTest.PrepareMappingData.callCount).to.equal(1);
                    expect(objectUnderTest.prepareEventMapData.callCount).to.equal(1);
                });
            });
        });

        describe('onSelectFlexFilters()', function() {
            var COUNTER = 'counter';
            [
                {
                    description: 'Should call getDataFromMapper for undefined',
                    ids: undefined,
                    expected: {
                        ids: undefined

                    }
                },
                {
                    description: 'Should call getDataFromMapper for empty data',
                    ids: [],
                    expected: {
                        ids: []

                    }
                },
                {
                    description: 'Should call getDataFromMapper for non empty data',
                    ids: [1, 2],
                    expected: {
                        ids: [1, 2]

                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {
                    //Assemble
                    sandbox.stub(objectUnderTest.baseCounter, 'getDataFromMapper');
                    sandbox.spy(objectUnderTest, 'getTreeByType');

                    //Act
                    objectUnderTest.onSelectFlexFilters(test.ids);

                    //Assert
                    expect(objectUnderTest.baseCounter.getDataFromMapper.callCount).to.equal(1);
                    expect(objectUnderTest.getTreeByType.callCount).to.equal(1);
                    expect(objectUnderTest.getTreeByType.firstCall.args[0]).to.eql(test.expected.ids);
                    expect(objectUnderTest.getTreeByType.firstCall.args[1]).to.eql(COUNTER);

                });
            });
        });

        describe('onSelectBaseCounters()', function() {
            var FILTER = 'filter';
            [
                {
                    description: 'Should call getDataFromMapper for undefined',
                    ids: undefined,
                    expected: {
                        ids: undefined

                    }
                },
                {
                    description: 'Should call getDataFromMapper for empty data',
                    ids: [],
                    expected: {
                        ids: []
                    }
                },
                {
                    description: 'Should call getDataFromMapper for non empty data',
                    ids: [1, 2],
                    expected: {
                        ids: [1, 2]
                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {
                    //Assemble
                    sandbox.stub(objectUnderTest.flexFilter, 'getDataFromMapper');
                    sandbox.spy(objectUnderTest, 'getTreeByType');

                    //Act
                    objectUnderTest.onSelectBaseCounters(test.ids);

                    //Assert
                    expect(objectUnderTest.flexFilter.getDataFromMapper.callCount).to.equal(1);
                    expect(objectUnderTest.getTreeByType.callCount).to.equal(1);
                    expect(objectUnderTest.getTreeByType.firstCall.args[0]).to.eql(test.expected.ids);
                    expect(objectUnderTest.getTreeByType.firstCall.args[1]).to.eql(FILTER);

                });
            });
        });

        describe('PrepareMappingData()', function() {
            [
                {
                    description: 'Should prepare mapping data for undefined',
                    data: {
                        baseCounters: undefined,
                        flexFilters: undefined,
                        events: undefined
                    },
                    expected: {}
                },
                {
                    description: 'Should prepare mapping data for empty data',
                    data: {
                        baseCounters: [],
                        flexFilters: [],
                        events: []
                    },
                    expected: {}
                },
                {
                    description: 'Should prepare mapping data for non empty data',
                    data: {
                        baseCounters: [
                            {
                                'baseCounterName': 'bc1',
                                'sourceObject': 's1',
                                'basedOnEvent': [
                                    'ev1'
                                ]
                            },
                            {
                                'baseCounterName': 'bc2',
                                'sourceObject': 's1',
                                'basedOnEvent': [
                                    'ev1',
                                    'ev2'
                                ]
                            }
                        ],
                        flexFilters: [
                            {
                                flexGroupName: 'Flex Group 1',
                                flexGroupId: 'fg1'
                            },
                            {
                                flexGroupName: 'Flex Group 2',
                                flexGroupId: 'fg2'
                            }
                        ],
                        events: [
                            {
                                'eventName': 'ev1',
                                'applicableFlexGroupIds': [
                                    'fg1'
                                ]
                            },
                            {
                                'eventName': 'ev2',
                                'applicableFlexGroupIds': [
                                    'fg2'
                                ]
                            }
                        ]
                    },
                    expected: {
                        'ev1': {
                            counter: ['bc1', 'bc2'],
                            filter: ['fg1']
                        },
                        'ev2': {
                            counter: [ 'bc2'],
                            filter: ['fg2']
                        }
                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {
                    //Assemble
                    objectUnderTest.baseCounters = test.data.baseCounters;
                    objectUnderTest.flexFilters = test.data.flexFilters;
                    objectUnderTest.events = test.data.events;
                    objectUnderTest.mappedEvents = {};

                    //Act
                    objectUnderTest.PrepareMappingData();

                    //Assert
                    expect(objectUnderTest.mappedEvents).to.eql(test.expected);
                });
            });
        });

        describe('prepareEventMapData()', function() {
            [
                {
                    description: 'Should prepare event mapping data for undefined',
                    data: {
                        baseCounters: undefined,
                        flexFilters: undefined,
                        events: undefined
                    },
                    expected: {}
                },
                {
                    description: 'Should prepare event mapping data for empty data',
                    data: {
                        baseCounters: [],
                        flexFilters: [],
                        events: []
                    },
                    expected: {}
                },
                {
                    description: 'Should prepare event mapping data for non empty data',
                    data: {
                        baseCounters: [
                            {
                                'baseCounterName': 'bc1',
                                'sourceObject': 's1',
                                'basedOnEvent': [
                                    'ev1'
                                ]
                            },
                            {
                                'baseCounterName': 'bc2',
                                'sourceObject': 's1',
                                'basedOnEvent': [
                                    'ev1',
                                    'ev2'
                                ]
                            }
                        ],
                        flexFilters: [
                            {
                                flexGroupName: 'Flex Group 1',
                                flexGroupId: 'fg1'
                            },
                            {
                                flexGroupName: 'Flex Group 2',
                                flexGroupId: 'fg2'
                            }
                        ],
                        events: [
                            {
                                'eventName': 'ev1',
                                'applicableFlexGroupIds': [
                                    'fg1'
                                ]
                            },
                            {
                                'eventName': 'ev2',
                                'applicableFlexGroupIds': [
                                    'fg2'
                                ]
                            }
                        ]
                    },
                    expected: {
                        'counter': {
                            'bc1': ['ev1'],
                            'bc2': ['ev1', 'ev2']
                        },
                        'filter': {
                            'fg1': ['ev1'],
                            'fg2': ['ev2']
                        }
                    }
                }
            ].forEach(function(test) {
                it(test.description, function() {
                    //Assemble
                    objectUnderTest.baseCounters = test.data.baseCounters;
                    objectUnderTest.flexFilters = test.data.flexFilters;
                    objectUnderTest.events = test.data.events;
                    objectUnderTest.event = {};

                    //Act
                    objectUnderTest.prepareEventMapData();

                    //Assert
                    expect(objectUnderTest.event).to.eql(test.expected);
                });
            });
        });

        describe('getTreeByType()', function() {
            [
                {
                    description: 'Should prepare event mapping data for undefined',
                    data: undefined,
                    type: undefined,
                    expected: {}
                },
                {
                    description: 'Should prepare event mapping data for empty data',
                    data: [],
                    type: '',
                    expected: {}
                },
                {
                    description: 'Should prepare event mapping data for non empty data',
                    data: ['fg1'],
                    type: 'counter',
                    expected: [
                        {
                            checkbox: {value: 'bc1'},
                            children: 0,
                            id: 'bc1',
                            label: 'bc1',
                            parent: 's1',
                            offset: 0
                        },
                        {
                            checkbox: {value: 'bc2'},
                            children: 0,
                            id: 'bc2',
                            label: 'bc2',
                            parent: 's1',
                            offset: 1
                        },
                        {
                            checkbox: {value: 's1'},
                            children: 2,
                            id: 's1',
                            label: 's1',
                            parent: null,
                            offset: 0
                        }

                    ]
                },
                {
                    description: 'Should prepare event mapping data for non empty data',
                    data: ['bc1'],
                    type: 'filter',
                    expected: [
                        {
                            checkbox: {value: 'fg1'},
                            children: 0,
                            id: 'fg1',
                            label: 'fg1',
                            parent: null,
                            offset: 0
                        }
                    ]
                }
            ].forEach(function(test) {
                it('Should prepare event mapping data for ' + test.data , function() {
                    //Assemble


                    //Act
                    var actual = objectUnderTest.getTreeByType(test.data, test.type);

                    //Assert
                    expect(actual).to.eql(test.expected);
                });
            });
        });

    });

});
