export const objectFilter = (obj, callBack) => {
  if (!obj) return obj;
  Object.assign(
    ...Object.keys(obj)
      .filter((key) => callBack(obj[key]))
      .map((key) => ({ [key]: true }))
  );
};

export const removeKeyIncludingString = (obj, string) => {
  if (!obj) return obj;
  Object.keys(obj).forEach((key) => {
    if (key.includes(string)) {
      delete obj[key];
    }
  });
};

export const removeExtraFields = (obj, ...fields) => {
  if (!obj) return obj;
  Object.keys(obj).forEach((key) => {
    if (!!fields?.find((el) => el === key)) {
      delete obj[key];
    }
  });
};

export const removeEmptyNullFields = (obj, ...fields) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '' || obj[key] == null) {
      delete obj[key];
    }
  });
};

export const changedValueToNestedKey = (obj, nestedKey, ...fields) => {
  Object.keys(obj).forEach((key) => {
    if (!!fields?.find((el) => el === key)) {
      obj[key] = obj[key][nestedKey];
    }
  });
};
