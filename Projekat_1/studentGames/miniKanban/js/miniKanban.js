const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});

// Handle modal buttons
document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;
    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});

// Create Task
function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;
    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}

// Handle Drag and Drop
document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        list.appendChild(dragging);
    });
});

// Clear board Modal
const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});
// Close Option modal
// Clear whole board button
document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

// Cancel board button
document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

// Save board modal
const saveModal = document.getElementById("saveModal");

document.getElementById("saveBoardBtn").addEventListener("click", () => {
     saveModal.style.display = "block";

});

// Cancel save modal button
document.getElementById("modalSafeCancel").addEventListener("click", () =>{
    saveModal.style.display = "none";
})

// Button for dropdown menu
const saveMenu = document.getElementById("saveMenu");
const dropdownMenuBtn = document.getElementById("dropdownMenuBtn");

document.getElementById("dropdownMenuBtn").addEventListener("click", () => {
    saveMenu.style.display = 
        (saveMenu.style.display === "block") ? "none" : "block";
});
// Close the dropdownMenu it was interacted outside the Menu 
document.getElementById("saveModal").addEventListener("click", e => {
    if (!saveMenu.contains(e.target) && e.target !== dropdownMenuBtn) {            
        saveMenu.style.display = "none";
    }
});

// Button for saving to jpeg 
document.getElementById("SaveToJpeg").addEventListener("click", () => {
        //close the event modal
        saveModal.style.display = "none";
        saveMenu.style.display = "none";

        html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

//Button for saving in PDF format
document.getElementById("SaveToPdf").addEventListener("click", () => {
    saveModal.style.display = "none";
    saveMenu.style.display = "none";
    // Try to use jsPDF method to save a pdf
    html2canvas(document.getElementById('content')
        //Add sharper compression
        ,{ scale: 2 }).then(canvas => {
        
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf; // declare the jsPDF lib
        const pdf = new jsPDF(
            { unit: 'in', format: 'letter', orientation: 'portrait' });
        
        
        pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 5,);
        pdf.save("miniKanban.pdf");
    });
    
});
// This is a more easer option
/*
const element = document.getElementById('content');
    const options = {
    margin: 1,
    filename: 'miniKanban.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
*/

const gmailModal = document.getElementById("gmailModal");
document.getElementById("SaveToGmail").addEventListener("click", () => {
    saveModal.style.display = "none";
    gmailModal.style.display = "block";
});

document.getElementById("gmailCancelBtn").addEventListener("click", () => {
    gmailModal.style.display = "none";
});



document.getElementById("modalSend").addEventListener("click", () => {
    //Gmail input 
    const gmailInput = document.getElementById("Gmail");
    gmailInput.value.trim();//remove spaces
 
    const regex = new RegExp("^[a-zA-Z0-9._/-]{3,20}@gmail\.com$");//Basic regex    

    if (regex.test(gmailInput.value)){sendGmail(gmailInput);};
    gmailInput.value = '';
});

function sendGmail(g){
    //Tried to make a function to attach a file to mailto method
    /*
    html2canvas(document.getElementById('content')
        //Add sharper compression
        ,{ scale: 2 }).then(canvas => {
        
        const imgData = canvas.toDataURL('image/png');
    });
    */
    
    window.location.href = `mailto:${g.value}?`;
    //subject=${encodeURIComponent("miniKanbanJpeg")}?
    //&body=${encodeURIComponent("imgData")}
}

// Dynamically load html2canvas and PDF
const scriptHtml2canvas = document.createElement("script");
scriptHtml2canvas.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(scriptHtml2canvas);

const scriptPdf = document.createElement("script");
scriptPdf.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
document.body.appendChild(scriptPdf);

// Close modal if it was interacted outside the modal 
window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
         e.target.style.display = "none";
    }
});