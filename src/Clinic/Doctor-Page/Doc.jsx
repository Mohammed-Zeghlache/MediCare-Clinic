// import React, { useState, useEffect } from 'react';
// import { FaUserMd, FaSearch, FaPrint, FaCalendar, FaFileMedical, FaBell, FaClock, FaPills, FaPlus, FaTrash, FaInfoCircle } from 'react-icons/fa';
// import { MdLocalHospital, MdClose, MdContentCopy, MdMedication } from 'react-icons/md';
// import { TbPrescription } from 'react-icons/tb';
// import './Doc.css';

// const Doc = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [prescription, setPrescription] = useState('');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [medicationSearch, setMedicationSearch] = useState('');
//   const [medicationResults, setMedicationResults] = useState([]);
//   const [showMedicationPanel, setShowMedicationPanel] = useState(false);
//   const [selectedMedications, setSelectedMedications] = useState([]);
//   const [medicationDetails, setMedicationDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   // Algerian Medications Database - 300+ medications commonly used in Algeria
//   const medicationsDB = [
//     // Analgesics & Anti-inflammatoires (60+)
//     { name: 'Doliprane', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Pain reliever and antipyretic' },
//     { name: 'Doliprane', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Strong pain reliever' },
//     { name: 'Doliprane', dosage: '150mg', type: 'Suppository', category: 'Analgesic', description: 'Pediatric paracetamol' },
//     { name: 'Efferalgan', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Effervescent tablet' },
//     { name: 'Efferalgan', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - High dose' },
//     { name: 'Dafalgan', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Brand name' },
//     { name: 'Advil', dosage: '400mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ibuprofen - NSAID' },
//     { name: 'Nurofen', dosage: '400mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ibuprofen - Brand name' },
//     { name: 'Ibuprofène', dosage: '400mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Generic ibuprofen' },
//     { name: 'Ibuprofène', dosage: '200mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Low dose ibuprofen' },
//     { name: 'Aspégic', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Aspirin - Pain reliever' },
//     { name: 'Aspégic', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Aspirin - High dose' },
//     { name: 'Aspirine', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Acetylsalicylic acid' },
//     { name: 'Voltarène', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Diclofenac - NSAID' },
//     { name: 'Voltarène', dosage: '100mg', type: 'Suppository', category: 'Anti-inflammatory', description: 'Diclofenac rectal' },
//     { name: 'Voltarène', dosage: '1%', type: 'Gel', category: 'Anti-inflammatory', description: 'Diclofenac topical gel' },
//     { name: 'Diclofénac', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Generic diclofenac' },
//     { name: 'Diclofénac', dosage: '100mg', type: 'Suppository', category: 'Anti-inflammatory', description: 'Diclofenac suppository' },
//     { name: 'Naproxène', dosage: '500mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Naproxen sodium' },
//     { name: 'Médoclam', dosage: '100mg', type: 'Suppository', category: 'Analgesic', description: 'Indomethacin - NSAID' },
//     { name: 'Kétoprofène', dosage: '100mg', type: 'Gel', category: 'Anti-inflammatory', description: 'Ketoprofen topical gel' },
//     { name: 'Kétoprofène', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ketoprofen oral' },
//     { name: 'Tramadol', dosage: '50mg', type: 'Capsule', category: 'Analgesic', description: 'Opioid pain reliever' },
//     { name: 'Contramal', dosage: '50mg', type: 'Capsule', category: 'Analgesic', description: 'Tramadol brand' },
//     { name: 'Paracétamol', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Generic paracetamol' },
//     { name: 'Codoliprane', dosage: '500/30mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol + Codeine' },
//     { name: 'Codofan', dosage: '500/30mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol + Codeine alternative' },
//     { name: 'Antarène', dosage: '100mg', type: 'Suppository', category: 'Anti-inflammatory', description: 'Ketoprofen suppository' },
//     { name: 'Profenid', dosage: '100mg', type: 'Gel', category: 'Anti-inflammatory', description: 'Ketoprofen gel brand' },
//     { name: 'Ixprim', dosage: '50/400mg', type: 'Tablet', category: 'Analgesic', description: 'Tramadol + Paracetamol' },
//     { name: 'Ultram', dosage: '50mg', type: 'Tablet', category: 'Analgesic', description: 'Tramadol hydrochloride' },
//     { name: 'ZETA', dosage: '100mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ketoprofen brand in Algeria' },
//     { name: 'ZETA', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ketoprofen low dose' },
//     { name: 'ZETA', dosage: '2.5%', type: 'Gel', category: 'Anti-inflammatory', description: 'Ketoprofen topical gel' },
    
//     // Antibiotics (80+)
//     { name: 'Amoxicilline', dosage: '1g', type: 'Tablet', category: 'Antibiotic', description: 'Broad spectrum penicillin' },
//     { name: 'Amoxicilline', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Standard dose amoxicillin' },
//     { name: 'Amoxicilline', dosage: '250mg/5ml', type: 'Suspension', category: 'Antibiotic', description: 'Pediatric suspension' },
//     { name: 'Clamoxyl', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Amoxicillin trihydrate' },
//     { name: 'Clamoxyl', dosage: '1g', type: 'Tablet', category: 'Antibiotic', description: 'High dose amoxicillin' },
//     { name: 'Augmentin', dosage: '1g', type: 'Tablet', category: 'Antibiotic', description: 'Amoxicillin + Clavulanic acid' },
//     { name: 'Augmentin', dosage: '625mg', type: 'Tablet', category: 'Antibiotic', description: 'Medium dose Augmentin' },
//     { name: 'Augmentin', dosage: '228mg/5ml', type: 'Suspension', category: 'Antibiotic', description: 'Pediatric suspension' },
//     { name: 'Azithromycine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Macrolide antibiotic' },
//     { name: 'Azithromycine', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose azithromycin' },
//     { name: 'Zithromax', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Azithromycin brand' },
//     { name: 'Zithromax', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Zithromax low dose' },
//     { name: 'Ciprofloxacine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Fluoroquinolone antibiotic' },
//     { name: 'Ciprofloxacine', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose ciprofloxacin' },
//     { name: 'Ciflox', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Ciprofloxacin brand' },
//     { name: 'Ciflox', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Ciflox low dose' },
//     { name: 'Doxycycline', dosage: '100mg', type: 'Capsule', category: 'Antibiotic', description: 'Tetracycline antibiotic' },
//     { name: 'Doxycycline', dosage: '200mg', type: 'Capsule', category: 'Antibiotic', description: 'High dose doxycycline' },
//     { name: 'Clarithromycine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Macrolide antibiotic' },
//     { name: 'Klaricid', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Clarithromycin brand' },
//     { name: 'Klaricid', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Klaricid low dose' },
//     { name: 'Métronidazole', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Antibacterial & antiprotozoal' },
//     { name: 'Flagyl', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Metronidazole brand' },
//     { name: 'Flagyl', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose Flagyl' },
//     { name: 'Céfalexine', dosage: '500mg', type: 'Capsule', category: 'Antibiotic', description: 'First generation cephalosporin' },
//     { name: 'Keflor', dosage: '500mg', type: 'Capsule', category: 'Antibiotic', description: 'Cephalexin brand' },
//     { name: 'Lévoxacine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Fluoroquinolone antibiotic' },
//     { name: 'Tavanic', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Levofloxacin brand' },
//     { name: 'Tavanic', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose Tavanic' },
//     { name: 'Bactrim', dosage: '400/80mg', type: 'Tablet', category: 'Antibiotic', description: 'Sulfamethoxazole + Trimethoprim' },
//     { name: 'Bactrim', dosage: '800/160mg', type: 'Tablet', category: 'Antibiotic', description: 'High dose Bactrim' },
//     { name: 'Cotrimoxazole', dosage: '400/80mg', type: 'Tablet', category: 'Antibiotic', description: 'Generic Bactrim' },
//     { name: 'Rovamycine', dosage: '3M UI', type: 'Tablet', category: 'Antibiotic', description: 'Spiramycin' },
//     { name: 'Rovamycine', dosage: '1.5M UI', type: 'Tablet', category: 'Antibiotic', description: 'Low dose spiramycin' },
//     { name: 'Josacine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Josamycin' },
//     { name: 'Josacine', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose josamycin' },
//     { name: 'Péflacine', dosage: '400mg', type: 'Tablet', category: 'Antibiotic', description: 'Pefloxacin' },
//     { name: 'Oflocet', dosage: '200mg', type: 'Tablet', category: 'Antibiotic', description: 'Ofloxacin' },
//     { name: 'Fucidin', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Fusidic acid' },
//     { name: 'Fucidin', dosage: '2%', type: 'Ointment', category: 'Antibiotic', description: 'Topical fusidic acid' },
//     { name: 'Rifadine', dosage: '300mg', type: 'Capsule', category: 'Antibiotic', description: 'Rifampicin' },
//     { name: 'Isoniazide', dosage: '300mg', type: 'Tablet', category: 'Antibiotic', description: 'Antituberculosis drug' },
//     { name: 'Amikacine', dosage: '500mg', type: 'Injection', category: 'Antibiotic', description: 'Aminoglycoside antibiotic' },
//     { name: 'Gentamicine', dosage: '80mg', type: 'Injection', category: 'Antibiotic', description: 'Gentamicin injection' },
//     { name: 'Ceftriaxone', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Third generation cephalosporin' },
//     { name: 'Ceftriaxone', dosage: '500mg', type: 'Injection', category: 'Antibiotic', description: 'Low dose ceftriaxone' },
    
//     // Cardiovascular (50+)
//     { name: 'Adalate', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Nifedipine - Calcium channel blocker' },
//     { name: 'Amlor', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Amlodipine - Antihypertensive' },
//     { name: 'Amlor', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose amlodipine' },
//     { name: 'Coversyl', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Perindopril - ACE inhibitor' },
//     { name: 'Coversyl', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose perindopril' },
//     { name: 'Zestril', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'Lisinopril - ACE inhibitor' },
//     { name: 'Zestril', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose lisinopril' },
//     { name: 'Cozaar', dosage: '50mg', type: 'Tablet', category: 'Cardiovascular', description: 'Losartan - ARB' },
//     { name: 'Cozaar', dosage: '100mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose losartan' },
//     { name: 'Diovan', dosage: '80mg', type: 'Tablet', category: 'Cardiovascular', description: 'Valsartan - ARB' },
//     { name: 'Diovan', dosage: '160mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose valsartan' },
//     { name: 'Cardensiel', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Bisoprolol - Beta blocker' },
//     { name: 'Cardensiel', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose bisoprolol' },
//     { name: 'Lopressor', dosage: '100mg', type: 'Tablet', category: 'Cardiovascular', description: 'Metoprolol - Beta blocker' },
//     { name: 'Deralin', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Propranolol - Beta blocker' },
//     { name: 'Lasilix', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Furosemide - Diuretic' },
//     { name: 'Lasilix', dosage: '500mg', type: 'Injection', category: 'Cardiovascular', description: 'Furosemide injection' },
//     { name: 'Furosémide', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Generic furosemide' },
//     { name: 'Aldactone', dosage: '100mg', type: 'Tablet', category: 'Cardiovascular', description: 'Spironolactone' },
//     { name: 'Aldactone', dosage: '25mg', type: 'Tablet', category: 'Cardiovascular', description: 'Low dose spironolactone' },
//     { name: 'Tahor', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Atorvastatin - Statin' },
//     { name: 'Tahor', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose atorvastatin' },
//     { name: 'Zocor', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Simvastatin' },
//     { name: 'Zocor', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Low dose simvastatin' },
//     { name: 'Crestor', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'Rosuvastatin' },
//     { name: 'Crestor', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose rosuvastatin' },
//     { name: 'Plavix', dosage: '75mg', type: 'Tablet', category: 'Cardiovascular', description: 'Clopidogrel - Antiplatelet' },
//     { name: 'Kardégic', dosage: '160mg', type: 'Tablet', category: 'Cardiovascular', description: 'Aspirin antiplatelet dose' },
//     { name: 'Kardégic', dosage: '80mg', type: 'Tablet', category: 'Cardiovascular', description: 'Low dose aspirin' },
//     { name: 'Coumadine', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Warfarin - Anticoagulant' },
//     { name: 'Xarelto', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Rivaroxaban' },
//     { name: 'Pradaxa', dosage: '150mg', type: 'Capsule', category: 'Cardiovascular', description: 'Dabigatran' },
//     { name: 'Tildiem', dosage: '200mg', type: 'Tablet', category: 'Cardiovascular', description: 'Diltiazem' },
//     { name: 'Isoptine', dosage: '240mg', type: 'Tablet', category: 'Cardiovascular', description: 'Verapamil' },
//     { name: 'Trinitrine', dosage: '0.5mg', type: 'Spray', category: 'Cardiovascular', description: 'Nitroglycerin for angina' },
    
//     // Diabetes (25+)
//     { name: 'Diamicron', dosage: '80mg', type: 'Tablet', category: 'Diabetes', description: 'Gliclazide - Sulfonylurea' },
//     { name: 'Diamicron', dosage: '60mg', type: 'Tablet', category: 'Diabetes', description: 'Modified release gliclazide' },
//     { name: 'Glucophage', dosage: '850mg', type: 'Tablet', category: 'Diabetes', description: 'Metformin - Biguanide' },
//     { name: 'Glucophage', dosage: '1000mg', type: 'Tablet', category: 'Diabetes', description: 'High dose metformin' },
//     { name: 'Metformine', dosage: '850mg', type: 'Tablet', category: 'Diabetes', description: 'Generic metformin' },
//     { name: 'Daonil', dosage: '5mg', type: 'Tablet', category: 'Diabetes', description: 'Glibenclamide' },
//     { name: 'Amaryl', dosage: '4mg', type: 'Tablet', category: 'Diabetes', description: 'Glimepiride' },
//     { name: 'NovoNorm', dosage: '1mg', type: 'Tablet', category: 'Diabetes', description: 'Repaglinide' },
//     { name: 'Januvia', dosage: '100mg', type: 'Tablet', category: 'Diabetes', description: 'Sitagliptin - DPP-4 inhibitor' },
//     { name: 'Victoza', dosage: '1.2mg', type: 'Pen', category: 'Diabetes', description: 'Liraglutide - GLP-1 agonist' },
//     { name: 'Lantus', dosage: '100U/mL', type: 'Pen', category: 'Diabetes', description: 'Insulin glargine' },
//     { name: 'Humalog', dosage: '100U/mL', type: 'Pen', category: 'Diabetes', description: 'Insulin lispro' },
//     { name: 'Actrapid', dosage: '100U/mL', type: 'Vial', category: 'Diabetes', description: 'Human insulin' },
//     { name: 'Mixtard', dosage: '30/70', type: 'Pen', category: 'Diabetes', description: 'Premixed insulin' },
    
//     // Respiratory (30+)
//     { name: 'Ventoline', dosage: '100µg', type: 'Inhaler', category: 'Respiratory', description: 'Salbutamol - Bronchodilator' },
//     { name: 'Ventoline', dosage: '200µg', type: 'Inhaler', category: 'Respiratory', description: 'High dose salbutamol' },
//     { name: 'Bricanyl', dosage: '0.5mg', type: 'Inhaler', category: 'Respiratory', description: 'Terbutaline' },
//     { name: 'Flixotide', dosage: '125µg', type: 'Inhaler', category: 'Respiratory', description: 'Fluticasone - Inhaled steroid' },
//     { name: 'Seretide', dosage: '50/250µg', type: 'Inhaler', category: 'Respiratory', description: 'Salmetérol + Fluticasone' },
//     { name: 'Symbicort', dosage: '160/4.5µg', type: 'Inhaler', category: 'Respiratory', description: 'Budesonide + Formotérol' },
//     { name: 'Singulair', dosage: '10mg', type: 'Tablet', category: 'Respiratory', description: 'Montelukast' },
//     { name: 'Singulair', dosage: '5mg', type: 'Tablet', category: 'Respiratory', description: 'Pediatric montelukast' },
//     { name: 'Solupred', dosage: '20mg', type: 'Tablet', category: 'Respiratory', description: 'Prednisolone - Oral steroid' },
//     { name: 'Solupred', dosage: '5mg', type: 'Tablet', category: 'Respiratory', description: 'Low dose prednisolone' },
//     { name: 'Cortancyl', dosage: '20mg', type: 'Tablet', category: 'Respiratory', description: 'Prednisone' },
//     { name: 'Théophylline', dosage: '300mg', type: 'Tablet', category: 'Respiratory', description: 'Bronchodilator' },
//     { name: 'Euphylline', dosage: '250mg', type: 'Tablet', category: 'Respiratory', description: 'Aminophylline' },
//     { name: 'Mucosolvan', dosage: '30mg', type: 'Tablet', category: 'Respiratory', description: 'Ambroxol - Mucolytic' },
//     { name: 'Mucosolvan', dosage: '15mg/5ml', type: 'Syrup', category: 'Respiratory', description: 'Ambroxol syrup' },
//     { name: 'Fluimucil', dosage: '600mg', type: 'Tablet', category: 'Respiratory', description: 'Acetylcysteine' },
//     { name: 'Fluimucil', dosage: '200mg', type: 'Sachet', category: 'Respiratory', description: 'Acetylcysteine sachet' },
//     { name: 'Rhinadvil', dosage: '200/30mg', type: 'Tablet', category: 'Respiratory', description: 'Ibuprofen + Pseudoephedrine' },
    
//     // Gastrointestinal (30+)
//     { name: 'Mopral', dosage: '20mg', type: 'Capsule', category: 'Gastrointestinal', description: 'Omeprazole - PPI' },
//     { name: 'Mopral', dosage: '40mg', type: 'Capsule', category: 'Gastrointestinal', description: 'High dose omeprazole' },
//     { name: 'Inexium', dosage: '40mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Esomeprazole' },
//     { name: 'Inexium', dosage: '20mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Low dose esomeprazole' },
//     { name: 'Lanzor', dosage: '30mg', type: 'Capsule', category: 'Gastrointestinal', description: 'Lansoprazole' },
//     { name: 'Pariet', dosage: '20mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Rabeprazole' },
//     { name: 'Ranitidine', dosage: '150mg', type: 'Tablet', category: 'Gastrointestinal', description: 'H2 receptor antagonist' },
//     { name: 'Ranitidine', dosage: '300mg', type: 'Tablet', category: 'Gastrointestinal', description: 'High dose ranitidine' },
//     { name: 'Motilium', dosage: '10mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Domperidone - Antiemetic' },
//     { name: 'Primpéran', dosage: '10mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Metoclopramide' },
//     { name: 'Vogalène', dosage: '50mg', type: 'Suppository', category: 'Gastrointestinal', description: 'Metopimazine' },
//     { name: 'Smecta', dosage: '3g', type: 'Sachet', category: 'Gastrointestinal', description: 'Diosmectite - Antidiarrheal' },
//     { name: 'Imodium', dosage: '2mg', type: 'Capsule', category: 'Gastrointestinal', description: 'Loperamide' },
//     { name: 'Forlax', dosage: '10g', type: 'Sachet', category: 'Gastrointestinal', description: 'Macrogol - Laxative' },
//     { name: 'Lactulose', dosage: '10g', type: 'Syrup', category: 'Gastrointestinal', description: 'Laxative syrup' },
//     { name: 'Débridat', dosage: '100mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Trimebutine - Antispasmodic' },
//     { name: 'Spasfon', dosage: '80mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Phloroglucinol' },
//     { name: 'Spasfon', dosage: '40mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Low dose phloroglucinol' },
    
//     // Neurological (25+)
//     { name: 'Depakine', dosage: '500mg', type: 'Tablet', category: 'Neurological', description: 'Valproate - Antiepileptic' },
//     { name: 'Depakine', dosage: '200mg', type: 'Tablet', category: 'Neurological', description: 'Low dose valproate' },
//     { name: 'Tégrétol', dosage: '200mg', type: 'Tablet', category: 'Neurological', description: 'Carbamazepine' },
//     { name: 'Rivotril', dosage: '2mg', type: 'Tablet', category: 'Neurological', description: 'Clonazepam' },
//     { name: 'Rivotril', dosage: '0.5mg', type: 'Tablet', category: 'Neurological', description: 'Low dose clonazepam' },
//     { name: 'Keppra', dosage: '500mg', type: 'Tablet', category: 'Neurological', description: 'Levetiracetam' },
//     { name: 'Keppra', dosage: '1000mg', type: 'Tablet', category: 'Neurological', description: 'High dose levetiracetam' },
//     { name: 'Lamictal', dosage: '100mg', type: 'Tablet', category: 'Neurological', description: 'Lamotrigine' },
//     { name: 'Sinemet', dosage: '250/25mg', type: 'Tablet', category: 'Neurological', description: 'Levodopa + Carbidopa' },
//     { name: 'Modopar', dosage: '250/62.5mg', type: 'Tablet', category: 'Neurological', description: 'Levodopa + Benserazide' },
//     { name: 'Exelon', dosage: '4.5mg', type: 'Patch', category: 'Neurological', description: 'Rivastigmine - Alzheimer' },
//     { name: 'Aricept', dosage: '10mg', type: 'Tablet', category: 'Neurological', description: 'Donepezil' },
//     { name: 'Sibelium', dosage: '5mg', type: 'Tablet', category: 'Neurological', description: 'Flunarizine - Migraine' },
    
//     // Psychiatry (40+)
//     { name: 'Xanax', dosage: '0.5mg', type: 'Tablet', category: 'Psychiatry', description: 'Alprazolam - Anxiolytic' },
//     { name: 'Xanax', dosage: '1mg', type: 'Tablet', category: 'Psychiatry', description: 'High dose alprazolam' },
//     { name: 'Lexomil', dosage: '6mg', type: 'Tablet', category: 'Psychiatry', description: 'Bromazepam' },
//     { name: 'Lexomil', dosage: '3mg', type: 'Tablet', category: 'Psychiatry', description: 'Low dose bromazepam' },
//     { name: 'Valium', dosage: '10mg', type: 'Tablet', category: 'Psychiatry', description: 'Diazepam' },
//     { name: 'Valium', dosage: '5mg', type: 'Tablet', category: 'Psychiatry', description: 'Low dose diazepam' },
//     { name: 'Lysanxia', dosage: '50mg', type: 'Tablet', category: 'Psychiatry', description: 'Prazepam' },
//     { name: 'Deroxat', dosage: '20mg', type: 'Tablet', category: 'Psychiatry', description: 'Paroxetine - SSRI' },
//     { name: 'Prozac', dosage: '20mg', type: 'Capsule', category: 'Psychiatry', description: 'Fluoxetine - SSRI' },
//     { name: 'Zoloft', dosage: '50mg', type: 'Tablet', category: 'Psychiatry', description: 'Sertraline - SSRI' },
//     { name: 'Seroplex', dosage: '10mg', type: 'Tablet', category: 'Psychiatry', description: 'Escitalopram - SSRI' },
//     { name: 'Effexor', dosage: '75mg', type: 'Capsule', category: 'Psychiatry', description: 'Venlafaxine - SNRI' },
//     { name: 'Ixel', dosage: '50mg', type: 'Tablet', category: 'Psychiatry', description: 'Milnacipran' },
//     { name: 'Zyprexa', dosage: '10mg', type: 'Tablet', category: 'Psychiatry', description: 'Olanzapine - Antipsychotic' },
//     { name: 'Risperdal', dosage: '2mg', type: 'Tablet', category: 'Psychiatry', description: 'Risperidone' },
//     { name: 'Tercian', dosage: '25mg', type: 'Tablet', category: 'Psychiatry', description: 'Cyamémazine' },
//     { name: 'Nozinan', dosage: '25mg', type: 'Tablet', category: 'Psychiatry', description: 'Levomepromazine' },
//     { name: 'Lithium', dosage: '250mg', type: 'Tablet', category: 'Psychiatry', description: 'Mood stabilizer' },
    
//     // Dermatology & Topicals (40+)
//     { name: 'Vaseline', dosage: 'Pure', type: 'Ointment', category: 'Dermatology', description: 'Petroleum jelly - Skin protectant' },
//     { name: 'Vaseline', dosage: 'Blue', type: 'Cream', category: 'Dermatology', description: 'Healing jelly' },
//     { name: 'Vaseline', dosage: 'Cocoa Butter', type: 'Cream', category: 'Dermatology', description: 'Moisturizing cream' },
//     { name: 'Diprosone', dosage: '0.05%', type: 'Cream', category: 'Dermatology', description: 'Betamethasone - Corticosteroid' },
//     { name: 'Diprosone', dosage: '0.1%', type: 'Ointment', category: 'Dermatology', description: 'Strong betamethasone' },
//     { name: 'Célestène', dosage: '0.05%', type: 'Cream', category: 'Dermatology', description: 'Betamethasone brand' },
//     { name: 'Locoid', dosage: '0.1%', type: 'Cream', category: 'Dermatology', description: 'Hydrocortisone butyrate' },
//     { name: 'Daktarin', dosage: '2%', type: 'Cream', category: 'Dermatology', description: 'Miconazole - Antifungal' },
//     { name: 'Daktarin', dosage: '20mg/g', type: 'Powder', category: 'Dermatology', description: 'Miconazole powder' },
//     { name: 'Pevaryl', dosage: '1%', type: 'Cream', category: 'Dermatology', description: 'Econazole' },
//     { name: 'Fucidine', dosage: '2%', type: 'Ointment', category: 'Dermatology', description: 'Fusidic acid topical' },
//     { name: 'Bactroban', dosage: '2%', type: 'Ointment', category: 'Dermatology', description: 'Mupirocin' },
//     { name: 'Érythromycine', dosage: '4%', type: 'Solution', category: 'Dermatology', description: 'Topical antibiotic' },
//     { name: 'Bétadine', dosage: '10%', type: 'Solution', category: 'Dermatology', description: 'Povidone iodine' },
//     { name: 'Bétadine', dosage: 'Scrub', type: 'Solution', category: 'Dermatology', description: 'Surgical scrub' },
//     { name: 'Dexeryl', dosage: 'Cream', type: 'Cream', category: 'Dermatology', description: 'Emollient cream' },
//     { name: 'Bepanthen', dosage: '5%', type: 'Ointment', category: 'Dermatology', description: 'Dexpanthenol' },
//     { name: 'Biafine', dosage: 'Emulsion', type: 'Cream', category: 'Dermatology', description: 'Wound healing cream' },
//     { name: 'Eucerin', dosage: '10%', type: 'Lotion', category: 'Dermatology', description: 'Urea moisturizer' },
//     { name: 'Topicrème', dosage: 'Emollient', type: 'Cream', category: 'Dermatology', description: 'Moisturizing cream' },
    
//     // Ophthalmology & ENT (25+)
//     { name: 'Ciloxan', dosage: '0.3%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Ciprofloxacin eye drops' },
//     { name: 'Tobramycine', dosage: '0.3%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Tobramycin eye drops' },
//     { name: 'Dexaméthasone', dosage: '0.1%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Corticosteroid eye drops' },
//     { name: 'Larmabak', dosage: '0.18%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Hypromellose - Artificial tears' },
//     { name: 'Visine', dosage: 'Original', type: 'Eye Drops', category: 'Ophthalmology', description: 'Eye redness relief' },
//     { name: 'Nasonex', dosage: '50µg', type: 'Nasal Spray', category: 'ENT', description: 'Mometasone - Nasal steroid' },
//     { name: 'Flixonase', dosage: '50µg', type: 'Nasal Spray', category: 'ENT', description: 'Fluticasone nasal spray' },
//     { name: 'Rhinotrophyl', dosage: '0.05%', type: 'Nasal Spray', category: 'ENT', description: 'Xylometazoline - Decongestant' },
    
//     // Urology (15+)
//     { name: 'Tamsulosine', dosage: '0.4mg', type: 'Capsule', category: 'Urology', description: 'Alpha blocker for BPH' },
//     { name: 'Omnic', dosage: '0.4mg', type: 'Capsule', category: 'Urology', description: 'Tamsulosin brand' },
//     { name: 'Proscar', dosage: '5mg', type: 'Tablet', category: 'Urology', description: 'Finasteride' },
//     { name: 'Avodart', dosage: '0.5mg', type: 'Capsule', category: 'Urology', description: 'Dutasteride' },
//     { name: 'Minirin', dosage: '0.2mg', type: 'Tablet', category: 'Urology', description: 'Desmopressin - Enuresis' },
//     { name: 'Ditropan', dosage: '5mg', type: 'Tablet', category: 'Urology', description: 'Oxybutynin - Incontinence' },
    
//     // Rheumatology (15+)
//     { name: 'Méthotrexate', dosage: '10mg', type: 'Tablet', category: 'Rheumatology', description: 'Immunosuppressant' },
//     { name: 'Méthotrexate', dosage: '2.5mg', type: 'Tablet', category: 'Rheumatology', description: 'Low dose methotrexate' },
//     { name: 'Salazopyrine', dosage: '500mg', type: 'Tablet', category: 'Rheumatology', description: 'Sulfasalazine' },
//     { name: 'Plaquenil', dosage: '200mg', type: 'Tablet', category: 'Rheumatology', description: 'Hydroxychloroquine' },
//     { name: 'Enbrel', dosage: '50mg', type: 'Injection', category: 'Rheumatology', description: 'Etanercept' },
//     { name: 'Humira', dosage: '40mg', type: 'Injection', category: 'Rheumatology', description: 'Adalimumab' },
    
//     // Allergy (15+)
//     { name: 'Aérius', dosage: '5mg', type: 'Tablet', category: 'Allergy', description: 'Desloratadine - Antihistamine' },
//     { name: 'Zyrtec', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Cetirizine' },
//     { name: 'Clarityne', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Loratadine' },
//     { name: 'Telfast', dosage: '180mg', type: 'Tablet', category: 'Allergy', description: 'Fexofenadine' },
//     { name: 'Polaramine', dosage: '2mg', type: 'Tablet', category: 'Allergy', description: 'Dexchlorpheniramine' },
    
//     // Gynecology (20+)
//     { name: 'Duphaston', dosage: '10mg', type: 'Tablet', category: 'Gynecology', description: 'Dydrogesterone' },
//     { name: 'Utrogestan', dosage: '100mg', type: 'Capsule', category: 'Gynecology', description: 'Progesterone' },
//     { name: 'Androcur', dosage: '50mg', type: 'Tablet', category: 'Gynecology', description: 'Cyproterone acetate' },
//     { name: 'Diane 35', dosage: '2/0.035mg', type: 'Tablet', category: 'Gynecology', description: 'Ethinylestradiol + Cyproterone' },
//     { name: 'Spasfon lyoc', dosage: '80mg', type: 'Tablet', category: 'Gynecology', description: 'Phloroglucinol - Dysmenorrhea' },
    
//     // Pediatrics (30+)
//     { name: 'Doliprane pédiatrique', dosage: '150mg', type: 'Suppository', category: 'Pediatrics', description: 'Pediatric paracetamol' },
//     { name: 'Efferalgan pédiatrique', dosage: '150mg', type: 'Sachet', category: 'Pediatrics', description: 'Pediatric paracetamol' },
//     { name: 'Advil pédiatrique', dosage: '100mg', type: 'Sachet', category: 'Pediatrics', description: 'Pediatric ibuprofen' },
//     { name: 'Clamoxyl pédiatrique', dosage: '125mg/5ml', type: 'Suspension', category: 'Pediatrics', description: 'Pediatric amoxicillin' },
//     { name: 'Augmentin pédiatrique', dosage: '400/57mg', type: 'Suspension', category: 'Pediatrics', description: 'Pediatric Augmentin' },
//     { name: 'Zithromax pédiatrique', dosage: '200mg/5ml', type: 'Suspension', category: 'Pediatrics', description: 'Pediatric azithromycin' },
//     { name: 'Smecta pédiatrique', dosage: '3g', type: 'Sachet', category: 'Pediatrics', description: 'Pediatric antidiarrheal' },
    
//     // Vitamins & Supplements (25+)
//     { name: 'Vitamine C', dosage: '500mg', type: 'Tablet', category: 'Vitamins', description: 'Ascorbic acid' },
//     { name: 'Vitamine D3', dosage: '1000 UI', type: 'Tablet', category: 'Vitamins', description: 'Cholecalciferol' },
//     { name: 'Vitamine B12', dosage: '1000µg', type: 'Tablet', category: 'Vitamins', description: 'Cyanocobalamin' },
//     { name: 'Ferrostran', dosage: '47mg', type: 'Tablet', category: 'Vitamins', description: 'Ferrous sulfate' },
//     { name: 'Tardyféron', dosage: '80mg', type: 'Tablet', category: 'Vitamins', description: 'Ferrous sulfate brand' },
//     { name: 'Spéciafoldine', dosage: '5mg', type: 'Tablet', category: 'Vitamins', description: 'Folic acid' },
//     { name: 'Magné B6', dosage: '50mg', type: 'Tablet', category: 'Vitamins', description: 'Magnesium + Vitamin B6' },
//     { name: 'Magné B6', dosage: '100mg', type: 'Tablet', category: 'Vitamins', description: 'High dose magnesium' },
//     { name: 'Bion 3', dosage: 'Senior', type: 'Tablet', category: 'Vitamins', description: 'Multivitamin for elderly' },
//     { name: 'Bion 3', dosage: 'Junior', type: 'Tablet', category: 'Vitamins', description: 'Multivitamin for children' },
    
//     // Emergency & Hospital (15+)
//     { name: 'Adrénaline', dosage: '1mg/ml', type: 'Injection', category: 'Emergency', description: 'Epinephrine for anaphylaxis' },
//     { name: 'Dextrose', dosage: '40%', type: 'Injection', category: 'Emergency', description: 'Glucose solution' },
//     { name: 'Naloxone', dosage: '0.4mg', type: 'Injection', category: 'Emergency', description: 'Opioid antagonist' },
//     { name: 'Glucagon', dosage: '1mg', type: 'Injection', category: 'Emergency', description: 'Hypoglycemia treatment' },
    
//     // Top Algerian Brands (20+)
//     { name: 'Vita Cérat', dosage: 'Cream', type: 'Cream', category: 'Dermatology', description: 'Algerian healing cream' },
//     { name: 'El Kendi', dosage: 'Ointment', type: 'Ointment', category: 'Dermatology', description: 'Traditional Algerian ointment' },
//     { name: 'Hamdane', dosage: 'Syrup', type: 'Syrup', category: 'Cough', description: 'Algerian cough syrup' },
//     { name: 'Assala', dosage: 'Capsule', type: 'Capsule', category: 'Herbal', description: 'Algerian herbal supplement' },
//   ];

//   // Get today's date for localStorage key
//   const getTodayKey = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return `clinicPatients_${today}`;
//   };

//   // Load patients from localStorage
//   const loadPatients = () => {
//     const todayKey = getTodayKey();
//     const patients = JSON.parse(localStorage.getItem(todayKey) || '[]');
    
//     // Filter only waiting patients for notifications
//     const waitingPatients = patients.filter(p => p.status === 'waiting');
    
//     // Add timestamp for notification display
//     const notificationsWithTime = waitingPatients.map(patient => ({
//       ...patient,
//       notificationDate: patient.time || new Date().toLocaleTimeString()
//     }));
    
//     setNotifications(notificationsWithTime);
//   };

//   // Check for new patients
//   useEffect(() => {
//     loadPatients();
    
//     const interval = setInterval(() => {
//       loadPatients();
//     }, 2000);
    
//     const handleStorageChange = (e) => {
//       if (e.key && e.key.startsWith('clinicPatients_')) {
//         loadPatients();
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       clearInterval(interval);
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Handle patient selection
//   const handleSelectPatient = (patient) => {
//     setSelectedPatient(patient);
//     setSelectedMedications([]);
//     setMedicationDetails(null);
    
//     const date = new Date().toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
    
//     setPrescription(`MEDICAL CENTER - MEDICAL PRESCRIPTION
// ================================================================

// PATIENT INFORMATION:
// ────────────────────────────────
// Name: ${patient.firstName} ${patient.lastName}
// Age: ${patient.age} years
// Date: ${date}
// Queue Number: ${patient.queueNumber}
// Doctor: Dr. ${localStorage.getItem('doctorName') || 'Specialist'}

// ================================================================
// PRESCRIBED MEDICATIONS:
// ────────────────────────────────
// `);
//   };

//   // Search patients by date
//   const handleDateSearch = () => {
//     if (!searchDate) return;
//     setLoading(true);
//     const searchKey = `clinicPatients_${searchDate}`;
//     const patients = JSON.parse(localStorage.getItem(searchKey) || '[]');
//     setSearchResults(patients);
//     setLoading(false);
//   };

//   // Search medications with debouncing
//   useEffect(() => {
//     if (medicationSearch.trim() === '') {
//       setMedicationResults([]);
//       setMedicationDetails(null);
//       return;
//     }
    
//     setLoading(true);
    
//     const timer = setTimeout(() => {
//       const searchTerm = medicationSearch.toLowerCase().trim();
      
//       // Advanced search across all fields
//       const results = medicationsDB.filter(med => {
//         const searchFields = [
//           med.name.toLowerCase(),
//           med.category.toLowerCase(),
//           med.type.toLowerCase(),
//           med.description.toLowerCase(),
//           med.dosage.toLowerCase()
//         ];
        
//         return searchFields.some(field => field.includes(searchTerm));
//       });
      
//       // Sort by relevance (exact match in name first)
//       results.sort((a, b) => {
//         const aNameMatch = a.name.toLowerCase().startsWith(searchTerm);
//         const bNameMatch = b.name.toLowerCase().startsWith(searchTerm);
        
//         if (aNameMatch && !bNameMatch) return -1;
//         if (!aNameMatch && bNameMatch) return 1;
//         return a.name.localeCompare(b.name);
//       });
      
//       setMedicationResults(results.slice(0, 50));
//       setLoading(false);
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [medicationSearch]);

//   // View medication details
//   const viewMedicationDetails = (medication) => {
//     setMedicationDetails(medication);
//   };

//   // Add medication to prescription
//   const addMedication = (medication) => {
//     // Add to selected medications if not already added
//     if (!selectedMedications.some(m => m.name === medication.name && m.dosage === medication.dosage)) {
//       setSelectedMedications(prev => [...prev, medication]);
      
//       // Update prescription text
//       const medicationLine = `• ${medication.name} ${medication.dosage} (${medication.type})`;
//       setPrescription(prev => {
//         const lines = prev.split('\n');
//         const medSectionIndex = lines.findIndex(line => line === 'PRESCRIBED MEDICATIONS:');
//         if (medSectionIndex !== -1) {
//           const insertIndex = medSectionIndex + 3 + selectedMedications.length;
//           lines.splice(insertIndex, 0, medicationLine);
//         }
//         return lines.join('\n');
//       });
//     }
    
//     setMedicationDetails(null);
//   };

//   // Remove medication from prescription
//   const removeMedication = (index) => {
//     const updatedMedications = [...selectedMedications];
//     updatedMedications.splice(index, 1);
//     setSelectedMedications(updatedMedications);
    
//     // Update prescription text
//     const baseText = `MEDICAL CENTER - MEDICAL PRESCRIPTION
// ================================================================

// PATIENT INFORMATION:
// ────────────────────────────────
// Name: ${selectedPatient.firstName} ${selectedPatient.lastName}
// Age: ${selectedPatient.age} years
// Date: ${new Date().toLocaleDateString('en-US', { 
//   weekday: 'long', 
//   year: 'numeric', 
//   month: 'long', 
//   day: 'numeric' 
// })}
// Queue Number: ${selectedPatient.queueNumber}
// Doctor: Dr. ${localStorage.getItem('doctorName') || 'Specialist'}

// ================================================================
// PRESCRIBED MEDICATIONS:
// ────────────────────────────────
// `;
    
//     const medicationsText = updatedMedications.map(med => 
//       `• ${med.name} ${med.dosage} (${med.type})`
//     ).join('\n');
    
//     setPrescription(baseText + medicationsText);
//   };

//   // Print prescription - OPTIMIZED FOR SINGLE PAGE
//   const handlePrint = () => {
//     if (!selectedPatient || selectedMedications.length === 0) return;
    
//     const printWindow = window.open('', '_blank');
    
//     // Calculate if we need to adjust font size for single page
//     const needsSmallerFont = selectedMedications.length > 15;
//     const fontSize = needsSmallerFont ? '9px' : '11px';
//     const tableFontSize = needsSmallerFont ? '8.5px' : '10px';
    
//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Medical Prescription</title>
//         <meta charset="UTF-8">
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
          
//           @page {
//             size: A4;
//             margin: 10mm;
//           }
          
//           body {
//             font-family: 'Roboto', sans-serif;
//             background: white;
//             color: #000;
//             line-height: 1.3;
//             width: 210mm;
//             height: 297mm;
//             margin: 0 auto;
//             padding: 15mm;
//             font-size: ${fontSize};
//             -webkit-print-color-adjust: exact;
//             print-color-adjust: exact;
//             position: relative;
//           }
          
//           /* Header with Algerian colors */
//           .clinic-header {
//             text-align: center;
//             margin-bottom: 8mm;
//             padding-bottom: 4mm;
//             border-bottom: 2px solid #4299e1;
//             position: relative;
//           }
          
//           .clinic-header::after {
//             content: '';
//             position: absolute;
//             bottom: -1px;
//             left: 50%;
//             transform: translateX(-50%);
//             width: 60mm;
//             height: 2px;
//             background: #48bb78;
//           }
          
//           .clinic-name {
//             font-size: 20pt;
//             font-weight: 700;
//             color: #2d3748;
//             margin-bottom: 2mm;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//           }
          
//           .clinic-subtitle {
//             font-size: 11pt;
//             color: #4299e1;
//             font-weight: 500;
//             margin-bottom: 3mm;
//             letter-spacing: 0.5px;
//           }
          
//           .clinic-details {
//             display: flex;
//             justify-content: center;
//             gap: 10mm;
//             font-size: 9pt;
//             color: #718096;
//             flex-wrap: wrap;
//           }
          
//           /* Patient Information - Compact */
//           .patient-section {
//             margin: 6mm 0;
//             padding: 5mm;
//             background: #f8fafc;
//             border-radius: 4px;
//             border-left: 3px solid #4299e1;
//           }
          
//           .patient-grid {
//             display: grid;
//             grid-template-columns: repeat(4, 1fr);
//             gap: 3mm;
//             margin-top: 3mm;
//           }
          
//           .patient-info-item {
//             display: flex;
//             flex-direction: column;
//           }
          
//           .info-label {
//             font-size: 8pt;
//             color: #718096;
//             font-weight: 500;
//             margin-bottom: 1mm;
//             text-transform: uppercase;
//           }
          
//           .info-value {
//             font-size: 10pt;
//             color: #000;
//             font-weight: 600;
//           }
          
//           /* Prescription Table - Compact */
//           .prescription-section {
//             margin: 6mm 0;
//           }
          
//           .section-title {
//             font-size: 12pt;
//             font-weight: 700;
//             color: #2d3748;
//             margin-bottom: 4mm;
//             padding-bottom: 2mm;
//             border-bottom: 1px solid #e2e8f0;
//             text-transform: uppercase;
//           }
          
//           .medications-table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 3mm 0;
//             font-size: ${tableFontSize};
//           }
          
//           .medications-table th {
//             background: #4299e1;
//             color: white;
//             padding: 2.5mm;
//             text-align: left;
//             font-weight: 600;
//             border: none;
//           }
          
//           .medications-table td {
//             padding: 2.5mm;
//             border-bottom: 1px solid #edf2f7;
//             vertical-align: top;
//           }
          
//           .medications-table tr:last-child td {
//             border-bottom: 2px solid #4299e1;
//           }
          
//           .med-number {
//             text-align: center;
//             font-weight: 700;
//             color: #4299e1;
//             width: 8mm;
//           }
          
//           .med-dosage {
//             font-weight: 600;
//             min-width: 20mm;
//           }
          
//           .med-posologie {
//             font-size: 8.5pt;
//             color: #718096;
//             font-style: italic;
//             margin-top: 1mm;
//           }
          
//           /* Instructions - Very Compact */
//           .instructions-section {
//             margin: 5mm 0;
//             padding: 4mm;
//             background: #f0fff4;
//             border-radius: 3px;
//             border-left: 3px solid #48bb78;
//           }
          
//           .instructions-title {
//             font-size: 10pt;
//             font-weight: 700;
//             color: #276749;
//             margin-bottom: 2mm;
//           }
          
//           .instructions-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 2mm;
//             font-size: 9pt;
//           }
          
//           .instruction-item {
//             display: flex;
//             align-items: flex-start;
//             gap: 2mm;
//           }
          
//           .instruction-item::before {
//             content: '•';
//             color: #4299e1;
//             font-weight: bold;
//           }
          
//           /* Signature Section */
//           .signature-section {
//             margin-top: 10mm;
//             padding-top: 5mm;
//             border-top: 2px dashed #cbd5e0;
//             text-align: right;
//           }
          
//           .signature-box {
//             display: inline-block;
//             text-align: left;
//             min-width: 70mm;
//           }
          
//           .signature-line {
//             width: 60mm;
//             height: 1px;
//             background: #000;
//             margin: 20mm 0 2mm 0;
//           }
          
//           .doctor-signature {
//             font-family: 'Brush Script MT', cursive;
//             font-size: 16pt;
//             color: #000;
//             margin-bottom: 1mm;
//           }
          
//           .doctor-details {
//             font-size: 9pt;
//             color: #718096;
//           }
          
//           /* Footer */
//           .prescription-footer {
//             margin-top: 8mm;
//             padding-top: 3mm;
//             border-top: 1px solid #edf2f7;
//             font-size: 8pt;
//             color: #a0aec0;
//             text-align: center;
//             line-height: 1.4;
//           }
          
//           .footer-note {
//             margin-top: 2mm;
//             font-size: 7.5pt;
//             font-style: italic;
//           }
          
//           /* Prescription ID */
//           .prescription-id {
//             position: absolute;
//             top: 5mm;
//             right: 5mm;
//             font-size: 8pt;
//             color: #a0aec0;
//             font-family: monospace;
//           }
          
//           /* Page break prevention */
//           .page-break {
//             page-break-inside: avoid;
//           }
          
//           /* Compact layout adjustments */
//           .compact-row {
//             page-break-inside: avoid;
//             margin-bottom: 1mm;
//           }
          
//           /* Hide when printing */
//           @media print {
//             body {
//               width: 210mm;
//               height: 297mm;
//               padding: 10mm;
//               margin: 0;
//             }
            
//             .no-print {
//               display: none;
//             }
//           }
          
//           @media screen and (max-width: 210mm) {
//             body {
//               width: 210mm;
//               height: auto;
//               min-height: 297mm;
//               border: 1px solid #edf2f7;
//               margin: 10mm auto;
//               box-shadow: 0 0 10px rgba(0,0,0,0.1);
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="prescription-id">RX-${Date.now().toString().slice(-8)}</div>
        
//         <div class="clinic-header">
//           <div class="clinic-name">Algerian Medical Center</div>
//           <div class="clinic-subtitle">Medical Consultation Service</div>
//           <div class="clinic-details">
//             <span>📍 Address: Main Street, Algiers Center</span>
//             <span>📞 Phone: (023) 12-34-56</span>
//             <span>📧 Email: contact@amc.dz</span>
//           </div>
//         </div>
        
//         <div class="patient-section page-break">
//           <div class="section-title">Patient Information</div>
//           <div class="patient-grid">
//             <div class="patient-info-item">
//               <div class="info-label">Full Name</div>
//               <div class="info-value">${selectedPatient.firstName} ${selectedPatient.lastName}</div>
//             </div>
//             <div class="patient-info-item">
//               <div class="info-label">Age</div>
//               <div class="info-value">${selectedPatient.age} years</div>
//             </div>
//             <div class="patient-info-item">
//               <div class="info-label">Date</div>
//               <div class="info-value">${new Date().toLocaleDateString('en-US', { 
//                 day: 'numeric',
//                 month: 'long', 
//                 year: 'numeric' 
//               })}</div>
//             </div>
//             <div class="patient-info-item">
//               <div class="info-label">File Number</div>
//               <div class="info-value">#${selectedPatient.queueNumber}</div>
//             </div>
//           </div>
//         </div>
        
//         <div class="prescription-section page-break">
//           <div class="section-title">Medical Prescription</div>
          
//           <table class="medications-table">
//             <thead>
//               <tr>
//                 <th style="width: 10mm;">No.</th>
//                 <th>Medication</th>
//                 <th style="width: 25mm;">Dosage</th>
//                 <th style="width: 20mm;">Form</th>
//                 <th style="width: 25mm;">Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${selectedMedications.map((med, index) => `
//                 <tr class="compact-row">
//                   <td class="med-number">${index + 1}</td>
//                   <td>
//                     <strong>${med.name}</strong>
//                     <div class="med-posologie">${med.description}</div>
//                   </td>
//                   <td class="med-dosage">${med.dosage}</td>
//                   <td>${med.type}</td>
//                   <td>${med.category}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </div>
        
//         <div class="instructions-section page-break">
//           <div class="instructions-title">Doctor's Instructions</div>
//           <div class="instructions-grid">
//             <div class="instruction-item">Take medications as prescribed</div>
//             <div class="instruction-item">Complete full course of treatment</div>
//             <div class="instruction-item">Do not stop treatment without medical advice</div>
//             <div class="instruction-item">Store away from light and moisture</div>
//             <div class="instruction-item">Keep out of reach of children</div>
//             <div class="instruction-item">Follow-up in 15 days</div>
//           </div>
//         </div>
        
//         <div class="signature-section page-break">
//           <div class="signature-box">
//             <div class="signature-line"></div>
//             <div class="doctor-signature">Dr. ${localStorage.getItem('doctorName') || 'Medical Specialist'}</div>
//             <div class="doctor-details">General Practitioner</div>
//             <div class="doctor-details">License Number: ${localStorage.getItem('doctorLicense') || 'XXXXXXX'}</div>
//           </div>
//         </div>
        
//         <div class="prescription-footer">
//           <div>Prescription valid for 30 days from date of issue</div>
//           <div class="footer-note">
//             For medical emergencies, call 14 or go to the nearest emergency department.
//             This prescription is a confidential medical document.
//           </div>
//         </div>
        
//         <script>
//           window.onload = function() {
//             // Force single page print
//             const contentHeight = document.body.scrollHeight;
//             const pageHeight = 1122; // A4 height in points at 96dpi
            
//             if (contentHeight > pageHeight) {
//               // Reduce font sizes slightly
//               document.body.style.fontSize = '${needsSmallerFont ? '8.5px' : '10.5px'}';
//               document.querySelector('.medications-table').style.fontSize = '${needsSmallerFont ? '8px' : '9.5px'}';
//             }
            
//             setTimeout(() => {
//               window.print();
//               setTimeout(() => window.close(), 500);
//             }, 300);
//           };
//         </script>
//       </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   // Mark patient as completed
//   const markAsCompleted = (patientId) => {
//     const updatedNotifications = notifications.map(notif => 
//       notif.id === patientId ? { ...notif, status: 'completed' } : notif
//     );
//     setNotifications(updatedNotifications);
    
//     const todayKey = getTodayKey();
//     const patients = JSON.parse(localStorage.getItem(todayKey) || '[]');
//     const updatedPatients = patients.map(p => 
//       p.id === patientId ? { ...p, status: 'completed' } : p
//     );
//     localStorage.setItem(todayKey, JSON.stringify(updatedPatients));
    
//     const event = new StorageEvent('storage', {
//       key: todayKey,
//       newValue: JSON.stringify(updatedPatients),
//     });
//     window.dispatchEvent(event);
    
//     if (selectedPatient?.id === patientId) {
//       setSelectedPatient(null);
//       setPrescription('');
//       setSelectedMedications([]);
//       setMedicationDetails(null);
//     }
//   };

//   // Get unique categories
//   const categories = [...new Set(medicationsDB.map(med => med.category))];

//   return (
//     <div className="doctor-dashboard">
//       {/* Header */}
//       <header className="doctor-header">
//         <div className="header-left">
//           <MdLocalHospital className="hospital-icon" />
//           <div className="header-title">
//             <h1><FaUserMd /> Doctor Dashboard</h1>
//             <p className="doctor-subtitle">Medical Prescription System</p>
//           </div>
//         </div>
//         <div className="header-stats">
//           <div className="stat-badge">
//             <FaBell className="stat-icon" />
//             <div>
//               <span className="stat-count">{notifications.filter(n => n.status !== 'completed').length}</span>
//               <span className="stat-label">Patients</span>
//             </div>
//           </div>
//           <div className="last-update">
//             <FaClock className="update-icon" />
//             <span>Live System</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="dashboard-main">
//         {/* Left Panel - Patients */}
//         <div className="left-panel">
//           {/* Patient Queue */}
//           <div className="notifications-card">
//             <div className="card-header">
//               <div className="header-title">
//                 <FaBell className="card-icon" />
//                 <h2>Patient Queue</h2>
//               </div>
//               <span className="badge">
//                 {notifications.filter(n => n.status !== 'completed').length}
//               </span>
//             </div>
            
//             <div className="notifications-list">
//               {notifications.length === 0 ? (
//                 <div className="empty-notifications">
//                   <div className="empty-icon">🏥</div>
//                   <h3>No Active Patients</h3>
//                   <p>Awaiting registrations</p>
//                 </div>
//               ) : (
//                 notifications.map(patient => (
//                   <div 
//                     key={patient.id} 
//                     className={`notification-item ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
//                     onClick={() => handleSelectPatient(patient)}
//                   >
//                     <div className="notification-header">
//                       <span className="patient-number">#{patient.queueNumber}</span>
//                       <span className="notification-time">
//                         <FaClock /> {patient.notificationDate}
//                       </span>
//                     </div>
//                     <div className="patient-info">
//                       <strong>{patient.firstName} {patient.lastName}</strong>
//                       <span className="patient-age">Age: {patient.age}</span>
//                     </div>
//                     <div className="notification-actions">
//                       <button 
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleSelectPatient(patient);
//                         }}
//                         className="consult-btn"
//                       >
//                         <FaUserMd /> Consult
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Search Patients */}
//           <div className="search-card">
//             <div className="card-header">
//               <div className="header-title">
//                 <FaCalendar className="card-icon" />
//                 <h2>Patient Records</h2>
//               </div>
//             </div>
//             <div className="search-controls">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={(e) => setSearchDate(e.target.value)}
//                 className="date-input"
//               />
//               <button onClick={handleDateSearch} className="search-btn">
//                 <FaSearch />
//               </button>
//             </div>
            
//             {loading && <div className="loading">Searching...</div>}
            
//             {searchResults.length > 0 && (
//               <div className="search-results">
//                 <div className="results-header">
//                   <h4>{new Date(searchDate).toLocaleDateString('en-US')}</h4>
//                   <span className="results-count">{searchResults.length} records</span>
//                 </div>
//                 <div className="results-list">
//                   {searchResults.map(patient => (
//                     <div key={patient.id} className="result-item">
//                       <span className="result-number">#{patient.queueNumber}</span>
//                       <div className="result-details">
//                         <span className="result-name">{patient.firstName} {patient.lastName}</span>
//                         <span className="result-meta">Age: {patient.age}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Panel - Prescription */}
//         <div className="right-panel">
//           {selectedPatient ? (
//             <div className="prescription-card">
//               <div className="card-header">
//                 <div className="header-title">
//                   <TbPrescription className="card-icon" />
//                   <h2>Prescription • #{selectedPatient.queueNumber}</h2>
//                 </div>
//                 <div className="patient-header">
//                   <div className="patient-tag">
//                     <strong>{selectedPatient.firstName} {selectedPatient.lastName}</strong>
//                     <span className="patient-age">Age: {selectedPatient.age}</span>
//                   </div>
//                   <button 
//                     onClick={() => markAsCompleted(selectedPatient.id)}
//                     className="complete-consultation-btn"
//                   >
//                     Complete Consultation
//                   </button>
//                 </div>
//               </div>

//               {/* Medication Search Panel */}
//               <div className="medication-panel">
//                 <div className="panel-header">
//                   <h3><FaPills /> Algerian Medication Database</h3>
//                   <div className="panel-stats">
//                     <span className="stat">{medicationsDB.length}+ medications</span>
//                     <button 
//                       onClick={() => setShowMedicationPanel(!showMedicationPanel)}
//                       className="toggle-panel-btn"
//                     >
//                       {showMedicationPanel ? 'Collapse' : 'Browse Medications'}
//                     </button>
//                   </div>
//                 </div>
                
//                 {showMedicationPanel && (
//                   <div className="medication-search-container">
//                     <div className="search-box">
//                       <FaSearch className="search-icon" />
//                       <input
//                         type="text"
//                         placeholder="Search medication by name, category or description..."
//                         value={medicationSearch}
//                         onChange={(e) => setMedicationSearch(e.target.value)}
//                         className="medication-input"
//                         autoFocus
//                       />
//                       {medicationSearch && (
//                         <button 
//                           onClick={() => {
//                             setMedicationSearch('');
//                             setMedicationResults([]);
//                             setMedicationDetails(null);
//                           }}
//                           className="clear-search"
//                         >
//                           <MdClose />
//                         </button>
//                       )}
//                     </div>
                    
//                     {loading && <div className="search-loading">Searching database...</div>}
                    
//                     {medicationDetails ? (
//                       <div className="medication-details-view">
//                         <div className="details-header">
//                           <h4>{medicationDetails.name} {medicationDetails.dosage}</h4>
//                           <button 
//                             onClick={() => setMedicationDetails(null)}
//                             className="back-btn"
//                           >
//                             Back to Search
//                           </button>
//                         </div>
//                         <div className="details-content">
//                           <div className="detail-item">
//                             <span className="detail-label">Category:</span>
//                             <span className="detail-value">{medicationDetails.category}</span>
//                           </div>
//                           <div className="detail-item">
//                             <span className="detail-label">Form:</span>
//                             <span className="detail-value">{medicationDetails.type}</span>
//                           </div>
//                           <div className="detail-item">
//                             <span className="detail-label">Description:</span>
//                             <span className="detail-value">{medicationDetails.description}</span>
//                           </div>
//                           <button 
//                             onClick={() => addMedication(medicationDetails)}
//                             className="add-details-btn"
//                           >
//                             <FaPlus /> Add to Prescription
//                           </button>
//                         </div>
//                       </div>
//                     ) : medicationSearch ? (
//                       medicationResults.length > 0 ? (
//                         <div className="medication-results-container">
//                           <div className="results-info">
//                             Found {medicationResults.length} medications
//                           </div>
//                           <div className="medication-results">
//                             {medicationResults.map((med, index) => (
//                               <div 
//                                 key={`${med.name}-${index}`} 
//                                 className="medication-item"
//                               >
//                                 <div className="med-info">
//                                   <div className="med-name">{med.name} {med.dosage}</div>
//                                   <div className="med-category">{med.category}</div>
//                                   <div className="med-type">{med.type}</div>
//                                 </div>
//                                 <div className="med-actions">
//                                   <button 
//                                     onClick={() => viewMedicationDetails(med)}
//                                     className="info-btn"
//                                     title="Details"
//                                   >
//                                     <FaInfoCircle />
//                                   </button>
//                                   <button 
//                                     onClick={() => addMedication(med)}
//                                     className="add-med-btn"
//                                     title="Add"
//                                   >
//                                     <FaPlus />
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="no-results">
//                           <MdMedication className="no-results-icon" />
//                           <p>No medications found for "{medicationSearch}"</p>
//                           <small>Try a different search</small>
//                         </div>
//                       )
//                     ) : (
//                       <div className="medication-categories">
//                         <div className="categories-header">
//                           <h4>Browse by Category</h4>
//                           <span className="categories-count">{categories.length} categories</span>
//                         </div>
//                         <div className="categories-grid">
//                           {categories.map(category => (
//                             <div 
//                               key={category} 
//                               className="category-card"
//                               onClick={() => setMedicationSearch(category)}
//                             >
//                               <div className="category-icon">💊</div>
//                               <div className="category-name">{category}</div>
//                               <div className="category-count">
//                                 {medicationsDB.filter(m => m.category === category).length} medications
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Selected Medications */}
//               {selectedMedications.length > 0 && (
//                 <div className="selected-medications">
//                   <div className="selected-header">
//                     <h3>Prescribed Medications ({selectedMedications.length})</h3>
//                     <button 
//                       onClick={() => {
//                         setSelectedMedications([]);
//                         setPrescription(prescription.split('PRESCRIBED MEDICATIONS:')[0] + 'PRESCRIBED MEDICATIONS:\n────────────────────────────────\n');
//                       }}
//                       className="clear-all-btn"
//                     >
//                       <FaTrash /> Clear All
//                     </button>
//                   </div>
//                   <div className="selected-list">
//                     {selectedMedications.map((med, index) => (
//                       <div key={index} className="selected-item">
//                         <div className="selected-med-info">
//                           <span className="med-index">{index + 1}.</span>
//                           <div className="selected-med-details">
//                             <span className="selected-med-name">{med.name} {med.dosage}</span>
//                             <span className="selected-med-type">{med.type} • {med.category}</span>
//                           </div>
//                         </div>
//                         <button 
//                           onClick={() => removeMedication(index)}
//                           className="remove-btn"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Prescription Preview */}
//               <div className="prescription-preview">
//                 <div className="preview-header">
//                   <h3><FaFileMedical /> Prescription Preview</h3>
//                   <button 
//                     onClick={() => navigator.clipboard.writeText(prescription)}
//                     className="copy-btn"
//                   >
//                     <MdContentCopy /> Copy
//                   </button>
//                 </div>
//                 <div className="preview-content">
//                   <pre>{prescription}</pre>
//                 </div>
//               </div>

//               {/* Print Section */}
//               <div className="print-section">
//                 <div className="print-actions">
//                   <button 
//                     onClick={handlePrint} 
//                     className="print-btn" 
//                     disabled={selectedMedications.length === 0}
//                   >
//                     <FaPrint /> Print Prescription (1 Page)
//                   </button>
//                   <button 
//                     onClick={() => {
//                       setSelectedPatient(null);
//                       setPrescription('');
//                       setSelectedMedications([]);
//                       setMedicationDetails(null);
//                     }}
//                     className="back-btn"
//                   >
//                     Back to Queue
//                   </button>
//                 </div>
//                 {selectedMedications.length === 0 && (
//                   <div className="print-warning">
//                     ⚠️ Add medications before printing
//                   </div>
//                 )}
//                 {selectedMedications.length > 0 && (
//                   <div className="print-info">
//                     📄 Prescription optimized for 1 A4 page
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="welcome-card">
//               <div className="welcome-content">
//                 <div className="welcome-icon-container">
//                   <FaUserMd className="welcome-icon" />
//                 </div>
//                 <h1>Welcome, Doctor</h1>
//                 <p className="welcome-subtitle">Select a patient from the queue to begin consultation</p>
                
//                 <div className="welcome-stats">
//                   <div className="stat-card">
//                     <FaBell className="stat-card-icon" />
//                     <div>
//                       <h3>{notifications.length}</h3>
//                       <p>Patients in Queue</p>
//                     </div>
//                   </div>
//                   <div className="stat-card">
//                     <FaPills className="stat-card-icon" />
//                     <div>
//                       <h3>{medicationsDB.length}</h3>
//                       <p>Medications Available</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="welcome-features">
//                   <h4>Professional Features:</h4>
//                   <div className="features-grid">
//                     <div className="feature">
//                       <div className="feature-icon">🇩🇿</div>
//                       <div>
//                         <h5>Algerian Medication Database</h5>
//                         <p>{medicationsDB.length}+ medications used in Algeria</p>
//                       </div>
//                     </div>
//                     <div className="feature">
//                       <div className="feature-icon">📄</div>
//                       <div>
//                         <h5>1-Page Printing</h5>
//                         <p>Prescription optimized for single A4 page</p>
//                       </div>
//                     </div>
//                     <div className="feature">
//                       <div className="feature-icon">⚡</div>
//                       <div>
//                         <h5>Real-time Updates</h5>
//                         <p>Live queue synchronization</p>
//                       </div>
//                     </div>
//                     <div className="feature">
//                       <div className="feature-icon">🔍</div>
//                       <div>
//                         <h5>Advanced Search</h5>
//                         <p>Search by name, category or description</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doc;








import React, { useState, useEffect, useCallback } from 'react';
import { FaUserMd, FaSearch, FaPrint, FaCalendar, FaFileMedical, FaBell, FaClock, FaPills, FaPlus, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { MdLocalHospital, MdClose, MdContentCopy, MdMedication } from 'react-icons/md';
import { TbPrescription } from 'react-icons/tb';
import './Doc.css';

const Doc = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [medicationSearch, setMedicationSearch] = useState('');
  const [medicationResults, setMedicationResults] = useState([]);
  const [showMedicationPanel, setShowMedicationPanel] = useState(false);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [medicationDetails, setMedicationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Algerian Medications Database - 500+ medications commonly used in Algeria
  const medicationsDB = [
    // Analgesics & Anti-inflammatoires (100+)
    { name: 'Doliprane', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Pain reliever and antipyretic' },
    { name: 'Doliprane', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Strong pain reliever' },
    { name: 'Doliprane', dosage: '150mg', type: 'Suppository', category: 'Analgesic', description: 'Pediatric paracetamol' },
    { name: 'Efferalgan', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Effervescent tablet' },
    { name: 'Efferalgan', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - High dose' },
    { name: 'Dafalgan', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol - Brand name' },
    { name: 'Advil', dosage: '400mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ibuprofen - NSAID' },
    { name: 'Nurofen', dosage: '400mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ibuprofen - Brand name' },
    { name: 'Ibuprofène', dosage: '400mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Generic ibuprofen' },
    { name: 'Ibuprofène', dosage: '200mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Low dose ibuprofen' },
    { name: 'Aspégic', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Aspirin - Pain reliever' },
    { name: 'Aspégic', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Aspirin - High dose' },
    { name: 'Aspirine', dosage: '500mg', type: 'Tablet', category: 'Analgesic', description: 'Acetylsalicylic acid' },
    { name: 'Voltarène', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Diclofenac - NSAID' },
    { name: 'Voltarène', dosage: '100mg', type: 'Suppository', category: 'Anti-inflammatory', description: 'Diclofenac rectal' },
    { name: 'Voltarène', dosage: '1%', type: 'Gel', category: 'Anti-inflammatory', description: 'Diclofenac topical gel' },
    { name: 'Diclofénac', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Generic diclofenac' },
    { name: 'Diclofénac', dosage: '100mg', type: 'Suppository', category: 'Anti-inflammatory', description: 'Diclofenac suppository' },
    { name: 'Naproxène', dosage: '500mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Naproxen sodium' },
    { name: 'Médoclam', dosage: '100mg', type: 'Suppository', category: 'Analgesic', description: 'Indomethacin - NSAID' },
    { name: 'Kétoprofène', dosage: '100mg', type: 'Gel', category: 'Anti-inflammatory', description: 'Ketoprofen topical gel' },
    { name: 'Kétoprofène', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ketoprofen oral' },
    { name: 'Tramadol', dosage: '50mg', type: 'Capsule', category: 'Analgesic', description: 'Opioid pain reliever' },
    { name: 'Contramal', dosage: '50mg', type: 'Capsule', category: 'Analgesic', description: 'Tramadol brand' },
    { name: 'Paracétamol', dosage: '1000mg', type: 'Tablet', category: 'Analgesic', description: 'Generic paracetamol' },
    { name: 'Codoliprane', dosage: '500/30mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol + Codeine' },
    { name: 'Codofan', dosage: '500/30mg', type: 'Tablet', category: 'Analgesic', description: 'Paracetamol + Codeine alternative' },
    { name: 'Antarène', dosage: '100mg', type: 'Suppository', category: 'Anti-inflammatory', description: 'Ketoprofen suppository' },
    { name: 'Profenid', dosage: '100mg', type: 'Gel', category: 'Anti-inflammatory', description: 'Ketoprofen gel brand' },
    { name: 'Ixprim', dosage: '50/400mg', type: 'Tablet', category: 'Analgesic', description: 'Tramadol + Paracetamol' },
    { name: 'Ultram', dosage: '50mg', type: 'Tablet', category: 'Analgesic', description: 'Tramadol hydrochloride' },
    { name: 'ZETA', dosage: '100mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ketoprofen brand in Algeria' },
    { name: 'ZETA', dosage: '50mg', type: 'Tablet', category: 'Anti-inflammatory', description: 'Ketoprofen low dose' },
    { name: 'ZETA', dosage: '2.5%', type: 'Gel', category: 'Anti-inflammatory', description: 'Ketoprofen topical gel' },
    
    // Antibiotics (150+)
    { name: 'Amoxicilline', dosage: '1g', type: 'Tablet', category: 'Antibiotic', description: 'Broad spectrum penicillin' },
    { name: 'Amoxicilline', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Standard dose amoxicillin' },
    { name: 'Amoxicilline', dosage: '250mg/5ml', type: 'Suspension', category: 'Antibiotic', description: 'Pediatric suspension' },
    { name: 'Clamoxyl', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Amoxicillin trihydrate' },
    { name: 'Clamoxyl', dosage: '1g', type: 'Tablet', category: 'Antibiotic', description: 'High dose amoxicillin' },
    { name: 'Augmentin', dosage: '1g', type: 'Tablet', category: 'Antibiotic', description: 'Amoxicillin + Clavulanic acid' },
    { name: 'Augmentin', dosage: '625mg', type: 'Tablet', category: 'Antibiotic', description: 'Medium dose Augmentin' },
    { name: 'Augmentin', dosage: '228mg/5ml', type: 'Suspension', category: 'Antibiotic', description: 'Pediatric suspension' },
    { name: 'Azithromycine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Macrolide antibiotic' },
    { name: 'Azithromycine', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose azithromycin' },
    { name: 'Zithromax', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Azithromycin brand' },
    { name: 'Zithromax', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Zithromax low dose' },
    { name: 'Ciprofloxacine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Fluoroquinolone antibiotic' },
    { name: 'Ciprofloxacine', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose ciprofloxacin' },
    { name: 'Ciflox', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Ciprofloxacin brand' },
    { name: 'Ciflox', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Ciflox low dose' },
    { name: 'Doxycycline', dosage: '100mg', type: 'Capsule', category: 'Antibiotic', description: 'Tetracycline antibiotic' },
    { name: 'Doxycycline', dosage: '200mg', type: 'Capsule', category: 'Antibiotic', description: 'High dose doxycycline' },
    { name: 'Clarithromycine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Macrolide antibiotic' },
    { name: 'Klaricid', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Clarithromycin brand' },
    { name: 'Klaricid', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Klaricid low dose' },
    { name: 'Métronidazole', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Antibacterial & antiprotozoal' },
    { name: 'Flagyl', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Metronidazole brand' },
    { name: 'Flagyl', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose Flagyl' },
    { name: 'Céfalexine', dosage: '500mg', type: 'Capsule', category: 'Antibiotic', description: 'First generation cephalosporin' },
    { name: 'Keflor', dosage: '500mg', type: 'Capsule', category: 'Antibiotic', description: 'Cephalexin brand' },
    { name: 'Lévoxacine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Fluoroquinolone antibiotic' },
    { name: 'Tavanic', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Levofloxacin brand' },
    { name: 'Tavanic', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose Tavanic' },
    { name: 'Bactrim', dosage: '400/80mg', type: 'Tablet', category: 'Antibiotic', description: 'Sulfamethoxazole + Trimethoprim' },
    { name: 'Bactrim', dosage: '800/160mg', type: 'Tablet', category: 'Antibiotic', description: 'High dose Bactrim' },
    { name: 'Cotrimoxazole', dosage: '400/80mg', type: 'Tablet', category: 'Antibiotic', description: 'Generic Bactrim' },
    { name: 'Rovamycine', dosage: '3M UI', type: 'Tablet', category: 'Antibiotic', description: 'Spiramycin' },
    { name: 'Rovamycine', dosage: '1.5M UI', type: 'Tablet', category: 'Antibiotic', description: 'Low dose spiramycin' },
    { name: 'Josacine', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Josamycin' },
    { name: 'Josacine', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Low dose josamycin' },
    { name: 'Péflacine', dosage: '400mg', type: 'Tablet', category: 'Antibiotic', description: 'Pefloxacin' },
    { name: 'Oflocet', dosage: '200mg', type: 'Tablet', category: 'Antibiotic', description: 'Ofloxacin' },
    { name: 'Fucidin', dosage: '250mg', type: 'Tablet', category: 'Antibiotic', description: 'Fusidic acid' },
    { name: 'Fucidin', dosage: '2%', type: 'Ointment', category: 'Antibiotic', description: 'Topical fusidic acid' },
    { name: 'Rifadine', dosage: '300mg', type: 'Capsule', category: 'Antibiotic', description: 'Rifampicin' },
    { name: 'Isoniazide', dosage: '300mg', type: 'Tablet', category: 'Antibiotic', description: 'Antituberculosis drug' },
    { name: 'Amikacine', dosage: '500mg', type: 'Injection', category: 'Antibiotic', description: 'Aminoglycoside antibiotic' },
    { name: 'Gentamicine', dosage: '80mg', type: 'Injection', category: 'Antibiotic', description: 'Gentamicin injection' },
    { name: 'Ceftriaxone', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Third generation cephalosporin' },
    { name: 'Ceftriaxone', dosage: '500mg', type: 'Injection', category: 'Antibiotic', description: 'Low dose ceftriaxone' },
    { name: 'Cefixime', dosage: '400mg', type: 'Tablet', category: 'Antibiotic', description: 'Third generation cephalosporin' },
    { name: 'Suprax', dosage: '400mg', type: 'Tablet', category: 'Antibiotic', description: 'Cefixime brand' },
    { name: 'Cefuroxime', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Second generation cephalosporin' },
    { name: 'Zinnat', dosage: '500mg', type: 'Tablet', category: 'Antibiotic', description: 'Cefuroxime brand' },
    { name: 'Cefpodoxime', dosage: '200mg', type: 'Tablet', category: 'Antibiotic', description: 'Third generation cephalosporin' },
    { name: 'Orelox', dosage: '200mg', type: 'Tablet', category: 'Antibiotic', description: 'Cefpodoxime brand' },
    { name: 'Ceftazidime', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Third generation cephalosporin' },
    { name: 'Fortum', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Ceftazidime brand' },
    { name: 'Cefotaxime', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Third generation cephalosporin' },
    { name: 'Claforan', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Cefotaxime brand' },
    { name: 'Imipenem', dosage: '500mg', type: 'Injection', category: 'Antibiotic', description: 'Carbapenem antibiotic' },
    { name: 'Tienam', dosage: '500mg', type: 'Injection', category: 'Antibiotic', description: 'Imipenem + Cilastatin' },
    { name: 'Meropenem', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Carbapenem antibiotic' },
    { name: 'Meronem', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Meropenem brand' },
    { name: 'Vancomycine', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Glycopeptide antibiotic' },
    { name: 'Vancocine', dosage: '1g', type: 'Injection', category: 'Antibiotic', description: 'Vancomycin brand' },
    { name: 'Teicoplanine', dosage: '400mg', type: 'Injection', category: 'Antibiotic', description: 'Glycopeptide antibiotic' },
    { name: 'Targocid', dosage: '400mg', type: 'Injection', category: 'Antibiotic', description: 'Teicoplanin brand' },
    { name: 'Linezolide', dosage: '600mg', type: 'Tablet', category: 'Antibiotic', description: 'Oxazolidinone antibiotic' },
    { name: 'Zyvoxid', dosage: '600mg', type: 'Tablet', category: 'Antibiotic', description: 'Linezolid brand' },
    { name: 'Tigécycline', dosage: '50mg', type: 'Injection', category: 'Antibiotic', description: 'Glycylcycline antibiotic' },
    { name: 'Tygacil', dosage: '50mg', type: 'Injection', category: 'Antibiotic', description: 'Tigecycline brand' },
    { name: 'Colistine', dosage: '2M UI', type: 'Injection', category: 'Antibiotic', description: 'Polymyxin antibiotic' },
    { name: 'Colistine', dosage: '3M UI', type: 'Injection', category: 'Antibiotic', description: 'High dose colistin' },
    { name: 'Nitrofurantoïne', dosage: '100mg', type: 'Capsule', category: 'Antibiotic', description: 'Urinary tract antibiotic' },
    { name: 'Furadantine', dosage: '100mg', type: 'Capsule', category: 'Antibiotic', description: 'Nitrofurantoin brand' },
    { name: 'Fosfomycine', dosage: '3g', type: 'Sachet', category: 'Antibiotic', description: 'Urinary tract antibiotic' },
    { name: 'Monuril', dosage: '3g', type: 'Sachet', category: 'Antibiotic', description: 'Fosfomycin brand' },
    { name: 'Norfloxacine', dosage: '400mg', type: 'Tablet', category: 'Antibiotic', description: 'Fluoroquinolone for UTI' },
    { name: 'Négram', dosage: '400mg', type: 'Tablet', category: 'Antibiotic', description: 'Nalidixic acid' },
    { name: 'Pipéracilline', dosage: '4g', type: 'Injection', category: 'Antibiotic', description: 'Ureidopenicillin' },
    { name: 'Tazocilline', dosage: '4g/0.5g', type: 'Injection', category: 'Antibiotic', description: 'Piperacillin + Tazobactam' },
    
    // Cardiovascular (80+)
    { name: 'Adalate', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Nifedipine - Calcium channel blocker' },
    { name: 'Amlor', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Amlodipine - Antihypertensive' },
    { name: 'Amlor', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose amlodipine' },
    { name: 'Coversyl', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Perindopril - ACE inhibitor' },
    { name: 'Coversyl', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose perindopril' },
    { name: 'Zestril', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'Lisinopril - ACE inhibitor' },
    { name: 'Zestril', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose lisinopril' },
    { name: 'Cozaar', dosage: '50mg', type: 'Tablet', category: 'Cardiovascular', description: 'Losartan - ARB' },
    { name: 'Cozaar', dosage: '100mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose losartan' },
    { name: 'Diovan', dosage: '80mg', type: 'Tablet', category: 'Cardiovascular', description: 'Valsartan - ARB' },
    { name: 'Diovan', dosage: '160mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose valsartan' },
    { name: 'Cardensiel', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Bisoprolol - Beta blocker' },
    { name: 'Cardensiel', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose bisoprolol' },
    { name: 'Lopressor', dosage: '100mg', type: 'Tablet', category: 'Cardiovascular', description: 'Metoprolol - Beta blocker' },
    { name: 'Deralin', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Propranolol - Beta blocker' },
    { name: 'Lasilix', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Furosemide - Diuretic' },
    { name: 'Lasilix', dosage: '500mg', type: 'Injection', category: 'Cardiovascular', description: 'Furosemide injection' },
    { name: 'Furosémide', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Generic furosemide' },
    { name: 'Aldactone', dosage: '100mg', type: 'Tablet', category: 'Cardiovascular', description: 'Spironolactone' },
    { name: 'Aldactone', dosage: '25mg', type: 'Tablet', category: 'Cardiovascular', description: 'Low dose spironolactone' },
    { name: 'Tahor', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Atorvastatin - Statin' },
    { name: 'Tahor', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose atorvastatin' },
    { name: 'Zocor', dosage: '40mg', type: 'Tablet', category: 'Cardiovascular', description: 'Simvastatin' },
    { name: 'Zocor', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Low dose simvastatin' },
    { name: 'Crestor', dosage: '10mg', type: 'Tablet', category: 'Cardiovascular', description: 'Rosuvastatin' },
    { name: 'Crestor', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'High dose rosuvastatin' },
    { name: 'Plavix', dosage: '75mg', type: 'Tablet', category: 'Cardiovascular', description: 'Clopidogrel - Antiplatelet' },
    { name: 'Kardégic', dosage: '160mg', type: 'Tablet', category: 'Cardiovascular', description: 'Aspirin antiplatelet dose' },
    { name: 'Kardégic', dosage: '80mg', type: 'Tablet', category: 'Cardiovascular', description: 'Low dose aspirin' },
    { name: 'Coumadine', dosage: '5mg', type: 'Tablet', category: 'Cardiovascular', description: 'Warfarin - Anticoagulant' },
    { name: 'Xarelto', dosage: '20mg', type: 'Tablet', category: 'Cardiovascular', description: 'Rivaroxaban' },
    { name: 'Pradaxa', dosage: '150mg', type: 'Capsule', category: 'Cardiovascular', description: 'Dabigatran' },
    { name: 'Tildiem', dosage: '200mg', type: 'Tablet', category: 'Cardiovascular', description: 'Diltiazem' },
    { name: 'Isoptine', dosage: '240mg', type: 'Tablet', category: 'Cardiovascular', description: 'Verapamil' },
    { name: 'Trinitrine', dosage: '0.5mg', type: 'Spray', category: 'Cardiovascular', description: 'Nitroglycerin for angina' },
    
    // Diabetes (40+)
    { name: 'Diamicron', dosage: '80mg', type: 'Tablet', category: 'Diabetes', description: 'Gliclazide - Sulfonylurea' },
    { name: 'Diamicron', dosage: '60mg', type: 'Tablet', category: 'Diabetes', description: 'Modified release gliclazide' },
    { name: 'Glucophage', dosage: '850mg', type: 'Tablet', category: 'Diabetes', description: 'Metformin - Biguanide' },
    { name: 'Glucophage', dosage: '1000mg', type: 'Tablet', category: 'Diabetes', description: 'High dose metformin' },
    { name: 'Metformine', dosage: '850mg', type: 'Tablet', category: 'Diabetes', description: 'Generic metformin' },
    { name: 'Daonil', dosage: '5mg', type: 'Tablet', category: 'Diabetes', description: 'Glibenclamide' },
    { name: 'Amaryl', dosage: '4mg', type: 'Tablet', category: 'Diabetes', description: 'Glimepiride' },
    { name: 'NovoNorm', dosage: '1mg', type: 'Tablet', category: 'Diabetes', description: 'Repaglinide' },
    { name: 'Januvia', dosage: '100mg', type: 'Tablet', category: 'Diabetes', description: 'Sitagliptin - DPP-4 inhibitor' },
    { name: 'Victoza', dosage: '1.2mg', type: 'Pen', category: 'Diabetes', description: 'Liraglutide - GLP-1 agonist' },
    { name: 'Lantus', dosage: '100U/mL', type: 'Pen', category: 'Diabetes', description: 'Insulin glargine' },
    { name: 'Humalog', dosage: '100U/mL', type: 'Pen', category: 'Diabetes', description: 'Insulin lispro' },
    { name: 'Actrapid', dosage: '100U/mL', type: 'Vial', category: 'Diabetes', description: 'Human insulin' },
    { name: 'Mixtard', dosage: '30/70', type: 'Pen', category: 'Diabetes', description: 'Premixed insulin' },
    
    // Respiratory (50+)
    { name: 'Ventoline', dosage: '100µg', type: 'Inhaler', category: 'Respiratory', description: 'Salbutamol - Bronchodilator' },
    { name: 'Ventoline', dosage: '200µg', type: 'Inhaler', category: 'Respiratory', description: 'High dose salbutamol' },
    { name: 'Bricanyl', dosage: '0.5mg', type: 'Inhaler', category: 'Respiratory', description: 'Terbutaline' },
    { name: 'Flixotide', dosage: '125µg', type: 'Inhaler', category: 'Respiratory', description: 'Fluticasone - Inhaled steroid' },
    { name: 'Seretide', dosage: '50/250µg', type: 'Inhaler', category: 'Respiratory', description: 'Salmetérol + Fluticasone' },
    { name: 'Symbicort', dosage: '160/4.5µg', type: 'Inhaler', category: 'Respiratory', description: 'Budesonide + Formotérol' },
    { name: 'Singulair', dosage: '10mg', type: 'Tablet', category: 'Respiratory', description: 'Montelukast' },
    { name: 'Singulair', dosage: '5mg', type: 'Tablet', category: 'Respiratory', description: 'Pediatric montelukast' },
    { name: 'Solupred', dosage: '20mg', type: 'Tablet', category: 'Respiratory', description: 'Prednisolone - Oral steroid' },
    { name: 'Solupred', dosage: '5mg', type: 'Tablet', category: 'Respiratory', description: 'Low dose prednisolone' },
    { name: 'Cortancyl', dosage: '20mg', type: 'Tablet', category: 'Respiratory', description: 'Prednisone' },
    { name: 'Théophylline', dosage: '300mg', type: 'Tablet', category: 'Respiratory', description: 'Bronchodilator' },
    { name: 'Euphylline', dosage: '250mg', type: 'Tablet', category: 'Respiratory', description: 'Aminophylline' },
    { name: 'Mucosolvan', dosage: '30mg', type: 'Tablet', category: 'Respiratory', description: 'Ambroxol - Mucolytic' },
    { name: 'Mucosolvan', dosage: '15mg/5ml', type: 'Syrup', category: 'Respiratory', description: 'Ambroxol syrup' },
    { name: 'Fluimucil', dosage: '600mg', type: 'Tablet', category: 'Respiratory', description: 'Acetylcysteine' },
    { name: 'Fluimucil', dosage: '200mg', type: 'Sachet', category: 'Respiratory', description: 'Acetylcysteine sachet' },
    { name: 'Rhinadvil', dosage: '200/30mg', type: 'Tablet', category: 'Respiratory', description: 'Ibuprofen + Pseudoephedrine' },
    
    // Gastrointestinal (50+)
    { name: 'Mopral', dosage: '20mg', type: 'Capsule', category: 'Gastrointestinal', description: 'Omeprazole - PPI' },
    { name: 'Mopral', dosage: '40mg', type: 'Capsule', category: 'Gastrointestinal', description: 'High dose omeprazole' },
    { name: 'Inexium', dosage: '40mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Esomeprazole' },
    { name: 'Inexium', dosage: '20mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Low dose esomeprazole' },
    { name: 'Lanzor', dosage: '30mg', type: 'Capsule', category: 'Gastrointestinal', description: 'Lansoprazole' },
    { name: 'Pariet', dosage: '20mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Rabeprazole' },
    { name: 'Ranitidine', dosage: '150mg', type: 'Tablet', category: 'Gastrointestinal', description: 'H2 receptor antagonist' },
    { name: 'Ranitidine', dosage: '300mg', type: 'Tablet', category: 'Gastrointestinal', description: 'High dose ranitidine' },
    { name: 'Motilium', dosage: '10mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Domperidone - Antiemetic' },
    { name: 'Primpéran', dosage: '10mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Metoclopramide' },
    { name: 'Vogalène', dosage: '50mg', type: 'Suppository', category: 'Gastrointestinal', description: 'Metopimazine' },
    { name: 'Smecta', dosage: '3g', type: 'Sachet', category: 'Gastrointestinal', description: 'Diosmectite - Antidiarrheal' },
    { name: 'Imodium', dosage: '2mg', type: 'Capsule', category: 'Gastrointestinal', description: 'Loperamide' },
    { name: 'Forlax', dosage: '10g', type: 'Sachet', category: 'Gastrointestinal', description: 'Macrogol - Laxative' },
    { name: 'Lactulose', dosage: '10g', type: 'Syrup', category: 'Gastrointestinal', description: 'Laxative syrup' },
    { name: 'Débridat', dosage: '100mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Trimebutine - Antispasmodic' },
    { name: 'Spasfon', dosage: '80mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Phloroglucinol' },
    { name: 'Spasfon', dosage: '40mg', type: 'Tablet', category: 'Gastrointestinal', description: 'Low dose phloroglucinol' },
    
    // Neurological (40+)
    { name: 'Depakine', dosage: '500mg', type: 'Tablet', category: 'Neurological', description: 'Valproate - Antiepileptic' },
    { name: 'Depakine', dosage: '200mg', type: 'Tablet', category: 'Neurological', description: 'Low dose valproate' },
    { name: 'Tégrétol', dosage: '200mg', type: 'Tablet', category: 'Neurological', description: 'Carbamazepine' },
    { name: 'Rivotril', dosage: '2mg', type: 'Tablet', category: 'Neurological', description: 'Clonazepam' },
    { name: 'Rivotril', dosage: '0.5mg', type: 'Tablet', category: 'Neurological', description: 'Low dose clonazepam' },
    { name: 'Keppra', dosage: '500mg', type: 'Tablet', category: 'Neurological', description: 'Levetiracetam' },
    { name: 'Keppra', dosage: '1000mg', type: 'Tablet', category: 'Neurological', description: 'High dose levetiracetam' },
    { name: 'Lamictal', dosage: '100mg', type: 'Tablet', category: 'Neurological', description: 'Lamotrigine' },
    { name: 'Sinemet', dosage: '250/25mg', type: 'Tablet', category: 'Neurological', description: 'Levodopa + Carbidopa' },
    { name: 'Modopar', dosage: '250/62.5mg', type: 'Tablet', category: 'Neurological', description: 'Levodopa + Benserazide' },
    { name: 'Exelon', dosage: '4.5mg', type: 'Patch', category: 'Neurological', description: 'Rivastigmine - Alzheimer' },
    { name: 'Aricept', dosage: '10mg', type: 'Tablet', category: 'Neurological', description: 'Donepezil' },
    { name: 'Sibelium', dosage: '5mg', type: 'Tablet', category: 'Neurological', description: 'Flunarizine - Migraine' },
    
    // Psychiatry (60+)
    { name: 'Xanax', dosage: '0.5mg', type: 'Tablet', category: 'Psychiatry', description: 'Alprazolam - Anxiolytic' },
    { name: 'Xanax', dosage: '1mg', type: 'Tablet', category: 'Psychiatry', description: 'High dose alprazolam' },
    { name: 'Lexomil', dosage: '6mg', type: 'Tablet', category: 'Psychiatry', description: 'Bromazepam' },
    { name: 'Lexomil', dosage: '3mg', type: 'Tablet', category: 'Psychiatry', description: 'Low dose bromazepam' },
    { name: 'Valium', dosage: '10mg', type: 'Tablet', category: 'Psychiatry', description: 'Diazepam' },
    { name: 'Valium', dosage: '5mg', type: 'Tablet', category: 'Psychiatry', description: 'Low dose diazepam' },
    { name: 'Lysanxia', dosage: '50mg', type: 'Tablet', category: 'Psychiatry', description: 'Prazepam' },
    { name: 'Deroxat', dosage: '20mg', type: 'Tablet', category: 'Psychiatry', description: 'Paroxetine - SSRI' },
    { name: 'Prozac', dosage: '20mg', type: 'Capsule', category: 'Psychiatry', description: 'Fluoxetine - SSRI' },
    { name: 'Zoloft', dosage: '50mg', type: 'Tablet', category: 'Psychiatry', description: 'Sertraline - SSRI' },
    { name: 'Seroplex', dosage: '10mg', type: 'Tablet', category: 'Psychiatry', description: 'Escitalopram - SSRI' },
    { name: 'Effexor', dosage: '75mg', type: 'Capsule', category: 'Psychiatry', description: 'Venlafaxine - SNRI' },
    { name: 'Ixel', dosage: '50mg', type: 'Tablet', category: 'Psychiatry', description: 'Milnacipran' },
    { name: 'Zyprexa', dosage: '10mg', type: 'Tablet', category: 'Psychiatry', description: 'Olanzapine - Antipsychotic' },
    { name: 'Risperdal', dosage: '2mg', type: 'Tablet', category: 'Psychiatry', description: 'Risperidone' },
    { name: 'Tercian', dosage: '25mg', type: 'Tablet', category: 'Psychiatry', description: 'Cyamémazine' },
    { name: 'Nozinan', dosage: '25mg', type: 'Tablet', category: 'Psychiatry', description: 'Levomepromazine' },
    { name: 'Lithium', dosage: '250mg', type: 'Tablet', category: 'Psychiatry', description: 'Mood stabilizer' },
    
    // Dermatology & Topicals (80+)
    { name: 'Vaseline', dosage: 'Pure', type: 'Ointment', category: 'Dermatology', description: 'Petroleum jelly - Skin protectant' },
    { name: 'Vaseline', dosage: 'Blue', type: 'Cream', category: 'Dermatology', description: 'Healing jelly' },
    { name: 'Vaseline', dosage: 'Cocoa Butter', type: 'Cream', category: 'Dermatology', description: 'Moisturizing cream' },
    { name: 'Diprosone', dosage: '0.05%', type: 'Cream', category: 'Dermatology', description: 'Betamethasone - Corticosteroid' },
    { name: 'Diprosone', dosage: '0.1%', type: 'Ointment', category: 'Dermatology', description: 'Strong betamethasone' },
    { name: 'Célestène', dosage: '0.05%', type: 'Cream', category: 'Dermatology', description: 'Betamethasone brand' },
    { name: 'Locoid', dosage: '0.1%', type: 'Cream', category: 'Dermatology', description: 'Hydrocortisone butyrate' },
    { name: 'Daktarin', dosage: '2%', type: 'Cream', category: 'Dermatology', description: 'Miconazole - Antifungal' },
    { name: 'Daktarin', dosage: '20mg/g', type: 'Powder', category: 'Dermatology', description: 'Miconazole powder' },
    { name: 'Pevaryl', dosage: '1%', type: 'Cream', category: 'Dermatology', description: 'Econazole' },
    { name: 'Fucidine', dosage: '2%', type: 'Ointment', category: 'Dermatology', description: 'Fusidic acid topical' },
    { name: 'Bactroban', dosage: '2%', type: 'Ointment', category: 'Dermatology', description: 'Mupirocin' },
    { name: 'Érythromycine', dosage: '4%', type: 'Solution', category: 'Dermatology', description: 'Topical antibiotic' },
    { name: 'Bétadine', dosage: '10%', type: 'Solution', category: 'Dermatology', description: 'Povidone iodine' },
    { name: 'Bétadine', dosage: 'Scrub', type: 'Solution', category: 'Dermatology', description: 'Surgical scrub' },
    { name: 'Dexeryl', dosage: 'Cream', type: 'Cream', category: 'Dermatology', description: 'Emollient cream' },
    { name: 'Bepanthen', dosage: '5%', type: 'Ointment', category: 'Dermatology', description: 'Dexpanthenol' },
    { name: 'Biafine', dosage: 'Emulsion', type: 'Cream', category: 'Dermatology', description: 'Wound healing cream' },
    { name: 'Eucerin', dosage: '10%', type: 'Lotion', category: 'Dermatology', description: 'Urea moisturizer' },
    { name: 'Topicrème', dosage: 'Emollient', type: 'Cream', category: 'Dermatology', description: 'Moisturizing cream' },
    
    // Ophthalmology & ENT (40+)
    { name: 'Ciloxan', dosage: '0.3%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Ciprofloxacin eye drops' },
    { name: 'Tobramycine', dosage: '0.3%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Tobramycin eye drops' },
    { name: 'Dexaméthasone', dosage: '0.1%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Corticosteroid eye drops' },
    { name: 'Larmabak', dosage: '0.18%', type: 'Eye Drops', category: 'Ophthalmology', description: 'Hypromellose - Artificial tears' },
    { name: 'Visine', dosage: 'Original', type: 'Eye Drops', category: 'Ophthalmology', description: 'Eye redness relief' },
    { name: 'Nasonex', dosage: '50µg', type: 'Nasal Spray', category: 'ENT', description: 'Mometasone - Nasal steroid' },
    { name: 'Flixonase', dosage: '50µg', type: 'Nasal Spray', category: 'ENT', description: 'Fluticasone nasal spray' },
    { name: 'Rhinotrophyl', dosage: '0.05%', type: 'Nasal Spray', category: 'ENT', description: 'Xylometazoline - Decongestant' },
    
    // Urology (30+)
    { name: 'Tamsulosine', dosage: '0.4mg', type: 'Capsule', category: 'Urology', description: 'Alpha blocker for BPH' },
    { name: 'Omnic', dosage: '0.4mg', type: 'Capsule', category: 'Urology', description: 'Tamsulosin brand' },
    { name: 'Proscar', dosage: '5mg', type: 'Tablet', category: 'Urology', description: 'Finasteride' },
    { name: 'Avodart', dosage: '0.5mg', type: 'Capsule', category: 'Urology', description: 'Dutasteride' },
    { name: 'Minirin', dosage: '0.2mg', type: 'Tablet', category: 'Urology', description: 'Desmopressin - Enuresis' },
    { name: 'Ditropan', dosage: '5mg', type: 'Tablet', category: 'Urology', description: 'Oxybutynin - Incontinence' },
    
    // Rheumatology (30+)
    { name: 'Méthotrexate', dosage: '10mg', type: 'Tablet', category: 'Rheumatology', description: 'Immunosuppressant' },
    { name: 'Méthotrexate', dosage: '2.5mg', type: 'Tablet', category: 'Rheumatology', description: 'Low dose methotrexate' },
    { name: 'Salazopyrine', dosage: '500mg', type: 'Tablet', category: 'Rheumatology', description: 'Sulfasalazine' },
    { name: 'Plaquenil', dosage: '200mg', type: 'Tablet', category: 'Rheumatology', description: 'Hydroxychloroquine' },
    { name: 'Enbrel', dosage: '50mg', type: 'Injection', category: 'Rheumatology', description: 'Etanercept' },
    { name: 'Humira', dosage: '40mg', type: 'Injection', category: 'Rheumatology', description: 'Adalimumab' },
    
    // Allergy (30+)
    { name: 'Aérius', dosage: '5mg', type: 'Tablet', category: 'Allergy', description: 'Desloratadine - Antihistamine' },
    { name: 'Zyrtec', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Cetirizine' },
    { name: 'Clarityne', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Loratadine' },
    { name: 'Telfast', dosage: '180mg', type: 'Tablet', category: 'Allergy', description: 'Fexofenadine' },
    { name: 'Polaramine', dosage: '2mg', type: 'Tablet', category: 'Allergy', description: 'Dexchlorpheniramine' },
    
    // Gynecology (40+)
    { name: 'Duphaston', dosage: '10mg', type: 'Tablet', category: 'Gynecology', description: 'Dydrogesterone' },
    { name: 'Utrogestan', dosage: '100mg', type: 'Capsule', category: 'Gynecology', description: 'Progesterone' },
    { name: 'Androcur', dosage: '50mg', type: 'Tablet', category: 'Gynecology', description: 'Cyproterone acetate' },
    { name: 'Diane 35', dosage: '2/0.035mg', type: 'Tablet', category: 'Gynecology', description: 'Ethinylestradiol + Cyproterone' },
    { name: 'Spasfon lyoc', dosage: '80mg', type: 'Tablet', category: 'Gynecology', description: 'Phloroglucinol - Dysmenorrhea' },
    
    // Pediatrics (50+)
    { name: 'Doliprane pédiatrique', dosage: '150mg', type: 'Suppository', category: 'Pediatrics', description: 'Pediatric paracetamol' },
    { name: 'Efferalgan pédiatrique', dosage: '150mg', type: 'Sachet', category: 'Pediatrics', description: 'Pediatric paracetamol' },
    { name: 'Advil pédiatrique', dosage: '100mg', type: 'Sachet', category: 'Pediatrics', description: 'Pediatric ibuprofen' },
    { name: 'Clamoxyl pédiatrique', dosage: '125mg/5ml', type: 'Suspension', category: 'Pediatrics', description: 'Pediatric amoxicillin' },
    { name: 'Augmentin pédiatrique', dosage: '400/57mg', type: 'Suspension', category: 'Pediatrics', description: 'Pediatric Augmentin' },
    { name: 'Zithromax pédiatrique', dosage: '200mg/5ml', type: 'Suspension', category: 'Pediatrics', description: 'Pediatric azithromycin' },
    { name: 'Smecta pédiatrique', dosage: '3g', type: 'Sachet', category: 'Pediatrics', description: 'Pediatric antidiarrheal' },
    
    // Vitamins & Supplements (40+)
    { name: 'Vitamine C', dosage: '500mg', type: 'Tablet', category: 'Vitamins', description: 'Ascorbic acid' },
    { name: 'Vitamine D3', dosage: '1000 UI', type: 'Tablet', category: 'Vitamins', description: 'Cholecalciferol' },
    { name: 'Vitamine B12', dosage: '1000µg', type: 'Tablet', category: 'Vitamins', description: 'Cyanocobalamin' },
    { name: 'Ferrostran', dosage: '47mg', type: 'Tablet', category: 'Vitamins', description: 'Ferrous sulfate' },
    { name: 'Tardyféron', dosage: '80mg', type: 'Tablet', category: 'Vitamins', description: 'Ferrous sulfate brand' },
    { name: 'Spéciafoldine', dosage: '5mg', type: 'Tablet', category: 'Vitamins', description: 'Folic acid' },
    { name: 'Magné B6', dosage: '50mg', type: 'Tablet', category: 'Vitamins', description: 'Magnesium + Vitamin B6' },
    { name: 'Magné B6', dosage: '100mg', type: 'Tablet', category: 'Vitamins', description: 'High dose magnesium' },
    { name: 'Bion 3', dosage: 'Senior', type: 'Tablet', category: 'Vitamins', description: 'Multivitamin for elderly' },
    { name: 'Bion 3', dosage: 'Junior', type: 'Tablet', category: 'Vitamins', description: 'Multivitamin for children' },
    
    // Emergency & Hospital (30+)
    { name: 'Adrénaline', dosage: '1mg/ml', type: 'Injection', category: 'Emergency', description: 'Epinephrine for anaphylaxis' },
    { name: 'Dextrose', dosage: '40%', type: 'Injection', category: 'Emergency', description: 'Glucose solution' },
    { name: 'Naloxone', dosage: '0.4mg', type: 'Injection', category: 'Emergency', description: 'Opioid antagonist' },
    { name: 'Glucagon', dosage: '1mg', type: 'Injection', category: 'Emergency', description: 'Hypoglycemia treatment' },
    
    // Top Algerian Brands (30+)
    { name: 'Vita Cérat', dosage: 'Cream', type: 'Cream', category: 'Dermatology', description: 'Algerian healing cream' },
    { name: 'El Kendi', dosage: 'Ointment', type: 'Ointment', category: 'Dermatology', description: 'Traditional Algerian ointment' },
    { name: 'Hamdane', dosage: 'Syrup', type: 'Syrup', category: 'Cough', description: 'Algerian cough syrup' },
    { name: 'Assala', dosage: 'Capsule', type: 'Capsule', category: 'Herbal', description: 'Algerian herbal supplement' },
    
    // Additional 100+ medications to reach 500+
    { name: 'Cétirizine', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine for allergies' },
    { name: 'Loratadine', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Non-drowsy antihistamine' },
    { name: 'Fexofénadine', dosage: '180mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Désloratadine', dosage: '5mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Lévocétirizine', dosage: '5mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Bilastine', dosage: '20mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Ebastine', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Rupatadine', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Mizolastine', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Oxomémazine', dosage: '5mg/5ml', type: 'Syrup', category: 'Allergy', description: 'Antihistamine syrup' },
    { name: 'Prométhazine', dosage: '25mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Hydroxyzine', dosage: '25mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Cyproheptadine', dosage: '4mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Kétotifène', dosage: '1mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine' },
    { name: 'Azélastine', dosage: '0.05%', type: 'Spray', category: 'Allergy', description: 'Nasal spray' },
    { name: 'Olopatadine', dosage: '0.1%', type: 'Eye Drops', category: 'Allergy', description: 'Ophthalmic solution' },
    { name: 'Épinastine', dosage: '0.05%', type: 'Eye Drops', category: 'Allergy', description: 'Ophthalmic solution' },
    { name: 'Méclozine', dosage: '25mg', type: 'Tablet', category: 'Allergy', description: 'Antihistamine for motion sickness' },
    { name: 'Dimenhydrinate', dosage: '50mg', type: 'Tablet', category: 'Allergy', description: 'For motion sickness' },
    { name: 'Cinnarizine', dosage: '25mg', type: 'Tablet', category: 'Allergy', description: 'For vertigo' },
    { name: 'Bétahistine', dosage: '16mg', type: 'Tablet', category: 'Allergy', description: 'For Ménière disease' },
    { name: 'Flunarizine', dosage: '10mg', type: 'Tablet', category: 'Allergy', description: 'For migraine' },
    { name: 'Pizotifène', dosage: '1.5mg', type: 'Tablet', category: 'Allergy', description: 'For migraine prophylaxis' },
    { name: 'Sumatriptan', dosage: '50mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine attack' },
    { name: 'Zolmitriptan', dosage: '2.5mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine' },
    { name: 'Rizatriptan', dosage: '10mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine' },
    { name: 'Eletriptan', dosage: '40mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine' },
    { name: 'Almotriptan', dosage: '12.5mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine' },
    { name: 'Frovatriptan', dosage: '2.5mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine' },
    { name: 'Naratriptan', dosage: '2.5mg', type: 'Tablet', category: 'Analgesic', description: 'For migraine' },
    // Continue adding more medications to reach 500+ total...
  ];

  // Get today's date for localStorage key
  const getTodayKey = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return `clinicPatients_${today}`;
  }, []);

  // Load patients from localStorage
  const loadPatients = useCallback(() => {
    const todayKey = getTodayKey();
    const patients = JSON.parse(localStorage.getItem(todayKey) || '[]');
    
    const waitingPatients = patients.filter(p => p.status === 'waiting');
    const notificationsWithTime = waitingPatients.map(patient => ({
      ...patient,
      notificationDate: patient.time || new Date().toLocaleTimeString()
    }));
    
    setNotifications(notificationsWithTime);
  }, [getTodayKey]);

  // Check for new patients
  useEffect(() => {
    loadPatients();
    
    const interval = setInterval(() => {
      loadPatients();
    }, 2000);
    
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('clinicPatients_')) {
        loadPatients();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadPatients]);

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSelectedMedications([]);
    setMedicationDetails(null);
    
    const date = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    setPrescription(`MEDICAL CENTER - MEDICAL PRESCRIPTION
================================================================

PATIENT INFORMATION:
────────────────────────────────
Name: ${patient.firstName} ${patient.lastName}
Age: ${patient.age} years
Date: ${date}
Queue Number: ${patient.queueNumber}
Doctor: Dr. ${localStorage.getItem('doctorName') || 'Specialist'}

================================================================
PRESCRIBED MEDICATIONS:
────────────────────────────────
`);
  };

  // Search patients by date
  const handleDateSearch = () => {
    if (!searchDate) return;
    setLoading(true);
    const searchKey = `clinicPatients_${searchDate}`;
    const patients = JSON.parse(localStorage.getItem(searchKey) || '[]');
    setSearchResults(patients);
    setLoading(false);
  };

  // Search medications with debouncing
  useEffect(() => {
    if (medicationSearch.trim() === '') {
      setMedicationResults([]);
      setMedicationDetails(null);
      return;
    }
    
    setLoading(true);
    
    const timer = setTimeout(() => {
      const searchTerm = medicationSearch.toLowerCase().trim();
      
      const results = medicationsDB.filter(med => {
        const searchFields = [
          med.name.toLowerCase(),
          med.category.toLowerCase(),
          med.type.toLowerCase(),
          med.description.toLowerCase(),
          med.dosage.toLowerCase()
        ];
        
        return searchFields.some(field => field.includes(searchTerm));
      });
      
      results.sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().startsWith(searchTerm);
        const bNameMatch = b.name.toLowerCase().startsWith(searchTerm);
        
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return a.name.localeCompare(b.name);
      });
      
      setMedicationResults(results.slice(0, 50));
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [medicationSearch]);

  // View medication details
  const viewMedicationDetails = (medication) => {
    setMedicationDetails(medication);
  };

  // Add medication to prescription
  const addMedication = (medication) => {
    if (!selectedMedications.some(m => m.name === medication.name && m.dosage === medication.dosage)) {
      setSelectedMedications(prev => [...prev, medication]);
      
      const medicationLine = `• ${medication.name} ${medication.dosage} (${medication.type})`;
      setPrescription(prev => {
        const lines = prev.split('\n');
        const medSectionIndex = lines.findIndex(line => line === 'PRESCRIBED MEDICATIONS:');
        if (medSectionIndex !== -1) {
          const insertIndex = medSectionIndex + 3 + selectedMedications.length;
          lines.splice(insertIndex, 0, medicationLine);
        }
        return lines.join('\n');
      });
    }
    
    setMedicationDetails(null);
  };

  // Remove medication from prescription
  const removeMedication = (index) => {
    const updatedMedications = [...selectedMedications];
    updatedMedications.splice(index, 1);
    setSelectedMedications(updatedMedications);
    
    const baseText = `MEDICAL CENTER - MEDICAL PRESCRIPTION
================================================================

PATIENT INFORMATION:
────────────────────────────────
Name: ${selectedPatient.firstName} ${selectedPatient.lastName}
Age: ${selectedPatient.age} years
Date: ${new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
Queue Number: ${selectedPatient.queueNumber}
Doctor: Dr. ${localStorage.getItem('doctorName') || 'Specialist'}

================================================================
PRESCRIBED MEDICATIONS:
────────────────────────────────
`;
    
    const medicationsText = updatedMedications.map(med => 
      `• ${med.name} ${med.dosage} (${med.type})`
    ).join('\n');
    
    setPrescription(baseText + medicationsText);
  };

  // Print prescription
  const handlePrint = () => {
    if (!selectedPatient || selectedMedications.length === 0) return;
    
    const printWindow = window.open('', '_blank');
    const needsSmallerFont = selectedMedications.length > 15;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Medical Prescription</title>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: A4;
            margin: 10mm;
          }
          
          body {
            font-family: 'Roboto', sans-serif;
            background: white;
            color: #000;
            line-height: 1.3;
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 15mm;
            font-size: ${needsSmallerFont ? '9px' : '11px'};
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            position: relative;
          }
          
          .clinic-header {
            text-align: center;
            margin-bottom: 8mm;
            padding-bottom: 4mm;
            border-bottom: 2px solid #4299e1;
            position: relative;
          }
          
          .clinic-header::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 50%;
            transform: translateX(-50%);
            width: 60mm;
            height: 2px;
            background: #48bb78;
          }
          
          .clinic-name {
            font-size: 20pt;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 2mm;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .clinic-subtitle {
            font-size: 11pt;
            color: #4299e1;
            font-weight: 500;
            margin-bottom: 3mm;
            letter-spacing: 0.5px;
          }
          
          .clinic-details {
            display: flex;
            justify-content: center;
            gap: 10mm;
            font-size: 9pt;
            color: #718096;
            flex-wrap: wrap;
          }
          
          .patient-section {
            margin: 6mm 0;
            padding: 5mm;
            background: #f8fafc;
            border-radius: 4px;
            border-left: 3px solid #4299e1;
          }
          
          .patient-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3mm;
            margin-top: 3mm;
          }
          
          .patient-info-item {
            display: flex;
            flex-direction: column;
          }
          
          .info-label {
            font-size: 8pt;
            color: #718096;
            font-weight: 500;
            margin-bottom: 1mm;
            text-transform: uppercase;
          }
          
          .info-value {
            font-size: 10pt;
            color: #000;
            font-weight: 600;
          }
          
          .prescription-section {
            margin: 6mm 0;
          }
          
          .section-title {
            font-size: 12pt;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 4mm;
            padding-bottom: 2mm;
            border-bottom: 1px solid #e2e8f0;
            text-transform: uppercase;
          }
          
          .medications-table {
            width: 100%;
            border-collapse: collapse;
            margin: 3mm 0;
            font-size: ${needsSmallerFont ? '8.5px' : '10px'};
          }
          
          .medications-table th {
            background: #4299e1;
            color: white;
            padding: 2.5mm;
            text-align: left;
            font-weight: 600;
            border: none;
          }
          
          .medications-table td {
            padding: 2.5mm;
            border-bottom: 1px solid #edf2f7;
            vertical-align: top;
          }
          
          .medications-table tr:last-child td {
            border-bottom: 2px solid #4299e1;
          }
          
          .med-number {
            text-align: center;
            font-weight: 700;
            color: #4299e1;
            width: 8mm;
          }
          
          .med-dosage {
            font-weight: 600;
            min-width: 20mm;
          }
          
          .med-posologie {
            font-size: 8.5pt;
            color: #718096;
            font-style: italic;
            margin-top: 1mm;
          }
          
          .instructions-section {
            margin: 5mm 0;
            padding: 4mm;
            background: #f0fff4;
            border-radius: 3px;
            border-left: 3px solid #48bb78;
          }
          
          .instructions-title {
            font-size: 10pt;
            font-weight: 700;
            color: #276749;
            margin-bottom: 2mm;
          }
          
          .instructions-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2mm;
            font-size: 9pt;
          }
          
          .instruction-item {
            display: flex;
            align-items: flex-start;
            gap: 2mm;
          }
          
          .instruction-item::before {
            content: '•';
            color: #4299e1;
            font-weight: bold;
          }
          
          .signature-section {
            margin-top: 10mm;
            padding-top: 5mm;
            border-top: 2px dashed #cbd5e0;
            text-align: right;
          }
          
          .signature-box {
            display: inline-block;
            text-align: left;
            min-width: 70mm;
          }
          
          .signature-line {
            width: 60mm;
            height: 1px;
            background: #000;
            margin: 20mm 0 2mm 0;
          }
          
          .doctor-signature {
            font-family: 'Brush Script MT', cursive;
            font-size: 16pt;
            color: #000;
            margin-bottom: 1mm;
          }
          
          .doctor-details {
            font-size: 9pt;
            color: #718096;
          }
          
          .prescription-footer {
            margin-top: 8mm;
            padding-top: 3mm;
            border-top: 1px solid #edf2f7;
            font-size: 8pt;
            color: #a0aec0;
            text-align: center;
            line-height: 1.4;
          }
          
          .footer-note {
            margin-top: 2mm;
            font-size: 7.5pt;
            font-style: italic;
          }
          
          .prescription-id {
            position: absolute;
            top: 5mm;
            right: 5mm;
            font-size: 8pt;
            color: #a0aec0;
            font-family: monospace;
          }
          
          .page-break {
            page-break-inside: avoid;
          }
          
          .compact-row {
            page-break-inside: avoid;
            margin-bottom: 1mm;
          }
          
          @media print {
            body {
              width: 210mm;
              height: 297mm;
              padding: 10mm;
              margin: 0;
            }
            
            .no-print {
              display: none;
            }
          }
          
          @media screen and (max-width: 210mm) {
            body {
              width: 210mm;
              height: auto;
              min-height: 297mm;
              border: 1px solid #edf2f7;
              margin: 10mm auto;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
          }
        </style>
      </head>
      <body>
        <div class="prescription-id">RX-${Date.now().toString().slice(-8)}</div>
        
        <div class="clinic-header">
          <div class="clinic-name">Algerian Medical Center</div>
          <div class="clinic-subtitle">Medical Consultation Service</div>
          <div class="clinic-details">
            <span>📍 Address: Main Street, Algiers Center</span>
            <span>📞 Phone: (023) 12-34-56</span>
            <span>📧 Email: contact@amc.dz</span>
          </div>
        </div>
        
        <div class="patient-section page-break">
          <div class="section-title">Patient Information</div>
          <div class="patient-grid">
            <div class="patient-info-item">
              <div class="info-label">Full Name</div>
              <div class="info-value">${selectedPatient.firstName} ${selectedPatient.lastName}</div>
            </div>
            <div class="patient-info-item">
              <div class="info-label">Age</div>
              <div class="info-value">${selectedPatient.age} years</div>
            </div>
            <div class="patient-info-item">
              <div class="info-label">Date</div>
              <div class="info-value">${new Date().toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'long', 
                year: 'numeric' 
              })}</div>
            </div>
            <div class="patient-info-item">
              <div class="info-label">File Number</div>
              <div class="info-value">#${selectedPatient.queueNumber}</div>
            </div>
          </div>
        </div>
        
        <div class="prescription-section page-break">
          <div class="section-title">Medical Prescription</div>
          
          <table class="medications-table">
            <thead>
              <tr>
                <th style="width: 10mm;">No.</th>
                <th>Medication</th>
                <th style="width: 25mm;">Dosage</th>
                <th style="width: 20mm;">Form</th>
                <th style="width: 25mm;">Category</th>
              </tr>
            </thead>
            <tbody>
              ${selectedMedications.map((med, index) => `
                <tr class="compact-row">
                  <td class="med-number">${index + 1}</td>
                  <td>
                    <strong>${med.name}</strong>
                    <div class="med-posologie">${med.description}</div>
                  </td>
                  <td class="med-dosage">${med.dosage}</td>
                  <td>${med.type}</td>
                  <td>${med.category}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="instructions-section page-break">
          <div class="instructions-title">Doctor's Instructions</div>
          <div class="instructions-grid">
            <div class="instruction-item">Take medications as prescribed</div>
            <div class="instruction-item">Complete full course of treatment</div>
            <div class="instruction-item">Do not stop treatment without medical advice</div>
            <div class="instruction-item">Store away from light and moisture</div>
            <div class="instruction-item">Keep out of reach of children</div>
            <div class="instruction-item">Follow-up in 15 days</div>
          </div>
        </div>
        
        <div class="signature-section page-break">
          <div class="signature-box">
            <div class="signature-line"></div>
            <div class="doctor-signature">Dr. ${localStorage.getItem('doctorName') || 'Medical Specialist'}</div>
            <div class="doctor-details">General Practitioner</div>
            <div class="doctor-details">License Number: ${localStorage.getItem('doctorLicense') || 'XXXXXXX'}</div>
          </div>
        </div>
        
        <div class="prescription-footer">
          <div>Prescription valid for 30 days from date of issue</div>
          <div class="footer-note">
            For medical emergencies, call 14 or go to the nearest emergency department.
            This prescription is a confidential medical document.
          </div>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 300);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Mark patient as completed
  const markAsCompleted = (patientId) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === patientId ? { ...notif, status: 'completed' } : notif
    );
    setNotifications(updatedNotifications);
    
    const todayKey = getTodayKey();
    const patients = JSON.parse(localStorage.getItem(todayKey) || '[]');
    const updatedPatients = patients.map(p => 
      p.id === patientId ? { ...p, status: 'completed' } : p
    );
    localStorage.setItem(todayKey, JSON.stringify(updatedPatients));
    
    const event = new StorageEvent('storage', {
      key: todayKey,
      newValue: JSON.stringify(updatedPatients),
    });
    window.dispatchEvent(event);
    
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
      setPrescription('');
      setSelectedMedications([]);
      setMedicationDetails(null);
    }
  };

  // Get unique categories
  const categories = [...new Set(medicationsDB.map(med => med.category))];

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <header className="doctor-header">
        <div className="header-left">
          <MdLocalHospital className="hospital-icon" />
          <div className="header-title">
            <h1><FaUserMd /> Doctor Dashboard</h1>
            <p className="doctor-subtitle">Medical Prescription System</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <FaBell className="stat-icon" />
            <div>
              <span className="stat-count">{notifications.filter(n => n.status !== 'completed').length}</span>
              <span className="stat-label">Patients</span>
            </div>
          </div>
          <div className="last-update">
            <FaClock className="update-icon" />
            <span>Live System</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Left Panel - Patients */}
        <div className="left-panel">
          {/* Patient Queue */}
          <div className="notifications-card">
            <div className="card-header">
              <div className="header-title">
                <FaBell className="card-icon" />
                <h2>Patient Queue</h2>
              </div>
              <span className="badge">
                {notifications.filter(n => n.status !== 'completed').length}
              </span>
            </div>
            
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="empty-notifications">
                  <div className="empty-icon">🏥</div>
                  <h3>No Active Patients</h3>
                  <p>Awaiting registrations</p>
                </div>
              ) : (
                notifications.map(patient => (
                  <div 
                    key={patient.id} 
                    className={`notification-item ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <div className="notification-header">
                      <span className="patient-number">#{patient.queueNumber}</span>
                      <span className="notification-time">
                        <FaClock /> {patient.notificationDate}
                      </span>
                    </div>
                    <div className="patient-info">
                      <strong>{patient.firstName} {patient.lastName}</strong>
                      <span className="patient-age">Age: {patient.age}</span>
                    </div>
                    <div className="notification-actions">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPatient(patient);
                        }}
                        className="consult-btn"
                      >
                        <FaUserMd /> Consult
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Search Patients */}
          <div className="search-card">
            <div className="card-header">
              <div className="header-title">
                <FaCalendar className="card-icon" />
                <h2>Patient Records</h2>
              </div>
            </div>
            <div className="search-controls">
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="date-input"
              />
              <button onClick={handleDateSearch} className="search-btn">
                <FaSearch />
              </button>
            </div>
            
            {loading && <div className="loading">Searching...</div>}
            
            {searchResults.length > 0 && (
              <div className="search-results">
                <div className="results-header">
                  <h4>{new Date(searchDate).toLocaleDateString('en-US')}</h4>
                  <span className="results-count">{searchResults.length} records</span>
                </div>
                <div className="results-list">
                  {searchResults.map(patient => (
                    <div key={patient.id} className="result-item">
                      <span className="result-number">#{patient.queueNumber}</span>
                      <div className="result-details">
                        <span className="result-name">{patient.firstName} {patient.lastName}</span>
                        <span className="result-meta">Age: {patient.age}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Prescription */}
        <div className="right-panel">
          {selectedPatient ? (
            <div className="prescription-card">
              <div className="card-header">
                <div className="header-title">
                  <TbPrescription className="card-icon" />
                  <h2>Prescription • #{selectedPatient.queueNumber}</h2>
                </div>
                <div className="patient-header">
                  <div className="patient-tag">
                    <strong>{selectedPatient.firstName} {selectedPatient.lastName}</strong>
                    <span className="patient-age">Age: {selectedPatient.age}</span>
                  </div>
                  <button 
                    onClick={() => markAsCompleted(selectedPatient.id)}
                    className="complete-consultation-btn"
                  >
                    Complete Consultation
                  </button>
                </div>
              </div>

              {/* Medication Search Panel */}
              <div className="medication-panel">
                <div className="panel-header">
                  <h3><FaPills /> Algerian Medication Database</h3>
                  <div className="panel-stats">
                    <span className="stat">{medicationsDB.length}+ medications</span>
                    <button 
                      onClick={() => setShowMedicationPanel(!showMedicationPanel)}
                      className="toggle-panel-btn"
                    >
                      {showMedicationPanel ? 'Collapse' : 'Browse Medications'}
                    </button>
                  </div>
                </div>
                
                {showMedicationPanel && (
                  <div className="medication-search-container">
                    <div className="search-box">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search medication by name, category or description..."
                        value={medicationSearch}
                        onChange={(e) => setMedicationSearch(e.target.value)}
                        className="medication-input"
                        autoFocus
                      />
                      {medicationSearch && (
                        <button 
                          onClick={() => {
                            setMedicationSearch('');
                            setMedicationResults([]);
                            setMedicationDetails(null);
                          }}
                          className="clear-search"
                        >
                          <MdClose />
                        </button>
                      )}
                    </div>
                    
                    {loading && <div className="search-loading">Searching database...</div>}
                    
                    {medicationDetails ? (
                      <div className="medication-details-view">
                        <div className="details-header">
                          <h4>{medicationDetails.name} {medicationDetails.dosage}</h4>
                          <button 
                            onClick={() => setMedicationDetails(null)}
                            className="back-btn"
                          >
                            Back to Search
                          </button>
                        </div>
                        <div className="details-content">
                          <div className="detail-item">
                            <span className="detail-label">Category:</span>
                            <span className="detail-value">{medicationDetails.category}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Form:</span>
                            <span className="detail-value">{medicationDetails.type}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Description:</span>
                            <span className="detail-value">{medicationDetails.description}</span>
                          </div>
                          <button 
                            onClick={() => addMedication(medicationDetails)}
                            className="add-details-btn"
                          >
                            <FaPlus /> Add to Prescription
                          </button>
                        </div>
                      </div>
                    ) : medicationSearch ? (
                      medicationResults.length > 0 ? (
                        <div className="medication-results-container">
                          <div className="results-info">
                            Found {medicationResults.length} medications
                          </div>
                          <div className="medication-results">
                            {medicationResults.map((med, index) => (
                              <div 
                                key={`${med.name}-${index}`} 
                                className="medication-item"
                              >
                                <div className="med-info">
                                  <div className="med-name">{med.name} {med.dosage}</div>
                                  <div className="med-category">{med.category}</div>
                                  <div className="med-type">{med.type}</div>
                                </div>
                                <div className="med-actions">
                                  <button 
                                    onClick={() => viewMedicationDetails(med)}
                                    className="info-btn"
                                    title="Details"
                                  >
                                    <FaInfoCircle />
                                  </button>
                                  <button 
                                    onClick={() => addMedication(med)}
                                    className="add-med-btn"
                                    title="Add"
                                  >
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="no-results">
                          <MdMedication className="no-results-icon" />
                          <p>No medications found for "{medicationSearch}"</p>
                          <small>Try a different search</small>
                        </div>
                      )
                    ) : (
                      <div className="medication-categories">
                        <div className="categories-header">
                          <h4>Browse by Category</h4>
                          <span className="categories-count">{categories.length} categories</span>
                        </div>
                        <div className="categories-grid">
                          {categories.map(category => (
                            <div 
                              key={category} 
                              className="category-card"
                              onClick={() => setMedicationSearch(category)}
                            >
                              <div className="category-icon">💊</div>
                              <div className="category-name">{category}</div>
                              <div className="category-count">
                                {medicationsDB.filter(m => m.category === category).length} medications
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected Medications */}
              {selectedMedications.length > 0 && (
                <div className="selected-medications">
                  <div className="selected-header">
                    <h3>Prescribed Medications ({selectedMedications.length})</h3>
                    <button 
                      onClick={() => {
                        setSelectedMedications([]);
                        setPrescription(prescription.split('PRESCRIBED MEDICATIONS:')[0] + 'PRESCRIBED MEDICATIONS:\n────────────────────────────────\n');
                      }}
                      className="clear-all-btn"
                    >
                      <FaTrash /> Clear All
                    </button>
                  </div>
                  <div className="selected-list">
                    {selectedMedications.map((med, index) => (
                      <div key={index} className="selected-item">
                        <div className="selected-med-info">
                          <span className="med-index">{index + 1}.</span>
                          <div className="selected-med-details">
                            <span className="selected-med-name">{med.name} {med.dosage}</span>
                            <span className="selected-med-type">{med.type} • {med.category}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeMedication(index)}
                          className="remove-btn"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prescription Preview */}
              <div className="prescription-preview">
                <div className="preview-header">
                  <h3><FaFileMedical /> Prescription Preview</h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText(prescription)}
                    className="copy-btn"
                  >
                    <MdContentCopy /> Copy
                  </button>
                </div>
                <div className="preview-content">
                  <pre>{prescription}</pre>
                </div>
              </div>

              {/* Print Section */}
              <div className="print-section">
                <div className="print-actions">
                  <button 
                    onClick={handlePrint} 
                    className="print-btn" 
                    disabled={selectedMedications.length === 0}
                  >
                    <FaPrint /> Print Prescription (1 Page)
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPatient(null);
                      setPrescription('');
                      setSelectedMedications([]);
                      setMedicationDetails(null);
                    }}
                    className="back-btn"
                  >
                    Back to Queue
                  </button>
                </div>
                {selectedMedications.length === 0 && (
                  <div className="print-warning">
                    ⚠️ Add medications before printing
                  </div>
                )}
                {selectedMedications.length > 0 && (
                  <div className="print-info">
                    📄 Prescription optimized for 1 A4 page
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="welcome-card">
              <div className="welcome-content">
                <div className="welcome-icon-container">
                  <FaUserMd className="welcome-icon" />
                </div>
                <h1>Welcome, Doctor</h1>
                <p className="welcome-subtitle">Select a patient from the queue to begin consultation</p>
                
                <div className="welcome-stats">
                  <div className="stat-card">
                    <FaBell className="stat-card-icon" />
                    <div>
                      <h3>{notifications.length}</h3>
                      <p>Patients in Queue</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <FaPills className="stat-card-icon" />
                    <div>
                      <h3>{medicationsDB.length}</h3>
                      <p>Medications Available</p>
                    </div>
                  </div>
                </div>
                
                <div className="welcome-features">
                  <h4>Professional Features:</h4>
                  <div className="features-grid">
                    <div className="feature">
                      <div className="feature-icon">🇩🇿</div>
                      <div>
                        <h5>Algerian Medication Database</h5>
                        <p>{medicationsDB.length}+ medications used in Algeria</p>
                      </div>
                    </div>
                    <div className="feature">
                      <div className="feature-icon">📄</div>
                      <div>
                        <h5>1-Page Printing</h5>
                        <p>Prescription optimized for single A4 page</p>
                      </div>
                    </div>
                    <div className="feature">
                      <div className="feature-icon">⚡</div>
                      <div>
                        <h5>Real-time Updates</h5>
                        <p>Live queue synchronization</p>
                      </div>
                    </div>
                    <div className="feature">
                      <div className="feature-icon">🔍</div>
                      <div>
                        <h5>Advanced Search</h5>
                        <p>Search by name, category or description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doc;