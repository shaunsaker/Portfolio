/* NAVBAR FUNCTIONS */

// Navbar active anchors on scroll

var sections = $(".section");
var anchors = $(".navbar a");
var scrollPosition = $(window).scrollTop();
var id;

function activeNav(scroll) {

	function toggleClass(index) {
		id = $(sections[i])[0].id;	
		for (var j = 0; j <sections.length; j++) {
			if ($(anchors[i])[0].hash.split("#").join("") === id) {
				$(anchors).each(function() {
					$(this).removeClass("active");
				})
				$(anchors[i]).addClass("active");
			}
		}
	}

	for (var i = 0; i < sections.length; i++) {
		if (scroll >= $(sections[i]).offset().top) {
			if (scroll === 0 && i === 0) {
				toggleClass(i);
			}
			else if (i === sections.length - 1) {
				toggleClass(i);
			}
			else if (scroll <= $(sections[i + 1]).offset().top) {
				toggleClass(i);
			}
		}
	}
}

activeNav(scrollPosition);

$(window).on("scroll", function () {

	scrollPosition = $(window).scrollTop();

	activeNav(scrollPosition);

	if (scrollPosition >= $("canvas").outerHeight()) {
		$(".navbar").css("position", "fixed").css("opacity", 1);
	}
	else if (scrollPosition > $(".navbar").outerHeight()) {
		$(".navbar").css("opacity", 0);
	}
	else {
		$(".navbar").css("position", "absolute").css("opacity", 1);
	}
});

// Navbar link animation on click

function scrollToID(id, speed) {
    var targetOffset = $(id).offset().top;
    $('html, body').animate(
    {
        scrollTop: targetOffset
    }, speed);
}

$('.navbar a:not(#resume').on('click', function(e) {
    e = e || window.e; //fix for IE9-
    e.preventDefault();
    var sectionID = $(this).attr("href");
    scrollToID(sectionID, 750);
});

/* Learn More scroll function */

$(".learnmore").on("click", function(e) {
    e = e || window.e; //fix for IE9-
    e.preventDefault();
	var nextSection = $(this).closest(".section").next();
	var sectionID = "#" + $(nextSection).attr("id");
	scrollToID(sectionID, 750);
});

/* TYPEWRITER FUNCTIONS */

var heading = "Hi. I'm Shaun. ";
var content = "A Cape Town based Web Developer with a passion for creating clean, responsive and functional web applications.";
var duration = 60;

function typeWriter(location, phrase, index, interval) {

	// Types one character of a string at a time at a specified location and interval

	if (index < phrase.length) {
		$(location).append(phrase[index++]);
		if (index === phrase.length && $(location).html() !== content) {
			setTimeout(function() {
				location = "#typewriter p";
				phrase = content;
				index = 0;
				duration /= 1.75;
			}, duration);
		}
		setTimeout(function () {
			if (index > 0 && phrase[index] === ".") {
				interval *= 4;
			}
			else if (index === phrase.length - 1 || index > 0 && (phrase[index] === ",")) {
				interval *= 2;
			}
			else if (index > 1 && phrase[index] === " " && (phrase[index - 1] !== "." || phrase[index - 1] !== ",")) {
				interval *= 1.5;
			}
			else {
				interval = duration;
			}
			typeWriter(location, phrase, index, interval);
		}, interval);
	}
}

typeWriter("#typewriter h1", heading, 0, duration);

/* CANVAS FUNCTIONS */

function init() {
    canvas.addEventListener("mousemove", mouseMove, false);
    window.addEventListener("resize", resizeCanvas, false);
    setInterval(updateTime, 20);
    context.beginPath();
    resizeCanvas();
}

function updateTime(e) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    var t, n, r, i = new Array(points.length);
    for (n = 0; n < particles.length; n++) {
        i[n] = new Array(particles.length);
        for (r = 0; r < particles.length; r++) {
            i[n][r] = 0
        }
    }
    for (var n = 0; n < particles.length; n++) {
        particles[n].x += particles[n].vx;
        particles[n].y += particles[n].vy;
        if (particles[n].x > window.innerWidth) {
            particles[n].vx = -1 - Math.random()
        } else if (particles[n].x < 0) {
            particles[n].vx = 1 + Math.random()
        } else {
            particles[n].vx *= 1 + Math.random() * .005
        }
        if (particles[n].y > window.innerHeight) {
            particles[n].vy = -1 - Math.random()
        } else if (particles[n].y < 0) {
            particles[n].y = window.innerHeight;
            particles[n].vy = 1
        } else {
            particles[n].vy *= 1
        }
        context.strokeStyle = particles[n].color;
        context.beginPath();
        var s = MAX_DIST_2;
        particles.forEach(function(e, t) {
            var r = Math.pow(e.x - particles[n].x, 2) + Math.pow(e.y - particles[n].y, 2);
            if (r < s && e != particles[n]) s = r;
            if (e == particles[n] || r > MAX_DIST_2 || i[n][t]) return;
            context.moveTo(particles[n].x, particles[n].y);
            var o = particles[n].x > e.x ? particles[n].x : e.x;
            var u = particles[n].y < e.y ? particles[n].y : e.y;
            context.quadraticCurveTo(o, u, e.x, e.y);
            context.strokeStyle = "rgba(0, 0, 0," + (1 - r / MAX_DIST_2) + " )"; //TODO Change color
            i[n][t] = 1;
            i[t][n] = 1
        });
        context.stroke();
        var o = distanceBetween(mouse, particles[n]);
        o = Math.max(Math.min(15 - o / 10, 10), 1);
        context.fillStyle = particles[n].color;
        context.beginPath();
        context.arc(particles[n].x, particles[n].y, particles[n].size * o, 0, Math.PI * 2, true);
        context.closePath();
        context.fill()
    }
}

function mouseMove(e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY
}

function draw(e, t) {
    context.strokeStyle = "#434343";
    context.lineWidth = 1;
    context.lineTo(e, t);
    context.stroke()
}

function resizeCanvas(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function distanceBetween(e, t) {
    var n = t.x - e.x;
    var r = t.y - e.y;
    return Math.sqrt(n * n + r * r)
}

var particles = [];
var dots = Math.floor(window.innerWidth / 25);
for (var i = 0; i < dots; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0,
        vy: -1 * Math.random() - Math.random() - .05,
        history: [],
        size: 1,
        color: "#000"
    })
}
var mouse = {
    x: 0,
    y: 0
};
var canvas = document.getElementById("canvas");
var points = [],
    width = canvas.width,
    height = canvas.height,
    intsy;
var MAX_DIST_2 = 100 * 100;
var circRadius = 1;
if (canvas && canvas.getContext) {
    var context = canvas.getContext("2d");
    init()
}(function(e) {
    e.fn.vAlign = function() {
        return this.each(function(t) {
            var n = e(this).height();
            var r = e(this).parent().height();
            var i = Math.ceil((r - n) / 2);
            e(this).css("margin-top", i)
        })
    }
})($);

/* MODAL/IFRAME FUNCTIONS */

$("#examples .hoverwrapper").on("click", function() {
    var iframeHeight = $("#modal .carousel-inner").height() * 75/100;
    $("#modal iframe").css("height", iframeHeight);
    $("#modal .description").css("height", iframeHeight);

    var title = $(this).children("h4").text();
    $(".modal-header h1").text(title);

    var target = $(this).children(".example").attr("data-link");
    var gitTarget = "https://github.com/shaunsaker/Portfolio/tree/master/" + target;
    $("#sitelink").attr("href", target);
    $("#gitlink").attr("href", gitTarget);

    $("#modal .item").each(function(index, value) {
        if ($(value).find("h3").text() === title) {
            $(value).addClass("active");
            $($("#modal .carousel-indicators li")[index]).addClass("active");
        }
        else {
            $(value).removeClass("active");
            $($("#modal .carousel-indicators li")[index]).removeClass("active");
        }
    });

    $("#modal").modal("show");  
});

function updateModal(slide) {
    var title = $(slide).find(".description h3").text();
    var target = $(slide).find(".description h3").attr("data-link");
    var gitTarget = "https://github.com/shaunsaker/Portfolio/tree/master/" + target;

    $(".modal-header h1").text(title);
    $("#sitelink").attr("href", target);
    $("#gitlink").attr("href", gitTarget);
}

$("#modal .carousel-control").on("click", function() {
    if ($(this).hasClass("right")) {
        if ($("#modal .item.active").hasClass("last")) {
            var newSlide = $("#modal .item").first();
        }
        else {
            var newSlide = $("#modal .item.active").next();
        }
    }
    else {
        if ($("#modal .item.active").hasClass("first")) {
            var newSlide = $("#modal .item").last();
        }
        else {
            var newSlide = $("#modal .item.active").prev();
        }
    }
    updateModal(newSlide);
});

$("#modal .carousel-indicators li").on("click", function() {
    var index = $(this).attr("data-slide-to");
    var newSlide = $("#modal .item")[index];
    updateModal(newSlide);
});

$("#modal .close").on("click", function() {
    $(".modal-header h1").text("");
    $(".modal-header a").attr("href", "");
});