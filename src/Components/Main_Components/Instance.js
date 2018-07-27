import React from 'react';
import PropTypes from 'prop-types';

import AddInstanceButton from './AddInstanceButton';
import Title from "./Title";
import Value from "./Value";


const Instance = (props) =>{
    //const totalValue = ()=>props.category.instances.reduce((sum, entry)=>{ return sum + parseFloat(entry.value)}, 0)
    return(
            <div>
                <Title
                  title = {props.title}
                  isEditing = {props.isEditing}
                  pendingTitle = {props.pendingTitle}
                  // onChange = {props.onChangeTitle}
                  // location = {props.location}
                />
                <Value
                  interest = {props.interest}
                  yearIndex = {props.yearIndex}
                  value = {props.value}
                  isEditing = {props.isEditing}
                  pendingValue = {props.pendingValue}
                  //onChangeVal = {props.onChangeValue}
                  //onChangeInt = {props.onChangeInterest}
                  //location = {props.location}

                />
                <button
                  onClick = {props.editEntry}>Edit</button>
                <button
                  onClick = {props.removeInstance}>Remove</button>
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
            </div>
    );
}

Instance.propTypes = {
    title: PropTypes.string.isRequired
}
export default Instance;
