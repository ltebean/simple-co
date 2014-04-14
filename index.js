// var co = require('./co');

// function readFile(filename) {
// 	return function(callback) {
// 		require('fs').readFile(filename, 'utf8', callback);
// 	};
// }

// co(function * () {
// 	var file1 = yield readFile('./file/a.txt');
// 	var file2 = yield readFile('./file/b.txt');

// 	console.log(file1);
// 	console.log(file2);
// 	return 'done';
// })(function(err, result) {
// 	console.log(result)
// });


var Promise = require('./promise');

function read_File(filename) {
	var promise = new Promise();
	require('fs').readFile(filename, 'utf8', function(err, result) {
		if (err) {
			return promise.reject(err);
		} else {
			return promise.resolve(result);
		}
	});
	return promise;
}

read_File('./file/a.txt')
	.then(function(text) {
		console.log(text);
		return read_File('./file/b.txt');
	})
	.then(JSON.parse)
	.then(function(json){
		console.log(json);
	})