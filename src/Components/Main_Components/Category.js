import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';
import AddInstanceButton from './AddInstanceButton';


const Category = (props) =>{
    //const totalValue = ()=>props.category.instances.reduce((sum, entry)=>{ return sum + parseFloat(entry.value)}, 0)
    return(
            <td>
                <h3>{props.instance.title}</h3>
                {/* <AddInstanceButton
                    onClick = {()=>props.addInstance({
                        yearIndex: props.yearIndex,
                        catName: props.catName,
                        catKey: props.catKey,
                        instanceIndex: 0
                    })}
                /> */}
                {/* {props.category.instances.map((e,i)=> {
                    //'Category' object has array 'instances' containing 'instance' objects
                    //Each instance has edit buttons and occupies a row within a category column for a given year
                    return(
                    <Instance
                        yearIndex = {props.yearIndex}
                        catName = {props.catName}
                        catKey = {props.catKey}
                        key = {i}
                        index = {i}
                        instance = {e}
                        location = {{ //location array used to find instance
                            yearIndex: props.yearIndex,
                            catName: props.catName,
                            catKey: props.catKey,
                            instanceIndex: i //location of instance in 'location' object
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
                        onChangeValue = {props.onChangeValue}
                        onChangeTitle= {props.onChangeTitle}
                        onChangeInterest = {props.onChangeInterest}
                        onConfirm= {props.onConfirm}
                />
            )
                    })
                } */}
            </td>
    );
}

Category.propTypes = {
    catKey: PropTypes.number.isRequired,
    yearIndex: PropTypes.number.isRequired,
    catName: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    editEntry: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    addInstance: PropTypes.func.isRequired
}
export default Category;
