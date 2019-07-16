'use strict'
/**
 * @author Emiliya Sokolova
 * @version 1.0.0
 *
 * @class
 * AccordionJS
 */
;(function (window) {
  var accordion = null

  var activePanelClass = 'is-active'

  var accordionPanels = null

  var currentPanel = null

  /*
   *  Contructor
   *
   * @param {containerID} to enable more than one accordion on a page
   */
  function AccordionJS (containerID) {
    var accordionContainer = containerID || 'accordion'

    accordion = document.querySelector('#' + accordionContainer)

    if (accordion !== null) {
      accordionPanels = accordion.querySelectorAll('.accordion__panel')

      if (accordionPanels.length > 0) {
        init()
      }
    }
  }

  /*
   * init method
   */
  function init () {
    currentPanel = checkForActivePanelOnLoad()

    if (typeof NodeList.prototype.forEach !== 'function') {
      NodeList.prototype.forEach = Array.prototype.forEach
    }

    accordionPanels.forEach(function (panel) {
      panel
        .querySelector('.accordion__trigger-panel')
        .addEventListener('click', activateSelectedPanel)
    })
  }

  /*
   * begin the activation process on selecting a panel
   * @param  {Event} evt
   * @return {Void}
   */
  function activateSelectedPanel (evt) {
    evt.preventDefault()

    var selectedPanel = findAncestor(evt.currentTarget, 'accordion__panel')

    if (
      currentPanel === selectedPanel &&
      currentPanel.classList.contains(activePanelClass)
    ) {
      currentPanel = selectedPanel
      removeCurrentPanel()
      return
    }

    removeCurrentPanel()

    displaySelectedPanel(selectedPanel)
  }

  /*
   * dispaly the new selected panel
   *
   * @param  {Object} selectedPanel the selected panel
   * @return {Void}
   */
  function displaySelectedPanel (selectedPanel) {
    selectedPanel.classList.add(activePanelClass)

    var currentContent = selectedPanel.querySelector('.accordion__content')
    currentContent.style.display = 'block'
    currentContent.style.height = currentContent.offsetHeight
    currentContent.style.opacity = 1

    currentPanel = selectedPanel
  }

  /*
   * Remove the currently selected panel
   *
   * @return {self} to enable chaining
   */
  function removeCurrentPanel () {
    if (typeof currentPanel === 'undefined') return this

    var currentContent = currentPanel.querySelector('.accordion__content')
    currentContent.style.opacity = 0
    currentContent.style.display = 'none'

    currentPanel.classList.remove(activePanelClass)
  }
  /*
   * check to see if the user has enabled a panel on inital page load
   * @return {Object} set to the active panel if set
   */
  function checkForActivePanelOnLoad () {
    for (var i = 0; i < accordionPanels.length; i++) {
      if (accordionPanels[i].classList.contains(activePanelClass)) {
        return accordionPanels[i]
      }
    }
  }

  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el
  }

  // -- return the window object
  window.AccordionJS = AccordionJS
})(window)

/*
 *
 * <!-- Accordion wrapper -->
 * <div id="accordion" class="accordion">
 *
 *   <!-- accordion panel -->
 *   <div class="accordion__panel">
 *      <div class="accordion__trigger-panel"><a href="#"><!-- your panel title go here --></a></div>
 *      <div class="accordion__content">
 *        <!-- your panel content go here-->
 *      </div>
 *    </div>
 *    <!-- end:accordion panel -->
 *
 *    <!-- add as many accordion panels as required -->
 *
 * </div>
 * <!-- end:Accordion wrapper -->
 *
 *  to call/init
 *      <script type="text/javascript">
 *      (function(){
 *          new AccordionJS();
 *          new AccordionJS('accordion-two');
 *      })();
 *     </script>
 *
 * The second option enables you to assign a different id value, so you can run two or more on one page
 */

/*
 *
 * Codepen DEMO
 * https://codepen.io/anon/pen/mZYxar
 *
 */
