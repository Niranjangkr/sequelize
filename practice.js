require('dotenv').config()
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD, {
    dialect: 'mysql'
});

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 20]
        }
    },
    favourite_class: {
        type: DataTypes.STRING(25),
        defaultValue: 'computer Science'
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscriberd_to_witcode: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const bulkData = (data) => {
    return Student.bulkCreate([
        {
            name: "Niranjan Gaonkar",
            favourite_class: "Computer Science",
            school_year: 2021
        },
        {
            name: "Prakash Gaonkar",
            favourite_class: "Maths",
            school_year: 2021,
            subscriberd_to_witcode: false
        },
        {
            name: "Trafalgar Law",
            favourite_class: "Biology",
            school_year: 2021
        },
        {
            name: "Roger",
            school_year: 2021
        },
        {
            name: "sabo",
            school_year: 2022
        }
    ], {validate: true})
}

async function fetchData (){
    try {
        // const names = await Student.findAll({attributes: [['name', 'Name']]}); // to fetch all the username
      
        // const names = await Student.findAll({attributes: [['name', 'AmCs']], where: {
        //     [Sequelize.Op.or] : {favourite_class: 'Computer Science', subscriberd_to_witcode: false}
        // }}) //where and Or operator used
        names.forEach(ele => console.log(ele.toJSON()));
    } catch (error) {
        console.error("Cant fetch data", error);
    }
}

async function DeletData(){
    try {
        const res = await Student.destroy({where: {}});
        console.log('Successfully destroyed all rows', res);
    } catch (error) {
        console.error(error,"Cant delete some error")
    }
}

// to group know the count of students in a particular year
async function countStudentInByYear(){
    try {
        const data = await Student.findAll({attributes: [
            'school_year', 
            [sequelize.fn('COUNT', sequelize.col('school_year')), 'studentsNo'] //sequelize.col('school_year') for this you can also count names it will be same thing
        ],
        group: 'school_year'
    })
    
        data.forEach(ele => console.log(ele.toJSON()))
    } catch (error) {
        console.error(error)
    }
}

countStudentInByYear();

/*
// to update the database witg new year value
async function UpdateData() {
    try {
      const newAges = [2019, 2019, 2019, 2019, 2019, 2018, 2018, 2020, 2020, 2020, 2020, 2020, 2020, 2022, 2022, 2022, 2022, 2022, 2022, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023];
  
      // Get all the students from the database
      const students = await Student.findAll();
  
      // Update each student's school_year based on the corresponding value from newAges array
      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const newAge = newAges[i];
        await student.update({ school_year: newAge });
      }
  
      console.log('Successfully updated ages from all rows');
    } catch (error) {
      console.error(error, "Can't update, some error");
    }
  }
  
  UpdateData();

  */
  






// fetchData();
// DeletData();


// ( async ()=> {
//     try {
//         const data = await sequelize.sync({ alter: true }) //can also use Student.sync() if used Student only that particular table will get synced and if used sequelize all the tables here will get synced    
//         const res = await bulkData(data)
//         console.log(res, "successfully added data into table")
        
//     } catch (error) {
//         console.log(error)
//     }
// })();