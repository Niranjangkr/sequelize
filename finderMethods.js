require('dotenv').config();
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD,{
    dialect: 'mysql',
   
});

const User = sequelize.define('user', {
    use_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 6] //wont work with bulkCreate as bulkCreate ignores this validation unless you mention it in the bulkCreate function
        }
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    OnePieceIsBest: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true, 
    timestamps: false
})

User.sync({ alter: true })
    .then(data => {
        // raw: true
   /* return User.findAll({raw: true}) //using this you get plain js object and you dont have to use .toJSON later on
    // without raw: true // you get model instances which are like individual or multiple rows based on codition where and you get extra methods with it   */

    // findByPk
   /* return User.findByPk(3, {raw: true}); */
   /* return User.findOne({
    where: {
        age: {
            [Op.or]: {
                [Op.eq] : 20,
                [Op.lt] : 22
            }
        }
    },raw: true}); */

    // findOrCreate() 
    // return User.findOrCreate({where: {username: "Tony"}, raw: true})

    // findOrCreate() with their own default value 
/*    return User.findOrCreate({
        where: { username: "Tomm"},
        defaults: {
            age: 28,
            password: '3232'
        }
    }) */

    // findAndCountAll() -->combines findAll and count the no of rows returned
    return User.findAndCountAll({ // it return object with count and rows specifically
        where: {username: 'Niraj'},
        raw: true
    })

    }).then(data => {
        const { count, rows } = data;
        console.log(count);
        console.log(rows);
        console.log(data)
    }).catch(err => {
        console.log("error", err)
    })

// sequelize.authenticate().then(data => console.log("successful")).catch(err => console.log(err))