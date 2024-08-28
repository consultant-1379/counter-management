if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}


define(function() {
    return {
        flexGroups: [
            {
                'flexGroupName': 'QoS',
                'flexGroupId': 'QoS',
                'type': 'repeateInt',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'QoSType',
                'flexGroupId': 'QoSType',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'S-NSSAI',
                'flexGroupId': 'SNssai',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'LCG',
                'flexGroupId': 'Lcg',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'EN-DC',
                'flexGroupId': 'Endc',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'ARP',
                'flexGroupId': 'Arp',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'SPID',
                'flexGroupId': 'Spid',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'UE Category',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'Pre-emption Capability Indicator(PCI)',
                'flexGroupId': 'Pci',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'Pre-emption Vulnerability Indicator(PVI)',
                'flexGroupId': 'Pvi',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'PLMN Index',
                'flexGroupId': 'Plmn',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'Coverage Enhancement(CE) Level',
                'flexGroupId': 'CeLevel',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'UE Power Class',
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
                    },
                    {
                        'flexGroupName': 'S-NSSAI',
                        'flexGroupId': 'SNssai',
                        'type': 'int',
                        'uniqueMembers': 'false',
                        'valueRangeConstraints': {
                            'minValue': '<>',
                            'maxValue': '<>'
                        }
                    }
                ]
            },
            {
                'flexGroupName': 'Subscriber Group',
                'flexGroupId': 'SubscriberGroup',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            },
            {
                'flexGroupName': 'SSB',
                'flexGroupId': 'Ssb',
                'type': 'int',
                'uniqueMembers': 'false',
                'valueRangeConstraints': {
                    'minValue': '<>',
                    'maxValue': '<>'
                }
            }
        ],
        events: [
            {
                'eventName': 'CuCpRwrMobilityDecision',
                'applicableFlexGroupIds': [
                    'UeCat',
                    'UePwrClass'
                ]
            },
            {
                'eventName': 'DuPerUeTrafficRep',
                'applicableFlexGroupIds': [
                    'UeCat'
                ]
            },
            {
                'eventName': 'CuUpTestEventEnm',
                'applicableFlexGroupIds': [
                    'Spid',
                    'SNssai',
                    'QoS'
                ]
            }
        ]
    };
});

