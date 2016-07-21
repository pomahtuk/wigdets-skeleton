/*jslint browser: true, indent: 2, node: true*/
/*global require, module*/
'use strict';

var styles = require('../../css/components/preloader.scss');


/**
 * createPreloaderMarkup - returning a markup for preloader
 *
 * @return {type}  description
 */
function createPreloaderMarkup() {
  var markup = [];

  markup.push('<div class="' + styles['sk-folding-cube'] + '">');
  markup.push('   <div class="' + styles['sk-cube'] + '"></div>');
  markup.push('   <div class="' + styles['sk-cube'] + ' ' + styles['sk-cube2'] + '"></div>');
  markup.push('   <div class="' + styles['sk-cube'] + ' ' + styles['sk-cube4'] + '"></div>');
  markup.push('   <div class="' + styles['sk-cube'] + ' ' + styles['sk-cube3'] + '"></div>');
  markup.push('</div>');

  return markup.join('');
}
/**
 * Preloader - basic class for creating a preloaders
 *
 * @param  {DOMElement} parent
 */
function Preloader(settings) {
  if (!(settings || settings.container)) {
    return false;
  }

  var preloaderContainer = document.createElement('div');

  this.containerClasses = [
    styles['preloader-container'],
    styles['preloader-hidden']
  ];

  // keep refference to parrent
  this.container = settings.container;

  // set up a container
  preloaderContainer.className = this.getContainerClassNames();
  preloaderContainer.innerHTML = createPreloaderMarkup();

  // store references
  this.preloaderContainer = preloaderContainer;

  this.container.appendChild(preloaderContainer);

  return true;
}

/**
 * Get list of actual container classes
 */
Preloader.prototype.getContainerClassNames = function () {
  return this.containerClasses.join(' ');
};

/**
 * add class to container classes list
 */
Preloader.prototype.addContainerClassName = function (className) {
  var containerClasses =  this.containerClasses;

  function addClassName (cls) {
    if (containerClasses.indexOf(className) === -1) {
      containerClasses.push(className);
    }
  }

  if (className.constructor === Array) {
    className.forEach(addClassName);
  } else {
    addClassName(className);
  }


  this.preloaderContainer.className = this.getContainerClassNames();
};

/**
 * add class to container classes list
 */
Preloader.prototype.removeContainerClassName = function (className) {
  var containerClasses =  this.containerClasses;

  function removeClassName (cls) {
    var index = containerClasses.indexOf(cls);

    if (index >= 0) {
      containerClasses.splice(index, 1);
    }
  }

  if (className.constructor === Array) {
    className.forEach(removeClassName);
  } else {
    removeClassName(className);
  }

  this.preloaderContainer.className = this.getContainerClassNames();
};

/**
 * Start preloader - show element and begin animation
 */
Preloader.prototype.start = function () {
  this.removeContainerClassName([
    styles['preloader-display-none'],
    styles['preloader-hidden']
  ]);
  return true;
};

/**
 * Stop preloader - hide elements
 */
Preloader.prototype.stop = function () {
  this.addContainerClassName(styles['preloader-hidden']);

  setTimeout((function () {
    this.addContainerClassName(styles['preloader-display-none']);
  }).bind(this), 300);

  return true;
};

module.exports = Preloader;
