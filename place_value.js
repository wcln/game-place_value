/**
 * BCLearningNetwork.com
 * Place Value
 * Colin Bernard
 * November 2018
 */

var STAGE_WIDTH, STAGE_HEIGHT;

var questions = [
  {
    number: "112.60",
    placeValue: "Ones"
  },
  {
    number: "278",
    placeValue: "Hundreds"
  },
  {
    number: "4859",
    placeValue: "Thousands"
  },
  {
    number: "12",
    placeValue: "Tens"
  }
];

var counter = 0;


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

  stage.addChild(background);

  // Add puzzle pieces to the stage.
  for (var piece of puzzlePieces) {
    stage.addChild(piece);
  }

  // Load first question.


  initListeners();

  stage.update();
}

function initListeners() {
  $(".digit").unbind('click').click(function() {
    console.log(this);
    // Remove a random puzzle piece.
    let index = Math.floor(Math.random() * puzzlePieces.length);
    createjs.Tween.get(puzzlePieces[index]).to({alpha: 0}, 1000).call(function() {
      stage.removeChild(puzzlePieces[index]);
      puzzlePieces.splice(index, 1);

      if (puzzlePieces.length === 0) {
        endGame();
      }
    });
  });
}

function start() {

}

function endGame(){
  $("#number").css("visibility", "hidden");
  $("#place-value").css("visibility", "hidden");
}


function update() {
  stage.update();
}

//////////////////////// PRELOADJS FUNCTIONS
var puzzlePieces = [];
var background;

/*
 * Add files to be loaded here.
 */
function setupManifest() {
  manifest = [
    {
      src: "images/background.png",
      id: "background"
    }
  ];

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
    } else if (event.item.id == "background") {
      background = new createjs.Bitmap(event.result);
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
    createjs.Ticker.setFPS(24);
    createjs.Ticker.addEventListener("tick", update); // call update function

    stage.update();
    initGraphics();
}

///////////////////////////////////// END PRELOADJS FUNCTIONS
