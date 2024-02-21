import React from "react";
import TableComponent from "./tablecomp";
import {PDFProps} from "./sample";
import ReactDOMServer from 'react-dom/server';

const physician = ({ data }: PDFProps) => { // @ts-ignore
    // @ts-ignore
    return `<html>
  <body contenteditable="true">
    <style>
      .my-heading3 {
        background: gray;
        color: black;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
       
    </style>
    <h1>Receipt details</h1>
    <h2 lable="companyName" class="my-heading3">${data.companyName}</h2>
    <h4>${data.companyPhone}</h4>
    <h4>${data.companyEmail}</h4>
    <h4>${data.amount}</h4>
    <h4>${data.datePaid}</h4>
    <h4>${data.paymentMethod}</h4>
    <h4>${data.receiptNumber}</h4>
    <p>
        ${data.details}
    </p>
    <h3> List of Items</h3>
    <div style="width: 400px; height: 400px;">
        ${ReactDOMServer.renderToString(<TableComponent data={data.rows}/>)}
    </div>
  
  </body>
</html>
`;
};

export default physician;