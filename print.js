function printBill() {
    // Get the preview table and its contents
    const previewTable = document.getElementById('previewTable');
    const billTable = document.getElementById('billTable');

    // Get the preview body and the bill body
    const previewBody = document.getElementById('previewBody');
    const billBody = document.getElementById('billBody');

    // Clear existing rows in the bill table
    billBody.innerHTML = '';
    
    // Get the first 40 rows from the preview body or add empty rows if fewer
    const rows = Array.from(previewBody.children).slice(0, 40);

    rows.forEach(row => {
        const newRow = row.cloneNode(true);

        // Remove the extra cells (edit and delete) if they exist
        while (newRow.cells.length > 7) {
            newRow.deleteCell(7); // Remove the extra cells from the end
        }

        billBody.appendChild(newRow);
    });

    // Add empty rows if there are fewer than 40 rows
    const rowsToAdd = 20 - rows.length;
    for (let i = 0; i < rowsToAdd; i++) {
        const emptyRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            emptyRow.appendChild(cell);
        }
        billBody.appendChild(emptyRow);
    }

    // Copy the total amount
    const totalAmount = document.getElementById('totalAmount').textContent;
    document.getElementById('billTotalAmount').textContent = totalAmount;

    // Create a new window for printing
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write('<html><head><title>Print Bill</title>');
    newWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    newWindow.document.write('<style>');
    newWindow.document.write('@media print { @page { size: landscape; } }'); // Print in landscape mode
    newWindow.document.write('.container { min-height: 80vh; }'); // Ensure the bill takes up at least 80% of the page height

    // Adjust borders to only show left and right borders
    newWindow.document.write('#billTable { border-collapse: collapse; width: 100%; }'); // Ensure borders do not collapse and table takes full width
    newWindow.document.write('#billTable th, #billTable td { border-left: 1px solid black; border-right: 1px solid black; padding: 5px 20px; text-align: center; }'); // Left and right borders
    newWindow.document.write('#billTable thead th, #billTable tfoot th { border-top: 1px solid black; }'); // Keep top border for header and footer
    newWindow.document.write('#billTable tbody tr { border-bottom: none; }'); // Remove bottom border from table body rows
    newWindow.document.write('#billTable { border-top: 1px solid black; border-bottom: 1px solid black; }'); // Keep top and bottom borders for the entire table
    newWindow.document.write('</style>');
    // newWindow.document.write('</head><body>');
    // newWindow.document.write('<center><h2>BILL</h2></center>');
    newWindow.document.write('<div class="container m-5">');
    newWindow.document.write(billTable.outerHTML);
    newWindow.document.write('</div>');
    newWindow.document.write('</body></html>');

    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
}
