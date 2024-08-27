// Wait for the DOM content to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Get references to HTML elements
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    // Initialize an empty array to store expenses
    let expenses = [];

    // Event listener for the expense form submission
    expenseForm.addEventListener("submit", (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get input values from the form fields
        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        // Create a new expense object with unique ID and form data
        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        // Add the new expense to the expenses array
        expenses.push(expense);

        // Display the updated list of expenses
        displayExpenses(expenses);

        // Update the total amount displayed
        updateTotalAmount();

        // Reset the form fields
        expenseForm.reset();
    });

    // Event listener for handling delete and edit actions on the expense list
    expenseList.addEventListener("click", (e) => {
        // Check if the delete button was clicked
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);

            // Remove the expense with the specified ID from the array
            expenses = expenses.filter(expense => expense.id !== id);

            // Display the updated list of expenses
            displayExpenses(expenses);

            // Update the total amount displayed
            updateTotalAmount();
        }

        // Check if the edit button was clicked
        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);

            // Find the expense to be edited
            const expense = expenses.find(expense => expense.id === id);

            // Populate the form fields with the selected expense data
            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            // Remove the selected expense from the array
            expenses = expenses.filter(expense => expense.id !== id);

            // Display the updated list of expenses
            displayExpenses(expenses);

            // Update the total amount displayed
            updateTotalAmount();
        }
    });

    // Event listener for filtering expenses by category
    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;

        // Display all expenses if "All" is selected, otherwise filter by selected category
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category);
            displayExpenses(filteredExpenses);
        }
    });

    // Function to display the list of expenses in the table
    function displayExpenses(expenses) {
        // Clear the existing rows in the table body
        expenseList.innerHTML = "";

        // Iterate over the expenses array and create a table row for each expense
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            // Populate the row with expense data and action buttons
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>&#x20B9;${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            // Append the row to the table body
            expenseList.appendChild(row);
        });
    }

    // Function to update the total amount displayed
    function updateTotalAmount() {
        // Calculate the sum of all expenses
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Display the total amount in the designated span
        totalAmount.textContent = total.toFixed(2);
    }
});