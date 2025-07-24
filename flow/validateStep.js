import  validateAgainst  from '../utils/validateAgainst.js';

export function validateStep(flow, stepName, data) {
  const step = flow.steps?.[stepName];
  if (!step) throw new Error(`Step "${stepName}" does not exist`);

  const errors = [];

  if (step.onEnter) {
    try { step.onEnter(data); }
    catch (e) { errors.push(`onEnter error: ${e.message}`); }
  }

  const { ok, errors: valErrors } = validateAgainst(step.schema, data);
  const allErrors = [...valErrors];

  if (ok && step.onExit) {
    try { step.onExit(data); }
    catch (e) { allErrors.push(`onExit error: ${e.message}`); }
  }

  return { ok: allErrors.length === 0, errors: allErrors };
}
