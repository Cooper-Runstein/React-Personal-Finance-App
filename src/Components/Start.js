import React from 'react';
import PropTypes from 'prop-types';
import SubCategoryForm from './SubCategoryForm.js';

class Start extends React.Component {
    constructor(props){
        super(props);
        this.onEditAt = this.onEditAt.bind(this);
        this.addInstance = this.addInstance.bind(this);
        this.state={
            income: [
                {
                  title: 'jobs',
                  entries: [
                    {
                      title: 'set job title',
                      value: "set",
                      isEditing: true,
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
                    },
                    {
                      title: 'storage_locker',
                      value: 50,
                      isEditing: true,
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
                    },
                    {
                      title: 'groceries',
                      value: 200,
                      isEditing: true,
                    }
                  ],
                }
            ]
        }
    }

    onEditAt = (type, catIndex, instanceIndex)=> {
        const newCategory = [];
        const alterInstance = (entries, instanceIndex)=>{
            const newEntries = [];
            entries.map((e,i)=>{
                if (i === instanceIndex){
                    let newInstance = {
                        ...e,
                        isEditing: !e.isEditing
                    }
                    newEntries.push(newInstance)
                }
                else{
                    newEntries.push(e)
                }
            })
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
        })

        this.setState({
            ...this.state,
            [type]: newCategory
        })
    }

    addInstance = (type, catIndex)=>{
        console.log("Adding instance")
        const newCategory = [];
        const alterInstance = (entries)=>{
            let oldEntries = entries.slice();
            console.log(oldEntries);
            oldEntries.push({
                title: 'set',
                value: 'set',
                isEditing: true,
            })
            console.log(oldEntries);
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
        })

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
            })
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
        })

        this.setState({
            ...this.state,
            [type]: newCategory
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
                    subCat = {e}
                    onEditAt = {this.onEditAt}
                    removeInstanceAt = {this.removeInstanceAt}
                    addInstance = {()=> this.addInstance('income', i)}
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
                />
            })}
        </div>
    )

}
}

Start.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Start;
