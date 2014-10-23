/*
 Signup Form Script
 This script will load the state select list and validate the form before submission
 */

"use strict";
var ocList = document.getElementById('occupation');
var otherInput = document.getElementById('occupationOther');
var signupForm = document.getElementById('signup');


function onReady() {
    
    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function(){
        if(window.confirm("Are you really sure you want ot leave?")){
            window.location = 'http://www.google.com';
        }
    });

    var statesList = document.getElementById('state');
    usStates.forEach(function (state) {
            var stateLi = document.createElement('option');
            stateLi.value = state.code;
            stateLi.innerHTML = state.name;
            statesList.appendChild(stateLi);
        }
    );
    var isOther = false;

    ocList.addEventListener('change',function(){
       if(ocList.value == "other" ){
            otherInput.style.display = "block";
            isOther = true;
       }else{
           otherInput.style.display = "none";
           isOther = false;
       }
    });

    signupForm.addEventListener('submit', onSubmit);
     
}



function onSubmit(evt) {

    var valid = validateForm(this);
    
    if(!validateForm(this)){
        evt.preventDefault();
        evt.returnValue = false;
        return false;
    }


    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;

 }


function calculateAge(dob){
    dob = new Date(dob);
    var today = new Date();

   var yearsDiff=today.getFullYear()- dob.getFullYear();
   var monthsDiff= today.getUTCMonth() - dob.getUTCMonth() ;
   var daysDiff = today.getUTCDate() - dob.getUTCDate() ;

    if(monthsDiff < 0 ||( 0 == monthsDiff && daysDiff < 0 )){
        yearsDiff--;
    }

    return yearsDiff;
}


function showError(message, isError){

    var BdayMessage = document.getElementById('birthdateMessage');
    console.log(message);
    BdayMessage.innerHTML = message;
    BdayMessage.className = isError ? 'alert alert-danger' :'alert alert-success';
    BdayMessage.style.display = 'block';
}

function validateForm(form){
    var dob = birthdate.value;
    var age = calculateAge(dob);
    var zipNum = document.getElementById('zip').value;
    var zipRegExp = new RegExp('^\\d{5}$');

    var valid = true;
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state','zip', 'birthdate'];
    var idx;

    for (idx = 0; idx < requiredFields.length; idx ++) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    if (ocList.value == 'other') {
        valid &= validateRequiredField(form.elements['occupationOther']);
    }

    
    valid &= zipRegExp.test(zipNum);
    
   
    
    if(age<13){
        showError("You must be at least 13 years ago! " , true);
        birthdate.className = 'form-control invalid';
        valid &= false;
    }
    
    return valid;

}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;
    

    if (valid) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid';
    }
    return valid;
} 



document.addEventListener('DOMContentLoaded', onReady);



