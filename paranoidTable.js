/*  In this the while defining the table in the third argument we set the paranoid to true which makest the table
    soft table means when we delete a row it just gets deleted logically and not in the table physically a timestamp is added when 
    table got deleted so a deleteAt coloums is added
*/

require('dotenv').config();
const { raw } = require('mysql2');
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD,{
    dialect: 'mysql',
   
});

// const bcrypt = require('bcrypt');
// const zlib = require('zlib')

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
        },
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21,
    },
    OnePieceIsBest: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    }
}, {
    freezeTableName: true, 
    timestamps: true,
    paranoid: true,
    deletedAt: 'TimeDestroyed'
})

const queryMessage = () =>{
    console.log("logging sql query")
} 

User.sync({ alter: true })
    .then(data => {
    // return User.destroy({
    //     where: {use_id: 2},
    //     // force: true
    // }, {logging: queryMessage});
    // return User.restore({where: {use_id: 2}})

    return User.findAll({raw: true});

    // return sequelize.query(`SELECT * FROM user`, { logging: queryMessage })
    }).then(data => {
        // [result, metadata] = data;
        // console.log(result);
        // console.log(metadata);
       console.log(data)
    }).catch(err => {
        console.log("error", err)
    })

// sequelize.authenticate().then(data => console.log("successful")).catch(err => console.log(err))