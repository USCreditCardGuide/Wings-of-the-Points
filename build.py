import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent


def render_chart_data(rows):
    # Keep empty cells as null and prevent data from closing the script tag.
    data = [{key: value or None for key, value in row.items()} for row in rows]
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    payload = payload.replace("<", r"\u003c")
    return f"  var transferRows = {payload};\n"


def replace_generated(path, start, end, content):
    before, generated = path.read_text(encoding="utf-8").split(start + "\n")
    _, after = generated.split(end + "\n")
    return before + start + "\n" + content + end + "\n" + after


def main():
    with (ROOT / "_data/transfers.csv").open(encoding="utf-8-sig", newline="") as source:
        rows = list(csv.DictReader(source))

    chart = ROOT / "index.html"
    chart_html = replace_generated(
        chart,
        "  /* BEGIN GENERATED CHART DATA */",
        "  /* END GENERATED CHART DATA */",
        render_chart_data(rows),
    )
    chart.write_bytes(chart_html.encode("utf-8"))


if __name__ == "__main__":
    main()
