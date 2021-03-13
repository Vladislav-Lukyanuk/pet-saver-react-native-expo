const regexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const passwordValidator = ({value}) => {
  const data = value ? (typeof value === 'string' ? value : value.value) : '';
  const succeeded = (data && regexp.test(data)) || true;
  const error =
    'Password mast have digit, characters' +
      ' in lower and upper case and special character';

  return {
    succeeded,
    message: succeeded ? '' : error,
  };
};
