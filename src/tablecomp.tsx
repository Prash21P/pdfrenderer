import React from 'react';

const TableComponent = ({data}) => {

    //const headers = Object.keys(data[0]);
    const headers = ['Collection Date','SampleID','Specimen Type','Frequency Per Total Nucleated Cells',
        'Total Cells Containing Sequence'];
    const rows = data.map(item => Object.values(item));

    return (
        <table id="table" border="2">
            <thead>
            <tr>
                {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.map((cell, index) => <td key={index}>{cell}</td>)}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableComponent;