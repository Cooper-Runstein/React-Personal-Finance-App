import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance'


const Category = (props) =>{
    return(
            <td>
                <h3>{props.category.title}</h3>
                {props.category.entries.map((e,i)=> {
                    return(
                    <Instance 
                        yearIndex = {props.yearIndex}
                        catName= {props.catName}
                        catKey= {props.catKey}
                        key={i}
                        index={i}
                        instance={e}
                        editInstance = {()=> props.editEntry(props.yearIndex, props.catName, props.catKey, i)}
                        removeEntry= {() => props.removeEntry(props.yearIndex, props.catName, props.catKey, i)}
                />
            )
                    })
                }
            </td>
    );
    
    
    
}

Category.propTypes = {
    editEntry: PropTypes.func.isRequired
}
export default Category;