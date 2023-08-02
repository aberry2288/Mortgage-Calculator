// get input data from page
function getValues() {
    //get each value from page input
    let loanAmount = document.getElementById('loanAmount').value;
    let loanLength = document.getElementById('monthsAmount').value;
    let loanInterest = document.getElementById('interestAmount').value;

    loanAmount = parseFloat(loanAmount);
    loanLength = parseInt(loanLength);
    loanInterest = parseFloat(loanInterest);

    //make sure those values make sense
    if (isNaN(loanAmount) || isNaN(loanLength) || isNaN(loanInterest) || loanAmount <= 0 || loanLength <= 0 || loanInterest <= 0) {
        swal.fire({
            icon: 'error',
            title: 'Whoops!',
            text: 'Please enter valid loan details!'
        });

    } else {

        //do something with those inputs
        let loanTotals = calculateTotals(loanAmount, loanLength, loanInterest);

        displayTotals(loanTotals.monthlyPayment, loanAmount, loanTotals.totalInterest, loanTotals.totalCost);

        let payments = calculatePayments(loanLength, loanTotals.monthlyPayment, loanAmount, loanInterest);

        displayPayments(payments);

    }

}

// calculate totals for the loan
function calculateTotals(principal, term, rate) {

    //calculate monthly payment
    let monthlyPayment = (principal * (rate / 1200)) / (1 - Math.pow((1 + rate / 1200), -term));

    //calculate total cost
    let totalCost = monthlyPayment * term;

    //calculate total interest
    let totalInterest = totalCost - principal;

    let loanTotals = {
        monthlyPayment: monthlyPayment,
        totalCost: totalCost,
        totalInterest: totalInterest
    };

    return loanTotals;
}

// Display total for the loan
function displayTotals(monthlyPayment, principal, interest, cost) {

    let formatOptions = {
        style: 'currency',
        currency: 'USD'
    };

    document.getElementById('monthlyPayments').textContent = monthlyPayment.toLocaleString('en-US', formatOptions);

    document.getElementById('totalPrincipal').textContent = principal.toLocaleString('en-US', formatOptions);

    document.getElementById('totalInterest').textContent = interest.toLocaleString('en-US', formatOptions);

    document.getElementById('totalCost').textContent = cost.toLocaleString('en-US', formatOptions);
}

// calculate each month of payments in table
function calculatePayments(term, monthlyPayment, principal, rate) {
    //create for loop to calculate every month of payments

    let remainingBalance = principal;
    let totalInterest = 0;
    let paymentsArray = [];

    for (let month = 1; month <= term; month = month + 1) {

        //calculate each column of table
        let interestPayment = remainingBalance * (rate / 1200);

        let principalPayment = monthlyPayment - interestPayment;

        totalInterest += interestPayment;

        remainingBalance -= principalPayment;

        //create an object to store values

        let loanPayment = {
            month: month,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            totalInterest: totalInterest,
            balance: remainingBalance
        };

        //put object in array
        paymentsArray.push(loanPayment);

    }

    //return array
    return paymentsArray;

}

// Display each month of payments in the table
function displayPayments(payments) {

    const formatOptions = {
        style: 'currency',
        currency: 'USD'
    };

    const tableRowTemplate = document.getElementById('loan-row-template');
    const paymentsTable = document.getElementById('breakdown-table');

    paymentsTable.innerHTML = ''; //empty out table contents before making new rows

    for (let i = 0; i < payments.length; i = i + 1) {

        let currentMonthPayment = payments[i];

        let tableRow = tableRowTemplate.content.cloneNode(true); //copy the tr element from the template

        let tableCells =  tableRow.querySelectorAll('td'); //gets ALL the td elements inside of the tr we just copied

        tableCells[0].textContent = currentMonthPayment.month;
        tableCells[1].textContent = currentMonthPayment.payment.toLocaleString('en-US', formatOptions);
        tableCells[2].textContent = currentMonthPayment.principal.toLocaleString('en-US', formatOptions);
        tableCells[3].textContent = currentMonthPayment.interest.toLocaleString('en-US', formatOptions);
        tableCells[4].textContent = currentMonthPayment.totalInterest.toLocaleString('en-US', formatOptions);
        tableCells[5].textContent = Math.abs(currentMonthPayment.balance).toLocaleString('en-US', formatOptions);

        if(i == payments.length - 1) {
            tableRow.querySelector('tr').classList.add('table-success');
        }        
        
        paymentsTable.appendChild(tableRow);

    }

}


