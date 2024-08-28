package com.ericsson.nms.pres.countermanagement.testware.utils

import java.text.SimpleDateFormat

import static java.io.File.separator as f_s
import static org.openqa.selenium.OutputType.FILE
import static org.spockframework.util.IoUtil.copyFile

import org.slf4j.Logger
import org.slf4j.LoggerFactory


static void takeScreenShot(screenShotName, browser) {
    final Logger log = LoggerFactory.getLogger(this.class)
    def date = new SimpleDateFormat('yy-MM-dd_HH-mm-ss-SSS').format(new Date())
    def path = System.getProperty('user.dir') + "${f_s}target${f_s}" + "ScreenShot_${date}_${screenShotName}.png"

    log.info 'Taking Screenshot for method {}', screenShotName
    try {
        copyFile browser.getScreenshotAs(FILE), new File(path)
        if (new File(path).exists()) {
            log.info 'ScreenShot saved to: {}', path
        }
    } catch (final IOException ignored) {
        log.error 'Failed to save ScreenShot'
    }
}
