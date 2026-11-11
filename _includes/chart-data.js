  /* BEGIN GENERATED CHART DATA */
  var transferRows = {{ site.data.transfers | jsonify | replace: '<', '\u003c' }};
  var allianceTypes = ['nonAliance', 'oneworld', 'skyteam', 'starAlliance'];
  var transferPrograms = ['amex', 'citi', 'chase', 'c1', 'bilt', 'marriott'];
  var rowsByAlliance = _.groupBy(transferRows, 'alliance');

  var rates = {};
  transferPrograms.forEach(program => {
    rates[program] = {};
    transferRows.forEach(row => {
      var ratio = (row[program] || '').trim();
      if (ratio) {
        rates[program][row.code.toLowerCase()] = ratio;
      }
    });
  });

  var airlines = allianceTypes.map(type => ({
    type,
    airlines: (rowsByAlliance[type] || []).map(row => ({
      sc: row.code.toLowerCase(),
      name: row.name,
    })),
  }));

  var relations = allianceTypes.map(type => ({
    type,
    relations: _.sortBy(rowsByAlliance[type] || [], row => Number(row.link_order) || Infinity)
      .map(row => {
        var code = row.code.toLowerCase();
        return transferPrograms.map(program => ({
          s: program,
          t: code,
          f: rates[program][code] ? 1 : 0,
        }));
      }),
  }));
  /* END GENERATED CHART DATA */
