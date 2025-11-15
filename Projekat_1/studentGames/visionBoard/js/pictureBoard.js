const board = document.getElementById("board");
const addNote = document.getElementById("addNotes");
const andImage = document.getElementById("addImage");
const addQuotes = document.getElementById("addQuote");
const save = document.getElementById("addSafe");
const clear= document.getElementById("clear");



// Odaberi glavni element


// Boje za ljepljive biljeĹˇke
const colors = ["color1", "color2", "color3", "color4", "color5", "color6"];

// Primjeri slika i citata
const sampleImages = [
  "picture/slika1.png",
  "picture/slika2.png",
  "picture/slika3.png",
  "picture/slika4.png"
];


const sampleQuotes = [
  "A dog is the only thing on earth that loves you more than he loves himself.Josh Billings",
  "Once you have had a wonderful dog, a life without one is a life diminished.Dean Koontz",
  "What a dog doing???. unown",
  "The world would be a nicer place if everyone had the ability to love as unconditionally as a dog. Clinton"
];

// ======= Usluzni program za stvaranje stavki koje se mogu povlaciti i brisati =======
function makeDraggable(el) {
  let offsetX, offsetY;

  // Kreiranje delete (X) button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  el.appendChild(delBtn);

  // Brisanje elementa na click
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent starting drag
    el.remove();
  });

  // logika povlacenja
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

// ======= Dodaj Post It =======
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

// ======= Dodatj sliku =======
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

// ======= Dodaj citat =======
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

// ======= Snimi Visual Board =======
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

// ======= Ucitaj Visual Board =======
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

// ======= Ocisti Visual Board =======
clear.addEventListener("click", () => {
  if (confirm("Clear the board?")) {
    board.innerHTML = "";
    localStorage.removeItem("visionBoardItems");
  }
});