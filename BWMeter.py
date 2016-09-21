#!/usr/bin/python3

# Bandwidth meter program

import subprocess as sp


def take_measurement():
    result = sp.Popen("speedtest-csv", stdout=sp.PIPE).stdout.read().decode("utf-8").split(";")
    ping = result[0].split(" ")[0]
    down = result[1].split(" ")[0]
    up = result[2].split(" ")[0]

# put the data in the SQL database


def generate_graphs_html():
    pass
# trigger request on SQL database

# Generating graphs

if __name__ == '__main__':
    print("Taking measurement...")
    take_measurement()
    print("Generating graphs...")
    generate_graphs_html()
    print("Completed")