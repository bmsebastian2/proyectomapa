const { json, select, selectAll, geoMercator, geoPath } = d3;

let data, topology, globe, projection, path, infoPanel;

let width = window.innerWidth;
let height = window.innerHeight;

const globeSize = { w: width / 2, h: height / 2 };

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    d3.json(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    ),
    d3.json(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
    ),
  ]).then(([resp1, resp2]) => {
    init(resp1, resp2);
  });
});

const init = (data1, data2) => {
  console.log(data1);
  data = data1;
  topology = data2;
  console.log("Topology");
  console.log(topology);

  drawGlobe();
  // renderInfoPanel()
  // createHoverEffect()
};

const drawGlobe = () => {
  globe = select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  projection = geoMercator()
    .center([-55, -32])
    .scale(6000)
    // .fitSize([width+width/2,height-100],geojson)
    .translate([globeSize.w, globeSize.h - 100]);

  path = geoPath().projection(projection);

  //   globe
  //     .selectAll("path")
  //     .data(topojson.feature(topology, topology.objects.counties).features)
  //     .enter()
  //     .append("path")
  //     .attr("d", path)
  //     .style("fill", "#33415c")
  //     .style("stroke", "#060a0f")
  //     .attr("class", "state");
};

// //   if(data && topology){
// //     console.log('pronto')

// //     const colorScale = d3.scaleQuantize()
// //            .domain([0, 40])
// //            .range(["#e0f3db", "#a8ddb5", "#43a2ca", "#0868ac"]);

// // svg.selectAll("path")
// //            .data([topology])
// //            .enter().append("path")
// //            .attr("class", "county")
// //            .attr("d", d3.geoPath())
// //            .attr("fill", (d, i) => colorScale(data[i].bachelorsOrHigher))
// //            .attr("data-fips", (d, i) => data[i].fips)
// //            .attr("data-education", (d, i) => data[i].bachelorsOrHigher)
// //            .on("mouseover", showTooltip)
// //            .on("mouseout", hideTooltip);

// // // Create legend
// // const legendColors = colorScale.range();
// // const legend = d3.select("#legend")
// // .selectAll(".legend-item")
// // .data(legendColors)
// // .enter().append("div")
// // .attr("class", "legend-item");

// // legend.append("div")
// // .attr("class", "legend-color")
// // .style("background-color", d => d);

// // legend.append("div")
// // .text((d, i) => {
// // const range = colorScale.invertExtent(d);
// // return `${range[0].toFixed(1)} - ${range[1].toFixed(1)}`;
// // });

// // // Tooltip functions
// // function showTooltip(event, d) {
// // const tooltip = d3.select("#tooltip")
// // .style("left", event.pageX + "px")
// // .style("top", event.pageY + "px")
// // .style("display", "inline-block")
// // .attr("data-education", data[d.i].bachelorsOrHigher)
// // .html(`<strong>${data[d.i].area_name}</strong><br>Bachelors or Higher: ${data[d.i].bachelorsOrHigher}%`);
// // }

// // function hideTooltip() {
// // d3.select("#tooltip").style("display", "none");
// // }

// // }
