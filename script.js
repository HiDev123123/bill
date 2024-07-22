document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('item');
    const idInput = document.getElementById('id');
    const quantityInput = document.getElementById('quantity');
    const unitInput = document.getElementById('unit');
    const priceInput = document.getElementById('price');
    const amountInput = document.getElementById('amount');
    const previewBody = document.getElementById('previewBody');
    const totalAmountDisplay = document.getElementById('totalAmount');

    function calculateAmount() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        amountInput.value = (quantity * price).toFixed(2);
    }

    window.add = function() {
        const item = itemInput.value.trim();
        const id = idInput.value.trim();
        const quantity = quantityInput.value.trim();
        const unit = unitInput.value.trim();
        const price = priceInput.value.trim();
        const amount = amountInput.value.trim();

        // Validation: Check if item, quantity, and price are provided
        if (!item || !quantity || !price) {
            alert("Please provide the item name, quantity, and price.");
            return;
        }

        const rowCount = previewBody.rows.length;
        const row = previewBody.insertRow(rowCount);

        row.insertCell(0).textContent = rowCount + 1;
        row.insertCell(1).textContent = item;
        row.insertCell(2).textContent = id;
        row.insertCell(3).textContent = quantity;
        row.insertCell(4).textContent = unit;
        row.insertCell(5).textContent = price;
        row.insertCell(6).textContent = amount;

        const editCell = row.insertCell(7);
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning';
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            edit(row);
        };
        editCell.appendChild(editButton);

        const deleteCell = row.insertCell(8);
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            del(row);
        };
        deleteCell.appendChild(deleteButton);

        itemInput.value = '';
        idInput.value = '';
        quantityInput.value = '';
        unitInput.value = '';
        priceInput.value = '';
        amountInput.value = '';

        updateTotalAmount();
    };

    window.edit = function(row) {
        const cells = row.getElementsByTagName('td');
        itemInput.value = cells[1].textContent;
        idInput.value = cells[2].textContent;
        quantityInput.value = cells[3].textContent;
        unitInput.value = cells[4].textContent;
        priceInput.value = cells[5].textContent;
        amountInput.value = cells[6].textContent;

        row.remove();
        updateTotalAmount();
        updateSerialNumbers();
    };

    window.del = function(row) {
        row.remove();
        updateTotalAmount();
        updateSerialNumbers();
    };

    function updateTotalAmount() {
        let totalAmount = 0;
        for (let i = 0; i < previewBody.rows.length; i++) {
            const amount = parseFloat(previewBody.rows[i].cells[6].textContent) || 0;
            totalAmount += amount;
        }
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    function updateSerialNumbers() {
        for (let i = 0; i < previewBody.rows.length; i++) {
            previewBody.rows[i].cells[0].textContent = i + 1;
        }
    }

    quantityInput.addEventListener('input', calculateAmount);
    priceInput.addEventListener('input', calculateAmount);
});
