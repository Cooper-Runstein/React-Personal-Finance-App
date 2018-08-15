
const getPaymentValues = (year, expensesIdsArray)=>{
  let expenses = year.expenses.instances;
  expenses = expenses.filter(expense => expensesIdsArray.includes(expense.id));
  let paymentsValues = 0;
  if (expenses.length > 0){
    paymentsValues = expenses.reduce((value, expense)=>{return value += expense.value}, 0)
  }
  return paymentsValues;
}


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
          let appliedInterestDebt = debt.value * (parseFloat(`1.${debt.interest}`));
          let newDebtValue = appliedInterestDebt - payments;
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
