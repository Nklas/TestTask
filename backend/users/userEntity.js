const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "user",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    user_name: {
      type: "varchar"
    },
    email: {
      type: "varchar",
      unique: true,
    },
    data: {
      type: "varchar"
    },
  }
});