package com.ericsson.nms.pres.countermanagement.testware.pages

import com.ericsson.nms.pres.countermanagement.testware.fragments.CmNodeTypeSelectFragment
import com.ericsson.nms.pres.countermanagement.testware.fragments.CmTopFragment
import com.ericsson.nms.pres.countermanagement.testware.fragments.CmActionBarFragment
import groovy.util.logging.Slf4j
import org.jboss.arquillian.drone.api.annotation.Drone
import org.jboss.arquillian.graphene.Graphene
import org.jboss.arquillian.graphene.page.Location
import org.jboss.arquillian.graphene.page.Page
import org.openqa.selenium.WebDriver

import static org.jboss.arquillian.graphene.Graphene.guardAjax
import static com.ericsson.nms.pres.countermanagement.testware.LocalConstants.DEFAULT_DIMENSION

@Slf4j
@Location('/#countermanagement/FlexCounterConfiguration')
class CmCreateFlexCounterPage {

    @Drone WebDriver browser

    @Page CmTopFragment topFragment

    @Page CmActionBarFragment actionBarFragment

    @Page CmNodeTypeSelectFragment nodeTypeSelectFragment

    def whenLandingPageIsOpenTheTitleIs(title) {
        guardAjax(Graphene.goTo(this.class))

        browser.manage().window().setSize(DEFAULT_DIMENSION)
        log.info("Size of the window is ${browser.manage().window().getSize()}")

        assert topFragment.title == title
    }


    def whenDropDownEmptyDefaultTextIs(title) {
        assert nodeTypeSelectFragment.isDropDownVisible()
        assert nodeTypeSelectFragment.getDropDownItemValue() == title
    }

    def whenDropDownExpandItContainsClickableItem(title, isClickable) {
        nodeTypeSelectFragment.expandDropDown()
        assert nodeTypeSelectFragment.checkDropDownItemIsVisible(title)
        assert nodeTypeSelectFragment.checkSelectableByName(title) == isClickable
    }

    def whenDropDownChangeToValueItIs(title) {
        nodeTypeSelectFragment.selectByName(title)
        assert nodeTypeSelectFragment.getDropDownItemValue() == title
    }


}
