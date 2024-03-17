/* eslint-disable no-useless-escape */
export function isEmail(enteredEmail: string) {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return regExp.test(enteredEmail);
}

export function isPassword(enteredPassword: string) {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

  return regExp.test(enteredPassword);
}

export function isPasswordWithSpecialSymbol(enteredPassword: string) {
  const regExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  return regExp.test(enteredPassword);
}

export function isId(enteredId: string) {
  const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;

  return regExp.test(enteredId);
}
