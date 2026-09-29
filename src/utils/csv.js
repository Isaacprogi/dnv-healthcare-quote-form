import Papa from "papaparse";

const HEADER_MAP = {
  "Street Address": "address",
  City: "city",
  State: "state",
  "ZIP Code": "zip",
  FTEs: "ftes",
  Shifts: "shifts",
  "Miles to Main": "milesToMain",
};

export function parseSiteCsv(text) {
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  return data.map((row) => {
    const location = { id: crypto.randomUUID(), daysOpen: [] };
    for (const [header, value] of Object.entries(row)) {
      const trimmedHeader = header.trim();
      const key = HEADER_MAP[trimmedHeader];
      if (key) location[key] = (value || "").trim();
      else if (trimmedHeader.startsWith("Days Open")) {
        location.daysOpen = (value || "").split(";").map((d) => d.trim()).filter(Boolean);
      }
    }
    return location;
  });
}