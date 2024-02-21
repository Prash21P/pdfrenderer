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

export type TemplateData = {
    companyName: string;
    companyPhone: string;
    companyEmail: string;
    receiptNumber: string;
    datePaid: string,
    paymentMethod: string,
    amount: string,
    rows : object[]
};

export interface PDFProps {
    data: TemplateData;
}

export const html3 = ({ data }: PDFProps) => { // @ts-ignore
    // @ts-ignore
    return `<html>
  <body contenteditable="true">
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
    </style>
    <h1 lable="companyName">${data.companyName}</h1>
    <h2 style="background-color: pink" >${data.companyPhone}</h2>
    <h3>${data.companyEmail}</h3>
    <h4 class="my-heading4">${data.amount}</h4>
    <p>
      Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
      <s>strikethrough</s>,
      <strong><u><s><i>and all of the above</i></s></u></strong>
    </p>
    <p>
      Paragraph with image and
      <a href="http://google.com">link</a>
    </p>
    <hr />
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
    <ol>
      <li>Ordered item</li>
      <li>Ordered item</li>
    </ol>
    <br /><br /><br /><br /><br />
    Text outside of any tags
    
    <br /><br /><br /><br /><br />
 
      <div style="width: 200px; height: 200px;">
        ${ReactDOMServer.renderToString(<TableComponent data = {data.rows}/>)}
      </div>

    <div style="width: 200px; height: 200px; background: pink"></div>
    <pre>
function myCode() {
  const foo = 'bar';
}
</pre>
  </body>
</html>
`;
};



export default (data: TemplateData) => {
    //return ReactPDF.renderToStream(<Document><Page size="A4"><Html><html3 {...{ data }} /></Html></Page></Document>);
    return ReactPDF.renderToStream(<Document><Page size="A4"><Html>{html3({data})}</Html></Page></Document>);
};

export function renderPDF(data: TemplateData) {
    return ReactPDF.renderToStream(<Document><Page size="A4"><Html>{html3({data})}</Html></Page></Document>);
}

export function renderHtml (data: TemplateData) {
    return html3({data});
};
