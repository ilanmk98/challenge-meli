# Etapa 1: Build con Java 24
FROM eclipse-temurin:24-jdk AS build

WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

RUN ./mvnw clean package -DskipTests

# Etapa 2: Imagen final liviana
FROM eclipse-temurin:24-jre

WORKDIR /app

# ✅ Crear usuario no-root de forma compatible
RUN groupadd -r spring && useradd -r -g spring spring

USER spring

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
