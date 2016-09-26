# BWMeter
Bandwidth meter in Python, with web interface

## Prerequisites
* speedtest-cli
* A webserver (like apache or nginx)
* MySQL database
* PHP5
* Python 3
* pip for python 3
* mysqlclient for python 3

For Ubuntu and apache
```
sudo apt-get update
sudo apt-get install apache2 mysql-server libapache2-mod-auth-mysql php5-mysql php5 libapache2-mod-php5 php5-mcrypt
sudo mysql_install_db
sudo apt-get install python3 python3-pip libmysqlclient-dev
sudo pip3 install mysqlclient
sudo pip3 install speedtest-cli
```
## Installation
### Clone this repository
```
git clone https://github.com/JulV94/BWMeter
cd BWMeter
git submodule update --init --recursive
```
### Initialize
* Create a ```config.json``` file in the ```config``` directory based on the ```config.example.json``` file
* Edit the first lines of the ```query.php``` file in the ```BW-dashboard``` directory with your MySQL informations
* Move the ```BW-dashboard``` directory to your web directory (eg : ```/var/www/html/```)
* Launch the setup script
```
./setup.py
```
## Run
```
./BWMeter.py
```

Check dashboard graphs at [http://localhost/BW-dashboard](http://localhost/BW-dashboard "Your dashboard")

## Using in crontab
Beware of the ```$PATH``` env variable. ```speedtest-cli``` is located in ```/usr/local/bin```
```
crontab -e
```
add and edit the line fitting your needs
```
* * * * * PATH=$PATH:/usr/local/bin && export PATH && /usr/bin/python3 /path/to/git/repo/BWMeter.py
```
