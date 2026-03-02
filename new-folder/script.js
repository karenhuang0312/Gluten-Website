/* ============================== */
/* ENTER PROJECT                  */
/* ============================== */

function enterSite() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("main").style.display = "block";
}

/* ============================== */
/* AUTO-SKIP WELCOME (BACK BTN)   */
/* ============================== */

window.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  if (params.get("home") === "true") {
    enterSite();
  }
});

/* ============================== */
/* NAV ACTIVE SCROLL HIGHLIGHT    */
/* ============================== */

window.addEventListener("DOMContentLoaded", function () {
  var sections = document.querySelectorAll("section");
  var navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", function () {
    var current = "";
    sections.forEach(function (sec) {
      var top = window.scrollY;
      if (top >= sec.offsetTop - 200) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(function (a) {
      a.classList.remove("active");
      if (a.getAttribute("href") && a.getAttribute("href").includes(current)) {
        a.classList.add("active");
      }
    });
  });
});

/* ============================== */
/* TEST YOUR COMBO - PREDICTOR    */
/* ============================== */

var singleLevels = {
  pineapple: 0.3,
  papaya: 1.1,
  ginger: 10,
  turmeric: 1.0,
  aloe: 0.3
};

var testedCombos = {
  "aloe-ginger-pineapple": 0.3,
  "ginger-papaya-pineapple": 1.0,
  "ginger-papaya-turmeric": 1.2
};

function predictCombo() {
  var chosen = Array.from(
    document.querySelectorAll("#combo-form input:checked")
  ).map(function (c) {
    return c.value;
  });

  if (chosen.length === 0 || chosen.length > 3) {
    alert("Select 1\u20133 extracts");
    return;
  }

  var key = chosen.slice().sort().join("-");
  var value;
  var explanation = "";

  if (testedCombos[key] !== undefined) {
    value = testedCombos[key];
    explanation = "This combination was directly tested in the experiment.";
  } else {
    value =
      chosen.reduce(function (a, b) {
        return a + singleLevels[b];
      }, 0) / chosen.length;
    explanation = "Estimated from single-extract data.";

    if (chosen.includes("papaya") && chosen.includes("pineapple")) {
      value *= 0.7;
      explanation += " Enzyme synergy applied.";
    }
    if (chosen.includes("aloe")) {
      value -= 0.1;
      explanation += " Aloe soothing adjustment applied.";
    }
  }

  if (value < 0.3) value = 0.3;
  value = Math.round(value * 100) / 100;

  var color, text;
  if (value <= 0.3) {
    color = "#8BC34A";
    text = "Very low gluten detected";
  } else if (value <= 3) {
    color = "#FFD54F";
    text = "Moderate gluten level";
  } else {
    color = "#E57373";
    text = "High gluten level";
  }

  document.getElementById("combo-result").style.display = "block";
  document.getElementById("combo-names").textContent =
    "Selected: " + chosen.join(", ");
  document.getElementById("combo-value").textContent = value;
  document.getElementById("combo-color").style.background = color;
  document.getElementById("combo-interpret").textContent = text;
  document.getElementById("combo-explain").textContent = explanation;
}

function resetCombo() {
  document
    .querySelectorAll("#combo-form input")
    .forEach(function (c) {
      c.checked = false;
    });
  document.getElementById("combo-result").style.display = "none";
}
