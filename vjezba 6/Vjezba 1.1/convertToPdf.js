 function generatePDF() {
 const element = document.getElementById('contentToConvert'); // Obuhvata element za konvert
 const options = {
 margin: 1,
 filename: 'Bingo.pdf',
 image: { type: 'jpeg', quality: 0.98 },
 html2canvas: { scale: 2 },
 jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
 };
 // Koristi html2pdf biblioteku da generira i snimi PDF file
 html2pdf().set(options).from(element).save();
 }