import React from 'react';
import PropTypes from 'prop-types';

const StartInstanceForm = (props)=> {

    // const editingForm = (e,i, type)=>{
    //   let longTerm;
    //   (type === "savings" || type === "debt") ? longTerm = true : longTerm = false;
    //   const durationInput = ()=>{
    //     return (
    //     <div
    //       className="start-input-container"> duration: <input
    //       placeholder = {e.duration}
    //       value = {e.pendingDuration}
    //       id={`duration-${props.type}-${props.catIndex}-${i}`}
    //       onChange={()=> props.onChange(props.type, props.catIndex, i)}
    //       />
    //   </div>
    //     )
    //   }
    //   return (
    //     <div className="start-sub-category-instances">
    //     <div key={i} className="start-instance">
    //         <div className="start-input-container"> title: <input
    //             placeholder = {e.title}
    //             value = {e.pendingTitle}
    //             id={`title-${props.type}-${props.catIndex}-${i}`}
    //             onChange={()=> props.onChange(props.type, props.catIndex, i)}
    //         />
    //         </div>
    //         <div className="start-input-container"> value: <input
    //             placeholder = {e.value}
    //             value = {e.pendingValue}
    //             id={`value-${props.type}-${props.catIndex}-${i}`}
    //             onChange={()=> props.onChange(props.type, props.catIndex, i)}
    //         />
    //         </div>
    //         {!longTerm ? durationInput() : false}
    //         <div className="start-input-container"> interest/growth: <input
    //             placeholder = {e.interest}
    //             value = {e.pendingInterest}
    //             id={`interest-${props.type}-${props.catIndex}-${i}`}
    //             onChange={()=> props.onChange(props.type, props.catIndex, i)}
    //         />
    //         </div>
    //         <div className="start-input-container"> growth period: <input
    //             placeholder = {e.length}
    //             value = {e.pendingLength}
    //             id={`length-${props.type}-${props.catIndex}-${i}`}
    //             onChange={()=> props.onChange(props.type, props.catIndex, i)}
    //         />
    //         </div>
    //         </div>
    //         <div className="start-instance-buttons">
    //             <button
    //                 onClick={()=> props.onConfirm(props.type, props.catIndex, i)}> Confirm </button>
    //             <button
    //                 onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}>Remove</button>
    //         </div>

    //     </div>
    //   )
    // }

    const staticForm = ()=>{
      return (
        <div>
          <span>{props.title}</span>
          <span>{props.value}</span>
          <button
              onClick={()=> props.onEditAt(props.type, props.instanceIndex)}
              > Edit </button>
          <button
              //onClick={()=> props.removeInstanceAt(props.type, props.catIndex, i)}
            >Remove</button>
        </div>
      )
    }

    return (
        <div className="start-sub-category-form">
            <h3 className="start-sub-category-title">{props.title}</h3>
            {/* {//<h4 className="start-sub-category-desc">{props.description}</h4>}
            */}

            {props.isEditing ? <div /> : staticForm()}

            <div className="start-add-button-container">
                <button
                  //onClick={ props.addInstance }
                  >Add</button>
            </div>
        </div>
    )
}

StartInstanceForm.propTypes = {
    // title: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired
}

export default StartInstanceForm;
