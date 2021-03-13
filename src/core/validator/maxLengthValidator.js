export const maxLengthValidator = ({value, customArgs}) => {
  const data = value ? (typeof value === 'string' ? value : value.value) : '';
  const succeeded = data.toString().length <= customArgs.max;
  const error =
    customArgs.messageError ||
    `Should be less than ${customArgs.max} characters`;

  return {
    succeeded,
    message: succeeded ? '' : error,
  };
};
