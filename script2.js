var canvas=document.querySelector("canvas");
canvas.width=600;
canvas.height=400;
var c=canvas.getContext("2d");
const Canvas={
    x:30,
    y:100,
  height:300,
  width:500,
  round:1,
  drawCanvas:
  function (){
      c.fillStyle="black";
      c.fillRect(this.x,this.y,this.width,this.height);
  },
  drawMiddlelines: function()
  {  
      c.fillStyle="white";
      for(var i=0;i<10;i++)
      {
                        c.fillStyle="white";
                        c.fillRect(this.x+(this.width/2),this.y+i*20+(i+1)*10,5,20); 

      }

  },
  drawText:function(){
      c.font="30px arial";
      c.fillText("Round"+"  " +Canvas.round,(Canvas.x+Canvas.width/2)-90,Canvas.y+30);
      c.font="50px arial";
        c.fillText(humanPaddle.score,(Canvas.x+Canvas.width/2)-90,Canvas.y+90);
        c.fillText(comPaddle.score,(Canvas.x+Canvas.width/2)+70,Canvas.y+90);
  },
  endText:function(){
      var winnerText;
      if(comPaddle.score>humanPaddle.score)
  {
      winnerText="you lost!!";
  }
  else{
      winnerText="congratulation you won!!"
  }

 console.log(comPaddle.score);
    c.font="70px arial";
    c.fillText("gameover"  ,(Canvas.x+Canvas.width/2)-200,Canvas.y+Canvas.height/2);
    c.font="30px arial";
    c.fillText(winnerText  ,(Canvas.x+Canvas.width/2)-200,Canvas.y+Canvas.height/2+50);
  }

}

const ball={
    x:Canvas.x+Canvas.width/2,
    y:Canvas.y+Canvas.height/2,
    r:10,
    xspeed:2,
    yspeed:2,
    turn:"human",
    noOfServes:0,
drawBall:function(){
    c.fillStyle="white";
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    c.fill();
}, 
   setBallDirection:function(){
    if(ball.y>Canvas.y+Canvas.height/2){
       
        this.yspeed=-this.yspeed;
    } 
    if(this.turn=="computer"){
        this.xspeed=this.xspeed;
    }
    else{
        this.xspeed=-this.xspeed;
    }
   },
    moveBall:function()
    {
        

            this.x+=this.xspeed;
            this.y+=this.yspeed;
        
        
    },
    setBallRandomPosition:function(){
        
this.y=Canvas.y+10+(Canvas.height-10)*Math.random();

    },
    wallCollisionTracking:function(){
        if(this.x <Canvas.x || this.x>Canvas.x+Canvas.width)
        {
            this.noOfServes++;
            this.xspeed=-this.xspeed;
            
            if(this.x<Canvas.x){
                this.turn="human";
                comPaddle.score++
            }
            else{
                this.turn="computer";
                humanPaddle.score++;
            }
            return 1;
        }
        if(this.y <Canvas.y || this.y>Canvas.y+Canvas.height)
        {
            this.yspeed=-this.yspeed;
        }
    },
    collisionWithPaddlesTracking:function(){
       
         if((ball.x<=humanPaddle.x+humanPaddle.width && ball.y+2*ball.r>humanPaddle.y&&ball.y<humanPaddle.y+humanPaddle.height&&ball.x>humanPaddle.x)||(ball.x>=comPaddle.x-2*ball.r&&ball.y+2*ball.r>comPaddle.y&&ball.y<comPaddle.y+comPaddle.height)){

             
            ball.xspeed=-ball.xspeed;
         } 
            
             
        }
    

    };
    const humanPaddle={
        height:50,
        width:20,
        x:Canvas.x+30,
        y:Canvas.y+(Canvas.height-50)/2,
       
        speed:10,
        score:0,
        turn:true,
        drawHumanPaddle:  function(){
           
            c.fillStyle="white";
            c.fillRect(this.x,this.y,this.width,this.height);
            
           
        },
       moveHumanPaddle:function(key){
           console.log (key);
            if(key=="ArrowUp"){
                if(this.y>Canvas.y){

                    this.y-=this.speed;
                }
            }
            else if(key=="ArrowDown"){
                if(this.y+this.height<Canvas.y+Canvas.height)
                {

                    this.y+=this.speed;
                }

            console.log(this.y);
            }
            
            
            
            
        }
    //     moveHumanPaddle:function(){
            
    //         this.y+=this.speed;
    // }
}
    const comPaddle={
        height:50,
        width:20,
        x:Canvas.x+Canvas.width-50,
        y:Canvas.y+(Canvas.height-50)/2,
        speed:0,
        score:0,
        drawComPaddle:function(){
            c.fillRect(this.x,this.y,this.width,this.height);
        },
        moveComPaddle:function(){
            
             comPaddle.y=ball.y-22;
        }
    };
    const setup=()=>{

        
         Canvas.drawCanvas();
        Canvas.drawMiddlelines() ;
        Canvas.drawText();
        ball.setBallRandomPosition();
        ball.setBallDirection();
        humanPaddle.drawHumanPaddle();
        comPaddle.drawComPaddle();
        addEventListener("keydown",humanPaddleHandle);
        ball.drawBall();
        const animate=()=>{
            Canvas.drawCanvas();

           Canvas.drawMiddlelines() ;
           Canvas.drawText();
           ball.drawBall();
            ball.moveBall();
            humanPaddle.drawHumanPaddle();
            comPaddle.moveComPaddle();
            comPaddle.drawComPaddle(); 
            ball.collisionWithPaddlesTracking();
            const resultFromBallCollisionTracking=ball.wallCollisionTracking();
            const animateHandler=requestAnimationFrame(animate);
            if(resultFromBallCollisionTracking==1){
            cancelAnimationFrame(animateHandler);
                
              
            }
            
           if(resultFromBallCollisionTracking==1 ){
               if(ball.noOfServes<=6){

                   ball.noOfServes++;
               }
               else{
                   ball.xspeed=Math.abs(ball.xspeed)+0.25;
                   ball.yspeed=Math.abs(ball.yspeed)+0.25;
                   ball.noOfServes=0;
                   Canvas.round++;
                   console.log(ball.xspeed);
                   console.log(ball.yspeed);
               }
               
               resetValues();
           }
     
        }
        
       setTimeout(animate,2000) ;
    }
    const humanPaddleHandle=(e)=>{
        humanPaddle.moveHumanPaddle(e.key);
    }
    setup();
    function resetValues(){ 
    ball.setBallRandomPosition();
    ball.x=Canvas.x+(Canvas.width-2*ball.r)/2;
    setTimeout(setup,1000);
if(Canvas.round>4){
    Canvas.endText();
        Canvas.round=1;
        humanPaddle.score=0;
        comPaddle.score=0;
        ball.xspeed=2;
        ball.yspeed=2;
    }
        }
body=document.querySelector("body");
    const button=document.createElement("button");
    button.setAttribute("class","btn");
    body.appendChild(button);
    button.innerText="pause"
    console.log(button);
    var  xtemp=ball.xspeed;
      var ytemp=ball.yspeed;
    button.addEventListener("click",()=>{
      
        console.log(xtemp);
        console.log(ytemp);
        
        button.classList.toggle("pause");
       
        if(button.innerText=="pause")
        {
            button.innerText="play";
            ball.xspeed=0;
            ball.yspeed=0; 
        }
        else{
            button.innerText="pause";
            ball.xspeed=xtemp;
            ball.yspeed=ytemp; 
        }

    })
