export const addPlusAndMinus = (data) => {
  if (typeof data === 'object') {
    for (const key of Object.keys(data)) {
      data[key] = data[key] >= 0 ? `+${data[key]}` : `${data[key]}`;
    }
    return data;
  }
  return data >= 0 ? `+${data}` : `${data}`;
};
