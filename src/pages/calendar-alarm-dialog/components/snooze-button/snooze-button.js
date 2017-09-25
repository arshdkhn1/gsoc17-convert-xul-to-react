/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
  /* global React */
  class SnoozeButton extends React.Component {
    constructor() {
      super();
      this.state = {
        showCustomTimer: false
      };
    }

    submitSnoozeTime(value, unit) {
      console.log(value, unit);
    }

    changeSnoozeTime(event) {
      let value = event.currentTarget.value;
      if (value === "NULL") {
        return;
      } else if (value === "CUSTOM") {
        this.showCustomTimer();
        return;
      } else {
        value = parseInt(value, 10);
        const selectedIndex = event.currentTarget.selectedIndex;
        const unit = event.currentTarget.options[selectedIndex].getAttribute("data-unit");
        this.submitSnoozeTime(value, unit);
        this.props.onClick();
      }
    }

    showCustomTimer() {
      this.setState({ showCustomTimer: true });
    }

    closeCustomTimerPopup() {
      this.setState({ showCustomTimer: false });
    }

    // gets time value and unit from custom time popup
    acceptCustomTimerPopup(value, unit) {
      this.submitSnoozeTime(value, unit);
      // close popup after getting the custom time value and unit
      this.closeCustomTimerPopup();
    }

    render() {
      const text = this.props.type === "all" ? "Snooze All for" : "Snooze for";
      const changeSnoozeTime = this.changeSnoozeTime.bind(this);
      const showCustomTimer = this.state.showCustomTimer;
      const closeCustomTimer = this.closeCustomTimerPopup.bind(this);
      const acceptCustomTimer = this.acceptCustomTimerPopup.bind(this);

      return (
        <div className="snooze-button-wrapper">
          {showCustomTimer &&
            <SnoozeTimerPopup closePopup={closeCustomTimer} acceptPopup={acceptCustomTimer} />}
          <select className="alarm-snooze-button" value="NULL" onChange={changeSnoozeTime}>
            <option value="NULL" disabled="disabled">{text}</option>
            <option value="5" data-unit="M">5 Minutes</option>
            <option value="10" data-unit="M">10 Minutes</option>
            <option value="15" data-unit="M">15 Minutes</option>
            <option value="30" data-unit="M">30 Minutes</option>
            <option value="45" data-unit="M">45 Minutes</option>
            <option value="1" data-unit="H">1 Hour</option>
            <option value="2" data-unit="H">2 Hours</option>
            <option value="1" data-unit="D">1 Day</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>
      );
    }
  }

  SnoozeButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  SnoozeButton.defaultProps = {
    type: "single"
  };

  window.SnoozeButton = SnoozeButton;
})();
