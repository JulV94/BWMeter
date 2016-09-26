#!/usr/bin/python3

# Bandwidth meter program

import subprocess as sp
import MySQLdb as sql
import json
import os


def take_measurement():
    script_dir = os.path.dirname(__file__)
    result = sp.Popen(script_dir + "/speedtest-cli-extras/bin/speedtest-csv", stdout=sp.PIPE).stdout.read().decode("utf-8").split(";")

    with open(script_dir + '/config/config.json') as config_file:
        config = json.load(config_file)

    db = sql.connect(
        host=config['db_host'], user=config['db_username'], passwd=config['db_password'], db=config['db_name'])
    cur = db.cursor()
    try:
        cur.execute(
            "INSERT INTO " + config['db_table_name'] + " VALUES ( NOW(),"
            + result[6].split(" ")[0] + "," + result[7].split(" ")[0] + "," + result[8].split(" ")[0] + ")")
        db.commit()
    except:
        db.rollback()
        print("Cannot write into " + config['db_name'] + "db table " + config['db_table_name'])
    db.close()

if __name__ == '__main__':
    print("Taking measurement...")
    take_measurement()
    print("Completed")