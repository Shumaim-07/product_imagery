class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML =
            '<span class="wrap">' + this.txt + '</span><span class="cursor">|</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}
window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};
  $(document).ready(function () {
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function checkFadeIn() {
      $('.fade-in-element').each(function () {
        if (isInViewport(this)) {
          $(this).addClass('show');
        }
      });
    }

    // Run on scroll, load, and resize
    $(window).on('load scroll resize', checkFadeIn);
 
     $(window).scroll(function () {
      if ($(window).scrollTop() === 0) {
        $('.navbar').removeClass('shadow-lg');
      } else {
        $('.navbar').addClass('shadow-lg');
      }
    });


   const scrollBtn = document.getElementById("scrollToTopBtn");
  const progressCircle = document.querySelector(".progress-circle .progress");
  const pathLength = 2 * Math.PI * 45; // r = 45

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    const dashOffset = pathLength * (1 - scrollPercent);
    progressCircle.style.strokeDashoffset = dashOffset;

    if (scrollTop > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateScrollProgress);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initialize on load
  updateScrollProgress();

});
$(document).ready(function () {
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function animateCounters() {
    $('.counter').each(function () {
      var $this = $(this);
      var countTo = parseInt($this.attr('data-target'));
      $({ countNum: 0 }).animate(
        { countNum: countTo },
        {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum) + '+');
          },
          complete: function () {
            $this.text(countTo + '+');
          }
        }
      );
    });
  }

  let animated = false;

  function checkAndAnimate() {
    if (!animated && isInViewport(document.querySelector('.about-stats'))) {
      animateCounters();
      animated = true;
    }
  }

  // Check on scroll and when the page loads
  $(window).on('scroll resize load', checkAndAnimate);
});
