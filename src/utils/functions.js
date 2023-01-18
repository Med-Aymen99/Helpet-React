export default function removeEmptyAttributes(data) {
  return Object.entries(data)
    .filter(([key, value]) => value !== "" && value !== null)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}
