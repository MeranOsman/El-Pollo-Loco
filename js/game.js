let canvas;
let world
let isFullScreenBlocked = false;
let isFullscreen = false;
let startButton;
let restartButton;
let controlInfo;


/**
 * Initializes the application by creating the Canvas element, a keyboard, the world, and various UI elements.
 */
function init() {
    canvas = document.getElementById('canvas');
    let keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    startButton = document.getElementById('start-button');
    restartButton = document.getElementById('restart-button');
    controlInfo = document.getElementById('control-info');
}


/**
 * Toggles between fullscreen and normal mode for the canvas container element.
 */
function toggleFullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (isFullscreen) {
        exitFullscreen();
    } else {
        enterFullscreen(fullscreen);
    }
}


/**
 * Activates or deactivates fullscreen mode and adjusts the layout accordingly.
 * 
 * @param {HTMLElement} fullscreen - The container element containing the canvas.
 */
function enterFullscreen(fullscreen) {
    enterFullscreenContent(fullscreen);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.borderRadius = '0';
    if (window.innerHeight >= 500) {
        startButton.style.left = '45%';
        restartButton.style.left = '58%';
        controlInfo.style.left = '43%';
    }
}


/**
 * Requests fullscreen mode for the specified element.
 * 
 * @param {HTMLElement} element - The element for which fullscreen mode is requested.
 */
function enterFullscreenContent(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }

    isFullscreen = true;
}


/**
 * Handles the 'fullscreenchange' event, toggling between fullscreen mode and exit.
 */
document.addEventListener('fullscreenchange', (event) => {
    if (!isFullScreenBlocked) {
        isFullScreenBlocked = true;
    } else {
        isFullScreenBlocked = false;
        exitFullscreen();
    }
});


/**
 * Exits fullscreen mode if supported.
 */
function exitFullscreen() {
    if (isFullscreenSupported()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    isFullscreen = false;
    if (window.innerHeight >= 500) {
        setStylesAfterExitFullscreen();
    }
}


/**
 * Checks if fullscreen mode is supported by the current browser.
 * 
 * @returns {boolean} - True if fullscreen mode is supported, otherwise false.
 */
function isFullscreenSupported() {
    return (document.fullscreenElement || document.webkitFullscreenElement) && (document.exitFullscreen || document.webkitExitFullscreen);
}


/**
 * Sets specific style properties after exiting fullscreen mode.
 */
function setStylesAfterExitFullscreen() {
    canvas.style.borderRadius = '20px';
    restartButton.style.left = '44%';
    startButton.style.left = '35%';
    controlInfo.style.left = '30%';
}


/**
 * Toggles the display of the control information element.
 */
function toggleInfo() {
    let controlInfo = document.getElementById("control-info");

    if (controlInfo.style.display === "none" || controlInfo.style.display === "") {
        controlInfo.style.display = "block";
    } else {
        controlInfo.style.display = "none";
    }
}


/**
 * Adds an event listener for the DOMContentLoaded event that disables the context menu for all images on the page.
 */
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        img.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    });
});