export default function buildURLQuery(obj) {
  return Object.entries(obj)
    .filter((x) => x[1] !== "")
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");
}
