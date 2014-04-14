function Promise(fn) {
	this.fulfilled = false;
	this.callbacks = [];
}

Promise.prototype.then = function(onResolve, onReject) {
	var promise = new Promise()
	if (this.fulfilled) {
		var result;
		if (this.value) {
			result = this.executeCallback(onResolve, this.value);
		} else {
			result = this.executeCallback(onReject, this.reason);
		}
		if (result instanceof Promise) {
			promise = result;
		}
	} else {
		this.callbacks.push({
			resolve: onResolve,
			reject: onReject,
			promise: promise
		});
	}
	return promise;
};

Promise.prototype.resolve = function(value) {
	this.value = value;
	this.complete('resolve', value);
};

Promise.prototype.reject = function(reason) {
	this.reason = reason;
	this.complete('reject', reason)
};

Promise.prototype.complete = function(type, result) {
	this.fulfilled = true;
	var that = this;

	if (this.callbacks.length == 0) {
		return;
	}
	this.callbacks.forEach(function(callback) {
		if (!callback[type]) {
			return;
		}
		var res = callback[type](result);
		if (res instanceof Promise) {
			merge(res, callback.promise);
		} else {
			callback.promise.resolve(res);
		}
	});
};



function merge(obj1, obj2) {
	for (var p in obj2) {
		try {
			if (obj2[p].constructor == Object) {
				obj1[p] = merge(obj1[p], obj2[p]);
			} else {
				obj1[p] = obj2[p];
			}
		} catch (e) {
			obj1[p] = obj2[p];
		}
	}
	return obj1;
}

module.exports = Promise;