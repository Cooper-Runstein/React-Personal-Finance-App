import alterDebtValues, { getPreviousDebtInstance, getPaymentValues, applyExpenses } from '../src/functions/debt-value-applicator';
import blankInstanceConstructor from '../src/functions/blankInstanceConstructor';

describe('test getPayments', ()=>{
  let testDebt = blankInstanceConstructor();
  testDebt.id = 'debt123';
  testDebt.linkedPaymentIndex = ['exp124', 'exp123'];

  let expense1 = blankInstanceConstructor();
  expense1.id = 'exp123';
  expense1.value = 40;

  let expense2 = blankInstanceConstructor();
  expense2.id = 'exp124';
  expense2.value = 20;

  let expense3 = blankInstanceConstructor();
  expense3.id = 'exp125';
  expense3.value = 100;

  let year = {
    expenses: {
      instances: [
        expense1,
        expense2,
        expense3
      ]
    }
  }

  let expenseIdsArray1 = testDebt.linkedPaymentIndex;
  let expenseIdsArray2 = [];
  let expenseIdsArray3 = ['exp125'];

  test('It correctly sums 2 target expenses', ()=>{
    expect(getPaymentValues(year, expenseIdsArray1)).toBe(60);
  });

  test('It correctly returns 0 if idArray Empty', ()=>{
    expect(getPaymentValues(year, expenseIdsArray2)).toBe(0);
  });

  test('It correctly returns 1 value if idArray length is 1', ()=>{
    expect(getPaymentValues(year, expenseIdsArray3)).toBe(100);
  });

});

describe('test main function', ()=>{
  let debt1 = blankInstanceConstructor();
  debt1.value = 100;
  debt1.linkedPaymentIndex = ['exp123'];
  debt1.id = 'deb123';

  let expense1 = blankInstanceConstructor();
  expense1.value = 50;
  expense1.id = 'exp123';
  expense1.connectedId = 'deb123';

  let years = [
    {
      debt: {
        instances: [
          debt1
        ]
      },
      expenses: {
        instances: [
          expense1
        ]
      }
    },
    {
      debt: {
        instances: [
          debt1
        ]
      },
      expenses: {
        instances: [
          expense1
        ]
      }
    },
    {
      debt: {
        instances: [
          debt1
        ]
      },
      expenses: {
        instances: [
          expense1
        ]
      }
    },
  ]

  let debtI1 = blankInstanceConstructor();
  debtI1.value = 100;
  debtI1.linkedPaymentIndex = ['exp123'];
  debtI1.id = 'deb123';
  debtI1.interest = 10;

  let debtNoAttachMents = blankInstanceConstructor();
  debtNoAttachMents.value = 100;
  debtNoAttachMents.interest = 10;

  let debtNoAttachMents2 = blankInstanceConstructor();
  debtNoAttachMents2.value = 100;
  debtNoAttachMents2.interest = 5;

  let yearsI = [
    {
      debt: {
        instances: [
          debtI1,
          debtNoAttachMents,
          debtNoAttachMents2
        ]
      },
      expenses: {
        instances: [
          expense1
        ]
      }
    },
    {
      debt: {
        instances: [
          debtI1,
          debtNoAttachMents,
          debtNoAttachMents2
        ]
      },
      expenses: {
        instances: [
          expense1
        ]
      }
    },
    {
      debt: {
        instances: [
          debtI1,
          debtNoAttachMents,
          debtNoAttachMents2
        ]
      },
      expenses: {
        instances: [
          expense1
        ]
      }
    },
  ]
  test('it outputs', ()=>{
    expect(alterDebtValues(years)).toBe.Ok;
  })
  test('it outputs array of size input', ()=>{
    expect(alterDebtValues(years)).toHaveLength(3);
  })

  test('it works w/ no interest @ year1', ()=>{
    expect(alterDebtValues(years)[0].debt.instances[0].value).toBe(100);
    expect(alterDebtValues(years)[0].expenses.instances[0].value).toBe(50);
  })
  test('it works w/ no interest @ year2', ()=>{
    expect(alterDebtValues(years)[1].debt.instances[0].value).toBe(50);
  })
  test('it works w/ no interest @ year3', ()=>{
    expect(alterDebtValues(years)[2].debt.instances[0].value).toBe(0);
  })


  test('it works w/ interest @ year1', ()=>{
    expect(alterDebtValues(yearsI)[0].debt.instances[0].value).toBe(100);
    expect(alterDebtValues(yearsI)[0].expenses.instances[0].value).toBe(50);
  })
  test('it works w/ interest @ year2', ()=>{
    expect(alterDebtValues(yearsI)[1].debt.instances[0].value).toBeCloseTo(60);
  })
  test('it works w/ interest @ year3', ()=>{
    expect(alterDebtValues(yearsI)[2].debt.instances[0].value).toBeCloseTo(16);
  })

  test('it applies interest without attatchments', ()=>{
    expect(alterDebtValues(yearsI)[1].debt.instances[1].value).toBeCloseTo(110);
  })

  test('it applies interest without attatchments', ()=>{
    expect(alterDebtValues(yearsI)[1].debt.instances[2].value).toBeCloseTo(105);
  })
});
