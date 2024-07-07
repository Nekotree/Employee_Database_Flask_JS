from flask import Blueprint, request, jsonify
import mysql.connector

delete_app = Blueprint("delete_app", __name__)

DB_HOST = "localhost"
DB_USER = "Alex"
DB_PASSWORD = "B2ornt2b@!@"
DB_NAME = "employee_db"


def connect_db():
    return mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )


@delete_app.route("/delete-employee", methods=["DELETE"])
def delete_employee():
    data = request.json
    email = data.get("email")

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM employees WHERE email = %s", (email,))
        conn.commit()
        response = {"success": True, "message": "Employee deleted successfully!"}
    except Exception as e:
        conn.rollback()
        response = {"success": False, "message": str(e)}
    finally:
        cursor.close()
        conn.close()

    return jsonify(response)
