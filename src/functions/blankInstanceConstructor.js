const randomIDgenerator = ()=>{
  return (Math.random() * 10000000).toString(36);
}

const blankInstanceConstructor = ()=> {
  let id = randomIDgenerator();
  return {
    title: 'set',
    value: '0',
    id,
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
    displayLinkOptions: false
  }
}

export default blankInstanceConstructor;
