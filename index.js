document.addEventListener('DOMContentLoaded', () => {
    console.log("Application Started")
    //
    const tipRateButton = document.querySelectorAll('.tip-rate').forEach(element => element.addEventListener('click', activeTipRate))
    //Initiate Application on pressing key
    document.querySelectorAll('input[type=number]').forEach(element => element.addEventListener('keyup', initiateApp));
    
    //add reset functopn to reset button
    document.querySelector('.reset-button').addEventListener('click', resetAmount);
    
    resetDisable();

    //alert user if the people is less than or equal to zero
    document.querySelector('.people-count').addEventListener('focusout', () => {
        let target = document.querySelector('.people-count');
        let errorMessageTarget = document.querySelector('.error-message');

        if (parseInt(target.value) <= 0 || target.value == "") {
            target.style.border = "1px solid red";
            errorMessageTarget.textContent = "Can't be zero";
        }
        else {
            target.style.border = "none";
            errorMessageTarget.textContent = "";
        }
    })

    //Main Calculator Control 
    function initiateApp () {
        console.log('Calculating')
        resetEnable();
        let billAmount = getPrice();    
        let peopleCount = parseInt(getPeople());
        let tipRate = getTipRate();
        
        // console.log(billAmount)
        // console.log(peopleCount)
        // console.log(tipRate)

        if(inputVerify(billAmount, peopleCount, tipRate) && peopleCount >= 0) {
            //start calculation
            console.log("ini")
            let calcAmount = calculateTip(billAmount, peopleCount, tipRate.value);
            //update ui
            updateAmount(calcAmount.grandTotal, calcAmount.amountPerPerson)
        }
        return ;
    }


    function activeTipRate() {
        clearActiveRate();
        this.classList.toggle('active-rate');
        initiateApp();
    }
    function getPrice() {
        return document.querySelector('.bill-amount').value;
    }
    function getPeople() {

        return document.querySelector('.people-count').value;
    }
    function getTipRate() {
        return document.querySelector('.active-rate');
    }


    
    function inputVerify (billAmount, peopleCount, tipRate) {
        if (billAmount == null || billAmount == undefined || billAmount == "") {
            return false
        }
        else if (peopleCount == null || peopleCount == undefined || peopleCount == "" ) {
            
            return false
        }
        else if (tipRate == undefined || tipRate == null) {
            return false
        }
        else if (tipRate.value == "") {
            return false

        }
        return true;
    }
    function resetEnable () {
        document.querySelector('.reset-button').disabled = false;
    }
    function resetDisable () {
        document.querySelector('.reset-button').disabled = true;
    }

    function calculateTip(billAmount, peopleCount, tipRate) {
        billAmount = parseInt(billAmount);    
        peopleCount = parseInt(peopleCount);
        tipRate = parseInt(tipRate);
        
        let grandTotal = billAmount * (1 + tipRate/100);
        let amountPerPerson = grandTotal/peopleCount
        
        return {
            grandTotal: grandTotal,
            amountPerPerson: amountPerPerson
        }
    }

    //Update the User Interface
    function clearActiveRate() {
        let tips =  document.querySelectorAll('.tip-rate');
        tips.forEach(element => element.classList.remove('active-rate'));
    }

    function updateAmount(totalAmount, perPerson) {
        //Update the calculated amount
        let tip = document.querySelector('.tip-amount')
        let total = document.querySelector('.total-amount')
        
        if(totalAmount == NaN || tip == undefined) {
            return false;
        }
        tip.textContent = totalAmount.toFixed('2');
        total.textContent = perPerson.toFixed('2');
    }
    function resetAmount() {
        //Clear the display tip amount
        document.querySelector('.tip-amount').textContent = '0.00';
        document.querySelector('.total-amount').textContent = '0.00';
        clearActiveRate();
        resetDisable();
    }
})