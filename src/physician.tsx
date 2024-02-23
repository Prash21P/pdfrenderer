import React from "react";
import TableComponent from "./tablecomp";
import {PDFProps} from "./sample";
import ReactDOMServer from 'react-dom/server';

const physician = ({ data }: PDFProps) => { // @ts-ignore
    // @ts-ignore
    console.log("***"+JSON.stringify(data));
    return `<html>
    <head>
    <script >
   
    </script>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }     
      .editable {
       font-size: 15px;
      }
    </style>
   </head>
   <body>
   
   <form>
    <h1>B-CELL CLONALITY (ID) REPORT</h1>
    <div>
    <label>PATIENT NAME: </label>
    <span id="patientName" contenteditable="true" class="editable">${data.patientName}</span>
    </div>
    
    <div>
    <label>PATIENT EMAIL: </label>
    <span id="patientEmail" contenteditable="true" class="editable">${data.patientEmail}</span>
    </div>
    <div>
    <label>GENDER: </label>
    <span id="gender">${data.gender}</span>    
    </div>
    <div>
    <label>ORDERING PHYSICIAN: </label>
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
    <input type="button" value="Save" onclick="save()" >
    <hr />
 
    <br /><br /><br /><br /><br />
 
    </form>
  </body>
</html>
`;
};

export default physician;