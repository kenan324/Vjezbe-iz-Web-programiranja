const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("sizeBrush");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const eraserBtn = document.getElementById("eraserBtn");

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
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "myDrawing.png"
    link.click();
})
