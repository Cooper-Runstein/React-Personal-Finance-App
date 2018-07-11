import React from 'react';
import PropTypes from 'prop-types';
import SubCategoryForm from './SubCategoryForm.js';

class Start extends React.Component {
    constructor(props){
        super(props);
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

    render(){
    return (
        <div>
            {this.state.income.map((e,i)=>{
                return <SubCategoryForm 
                    key = {i}
                    subCat = {e}
                />
            })}
            {this.state.expenses.map((e,i)=>{
                return <SubCategoryForm 
                    key = {i}
                    subCat = {e}
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
