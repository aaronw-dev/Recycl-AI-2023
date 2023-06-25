let imageToDetect = null;

const videoContainer = document.getElementById('videoContainer');
const imageContainer = document.getElementById('imageContainer');
const capturedImage = document.getElementById('capturedImage');
const captureButton = document.getElementById('capture');
const returnButton = document.getElementById('returnButton');

const detectedobject = document.getElementById("detectedobject")
const itemconfidence = document.getElementById("item-confidence")
const itemtext = document.getElementById("item-text")
const itemdetails = document.getElementById("item-details")

detectedobject.innerHTML = "something random"
itemconfidence.innerHTML = "3%"
itemtext.innerHTML = "thing in front of the camera"
itemdetails.innerHTML = "It goes in the landfill but if I actually remember to finish writing this then it might not."
const maxVideoWidth = 640; // Maximum allowed video width
const maxVideoHeight = 640; // Maximum allowed video height

// Get access to the user's webcam with limited resolution
navigator.mediaDevices.getUserMedia({ 
  video: {
    width: { ideal: maxVideoWidth },
    height: { ideal: maxVideoHeight }
  }
})
  .then((stream) => {
    const videoElement = document.getElementById('video');
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
  videoElement.hidden = true;
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Save the captured image to the "imageToDetect" variable
  imageToDetect = canvas.toDataURL('image/png');

  // Display the captured image
  capturedImage.src = imageToDetect;
});

returnButton.addEventListener('click', () => {
  const videoElement = document.getElementById('video');
  videoElement.hidden = false;
  // Clear the captured image and return to the live webcam feed
  imageToDetect = null;
  capturedImage.src = '';
});
