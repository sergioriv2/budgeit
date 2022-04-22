USE budgeit

CREATE TABLE Users(
	UID_User INT NOT NULL IDENTITY(10,1),
	Email_User VARCHAR(100) NOT NULL UNIQUE,
	Password_User VARCHAR(100) NOT NULL,
	Budget_User INTEGER DEFAULT 0 NULL,
	primary key(uid_user)
);

CREATE TABLE Categories
(
	UID_Category INT  NOT NULL IDENTITY(10,1),
	Desc_Category VARCHAR(50) NOT NULL,
	primary key(UID_Category)
);

CREATE TABLE Operation_Types(
UID_OperationType INTEGER NOT NULL IDENTITY(10,1),
Desc_OperationType VARCHAR(50)  NOT NULL,
primary key (UID_OperationType)
)

CREATE TABLE Operations(
	UID_Operation INTEGER  NOT NULL IDENTITY(10,1),
	UID_User_Operation INTEGER  NOT NULL,
	UID_OperationType_Operation INTEGER  NOT NULL,
	UID_Category_Operation INTEGER NOT NULL,
	Amount_Operation FLOAT  NOT NULL,
	Date_Operation DATETIME  NOT NULL,
	Desc_Operation VARCHAR(50) NOT NULL,
	Toggle_Operation BIT  NOT NULL DEFAULT 1,
	PRIMARY KEY (UID_Operation),
	foreign key(UID_User_Operation) references Users(UID_User),
	foreign key(UID_Category_Operation) references Categories(UID_Category),
	foreign key (UID_OperationType_Operation) references Operation_Types(UID_OperationType)
);

INSERT INTO Categories(Desc_Category) 
VALUES ('Entretenimiento'), ('Ropa'), ('Compras'),('Servicios'), ('Comida'), ('Transporte'), ('Otros') 

INSERT INTO Operation_Types(Desc_OperationType) 
VALUES ('Ingreso'), ('Egreso')


