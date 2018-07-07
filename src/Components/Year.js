import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';


const Year =(props)=>{
           
           return (
            <tr className="year">
                <td>{props.year.year}</td>
                {props.year.income.map((e,i)=>{
                    return <Category 
                        key={i}
                        category={e}
                        editEntry={props.editEntry}
                    />
                })}
                {props.year.expenses.map((e,i)=>{
                    return <Category 
                        key={i}
                        category={e}
                        editEntry={props.editEntry}
                    />
                })}
                {props.year.debt.map((e,i)=>{
                    return <Category 
                        key={i}
                        category={e}
                        editEntry={props.editEntry}
                    />
                })}
                {props.year.savings.map((e,i)=>{
                    return <Category 
                        key={i}
                        category={e}
                        editEntry={props.editEntry}
                    />
                })}
                
            </tr>
           )
    } 


Year.propTypes = {
    year: PropTypes.object.isRequired
}
export default Year;