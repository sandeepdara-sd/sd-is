const getType = (value) => {
  if (value === null) return 'null';              
  if (Array.isArray(value)) return 'array';       
  return typeof value;                             
};

export default function assertType(value, expectedType, customName = 'value') {
  const actualType = getType(value);
  if (actualType !== expectedType) {
    throw new TypeError(
      `❌ ${customName} expected to be '${expectedType}', but got '${actualType}'`
    );
  }
  console.log(`✅ ${customName} is of type '${expectedType}'`);
  return true; 
}
