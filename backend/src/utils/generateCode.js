import crypto from "crypto";

//crypto generates a random 6digit unique code

const generateCode = () => {
  const mainString = "abcdefghijklmnopquvwxyzABCDEFGHIJKLMNOPQUVWXYZ0123456789";

  const shortCode = "";

  for (let i = 0; i < 6; i++) {
    shortCode += mainString.charAt(Math.floor(Math.random() * 62));
  }

  return shortCode;
};

export default generateCode;
