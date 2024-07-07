from flask import Flask, request, jsonify, render_template
from components.search_db import search_app
from components.delete_app import delete_app
from components.update_db import update_app
import mysql.connector

app = Flask(__name__)

app.register_blueprint(search_app)
app.register_blueprint(delete_app)
app.register_blueprint(update_app)

DB_HOST = "localhost"
DB_USER = "Alex"
DB_PASSWORD = "B2ornt2b@!@"
DB_NAME = "employee_db"


def connect_db():
    return mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/update-employee", methods=["POST"])
def update_employee():
    data = request.json
    email = data.get("email")
    new_salary = data.get("salary")

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "UPDATE employees SET salary = %s WHERE email = %s", (new_salary, email)
        )
        conn.commit()
        response = {"success": True, "message": "Employee updated successfully!"}
    except Exception as e:
        conn.rollback()
        response = {"success": False, "message": str(e)}
    finally:
        cursor.close()
        conn.close()

    return jsonify(response)


@app.route("/submit-info", methods=["POST"])
def submit_info():
    data = request.json
    print("RIGHT HERE")
    print(data)

    if data.get("clearFields"):
        print("Fields cleared on the server side")
        return jsonify(
            {"success": True, "message": "Fields cleared on the server side asshole!"}
        )

    print("Received data", data)

    form_fields = ["first-name", "last-name", "email", "department", "salary"]
    form_data = {field: data.get(field) for field in form_fields}

    if not all(form_data.values()):
        return jsonify({"success": False, "message": "All fields are required"})

    first_name = form_data["first-name"]
    last_name = form_data["last-name"]
    email = form_data["email"]
    department = form_data["department"]
    salary = form_data["salary"]

    conn = connect_db()
    c = conn.cursor()

    c.execute(
        """
    INSERT INTO employees (first_name, last_name, email, department, salary)
    VALUES (%s, %s, %s, %s, %s)
""",
        (first_name, last_name, email, department, salary),
    )

    conn.commit()
    c.close()
    conn.close()

    response = {"success": True, "message": "Form submitted successfully!"}

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
