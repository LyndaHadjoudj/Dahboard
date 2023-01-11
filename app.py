from flask import Flask,render_template,request
from flask import redirect
from flaskext.mysql import MySQL
from  flask import jsonify
from flask import make_response
import pandas as pd
import json
app = Flask(__name__)

mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] = 'db_university'

mysql.init_app(app)

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/api/data')
def doGetData():

	data = {"years": [], "datasets": []}

	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("SELECT DISTINCT annee FROM resultats")

	years_tuple = cursor.fetchall()
	years_list = [item[0] for item in years_tuple]
	data["years"] = years_list

	cursor.execute("SELECT DISTINCT specialite FROM resultats")

	specialite_tuple = cursor.fetchall()
	specialite_list = [item[0] for item in specialite_tuple]
	etud_list = []
	for specialite in specialite_list:
		for year in years_list:
			cursor.execute('SELECT count(matricule) FROM resultats WHERE annee = %s AND specialite = %s', (year, specialite,))
			student_tuple = cursor.fetchall()
			student_list = [item[0] for item in student_tuple]
			etud_list.append(int(" ".join(str(x) for x in student_list)))
		data["datasets"].append({"label": specialite, "data": etud_list})
		etud_list=[]

	data_JSON = json.dumps(data)
	return data_JSON\

@app.route('/api/data1')
def doGetData1():

	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("SELECT distinct specialite FROM resultats")

	specialite_tuple = cursor.fetchall()
	specialite_list = [item[0] for item in specialite_tuple]

	json_data = []
	for specialite in specialite_list:
		cursor.execute('SELECT count(matricule) FROM resultats WHERE specialite = %s', specialite,)
		student_tuple = cursor.fetchall()
		student_list = [item[0] for item in student_tuple]
		#json_data.append(student_list)
		json_data.append(int(" ".join(str(x) for x in student_list)))
	cursor.close()

	data_JSON = json.dumps(json_data)
	return data_JSON



@app.route('/api/data2')
def doGetData2():

	data = {"years": [], "datasets": []}

	conn = mysql.connect()
	cursor = conn.cursor()

	cursor.execute("SELECT DISTINCT annee FROM resultats")

	annee_tuple = cursor.fetchall()
	annee_list = [item[0] for item in annee_tuple]
	data["years"] = annee_list

	for annee in annee_list:
		cursor.execute("SELECT Distinct count(matricule) FROM resultats WHERE annee='" + str(annee) + "'")
		student_tuple = cursor.fetchall()
		student_list = [item[0] for item in student_tuple]
		data["datasets"].append({"label": annee, "data": student_list})

	data_JSON = json.dumps(data)
	return data_JSON

@app.route('/api/data3')
def doGetData3():

	data = {"years": [], "datasets": []}
	conn = mysql.connect()
	cursor = conn.cursor()

	cursor.execute("SELECT DISTINCT annee FROM resultats")

	annee_tuple = cursor.fetchall()
	annee_list = [item[0] for item in annee_tuple]
	data["years"] = annee_list

	for year in annee_list:
		cursor.execute('SELECT count(matricule) FROM resultats WHERE annee = %s AND moyenne >= %s', (year, str(10),))
		student_tuple = cursor.fetchall()
		student_list = [item[0] for item in student_tuple]
		data["datasets"].append({"label": year, "data": student_list})

	data_JSON = json.dumps(data)
	return data_JSON

@app.route('/api/data4')
def doGetData4():

	data = {"datasets": []}
	conn = mysql.connect()
	cursor = conn.cursor()

	cursor.execute("SELECT DISTINCT specialite FROM resultats")

	specialite_tuple = cursor.fetchall()
	specialite_list = [item[0] for item in specialite_tuple]

	for specialite in specialite_list:
		cursor.execute('SELECT count(matricule) FROM resultats WHERE sexe="H" AND specialite = %s', (specialite,))
		student_tuple = cursor.fetchall()
		student_list = [item[0] for item in student_tuple]
		data["datasets"].append({"label": specialite, "data": student_list})

	data_JSON = json.dumps(data)
	return data_JSON

@app.route('/api/data5')
def doGetData5():

	data = {"years": [], "datasets": []}

	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("SELECT DISTINCT annee FROM resultats")
	years_tuple = cursor.fetchall()
	years_list = [item[0] for item in years_tuple]
	data["years"] = years_list

	cursor.execute("SELECT DISTINCT specialite FROM resultats")
	specialite_tuple = cursor.fetchall()
	specialite_list = [item[0] for item in specialite_tuple]

	for specialite in specialite_list:
		cursor.execute('SELECT count(matricule) FROM resultats WHERE specialite = %s and sexe= %s', (specialite,"F",))
		student_tuple = cursor.fetchall()
		student_list = [item[0] for item in student_tuple]
		data["datasets"].append({"label": specialite, "data": student_list})

	data_JSON = json.dumps(data)
	return data_JSON\

@app.route("/api/data6")
def doGetData7():

	data = {"years": [], "datasets": []}
	conn = mysql.connect()
	cursor =conn.cursor()
	cursor.execute("SELECT DISTINCT annee FROM resultats")
	years_tuple = cursor.fetchall()
	years_list = [item[0] for item in years_tuple]
	data["years"] = years_list
	cursor.execute("select distinct sexe from resultats")
	sexe_tuple = cursor.fetchall()
	sexe_list = [item[0] for item in sexe_tuple]

	etud_list = []
	for sexe in sexe_list:
		for year in years_list:
			cursor.execute("SELECT count(matricule)FROM resultats WHERE sexe = %s and annee = %s",(sexe,year,))
			student_tuple = cursor.fetchall()
			student_list = [item[0] for item in student_tuple]
			etud_list.append(int(" ".join(str(x) for x in student_list)))
		data["datasets"].append({"label": sexe, "data": etud_list})
		etud_list = []
	data_JSON = json.dumps(data)
	return data_JSON \

@app.route("/api/data7")
def doGetData8():
	data = {"years": [], "datasets": []}
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("SELECT DISTINCT annee FROM resultats")
	years_tuple = cursor.fetchall()
	years_list = [item[0] for item in years_tuple]
	data["years"] = years_list
	cursor.execute("select distinct sexe from resultats")
	sexe_tuple = cursor.fetchall()
	sexe_list = [item[0] for item in sexe_tuple]
	etud_list = []
	for sexe in sexe_list:
		for year in years_list:
			cursor.execute("SELECT count(matricule)FROM resultats WHERE sexe = %s and annee = %s", (sexe, year,))
			student_tuple = cursor.fetchall()
			student_list = [item[0] for item in student_tuple]
			etud_list.append(int(" ".join(str(x) for x in student_list)))
		data["datasets"].append({"label": sexe, "data": etud_list})
		etud_list = []
	data_JSON = json.dumps(data)
	return data_JSON \


if __name__ == '__main__':
	app.run(debug=True, port=5000)
