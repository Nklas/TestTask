const { getRepository } = require("typeorm");
const userEntity = require("./userEntity");

const getUserById = async (id) => {
  return await getRepository(userEntity)
    .createQueryBuilder("user")
    .where("user.id = :id", {id: id})
    .getOne();
};

const createUser = async (req, res) => {
  const {user_name, email, data} = req.body;
  const user = {user_name, email, data};

  const userRepository = getRepository(userEntity);
  //test for unique user email
  const presentUser = await getRepository(userEntity)
    .createQueryBuilder("user")
    .where("user.email = :email", {email: email})
    .getOne();

  if (presentUser) {
    return res.send('Email must be unique');
  } else {
    const saveUser = await userRepository.save(user);
    return res.send(saveUser);
  }
};

const getAllUsers = async (req, res) => {
  const users = await getRepository(userEntity)
    .createQueryBuilder("user")
    .getMany();

  return res.send(users);
};

const getUser = async (req, res) => {
  const userName = req.params.userName;

  const user = await getRepository(userEntity)
    .createQueryBuilder("user")
    .where("user.user_name = :user_name", {user_name: userName})
    .getOne();
  if (user) {
    return res.send(user);
  } else {
    return res.sendStatus(404);
  }
};

const updateUser = async (req, res) => {
  const userNameParams = req.params.userName;
  const { user_name, email, data, id } = req.body;

  await getRepository(userEntity)
    .createQueryBuilder()
    .update(userEntity)
    .set({
      user_name,
      email,
      data,
    })
    .where("user.user_name = :user_name", {user_name: userNameParams})
    .execute();

  const updatedUser = await getUserById(id);
  return res.send(updatedUser);
};

const removeUser = async (req, res) => {
  const userName = req.params.userName;

  const user = await getRepository(userEntity)
    .createQueryBuilder()
    .delete()
    .from(userEntity)
    .where("user.user_name = :user_name", {user_name: userName})
    .execute();

  return res.send(user);
};

const removeAllUsers = async (req, res) => {
  const users = await getRepository(userEntity)
    .createQueryBuilder()
    .delete()
    .from(userEntity)
    .execute();

  return res.send(users);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  removeUser,
  removeAllUsers
};