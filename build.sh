#docker run --rm -v /home/thanhnv/Desktop/alert-tc2/front-end/tc2-frontend:/app -it node:16 bash
#git pull origin master
yarn install
yarn build:prod
docker build -t 192.168.1.6:5555/alert-web:v1.0.$1 .
docker push 192.168.1.6:5555/alert-web:v1.0.$1