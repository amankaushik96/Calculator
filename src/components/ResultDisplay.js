import React from 'react';
import './App.css';

class ResultDisplay extends React.Component {
	state = { textInput: '', keyCode: null, isShift: false };

	handleChange = e => {
		const val = e.target.value;
		if (val.indexOf('00') === 0) return;
		let obj = this.computeDifference(this.props.val, val);
		if (this.props.val && this.props.val.length > val.length) {
			//Backspace Detected
			this.props.update(val, true);
			return;
		}
		//const computedVal = val.substring(val.length - 1, val.length);
		if (!isNaN(parseInt(val))) {
			if (
				(this.props.val.indexOf('0') === 0 &&
					this.props.val.length === 1 &&
					obj.updatedVal === '0') ||
				(this.props.val.indexOf('.') !== -1 && obj.updatedVal === '.')
			)
				return;
			if (!isNaN(parseInt(obj.updatedVal)) || obj.updatedVal === '.')
				this.props.update(obj.finalString, false, obj.updatedVal);
		}
	};

	computeDifference = (textboxVal, newVal) => {
		let updatedVal = '',
			updatedIndex = 0,
			finalString = '',
			obj = {};
		if (textboxVal.length < newVal.length) {
			for (let i in newVal) {
				if (textboxVal[i] !== newVal[i]) {
					updatedVal = newVal[i];
					updatedIndex = i;
					break;
				}
			}
			updatedIndex = parseInt(updatedIndex);
			let firstPart = newVal.slice(0, updatedIndex);
			let secondPart = newVal.slice(updatedIndex + 1, newVal.length);
			finalString = firstPart + updatedVal + secondPart;
			obj.finalString = finalString;
			obj.updatedVal = updatedVal;
		}
		return obj;
	};

	handleKeyUp = keyCode => {
		console.log(keyCode);
		return;
		if (keyCode === 16) this.setState({ isShift: true });
		if (keyCode === 187 && this.state.isShift) {
			//plus pressed
			this.props.setVal('+');
			this.setState({ isShift: false });
		} else if (keyCode === 191) {
			//divide
			this.props.setVal('/');
		} else if (keyCode === 189) {
			//minus
			this.props.setVal('-');
		} else if (keyCode === 56 && this.state.isShift) {
			//multiply
			this.props.setVal('X');
			this.setState({ isShift: false });
		}
	};

	render() {
		return (
			<div>
				<input
					type="text"
					onKeyUp={e => {
						this.handleKeyUp(e.keyCode);
					}}
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
