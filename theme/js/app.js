
function go(direction) {
  let mains = document.getElementsByTagName('main');
  if (mains.length) {
    let main = mains[0];
    let item = main.getAttribute('data-' + direction);
    if (item.length) {
      location.href = item + '.html';
    }
  }
}

function go_next() {
  go('next');
}

function go_prev() {
  go('prev');
}

new lc_swiper('html', function (direction, $el) {
  if (direction.up) {
    go_prev();
  } else if (direction.down) {
    go_next();
  }
});

document.addEventListener('keydown', function(e) {
  switch (event.code) {
    case 'Space':
    case 'ArrowRight':
      go_prev();
      break;
    case 'ArrowLeft':
      go_next();
      break;
  }
});