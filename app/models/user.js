let User = require('../schemas/user');
let CTS = require('../utils/constants');

exports.authenticate = (args) => {
    let { login, password } = args;
    let q = new Promise((resolve, reject) => {
        if (!login || !password) {
            //Some required field is missing
            return reject({
                name: "MISSING_REQUIRED_FIELDS"
            });
        }
        User.findOne({ login })
            .then(user => {
                if (user) {
                    user.verifyPassword(password)
                        .then(valid => {
                            if (valid) {
                                return resolve(user);
                            } else {
                                return reject({
                                    name: "BAD_CREDENTIALS"
                                });
                            }
                        });
                } else {
                    return reject({
                        name: "BAD_CREDENTIALS"
                    });
                }
            })
            .catch(err => {
                return reject({
                    name: "INTERNAL_ERROR",
                    extra: err
                });
            });
    });

    //Return promise.
    return q;
};

exports.create = (args) => {
    let { login, password } = args;
    let q = new Promise((resolve, reject) => {

        //Check required fields.
        if (!login || !password) {
            //Some required field is missing
            return reject({
                name: "MISSING_REQUIRED_FIELDS"
            });
        }

        //email = email.toLowerCase();
        login = login.replace(/\s/g, '');
        login = login.toLowerCase();

        //Check if user already exists
        User.findOne({
            login
        })
            .then(user => {
                if (user) {
                    //Error, user already exists
                    return reject({
                        name: "USER_ALREADY_EXIST"
                    });
                }

                //Check password length
                if (password.length < CTS.MIN_PASSWORD_LENGTH) {
                    //Error, password too short
                    return reject({
                        name: "PASSWORD_TOO_SHORT"
                    });
                }

                //Create the new user
                let newUser = new User({
                    login,
                    password
                });
                //Save it in Database
                return resolve(newUser.save());
            })
            .catch(err => {
                //Some error ocurred. 
                //Return the error info.
                return reject({
                    name: "INTERNAL_ERROR",
                    extra: err
                });
            });
    });
    return q;

}