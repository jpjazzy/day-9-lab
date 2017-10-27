'use strict';

var picturesOfPats1of2 = document.getElementsByClassName('sub-banners')[0];
var picturesOfPats2of2 = document.getElementsByClassName('sub-banners-2')[0];
var upArrow = document.getElementsByClassName('up')[0];
var downArrow = document.getElementsByClassName('down')[0];



function togglePix() {

  if (upArrow.getAttribute('class') === 'up inactivearrow') {
    picturesOfPats1of2.setAttribute('class', 'sub-banners active');
    picturesOfPats2of2.setAttribute('class', 'sub-banners-2 active');
    upArrow.setAttribute('class', 'up activearrow');
    downArrow.setAttribute('class', 'down inactivearrow');
  } else {
    picturesOfPats1of2.setAttribute('class', 'sub-banners inactive');
    picturesOfPats2of2.setAttribute('class', 'sub-banners-2 inactive');
    upArrow.setAttribute('class', 'up inactivearrow');
    downArrow.setAttribute('class', 'down activearrow');
  }
}

downArrow.addEventListener('click', togglePix);
upArrow.addEventListener('click', togglePix);
