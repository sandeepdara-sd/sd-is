export function defineFlowSchema(config) {
  const { steps, order = Object.keys(config.steps || {}) } = config;
  if (!steps || typeof steps !== 'object') {
    throw new Error('Flow schema must include "steps" object');
  }

  const flow = {};
  for (const name of Object.keys(steps)) {
    const { schema, onEnter, onExit } = steps[name];
    if (!schema) throw new Error(`Step "${name}" must define a schema`);

    flow[name] = {
      schema,
      onEnter: typeof onEnter === 'function' ? onEnter : undefined,
      onExit: typeof onExit === 'function' ? onExit : undefined
    };
  }

  order.forEach(step => {
    if (!flow[step]) throw new Error(`Order refers to unknown step "${step}"`);
  });

  return { steps: flow, order };
}
