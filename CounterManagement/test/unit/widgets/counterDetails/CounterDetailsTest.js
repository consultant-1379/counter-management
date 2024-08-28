define([
    'jscore/core',
    'countermanagement/widgets/counterDetails/CounterDetails',
], function(core, CounterDetails) {
    describe('CounterDetails', function() {
        var classUnderTest,
            sandbox;
        var counterDetailsData = {
            'flexCounterName': 'pmEbsRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1',
            'status': 'Unpublished',
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
                        'flexGroupId': 'UePwrClas',
                        'value': [
                            0,
                            1
                        ]
                    }
                ]
            }
        };

        beforeEach(function() {
            sandbox = sinon.sandbox.create();

            this.options = {
                data: counterDetailsData
            };

            classUnderTest = new CounterDetails(this.options);
        });

        afterEach(function() {
            sandbox.restore();
        });


        describe('Should create Key-Value pairs from then FlexCounterDetails json', function() {


            var counterDetailsKeyValue = [
                {
                    'attributeName': 'Name',
                    'attributeValue': 'pmEbsRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1'
                },
                {
                    'attributeName': 'Created By',
                    'attributeValue': 'administrator'
                },
                {
                    'attributeName': 'Modified',
                    'attributeValue': '2019-06-07 15:23:33'
                },
                {
                    'attributeName': 'EBS Base Counter',
                    'attributeValue': 'pmEbsRwrFailNoEutranTarget'
                },
                {
                    'attributeName': 'Counter Description',
                    'attributeValue': 'Number of UE Releases with Redirection that cannot be performed because there is no defined EUTRAN target.Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection to EUTRAN cannot be performed because there is no defined EUTRAN target.,'
                },
                {
                    'attributeName': 'MO Class',
                    'attributeValue': 'NRCellCU'
                },
                {
                    'attributeName': 'PM Event',
                    'attributeValue': 'CuCpRwrMobilityDecision'
                },

                {
                    'attributeName': 'Flex Filter',
                    'attributeValue': 'UeCat2-100UePwrClass0|1'
                }
            ];

            it('Should format json object to attribute key and attributeValue', function() {

                counterDetailsKeyValue.forEach(function(eachCounter, index){
                    expect(classUnderTest.options.counterDetails[index].attributeName).to.equal(eachCounter.attributeName);
                    expect(classUnderTest.options.counterDetails[index].attributeValue).to.equal(eachCounter.attributeValue);
                });

                expect(classUnderTest.options.counterDetails.length).to.equal(8);


            });


        });


    });

});
