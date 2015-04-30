// JavaScript Document
var timeouts=[];
var mvAnimation='false';
$(function(){
	$(".homeMv img").load(function(){
		var mvHeight=$(".eachMv");
		$(".homeMv").height(mvHeight);
	})
	$(".eachMv").css("left",3000);
	$($(".eachMv").eq(0)).css("left",0);
	var mvHeight=$(".eachMv").height();
	var totalMv=$(".homeMv img").length;
	var windowWidth=$(window).width();
	$(".eachMv")
	.width(windowWidth);
	$(".homeMv")
	.width(windowWidth)
	//.height(mvHeight)
	.data({
			"curMv":0,
			"totalMv":totalMv,
			"ratio":1024/466
			});
	$(window).resize(function(){
			var mvHeight=$(".eachMv").height();
			var windowWidth=$(window).width();
			$(".homeMv").height(mvHeight).width(windowWidth);
			$(".eachMv")	.width(windowWidth);
		})
	timeouts.push=setTimeout(changeMv,6000);
	//----------------------------------------------
	for(var i=0; i<totalMv;i++){
		$("<i>")
		.addClass("fa fa-circle-o fa-2x")
		.bind("click",mvNavClick)
		.appendTo($(".mvNav"));
	}
	$($(".mvNav i").eq(0)).removeClass("fa-circle-o").addClass("fa-circle");
	//----------------------------------------------
	vacancyHeader();
})
//--------------------------------------------------
function mvNavClick(){
	clearAllTimeOut();
	var myIndex=$(this).	index();											
	jumpMv(myIndex);						
}
//---------------------------------------------------
function clearAllTimeOut(){
	for(var i = 0, z = timeouts.length; i < z; i++){
     	clearTimeout(timeouts[i]);
   		timeouts = [];
	}
}
//-------------------------------------------------
function jumpMv(nextMv){
	clearAllTimeOut();
	var curMv=parseInt($(".homeMv").data("curMv"));
	var curMvImg=$($(".homeMv .eachMv").eq(curMv));
	var nextMvImg=$($(".homeMv .eachMv").eq(nextMv));
	$(".homeMv")
	.queue("mvMove",function(){
								mvAnimation='true';
								curMvImg.css("left",0).animate({
											left:(curMvImg.width())*-1
											}
											,1000
											,function(){
												clearAllTimeOut();
												$(this).css("left",3000);
											}
										);
								nextMvImg.css("left",$(window).width()).animate({
											left:0}
											,1000
											,function(){
												mvAnimation='false';
												if($(".homeMv").queue("mvMove").length<=0){
													timeouts.push=setTimeout(changeMv,6000);
												}else{
													$(".homeMv").dequeue("mvMove");
												}
												});
								
							}
				)
	if(mvAnimation=='false'){
		$(".homeMv").dequeue("mvMove");
	} 
	$(".homeMv").data("curMv",nextMv);
	$($(".mvNav i").eq(curMv)).removeClass("fa-circle").addClass("fa-circle-o").bind("click",mvNavClick);
	$($(".mvNav i").eq(nextMv)).removeClass("fa-circle-o").addClass("fa-circle").unbind("click");
}
//-------------------------------------------------
function changeMv(){
	clearAllTimeOut();
	var curMv=parseInt($(".homeMv").data("curMv"));
	var totalMv=parseInt($(".homeMv").data("totalMv"));
	var nextMv=(curMv+1)%totalMv;
	jumpMv(nextMv);
	/*$(".homeMv").data("curMv",nextMv);
	var curMvImg=$($(".homeMv .eachMv").eq(curMv));
	var nextMvImg=$($(".homeMv .eachMv").eq(nextMv));
	$(".homeMv")
	.queue("mvMove",function(){
								mvAnimation='true';
								curMvImg.css("left",0).animate({
											left:(curMvImg.width())*-1
											}
											,1000
											,function(){
												clearAllTimeOut();
												$(this).css("left",3000);
											}
										);
								nextMvImg.css("left",$(window).width()).animate({
											left:0}
											,1000
											,function(){
												mvAnimation='false';
												if($(".homeMv").queue("mvMove").length<=0){
													timeouts.push=setTimeout(changeMv,6000);
												}else{
													$(".homeMv").dequeue("mvMove");
												}
												});
								
								
							}
				)
			
	if(mvAnimation=='false'){
		$(".homeMv").dequeue("mvMove");
	} 
	$($(".mvNav i").eq(curMv)).removeClass("fa-circle").addClass("fa-circle-o").bind("click",mvNavClick);
	$($(".mvNav i").eq(nextMv)).removeClass("fa-circle-o").addClass("fa-circle").unbind("click");*/
}
//---------------------------------------------------
function vacancyHeader(){
	$(".allVacancy").on("click","h1",function(){
		vacancyCloseAll();
		$(this).next(".jobVacancy").slideDown();
		});
	$(".allVacancy h1").hover(function(){$(this).addClass("vacancyHeader")},function(){$(this).removeClass("vacancyHeader")})
}
//-------------------------------------------------
function vacancyCloseAll(){
	$(".jobVacancy").each(
			function(){
				var myDisplay=$(this).css("display");
				if(myDisplay=='block'){
					$(this).slideUp();
				}
			}
		)
}
//-------------------------------------------------
function sendEmail_fun(jobVacancy){
	if (jobVavancy=='hr'){
		
	}
}
