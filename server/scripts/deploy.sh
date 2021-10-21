sudo a2ensite $USER.hci.cameronwhite.io

cat > $HOME/HCIProject/server/wsgi.py << EOL
import sys
#from dotenv import load_dotenv
#load_dotenv('/home/$USER/HCIProject/server/.env')
sys.path.append('/home/$USER/HCIProject/server/src')
from app import app as application
EOL

cat > /etc/apache2/sites-enabled/$USER.hci.cameronwhite.io.conf << EOL
    <VirtualHost *:80>

	ServerName $USER.hci.cameronwhite.io

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/$USER

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>

<IfModule mod_ssl.c>
        <VirtualHost _default_:443>

	        ServerName $USER.hci.cameronwhite.io


                DocumentRoot /var/www/$USER

                ErrorLog ${APACHE_LOG_DIR}/error.log
                CustomLog ${APACHE_LOG_DIR}/access.log combined

                SSLEngine on

                SSLCertificateFile /etc/letsencrypt/live/hci.cameronwhite.io/fullchain.pem
                SSLCertificateKeyFile /etc/letsencrypt/live/hci.cameronwhite.io/privkey.pem

                <Directory /home/$USER/HCIProject/server>
                    Order deny,allow
                    Require all granted
                </Directory>

                WSGIDaemonProcess $USER python-path=/home/$USER/HCIProject/server/src:/home/$USER/HCIProject/server/env/lib/python3.8/site-packages
                WSGIProcessGroup $USER
                WSGIScriptAlias / /home/$USER/HCIProject/server/wsgi.py

        </VirtualHost>
</IfModule>

EOL

sudo service apache2 restart