import blankInstanceConstructor from '../src/functions/blankInstanceConstructor';
import expect from 'expect';

describe('Test blank Instance Creation', ()=>{
  let newInstance1 = blankInstanceConstructor();
  let newInstance2 = blankInstanceConstructor();

  test('New Instance has an id', ()=>{
    expect(newInstance1.id).toBeDefined;
  });

  test('New instance pendings equal real values', ()=>{
    expect(newInstance1.value === newInstance1.pendingValue).toBe(true);
    expect(newInstance1.title === newInstance1.pendingTitle).toBe(true);
    expect(newInstance1.interest === newInstance1.pendingInterest).toBe(true);
    expect(newInstance1.growth === newInstance1.pendingGrowth).toBe(true);
    expect(newInstance1.duration === newInstance1.pendingDuration).toBe(true);
  });

  test('Expect different random id values', ()=>{
    expect(newInstance1.id !== newInstance2.id).toBe(true);
    expect(newInstance1.id !== blankInstanceConstructor().id ).toBe(true);
  })
});
