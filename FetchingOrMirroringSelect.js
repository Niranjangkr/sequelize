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
       
        // return User.findAll({attributes: ['username']}) // selecting columns
        
        // return User.findAll({attributes: [['username', 'Name'], ['password', 'pwd']] }) //fields with alias or columns with other names
       
        // return User.findAll({attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'howOld']]}) // aggregate funtions with other names or alias
        
        // return User.findAll({attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'howOld']]})
        
        // return User.findAll({attributes: {exclude: ['password']}}) // exclude columns
        
        // return User.findAll({where: { age: 45 }}) // select particlular row with condition 
       
        // return User.findAll({attributes: ['username'], where: { age: 45}})// select row & column or you can say select cell 
        
        // return User.findAll({where: {age: 21, username: 'Tom'}, limit: 2})
        
        // return User.findAll({limit: 3})
        
        // return User.findAll({order: [['age', 'DESC'] ]})
        
        // return User.findAll({order: [['age', 'ASC']]}) // orderBy in sql
       
        // return User.findAll({attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']], group: 'username'}) //groupBy query
       
        // return User.findAll({
        //     attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'sum_Age']],
        //     group: 'username'
        // })  // repeating gropBy
       
        // return User.findAll({attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'sumAge']], group: 'username'}) // groupBY
       
        // return User.findAll({ where: { 
        //     [Op.and] : {username: "Naruto" , age: 21} //operator
        // }});
        
        // return User.findAll({where: {username: 'Niraj', age: 21}}) //performs same as above
       
        // return User.findAll({where: {
        //     age: {
        //         [Op.gt] : 25
        //     }
        // }})

        // less than 45 or equals to Null
        return User.findAll({where: {
            age: {
                [Op.or]: {
                    [Op.lt] : 45,
                    [Op.eq]: null
                }
            }
        }})
    }).then(data => {
        data.forEach(ele => console.log(ele.toJSON()))
    }).catch(err => {
        console.log("error", err)
    })

// sequelize.authenticate().then(data => console.log("successful")).catch(err => console.log(err))