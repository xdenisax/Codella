const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const DB_USERNAME = 'root'
const DB_PASSWORD = 'p@ss'

mysql.createConnection({
	user : DB_USERNAME,
	password : DB_PASSWORD
}).then(async (connection) => {
	await connection.query('CREATE DATABASE IF NOT EXISTS codella')
}).catch((err) => {
	console.warn(err.stack)
});

const sequelize = new Sequelize('codella', DB_USERNAME, DB_PASSWORD,{
	dialect : 'mysql',
	logging: false,
	define: {
    	timestamps: false
	}
});

class User extends Sequelize.Model { };
class Group extends Sequelize.Model { };
class UserGroup extends Sequelize.Model { };
class Note extends Sequelize.Model { };
class Keyword extends Sequelize.Model { };


User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },},
    {sequelize, modelName:'user'});


Group.init({
    groupID: Sequelize.INTEGER,
    name: Sequelize.STRING
},{
    sequelize, modelName: 'groups'
}); 

    
UserGroup.init({
    userGroupID : Sequelize.INTEGER
},{
    sequelize, modelName: 'userGroups'
});


Note.init({
    id_note: { type: Sequelize.INTEGER, primaryKey: true },
    title : Sequelize.STRING,
    content: Sequelize.TEXT,
    subject: Sequelize.STRING,
    date: Sequelize.DATE,
    tag: Sequelize.STRING
}, { sequelize, modelName: 'notes' });


Keyword.init({
    id: {type: Sequelize.INTEGER, primaryKey:true},
    word: Sequelize.STRING
},{ sequelize, modelName: 'keywords'});
    

Note.belongsTo();
User.hasMany(Note);
UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);
User.hasMany(UserGroup);
Group.hasMany(UserGroup);
Keyword.belongsTo(Note);
Note.hasMany(Keyword);

