const typeorm = require("typeorm");
const userEntity = require("../users/userEntity");

const initializeConnection = async () => {
  const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "user_admin",
    synchronize: true,
    entities: [
      userEntity
    ]
  };

  return await typeorm.createConnection(options);
};

module.exports = initializeConnection;