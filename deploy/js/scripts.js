//
// Scripts
// 

let sectionPairs = {
    "infoMember1" : "detailsMember1",
    "infoMember2" : "detailsMember2",
    "infoMember3" : "detailsMember3",
    "infoMember4" : "detailsMember4",
    "infoMember5" : "detailsMember5",
    "infoMember6" : "detailsMember6",
    "infoMember7" : "detailsMember7",
    "paradigm" : "paradigmInfo",
    "process" : "processInfo",
    "session" : "sessionInfo",
    // "conditions" : "issuesInfo",
    // "targerGroup" : "targetgroupInfo",
    // "survices" : "servicesInfo"
};

window.addEventListener('DOMContentLoaded', event => {
    fetch('assets/papers/statii.json')
        .then((response) => response.json())
        .then((json) => loadStatii(json));

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);
    
    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

document.addEventListener('click', function handleClickOutsideBox(event) {
    $.each(sectionPairs, function (mainSection, refferingSection) {
        const mainSectionBox = document.getElementById(mainSection);
        const referringSectionBox = document.getElementById(refferingSection);

        if (!mainSectionBox.contains(event.target) && !referringSectionBox.contains(event.target)) {
            referringSectionBox.style.display = 'none';
        }

        if (mainSectionBox.contains(event.target)) {
            referringSectionBox.style.display = 'block';
            scrollIntoViewIfNeeded(referringSectionBox);
        }
    });
});

document.addEventListener('click', function radioButtonChech(event) {
    [].forEach.call(document.querySelectorAll('[name=divToggleOverview]'), function radioButtonChech(button) {
        button.onclick = showDiv;
    })
});

// Function to show or hide div based on which radio is selected
function showDiv() {
    [].forEach.call(document.querySelectorAll('[name=divToggleOverview]'), function (button) {
        document.getElementById(button.dataset.divid).className = button.checked ? '' : 'hidden';
    })
};

$(window).scroll(function() {
    let gradient = `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgb(36, 30, 30, ${$(window).scrollTop() / 750}) ${120 - $(window).scrollTop() / 7}%)`;
    $(".containerFade").css("background", gradient);

    // $(window).scroll(function () { fade(false); }); //fade elements on scroll
});


// $(window).on("load", function () {
//     function fade(pageLoad) {
//         var windowTop = $(window).scrollTop(), windowBottom = windowTop + $(window).innerHeight();
//         var min = 0.3, max = 0.7, threshold = 0.01;

//         $(".fade").each(function () {
//             /* Check the location of each desired element */
//             var objectHeight = $(this).outerHeight(), objectTop = $(this).offset().top, objectBottom = $(this).offset().top + objectHeight;

//             /* Fade element in/out based on its visible percentage */
//             if (objectTop < windowTop) {
//                 if (objectBottom > windowTop) { $(this).fadeTo(0, min + ((max - min) * ((objectBottom - windowTop) / objectHeight))); }
//                 else if ($(this).css("opacity") >= min + threshold || pageLoad) { $(this).fadeTo(0, min); }
//             } else if (objectBottom > windowBottom) {
//                 if (objectTop < windowBottom) { $(this).fadeTo(0, min + ((max - min) * ((windowBottom - objectTop) / objectHeight))); }
//                 else if ($(this).css("opacity") >= min + threshold || pageLoad) { $(this).fadeTo(0, min); }
//             } else if ($(this).css("opacity") <= max - threshold || pageLoad) { $(this).fadeTo(0, max); }
//         });
//     } fade(true); //fade elements on page-load
   
// });


function loadStatii(statii) {
    const lastSixPapers = statii.slice(0, 6);
    for (let article of lastSixPapers) {
        $("#portfolio .container .row").append(getArticlesContainer(article.imgLink, article.title, article.subtitle, article.id));
        $("#page-top").append(getPopupContainer(article.id, article.title, article.subtitle, article.imgLink, article.content, article.date, article.author));
    }
};

function getPopupContainer(id, title, subtitle, imgLink, content, date, author) {
    return `<!-- Portfolio item 3 modal popup-->
            <div class="portfolio-modal modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="modal-body">
                                        <!-- Project details-->
                                        <h2 class="text-uppercase">${title}</h2> 
                                        <p class="item-intro text-muted">${subtitle}.</p> 
                                        <img class="img-fluid d-block mx-auto" src="${imgLink}" alt="..." />
                                        <p>"${content}"</p>
                                        <ul class="list-inline">
                                            <li> <strong>Date:</strong>${date}</li>
                                            <li> <strong>Author:</strong>${author}</li>
                                        </ul>
                                        <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                            <i class="fas fa-xmark me-1"></i>
                                            Close Project
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
};

function getArticlesContainer(imgLink, statiqTitle, statiqSubtitle, id) {
    return ` <!-- Common Portfolio items will be generated here -->
            <div class="col-lg-3 col-sm-2 mb-4"> 
                <div class="portfolio-item"> 
                    <a class="portfolio-link" data-bs-toggle="modal" href="#${id}">
                        <div class="portfolio-hover"></div>
                        <img class="img-fluid" src="${imgLink}" alt="...">
                        <div class="portfolio-caption">
                            <p class="portfolio-caption-heading">${statiqTitle}</p>
                            <p class="portfolio-caption-subheading text-muted">${statiqSubtitle}</p>
                        </div>
                    </a> 
                </div>
            </div>`;
};

function scrollIntoViewIfNeeded(target) { 
    if (target.getBoundingClientRect().top > window.innerHeight-window.innerHeight*0.2) {
        target.scrollIntoView(top,{block: 'center'});
    }
};