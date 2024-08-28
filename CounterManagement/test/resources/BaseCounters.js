if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}


define(function() {
    return {
        baseCounters: [
            {
                'baseCounterName': 'pmEbsDuExampleCompressedPdfCounter',
                'counterDescription': 'This test counter is stepped when DuPerCellTrafficRep is received. The bins stepped are given by parameter per_cell_mac_contention_delay_dl_distr values.\n            Trigger: The bin given by parameter per_cell_mac_contention_delay_dl_distr value is stepped by 1 if between zero and 20.',
                'sourceObject': 'GNBDUFunction',
                'networkFunction': 'DU',
                'basedOnEvent': [
                    'DuPerUeTrafficRep'
                ]
            },
            {
                'baseCounterName': 'pmEbsDuExampleCounter',
                'counterDescription': 'This test counter is stepped by 1 when DuPerUeTrafficRep is received\n            Trigger: This test counter is only stepped when per_ue_rlc_arq_dl_ack == 1',
                'sourceObject': 'GNBDUFunction',
                'networkFunction': 'DU',
                'basedOnEvent': [
                    'DuPerUeTrafficRep'
                ]
            },
            {
                'baseCounterName': 'pmEbsRwrFailNoEutranTarget',
                'counterDescription': 'Number of UE Releases with Redirection that cannot be performed because there is no defined EUTRAN target.\n            Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection to EUTRAN cannot be performed because there is no defined EUTRAN target.',
                'sourceObject': 'NRCellCU',
                'networkFunction': 'CuCp',
                'basedOnEvent': [
                    'CuCpRwrMobilityDecision'
                ]
            },
            {
                'baseCounterName': 'pmEbsRwrFailPlmnNotAllowed',
                'counterDescription': 'Number of UE Releases with Redirection that cannot be performed because PLMN is not allowed.\n            Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection cannot be performed because PLMN is not allowed.',
                'sourceObject': 'NRCellCU',
                'networkFunction': 'CuCp',
                'basedOnEvent': [
                    'CuCpRwrMobilityDecision'
                ]
            },
            {
                'baseCounterName': 'pmEbsRwrFailUeCap',
                'counterDescription': 'Number of UE Releases with Redirection that cannot be performed because UE is not capable.\n            Trigger: Stepped at reception of a CuCpRwrMobilityDecision event indicating that a UE Release with Redirection cannot be performed because UE lacks capabilities required.',
                'sourceObject': 'NRCellCU',
                'networkFunction': 'CuCp',
                'basedOnEvent': [
                    'CuCpRwrMobilityDecision'
                ]
            },
            {
                'baseCounterName': 'pmEbsCuUpExampleCounter',
                'counterDescription': 'This test counter is stepped by 1 when CuUpTestEventEnm is received\n            Trigger: This test counter is only stepped when data == 1',
                'sourceObject': 'GNBCUUPFunction',
                'networkFunction': 'CuUp',
                'basedOnEvent': [
                    'CuUpTestEventEnm'
                ]
            },
        ]
    };
});
