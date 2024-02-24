import React from "react";
import TableComponent from "./tablecomp";
import {PDFProps} from "./sample";
import ReactDOMServer from 'react-dom/server';
import i18next from "./i18n"

var l;
const patient = ({ data }: PDFProps, lang:String) => {
console.log("+++"+lang);
l = lang;
    return `
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
       
    <style>
        .open-sans {        
        font-weight: normal;  
        font-family: "Times-Roman";     
        }
        body{
        margin: 0; padding: 0;
        color: black;
        }
        .gotham-bold{
            font-weight: bold;
            font-family: "Times-Roman"; 
        }
        .open-sans-bold {
         font-weight: bold;
         font-family: "Times-Roman"; 
            }
    .page-header {
        width: 100%;
       
    }
    .patient-table {
            width: 100%;
            border: none;            
    }
    td,th {
      border: 1px #B0B1B3 solid;
      padding: 5px;
      padding-left: 8px; 
      padding-right: 8px;
      
    }
 
  /*  tr > td:first-child {
    border-left: none;
    }
  tr > td:last-child {
    border-right: none;
  }*/
  .table-field-header{
     text-transform: uppercase;
     font-size: 8pt;
   }
    .table-field-value {
        font-weight: bold;
        font-size: 10pt;    
    }
    .margin-top {
        margin-top: 20px;
    }
    .backgroundColor {
     background-color: rgb(166, 166, 241);
     padding-left: 10px;
     
    }
   
   .margin15 {
   margin: 15px;
   }
  .save-css{
    background-color: rgb(166, 166, 241);
    color:black;
    height: 5%;
    width: 10%;
    padding: 5px;
    border-radius: 8px;
    border-color: transparent;
    font-weight: 600;
    cursor:pointer;    
   }
   
    </style>
    <!-- <script type="text/javascript" src="http://localhost:3090/patientscript.js";></script>-->
   <script>   
    function save(lang) {   
        
        let obj=new Object();    
        
        obj["patientName"] = document.getElementById("patientName").innerHTML;
        obj["patientEmail"] = document.getElementById("patientEmail").innerHTML;
        obj["orderingPhysician"] = document.getElementById("orderingPhysician").innerHTML;
        obj["gender"] = document.getElementById("gender").innerHTML;
        obj["dateOfBirth"] = document.getElementById("dateOfBirth").innerHTML;
        obj["collectionDate"] = document.getElementById("collectionDate").innerHTML;
        obj["specimenType"] = document.getElementById("specimenType").innerHTML;
        obj["institution"]=document.getElementById("institution").innerHTML;
        obj["sampleId"]=document.getElementById("sampleId").innerHTML;
        obj["orderNumber"]=document.getElementById("orderNumber").innerHTML;
        obj["icdCode"]=document.getElementById("icdCode").innerHTML;
        obj["diseaseState"]=document.getElementById("diseaseState").innerHTML;
        obj["result"]=document.getElementById("result").innerHTML;
        obj["medicalRecord"]=document.getElementById("medicalRecord").innerHTML;
        
       
        
        let arr= [];
        let mytable = document.getElementById('table');

        //gets rows of table
        let rowLength = mytable.rows.length;
               
                //loops through rows    
        for (i = 1; i < rowLength; i++){
           let tableRow = new Object();  
          //gets cells of current row  
           let Cells = mytable.rows.item(i).cells;
           
           tableRow["collectionDate"]=Cells.item(0).innerHTML;
           tableRow["sampleId"]=Cells.item(1).innerHTML;
           tableRow["specimenType"]=Cells.item(2).innerHTML;
           tableRow["frequencyPerTotalNucleatedCells"]=Cells.item(3).innerHTML;
           tableRow["totalCellsContainingSequence"]=Cells.item(4).innerHTML;
           
           arr.push(tableRow);     
        }
        obj["rows"] = arr;        
       
        
        fetch("http://localhost:3090/renderpdf?templateName=Patient&locale="+lang, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then((response) => {
                return response.blob();
            })
            .then(response => {
                
             let myWindow= window.open("","_blank");
             myWindow.document.write("<html><body>");
             let iframe = myWindow.document.createElement("iframe");
             iframe.src = URL.createObjectURL(response);
             iframe.name = "PDF Render";
             iframe.width = "100%";
             iframe.height = "90%";
             myWindow.document.body.appendChild(iframe);
             myWindow.document.write("<br/><br/>")
                       
             
             let button = document.createElement("input");
             button.type = 'submit';             
             button.value = 'Edit PDF';
             button.className = "save-css"
             myWindow.document.body.appendChild(button); 
             
                          
            })
            .catch(error => {
                console.log(error);
            });
    }
    </script>
    </head>
    <body>
        <div class="container">
            <div class="margin15">
            <div class="row">
                <h2 class="page-header">${i18next.t( lang + ':BCELL_CLON_REP')}</h2>
                <hr/>
               
              <div class="col" style="background-color:lavender;">
               
                <table class="patient-table" >
                    <tr>
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':PATIENT_NAME')}
                            </div>
                            <div id="patientName" contenteditable="true" class="table-field-value">
                            ${data.patientName}
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':PATIENT_EMAIL')}
                            </div>
                            <div id="patientEmail" contenteditable="true" class="table-field-value">
                             ${data.patientEmail}
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':DATE_OF_BIRTH')}
                            </div>
                            <div id="dateOfBirth" contenteditable="true" class="table-field-value">
                            ${data.dateOfBirth}
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':GENDER')}
                            </div>
                            <div id="gender"  contenteditable="true" class="table-field-value">
                            ${data.gender}
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':MEDICAL_RECORD')}
                            </div>
                            <div id="medicalRecord" contenteditable="true" class="table-field-value">
                            ${data.medicalRecord}
                            </div>
                        </td>
                       
                    </tr>
                    <tr>
                       
                        <td colspan="2">
                            <div class="table-field-header">
                            ${i18next.t( lang + ':SPECIMEN_TYPE')}
                            </div>
                            <div id="specimenType" contenteditable="true" class="table-field-value">
                            ${data.specimenType}
                            </div>
                        </td>
 
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':COLLECTION_DATE')}
                            </div>
                            <div id="collectionDate" contenteditable="true" class="table-field-value">
                            ${data.collectionDate}
                            </div>
                        </td>
 
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':SAMPLE_ID')}
                            </div>
                            <div id="sampleId" contenteditable="true" class="table-field-value">
                            ${data.sampleId}
                            </div>
                        </td>
 
                        <td>
                            <div class="table-field-header">
                            ${i18next.t( lang + ':ORDER_NUMBER')}
                            </div>
                            <div id="orderNumber" contenteditable="true" class="table-field-value">
                            ${data.orderNumber}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div class="table-field-header">
                            ${i18next.t( lang + ':ICD_CODE')}
                            </div>
                            <div id="icdCode" contenteditable="true" class="table-field-value">
                               ${data.icdCode}                             
                            </div>
                        </td>
                        <td colspan="3">
                            <div class="table-field-header">
                            ${i18next.t( lang + ':DISEASE_STATE')}
                            </div>
                            <div id="diseaseState" contenteditable="true" class="table-field-value">
                                ${data.diseaseState}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div class="table-field-header">
                            ${i18next.t( lang + ':ORDER_PHYSICIAN')}
                            </div>
                            <div id="orderingPhysician" contenteditable="true" class="table-field-value">
                            ${data.orderingPhysician}
                            </div>
                        </td>
                        <td colspan="3">
                            <div class="table-field-header">
                            ${i18next.t( lang + ':INSTITUTION')}
                            </div>
                            <div id="institution" contenteditable="true" class="table-field-value">
                            ${data.institution}
                            </div>
                        </td>
                    </tr>
                </table>
              </div>
           
            <div class="row margin-top">
                <div class="col open-sans">
                 <h4 class="backgroundColor ">${i18next.t( lang + ':RESULT')}</h4>
                   <div id="result"> 
                    ${data.result}
                   </div>                
            </div>
                <div class="row">
                <div class="col open-sans">
                 ${ReactDOMServer.renderToString(<TableComponent data={data.rows}/>)}
                </div>
                </div>       
                
            </div>
            <br/>
            <div class="row">
                <div class="col">
            <input type="button" value="Save" onclick="save('${lang}'.toString())" class="save-css align-center" > 
                </div>   
            </div>
          </div>
         </div>
        </form>
    </body>
     </html>
`;
};

export default patient;