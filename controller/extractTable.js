export function extractTable(tableInfo, tableName) {
    const extracted = tableInfo.filter((table) => table.tableName == tableName)
    return extracted
}
