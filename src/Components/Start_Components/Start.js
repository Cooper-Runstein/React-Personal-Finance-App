import React from 'react';
import PropTypes from 'prop-types';
import StartCategoryForm from './StartCategoryForm.js';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.onEditAt = this.onEditAt.bind(this);
    this.addInstance = this.addInstance.bind(this);
    this.onChangeAt = this.onChangeAt.bind(this);
    this.onConfirmAt = this.onConfirmAt.bind(this);
    this.alterInstances = this.alterInstances.bind(this);
    this.state = {
      pendingRetirment: '',
      retirmentYear: '',
      income: {
        title: 'Income',
        instances: [
          {
          title: 'Set Job title',
          value: 5000,
          isEditing: false,
          pendingTitle: 'Set Job Title',
          pendingValue: '5000',
          pendingInterest: '1',
          interest: 1,
          length: 'auto',
          pendingLength: 'auto',
          duration: "retirement",
          pendingDuration: "retirement"
        }],

        },
      expenses: {
          title: 'Expenses',
          instances: [{
            title: 'Rent',
            value: 1000,
            isEditing: true,
            pendingTitle: 'Rent',
            pendingValue: '1000',
            pendingInterest: '1',
            interest: 1,
            length: 'auto',
            pendingLength: 'auto',
            duration: "retirement",
            pendingDuration: "retirement"
          },
          {
            title: 'Eating Out',
            value: 60,
            isEditing: true,
            pendingTitle: 'Eating Out',
            pendingValue: '60',
            pendingInterest: '1',
            interest: 1.4,
            length: 'auto',
            pendingLength: 'auto',
            duration: "retirement",
            pendingDuration: "retirement"
          },
          {
            title: 'Groceries',
            value: 50,
            isEditing: true,
            pendingTitle: 'Groceries',
            pendingValue: '50',
            pendingInterest: '1',
            interest: 1,
            length: 'auto',
            pendingLength: 'auto',
            duration: "retirement",
            pendingDuration: "retirement"
          }
        ],

      },
      debt: {
        title: 'Loans',
        instances: [{
          title: 'Mortgage',
          value: 1000,
          isEditing: true,
          pendingTitle: 'Mortgage',
          pendingValue: '1000',
          pendingInterest: '1',
          interest: 1,
          length: 'auto',
          pendingLength: 'auto',
          duration: "retirement",
          pendingDuration: "retirement"
          },

        ],
      },
      savings: {
        title: 'Retirment Savings',
        instances: [{
          title: '401K',
          isEditing: true,
          value: 500,
          interest: 1,
          length: 'auto',
          pendingTitle: '401K',
          pendingValue: '500',
          pendingInterest: '1',
          pendingLength: 'auto',
          duration: "retirement",
          pendingDuration: "retirement"

        },
      ],
      }
    }
  }

  changeInstanceObject = () => {

  }

  //*****Button and Input Change/Click functions********//

  alterInstances = (type, instanceIndex, newState) => {
    return this.state[type].instances.map((e, i) => {
      if (i === instanceIndex){
        return newState(e)
      } else {
        return e;
      }
    })
  }

  onEditAt = (type, instanceIndex) => {
    console.log("Edit Called");
    const newState = (e) => {
      return {
        ...e,
        isEditing: !e.isEditing
      }
    }
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        instances: this.alterInstances(type, instanceIndex, newState)}
    })
  }

  addInstance = (type, catIndex) => {
    const newCategory = [];
    const alterInstance = (instances) => {
      let oldinstances = instances.slice();
      oldinstances.push({
        title: 'set',
        value: 'set',
        isEditing: true,
        pendingTitle: '',
        pendingValue: '',
        pendingInterest: '1',
        interest: 1,
        duration: 'retirement',
        pendingDuration: 'retirement'
      })

      return oldinstances;
    }

    this.state[type].map((e, i) => {
      if (i === catIndex) {
        let subCategory = {
          ...e,
          instances: alterInstance(e.instances)
        }
        newCategory.push(subCategory);
      } else {
        newCategory.push(e);
      }
      return null;
    })

    this.setState({
      ...this.state,
      [type]: newCategory
    })
  }

  removeInstanceAt = (type, catIndex, instanceIndex) => {
    const newCategory = [];
    const alterInstance = (instances, instanceIndex) => {
      const newinstances = [];
      instances.map((e, i) => {
        if (i === instanceIndex) {
          return false;
        } else {
          newinstances.push(e)
        }
        return null;
      })
      return newinstances;
    }

    this.state[type].map((e, i) => {
      if (i === catIndex) {
        let subCategory = {
          ...e,
          instances: alterInstance(e.instances, instanceIndex)
        }
        newCategory.push(subCategory);
      } else {
        newCategory.push(e);
      }
      return null;
    })

    this.setState({
      ...this.state,
      [type]: newCategory
    })
  }

  onChangeAt = (type, catIndex, instanceIndex) => {
    const newCategory = [];
    const alterInstance = (instances, instanceIndex) => {
      const newinstances = [];
      instances.map((e, i) => {
        if (i === instanceIndex) {
          const valueValue = document.getElementById(`value-${type}-${catIndex}-${i}`).value;
          const titleValue = document.getElementById(`title-${type}-${catIndex}-${i}`).value;
          const interestValue = document.getElementById(`interest-${type}-${catIndex}-${i}`).value;
          const lengthValue = document.getElementById(`length-${type}-${catIndex}-${i}`).value;
          const durationValue = document.getElementById(`duration-${type}-${catIndex}-${i}`).value;

          console.log(interestValue);

          let newInstance = {
            ...e,
            pendingValue: valueValue,
            pendingTitle: titleValue,
            pendingInterest: interestValue,
            pendingLength: lengthValue,
            pendingDuration: durationValue
          }

          newinstances.push(newInstance);
        } else {
          newinstances.push(e)
        }

        return null;

      })
      return newinstances;
    }

    this.state[type].map((e, i) => {
      if (i === catIndex) {
        let subCategory = {
          ...e,
          instances: alterInstance(e.instances, instanceIndex)
        }
        newCategory.push(subCategory);
      } else {
        newCategory.push(e);
      }
      return null;
    })

    this.setState({
      ...this.state,
      [type]: newCategory
    })
  }

  onConfirmAt = (type, catIndex, instanceIndex) => {
    const newCategory = [];
    const alterInstance = (instances, instanceIndex) => {
      const newinstances = [];
      instances.map((e, i) => {
        if (i === instanceIndex) {

          const validateValue = (e, type) => {
            const falseChars = [',', '/', '$', '#', ' ', '*', ';', ':', '^', '%', '!', '\''];
            const strippedValue = (pendingString) => {
              falseChars.map((char) => {
                pendingString = pendingString.replace(char, '');
              })
              return pendingString
            }

            let newValue;
            if (!Number.isNaN(parseFloat(strippedValue(e['pending' + type])))) {
              newValue = parseFloat(strippedValue(e['pending' + type]));
            } else {
              console.log('value failed:' + strippedValue(e[type]));
              newValue = "Invalid Entry, Try Again";
            }
            return newValue
          }

          let validatedValue = validateValue(e, 'Value');
          let validatedInterest = validateValue(e, 'Interest');

          let newInstance = {
            ...e,
            title: e.pendingTitle,
            value: validatedValue,
            interest: validatedInterest,
            length: e.pendingLength,
            duration: e.pendingDuration,
            isEditing: false,
          }
          console.log(newInstance);
          newinstances.push(newInstance);
        } else {
          newinstances.push(e)
        }

        return null;

      })
      return newinstances;
    }

    this.state[type].map((e, i) => {
      if (i === catIndex) {
        let subCategory = {
          ...e,
          instances: alterInstance(e.instances, instanceIndex)
        }
        newCategory.push(subCategory);
      } else {
        newCategory.push(e);
      }
      return null;
    })

    this.setState({
      ...this.state,
      [type]: newCategory
    })
  }

  confirmAll = () => {
    const getNewTypes = () => {
      const types = ['income', 'expenses', 'debt', 'savings'];
      const newTypes = {};
      for (let i = 0; i < types.length; i++) {
        let newType = [];
        let typeName = types[i];
        this.state[typeName].map((subCat) => {
          newType.push(getNewSubCat(subCat));
        })
        newTypes[typeName] = newType;
      }
      return newTypes;
    }

    const getNewSubCat = (subCat) => {
      return {
        ...subCat,
        instances: getNewInstances(subCat.instances)
      };
    }

    const getNewInstances = (instances) => {
      const arr = [];
      instances.map((instance) => {
        let newInstance = {
          ...instance,
          title: instance.pendingTitle,
          value: instance.pendingValue,
          interest: instance.pendingInterest,
          length: instance.pendingLength,
          duration: instance.pendingDuration,
          isEditing: false
        }
        console.log('instance: ' + newInstance)
        arr.push(newInstance);
      })
      return arr;
    }

    let newIncome = getNewTypes()['income'];
    let newExpenses = getNewTypes()['expenses'];
    let newDebt = getNewTypes()['debt'];
    let newSavings = getNewTypes()['savings'];

    this.setState({
      ...this.state,
      income: newIncome,
      expenses: newExpenses,
      debt: newDebt,
      savings: newSavings

    })

  }

  packageData = () => {
    if ((typeof parseFloat(this.state.retirmentYear) === "number") && Math.floor(parseFloat(this.state.retirmentYear)) === parseFloat(this.state.retirmentYear) && parseFloat(this.state.retirmentYear) > this.props.year) {
      this.props.getStartingFormData({
        retirmentYear: this.state.retirmentYear,
        income: this.state.income,
        expenses: this.state.expenses,
        debt: this.state.debt,
        savings: this.state.savings
      })
      console.log("Succesful pacakge submission");
    } else {
      console.log("Form not ready for submission");
    }
  }


  render() {
    return (
      <div className = "start-main-container" >
        <StartCategoryForm
          title = {"income"}
          instances = {this.state.income.instances}
          onEditAt = {this.onEditAt}
        />
        <StartCategoryForm
          title = {"expenses"}
          instances = {this.state.expenses.instances}
          />
        <StartCategoryForm
          title = {"debt"}
          instances = {this.state.debt.instances}
        />
        <StartCategoryForm
          title = {"expenses"}
          instances = {this.state.savings.instances}
        />
      </div>
         )
  }
}

Start.propTypes = {

}

export default Start;
