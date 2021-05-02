import initiateDB from './index';

export const getUsersByEmail = async (email) => {
  try {
    const db = await initiateDB();
    const userExist = await db.users
      .where({ email: email })
      .limit(1)
      .toArray(result => {
        return result;
      });

    return userExist;
  } catch (err) {
    console.log(err);
  }
}
