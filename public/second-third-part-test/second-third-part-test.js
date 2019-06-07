let inp = document.getElementById('inp');

function onInpChange(e) {
let steps;
steps = hailStone(e.target.value, 0);
document.getElementById('answer').innerText = steps;
}
inp.addEventListener("keyup", onInpChange);

function hailStone(num, count){
  count++;
  let res = 0;
  switch (num%2) {
    case 0: res = 0.5 * num;
    break;
    case  1: res = 3 * num + 1;
    break;
    default:
  }
  if (res > 1) {
    count = hailStone(res, count)
  }
  return count
}