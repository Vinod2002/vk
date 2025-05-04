var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

document.addEventListener("DOMContentLoaded", () => {
    const greenDot = document.querySelector(".green-dot");
    const dots = document.querySelectorAll(".dot");
    const circleContainer = document.querySelector(".circle-container");
    const radius = circleContainer.clientWidth / 2;
    const centerX = radius;
    const centerY = radius;
    let angle = 0;
    let currentDot = 0;
    let photoTimeout = null;

    function moveDot() {
        angle = (angle + 1) % 360;
        const radian = (angle * Math.PI) / 180;
        greenDot.style.left = `${centerX + radius * Math.cos(radian) - greenDot.clientWidth / 2}px`;
        greenDot.style.top = `${centerY + radius * Math.sin(radian) - greenDot.clientHeight / 2}px`;

        if (angle % 90 === 0) {
            if (photoTimeout) {
                clearTimeout(photoTimeout);
                photoTimeout = null;
            }
            dots.forEach(dot => dot.classList.remove("active"));
            dots[currentDot].classList.add("active");
            const imgElement = dots[currentDot].querySelector("img");
            imgElement.style.display = "block";

            photoTimeout = setTimeout(() => {
                imgElement.style.display = "none";
                dots[currentDot].classList.remove("active");
                currentDot = (currentDot + 1) % dots.length;
                moveDot();
            }, 2000);
        } else {
            requestAnimationFrame(moveDot);
        }
    }

    moveDot();
});


















window.addEventListener('scroll', function() {
    var initialContentHeight = document.getElementById('initial-content').clientHeight;
    var header = document.querySelector('header');
    var navigation1 = document.getElementById('navigation1');
    var isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

    if (window.scrollY >= initialContentHeight) {
        header.classList.add('fixed');
        if (!isMobileScreen) {
            navigation1.classList.add('fixed');
        }
    } else {
        header.classList.remove('fixed');
        navigation1.classList.remove('fixed');
    }

    if (isMobileScreen) {
        navigation1.style.display = 'none';
    } else {
        navigation1.style.display = 'block';
    }
});

window.addEventListener('resize', function() {
    var navigation1 = document.getElementById('navigation1');
    var isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

    if (isMobileScreen) {
        navigation1.style.display = 'none';
    } else {
        navigation1.style.display = 'block';
    }
});

document.querySelectorAll('#navigation1 a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        var targetId = this.getAttribute('href').substring(1);
        var targetElement = document.getElementById(targetId);
        var headerHeight = document.querySelector('header').offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('main section');
    var navLinks = document.querySelectorAll('#navigation1 ul li a');
    var headerHeight = document.querySelector('header').offsetHeight;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            var navLink = document.querySelector(`#navigation1 a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }, {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0.5 // Adjust the threshold as needed
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});




