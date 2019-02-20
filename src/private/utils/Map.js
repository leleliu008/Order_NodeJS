function Map() {

    this.ks = [];
    this.kvs = {};

    /**
     * 加入元素
     * @param key
     * @param value
     */
    Map.prototype.put = function (key, value) {
        this.ks.push(key);
        this.kvs[key] = value;
    };


    /**
     * 获取某元素
     * @param key
     * @returns {*}
     */
    Map.prototype.get = function(key) {
        console.log('key = ' + key);
        console.log('value = ' + JSON.stringify(this.kvs[key]));
        return this.kvs[key];
    };

    /**
     * 删除元素
     * @param key
     * @returns {*}
     */
    Map.prototype.remove = function (key) {
        var index = this.ks.indexOf(key);
        if (index >= 0) {
            this.ks.splice(index, 1);
            var result = this.kvs[key];
            this.kvs[key] = undefined;
            return result;
        }
        return undefined;
    };

    /**
     * 是否存在某键值
     * @param key
     * @returns {boolean}
     */
    Map.prototype.containsKey = function (key) {
        return this.kvs[key] ? true : false;
    };

    /**
     * 是否存在某值
     * @param value
     * @returns {boolean}
     */
    Map.prototype.containsValue = function (value) {
        for (var temp in this.kvs) {
            if (this.kvs[temp] == value) {
                return true;
            }
        }

        return false;
    };

    /**
     * 集合大小
     * @returns {number}
     */
    Map.prototype.size = function () {
        return this.ks.length;
    };

    /**
     * Key的集合
     * @returns {Array}
     */
    Map.prototype.keySet = function () {
        return this.ks;
    };

    /**
     *
     * @returns {{}}
     */
    Map.prototype.values = function () {
        return this.kvs;
    }
}

module.exports = Map;