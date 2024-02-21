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
	"companyName": "Google",
	"companyPhone": "999-999-12345",
	"companyEmail": "test@dummy.com",
	"receiptNumber": "12345",
	"datePaid": "9/10/2024",
	"paymentMethod": "Visa",
	"amount": "99",
    "rows" :[
        { "id": "1", "name": "Rohi", "age": "35" },
        { "id": "2", "name": "Sachin", "age": "45" },
        { "id": "3", "name": "Dhoni", "age": "40" }
    ]
}
```

There are 4 request TWO POST and TWO GET to return HTML  PDF
	- GET http://localhost:3000/renderhtml
	- POST http://localhost:3000/renderhtml
	- GET http://localhost:3000/renderpdf
	- POST http://localhost:3000/renderpdf
