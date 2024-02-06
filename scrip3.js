const width = 975;
const height = 610;

let us, data;
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    d3.json(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
    ),
    d3.json(
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
    ),
  ]).then(([resp1, resp2]) => {
    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);
    us = resp2;
    data = resp1;
    console.log(us);
    console.log(data);

    const svg = d3
      .select("body")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", reset);

    // Create a color scale
    const colorScale = d3
      .scaleQuantize()
      .domain([0, 40]) // Adjust the domain based on your data
      .range(["#e0f3db", "#a8ddb5", "#43a2ca", "#0868ac"]);

    const path = d3.geoPath();

    const g = svg.append("g");

    const states = g
      .append("g")
      .attr("cursor", "pointer")
      .attr("class", "county")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .on("click", clicked)
      .attr("d", path)
      .attr("fill", (d, i) => colorScale(data[i].bachelorsOrHigher))
      .attr("data-fips", (d, i) => data[i].fips)
      .attr("data-education", (d, i) => data[i].bachelorsOrHigher);

    states.append("title").text((d) => d.properties.name);
    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        path(topojson.mesh(us, us.objects.counties, (a, b) => a !== b))
      );

    const createHoverEffect = () => {
      d3.selectAll("path").on("mouseover", function (e, d) {
        //console.log(e);
        console.log(d);
        // select(this).title = "Ingres";
        //   infoPanel.html(
        //     `<h2>${admlnm} ✔</h2><hr><br></br><p>📍 ${admlcd}</p>`
        //   );
        //   globe
        //     .selectAll(".state")
        d3.selectAll("path")
          //   .style("fill", "#33415c")
          .style("opacity", "100%");
        d3.select(this).style("opacity", "10%");
      });
    };
    createHoverEffect();
    // Your D3 code to create the choropleth map goes here

    // Set up the legend
    const legendColors = ["#e0f3db", "#a8ddb5", "#43a2ca", "#0868ac"];
    const legendData = ["< 15%", "15% - 20%", "20% - 25%", "> 25%"];

    const legend = d3
      .select("#legend")
      .selectAll(".legend-item")
      .data(legendColors)
      .enter()
      .append("div")
      .attr("class", "legend-item");

    legend
      .append("div")
      .style("width", "20px")
      .style("height", "20px")
      .style("background-color", (d) => d);

    legend.append("div").text((d, i) => legendData[i]);
    // states
    //   .selectAll("path")
    //   .data(topojson.feature(us, us.objects.counties).features)
    //   .join("path")
    //   .attr("d", path)
    //   .attr("fill", "#2156");

    // states
    //   .selectAll("path")
    //   .data(geojson.features)
    //   .enter()
    //   .append("path")
    //   .attr("d", path)
    //   .style("fill", "#33415c")
    //   .style("stroke", "#060a0f")
    //   .attr("class", "state");

    states.append("title").text((d) => d.properties.name);

    // g.append("path")
    //   .attr("fill", "none")
    //   .attr("stroke", "white")
    //   .attr("stroke-linejoin", "round")
    //   .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

    svg.call(zoom);

    function reset() {
      states.transition().style("fill", null);
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      states.transition().style("fill", null);
      d3.select(this).transition().style("fill", "red");
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node())
        );
    }

    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform);
      g.attr("stroke-width", 1 / transform.k);
    }
  });
});

//   return svg.node();
