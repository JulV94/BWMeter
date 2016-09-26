#!/usr/bin/python3
# Setup for the BWMeter.py script

import MySQLdb as sql
import json


def init_db():
    with open('config/config.json') as config_file:
        config = json.load(config_file)
    db = sql.connect(host=config['db_host'], user=config['db_username'], passwd=config['db_password'])
    cur = db.cursor()
    cur.execute("CREATE DATABASE "+config['db_name'])
    db.close()
    db = sql.connect(
        host=config['db_host'], user=config['db_username'], passwd=config['db_password'], db=config['db_name'])
    cur = db.cursor()
    cur.execute("CREATE TABLE "+config['db_table_name']+
                " (measurement_time datetime,ping float,down float,up float )")
    db.close()

if __name__ == "__main__":
    print("Creating db...")
    init_db()
    print("Complete")
