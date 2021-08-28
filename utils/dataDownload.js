const http = require('https');
const LineByLineReader = require('line-by-line')
const fs =  require('fs');

const options = {
  host: 'raw.githubusercontent.com',
  path: '/keubikhq/backend-task/master/data/cities_canada-usa.tsv',
  method: 'GET',
};

const geoLocation = [];

const req = http.request(options, (res) => {
  res.setEncoding('utf8');

  lr = new LineByLineReader(res);


  lr.on('error', function (err) {
    console.log('err', err);
  });

  lr.on('line', function (line) {
  	const [id , name	,ascii	,alt_name	,lat	,long	,feat_class	,feat_code	,country	,cc2	,admin1	,admin2	,admin3	,admin4	,population	,elevation	,dem	,tz	,modified_at] = line.split('\t');
  	geoLocation.push({
  		id , name	,ascii	,alt_name	,lat	,long	,feat_class	,feat_code	,country	,cc2	,admin1	,admin2	,admin3	,admin4	,population	,elevation	,dem	,tz	,modified_at

  	});
    
  });

  lr.on('end', function () {
    fs.writeFile('../data/geoLocation.json', JSON.stringify(geoLocation.slice(1)), function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	}); 
  });

});
req.on('error', (e) => {
  console.log('problem with request', e);
  req.abort();
});
req.end();

