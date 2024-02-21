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
    "details":"These are the purcase details",
    "rows" :[
        { "id": "1", "name": "Bat", "count": "2" },
        { "id": "2", "name": "Ball", "count": "6" },
        { "id": "3", "name": "Pads", "count": "4" }
    ]
}
```

There are 4 request TWO POST and TWO GET to return HTML  PDF
	- GET http://localhost:3000/renderhtml
	- POST http://localhost:3000/renderhtml
	- GET http://localhost:3000/renderpdf
	- POST http://localhost:3000/renderpdf
