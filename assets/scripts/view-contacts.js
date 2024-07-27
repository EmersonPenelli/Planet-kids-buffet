document.addEventListener("DOMContentLoaded", function () {
  const contactsContainer = document.getElementById("contacts-container");
  const searchInput = document.getElementById("search");

  function displayContacts(contacts) {
    contactsContainer.innerHTML = "";
    if (contacts.length === 0) {
      contactsContainer.innerHTML =
        "<p class='text-center'>Nenhum contato encontrado.</p>";
      return;
    }
    contacts.forEach((contact, index) => {
      const contactItem = document.createElement("div");
      contactItem.className = "list-group-item list-group-item-action";
      contactItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${contact.nome}</h5>
          <small>
            <button class="btn btn-danger btn-sm" onclick="deleteContato(${index})">Deletar</button>
            <button class="btn btn-primary btn-sm" onclick="editContato(${index})" data-bs-toggle="modal" data-bs-target="#editModal">Editar</button>
          </small>
        </div>
        <p class="mb-1">${contact.email}</p>
        <small>${contact.telefone} - ${contact.mensagem}</small>
      `;
      contactsContainer.appendChild(contactItem);
    });
  }

  function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem("contatos")) || [];
    displayContacts(contacts);
  }

  searchInput.addEventListener("input", function (event) {
    const query = event.target.value.toLowerCase();
    let contacts = JSON.parse(localStorage.getItem("contatos")) || [];
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.nome.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    );
    displayContacts(filteredContacts);
  });

  loadContacts();

  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const index = document.getElementById("editIndex").value;
      let contacts = JSON.parse(localStorage.getItem("contatos")) || [];

      contacts[index] = {
        nome: document.getElementById("editNome").value,
        email: document.getElementById("editEmail").value,
        telefone: document.getElementById("editTelefone").value,
        mensagem: document.getElementById("editMensagem").value,
      };

      localStorage.setItem("contatos", JSON.stringify(contacts));
      loadContacts();
      var editModal = bootstrap.Modal.getInstance(
        document.getElementById("editModal")
      );
      editModal.hide();
    });
});

function deleteContato(index) {
  let contacts = JSON.parse(localStorage.getItem("contatos")) || [];
  contacts.splice(index, 1);
  localStorage.setItem("contatos", JSON.stringify(contacts));
  location.reload();
}

function editContato(index) {
  let contacts = JSON.parse(localStorage.getItem("contatos")) || [];
  const contact = contacts[index];

  document.getElementById("editNome").value = contact.nome;
  document.getElementById("editEmail").value = contact.email;
  document.getElementById("editTelefone").value = contact.telefone;
  document.getElementById("editMensagem").value = contact.mensagem;
  document.getElementById("editIndex").value = index;
}
