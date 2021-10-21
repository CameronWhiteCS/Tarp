sudo a2ensite $USER.hci.cameronwhite.io

cat > /etc/apache2/sites-enabled/$USER.hci.cameronwhite.io.conf << EOL
<VirtualHost *:80>

	ServerName $USER.hci.cameronwhite.io

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/$USER

        ProxyPass "/"  "http://127.0.0.1:$FLASK_PORT"
        ProxyPassReverse "/"  "http://127.0.0.1:$FLASK_PORT"

	ErrorLog /error.log
	CustomLog /access.log combined

</VirtualHost>

<IfModule mod_ssl.c>
        <VirtualHost _default_:443>

	        ServerName $USER.hci.cameronwhite.io

                ProxyPass "/"  "http://127.0.0.1:$FLASK_PORT"
                ProxyPassReverse "/"  "http://127.0.0.1:$FLASK_PORT"

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