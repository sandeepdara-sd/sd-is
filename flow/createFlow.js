import { validateStep } from './validateStep.js';
import { validateStepAsync } from './validateStepAsync.js';

export function createFlow(flowSchema, options = {}) {
  const { order } = flowSchema;
  const debug = options.debug ?? false;

  let currentIndex = 0;
  const history = [];
  const stepData = {};
  const debugLog = [];

  function log(...args) {
    if (debug) {
      const msg = '[Flow] ' + args.join(' ');
      console.log(msg);
      debugLog.push(msg);
    }
  }

  function currentStep() {
    return order[currentIndex];
  }

  function goTo(step) {
    const idx = order.indexOf(step);
    if (idx === -1) throw new Error(`Step "${step}" not found in flow`);
    currentIndex = idx;
    log(`Moved to step "${step}"`);
  }

  function next() {
    if (currentIndex < order.length - 1) {
      currentIndex++;
      log(`Moved to next step "${currentStep()}"`);
    } else {
      throw new Error('Already at last step');
    }
  }

  function back() {
    if (currentIndex > 0) {
      currentIndex--;
      log(`Moved back to step "${currentStep()}"`);
    } else {
      throw new Error('Already at first step');
    }
  }

  function reset() {
    currentIndex = 0;
    history.length = 0;
    for (let key in stepData) delete stepData[key];
    log('Flow reset');
  }

  function restart() {
    reset();
  }

  function validate(data) {
    const step = currentStep();
    const result = validateStep(flowSchema, step, data);
    if (result.ok) {
      stepData[step] = data;
      history.push(step);
    }
    return result;
  }

  async function validateAsync(data) {
    const step = currentStep();
    const result = await validateStepAsync(flowSchema, step, data, { debug });
    if (result.ok) {
      stepData[step] = data;
      history.push(step);
    }
    return result;
  }

  async function proceed(data) {
    const result = await validateAsync(data);
    if (result.ok) {
      if (currentIndex < order.length - 1) {
        currentIndex++;
        log(`Proceeded to next step: "${currentStep()}"`);
      } else {
        log(`Reached final step: "${currentStep()}"`);
      }
    } else {
      log(`Validation failed at step "${currentStep()}"`);
    }
    return result;
  }

  function getState() {
    return {
      currentStep: currentStep(),
      history: [...history],
      stepData: { ...stepData }
    };
  }

  function getDebugLog() {
    return [...debugLog];
  }

  return {
    currentStep,
    goTo,
    next,
    back,
    validate,
    validateAsync,
    proceed,
    restart,
    reset,
    getState,
    getDebugLog
  };
}
