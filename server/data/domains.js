// VTNE domains and item counts from the AAVSB VTNE Candidate Information
// Handbook (2026), based on the content outline approved March 2023.
// The real exam has 150 scored items.
export const domains = [
  { id: 'pharmacy', name: 'Pharmacy and Pharmacology', items: 20 },
  { id: 'surgical-nursing', name: 'Surgical Nursing', items: 20 },
  { id: 'dentistry', name: 'Dentistry', items: 10 },
  { id: 'laboratory', name: 'Laboratory Procedures', items: 14 },
  { id: 'animal-care', name: 'Animal Care and Nursing', items: 30 },
  { id: 'diagnostic-imaging', name: 'Diagnostic Imaging', items: 9 },
  { id: 'anesthesia', name: 'Anesthesia', items: 20 },
  { id: 'emergency', name: 'Emergency Medicine and Critical Care', items: 10 },
  { id: 'pain-management', name: 'Pain Management and Analgesia', items: 10 },
  {
    id: 'communication',
    name: 'Communication and Veterinary Professional Support Services',
    items: 7,
  },
];

export const domainNames = Object.fromEntries(
  domains.map((domain) => [domain.id, domain.name]),
);

const TOTAL_ITEMS = domains.reduce((sum, domain) => sum + domain.items, 0);

// Splits `total` questions across domains in proportion to the exam
// blueprint, using largest remainders so the counts add up exactly.
export function blueprintCounts(total) {
  const raw = domains.map((domain) => ({
    id: domain.id,
    exact: (total * domain.items) / TOTAL_ITEMS,
  }));

  const counts = Object.fromEntries(
    raw.map((item) => [item.id, Math.floor(item.exact)]),
  );

  let remaining = total - Object.values(counts).reduce((a, b) => a + b, 0);

  [...raw]
    .sort((a, b) => (b.exact % 1) - (a.exact % 1))
    .forEach((item) => {
      if (remaining > 0) {
        counts[item.id] += 1;
        remaining -= 1;
      }
    });

  return counts;
}
