require('dotenv').config()
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD, {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

const Post = sequelize.define('post', {
    message: {
        type: DataTypes.STRING
    }
   
},{
    timestamps: false
})

User.hasMany(Post, {onDelete: 'CASCADE'});
Post.belongsTo(User, {onDelete: 'CASCADE'});

let user, posts;

sequelize.sync({ alter: true }).then(() => {
    return User.findOne();
}).then(data => {
    user = data;
    return Post.findOne();
}).then(data => {
    posts = data;
    posts.setUser(user);
}).catch((error) => {
    console.log(error)
})