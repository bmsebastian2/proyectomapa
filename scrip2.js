
      let width = 960,
        height = 600;

      let projection = d3.geo
        .albersUsa()
        .scale(1280)
        .translate([width / 2, height / 2]);

      let path = d3.geo.path().projection(projection);

      let svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      d3.json("./src/us.json", function (error, us) {
        svg
          .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", "#D9F0FF")
          .attr("stroke", "#A3D5FF")
          .attr("stroke-width", 1);
      });

      d3.select(self.frameElement).style("height", height + "px");
