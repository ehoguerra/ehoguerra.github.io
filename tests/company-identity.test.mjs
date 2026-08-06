import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const LEGAL_NAME = "Artur Guerra Desenvolvimento de Software LTDA";
const CNPJ = "67.557.039/0001-85";
const DOMAIN = "https://arturguerra.com";

test("the public site identifies the company that controls the domain", async () => {
  const [layout, footer, translations] = await Promise.all([
    readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/Footer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/lib/i18n.ts", import.meta.url), "utf8"),
  ]);

  assert.match(layout, new RegExp(LEGAL_NAME));
  assert.match(layout, new RegExp(CNPJ.replaceAll(".", "\\.").replace("/", "\\/")));
  assert.match(layout, new RegExp(DOMAIN.replaceAll(".", "\\.")));
  assert.match(layout, /"@type": "Organization"/);
  assert.match(footer, /t\.company/);
  assert.match(translations, new RegExp(LEGAL_NAME));
  assert.match(translations, new RegExp(CNPJ.replaceAll(".", "\\.").replace("/", "\\/")));
});
