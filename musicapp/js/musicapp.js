const wrapper=document.querySelector(".wrapper");
const musicname=document.querySelector(".song-details .song-name");
const musicartist=document.querySelector(".song-details .artist");
const mainaudio=document.getElementById('main-audio');
const playpausebutton=document.querySelector(".play-pause");
const prevbutton=document.getElementById("prev");
const nextbutton=document.getElementById("next");
const progressarea=document.querySelector(".progress-area");
const progressbar=document.querySelector(".progress-bar");
const repeatbutton=document.getElementById('repeat-plist');
const musiclist=document.querySelector(".music-list");
const showmoremusicbutton=document.getElementById('more-music')
const closemusicbutton=document.getElementById('close');
const ultag=document.querySelector("ul");
const audioduration=document.querySelector(".audio-duration");


let musicindex = 1;

window.addEventListener("load",()=>{loadmusic(musicindex)});

function loadmusic(indexnum)
{
  musicname.innerText=allmusic[indexnum-1].name;
  musicartist.innerText=allmusic[indexnum-1].artist;
  mainaudio.src=`music/${allmusic[indexnum-1].src}.mp3`
}
function playmusic(){
  wrapper.classList.add("paused");
  playpausebutton.querySelector("i").innerText = "pause";
  mainaudio.play();
}

function pausemusic()
{
  wrapper.classList.remove("paused");
  playpausebutton.querySelector("i").innerText = "play_arrow";
  mainaudio.pause();
}

playpausebutton.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pausemusic() : playmusic();
});

function nextmusic()
{
  if (musicindex > allmusic.length) 
  {
    musicindex = 1;
  }
  musicindex++;
  loadmusic(musicindex)
  playmusic();
}

function prevmusic()
{

  musicindex--;
  if (musicindex < 1) 
  {
    musicindex = allmusic.length;
  }
  loadmusic(musicindex)
  playmusic();
}

prevbutton.addEventListener("click",()=>{prevmusic();});

nextbutton.addEventListener("click",()=>{nextmusic();});

mainaudio.onloadedmetadata = function() 
{
  progressbar.max = mainaudio.duration;
  durationDisplay.textContent = formatTime(mainaudio.duration);
};

mainaudio.onloadedmetadata = function() 
{
  progressbar.max = mainaudio.duration;
  durationDisplay.textContent = formatTime(mainaudio.duration);
};

progressbar.oninput = function() 
{
  mainaudio.currentTime = this.value;
};

mainaudio.ontimeupdate = function() 
{
  progressbar.value = mainaudio.currentTime;
};

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      break;
  }
});

mainaudio.addEventListener("ended", ()=>{

  let getText = repeatbutton.innerText; 
  switch(getText){
    case "repeat":
      nextmusic(); 
      break;
    case "repeat_one":
      mainaudio.currentTime = 0; 
      loadmusic(musicindex); 
      playmusic(); 
      break;
    case "shuffle":
      let randindex = Math.floor((Math.random() * allmusic.length) + 1);
      do{
        randindex = Math.floor((Math.random() * allmusic.length) + 1);
      }while(musicindex == randindex); 
      musicindex = randindex; 
      loadmusic(musicindex);
      playmusic();
      playingSong();
      break;
  }
});

showmoremusicbutton.addEventListener("click", ()=>{
  musiclist.classList.toggle("show");
});

closemusicbutton.addEventListener("click", ()=>{
  showmoremusicbutton.click();
});

audioduration=mainaudio.duration;

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allmusic.length; i++) {

  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allmusic[i].name}</span>
                  <p>${allmusic[i].artist}</p>
                </div>
                <span id="${allmusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allmusic[i].src}" src="songs/${allmusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); 
  let liAudioDuartionTag = ulTag.querySelector(`#${allmusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allmusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; 
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    if(allLiTag[j].getAttribute("li-index") == musicindex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicindex = getLiIndex;
  loadmusic(musicIndex);
  playmusic();
  playingSong();
}

