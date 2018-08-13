import alterDebtValues, { getPreviousDebtInstance, getPaymentValues } from '../src/functions/debt-value-applicator';

describe('test get Prev Debt instance', ()=>{
  let years = [
    {
      debt: {
        instances: [
          {
            id: '123',
            value: 20
          }
        ]
      }
    },
    {
      debt: {
        instances: {
          id: '123',
          value: 50
        }
      }
    }
  ]

  let prevDebt = getPreviousDebtInstance(years, 1, '123');
  test('Gets previous value', ()=>{
    expect(prevDebt.value).toBe(20);
  })
})

describe('test getPayments', ()=>{
  let testDebt ={
    title: 'set',
    value: '0',
    id: 'deb123',
    isEditing: true,
    pendingTitle: 'set',
    pendingValue: '0',
    pendingInterest: '0',
    interest: '0',
    duration: 'retirement',
    pendingDuration: 'retirement',
    growth: '0',
    pendingGrowth: '0',
    connectedId: null,
    linkedPaymentIndex: ['exp123'],
    displayLinkOptions: false
  }

  let testExpenses =
    [
      {title: 'set',
      value: 50,
      id: 'exp123',
      isEditing: true,
      pendingTitle: 'set',
      pendingValue: '0',
      pendingInterest: '0',
      interest: '0',
      duration: 'retirement',
      pendingDuration: 'retirement',
      growth: '0',
      pendingGrowth: '0',
      connectedId: null,
      linkedPaymentIndex: [],
      displayLinkOptions: false}
    ]


  test('test w/ 1exp and 1debt', ()=>{
    expect(getPaymentValues(testDebt, testExpenses)).toBe(50);
  })
});

describe('test main function', ()=>{
  let years = [
    {
      debt: {
        instances: [
          {title: 'set',
          value: 100,
          id: 'deb123',
          isEditing: true,
          pendingTitle: 'set',
          pendingValue: '0',
          pendingInterest: '0',
          interest: '0',
          duration: 'retirement',
          pendingDuration: 'retirement',
          growth: '0',
          pendingGrowth: '0',
          connectedId: null,
          linkedPaymentIndex: ['exp123'],
          displayLinkOptions: false}
        ]
      },
      expenses: {
        instances: [
          {title: 'set',
          value: 50,
          id: 'exp123',
          isEditing: true,
          pendingTitle: 'set',
          pendingValue: '0',
          pendingInterest: '0',
          interest: '0',
          duration: 'retirement',
          pendingDuration: 'retirement',
          growth: '0',
          pendingGrowth: '0',
          connectedId: null,
          linkedPaymentIndex: [],
          displayLinkOptions: false}
        ]
      }
    }
  ]
  test('it outputs', ()=>{
    expect(alterDebtValues(years)).toBe.Ok;
  })
  test('it outputs array of size input', ()=>{
    expect(alterDebtValues(years)).toHaveLength(1);
  })
  test('it expects correct outputs', ()=>{
    expect(alterDebtValues(years)[0].debt.instances[0].value).toBe(50);
    expect(alterDebtValues(years)[0].expenses.instances[0].value).toBe(50);
  })
});
