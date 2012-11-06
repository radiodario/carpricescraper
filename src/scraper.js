var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20';
var scraper = require("scraper");


var url = 'http://classifieds.pistonheads.com/classifieds/used-cars/renault/clio';

function processProduct(product) {
  var car = {}
  car.id = product.attr('id');
  car.img = product.find('.thumbnail .img').attr('src');
  car.price = product.find('.ad-price').text();
  car.adURL = product.find('h4 a.headline-full').attr('href');
  car.adTitle = product.find('h4 a.headline-full').text();

  return car;

}


var options = {
    uri : url,
    headers : {
      'User-Agent' : user_agent
    }
  };


var cars = [];

scraper(options, function(err, $) {
    console.log('got here')
    if (err) {
     console.log(err)
    }

    console.log($("li"))

    $("li").each(function(product) {
      console.log(product);
      console.log('got here also')
      cars.push(processProduct(product));
    });
    console.log(cars);
});



