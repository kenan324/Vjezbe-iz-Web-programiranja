const board = document.getElementById("board");
const addNote = document.getElementById("addNotes");
const andImage = document.getElementById("addImage");
const addQuotes = document.getElementById("addQuote");
const save = document.getElementById("addSafe");
const clear= document.getElementById("clear");
const saveAa = document.getElementById("addSaveAs");
//=============SaveModal==============
const saveModal = document.getElementById("saveModal");
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



// Sticky note colors
const colors = ["color1", "color2", "color3", "color4", "color5", "color6"];

// Load picture
const sampleImages = [
  "picture/slika1.png",
  "picture/slika2.png",
  "picture/slika3.png",
  "picture/slika4.png"
];


const sampleQuotes = [
  "A dog is the only thing on earth that loves you more than he loves himself.Josh Billings",
  "Once you have had a wonderful dog, a life without one is a life diminished.Dean Koontz",
  "What a dog doing???. unknown",
  "The world would be a nicer place if everyone had the ability to love as unconditionally as a dog. Clinton"
];

// ======= Create a draggable and deletable items =======
function makeDraggable(el) {
  let offsetX, offsetY;

  // Create delete (X) button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  el.appendChild(delBtn);

  // Clear element on click
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent starting drag
    el.remove();
  });

  // drag & drop content
  el.addEventListener("mousedown", dragStart);

  function dragStart(e) {
    if (e.target === delBtn) return; // preskoci povlacenja ako se klikne X
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
  }

  function drag(e) {
    e.preventDefault();
    el.style.left = e.clientX - offsetX + "px";
    el.style.top = e.clientY - offsetY + "px";
  }

  function dragEnd() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", dragEnd);
  }
}

// ======= Ad Post It =======
addNote.addEventListener("click", () => {
  const note = document.createElement("div");
  note.className = "note " + colors[Math.floor(Math.random() * colors.length)];
  note.contentEditable = "true";
  note.style.left = Math.random() * 500 + "px";
  note.style.top = Math.random() * 300 + "px";
  note.textContent = "Napisi nesto...";
  makeDraggable(note);
  board.appendChild(note);
});

// ======= Add Picture  =======
andImage.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "pinned-img";
  div.style.left = Math.random() * 400 + "px";
  div.style.top = Math.random() * 250 + "px";
  const img = document.createElement("img");
  img.src = sampleImages[Math.floor(Math.random() * sampleImages.length)];
  div.appendChild(img);
  makeDraggable(div);
  board.appendChild(div);
});

//============ SaveModal =============
addSaveAs.addEventListener("click", () => {
    saveModal.style.display = "block";
});

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

//========== SaveAs content =============
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



// ======= add text =======
addQuotes.addEventListener("click", () => {
  const q = document.createElement("div");
  q.className = "quote";
  q.textContent = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
  q.style.left = Math.random() * 400 + "px";
  q.style.top = Math.random() * 250 + "px";
  q.contentEditable = "true";
  makeDraggable(q);
  board.appendChild(q);
});

// ======= save Visual Board =======
save.addEventListener("click", saveBoard);
function saveBoard() {
  const items = [];
  document.querySelectorAll("#board > div").forEach((el) => {
    const data = {
      type: el.classList.contains("note")
        ? "note"
        : el.classList.contains("quote")
        ? "quote"
        : "image",
      className: el.className,
      html: el.innerHTML,
      left: el.style.left,
      top: el.style.top,
    };
    items.push(data);
  });
  console.log(document.querySelectorAll("#board > div").length);
  localStorage.setItem("visionBoardItems", JSON.stringify(items));
  alert("Board saved!");
}

// ======= save in browser Visual Board =======
function loadBoard() {
  const data = localStorage.getItem("visionBoardItems");
  if (!data) return;
  const items = JSON.parse(data);
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = item.className;
    div.style.left = item.left;
    div.style.top = item.top;
    div.innerHTML = item.html;
    if (item.type !== "image") div.contentEditable = "true";
    makeDraggable(div);
    board.appendChild(div);
  });
}
loadBoard();

// ======= Clear Visual Board =======
clear.addEventListener("click", () => {
  if (confirm("Clear the board?")) {
    board.innerHTML = "";
    localStorage.removeItem("visionBoardItems");
  }
});