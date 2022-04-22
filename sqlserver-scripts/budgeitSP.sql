USE budgeit

CREATE PROCEDURE spGetUserByEmail(
	@Email varchar(100)
)
AS
SELECT Users.Password_User as 'password', Users.UID_User as 'uid' FROM Users WHERE Email_User = @Email
GO

CREATE PROCEDURE spGetUserById(
	@UID INTEGER
)
AS
SELECT UID_User as 'uid' FROM Users WHERE UID_User = @UID
GO

CREATE PROCEDURE spGetUserBudget(
	@UID INTEGER
)
AS
SELECT SUM(CASE WHEN UID_OperationType_Operation = 10 THEN Amount_Operation ELSE -Amount_Operation END) as 'total_budget' 
from Operations 
WHERE Operations.UID_User_Operation = @UID AND Operations.Toggle_Operation = 1
GO

CREATE PROCEDURE spPostUser(
	@Email varchar(100),
	@Password varchar(100)
)
AS
INSERT INTO Users(Email_User, Password_User) VALUES(@Email, @Password);
GO

CREATE PROCEDURE spPostOperation(
	@User INTEGER,
	@Type integer,
	@Category integer,
	@Amount float,
	@Description varchar(50),
	@DateOperation datetime
)
AS
INSERT INTO Operations
(
UID_User_Operation, 
UID_OperationType_Operation, 
UID_Category_Operation, 
Amount_Operation, 
Desc_Operation, 
Date_Operation
)
VALUES(@User, @Type, @Category, @Amount, @Description, @DateOperation)
GO

CREATE PROCEDURE spPutOperation(
	@UID INTEGER,
	@Category integer,
	@Amount float,
	@Description varchar(50),
	@DateOperation datetime
)
AS
UPDATE Operations
SET
UID_Category_Operation = @Category, 
Amount_Operation = @Amount, 
Desc_Operation = @Description, 
Date_Operation = @DateOperation
WHERE UID_Operation = @UID
GO

CREATE PROCEDURE spDeleteOperation(
	@UID INTEGER
)
AS
UPDATE Operations
SET Toggle_Operation = 0
WHERE UID_Operation = @UID
GO

CREATE PROCEDURE spGetOperations(
	@USER INTEGER,
	@OFFSET INTEGER,
	@LIMIT INTEGER
)
AS
SELECT Operations.UID_Operation as 'uid', Operation_Types.Desc_OperationType as 'type', Operations.UID_OperationType_Operation as 'type_uid',
      Categories.Desc_Category as 'category', Operations.Amount_Operation as 'amount', Operations.Date_Operation as date,
      Operations.Desc_Operation as 'description', Operations.UID_Category_Operation 'category_uid'
      FROM Operations
      INNER JOIN Users ON Users.UID_User = Operations.UID_User_Operation
      INNER JOIN Operation_Types ON Operation_Types.UID_OperationType = Operations.UID_OperationType_Operation
      INNER JOIN Categories ON Categories.UID_Category = Operations.UID_Category_Operation
      WHERE Operations.UID_User_Operation = @USER AND Operations.Toggle_Operation = 1 
	  ORDER BY Operations.Date_Operation DESC OFFSET @OFFSET ROWS FETCH NEXT @LIMIT ROWS ONLY;
GO

CREATE PROCEDURE spGetExpensesFilteredByCategory(
	@CATEGORY INTEGER,
	@USER INTEGER,
	@OFFSET INTEGER,
	@LIMIT INTEGER
)
AS
SELECT Operations.UID_Operation as 'uid', Operation_Types.Desc_OperationType as 'type', Operations.UID_OperationType_Operation as 'type_uid',
      Categories.Desc_Category as 'category', Operations.Amount_Operation as 'amount', Operations.Date_Operation as date,
      Operations.Desc_Operation as 'description', Operations.UID_Category_Operation 'category_uid'
      FROM Operations
      INNER JOIN Users ON Users.UID_User = Operations.UID_User_Operation
      INNER JOIN Operation_Types ON Operation_Types.UID_OperationType = Operations.UID_OperationType_Operation
      INNER JOIN Categories ON Categories.UID_Category = Operations.UID_Category_Operation
      WHERE Operations.UID_User_Operation = @USER AND 
	  Operations.UID_Category_Operation = @CATEGORY AND
	  Operations.Toggle_Operation = 1 AND
	  Operations.UID_OperationType_Operation = 11
	  ORDER BY Operations.Date_Operation DESC OFFSET @OFFSET ROWS FETCH NEXT @LIMIT ROWS ONLY;
GO

DROP PROCEDURE spGetExpensesFilteredByCategory

CREATE PROCEDURE spGetCategories
AS
SELECT 
Categories.Desc_Category as 'description', Categories.UID_Category as 'uid' FROM Categories
GO
