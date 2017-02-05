import React from 'react';
import onClickOutside from 'react-onclickoutside'

import './AddTileForm.scss'

export class AddTileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingName: "",
    };
  }

  handleKeyDown(e) {
    const { add, close } = this.props
    if (e.which === 13) {
      // Enter key pressed
      if (e.target.value.trim().length !== 0) {
        add(e.target.value.trim());
      }
      this.setState({ addingName: "" });
      close()

    } else if (e.which === 27) {
      // Esc key pressed
      this.setState({ addingName: "" });
      close()
    }
  }

  handleClickOutside(e) {
    this.props.close()
  }

  render() {
    return (
      <div>
        <p>
          <input
            className="tile__add-form-name input is-large"
            type="text"
            placeholder="Name..."
            value={this.state.addingName}
            autoFocus="true"
            onChange={(e) => this.setState({ addingName: e.target.value })}
            onKeyDown={::this.handleKeyDown}
          />
        </p>
        <p className="tile__add-form-instructions control">
          Enter to add, Esc to cancel
        </p>
      </div>
    )
  }
}

export default onClickOutside(AddTileForm)
