import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

export const signToken = (isAdmin: boolean, userId: string) => {
  jwt.sign(
    {
      isAdmin,
      userId
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m', algorithm: 'RS256' },
    (err, token) => {
      if (err) throw new Error('An error occurred signing the token');

      // return the token to the user
      console.log('token ', token);
    }
  );
};

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(+process.env.salts);
    const hashed = await bcrypt.hash(password, salt);
    return { hashed, salt };
  } catch (err) {
    let message = 'an error occurred hashing the password';

    if (err instanceof Error) {
      message = err.message;
    }
    throw new Error(message);
  }
};

export const generateId = () => {
  return uuidv4();
};

// export const verifyToken = () => {

// };

// send jwt to client

/*


res.setHeader('Authorization', `Bearer ${token}`)


// verify the jwt 
const payload = jwt.verify(token, secretKey)

*/
