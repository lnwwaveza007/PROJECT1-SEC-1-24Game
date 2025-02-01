let lineNo = 0;

export function lineCreate(point1, point2) {
  var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("id", "line" + lineNo++);
  line.setAttribute("style", "stroke:rgb(255,255,255);stroke-width:2;stroke-dasharray:10;");
  document.getElementById("svg").appendChild(line);

  var x1 = point1.getBoundingClientRect().left + point1.offsetWidth / 2 - 5;
  var y1 = point1.getBoundingClientRect().top + point1.offsetHeight / 2 - 5;
  var x2 = point2.getBoundingClientRect().left + point2.offsetWidth / 2 - 10;
  var y2 = point2.getBoundingClientRect().top + point2.offsetHeight / 2 - 10;

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
}
