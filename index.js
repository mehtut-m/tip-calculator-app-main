document.addEventListener('DOMContentLoaded', () => {
    console.log("Application Started")
    
    const tipRateButton = document.querySelectorAll('button').forEach(element => element.addEventListener('click', getTipRate))

    let test = document.querySelectorAll('input[type=number]').forEach(element => element.addEventListener('keyup', calculateTip));

    document.querySelector('.reset-button').addEventListener('click', resetAmount);
    function getTipRate() {
        clearActiveRate();
        this.classList.toggle('active-rate');
        return this.value;
    }
    function clearActiveRate() {
        let tips =  document.querySelectorAll('.tip-rate');
        tips.forEach(element => element.classList.remove('active-rate'));
    }
    function calculateTip(billAmount, tipRate, peopleCount) {
        test = document.querySelector('.bill-amount');
        billAmount = parseInt(document.querySelector('.bill-amount').value);    
        peopleCount = parseInt(document.querySelector('.people-count').value)
        tipRate = 1+ (5/100);
        let grandTotal = billAmount * tipRate;
        per = grandTotal/peopleCount
        console.log(grandTotal)
        console.log('Per: ' + per);
        updateAmount(grandTotal, per)
    }
    function updateAmount(totalAmount, perPerson) {
        //Update the calculated amount
        document.querySelector('.tip-amount').textContent = totalAmount.toFixed('2');
        document.querySelector('.total-amount').textContent = perPerson.toFixed('2')
    }
    function resetAmount() {
        //Clear the display tip amount
        document.querySelector('.tip-amount').textContent = '0.00';
        document.querySelector('.total-amount').textContent = '0.00';
    }
})