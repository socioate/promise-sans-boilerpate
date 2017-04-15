var promiseInvokeSansBoilerplate = function(func, args, customRejectHandler, customResolveHandler) {
	if(!validateInitialParameters(func, args, customRejectHandler, customResolveHandler)) {
		constructInitializationErrorMessage(customRejectHandler, arguments)
	} else {
	//take the passed in function and wrap it in a promise
		promiseDeclareBoilerplate(func, args).then(
			function (args) {
				handlePromiseCallback(customResolveHandler, args)
			},
			function (args) {
				handlePromiseCallback(customRejectHandler, args)
			}
		)
	}
}

var promiseDeclareBoilerplate = function(func, args) {
	return new Promise(
		function (resolve, reject) {
			var parameterArray = addPromiseHandlersToArgsArray(args, resolve, reject)
			//apply the parameter array as parameters into the function invocation
			func.apply(null, parameterArray)
		}
	)
}

var handlePromiseCallback = function(callback, args) {
	var parameterArray = convertArgsToParameterArray(args)
	//apply the parameter array as parameters into the promise callback invocation
	callback.apply(null, parameterArray)
}

var addPromiseHandlersToArgsArray = function(args, resolve, reject) {
	args.push(resolve)
	args.push(reject)
	return args
}

var convertArgsToParameterArray = function(args) {
	return Array.prototype.slice.call(args)
}

var convertParametersToArgsArray = function() {
	return Array.prototype.slice.call(arguments)
}

var validateInitialParameters = function(func, args, customRejectHandler, customResolveHandler) {
	if(!validateArgsArray(args)) return false
	if(!validateFunction(func)) return false
	if(!validateFunction(customRejectHandler)) return false
	if(!validateFunction(customResolveHandler)) return false
	return true
}

var validateArgsArray = function(args) {
	return Array.isArray(args)
}

var validateFunction = function(func) {
	return func instanceof Function
}

var constructInitializationErrorMessage = function(customRejectHandler, args) {
	var errorLine = "**************************************************************"
	var errorMessageStart = "\n\n " + errorLine + "\nCannot initialize promise-sans-boilerplate with the provided parameters:\n"
	var errorMessageEnd = "'\nShould be:\n[ [functionToInvoke], [arrayOfParameters], [customResolveHandlerFunction], [customRejectHandlerFunction] ]\n"
	var completedErrorMessage = errorMessageStart + convertArgsToParameterArray(args) + errorMessageEnd
	if(!validateFunction(customRejectHandler)) {
		console.log(completedErrorMessage, "\nNo customRejectHandler provided so cannot invoke callback\n", errorLine, "\n\n")
	} else {
		customRejectHandler(completedErrorMessage + errorLine + "\n\n")
	}
}

module.exports = {
	invoke: promiseInvokeSansBoilerplate,
	injectParameters: convertParametersToArgsArray
}