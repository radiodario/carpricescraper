var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';
var Browser = require("zombie");
var browser = new Browser({userAgent: user_agent, debug: true, waitFor: 10000, runScripts:false});


//var url = 'http://classifieds.pistonheads.com/classifieds/used-cars/renault/clio';
var url = 'http://localhost:3000/clio.html';

function processProduct(product) {
  var car = {}
  var spacesPat = /\r\n\s+/g


  car.id = product.id;
  car.img = browser.query('.thumbnail img', product).getAttribute('src');
  car.price = browser.query('span.ad-price', product).textContent.replace(spacesPat, '');
  car.adURL = browser.query('h4 a.headline-full', product).getAttribute('href');
  car.adTitle = browser.query('h4 a.headline-full', product).textContent.replace(spacesPat, '');
  car.description = browser.query('div.description', product).textContent.replace(spacesPat, '');
  var details = browser.queryAll('div.summary li', product);
  details.forEach(function(detail) {
    var spans = browser.queryAll('span', detail);
    var cleanupPat = /:\s*/;
    var detailName = spans[0].textContent.replace(cleanupPat, '').replace(/\s/, '');
    var detailValue = spans[1].textContent;
    car[detailName] = detailValue;
  });

  console.log(car)
  return car;

}

module.exports.scrapeCars = function(callback) {
  browser.visit(url, function() {
    var products = browser.queryAll('li.product');
    var cars = []
    products.forEach(function(product) {
      // console.log(car)
      cars.push(processProduct(product));
    });

    callback(null, cars);


  });
};
