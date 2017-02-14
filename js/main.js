function showProfile(){
    $("#main-menu").fadeOut(1000);
    $(".profile").delay(1000).fadeIn(1000);
    $(".profile-text").typed({
        strings: ["^1500 <h1>Hi ! ^500, Im Armin Kazemi.</h1> ^500 <br> ^400 <br>im 19 years old ^1000 and studying Computer Engineering ^500 in Amirkabir University of Technology. ^1000<br><br>Im a Full-time Geek! ^500 and Im Interested in Desktop ^300 / Mobile ^300 / Web App ^300 Development ^1000 i also have an interest in IoT and Robotics. ^1000 <br><br>I love computers ^300 , listening to music ^300, traveling ^300 and games a lot ^300:^300D^300  "],
        typeSpeed: 20
    });
}

function showProjects(){
    $("#main-menu").fadeOut(1000);
    $(".projects").delay(1000).fadeIn(1000);
}

function back(){
    $(".profile").fadeOut(1000);
    $("#main-menu").delay(1000).fadeIn(1000);
}

function back2(){
    $(".projects").fadeOut(1000);
    $("#main-menu").delay(1000).fadeIn(1000);
}

var playIndex = 0;

var music = [{name:"Sugar Rush",artist:"PIXL",url:'http://4kp.ir/music/05.mp3'},
             {name:"This is What it Feels Like",artist:"Armin Van Buuren",url:'http://4kp.ir/music/01.mp3'},    
             {name:"Savage",artist:"Case & Point",url:'http://4kp.ir/music/02.mp3'},
             {name:"Thunder",artist:"W&W",url:'http://4kp.ir/music/03.mp3'},
             {name:"Surface",artist:"Aero Chord",url:'http://4kp.ir/music/04.mp3'}];


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

function newAudio(index){
    audio = new Audio(music[index].url);
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioSource = audioContext.createMediaElementSource(audio);
    audioSource.connect(audioContext.destination);
    audioAnalyser = audioContext.createAnalyser();
    audioSource.connect(audioAnalyser);
    audio.addEventListener('ended', function () {nextAudio();});
    audio.play();

    $(".music-title").html(music[index].name);
    $(".music-user").html(music[index].artist);
}

$(".music-btn-icon-play").attr("display","none");
newAudio(playIndex);

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