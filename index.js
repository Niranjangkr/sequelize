require("dotenv").config();
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD,{
    dialect: 'mysql',
    // me: true
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
        allowNull: false    
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
    // working with our table
    // console.log(data, "successful")
    // const user = User.build({username:"Niranjan", password: "Ni123", OnePieceIsBest: true})
    // // console.log(user) // so build actually doesnt save data to database it just shows the data how it will be before storing to actually to store it we need to use save() method
    // // lets change the data be before actually saving it into database
    // user.username = "Niraj"
    // return user.save()


    // instead of build and save we can use create to do it simultaneously
    return User.create({
        username: "Niraj",
        password: "Nir2123",
        age: 19,
    });
}).then((data) => {
    console.log(data.toJSON(),"User added into Database successfuly");
    data.username = "Naruto";
    data.age = 45;
    // return data.save();
    // return data.destroy();
    return data.reload();
}).then((data) => {
    // console.log(data.toJSON(), "user updated successfully");
    console.log(data.toJSON(), "user returned to normal successfully");
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