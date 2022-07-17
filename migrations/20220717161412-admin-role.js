const { ObjectId } = require("mongodb");

module.exports = {
  async up(db, client) {
    await db.collection("roles").insertOne({
      _id: new ObjectId("000000000000000000000000"),
      description: "Every permission allowed",
      displayName: "Admin",
      name: "admin",
    });
  },

  async down(db, client) {
    await db.collection("roles").deleteOne({
      _id: new ObjectId("000000000000000000000000"),
    });
  },
};
