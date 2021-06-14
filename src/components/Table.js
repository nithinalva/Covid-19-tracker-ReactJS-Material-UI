import React from 'react'
import '../style/table.css'
export const Table = ({countries}) => {
    return (
        <div className="table">
            {countries.map(({country,cases},index)=>(
                <tr key={index}>
                    <td>{country}</td>
                    <td>{cases}</td>
                </tr>
            ))}
        </div>
    )
}
