const fileInp = document.querySelector("#fileInput"),
    uploadBtn = document.querySelector("#uploadBtn"),
    previewImg = document.querySelector(".previewImg"),
    brightness = document.querySelector("#brightness"),
    contrast = document.querySelector("#contrast"),
    sepia = document.querySelector("#sepia"    ),
    saturation = document.querySelector("#saturation")

function uploadFile() {
    fileInp.click()
    fileInp.onchange = () => {
        const file = fileInp.files[0];
        if(file){
            const imgReader = new FileReader();
            imgReader.onload = (e) =>{
                previewImg.style.backgroundImage = `url(${e.target.result})`
            }
            imgReader.readAsDataURL(file);
        }
    }
}




function beforeImg(){
    previewImg.style.filter = "none"
}
