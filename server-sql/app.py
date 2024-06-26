from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

connection = mysql.connector.connect(
    database="ynov_ci",
    user="ynov",
    password="pwd",
    port=3306,
    host="db"
)

@app.post('/user')
async def add_user(user_data: dict = Body(...)):
    try:
        cursor = connection.cursor()
        sql = "INSERT INTO Users (lastname, firstname, birthDate, zipCode, city, email) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (user_data['lastname'], user_data['firstname'], user_data['birthDate'], user_data['zipCode'], user_data['city'], user_data['email']))
        connection.commit()
        cursor.close()
        return {"message": "User added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/users')
async def get_users():
    try:
        cursor = connection.cursor(dictionary=True)
        sql = "SELECT * FROM Users"
        cursor.execute(sql)
        users = cursor.fetchall()
        cursor.close()
        print("Users : ", users)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete('/user')
async def delete_user(body: dict = Body(...)):
    try:
        print(body)
        if body['password'] != 'delete':
            raise HTTPException(status_code=401, detail="Unauthorized")
        cursor = connection.cursor()
        sql = "DELETE FROM Users WHERE id = %s"
        print("USER ID : %s", body['userId'])
        cursor.execute(sql, (body['userId'],))
        connection.commit()
        cursor.close()
        return { "message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))