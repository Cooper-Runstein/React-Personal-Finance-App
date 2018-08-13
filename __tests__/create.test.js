import { applyGrowth, createIncomeInstances, createExpensesInstances, isDurationApplied, reassignPending} from '../src/functions/create_functions.js';
import expect from 'expect';

describe('Test applyGrowthTests function', ()=>{
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

describe ('Test Create Income Instances Function', ()=>{
  let testPackageIncome1 = {
    title: 'Income',
    instances: [
    {
      title: 'Set Job Title',
      value: 5000,
      isEditing: true,
      pendingTitle: 'Set Job Title',
      pendingValue: '5000',
      duration: "3",
      pendingDuration: "3",
    }],
  }
  let testPackageIncome3 = {
    title: 'Income',
    instances: [
    {
      title: 'Set Job Title',
      value: 5000,
      isEditing: true,
      pendingTitle: 'Set Job Title',
      pendingValue: '5000',
      duration: "retirement",
      pendingDuration: "retirement",
    }],
  }

  let testPackageIncome2 = {
    title: 'Income',
    instances: [
    {
      title: 'Set Job Title',
      value: 1000,
      isEditing: true,
      pendingTitle: 'Set Job Title',
      pendingValue: '1000',
      growth: '10',
      pendingGrowth: '10',
      duration: 'retirement'
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

    test('Expect Exact Instance to exist at yearIndex 1', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 1).instances[0]).toMatchObject(testPackageIncome1.instances[0]);
    })

    test('Expect Exact Instance to exist at yearIndex 1', ()=>{
      expect(createIncomeInstances(testPackageIncome3, 1).instances[0]).toMatchObject(testPackageIncome3.instances[0]);
    })

    test('Expect Second Instance to exist', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 1).instances[0]).not.toBe(undefined);
    });

    test('Expect instance to not be rendered if yearIndex>duration', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 4).instances[0]).toBe(undefined);
    });

    test('Expect applied starting instance to equal starting instance', ()=>{
      expect(createIncomeInstances(testPackageIncome1, 0).instances[0]).toMatchObject(testPackageIncome1.instances[0]);
    });

    test('Expect year 2 instance to have growth applied', ()=>{
      let obj = { value: 1100};
      expect(createIncomeInstances(testPackageIncome2, 1).instances[0]).toMatchObject(obj);
    });

})

describe('Test Reassign Pending Function', ()=>{
  let obj1 = {
    title: 'burgers',
    pendingTitle: 'not burgers',
    value: 5000,
    pendingValue: 3000,
  }
  test('Title and pending title equal each other', ()=>{
    expect(reassignPending(obj1).pendingTitle).toBe('burgers');
  })

  test('Title and pending title equal each other', ()=>{
    expect(reassignPending(obj1).pendingValue).toBe('5000');
  })
})
