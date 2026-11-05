
import express from 'express';

const router = express.Router();

// Initial VetBoard domain identifiers.
// We'll verify labels and weights against the official VTNE outline.
const domains = [
  { id: 'pharmacy', name: 'Pharmacy and Pharmacology' },
  { id: 'surgical-nursing', name: 'Surgical Nursing' },
  { id: 'dentistry', name: 'Dentistry' },
  { id: 'laboratory', name: 'Laboratory Procedures' },
  { id: 'animal-care', name: 'Animal Care and Nursing' },
  { id: 'diagnostic-imaging', name: 'Diagnostic Imaging' },
  { id: 'anesthesia', name: 'Anesthesia' },
  { id: 'emergency', name: 'Emergency and Critical Care' },
  { id: 'pain-management', name: 'Pain Management' },
  {
    id: 'communication',
    name: 'Communication and Professional Support',
  },
];

// GET /api/practice/domains
router.get('/domains', (req, res) => {
  res.json({ domains });
});

export default router;
