	FROM openjdk:11
	ARG JAR_FILE=target/*.jar
	RUN echo ${JAR_FILE}
	COPY ${JAR_FILE} database.jar
	ENTRYPOINT ["java","-jar","/database.jar"]