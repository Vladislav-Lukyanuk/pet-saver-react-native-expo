export const minLengthValidator = ({value, customArgs}) => {
  const data = value ? (typeof value === 'string' ? value : value.value) : '';
  const succeeded = data.toString().length >= customArgs.min;

  const error =
    customArgs.messageError ||
    `Should be greater than ${customArgs.min} characters`;

  return {
    succeeded,
    message: succeeded ? '' : error,
  };
};
