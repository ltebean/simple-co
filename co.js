function co(generator) {
	return function(fn) {
		var gen = generator();

		function next(err, result) {
			if(err){
				return fn(err);
			}
			var step = gen.next(result);
			if (!step.done) {
				step.value(next);
			} else {
				fn(null, step.value);
			}
		}
		next();
	}
}

module.exports = co;