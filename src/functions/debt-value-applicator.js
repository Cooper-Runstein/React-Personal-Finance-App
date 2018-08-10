


const alterDebtValues = (years)=> {
  //Function returns new years to reflect payments made to debt values by expenses.
  let newYears = years.map((year, yearIndex)=>{
    let newDebts = year.debt.instances.map((debt, index)=>{
      if(debt.linkedPaymentIndex.length > 0){
        //There is a payment, debt value may need to be altered
        console.log(years)
        let newDebtInstance = applyExpenses(years, yearIndex, debt);
        return newDebtInstance;
      } else{
        //No Changes to be made, debt is same as previous year
        return debt;
      }
    })
    console.log(newDebts);
    return {
      ...year,
      debt: {
        title: 'Debt',
        instances: newDebts
      }
    }
  })

  return newYears;
}

const getPreviousDebtInstance = (years, currentYearIndex, debtId) =>{
  const targetYear = years[currentYearIndex -1];
  let prevDebt = targetYear.debt.instances.filter(debt => debt.id === debtId);
  prevDebt = prevDebt[0];
  return prevDebt;
}

const getPaymentValues = (debtInstance, expenses)=>{
  let paymentsValues = 0;
  debtInstance.linkedPaymentIndex.map((expenseId)=>{
    console.log(expenseId)
    let targetExpense = expenses.filter(expense => expense.id === expenseId);
    console.log(targetExpense);
    let targetExpenseValue = targetExpense[0].value;
    paymentsValues += parseFloat(targetExpenseValue);
  })
  return paymentsValues;
}

const applyExpenses = (years, yearIndex, debtInstance) => {
  const debtId = debtInstance.id;
  const debtPayments = debtInstance.linkedPaymentIndex;
  const startingDebtValue = debtInstance.value;
  const expenses = years[yearIndex].expenses.instances;

  console.log('Linked Payments exists for debt: ' + debtId + '. Payments: ' + debtPayments);
  if (yearIndex === 0){
    let newValue = parseFloat(startingDebtValue) - getPaymentValues(debtInstance, expenses);
    return {
      ...debtInstance,
      value: newValue
    }
  }else {
    console.log(years)
    console.log(yearIndex)
    let prevYearDebt = getPreviousDebtInstance(years, yearIndex, debtId);
    let newValue = parseFloat(startingDebtValue) - getPaymentValues(prevYearDebt, expenses);
    return {
      ...debtInstance,
      value: newValue
    }
  }

  // if (yearIndex !== 0){
  //   let prevYear = this.state.years[yearIndex -1 ]

  //   let prevYearInstance;
  //   if (prevYear.debt.instances[instanceIndex]){
  //     prevYearInstance = prevYear.debt.instances[instanceIndex]
  //   } else {
  //     this.removeInstanceAt(yearIndex, 'debt', instanceIndex)
  //     payments.map((instanceIndex, index)=>{
  //       if (this.state.years[yearIndex]['expenses'].instances[instanceIndex]){
  //         console.log("Removing unneccessary expense");
  //         this.removeInstanceAt(yearIndex, 'expenses', payments[instanceIndex]);
  //       }
  //       return null;
  //     });

  //     return null;
  //   }
  //   let prevYearValue = prevYearInstance.value
  //   let prevYearLinkedIndexs = prevYearInstance.linkedPaymentIndex;
  //   let prevYearPayments = [];
  //   prevYearLinkedIndexs.map((indexVal)=>{
  //     let paymentVal = parseFloat(prevYear.expenses.instances[indexVal].value);
  //     prevYearPayments.push(paymentVal);
  //     return null;
  //   })
  //   let sumPayments = prevYearPayments.reduce((sum, val)=> sum + val);

  //   let newValue = prevYearValue - sumPayments;

  //   let newInstance;

  //   if (newValue <= 0){
  //     this.removeInstanceAt(yearIndex, 'debt', instanceIndex);
  //   }else{


  //   newInstance = ()=>{
  //     return {
  //       ...debtInstance,
  //       value: newValue
  //     }
  //   }

  //   this.changeInstanceAt(yearIndex, 'debt', instanceIndex, newInstance);
  // }
  // }
}

export { getPreviousDebtInstance, applyExpenses, getPaymentValues }
export default alterDebtValues;
