function Stack() {

	// 存储元素数组
	var elements = [];

	/**
	 * 元素入栈
	 * @param element 入栈元素列表
	 * @returns {Number} 堆栈元素个数，参数为空时返回-1
	 */
	Stack.prototype.push = function(element) {
		for (var i = 0; i < arguments.length; i++) {
			elements.push(arguments[i]);
		}
		return elements.length;
	};

	/**
	 * 元素出栈
	 * @returns {*} 当堆栈元素为空时，返回null
	 */
	Stack.prototype.pop = function() {
		return (elements.length == 0) ? null : elements.pop();
	};

	/**
	 * 返回栈顶元素值
	 * @returns {*} 若堆栈为空则返回null
	 */
	Stack.prototype.peek = function() {
		return (elements.length == 0) ? null : elements[elements.length - 1];
	};

	/**
	 * 将堆栈置空
	 */
	Stack.prototype.clearAll = function() {
		elements = [];
	};

	/**
	 * 获取堆栈元素个数
	 * @returns {Number}
	 */
	Stack.prototype.size = function() {
		return elements.length;
	};

	/**
	 * 判断堆栈是否为空
	 * @returns {boolean} 堆栈为空返回true,否则返回false
	 */
	Stack.prototype.isEmpty = function() {
		return elements.length == 0;
	};

	/**
	 * 将堆栈元素转化为字符串
	 * @returns {string}
	 */
	Stack.prototype.toString = function() {
		var result = (elements.reverse()).toString();
		elements.reverse();
		return result;
	}
}

module.exports = Stack;