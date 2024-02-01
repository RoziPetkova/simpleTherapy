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
    // "services" : "servicesInfo"
};

let contentFile = {};
let i18n = $.i18n()

function translate(locale) {
    i18n.locale = locale
    $('body').i18n();

    return locale === 'bg' ? 'en' : 'bg';
}

window.addEventListener('DOMContentLoaded', event => {
    fetch("assets/lang/en.yaml")
        .then(response => response.text())
        .then(yamlText => jsyaml.load(yamlText))
        .then(jsonData => i18n.load(jsonData));

    fetch('assets/papers/articles.json')
        .then((response) => response.json())
        .then((json) => {
            if (event.srcElement.activeElement.id == 'page-top') {
                loadArticles(json);
            } else {
               loadArticlesInBlogPade(json);
            }
        });

    contentFile = fetch('assets/content.json');
    var navbarCollapsible = document.body.querySelector('#mainNav');
    var navbarResponsiveMenu = document.body.querySelector('#navbarResponsive')

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', function () {
        if (!navbarCollapsible)
            return;

        window.scrollY === 0 ? navbarCollapsible.classList.remove('navbar-shrink') : navbarCollapsible.classList.add('navbar-shrink');
    });

    // Closes the mobile menu on scroll
    document.addEventListener('scroll', function () {
        if (window.scrollY > 400 && window.getComputedStyle(navbarToggler).display !== 'none' && window.getComputedStyle(navbarResponsiveMenu).display !== 'none')
            navbarToggler.click();
    });

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

$(document).ready(function () {
    $("#languageSelectorButton").click(function() {
        var oldLocale = $(this).attr("select-locale");
        var newLocale = translate($(this).attr("select-locale"));
        $(this).attr("select-locale", newLocale);
        $(this).find("svg[locale='" + newLocale + "']").show();
        $(this).find("svg[locale='" + oldLocale + "']").hide();
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
});

function loadArticles(articles) {
    const lastSixPapers = articles.slice(0, 6);
    for (let article of lastSixPapers) {
        $("#portfolio .container .row").append(getArticlesContainer(article.imgLink, article.title, article.subtitle, article.id));
        $("#page-top").append(getPopupContainer(article.id, article.title, article.subtitle, article.imgLink, article.content, article.date, article.author, article.lastName));
    }
};

function loadArticlesInBlogPade(articles) {
    const lastNinePapers = articles.slice(0, 9);
    for (let article of lastNinePapers) {
        $("#articles .container .row").append(getArticlesContainer(article.imgLink, article.title, article.subtitle, article.id));
        $("#page-top-articles").append(getPopupContainer(article.id, article.title, article.subtitle, article.imgLink, article.content, article.date, article.author, article.lastName));
    }
};

function getPopupContainer(id, title, subtitle, imgLink, content, date, author, lastName) {
    return `<!-- Article item 3 modal popup-->
            <div class="portfolio-modal modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <img class="img-article-popup d-block" src="${imgLink}" alt="..." />
                        <div class="close-modal" data-bs-dismiss="modal">
                        <img src="assets/img/close-icon.svg" alt="Close modal" />
                        </div>
                        <div class="container my-5">
                            <div class="row justify-content-start">  
                            <!-- Article details-->
                                <h2 class="articleTitle text-uppercase">${title}</h2> 
                                <h5 class="article-subheading text-muted">${subtitle}.</h5> 
                                <div class="col-lg-9">
                                    <div class="modal-body">
                                        <p class="third-text">${content}</p>
                                    </div>
                                </div>
                                <div class="author-col col-lg-3 modal-body">
                                    <div class="author-col"> 
                                        <img class="author-img mx-auto rounded-circle my-2" src="assets/img/team/${author}.jpg"</img>
                                        <p class="third-text my-2">${author} ${lastName}</p>
                                        <p class="third-text articleDate">${date}</p>
                                            <div>
                                                <a class="btn btn-dark btn-social mx-2" href="https://www.fresha.com/a/simple-therapy-sofia-ulitsa-doyran-29-nr6j28kf/booking?employeeId=2642227&pId=1051962" aria-label="Book an appointment"><i class="fa fa-calendar" aria-hidden="true"></i></a>
                                                <a class="btn btn-dark btn-social mx-2" href="counseling.simpletherapy@gmail.com" aria-label="Send an email"><i class="fa fa-envelope" aria-hidden="true"></i></a>
                                            </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container" style="margin-top: 4rem; margin-bottom: 7rem ">
                                <button class="btn btn-secondary btn-xl center text-uppercase" data-bs-dismiss="modal" type="button">
                                    Close
                                </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>`;
};

function getArticlesContainer(imgLink, statiqTitle, statiqSubtitle, id) {
    return ` <!-- Common Portfolio items will be generated here -->
            <div class="col-lg-4 col-sm-2 mb-5"> 
                <div class="portfolio-item"> 
                    <a class="portfolio-link" data-bs-toggle="modal" href="#${id}">
                    <!--<div class="portfolio-hover"></div> -->
                        <img class="img-fluid" src="${imgLink}" alt="...">
                        <div class="containerFadeStatis"></div>
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