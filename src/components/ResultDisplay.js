import React from 'react';
import './App.css';

class ResultDisplay extends React.Component {
	state = { textInput: '' };

	handleChange = e => {
		const val = e.target.value;
		if (this.props.val && this.props.val.length > val.length) {
			//Backspace Detected
			this.props.update(
				this.props.val.substring(0, this.props.val.length - 1),
				true
			);
			return;
		}
		const computedVal = val.substring(val.length - 1, val.length);
		if (!isNaN(parseInt(val))) {
			if (
				(this.props.val.indexOf('0') === 0 &&
					this.props.val.length === 1 &&
					computedVal === '0') ||
				(this.props.val.indexOf('.') !== -1 && computedVal === '.')
			)
				return;
			if (!isNaN(parseInt(computedVal)) || computedVal === '.')
				this.props.update(computedVal);
		}
	};

	handleBackSpace = e => {
		alert(e);
	};

	render() {
		return (
			<div>
				<input
					type="text"
					// onKeyPress={e => {
					// 	alert('kp', e.charCode);
					// 	this.handleBackSpace(e.keyCode);
					// }}
					onChange={e => {
						this.handleChange(e);
					}}
					className="inputBox"
					value={this.props.val}
				/>
			</div>
		);
	}
}

export default ResultDisplay;
