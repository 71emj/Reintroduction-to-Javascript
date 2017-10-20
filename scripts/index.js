const pageHead = document.getElementById('header'),
	  body = document.querySelector('body');

document.addEventListener('scroll', function(e) {
	
	//both e and this refers to the #document, which is not what we want here

	window.pageYOffset > 0 ? 
	pageHead.style.boxShadow = '0px 0px 12px 1px rgba(0,0,0,0.15)':
	pageHead.style.boxShadow = 'none';
})


