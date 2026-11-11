(() => {
  if (typeof d3 === "undefined" || !d3.chart || !d3.chart("Sankey.Path")) {
    return;
  }

  const dataTemplate = document.getElementById("transfer-data");
  const { programs, partners, logos } = JSON.parse(dataTemplate.content.textContent);
  const logoPaths = new Set(logos);
  const unavailable = { id: "none", chart_label: "N/A", color: "#808080" };

  const alliances = new Map([
    ["oneworld", { order: 0, side: "left", logo: "oneworld" }],
    ["skyteam", { order: 1, side: "left", logo: "skyteam" }],
    ["star", { order: 2, side: "right", logo: "starAlliance" }],
    ["none", { order: 3, side: "right", logo: "nonAliance" }],
  ]);

  const destinations = partners.map((row) => ({
    id: "partner-" + row.code,
    name: row.name + " [" + row.code + "]",
    code: row.code,
    alliance: alliances.get(row.alliance) || alliances.get("none"),
    transfers: programs.map((program) => ({
      program,
      rate: (row[program.id] || "").trim(),
    })).filter(({ rate }) => rate),
  })).sort((a, b) => a.alliance.order - b.alliance.order);

  const origins = programs.concat(unavailable).map((program) => ({
    id: program.id,
    name: program.chart_label,
    color: program.color,
  }));
  const nodes = origins.concat(destinations);
  const nodeIndex = new Map(nodes.map((node, index) => [node.id, index]));

  const links = destinations.flatMap((destination) => {
    const transfers = destination.transfers.length
      ? destination.transfers
      : [{ program: unavailable, rate: "" }];
    const destinationIndex = nodeIndex.get(destination.id);
    const onLeft = destination.alliance.side === "left";

    return transfers.map(({ program, rate }) => {
      const originIndex = nodeIndex.get(program.id);
      return {
        source: onLeft ? destinationIndex : originIndex,
        target: onLeft ? originIndex : destinationIndex,
        value: 1 / transfers.length,
        program,
        destination,
        rate,
      };
    });
  });

  const container = document.getElementById("chart");
  const tooltip = document.getElementById("box");
  const tooltipRoute = tooltip.querySelector("span");
  const tooltipRate = tooltip.querySelector("strong");
  document.getElementById("chart-scroll").hidden = false;

  const svg = d3.select(container).append("svg")
    .attr("role", "img")
    .attr("aria-label", "Airline transfer partnerships");
  svg.chart("Sankey.Path")
    .colorNodes((name, node) => node.color || null)
    .colorLinks((link) => link.program.color)
    .on("link:mouseover", (link) => {
      if (!link.rate) {
        tooltip.hidden = true;
        return;
      }

      tooltipRoute.textContent = link.program.chart_label + " → " + link.destination.name;
      tooltipRate.textContent = link.rate;
      tooltip.hidden = false;

      const centerX = (link.source.x + link.source.dx + link.target.x) / 2;
      const centerY = (link.source.y + link.sy + link.target.y + link.ty + link.dy) / 2;
      const x = Math.max(0, Math.min(centerX - tooltip.offsetWidth / 2, container.clientWidth - tooltip.offsetWidth));
      const y = Math.max(0, Math.min(centerY - tooltip.offsetHeight / 2, container.clientHeight - tooltip.offsetHeight));
      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";
    })
    .on("link:mouseout", () => {
      tooltip.hidden = true;
    })
    .nodeWidth(15)
    .nodePadding(3)
    .spread(true)
    .iterations(0)
    .draw({ nodes, links });

  const defs = svg.insert("defs", ":first-child");
  const registeredLogos = new Set();
  function addLogo(rectangle, name) {
    const path = "logos/" + name + ".png";
    if (!logoPaths.has("/" + path)) {
      return;
    }

    const id = "wings-logo-" + name;
    if (!registeredLogos.has(id)) {
      defs.append("pattern")
        .attr("id", id)
        .attr("width", 1)
        .attr("height", 1)
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("width", 1)
        .attr("height", 1)
        .attr("xlink:href", path);
      registeredLogos.add(id);
    }
    rectangle.style("fill", "url(#" + id + ")");
  }

  svg.selectAll(".node").filter((node) => node.alliance).each(function (node) {
    const group = d3.select(this);
    addLogo(group.select("rect.airlineLogo"), node.code);
    addLogo(group.select("rect.allianceLogo"), node.alliance.logo);
  });
})();
