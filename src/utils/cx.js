export default function cx(...names) {
  return names.filter(Boolean).join(" ");
}
