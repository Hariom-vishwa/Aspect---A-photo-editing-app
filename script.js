const fileInp = document.querySelector("#fileInput"),
  uploadBtn = document.querySelector("#uploadBtn"),
  previewImg = document.querySelector(".previewImg"),
  brightness = document.querySelector("#brightness"),
  contrast = document.querySelector("#contrast"),
  grayscale = document.querySelector("#grayscale"),
  saturation = document.querySelector("#saturation"),
  hue = document.querySelector("#hue"),
  imgBlur = document.querySelector("#blur"),
  filterInputs = document.querySelectorAll(".filter");

let imageUploaded = false; // Track if an image is uploaded

function uploadFile() {
  fileInp.click();
  fileInp.onchange = () => {
    const file = fileInp.files[0];
    if (file) {
      const imgReader = new FileReader();
      imgReader.onload = (e) => {
        previewImg.style.backgroundImage = `url(${e.target.result})`;
        imageUploaded = true; // Mark as uploaded
      };
      imgReader.readAsDataURL(file);
    }
  };
}

// Filters

filterInputs.forEach((input) => {
  input.addEventListener("input", applyFilters);
});

function applyFilters() {
  if (!imageUploaded) return; // Prevent applying filters if no image is uploaded

  const brightnessVal = brightness.value;
  const contrastVal = contrast.value;
  const saturationVal = saturation.value;
  const hueVal = hue.value;
  const grayscaleVal = grayscale.value;
  const blurVal = imgBlur.value;
  previewImg.style.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%) hue-rotate(${hueVal}deg) grayscale(${grayscaleVal}%) blur(${blurVal}px)`;
  applyRotationFlip();
}

// Rotate and Flip Functionality

let rotation = 0,
  flipHorizontal = 1,
  flipVertical = 1;

function rotateClockwise() {
  if (!imageUploaded) return; // Prevent rotating without an image
  rotation += 90;
  applyRotationFlip();
}

function rotateAntiClockwise() {
  if (!imageUploaded) return;
  rotation -= 90;
  applyRotationFlip();
}

function flipVertically() {
  if (!imageUploaded) return;
  flipVertical *= -1;
  applyRotationFlip();
}

function flipHorizontally() {
  if (!imageUploaded) return;
  flipHorizontal *= -1;
  applyRotationFlip();
}

function applyRotationFlip() {
  if (!imageUploaded) return;
  previewImg.style.transform = `rotate(${rotation}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

// Before Filters

function withoutSettings() {
  if (!imageUploaded) return;
  previewImg.style.filter = "none";
  rotation = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  applyRotationFlip();
}

// Reset Filters

function resetSettings() {
  if (!imageUploaded) return;
  brightness.value = 100;
  contrast.value = 100;
  saturation.value = 100;
  hue.value = 0;
  grayscale.value = 0;
  blur.value = 0;
  rotation = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  applyFilters();
}

// Download image functionality

const downloadBtn = document.querySelector("#downLoad");

function downloadImg() {
  const imgUrl = previewImg.style.backgroundImage.slice(5, -2);
  if (!imageUploaded) return alert("Please upload an image first!");

  const downloadLink = document.createElement("a");
  downloadLink.href = imgUrl;
  downloadLink.download = "aspect-edited-img.jpg";
  downloadLink.click();
}
