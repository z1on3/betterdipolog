# BetterDipolog data sources

Where every piece of Dipolog data on this site came from, plus known gaps. Compiled during the fork from BetterIligan (October 2026). Update the relevant section when you change data.

**Re-verify before launch:** fire, police, and Coast Guard hotline numbers were taken from search-engine copies of the agencies' official pages (direct fetches were blocked). Confirm them by phone or from the agencies directly.

Contents: [City & Government](#city--government) · [Disaster & Bangon](#disaster--bangon) · [Services & Transparency](#services--transparency) · [Travel](#travel) · [Projects](#projects)

---

## City & Government

Owner area: `data/dipolog/{barangay,city-officials,city-profile}.json`, `app/dipolog/**`, `data/government/**`, `app/government/**`, `app/api/v1/{departments,agencies}`, `validations/{agencySchema,cityProfileSchema}.ts`, `public/images/logos/*`.

### Primary (official City Government of Dipolog, scraped into `.research/dipolog-pages*.json`)

| Source                                                                                 | Used for                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://dipologcity.gov.ph/executive/ (decoded emails in `dipolog-pages-decoded.json`) | All 41 city departments/divisions: head, phone (normalized to `(065) 212-xxxx`), email, City Hall floor. Mayor's office address/fax/email.                                                                                                                                                                                   |
| https://dipologcity.gov.ph/legislative/                                                | 18th Sangguniang Panlungsod 2025–2028: officers (Pres. Pro Tempore, floor leaders), 22 standing + 2 special committees with chair/vice/members.                                                                                                                                                                              |
| https://dipologcity.gov.ph/barangay/                                                   | 21 Punong Barangays; full list of barangay officials (SB members, secretary, treasurer) as of Nov 30, 2023.                                                                                                                                                                                                                  |
| https://dipologcity.gov.ph/quick-facts/                                                | Geography, 5 poblacion districts (Estaka, Biasong, Barra, Central, Miputak), land use table, topography, elevation 2.5 m, climate, languages, ethnic groups, industries.                                                                                                                                                     |
| https://dipologcity.gov.ph/socio-economic-profile/                                     | History timeline (1834, 1894, 1913, 1942, 1952 R.A. 711, R.A. 5520 effective July 1, 1970), 21 barangays (5 urban/16 rural), land area 13,628 ha, 2010 population/households, religion 2000, festivals, schools/hospitals counts, roads, airport distance, power (ZANECO) and water (DCWD) providers, banks, communications. |
| https://dipologcity.gov.ph/contact/                                                    | City Hall address 4/F Rizal Ave., 7100; tel (065) 212-2484; fax 212-4234.                                                                                                                                                                                                                                                    |

### Secondary

| Source                                                                                                                                                                                                                      | Used for                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| https://psa.gov.ph/content/highlights-region-ix-zamboanga-peninsula-population-2024-census-population-2024-popcen                                                                                                           | 2024 POPCEN population 136,528.                                                                                                                                                                                        |
| https://www.philatlas.com/mindanao/r09/zamboanga-del-norte/dipolog.html (+ /dipolog/cogon.html, /dipolog/sinaman.html)                                                                                                      | 2020 census population 138,141 and per-barangay 2020 populations (sum verified = 138,141; Cogon and Sinaman both 1,982, verified individually); PSA-based land area 241.13 km².                                        |
| https://ph.rappler.com/elections/2025/local-race/zamboanga-del-norte/dipolog-city                                                                                                                                           | May 2025 winners: Mayor Roberto "Berto" Uy, Vice Mayor Senen Angeles, 10 councilors.                                                                                                                                   |
| https://en.wikipedia.org/wiki/Dipolog_City_Council                                                                                                                                                                          | Council composition 2025–2028 incl. ex officio Irvin A. Banga (ABC president) and Kristine Irish May M. Cuenca (SK Federation president).                                                                              |
| https://en.wikipedia.org/wiki/Dipolog                                                                                                                                                                                       | Mayor/Vice Mayor full names (Roberto Y. Uy, Senen O. Angeles), Representative Irene G. Labadlabad, PSGC 0907202000, area code 065, 2024 revenue ₱1,121M / assets ₱2,348M, 2023 poverty incidence 22.04%, patron saint. |
| https://en.wikipedia.org/wiki/2025_Zamboanga_del_Norte_local_elections                                                                                                                                                      | Dipolog is in ZDN 2nd congressional district; Labadlabad won.                                                                                                                                                          |
| https://blgf.gov.ph/lgu-income-class/ (DOF D.O. 074-2024 / BLGF MC 020-2024); https://rpnradio.com/dipolog-dipolog-city-anaa-na-sa-2nd-class-city-base-sa-bag-ong-general-income-reclassification-sa-department-of-finance/ | Dipolog reclassified 3rd → 2nd class effective Jan 1, 2025.                                                                                                                                                            |
| https://zaneco.ph/                                                                                                                                                                                                          | ZANECO address (Gen. Luna St.), hotlines 0999-883-8636 / 0935-021-3939, office hours, "meter readers not allowed to accept payment" advisory.                                                                          |
| DOE list of distribution utilities (via search)                                                                                                                                                                             | ZANECO address barangay (Central).                                                                                                                                                                                     |
| https://dipologwater.gov.ph/contact-us/                                                                                                                                                                                     | DCWD address (National Highway, Minaog), (065) 212-2574, 908-0154, 212-6742, dipologcitywd@gmail.com, FB @OfficialDipCWD.                                                                                              |
| https://psa.gov.ph/directory/zamboanga-peninsula                                                                                                                                                                            | PSA ZDN Provincial Statistical Office address, phone, email.                                                                                                                                                           |
| https://www.philhealth.gov.ph/about_us/directory/                                                                                                                                                                           | PhilHealth Dipolog LHIO address and phone (published as (062) 212-7860).                                                                                                                                               |
| https://www.dpwh.gov.ph/dpwh/directory/region/region-ix                                                                                                                                                                     | DPWH ZDN 2nd DEO at Sta. Isabel, Dipolog, (065) 908-2881.                                                                                                                                                              |
| https://www.gsis.gov.ph/newly-renovated-gsis-dipolog-branch-provides-greater-ginhawa-for-members-pensioners/                                                                                                                | GSIS Dipolog Branch in Minaog.                                                                                                                                                                                         |
| https://sbcorp.gov.ph/about-us/directory-of-offices/                                                                                                                                                                        | DTI ZDN at Government Center, Sta. Isabel.                                                                                                                                                                             |
| https://region9.dost.gov.ph/contact-us/ (via search snippet; direct fetch 403)                                                                                                                                              | DOST ZDN PSTO near old LTO office, Upper Turno.                                                                                                                                                                        |
| DepEd Dipolog letterhead (depeddipolog.com)                                                                                                                                                                                 | Schools Division at Government Center, Sta. Isabel; dipolog.city@deped.gov.ph.                                                                                                                                         |
| https://www.facebook.com/DipologCityPoliceStation/ ; https://www.facebook.com/DipologCFS/ (via search)                                                                                                                      | PNP Dipolog CPS (Sta. Isabel); BFP Dipolog CFS (Lopez Jaena St., Biasong).                                                                                                                                             |
| Multiple directories (techpilipinas etc.)                                                                                                                                                                                   | Existence of BIR RDO No. 91 Dipolog, LTO Dipolog DO, NBI Dipolog DO, SSS/Pag-IBIG Dipolog branches, COMELEC OEO — shown as name + official website only (no address/phone, sources not official/current).              |

### Data gaps / judgment calls

- **Cityhood date:** city site says R.A. 5520 effective **July 1, 1970**; Wikipedia says Jan 1, 1970. Used the official city source.
- **Land area:** city quick-facts 13,598 ha vs socio-economic profile 13,628 ha vs PSA-based 241.13 km². Showed 13,628 ha (profile) and the PSA-based figure separately; no density shown.
- **Households:** only the 2010 NSO figure (23,165) from the city profile is shown; no verified 2020/2024 household count.
- **Per-barangay 2024 POPCEN** not found; barangay pages use 2020 census.
- **Urban/rural:** per city profile (5 poblacion = urban). PSA's own urban/rural tagging could not be fetched (psa.gov.ph PSGC page returned 403).
- **Barangay officials** are as of Nov 30, 2023. Punta Punong Barangay appears as "JOEL B RECENTES" in one table and "JOEL L. RECENTES" in the other — shown as "JOEL RECENTES". Barangay hall phones/emails: none sourced (arrays left empty).
- **Departments:** Administrator's office email is truncated on source ("dipologcity0712019") — omitted. Cooperative, Veterinary, Sports & Events phone numbers are incomplete ("212-") — omitted. Port of Dipolog, Slaughterhouse, Terminal, YSDC have partial/no contacts. Several offices have no floor/location listed. Sangguniang Panlungsod secretariat contact not available.
- **ZANECO:** landlines/emails from the Dec 2024 DOE list were not independently verified — not shown. No current residential rate sourced → ILPI calculator removed (not replaced).
- **National agencies:** no verified address for BIR RDO 91, LTO, NBI, SSS, Pag-IBIG, COMELEC (third-party directories disagree/are old). DSWD, DOLE, DAR, TESDA, DENR, LTFRB, CSC ZDN offices not added (no reliable source found). PhilHealth's official directory lists a (062) area code for Dipolog — shown as published.
- **Representative** name (Irene G. Labadlabad) is from Wikipedia only.
- **Revenue/assets/poverty** figures are from Wikipedia infobox (citing BLGF/PSA); not cross-checked against BLGF directly.

---

## Disaster & Bangon

### Hotlines (`data/disaster/hotlines.json`)

| Entry                           | Numbers                              | Source                                                                                                                                   | Notes                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| National Emergency Hotline      | 911                                  | https://ehotlines.e.gov.ph/                                                                                                              | Kept from upstream. Dipolog adopted 911 under EO 56 (city gallery post: https://dipologcity.gov.ph/gallery-2/, seen via search index only).                                               |
| Dipolog CDRRMO                  | (065) 212-1506 / 212-1508            | https://dipologcity.gov.ph/executive/ (scraped copy in `.research/dipolog-pages-decoded.json`)                                           | Head listed as Felipe T. Mangila Jr. in the scrape; a live search-index snippet of the same page names Atty. Arvin L. Bonbon. Head name is NOT shown on the site, so no conflict in data. |
| Philippine Red Cross (national) | 143                                  | https://redcross.org.ph/where-to-donate-and-avail-blood/                                                                                 | Fetched directly. The old `(02) 8790-2300` was dropped (not on this page).                                                                                                                |
| PRC Zamboanga del Norte Chapter | (065) 212-3566                       | same page                                                                                                                                | "Capitol Tourism Complex, Dipolog City — Telefax 065-212-3566". Fetched directly.                                                                                                         |
| PCG Sub-Station Dipolog         | 0963-560-3347                        | https://www.coastguard.gov.ph/index.php/districts/cgd-southwestern-mindanao                                                              | Site returns 403 to direct fetch; number taken from search-engine index of the official page ("Galas Feeder Port, Brgy. Galas, Dipolog City"). Moderate confidence — re-verify.           |
| Dipolog City Police Station     | 0998-598-6778                        | https://www.facebook.com/DipologCityPoliceStation/                                                                                       | Official page "About" via search index; corroborated by graceslist.org directory. FB HTML did not expose the number to curl. Re-verify.                                                   |
| Dipolog City Fire Station (BFP) | 0918-406-5888 / 0965-297-9888        | https://www.facebook.com/DipologCFS/                                                                                                     | Official page post "SAVE THIS DIPOLOG CITY FIRE STATION HOTLINE NUMBER … 09184065888 09652979888 or 911" (#FireSafeZamPen2025), via search index. Re-verify.                              |
| Corazon C. Aquino Hospital      | (065) 212-5555 / 212-5860            | https://dipologcity.gov.ph/executive/                                                                                                    | 212-5555 also tagged on OSM way/574185556. Note the exec page ALSO lists 212-5860 for PESO — possible copy/paste error on the city site; 212-5555 placed first.                           |
| City Health Office              | (065) 212-3400 / 212-2490            | https://dipologcity.gov.ph/executive/                                                                                                    |                                                                                                                                                                                           |
| ZANECO                          | (065) 212-3444 to 212-3447           | DOE list of distribution utilities (Dec 2024): https://prod-cms.doe.gov.ph/documents/d/epimb/program-partners-distribution-utilities-pdf | Extracted from the PDF text.                                                                                                                                                              |
| Dipolog City Water District     | (065) 212-2574 / 212-6742 / 908-0154 | https://dipologwater.gov.ph/contact-us/                                                                                                  | Fetched directly.                                                                                                                                                                         |

Quick-call tiles (`app/disaster/EmergencyQuickCall.tsx`) mirror the above: CDRRMO 212-1506, Fire 0918-406-5888, Police 0998-598-6778, City Hospital 212-5555.

### Facilities (`data/disaster/facilities.json`)

All coordinates from OpenStreetMap via Overpass API (https://overpass-api.de/api/interpreter), bbox 8.50–8.66 N, 123.28–123.45 E; each entry's `source` links its OSM element. Raw dumps: `.research/osm-dipolog.json`, `.research/osm-dipolog-2.json`. Facilities outside Dipolog City (Dapitan, Polanco, Katipunan) were excluded. `tel` only set where the number is verified above.

- Only one evacuation site is sourced: Miputak Hall Covered Court (OSM tags `emergency:social_facility=shelter`, `for=displaced`).
- "Dipolog Listo Center" (OSM `government=public_safety`) included as government; its exact function is not documented.

### Hazard layers (`public/data/disaster/*.geojson`)

UP NOAH hazard maps (DOST / UP NOAH, ODC-ODbL), Zamboanga del Norte province files from the BetterGov mirror:
https://huggingface.co/datasets/bettergovph/project-noah-hazard-maps

- `Flood/100yr/ZamboangaDelNorte.zip` (field `Var` 1–3) → `flood-100yr.geojson`
- `Landslide/LandslideHazards/ZamboangaDelNorte.zip` (field `LH` 1–3) → `landslide.geojson`
- `Storm Surge/StormSurgeAdvisory4/ZamboangaDelNorte.zip` (field `HAZ` 1–3) → `stormsurge-ssa4.geojson`

Clipped to the Dipolog City OSM boundary (relation 20372225, admin_level 6), dissolved per level into `{lvl: 1|2|3}`, simplified 0.0001°, rounded to 4 decimals — same shape as the upstream Iligan files. Note the OSM boundary includes municipal waters; that only affects the clip mask, not the land-based hazard data.

Official hazard links added to the map page: https://hazardhunter.georisk.gov.ph/ and https://noah.up.edu.ph/.

### Guides (`data/disaster/guides.json`)

- Dipolog River, Sulu Sea to the north, wet season June–December (June/Oct/Nov wettest): https://en.wikipedia.org/wiki/Dipolog
- November 2018 flood (classes suspended on CDRRMO recommendation, tributaries rose, rescue/evacuation): https://newsinfo.inquirer.net/1050864/classes-in-dipolog-city-suspended-due-to-severe-flooding (via search index; direct fetch 403)
- January 12, 2023 flood, Brgy. Estaka: https://mindanews.com/photo-of-the-day/2023/01/flood-in-dipolog-city/ (via search index)

### Data gaps / not used

- `dakbayansadipolog.dipologcity.gov.ph` (CDRRMO site) — DNS does not resolve (ENOTFOUND). No official evacuation center list found; DILG R9 profile reportedly lists 51 evacuation sites but none named (https://region9.dilg.gov.ph/dipolog/ — redirect loop to curl).
- No dedicated CDRRMO rescue mobile number found from an official source.
- Zamboanga del Norte Medical Center phone: directories disagree (212-2333 vs 212-4120 / 212-5080) — omitted.
- ZANECO mobile emergency hotlines (0920-629-0163 / 0955-884-8240) appear only on a community site (https://sindangan.net/zaneco-sindangan/) — omitted.
- BFP ZDN Provincial Office (0915-303-6033), PCG national command center, older PNP landlines (212-3675 / 212-3199) — single/stale third-party sources, omitted.
- "Dipolog is outside the main typhoon belt" — no source found; not claimed.
- hotlines.bettergov.ph Dipolog coverage could not be confirmed (client-rendered); link now points to the nationwide directory.

---

## Services & Transparency

Retrieved 2026-10-25. Copies of the source files used are in `.research/pdf/` (PDFs, BLGF xlsx, per-page charter text in `cc22/`) and `.research/sp/` (SP index HTML + parsed JSON). Generators are in `.research/build/` (`*.py` write the JSON data files; `validate.ts` Zod-checks them).

### Services (`data/services/*.json`)

| Source                                                                                                     | URL                                                                                                                                                    | Used for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| City of Dipolog Citizen's Charter 2022 (1st Edition)                                                       | https://dipologcity.gov.ph/wp-content/uploads/2022/04/DIPOLOG-CITY-CITIZENS-CHARTER_2022-First-Edition-1.pdf (fetched via Wayback `20220721102853id_`) | Birth registration (pp. 94–103), marriage license (118–122), certified true copies (132–133), pre-marriage counseling (26–27), building permit (176–182), certificate of occupancy (182–187), RPT computation/payment and realty tax clearance (63–66), copy of tax declaration (68–69), anti-rabies vaccination (197–198), impounding/release of dogs (207–209), TMO settlement of violations and clearance (244–246), CSWDO AICS / PWD / senior / solo parent IDs (248–256), office addresses list (259–261: City Vet at City Slaughterhouse, Brgy. Dicayas; CSWDO at Brgy. Sta. Isabel) |
| CMO – BPLD Citizen's Charter (file posted Sept 2023, cover says "Citizen's Charter 2022")                  | https://dipologcity.gov.ph/wp-content/uploads/2023/09/CMO-BPLD-Citizens-Charter-2023.pdf (Wayback `20240802070845id_`)                                 | New business permit, renewal, Mayor's Clearance, MTOP renewal (+ transfer/substitution/dropping fees in notes), renewal deadlines, quarterly tax deadlines, Tax Ordinance No. 96-001 reference                                                                                                                                                                                                                                                                                                                                                                                             |
| dipologcity.gov.ph Executive page (scraped, `.research/dipolog-pages-decoded.json` → `executive`)          | https://dipologcity.gov.ph/executive/                                                                                                                  | Current office phones, emails, floor: BPLD 212-2486 GF; CCRO 212-3663 GF; OBO 212-7286 GF; CTO 212-4439 GF; Assessor 212-6593/5865 GF; TMO 212-4508; CSWDO 212-2783/4566; POPCOM 212-3699; City Vet email                                                                                                                                                                                                                                                                                                                                                                                  |
| Dipolog City Online Services Portal (verified live, HTTP 200, title "Dipolog City Online Services Portal") | https://eservices.dipologcity.gov.ph/Dipolog/OnlineServices/login                                                                                      | External entries: online business permit (new/renewal), online RPT payment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| PSA / DFA portals (national)                                                                               | psaserbilis.com.ph, passport.gov.ph                                                                                                                    | Kept unchanged from the fork (national, not Iligan-specific)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

Deliberate choices:

- Staff names in the Charters (BPLD clerks, the City Administrator named in 2022/2023) were replaced by role titles. Only the role "Head, BPLD" is kept, and its holder (Viola A. Pino) matches the current Executive page.
- Office hours are not stated in either Charter. Every service shows "Monday to Friday, except holidays… call ahead". No hours were invented.
- The Electrical Permit / CFEI section of the 2022 Charter mentions "MERALCO" (an obvious copy-paste error, since Dipolog is not MERALCO territory), so it was left out.
- Solo Parent ID: the Charter cites RA 8972. A note says RA 11861 has since expanded it.
- RPT: "Assessed Value × 3%" and the 20% advance-payment discount are quoted as the Charter states them, with a note to confirm with the CTO.

Removed (Iligan-only): Dogs Camp Iligan, PART-Iligan, Iligan Stray Feeders (community profiles); Iligan blood request (CMO); Iligan temporary electrical permit; Iligan Zoning Office locational clearance + fee schedule; Iligan traffic clearance (ICTPMO); Iligan business permit / birth registration / building permit / PMC content (replaced with Dipolog versions under the same slugs where applicable).

### Transparency

| Route                                 | Source                                                                                                                                                                                                                                                          | Notes                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /transparency/bids                    | dipologcity.gov.ph Bids and Awards page (scraped `bids-and-awards`, 237 links)                                                                                                                                                                                  | 207 dated bid-notice PDFs (Nov 2023 – Oct 22, 2026), 16 monthly NOA/NTP compilations (2023), 12 BAC minutes (2019), checklist PDF. Labels/dates as shown on the city page. Some city filenames don't match their labels (e.g. "September 15, 2026" → `9-10-2025.pdf`), and the links were kept as published.                                                                                                                       |
| /transparency/budget                  | BLGF Statement of Receipts and Expenditures by LGU: By-LGU-SRE-2022.xlsx (Wayback), By-LGU-SRE-2023.xlsx, By-LGU-SRE-2024.xlsx (Preliminary), By-LGU-SRE-2025.xlsx (Preliminary) from https://blgf.gov.ph/wp-content/uploads/… (live with browser UA + Referer) | Row "Region IX / Zamboanga Del Norte / Dipolog City". Same column mapping as the existing extract script; verified the 2025 values by re-running `scripts/extract-budget-data.mjs`. Header says "In Php Million" but cells are pesos (converted to millions).                                                                                                                                                                      |
| /transparency/budget (documents list) | dipologcity.gov.ph uploads                                                                                                                                                                                                                                      | Disclosure002 = Program of Appropriations for COVID-19 Related Expenses (BGCM) ₱60,193,212.00; Disclosure003/004 = BGCM fund utilization report May 2020 (checked visually from Wayback copies). APP 2022/2023/2025/2026, PMR 2nd Sem 2022, PMR page.                                                                                                                                                                              |
| /transparency/resolutions             | Sangguniang Panlungsod LIS https://spdipolog.net/ordinances.php (509 records), /resolutions.php (4,192 records)                                                                                                                                                 | Included: all titled ordinances (502, exact duplicates and 3 "Untitled" removed) + resolutions dated 2025+ (284). Categories as labeled by SP (case variants merged). Mojibake (â€œ etc.) repaired. LIS has no PDFs; links go to the LIS search `?q=<number>`. The latest SP index entry was Nov 4, 2025. Many older dates are encoding dates (e.g. bulk 2014-02 / 2019-12, Jan-1 placeholders), and the UI labels them "Listed:". |
| /transparency                         | links                                                                                                                                                                                                                                                           | Transparency Seal, Charter, PMR, APP 2026, Balanced Scorecard pages on dipologcity.gov.ph (direct fetch is Cloudflare-blocked from here, so they weren't re-verified), eprocurement / efmis (HTTP 503 at check time, labeled "may be intermittently unavailable"), spdipolog.net.                                                                                                                                                  |

### Assistance (`data/assistance/programs.json`)

- Dipolog City Scholarship and Educational Financial Assistance Program: details from a third-party repost (https://philscholar.com/dipolog-city-scholarship-and-educational-financial-assistance-program/) of the SY 2025–2026 call (deadline Apr 16, 2025; exam Apr 27, 2025; SPMU, 3F City Hall). No official city page was found, so `officialUrl` = dipologcity.gov.ph, and the text says the details come from a repost.
- CSWDO AICS: 2022 Citizen's Charter pp. 248–249.
- National programs (CHED TDP, TES, DOST-SEI, TESDA, DSWD AICS): kept from the fork, `verifiedAt` 2026-07-08 not re-verified. TESDA "serving Iligan" changed to "serving Zamboanga del Norte".
- Removed: Iligan City Mayor's Scholarship.

### Gaps

- No Dipolog City Health Office services in the Charter, so the "Health and Wellness" category was removed from `serviceCategories` (kept as a pending comment).
- The 2023 city-wide Citizen's Charter (1st Ed.) exists but the Wayback copy is truncated at 1 MB and unreadable, so the 2022 edition was used. Some fees and processes may have changed since.
- No Dipolog animal-welfare community groups were verified, so `/community/[slug]` now has no entries (no `internal` services).
- Office hours are not in the Charter.
- 2024 APP not found on the city site.
- ReportIssueModal's GitHub link still points to upstream `KishonShrill/BetterIligan/issues` because the BetterDipolog repo is still a placeholder (`OWNER/betterdipolog` in ContributorsClient).

---

## Travel

### Official (City Government of Dipolog)

Pre-scraped into `.research/dipolog-pages*.json`. Cloudflare blocks direct fetches.

- https://dipologcity.gov.ph/events/: festival descriptions (Katkat Sakripisyo at the 3,003 Steps to Linabo Peak, St. Vincent Ferrer, P'gsalabuk, Adlaw sa Dipolog, Dahunog, Our Lady of the Holy Rosary, PASADI).
- https://dipologcity.gov.ph/socio-economic-profile/: list of local festivals and their dates (Sinulog 4th Sat of Jan, and others). Also: the Cathedral's first Mass on June 29, 1894; the altar designed by Rizal; the municipality since July 1, 1913; the old municipal hall that is now City Hall. Transport facts: 6 bus companies, airport 2.5 km away, 2 airlines (PAL and Cebu Pacific), Pulauan Wharf 11 km away. Also lists bottled sardines as a major product. NOTE: this profile is old (2010/2014 data).
- https://dipologcity.gov.ph/quick-facts/: "Gateway to Western Mindanao and Zamboanga Peninsula", faces the Sulu Sea.
- https://dipologcity.gov.ph/executive/: Land Transport Terminal head is Joyce V. Hibaya, Tel. 212-2469. Only the phone number is used, shown as (065) 212-2469 (the city's area code is 065 per the contact page). Port of Dipolog head is Alejandro June Carasig (not used).

### Wikipedia

- https://en.wikipedia.org/wiki/Dipolog: Tourism section covers Linabo Peak, Cogon Eco-Tourism Park (344 ha, est. 1958), OISCA Forest Park and Sungkilaw Falls, Casa Bernedo, the Santa Cruz marker (May 3, 1905), City Hall, Dipolog Boulevard (1.6 km, Central to Miputak), and the "Bottled Sardines Capital" nickname. Festivals section: P'gsalabuk ("togetherness", tri-people), and Sinulog listed as the 3rd Saturday (this conflicts with the city's 4th Saturday; both are shown). Transportation section: tricycles (motorcab), sikad, habal-habal; the terminal in Miputak and where it runs; Rural Transit and Super Five; Medallion and Lite at Galas port.
- https://en.wikipedia.org/wiki/Dipolog_Airport: DPL/RPMG, Minaog, operated by CAAP. Airlines: Cebgo (Cebu), Cebu Pacific (Manila), PAL Express (Manila), plus Royhle Air Way charter to Dumaguete (omitted because it is a charter).
- https://en.wikipedia.org/wiki/Port_of_Dipolog: Galas port, run by the City Government and PPA, terminal opened Jan 23, 2019. Lines: Medallion Transport (Cebu) and Lite Ferries (Oslob).
- https://en.wikipedia.org/wiki/Port_of_Dapitan: Pulauan Port, owned by PPA (PMO Zamboanga del Norte). Lines: Aleson and Lite.
- https://en.wikipedia.org/wiki/Dipolog_Cathedral: located in Estaka. Construction began April 1894. Became a cathedral in 1967. Named a Jubilee Church in 2021.
- https://en.wikipedia.org/wiki/Casa_Bernedo: Arellano cor. Ranillo St. Coordinates 8°35′17″N 123°20′21″E. Closed and for sale as of 2024.
- Shipping-line articles: Cokaliong (Cebu–Dapitan, Dapitan–Dumaguete), Archipelago Philippine Ferries/FastCat (Dumaguete–Dapitan), Aleson (Dapitan–Dumaguete), Lite Shipping (Cebu–Dapitan; Oslob–Dipolog).

### Operator sites (linked, not scraped for schedules)

- cokaliongshipping.com: the home page lists Dapitan–Dumaguete.
- alesonshipping.com: lists "Dapitan - Dumaguete".
- fastcat.ph: official APFC site.
- cebupacificair.com and philippineairlines.com.
- Do NOT link medalliontransport.com. It is an unrelated US trucking company, and no official Medallion Transport (PH) site was found.

### Other

- Pinoy Mountaineer (2010) https://www.pinoymountaineer.com/2010/08/hiking-matters-95-climbing-3003-steps.html: Linabo Peak is 486 MASL, with 14 Stations of the Cross on the trail.
- Mindanao Pagadian Frontline / PIA, Mary May A. Abellon, Feb 3 2013 http://pagadianfrontline.blogspot.com/2013/02/sungkilaw-falls-is-now-tourist.html: Sungkilaw Falls is in Sitio Virginia, Brgy. Diwan, about 20 ft high, about 25 km from the city, with about 400 steps and a mineral spring.
- PNA via Molave LGU https://www.molave.gov.ph/dipolog-city-marks-pagsalabuk-festival-source-philippine-news-agency/: Pagsalabuk means "get together" (Subanen).

### Coordinates (OpenStreetMap via Nominatim, 2026-10-25)

- Linabo Peak: node 12019800889. NOTE: OSM's admin boundary puts the peak node inside Dapitan, while the city and Wikipedia describe it as Dipolog's. The jump-off point is on the Dipolog side.
- Dipolog Cathedral: way 574185531
- City Hall: way 967880396
- Plaza Magsaysay: way 574185551
- Santa Cruz Marker: node 13674700252
- "Explore Dipolog" landmark on the Boulevard: node 12551201564
- Cogon Eco-Tourism Park: node 13676736139
- Airport: way 711145922
- Land Transport Terminal ("Dipolog City Public Transport Terminal"): way 1119516947
- Port of Dipolog: way 1324960840
- Port of Dapitan: way 926100642
- Casa Bernedo uses Wikipedia coordinates. Sungkilaw Falls has NO coordinates (not in OSM), so it is listed but not pinned.

### Images (Wikimedia Commons; license checked via the Commons API)

| File                                                     | Author                    | License       |
| -------------------------------------------------------- | ------------------------- | ------------- |
| Linabo_Peak_Entrance.jpg                                 | Placelover (en.wikipedia) | Public domain |
| Dipolog_Boulevard_southbound_(…10-17-2023).jpg           | Patrickroque01            | CC BY-SA 4.0  |
| Dipolog_Boulevard_beach,_Sulu_Sea_view_(…10-17-2023).jpg | Patrickroque01            | CC BY-SA 4.0  |
| Dipolog_Cathedral_(P._Ramon,…10-17-2023).jpg             | Patrickroque01            | CC BY-SA 4.0  |
| Dipolog_City_Hall.jpg                                    | Shekinaharmenta           | CC BY-SA 3.0  |
| Dipolog_Magsaysay_Park_(Herrera,…10-17-2023).jpg         | Patrickroque01            | CC BY-SA 4.0  |
| Dipolog_Santa_Cruz_Marker_(…10-17-2023).jpg              | Patrickroque01            | CC BY-SA 4.0  |
| Dipolog_Airport_(Minaog,…10-17-2023).jpg                 | Patrickroque01            | CC BY-SA 4.0  |
| Port_of_Dipolog_Terminal_Building_(2020).jpg             | Dipolog City Government   | Public domain |
| Dipolog_City_Land_Transport_Terminal.jpg                 | Dipolog City Government   | Public domain |

### Data gaps / deliberately omitted

- No flight, ferry, or bus schedules or fares. Third-party sites (bustickets.ph, pamasahe, escapemanila, 2gopromofares) disagree on days, times, and fares, and no official current timetable was found.
- No tricycle fare matrix. Fares are set by city ordinance and no current official copy was found.
- Sungkilaw Falls: no coordinates and no free photo. Access info dates from 2013.
- Casa Bernedo and Cogon Eco-Tourism Park: no freely licensed photo found.
- Sicayab beach, Gulayon, Pamansalan Forest Park, and Dipolog River were not added. No sourced attraction descriptions were found.
- Sinulog sa Dipolog date conflict: the city profile says the 4th Saturday of January, Wikipedia says the 3rd. Both are shown.
- P'gsalabuk dates vary between city pages. This is noted on the page.
- The tourism office phone ("212-1111" on the tourism.dipologcity.gov.ph template page) was not used because that page is placeholder or template content.

---

## Projects

Owner area: `data/dipolog/projects.json`, `validations/projectSchema.ts`, `app/transparency/projects/**`, `app/api/v1/projects/route.ts`. Rebuild with `python .research/build/projects.py` (inputs live in `.research/projects/`, which is gitignored) and validate with `npx tsx .research/build/validate-projects.ts`.

This section covers the BetterGov Better LGU guide's "Projects (infrastructure and social programs)" category. Compiled October 25, 2026. There are 182 entries. Every entry has its own source link, and every status is "as of" its source's date. Nothing is shown as live.

| Source                                                                                                                                                                                                                                                    | As of                                                                                 | What came from it                                                                                                                                                                                                                                                   | Entries                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| DPWH Infrastructure Projects Portal, https://transparency.dpwh.gov.ph/ (API `api.transparency.dpwh.gov.ph/projects?search=dipolog`, then `/projects/{contractId}` for details; per-project link `https://transparency.dpwh.gov.ph/?project={contractId}`) | Retrieved Oct 25, 2026 (live portal)                                                  | Title (verbatim), contract ID, implementing office (ZN 2nd DEO / Region IX), contractor, contract cost (the portal's "Contract Cost" = API `budget`), ABC, source of funds, status, % accomplishment, advertisement/award/start/expiry/completion dates, infra year | 148: 125 completed, 19 on-going, 4 for procurement                                |
| City PMR 1st Sem CY2026, https://dipologcity.gov.ph/procurement-monitoring-report/ (PDF `wp-content/uploads/2026/07/LGU-DIPOLOG-PMR-1ST-SEM-2026_.pdf`)                                                                                                   | As of June 30, 2026 (transmitted July 29, 2026; page posted July 31, 2026)            | Works/infrastructure rows: description (verbatim), PMO/end-user code, mode, ABC, contract cost, fund source ("GoP"), procurement milestone dates                                                                                                                    | 11, all awarded (notice to proceed issued)                                        |
| City PMR Jan–June 2022, https://dipologcity.gov.ph/pmr-1st-sem-2022/ (PDF `uploads/2023/03/PMR-1st-Sem-CY-2022.pdf`)                                                                                                                                      | As of June 30, 2022 (transmitted July 14, 2022; posted Mar 24, 2023)                  | Same fields                                                                                                                                                                                                                                                         | 4, awarded                                                                        |
| City PMR July–Dec 2022, https://dipologcity.gov.ph/pmr-2nd-sem-2022/ (PDF `uploads/2023/03/PMR-2nd-Sem-2022.pdf`)                                                                                                                                         | As of Dec 31, 2022 (posted Mar 20, 2023)                                              | AA Slaughterhouse row (bids evaluated, no award recorded yet)                                                                                                                                                                                                       | 1, under procurement                                                              |
| City Annual Procurement Plan FY2026, https://dipologcity.gov.ph/2026-annual-procurement-plan/ (PDF `uploads/2026/01/app_transmittal_postingcert_app2026.pdf`)                                                                                             | Posted Jan 29, 2026                                                                   | Infrastructure lines that name a specific facility: title (verbatim), estimated budget, fund source (General Fund), schedule 01/2026–12/2026                                                                                                                        | 7, labeled planned                                                                |
| City "Completed" page, https://dipologcity.gov.ph/completed/ (scraped into `.research/dipolog-pages-decoded.json`)                                                                                                                                        | Content says "100% completed as of December 31, 2013"                                 | Project name, stated cost, fund source, schools/locations                                                                                                                                                                                                           | 3, labeled historical                                                             |
| City "On-going" page, https://dipologcity.gov.ph/on-going/                                                                                                                                                                                                | 2014 content (photos uploaded Aug 2014; WordPress page re-posted 2018, modified 2021) | Project name, stated cost, fund source, scope                                                                                                                                                                                                                       | 8, shown as "Reported on-going as of 2014 (historical; current status not known)" |

### How entries were selected

- **DPWH.** The search for "dipolog" returned 491 projects. 143 were kept because their description gives Dipolog City (or ", DIPOLOG, ZAMBOANGA DEL NORTE") as the location. Five more were kept because they name Dipolog barangays or landmarks without the city name: three Airport–Turno–Sinaman bypass road contracts and two Linabo Peak road contracts. Those five carry a `locationNote`. The other 343 were left out. They are works in other towns (Polanco, Dapitan, Sindangan, Katipunan and so on), or national-road segments that only name the Dipolog–Oroquieta, Dipolog–Sindangan–Liloy or Dipolog–Punta–Dansullan road and do not say which municipality the work is in.
- **Barangays.** A barangay is listed only when the source text names it, including school names such as "Galas NHS". Coordinates were not used to infer barangays.
- **On-going past expiry.** Some DPWH projects are still listed as on-going after their contract expiry date has passed. Those entries get a factual note saying so, and their status is not changed.
- **Transcription.** City PMRs and the APP are scanned images with no text layer. Rows were found with Windows OCR plus a visual scan of every page, then transcribed by hand from 250-dpi crops. Titles, codes, amounts and dates are kept exactly as written. Two exceptions: in a 2026 sewage-plant row, an out-of-order pre-bid date (2/10/26, earlier than the 6/18/26 posting) was left out; and in a 2022 row, a "6/31/22" date was not used. The "Contract cost" for the PMR rows is the PMR's "Contract Cost (PhP)" column.
- **Fetching.** dipologcity.gov.ph sits behind a Cloudflare bot challenge, so PDFs were downloaded with a headless browser session. The Wayback CDX index has no copies of the 2026 PMR.

### Data gaps / deliberately omitted

- **PMR 2nd Sem 2023** (https://dipologcity.gov.ph/pmr-2nd-sem-2023/, posted Feb 13, 2024) has an empty page body with no PDF attached. No PMRs for 2023 1st sem, 2024 or 2025 were found (the `/pmr-1st-sem-2023/`, `/pmr-*-2024/` and `/pmr-*-2025/` URLs return 404).
- **City PMRs mostly list goods.** These rows were not listed as projects: construction materials, labor pools such as "Pakyaw Labor – 16 Laborer's" and port porterage, and consulting such as the "Dip. Urban Improvement Plan Consulting Services". Works rows with no facility or location were also left out: 2022 "1 lot Concrete Works" (CGSO/INFRA-22-06-0501), 2022 "91 lot Electrical Works" (CPDO/INFRA-22-06-0516), 2022 "1 lot Gen. Requirements-Road Concreting" (CEO/100-22-10-1317), and 2026 "1 each Project Billboard Concreting of Road" (CPDO/INFRA/26-01-0022).
- **PMR statuses are procurement milestones, not construction progress.** "Awarded" means a notice to proceed is recorded. The PMRs do not report completion of works. Some 2022 rows have a "Delivery/Completion" date, and it is shown as written.
- **APP 2026.** Generic lines were left out: "Other Public Infra … within 21 barangays" (₱250M), "Opening/Concreting of roads" (₱25M), "Small Infrastructure Projects" (₱20M), "Electrification Projects/Streetlighting" (₱10M), Flood Control Program, Artesian Wells, roads/bridges within the 21 barangays, and repair and maintenance lines. APPs for 2022, 2023 and 2025 (linked from `/transparency/budget`) were not transcribed.
- **Not covered:** DPWH Region IX contracts whose descriptions do not mention Dipolog, other national agencies (DepEd-, DOH- or DA-implemented works), and the city's Annual Investment Program and 20% Development Fund utilization reports. None of the last two were found on the city site.
- **The 2014 "On-going" list** groups an irrigation dam (₱13M) and canal (₱73M) under one heading with one fund source, so they are split into two entries. Its "Construction/improvement of access road" heading covers two roads, Linabo Peak (₱40M) and Cogon to OISCA Forest Park (₱40M), which are also listed separately.
- **License.** The DPWH portal shows no license terms. The data is government-published public information and is cited per project. BetterGov's `bettergovph/api.dpwh` scraper repo (no license file) was used only to learn the API shape. No data was copied from it.
