
// const alterDebtValues = (years)=> {
//   console.log("Debt Applicator Called");
//   //Function returns new years to reflect payments made to debt values by expenses.
//   let newYears = years.map((year, yearIndex)=>{
//     let newDebts = year.debt.instances.map((debt, index)=>{
//       if(debt.linkedPaymentIndex.length > 0){
//         //There is a payment, debt value may need to be altered
//         let newDebtInstance = applyExpenses(years, yearIndex, debt);
//         return newDebtInstance;
//       } else{
//         //No Changes to be made, debt is same as previous year
//         return debt;
//       }
//     })
//     return {
//       ...year,
//       debt: {
//         title: 'Debt',
//         instances: newDebts
//       }
//     }
//   })
//   console.log(newYears);
//   return newYears;
// }

// const getPreviousDebtInstance = (years, currentYearIndex, debtId) =>{
//   const targetYear = years[currentYearIndex -1];
//   let prevDebt = targetYear.debt.instances.filter(debt => debt.id === debtId);
//   prevDebt = prevDebt[0];
//   return prevDebt;
// }

const getPaymentValues = (year, expensesIdsArray)=>{
  let expenses = year.expenses.instances;
  expenses = expenses.filter(expense => expensesIdsArray.includes(expense.id));
  let paymentsValues = 0;
  if (expenses.length > 0){
    paymentsValues = expenses.reduce((value, expense)=>{return value += expense.value}, 0)
  }
  return paymentsValues;
}

// const applyExpenses = (years, yearIndex, debtInstance) => {
//   const debtId = debtInstance.id;
//   const debtPayments = debtInstance.linkedPaymentIndex;
//   const startingDebtValue = debtInstance.value;
//   const expenses = years[yearIndex].expenses.instances;

//   console.log('Linked Payments exists for debt: ' + debtId + '. Payments: ' + debtPayments);
//   if (yearIndex === 0){
//     let newValue = parseFloat(startingDebtValue);
//     return {
//       ...debtInstance,
//       value: newValue
//     }
//   }else {
//     let prevYearDebt = getPreviousDebtInstance(years, yearIndex, debtId);
//     let newValue = parseFloat(prevYearDebt.value) - getPaymentValues(prevYearDebt, expenses);
//     return {
//       ...debtInstance,
//       value: newValue
//     }
//   }
// }

// export {
//   getPreviousDebtInstance,
//   applyExpenses,
//   getPaymentValues
// }


const alterDebtValues = (years)=> {
  let recursiveDebtApplicator = (years, final)=>{
    if (years.length === 0){
      return final;
    }else{
      let baseYear = years[0];
      if (final.length > 0){
        let prevYear = final[final.length -1];

        let newDebtsInstances = prevYear.debt.instances.map(debt => {

          let payments = getPaymentValues(prevYear, debt.linkedPaymentIndex);
          let newDebtValue = debt.value - payments;
          return {
            ...debt,
            value: newDebtValue
           }

        });
        baseYear.debt = {...baseYear.debt, instances: newDebtsInstances}

      }
      final.push(baseYear);
      return recursiveDebtApplicator(years.slice(1), final);
    }
  }

  return recursiveDebtApplicator(years, []);
}

export { getPaymentValues };
export default alterDebtValues;
