CREATE TABLE "Project" (
  "_id" SERIAL PRIMARY KEY,
  "title" varchar(255) NOT NULL,
  "toBeCompletedDate" TIMESTAMP NOT NULL,
  "completedDate" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "Task" (
  "_id" SERIAL PRIMARY KEY,
	"project" INTEGER REFERENCES "Project"("_id"),
  "title" varchar(255) NOT NULL,
  "toBeCompletedDate" TIMESTAMP NOT NULL,
  "completedDate" TIMESTAMP DEFAULT NULL
);