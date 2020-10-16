new Vue({
	el: "#app",
	data: {
		equation: "0", //计算结果初始化为0
		isDecimalAdded: false, // 判断是否加入小数点
		isOperatorAdded: false, //判断是否点击运算符号
		isStarted: false, //判断是否开始输入数字
	},
	methods: {

		// 判断character是否是运算符号
		isOperator(character) {
			return ['+', '-', '×', '÷'].indexOf(character) > -1;
		},

		// 添加数值与符号
		append(character) {
			// 判断第一个数输入的不是运算符号时
			if (this.equation === "0" && !this.isOperator(character)) {
				if (character === ".") {
					//小数点前加0
					this.equation = "0" + character;
					this.isDecimalAdded = true; //限制小数点输入次数
					this.isOperatorAdded = true; //小数点后不能加运算符号
				} else {
					this.equation = character;
				}
				this.isStarted = true;
				return;
			}
			// 判断如果输入的不是运算符时
			if (!this.isOperator(character)) {
				// 输入的是小数点只能是一位
				if (character === "." && this.isDecimalAdded) {
					return;
				}

				if (character === ".") {
					this.isDecimalAdded = true; //限制小数点输入次数
					this.isOperatorAdded = true; //小数点后不能加运算符号
				} else {
					this.isOperatorAdded = false;
				}
				this.equation += "" + character;
			}
			// 判断如果输入的是运算符号
			if (this.isOperator(character) && !this.isOperatorAdded) {
				this.equation += character;
				this.isOperatorAdded = true; //限制运算符号只能输入一次
				this.isDecimalAdded = false; //取消小数点限制
			}
		},

		// 计算结果
		calculate() {
			// 将字符版本的运算符替换成运算式版本
			var result = this.equation
				.replace(new RegExp('×', 'g'), '*')
				.replace(new RegExp('÷', 'g'), '/');
			// 超过限定数值长度转化为科学计数法
			this.equation = (eval(result) < 1.0e9 ? parseFloat(eval(result)
				.toFixed(9)) : eval(result).toExponential(1)).toString();
				
			this.isDecimalAdded = false;
			this.isOperatorAdded = false;
		},

		// 点击'±'符号时
		calculateToggle() {
			//运算符和小数点后不能加'±'符号
			if(!this.isOperatorAdded && !this.isDecimalAdded){
				this.equation = this.equation + "* -1";
				this.calculate();
			}
		},

		// 点击'%'符号时
		calculatePercentage() {
			//运算符和小数点后不能加'%'符号
			if(!this.isOperatorAdded && !this.isDecimalAdded){
				this.equation = this.equation + "* 0.01";
				this.calculate();
			}
		},

		// 点击'AC'符号时
		clear() {
			this.equation = "0";
			this.isDecimalAdded = false;
			this.isOperatorAdded = false;
			this.isStarted = false;
		}
	}
});
