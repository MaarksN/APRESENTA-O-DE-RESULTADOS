import { readFile } from "node:fs/promises";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const [schemaText, dataText] = await Promise.all([
  readFile(new URL("../schemas/kpis.schema.json", import.meta.url), "utf8"),
  readFile(new URL("../data/kpis.json", import.meta.url), "utf8"),
]);

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(JSON.parse(schemaText));

if (!validate(JSON.parse(dataText))) {
  console.error(ajv.errorsText(validate.errors, { separator: "\n" }));
  process.exitCode = 1;
} else {
  console.log("data/kpis.json validado com sucesso.");
}
