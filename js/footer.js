
(function mobileFooter(i18n) {
    var i18n = i18n ? i18n : { current: 'current' },
        navs = document.querySelectorAll('nav.mobile-footer');
    [].forEach.call(navs, function (nav, index) {
        var a = 0, c = 0, i = 1, // active, current, increment
            links = nav.getElementsByTagName('a'),
            line = nav.querySelector('.line');
        if (!line) {
            line = document.createElement('i');
            line.setAttribute('aria-hidden', true);
            line.className = 'line';
            line.innerHTML = i18n.current;
            nav.appendChild(line);
        }
        line.id = 'nav-current' + index;
        if (!line.innerHTML.length) line.innerHTML = i18n.current;
        [].forEach.call(links, function (link, index) {
            link.removeAttribute('aria-describedby');
            if (link.className.match(/\bactive\b/g)) place(line, link);
            link.addEventListener('click', function (e) {
                a = index;
                var t = setInterval(function () {
                    links[c].classList.remove('traversing');
                    links[c].classList.remove('active');
                    if (a > c) i = 1;
                    else if (a < c) i = -1;
                    c += i;
                    links[c].classList.add('traversing');
                    if (c != -1) {
                        links[c - i].classList.remove('active');
                    }
                    if (c == a) {
                        e.target.classList.remove('traversing');
                        e.target.classList.add('active')
                        i = 0;
                        loadContainer();
                        clearInterval(t);
                    }
                }, 100); // Traversing hilite: min: 100ms
                place(line, e.target);
            });
        });
    });
    function place(l, a) {
        a.setAttribute('aria-describedby', l.id || 'nav-current');
        l.style.width = a.offsetWidth + 'px';
        l.style.left = a.offsetLeft + a.offsetWidth / 2 + 'px';
    }

    const loadContainer = () => {
        const selectcontainer = $('a[role="menuitem"].active').attr('data-id');
        $('.app-container.active').removeClass('active');
        $(`#${selectcontainer}`).addClass('active');
        if(selectcontainer==="cycle"){
            calculateDays();
        }
    }

})();