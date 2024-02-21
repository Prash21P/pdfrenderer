import express from "express";
import {renderHtml, renderPDF} from "./sample";
import {renderStaticHtml, renderStaticPDF} from "./reactpdfhtmlstatic";


const app = express();
app.use(express.json());
const port = 3000;

/**
 * Renders dynamic HTML
 */
app.post("/renderhtml", (req, res) => {
    const result = renderHtml(req.body);
    res.send(result);
});

/**
 * Renders dynamic PDF
 */
app.post("/renderpdf", async (req, res) => {
    const result = await renderPDF(req.body);

    // Setting up the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

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
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);

    // Streaming our resulting pdf back to the user
    result.pipe(res);
});



app.listen(port, () => {
    console.log(`The sample PDF app is running on port ${port}.`);
});
