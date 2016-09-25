# BWMeter
Bandwidth meter in Python, with web interface

## Prerequisites
* speedtest-cli
* A webserver (like apache or nginx)
* MySQL database
* PHP5

For Ubuntu and apache
```
sudo apt-get update
sudo apt-get install apache2 mysql-server libapache2-mod-auth-mysql php5-mysql php5 libapache2-mod-php5 php5-mcrypt
sudo mysql_install_db
```

* Python 3
* pip for python 3
* mysqlclient for python 3
```
sudo apt-get install python3 python3-pip libmysqlclient-dev
sudo pip3 install mysqlclient
sudo pip3 install speedtest-cli
```
## Installation
### Clone this repository
```
git clone https://github.com/JulV94/BWMeter
cd BWMeter
```
### Initialize
```
./setup.py /var/www/html/
```
## Run
```
./BWMeter.py
```

Or add a cron job to get a constant measurement and build the graphs.

Check dashboard graphs at http://localhost/BWDashboard
