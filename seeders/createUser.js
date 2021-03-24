const db = require("../models");
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "johndoe",
          password: db.User.generateHash("password"),
          verificationMethod: "sms",
          phoneNumber: "+447743868561",
          fullyVerified: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
