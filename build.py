import csv
import json
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PROGRAMS = (
    ("chase", "Chase Ultimate Rewards", "Chase UR"),
    ("amex", "American Express Membership Rewards", "AmEx MR"),
    ("citi", "Citi ThankYou Points", "Citi TYP"),
    ("c1", "Capital One Miles", "Capital One"),
    ("bilt", "Bilt Rewards", "Bilt"),
    ("marriott", "Marriott Bonvoy", "Marriott"),
)


def render_chart_data(rows):
    # Keep empty cells as null and prevent data from closing the script tag.
    data = [{key: value or None for key, value in row.items()} for row in rows]
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    payload = payload.replace("<", r"\u003c")
    return f"  var transferRows = {payload};\n"


def render_transfer_tables(rows):
    partners = sorted(rows, key=lambda row: row["name"].lower())
    lines = ['    <nav aria-label="Points programs">']
    for program, _, short_label in PROGRAMS:
        lines.append(f'      <a href="#{program}">{escape(short_label)}</a>')
    lines.append("    </nav>")

    for program, label, _ in PROGRAMS:
        lines.extend([
            "",
            f'    <table id="{program}">',
            f"      <caption>{escape(label)}</caption>",
            "      <thead>",
            '        <tr><th scope="col">Transfer partner</th><th scope="col">Ratio</th></tr>',
            "      </thead>",
            "      <tbody>",
        ])
        for row in partners:
            ratio = (row[program] or "").strip()
            if not ratio:
                continue
            name = escape(row["name"])
            code = escape(row["code"])
            lines.extend([
                f'        <tr data-partner="{code}">',
                f'          <th scope="row">{name} <span class="code">({code})</span></th>',
                f"          <td>{escape(ratio)}</td>",
                "        </tr>",
            ])
        lines.extend(["      </tbody>", "    </table>"])

    return "\n".join(lines) + "\n"


def replace_generated(path, start, end, content):
    before, generated = path.read_text(encoding="utf-8").split(start + "\n")
    _, after = generated.split(end + "\n")
    return before + start + "\n" + content + end + "\n" + after


def main():
    with (ROOT / "_data/transfers.csv").open(encoding="utf-8-sig", newline="") as source:
        rows = list(csv.DictReader(source))

    chart = ROOT / "index.html"
    table = ROOT / "table.html"
    chart_html = replace_generated(
        chart,
        "  /* BEGIN GENERATED CHART DATA */",
        "  /* END GENERATED CHART DATA */",
        render_chart_data(rows),
    )
    table_html = replace_generated(
        table,
        "    <!-- BEGIN GENERATED TRANSFER TABLES -->",
        "    <!-- END GENERATED TRANSFER TABLES -->",
        render_transfer_tables(rows),
    )
    chart.write_bytes(chart_html.encode("utf-8"))
    table.write_bytes(table_html.encode("utf-8"))


if __name__ == "__main__":
    main()
