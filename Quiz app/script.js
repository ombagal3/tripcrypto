const  email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const signin_button = document.getElementById("signin-button");

const currentUser = {
    email : "Admin@gmail.com",
    password :"Admin@1234",

}
const signInUser = () => {
     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    

     // Convert to variable name 
     const email = email_input.value;
     const password = password_input.value;

if(regex.test(email) && strongPasswordRegex.test(password)){
    if(email == currentUser.email && password == currentUser.password){
      alert("sign in successfully !");
          signin_button.href = "Quiz.html";
     }else {
        alert("Wrong email & password !!");
 }
} else {
    alert("Invalid credential !");

}

};
   signin_button.addEventListener("click", signInUser);
