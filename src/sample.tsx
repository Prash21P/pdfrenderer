import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import Html from 'react-pdf-html';
import TableComponent from "./tablecomp";
import ReactDOMServer from 'react-dom/server';

type TemplateData = {
    companyName: string;
    companyPhone: string;
    companyEmail: string;
    receiptNumber: string;
    datePaid: string,
    paymentMethod: string,
    amount: string,
    details: string,
    rows : object[]
};

interface PDFProps {
    data: TemplateData;
}

const html3 = ({ data }: PDFProps) => { // @ts-ignore
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

export function renderPDF(data: TemplateData) {
    return ReactPDF.renderToStream(<Document><Page size="A4"><Html>{html3({data})}</Html></Page></Document>);
}

export function renderHtml (data: TemplateData) {
    return html3({data});
};
