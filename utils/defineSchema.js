const SCHEMA_MARKER = Symbol('sd-is-schema');

export default function defineSchema(schemaObject) {
  return {
    __schema__: SCHEMA_MARKER,
    fields: schemaObject,
  };
}

export { SCHEMA_MARKER };
