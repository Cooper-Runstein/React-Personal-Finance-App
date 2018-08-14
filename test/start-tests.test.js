import expect from 'expect';
import blankInstanceConstructor from '../src/functions/blankInstanceConstructor';

import { confirmFunction, changeFunction} from '../src/functions/start-functions';


describe('test confirm Function', ()=>{
  let testInstance1 = blankInstanceConstructor();
  testInstance1.pendingValue = '50';
  testInstance1.pendingInterest = '10';

  let testInstance2 = blankInstanceConstructor();
  testInstance2.pendingValue = '50r';
  testInstance2.pendingInterest = 'r30';

  let testInstance3 = blankInstanceConstructor();
  testInstance3.pendingValue = '100';
  testInstance3.pendingInterest = '0';

  test('converts strings to floats', ()=>{
    expect(confirmFunction(testInstance1).value).toBe(50);
    expect(confirmFunction(testInstance1).interest).toBe(10);
  });

  test('Removes all non number input', ()=>{
    expect(confirmFunction(testInstance2).value).toBe(50);
    expect(confirmFunction(testInstance2).interest).toBe(30);
  })

  test('Expect pending to remain the same', ()=>{
    expect(confirmFunction(testInstance2).pendingValue).toBe('50r');
    expect(confirmFunction(testInstance2).pendingInterest).toBe('r30');
    expect(confirmFunction(testInstance3).pendingInterest).toBe('0');
  })
});

// describe("test onChange function", ()=>{

//   let testInstance1 = blankInstanceConstructor();
//   testInstance1.pendingValue = '50';
//   testInstance1.pendingInterest = '10';

//   test('', ()=>{

//   })
// })
