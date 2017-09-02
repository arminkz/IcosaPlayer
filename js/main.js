var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

var dtitle = document.getElementsByClassName("desc-title")[0];
var dtext = document.getElementsByClassName("desc-text")[0];

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dotblock");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  

  console.log("SLIDE !");
  console.log(slides[slideIndex-1].getElementsByClassName("slide-text")[0].innerHTML);
  
  dtitle.innerHTML = slides[slideIndex-1].getElementsByClassName("slide-title")[0].innerHTML;
  dtext.innerHTML = slides[slideIndex-1].getElementsByClassName("slide-text")[0].innerHTML;
}

function showProfile(){
    $("#main-menu").fadeOut( {queue: false, duration: 600 });
	$(".lyrics-area").fadeOut(300)
    $(".profile").delay(600).fadeIn(600);
    $(".profile-text").typed({
        strings: ["^1500 <h1>Hi ! ^500, Im Armin Kazemi.</h1> ^500 <br> ^400 <br>im 20 years old ^1000 and studying Computer Engineering ^500 at Amirkabir University of Technology. ^1000<br><br>Im a Full-time Geek! ^500 and Im Interested in Desktop ^300 / Mobile ^300 / Web App ^300 Development ^1000 i also have an interest in IoT and Robotics. ^1000 <br><br>I love computers ^300 , listening to music ^300, traveling ^300 and games a lot ^300:^300D^300  "],
        typeSpeed: 20
    });
}

function showProjects(){
    $("#main-menu").fadeOut( {queue: false, duration: 600 });
	$(".lyrics-area").fadeOut(300);
    $(".projects").delay(600).fadeIn(600);
	showSlides(1);
}

function back(){
    $(".profile").fadeOut(600);
    $("#main-menu").delay(600).fadeIn({queue: false, duration: 600 });
	$(".lyrics-area").delay(600).fadeIn(600);
}

function back2(){
    $(".projects").fadeOut(600);
    $("#main-menu").delay(600).fadeIn({queue: false, duration: 600 });
	$(".lyrics-area").delay(600).fadeIn(600);
}

var playIndex = 0;

var music = [{name:"Saeed",artist:"Infected Mushrooms",url:'saeed.mp3',lrc:'saeed.lrc'},
             {name:"Open",artist:"Yellow Claw",url:'open.mp3',lrc:'open.lrc'},
			 {name:"Whatever it takes",artist:"Imagine Dragons",url:'weit.mp3',lrc:'weit.lrc'}];

var audio;
var audioContext;
var audioAnalyser;
var audioSource;
var audioFrequency;
var audioRequest;


function makeFullscreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
       (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {  
          document.documentElement.requestFullScreen();  
        } else if (document.documentElement.mozRequestFullScreen) {  
          document.documentElement.mozRequestFullScreen();  
        } else if (document.documentElement.webkitRequestFullScreen) {  
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
        }  
    } else {  
        if (document.cancelFullScreen) {  
          document.cancelFullScreen();  
        } else if (document.mozCancelFullScreen) {  
          document.mozCancelFullScreen();  
        } else if (document.webkitCancelFullScreen) {  
          document.webkitCancelFullScreen();  
        }  
    }
}


function toggleAudio() {
    if(audio.paused){
        audio.play();
        $(".music-btn-icon-pause").attr("display","inline-block");
        $(".music-btn-icon-play").attr("display","none");

    }else{
        audio.pause();
        $(".music-btn-icon-pause").attr("display","none");
        $(".music-btn-icon-play").attr("display","inline-block");
    }
}

function nextAudio(){
    playIndex = (playIndex + 1) % music.length;
    audio.pause();
    newAudio(playIndex);
}

function prevAudio(){
    if(playIndex==0){
        playIndex = music.length - 1;
    }else{
        playIndex = (playIndex - 1)
    }
    audio.pause();
    newAudio(playIndex);
}

var subtitles = [];
var upcomingSubtitle;
var currSubtitle = "";
var subIndex = 0;

function newAudio(index){
    audio = new Audio(music[index].url);
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioSource = audioContext.createMediaElementSource(audio);
    audioSource.connect(audioContext.destination);
    audioAnalyser = audioContext.createAnalyser();
    audioSource.connect(audioAnalyser);
    audio.addEventListener('ended', function () {nextAudio();});
	audio.addEventListener('timeupdate', function() {timeUpdated();});
	
	subtitles = [];
	subIndex = 0;
	$('#subtext').html("");
	jQuery.get(music[index].lrc,function(data){
		loadLRC(data);
		upcomingSubtitle = subtitles[subIndex];
	});
	
    audio.play();

    $(".music-title").html(music[index].name);
    $(".music-user").html(music[index].artist);
}

function strip(s) {
	return s.replace(/^\s+|\s+$/g,"");
}

function loadLRC(data) {
	var lrc = data.replace(/\r\n|\r|\n/g, '\n');
	lrc = strip(lrc);
	
	var lines = lrc.split('\n');
	
	for(i=0;i<lines.length;i++) {
		
		line = lines[i];
		
		bs = line.indexOf('[');
		be = line.indexOf(']');
		
		time = line.substr(bs+1,be-bs-1);
		text = line.substr(be+1);
		
		sub_obj = {};
		sub_obj.time = time;
		sub_obj.text = text;
		
		subtitles.push(sub_obj);
	}
	
	console.log("LRC Loaded");
	console.log(subtitles);
}

function timeUpdated() {
	var t = audio.currentTime;
	var subt = upcomingSubtitle.time.split(':');
	var submin = parseInt(subt[0]);
	var subsec = parseFloat(subt[1]);
	var subTime = submin * 60 + subsec;
	
	if(t + 0.2 >= subTime){
		currSubtitle = upcomingSubtitle.text;
		subIndex++;
		upcomingSubtitle = subtitles[subIndex];
		$('#subtext').animate({'opacity': 0}, 200, function(){
			$(this).html(currSubtitle).animate({'opacity': 1}, 200);
		});

	}
	
}

$(".music-btn-icon-play").attr("display","none");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$('#mobile-alert').show();
}else{
	newAudio(playIndex);
}

var PI = 3.14159265;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var container = document.getElementById( "webglhost" );

var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75,aspect,0.1,1000);
var renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true , alpha: true });
var composer = null;
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.IcosahedronGeometry();
var material = new THREE.MeshPhongMaterial({color: 0xFFEEEE, wireframe: true});


var frequencyData = new Uint8Array(audioAnalyser.frequencyBinCount);

var shapes = [];

function addShape(x,y,rx,ry,rz,freq,m){
    var s = new THREE.Mesh(geometry,material);
    s.position.x = x;
    s.position.y = y;
    if(m==0) s.rx = rx / 2;
    else s.rx = 0;
    if(m==1) s.ry = ry / 2;
    else s.ry = 0;
    if(m==2) s.rz = rz / 2;
    else s.rz = 0;
    s.freq = freq;
    shapes.push(s);
    scene.add(s);
}

function initShapes(){
    for(deg=0;deg<360;deg+=144){
        var r = getRandomInt(100,300) / 100;
        var x = r * Math.cos(deg*Math.PI/180);
        var y = r * Math.sin(deg*Math.PI/180);
        addShape(x,y,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(10,500),getRandomInt(0,2));
    }

    for(deg=36;deg<396;deg+=72){
        var r = getRandomInt(300,500) / 100;
        var x = r * Math.cos(deg*Math.PI/180);
        var y = r * Math.sin(deg*Math.PI/180);
        addShape(x,y,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(10,500),getRandomInt(0,2));
    }

    for(deg=0;deg<360;deg+=72){
        var r = getRandomInt(500,700) / 100;
        var x = r * Math.cos(deg*Math.PI/180);
        var y = r * Math.sin(deg*Math.PI/180);
        addShape(x,y,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(10,500),getRandomInt(0,2));
    }

    for(deg=36;deg<396;deg+=36){
        var r = getRandomInt(700,900) / 100;
        var x = r * Math.cos(deg*Math.PI/180);
        var y = r * Math.sin(deg*Math.PI/180);
        addShape(x,y,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(0,360)/360,getRandomInt(10,500),getRandomInt(0,2));
    }
}

function createLight() {
    const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1);
    const lightTwo = new THREE.DirectionalLight(0xFFFFFF, 1);

    lightOne.position.set(1, 1, 1);
    lightTwo.position.set(-1, -1, 1);

    scene.add(lightOne);
    scene.add(lightTwo);
}

function createEvents() {
    $(window).resize(function(){
        resizeScene();
    });
}

function resizeScene() {
    console.log("RESIZED !");
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

function createShaders() {
    composer = new THREE.EffectComposer(this.renderer);

    var effect = new THREE.ShaderPass(THREE.RGBShiftShader)
    effect.uniforms.amount.value = 0.005
    effect.renderToScreen = true

    composer.addPass(new THREE.RenderPass(this.scene, this.camera))
    composer.addPass(effect)

    renderer.render(this.scene, this.camera)
}

function rotateShape(item){
    var f = frequencyData[item.freq] / 200 + 0.01 ;
    //console.log(f);
    item.rotation.x += item.rx / 10;
    item.rotation.y += item.ry / 10;
    item.rotation.z += item.rz / 10;
    item.scale.set(f,f,f);
}

camera.position.z = 5;
createLight();
createShaders();
createEvents();
initShapes();

var render = function () {
    audioAnalyser.getByteFrequencyData(frequencyData);

    shapes.forEach(rotateShape);
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.01);

    renderer.render(scene,camera);
    composer.render();

    requestAnimationFrame(render);
}

render();