import React from 'react';
import PropTypes from 'prop-types';
import ReactEditableList from 'react-editable-list';

const Year =(props)=>{
            const onListUpdated = (list)=>  {
                console.log("Got updated list:", list)
            }
            const getTitles = (list)=> {
                let newList = [];
                list.map((e,i)=>{
                    newList.push(e.title)
                    }
                )
                return newList;
            }
            const getAmounts = (list)=> {
                let newList = [];
                list.map((e,i)=>{
                    newList.push(e.amount)
                    }
                )
                return newList;
            }
           return (
            <div className="year">
            <h3>{props.year.year}</h3>
            <p>Job: {props.year.income.title}</p><p>Income: {props.year.income.amount}</p>
            </div>
           )
            } 


Year.propTypes = {
    year: PropTypes.object.isRequired
}
export default Year;