import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';


const Year =(props)=>{
           
           return (
            <tr className="year">
                <td>{props.year.year}</td>
                {props.year.income.map((e,i)=>{
                    return <Category
                        yearIndex = {props.yearIndex}
                        catName = "income"
                        catKey = {i}
                        key = {i}
                        category = {e}
                        editEntry = {props.editEntry}
                        removeEntry = {props.removeEntry}
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle = {props.onChangeTitle}
                        onConfirm = {props.onConfirm}
                        addInstance = {props.addInstance}
                    />
                })}
                {props.year.expenses.map((e,i)=>{
                    return <Category 
                    yearIndex= {props.yearIndex}
                        key = {i}
                        catKey = {i}
                        catName = "expenses"
                        category = {e}
                        editEntry = {props.editEntry}
                        removeEntry = {props.removeEntry}
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle = {props.onChangeTitle}
                        onConfirm = {props.onConfirm}
                        addInstance = {props.addInstance}
                    />
                })}
                {props.year.debt.map((e,i)=>{
                    return <Category 
                        key = {i}
                        catKey = {i}
                        yearIndex = {props.yearIndex}
                        catName = "debt"
                        category = {e}
                        editEntry = {props.editEntry}
                        removeEntry = {props.removeEntry}
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle = {props.onChangeTitle}
                        onConfirm = {props.onConfirm}
                        addInstance = {props.addInstance}
                    />
                })}
                {props.year.savings.map((e,i)=>{
                    return <Category 
                        key = {i}
                        catKey = {i}
                        yearIndex = {props.yearIndex}
                        catName = "savings"
                        category = {e}
                        editEntry = {props.editEntry}
                        removeEntry = {props.removeEntry}
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle = {props.onChangeTitle}
                        onConfirm = {props.onConfirm}
                        addInstance = {props.addInstance}
                    />
                })}
                
            </tr>
           )
    } 


Year.propTypes = {
    year: PropTypes.object.isRequired,
    editEntry: PropTypes.func.isRequired,
    yearIndex: PropTypes.number.isRequired,
    removeEntry: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    addInstance: PropTypes.func.isRequired
}
export default Year;