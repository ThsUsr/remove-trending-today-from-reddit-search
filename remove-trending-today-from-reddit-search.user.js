// ==UserScript==
// @name         Remove Trending Today from Reddit Search
// @namespace    https://github.com/ThsUsr
// @version      1.0
// @description  Remove Trending Today from Reddit Search
// @author       ThsUsr
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @homepageURL  https://github.com/ThsUsr/remove-trending-today-from-reddit-search
// @supportURL   https://github.com/tadwohlrapp/google-image-search-show-image-dimensions-userscript/issues
// @license      MIT
// ==/UserScript==


const trendingController = document.querySelector('search-dynamic-id-cache-controller');
const trendingRoot = trendingController.shadowRoot;


/**
 * Returns the first element matching the given selector within the trending
 * elements.
 *
 * @param {string} selector - The CSS selector to match against.
 * @return {Element|null} The first matching element, or null if none match.
 */
function getTrendingElement(selector) {
  return trendingRoot.lastElementChild.assignedElements()[0].shadowRoot.querySelector(selector);
}


/**
 * Removes certain elements from the trending area.
 *
 * This function does not return anything.
 */
function removeTrendingElements() {
  const elementsToRemove = [
    '.ml-md.mt-sm.mb-2xs.text-neutral-content-weak.flex.items-center',
    '#reddit-trending-searches-partial-container',
  ];

  elementsToRemove.forEach((selector) => {
    const element = getTrendingElement(selector);
    if (element) {
      element.remove();
    }
  });
}


/**
 * Starts a periodic cleanup of the trending area, removing elements based
 * on the given interval.
 *
 * @param {number} interval - The interval in milliseconds.
 */
function startPeriodicCleanup(interval) {
  setInterval(removeTrendingElements, interval);
}

startPeriodicCleanup(1000);
