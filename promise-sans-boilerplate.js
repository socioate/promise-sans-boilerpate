var promiseInvokeSansBoilerplate = function(func, params, reject, resolve) {
	declarePromiseSansBoilerplate(func, params).then(
		function (args) {
			resolve.apply(null, Array.prototype.slice.call(args))
		},
		function (args) {
			reject.apply(null, Array.prototype.slice.call(args))
		}
	)
}

var declarePromiseSansBoilerplate = function(func, args) {
	return new Promise(
		function (resolve, reject) {
			func.apply(null, buildFunctionInvokationArguments(args, resolve, reject))
		}
	)
}

var buildFunctionInvokationArguments = function(args, resolve, reject) {
	args.push(resolve)
	args.push(reject)
	return args
}

module.exports = promiseInvokeSansBoilerplate