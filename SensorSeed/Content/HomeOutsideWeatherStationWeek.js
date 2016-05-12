// Set the dimensions of the canvas / graph
var margin = { top: 30, right: 20, bottom: 30, left: 50 },
        width = 400 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;


// Parse the date / time
var parseDate = d3.time.format.utc("%m/%d/%Y %I:%M:%S %p").parse;

// Set the ranges
var xWeek = d3.time.scale().range([0, width]);
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
var xAxisWeek = d3.svg.axis().scale(xWeek)
    .orient("bottom").ticks(7).tickFormat(d3.time.format("%a"));

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
var temperatureSvgWeek = d3.select("#temperatureChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var temperature180SvgWeek = d3.select("#temperature180ChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var humiditySvgWeek = d3.select("#humidityChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var pressureSvgWeek = d3.select("#pressureChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windSpeedSvgWeek = d3.select("#windSpeedChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windGustSvgWeek = d3.select("#windGustSpeedChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var windDirectionSvgWeek = d3.select("#windDirectionChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var rainSvgWeek = d3.select("#rainChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var batterySvgWeek = d3.select("#batteryChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var solarSvgWeek = d3.select("#solarChartWeek")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var date1 = new Date();
var date2 = new Date(date1.getTime() - (1000 * 60 * 60 * 24 * 7)).toUTCString();
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
    xWeek.domain(d3.extent(data, function (d) { return d.Timestamp; }));
    //y.domain([0, d3.max(data, function (d) { return d.Temperature; })]);
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
    temperatureSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    temperatureSvgWeek.append("g")
        .attr("class", "y axis")
        .call(temperatureYAxis);

    temperatureSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return temperatureY(d.Temperature); });


    // Add the X Axis
    temperature180SvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    temperature180SvgWeek.append("g")
        .attr("class", "y axis")
        .call(temperatureYAxis);

    temperature180SvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return temperatureY(d.Temperature180); });

    // Add the X Axis
    humiditySvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    humiditySvgWeek.append("g")
        .attr("class", "y axis")
        .call(humidityYAxis);

    humiditySvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return humidityY(d.Humidity); });

    // Add the X Axis
    pressureSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    pressureSvgWeek.append("g")
        .attr("class", "y axis")
        .call(pressureYAxis);

    pressureSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return pressureY(d.Pressure); });

    // Add the X Axis
    windSpeedSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    windSpeedSvgWeek.append("g")
        .attr("class", "y axis")
        .call(windSpeedYAxis);

    windSpeedSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return windSpeedY(d.WindSpeed); });

    // Add the X Axis
    windGustSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    windGustSvgWeek.append("g")
        .attr("class", "y axis")
        .call(windGustYAxis);

    windGustSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return windGustY(d.GustSpeed); });



    // Add the X Axis
    windDirectionSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    windDirectionSvgWeek.append("g")
        .attr("class", "y axis")
        .call(windDirectionYAxis);

    windDirectionSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return windDirectionY(d.WindDirection); });


    // Add the X Axis
    rainSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    rainSvgWeek.append("g")
        .attr("class", "y axis")
        .call(rainYAxis);

    rainSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return rainY(d.Rain); });


    // Add the X Axis
    batterySvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    batterySvgWeek.append("g")
        .attr("class", "y axis")
        .call(batteryYAxis);

    batterySvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return batteryY(d.Battery); });


    // Add the X Axis
    solarSvgWeek.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisWeek);

    // Add the Y Axis
    solarSvgWeek.append("g")
        .attr("class", "y axis")
        .call(solarYAxis);

    solarSvgWeek.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function (d) { return xWeek(d.Timestamp); })
        .attr("cy", function (d) { return solarY(d.Solar); });



});