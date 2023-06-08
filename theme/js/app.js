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

const SwipeDirection = {
  left: 'Left',
  right: 'Rights'
};

function handleHorizontalSwipe(direction) {
  switch (direction) {
    case SwipeDirection.left:
      go_prev();
      break;
    default:
      go_next();
      break;
  }
}

let html = document.getElementsByTagName('html');
if (html.length) {
  html[0].addEventListener('touchstart', function(e) {
    startX = event.changedTouches[0].screenX;
  }, false);

  html[0].addEventListener('touchend', function(e) {
    endX = event.changedTouches[0].screenX;
    let diff = endX - startX;
    if (Math.abs(diff) > 50) {
      handleHorizontalSwipe(diff > 0 ? SwipeDirection.right : SwipeDirection.left);
    }
  }, false);
}

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