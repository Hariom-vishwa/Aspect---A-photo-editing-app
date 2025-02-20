const fileInp = document.querySelector("#fileInput"),
  uploadBtn = document.querySelector("#uploadBtn"),
  previewImg = document.querySelector(".previewImg"),
  brightness = document.querySelector("#brightness"),
  contrast = document.querySelector("#contrast"),
  grayscale = document.querySelector("#grayscale"),
  saturation = document.querySelector("#saturation"),
  hue = document.querySelector("#hue"),
  imgBlur = document.querySelector("#blur"),
  filterInputs = document.querySelectorAll(".filter"),
  rotation = 0,
  flipHorizontal = 1,
  flipVertical = 1;

function uploadFile() {
  fileInp.click();
  fileInp.onchange = () => {
    const file = fileInp.files[0];
    if (file) {
      const imgReader = new FileReader();
      imgReader.onload = (e) => {
        previewImg.style.backgroundImage = `url(${e.target.result})`;
      };
      imgReader.readAsDataURL(file);
    }
  };
}

filterInputs.forEach((input) => {
  input.addEventListener("input", applyFilters);
});

function applyFilters() {
  const brightnessVal = brightness.value;
  const contrastVal = contrast.value;
  const saturationVal = saturation.value;
  const hueVal = hue.value;
  const grayscaleVal = grayscale.value;
  const blurVal = imgBlur.value;
  previewImg.style.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%) hue-rotate(${hueVal}deg) grayscale(${grayscaleVal}%) blur(${blurVal}px)`;
}

function rotateImg(direction) {
  if (direction === "clockWise") {
    rotation += 90;
  } else if (direction === "antiClockWise") {
    rotation -= 90;
  }
  applyRotationFlip()
}

function flipImg(direction) {
  if (direction === "flipVertical") {
    flipVertical *= -1;
  } else if (direction === "flipHorizontal") {
    flipHorizontal *= -1;
  }
  applyRotationFlip()
}

function applyRotationFlip() {
  previewImg.style.transform = `rotate(${rotation}deg) scale(${flipVertical}, ${flipHorizontal})`;
}

function beforeImg() {
  previewImg.style.filter = "none";
  rotation = 0
  flipHorizontal = 1
  flipVertical = 1
}
