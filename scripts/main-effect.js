(function() {
    "use strict";
    
    const pageHead = document.getElementById('header'),
        pageHeadClass = pageHead.className;
    
    document.addEventListener('scroll', function() {

        window.pageYOffset > 0 ?
            pageHead.setAttribute('class', (`${pageHeadClass} castshadow`)) :
            pageHead.setAttribute('class', (`${pageHeadClass}`));

        /*
        	note that both e.target and this refers to the document DOM object, 
        	which is not what we want here.
        */
    });

}());