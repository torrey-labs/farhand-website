/**
 * Per-city industry profiles for the top 30 metros — populates the
 * /locations/[city] hero, "Industries we cover" chips, and "Companies
 * we typically support" tile grid.
 *
 * What makes a good profile:
 *   - intro: 1–2 sentences naming actual neighborhoods, industrial
 *     corridors, or industry mix. NOT generic "thriving metro" copy.
 *   - industrialCorridors: 3–5 named districts/parks/corridors.
 *   - topEmployers: 3–6 of the metro's largest manufacturers / robot
 *     users. Stay factual — these are companies whose facilities
 *     in this metro have machinery + robotics. We do NOT claim them
 *     as Farhand customers.
 *   - industryMix: top 2–4 verticals, used to taxonomize the metro.
 *
 * Cities not in this map render with a generic intro fallback. Adding
 * a profile takes ~5 minutes of research; ship 2-3 per week as part of
 * the SEO content cadence.
 */

export interface CityProfile {
  intro: string;
  industrialCorridors: string[];
  topEmployers: string[];
  industryMix: string[];
}

export const cityProfiles: Record<string, CityProfile> = {
  // ── Tier 1 ──
  'new-york': {
    intro:
      "Servicing the New York metro from the Brooklyn Navy Yard and Long Island City through the Newark industrial belt and the Bronx logistics corridor. Where pharma, food processing, printing, and last-mile robotics fleets all run side by side.",
    industrialCorridors: [
      'Brooklyn Navy Yard',
      'Long Island City manufacturing zone',
      'Newark industrial belt',
      'Bronx logistics corridor',
      'Sunset Park industrial',
    ],
    topEmployers: ['Pfizer', 'Goya Foods', 'Anheuser-Busch Newark', 'Verizon', 'JetBlue'],
    industryMix: ['pharmaceuticals', 'food processing', 'logistics', 'printing'],
  },

  'los-angeles': {
    intro:
      "Field service across Greater Los Angeles — from the Vernon meatpacking district and the City of Industry warehouse belt to the South Bay aerospace cluster and the Port of LA logistics complex.",
    industrialCorridors: [
      'Vernon manufacturing district',
      'City of Industry warehouses',
      'South Bay aerospace cluster',
      'Port of Los Angeles / Long Beach logistics',
      'San Fernando Valley manufacturing',
    ],
    topEmployers: ['SpaceX Hawthorne', 'Northrop Grumman', 'Boeing El Segundo', 'Tesla Hawthorne', 'Smucker\u2019s'],
    industryMix: ['aerospace', 'logistics', 'food processing', 'EV'],
  },

  'chicago': {
    intro:
      "Servicing the Chicagoland manufacturing belt — Hoffman Estates, Elk Grove Village, the Calumet industrial corridor, and the Joliet logistics hub. The midwest robotics + heavy-machinery capital.",
    industrialCorridors: [
      'Hoffman Estates manufacturing',
      'Elk Grove Village industrial',
      'Calumet industrial corridor',
      'Joliet logistics hub',
      'Aurora / Naperville tech belt',
    ],
    topEmployers: ['Caterpillar', 'Deere & Company', 'Boeing Chicago', 'Abbott Laboratories', 'Mondelez'],
    industryMix: ['heavy machinery', 'food processing', 'logistics', 'pharmaceuticals'],
  },

  'houston': {
    intro:
      "Serving the Houston energy + industrial corridor — Pasadena petrochemical row, the Port of Houston logistics belt, and the inland aerospace cluster around Ellington and Clear Lake.",
    industrialCorridors: [
      'Pasadena petrochemical row',
      'Port of Houston',
      'Ellington / Clear Lake aerospace',
      'Baytown refining corridor',
      'North Houston logistics',
    ],
    topEmployers: ['ExxonMobil', 'Shell USA', 'NASA Johnson Space Center', 'Halliburton', 'Schlumberger'],
    industryMix: ['energy', 'petrochemical', 'aerospace', 'logistics'],
  },

  'phoenix': {
    intro:
      "Field service across the Phoenix Valley — from Chandler\u2019s semiconductor fab corridor to Mesa, Tempe, and the Loop 303 logistics belt that\u2019s drawing automation investment from across the country.",
    industrialCorridors: [
      'Chandler semiconductor fab corridor',
      'Mesa industrial',
      'Tempe research belt',
      'Loop 303 logistics corridor',
      'Glendale manufacturing',
    ],
    topEmployers: ['TSMC Arizona', 'Intel Ocotillo', 'ON Semiconductor', 'Honeywell Aerospace', 'Boeing Mesa'],
    industryMix: ['semiconductor', 'aerospace', 'logistics', 'EV'],
  },

  'philadelphia': {
    intro:
      "Servicing the Delaware Valley industrial corridor — from the Navy Yard biotech cluster through the King of Prussia pharma belt to South Jersey\u2019s logistics + food-processing operations.",
    industrialCorridors: [
      'Philadelphia Navy Yard',
      'King of Prussia pharma belt',
      'South Jersey logistics',
      'Bristol industrial park',
      'Northeast Philadelphia manufacturing',
    ],
    topEmployers: ['GlaxoSmithKline', 'Merck', 'Lockheed Martin', 'Boeing Helicopters Ridley Park', 'Campbell Soup'],
    industryMix: ['pharmaceuticals', 'aerospace', 'food processing', 'logistics'],
  },

  'san-antonio': {
    intro:
      "Serving the South Texas metro — Toyota Texas plant in Plant City, the Port San Antonio aerospace + cyber campus, and the H-E-B / Sysco food-processing cluster on the city\u2019s south side.",
    industrialCorridors: [
      'Toyota Texas / Plant City',
      'Port San Antonio',
      'South Side food cluster',
      'Brooks City Base',
      'Northwest aerospace MRO',
    ],
    topEmployers: ['Toyota Motor Manufacturing Texas', 'Boeing San Antonio', 'StandardAero', 'H-E-B', 'CPS Energy'],
    industryMix: ['automotive', 'aerospace MRO', 'food processing', 'energy'],
  },

  'san-diego': {
    intro:
      "Servicing the San Diego life-sciences and defense corridor — from the Sorrento Valley biotech belt through Kearny Mesa and the Otay Mesa border-manufacturing zone.",
    industrialCorridors: [
      'Sorrento Valley biotech',
      'Kearny Mesa industrial',
      'Otay Mesa cross-border manufacturing',
      'Miramar defense cluster',
      'Carlsbad medical-device belt',
    ],
    topEmployers: ['Qualcomm', 'Illumina', 'General Atomics', 'Northrop Grumman', 'BD Medical', 'Thermo Fisher'],
    industryMix: ['life sciences', 'medical devices', 'defense', 'semiconductor'],
  },

  'dallas': {
    intro:
      "Field service across the Dallas\u2013Fort Worth metroplex \u2014 from the Lockheed Martin / GM Arlington corridor through the Richardson telecom triangle to the Plano aerospace belt.",
    industrialCorridors: [
      'Lockheed Martin / GM Arlington',
      'Richardson telecom triangle',
      'Plano aerospace belt',
      'Garland manufacturing',
      'DFW airport cargo + MRO',
    ],
    topEmployers: ['Lockheed Martin', 'General Motors Arlington', 'Texas Instruments', 'Bell Textron', 'Frito-Lay'],
    industryMix: ['aerospace', 'automotive', 'semiconductor', 'food processing'],
  },

  'san-jose': {
    intro:
      "Servicing Silicon Valley \u2014 from the Fremont EV belt and the Milpitas semiconductor cluster to the South Bay biotech and medical-device corridor.",
    industrialCorridors: [
      'Fremont EV / Tesla belt',
      'Milpitas semiconductor',
      'San Jose flex / robotics shops',
      'Newark industrial',
      'Sunnyvale aerospace + electronics',
    ],
    topEmployers: ['Tesla Fremont', 'Lam Research', 'Applied Materials', 'Lockheed Martin Sunnyvale', 'Western Digital', 'Flex'],
    industryMix: ['semiconductor', 'EV', 'medical devices', 'electronics manufacturing'],
  },

  // ── Tier 2 ──
  'austin': {
    intro:
      "Serving the Central Texas tech corridor \u2014 the Samsung Austin Semiconductor campus in Taylor, the Tesla Gigafactory east of town, and the growing semiconductor + EV supplier base across the metro.",
    industrialCorridors: [
      'Samsung Taylor fab',
      'Tesla Gigafactory Texas',
      'Round Rock industrial',
      'Pflugerville advanced manufacturing',
      'Bergstrom airport logistics',
    ],
    topEmployers: ['Samsung Austin Semiconductor', 'Tesla Gigafactory', 'NXP Semiconductors', 'Applied Materials', '3M Austin'],
    industryMix: ['semiconductor', 'EV', 'electronics manufacturing'],
  },

  'jacksonville': {
    intro:
      "Servicing Northeast Florida \u2014 the Naval Air Station Jacksonville MRO cluster, the JAXPORT cargo + automotive logistics complex, and the regional aerospace + medical-device base.",
    industrialCorridors: [
      'NAS Jacksonville MRO',
      'JAXPORT cargo + automotive',
      'Cecil Commerce Center',
      'Westside industrial',
      'AvMed / Mayo medical corridor',
    ],
    topEmployers: ['Boeing Jacksonville', 'Mayo Clinic', 'Northrop Grumman', 'GE Aerospace', 'Anheuser-Busch'],
    industryMix: ['aerospace MRO', 'logistics', 'medical devices', 'food + beverage'],
  },

  'seattle': {
    intro:
      "Field service across the Puget Sound region \u2014 from the Boeing Everett widebody complex through the Renton 737 line to the Kent Valley logistics + aerospace-supplier belt.",
    industrialCorridors: [
      'Boeing Everett',
      'Boeing Renton 737 line',
      'Kent Valley supplier belt',
      'Seattle industrial Duwamish',
      'SeaTac airport logistics',
    ],
    topEmployers: ['Boeing', 'Amazon', 'Blue Origin Kent', 'PACCAR', 'Microsoft Redmond hardware labs'],
    industryMix: ['aerospace', 'logistics', 'cloud hardware', 'commercial vehicles'],
  },

  'denver': {
    intro:
      "Servicing the Front Range \u2014 the Aurora aerospace cluster, the Boulder semiconductor + life-sciences belt, and the I-25 logistics corridor running north from DTC.",
    industrialCorridors: [
      'Aurora aerospace cluster',
      'Boulder semi + life sciences',
      'I-25 logistics corridor',
      'Commerce City industrial',
      'Centennial advanced manufacturing',
    ],
    topEmployers: ['Lockheed Martin Space', 'Ball Aerospace', 'Northrop Grumman', 'Medtronic', 'Microchip Technology'],
    industryMix: ['aerospace + space', 'semiconductor', 'life sciences', 'logistics'],
  },

  'boston': {
    intro:
      "Servicing the Greater Boston biotech + robotics cluster \u2014 from Cambridge\u2019s Kendall Square through the I-95/Route 128 ring into Waltham, Bedford, and the Lawrence/Lowell defense belt.",
    industrialCorridors: [
      'Cambridge Kendall biotech',
      'Route 128 tech ring',
      'Bedford / Hanscom defense',
      'Lawrence / Lowell manufacturing',
      'Waltham robotics + life sciences',
    ],
    topEmployers: ['Moderna', 'Boston Dynamics', 'iRobot', 'Raytheon', 'MITRE', 'Sanofi Genzyme'],
    industryMix: ['life sciences', 'robotics', 'defense', 'medical devices'],
  },

  'detroit': {
    intro:
      "Servicing the Detroit metro from Hamtramck through Warren and Dearborn \u2014 the heart of US automotive robotics, where FANUC arms feed Ford, GM, and Stellantis production lines every shift.",
    industrialCorridors: [
      'Detroit Big-3 plants',
      'Warren tech + supplier corridor',
      'Dearborn supplier belt',
      'Hamtramck assembly',
      'Auburn Hills tier-1 cluster',
    ],
    topEmployers: ['Ford', 'General Motors', 'Stellantis', 'Magna International', 'Lear Corporation', 'Aptiv'],
    industryMix: ['automotive', 'tier-1 supplier', 'robotics integration'],
  },

  'minneapolis': {
    intro:
      "Servicing the Twin Cities \u2014 the medical-device cluster around 3M and Medtronic, the food + agribusiness operations along I-94, and the regional aerospace + supercomputer base.",
    industrialCorridors: [
      'Medical Alley corridor',
      'I-94 food + agri',
      'Eagan industrial',
      'Bloomington manufacturing',
      'Plymouth tech + medical',
    ],
    topEmployers: ['Medtronic', '3M', 'Cargill', 'General Mills', 'Honeywell Aerospace', 'Boston Scientific'],
    industryMix: ['medical devices', 'food + agri', 'aerospace', 'industrial'],
  },

  'atlanta': {
    intro:
      "Field service across the Atlanta metro \u2014 from the Hartsfield logistics + MRO belt through Marietta\u2019s aerospace cluster to the Kia / Hyundai supplier corridor stretching south.",
    industrialCorridors: [
      'Hartsfield logistics + MRO',
      'Marietta Lockheed cluster',
      'Kia / Hyundai supplier belt',
      'Northeast Gwinnett industrial',
      'Fulton Industrial corridor',
    ],
    topEmployers: ['Delta TechOps', 'Lockheed Martin Marietta', 'Kia Motors Manufacturing', 'Coca-Cola', 'UPS'],
    industryMix: ['aerospace MRO', 'automotive', 'logistics', 'food + beverage'],
  },

  'pittsburgh': {
    intro:
      "Servicing the Pittsburgh robotics + heavy-industry corridor \u2014 the Strip District / RIDC robotics cluster, the Hazelwood Mill 19 advanced-manufacturing campus, and the Mon Valley steel belt.",
    industrialCorridors: [
      'Strip / RIDC robotics',
      'Hazelwood Mill 19',
      'Mon Valley steel belt',
      'Findlay / Imperial logistics',
      'New Kensington advanced manufacturing',
    ],
    topEmployers: ['Carnegie Robotics', 'ANSYS', 'Aurora Innovation', 'U.S. Steel', 'Westinghouse', 'PPG Industries'],
    industryMix: ['robotics', 'steel + heavy industry', 'autonomy', 'industrial software'],
  },

  'cincinnati': {
    intro:
      "Servicing the Cincinnati / Northern Kentucky industrial corridor \u2014 the GE Aviation Evendale plant, the Toyota / Honda supplier belt, and the CVG logistics hub.",
    industrialCorridors: [
      'GE Aviation Evendale',
      'Toyota / Honda supplier belt',
      'CVG logistics + cargo',
      'Northern KY industrial',
      'Mason / West Chester advanced manufacturing',
    ],
    topEmployers: ['GE Aviation', 'Procter & Gamble', 'Toyota Motor Engineering', 'Honda Manufacturing', 'AK Steel'],
    industryMix: ['aerospace', 'automotive', 'consumer products', 'logistics'],
  },

  'cleveland': {
    intro:
      "Servicing Northeast Ohio \u2014 the I-77 manufacturing corridor through Akron, the Lake Erie logistics belt, and the Westlake / Avon medical-device + automation cluster.",
    industrialCorridors: [
      'Akron polymer corridor',
      'Lake Erie logistics belt',
      'Westlake / Avon medical',
      'Solon / Twinsburg manufacturing',
      'Lordstown EV + battery',
    ],
    topEmployers: ['Goodyear', 'Sherwin-Williams', 'Parker Hannifin', 'Ford Cleveland Engine', 'NASA Glenn Research Center'],
    industryMix: ['polymers / chemicals', 'automotive', 'medical devices', 'aerospace research'],
  },

  'st-louis': {
    intro:
      "Field service across the St. Louis metro \u2014 the Boeing Defense + St. Charles aerospace corridor, the Hazelwood / Berkeley supplier belt, and the Anheuser-Busch + Nestl\u00e9 food-processing cluster.",
    industrialCorridors: [
      'Boeing Defense St. Louis',
      'Hazelwood supplier belt',
      'Earth City logistics',
      'Soulard / South City brewing',
      'Wentzville GM assembly',
    ],
    topEmployers: ['Boeing Defense', 'GM Wentzville', 'Anheuser-Busch InBev', 'Nestl\u00e9 Purina', 'Emerson Electric'],
    industryMix: ['aerospace + defense', 'automotive', 'food + beverage', 'industrial'],
  },

  'kansas-city': {
    intro:
      "Servicing the Kansas City metro \u2014 the Ford / GM assembly corridor, the Honeywell FM&T national-security campus, and the cross-state logistics + agribusiness belt running through the Bottoms.",
    industrialCorridors: [
      'Ford KCAP / GM Fairfax assembly',
      'Honeywell FM&T national security',
      'KC Bottoms food + logistics',
      'Olathe / Lenexa industrial',
      'Riverside logistics',
    ],
    topEmployers: ['Ford KCAP', 'General Motors Fairfax', 'Honeywell FM&T', 'Cerner / Oracle Health', 'Smithfield Foods'],
    industryMix: ['automotive', 'defense', 'food processing', 'logistics'],
  },

  'indianapolis': {
    intro:
      "Servicing Central Indiana \u2014 the Rolls-Royce engine campus, the Eli Lilly biopharma corridor, and the Whitestown / Plainfield logistics belt feeding the eastern half of the country.",
    industrialCorridors: [
      'Rolls-Royce Indianapolis',
      'Eli Lilly biopharma corridor',
      'Plainfield / Whitestown logistics',
      'Anderson EV + battery',
      'Greenwood industrial',
    ],
    topEmployers: ['Rolls-Royce North America', 'Eli Lilly', 'Cummins (Columbus)', 'Subaru of Indiana', 'Allison Transmission'],
    industryMix: ['aerospace', 'pharmaceuticals', 'automotive + transmissions', 'logistics'],
  },

  'columbus': {
    intro:
      "Servicing Central Ohio \u2014 the Intel Ohio One semiconductor megafab in New Albany, the Honda Marysville assembly belt, and the Rickenbacker logistics corridor.",
    industrialCorridors: [
      'Intel Ohio One megafab',
      'Honda Marysville assembly',
      'Rickenbacker logistics',
      'Etna / New Albany advanced manufacturing',
      'West Jefferson industrial',
    ],
    topEmployers: ['Intel Ohio One', 'Honda of America Manufacturing', 'Worthington Industries', 'Cardinal Health', 'Anheuser-Busch'],
    industryMix: ['semiconductor', 'automotive', 'logistics', 'consumer products'],
  },

  'charlotte': {
    intro:
      "Servicing the Charlotte / Piedmont metro \u2014 the Honeywell + Siemens energy + automation cluster, the Concord NASCAR race-shop corridor, and the Lake Norman EV / battery belt.",
    industrialCorridors: [
      'Concord NASCAR race-shop corridor',
      'Lake Norman EV / battery',
      'University Research Park',
      'Steele Creek industrial',
      'Mooresville advanced manufacturing',
    ],
    topEmployers: ['Honeywell Aerospace', 'Siemens Energy', 'Albemarle', 'Atrium Health', 'Honda Aircraft (Greensboro)'],
    industryMix: ['energy + automation', 'aerospace', 'EV / battery', 'specialty manufacturing'],
  },

  'raleigh': {
    intro:
      "Servicing the Research Triangle \u2014 the RTP biotech + semiconductor cluster, the Wake Forest / Cary medical-device belt, and the rapidly-growing EV-supplier base around Chatham County.",
    industrialCorridors: [
      'Research Triangle Park',
      'Wake Forest / Cary medical',
      'Chatham County EV cluster',
      'NC State Centennial Campus',
      'Garner industrial',
    ],
    topEmployers: ['Wolfspeed', 'IBM RTP', 'Cisco', 'GlaxoSmithKline', 'Toyota Battery NC', 'Pfizer'],
    industryMix: ['semiconductor', 'pharmaceuticals', 'EV / battery', 'medical devices'],
  },

  'tampa': {
    intro:
      "Servicing the Tampa Bay metro \u2014 the MacDill / Tampa Defense corridor, the Largo medical-device cluster, and the Plant City / Lakeland logistics + food-processing belt.",
    industrialCorridors: [
      'MacDill / Tampa Defense',
      'Largo medical-device cluster',
      'Plant City / Lakeland logistics',
      'Sabal Park industrial',
      'St. Petersburg manufacturing',
    ],
    topEmployers: ['Raymond James', 'Jabil', 'Honeywell Largo', 'Publix Super Markets', 'CSX Transportation'],
    industryMix: ['electronics manufacturing', 'medical devices', 'logistics', 'defense'],
  },

  'orlando': {
    intro:
      "Servicing Central Florida \u2014 the Lake Nona Medical City + simulation cluster, the Sanford / Lake Mary defense electronics belt, and the I-4 logistics corridor through Winter Garden.",
    industrialCorridors: [
      'Lake Nona Medical City + sim',
      'Sanford / Lake Mary defense',
      'I-4 logistics corridor',
      'East Orlando UCF research belt',
      'Apopka / Plymouth manufacturing',
    ],
    topEmployers: ['Lockheed Martin Missiles & Fire Control', 'L3Harris', 'Siemens Energy', 'AdventHealth', 'Mitsubishi Hitachi Power Systems'],
    industryMix: ['defense + simulation', 'energy', 'medical devices', 'logistics'],
  },

  'miami': {
    intro:
      "Servicing the South Florida industrial corridor \u2014 the Doral / Miami Free Zone logistics belt, the Hialeah manufacturing district, and the Port of Miami cargo + cruise complex.",
    industrialCorridors: [
      'Doral / Miami Free Zone',
      'Hialeah manufacturing',
      'Port of Miami cargo',
      'Medley industrial',
      'Opa-locka aviation',
    ],
    topEmployers: ['American Airlines (cargo + MRO)', 'Carnival Corporation', 'Royal Caribbean', 'B/E Aerospace', 'Watsco'],
    industryMix: ['aviation MRO', 'maritime + cruise', 'logistics', 'cargo handling'],
  },

  'baltimore': {
    intro:
      "Servicing the Baltimore / Mid-Atlantic industrial belt \u2014 the Johns Hopkins / APL research cluster, the Sparrows Point logistics + heavy-industry redevelopment, and the Tradepoint Atlantic mega-site.",
    industrialCorridors: [
      'Johns Hopkins APL research',
      'Sparrows Point / Tradepoint Atlantic',
      'BWI Marshall logistics',
      'Hunt Valley advanced manufacturing',
      'Aberdeen Proving Ground defense',
    ],
    topEmployers: ['Johns Hopkins APL', 'Northrop Grumman BWI', 'Lockheed Martin Aberdeen', 'McCormick', 'Under Armour'],
    industryMix: ['defense research', 'aerospace', 'logistics', 'consumer products'],
  },

  'milwaukee': {
    intro:
      "Servicing the Milwaukee industrial corridor \u2014 the Rockwell Automation HQ campus, the Harley-Davidson assembly + parts belt, and the Foxconn / Mount Pleasant Wisconsin Valley advanced-manufacturing site.",
    industrialCorridors: [
      'Rockwell Automation HQ',
      'Harley-Davidson assembly',
      'Foxconn / Wisconsin Valley',
      'Menomonee Valley industrial',
      'Oak Creek manufacturing',
    ],
    topEmployers: ['Rockwell Automation', 'Harley-Davidson', 'Johnson Controls', 'GE Healthcare', 'Briggs & Stratton'],
    industryMix: ['industrial automation', 'motorcycles + powersports', 'medical equipment', 'controls'],
  },
};

/** Lookup helper. Returns undefined if no profile is curated yet. */
export function getCityProfile(slug: string): CityProfile | undefined {
  return cityProfiles[slug];
}
