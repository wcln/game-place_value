/**
 * BCLearningNetwork.com
 * Place Value
 * Colin Bernard
 * November 2018
 */

var STAGE_WIDTH, STAGE_HEIGHT;


/*
 * Initialize the stage and some createJS settings
 */
function init() {
    STAGE_WIDTH = parseInt(document.getElementById("gameCanvas").getAttribute("width"));
    STAGE_HEIGHT = parseInt(document.getElementById("gameCanvas").getAttribute("height"));

    // Init stage object.
    stage = new createjs.Stage("gameCanvas");
    stage.mouseEventsEnabled = true;
    stage.enableMouseOver(); // Default, checks the mouse 20 times/second for hovering cursor changes

    setupManifest(); // preloadJS
    startPreload();

    initListeners();

    stage.update();
}


/*
 * Place graphics and add them to the stage.
 */
function initGraphics() {

  // Add puzzle pieces to the stage.
  for (var piece of puzzlePieces) {
    stage.addChild(piece);
  }

  stage.update();
}

function initListeners() {

}


function update() {
  stage.update();
}

//////////////////////// PRELOADJS FUNCTIONS
var puzzlePieces = [];

/*
 * Add files to be loaded here.
 */
function setupManifest() {
  manifest = [];

  // Load puzzle pieces into manifest.
  for (var i = 1; i <= 20; i++) {
    manifest.push({src: "images/puzzle_pieces/" + i + ".png", id: "piece_" + i});
  }
}


function startPreload() {
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

/*
 * Specify how to load each file.
 */
function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    // create bitmaps of images
    if (event.item.id.includes("piece")) {
      puzzlePieces.push(new createjs.Bitmap(event.result));
    }

}

function loadError(evt) {
    console.log("Error!", evt.text);
}

// not currently used as load time is short
function handleFileProgress(event) {

}

/*
 * Displays the start screen.
 */
function loadComplete(event) {
    console.log("Finished Loading Assets");

    // ticker calls update function, set the FPS
    // createjs.Ticker.setFPS(24);
    // createjs.Ticker.addEventListener("tick", update); // call update function

    stage.update();
    initGraphics();
}

///////////////////////////////////// END PRELOADJS FUNCTIONS
