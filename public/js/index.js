const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("email="))
  ?.split("=")[1];

document.querySelector("#login-id").textContent = `Logged in as ${cookieValue}`;
