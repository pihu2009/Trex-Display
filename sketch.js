var trexis,trex,mov,clo
var ig
var play=1
var end=0
var cactus1
var cactus2
var cactus3
var cactus4
var cactus5
var cactus6
var gamestate=play
var collided
var cg
var clg
var score
var reset
var gameover
var resetimg
var gameoverimg



function preload()
{
  trexis=loadAnimation("trex1.png","trex3.png","trex4.png")
  mov=loadImage("ground2.png")
  clo=loadImage("cloud.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  collided=loadAnimation("trex_collided.png")
  gameoverimg=loadImage("gameOver.png")
  resetimg=loadImage("restart.png")
}


function setup()
{
  createCanvas(600,400)
  trex = createSprite(80,350,30,30)
  trex.addAnimation("moving",trexis)
  trex.addAnimation("stop",collided)
  trex.scale=0.5
  
  ground = createSprite(300,350,600,30)
  ground.addImage(mov)
 
 
  //CREATING INVISIBLE GROUND
  ig=createSprite(300,375,600,15)
  ig.visible=false


  //SETTING TREX COLLIDER
  trex.setCollider("rectangle",0,18,50,trex.height)

  cg=createGroup()
  clg=new Group()

  score=0 
  textSize(40)
  fill("black")

  reset=createSprite(300,300,50,50)
  reset.addImage(resetimg)
  reset.scale=1
  
  gameover=createSprite(300,200,50,50)
  gameover.addImage(gameoverimg)
  gameover.scale=1
}
 

function draw()
{
  background("white")
  text("Score:"+score,300,50)

  if(gamestate===play)
  {  
    
    gameover.visible=false
    reset.visible=false 
    
    
    //GROUND
    ground.velocityX=-(5+score/100)
    if(ground.x<=0)
    {
      ground.x=ground.width/2
    }
      
    //trex.collide(ground)
    if((touches.length>0||keyDown("space"))&&trex.y>=335)
    {
      trex.velocityY=-13
      touches=[]
    }
      trex.velocityY=trex.velocityY+0.5


      //FUNCTIONS
      spawncactus()
      spawncloud()
  
    if(trex.isTouching(cg)) 
      {
        gamestate=end
      }
    
  
    score+=Math.round(getFrameRate()/60)
  //console.log(getFrameRate())
  
  
  
  }
  
  else if(gamestate===end)
  
  {
   
    gameover.visible=true
    reset.visible=true 
   
    //STOPING GROUND 
    ground.velocityX=0
    trex.changeAnimation("stop") 
    
    cg.setVelocityXEach(0) 
    clg.setVelocityXEach(0)
  
    cg.setLifetimeEach(-1)
    clg.setLifetimeEach(-1)
  
    trex.velocityY=0
  
    if(mousePressedOver(reset)||touches.length>0)
    {
    restart()
    touches=[]
    }
  }
  
  trex.collide(ig)  
  drawSprites()

}
  
function restart()
{
  trex.x=80 
  gamestate=play
  score=0
  cg.destroyEach()
  clg.destroyEach()
  trex.changeAnimation("moving")
}


function spawncloud()
{
 if(frameCount%100==0)
  {
  cloud=createSprite(560,100,30,30)
  cloud.velocityX=-4
  cloud.lifetime=150
  cloud.addImage(clo)
  cloud.y=Math.round(random(30,130))
  clg.add(cloud)
  }

}


function spawncactus()
{
  if(frameCount%200===0) 
  {
    cactus=createSprite(600,330,30,30)
    cactus.velocityX=-(3+score/100)
    cactus.lifetime=230
    cactus.scale=0.7
    //cactus.collide(ground)
    var ran = Math.round(random(1,6))
    switch(ran)
    {
      case 1: cactus.addImage(cactus1) 
              break;
      case 2: cactus.addImage(cactus2)
              break;
      case 3: cactus.addImage(cactus3)
              break;
      case 4: cactus.addImage(cactus4) 
              break;
      case 5: cactus.addImage(cactus5) 
              break;
      case 6: cactus.addImage(cactus6) 
              break;
      
      default:break;  
    }

    cg.add(cactus)
    cactus.depth=trex.depth
    trex.depth+=1 
  }
}


























