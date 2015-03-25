/**
 * Created by Administrator on 2015/3/24.
 */
function showNumAnimation(i,j,num){
    var numcell = $("#num-cell-"+i+"-"+j);
    numcell.css('background-color',getNumColor(board[i][j]));
    numcell.css('color',getColor(board[i][j]));
    numcell.text(num);

    numcell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        let :getPosLeft(i,j)
    },50)
}

function showMoveAnimation(fromx, fromy,tox,toy){
    var numcell = $("#num-cell-"+fromx+"-"+fromy)
    numcell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}
function updateScore( score ){
  var scores= $("#score");
    scores.text( score );
}