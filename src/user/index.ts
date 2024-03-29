import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

export const signToken = (role: string, userId: string): string => {
  const token = jwt.sign(
    {
      role,
      userId
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m', algorithm: 'RS256' }
  );

  if (!token) throw new Error('An error occurred signing the token');
  console.log('token ', token);
  return token;
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

export const verifyPassword = async (
  dbPassword: string,
  loginPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(loginPassword, dbPassword);
};

export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['RS256']
  });
};

// send jwt to client

/*


res.setHeader('Authorization', `Bearer ${token}`)


// verify the jwt 
const payload = jwt.verify(token, secretKey)

*/
