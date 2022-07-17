const { ObjectId } = require("mongodb");

module.exports = {
  async up(db, client) {
    await db.collection("users").insertOne({
      _id: new ObjectId("000000000000000000000000"),
      role: ObjectId("000000000000000000000000"),
      firstName: "Luke",
      lastName: "Skywalker",
      email: "admin@bar.com",
      password: "$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO",
    });
  },

  async down(db, client) {
    await db.collection("users").deleteOne({
      _id: new ObjectId("000000000000000000000000"),
    });
  },
};
