export const updateEmployee = (
  email,
  firstName,
  lastName,
  department,
  salary
) => {
  sessionStorage.setItem("employeeEmail", email);
  sessionStorage.setItem("employeeFirstName", firstName);
  sessionStorage.setItem("employeeLastName", lastName);
  sessionStorage.setItem("employeeDepartment", department);
  sessionStorage.setItem("employeeSalary", salary);

  window.location.href = "/update";
};

document.addEventListener("DOMContentLoaded", () => {
  //Load employee details from sessionStorage
  //Keep original details
  const originalEmployee = {
    email: sessionStorage.getItem("employeeEmail"),
    first_name: sessionStorage.getItem("employeeFirstName"),
    last_name: sessionStorage.getItem("employeeLastName"),
    department: sessionStorage.getItem("employeeDepartment"),
    salary: sessionStorage.getItem("employeeSalary"),
  };

  document.getElementById("update-email").value = originalEmployee.email;
  document.getElementById("update-first-name").value =
    originalEmployee.first_name;
  document.getElementById("update-last-name").value =
    originalEmployee.last_name;
  document.getElementById("update-department").value =
    originalEmployee.department;
  document.getElementById("update-salary").value = originalEmployee.salary;

  const updateForm = document.getElementById("update-employee-form");
  if (updateForm) {
    updateForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const updatedEmployee = {
        first_name: document.getElementById("update-first-name").value,
        last_name: document.getElementById("update-last-name").value,
        email: document.getElementById("update-email").value,
        department: document.getElementById("update-department").value,
        salary: document.getElementById("update-salary").value,
      };

      //Check if at least one field is modified
      const isModified = Object.keys(updatedEmployee).some(
        (key) => updatedEmployee[key] !== originalEmployee[key]
      );

      if (!isModified) {
        alert("At least one field must be updated.");
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
          if (data.success) {
            alert("Employee updated successfully!");
            console.log("Update response:", data.message);
          } else {
            alert("Please enter a valid numeric salary.");
            console.log("Update response:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error with update:", error);
        });
    });
  } else {
    console.error("Update form not found");
  }
});

window.updateEmployee = updateEmployee;

// Orginal front end logic for checking for salary numeric input, however, was better dealt with on the server side
// const salaryInput = document.getElementById("update-salary").value;
// const isValidSalary = !isNaN(
//   parseFloat(salaryInput) && isFinite(salaryInput)
// );

// if (!isValidSalary) {
//   alert("Please enter a valid numeric salary.");
//   return;
// }
