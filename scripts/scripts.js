$(function(){
    $('.link .btn').hover(function(){
        var title = $(this).attr('data');
        $('.tip em').text(title);
        var pos=$(this).position().left+10;
       // alert(pos);
        var dis=($('.tip').outerWidth()-$(this).outerWidth())/2;
        //alert(dis);
        var l=pos-dis;
        //alert(l);
        $('.tip').css({'left':l+'px'}).animate({'top':145,'opacity':1},500);
    },function(){
       if(!$('.tip').is(':animated')){ $('.tip').animate({'top':100,'opacity':0},500);}
    })
})