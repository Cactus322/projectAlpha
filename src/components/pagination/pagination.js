/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

let Pagination = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function(s, f) {
        for (let i = s; i < f; i++) {
            Pagination.code += '<button>' + i + '</button>';
        }
    },

    // add last page with separator
    Last: function() {
        Pagination.code += '<i>...</i><button>' + Pagination.size + '</button>';
    },

    // add first page with separator
    First: function() {
        Pagination.code += '<button>1</button><i>...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
    },

    /*// previous page
    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },*/

    // next page
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function() {
        let a = Pagination.e.getElementsByTagName('button');
        for (let i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    // find pagination type
    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 2);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function(e) {
        let nav = e.getElementsByTagName('button');
        nav[0].addEventListener('click', Pagination.Next, false);
    },

    // create skeleton
    Create: function(e) {

        let html = [
            '<span></span>',  // pagination container
            '<button class="next_button"><span class="material-icons">arrow_forward</span></button>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

    // init
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};



/* * * * * * * * * * * * * * * * *
* Initialization
* * * * * * * * * * * * * * * * */

let init = function() {
    Pagination.Init(document.getElementById('paginationFrontend'), {
        size: 15, // pages size
        page: 1,  // selected page
        step: 1   // pages before and after current
    });
};

document.addEventListener('DOMContentLoaded', init, false);



/*
let data = [];
const onPage = 2;
const content = document.querySelector('#content');


fetch(' https://api.github.com/users/fristyr/repos ')
    .then(d => d.json())
    .then(d => {
        data = d;
        startThatShit()
    });


function startThatShit() {
    const buttons = document.querySelector('#buttons');
    console.log(data);
    for(let i = 0; i < Math.ceil(data.length / onPage); i++ ) {
        buttons.innerHTML += `<button class="btn-pag" data-from=${i * onPage} data-to=${i * onPage + onPage}>${i + 1}</button>`
    }

    for(let i = 0; i < onPage; i++) {
        content.innerHTML += data[i].name
    }
}

document.body.addEventListener('click', e => {
    if (!e.target.matches('.btn-pag')) return;
    content.innerHTML = '';

    const from = e.target.dataset.from;
    const to = e.target.dataset.to;
    const sliced = data.slice(from, to);

    for(let i = 0; i < sliced.length; i++) {
        content.innerHTML += sliced[i].name
    }
});

/!*
let visibleLinks = 4; // how many links need to be visible;
let linksCount = 15; // pagination links count;
let paginationContainer = $(".pagination");
let paginationBody = $(".paginationBody"); // where the pagination will be append

// create the first array of links
const paginationArray = [...Array(linksCount > visibleLinks ? visibleLinks + 1 : linksCount).keys()].slice(1);
paginationArray.splice(visibleLinks - 1, 1, linksCount);

// Pagination init function
(function paginationInit(currentPage = 1) {
    if (linksCount > visibleLinks) {
        if (currentPage > 1) {
            visibleLinks = 5;
        }
        if ( currentPage === paginationArray[1] ) {
            if (currentPage - (visibleLinks - 2) >= 0) {
                currentPage = currentPage - (visibleLinks - 2) >= 2 ? currentPage - (visibleLinks - 2) : 1;
            }
        }

        console.log('Всякое ' + paginationArray[1]);

        paginationArray.splice(1, paginationArray.length - 2,...Array(visibleLinks - 2)
            .fill(currentPage)
            .map((e, i) => (e += i + 1))
        );
        /!*if ( linksCount - currentPage < visibleLinks - 1 && currentPage !== paginationArray[1] ) {
            if (linksCount - currentPage >= visibleLinks - 2) {
                currentPage = currentPage - 1;
            } else if(currentPage !== paginationArray[paginationArray.length - 2] &&
                currentPage !== paginationArray[paginationArray.length - 1]){
                return;
            }else {
                currentPage = currentPage - 1 - (visibleLinks - 2 - (linksCount - currentPage));
            }
        } else if (currentPage !== 1) {
            if (
                currentPage > paginationArray[1] &&
                currentPage < paginationArray[paginationArray.length - 2]
            ) {
                return;
            } else if ( currentPage === paginationArray[1] ){
                if( currentPage - (visibleLinks - 2) >= -1 ) {
                    currentPage = currentPage - (visibleLinks - 2) >= 2 ? currentPage - (visibleLinks - 2) : 1;
                }else{
                    currentPage = 1;
                }
            } else {
                currentPage -= 1;
            }
        } else {
            currentPage = 1;
        }
        paginationArray.splice(1, paginationArray.length - 2,...Array(visibleLinks - 2)
            .fill(currentPage)
            .map((e, i) => (e += i + 1))
        );*!/
        console.log("Страница " + currentPage)
    }

    paginationContainer.html("");

    paginationArray.map(e => {
        paginationContainer.append("<a href=" + e + " value=" + e + ">" + e + "</a>");
    });

    if(paginationArray[1] > 2) {
        $(paginationContainer.children("a")[1]).before("<span>...</span>");
    }
    if(paginationArray[paginationArray.length - 2] < linksCount - 1) {
        $(paginationContainer.children("a")[paginationArray.length - 1]).before('<span>...</span>')
    }
    paginationContainer.children("a").on("click", function(e) {
        e.preventDefault();
        paginationInit(+$(e.target).attr("href"));
    });
})();
*!/
*/
