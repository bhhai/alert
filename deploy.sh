ssh noron@192.168.1.6 'docker pull 192.168.1.6:5555/alert-web:v1.0.'$1
ssh noron@192.168.1.6 'docker rm -f alert-web'
ssh noron@192.168.1.6 'docker run --name alert-web -d -p 8083:80 192.168.1.6:5555/alert-web:v1.0.'$1