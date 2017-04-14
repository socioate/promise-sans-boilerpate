var promise = require('./promise-sans-boilerplate')

var customFailureHandler = function(error) {
	console.log("Status: ", error)
}

var doStuffSuccessfully = function(param1, param2, resolve, reject) {
	console.log("doStuffSuccessfully")
	//insert application logic here
	resolve([param1, param2])
}

var doStuffBadly = function(param1, param2, resolve, reject) {
	console.log("doStuffBadly")
	//insert application logic here
	reject([param2])
}

module.exports = function() {
	var functionParameters = ["success", "error"]
	promise(doStuffSuccessfully, functionParameters, customFailureHandler,
		function (param1, param2) {
			promise(doStuffBadly, [param1, param2], customFailureHandler,
				function (param1, param2) {
					console.log("Status: ", param1)
				}
			)
		}
	)
}()