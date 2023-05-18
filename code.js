var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["3c285ece-5057-474f-b5c9-c75f9b5b21a1"],"propsByKey":{"3c285ece-5057-474f-b5c9-c75f9b5b21a1":{"name":"golfball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var score = 0;
var bola = 8 ;
var lives = 3;
var brick;
var gamestate = "serve";
var ball = createSprite(200,200,10,10);
ball.setAnimation("golfball_1");
ball.scale = 0.05;
var ball2 = createSprite(200,200,10,10);
ball2.setAnimation("golfball_1");
ball2.scale = 0.05;
var paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor = "blue";

createEdgeSprites();

var bricks = createGroup();

function createBrickRow(y, color) {
  for(var c=0; c<10; c++)
  {
    brick = createSprite(35+40*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
    
  }
}

createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");

function bricksReset(){
  
  bricks.destroyEach();
   createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");

}
function draw() {
  background("black");
  fill("white");
  textSize(20);
  text("Pontuação: "+score,40,25);
  text("Vidas: "+lives, 40, 45);
  text("bolas: "+bola, 250,25 );
  
  if(gamestate == "serve"){
    text("Clique para lançar a bola.", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
    ball2.velocityX =0;
    ball2.velocityY =0;
    ball2.x = 200;
    ball2.y = 200;
  }
  else if(gamestate =="end") {
    text("Fim de Jogo", 150, 250);
    ball.remove;
    bricks.setVelocityEach(0, 0);
    
  }
  else {
    gameplay();
    if(ball.isTouching(bottomEdge)) {
    ballover();
  }
    if(ball2.isTouching(bottomEdge)) {
    ballover();
  }
  }
   
  drawSprites();
}

function mousePressed()
{

  if(gamestate == "serve"){
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
    ball2.velocityY = -7;
    ball2.velocityX = 7;
    bricks.setVelocityYEach(0.27);
  }
  
  
}

function brickHit(ball, brick) {
 playSound("assets/category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
 
 if(ball.velocityY<10 && ball.velocityY>-10)
  { ball.velocityX *= 1.05;
    ball.velocityY *= 1.05;

  }
 
}

function ballover(){
  bola = bola - 1;
  
  if(bola>=1 ) {
    gamestate = "serve";
  }
  if (bola === 0) {
    lives = lives -1;
    bola = 6;
    score = 0;
    gamestate = "serve";
    if(lives === 0){
      gamestate = "end";
      bola = 0;
    }
    if(lives - 1 ){
     bricksReset();
   }
  } 
  
  
}

function gameplay(){
   //paddle.x = ball.x;
  paddle.x = World.mouseX;
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  //rotation = rotation + 5;
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  ball2.bounceOff(topEdge);
  ball2.bounceOff(leftEdge);
  ball2.bounceOff(rightEdge);
  ball2.bounceOff(paddle);
  ball2.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    playSound("assets/category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
    if(ball2.bounceOff(paddle))
  {
    playSound("assets/category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball2.velocityX = 0;
    ball2.velocityY = 0;
    textSize(60);
    text("Muito bem!!",100,200);
  }
  
if (bricks.isTouching(bottomEdge)) {
  lives = 0;
  bola = 0;
  gamestate = "end";
}
  


}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
