import React from "react";
import TableComponent from "./tablecomp";
import {PDFProps} from "./sample";
import ReactDOMServer from 'react-dom/server';

const patient = ({ data }: PDFProps) => {

    return `
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
        .open-sans {
        font-family: Tahoma, sans-serif;
        font-weight: normal;      
        }
        body{
        margin: 0; padding: 0;
        font-family:   Tahoma, sans-serif;
        color: black;
        }
        .gotham-bold{
             font-family: GothamBold,  Tahoma, sans-serif;
             font-weight: bold;
        }
        .open-sans-bold {
            font-family: OpenSansBold,  Tahoma, sans-serif;
            font-weight: bold;
            }
    .page-header {
        width: 100%;
       
    }
    .patient-table {
            width: 100%;
            border: none;            
    }
    td {
      border: 1px #B0B1B3 solid;
      padding: 5px;
      padding-left: 8px; 
      padding-right: 8px;
      
    }
 
    tr > td:first-child {
    border-left: none;
    }
  tr > td:last-child {
    border-right: none;
  }
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
 
    </style>
    <!-- <script type="text/javascript" src="http://localhost:3090/patientscript.js";></script>-->
   <script>   
    function save() {   
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
        
        fetch("http://localhost:3090/renderpdf", {
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
             myWindow.document.write("<h3> PDF Render </h3>");  
             let iframe = document.createElement("iframe");
             iframe.src = URL.createObjectURL(response);
             iframe.name = "PDF Render";
             iframe.width = "500";
             iframe.height = "400";
             myWindow.document.body.appendChild(iframe);
             myWindow.document.write("<br/><br/>")
                       
             
             let button = document.createElement("input");
             button.type = 'submit';             
             button.value = 'Edit PDF';
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
           
            <div class="row">
                <h2 class="page-header">B-CELL CLONALITY (ID) REPORT</h2>
                <hr/>
               
              <div class="col" style="background-color:lavender;">
               
                <table class="patient-table" >
                    <tr>
                        <td>
                            <div class="table-field-header">
                            PATIENT NAME
                            </div>
                            <div id="patientName" contenteditable="true" class="table-field-value">
                            John Josh
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                            PATIENT EMAIL
                            </div>
                            <div id="patientEmail" contenteditable="true" class="table-field-value">
                             john@gmail.com
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                             DATE OF BIRTH
                            </div>
                            <div id="dateOfBirth" contenteditable="true" class="table-field-value">
                            11/11/2000
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                             GENDER
                            </div>
                            <div id="gender"  contenteditable="true" class="table-field-value">
                            MALE
                            </div>
                        </td>
                        <td>
                            <div class="table-field-header">
                            MEDICAL RECORD
                            </div>
                            <div id="medicalRecord" contenteditable="true" class="table-field-value">
                            25345
                            </div>
                        </td>
                       
                    </tr>
                    <tr>
                       
                        <td colspan="2">
                            <div class="table-field-header">
                            SPECIMEN TYPE
                            </div>
                            <div id="specimenType" contenteditable="true" class="table-field-value">
                            BONE MARROW
                            </div>
                        </td>
 
                        <td>
                            <div class="table-field-header">
                            COLLECTION DATE
                            </div>
                            <div id="collectionDate" contenteditable="true" class="table-field-value">
                            1/1/2023
                            </div>
                        </td>
 
                        <td>
                            <div class="table-field-header">
                            SAMPLE ID
                            </div>
                            <div id="sampleId" contenteditable="true" class="table-field-value">
                            SP-25345
                            </div>
                        </td>
 
                        <td>
                            <div class="table-field-header">
                            ORDER NUMBER
                            </div>
                            <div id="orderNumber" contenteditable="true" class="table-field-value">
                            D-355435
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div class="table-field-header">
                                ICD CODE
                            </div>
                            <div id="icdCode" contenteditable="true" class="table-field-value">
                                C98.0 Multiple myeloma not having achieved remission                              
                            </div>
                        </td>
                        <td colspan="3">
                            <div class="table-field-header">
                                DISEASE STATE
                            </div>
                            <div id="diseaseState" contenteditable="true" class="table-field-value">
                                NH-CTCL
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div class="table-field-header">
                            ORDER PHYSICIAN
                            </div>
                            <div id="orderingPhysician" contenteditable="true" class="table-field-value">
                            PETER SAMUEL
                            </div>
                        </td>
                        <td colspan="3">
                            <div class="table-field-header">
                            INSTITUTION
                            </div>
                            <div id="institution" contenteditable="true" class="table-field-value">
                            PUNE HOSPITAL
                            </div>
                        </td>
                    </tr>
                </table>
              </div>
            <div class="row margin-top">
                <div class="col open-sans">
                 <h4 class="backgroundColor">ASSAY DESCRIPTION</h4>
                    <p>
                    The clonoSEQ® Assay is an in vitro diagnostic that uses multiplex polymerase chain reaction (PCR) and next-generation sequencing (NGS) to
                    identify and quantify rearranged IgH (VDJ), IgH (DJ), IgK and IgL receptor gene sequences, as well as translocated BCL1/IgH (J) and BCL2/IgH (J)
                    sequences in DNA extracted from bone marrow from patients with B-cell acute lymphoblastic leukemia (ALL) or multiple myeloma (MM), and
                    blood or bone marrow from patients with chronic lymphocytic leukemia (CLL)
                    </p>  
                 </div>                
            </div>
            <div class="row margin-top">
                <div class="col open-sans">
                 <h4 class="backgroundColor ">RESULT</h4>
                    <div id="result"> Dominant Sequence identified extracted from bone marrow from patients with B-cell acute lymphoblastic leukemia (ALL) or multiple myeloma (MM), and blood or bone marrow from patients with chronic lymphocytic leukemia (CLL)</div>
                    
                 </div>                
            </div>
                <div class="row">
                <div class="col open-sans">
                 ${ReactDOMServer.renderToString(<TableComponent data={data.rows}/>)}
                </div>
                </div>
                <div class="row margin-top">
                    <div class="col open-sans">
                        <h4 class="backgroundColor">CRITERIA FOR DEFINING "DOMINANT" SEQUENCES </h4>
                        <p>
                        <ul>
                            <li>The sequence must comprise at least 3% of all like sequences (IGH-involved, IGK, and IGL are considered independently).</li>
                            <li>The sequence must comprise at least 0.2% of the total nucleated cells in the sample.</li>
                            <li>The sequence must be discontinuously distributed (≤5 sequences in the next decade of sequences when ranked by frequency).</li>
                            <li>The sequence must be carried by at least 40 estimated genome equivalents in the analyzed sample.</li>
                        </ul>
                        </p>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col">
            <input type="button" value="Save" onclick="save()" > 
                </div>   
            </div>
         
         </div>
        </form>
    </body>
     </html>
`;
};

export default patient;