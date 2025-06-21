document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const resultDiv = document.getElementById("result");
  const nameInput = document.getElementById("nameInput");
  const autocompleteList = document.getElementById("autocomplete-list");

  let peopleData = [];

  // Load people.json
  fetch("people.json")
    .then(response => response.json())
    .then(data => {
      peopleData = data;
    })
    .catch(error => {
      console.error("Error loading people data:", error);
      resultDiv.innerHTML = `<p style="color:red;">Unable to load data. Please try again later.</p>`;
    });

  // Autocomplete suggestions
  nameInput.addEventListener("input", function () {
    const val = this.value.trim().toLowerCase();
    closeAllLists();
    if (!val) return;

    const matches = peopleData.filter(person =>
      person.name.toLowerCase().includes(val)
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
    if (e.target !== nameInput) closeAllLists();
  });

  // On form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputName = nameInput.value.trim().toLowerCase();

    if (!inputName) {
      resultDiv.innerHTML = `<p>Please enter a name to search.</p>`;
      return;
    }

    // Find exact match
    const person = peopleData.find(
      p => p.name.toLowerCase() === inputName
    );

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
