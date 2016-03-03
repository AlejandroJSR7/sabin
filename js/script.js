var touchEvent = "touchstart";
touchEvent = "click"; 
curDir="";
var mapLocation = "images/content/maps/map-"
var mapLocationBase = mapLocation + "All.png"

var screenWidth, screenHeight, menuOpened = false, secMenuOpened = false, deviceType= "computer", curScroll = 0, sectionsPosArray = [], sectionsArray = [], secMenuArray = [], topVideoHeight=60, inVideo = false, countPosArray = [], countItemsArray = [], countDoneArray=[], barPosArray = [], barItemsArray = [], barDoneArray=[], pinPosArray = [], pinItemsArray = [], pinDoneArray=[], graphicDataPos, graphicDataLaunched = false, mapDataLaunched = false, pinsLaunched = false, pinsPos, allPins, lastSectionPos, ntdsOpen = false


//JQ
var main_nav, mainNav1, mainNav2, mainNav3, mainNav4, mainNav5, mainNav6, mainNav7, nextSectionBtn1, nextSectionBtn2, nextSectionBtn3, nextSectionBtn4, nextSectionBtn5, nextSectionBtn6, nextSectionBtn7, letterBtn, letterBox, letterClose, html, secMenu, closeVideo, videoContainer, videoContent, countItems, mapItems, mapItemContent, graphicData, graphicDataItems, dotOranges, mapData, pins, lastSection, secMenu8, secMenu1, section2, letterBg, videoBg, closeLetter, sectionimagebg, ntdsBtn, ntdsMenu, burguerIcon, curSecMenu
	

$(document).ready(function(e){
	detectMobile()
	
	createVars();
	setListeners();
	setScroll();
	resize();
});


function setScroll(){
	$(window).scroll(function(){
		locateScrolledItems();
	})
}


function locateScrolledItems(){
	curScroll = $(window).scrollTop()
	
	if(deviceType == "computer"){
		if(curScroll + main_nav.height() >= screenHeight ){
			main_nav.css({"position":"fixed", "bottom":"auto", "top":0});
		}else{
			main_nav.css({"position":"absolute", "bottom":"0", "top":"auto"});
		}
		
		
		for(var i=0;i<countItemsArray.length;i++){
			var pos = countPosArray[i];
			if(countDoneArray[i] == false){
				if(curScroll > pos + screenHeight){
					countDoneArray[i] = true;
					takeTo(countItemsArray[i]);
					countItemsArray.splice(i, 1);
					countDoneArray.splice(i, 1);
					countPosArray.splice(i, 1);
				}else if(curScroll > pos - screenHeight){
					countDoneArray[i] = true;
					var _speed = countItemsArray[i].data("speed");
					countTo(countItemsArray[i], _speed);
					countItemsArray.splice(i, 1);
					countDoneArray.splice(i, 1);
					countPosArray.splice(i, 1);
				}
			}
		}
		
		for(var i=0;i<barItemsArray.length;i++){
			var pos = barPosArray[i];
			if(barDoneArray[i] == false){
				if(curScroll > pos + screenHeight){
					barDoneArray[i] = true;
					barTo(barItemsArray[i], false);
					barItemsArray.splice(i, 1);
					barDoneArray.splice(i, 1);
					barPosArray.splice(i, 1);
				}else if(curScroll > pos - screenHeight){
					barDoneArray[i] = true;
					barTo(barItemsArray[i], true);
					barItemsArray.splice(i, 1);
					barDoneArray.splice(i, 1);
					barPosArray.splice(i, 1);
				}
			}
		}
		
		if(curScroll > graphicDataPos - 0.5*screenHeight){
			if(!graphicDataLaunched){
				launchGraphicData();
			}
		}
		
		if(curScroll > mapDataPos - 0.5*screenHeight){
			if(!mapDataLaunched){
				launchMapData();
			}
		}
		if(curScroll > pinsPos - 0.9*screenHeight){
			if(!pinsLaunched){
				launchPinsSmall();
			}
		}
		
	}
	
	
	secMenu.css("display", "none");
	
	curSecMenu = "";
	var oldPos = 0;
	
	for(var i=0;i<sectionsPosArray.length;i++){
		var obj = secMenuArray[i]
		var objHeight = 0
		if(obj != ""){
			objHeight = obj.height()
		}
		//var pos = sectionsPosArray[i] + objHeight;
		var pos = sectionsPosArray[i] + objHeight;
		
		if((curScroll < pos)&&(curScroll> oldPos)){
			curSecMenu = obj;
		}
		
		if(curSecMenu != ""){
			curSecMenu.css("display", "block");
		}
		
		if(0 == i){
			var offset2 = section2.offset()
			if(curScroll > offset2.top + secMenu1.height()){
				secMenu1.css({"opacity":1});
			}else{
				secMenu1.css({"opacity":0});
			}
		}
		if(sectionsPosArray.length - 1 == i){
			if(curScroll > lastSectionPos){
				secMenu8.css({"opacity":0});
			}else{
				secMenu8.css({"opacity":1});
			}
		}
		
		oldPos = pos
	}
	
}

window.onorientationchange = resize;

$(window).resize(function() {
	resize();
});



function launchPinsSmall(){
	pinsLaunched = true;
	
	allPins.each(function(index, element) {
		$(this).clearQueue().animate({"margin-top":10, "opacity":1}, 300 * (index+1))
    });
	
}

function launchMapData(){
	console.log("launching")
	mapDataLaunched = true;
	dotOranges.each(function(index, element) {
		var _random = randomNum()
		$(this).clearQueue().animate({"opacity":1, "margin-top":0}, _random)
    });
}

function randomNum(){
	var _random = (Math.floor(Math.random() * 2000) + 500 )
	return _random;
}

function launchGraphicData(){
	graphicDataLaunched = true;
	graphicDataItems.each(function(index, element) {
        var _height = $(this).data("content");
		$(this).clearQueue().animate({"height":_height}, 600)
    });
}


function barTo(_obj, _animate){
	var _width = _obj.data("content");
	if(_animate){
		_obj.clearQueue().animate({"width":_width}, 1000);
	}else{
		_obj.clearQueue().css({"width":_width});
	}
}

function takeTo(_obj){
	var _num = _obj.data("content");
	_obj.html(numberWithCommas(_num))
}


function countTo(_obj, _speed){
	var _num = _obj.data("content");
	var _curNum = 0;
	var interval = setInterval(function () {addToObj()}, 10);
	
	function addToObj(){
		_curNum+=_speed;
		if(_curNum>_num){
			_obj.html(numberWithCommas(_num))
			window.clearInterval(interval)
		}else{
			_obj.html(numberWithCommas(_curNum.toFixed(0)))
		}
	}
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function resize(){	
	screenWidth = $(window).width();
	screenHeight = $(window).height();
	
	closeMenu()
	closeNtds()
	closeSecMenu()
	
	
	for(var i=0;i<sectionsArray.length;i++){
		var offset = sectionsArray[i].offset()
		sectionsPosArray[i] = offset.top;
	}	
	for(var i=0;i<countItemsArray.length;i++){
		var offset = countItemsArray[i].offset()
		countPosArray[i] = offset.top;
	}
	
	for(var i=0;i<barItemsArray.length;i++){
		var offset = barItemsArray[i].offset()
		barPosArray[i] = offset.top;
	}
	
	var graphicDataOffset = graphicData.offset()
	graphicDataPos = graphicDataOffset.top;
	var mapDataOffset = mapData.offset()
	mapDataPos = mapDataOffset.top;
	var pinOffset = $("#pins").offset()
	pinsPos = pinOffset.top;
	
	var lastSectionOffset = lastSection.offset()
	lastSectionPos = lastSectionOffset.top - screenHeight;
	
	locateScrolledItems();
		
		
		
	if(deviceType != "computer"){
		main_nav.css({"position":"fixed", "bottom":"auto", "top":0});
	}
	videoContent.height(screenHeight);
	
}


function createVars(){
	sectionsArray.push($("#section2"));
	sectionsArray.push($("#section3"));
	sectionsArray.push($("#section4"));
	sectionsArray.push($("#section7"));
	sectionsArray.push($("#section8"));
	sectionsArray.push($("#section9"));
	sectionsArray.push($("#section14"));
	sectionsArray.push($("#section15"));
	sectionsArray.push($("#section16"));
	sectionsArray.push($("#section19"));
	sectionsArray.push($("#section20"));
	sectionsArray.push($("#section21"));
	sectionsArray.push($("#section22"));
	
	secMenuArray.push("");
	secMenu1 = $("#secMenu1")
	secMenuArray.push(secMenu1);
	secMenuArray.push($("#secMenu2"));
	secMenuArray.push($("#secMenu2"));
	secMenuArray.push($("#secMenu3"));
	secMenuArray.push($("#secMenu4"));
	secMenuArray.push($("#secMenu4"));
	secMenuArray.push($("#secMenu5"));
	secMenuArray.push($("#secMenu6"));
	secMenuArray.push($("#secMenu6"));
	secMenuArray.push($("#secMenu7"));
	secMenu8 = $("#secMenu8")
	secMenuArray.push(secMenu8);
	secMenuArray.push(secMenu8);
	
	section2 = $("#section2")
	lastSection = $("#section22");
	letterBg= $("#letterBg");
	
	
	html = $("html, body");
	burguerIcon = $("#burguerIcon");
	
	
	main_nav = $("#main-nav");
	
	mainNav1 = $("#mainNav1");
	mainNav2 = $("#mainNav2");
	mainNav3 = $("#mainNav3");
	mainNav4 = $("#mainNav4");
	mainNav5 = $("#mainNav5");
	mainNav6 = $("#mainNav6");
	mainNav7 = $("#mainNav7");
	
	nextSectionBtn1 = $("#nextSectionBtn1");
	nextSectionBtn2 = $("#nextSectionBtn2");
	nextSectionBtn3 = $("#nextSectionBtn3");
	nextSectionBtn4 = $("#nextSectionBtn4");
	nextSectionBtn5 = $("#nextSectionBtn5");
	nextSectionBtn6 = $("#nextSectionBtn6");
	nextSectionBtn7 = $("#nextSectionBtn7");
	
	letterBtn = $("#letterBtn");
	letterBox= $("#letterBox");
	letterClose= $("#letterClose");
	closeLetter= $("#closeLetter");
	
	secMenu = $(".secMenu");
	
	videoFrame = $("#videoFrame");
	closeVideo = $("#closeVideo");
	videoContainer = $("#videoContainer");
	videoContent = $("#videoContent");
	
	sectionimagebg = $(".section-image-bg") 
	
	
	countItems = $(".count");
	barItems = $(".dataBar");
	allPins = $(".pinObj");
	
	mapItem = $(".mapItem")
	
	mapItemContent = $("#mapItemContent");
	graphicData = $("#graphicData")
	graphicDataItems = $(".graphicDataItem")
	
	mapData = $("#mapData")
	dotOranges = $(".dot-orange")
	
	
	if(deviceType == "computer"){
		countItems.each(function(index, element) {
			$(this).html("0");
			countItemsArray[index] = $(this);
			countDoneArray[index] = false;
		});
		
		barItems.each(function(index, element) {
			$(this).css({"width":0});
			barItemsArray[index] = $(this);
			barDoneArray[index] = false;
		});
		
		allPins.css({"margin-top": -50, "opacity":0})
	
		graphicDataItems.height(0)
		dotOranges.css({"opacity": 0, "margin-top": -20});
	}
	
	ntdsBtn= $("#ntdsBtn")
	ntdsMenu= $("#ntdsMenu")
}

function closeNtds(){
	ntdsOpen = false;
	if(screenWidth < 800){
		ntdsMenu.css({"display":"none"});
	}else{
		ntdsMenu.css({"display":"block"});
	}
}
function openNtds(){
	ntdsOpen = true;
	ntdsMenu.css({"display":"block"});
}
function setListeners(){
	
	ntdsBtn.on(touchEvent, function(){
		if(ntdsOpen){
			closeNtds();
		}else{
			openNtds();
		}
	});
	
	burguerIcon.on(touchEvent, function(){
		if(menuOpened){
			closeMenu()
		}else{
			openMenu();
		}
	});
	
	secMenu.on(touchEvent, function(){
		if(secMenuOpened){
			closeSecMenu()
		}else{
			openSecMenu();
		}
	});
	
	if(deviceType == "computer"){
		sectionimagebg.css('background-attachment','fixed');
	}
	
	mapItem.hover(function(){
		var _img = $(this).data("content");
		mapItemContent.attr("src", mapLocation + _img + ".png");
	}, function(){
		mapItemContent.attr("src", mapLocationBase);
		
	});
	
	
	$("#video1").click(function(e){
		launchVideo('DBRy99-UAJY');
	});
	$("#video2").click(function(e){
		launchVideo('yKAUoDloZqM');
	});
	closeVideo.click(function(e){
		closeVideoFn();
	}); 
	letterBg.on(touchEvent, function(){
		closeLetterFn()
	});
	letterBtn.on(touchEvent, function(){
		openLetterFn();
	});
	letterClose.on(touchEvent, function(){
		closeLetterFn();
	});
	closeLetter.on(touchEvent, function(){
		letterBox.clearQueue().animate({"opacity":0}, 300, function(){$(this).css("display", "none");html.css({"overflow-y":"scroll"});});
	});
	
	mainNav1.on(touchEvent, function(){
		scrollToObject($("#section1"));
	});
	mainNav2.on(touchEvent, function(){
		scrollToObject($("#section3"));
	});
	mainNav3.on(touchEvent, function(){
		scrollToObject($("#section8"));
	});
	mainNav4.on(touchEvent, function(){
		scrollToObject($("#section15"));
	});
	mainNav5.on(touchEvent, function(){
		scrollToObject($("#section20"));
	});
	mainNav6.on(touchEvent, function(){
		scrollToObject($("#section22"));
	});
	mainNav7.on(touchEvent, function(){
		scrollToObject($("#section24"));
	});
	
	
	
	nextSectionBtn1.on(touchEvent, function(){
		scrollToObject($("#section2"));
	});
	nextSectionBtn2.on(touchEvent, function(){
		scrollToObject($("#section3"));
	});
	nextSectionBtn3.on(touchEvent, function(){
		scrollToObject($("#section4"));
	});
	nextSectionBtn4.on(touchEvent, function(){
		scrollToObject($("#section9"));
	});
	nextSectionBtn5.on(touchEvent, function(){
		scrollToObject($("#section16"));
	});
	nextSectionBtn6.on(touchEvent, function(){
		scrollToObject($("#section21"));
	});
	nextSectionBtn7.on(touchEvent, function(){
		scrollToObject($("#section23"));
	});
}


function launchVideo(videoID){
	html.css({"overflow-y":"hidden"});
	inVideo = true;
	videoContainer.clearQueue().css({"opacity":0, "display":"block"}).animate({"opacity":1}, 300, function(){addVideo(videoID)});
	closeVideo.animate({top:15, right:15}, 300);
}

function addVideo(videoID){
	if(deviceType == "computer"){
		videoContent.append('<div id="videoBg"></div><iframe id="videoFrame" src="http://www.youtube.com/embed/' + videoID + '?autoplay=1&amp;vq=hd480&amp;rel=0" frameborder="0"></iframe>');
	}else{
		videoContent.append('<div id="videoBg"></div><iframe id="videoFrame" src="http://www.youtube.com/embed/' + videoID + '?autoplay=1&amp;rel=0" frameborder="0"></iframe>');
	}
	
	videoBg= $("#videoBg");
	videoFrame = $("#videoFrame")
	videoBg.on(touchEvent, function(){
		closeVideoFn();
	});
}



function openLetterFn(){
	html.css({"overflow-y":"hidden"});
	letterBox.clearQueue().css("display", "block").animate({"opacity":1}, 500);
}
function closeLetterFn(){
	letterBox.clearQueue().animate({"opacity":0}, 300, function(){$(this).css("display", "none"); html.css({"overflow-y":"scroll"});});
}
function closeVideoFn(){
	if(inVideo){
		videoFrame.hide().html("");
	}
	videoContent.html("");
	inVideo = false;
	
	videoContainer.animate({"opacity":0}, 300, function(){$(this).css({"display":"none"});html.css({"overflow-y":"scroll"});});
	closeVideo.animate({top:-30, right:-30}, 300);
}

function closeMenu(){
	menuOpened = false;
	if(screenWidth < 800){
		main_nav.css({"height":40});
	}else{
		main_nav.css({"height":50});
	}
}
function openMenu(){
	menuOpened = true;
	main_nav.css({"height":390});
}

function closeSecMenu(){
	secMenuOpened = false;
	if(screenWidth < 800){
		secMenu.css({"left":-280});
	}else{
		secMenu.css({"left":30});
	}
}
function openSecMenu(){
	secMenuOpened = true;
	secMenu.css({"left":0});
}


//_____ helpers



function animateScroll(_value, _time, _container){
	_time = typeof _time !== 'undefined' ? _time : 500;
	_container = typeof _container !== 'undefined' ? _container : $("html, body");
	
	_container.animate({ scrollTop: _value }, _time);
}

function scrollToObjectByName(_name){
	scrollToObject($("#" + _name))
}
function scrollToObject(_object, _container){
	closeMenu()
	closeSecMenu()
	var offset = _object.offset()
	animateScroll(offset.top - main_nav.height());
}


// Slider Logos

$("#partners-logos__list").slick({
	infinite: !0,
	autoplay: true,
	cssEase: 'linear',
	autoplaySpeed: 750,
	slidesToShow: 1,
	centerMode: true,
	variableWidth: !0
});



function detectMobile(){
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
		isMobile = true;
		deviceType = "phone";
		touchEvent = "touchstart"
	}
	
	deviceType = "phone";
		
	console.log("deviceType")
	console.log(deviceType)
}