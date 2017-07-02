/**
 * Library of utility functions
 */

/**
 * Function to print strings with a pretty font. This creates a DIV on the 
 * page and add the text to it with the 'print' class which should be defined
 * in styes.css
 */
function pretty_print(str) {
		var div = document.createElement('div');
		div.textContent = str;
		div.setAttribute('class', 'print');
		document.body.appendChild(div);
}

/**
 * Logs the properties of the object passed in the console.
 */
function showOwnProperties(o) {
	console.log(Object.getOwnPropertyNames(o));
}

/**
 * Logs all the properties, including all prototypes, of the object passed
 */
function ShowAllProperties(o) {
	var ObjectToInspect;
	var result = [];
	
	for (objectToInspect = o; objectToInspect != null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
		result = result.concat(Object.getOwnPropertyNames(objectToInspect));
	}
	
	console.log(result);
}

/**
 * validation function used to validate values of elements are within range
 */
function validate(obj, lowval, hival) {
	if ((obj.value < lowval) || (obj.value > hival)) {
		alert('Invalid Value!');
	}
}

