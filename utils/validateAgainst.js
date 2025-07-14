import { SCHEMA_MARKER } from './defineSchema.js';

function getType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

export default function validateAgainst(schema, data, path = '', options = {}) {
  const { strictMode = false } = options;

  if (!schema || schema.__schema__ !== SCHEMA_MARKER) {
    throw new Error('Invalid schema: must be created using defineSchema()');
  }

  const fields = schema.fields;
  const errors = [];

  // 🔐 Check for unexpected fields in data
  if (strictMode) {
    for (const key of Object.keys(data)) {
      if (!fields.hasOwnProperty(key)) {
        const fullPath = path ? `${path}.${key}` : key;
        errors.push(`❌ Unexpected field "${fullPath}" not defined in schema`);
      }
    }
  }

  for (const key in fields) {
    const descriptor = fields[key];
    const value = data[key];
    const fullPath = path ? `${path}.${key}` : key;

    // 🔁 Nested schema
    if (descriptor && descriptor.__schema__ === SCHEMA_MARKER) {
      if (getType(value) !== 'object') {
        errors.push(`❌ Field "${fullPath}" → expected object for nested schema, got '${getType(value)}'`);
        continue;
      }

      const result = validateAgainst(descriptor, value, fullPath, options);
      errors.push(...result.errors);
      continue;
    }

    // 🧠 Descriptor parsing
    let expectedTypes = [];
    let optional = false;
    let allowedEnums;
    let customValidator;

    if (typeof descriptor === 'string' || Array.isArray(descriptor)) {
      expectedTypes = Array.isArray(descriptor) ? descriptor : [descriptor];
    } else if (typeof descriptor === 'object') {
      // 🔍 Validate descriptor keys
      const allowedKeys = ['type', 'optional', 'default', 'enum', 'custom'];
      for (const prop in descriptor) {
        if (!allowedKeys.includes(prop)) {
          errors.push(`❌ Field "${fullPath}" → unknown descriptor key "${prop}"`);
        }
      }

      if (!descriptor.type && !descriptor.enum) {
        errors.push(`❌ Field "${fullPath}" → missing required 'type' or 'enum'`);
        continue;
      }

      expectedTypes = Array.isArray(descriptor.type)
        ? descriptor.type
        : [descriptor.type];

      optional = descriptor.optional || false;
      allowedEnums = descriptor.enum;
      customValidator = descriptor.custom;
    } else {
      errors.push(`❌ Field "${fullPath}" → invalid descriptor`);
      continue;
    }

    const actualType = getType(value);
    const isMissing = value === undefined;

    // 🔸 Missing value
    if (isMissing) {
      if (optional || expectedTypes.includes('undefined')) continue;
      errors.push(`❌ Field "${fullPath}" is required but missing`);
      continue;
    }

    // 🔘 Enum validation
    if (allowedEnums && !allowedEnums.includes(value)) {
      errors.push(`❌ Field "${fullPath}" → expected one of [${allowedEnums.join(', ')}], got '${value}'`);
      continue;
    }

    // 🔠 Type validation
    if (!expectedTypes.includes(actualType)) {
      errors.push(`❌ Field "${fullPath}" → expected ${expectedTypes.join(' or ')}, got '${actualType}'`);
      continue;
    }

    // 🧪 Custom validation
    if (typeof customValidator === 'function') {
      const result = customValidator(value);
      if (result !== true) {
        errors.push(`❌ Field "${fullPath}" → custom validator failed${typeof result === 'string' ? `: ${result}` : ''}`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors
  };
}
