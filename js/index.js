document.addEventListener("DOMContentLoaded", function () {
  let contentDiv = document.getElementById("content");

  let button = document.createElement("a");
  button.href = "https://hapy.com.br/blog/detalhe/melhores-buffets-infantis-sp";
  button.target = "_blank";
  button.textContent =
    "Veja! Estamos avaliados como um dos melhores buffets de São Paulo!";
  button.className = "cta-button-link";

  let buttonDiv = document.createElement("div");
  buttonDiv.className = "cta-button";

  buttonDiv.appendChild(button);
  contentDiv.appendChild(buttonDiv);
});
