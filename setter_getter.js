require('dotenv').config();
const { raw } = require('mysql2');
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD,{
    dialect: 'mysql',
   
});

const bcrypt = require('bcrypt');
const zlib = require('zlib')

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
        // we use this.getDataValue('username') instead of this.username because this.username calls this get() method. So if we call this.username (the get() method) from withint the get() method we will get an infinite loop;
        get(){
            const rawValue = this.getDataValue('username');
            return rawValue.toUpperCase();
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    OnePieceIsBest: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description', compressed);
        },
        get(){
            const value = this.getDataValue('description');
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
            return uncompressed.toString();
        }
    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get(){
            return `${this.username} ${this.description} `
        }
    }
}, {
    freezeTableName: true, 
    timestamps: false
})

User.sync({ alter: true })
    .then(data => {
    
    //  return User.create({
    //     username: 'Kiba',
    //     password: 'kiba324',
    //     description: 'Hey I am Kiba from the team in which Hinata and shino is there do you remember me!!'

    //  })
    return User.findOne({where: {username: 'Kiba'}});

    }).then(data => {
        console.log(data.aboutUser)

        // console.log(data.username);
        // console.log(data.password);
        // console.log(data.description);
        // console.log(data.toJSON())
        // console.log(data.username)
        // console.log(data.get('age'))
        // const allData = data.get();
        // console.log(allData) 
    }).catch(err => {
        console.log("error", err)
    })

// sequelize.authenticate().then(data => console.log("successful")).catch(err => console.log(err))