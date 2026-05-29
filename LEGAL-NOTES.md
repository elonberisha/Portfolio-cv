# Shenimet Ligjore — portfolio-cv.online

> Hulumtim i dates 26 Maj 2026. Keto shenime jane per reference kur te ndertojme Privacy Policy, Terms of Service, dhe consent flows.

---

## Konteksti

- Projekt personal i nje studenti developer nga Kosova
- Falas per studente, pa pagese
- **Nuk eshte biznes i regjistruar, nuk ka entitet legal**
- Kjo ndikon ne ate cfare kerkohet ligjerishtw

---

## 1. GDPR / Mbrojtja e te Dhenave

### A zbatohet GDPR?

**Po, pjeserisht.** GDPR zbatohet kur:
- Ofron sherbime per njerez brenda EU/EEA (studente europiane)
- Mbledh te dhena personale (emer, email, fjalekalim)
- Nuk ka rendesi a je biznes apo jo — vlen edhe per individe

### Kosova
- **Ligji Nr. 06/L-082 per Mbrojtjen e te Dhenave Personale** (2019) — i bazuar direkt ne GDPR
- **Agjencia per Informim dhe Privatesi (AIP)** e zbaton
- Si developer individual nuk ke nevoje te regjistrohesh si kontrollues formal, POR duhet te respektosh parimet baze

### Te dhena qe mbledh platforma:

| Te dhena | Ku mblidhen | Lloji |
|----------|-------------|-------|
| Emri i plote | Signup, Verify form | Personal |
| Email (shkollor) | Signup | Personal |
| Fjalekalimi | Signup | Sensitiv |
| Emri i universitetit | Verify form | Institucional |
| Vendi, qyteti | Verify form | Institucional |
| Website i uni | Verify form | Publik |
| Google account (OAuth) | Signup (planned) | Personal |

### Cfare DUHET te besh (minimumi):

1. **Privacy Policy** — shpjego: cfare mbledh, pse, ku ruhet, sa kohe, si fshihet, kush ka qasje
2. **Consent** — checkbox ne signup (jo pre-checked): "I agree to Terms & Privacy Policy"
3. **E drejta e fshirjes** — "Delete my account" funksion
4. **Fjalekalimete** — ASNJEHERE tekst, gjithmone hash (bcrypt, argon2)
5. **SSL/HTTPS** — gjithmone

### Cfare NUK ke nevoje:
- DPO (Data Protection Officer)
- Regjistrim tek AIP si kontrollues
- DPIA (Data Protection Impact Assessment)
- Consent management platform (CMP) profesional
- Kontrate me procesore (pervec nese perdor cloud hosting — atehere vlen DPA e tyre)

---

## 2. Terms of Service — cfare duhet te permbaje

1. **Pershkrim**: "Platforme falas per portfolio dhe CV per studente"
2. **Kushtet e perdorimit**: duhet te jesh student, mos posto permbajtje ilegale, nje llogari per person
3. **Pronesia e permbajtjes**: permbajtja mbetet prone e userit, platforma merr vetem te drejten ta shfaqesh
4. **Kufizimi i pergjegjesise**: "as is" pa garanci, nuk jam pergjegjes per humbje te dhenash (KRITIKE per developer individual)
5. **Nderprerja**: mund ta nderpresesh sherbimin ne cdo kohe, mund te suspendosh llogari
6. **Modifikimi**: "Mund ti ndryshoj terms — do njoftoj via email"
7. **Ligji aplikues**: Ligjet e Republikes se Kosoves

### NUK ke nevoje:
- Terms komplekse ligjore
- Avokat (per momentin)
- Arbitration clause, class action waiver

---

## 3. Privacy Policy — struktura

**A. Kush je:** Emri, developer individual, student, Kosove. Email kontakti.

**B. Cfare mbledhim:** Te dhena llogarie (emer, email, fjalekalim i hashuar), te dhena verifikimi (universitet, vend, qytet, website, tip), te dhena portfolio (projektet, CV qe useri fut vete), te dhena teknike (Google Fonts ngarkon IP-ne)

**C. Pse:** Per te ofruar sherbimin. Baza ligjore: consent (regjistrim vullnetar)

**D. Me ke ndahet:** ASKUSH. Nuk shiten, nuk ndahen. Vetem: Google Fonts (IP), hosting provider

**E. Ku ruhen:** [Specifiko kur te vendosesh — EU server? US? Cloudflare?]

**F. Sa kohe:** Derisa useri e fshin llogarane. Te dhena verifikimi: 30 dite pas aprovimit/refuzimit

**G. Te drejtat e userit:** Qasje, korrigjim, fshirje, eksport (opsionale)

**H. Femijet:** Nuk mbledhim te dhena nga persona nen 16 vjec

**I. Kontakti:** Email per pyetje

---

## 4. Cookies / Consent

### Situata aktuale:
- **0 cookies** — platforma nuk seton asnje cookie
- **0 trackers** — asnje analytics, asnje pixel
- **Google Fonts** — CDN, nuk seton cookie, por Google merr IP-ne
- **unpkg.com** (React, Babel) — CDN, nuk seton cookie

### Rregullat:
- **Tani**: NUK ke nevoje per cookie banner. Deklaro Google Fonts ne Privacy Policy
- **Kur shtosh Google OAuth**: session cookies = "strictly necessary" = nuk kerkojne consent, por informo userin
- **Kur shtosh analytics**: DUHET consent banner. Rekomandim: Plausible ose Umami (privacy-friendly, pa cookies)

### Opsionale:
- Self-host fontet per te eliminuar Google si pale e trete (praktika me e mire per GDPR)

---

## 5. Checklist per implementim

### Prioritet i larte (DUHET para se te behet live):
- [ ] Shkruaj Privacy Policy (1 faqe)
- [ ] Shkruaj Terms of Service (1 faqe)
- [ ] Consent checkbox ne signup (jo pre-checked)
- [ ] Hash fjalekalimete (backend)
- [ ] "Delete my account" funksion (backend)

### Prioritet mesatar (DUHET kur behet live):
- [ ] Deklaro Google Fonts ne Privacy Policy
- [ ] "Last updated" date ne Privacy Policy & Terms
- [ ] Email njoftimi kur ndryshon Terms

### Prioritet i ulet (e mire por jo urgjente):
- [ ] Self-host fontet
- [ ] Data export feature ("Download my data")
- [ ] Cookie policy faqe e vecante (vetem kur shtosh cookies)

### NUK ke nevoje:
- Cookie banner (0 cookies)
- DPO
- Regjistrim formal si kontrollues
- DPIA
- Avokat (per momentin — kur fiton para, po)
