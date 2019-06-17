import React from 'react';
import './App.css';
import InputBox from './ResultDisplay';

class Calc extends React.Component {
	state = {
		symSelected: null,
		textbox: '',
		firstNum: null,
		isDot: false,
		secondNum: null,
		curr: null,
		resultComputed: false
	};

	getNumberOrDot = val => {
		if (
			val !== 'AC' &&
			val !== '=' &&
			(val !== '+' && val !== '-' && val !== 'X' && val !== '/')
		) {
			return true;
		}
		return false;
	};

	isDotAllowed = val => {
		if (
			val === '.' &&
			this.state.textbox !== '' &&
			!this.state.isDot &&
			!this.state.resultComputed
		) {
			return true;
		}
		return false;
	};

	isFirstLetterDot = val => {
		if (val === '.' && this.state.textbox === '' && !this.state.isDot) {
			return true;
		}
		return false;
	};

	isNumberAndResultNotComputed = val => {
		if (val !== '.' && !this.state.resultComputed) return true;
		return false;
	};

	firstNumZero = val => {
		if (
			(val === 0 &&
				(this.state.textbox || this.state.textbox === 0) &&
				this.state.textbox.toString().indexOf('0') === 0) ||
			(val === '00' && this.state.textbox === '')
		)
			return true;
		return false;
	};

	isSymbolSelectedOperator = val => {
		if (
			this.state.symSelected === '+' ||
			this.state.symSelected === 'X' ||
			this.state.symSelected === '-' ||
			this.state.symSelected === '/'
		)
			return true;
		return false;
	};

	resultComputedAndKeyPressed = val => {
		let textboxval = '',
			fNum = 0,
			sNum;
		if (val === '.') {
			textboxval = '0.';
		} else {
			textboxval = val;
		}
		if (this.isSymbolSelectedOperator(val)) {
			fNum = this.state.firstNum;
		} else {
			fNum = null;
		}
		if (this.isSymbolSelectedOperator(val)) {
			sNum = this.state.textbox;
		} else {
			sNum = null;
		}
		this.setState({
			resultComputed: false,
			isDot: false,
			firstNum: fNum,
			secondNum: sNum,
			textbox: textboxval,
			symSelected: null
		});
	};

	isOperator = val => {
		if (val === '+' || val === '-' || val === 'X' || val === '/')
			return true;
		return false;
	};

	setVal = (val, isFromTextBox, fullValue) => {
		this.setState({ curr: val });
		if (this.getNumberOrDot(val)) {
			if (this.isDotAllowed(val)) {
				this.setState({
					isDot: true,
					textbox: !isFromTextBox
						? '' + this.state.textbox + val
						: fullValue,
					resultComputed: false
				});
			} else if (this.isFirstLetterDot(val)) {
				this.setState({
					isDot: true,
					textbox: '0' + val,
					resultComputed: false
				});
			} else if (this.isNumberAndResultNotComputed(val)) {
				if (this.firstNumZero(val)) return;
				if (this.isSymbolSelectedOperator(val)) {
					this.setState({
						secondNum: '' + this.state.textbox + val
					});
				}
				this.setState({
					textbox: !isFromTextBox
						? '' + this.state.textbox + val
						: fullValue,
					resultComputed: false
				});
			} else if (this.state.resultComputed) {
				this.resultComputedAndKeyPressed(val);
			}
		} else {
			if (val === 'AC') {
				this.setState({
					textbox: '',
					symSelected: null,
					firstNum: null,
					secondNum: null,
					resultComputed: false,
					isDot: false
				});
			} else if (this.isOperator(val)) {
				this.setState({ symSelected: val, resultComputed: false });
				if (this.state.textbox !== '') {
					if (this.state.firstNum !== null) {
						this.renderTotal(val);
					} else if (this.state.firstNum === null) {
						this.setState({
							firstNum: parseFloat(this.state.textbox),
							textbox: '',
							isDot: false,
							resultComputed: false
						});
					}
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
		if (
			val === '=' &&
			this.state.firstNum !== null &&
			this.state.secondNum
		) {
			if (this.getSymbols()) {
				return;
			}
			const tot = this.doTotal(sym, firstNum, secondNum);
			this.setState({
				textbox: '' + tot,
				firstNum: tot,
				secondNum: null,
				resultComputed: true,
				symSelected: null
			});
		} else if (val !== '=') {
			secondNum = parseFloat(this.state.secondNum);
			if (secondNum) {
				const tot = this.doTotal(sym, firstNum, secondNum);
				this.setState({
					textbox: '',
					firstNum: tot,
					secondNum: null
				});
			} else {
				this.setState({
					textbox: ''
				});
			}
		}
	};

	getSymbols = () => {
		if (
			this.state.curr === '+' ||
			this.state.curr === '-' ||
			this.state.curr === 'X' ||
			this.state.curr === '/' ||
			this.state.curr === '='
		) {
			return true;
		}
		return false;
	};

	doTotal = (sym, firstNum, secondNum) => {
		let tot = 0;
		if (sym === '-') {
			tot = firstNum - secondNum;
		} else if (sym === '+') {
			tot = firstNum + secondNum;
		} else if (sym === '/') {
			tot = firstNum / secondNum;
		} else {
			tot = firstNum * secondNum;
		}
		return tot;
	};

	updateTextBox = (val, isBack, insertedVal) => {
		if (isBack) this.setState({ textbox: '' + val });
		else {
			this.setState({ textbox: '' + val });
			this.setVal(insertedVal, true, val);
		}
	};

	render() {
		return (
			<div className="parent-container">
				<label className="cal-history">
					{(this.state.firstNum !== null ? this.state.firstNum : '') +
						(this.state.symSelected !== null
							? this.state.symSelected
							: '') +
						(this.state.secondNum !== null
							? this.state.secondNum
							: '')}
				</label>
				<InputBox
					val={this.state.textbox}
					update={this.updateTextBox}
					setVal={this.setVal}
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
					<div
						onClick={() => {
							this.setVal('00');
						}}
						className="item"
					>
						00
					</div>
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
					<div
						onClick={() => {
							this.setVal('/');
						}}
						className="item sym-item"
					>
						/
					</div>
				</div>
				<div className="more-menu">. . .</div>
			</div>
		);
	}
}

export default Calc;
