export const loginMapper = (obj) => ({
  login: obj.login.value.trim(),
  password: obj.password && obj.password.value,
});
