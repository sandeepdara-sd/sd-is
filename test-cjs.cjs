(async () => {
  // --- Import from index.js using require (CommonJS style) ---
  const {
    isEmptyObject,
    smartCheck,
    listFunctions,
    isBoolean,
    assertType,
    defineFlowSchema,
    validateStep,
    defineSchema,
    validateAgainst,
    createFlow,
    validateStepAsync
  } = require('./index.js');

  // --- BASIC TESTING ---
  console.log(listFunctions());
  console.log(isEmptyObject({})); // true
  console.log(smartCheck.isEmptyObject({ a: 6 }));
  const fixed = smartCheck.isEmptyObject({ a: 6 }).fix();
  console.log(fixed); // { a: 6 }
  console.log(isBoolean()); // false
  console.log(smartCheck.isBoolean(true)); // true
  console.log(assertType('hello', 'string')); // ✅ value is of type 'string'

  const userSchema = defineSchema({
    name: { type: 'string' },
    age: { type: 'number', optional: true },
    status: { type: 'string', enum: ['active', 'inactive'] }
  });

  const input = { name: 'Tony', age: 24, extra: 'whoops' };
  const result = validateAgainst(userSchema, input, '', { strictMode: true });
  if (!result.ok) console.log(result.errors);

  console.log(smartCheck.isPromise(Promise.resolve())); // true

  // --- FLOW TESTING ---
  const flow = defineFlowSchema({
    steps: {
      account: {
        schema: defineSchema({
          email: { type: 'string', required: true },
          password: { type: 'string', required: true }
        }),
        onEnter: (data) => {
          if (data.email === 'blocked@example.com') {
            throw new Error('This email is blocked');
          }
        },
        onExit: (data) => {
          if (data.password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }
        }
      },
      profile: {
        schema: defineSchema({
          name: { type: 'string', required: true },
          age: { type: 'number', required: false }
        })
      }
    },
    order: ['account', 'profile']
  });

  const tests = [
    {
      name: '✅ Valid account step',
      step: 'account',
      data: { email: 'user@example.com', password: 'strongpass' },
      expectOk: true
    },
    {
      name: '❌ Missing email',
      step: 'account',
      data: { password: 'strongpass' },
      expectOk: false
    },
    {
      name: '❌ Blocked email onEnter',
      step: 'account',
      data: { email: 'blocked@example.com', password: 'strongpass' },
      expectOk: false
    },
    {
      name: '❌ Short password onExit',
      step: 'account',
      data: { email: 'user@example.com', password: '123' },
      expectOk: false
    },
    {
      name: '✅ Valid profile step',
      step: 'profile',
      data: { name: 'Tony Stark', age: 42 },
      expectOk: true
    },
    {
      name: '❌ Missing required name in profile',
      step: 'profile',
      data: { age: 30 },
      expectOk: false
    }
  ];

  tests.forEach(({ name, step, data, expectOk }) => {
    try {
      const result = validateStep(flow, step, data);
      const pass = result.ok === expectOk;
      console.log(`${pass ? '✅ PASS' : '❌ FAIL'}: ${name}`);
      if (!result.ok && !pass) {
        console.log('  Errors:', result.errors);
      }
    } catch (err) {
      if (!expectOk) {
        console.log(`✅ PASS (caught expected error): ${name}`);
        console.log('  Error:', err.message);
      } else {
        console.log(`❌ FAIL (unexpected error): ${name}`);
        console.error(err);
      }
    }
  });

  // ----------- ASYNC FLOW VALIDATION TEST -----------
  console.log('\n⏳ Async Flow Step Validation Test');

  const asyncFlow = defineFlowSchema({
    steps: {
      emailStep: {
        schema: defineSchema({
          email: { type: 'string', required: true }
        }),
        async onEnter(data) {
          await new Promise(res => setTimeout(res, 100));
          if (data.email === 'blocked@async.com') {
            return {
              ok: false,
              verdict: '❌ Blocked email at onEnter'
            };
          }
        },
        async onExit(data) {
          await new Promise(res => setTimeout(res, 50));
          if (!data.email.endsWith('.com')) {
            return {
              ok: false,
              verdict: '❌ Email must end with .com'
            };
          }
        }
      }
    }
  });

  const asyncTests = [
    {
      name: '✅ Valid async email step',
      step: 'emailStep',
      data: { email: 'tony@stark.com' },
      expectOk: true
    },
    {
      name: '❌ Blocked email (onEnter)',
      step: 'emailStep',
      data: { email: 'blocked@async.com' },
      expectOk: false
    },
    {
      name: '❌ Invalid domain (onExit)',
      step: 'emailStep',
      data: { email: 'user@notvalid.org' },
      expectOk: false
    }
  ];

  for (const { name, step, data, expectOk } of asyncTests) {
    const result = await validateStepAsync(asyncFlow, step, data, { debug: true });
    const pass = result.ok === expectOk;
    console.log(`${pass ? '✅ PASS' : '❌ FAIL'}: ${name}`);
    if (!result.ok && !pass) {
      console.log('  ❗ Verdict:', result.verdict);
      console.log('  🪵 Debug log:', result.debug?.join('\n'));
    }
  }

  // ----------- 🧭 Stateful Flow Engine Test -----------
  console.log('\n🧭 Stateful Flow Engine Test');

  const flowEngine = createFlow(flow, { debug: true });

  console.log('🔰 Initial Step:', flowEngine.currentStep()); // should be 'account'

  const data1 = { email: 'user@example.com', password: 'pass123' };
  const step1 = await flowEngine.proceed(data1);
  console.log(`➡️ Proceeded to: ${flowEngine.currentStep()} | Valid: ${step1.ok}`);

  const data2 = { name: 'Tony Stark' };
  const step2 = await flowEngine.proceed(data2);
  console.log(`✅ Final step completed. Status: ${step2.ok}`);

  console.log('\n🔄 Going back one step...');
  flowEngine.back();
  console.log('🧭 Current Step After Back:', flowEngine.currentStep()); // should be 'account'

  console.log('\n🔁 Restarting flow...');
  flowEngine.restart();
  console.log('🔄 Flow restarted. Current Step:', flowEngine.currentStep()); // should be 'account'

  console.log('\n🪵 Debug Log:');
  console.log(flowEngine.getDebugLog().join('\n'));

})();
