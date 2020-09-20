import React from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class PriceSlider extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        pricerange: 0
      }
    }
   
    handleOnChange = (value) => {
      this.setState({
        pricerange:value
        
      })
      this.props.handlePriceSlider(value)
    }
   
    render() {
      let { pricerange } = this.state
      console.log(pricerange)
      return (
          <div>
        <Slider
          min={0}
          max={5000}
          value={pricerange}
          tooltip={true}
          labels={{0:'low',5000:'high'}}
          onChange={this.handleOnChange}
        />
        <div style={{marginTop:'35px'}}>
        <label>min</label>
        <input
            type='text'
            value={pricerange}
            className='form-control'
        />
        <label>max</label>
        <input
            type='text'
            value={5000}
            className='form-control'   
        />
        </div>
        </div>
      )
    }
  }

  export default PriceSlider