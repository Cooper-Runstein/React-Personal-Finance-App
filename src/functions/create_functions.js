
//Creation Functions
const createIncomeInstances = (packageIncome, yearIndex)=>{
  let targetInstances = packageIncome.instances;

  let newInstances = targetInstances.filter((instance)=> isDurationApplied(instance, yearIndex))

  let growthInstances = newInstances.map((instance)=> applyGrowth(instance, yearIndex));

  let reassignPendingInstances = growthInstances.map((instance)=> reassignPending(instance, yearIndex));

    return {
      ...packageIncome,
      instances: reassignPendingInstances
    };
}
const createExpensesInstances = (packageExpenses, yearIndex)=>{
  let targetInstances = packageExpenses.instances;

  let newInstances = targetInstances.filter((instance)=> isDurationApplied(instance, yearIndex))

  let growthInstances = newInstances.map((instance)=> applyGrowth(instance, yearIndex));

  let reassignPendingInstances = growthInstances.map((instance)=> reassignPending(instance, yearIndex));


    return {
      ...packageExpenses,
      instances: reassignPendingInstances
    };
}

const createDebtInstances = (packageDebt, yearIndex)=>{
  //Determines How Debt Instances are Displayed At Given Year
  let targetInstances = packageDebt.instances;

  let interestInstances = targetInstances.map((instance)=> applyInterest(instance, yearIndex));
  return {
    ...packageDebt,
    instances: interestInstances
  }
}

const createSavingsInstances = (packageSavings, yearIndex)=>{
  //Determines How Savings Instances are Displayed At Given Year
  let targetInstances = packageSavings.instances;

  let interestInstances = targetInstances.map((instance)=> applyInterest(instance, yearIndex));
  return {
    ...packageSavings,
    instances: interestInstances
  }
}

//Accesory Functions
const applyGrowth = (instance, yearIndex)=>{
  let growth = instance.growth;
  let appliedGrowth = parseFloat(`1.${growth}`);
  let newValue = (instance.value * appliedGrowth ** yearIndex);
  return {...instance, value: newValue }
}

const applyInterest = (instance, yearIndex)=>{
  let interest = instance.interest;
  let appliedInterest = parseFloat(`1.${interest}`);
  let newValue = (instance.value * appliedInterest ** yearIndex);
  return {...instance, value: newValue }
}

const reassignPending = (instance)=>{
  let newInstance = {
    ...instance,
    pendingTitle: instance.title,
    pendingValue: String(instance.value)
  }
  return newInstance;
}

const isDurationApplied = (instance, yearIndex)=>{
  //Determine if Instance Should Render at Given Year
  if (instance.duration === "retirement"){
    return true;
  }
  if (parseInt(instance.duration, 10) >= (yearIndex + 1)){
    return true;
  }
  else {
    return false;
  }
}

const getNumberOfRows = (retirmentYear, date) =>{
  //Determines Size of Chart to Render
  let currentYear = date;
  let rows = retirmentYear - currentYear;

  if((rows <= 0) || !rows){
    return 0;
  }
  return rows;
}


const generateYears = (packagedData, date) =>{
  //Main Chart Generation Function
  console.log('Year Generator Function Called');
  const years = [];
  let numYears = getNumberOfRows(packagedData.retirmentYear, date);
  for (let i = 0; i < numYears; i++){
    years.push(
      {
        year: date + i,
        income: createIncomeInstances(packagedData.income, i),
        expenses: createExpensesInstances(packagedData.expenses, i),
        debt: createDebtInstances(packagedData.debt, i),
        savings: createSavingsInstances(packagedData.savings, i),
      }
    );
  }
  console.log(years);
  return years;
}

export default generateYears;

export { getNumberOfRows, isDurationApplied, applyGrowth, createIncomeInstances, createDebtInstances, reassignPending}

