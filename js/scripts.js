// JavaScript Document
function jump(h) {
    var top = document.getElementById(h).offsetTop,
        left = document.getElementById(h).offsetLeft;
    var animator = createAnimator({
        start: [0,0],
        end: [left, top],
        duration: 1000
    }, function(vals){
        console.log(arguments);
    	window.scrollTo(vals[0], vals[1]);
    });
    
    //run
    animator();
}
//Animator
//Licensed under the MIT License
function createAnimator(config, callback, done) {
    if (typeof config !== "object") throw new TypeError("Arguement config expect an Object");

    var start = config.start,
        mid = $.extend({}, start), //clone object
        math = $.extend({}, start), //precalculate the math
        end = config.end,
        duration = config.duration || 1000,
        startTime, endTime;

    //t*(b-d)/(a-c) + (a*d-b*c)/(a-c);
    function precalculate(a, b, c, d) {
        return [(b - d) / (a - c), (a * d - b * c) / (a - c)];
    }

    function calculate(key, t) {
        return t * math[key][0] + math[key][1];
    }

    function step() {
        var t = Date.now();
        var val = end;
        if (t < endTime) {
            val = mid;
            for (var key in mid) {
                mid[key] = calculate(key, t);
            }
            callback(val);
            requestAnimationFrame(step);
        } else {
            callback(val);
            done && done();
        }
    }

    return function () {
        startTime = Date.now();
        endTime = startTime + duration;

        for (var key in math) {
            math[key] = precalculate(startTime, start[key], endTime, end[key]);
        }

        step();
    }
}
//Get the button
var mybutton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}