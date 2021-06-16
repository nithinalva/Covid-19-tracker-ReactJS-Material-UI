import React from 'react'
import '../style/table.css'
import numeral from 'numeral'
export const Table = ({countries}) => {
    return (
        <div className="table">
            {countries.map(({country,cases},index)=>(
                <tr key={index}>
                    <td>{country}</td>
                    <td>{numeral(cases).format("0,0")}</td>
                </tr>
            ))}
        </div>
    )
}
