function ArrayList() {

	this.elements = [];

	/**
	 * 获取列表的元素个数
	 * @returns {Number}
	 */
	ArrayList.prototype.size = function() {
		return this.elements.length;
	};

	/**
	 * 添加元素
	 * @param element 要添加的元素，可以添加一个，也可以添加多个，支持可变参数
	 */
	ArrayList.prototype.add = function(element) {
		if (arguments.length == 1) {
			this.elements.push(arguments[0]);
		} else if (arguments.length >= 2) {
			var deleteItem = this.elements[arguments[0]];
			this.elements.splice(arguments[0], 1, arguments[1], deleteItem)
		}
	};

	/**
	 * 获取指定索引的元素
	 * @param index  索引
	 * @returns {*}
	 */
	ArrayList.prototype.get = function(index) {
		return this.elements[index];
	};

	/**
	 * 删除指定索引的元素
	 * @param index 索引
	 */
	ArrayList.prototype.removeAt = function(index) {
		this.elements.splice(index, 1);
	};

	/**
	 * 删除指定元素
	 * @param obj 元素
	 */
	ArrayList.prototype.removeObj = function(obj) {
		this.removeAt(this.indexOf(obj));
	};

	/**
	 * 获取指定元素的索引
	 * @param obj  元素
	 * @returns {number}  索引
	 */
	ArrayList.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.elements.length; i++) {
			if (this.elements[i] === obj) {
				return i;
			}
		}
		return -1;
	};

	/**
	 * 是否是空的
	 * @returns {boolean}
	 */
	ArrayList.prototype.isEmpty = function() {
		return this.elements.length == 0;
	};

	/**
	 * 删除所有的元素
	 */
	ArrayList.prototype.clearAll = function() {
		this.elements = [];
	};

	/**
	 * 是否包含指定的元素
	 * @param obj  元素
	 * @returns {boolean}
	 */
	ArrayList.prototype.contains = function(obj) {
		return this.elements.indexOf(obj) != -1;
	};

	/**
	 * 作为数组
	 * @returns {Array}
     */
	ArrayList.prototype.asArray = function() {
		return this.elements;
	};
}

module.exports = ArrayList;