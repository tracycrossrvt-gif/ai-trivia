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
  },
  {
    "id": "aaha-anesthesia-001",
    "domain": "anesthesia",
    "question": "A healthy 2.5-kg cat is being anesthetized for a spay. Which breathing circuit is generally recommended for a patient this size?",
    "options": [
      "Non-rebreathing circuit",
      "Adult rebreathing (circle) circuit",
      "Induction chamber",
      "Face mask without a breathing circuit"
    ],
    "correctAnswer": "Non-rebreathing circuit",
    "explanation": "Non-rebreathing circuits are generally used for cats and small dogs under about 3 to 5 kg, because they add little resistance and dead space. Adult rebreathing circuits are used for larger patients; an induction chamber and a mask alone do not secure the airway for maintenance.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-002",
    "domain": "anesthesia",
    "question": "When leak testing an anesthesia breathing circuit, the pop-off valve is closed and the circuit is filled to what pressure before checking that it holds steady?",
    "options": [
      "5 to 10 cm H2O",
      "20 to 30 cm H2O",
      "50 to 60 cm H2O",
      "80 to 100 cm H2O"
    ],
    "correctAnswer": "20 to 30 cm H2O",
    "explanation": "The circuit is pressurized to 20 to 30 cm H2O on the manometer with the pop-off valve closed and the oxygen turned off; the pressure should hold steady. This is done before every patient and after changing any part of the circuit.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-003",
    "domain": "anesthesia",
    "question": "After completing a leak test on the anesthesia machine, what must be done before connecting the patient?",
    "options": [
      "Open the pop-off valve",
      "Close the oxygen flowmeter completely",
      "Fill the reservoir bag using the oxygen flush valve",
      "Turn the vaporizer to its highest setting"
    ],
    "correctAnswer": "Open the pop-off valve",
    "explanation": "The pop-off valve is closed only for the leak test. Leaving it closed when the patient is connected lets pressure build in the circuit and the patient's lungs, which can cause barotrauma.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-004",
    "domain": "anesthesia",
    "question": "Which action should be avoided when a patient is connected to a non-rebreathing circuit?",
    "options": [
      "Using the oxygen flush valve",
      "Monitoring end-tidal CO2",
      "Running oxygen at 200 to 400 mL/kg/min",
      "Leak testing the circuit before use"
    ],
    "correctAnswer": "Using the oxygen flush valve",
    "explanation": "The oxygen flush valve should never be used with a non-rebreathing circuit, because it delivers a high-pressure surge of oxygen directly toward the patient's lungs. High oxygen flow rates of 200 to 400 mL/kg/min are normal for these circuits.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-005",
    "domain": "anesthesia",
    "question": "An anesthetized dog's end-tidal CO2 rises to 65 mm Hg. What should the technician discuss with the veterinarian?",
    "options": [
      "Starting positive pressure ventilation",
      "Increasing the vaporizer setting",
      "Lowering the oxygen flow rate",
      "No change, because this value is normal under anesthesia"
    ],
    "correctAnswer": "Starting positive pressure ventilation",
    "explanation": "End-tidal CO2 in an appropriately anesthetized patient is about 40 to 50 mm Hg. Above 60 mm Hg indicates significant hypoventilation, and positive pressure ventilation should be started. Deepening anesthesia would further depress breathing.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-006",
    "domain": "anesthesia",
    "question": "At what SpO2 value do the AAHA anesthesia guidelines begin to consider oxygenation a concern?",
    "options": [
      "Below 99%",
      "Below 95%",
      "Below 85%",
      "Below 75%"
    ],
    "correctAnswer": "Below 95%",
    "explanation": "Oxygen saturation below 95% is a concern, and below 90% is severe. Waiting until values fall much lower delays correcting the cause, such as a misplaced tube or a disconnected circuit.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-007",
    "domain": "anesthesia",
    "question": "An anesthetized dog has a mean arterial pressure of 52 mm Hg. Which strategy allows the inhalant anesthetic dose to be reduced and can help improve blood pressure?",
    "options": [
      "Adding an opioid or a local anesthetic block",
      "Increasing the vaporizer setting",
      "Switching to a non-rebreathing circuit",
      "Turning off the IV fluids"
    ],
    "correctAnswer": "Adding an opioid or a local anesthetic block",
    "explanation": "A mean arterial pressure below about 60 to 70 mm Hg is hypotension. Balanced anesthesia, which adds analgesia such as an opioid or a local block, lets the patient stay comfortable on a lower inhalant dose. A crystalloid bolus of 5 to 20 mL/kg may also be given.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-008",
    "domain": "anesthesia",
    "question": "When do most postoperative anesthetic deaths in dogs and cats occur?",
    "options": [
      "Within the first 3 hours after anesthesia",
      "12 to 24 hours after anesthesia",
      "2 to 3 days after anesthesia",
      "About one week after anesthesia"
    ],
    "correctAnswer": "Within the first 3 hours after anesthesia",
    "explanation": "Roughly half of canine and more than half of feline anesthetic deaths happen after surgery, mostly in the first 3 hours. Recovery should be monitored as closely as maintenance until the patient is alert, warm, and able to move.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-009",
    "domain": "anesthesia",
    "question": "In most dogs, when should the endotracheal tube be removed during recovery?",
    "options": [
      "When the patient is swallowing vigorously",
      "As soon as the vaporizer is turned off",
      "When the patient first twitches its ears",
      "Only after the patient can stand and walk"
    ],
    "correctAnswer": "When the patient is swallowing vigorously",
    "explanation": "Extubation is done when breathing and SpO2 are normal and the patient swallows vigorously, which shows it can protect its own airway. The cuff is deflated just before the tube is pulled.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-anesthesia-010",
    "domain": "anesthesia",
    "question": "What is the recommended initial intraoperative crystalloid fluid rate for a dog with normal heart and kidney function under inhalant anesthesia?",
    "options": [
      "1 mL/kg/hour",
      "5 mL/kg/hour",
      "20 mL/kg/hour",
      "40 mL/kg/hour"
    ],
    "correctAnswer": "5 mL/kg/hour",
    "explanation": "Current AAHA guidelines recommend starting at 5 mL/kg/hour for dogs and 3 to 5 mL/kg/hour for cats with normal heart and kidney function. Higher rates raise the risk of fluid overload and should be reserved for situations like acute blood loss.",
    "source": {
      "title": "AAHA 2024 Fluid Therapy Guidelines: Fluid Therapy and Anesthesia",
      "reference": "https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-4-fluid-therapy-and-anesthesia/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-dentistry-001",
    "domain": "dentistry",
    "question": "How is extubation modified after a dental procedure to help protect the airway from fluid and debris?",
    "options": [
      "Lower the nose slightly and leave the cuff slightly inflated while removing the tube",
      "Fully deflate the cuff and raise the nose before removing the tube",
      "Remove the tube while the patient is still deeply anesthetized",
      "Leave the tube in place until the patient can stand"
    ],
    "correctAnswer": "Lower the nose slightly and leave the cuff slightly inflated while removing the tube",
    "explanation": "After dental procedures, the nose is positioned slightly lower than the back of the head and the cuff is left slightly inflated so the tube sweeps fluid and debris out rather than letting it fall into the trachea.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-dentistry-002",
    "domain": "dentistry",
    "question": "Which hand instrument is used for subgingival scaling because its rounded heel and toe are less traumatic to the gingiva?",
    "options": [
      "Curette",
      "Sickle scaler",
      "Periodontal probe",
      "Extraction forceps"
    ],
    "correctAnswer": "Curette",
    "explanation": "Curettes have a rounded heel and toe, making them safer below the gumline. Sickle scalers have a sharp tip and are used above the gumline; a periodontal probe measures pockets rather than removing calculus.",
    "source": {
      "title": "AAHA 2019 Dental Care Guidelines: Essential Steps",
      "reference": "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/essential-steps/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-dentistry-003",
    "domain": "dentistry",
    "question": "Why do the AAHA dental guidelines advise against using rotary scalers?",
    "options": [
      "They excessively roughen the enamel",
      "They cannot remove calculus",
      "They require general anesthesia",
      "They are too slow for routine cleanings"
    ],
    "correctAnswer": "They excessively roughen the enamel",
    "explanation": "Rotary scalers roughen the tooth surface, which makes it easier for plaque to build up again. Ultrasonic scalers followed by hand instruments are recommended instead.",
    "source": {
      "title": "AAHA 2019 Dental Care Guidelines: Essential Steps",
      "reference": "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/essential-steps/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-dentistry-004",
    "domain": "dentistry",
    "question": "Which describes recommended technique for polishing teeth after scaling?",
    "options": [
      "A low-speed handpiece at no more than 3,000 rpm with fine prophy paste",
      "A high-speed handpiece with coarse pumice",
      "A low-speed handpiece with coarse pumice, held on each tooth for one minute",
      "Polishing is skipped when the ultrasonic scaler was used"
    ],
    "correctAnswer": "A low-speed handpiece at no more than 3,000 rpm with fine prophy paste",
    "explanation": "Polishing smooths the enamel scratches left by scaling. It uses a low-speed handpiece at no more than 3,000 rpm with fine paste; coarse grit roughens the surface, and excessive speed or pressure can overheat the tooth.",
    "source": {
      "title": "AAHA 2019 Dental Care Guidelines: Essential Steps",
      "reference": "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/essential-steps/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-dentistry-005",
    "domain": "dentistry",
    "question": "What is the normal periodontal probing depth in a medium-sized dog?",
    "options": [
      "No more than 2 to 3 mm",
      "4 to 5 mm",
      "6 to 8 mm",
      "More than 10 mm"
    ],
    "correctAnswer": "No more than 2 to 3 mm",
    "explanation": "Normal probing depth is no more than 2 to 3 mm in a medium-sized dog and about 1 mm in a medium-sized cat. Deeper measurements suggest periodontal pockets, and each tooth should be probed in at least six places.",
    "source": {
      "title": "AAHA 2019 Dental Care Guidelines: Essential Steps",
      "reference": "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/essential-steps/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-dentistry-006",
    "domain": "dentistry",
    "question": "A dog's dental radiographs show 25% to 50% attachment loss on several teeth. Which periodontal disease stage is this?",
    "options": [
      "PD1",
      "PD2",
      "PD3",
      "PD4"
    ],
    "correctAnswer": "PD3",
    "explanation": "PD1 is gingivitis without attachment loss, PD2 is under 25% attachment loss, PD3 is 25% to 50%, and PD4 is more than 50%.",
    "source": {
      "title": "AAHA 2019 Dental Care Guidelines: Essential Steps",
      "reference": "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/essential-steps/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-pharmacy-001",
    "domain": "pharmacy",
    "question": "A dog scheduled for anesthesia takes several daily medications. Which is commonly withheld on the day of anesthesia?",
    "options": [
      "Enalapril",
      "Pimobendan",
      "Levothyroxine",
      "Prednisone"
    ],
    "correctAnswer": "Enalapril",
    "explanation": "ACE inhibitors such as enalapril and benazepril are commonly held the day of anesthesia because they can worsen anesthetic hypotension. Thyroid, cardiac medications such as pimobendan, and steroids are generally continued, and steroids should never be stopped abruptly.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-pharmacy-002",
    "domain": "pharmacy",
    "question": "A diabetic dog has been fasted for anesthesia. What is generally recommended for its morning insulin?",
    "options": [
      "Give a reduced dose",
      "Give the full usual dose",
      "Give double the usual dose",
      "Give the full dose IV instead of subcutaneously"
    ],
    "correctAnswer": "Give a reduced dose",
    "explanation": "A fasted patient will not eat the meal its usual insulin dose is meant to cover, so a full dose risks hypoglycemia. A reduced dose is given, and blood glucose is monitored during anesthesia.",
    "source": {
      "title": "AAHA 2020 Anesthesia and Monitoring Guidelines for Dogs and Cats",
      "reference": "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-pharmacy-003",
    "domain": "pharmacy",
    "question": "A dog needs IV fluids at 60 mL/hour through a gravity drip set that delivers 15 drops/mL. What drip rate should be set?",
    "options": [
      "1 drop every second",
      "1 drop every 4 seconds",
      "1 drop every 15 seconds",
      "4 drops every second"
    ],
    "correctAnswer": "1 drop every 4 seconds",
    "explanation": "Drops per second = mL/hour x drops/mL / 3,600 seconds. Here, 60 x 15 = 900 drops per hour, and 900 / 3,600 = 0.25 drops per second, or 1 drop every 4 seconds.",
    "source": {
      "title": "AAHA 2024 Fluid Therapy Guidelines: Fluid Administration and Monitoring",
      "reference": "https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-8-fluid-administration-and-monitoring/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-pharmacy-004",
    "domain": "pharmacy",
    "question": "How many drops per mL does a standard microdrip administration set deliver?",
    "options": [
      "10 drops/mL",
      "15 drops/mL",
      "20 drops/mL",
      "60 drops/mL"
    ],
    "correctAnswer": "60 drops/mL",
    "explanation": "Microdrip sets deliver 60 drops/mL, which makes them useful for small patients and slow rates. The most commonly used macrodrip sets deliver 10 or 15 drops/mL.",
    "source": {
      "title": "AAHA 2024 Fluid Therapy Guidelines: Fluid Administration and Monitoring",
      "reference": "https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-8-fluid-administration-and-monitoring/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-animal-care-001",
    "domain": "animal-care",
    "question": "How often should a hospitalized patient's peripheral IV catheter be checked, according to the AAHA fluid therapy guidelines?",
    "options": [
      "At least twice a day, unwrapping the bandage fully",
      "Once every 3 days, when the catheter is replaced",
      "Only when the fluid pump alarms",
      "Once a day, by looking at the outside of the bandage"
    ],
    "correctAnswer": "At least twice a day, unwrapping the bandage fully",
    "explanation": "Catheters should be checked at least twice daily with the bandage fully unwrapped to look for swelling or thrombophlebitis. Routine replacement on a fixed schedule is not needed; catheters are replaced when there is a clinical reason.",
    "source": {
      "title": "AAHA 2024 Fluid Therapy Guidelines: Fluid Administration and Monitoring",
      "reference": "https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-8-fluid-administration-and-monitoring/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-animal-care-002",
    "domain": "animal-care",
    "question": "Which practice is recommended for flushing IV catheters?",
    "options": [
      "Use prefilled saline flush syringes",
      "Draw flushes from a shared fluid bag kept in the treatment area",
      "Draw flushes from the patient's running fluid bag through the injection port",
      "Reuse a capped flush syringe for the same patient over several days"
    ],
    "correctAnswer": "Use prefilled saline flush syringes",
    "explanation": "Prefilled syringes are preferred because drawing flushes from fluid bags increases the risk of contamination. Ports should also be wiped with isopropyl alcohol before connecting or disconnecting.",
    "source": {
      "title": "AAHA 2024 Fluid Therapy Guidelines: Fluid Administration and Monitoring",
      "reference": "https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-8-fluid-administration-and-monitoring/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  },
  {
    "id": "aaha-animal-care-003",
    "domain": "animal-care",
    "question": "A cat that has been on IV fluids for two days has gained weight and has an increased respiratory rate. It now also has chemosis and a clear nasal discharge. What do these signs most likely indicate?",
    "options": [
      "Fluid overload",
      "Dehydration",
      "Hypoglycemia",
      "Hyperthermia"
    ],
    "correctAnswer": "Fluid overload",
    "explanation": "Weight gain, a rising respiratory rate, chemosis, and clear nasal discharge in a patient receiving fluids are warning signs of fluid overload. Fluids should be stopped or slowed and the veterinarian alerted.",
    "source": {
      "title": "AAHA 2024 Fluid Therapy Guidelines: Fluid Therapy and Anesthesia",
      "reference": "https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-4-fluid-therapy-and-anesthesia/",
      "verified": true
    },
    "reviewStatus": "approved",
    "verification": {
      "method": "ai-crosscheck",
      "result": "pass",
      "checkedAt": "2026-11-07T00:49:24+00:00",
      "note": "Independent AI answered blind from the cited page and matched the answer key; flagged wording fixed."
    }
  }
];
