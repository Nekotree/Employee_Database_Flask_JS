import mysql.connector

DB_HOST = "localhost"
DB_USER = "Alex"
DB_PASSWORD = "B2ornt2b@!@"
DB_NAME = "employee_db"


def create_database():
    conn = mysql.connector.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD)
    c = conn.cursor()

    c.execute("CREATE DATABASE IF NOT EXISTS employee_db")
    c.execute("USE employee_db")
    c.execute(
        """
    CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL 
    )
"""
    )

    c.execute(
        """
        ALTER TABLE employees
        ADD COLUMN salary INT NOT NULL AFTER department
"""
    )

    conn.commit()
    c.close()
    conn.close()


if __name__ == "__main__":
    create_database()

# Connects to the employee.db SQLite database.
# Creates a cursor to execute SQL commands.
# Executes an SQL statement to create the employees table if it doesn't exist, with columns for id, first_name, last_name, email, and department.
# Commits the transaction to save the changes.
# Closes the connection to the database.
