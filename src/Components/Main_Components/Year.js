import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';



const Year =(props)=>{

           return (
            <tr className="year">
                <th>{props.year.year}</th>
                <td>
                  <div className='category-container'>
                  <h2>Income</h2>
                  <div className='instances-container'>
                  {props.year.income.instances.map((e,i)=>{
                      return <Instance
                        key = {i}
                        instanceIndex = {i}
                        yearIndex = {props.yearIndex}
                        type = "income"
                        instance = {e}
                        title = {e.title}
                        value = {e.value}
                        pendingValue = {e.pendingValue}
                        pendingTitle = {e.pendingTitle}
                        isEditing = {e.isEditing}
                        interest = {e.interest}
                        editEntry = {()=> props.toggleEditEntry(props.yearIndex, 'income', i)}
                        removeInstance = {()=>props.removeInstanceAt(props.yearIndex, 'income', i)}
                        onChange = {props.onChange}
                        onConfirm = {()=> props.onConfirmAt(props.yearIndex, 'income', i)}
                        connectedIndex = { e.connectedIndex }

                      />
                  })}
                  </div>
                  <button
                    onClick={()=> props.addInstance(props.yearIndex, 'income')}>Add</button>
                </div>
                <div className='category-container'>
                <h2>Expenses</h2>
                <div className='instances-container'>
                  {props.year.expenses.instances.map((e, i)=>{
                      return <Instance
                      yearIndex= {props.yearIndex}
                      instanceIndex = {i}
                          key = {i}
                          catKey = {i}
                          type = "expenses"
                          instance = {e}
                          title = {e.title}
                          value = {e.value}
                          pendingValue = {e.pendingValue}
                          pendingTitle = {e.pendingTitle}
                          isEditing = {e.isEditing}
                          editEntry = {()=> props.toggleEditEntry(props.yearIndex, 'expenses', i)}
                          removeInstance = {()=>props.removeInstanceAt(props.yearIndex, 'expenses', i)}
                          onConfirm = { ()=> props.onConfirmAt(props.yearIndex, 'expenses', i) }
                          onChange = {props.onChange}
                          connectedId = { e.connectedId }
                      />
                  })}
                  </div>
                  <button
                    onClick={()=> props.addInstance(props.yearIndex, 'expenses')}>Add</button>
                </div>
                <div className='category-container'>
                <h2>Debt</h2>
                <div className='instances-container'>
                  {props.year.debt.instances.map((e,i)=>{
                      return <Instance
                      yearIndex= {props.yearIndex}
                      instanceIndex = {i}
                          key = {i}
                          catKey = {i}
                          type = "debt"
                          instance = {e}
                          title = {e.title}
                          value = {e.value}
                          interest = {e.interest}
                          pendingInterest = {e.pendingInterest}
                          pendingValue = {e.pendingValue}
                          pendingTitle = {e.pendingTitle}
                          isEditing = {e.isEditing}
                          onChange = {props.onChange}
                          editEntry = {()=> props.toggleEditEntry(props.yearIndex, 'debt', i)}
                          removeInstance = {()=>props.removeInstanceAt(props.yearIndex, 'debt', i)}
                          onConfirm = {()=> props.onConfirmAt(props.yearIndex, 'debt', i)}
                      />
                  })}
                </div>
                  <button
                    onClick={()=> props.addInstance(props.yearIndex, 'debt')}>Add</button>
                  </div>
                  <div className='category-container'>

                <h2>Savings</h2>
                <div className='instances-container'>
                  {props.year.savings.instances.map((e,i)=>{
                      return <Instance
                      yearIndex= {props.yearIndex}
                      instanceIndex = {i}
                          key = {i}
                          catKey = {i}
                          type = "savings"
                          instance = {e}
                          title = {e.title}
                          value = {e.value}
                          interest = {e.interest}
                          pendinInterest = {e.pendinInterest}
                          pendingValue = {e.pendingValue}
                          pendingTitle = {e.pendingTitle}
                          isEditing = {e.isEditing}
                          onChange = {props.onChange}
                          editEntry = {()=> props.toggleEditEntry(props.yearIndex, 'savings', i)}
                          removeInstance = {()=>props.removeInstanceAt(props.yearIndex, 'savings', i)}
                          onConfirm = {()=> props.onConfirmAt(props.yearIndex, 'savings', i)}
                      />
                  })}
                  </div>
                  <button
                    onClick={()=> props.addInstance(props.yearIndex, 'savings')}>Add</button>

                  </div>
              </td>
            </tr>
           )
    }


Year.propTypes = {
    year: PropTypes.object.isRequired,
}

export default Year;
