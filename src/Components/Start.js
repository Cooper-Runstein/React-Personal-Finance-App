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
        this.state={
            income: [
                {
                  title: 'jobs',
                  entries: [
                    {
                      title: 'set job title',
                      value: "set",
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
                }  
              ],
            expenses: [
                {
                  title: 'housing',
                  entries: [
                    {
                      title: 'rent',
                      value: 1000,
                      isEditing: true,
                      pendingTitle: '',
                      pendingValue: ''
                    },
                    {
                      title: 'storage_locker',
                      value: 50,
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
                      title: 'eating_out',
                      value: 150,
                      isEditing: true,
                      pendingTitle: '',
                      pendingValue: ''
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

    onEditAt = (type, catIndex, instanceIndex)=> {
        console.log("Edit Called");
        const newCategory = [];
        const alterInstance = (entries, instanceIndex)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                    console.log(e)
                    let newInstance = {
                        ...e,
                        isEditing: !e.isEditing
                    }
                    newEntries.push(newInstance)
                    
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
        const newCategory = [];
        const alterInstance = (entries, instanceIndex)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                    let newValue;
                    if (parseFloat(e.pendingValue)){
                        newValue = parseFloat(e.pendingValue);
                    }
                    else{
                        newValue = "Invalid Entry, Try Again";
                    }
                    let newInstance = {
                        ...e,
                        title: e.pendingTitle,
                        value: newValue,
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
            console.log(newEntries === entries)
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

    render(){
    return (
        <div>
            {this.state.income.map((e,i)=>{
                return <SubCategoryForm 
                    key = {i}
                    catIndex = {i}
                    type = {'income'}
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
                    onEditAt = {this.onEditAt}
                    removeInstanceAt = {this.removeInstanceAt}
                    addInstance = {()=> this.addInstance('expenses', i)}
                    onChange = {this.onChangeAt}
                    onConfirm = {this.onConfirmAt}
                />
            })}
        </div>
    )

}
}

Start.propTypes = {
    
}

export default Start;
