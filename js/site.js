



function getValues() {

    let a = document.getElementById('loanAmount').value;
    let b = document.getElementById('monthsAmount').value;
    let c = document.getElementById('interestAmount').value;

    a = parseFloat(a);
    b = parseInt(b);
    c = parseFloat(c);

    topTableData(a, b, c);
   

}

function displayData() {







}

function topTableData(loanAmount, term, interestRate) {

    let totalPayment = loanAmount * (interestRate / 1200) / (1 - (1 + interestRate / 1200) ** -term);
    let totalPrincipal = loanAmount
    let totalInterest = (loanAmount * (interestRate * 0.01))/term;
    let totalCost = loanAmount + totalInterest;
    
  
    document.getElementById('monthlyPayments').innerHTML = totalPayment;
    document.getElementById('totalPrincipal').innerHTML = totalPrincipal;
    document.getElementById('totalInterest').innerHTML = totalInterest;
    

  

    



}