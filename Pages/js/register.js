/* to check register information */
function regCheck() {
    let email = $('#email').val();
    if(!checkEmail(email)) {
        alert("Email address is not valid.");
        document.getElementById("emailAlert").innerHTML="Please enter a valid email.";
        return false;
    }

    let username = $('#username').val();

    let pw1 = $('firstPass').val();
    let pw2 = $('confirmPass').val();
    if(!checkPwd(pw1, pw2)){
        alert("The two password are not same.");
        document.getElementById("passAlert2").innerHTML="The two password are not same.";
        return false;
    }

    let emailInfo = {
        email: email,
        username: username
    };
    
    $.post("/register/sendCode", emailInfo, function (res) {
        alert(res);
        /* to do */
    })
}

function checkEmail(email) {
    let emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailFormat.test(email);
}

function checkPwd(pw1, pw2) {
    return pw1 == pw2;
}