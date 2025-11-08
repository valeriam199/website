//Variables
const form = document.getElementById("reg-form");
const submitButton = document.querySelector("button[type='submit']");

const namefield = document.getElementById("reg-name");
const namePattern = /^[a-zA-Z]+, [a-zA-Z]+/;
const nameError = document.getElementById("name-error");

const mailfield = document.getElementById("reg-mail");
const mailPattern = /^[a-zA-Z0-9.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;
const mailError = document.getElementById("mail-error");

const numberfield = document.getElementById("reg-number");
const numberPattern = /^(?:\+?\d{1,3}[\s-]?)?(?:\d{3,4}[\s-]?\d{5,8})$/
const numberError = document.getElementById("number-error");

const datefield = document.getElementById("reg-date");
const dateError = document.getElementById("date-error");

const passwordfield = document.getElementById("reg-password");
const passwordPattern = /.{8,}/;
const passwordError = document.getElementById("password-error");
const confPasswordfield = document.getElementById("conf-password");
const confPasswordError = document.getElementById("confpassword-error");

const urlfield = document.getElementById("reg-url");
const urlPattern = /^www\.[a-zA-Z\-]+\.[a-zA-Z]+[a-zA-Z\-\\/]/;
const urlError = document.getElementById("url-error");

const checkbox = document.getElementById("Datenschutz");
const checkboxError = document.getElementById("checkbox-error");

//Controll-function
function checkName(namefield, namePattern, nameError){
    if (namefield.value == ""){
        nameError.textContent = "Bitte gib deinen Namen ein" ; 
    }
    else if (!namePattern.test(namefield.value)){
        nameError.textContent = "Bitte gib deinen Namen im Format 'Nachname, Vorname' ein";
    }
    else{
        nameError.textContent = "";
    }
}

function checkMail(mailfield, mailPattern, mailError){
    if (mailfield.value == ""){
        mailError.textContent = "Bitte gib deine E-Mail ein";
    }
    else if (!mailPattern.test(mailfield.value)){
        mailError.textContent = "Bitte gib eine gültige E-Mail ein";
    }
    else{
        mailError.textContent = "";
    }
}

function checkNumber(numberfield, numberPattern, numberError){
    if(!numberPattern.test(numberfield.value)){
        numberError.textContent = "Bitte gib eine gültige Telefonnummer ein";
    }
    else{
        numberError.textContent = "";
    }
}

function checkDate(datefield, dateError){
    const birthDate = new Date(datefield.value);
    const today = new Date();
    if ((today - birthDate) < 18*1000*60*60*24*365){
        dateError.textContent = "Du musst mindestens 18 Jahre sein";
    } else {
        dateError.textContent = "";
    }
}

function checkPassword(passwordfield, passwordPattern, confPasswordfield, passwordError, confPasswordError){
    if (passwordfield.value == ""){
        passwordError.textContent = "Bitte gib ein Passwort ein";
    }
    else if (!passwordPattern.test(passwordfield.value)){
        passwordError.textContent = "Das Passwort muss mind. 8 Zeichen beinhalten";
    }
    else{
        passwordError.textContent = "";
    }

    if (passwordfield.value !== confPasswordfield.value){
        confPasswordError.textContent = "Die Passwörter stimmen nicht überein";
    }
    else{
        confPasswordError.textContent = "";
    }
}

function checkUrl(urlfield, urlPattern, urlError){
    if (!urlPattern.test(urlfield.value)){
        urlError.textContent = "Bitte gib eine gültige URL ein";
    }
    else{
        urlError.textContent = "";
    }
}

function checkCheckbox(checkbox){
    if (!checkbox.checked){
        checkboxError.textContent = "Bitte stimme den Datenschutzrichtlinien zu";
    }
    else{
        checkboxError.textContent = "";
    }
}

//submit-button blocker
function updateSubmitButton(){
    if(
       nameError.textContent !== "" ||
       mailError.textContent !== "" ||
       numberError.textContent !== "" ||
       dateError.textContent !== "" ||
       passwordError.textContent !== "" ||
       confPasswordError.textContent !== ""||
       urlError.textContent !== "" ||
       checkboxError.textContent !== "" ||
       namefield.value == "" ||
       mailfield.value == "" ||
       datefield.value == "" ||
       passwordfield.value == "" ||
       confPasswordfield.value == ""  
    ){
        submitButton.disabled = true;
        console.log("Button disabled");
    } 
    else{
        submitButton.disabled = false;
        console.log("Button enabled"); 
    }
}

//Live-Check
namefield.addEventListener("input", function(){
    checkName(namefield, namePattern, nameError);
    updateSubmitButton();
});

mailfield.addEventListener("input", function(){
    checkMail(mailfield, mailPattern, mailError);
    updateSubmitButton();
});

numberfield.addEventListener("input", function(){
    checkNumber(numberfield, numberPattern, numberError);
    updateSubmitButton();
});

datefield.addEventListener("input", function(){
    checkDate(datefield, dateError);
    updateSubmitButton();
});

passwordfield.addEventListener("input", function(){
    checkPassword(passwordfield, passwordPattern, confPasswordfield, passwordError, confPasswordError);
    updateSubmitButton();
});

confPasswordfield.addEventListener("input", function(){
    checkPassword(passwordfield, passwordPattern, confPasswordfield, passwordError, confPasswordError);
    updateSubmitButton();
});

urlfield.addEventListener("inout", function(){
    checkUrl(urlfield, urlPattern, urlError);
    updateSubmitButton();
});

checkbox.addEventListener("change", function(){
    checkCheckbox(checkbox, checkboxError);
    updateSubmitButton();
});


//Submit when everything checked
form.addEventListener("submit", function(e){
    e.preventDefault(); 

    checkName(namefield, namePattern, nameError);
    checkMail(mailfield, mailPattern, mailError);
    //checkNumber(numberfield, numberPattern, numberError);
    checkDate(datefield, dateError);
    checkPassword(passwordfield, passwordPattern, confPasswordfield, passwordError, confPasswordError);
    checkCheckbox(checkbox, checkboxError);

    if(
        nameError.textContent === "" &&
        mailError.textContent === "" &&
        numberError.textContent === "" &&
        dateError.textContent === "" &&
        passwordError.textContent === "" &&
        confPasswordError.textContent === "" &&
        urlError.textContent == "" &&
        checkbox.checked
    ){
        showPreview();
    }
});

updateSubmitButton();

window.addEventListener("load", function(){
    this.document.getElementById("reg-name").focus();
});


//preview
function showPreview(){
    // Name
      if(!document.getElementById("name-preview")) {
        let namePreview = document.createElement("span");
        namePreview.id = "name-preview";
        namePreview.textContent = namefield.value;
        namefield.parentNode.insertBefore(namePreview, namefield);
        namefield.style.display = "none";
    }

    // E-Mail
    if(!document.getElementById("mail-preview")) {
        let mailPreview = document.createElement("span");
        mailPreview.id = "mail-preview";
        mailPreview.textContent = mailfield.value;
        mailfield.parentNode.insertBefore(mailPreview, mailfield);
        mailfield.style.display = "none";
    }

    // Telefonnummer (optional)
    if(numberfield.value !== "" && !document.getElementById("number-preview")) {
        let numberPreview = document.createElement("span");
        numberPreview.id = "number-preview";
        numberPreview.textContent = numberfield.value;
        numberfield.parentNode.insertBefore(numberPreview, numberfield);
    }
    numberfield.style.display = "none";

    // Geburtsdatum
    if(!document.getElementById("date-preview")) {
        let datePreview = document.createElement("span");
        datePreview.id = "date-preview";
        datePreview.textContent = datefield.value;
        datefield.parentNode.insertBefore(datePreview, datefield);
        datefield.style.display = "none";
    }

    //Block password
    passwordfield.style.display = "none";
    confPasswordfield.style.display = "none";

    //url
    if(!document.getElementById("url-preview")){
        let urlPreview = document.createElement("span");
        urlPreview.id = "url-preview";
        urlPreview.textContent = urlfield.value;
        urlfield.parentNode.insertBefore(urlPreview, urlfield);
        urlfield.style.display = "none";
    }
}