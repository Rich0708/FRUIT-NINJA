var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fruit1,fruit1Image,fruit2,fruit2Image,fruit3,fruit3Image,fruit4,fruit4Image,fruitsGroup;

var gameover,gameOverImage;

var swoosh;

var enemy,enemyMoving,enemiesGroup;

var bg,backgroundImage;

var sword,swordImage;
var score;
function preload(){
  gameOverImage = loadAnimation("gameover.png");
  
  gameover = loadSound("gameover.mp3");
  
  swoosh = loadSound("swoosh.mp3");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  backgroundImage = loadImage("background.png");
  
  swordImage = loadImage("sword.png");
 
  enemyMoving = loadAnimation("alien1.png","alien2.png");
}
function setup() {
  createCanvas(500, 400);
  background(220);
  
  bg = createSprite(200,200,200,200);
  bg.addImage("bg",backgroundImage);
  bg.scale = 1.8
  
  sword = createSprite(250,200,20,20);
  sword.addImage("sword",swordImage);
  sword.addAnimation("gm",gameOverImage);
  sword.scale = 0.6;
  
  fruitsGroup = new Group();
  enemiesGroup = new Group();
  
  score = 0;
}
function draw(){
  
   if(gameState === PLAY){
  if(fruitsGroup.isTouching(sword)){
  fruitsGroup.destroyEach();
  score = score+2;
  swoosh.play();
   
  }
  enemy();
  fruit();
  sword.y=mouseY;
  sword.x =mouseX;
  if(enemiesGroup.isTouching(sword)){
  gameState=END;
  gameover.play();
  }
   }
  else if(gameState === END){
  fruitsGroup.destroyEach();
  enemiesGroup.destroyEach();
  fruitsGroup.velocityYEach = 0;
  enemiesGroup.velocityYEach = 0;
  
  sword.changeAnimation("gm");
  sword.x = 250;
  sword.y = 200;
  }
  
  
drawSprites();
text("Score:"+score,440,15);

}

function fruit(){
  if (frameCount % 60 === 0){
   var fruit = createSprite(400,0,20,20);
    fruit.velocityY = (7+(score/4));
    //fruit.debug = true;
    // //generate random fruits
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit .addImage(fruit1);
              break;
      case 2: fruit .addImage(fruit2);
              break;
      case 3:fruit .addImage(fruit3);
              break;
      case 4: fruit .addImage(fruit4);
              break;
    }
    R = Math.round(random(1,2));
    if(R ==1){
    fruit.y = 10;
    fruit.veloxityX = (7+(score/4));
    }
    else if(R == 2){
    fruit.y = 400;
    fruit.velocityY = -(7+(score/4));
    }
    
            
    fruit.scale = 0.25;
    fruit.lifetime = 100;
   
   fruitsGroup.add(fruit);
    
  fruit.x = Math.round(random(30,200));
  
 }
}

function enemy(){

if(World.frameCount%200===0){
var enemy = createSprite(400,400,20,20);
enemy.addAnimation("moving",enemyMoving)
enemy.x =Math.round(random(100,300));
enemy.velocityY = -(8+(score/10));
enemy.setlifetime = 50;
  
  enemiesGroup.add(enemy);
}
  
}

