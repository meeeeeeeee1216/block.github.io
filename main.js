// ブロック配置

var block_parent = document.getElementById("blocks");

for (let index = 0; index < 19; index++) {
    const child = document.createElement("div");
    block_parent.appendChild(child); 
    child.classList.add("block")
}
var blocks = document.getElementsByClassName("block");
for (let index = 0; index < blocks.length; index++) {
    const element = blocks[index];
    element.style.left = 0 + index * 80 + "px";
}

// barイベント
var bar = document.getElementById("bar");
var field = document.getElementById("field");
document.addEventListener("keydown", function(e){
    const step = 30;
    
    // console.log(bar.style.left);

    if(e.key == "ArrowLeft"){
        if(parseInt(window.getComputedStyle(bar).left) > 0){
            bar.style.left = parseInt(window.getComputedStyle(bar).left) -  step + "px";
        }
    }else if(e.key == "ArrowRight"){
        if(parseInt(window.getComputedStyle(bar).left) < parseInt(window.getComputedStyle(field).width) - parseInt(window.getComputedStyle(bar).width))
        bar.style.left =parseInt(window.getComputedStyle(bar).left) + step + "px";
    }
})

// ball animation
var ball = document.getElementById("ball");
var Ball = {
    tag: document.getElementById("ball"),
    vy: 0,
    vx: 0,
    x: parseInt(window.getComputedStyle(ball).left),
    y: parseInt(window.getComputedStyle(ball).top),
    width:parseInt(window.getComputedStyle(ball).width),
    height:parseInt(window.getComputedStyle(ball).height)
}


moveBall = function(){

    //ゲームスタート待機
    const gamewait = document.getElementById("gamewait");
    

    document.addEventListener("keydown", function(e){
    if(e.key == "SPACE"){
       gamewait.style.display = this.nodeName;
           Ball.vy = 20;
           Ball.vx = 10;
    }
    })

    Ball.y += Ball.vy;
    Ball.x += Ball.vx;

    
    ball.style.left = Ball.x + "px";
    ball.style.top = Ball.y + "px";

    ball_under = Ball.y + parseInt(window.getComputedStyle(ball).height);

    const Bar = {
        x: parseInt(window.getComputedStyle(bar).left),
        y: parseInt(window.getComputedStyle(bar).top),
        width: parseInt(window.getComputedStyle(bar).width),
        height: parseInt(window.getComputedStyle(bar).height)
    }

    // bar 跳ね返り
    if(ball_under >= Bar.y){
        if(Ball.x >= Bar.x && Ball.x + Ball.width <= Bar.x + Bar.width){
            Ball.vy = -Ball.vy;
        }else{
            const gameover = document.getElementById("gameover");
            gameover.style.display = "inline flex"
            window.clearInterval(roop);
        }
    };
    // 横の壁跳ね返り
    // console.log(parseInt(window.getComputedStyle(field).left));
    if(Ball.x <= parseInt(window.getComputedStyle(field).left)){
        Ball.vx = -1/2 * Ball.vx;
    }
    console.log(parseInt(window.getComputedStyle(field).width))
    if(Ball.x >= parseInt(window.getComputedStyle(field).width)){
        Ball.vx = -1/2 * Ball.vx;
    }
    // 上下壁判定
    if(Ball.y <= 0){
        Ball.vy = -Ball.vy;
    }

    // ブロック判定
    for (let index = 0; index < blocks.length; index++) {
        const block ={
            tar: blocks[index],
            x: parseInt(window.getComputedStyle(blocks[index]).left),
            y: parseInt(window.getComputedStyle(blocks[index]).top),
            width: parseInt(window.getComputedStyle(blocks[index]).width),
            height: parseInt(window.getComputedStyle(blocks[index]).height),
        }

        const ball_center_x = Ball.x + Ball.width/2;
        const ball_center_y = Ball.y + Ball.height/2;

        if(ball_center_x > block.x && ball_center_x < block.x + block.width
             && ball_center_y < block.y + block.height && ball_center_y > block.y){
                block.tar.style.display = "none";
        }
    }

    // クリア判定
    var block_counter = 0;
    for (let index = 0; index < blocks.length; index++) {
        if(blocks[index].style.display == "none"){
            block_counter ++;
        }
    }
    if(block_counter == blocks.length){
        const gameover = document.getElementById("gameclear");
        gameover.style.display = "inline flex"
        window.clearInterval(roop);

    }
}


roop = window.setInterval(moveBall,50);