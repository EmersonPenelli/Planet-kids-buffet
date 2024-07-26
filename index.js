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

// CRUD

document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const mensagem = document.getElementById("mensagem").value;

    const contato = {
      nome,
      email,
      telefone,
      mensagem,
    };

    // Create
    let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
    contatos.push(contato);
    localStorage.setItem("contatos", JSON.stringify(contatos));
    event.target.reset(); // Limpa o formulário

    // Read
    const contatosList = document.createElement("ul");
    contatos.forEach((contato, index) => {
      const contatoItem = document.createElement("li");
      contatoItem.innerHTML = `
      <strong>${contato.nome}</strong> - ${contato.email} - ${contato.telefone} - ${contato.mensagem}
      <button onclick="deleteContato(${index})">Deletar</button>
      <button onclick="editContato(${index})">Editar</button>
    `;
      contatosList.appendChild(contatoItem);
    });
    document.getElementById("more-info").appendChild(contatosList);
  });

function deleteContato(index) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.splice(index, 1);
  localStorage.setItem("contatos", JSON.stringify(contatos));
  location.reload(); // Recarrega a página para atualizar a lista
}

function editContato(index) {
  let contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  const contato = contatos[index];

  document.getElementById("nome").value = contato.nome;
  document.getElementById("email").value = contato.email;
  document.getElementById("telefone").value = contato.telefone;
  document.getElementById("mensagem").value = contato.mensagem;

  contatos.splice(index, 1); // Remove o contato atual para atualizar
  localStorage.setItem("contatos", JSON.stringify(contatos));
}
