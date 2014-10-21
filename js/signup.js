/*
 Signup Form Script
 This script will load the state select list and validate the form before submission
 */

"use strict";

function onReady() {
    var signupForm = document.getElementById('signup');
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

    var ocList = document.getElementById('occupation');
    var otherInput = document.getElementById('occupationOther');
    ocList.addEventListener('change',function(){
       if(ocList.value == "other" ){
            otherInput.style.display = "block";
       }else{
           otherInput.style.display = "none";
       }
    });

    signupForm.addEventListener('submit', onSubmit);

}

document.addEventListener('DOMContentLoaded', onReady);

function onSubmit(evt) {

}


