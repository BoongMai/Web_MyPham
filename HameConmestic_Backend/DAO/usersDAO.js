import bcrypt from "bcrypt";
import e from "express";

let USERS;

let ERROR_MESSAGE_TYPE = {
  usernameError: "INVALID USERNAME",
  passwordError: "INVALID PASSWORD",
  phoneError: "INVALID PHONE NUMBER",
  emailError: "INVALID EMAIL ADDRESS",
};

export default class UserDAO {
  static async injectDB(myConnection) {
    try {
      if (USERS) {
        return;
      } else {
        USERS = await myConnection.db(process.env.DB_NAME).collection("users");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async pushUser(userInfo) {
    try {
      let errors = this.checkValid(userInfo);
      if (errors.length === 0) {
        let userExisted = await this.userExisted(
          userInfo.username,
          userInfo.emailAddress
        );
        if (!userExisted) {
          const passwordHash = new Promise((reslove, reject) => {
            bcrypt.hash(userInfo.password, 10, async (err, hash) => {
              if (!err) {
                reslove(hash);
              } else {
                reject(err);
              }
            });
          });

          return passwordHash.then(async (passwordHash) => {
            let result = await USERS.insert({
              ...userInfo,
              password: passwordHash,
            });
            const { username, phoneNumber, emailAddress, _id } =
              result["ops"][0];
            return {
              success: true,
              message: "Tạo tài khoản thành công",
              userInfo: { username, phoneNumber, emailAddress, _id },
            };
          });
        } else {
          return {
            success: false,
            message:
              "Đăng ký thất bại: Tên người dùng hoặc email đã có người sử dụng",
              ...userInfo
          };
        }
      } else {
        return {
          success: false,
          message: "create Fail: " + errors.toString(),
          ...userInfo,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "create Fail: " + err.toString(),
        ...userInfo,
      };
    }
  }

  static async findUserByUserName(username) {
    try {
      const cursor = await USERS.find({ username: username });
      const users = await cursor.toArray();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async userExisted(username, emailAddress) {
    try {
      const cursor = await USERS.find({
        $or: [{ username: username }, { emailAddress: emailAddress }],
      });

      const users = await cursor.toArray();
      if (users.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  static async userLogin(user) {
    const { username, password } = user;
    let findUser = await this.findUserByUserName(username);
    if (findUser.length > 0) {
      const compareHashPassword = () => {
        return new Promise((reslove, reject) => {
          bcrypt.compare(password, findUser[0].password, (err, result) => {
            if (!err) {
              reslove(result);
            } else {
              reject(err);
            }
          });
        });
      };

      return compareHashPassword()
        .then((passwordValid) => {
          if (passwordValid) {
            const { username, _id, phoneNumber, emailAddress } = findUser[0];
            return {
              success: true,
              message: "LOGINED",
              userInfo: { username, _id, phoneNumber, emailAddress },
            };
          } else {
            return { success: false, message: "Mật khẩu sai rồi @_@ " };
          }
        })
        .catch((err) => {
          return { success: false, message: `ERROR: ${err}` };
        });
    } else {
      return {
        success: false,
        message: "Người dùng không tồn tại @_@",
      };
    }
  }
  static checkValid(userInfo) {
    let errors = [];
    if (
      userInfo.username === "" ||
      userInfo.username.length < 4 ||
      userInfo.username.length >= 20 ||
      userInfo.username === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.usernameError);
    }
    if (
      userInfo.password === "" ||
      userInfo.password.length < 6 ||
      userInfo.password === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.passwordError);
    }
    if (
      userInfo.phoneNumber === "" ||
      userInfo.phoneNumber.length < 6 ||
      userInfo.phoneNumber.length > 11 ||
      userInfo.phoneNumber === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.phoneError);
    }
    if (
      userInfo.emailAddress === "" ||
      userInfo.emailAddress.length < 4 ||
      userInfo.emailAddress.length > 50 ||
      userInfo.emailAddress === undefined
    ) {
      errors.push(ERROR_MESSAGE_TYPE.emailError);
    }
    return errors;
  }
}
