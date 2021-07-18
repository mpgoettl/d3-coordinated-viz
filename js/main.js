/* main Martin P. Goettl, 2021 */

//First line of main.js...wrap everything in a self-executing anonymous function to move to local scope
(function(){

//pseudo-global variables
var attrArray = ["varA", "varB", "varC", "varD", "varE"]; //list of attributes
var expressed = attrArray[0]; //initial attribute

//begin script when window loads
window.onload = setMap();



//Example 1.4 line 1...set up choropleth map
function setMap(){

    //map frame dimensions
    var width = 960,
        height = 460;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

   //Example 2.1 line 15...create Albers equal area conic projection centered on France
    var projection = d3.geo.albers()
        .center([0, 46.2])
        .rotate([-2, 0])
        .parallels([43, 62])
        .scale(2500)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);
		
    //Example 1.4 line 3...use d3.queue to parallelize asynchronous data loading
    d3_queue.queue()
        .defer(d3.csv, "data/unitsData.csv") //load attributes from csv
        .defer(d3.json, "data/EuropeCountries.topojson") //load background spatial data
        .defer(d3.json, "data/FranceRegions.topojson") //load choropleth spatial data
        .await(callback);

	function callback(error, csvData, europe, france){

        //place graticule on the map
        setGraticule(map, path);

        //translate europe and France TopoJSONs
        var europeCountries = topojson.feature(europe, europe.objects.EuropeCountries),
            franceRegions = topojson.feature(france, france.objects.FranceRegions).features;

        //add Europe countries to map
        var countries = map.append("path")
            .datum(europeCountries)
            .attr("class", "countries")
            .attr("d", path);

        //join csv data to GeoJSON enumeration units
        franceRegions = joinData(franceRegions, csvData);

        //add enumeration units to the map
        setEnumerationUnits(franceRegions, map, path);
    };
}; //end of setMap()

function setGraticule(map, path){
    //...GRATICULE BLOCKS FROM PREVIOUS MODULE
};

function joinData(franceRegions, csvData){
    //...DATA JOIN LOOPS FROM EXAMPLE 1.1

    return franceRegions;
};

function setEnumerationUnits(franceRegions, map, path){
    //...REGIONS BLOCK FROM PREVIOUS MODULE
};








   
	
	
});(); //last line of main.js


