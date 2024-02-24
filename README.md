# pdfrenderer
Report pdf renderer

## Getting started
### Install dependencies

```bash
npm install
```

### Start the server (for dev)

```bash
npm run serve
```

### Send POST requests to generate PDFs
PSOT request takes below JSON

Using the default template, the JSON would look like this:

```
{
    "patientName": "John Steve", 
    "gender": "Male",
    "patientEmail": "john@gmail.com",
    "orderingPhysician": "North Jose",
    "dateOfBirth": "11/11/2000",
    "specimenType": "Blood",
    "collectionDate": "11/1/2021",
    "medicalrecord":"25345",
    "orderNumber" : "423543",
    "sampleId":"SP-111234",
    "icdCodes":"C91.5 Multiple myeloma not having achieved remission",
    "diseaseState":"CTCL",
    "institution":"Tata Hospital",
    "result":"Dominant Sequence identified",
    "rows":[
        {"collectionDate":"11/1/2021","sampleId":"SP-111234","specimenType":"Blood",
        "frequencyPerTotalNucleatedCells":"80.4%",
        "TotalCellsContainingSequence":"57120" }
    	]   
	}

```

There are 4 request TWO POST and TWO GET to return HTML  PDF
	- GET http://localhost:3090/renderhtml?templateName=patient&locale=de
	- POST http://localhost:3090/renderhtml?templateName=patient&locale=de
	- GET http://localhost:3000/renderpdf
	- POST http://localhost:3090/renderpdf?templateName=patient&locale=de

Use locales:
locale=de for German
locale=en for English
