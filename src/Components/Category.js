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
                        location={{
                            yearIndex: props.yearIndex,
                            catName: props.catName, 
                            catKey: props.catKey, 
                            instanceIndex: i
                        }}
                        editInstance = {()=> props.editEntry({
                                yearIndex: props.yearIndex,
                                catName: props.catName, 
                                catKey: props.catKey, 
                                instanceIndex: i
                            })}
                        removeEntry= {() => props.removeEntry({
                            yearIndex: props.yearIndex,
                            catName: props.catName, 
                            catKey: props.catKey, 
                            instanceIndex: i
                        })}
                        onChangeValue= {props.onChangeValue}
                        onChangeTitle= {props.onChangeTitle}
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