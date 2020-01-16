-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: todo
-- ------------------------------------------------------
-- Server version	8.0.18
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO,ANSI' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: "todo"
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ "todo" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE "todo";

--
-- Table structure for table "Project"
--

DROP TABLE IF EXISTS "Project";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "Project" (
  "_id" int(11) NOT NULL AUTO_INCREMENT,
  "title" varchar(255) NOT NULL,
  "toBeCompletedDate" datetime NOT NULL,
  "completedDate" datetime DEFAULT NULL,
  PRIMARY KEY ("_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "Task"
--

DROP TABLE IF EXISTS "Task";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "Task" (
  "_id" int(11) NOT NULL AUTO_INCREMENT,
  "project" int(11) NOT NULL,
  "title" varchar(255) NOT NULL,
  "toBeCompletedDate" datetime NOT NULL,
  "completedDate" datetime DEFAULT NULL,
  PRIMARY KEY ("_id"),
  KEY "fk_project_idx" ("project"),
  CONSTRAINT "fk_project" FOREIGN KEY ("project") REFERENCES "Project" ("_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-14 12:10:01
