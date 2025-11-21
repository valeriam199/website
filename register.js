
const form = document.getElementById('reg-form')
const password = document.getElementById('reg-password');
const confPassword = document.getElementById('conf-password');
const birthDateInput = document.getElementById('reg-date');

function calculateAge(){
    const birthDate = new Date(birthDateInput.value);
    const today = new Date();
    let age = (today - birthDate) / (1000*60*60*24*365.25);
    return age;
}

function matchPassword(){
    if(password.value && confPassword.value){
        if(password.value !== confPassword.value){
            confPassword.setCustomValidity("Die Passwörter stimmen nicht überein");
        }
        else{
            confPassword.setCustomValidity("");
        }
    }
}

birthDateInput.addEventListener("change", function(){
    const age = calculateAge();
    if(age < 18){
        birthDateInput.setCustomValidity("Du musst mindestens 18 Jahre alt sein");
        } 
    else if(age > 111){
        birthDateInput.setCustomValidity("Bist du nicht ein bisschen alt, um noch zu leben?");
    }
    else {
        birthDateInput.setCustomValidity("");
    }
})

password.addEventListener('input', function() {
     matchPassword();
});
    
confPassword.addEventListener('input', function() {
    matchPassword();
});

form.addEventListener("submit", function(event){
    matchPassword();

    const age = calculateAge();
    if(age<18){
        birthDateInput.setCustomValidity("Du musst mindestens 18 Jahre alt sein");
    }

    if(!form.checkValidity()){
        event.preventDefault();
        form.classList.add("was-validated");
    }
});

