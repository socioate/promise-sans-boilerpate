var p = require('./promise-sans-boilerplate')

var customFailureHandler = function(err) {
	//insert error handling logic here
	console.log("Error Status: ", err)
}

var doStuffSuccessfully = function(param1, param2, resolve, reject) {
	console.log("doStuffSuccessfully")
	//insert application logic here
	resolve([param1, param2])
}

var doStuffBadly = function(param1, param2, resolve, reject) {
	console.log("doStuffBadly")
	//insert application logic here
	reject(p.injectParameters(param1, param2))
}

module.exports = function() {
	p.invoke(doStuffSuccessfully, p.injectParameters("success1", "error1"), customFailureHandler,
		function (param1, param2) {
			p.invoke(doStuffSuccessfully, p.injectParameters(param1, param2), customFailureHandler,
				function (param1, param2) {
					p.invoke(doStuffSuccessfully, p.injectParameters("success2", "error2"), {},
						function (param1, param2) {
							console.log("Final: ", param1)
						}
					)
				}
			)
		}
	)
	p.invoke(doStuffBadly, p.injectParameters("Test Fake Error", "error3"), customFailureHandler,
		function (param1, param2) {
		}
	)
	p.invoke(doStuffBadly, "error", customFailureHandler,
		function (param1, param2) {
		}
	)
}()