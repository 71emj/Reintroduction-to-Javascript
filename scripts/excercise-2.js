(function() {
    "use strict";

    const btnSubmit = document.querySelector('form input[type="submit"]'),
        defaultMsg = 'Type list items you wish to print out on the list',
        inputArea = document.querySelector('#data-entry'),
        listArea = document.querySelector('article>ul.generated-list');

    inputArea.placeholder = defaultMsg;

    btnSubmit.addEventListener('click', function (e) {

        if (e.target && e.target.matches('input[type="submit"]')) {
            
            console.log(e);
            e.preventDefault();

            /* create a new <li> object every time the button is clicked */
            const list_obj = new listObj(listArea);

            list_obj.styleInit();
            list_obj.setContent(
                inputArea.value,
                listArea.querySelectorAll('li').length,
                listArea
            );

            /* for reason unknown the height assignment within the object method is bugged
                I need to apply it here to align all childrenNode within a <li> */
            list_obj.listItem.style.height = list_obj.listIndex.style.height =
                (`${list_obj.delBtn.getBoundingClientRect().height}px`);

            inputArea.value = "";
            console.log('success');
        };
    });
}());


/* 
    this is an independent snippet of an object definition
    can be split to another document with no reference problem...I think...    
*/

function listObj(listArea) {
    /* listArea is the ul/ol object you wish to populate */
    const genList = listArea.appendChild(document.createElement('li'));

    this.listIndex = genList.appendChild(document.createElement('span'));
    this.listItem = genList.appendChild(document.createElement('span'));
    this.delBtn = genList.appendChild(document.createElement('button'));
};

listObj.prototype.styleInit = function () {
    this.listIndex.className += 'three columns';
    this.listItem.className += 'six columns';
    this.delBtn.className += 'three columns';
    //this.listItem.style.height = (`${this.delBtn.getBoundingClientRect().height}px !important`);
    /* for some reason this assignment is not working */
    this.delBtn.innerHTML = 'delete';
};

listObj.prototype.setContent = function (value, listLen, listArea) {
    this.listIndex.innerText = (`Item 00${listLen}`);
    this.listItem.innerText = value === "" || value === " " ? 'n/a' : value;

    this.delBtn.addEventListener('click', function (e) {

        /* find out the index of the node, record it and modify the rest of the index */
        const delItem = e.target.parentNode,
            listArray = Array.from(document.querySelectorAll('li')),
            delIndex = listArray.indexOf(delItem);

        /* changes only needs to apply to items that comes after the deleted object */
        for (let i = delIndex, max = listArray.length; i < max; i++) {
            listArray[i].firstChild.innerText = (`Item 00${i}`);
        }

        /* remove the child <li> the button resides in from the list */
        listArea.removeChild(delItem);
    })
};