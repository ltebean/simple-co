A simplified co implementation only working with thunk

usage:

	var co = require('./co');

	function readFile(filename) {
		return function(callback) {
			require('fs').readFile(filename, 'utf8', callback);
		};
	}

	co(function * () {
		var file1 = yield readFile('./file/a.txt');
		var file2 = yield readFile('./file/b.txt');

		console.log(file1);
		console.log(file2);
		return 'done';
	})(function(err, result) {
		console.log(result)
	});