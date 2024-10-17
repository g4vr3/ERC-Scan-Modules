// Reference to the table body element
const TABLA = document.getElementById("tbdy");

// Function to delete a row
function eliminarFila(botonEliminar) {  
  // Get the row to delete
  let fila = botonEliminar.parentNode.parentNode;  
  // Get all cells in the row
  let celdas = fila.querySelectorAll("td");  
  // Clear content of all cells except the last one (trash icon cell)
  for (let i = 0; i < celdas.length - 1; i++) {    
    celdas[i].textContent = "";  
  }  
  // Set focus back to the first cell of the row
  celdas[0].focus();
}

// Function to handle Enter key press within a cell
function presskey(row, col) {  
  if (event.keyCode === 13) { // If the Enter key is pressed  
    let newRowId = row + 1;    
    event.preventDefault(); // Prevent the default Enter key behavior
    let Filas = TABLA.querySelectorAll("tr"); // Get all rows
    separarTexto(); // Split and distribute text into appropriate columns
    agregarApostrofe(); // Add apostrophe for numeric formatting
    if (row === Filas.length) { // Check if it's the last row  
      // If yes, create a new row
      CrearNuevaFila(newRowId, col, Filas);    
    } else {      
      // If not, set focus to the next row
      focus(row + 1, col)    
    }  
  }
}

// Function to create a new row in the table
function CrearNuevaFila(row, col, Filas) {    
  let tr = document.createElement("tr");    
  tr.setAttribute("data-row", row); // Set a row identifier

  // Get the number of columns based on the first row
  let Columnas = Filas[0].querySelectorAll("td");    
  for (let i = 1; i <= Columnas.length; i++) {      
    let td = document.createElement("td");      
    td.contentEditable = true; // Make cell editable
    td.setAttribute("onkeypress", "presskey(" + row + "," + i + ")"); // Set event listener for keypress
    tr.appendChild(td);    
  }

  // Create the delete button for the new row
  let deleteButton = document.createElement("button");    
  deleteButton.classList.add("btn-delete-row");    
  deleteButton.onclick = function () {      
    eliminarFila(this); // Call delete function on button click
  };

  // Add the delete button to the last cell of the new row
  let lastCell = tr.lastElementChild;    
  lastCell.classList.add("celda-papelera");    
  lastCell.appendChild(deleteButton);    

  // Append the new row to the table
  TABLA.appendChild(tr);    
  focus(row, col); // Set focus to the new row
}

// Function to focus on a specific cell
function focus(row, col) {  
  document.querySelector("tr[data-row='" + row + "']").querySelectorAll("td")[col - 1].focus();
}

// Function to split text and assign to table columns based on specific conditions
function separarTexto() {    
  let celdas = document.querySelectorAll("[contenteditable='true']"); // Get all editable cells
  let filaActual = null;    
  for (let i = 0; i < celdas.length; i++) {      
    if (celdas[i] === document.activeElement) { // Find the active cell      
      filaActual = celdas[i].parentNode;        
      break;      
    }    
  }

  // Get and trim the content of the first cell of the row
  let contenido = filaActual.querySelectorAll("td")[0].innerHTML.trim();    
  if (contenido.indexOf(' ') === -1) { // If no spaces in the content    
    if (contenido.startsWith('536')) { // Special case 536 format      
      filaActual.querySelectorAll("td")[1].innerHTML = contenido.slice(0,11); // Copy first 11 characters to second column
      filaActual.querySelectorAll("td")[3].innerHTML = contenido.slice(-10); // Copy last 10 characters to fourth column
      filaActual.querySelectorAll("td")[2].innerHTML = contenido.slice(11,-10); // Copy the rest to third column
    } else if (contenido.startsWith('535.')) { // Special case 535. format      
      filaActual.querySelectorAll("td")[1].innerHTML = contenido.slice(0,11); // Copy first 11 characters to second column
      filaActual.querySelectorAll("td")[3].innerHTML = contenido.slice(-7); // Copy last 7 characters to fourth column
      filaActual.querySelectorAll("td")[2].innerHTML = contenido.slice(11,-7); // Copy the rest to third column
    } else if (contenido.startsWith('535-') && contenido.length === 22) { // Special case 535- with 22 characters      
      filaActual.querySelectorAll("td")[1].innerHTML = contenido.slice(0,11); // Copy first 11 characters to second column
      filaActual.querySelectorAll("td")[3].innerHTML = contenido.slice(-10); // Copy last 10 characters to fourth column
      filaActual.querySelectorAll("td")[2].innerHTML = contenido.slice(11,-10); // Copy the rest to third column
    } else if (contenido.startsWith('535-') && contenido.length === 19) { // Special case 535- with 19 characters      
      filaActual.querySelectorAll("td")[1].innerHTML = contenido.slice(0,11); // Copy first 11 characters to second column
      filaActual.querySelectorAll("td")[3].innerHTML = contenido.slice(-7); // Copy last 7 characters to fourth column
      filaActual.querySelectorAll("td")[2].innerHTML = contenido.slice(11,-7); // Copy the rest to third column
    } else {      
      filaActual.querySelectorAll("td")[3].innerHTML = contenido; // Otherwise copy content to the fourth column
    }  
  } else { // If spaces are present, split content and assign to columns    
    contenido = contenido.split(" ");      
    for (let i = 0; i < 4; i++) {        
      filaActual.querySelectorAll("td")[i + 1].innerHTML = contenido[i] || ""; // Assign each part to corresponding column
    }    
  }
}

// Function to add apostrophe to numbers that start with '0' for Excel formatting
function agregarApostrofe() {    
  var celdas = document.querySelectorAll("#tblData td"); // Get all cells in the table    
  for (var i = 0; i < celdas.length; i++) {      
    var celda = celdas[i];      
    var valor = celda.innerText;

    // Check if the cell contains a number starting with '0'
    if (/^0\d+$/.test(valor)) {        
      celda.innerText = "'" + valor; // Prepend apostrophe for correct Excel formatting
    }    
  }
}

// Function to export the table data to Excel
function exportTableToExcel(tableID, filename = '') {    
  const table = document.getElementById(tableID);    
  const ws = XLSX.utils.table_to_sheet(table, { header: 1, range: 0, raw: false, blankrows: false }); // Create a new sheet
  const range = XLSX.utils.decode_range(ws['!ref']); // Get the cell range

  // Set the column widths and row heights
  ws['!cols'] = [];    
  ws['!rows'] = [{ hpx: 40 }, ...Array(range.e.r).fill({ hpx: 20 })];    
  for (let c = range.s.c; c <= range.e.c && c < 5; c++) { // Set width for first 5 columns    
    ws['!cols'][c] = { wpx: 200 };    
  }

  // Add a filter to the header row
  ws['!autofilter'] = { ref: XLSX.utils.encode_range(range) };

  // Iterate through cells and set format as text
  for (let r = range.s.r; r <= range.e.r; r++) {      
    for (let c = range.s.c; c <= range.e.c && c < 5; c++) { // Limit to first 5 columns        
      const cell = ws[XLSX.utils.encode_cell({ r, c })];        
      cell.t = 's'; // Set cell type to text        
      cell.z = '@'; // Set format to text      
    }    
  }

  // Create a new Excel workbook and append the sheet
  const wb = XLSX.utils.book_new();    
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate the file and trigger download
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });    
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });    
  const url = URL.createObjectURL(blob);    
  const link = document.createElement('a');    
  link.href = url;    
  link.download = filename ? `${filename}.xlsx` : 'ERC.xlsx';    
  link.click();    
  URL.revokeObjectURL(url);

  // Helper function to convert string to ArrayBuffer
  function s2ab(s) {      
    const buf = new ArrayBuffer(s.length);      
    const view = new Uint8Array(buf);      
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;      
    return view;    
  }
}

// Focus on the first cell when the page loads
window.addEventListener("load", function() {  
  document.querySelector(".focus").focus();
});
