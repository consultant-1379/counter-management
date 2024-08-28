if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}


define(function() {
    return {
        flexCounters: [
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
            },
            {
                'flexCounterName': 'pmFlexDuExampleCompressedPdfCounter_UeCat1|5|91|54|12',
                'status': 'Published',
                'createdBy': 'eskngnn',
                'modified': 1259917413241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsDuExampleCompressedPdfCounter',
                    'counterDescription': 'This test counter is stepped when DuPerCellTrafficRep is received. The bins stepped are given by parameter per_cell_mac_contention_delay_dl_distr values.Trigger: The bin given by parameter per_cell_mac_contention_delay_dl_distr value is stepped by 1 if between zero and 20.',
                    'sourceObject': 'GNBDUFunction',
                    'networkFunction': 'DU',
                    'eventName': 'DuPerUeTrafficRep'
                },
                'flexFilter': {
                    'flexFilterId': 'UeCat1|5|91|54|12',
                    'flexFilterInstances': [
                        {
                            'flexFilterInstanceName': 'UeCat1|5|91|54|12',
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
                                1,
                                5,
                                91,
                                54,
                                12
                            ]
                        }
                    ]
                }
            },
            {
                'flexCounterName': 'pmFlexCuUpExampleCounter',
                'status': 'UnPublished',
                'createdBy': 'administrator',
                'modified': 1559717413241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsCuUpExampleCounter_Spid4SNssai4-7QoS1-9',
                    'counterDescription': 'This test counter is stepped by 1 when CuUpTestEventEnm is received Trigger: This test counter is only stepped when data == 1',
                    'sourceObject': 'GNBCUUPFunction',
                    'networkFunction': 'CuUp',
                    'eventName': 'CuUpTestEventEnm'
                },
                'flexFilter': {
                    'flexFilterId': 'Spid4SNssai4-7QoS1-9',
                    'flexFilterInstances': [
                        {
                            'flexGroup': {
                                'flexGroupId': 'Spid',
                                'type': 'int',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                }
                            },
                            'flexFilterInstanceName': 'Spid4',
                            'value': [
                                4
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'Nssai4-7',
                            'flexGroup': {
                                'flexGroupId': 'SNssai',
                                'type': 'int',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                }
                            },
                            'value': [
                                '4-7'
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'QoS1-9',
                            'flexGroup': {
                                'flexGroupId': 'QoS',
                                'type': 'repeateInt',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                }
                            },
                            'value': [
                                '1-9'
                            ]
                        }
                    ]
                }
            }
        ],
        flexCountersData: {
            'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1': {
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
                                '2-100'
                            ]
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
            'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4': {
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
                            'value                                                                                ': [
                                '4-100',
                                103,
                                190
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'UePwrClass0|1|4',
                            'flexGroupId': 'UePwrClass',
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
            'pmFlexRwrFailPlmnNotAllowed_UeCat7-80UePwrClass10|11|44': {
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
            },
            'pmFlexDuExampleCompressedPdfCounter_UeCat1|5|91|54|12': {
                'flexCounterName': 'pmFlexDuExampleCompressedPdfCounter_UeCat1|5|91|54|12',
                'status': 'Published',
                'createdBy': 'eskngnn',
                'modified': 1259917413241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsDuExampleCompressedPdfCounter',
                    'counterDescription': 'This test counter is stepped when DuPerCellTrafficRep is received. The bins stepped are given by parameter per_cell_mac_contention_delay_dl_distr values.Trigger: The bin given by parameter per_cell_mac_contention_delay_dl_distr value is stepped by 1 if between zero and 20.',
                    'sourceObject': 'GNBDUFunction',
                    'networkFunction': 'DU',
                    'eventName': 'DuPerUeTrafficRep'
                },
                'flexFilter': {
                    'flexFilterId': 'UeCat1|5|91|54|12',
                    'flexFilterInstances': [
                        {
                            'flexFilterInstanceName': 'UeCat1|5|91|54|12',
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
                                1,
                                5,
                                91,
                                54,
                                12
                            ]
                        }
                    ]
                }
            },
            'pmFlexCuUpExampleCounter_Spid4SNssai4-7QoS1-9': {
                'flexCounterName': 'pmFlexCuUpExampleCounter_Spid4SNssai4-7QoS1-9',
                'status': 'UnPublished',
                'createdBy': 'administrator',
                'modified': 1559717413241,
                'baseCounter': {
                    'baseCounterName': 'pmEbsCuUpExampleCounter',
                    'counterDescription': 'This test counter is stepped by 1 when CuUpTestEventEnm is received Trigger: This test counter is only stepped when data == 1',
                    'sourceObject': 'GNBCUUPFunction',
                    'networkFunction': 'CuUp',
                    'eventName': 'CuUpTestEventEnm'
                },
                'flexFilter': {
                    'flexFilterId': 'Spid4SNssai4-7QoS1-9',
                    'flexFilterInstances': [
                        {
                            'flexGroup': {
                                'flexGroupId': 'Spid',
                                'type': 'int',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                }
                            },
                            'flexFilterInstanceName': 'Spid4',
                            'value': [
                                4
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'Nssai4-7',
                            'flexGroup': {
                                'flexGroupId': 'SNssai',
                                'type': 'int',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                }
                            },
                            'value': [
                                '4-7'
                            ]
                        },
                        {
                            'flexFilterInstanceName': 'QoS1-9',
                            'flexGroup': {
                                'flexGroupId': 'QoS',
                                'type': 'repeateInt',
                                'uniqueMembers': 'false',
                                'valueRangeConstraints': {
                                    'minValue': '<>',
                                    'maxValue': '<>'
                                }
                            },
                            'value': [
                                '1-9'
                            ]
                        }
                    ]
                }
            }
        },
        defaultFlexCounterData: {
            'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1': {
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
                    'flexFilterName': 'UeCat2-100UePwrClass0|1',
                    'flexFilterDetails': [
                        {
                            'flexFilterName': 'UeCat2-100',
                            'flexGroupId': 'UeCat',
                            'value': [
                                '2-100'
                            ]
                        },
                        {
                            'flexFilterName': 'UePwrClass0|1',
                            'flexGroupId': 'UePwrClass',
                            'value': [
                                0,
                                1
                            ]
                        }
                    ]
                }
            }
        }
    };

});
