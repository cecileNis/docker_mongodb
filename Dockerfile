FROM mysql:latest
MAINTAINER tom.wittke@ynov.com
COPY ./server-sql/user.model.sql /docker-entrypoint-initdb.d/
EXPOSE 3306