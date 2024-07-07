document.getElementById("employee-info").addEventListener("submit", (event) => {
  event.preventDefault();

  const formElements = [
    "first-name",
    "last-name",
    "email",
    "department",
    "salary",
  ];
  const formData = {};

  for (let element of formElements) {
    formData[element] = document.getElementById(element).value;
  }

  fetch("/submit-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      const messageOutput = document.getElementById("message-output");
      if (data.success) {
        messageOutput.textContent = "Form submitted successfully!";
        messageOutput.style.color = "purple";
        console.log(data.message);
      } else {
        messageOutput.textContent = "There was an error submitting the form.";
        messageOutput.style.color = "red";
      }
    })
    .catch((error) => {
      const messageOutput = document.getElementById("message-output");
      messageOutput.textContent = "An error occured: " + error.message;
      messageOutput.style.color = "red";
    });
});

document.getElementById("clear-fields").addEventListener("click", () => {
  const formFields = [
    "first-name",
    "last-name",
    "email",
    "department",
    "salary",
  ];
  for (let field of formFields) {
    document.getElementById(field).value = "";
  }
  document.getElementById("message-output").innerText = "";

  const formData = { clearFields: true };
  fetch("/submit-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error("Error clearing fields:", error);
    });
});
