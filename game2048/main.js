/**
 * Created by Administrator on 2015/3/24.
 */
var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});

function newgame(){
    //初始化棋盘
    init();
    //随机出两个数字
    genrateOneNum();
    genrateOneNum();

    score = 0;
    $("#score").text(score);
}

function init() {
    for(var i=0;i < 4 ;i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    for(var i = 0;i<4;i++){
        board[i] = new Array();
        for(var j = 0;j < 4; j++)
            board[i][j]=0;
    }
    updateBoardView();
}

function updateBoardView(){
    $(".num-cell").remove();
    for(var i = 0;i < 4;i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-con").append('<div class="num-cell" id="num-cell-' + i + '-' + j + '"></div>');
            var thenumcell = $("#num-cell-" + i + "-" + j);
            if (board[i][j] == 0) {
                thenumcell.css('width', '0px');
                thenumcell.css('height', '0px');
                thenumcell.css('top', getPosTop(i, j));
                thenumcell.css('left', getPosLeft(i,j));
            }
            else {
                thenumcell.css('width', '100px');
                thenumcell.css('height','100px');
                thenumcell.css('top', getPosTop(i, j));
                thenumcell.css('left', getPosLeft(i, j));

                thenumcell.css('background-color', getNumColor(board[i][j]));
                thenumcell.css('color', getColor(board[i][j]));
                thenumcell.text(board[i][j]);
            }
        }
    }
}
function genrateOneNum(){
    //判断还能否生成数字
    if(nospace(board))
        return false;

    //随机的两个位置
    var randx = parseInt( Math.floor( Math.random()*4 ) );
    var randy = parseInt( Math.floor( Math.random()*4 ) );
     //判断位置能不能用
    while(true){
        if(board[randx][randy] == 0)
            break;
        randx = parseInt( Math.floor( Math.random()*4 ) );
        randy = parseInt( Math.floor( Math.random()*4 ) );
    }


    //随机的数字
    var randNum = Math.random()<0.5 ? 2:4;
    board[randx][randy] = randNum;//之后通知前端显示这个NUM

    showNumAnimation(randx,randy,randNum);
    //
    return true;
}
$(document).keydown(function (event){
    switch (event.keyCode){
        case 37://left
            if( moveLeft() ){//如果可以向左移，那么久添加一个新的数
                setTimeout("genrateOneNum()",210);
                setTimeout("isGameOver()",300);
                //每一次添加新的数都有可能造成gameOver

            }
            break;
        case 38://up
            if( moveUp ){
                setTimeout("genrateOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            if( moveRight() ){
                setTimeout("genrateOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            if( moveDown() ){
                setTimeout("genrateOneNum()",210);
                setTimeout("isGameOver()",300);
            }
            break;
    }
});
function isGameOver(){
    if(nospace( board ) && noMove( board ))
        gameOver();
}
function gameOver(){
    alert("game over!");
}
function moveLeft(){
    if( !canMoveLeft( board ) ){
        return false;
    }
    for(var i = 0; i < 4; i++)
       for(var j = 1 ; j < 4; j++ ){
           //向左移动需要几个步骤
           //1、只要当前的值不为零 则有可能向左移动 对它左侧的位置的元素进行考察 对于IK元素我们要考察是否为落脚点 1、ik= 0，ik-ij之间无无障碍物
           //判断有无障碍物 noBlock(i,k,j,board)
           //相等 且无障碍物
           if( board[i][j] != 0){
               for(var k = 0; k < j;k++){
                   if(board[i][k] == 0 && noLeftBlock(i,k,j,board ) ){
                       //move
                       showMoveAnimation(i,j,i,k);
                       board[i][k] = board[i][j];
                       board[i][j] = 0;
                       continue;
                   }
                   else if(board[i][k] == board[i][j] && noLeftBlock(i,k,j,board ))
                   {
                       //move
                       showMoveAnimation(i,j,i,k);
                       //adnumber
                       board[i][k] += board[i][j];
                       board[i][j] = 0;
                       //addscore
                       score +=board[i][k];
                       updateScore( score );
                       continue;
                   }
               }
           }
       }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveRight(){
    if( !canMoveRight(board) ){
        return false;
    }
    for(var i = 0; i < 4;i ++)
        for(var j = 2; j >= 0;j --)
            if(board[i][j] != 0){
                for(var k = 3 ; k > j; k--){
                    if(board[i][k] == 0 && noRightBlock(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noRightBlock(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j]=0;

                        score +=board[i][k];
                        updateScore( score );
                        continue;
                    }
                }
            }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){
    if( !canMoveUp( board ) ){
        return false;
    }
    for(var i = 1 ; i < 3 ; i++)
        for(var j = 0 ; j < 4 ; j++)
            if(board[i][j] != 0){
                for(var k = 0 ; k < i ; k++){
                    if(board[k][j] == 0 && noUpBlock(k,i,j,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;

                    }
                    else if(board[k][j] == board[i][j] && noUpBlock(k,i,j,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j]=0;

                        score +=board[k][j];
                        updateScore( score );
                        continue;
                    }
                }

            }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveDown(){
    if( !canMoveDown( board ) ){
        return false;
    }
    for( var i = 2 ; i >= 0 ; i-- )
        for( var j = 0 ; j < 4 ; j++ )
            if( board[i][j] != 0 ){
                for( var k = 3 ;k > i ; k-- ){
                    if(board[k][j] == 0 && noDownBlock(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noDownBlock(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j]=0;

                        score +=board[k][j];
                        updateScore( score );
                        continue;
                    }
                }
            }
    setTimeout("updateBoardView()",200);
    return true;
}