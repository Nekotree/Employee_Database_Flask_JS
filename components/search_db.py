from flask import Blueprint, request, jsonify, render_template
import mysql.connector

search_app = Blueprint("search_app", __name__)

DB_HOST = "localhost"
DB_USER = "Alex"
DB_PASSWORD = "B2ornt2b@!@"
DB_NAME = "employee_db"


def connect_db():
    return mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )


@search_app.route("/search")
def search():
    return render_template("search.html")


@search_app.route("/search-employee", methods=["POST"])
def search_employee():
    data = request.json
    search_name = data.get("name")

    conn = connect_db()
    c = conn.cursor(dictionary=True)

    c.execute(
        """
        SELECT first_name, last_name, email, department, salary
        FROM employees
        WHERE first_name LIKE %s OR last_name LIKE %s
""",
        (f"%{search_name}%", f"%{search_name}%"),
    )

    employees = c.fetchall()
    c.close()
    conn.close()

    if employees:
        response = {
            "success": True,
            "employees": employees,
            "message": "Employee found!",
        }
    else:
        response = {"success": False, "message": "No employees found"}

    return jsonify(response)
