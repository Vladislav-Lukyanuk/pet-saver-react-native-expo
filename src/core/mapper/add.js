export const addMapper = (obj) => ({
  image: obj.image.value ? obj.image.value : null,
  title: obj.title.value,
  description: obj.description.value,
  coordinates: [obj.coordinate.value],
});
