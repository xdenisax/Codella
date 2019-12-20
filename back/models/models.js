const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");

const DB_USERNAME = "root";
const DB_PASSWORD = "p@ss";

mysql
  .createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
  })
  .then(async connection => {
    await connection.query("CREATE DATABASE IF NOT EXISTS codella");
  })
  .catch(err => {
    console.warn(err.stack);
  });

const sequelize = new Sequelize("codella", DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  logging: false,
  define: {
    timestamps: false
  }
});

class User extends Sequelize.Model {}
class Group extends Sequelize.Model {}
class UserGroup extends Sequelize.Model {}
class Note extends Sequelize.Model {}
class Keyword extends Sequelize.Model {}
class GroupNote extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    familyname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { sequelize, modelName: "user" }
);

Group.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING
  },
  {
    sequelize,
    modelName: "groups"
  }
);

UserGroup.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    modelName: "userGroups"
  }
);

Note.init(
  {
<<<<<<< HEAD
<<<<<<< HEAD
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
=======
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
>>>>>>> tested keywords routes
=======
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
>>>>>>> 32c5b267bee29736af01216aaef876d75e18025f
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    subject: Sequelize.STRING,
    date: Sequelize.DATE,
    tag: Sequelize.STRING
  },
  { sequelize, modelName: "notes" }
);

Keyword.init(
  {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    word: Sequelize.STRING
  },
  { sequelize, modelName: "keywords" }
);

GroupNote.init(
  {id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }},
  {sequelize, modelName:"groupNotes"}
  );
  

GroupNote.belongsTo(Group);
GroupNote.belongsTo(Note);
Note.hasMany(GroupNote);
Group.hasMany(GroupNote);

UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);
User.hasMany(UserGroup);
Group.hasMany(UserGroup);
Note.belongsTo(User);
User.hasMany(Note);
Keyword.belongsTo(Note);
Note.hasMany(Keyword);

User.sync();
Group.sync();
UserGroup.sync();
Note.sync();
Keyword.sync();
GroupNote.sync();

module.exports = {
  sequelize,
  User,
  UserGroup,
  Group,
  Note,
  Keyword,
  GroupNote
};
