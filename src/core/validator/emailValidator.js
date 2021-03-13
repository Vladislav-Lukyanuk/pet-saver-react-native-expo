// eslint-disable-next-line max-len,no-useless-escape
const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidator = ({value}) => {
  const data = value ? (typeof value === 'string' ? value : value.value) : '';
  const succeeded = regexp.test(data.trim());
  const error = 'Type the email please';

  return {
    succeeded,
    message: succeeded ? '' : error,
  };
};
