import MD5 from 'crypto-js/md5'
function passwordEncrypt (password) {
  return MD5(password).toString()
}


export {
  passwordEncrypt
};