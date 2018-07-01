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
                    />
                })}
                {props.year.expenses.map((e,i)=>{
                    return <Category 
                        key={i}
                        category={e}
                    />
                })}
                
            </tr>
           )
    } 


Year.propTypes = {
    year: PropTypes.object.isRequired
}
export default Year;