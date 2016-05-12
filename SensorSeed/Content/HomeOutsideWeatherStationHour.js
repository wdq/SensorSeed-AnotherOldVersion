// Set the dimensions of the canvas / graph
var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format.utc("%m/%d/%Y %I:%M:%S %p").parse;

// Set the ranges
var xHour = d3.time.scale().range([0, width]);
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
var xAxisHour = d3.svg.axis().scale(xHour)
    .orient("bottom").ticks(4).tickFormat(d3.time.format("%I:%M"));

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
      .xHour(function (d) { return xHour(d.Timestamp); })
      .y(function (d) { return y(d.Temperature); });
      */

// Adds the svg canvas
var temperatureSvgHour = d3.select("#temperatureChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var temperature180SvgHour = d3.select("#temperature180ChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var humiditySvgHour = d3.select("#humidityChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var pressureSvgHour = d3.select("#pressureChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windSpeedSvgHour = d3.select("#windSpeedChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windGustSvgHour = d3.select("#windGustSpeedChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windDirectionSvgHour = d3.select("#windDirectionChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var rainSvgHour = d3.select("#rainChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var batterySvgHour = d3.select("#batteryChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var solarSvgHour = d3.select("#solarChartHour")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var date1 = new Date();
var date2 = new Date(date1.getTime() - (1000 * 60 * 60)).toUTCString();
date1 = date1.toUTCString();

console.log(date1);
console.log(date2);
// Get the data
d3.json("/SensorSeed/Sensor/GetHomeOutsideWeatherStationData?StartDateTime=" + date2.substring(0, date2.length - 4) + "&EndDateTime=" + date1.substring(0, date1.length - 4), function (error, json) {
    var data;
    data = json;
    data.forEach(function (d) {
        d.Timestamp = parseDate(d.Timestamp);
    });



    console.log(data);
    //d3.csv("data.csv", function (error, data) {
    //    data.forEach(function (d) {
    //        d.date = parseDate(d.date);
    //        d.close = +d.close;
    //    });

    // Scale the range of the data
    xHour.domain(d3.extent(data, function (d) { return d.Timestamp; }));
    //y.domain([0, d3.maxHour(data, function (d) { return d.Temperature; })]);
    temperatureY.domain([-20, 40]);
    humidityY.domain([0, 105]);
    pressureY.domain([950, 1000]);
    windSpeedY.domain([0, 30]);
    windGustY.domain([0, 100]);
    windDirectionY.domain([0, 370]);
    rainY.domain([0, 3]);
    batteryY.domain([3, 4.5]);
    solarY.domain([0, 6]);

    //y.domain(d3.extent(data, function (d) { return d.Temperature; }));

    // Add the valueline path.
    /* svg.append("path")
         .attr("class", "line")
         .attr("d", valueline(data));
         */

    // Add the X Axis
    temperatureSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    temperatureSvgHour.append("g")
        .attr("class", "y axis")
        .call(temperatureYAxis);

    temperatureSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return temperatureY(d.Temperature); });


    // Add the X Axis
    temperature180SvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    temperature180SvgHour.append("g")
        .attr("class", "y axis")
        .call(temperatureYAxis);

    temperature180SvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return temperatureY(d.Temperature180); });

    // Add the X Axis
    humiditySvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    humiditySvgHour.append("g")
        .attr("class", "y axis")
        .call(humidityYAxis);

    humiditySvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return humidityY(d.Humidity); });

    // Add the X Axis
    pressureSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    pressureSvgHour.append("g")
        .attr("class", "y axis")
        .call(pressureYAxis);

    pressureSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return pressureY(d.Pressure); });

    // Add the X Axis
    windSpeedSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    windSpeedSvgHour.append("g")
        .attr("class", "y axis")
        .call(windSpeedYAxis);

    windSpeedSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return windSpeedY(d.WindSpeed); });

    // Add the X Axis
    windGustSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    windGustSvgHour.append("g")
        .attr("class", "y axis")
        .call(windGustYAxis);

    windGustSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return windGustY(d.GustSpeed); });



    // Add the X Axis
    windDirectionSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    windDirectionSvgHour.append("g")
        .attr("class", "y axis")
        .call(windDirectionYAxis);

    windDirectionSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return windDirectionY(d.WindDirection); });


    // Add the X Axis
    rainSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    rainSvgHour.append("g")
        .attr("class", "y axis")
        .call(rainYAxis);

    rainSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return rainY(d.Rain); });


    // Add the X Axis
    batterySvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    batterySvgHour.append("g")
        .attr("class", "y axis")
        .call(batteryYAxis);

    batterySvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return batteryY(d.Battery); });


    // Add the X Axis
    solarSvgHour.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisHour);

    // Add the Y Axis
    solarSvgHour.append("g")
        .attr("class", "y axis")
        .call(solarYAxis);

    solarSvgHour.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xHour(d.Timestamp); })
        .attr("cy", function (d) { return solarY(d.Solar); });



});