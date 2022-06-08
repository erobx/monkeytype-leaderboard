// Display wpm in html to then rank
function displayWPM() {
	const para = document.createElement('p');
	const node = document.createTextNode('It worked!');
	para.appendChild(node);
	document.getElementById('demo').appendChild(para);
}

function main() {
 displayWPM();
 console.log('did it work?');
}
main();