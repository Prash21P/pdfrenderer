import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import Html from 'react-pdf-html';
import patient from "./patient";
import physician from "./physician";

export type TemplateData = {
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

export interface PDFProps {
    data: TemplateData;
}




export function renderPDF(data: TemplateData, templateName: String) {
    if(templateName == 'physician') {
        return ReactPDF.renderToStream(<Document><Page size="A4"><Html>{physician({data})}</Html></Page></Document>);
    } else {
        return ReactPDF.renderToStream(<Document><Page size="A4"><Html>{patient({data})}</Html></Page></Document>);
    }



}

export function renderHtml (data: TemplateData, templateName: String) {
    console.log("-----------------------------------------" + templateName);
    if(templateName == 'physician') {
        return physician({data});
    } else {
        return patient({data});
    }

};
