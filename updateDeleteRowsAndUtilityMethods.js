require("dotenv").config();
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD,{
    dialect: 'mysql',
    // freezeTableName: true
});

// sequelize.drop({ match: /_test$/ }); 

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
});

User.sync({ alter: true}).then((data) =>{
    // return User.update({username: 'Sasuke'}, {where: {username: 'Naruto'}})
    // return User.findAll({where: {username: "Sasuke"}}) //checking
    // return User.update({username: "Yess"}, {
    //     where: { age: {
    //         [Sequelize.Op.gt]: 1
    //     }}
    // })

    // return User.update({username: "Niraj"}, {
    //     where: { age: {
    //         [Sequelize.Op.gt]:1
    //     }}
    // })
    // return User.findAll()
    // destroy rows
    // return User.destroy({ where: {username: "Niraj"}}) // delete rows
    // return User.destroy({ truncate: true }); // delete every row in the table
    return User.sum('age', {where: {username: 'Niraj'}})
}).then((data) => {
    // data.forEach(ele => console.log(ele.toJSON()))
    // console.log(data.toJSON())
    console.log(data)
}).catch((err) => {
    console.log(err, "error")
})