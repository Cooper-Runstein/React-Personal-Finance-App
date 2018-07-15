import React from 'react';
import PropTypes from 'prop-types';
import SubCategoryForm from './SubCategoryForm.js';

class Start extends React.Component {
    constructor(props){
        super(props);
        this.onEditAt = this.onEditAt.bind(this);
        this.addInstance = this.addInstance.bind(this);
        this.onChangeAt = this.onChangeAt.bind(this);
        this.onConfirmAt = this.onConfirmAt.bind(this);
        this.alterCategory = this.alterCategory.bind(this);
        this.state={
            pendingRetirment: '',
            retirmentYear: '',
            income: [
                {
                  title: 'Jobs',
                  entries: [
                    {
                      title: 'Set Job title',
                      value: "set",
                      isEditing: true,
                      pendingTitle: 'Set Job Title',
                      pendingValue: '0'
                    }
                  ],
                  get totals() {
                    return this.entries.reduce((sum, entry)=>{
                      return sum + entry.value
                    }, 0)
                  }
                }  
              ],
            expenses: [
                {
                  title: 'Housing',
                  entries: [
                    {
                      title: 'Rent',
                      value: 0,
                      isEditing: true,
                      pendingTitle: 'Rent',
                      pendingValue: '0'
                    },
                    {
                      title: '',
                      value: 0,
                      isEditing: true,
                      pendingTitle: '',
                      pendingValue: ''
                    }
                  ],
                  get totals() {
                    return this.entries.reduce((sum, entry)=>{
                      return sum + entry.value
                    }, 0)
                  }
                },
                {
                  title: 'food',
                  entries: [
                    {
                      title: 'Eating Out',
                      value: 0,
                      isEditing: true,
                      pendingTitle: 'Eating Out',
                      pendingValue: '0',
                    },
                    {
                      title: 'groceries',
                      value: 200,
                      isEditing: true,
                      pendingTitle: '',
                      pendingValue: ''
                    }
                  ],
                }
            ]
        }
    }

    changeInstanceObject = ()=>{

    }

    //*****Button and Input Change/Click functions********//
    alterInstance = (entries, instanceIndex, newState)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                    newEntries.push(newState(e));
                }
                else{
                    newEntries.push(e)
                }
                return null;
            }
        )
            return newEntries;
    }

    alterCategory = (type, catIndex, instanceIndex, newState)=>{
        console.log("AlterCat called");
        let newCategory = [];
        this.state[type].map((e,i)=>{
            if (i === catIndex){
                let subCategory = {
                    ...e,
                    entries: this.alterInstance(e.entries, instanceIndex, newState)
                }
                newCategory.push(subCategory);
            }
            else{
                newCategory.push(e);
            }
            
        })
        console.log(newCategory);
            return newCategory;
    }

    onEditAt = (type, catIndex, instanceIndex)=> {
        console.log("Edit Called");
        const newState = (e)=> {
            return {
                ...e,
                isEditing: !e.isEditing
            }
        }
        this.setState({
            ...this.state,
            [type]: this.alterCategory(type, catIndex, instanceIndex, newState)
        })
    }

    addInstance = (type, catIndex)=>{
        const newCategory = [];
        const alterInstance = (entries)=>{
            let oldEntries = entries.slice();
            oldEntries.push({
                title: 'set',
                value: 'set',
                isEditing: true,
                pendingTitle: '',
                pendingValue: ''
            })
            return oldEntries;
        }

        this.state[type].map((e,i)=>{
            if (i === catIndex){
                let subCategory = {
                    ...e,
                    entries: alterInstance(e.entries)
                }
                newCategory.push(subCategory);
            }
            else{
                newCategory.push(e);
            }
            return null;
        }
    )

        this.setState({
            ...this.state,
            [type]: newCategory
        })
    }

    removeInstanceAt = (type, catIndex, instanceIndex)=>{
        const newCategory = [];
        const alterInstance = (entries, instanceIndex)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                   return false;
                }
                else{
                    newEntries.push(e)
                }
                return null;
            }
        )
            return newEntries;
        }

        this.state[type].map((e,i)=>{
            if (i === catIndex){
                let subCategory = {
                    ...e,
                    entries: alterInstance(e.entries, instanceIndex)
                }
                newCategory.push(subCategory);
            }
            else{
                newCategory.push(e);
            }
            return null;
        }
    )

        this.setState({
            ...this.state,
            [type]: newCategory
        })
    }

    onChangeAt = (type, catIndex, instanceIndex)=> {
        const newCategory = [];
        const alterInstance = (entries, instanceIndex)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                    const valueValue = document.getElementById(`value-${type}-${catIndex}-${i}`).value;
                    const titleValue = document.getElementById(`title-${type}-${catIndex}-${i}`).value;
                    
                    let newInstance = {
                        ...e,
                        pendingValue: valueValue,
                        pendingTitle: titleValue,

                    }
                    newEntries.push(newInstance);
                }
                else{
                    newEntries.push(e)
                }

                return null;

                }
            )
            return newEntries;
        }

        this.state[type].map((e,i)=>{
            if (i === catIndex){
                let subCategory = {
                    ...e,
                    entries: alterInstance(e.entries, instanceIndex)
                }
                newCategory.push(subCategory);
            }
            else{
                newCategory.push(e);
            }
            return null;
            }
        )

        this.setState(
            {
            ...this.state,
            [type]: newCategory
            }
        )   
    }

    onConfirmAt = (type, catIndex, instanceIndex)=> {
        console.log("Confirm Called");
        console.log(this.state.income);
        const newCategory = [];
        const alterInstance = (entries, instanceIndex)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                    
                    const validateValue = (e)=>{
                        const falseChars = [',', '.', '/', '$', '#', ' ', '*', ';', ':', '^', '%', '!', '\''];
                        const strippedValue = (pendingString)=>{
                            falseChars.map((char)=>{
                                pendingString = pendingString.replace(char, '');
                            })
                            return pendingString
                        }

                        let newValue;
                        if (!Number.isNaN(parseFloat(strippedValue(e.pendingValue)))){
                            newValue = parseFloat(strippedValue(e.pendingValue));
                        }
                        else{
                            console.log('value failed:' + strippedValue(e.pendingValue));
                            newValue = "Invalid Entry, Try Again";
                        }
                        return newValue
                    }

                    let validatedValue = validateValue(e);

                    let newInstance = {
                        ...e,
                        title: e.pendingTitle,
                        value: validatedValue,
                        isEditing: false,
                    }
                    console.log(newInstance);
                    newEntries.push(newInstance);
                }
                else{
                    newEntries.push(e)
                }

                return null;

                }
            )
            return newEntries;
        }

        this.state[type].map((e,i)=>{
            if (i === catIndex){
                let subCategory = {
                    ...e,
                    entries: alterInstance(e.entries, instanceIndex)
                }
                newCategory.push(subCategory);
            }
            else{
                newCategory.push(e);
            }
            return null;
            }
        )

        this.setState(
            {
            ...this.state,
            [type]: newCategory
            }
        )   
    }

    packageData = ()=>{
        this.props.getStartingFormData({
            income: this.state.income,
            expenses: this.state.expenses
        })
    }


    render(){

        return (
            <div>

                {this.state.income.map((e,i)=>{
                    return <SubCategoryForm 
                        key = {i}
                        catIndex = {i}
                        type = {'income'}
                        title = {e.title}
                        subCat = {e}
                        onEditAt = {this.onEditAt}
                        removeInstanceAt = {this.removeInstanceAt}
                        addInstance = {()=> this.addInstance('income', i)}
                        onChange = {this.onChangeAt}
                        onConfirm = {this.onConfirmAt}
                    />
                })}

                {this.state.expenses.map((e,i)=>{
                    return <SubCategoryForm 
                        key = {i}
                        catIndex = {i}
                        type = {'expenses'}
                        subCat = {e}
                        title = {e.title}
                        onEditAt = {this.onEditAt}
                        removeInstanceAt = {this.removeInstanceAt}
                        addInstance = {()=> this.addInstance('expenses', i)}
                        onChange = {this.onChangeAt}
                        onConfirm = {this.onConfirmAt}
                    />
                })}
                
                <input 
                    placeholder='Enter Retirment Year'
                    id="retirment-input"
                    value={this.state.pendingRetirment}
                    onChange={(e)=>{
                        this.setState({
                            ...this.state,
                            pendingRetirment: e.target.value
                        })
                    }}
                        />
                <button
                    onClick={()=>{
                        this.setState({
                            ...this.state,
                            retirmentYear: this.state.pendingRetirment
                        })
                    }}>Confirm Retirment</button>
                
                <button onClick={()=>this.packageData()}>Package Data</button>

            </div>
        )

    }
}

Start.propTypes = {
    
}

export default Start;
