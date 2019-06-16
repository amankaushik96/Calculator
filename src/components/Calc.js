import React from 'react';
import './App.css';
import InputBox from './ResultDisplay';

class Calc extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			symSelected: null,
			textbox: '',
			firstNum: 0,
			isDot: false,
			secondNum: 0,
			curr: null,
			resultComputed: false
		};
	}
	setVal = val => {
		if (
			val !== 'AC' &&
			val !== '=' &&
			(val !== '+' && val !== '-' && val !== 'X')
		) {
			if (
				val === '.' &&
				this.state.textbox !== '' &&
				!this.state.isDot &&
				!this.state.resultComputed
			) {
				this.setState({
					isDot: true,
					textbox: '' + this.state.textbox + val,
					resultComputed: false
				});
			} else if (
				val === '.' &&
				this.state.textbox === '' &&
				!this.state.isDot
			) {
				this.setState({
					isDot: true,
					textbox: '0' + val,
					resultComputed: false
				});
			} else if (val !== '.' && !this.state.resultComputed) {
				if (
					val === 0 &&
					(this.state.textbox || this.state.textbox === 0) &&
					this.state.textbox.toString().indexOf('0') === 0
				)
					return;
				if (
					this.state.symSelected === '+' ||
					this.state.symSelected === 'X' ||
					this.state.symSelected === '-'
				) {
					this.setState({ secondNum: '' + this.state.textbox + val });
				}
				this.setState({
					textbox: '' + this.state.textbox + val,
					resultComputed: false
				});
			} else if (this.state.resultComputed) {
				let textboxval = '';
				if (val === '.') {
					textboxval = '0.';
				} else {
					textboxval = val;
				}
				this.setState({
					resultComputed: false,
					isDot: false,
					firstNum: 0,
					secondNum: 0,
					textbox: textboxval,
					symSelected: null
				});
			}
		} else {
			if (val === 'AC') {
				this.setState({
					textbox: '',
					symSelected: null,
					firstNum: 0,
					secondNum: 0,
					resultComputed: false,
					isDot: false
				});
			} else if (val === '+' || val === '-' || val === 'X') {
				this.setState({ symSelected: val });
				if (this.state.textbox !== '') {
					this.setState(
						{
							firstNum: parseFloat(this.state.textbox),
							resultComputed: false
						},
						() => {
							if (this.state.firstNum !== 0) {
								this.renderTotal(val);
							} else if (this.state.firstNum === 0) {
								this.setState({
									firstNum: parseFloat(this.state.textbox),
									textbox: '',
									isDot: false,
									resultComputed: false
								});
							}
						}
					);
				}
			} else {
				this.renderTotal(val);
			}
		}
	};

	renderTotal = val => {
		const firstNum = this.state.firstNum;
		const sym = this.state.symSelected;
		let tot = 0,
			secondNum = parseFloat(this.state.secondNum);
		if (val === '=' && this.state.firstNum && this.state.secondNum) {
			if (sym === '-') {
				tot = firstNum - secondNum;
			} else if (sym === '+') {
				tot = firstNum + secondNum;
			} else {
				tot = firstNum * secondNum;
			}
			this.setState({
				textbox: '' + tot,
				firstNum: tot,
				secondNum: 0,
				resultComputed: true,
				symSelected: null
			});
		} else if (val !== '=') {
			secondNum = parseFloat(this.state.secondNum);
			if (secondNum) {
				if (sym === '-') {
					tot = firstNum - secondNum;
				} else if (sym === '+') {
					tot = firstNum + secondNum;
				} else {
					tot = firstNum * secondNum;
				}
				this.setState({
					textbox: '',
					firstNum: tot,
					secondNum: 0
				});
			} else {
				const secN = parseFloat(this.state.textbox);
				this.setState({
					textbox: '',
					secondNum: secN
				});
			}
		}
	};

	updateTextBox = (val, isBack) => {
		if (isBack) this.setState({ textbox: '' + val });
		else this.setState({ textbox: '' + this.state.textbox + val });
	};

	render() {
		console.log(this.state);
		return (
			<div className="parent-container">
				<InputBox
					val={this.state.textbox}
					update={this.updateTextBox}
				/>
				<div className="cal-parent">
					<div
						onClick={() => {
							this.setVal(7);
						}}
						className="item"
					>
						7
					</div>
					<div
						onClick={() => {
							this.setVal(8);
						}}
						className="item"
					>
						8
					</div>
					<div
						onClick={() => {
							this.setVal(9);
						}}
						className="item"
					>
						9
					</div>
					<div
						onClick={() => {
							this.setVal('X');
						}}
						className="item sym-item"
					>
						x
					</div>
					<div
						onClick={() => {
							this.setVal(4);
						}}
						className="item"
					>
						4
					</div>
					<div
						o
						onClick={() => {
							this.setVal(5);
						}}
						className="item"
					>
						5
					</div>
					<div
						onClick={() => {
							this.setVal(6);
						}}
						className="item"
					>
						6
					</div>
					<div
						o
						onClick={() => {
							this.setVal('-');
						}}
						className="item sym-item"
					>
						-
					</div>
					<div
						onClick={() => {
							this.setVal(1);
						}}
						className="item"
					>
						1
					</div>
					<div
						onClick={() => {
							this.setVal('2');
						}}
						className="item"
					>
						2
					</div>
					<div
						onClick={() => {
							this.setVal(3);
						}}
						className="item"
					>
						3
					</div>
					<div
						onClick={() => {
							this.setVal('+');
						}}
						className="item sym-item"
					>
						+
					</div>
					<div
						onClick={() => {
							this.setVal(0);
						}}
						className="item item-width-2"
					>
						0
					</div>
					<div className="item">00</div>
					<div
						onClick={() => {
							this.setVal('.');
						}}
						className="item item-width-2"
					>
						.
					</div>
					<div
						onClick={() => {
							this.setVal('=');
						}}
						className="item sym-item"
					>
						=
					</div>
					<div
						onClick={() => {
							this.setVal('AC');
						}}
						className="item sym-item wide"
					>
						AC
					</div>
					<div className="item sym-item">/</div>
				</div>
				<div className="more-menu">. . .</div>
			</div>
		);
	}
}

export default Calc;
