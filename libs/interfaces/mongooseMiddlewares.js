export const usingSchemaAsModel = (schema) => {
  return function (next) {
    const fieldsToRetrieve = Object.keys(schema.paths).join(' ');
    this.select(fieldsToRetrieve);
    next();
  };
};
