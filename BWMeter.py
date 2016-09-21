#!/usr/bin/python3

# Bandwidth meter program

import subprocess as sp
from plotly.offline import plot
from plotly.graph_objs import Bar, Scatter, Figure, Layout


def take_measurement():
    result = sp.Popen("speedtest-cli-extras/bin/speedtest-csv", stdout=sp.PIPE).stdout.read().decode("utf-8").split(";")
    ping = result[6].split(" ")[0]
    down = result[7].split(" ")[0]
    up = result[8].split(" ")[0]

    print(ping)
    print(down)
    print(up)

    plot([Scatter(x=[1, 2, 3], y=[ping, down, up])], filename="html/test.html", auto_open=False)

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