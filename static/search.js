import { deleteEmployee } from "./delete.js";
import { updateEmployee } from "./update.js";

document
  .getElementById("employee-search")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const searchName = document.getElementById("search-name").value;

    fetch("/search-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: searchName }),
    })
      .then((response) => response.json())
      .then((data) => {
        const searchResults = document.getElementById("search-results");
        if (data.success) {
          console.log(data.message);
          const employees = data.employees;
          console.log(employees);
          searchResults.innerHTML = "<h3>Search Results:</h3><ul>";
          employees.forEach((employee) => {
            searchResults.innerHTML += `<div>
            <label><h2>Name:</h2></label>${employee.first_name} ${employee.last_name}<br>
            <label><h2>Email:</h2></label>${employee.email}<br>
            <label><h2>Department:</h2></label>${employee.department}<br>
            <label><h2>Salary:</h2></label>${employee.salary}
            <br><br>
            <button onclick="deleteEmployee('${employee.email}')">Delete</button>
            <button onclick="updateEmployee('${employee.email}', '${employee.first_name}', '${employee.last_name}', '${employee.department}', '${employee.salary}')">Update</button>
            </div>
            <hr>
            `;
          });
          searchResults.innerHTML += "</ul>";
        } else {
          searchResults.innerHTML = "<h1>No employee by that Name.</h1>";
          console.log(data.message);
        }
      })
      .catch((error) => {
        const searchResults = document.getElementById("search-results");
        searchResults.textContent = "An error occurred: " + error.message;
      });
  });
