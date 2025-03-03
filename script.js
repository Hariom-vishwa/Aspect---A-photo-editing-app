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

const brightnessVal = brightness.value;
const contrastVal = contrast.value;
const saturationVal = saturation.value;
const hueVal = hue.value;
const grayscaleVal = grayscale.value;
const blurVal = imgBlur.value;

// function applyFilters() {
//   if (!imageUploaded) return;
//   previewImg.style.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%) hue-rotate(${hueVal}deg) grayscale(${grayscaleVal}%) blur(${blurVal}px)`;
//   applyRotationFlip();
// }


function applyFilters() {
  if (!imageUploaded) return;
  previewImg.style.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%) saturate(${saturation.value}%) hue-rotate(${hue.value}deg) grayscale(${grayscale.value}%) blur(${imgBlur.value}px)`;
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

// Increase and decrease value

function incBrightness() {
  brightness.value = Math.min(parseInt(brightness.value) + 1, 200);
  applyFilters();
}

function decBrightness() {
  brightness.value = Math.max(parseInt(brightness.value) - 1, 0);
  applyFilters();
}

function incContrast() {
  contrast.value = Math.min(parseInt(contrast.value) + 1, 200);
  applyFilters();
}

function decContrast() {
  contrast.value = Math.max(parseInt(contrast.value) - 1, 0);
  applyFilters();
}

function incSaturation() {
  saturation.value = Math.min(parseInt(saturation.value) + 1, 200);
  applyFilters();
}

function decSaturation() {
  saturation.value = Math.max(parseInt(saturation.value) - 1, 0);
  applyFilters();
}

function incHue() {
  hue.value = Math.min(parseInt(hue.value) + 1, 100);
  applyFilters();
}

function decHue() {
  hue.value = Math.max(parseInt(hue.value) - 1, -100);
  applyFilters();
}

function incGrayscale() {
  grayscale.value = Math.min(parseInt(grayscale.value) + 1, 100);
  applyFilters();
}

function decGrayscale() {
  grayscale.value = Math.max(parseInt(grayscale.value) - 1, 0);
  applyFilters();
}

function incBlur() {
  imgBlur.value = Math.min(parseInt(imgBlur.value) + 1, 10);
  applyFilters();
}

function decBlur() {
  imgBlur.value = Math.max(parseInt(imgBlur.value) - 1, 0);
  applyFilters();
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
  imgBlur.value = 0;
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
