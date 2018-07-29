import React from 'react';
import PropTypes from 'prop-types';
import Instance from '../Main_Components/Instance';

class StartIncomeLinkForm extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      display: false,
      connectedIndex: ''
    }
  }

  handleChange = (event)=>{
    console.log("I was called boi: "+ event.target.value)
    this.setState({
      ...this.state,
      connectedIndex: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`link to ${this.props.debts[parseInt(this.state.connectedIndex, 10)].title}`);
  }


  render(){
    return (
      <div className="start-link-container">

        {
          this.state.display

          ?
          <div>

            <form onSubmit={this.handleSubmit}>
              {this.props.debts.map((debt, index)=>{

                return (
                  <span key={index}>
                    <input
                      type='checkbox'
                      value={index}
                      type='radio'
                      checked = {parseInt(this.state.connectedIndex, 10) === index}
                      onChange={this.handleChange}
                      /> {debt.title}
                  </span>)

              })}
              <button type='submit'>Link to Loan</button>
            </form>



          </div>

          :

          <button
            onClick = {()=> this.setState({
              display: !this.state.display
            })}
          >Link expense to a loan</button>


        }

      </div>
    )
  }
}

StartIncomeLinkForm.propTypes = {
    growth: PropTypes.number.isRequired,
    pendingGrowth: PropTypes.string.isRequired
}

export default StartIncomeLinkForm;
