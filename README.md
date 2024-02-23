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
    "rows" :[
        {"id":"1", "icdCodes":"C95.01", "diseaseState":"CLL"},
        {"id":"2", "icdCodes":"C65.01", "diseaseState":"ALL"},
        {"id":"3", "icdCodes":"C85.01","diseaseState":"CTCL"}        
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
