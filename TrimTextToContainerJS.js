'use strict'
/**
 * @author Daut Molahasanov
 * @version 1.0.0
 *
 * @class
 * TrimTextToContainerJS
 */
;(function (window) {
  // Fixed height container divisible to the line height of the text e.g. 32/16  or 36/12
  var containers = document.querySelectorAll('.sf-list-vertical__title')

  var hiddenSelector = '.full-title'

  var elToTrimSelector = '.trimmed'

  function TrimTextToContainerJS () {
    trimTitles()

    window.addEventListener('resize', trimTitles)
  }

  function trimTitles () {
    containers.forEach(function (container) {
      // Loop through each container
      var fullTitle = container.querySelector(hiddenSelector)
      var span = container.querySelector(elToTrimSelector)
      // Reset span text on resize
      if (span && fullTitle) {
        span.textContent = fullTitle.textContent
        // When making the screen bigger, copy the full title first
        var titleHeight = container.clientHeight
        while (
          span.offsetHeight > titleHeight &&
          span.textContent.length > 30
        ) {
          span.textContent = span.textContent.replace(/\W*\s(\S)*$/, '...') // Add an ellipsis at the last shown space
        }
      }
    })
  }

  // -- Return the window object
  window.TrimTextToContainerJS = TrimTextToContainerJS
})(window)

new TrimTextToContainerJS()

/*
 *
 * <div class="sf-list-vertical">
 *   <a class="sf-list-vertical__item" href="#">
 *       <h4 class="sf-list-vertical__title">
 *           <span class="full-title" aria-hidden="true" style="display: none">Title</span>
 *           <span class="trimmed">Title</span>
 *       </h4>
 *   </a>
 * </div>
 *
 */

/*
 *
 * Codepen DEMO
 * https://codepen.io/anon/pen/GbaxyZ?editors=1111
 *
 */
