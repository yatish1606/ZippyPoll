const exclude = <T>(map: { [k: string]: T }, omitted: string[]): { [k: string]: T } => {
  return Object.getOwnPropertyNames(map)
    .filter(k => omitted.indexOf(k) >= 0)
    .reduce((a, k) => (map[k] = map[k], a), {})
}

export default exclude