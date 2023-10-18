const axios = require('axios');

const url = 'https://api.netatmo.com/api/getmeasure';

const authToken = '652d742a1ecb4c5e5100527f|00bcd2d262939a8cab5546009f478610';

const meteoStation = '70:ee:50:3f:13:36';
const moduleId = '02:00:00:3f:0a:54';

const convertDateToUnixTimeSeconds = (date) =>  Math.floor(date.getTime() /1000) ;

const today = new Date();
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7)

const params = {
    device_id: meteoStation,
    module_id: moduleId,
    scale: 'max',
    type: 'temperature',
    date_begin: convertDateToUnixTimeSeconds(sevenDaysAgo) ,
    date_end: convertDateToUnixTimeSeconds(today),
};

const headers = {
  'Authorization': `Bearer ${authToken}`,
};

const getMaximum = (array) => Math.max(...array);
const getMinimum = (array) => Math.min(...array);
const getAverage = (array) => {
  const sum = array.reduce((acc , cur) => acc+cur,0);
  average = sum / array.length;
  return average;
};

axios.get(url, {
  headers: headers,
  params: params,
})
  .then((response) => {
    var temperatureValues = [];
     response.data.body.forEach(element => {
      element.value.forEach(values => values.forEach( element => temperatureValues.push(element)))
    });
    console.log("Data in the last seven days : ");
    console.log("-Maximum tempareture : "+getMaximum(temperatureValues));
    console.log("-Minimum tempareture : "+getMinimum(temperatureValues));
    console.log("-Average tempareture : "+getAverage(temperatureValues));
  })
  .catch((error) => {
    console.error("hello from server");
  });
