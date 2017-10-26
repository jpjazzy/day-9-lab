'use strict';

//Use global variable with an array of times the store is open
//To make lists update if more stores are added
var arrOfTimes = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];

//declare constructor method for shops
function Store(shopName, minCust, maxCust, avgCookieSale) {
  this.shopName = shopName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
}

//Create methods for constructor
Store.prototype.getStoreData = function () { //simply returns all store data in array format
  return [this.minCust, this.maxCust, this.avgCookieSale];
};

Store.prototype.genRandCxHr = function() { //generate random number of cx
  var randCx = Math.random() * (this.maxCust - this.minCust) + this.minCust;
  randCx = Math.ceil(randCx) - 1; //subtract 1 to be inclusive since rounding up
  return randCx;
};

Store.prototype.genRandCookHr = function () { //Generate random cookies per hour
  var randCookiesHr = [];
  var genRandCookies = 0;
  for (var i = 0; i < arrOfTimes.length; i++) { //Generate cookies sold per hr from 6 am - 9 pm
    genRandCookies = this.genRandCxHr() * this.avgCookieSale;
    genRandCookies = Math.ceil(genRandCookies) - 1; //round and subtract 1 to be inclusive since rounding up
    randCookiesHr.push(genRandCookies);
  }
  return randCookiesHr; // return array of cookies per hour
};

//declare all objects with constructor format
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seatacAirport = new Store('Seatac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);



//displays shop cookies list (with total) when called
var dispShops = function (shopObj) {

  //vars for data to be stored
  var data = ['<td></td>'];
  var table = document.getElementById('table_head');
  var tableContent = document.getElementById('table_content');

  table.innerHTML = '';
  tableContent.innerHTML = '';

  var arrOfStoresCookies = [];
  //get array of cookies
  for (var i = 0; i < shopObj.length; i++) {
    arrOfStoresCookies.push(shopObj[i].genRandCookHr());
  }


  //loop through array to add times
  for (i = 0; i < arrOfTimes.length; i++) {
    data.push(
      '<td>' + arrOfTimes[i] + '</td>'
    );
  }
  data.push('<td>total cookies sold</td>'); //add last row

  //append row of headings for times
  var tableHeaderContent = data.join('');
  var newRow = document.createElement('tr');
  newRow.innerHTML = tableHeaderContent;
  table.appendChild(newRow);



  //Place data in cookies content
  var totalCookieCounter = 0;
  for (var j = 0; j < shopObj.length; j++) {
    data = [];
    totalCookieCounter = 0;
    for (i = 0; i < arrOfTimes.length; i++) {
      data.push(
        '<td>' + arrOfStoresCookies[j][i] + '</td>'
      );
      totalCookieCounter += arrOfStoresCookies[j][i];
    }
    data.push('<td>' + totalCookieCounter + '</td>'); //add last value for total cookies

    //append row of headings for times
    var tableCookieContent = data.join('');
    newRow = document.createElement('tr');
    newRow.innerHTML = '<td>' + shopObj[j].shopName + '</td>' + tableCookieContent;
    tableContent.appendChild(newRow);
  }

  //add hourly total
  var hourlyCookieTotal = 0;
  newRow = document.createElement('tr');
  var newLine = '<td>Hourly Cookie Totals</td>';
  for (j = 0; j < arrOfTimes.length; j++) {
    for (i = 0; i < shopObj.length; i++) {
      hourlyCookieTotal += arrOfStoresCookies[i][j];
    }
    newLine += '<td>' + hourlyCookieTotal + '</td>';
    newRow.innerHTML = newLine;
    tableContent.appendChild(newRow);
    hourlyCookieTotal = 0;
  }
};

//grab initial form pointer
var form = document.getElementById('shop_form');

function formData(event) {
  event.preventDefault();

  var shopName = event.target.shop_name.value;
  var minCust = parseInt(event.target.min_cust.value);
  var maxCust = parseInt(event.target.max_cust.value);
  var avgCookieSale = parseInt(event.target.avg_cookie_sale.value);

  console.log(minCust, maxCust, avgCookieSale);

  //alert the user if
  if (isNaN(minCust) || isNaN(maxCust) || isNaN(avgCookieSale)) {
    alert('HEY! That\'s not a number! Fix your form please.');
    return;
  }

  arrOfStores.push(new Store(shopName, minCust, maxCust, avgCookieSale));

  //Display shops
  dispShops(arrOfStores);

  form.reset();
}

//submit form on submit enter or button click
form.addEventListener('submit', formData);

//Generate array of stores and display for initial shops
var arrOfStores = [firstAndPike, seatacAirport, seattleCenter, capitolHill, alki];
dispShops(arrOfStores);
