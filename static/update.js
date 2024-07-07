export const updateEmployee = (
  email,
  firstName,
  lastName,
  department,
  salary
) => {
  console.log("updateEmployee loaded!");

  document.getElementById("update-first-name").value = firstName;
  document
    .getElementById("update-first-name")
    .setAttribute("original", firstName);
  document.getElementById("update-last-name").value = lastName;
  document
    .getElementById("update-last-name")
    .setAttribute("original", lastName);
  document.getElementById("update-email").value = email;
  document.getElementById("update-email").setAttribute("original", email);
  document.getElementById("update-department").value = department;
  document
    .getElementById("update-department")
    .setAttribute("original", department);
  document.getElementById("update-salary").value = salary;
  document.getElementById("update-salary").setAttribute("original", salary);

  document.getElementById("update-employee-form").style.display = "block";
};

document.addEventListener("DOMContentLoaded", () => {
  const updateForm = document.getElementById("update-employee-form");
  if (updateForm) {
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const orginalEmployee = {
        first_name: document
          .getElementById("update-first-name")
          .getAttribute("original"),
        last_name: document
          .getElementById("update-last-name")
          .getAttribute("original"),
        email: document.getElementById("update-email").getAttribute("original"),
        department: document
          .getElementById("update-department")
          .getAttribute("original"),
        salary: document
          .getElementById("update-salary")
          .getAttribute("original"),
      };

      const updatedEmployee = {
        first_name: document.getElementById("update-first-name").value,
        last_name: document.getElementById("update-last-name").value,
        email: document.getElementById("update-email").value,
        department: document.getElementById("update-department").value,
        salary: document.getElementById("update-salary").value,
      };

      const isModified = Object.keys(updatedEmployee).some(
        (key) => updatedEmployee[key] !== orginalEmployee[key]
      );

      console.log(isModified);

      if (!isModified) {
        alert("At least one field must be modified to update the employee.");
        return;
      }

      console.log("Updated Employee:", updatedEmployee);

      fetch("/update-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Update response:", data);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    });
  } else {
    console.error("Update form not found");
  }
});

window.updateEmployee = updateEmployee;
