const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("sizeBrush");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const eraserBtn = document.getElementById("eraserBtn");
const cancelBtn = document.getElementById("modalSafeCancel");
//===========dropdown Menu============
const dropdownMenuBtn = document.getElementById("dropdownMenuBtn");
//========== Save content =============
const saveToPdf = document.getElementById("SaveToPdf");
const saveToJpeg = document.getElementById("SaveToJpeg");
//=========== Gmail modal =============
const gmailModal = document.getElementById("gmailModal");
const saveToGmail = document.getElementById("SaveToGmail");
const modalSend = document.getElementById("modalSend");

// start settings
let drawing = false;
let currentColor = colorPicker.value;
let isErasing = false;

// drawing function 
function startDraw(e) {
    drawing = true;
    draw(e);
}

function endDraw(){
    drawing = false;
    ctx.beginPath();
}

function draw(e){
    if(!drawing) return;

    const rect = canvas.getBoundingClientRect();
    // Adjust the position of mouse to the size of the board
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = isErasing ? "#FFFFFF" : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// mouse events
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);
// touch event for mobile
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", (e) => {
    draw(e);
    e.preventDefault();
});
canvas.addEventListener("touchend", endDraw);

// toolbar logic
colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
    isErasing = false;
});

eraserBtn.addEventListener("click", () => {
    isErasing = !isErasing;
    eraserBtn.textContent = isErasing ? "Clear" : "Draw";
});

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
});

saveBtn.addEventListener("click", () => {
    saveModal.style.display = "block";
})

cancelBtn.addEventListener("click", () =>{
    saveModal.style.display = "none";
});

//========== dropdown Menu ===========

dropdownMenuBtn.addEventListener("click", () => {
    saveMenu.style.display = 
        (saveMenu.style.display === "block") ? "none" : "block";
});
 
saveModal.addEventListener("click", e => {
    if (!saveMenu.contains(e.target) && e.target !== dropdownMenuBtn) {            
        saveMenu.style.display = "none";
    }
});

// close modal outside the modalbox
window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
         e.target.style.display = "none";
    }
});

//========== Save content =============
saveToPdf.addEventListener("click", () => {
    saveModal.style.display = "none";
    saveMenu.style.display = "none";
    
    const element = document.getElementById('content');
    const options = {
    margin: 1,
    filename: 'pictureBoard.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
});

saveToJpeg.addEventListener("click", () => {
    saveModal.style.display = "none";
    saveMenu.style.display = "none";

    html2canvas(document.body).then(canvas => {
    const link = document.createElement("a");
    link.download = "pictureBoard.png";
    link.href = canvas.toDataURL();
    link.click();
    });
});

//=========== Gmail modal =============
saveToGmail.addEventListener("click", () => {
    saveModal.style.display = "none";
    gmailModal.style.display = "block";
});

gmailCancel = document.getElementById("gmailCancelBtn");
gmailCancel.addEventListener("click", () => {
    gmailModal.style.display = "none";
});


modalSend.addEventListener("click", () => {
    //Gmail input 
    const gmailInput = document.getElementById("Gmail");
    gmailInput.value.trim();//remove spaces
 
    const regex = new RegExp("^[a-zA-Z0-9._/-]{3,20}@gmail\.com$");//Basic regex    

    if (regex.test(gmailInput.value)){
      window.location.href = `mailto:${gmailInput.value}?`;
    };
    gmailInput.value = '';
});

// Dynamically load html2canvas and PDF
const scriptHtml2canvas = document.createElement("script");
scriptHtml2canvas.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(scriptHtml2canvas);

const scriptPdf = document.createElement("script");
scriptPdf.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
document.body.appendChild(scriptPdf);