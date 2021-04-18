//Music mixer
(() => {

const iconContainer = document.querySelectorAll(".iconBox .eachIcon img"),
	   dropZones = document.querySelectorAll(".drop_zone .dropzone"),
     removeIcon = document.querySelectorAll(".removeX");
    

setInterval(playTrack, 10666);

  function playTrack() {   
    let songs = document.querySelectorAll("audio");
    songs.forEach((track, index) => {
      track.currentTime = 0;
      songs[index].play();
    });
  }

function musicSetUp() {
    let tracks = this.parentNode.querySelectorAll("audio");
    tracks.forEach(track => track.parentNode.removeChild(track));
 
    let audio = document.createElement("audio");
    this.appendChild(audio);
    audio.src = `audio/${currentImage}.wav`;
    audio.play();
  }

function dragStart(event) {
    console.log('here',(this.id))
    event.dataTransfer.setData("heresData", this.id);
  }

  function draggedOver(event) {
    event.preventDefault();
  }

  function musicDrop(event) {
    event.preventDefault(); 
    if (this.children.length > 1) {
      return;
    }
    
    let currentImage = event.dataTransfer.getData("heresData");
    let audio = document.createElement("audio");
    event.target.appendChild(audio);
    event.target.appendChild(document.querySelector(`#${currentImage}`));
    audio.src = `audio/${currentImage}.wav`;
    audio.load()

    this.querySelector("img").draggable = false;
  }

  function removeImage() {
    let track = this.parentNode.querySelector("audio");
    track.parentNode.removeChild(track);
    
    let icon = this.parentNode.querySelector("img");
    icon.draggable = true;

    let iconBox = document.querySelectorAll(".iconBox .eachIcon");
      iconBox[icon.dataset.index].appendChild(icon);
  }

 iconContainer.forEach(icon => icon.addEventListener("dragstart", dragStart));
  dropZones.forEach(zone => zone.addEventListener("dragover", draggedOver));
  dropZones.forEach(zone => zone.addEventListener("drop", musicDrop));
  removeIcon.forEach(x => x.addEventListener("click", removeImage));

})();