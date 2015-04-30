// JavaScript Document
var timeouts=[];
var mvAnimation='false';
var curJob;
var allLang=Array(Array("eng",'Enghlish'),Array('trad','繁體'),Array('simp','简体'));
var curLang='eng';
var navJson;
var mvJson;
var solutionJson;
var mobileAppsJson;
var gamesJson;
var contactUsJson;
var careersJson;
var totalJobs=12;
var curLoadJob=1;
//=====================================================================================
$(function(){
	//----------------------------------------------
	vacancyHeader();
	loadNav_fun();
	loadMv_fun();
	loadSolution_fun();
	//createLang_fun();
	loadMobileApps_fun();
	loadGames_fun();
	loadContactUs_fun();
	loadCareersHeadline_fun();
	loadCareers_fun();
	setLang_fun();
	//--------------------------------------------
	$(".homeMv img").load(function(){
		var mvHeight=$(".eachMv").height();
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
}
//---------------------------------------------------
function vacancyHeader(){
	$(".allVacancy").on("click","h1",function(){
		var myIndex=$(this).parent().index();
		vacancyCloseAll();
		if(curJob!=myIndex){
			$(this).next(".jobVacancy").slideDown()
		}
	});
	$(".allVacancy h1").hover(function(){$(this).addClass("vacancyHeader")},function(){$(this).removeClass("vacancyHeader")});
	//$(".jobVacancy").eq(0).slideDown();
}
//-------------------------------------------------
function vacancyCloseAll(){
	$(".jobVacancy").each(
			function(){
				var myDisplay=$(this).css("display");
				if(myDisplay=='block'){
					curJob=$(this).parent().index();
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
//-------------------------------------------------
function loadNav_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/nav.json",
		"cache":"false",
		"success":function(returnData){
						navJson=returnData;
						$(".topNav ul").append(navJson[curLang]);
					}
		})
}
//-----------------------------------------------
function setLang_fun(){
	$(".lang").on("click","span",function(){
					var newLang=$(this).data("mylang");
					$(".langBtn").each(
										function(){
													var myLang=$(this).data("mylang");
													if(myLang==newLang){
														$(this).addClass("langBtnOver");
													}else{
														if($(this).hasClass("langBtnOver")){
															$(this).removeClass("langBtnOver");
														}
													}
													
												}
										)
					changeImgLang_fun(newLang);
					curLang=newLang;
					changeNavLang_fun();
					changeMvLang_fun();
					changeSolutionLang_fun();
					changeMobileAppsLang_fun();
					changeGamesLang_fun();
					changeContactUsLang_fun();
					changeCareersHeadlineLang_fun();
				})
}
//-----------------------------------------------
function findLangText_fun(lang){
	for (var i=0; i<allLang.length;i++){
		var langVar=allLang[i][0];
		if (langVar==lang){
			return(allLang[i][1])
		}
	}
}
//-----------------------------------------------
function findLangVar_fun(lang){
	for (var i=0; i<allLang.length;i++){
		var langVar=allLang[i][1];
		if (langVar==lang){
			return(allLang[i][0])
		}
	}
}
//--------------------------------------------
function changeImgLang_fun(langVar){
	$(".langImg").each(
		function(){
			var mySrc=$(this).attr("src");
			var newSrc=mySrc.replace(curLang,langVar);
			$(this).attr("src",newSrc);
		}
	)
}
//-------------------------------------------
function changeNavLang_fun(){
	$("#bs-example-navbar-collapse-1 .nav").empty().append(navJson[curLang]);
}
//============================================
function loadMv_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/mv.json",
		"cache":"false",
		"success":function(returnData){
						mvJson=returnData;
						for(var i=0; i<4;i++){
							$(".mvText").eq(i).append(mvJson["mv"+i][curLang]);
						}
					}
		})
}
//-------------------------------------------
function changeMvLang_fun(){
	for(var i=0; i<4;i++){
		$(".mvText").eq(i).empty().append(mvJson["mv"+i][curLang]);
	}
}
//============================================
function loadSolution_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/solutions.json",
		"cache":"false",
		"success":function(returnData){
						solutionJson=returnData;
						$("#solutions").find(".headline").html(solutionJson.headline[curLang]);
						for(var i=0; i<4;i++){
							$(".solutionIcon").eq(i).append(solutionJson["icon"+i][curLang]);
						}
					}
		})
}
//-------------------------------------------
function changeSolutionLang_fun(){
	$("#solutions").find(".headline").html(solutionJson.headline[curLang]);
	for(var i=0; i<4;i++){
		$(".solutionIcon").eq(i).empty().append(solutionJson["icon"+i][curLang]);
	}
}
//============================================
function loadMobileApps_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/mobileApp.json",
		"cache":"false",
		"success":function(returnData){
						mobileAppsJson=returnData;
						$("#products").find(".headline").html(mobileAppsJson.headline[curLang]);
						for(var i=0; i<10;i++){
							$("#products .media-heading").eq(i).append(mobileAppsJson["icon"+i][curLang]);
						}
					}
		})
}
//-------------------------------------------
function changeMobileAppsLang_fun(){
	$("#products").find(".headline").html(mobileAppsJson.headline[curLang]);
	for(var i=0; i<10;i++){
		$("#products .media-heading").eq(i).empty().append(mobileAppsJson["icon"+i][curLang]);
	}
}
//============================================
function loadGames_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/games.json",
		"cache":"false",
		"success":function(returnData){
						gamesJson=returnData;
						$("#services").find(".headline").html(gamesJson.headline[curLang]);
					}
		})
}
//-------------------------------------------
function changeGamesLang_fun(){
	$("#services").find(".headline").html(gamesJson.headline[curLang]);
}
//============================================
function loadContactUs_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/contactUs.json",
		"cache":"false",
		"success":function(returnData){
						contactUsJson=returnData;
						$("#contact").find(".headline").html(contactUsJson.headline[curLang]);
						for(var i=0; i<3;i++){
							$("#contact .media-heading").eq(i).append(contactUsJson["icon"+i][curLang]);
						}
					}
		})
}
//-------------------------------------------
function changeContactUsLang_fun(){
	$("#contact").find(".headline").html(contactUsJson.headline[curLang]);
	for(var i=0; i<3;i++){
		$("#contact .media-heading").eq(i).empty().append(contactUsJson["icon"+i][curLang]);
	}
}
//============================================
function loadCareersHeadline_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/careers.json",
		"cache":"false",
		"success":function(returnData){
						careersJson=returnData;
						$("#services").find(".headline").html(careersJson.headline[curLang]);
					}
		})
}
//-------------------------------------------
function changeGamesLang_fun(){
	$("#services").find(".headline").html(gamesJson.headline[curLang]);
}
//============================================
function loadCareersHeadline_fun(){
	$.ajax({
		"type":"get",
		"dataType":"json",
		"url":"loadTxt/careers.json",
		"cache":"false",
		"success":function(returnData){
						careersJson=returnData;
						$("#careers").find(".headline").html(careersJson.headline[curLang]);
					}
		})
}
//-------------------------------------------
function changeCareersHeadlineLang_fun(){
	$("#careers").find(".headline").html(careersJson.headline[curLang]);
}
//============================================
function loadAllCareers_fun(){
	for(var i=1; i<13 ;i++){
		loadCareers_fun(i)
	}
}
//-------------------------------------------
function loadCareers_fun(){
	$.ajax({
		"type":"get",
		"dataType":"text",
		"url":"loadTxt/job"+curLoadJob+"_"+curLang+".html",
		"cache":"false",
		"success":function(returnData){
						var returnCareers_array=returnData.split("<content>");
						$(".careersList")
						.append(
							$("<li>")
							.append($("<h1>").html(returnCareers_array[0]))
							.append(
								$("<div>")
								.addClass("jobVacancy")
								.html(returnCareers_array[1])
							)
						)
						curLoadJob++;
						if (curLoadJob<=totalJobs){
							loadCareers_fun();
						}
					}
		})
}