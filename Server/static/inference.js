let imageToDetect = null;

const videoContainer = document.getElementById('videoContainer');
const imageContainer = document.getElementById('imageContainer');
const capturedImage = document.getElementById('capturedImage');
const captureButton = document.getElementById('capture');
const returnButton = document.getElementById('returnButton');

const detectedobject = document.getElementById("detectedobject")
const itemconfidence = document.getElementById("item-confidence")
const itemdetails = document.getElementById("item-details")
const inferencespeed = document.getElementById("inference-speed")
const maxVideoWidth = 640; // Maximum allowed video width
const maxVideoHeight = 640; // Maximum allowed video height

var isInFreezeFrame = false;

const rotatingarrows = "M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
const camera =         "M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"


names = {
  0: 'Crinkly Plastic', 
  1: 'Returnable Recycling', 
  2: 'Compost', 
  3: 'Metallic Wrapping', 
  4: 'Non-Returnable Recycling'
}

paragraphs = {
  0: 'Crinkly plastic', 
  1: 'Returnable recycling can be returned to your local recycling facility to get your environment deposit back. This is usually something around 10 cents.', 
  2: 'Compost goes in a green bin or a compost bin that you may have in your house. Fun fact: 40% of what we throw into the garbage is actually compostable.', 
  3: 'Metallic Wrapping', 
  4: 'Non-Returnable Recycling'
}

// Get access to the user's webcam with limited resolution
navigator.mediaDevices.getUserMedia({ 
  video: {
    width: { ideal: maxVideoWidth },
    height: { ideal: maxVideoHeight }
  }
})
  .then((stream) => {
    const videoElement = document.getElementById('video');
    document.getElementById("loading-text").style.display = "none"
    videoElement.srcObject = stream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  })
  .catch((error) => {
    console.error('Error accessing webcam:', error);
  });

captureButton.addEventListener('click', () => {
  const videoElement = document.getElementById('video');
  captureButton.classList.toggle("spinning")
  isInFreezeFrame = !isInFreezeFrame
  if(isInFreezeFrame){
    document.getElementById("buttonpath").setAttribute('d', rotatingarrows)
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    // Save the captured image to the "imageToDetect" variable
    imageToDetect = canvas.toDataURL('image/png');
    fetch('http://127.0.0.1:3000/processimage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "file": imageToDetect })
    })
    .then(response => response.json())
    .then(json => loadedJSON(json))
  }
});
function loadedJSON(json){
  console.log(JSON.stringify(json))
  captureButton.classList.toggle("spinning")

  detectedobject.innerHTML = names[json["nameid"]]
  itemconfidence.innerHTML = ((json["confidence"].toFixed(2)) * 100) + "%";
  itemdetails.innerHTML = paragraphs[json["nameid"]]
  inferencespeed.innerHTML = (json["speed"] / 1000).toFixed(2) + " seconds to process"
  isInFreezeFrame = !isInFreezeFrame
  document.getElementById("buttonpath").setAttribute('d', camera);
  // Clear the captured image and return to the live webcam feed
  imageToDetect = null;
  capturedImage.src = '';
}