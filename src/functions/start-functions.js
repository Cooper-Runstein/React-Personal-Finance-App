let confirmFunction = (e, i)=>{

  let copiedInterest = e.pendingInterest.slice();
  let copiedValue = e.pendingValue.slice();
  let validatedValue = parseFloat(copiedValue.replace(/[^\d.-]/g, ''));
  let validatedInterest = parseFloat(copiedInterest.replace(/[^\d.-]/g, ''));

  return {
    ...e,
    title: e.pendingTitle,
    value: validatedValue,
    interest: validatedInterest,
    length: e.pendingLength,
    duration: e.pendingDuration,
    growth: e.pendingGrowth,
    isEditing: false,
  }
}

const changeFunction = (type, instanceIndex)=> {
  console.log("Change Called at " + type + " " + instanceIndex)
  const newInstance = (e,i)=> {
    const valueValue = document.getElementById(`value-${type}-${i}`).value;
    const titleValue = document.getElementById(`title-${type}-${i}`).value;

    let baseObj =  {
      ...e,
      pendingValue: valueValue,
      pendingTitle: titleValue,
    }

    let durationalObj = ()=> {
      if (type === 'income' || type === 'expenses'){
        const durationValue = document.getElementById(`duration-${type}-${i}`).value;
        const growthValue = document.getElementById(`growth-${type}-${i}`).value;
        return {
          pendingDuration: durationValue,
          pendingGrowth: growthValue
        }
      }
      else {
        return {}
      }
    }

    let interestObj = ()=> {
      if (type === 'debt' || type === 'savings'){
        const interestValue = document.getElementById(`interest-${type}-${i}`).value;
        console.log("pendingInterest: " + interestValue);
        return {
          pendingInterest: interestValue
        }
      } else {
        return {}
      }
    }

    baseObj = Object.assign(baseObj, durationalObj());
    baseObj = Object.assign(baseObj, interestObj());

    return baseObj;
  }
  console.log(newInstance);
  return newInstance;
}

export {
  confirmFunction,
  changeFunction
};
