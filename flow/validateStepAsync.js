import  validateAgainst  from '../utils/validateAgainst.js';

export async function validateStepAsync(flowSchema, stepName, value, options = {}) {
  const step = flowSchema?.steps?.[stepName];

  if (!step) {
    return {
      ok: false,
      verdict: `❌ Step "${stepName}" is not defined.`,
      reason: 'Invalid step name.',
      fix: () => null
    };
  }

  const { schema, onEnter, onExit } = step;
  const debug = options.debug ?? false;
  const logs = [];

  if (onEnter) {
    if (debug) logs.push(`[DEBUG] Entering step "${stepName}"...`);
    const enterVerdict = await onEnter(value, options.context || {});
    if (enterVerdict && enterVerdict.ok === false) {
      return {
        ...enterVerdict,
        step: stepName,
        debug: logs
      };
    }
  }

  const result = validateAgainst(schema, value);
  if (debug) logs.push(`[DEBUG] Ran schema validation: ${result.verdict}`);

  if (!result.ok) {
    return {
      ...result,
      step: stepName,
      debug: logs
    };
  }

  if (onExit) {
    if (debug) logs.push(`[DEBUG] Exiting step "${stepName}"...`);
    const exitVerdict = await onExit(value, options.context || {});
    if (exitVerdict && exitVerdict.ok === false) {
      return {
        ...exitVerdict,
        step: stepName,
        debug: logs
      };
    }
  }

  return {
    ...result,
    step: stepName,
    debug: logs,
    verdict: `✅ PASS: ${result.verdict}`
  };
}
