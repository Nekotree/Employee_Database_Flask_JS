export const deleteEmployee = (email) => {
  console.log("delete.js loaded");
  const confirmation = confirm(
    "Are you sure you want to delete this empoloyee?"
  );
  if (confirmation) {
    fetch("/delete-employee", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Employee deleted successfully!");
          document
            .getElementById("employee-search")
            .dispatchEvent(new Event("submit"));
        } else {
          alert("Error deleting employee: " + data.message);
        }
      })
      .catch((error) => {
        alert("An error occurred: " + error.message);
      });
  }
};

window.deleteEmployee = deleteEmployee;
