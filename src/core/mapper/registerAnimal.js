export const registerAnimalMapper = (obj) => ({
  image: obj.image.value ? obj.image.value : null,
  name: obj.name.value,
});
