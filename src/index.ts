import express from "express";
import {renderHtml, renderPDF} from "./sample";
import {renderStaticHtml, renderStaticPDF} from "./reactpdfhtmlstatic";


const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
const port = 3090;


/**
 * Renders dynamic HTML
 */
app.post("/renderhtml", (req, res) => {
    let templatename = req.query.templateName.toString();
    const result = renderHtml(req.body,templatename);
    res.send(result);
});

/**
 * Renders dynamic PDF
 */
app.post("/renderpdf", async (req, res) => {

    const result = await renderPDF(req.body,  'patient');

    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    //res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    // Streaming our resulting pdf back to the user
    result.pipe(res);
});

/**
 * Renders static HTML
 */
app.get("/renderhtml", (req, res) => {
    const result = renderStaticHtml();
    res.send(result);
});

/**
 * Renders static PDF
 */
app.get("/renderpdf", async (req, res) => {
    const result = await renderStaticPDF();

    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    //res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    // Streaming our resulting pdf back to the user
    result.pipe(res);
});



app.listen(port, () => {
    console.log(`The sample PDF app is running on port ${port}.`);
});
