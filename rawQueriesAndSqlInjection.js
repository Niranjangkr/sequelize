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
    timestamps: false,
})

const queryMessage = () =>{
    console.log("logging sql query")
} 

User.sync({ alter: true })
    .then(data => {
    // return sequelize.query(`UPDATE user SET age = 35 WHERE username = 'Kiba' `);
    // return sequelize.query(`SELECT * FROM user`, { type: Sequelize.QueryTypes.SELECT });
    // return sequelize.query(`UPDATE user SET age = 121 WHERE username = 'Kiba' `, { type: Sequelize.QueryTypes.UPDATE})
    // return sequelize.query(`SELECT * FROM user LIMIT 2`, { model: User, plain: true, logging: queryMessage})

    // sql injection prevention by using escaping input here we use :variable which uses data from replacements provided but they come with esacpe input which makes it not possible to end the statement or interact with the sql statement like ` \` ` now here ` in the middle doesn't end the statement of sql here cause it comes with escape \ that makes it the separate quote and not part of sql statement something like that or we use ? sign 
    

    // return sequelize.query(`SELECT * FROM user WHERE username = :username`, {
    //     replacements: { username: 'Sharma'},
    //     plain: true
    // })

    // return sequelize.query(`SELECT * FROM user WHERE username IN(:username)`, {
    //     replacements: {username: ['Tonny', 'Jimmy', 'Tomm', 'Wom' ] }
    // })

    // other way is bind parameters where sql statement and the data are provided separately to the databse server and so even if the sql is injected it will be treated as data and not sql
    //  here we use $1 and $2 and for inplace of replacements we have bind: [ username , password ] which binds dynamically and separately also we can pass objects to like 
    // $username $ password this object should be mentioned somewhere
    // then in bine we have bind: { username, password }
    // note : the  parameters which we specify like $1 $2 need to be passed from bind or it will throw exception

    return sequelize.query(`SELECT * FROM user WHERE username LIKE :username`, {
        replacements: { username: 'K%' }
    })
    }).then(data => {
        // [result, metadata] = data;
        // console.log(result);
        // console.log(metadata);
       console.log(data)
    }).catch(err => {
        console.log("error", err)
    })

// sequelize.authenticate().then(data => console.log("successful")).catch(err => console.log(err))