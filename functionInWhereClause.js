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
    //function in where clause
    // return User.findAll({ where: sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 6)})
}).then((data) => {
    data.forEach(ele => console.log(ele.toJSON()))
}).catch((err) => {
    console.log(err, "error")
})




// console.log(sequelize.models.user);

// User.sync({ alter: true })
//     .then(data => console.log("Table and model successfully synced"))
//     .catch(err => console.log("error syncing table and model"))

// // just to authenticate to see if the provided details in constructor is true 
// sequelize.authenticate().then(()=> {
//     console.log("connection successful");
// }).catch(err => console.log('error conneting to database'));

// console.log("Authenticating...")