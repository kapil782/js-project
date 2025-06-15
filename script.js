// Wait until the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the form and the div where results will be displayed
  const form = document.getElementById("searchForm");
  const resultDiv = document.getElementById("result");

  // Data embedded directly in the script representing people information
  const peopleData = [
    { name: "Kapil", age: 25, location: "Darwin" },
    { name: "Aisha", age: 22, location: "Sydney" },
    { name: "John", age: 30, location: "Melbourne" }
  ];

  // Add a submit event listener to the form
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission (page reload)
    event.preventDefault();

    // Get the entered name from the input, trim spaces, and convert to lowercase for case-insensitive search
    const inputName = document.getElementById("nameInput").value.trim().toLowerCase();

    // Search for a person in the data whose name matches the input
    const person = peopleData.find(p => p.name.toLowerCase() === inputName);

    // If person found, display their info; otherwise show "No match found" message
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
