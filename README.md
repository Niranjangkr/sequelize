# sequelize
**Adding to database Mirroring INSERT statement**
buil() create() save() and bulkCreate() --> this mirrors INSERT statement

**Fetching data from database Mirroring SELECT statement**
- ```Users.findAll()  ==> SELECT * FROM `users` AS `users`;```
- ```findAll({ attributes: ['username', 'password']}) ===> SELECT `username`, `password` FROM `users` AS `users`;```
- ```findAll({ attributes: [['username', 'myName'], [`password`, `pwd`]] }) ===> SELECT `username`, AS `myName, `password` AS pwd FROM `users` AS `users`;```
- ```Users.findAll({ attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'howOld']]}) ===> SELECT SUM(`age`) AS `howOld` FROM `users` AS `users`;```
- ```Users.findAll( where: {username: 'soccer'})  ==> SELECT * FROM `users` AS `users` WHERE `users`.`username` = 'soccer';```

