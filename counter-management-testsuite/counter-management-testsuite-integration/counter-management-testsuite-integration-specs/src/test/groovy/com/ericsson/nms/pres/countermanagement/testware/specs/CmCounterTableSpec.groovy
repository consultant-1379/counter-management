package com.ericsson.nms.pres.countermanagement.testware.specs

import com.ericsson.nms.pres.countermanagement.testware.pages.CmMainPage as CoreSteps

import org.jboss.arquillian.graphene.page.Page
import org.jboss.arquillian.spock.ArquillianSputnik
import org.junit.runner.RunWith
import spock.lang.Specification

@RunWith(ArquillianSputnik)
class CmCounterTableSpec extends Specification {

    @Page CoreSteps coreSteps

    final TEST_COUNTER_1 = 'pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1'
    final TEST_COUNTER_2 = 'pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4'
    final TEST_FILTER_ONE_RESULT = '100U'
    final TEST_FILTER_FOR_SORTING = 'Counter'
    final TEST_FILTER_NO_RESULTS = 'I am a filter designed to not return any results'
    final APPLICATION_TITLE = 'Counter Management'

    def 'Test table sorting by Name in ascending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the Name column header once to sort the counters by name in ascending order'
            coreSteps.sortByColumn('Name')

        then: 'Check that the rows in the table have been correctly sorted in ascending order'
            coreSteps.verifySorting('Name', 'asc')
    }

    def 'Test table sorting by Name in descending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the Name column header twice to sort the counters by name in descending order'
            coreSteps.sortByColumn('Name')
            coreSteps.sortByColumn('Name')

        then: 'Check that the rows in the table have been correctly sorted in descending order'
            coreSteps.verifySorting('Name', 'desc')

    }

    def 'Test table sorting by MO Class in ascending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the MO Class column header once to sort the counters by MO Class in ascending order'
            coreSteps.sortByColumn('MO Class')

        then: 'Check that the rows in the table have been correctly sorted in ascending order'
            coreSteps.verifySorting('MO Class', 'asc')
    }

    def 'Test table sorting by MO Class in descending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the MO Class column header twice to sort the counters by MO Class in descending order'
            coreSteps.sortByColumn('MO Class')
            coreSteps.sortByColumn('MO Class')

        then: 'Check that the rows in the table have been correctly sorted in descending order'
            coreSteps.verifySorting('MO Class', 'desc')
    }

    def 'Test table sorting the table by Created By in ascending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the Created By column header once to sort the counters by Created By in ascending order'
            coreSteps.sortByColumn('Created By')

        then: 'Check that the rows in the table have been correctly sorted in ascending order'
            coreSteps.verifySorting('Created By', 'asc')
    }

    def 'Test table sorting the table by Created By in descending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the Created By column header twice to sort the counters by Created By in descending order'
            coreSteps.sortByColumn('Created By')
            coreSteps.sortByColumn('Created By')
        then: 'Check that the rows in the table have been correctly sorted in ascending order'
            coreSteps.verifySorting('Created By', 'desc')
    }

    def 'Test table sorting the table by Last Modified in ascending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the Last Modified column header once to sort the counters by Last Modified in ascending order'
            coreSteps.sortByColumn('Last Modified')

        then: 'Check that the rows in the table have been correctly sorted in ascending order'
            coreSteps.verifySorting('Last Modified', 'asc')
    }

    def 'Test table sorting the table by Last Modified in descending order'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Click the Last Modified column header twice to sort the counters by Last Modified in descending order'
            coreSteps.sortByColumn('Last Modified')
            coreSteps.sortByColumn('Last Modified')

        then: 'Check that the rows in the table have been correctly sorted in ascending order'
            coreSteps.verifySorting('Last Modified', 'desc')
    }

    def 'Test table filtering'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Apply the filter 100U to the Table Data'
            coreSteps.addFilterToTable(TEST_FILTER_ONE_RESULT)

        then: 'Check that the table data count is 1'
            coreSteps.isTableCountEqualTo(1)

        and: 'Check if the counter pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1 is visible'
            coreSteps.isCounterVisible(TEST_COUNTER_1)
    }

    def 'Test a filter that returns no results'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Add a filter that will not return any results'
            coreSteps.addFilterToTable(TEST_FILTER_NO_RESULTS)

        then: 'Make sure the table count is 0'
            coreSteps.isTableCountEqualTo(0)

        when: 'Try to select all using the checkbox'
            coreSteps.selectAllUsingCheckbox()

        then: 'Check that the selected count stays at 0'
            coreSteps.isSelectedCountEqualTo(0)
    }

    def 'Test sorting by Name in ascending order when a filter is applied'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Apply a filter to the table'
            coreSteps.addFilterToTable(TEST_FILTER_FOR_SORTING)

        then: 'Check that the count is 2'
            coreSteps.isTableCountEqualTo(2)

        when: 'Sort by the Name column in ascending order'
            coreSteps.sortByColumn('Name')

        then: 'The counters are sorted by name in ascending order'
            coreSteps.verifySorting('Name', 'asc')
    }

    def 'Test clearing of a table filter using clear selected link'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Apply the filter ' + TEST_FILTER_ONE_RESULT + ' to the Table Data'
            coreSteps.addFilterToTable(TEST_FILTER_ONE_RESULT)

        then: 'Check that the table data count is 1'
            coreSteps.isTableCountEqualTo(1)

        and: 'Check if the counter pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1 is visible'
            coreSteps.isCounterVisible(TEST_COUNTER_1)

        when: 'Click the clear filter link'
            coreSteps.clearFilter()

        then: 'Check that the table data count is 5'
            coreSteps.isTableCountEqualTo(5)
    }

    def 'Test single selection and deselection'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Select counter pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1'
            coreSteps.selectCounter(TEST_COUNTER_1)

        then: 'Check selected count is 1'
            coreSteps.isSelectedCountEqualTo(1)

        and: 'Check that pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1 is selected in the table'
            coreSteps.isCounterSelected(TEST_COUNTER_1)

        when: 'Deselect counter pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1'
            coreSteps.selectCounter(TEST_COUNTER_1)

        then: 'Check selected count is 0'
            coreSteps.isSelectedCountEqualTo(0)

        and: 'Check that pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1 is not selected in the table'
            coreSteps.isCounterNotSelected(TEST_COUNTER_1)
    }

    def 'Test multiple selection and deselection using control + select'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Multi-Select pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1 and pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4'
            coreSteps.multiSelect([TEST_COUNTER_1, TEST_COUNTER_2])

        then: 'Check that the counters have been selected'
            coreSteps.isCounterSelected(TEST_COUNTER_1)
            coreSteps.isCounterSelected(TEST_COUNTER_2)

        and: 'Check selected count is 2'
            coreSteps.isSelectedCountEqualTo(2)

        when: 'Deselect the counters'
            coreSteps.multiSelect([TEST_COUNTER_1, TEST_COUNTER_2])

        then: 'Check selected count is 0'
            coreSteps.isSelectedCountEqualTo(0)

        and: 'Check counters have been deselected'
            coreSteps.isCounterNotSelected(TEST_COUNTER_1)
            coreSteps.isCounterNotSelected(TEST_COUNTER_2)
    }

    def 'Test multiple selection and then deselection using the Clear link'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Multi-Select pmFlexRwrFailNoEutranTarget_UeCat2-100UePwrClass0|1 and pmFlexRwrFailPlmnNotAllowed_UeCat100|103|190UePwrClass0|1|4'
            coreSteps.multiSelect([TEST_COUNTER_1, TEST_COUNTER_2])

        then: 'Check that the counters have been selected'
            coreSteps.isCounterSelected(TEST_COUNTER_1)
            coreSteps.isCounterSelected(TEST_COUNTER_2)

        and: 'Check selected count is 2'
            coreSteps.isSelectedCountEqualTo(2)

        when: 'Deselect the counters'
            coreSteps.clearSelected()

        then: 'Check selected count is 0'
            coreSteps.isSelectedCountEqualTo(0)

        and: 'Check counters have been deselected'
            coreSteps.isCounterNotSelected(TEST_COUNTER_1)
            coreSteps.isCounterNotSelected(TEST_COUNTER_2)
    }

    def 'Test selection and deselection of counters using the select all checkbox'() {

        given: 'Open Counter Management Application'
            coreSteps.whenLandingPageIsOpenTheTitleIsAndTableIsVisible(APPLICATION_TITLE)

        when: 'Select all counters using the select all checkbox'
            coreSteps.selectAllUsingCheckbox()

        then: 'Selected Count should equal 5'
            coreSteps.isSelectedCountEqualTo(5)

        when: 'Deselect all counters using the select all checkbox'
            coreSteps.selectAllUsingCheckbox()

        then: 'Selected count should equal 0'
            coreSteps.isSelectedCountEqualTo(0)
    }
}

