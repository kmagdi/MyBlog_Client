import React from 'react'
import { useTable,useSortBy,useFilters } from 'react-table'

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export const MyTable=({columns,data})=> {

  const filterTypes = React.useMemo(
    () => ({
       text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined  ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())  : true
        })
      },
    }),[])

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data ,defaultColumn,filterTypes},useFilters, useSortBy)

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)


  return (
    <div className="container">
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
               
                style={{
                  border: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {/*Add the sorting props to control sorting:*/}
                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                   {column.render('Header')}
                   {/* Add a sort direction indicator */}
                  <span>{!column.disableSortBy && (column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : (column.Header?'👈':''))}</span>
                </div>
               
                  {/* Render the columns filter UI */}
                 <div className="filter">{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr  {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.get}
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}
