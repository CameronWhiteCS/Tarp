

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

        ProxyPass "/"  "http://127.0.0.1:$UWSGI_PORT"
        ProxyPassReverse "/"  "http://127.0.0.1:$UWSGI_PORT"

	ErrorLog /error.log
	CustomLog /access.log combined

</VirtualHost>

<IfModule mod_ssl.c>
        <VirtualHost _default_:443>

	        ServerName $USER.hci.cameronwhite.io

                ProxyPass "/api"  "http://127.0.0.1:$UWSGI_PORT"
                ProxyPassReverse "/api"  "http://127.0.0.1:$UWSGI_PORT"

                DocumentRoot /var/www/$USER

                ErrorLog /error.log
                CustomLog /access.log combined

                SSLEngine on

                SSLCertificateFile /etc/letsencrypt/live/hci.cameronwhite.io/fullchain.pem
                SSLCertificateKeyFile /etc/letsencrypt/live/hci.cameronwhite.io/privkey.pem

                <FilesMatch "\.(cgi|shtml|phtml|php)$">
                                SSLOptions +StdEnvVars
                </FilesMatch>
                <Directory /usr/lib/cgi-bin>
                                SSLOptions +StdEnvVars
                </Directory>

        </VirtualHost>
</IfModule>

EOL

sudo service apache2 restart

cd $HOME/HCIProject/client
npm run build
cp -dr $HOME/HCIProject/client/build/* /var/www/$USER/
pkill -u $USER uwsgi -9 -f
cd $HOME/HCIProject/server
uwsgi --wsgi-file wsgi.py --http $UWSGI_PORT -d $HOME/uwsgi.log