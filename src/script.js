/**
 * Inspired by an aswer from https://stackoverflow.com/questions/64678768/how-can-i-make-a-curve-line-to-join-two-node-in-html-and-css
 * with a little modification
 */

let paths = document.getElementById("paths");
let connections2 = [];

function getElement(element) {
  for (let a = 0; a < element.length; a++) {
    if (element[a].className.indexOf("connected-element") != -1) {
      return element[a];
    }
  }

  return null;
}

function connectElements(connections) {
  let spans = document.getElementsByTagName("span");
  let start;
  let end;
  let temp;
  for (let a = 0; a < connections.length; a += 2) {
    for (let b = 0; b < spans.length; b++) {
      if (spans[b].innerText == connections[a]) {
        start = getElement(spans[b].parentElement.children);
      }
      if (spans[b].innerText === connections[a + 1]) {
        if (connections[a + 1] === "Ausgewählt") {
          end = spans[b];
        } else {
          end = getElement(spans[b].parentElement.children);
        }
      }
    }
    connections2.push({
      start: start,
      end: end,
    });
  }
  coordinates();
}

function getOffset(element) {
  if (!element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  let rect = element.getBoundingClientRect();
  let win = element.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

function coordinates() {
  let padding = 5;
  let bezierWeight = 1;
  let oldPaths = paths.children;
  for (let a = oldPaths.length - 1; a >= 0; a--) {
    paths.removeChild(oldPaths[a]);
  }

  let x1, y1, x4, y4, dx, x2, x3, path, start, end;

  for (let a = 0; a < connections2.length; a++) {
    start = connections2[a].start;
    end = connections2[a].end;

    x1 = getOffset(start).left + start.clientWidth / 2 - padding;
    y1 = getOffset(start).top + start.clientWidth / 2 - padding;
    x4 = getOffset(end).left + end.clientWidth / 2 - padding;
    y4 = getOffset(end).top + end.clientWidth / 2 - padding;
    dx = Math.abs(x4 - x1) * bezierWeight;

    if (x4 < x1) {
      x2 = x1 - dx;
      x3 = x4 + dx;
    } else {
      x2 = x1 + dx;
      x3 = x4 - dx;
    }

    let data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", data);
    path.setAttribute("class", "path");
    paths.appendChild(path);
  }
}

function executeConnection() {
  connectElements(["CommerceTools", "Ausgewählt"]);
  connectElements(["Shopware", "Ausgewählt"]);
  connectElements(["Dan Domain", "Ausgewählt"]);
  connectElements(["Plentymarkets", "Ausgewählt"]);
  connectElements(["CCV Shop", "Ausgewählt"]);
  connectElements(["Magento", "Ausgewählt"]);
  connectElements(["Shopify", "Ausgewählt"]);
  connectElements(["WooCommerce", "Ausgewählt"]);
  connectElements(["OpenCart", "Ausgewählt"]);
  connectElements(["xt:Commerce", "Ausgewählt"]);
  connectElements(["OXID", "Ausgewählt"]);
  connectElements(["Presta Shop", "Ausgewählt"]);
  connectElements(["JTL", "Ausgewählt"]);
}

executeConnection();

// Re-calling when resize the screen
window.addEventListener("resize", () => {
  executeConnection();
});

function showLines() {
  const linePaths = document.getElementById("paths");
  if (linePaths.style.display === "none") {
    linePaths.style.display = "block";
  } else {
    linePaths.style.display = "none";
  }
}

document
  .getElementById("btn-plugin")
  .addEventListener("click", showLines, false);
