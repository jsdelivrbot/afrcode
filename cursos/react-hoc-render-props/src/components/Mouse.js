import React, { Component } from 'react';

import withLogging from './withLogging';

class Mouse extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ position: 'absolute', height: '100%', width: '100%'}} onMouseMove={this.handleMouseMove}>
        {
          /* Instead of providing a static representation of what <Mouse> renders,
             use the `render` prop to dynamically determine what to render. */
        }
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default withLogging(Mouse);