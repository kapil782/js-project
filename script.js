document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const resultDiv = document.getElementById("result");
  const nameInput = document.getElementById("nameInput");
  const autocompleteList = document.getElementById("autocomplete-list");

  let peopleData = [];

  // Fetch data from people.json
  fetch("people.json")
    .then(response => response.json())
    .then(data => {
      peopleData = data;
    })
    .catch(error => {
      console.error("Error loading people data:", error);
    });

  // Autocomplete functionality
  nameInput.addEventListener("input", function () {
    const val = this.value;
    closeAllLists();
    if (!val) return false;

    const matches = peopleData.filter(person =>
      person.name.toLowerCase().includes(val.toLowerCase())
    );

    matches.forEach(match => {
      const item = document.createElement("div");
      item.textContent = match.name;
      item.addEventListener("click", function () {
        nameInput.value = this.textContent;
        closeAllLists();
      });
      autocompleteList.appendChild(item);
    });
  });

  function closeAllLists() {
    while (autocompleteList.firstChild) {
      autocompleteList.removeChild(autocompleteList.firstChild);
    }
  }

  document.addEventListener("click", function (e) {
    if (e.target !== nameInput) {
      closeAllLists();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputName = nameInput.value.trim().toLowerCase();

    if (!inputName) {
      resultDiv.innerHTML = `<p>Please enter a name to search.</p>`;
      return;
    }

    const person = peopleData.find(p => p.name.toLowerCase() === inputName);

    if (person) {
      resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${person.name}</p>
        <p><strong>Age:</strong> ${person.age}</p>
        <p><strong>Location:</strong> ${person.location}</p>
        <p><strong>Email:</strong> ${person.email}</p>
        <p><strong>Contact:</strong> ${person.contact}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>No match found for <strong>${nameInput.value}</strong>.</p>`;
    }
  });
});
