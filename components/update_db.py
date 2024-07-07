from flask import Blueprint, request, jsonify
import mysql.connector

update_app = Blueprint("update_app", __name__)

DB_HOST = "localhost"
DB_USER = "Alex"
DB_PASSWORD = "B2ornt2b@!@"
DB_NAME = "employee_db"


def connect_db():
    return mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )


@update_app.route("/update-employee", methods=["POST"])
def update_employee():
    data = request.get_json()
    email = data["email"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    department = data["department"]
    salary = data["salary"]

    conn = connect_db()
    cursor = conn.cursor(dictionary=True)

    update_query = """
    UPDATE employees
    SET first_name=%s, last_name=%s, department=%s, salary=%s
    WHERE email=%s
"""

    cursor.execute(update_query, (first_name, last_name, department, salary, email))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"success": True, "message": "Employee updated successfully!"})
