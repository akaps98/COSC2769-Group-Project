import React from "react";

function ProductTableHead({ columns, handleSorting, sortOrder, sortingOption }) {
    return (
        <tr>
            {columns.map(({ label, accessor, sortable }) => {
                if (sortingOption === accessor) {
                    return (
                        <th className={sortOrder === "asc" ? "col-sm-2 clickable asc" : "col-sm-2 clickable desc"} key={accessor} onClick={() => {
                            sortable && handleSorting(accessor);
                        }}>
                            {label}
                        </th>
                    )
                }
                else {
                    return (
                        <th className={sortable ? "col-sm-2 clickable" : "col-sm-2"} key={accessor} onClick={() => {
                            sortable && handleSorting(accessor);
                        }}>
                            {label}
                        </th>
                    )
                }
            })}
        </tr>
    )
}

export default ProductTableHead;