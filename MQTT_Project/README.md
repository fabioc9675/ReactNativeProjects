# MQTT and MySQL conection

## Drivers

- `pip install mysql-connector-python`
- `pip install paho-mqtt`

edit file `sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf`, comment bind-address and restart my sql with `sudo /etc/init.d/mysql restart`

Use the following commands to ensure the remote access to the database in raspberry pi
- `CREATE USER 'user'@'%' IDENTIFIED BY 'password';`
- `GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;`
- `FLUSH privileges;`

the python file can be copy in Raspberry pi and executed, the access to database is guaranted

## Information

See the tutorial `http://www.sinaptec.alomar.com.ar/2017/08/tutorial-17-esp8266-parte7-integrar.html`
