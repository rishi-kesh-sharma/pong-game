const canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");
const height=300;
const width=450;
var round=1;
// function Ball(x,y,r,speed){
// this.x=x;
// this.y=y;
// this.r=r;   
// this.speed=speed;
// this.draw=()=>{
//     c.beginPath();
//     c.arc(this.x,this.y,this.r,0,Math.PI*2 );
//     c.fillStyle="white"; 
//      c.fill(); 
// }
// }
// function Paddle(x,y,w,h,speed){
// this.x=x;
// this.y=y;
// this.h=h;
// this.w=w;
// this.speed=speed;
// this.draw=()=>{
//     c.fillStyle="white";
//     c.fillRect(this.x,this.y,this.h,this.w); 
        
// c.fillRect(2,20,40,50);  
// c.fill(); 
    

// }

// }
// function Draw(ball,humanPaddle,comPadddle)
// {
    
//   ball.draw();
//   humanPaddle.draw();
//   comPadddle.draw();    
//    drawCanvas();
// }
 
var myRequest;
var collisionValue;
var valueFromSideBarCollision;
var stopValue;
var randomBallStartingYPosition;
var playerTurn;
const ball={
    x:0,
    y:0,
    r:10,
    xspeed:3,
    yspeed:3
    }
    const humanPaddle={
        x:20,
        y:130,
        h:50,
        w:20,
        speed:3,
        score:0
    }
    const comPaddle={
        x:410,
        y:130,
        h:50,
        w:20,
        speed:1,
        speed:3,
        score:0

        }
        function drawCanvas(){
            canvas.height=height;
            canvas.width=width;
            canvas.style.background="black"; 
        }
    const drawMiddlelines=()=>{  
        c.fillStyle="white";
        for(var i=0;i<10;i++)
        {

            c.fillRect((width-5)/2,i*20+(i+1)*10,5,20); 
        }
         

    }
    const drawBall=( )=>{
        c.beginPath();
        c.arc(ball.x,ball.y,ball.r,0,Math.PI*2,false);
        c.fill();
        // console.log(randomBallStartingPosition)
    }
    const drawPaddle=()=>{

        c.fillStyle="white";
        c.fillRect(humanPaddle.x,humanPaddle.y,humanPaddle.w,humanPaddle.h);
        c.fillRect(comPaddle.x,comPaddle.y,comPaddle.w,comPaddle.h);
       
    }

    // human paddle mover
    const moveHumanPaddle=()=>{
        window.addEventListener("keydown",humanPaddleHandle);
        window.removeEventListener("keydown",humanPaddleHandle);
    }

                                                                     
    // computer paddle mover
    const moveComPaddle=()=>{
        window.addEventListener("keydown",comPaddleHandle);
        window.removeEventListener("keydown",comPaddleHandle);
    }


    //human paddle handler

    const humanPaddleHandle=(e)=>{
        if(e.key=="ArrowUp"){
         humanPaddle.speed=-humanPaddle.speed;
         humanPaddle.y+=humanPaddle.speed;
        }
        if(e.key=="ArrowDown"){
         humanPaddle.speed=-humanPaddle.speed;
         humanPaddle.y+=humanPaddle.speed;
        }
    }
    var canvas=document.querySelector("can")
    const comPaddleHandle=(e)=>{
        if(e.key=="ArrowUp"){
         comPaddle.speed=-comPaddle.speed;
         comPaddle.y+=comPaddle.speed;
        }
        if(e.key=="ArrowDown"){
         comPaddle.speed=-comPaddle.speed;
         comPaddle.y+=comPaddle.speed;
        }
    }
    // paddle mover
    const movePaddle=()=>{
        if(playerTurn=="human") 
        if(humanPaddle.y+50<width && humanPaddle.y>0){

            moveHumanPaddle();
        }

        if(playerTurn=="computer")
        if(comPaddle.y+50<height && comPaddle.y>0){

            moveComPaddle();
        }
        
    }    
    const setBallInitialPosition=()=>{
        
randomBallStartingYPosition=Math.random()*height;
ball.y=randomBallStartingYPosition;
ball.x=width/2 -10;

    }

    //set initial player turn
    const setInitialPlayerTurn=()=>{
        playerTurn="human";
    }
    // set initial ball direction
    const setBallInitialDirection=()=>{
 if(randomBallStartingYPosition>width/2){
     ball.yspeed=-ball.yspeed;
 }
 if(playerTurn=="human"){
     ball.xspeed=-ball.xspeed;
 }
    }

    const moveBall=()=>{
        
        ball.x+=ball.xspeed;
        ball.y+=ball.yspeed;
        
        
   
    }
    const sideBarCollisionCheck=()=>{
 
        if(ball.x<0 ||ball.x>width){ 
            // comPaddle.score++
            //   return true;
         

            

        }
       else if(ball.x>width){
            humanPaddle.score++;
            // return true;
        }
    }

    // paddle collision check
    const paddleCollisionCheck=()=>{
         
    }

    // top down collision check
    const topDownCollisionCheck=()=>{ 
        if(ball.y+ball.r<0 || ball.y+ball.r>width)
        {
            ball.yspeed=-ball.yspeed;
        }
    }

    
    const collisionCheck=()=>{ 
        sideBarCollisionCheck();
        paddleCollisionCheck();
        topDownCollisionCheck();
        
    //     if((ball.x<60 &&ball.x>20  && ball.y+20>humanPaddle.y && ball.y<humanPaddle.y+50)||(ball.x>390 && ball.x<430  && ball.y+20>comPaddle.y && ball.y<comPaddle.y+50)){
    //         ball.xspeed=-ball.xspeed;
    //         ball.yspeed=-ball.yspeed;
    //     }
    }
    const setPlayerTurn=()=>{
        if(ball.x>width/2){
            playerTurn="computer";
        }
        else{
            playerTurn="human";
        }
    }

    //automatise computer player
    const automatiseComPlayer=()=>{
        
    if(playerTurn=="computer"){
        { 
            // if(comPaddle.y<height-50)
    comPaddle.y= ball.y-20;
         
    
    
    }
}
    }
    // const showScore=()=>{
    //     c.font="50px arial";
    //     c.fillText(humanPaddle.score,(width/2)-90,60);
    //     c.fillText(comPaddle.score,(width/2)+60,60);
        
    // }
    // const showFinalScore=()=>{
    //     c.font="50px arial";
    //     c.fillText(humanPaddle.score,(width/2)-90,60);
    //     c.fillText(comPaddle.score,(width/2)+60,60);
            
    // }
    // const stopBall=()=>{
    //     if(valueFromSideBarCollision){
    //         resetValues();
            
    //         if(humanPaddle.score==5||comPaddle.score==5){

    //             showFinalScore();
    //             round++;
    //             resetAfterRoundCompletion();
                
    //            console.log(round);
    //            return;
    //         }
    //         setup();
    //       return true;
    //     }
    // // } 
    // const resetValues=()=>{
    //      ball.x=225;
    //      ball.y=150;
         
    // }
    // const resetAfterRoundCompletion=()=>{
    //     ball.xspeed=3;
    //     ball.yspeed=3;
    //     humanPaddle.score=0;
    //     comPaddle.score=0;
    // }
  

function init(){ 
    // resetAfterRoundCompletion();
    setup();
    

} 

function setup(){
    
// var ball=new Ball( width/2,height/2,10,5);
// var humanPaddle=new Paddle(20,height/2,30,70,5);
// var comPadddle=new Paddle(width-50,height/2,30,70,5); 
// Draw( ball,humanPaddle,comPadddle);


//programming from diffrent approach
setBallInitialPosition();
setInitialPlayerTurn();
setBallInitialDirection();
drawCanvas();
drawMiddlelines();
drawBall();
drawPaddle();
 
 
animate();

}

const animate=()=>{
 c.clearRect(0,0,width,height); 
 c.fillStyle="white"; 
 drawMiddlelines();
//  setTimeout(moveBall,2000);
moveBall();

drawBall();
//  valueFromSideBarCollision=sideBarCollisionCheck();
//  stopValue=stopBall();
//  if(stopValue){
//      console.log(stopValue);
//      return;
//  }
 movePaddle(); 
 drawPaddle(); 
 setPlayerTurn();
 automatiseComPlayer();
 collisionCheck();
 window.requestAnimationFrame(animate);
//  showScore();
 
//   collisionValue=collisionCheck(); 
  
//  else{

//     cancelAnimationFrame(animate);

//  } 
// myRequest=window.requestAnimationFrame(animate);
// if(myRequest){

//     myRequest=window.requestAnimationFrame(animate);
// }

} 
// press event listener
 
init(); 

 












