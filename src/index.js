export class CRDTDoc {
  constructor(site) { this.site = site; this.clock = 0; this.chars = new Map(); }
  insert(value, after = null) {
    const id = `${++this.clock}@${this.site}`; this.chars.set(id, { id, value, after, deleted: false }); return id;
  }
  delete(id) { const char = this.chars.get(id); if (char) char.deleted = true; }
  merge(other) {
    for (const [id, char] of other.chars) {
      const existing = this.chars.get(id);
      this.chars.set(id, existing ? { ...char, deleted: existing.deleted || char.deleted } : { ...char });
    }
  }
  text() {
    return [...this.chars.values()].sort((a, b) => a.id.localeCompare(b.id)).filter((c) => !c.deleted).map((c) => c.value).join("");
  }
}
