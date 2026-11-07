// Source-based questions. Each cites a specific page and passed an
// independent AI cross-check. Only 'approved' questions reach students.
export const generatedQuestions = [
  {
    "id": "mvm-anesthesia-001",
    "domain": "anesthesia",
    "question": "Which of the following is a recognized source of waste anesthetic gas exposure for staff in the surgery suite?",
    "options": [
      "An uncuffed endotracheal tube",
      "Using a low-flow anesthesia technique",
      "Using a total intravenous anesthesia protocol",
      "Adding a local anesthetic nerve block"
    ],
    "correctAnswer": "An uncuffed endotracheal tube",
    "explanation": "Gas can leak around an uncuffed endotracheal tube into the room. Low-flow techniques, total intravenous anesthesia, and local or regional blocks are listed as ways to reduce exposure, not sources of it.",
    "source": {
      "title": "Merck Veterinary Manual: Waste Anesthetic Gases as a Veterinary Workplace Hazard",
      "reference": "https://www.merckvetmanual.com/public-health/toxicological-hazards-in-the-veterinary-workplace/waste-anesthetic-gases-as-a-veterinary-workplace-hazard",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-anesthesia-002",
    "domain": "anesthesia",
    "question": "When should the vaporizer be turned on to limit staff exposure to waste anesthetic gas?",
    "options": [
      "Before the patient is brought into the surgery suite",
      "While the mask or chamber is being fitted to the patient",
      "Only after the breathing circuit is connected to the patient",
      "As soon as the anesthesia machine is leak tested"
    ],
    "correctAnswer": "Only after the breathing circuit is connected to the patient",
    "explanation": "Turning the vaporizer on before the circuit is connected to the patient releases anesthetic gas directly into the room. Waiting until the patient is connected is one of the recommended safe handling practices.",
    "source": {
      "title": "Merck Veterinary Manual: Waste Anesthetic Gases as a Veterinary Workplace Hazard",
      "reference": "https://www.merckvetmanual.com/public-health/toxicological-hazards-in-the-veterinary-workplace/waste-anesthetic-gases-as-a-veterinary-workplace-hazard",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-anesthesia-003",
    "domain": "anesthesia",
    "question": "Which practice is recommended when filling an isoflurane vaporizer?",
    "options": [
      "Fill it in a well-ventilated area, ideally when the room is not in use",
      "Fill it during surgery so vapor is drawn into the scavenger",
      "Fill it with the oxygen flush valve open",
      "Fill it in a small closed room so vapor does not spread"
    ],
    "correctAnswer": "Fill it in a well-ventilated area, ideally when the room is not in use",
    "explanation": "Spills and vapor during filling are a source of exposure, so vaporizers should be filled in a well-ventilated area or under a hood, and at a time like the end of the day when fewer staff are present. A closed room concentrates the vapor rather than protecting staff.",
    "source": {
      "title": "Merck Veterinary Manual: Waste Anesthetic Gases as a Veterinary Workplace Hazard",
      "reference": "https://www.merckvetmanual.com/public-health/toxicological-hazards-in-the-veterinary-workplace/waste-anesthetic-gases-as-a-veterinary-workplace-hazard",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-anesthesia-004",
    "domain": "anesthesia",
    "question": "During isoflurane anesthesia, a dog develops tachycardia and a rapid, unexpected rise in end-tidal CO2 that does not improve with increased ventilation. Which condition should the technician alert the veterinarian to?",
    "options": [
      "Malignant hyperthermia",
      "Anesthetic overdose",
      "Hypothermia",
      "Hypoglycemia"
    ],
    "correctAnswer": "Malignant hyperthermia",
    "explanation": "In dogs, a rapid, unexpected increase in end-tidal CO2 with tachycardia is the earliest and most prominent sign of malignant hyperthermia; a rise in body temperature often comes later. An anesthetic overdose typically depresses heart rate and breathing rather than driving CO2 production up.",
    "source": {
      "title": "Merck Veterinary Manual: Malignant Hyperthermia in Animals",
      "reference": "https://www.merckvetmanual.com/metabolic-disorders/malignant-hyperthermia/malignant-hyperthermia-in-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-anesthesia-005",
    "domain": "anesthesia",
    "question": "Which drug is the specific treatment for malignant hyperthermia?",
    "options": [
      "Dantrolene",
      "Atropine",
      "Naloxone",
      "Acepromazine"
    ],
    "correctAnswer": "Dantrolene",
    "explanation": "Dantrolene, given IV, is the only specific treatment for malignant hyperthermia; it acts on skeletal muscle calcium release. Atropine treats bradycardia and naloxone reverses opioids, but neither addresses the underlying muscle problem.",
    "source": {
      "title": "Merck Veterinary Manual: Malignant Hyperthermia in Animals",
      "reference": "https://www.merckvetmanual.com/metabolic-disorders/malignant-hyperthermia/malignant-hyperthermia-in-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-anesthesia-006",
    "domain": "anesthesia",
    "question": "When malignant hyperthermia is suspected in an anesthetized patient, what is the first step with the anesthesia machine?",
    "options": [
      "Turn off and remove the vaporizer, then maximize fresh gas flow",
      "Increase the vaporizer setting to deepen anesthesia",
      "Switch from isoflurane to sevoflurane",
      "Close the pop-off valve to raise airway pressure"
    ],
    "correctAnswer": "Turn off and remove the vaporizer, then maximize fresh gas flow",
    "explanation": "All triggering agents must be stopped immediately: turn off and remove the vaporizer, then raise fresh gas flow to the maximum to flush anesthetic out of the circuit. Sevoflurane is also a halogenated inhalant and can trigger malignant hyperthermia, so switching agents does not help.",
    "source": {
      "title": "Merck Veterinary Manual: Malignant Hyperthermia in Animals",
      "reference": "https://www.merckvetmanual.com/metabolic-disorders/malignant-hyperthermia/malignant-hyperthermia-in-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-emergency-001",
    "domain": "emergency",
    "question": "What is the recommended chest compression rate during CPR in dogs and cats?",
    "options": [
      "60 to 80 compressions per minute",
      "80 to 100 compressions per minute",
      "100 to 120 compressions per minute",
      "140 to 160 compressions per minute"
    ],
    "correctAnswer": "100 to 120 compressions per minute",
    "explanation": "Chest compressions should be delivered at 100 to 120 per minute regardless of the patient's size. Slower rates do not generate enough blood flow, while much faster rates do not allow adequate chest recoil.",
    "source": {
      "title": "Merck Veterinary Manual: Cardiopulmonary Resuscitation of Small Animals",
      "reference": "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/specific-diagnostics-and-therapy/cardiopulmonary-resuscitation-of-small-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-emergency-002",
    "domain": "emergency",
    "question": "During CPR, how long should each cycle of uninterrupted chest compressions last before a brief pause to switch compressors and check the ECG?",
    "options": [
      "30 seconds",
      "1 minute",
      "2 minutes",
      "5 minutes"
    ],
    "correctAnswer": "2 minutes",
    "explanation": "Compressions are delivered in uninterrupted 2-minute cycles, because it takes about a minute of continuous compressions for perfusion pressure to build. The pause between cycles should be under 10 seconds.",
    "source": {
      "title": "Merck Veterinary Manual: Cardiopulmonary Resuscitation of Small Animals",
      "reference": "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/specific-diagnostics-and-therapy/cardiopulmonary-resuscitation-of-small-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-emergency-003",
    "domain": "emergency",
    "question": "During CPR on an intubated dog, how often should breaths be delivered?",
    "options": [
      "One breath every 2 seconds",
      "One breath every 6 seconds",
      "One breath every 15 seconds",
      "One breath every 30 seconds"
    ],
    "correctAnswer": "One breath every 6 seconds",
    "explanation": "Intubated patients are ventilated at about 10 breaths per minute, or one breath every 6 seconds, while compressions continue. Ventilating too fast causes hyperventilation, which can reduce blood flow to the brain and heart.",
    "source": {
      "title": "Merck Veterinary Manual: Cardiopulmonary Resuscitation of Small Animals",
      "reference": "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/specific-diagnostics-and-therapy/cardiopulmonary-resuscitation-of-small-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-emergency-004",
    "domain": "emergency",
    "question": "During CPR on an intubated cat, the capnograph shows an end-tidal CO2 of 8 mm Hg. What should the team check first?",
    "options": [
      "Endotracheal tube placement and the quality of chest compressions",
      "Whether the cat has achieved return of spontaneous circulation",
      "Whether the pulse oximeter probe has fallen off",
      "Whether the cat needs a second dose of atropine"
    ],
    "correctAnswer": "Endotracheal tube placement and the quality of chest compressions",
    "explanation": "A very low end-tidal CO2 during CPR suggests the tube may be in the esophagus or misplaced, or that compressions are ineffective; the goal during CPR is at least 18 mm Hg. A sudden, sustained rise in end-tidal CO2, not a low value, is what suggests return of spontaneous circulation.",
    "source": {
      "title": "Merck Veterinary Manual: Cardiopulmonary Resuscitation of Small Animals",
      "reference": "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/specific-diagnostics-and-therapy/cardiopulmonary-resuscitation-of-small-animals",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-animal-care-001",
    "domain": "animal-care",
    "question": "A hospitalized dog with an indwelling urinary catheter is being monitored. What is the normal range for urine output?",
    "options": [
      "0.1 to 0.5 mL/kg/hour",
      "1 to 2 mL/kg/hour",
      "5 to 10 mL/kg/hour",
      "10 to 20 mL/kg/hour"
    ],
    "correctAnswer": "1 to 2 mL/kg/hour",
    "explanation": "Normal urine output is 1 to 2 mL/kg/hour. Output below about 0.8 mL/kg/hour is considered oliguric and should be reported to the veterinarian.",
    "source": {
      "title": "Merck Veterinary Manual: Monitoring the Critically Ill Small Animal Using the Rule of 20",
      "reference": "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/monitoring-the-critically-ill-small-animal/monitoring-the-critically-ill-small-animal-using-the-rule-of-20",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  },
  {
    "id": "mvm-animal-care-002",
    "domain": "animal-care",
    "question": "When actively cooling a severely hyperthermic dog, why should the dog NOT be immersed in cold water?",
    "options": [
      "It causes peripheral vasoconstriction, which slows heat loss",
      "It lowers body temperature too slowly to be useful",
      "It increases the risk of aspiration pneumonia",
      "It interferes with accurate rectal temperature readings"
    ],
    "correctAnswer": "It causes peripheral vasoconstriction, which slows heat loss",
    "explanation": "Cold water immersion constricts peripheral blood vessels, which traps heat in the body core. Recommended cooling methods include IV fluids, wet towels with fans, and alcohol on the paw pads and axillary and inguinal areas.",
    "source": {
      "title": "Merck Veterinary Manual: Monitoring the Critically Ill Small Animal Using the Rule of 20",
      "reference": "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/monitoring-the-critically-ill-small-animal/monitoring-the-critically-ill-small-animal-using-the-rule-of-20",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:17:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key."
    }
  }
];
