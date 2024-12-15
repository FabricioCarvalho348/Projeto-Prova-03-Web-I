create table foods (
	id integer primary key,
	name varchar,
	price real
)

create table filings (
	id integer,
	idFood integer,
	name varchar,
	price real,
	primary key (id, idFood),
	foreign key(idFood) references foods(id)
) 

create table sales (
	id serial primary key,
	idfood integer,
	cpf varchar,
	datesale TIMESTAMP DEFAULT now(),
	description varchar(100),
	price real,
	foreign key (idfood) references foods (id)
)