
create database movielist
use movielist

CREATE TABLE m_users (
  id int NOT NULL primary key,
  name varchar(50) NOT NULL,
  dob date NOT NULL,
  email varchar(70) NOT NULL,
  password varchar(15) NOT NULL
)

CREATE TABLE watchedlist (
  mid int NOT NULL,
  userid int NOT NULL,
  mname varchar(100) NOT NULL,
  ryear varchar(4) DEFAULT NULL,
  actors varchar(250) DEFAULT NULL,
  actress varchar(250) DEFAULT NULL,
  genre varchar(100) NOT NULL,
  category varchar(100) DEFAULT NULL,
  imdb varchar(3) DEFAULT NULL,
  myrate varchar(3) DEFAULT NULL,
  wtimes varchar(3) DEFAULT NULL,
  wyear varchar(4) DEFAULT NULL,
  url varchar(255) DEFAULT NULL,
  inlist tinyint DEFAULT 0,
  notes varchar(255) DEFAULT NULL,
  constraint ml_pk primary key(mid),
  constraint ml_fk foreign key(userid) references m_users(id)
);

select * from m_users;
select * from watchedlist;