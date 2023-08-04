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
        validate: {
            // isOldEnough(value){
            //     if (value < 21){
            //         throw new Error('To young');
            //     }
            // }
            // isNumeric: {
            //     msg: 'You must enter a number to age field'
            // }
            isNumeric: true
        }
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
        validate: {
            isEmail: true,
            // isIn: {
            //     args: ['niraj@gmail.com', 'rahul@gmail.org'],
            //     msg: "This email is not provided by us please cotntact to know more"
            // }, // only this email accounts can be used to sign up
            myEmailValidator(value){
                if(value == null){
                    throw new Error('Please provide email')
                }
            }
        }

    }
}, {
    freezeTableName: true, 
    timestamps: false,
    validate: {
        UserPassMatch(){
            if(this.password == this.username){
                throw new Error("Password should not be same as the Username!!!");
            }else{
                console.log("Hurrayy")
            }
        }
    }
})

User.sync({ alter: true })
    .then(data => {
    // return User.create({
    //     username: 'Tobby',
    //     password: 'RIn123',
    //     email: 'TobbyRimfd@outlook.com'
    // })

    // const user = User.build( {username: 'tommy',email: 'tom'} );
    // return user.validate();

    return User.create({
        username: 'rahul',
        password: 'rahul',
        age: '22'
    })

    }).then(data => {
        console.log(data.toJSON())

    }).catch(err => {
        console.log("error", err)
    })

// sequelize.authenticate().then(data => console.log("successful")).catch(err => console.log(err))