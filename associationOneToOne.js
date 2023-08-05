require('dotenv').config();
const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD, {
    dialect: 'mysql',
    // freezeTableName: true,
});

const Country = sequelize.define('country', {
    CountryName: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    timestamps: false
});

const Capital = sequelize.define('capital', {
    CapitalName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
});

Country.hasOne(Capital, { onDelete: 'CASCADE'}); //{ foreignKey: 'idOfCountry' } to change the name of the foriegn key from default name
Capital.belongsTo(Country, {onDelete: 'CASCADE'});

const createCountry = () =>{
    Country.bulkCreate([
        {
            CountryName: "India"
        },
        {
            CountryName: "USA"
        },
        {
            CountryName: "Japan"
        },
        {
            CountryName: "Korea"
        },

    ])
}

const createCapital = () => {
    Capital.bulkCreate([
        {
            CapitalName: "Delhi"
        },
        {
            CapitalName: "WashigtonDC"
        },
        {
            CapitalName: "Tokyo"
        },
        {
            CapitalName: "Seoul"
        }
    ])
}

let capital, country;

sequelize.sync({ alter: true })
    .then(() => {
        // createCountry();
        // createCapital();
        return Country.findOne({where: {CountryName: 'Japan'}});
    }).then(data => {
        country = data;
        return Capital.findOne({where: { CapitalName: 'Tokyo'}});
    }).then(data => {
        capital = data;
        // return country.setCapital(capital);
        return capital.setCountry(country);
    }).then(data => {
        console.log(data);
    })
    .catch((error) => console.log(error));











/*

// create the country with Country.create and then use the instance of that to dynamically set the capital of it so it will automatically assign the id and all

sequelize.sync({ alter: true })
    .then(() => {
        // createCountry();
        // createCapital();
       
        // return Country.findOne({where: {CountryName: 'India'}});
        return Country.create({
            CountryName: "Fire"
        })
    }).then((data) => {
        country = data;
        return country.createCapital({
            CapitalName: 'Hidden Leaf'
        })
        // return country.getCapital()
    }).then((data) => {
        console.log(data);
    })
    .catch((error) => console.log(error) )


// ----------------------------------------------------------------------
    // sets the Delhi row foreing key of capital table with India's pk 
    sequelize.sync({ alter: true })
    .then(() => {
        // createCountry();
        // createCapital();
       
        return Capital.findOne({where: {CapitalName: 'Delhi'}});
    }).then((data => {
        capital = data;
        return Country.findOne({where: {CountryName: 'India'}});
    })).then(data => {
        country = data;
        country.setCapital(capital);
    })
    .catch((error) => console.log(error) ) */