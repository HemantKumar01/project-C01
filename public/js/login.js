const login_form = document.querySelector("form#login");
const email = login_form.querySelector("input[type=email]");
const passwords = login_form.querySelectorAll("input[type=password]");

login_form.onsubmit = (e) => {
  e.preventDefault();
  login_form.querySelector(".loader").style.display = "flex";
  firebase.signInUser(email.value, password.value);
};
