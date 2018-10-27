const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {

  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  /*updateStravaId(id, callback) {
    return User.findById(id)
    .then((user) => {
        if(!user){
            return callback("This user doesn't exist");
        } else {
            return user.updateAttributes({stravaId: 3});
        }
    })
    .catch((err) => {
        callback(err);
    })
  }
  */
}
