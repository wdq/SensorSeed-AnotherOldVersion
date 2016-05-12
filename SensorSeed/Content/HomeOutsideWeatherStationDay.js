// Set the dimensions of the canvas / graph
var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format.utc("%m/%d/%Y %I:%M:%S %p").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var temperatureY = d3.scale.linear().range([height, 0]);
var humidityY = d3.scale.linear().range([height, 0]);
var pressureY = d3.scale.linear().range([height, 0]);
var windSpeedY = d3.scale.linear().range([height, 0]);
var windGustY = d3.scale.linear().range([height, 0]);
var windDirectionY = d3.scale.linear().range([height, 0]);
var rainY = d3.scale.linear().range([height, 0]);
var batteryY = d3.scale.linear().range([height, 0]);
var solarY = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxisDay = d3.svg.axis().scale(x)
    .orient("bottom").ticks(6).tickFormat(d3.time.format("%I"));

var temperatureYAxis = d3.svg.axis().scale(temperatureY)
    .orient("left").ticks(5);
var humidityYAxis = d3.svg.axis().scale(humidityY)
.orient("left").ticks(5);
var pressureYAxis = d3.svg.axis().scale(pressureY)
.orient("left").ticks(5);
var windSpeedYAxis = d3.svg.axis().scale(windSpeedY)
.orient("left").ticks(5);
var windGustYAxis = d3.svg.axis().scale(windGustY)
.orient("left").ticks(5);
var windDirectionYAxis = d3.svg.axis().scale(windDirectionY)
.orient("left").ticks(5);
var rainYAxis = d3.svg.axis().scale(rainY)
.orient("left").ticks(5);
var batteryYAxis = d3.svg.axis().scale(batteryY)
.orient("left").ticks(5);
var solarYAxis = d3.svg.axis().scale(solarY)
.orient("left").ticks(5);
/*  // Define the line
  var temperatureValueline = d3.svg.line()
      .x(function (d) { return x(d.Timestamp); })
      .y(function (d) { return y(d.Temperature); });
      */

// Adds the svg canvas
var temperatureSvg = d3.select("#temperatureChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var temperature180Svg = d3.select("#temperature180ChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var humiditySvg = d3.select("#humidityChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var pressureSvg = d3.select("#pressureChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windSpeedSvg = d3.select("#windSpeedChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windGustSvg = d3.select("#windGustSpeedChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windDirectionSvg = d3.select("#windDirectionChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var rainSvg = d3.select("#rainChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var batterySvg = d3.select("#batteryChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var solarSvg = d3.select("#solarChartDay")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
var date1 = new Date().toUTCString();
var date2 = new Date();

date2.setDate(date2.getDate() - 1);
date2 = date2.toUTCString();

console.log(date1);
console.log(date2);
// Get the data
d3.json("/SensorSeed/Sensor/GetHomeOutsideWeatherStationData?StartDateTime=" + date2.substring(0, date2.length - 4) + "&EndDateTime=" + date1.substring(0, date1.length - 4), function (error, json) {
    var data;
    data = json;
    data.forEach(function (d) {
        d.Timestamp = parseDate(d.Timestamp);
    });
    $('.currentTimestampDiv').html("<h5>Last updated: " + new Date(data[0].Timestamp).toLocaleString() + "</h5>");
    $('.currentTemperatureDiv').html(data[0].Temperature + " &#176;C");
    $('.currentTemperature180Div').html(data[0].Temperature180 + " &#176;C");
    $('.currentHumidityDiv').html(data[0].Humidity + "%");
    $('.currentPressureDiv').html(data[0].Pressure + " hPa");
    $('.currentWindSpeedDiv').html(data[0].WindSpeed + " units");
    $('.currentWindSpeedGustDiv').html(data[0].GustSpeed + " units gust");
    $('.currentWindDirectionDiv').html(data[0].WindDirection + "&#176;");
    $('.currentRainDiv').html(data[0].Rain + " mm");
    $('.currentBatteryDiv').html(data[0].Battery + " V");
    $('.currentSolarDiv').html(data[0].Solar + " V");

    var nowDate = new Date();
    var hourAgoDate = new Date(nowDate.getTime() - (1000 * 60 * 60)).toUTCString();
    var sixHourAgoDate = new Date(nowDate.getTime() - (1000 * 60 * 60 * 6)).toUTCString();
    var twelveHourAgoDate = new Date(nowDate.getTime() - (1000 * 60 * 60 * 12)).toUTCString();
    var twentyFourHourAgoDate = new Date(nowDate.getTime() - (1000 * 60 * 60 * 24)).toUTCString();
    nowDate = nowDate.toUTCString();

    $.get(("/SensorSeed/Sensor/GetHomeOutsideWeatherStationRainTotals?StartDateTime=" + hourAgoDate.substring(0, hourAgoDate.length - 4) + "&EndDateTime=" + nowDate.substring(0, nowDate.length - 4)), function (data) {
        $("#rainTotalOneHour").html("Hour rain total: " + data[0].Sum + " mm");
    });
    $.get(("/SensorSeed/Sensor/GetHomeOutsideWeatherStationRainTotals?StartDateTime=" + sixHourAgoDate.substring(0, sixHourAgoDate.length - 4) + "&EndDateTime=" + nowDate.substring(0, nowDate.length - 4)), function (data) {
        $("#rainTotalSixHour").html("Six hour rain total: " + data[0].Sum + " mm");
    });
    $.get(("/SensorSeed/Sensor/GetHomeOutsideWeatherStationRainTotals?StartDateTime=" + twelveHourAgoDate.substring(0, twelveHourAgoDate.length - 4) + "&EndDateTime=" + nowDate.substring(0, nowDate.length - 4)), function (data) {
        $("#rainTotalTwelveHour").html("Twelve hour rain total: " + data[0].Sum + " mm");
    });
    $.get(("/SensorSeed/Sensor/GetHomeOutsideWeatherStationRainTotals?StartDateTime=" + twentyFourHourAgoDate.substring(0, twentyFourHourAgoDate.length - 4) + "&EndDateTime=" + nowDate.substring(0, nowDate.length - 4)), function (data) {
        $("#rainTotalTwentyFourHour").html("Twenty four hour rain total: " + data[0].Sum + " mm");
    });

    console.log(data);
    //d3.csv("data.csv", function (error, data) {
    //    data.forEach(function (d) {
    //        d.date = parseDate(d.date);
    //        d.close = +d.close;
    //    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) { return d.Timestamp; }));
    //y.domain([0, d3.max(data, function (d) { return d.Temperature; })]);
    temperatureY.domain([-20, 40]);
    humidityY.domain([0, 105]);
    pressureY.domain([950, 1000]);
    windSpeedY.domain([0, 100]);
    windGustY.domain([0, 100]);
    windDirectionY.domain([0, 370]);
    rainY.domain([0, 3]);
    batteryY.domain([3, 5]);
    solarY.domain([0, 11]);

    //y.domain(d3.extent(data, function (d) { return d.Temperature; }));

    // Add the valueline path.
    /* svg.append("path")
         .attr("class", "line")
         .attr("d", valueline(data));
         */

    // Add the X Axis
    temperatureSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    temperatureSvg.append("g")
        .attr("class", "y axis")
        .call(temperatureYAxis);

    temperatureSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return temperatureY(d.Temperature); });


    // Add the X Axis
    temperature180Svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    temperature180Svg.append("g")
        .attr("class", "y axis")
        .call(temperatureYAxis);

    temperature180Svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return temperatureY(d.Temperature180); });

    // Add the X Axis
    humiditySvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    humiditySvg.append("g")
        .attr("class", "y axis")
        .call(humidityYAxis);

    humiditySvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return humidityY(d.Humidity); });

    // Add the X Axis
    pressureSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    pressureSvg.append("g")
        .attr("class", "y axis")
        .call(pressureYAxis);

    pressureSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return pressureY(d.Pressure); });

    // Add the X Axis
    windSpeedSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    windSpeedSvg.append("g")
        .attr("class", "y axis")
        .call(windSpeedYAxis);

    windSpeedSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return windSpeedY(d.WindSpeed); });

    // Add the X Axis
    windGustSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    windGustSvg.append("g")
        .attr("class", "y axis")
        .call(windGustYAxis);

    windGustSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return windGustY(d.GustSpeed); });



    // Add the X Axis
    windDirectionSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    windDirectionSvg.append("g")
        .attr("class", "y axis")
        .call(windDirectionYAxis);

    windDirectionSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return windDirectionY(d.WindDirection); });


    // Add the X Axis
    rainSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    rainSvg.append("g")
        .attr("class", "y axis")
        .call(rainYAxis);

    rainSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return rainY(d.Rain); });


    // Add the X Axis
    batterySvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    batterySvg.append("g")
        .attr("class", "y axis")
        .call(batteryYAxis);

    batterySvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return batteryY(d.Battery); });


    // Add the X Axis
    solarSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisDay);

    // Add the Y Axis
    solarSvg.append("g")
        .attr("class", "y axis")
        .call(solarYAxis);

    solarSvg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return x(d.Timestamp); })
        .attr("cy", function (d) { return solarY(d.Solar); });



});