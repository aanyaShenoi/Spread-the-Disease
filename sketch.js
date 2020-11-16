var bg, bgImage, invisibleGround;
var diseaseSpreader, diseaseSpreaderImage, diseaseSpreaderAngryImage;
var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleGroup;
var diseaseCatcher, diseaseCatcherImage, diseaseCatcherGroup;
var score = 0;
var play = 1, end = 0;
var gameState = play;

function preload(){
  bgImage = loadImage('background.jpg');
  diseaseSpreaderImage = loadImage('disease_spreader.png');
  diseaseSpreaderAngryImage = loadImage('disease_spreader_angry.png');
  obstacleImage1 = loadImage('Enemy.png');
  obstacleImage2 = loadImage('obstacle1.png');
  obstacleImage3 = loadImage('Obstacle2.png');
  diseaseCatcherImage = loadImage('Disease_Catcher.png');
}

function setup() {
  createCanvas(600, 700);
  bg = createSprite(0, 300, 400, 600);
  bg.addImage("background", bgImage);
  bg.scale=0.5
  bg.velocityX=-2.5;

  diseaseSpreader = createSprite(50, 500, 50, 50);
  diseaseSpreader.addImage(diseaseSpreaderImage);
  diseaseSpreader.scale=0.25;
  diseaseSpreader.setCollider("circle", 0, 0, 100);

  invisibleGround = createSprite(300, 550, 600, 20);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  diseaseCatcherGroup = createGroup();
  
}

function draw() {
  background("white");
  
  if(gameState === play) {
    if(bg.x < 200) {
      bg.x = 300;
    }
    if(keyDown("space")&&diseaseSpreader.y > 450){
      diseaseSpreader.velocityY = -12.5;
    }
    diseaseSpreader.velocityY = diseaseSpreader.velocityY + .5;
    diseaseSpreader.collide(invisibleGround);
    if(diseaseSpreader.isTouching(diseaseCatcherGroup)){
      score = score + 2;
    }
    if(diseaseSpreader.isTouching(obstacleGroup)){
      gameState = end;
    }
    spawnObstacles();
    spawnDiseaseCatchers();
  }
  else if(gameState === end) {
    diseaseSpreader.addImage(diseaseSpreaderAngryImage);
    diseaseSpreader.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    diseaseCatcherGroup.setVelocityXEach(0);
    bg.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    diseaseCatcherGroup.setLifetimeEach(-1);
    text(" | Game is over. Press the space key to restart", 100, 625)
    if(keyDown("space")){
      gameState = play;
    }
  }
 
  text("Score: " + score, 50, 625);
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 180 === 0) {
    var obstacle = createSprite(600, 525, 50, 50);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addImage(obstacleImage1);
      obstacle.scale = 0.0325;
      obstacle.y = 500;
      break;
      case 2: obstacle.addImage(obstacleImage2);
      obstacle.scale = 0.125;
      break;
      case 3: obstacle.addImage(obstacleImage3);
      obstacle.scale = 0.125;
      break;
      default:
      break;
    }
    obstacle.velocityX = -5;
    obstacle.lifetime = 125;
    obstacleGroup.add(obstacle);
  }
}

function spawnDiseaseCatchers() {
  if(frameCount % 100 === 0){
    var diseaseCatcher = createSprite(600, 500, 50, 50);
    diseaseCatcher.y = Math.round(random(300, 425));
    diseaseCatcher.addImage(diseaseCatcherImage);
    diseaseCatcher.velocityX = -2.5;
    diseaseCatcher.lifetime = 300;
    diseaseCatcher.scale = 0.125;
    diseaseCatcherGroup.add(diseaseCatcher);
  }
}