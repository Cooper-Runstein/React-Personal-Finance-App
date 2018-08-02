const applyGrowth = (instance, yearIndex)=>{
  let growth = instance.growth;
  return {...instance, growth: (instance.value * (1 + parseFloat(growth)) ** yearIndex) }
}

export {applyGrowth};
