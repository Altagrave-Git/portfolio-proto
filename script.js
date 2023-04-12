/* ------------------------- BACKGROUND ------------------------- */
let homeName = document.querySelector(".content.home .name");
let homeJob = document.querySelector(".content.home .job");
let diffY = window.innerHeight - homeName.offsetTop;
let transY = diffY - (window.innerHeight / 2);
let diffX1 = window.innerWidth - homeName.offsetLeft;
let diffX2 = window.innerWidth - homeJob.offsetLeft;
let transX1, transX2;

function initAnime(x, y) {
  $(".about.bio")
    .css("opacity", 0);

  $(".content.home").css("overflow", "visible");
  $(".about.name")
    .css("font-size", x)
    .css(
    "transform",
    `translate(-100vw, ${transY - $(".about.name").height()}px)`
  );

  $(".about.job")
    .css("font-size", y)
    .css("transform", `translate(100vw, ${transY}px)`);
  
  setTimeout(function () {
    transY = (window.innerHeight - homeName.offsetTop) - (window.innerHeight / 2) - ($(".about.name").height());
    transX1 = diffX1 - (window.innerWidth / 2) - (homeName.offsetWidth / 2);
    transX2 = diffX2 - (window.innerWidth / 2) - (homeJob.offsetWidth / 2);

    $(".about.bio").css(
      "transition",
      "all 1s linear 0.75s"
    );
    $(".content.home").css("overflow", "visible");
    $(".about.name").css(
      "transition",
      "all 2s cubic-bezier(0.075, 0.82, 0.165, 1)"
    );
    $(".about.job").css(
      "transition",
      "all 2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s"
    );
  }, 250)
}

function enactAnime() {
  $(".about.name")
    .css("transform", `translate(${transX1}px, ${transY}px)`);
  $(".about.job")
    .css("transform", `translate(${transX2}px, ${transY}px)`);
}

function finAnime() {
  $(".about.name")
    .css("transition", "all 1s cubic-bezier(0.05, 0.1, 0.2, 1.5)")
    .css("font-size", "")
    .css("transform", "translate(0, 0)");
  $(".about.job")
    .css("transition", "all 1s cubic-bezier(0.05, 0.1, 0.2, 1.5)")
    .css("font-size", "")
    .css("transform", "translate(0, 0)");
  $(".about.bio").css("opacity", 1);
}

let transform1, transform2;
if (window.innerWidth < 375) {
  transform1 = "";
  transform2 = "1.4em";
} else if (window.innerWidth < 576) {
  transform1 = "2.4em";
  transform2 = "2em";
} else if (window.innerWidth < 992) {
  transform1 = "3.2em";
  transform2 = "3em";
} else {
  transform1 = "3.5em";
  transform2 = "3.2em";
}

initAnime(transform1, transform2);
setTimeout(function () {
  enactAnime();
}, 750);
setTimeout(function () {
  finAnime();
}, 3250)
setTimeout(function () {
  $(".about").css("transition", "unset");
}, 5000);

$(window).on("load", function () {

  const scale = 1;

  $("#canvas").attr("height", $("#canvas").height() * scale);
  $("#canvas").attr("width", $("#canvas").width() * scale);

  const brush = $("#canvas")[0].getContext("2d");


  function drawLines(origin = "top", list = [0.24, 0.45, 0.63, 0.78, 0.9, 1]) {
    numLines = Math.min(Math.max(Math.ceil($(window).width() / 200), 3), 10);

    brush.strokeStyle = "#10e8ff";
    brush.lineWidth = 1;
    brush.scale(scale, scale);
    brush.shadowColor = "#30f8ff55";
    brush.lineCap = "round";
    brush.lineJoin = "round";

    let width = $("#canvas").width();
    let height = $("#canvas").height();
    let startY, endY;

    $(".obscure").height(height / 7 + 5);

    if (origin == "top") {
      startY = 0;
      endY = height / 7;
    } else {
      startY = height;
      endY = height - height / 7;
    }

    let section = width / (numLines - 1);
    let startX = -(section / 2);
    let endX = startX + section * 1;
    let adjustX = (section * 2) / numLines;

    brush.moveTo(startX, startY);
    brush.lineTo(endX, endY);
    brush.stroke();

    for (let i = 1; numLines + 1 > i; i++) {
      startX = startX + section;
      endX = startX + section * 1 - adjustX * i;

      brush.moveTo(startX, startY);
      brush.lineTo(endX, endY);
      brush.stroke();
    }

    let absY;
    for (let val of list) {
      if (origin == "top") {
        absY = endY * val;
        brush.moveTo(0, absY);
        brush.lineTo(width, absY);
        brush.stroke();
      } else {
        absY = height - (height / 7) * val;
        brush.moveTo(0, absY);
        brush.lineTo(width, absY);
        brush.stroke();
      }
    }
  }

  drawLines("top");
  drawLines("bottom");

  $(window).on("resize", function () {
    brush.clearRect(0, 0, canvas.width, canvas.height);
    $("#canvas").attr("height", $("#canvas").height() * scale);
    $("#canvas").attr("width", $("#canvas").width() * scale);
    brush.scale(scale, scale);
    drawLines("top");
    drawLines("bottom");
  });

  let transition = 0;

  function transitionPage(counter, maxCount, page, dir) {
    let fadeOut = maxCount / 3;
    let fadeIn = (maxCount / 3) * 2;
    let fadeInCount = counter - fadeIn;

    if (counter < fadeOut + 1)
    {
      if (counter < fadeOut) {
        $(".content.active").css("opacity", (fadeOut - counter) / fadeOut);

        if (dir == 0) {
          $(".content.active")
            .css("filter", `brightness(${(fadeOut - counter) / fadeOut})`)
            .css("transform", `scale(${(fadeOut - counter) / fadeOut * 0.75 + 0.25})`);
        } else {
          $(".content.active").css("transform", `scale(${(counter / (fadeOut / 2)) + 1})`);
        }

      } else {
        $(".content.active").css("transform", "scale(1)").css("filter", "brightness(1)").removeClass("active");
      }
    }
    else if (counter > fadeIn - 1)
    {
      if (counter > fadeIn) {
        $(`.content.active`).css("opacity", fadeInCount / fadeOut);

        if (dir == 0) {
          $(".content.active").css("transform", `scale(${(((fadeOut - fadeInCount) / fadeOut) * 2) + 1})`)
        } else {
          $(".content.active")
            .css("filter", `brightness(${ fadeInCount / fadeOut })`)
            .css("transform", `scale(${ ((fadeInCount / fadeOut) * 0.75) + 0.25 })`);
        }

      } else {
        $(`.content.${page}`).css("opacity", 0).addClass("active");
      }
    }
  }

  function travel(n, boolDir = 0, page) {
    let i = 1;
    let j = n;
    let p = 1;
    let iTotal = j * 10;

    myInterval = setInterval(function () {
      let list;
      if (boolDir == 0) {
        let [n1, n2, n3, n4, n5, n6] = [0, 0.24, 0.45, 0.63, 0.78, 0.9];
        let [c1, c2, c3, c4, c5, c6] = [0.024, 0.021, 0.018, 0.015, 0.012, 0.01];
        n1 += c1 * i;
        n2 += c2 * i;
        n3 += c3 * i;
        n4 += c4 * i;
        n5 += c5 * i;
        n6 += c6 * i;
        list = [n1, n2, n3, n4, n5, n6];
      } else {
        let [n1, n2, n3, n4, n5, n6] = [0.24, 0.45, 0.63, 0.78, 0.9, 1];
        let [c1, c2, c3, c4, c5, c6] = [0.024, 0.021, 0.018, 0.015, 0.012, 0.01];
        n1 -= c1 * i;
        n2 -= c2 * i;
        n3 -= c3 * i;
        n4 -= c4 * i;
        n5 -= c5 * i;
        n6 -= c6 * i;
        list = [n1, n2, n3, n4, n5, n6];
      }

      brush.clearRect(0, 0, canvas.width, canvas.height);
      $("#canvas").attr("height", $("#canvas").height() * scale);
      $("#canvas").attr("width", $("#canvas").width() * scale);
      brush.scale(scale, scale);
      drawLines("top", list);
      drawLines("bottom", list);

      transitionPage(p, iTotal, page, boolDir);
      p++;

      if (i >= 10) {
        j--;
        if (j == 0) {
          transition = 0;
          clearInterval(myInterval);
        } else {
          i = 1;
        }
      } else {
        i++;
      }
    }, 10);
  }

  /* NAVBAR FUNCTIONALITY */
  $(document).on("click", ".nav-btn", function (e) {
    let $target = $(e.target).closest(".nav-btn");
    let page = $target.attr("class").split(" ")[1];

    /* if click on nav button below current page else if above current page */
    if ($(".nav-btn.active").prevAll().filter($(this)).length && transition == 0)
    {
      transition = 1;
      $(".nav-btn").removeClass("active");
      travel(12, 0, page);
      $target.addClass("active");
    }

    else if ($(".nav-btn.active").nextAll().filter($(this)).length && transition == 0)
    {
      transition = 1;
      $(".nav-btn").removeClass("active");
      travel(12, 1, page);
      $target.addClass("active");
    }

    else
    { console.log(">.>"); }
  })
})


$(window).on("load", function () {
  /* MODIFY CONTACT FORM MESSAGE ROWS FOR MOBILE */
  if ($(window).height() < 375) {
    $(".mail.message").attr("rows", "3");
  } else if ($(window).height() < 475) {
    $(".mail.message").attr("rows", "4");
  } else {
    $(".mail.message").attr("rows", "5");
  }

  $(window).on("resize", function () {
    if ($(window).height() < 375) {
      $(".mail.message").attr("rows", "3");
    } else if ($(window).height() < 475) {
      $(".mail.message").attr("rows", "4");
    } else {
      $(".mail.message").attr("rows", "5");
    }
  })
})