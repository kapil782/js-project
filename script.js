document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputName = document.getElementById("nameInput").value.trim().toLowerCase();

    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load JSON");
        }
        return response.json();
      })
      .then(data => {
        const person = data.find(p => p.name.toLowerCase() === inputName);

        if (person) {
          resultDiv.innerHTML = `
            <p><strong>Name:</strong> ${person.name}</p>
            <p><strong>Age:</strong> ${person.age}</p>
            <p><strong>Location:</strong> ${person.location}</p>
          `;
        } else {
          resultDiv.innerHTML = `<p>No match found for <strong>${inputName}</strong>.</p>`;
        }
      })
      .catch(error => {
        console.error("Error fetching JSON:", error);
        resultDiv.innerHTML = `<p>Error loading data. Please try again later.</p>`;
      });
  });
});
