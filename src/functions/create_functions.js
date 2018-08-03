
//Creation Functions
const createIncomeInstances = (packageIncome, yearIndex)=>{
  let targetInstances = packageIncome.instances;

  let newInstances = targetInstances.filter((instance)=> isDurationApplied(instance, yearIndex))

  let growthInstances = newInstances.map((instance)=> applyGrowth(instance, yearIndex));

    return {
      ...packageIncome,
      instances: growthInstances
    };
}
const createExpensesInstances = (packageExpenses, yearIndex)=>{
  let targetInstances = packageExpenses.instances;

  let newInstances = targetInstances.filter((instance)=> isDurationApplied(instance, yearIndex))

  let growthInstances = newInstances.map((instance)=> applyGrowth(instance, yearIndex));


    return {
      ...packageExpenses,
      instances: growthInstances
    };
}

const createDebtInstances = (packageDebt, yearIndex)=>{
  //Determines How Debt Instances are Displayed At Given Year
  return packageDebt;
}

const createSavingsInstances = (packageSavings, yearIndex)=>{
  //Determines How Savings Instances are Displayed At Given Year
  return packageSavings;
}

//Accesory Functions
const applyGrowth = (instance, yearIndex)=>{
  let growth = instance.growth;
  let appliedGrowth = parseFloat(`1.${growth}`);
  let newValue = (instance.value * appliedGrowth ** yearIndex);
  return {...instance, value: newValue }
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

  return years;
}

export default generateYears;

