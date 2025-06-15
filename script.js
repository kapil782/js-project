document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const resultDiv = document.getElementById("result");

  // ✅ Embed the data directly instead of loading from data.json
  const peopleData = [
    { name: "Kapil", age: 25, location: "Darwin" },
    { name: "Aisha", age: 22, location: "Sydney" },
    { name: "John", age: 30, location: "Melbourne" }
  ];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputName = document.getElementById("nameInput").value.trim().toLowerCase();

    const person = peopleData.find(p => p.name.toLowerCase() === inputName);

    if (person) {
      resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${person.name}</p>
        <p><strong>Age:</strong> ${person.age}</p>
        <p><strong>Location:</strong> ${person.location}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>No match found for <strong>${inputName}</strong>.</p>`;
    }
  });
});
