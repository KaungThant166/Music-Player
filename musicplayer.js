const musicPlayerContainerTag = document.getElementsByClassName("musicPlayerContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const totalAndTimeTag = document.getElementsByClassName("totalAndTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playBtnTag = document.getElementsByClassName("playBtn")[0];
const pauseBtnTag = document.getElementsByClassName("pauseBtn")[0];
const previousBtnTag = document.getElementsByClassName("previousBtn")[0];
const nextBtnTag = document.getElementsByClassName("nextBtn")[0];


const tracks = [
    {trackId: "FYF/01 How We Struggle.mp3", title: "How We Struggle - LoukXalone" },
    {trackId: "FYF/02 Liars.mp3", title: "Liars - LoukXalone" },
    {trackId: "FYF/03 Use Me.mp3", title: "Use Me - LoukXalone" },
    {trackId: "FYF/04 Ok-Ko.mp3", title: "Ok-Ko - LoukXalone" },
    {trackId: "FYF/05 Me.mp3", title: "Me - LoukXalone" },
    

];

for (let i = 0; i < tracks.length; i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click",() => {
       currentIndex = i;
       songPlay();
    })
    
    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() + ". " +tracks[i].title;
    trackTag.textContent = title;
    musicPlayerContainerTag.append(trackTag)
}
let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata",() =>{
     duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndTime(duration);
   
});

audioTag.addEventListener("timeupdate",() =>{
    const currentTime = Math.floor(audioTag.currentTime);
   const currentTimeText = createMinuteAndTime(currentTime);
   const durAndCurrentTimeText = currentTimeText + " / " +  durationText;
   totalAndTimeTag.textContent = durAndCurrentTimeText;
   cureentProgressFunction(currentTime);
   
});

const cureentProgressFunction = (currentTime) => {
  const currentProgressWidth = (500 / duration )*currentTime;
  currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}
const createMinuteAndTime = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    
    return minutesText + ":" + secondsText;
    

};
let currentIndex = 0;
let isPlaying = false;
playBtnTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if(currentTime === 0){
        songPlay();
    }else{
        audioTag.play();
        updatePlayAndPause();
    }
});

pauseBtnTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPause();
});

const updatePlayAndPause = () => {
    if(isPlaying){
        playBtnTag.style.display = "none";
        pauseBtnTag.style.display = "inline";
    }else {
        playBtnTag.style.display = "inline";
        pauseBtnTag.style.display = "none";
    }
};

previousBtnTag.addEventListener("click",() =>{
   
    if(currentIndex === 0){
        return;
    }
    currentIndex -= 1; 
    songPlay();
   
});
nextBtnTag.addEventListener("click",() =>{
    if(currentIndex === tracks.length - 1){
        return;
    }
    currentIndex += 1;
    songPlay();
});

const songPlay = () => {
    const songPlayId = tracks[currentIndex].trackId;
    audioTag.src = songPlayId;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPause();
};