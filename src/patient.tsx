import React from "react";
import TableComponent from "./tablecomp";
import {PDFProps} from "./sample";
import ReactDOMServer from 'react-dom/server';
import i18next from "./i18n"

const patient = ({ data }: PDFProps, lang:String) => {

    return `<html>
    <head>
   <!-- <script type="text/javascript" src="http://localhost:3090/patientscript.js";></script>-->
   <script>
   
    function save() {   
        let obj=new Object();
        console.log("%%"+JSON.stringify(document.getElementById("patientName").innerHTML));
        obj["patientName"] = document.getElementById("patientName").innerHTML;
        obj["patientEmail"] = document.getElementById("patientEmail").innerHTML;
        obj["orderingPhysician"] = document.getElementById("orderingPhysician").innerHTML;
        obj["gender"] = document.getElementById("gender").innerHTML;
        obj["dateOfBirth"] = document.getElementById("dateOfBirth").innerHTML;
        obj["collectionDate"] = document.getElementById("collectionDate").innerHTML;
        obj["specimenType"] = document.getElementById("specimenType").innerHTML;
        
        let arr= [];
        let mytable = document.getElementById('table');

        //gets rows of table
        let rowLength = mytable.rows.length;
               
                //loops through rows    
        for (i = 1; i < rowLength; i++){
           let tableRow = new Object();  
          //gets cells of current row  
           let Cells = mytable.rows.item(i).cells;
           let cellVal = Cells.item(0).innerHTML;
           tableRow["id"]=Cells.item(0).innerHTML;
           tableRow["icdCodes"]=Cells.item(1).innerHTML;
           tableRow["diseaseState"]=Cells.item(2).innerHTML;     
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
             myWindow.name = "ABC";
             myWindow.document.write("<h3> PDF Render </h3>");  
             let iframe = document.createElement("iframe");
             iframe.src = URL.createObjectURL(response);
             iframe.name = "PDF Render";
             iframe.width = "500";
             iframe.height = "400";
             myWindow.document.body.appendChild(iframe);
             myWindow.document.write("<br/><br/>")
             myWindow.document.write("<form method='POST' action='http://localhost:3090/renderhtml?templateName=Patient'>");
             
             let hiddenData = document.createElement("input");
             hiddenData.type = "hidden";
             hiddenData.value = JSON.stringify(obj);
             myWindow.document.body.appendChild(hiddenData);
             
             let button = document.createElement("input");
             button.type = 'submit';             
             button.value = 'Edit PDF';
             myWindow.document.body.appendChild(button);
             document.write("</form></body></html>")
             
           
             
                          
            })
            .catch(error => {
                console.log(error);
            });
    }
    </script>
     </head>
   <body>
   
   <form>
    <h1>${i18next.t( lang + ':BCELL_CLON_REP')}</h1>
    <div>
    <label>${i18next.t( lang + ':PATIENT_NAME')}: </label>
    <span id="patientName" contenteditable="true" class="editable">${data.patientName}</span>
    </div>
    
    <div>
    <label>${i18next.t( lang + ':PATIENT_EMAIL')}: </label>
    <span id="patientEmail" contenteditable="true" class="editable">${data.patientEmail}</span>
    </div>
    <div>
    <label>${i18next.t( lang + ':GENDER')}: </label>
    <span id="gender">${data.gender}</span>    
    </div>
    <div>
    <label>${i18next.t( 'ORDERING_PHYSICIAN')}: </label>
    <span id="orderingPhysician" contenteditable="true" class="editable">${data.orderingPhysician}</span>
    </div>
    <div>
    <label>DATE OF BIRTH: </label>
    <span id="dateOfBirth" contenteditable="true" class="editable">${data.dateOfBirth}</span>
    </div>
    <div>
    <label>COLLECTION DATE: </label>
    <span id="collectionDate" contenteditable="true" class="editable">${data.collectionDate}</span>
    </div>
    <div>
    <label>SPECIMEN TYPE: </label>
    <span id="specimenType" contenteditable="true" class="editable">${data.specimenType}</span>
   </div>
    <div>
      ${ReactDOMServer.renderToString(<TableComponent data={data.rows}/>)}
    </div>
    <div>
    <h3>ASSAY DESCRIPTION</h3>
    <p>
    The clonoSEQ® Assay is an in vitro diagnostic that uses multiplex polymerase chain reaction (PCR) and next-generation sequencing (NGS) to
    identify and quantify rearranged IgH (VDJ), IgH (DJ), IgK and IgL receptor gene sequences, as well as translocated BCL1/IgH (J) and BCL2/IgH (J)
    sequences in DNA extracted from bone marrow from patients with B-cell acute lymphoblastic leukemia (ALL) or multiple myeloma (MM), and
    blood or bone marrow from patients with chronic lymphocytic leukemia (CLL)
    </p>
    </div>
    <div>
    <h3>CRITERIA FOR DEFINING "DOMINANT" SEQUENCES</h3>
    <ol>
    <li>The sequence must comprise at least 3% of all like sequences (IGH-involved, IGK, and IGL are considered independently).</li>
    <li>The sequence must comprise at least 0.2% of the total nucleated cells in the sample.</li>
    <li>The sequence must be discontinuously distributed (≤5 sequences in the next decade of sequences when ranked by frequency).</li>
    <li>The sequence must be carried by at least 40 estimated genome equivalents in the analyzed sample.</li>
    </ol>
    </div>
    <input type="button" value="Save" onclick="save()" >
    <hr />
 
    <br /><br /><br /><br /><br />
 
    </form>
  </body>
</html>
`;
};

export default patient;