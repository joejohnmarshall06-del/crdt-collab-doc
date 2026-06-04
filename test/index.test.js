import test from "node:test";
import assert from "node:assert/strict";
import { CRDTDoc } from "../src/index.js";
test("merges concurrent edits", () => {
  const a = new CRDTDoc("a"); const b = new CRDTDoc("b");
  a.insert("H"); b.insert("i"); a.merge(b); b.merge(a);
  assert.equal(a.text(), b.text());
});
