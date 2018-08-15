import alterDebtValues, { getPreviousDebtInstance, getPaymentValues, applyExpenses } from '../src/functions/debt-value-applicator';
import blankInstanceConstructor from '../src/functions/blankInstanceConstructor';

// describe('test get Prev Debt instance', ()=>{
//   let years = [
//     {
//       debt: {
//         instances: [
//           {
//             id: '123',
//             value: 20
//           },
//           {
//             id: '124',
//             value: 30
//           }
//         ]
//       }
//     },
//     {
//       debt: {
//         instances: {
//           id: '123',
//           value: 50
//         }
//       }
//     }
//   ]

//   let prevDebt = getPreviousDebtInstance(years, 1, '123');
//   test('Gets previous value', ()=>{
//     expect(prevDebt.value).toBe(20);
//   })
// })

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

// describe("Test applyExpenses", ()=>{
//   let debt1 = blankInstanceConstructor();
//   let expense1 = blankInstanceConstructor();
//   debt1.id = 'debt1';
//   debt1.value = 100;
//   debt1.linkedPaymentIndex = ['exp1'];
//   expense1.id = 'exp1';
//   expense1.value = 25;
//   expense1.connectedId = 'debt1';




//   let years = [
//     {
//       debt: {
//         instances: [
//           debt1
//         ]
//       },
//       expenses: {
//         instances: [
//           expense1
//         ]
//       }
//     },
//     {
//       debt: {
//         instances: [
//           debt1
//         ]
//       },
//       expenses: {
//         instances: [
//           expense1
//         ]
//       }
//     }
//   ];

//   test('Test at Year 0', ()=>{
//     expect(applyExpenses(years, 0, debt1).value).toBe(100);
//   });

//   test('Test at year 1', ()=>{
//     expect(applyExpenses(years, 1, debt1).value).toBe(75);
//   })
// })

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
  test('it outputs', ()=>{
    expect(alterDebtValues(years)).toBe.Ok;
  })
  test('it outputs array of size input', ()=>{
    expect(alterDebtValues(years)).toHaveLength(3);
  })
  test('it expects correct outputs', ()=>{
    expect(alterDebtValues(years)[0].debt.instances[0].value).toBe(100);
    expect(alterDebtValues(years)[0].expenses.instances[0].value).toBe(50);
  })
  test('it works at year 2', ()=>{
    expect(alterDebtValues(years)[1].debt.instances[0].value).toBe(50);
  })
  test('it works at yea r3 ', ()=>{
    expect(alterDebtValues(years)[2].debt.instances[0].value).toBe(0);
  })
});
