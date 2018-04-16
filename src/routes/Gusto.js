import React, { Component } from 'react'

class Gusto extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.gusto.id} ({this.props.gusto.description})
        </div>
      </div>
    )
  }
}

export default Gusto
