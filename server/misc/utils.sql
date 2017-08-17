create table users (
  id integer primary key auto_increment,
  registertime datetime,
  fullname char(200) not null,
  familyname char(100),
  givenname char(100),
  age integer,
  gender integer,
  email text
);
