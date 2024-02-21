import React from "react";
import TableComponent from "./tablecomp";
import {PDFProps} from "./sample";
import ReactDOMServer from 'react-dom/server';

const patient = ({ data }: PDFProps) => { // @ts-ignore
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

export default patient;