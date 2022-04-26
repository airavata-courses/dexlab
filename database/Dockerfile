FROM maven:3.8.4-jdk-11


RUN mkdir /app

COPY . /app

WORKDIR /app

RUN mvn package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/ormservice.jar"]