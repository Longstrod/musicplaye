
const progress=document.getElementById("progress");
const song=document.getElementById("song");
const controlicon=document.getElementById("controlicon");
const repeatButton = document.querySelector('.repeat');
function playpause()
{
    if(controlicon.classList.contains("fa-pause"))
    {
        song.pause();
        controlicon.classList.remove("fa-pause");
        controlicon.classList.add("fa-play");
    }
    else
    {
        song.play();
        controlicon.classList.add("fa-pause");
        controlicon.classList.remove("fa-play");
    }
}
song.onloadedmetadata = function() 
{
progress.max = song.duration;
durationDisplay.textContent = formatTime(song.duration);
};
song.onloadedmetadata = function() 
{
progress.max = song.duration;
durationDisplay.textContent = formatTime(song.duration);
};
progress.oninput = function() 
{
song.currentTime = this.value;
};
song.ontimeupdate = function() 
{
progress.value = song.currentTime;
};
function repeat() {
  song.loop =!song.loop;
  repeatButton.classList.toggle('active', song.loop);
  if (song.loop) 
  {
    repeatButton.classList.remove("fa-repeat");
    repeatButton.classList.add("fa-repeat-1");
  } else 
  {
    repeatButton.classList.add("fa-repeat");
    repeatButton.classList.remove("fa-repeat-1");
  }
}
