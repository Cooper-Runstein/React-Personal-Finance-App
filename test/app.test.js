import { applyGrowth, createIncomeInstances, isDurationApplied} from '../src/app_functions.js';
import expect from 'expect';

describe('applyGrowthTests', ()=>{
    let testObj1 = {
      title: 'My Instance',
      value: 100,
      growth: 10
    }

    let testObj2 = {
      growth: '10',
      value: 100
    }

    let funcWithObj1 = applyGrowth(testObj1, 1);

  test('Expects Function to only change value', () => {
    expect(applyGrowth(testObj1)).toMatchObject({title: 'My Instance', growth: 10});
  });

  test('Expects Function to return 110', () => {
    expect(funcWithObj1.value).toBeCloseTo(110);
  });

  test('Expect Function to num if given string', ()=>{
    expect(applyGrowth(testObj2, 1).value).toBeCloseTo(110);
  })
});

describe('Test isDurational function', ()=>{
  let testObj1 = {
    title: "My Instance",
    duration: "3",
  }
  let testObj2 = {
    title: "My Instance",
    duration: 3,
  }

  test('Expects less than yearIndex + 1 to be true', ()=>{
    expect(isDurationApplied(testObj1, 1)).toBe(true);
  });

  test('Expects over yearIndex + 1 to be false', ()=>{
    expect(isDurationApplied(testObj1, 3)).toBe(false);
  });

  test('Expects equal to yearIndex + 1 to be true', ()=>{
    expect(isDurationApplied(testObj1, 2)).toBe(true);
  });

  test('Expects number inputs to work', ()=>{
    expect(isDurationApplied(testObj2, 1)).toBe(true);
    expect(isDurationApplied(testObj2, 3)).toBe(false);
    expect(isDurationApplied(testObj2, 2)).toBe(true);
  })

});

describe ('Test Create Income Instances', ()=>{
  let testPackageIncome1 = {
    title: 'Income',
    instances: [
    {
      title: 'Set Job title',
      value: 5000,
      isEditing: true,
      pendingTitle: 'Set Job Title',
      pendingValue: '5000',
      pendingInterest: '0',
      interest: 0,
      length: 'auto',
      pendingLength: 'auto',
      duration: "3",
      pendingDuration: "retirement",
      growth: '10',
      pendingGrowth: '0'

    }],
    }


    test('Function returns Object with same title', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 0).title).toBe('Income');
    });


    test('Expect Instances to exist', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 0).instances).not.toBe(undefined);
    });

    test('Expect First Instance to exist', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 0).instances[0]).not.toBe(undefined);
    });

    test('Expect instance to not be rendered if yearIndex>duration', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 4).instances[0]).toBe(undefined);
    })


})
