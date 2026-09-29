export function emptyLocation() {
  return {
    id: crypto.randomUUID(),
    address: "",
    city: "",
    state: "",
    zip: "",
    ftes: "",
    shifts: "",
    milesToMain: "",
    daysOpen: [],
  };
}