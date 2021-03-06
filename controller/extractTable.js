export function extractTable(tableInfo, id) {
    const extracted = tableInfo.filter((table) => table.id == id)
    return extracted
}
