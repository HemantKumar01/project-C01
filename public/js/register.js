const reg_form = document.querySelector("form#register");
const email = reg_form.querySelector("input[type=email]");
const passwords = reg_form.querySelectorAll("input[type=password]");
const password_matching_status = reg_form.querySelector("#password-matching");

//checking both password and confirm password have same input
passwords[1].oninput = () => {
  password_matching_status.className = "";
  if (passwords[1].value == passwords[0].value) {
    password_matching_status.innerHTML = `<i class='fa fa-check'></i>`;
  } else {
    password_matching_status.innerHTML = `Passwords do not match`;
    password_matching_status.className = "error";
  }
};

reg_form.onsubmit = (e) => {
  e.preventDefault();
  if (passwords[1].value != passwords[0].value) {
    alert("Password and Confirmed Password do not match!");
    return;
  }
  firebase.registerUser(email.value, password.value);
};
