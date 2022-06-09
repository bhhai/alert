FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/
COPY bundle/ /usr/share/nginx/html/
