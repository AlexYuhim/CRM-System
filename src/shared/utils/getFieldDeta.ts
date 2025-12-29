type FieldObject = { [key: string]: any };
export const getFieldData = <T extends FieldObject>(
  oldField: T,
  newField: T
): Partial<T> => {
  const resultObj: Partial<T> = {};
  for (let key in newField) {
    if (newField.hasOwnProperty(key)) {
      if (oldField[key] !== newField[key]) {
        resultObj[key] = newField[key];
      }
    }
  }
  return resultObj;
};
