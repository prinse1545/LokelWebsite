import aes from "aes-js";


const configAES = (key) => {

  // defining aes key
  const key128 = key.split(",").map((int) => parseInt(int));

  const aesCtr = new aes.ModeOfOperation.ctr(key128)

  return aesCtr
}

export {
  configAES
}
