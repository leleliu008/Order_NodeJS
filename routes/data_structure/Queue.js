function Queue() {

	// 存储元素数组
	var elements = [];

	/**
	 * 元素入队
	 * @param element 元素列表
	 * @returns {number} 返回当前队列元素个数，参数为空时返回-1
	 */
	Queue.prototype.add = function(element) {
		if (arguments.length == 0) {
			return -1;
		}

		for (var i = 0; i < arguments.length; i++) {
			elements.push(arguments[i]);
		}
		return elements.length;
	};

	/**
	 * 元素出队
	 * @returns {*} 当队列元素为空时，返回null
	 */
	Queue.prototype.take = function() {
		return (elements.length == 0) ? null : elements.shift();
	};

	/**
	 * 返回队头素值
	 * @returns {*} 若队列为空则返回null
	 */
	Queue.prototype.peek = function() {
		return (elements.length == 0) ? null : elements[0];
	};

	/**
	 * 将队列置空
	 */
	Queue.prototype.clearAll = function() {
		elements = [];
	};

	/**
	 * 获取队列元素个数
	 * @returns {Number}
	 */
	Queue.prototype.size = function() {
		return elements.length;
	};

	/**
	 * 判断队列是否为空
	 * @returns {boolean} 队列为空返回true，否则返回false
	 */
	Queue.prototype.isEmpty = function() {
		return elements.length == 0;
	};

	/**
	 * 将队列元素转化为字符串
	 * @returns {string}
	 */
	Queue.prototype.toString = function() {
		var result = (elements.reverse()).toString();
		elements.reverse();
		return result;
	}
}

module.exports = Queue;