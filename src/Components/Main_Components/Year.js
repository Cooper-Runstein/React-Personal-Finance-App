import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';


const Year =(props)=>{

           return (
            <tr className="year">
                <th>{props.year.year}</th>
                <td>
                  <h2>Income</h2>
                  {props.year.income.instances.map((e,i)=>{
                      return <Instance
                        key = {i}
                        catKey = {i}
                        catName = "income"
                        instance = {e}
                        title = {e.title}
                        value = {e.value}
                        pendingValue = {e.pendingValue}
                        pendingTitle = {e.pendingTitle}
                        isEditing = {e.isEditing}
                        interest = {e.interest}
                        editEntry = {()=> props.toggleEditEntry(props.yearIndex, 'income', i)}
                        removeEntry = {()=>props.removeEntryAt(props.index, 'income', i)}
                          // removeEntry = {props.removeEntry}
                          // onChangeValue = {props.onChangeValue}
                          // onChangeTitle = {props.onChangeTitle}
                          // onChangeInterest = {props.onChangeInterest}
                          // onConfirm = {props.onConfirm}
                          // addInstance = {props.addInstance}
                      />
                  })}
                  <button
                    onClick={()=> props.addInstance(props.yearIndex, 'income')}>Add</button>


                <h2>Expenses</h2>
                  {props.year.expenses.instances.map((e,i)=>{
                      return <Instance
                      yearIndex= {props.yearIndex}
                          key = {i}
                          catKey = {i}
                          catName = "expenses"
                          instance = {e}
                          title = {e.title}
                          value = {e.value}
                          pendingValue = {e.pendingValue}
                          pendingTitle = {e.pendingTitle}
                          isEditing = {e.isEditing}
                          editEntry = {()=> props.toggleEditEntry(props.yearIndex, 'expenses', i)}
                          removeInstance = {()=>props.removeInstanceAt(props.yearIndex, 'expenses', i)}
                          // editEntry = {props.editEntry}
                          // removeEntry = {props.removeEntry}
                          // onChangeValue = {props.onChangeValue}
                          // onChangeTitle = {props.onChangeTitle}
                          // onChangeInterest = {props.onChangeInterest}
                          // onConfirm = {props.onConfirm}
                          // addInstance = {props.addInstance}
                      />
                  })}
                  <button
                    onClick={()=> props.addInstance(props.yearIndex, 'expenses')}>Add</button>
                {/* {props.year.debt.map((e,i)=>{
                    return <Instance
                        key = {i}
                        catKey = {i}
                        yearIndex = {props.yearIndex}
                        catName = "debt"
                        instance = {e}
                        editEntry = {props.editEntry}
                        removeEntry = {props.removeEntry}
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle = {props.onChangeTitle}
                        onChangeInterest = {props.onChangeInterest}
                        onConfirm = {props.onConfirm}
                        addInstance = {props.addInstance}
                    />
                })}
                {props.year.savings.map((e,i)=>{
                    return <Instance
                        key = {i}
                        catKey = {i}
                        yearIndex = {props.yearIndex}
                        catName = "savings"
                        instance = {e}
                        editEntry = {props.editEntry}
                        removeEntry = {props.removeEntry}
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle = {props.onChangeTitle}
                        onChangeInterest = {props.onChangeInterest}
                        onConfirm = {props.onConfirm}
                        addInstance = {props.addInstance}
                    /> */}
                {/* })} */}

              </td>
            </tr>
           )
    }


Year.propTypes = {
    year: PropTypes.object.isRequired,
}
export default Year;
