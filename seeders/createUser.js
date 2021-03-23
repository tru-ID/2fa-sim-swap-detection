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
          timeDifference: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDay() + 7
          ).getTime(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
