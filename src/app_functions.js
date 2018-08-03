
const createIncomeInstances = (packageIncome, yearIndex)=>{
  let targetInstances = packageIncome.instances;

  let newInstances = targetInstances.filter((instance)=> isDurationApplied(instance, yearIndex))

  let growthInstances = newInstances.map((instance)=> applyGrowth(instance, yearIndex));

    return {
      ...packageIncome,
      instances: growthInstances
    };
}

const applyGrowth = (instance, yearIndex)=>{
  let growth = instance.growth;
  let appliedGrowth = parseFloat(`1.${growth}`);
  console.log((instance.value * appliedGrowth ** yearIndex))
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

export { applyGrowth, createIncomeInstances, isDurationApplied};
