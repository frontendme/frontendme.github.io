function ReferenceErrorTest() {
	f();
}

function TypeErrorTest() {
	null.f();
}

function RangeErrorTest() {
	function foo() {
		foo();
	}
	foo();
}

function EvalErrorTest() {
	throw new EvalError('sample message', 'script.js', '1');
}

function SyntaxErrorTest() {
	throw new SyntaxError('sample message', 'script.js', '2');
}

function prepareData(array) {
	var data = [], tempObj = {};
	
	array.forEach(function(item) {
		var date = new Date(item.ts);
		var hour = date.getHours();
		var minute = date.getMinutes();
		var seconds = date.getSeconds();
		var timeStr = hour + ':' + minute + ':' + (seconds < 10 ? '0' : '') + seconds;
		
		if (tempObj[timeStr] !== undefined) {
			tempObj[timeStr] += 1;
		} else {
			tempObj[timeStr] = 1;
		}
	});
	
	data = Object.keys(tempObj).map(function(item) {
		return {ts: item, val: tempObj[item]};
	});
	
	return data;
}

document.addEventListener('DOMContentLoaded', function(e) {
	var errorsArray = [];
	var tableBody;
	var textarea;
  
	tableBody = document.getElementById('table1').getElementsByTagName('tbody')[0];
	textarea = document.getElementById('errorData');
  
	function errorHandler(message, filename, line, column, errorObj) {
		var errorData = {
			message: message,
			filename: filename,
			line: line,
			column: column ? column : null,
			type: (errorObj && errorObj.name) ? errorObj.name : null,
			stack: (errorObj && errorObj.stack) ? errorObj.stack : null,
			ts: ( new Date() ).getTime()
		};
		var tr = document.createElement('TR');

		errorsArray.push(errorData);

		tr.innerHTML = '<td>' + errorData.message + '</td><td>' + errorData.filename + '</td><td>' + errorData.line + '</td><td>' + errorData.column + '</td><td>' + errorData.type + '</td><td>' + errorData.stack + '</td><td>' + errorData.ts + '</td>';
		tableBody.appendChild(tr);
		textarea.value = JSON.stringify( prepareData(errorsArray) );
	}

	window.onerror = errorHandler;
});
