/**
 * Top 75 US cities for Farhand programmatic SEO landing pages.
 *
 * Combines the TOP_CITIES list from scripts/content-pipeline.ts with
 * additional manufacturing and industrial hubs. Each entry renders as
 * one static landing page per machine type (75 cities x 7 machines = 525).
 */

export interface City {
  /** City name (e.g., "Chicago") */
  name: string;
  /** Two-letter state code (e.g., "IL") */
  state: string;
  /** Full state name (e.g., "Illinois") */
  stateName: string;
  /** URL slug, lowercase-hyphenated (e.g., "chicago") */
  slug: string;
  /** Approximate city population, in rough-but-recognizable figures */
  population: number;
  /** Metropolitan area label used for pitch copy */
  metroArea: string;
}

export const cities: City[] = [
  // Tier 1 — the biggest metros
  { name: 'New York', state: 'NY', stateName: 'New York', slug: 'new-york', population: 8300000, metroArea: 'New York–Newark metro' },
  { name: 'Los Angeles', state: 'CA', stateName: 'California', slug: 'los-angeles', population: 3900000, metroArea: 'Greater Los Angeles' },
  { name: 'Chicago', state: 'IL', stateName: 'Illinois', slug: 'chicago', population: 2700000, metroArea: 'Chicagoland manufacturing belt' },
  { name: 'Houston', state: 'TX', stateName: 'Texas', slug: 'houston', population: 2300000, metroArea: 'Houston energy corridor' },
  { name: 'Phoenix', state: 'AZ', stateName: 'Arizona', slug: 'phoenix', population: 1650000, metroArea: 'Phoenix metro' },
  { name: 'Philadelphia', state: 'PA', stateName: 'Pennsylvania', slug: 'philadelphia', population: 1570000, metroArea: 'Delaware Valley industrial corridor' },
  { name: 'San Antonio', state: 'TX', stateName: 'Texas', slug: 'san-antonio', population: 1470000, metroArea: 'South Texas metro' },
  { name: 'San Diego', state: 'CA', stateName: 'California', slug: 'san-diego', population: 1390000, metroArea: 'San Diego life-sciences corridor' },
  { name: 'Dallas', state: 'TX', stateName: 'Texas', slug: 'dallas', population: 1310000, metroArea: 'Dallas–Fort Worth metroplex' },
  { name: 'San Jose', state: 'CA', stateName: 'California', slug: 'san-jose', population: 1000000, metroArea: 'Silicon Valley' },

  // Tier 2 — major metros and hubs
  { name: 'Austin', state: 'TX', stateName: 'Texas', slug: 'austin', population: 980000, metroArea: 'Central Texas tech corridor' },
  { name: 'Jacksonville', state: 'FL', stateName: 'Florida', slug: 'jacksonville', population: 950000, metroArea: 'Northeast Florida' },
  { name: 'Fort Worth', state: 'TX', stateName: 'Texas', slug: 'fort-worth', population: 920000, metroArea: 'Dallas–Fort Worth metroplex' },
  { name: 'Columbus', state: 'OH', stateName: 'Ohio', slug: 'columbus', population: 900000, metroArea: 'Central Ohio advanced manufacturing belt' },
  { name: 'Charlotte', state: 'NC', stateName: 'North Carolina', slug: 'charlotte', population: 880000, metroArea: 'Charlotte metro' },
  { name: 'Indianapolis', state: 'IN', stateName: 'Indiana', slug: 'indianapolis', population: 880000, metroArea: 'Central Indiana manufacturing corridor' },
  { name: 'San Francisco', state: 'CA', stateName: 'California', slug: 'san-francisco', population: 810000, metroArea: 'San Francisco Bay Area' },
  { name: 'Seattle', state: 'WA', stateName: 'Washington', slug: 'seattle', population: 750000, metroArea: 'Puget Sound aerospace corridor' },
  { name: 'Denver', state: 'CO', stateName: 'Colorado', slug: 'denver', population: 720000, metroArea: 'Front Range metro' },
  { name: 'Nashville', state: 'TN', stateName: 'Tennessee', slug: 'nashville', population: 690000, metroArea: 'Middle Tennessee' },

  // Tier 3 — secondary metros
  { name: 'Oklahoma City', state: 'OK', stateName: 'Oklahoma', slug: 'oklahoma-city', population: 690000, metroArea: 'Oklahoma City metro' },
  { name: 'El Paso', state: 'TX', stateName: 'Texas', slug: 'el-paso', population: 680000, metroArea: 'El Paso–Juarez border manufacturing zone' },
  { name: 'Washington', state: 'DC', stateName: 'District of Columbia', slug: 'washington-dc', population: 670000, metroArea: 'National Capital Region' },
  { name: 'Boston', state: 'MA', stateName: 'Massachusetts', slug: 'boston', population: 650000, metroArea: 'Greater Boston life-sciences cluster' },
  { name: 'Las Vegas', state: 'NV', stateName: 'Nevada', slug: 'las-vegas', population: 650000, metroArea: 'Las Vegas Valley' },
  { name: 'Portland', state: 'OR', stateName: 'Oregon', slug: 'portland', population: 650000, metroArea: 'Silicon Forest' },
  { name: 'Memphis', state: 'TN', stateName: 'Tennessee', slug: 'memphis', population: 630000, metroArea: 'Mid-South logistics hub' },
  { name: 'Louisville', state: 'KY', stateName: 'Kentucky', slug: 'louisville', population: 620000, metroArea: 'Kentuckiana logistics corridor' },
  { name: 'Baltimore', state: 'MD', stateName: 'Maryland', slug: 'baltimore', population: 580000, metroArea: 'Baltimore–Washington metro' },
  { name: 'Milwaukee', state: 'WI', stateName: 'Wisconsin', slug: 'milwaukee', population: 570000, metroArea: 'Southeast Wisconsin industrial belt' },

  // Tier 4 — mid-size metros
  { name: 'Albuquerque', state: 'NM', stateName: 'New Mexico', slug: 'albuquerque', population: 560000, metroArea: 'Albuquerque metro' },
  { name: 'Tucson', state: 'AZ', stateName: 'Arizona', slug: 'tucson', population: 550000, metroArea: 'Tucson metro' },
  { name: 'Fresno', state: 'CA', stateName: 'California', slug: 'fresno', population: 540000, metroArea: 'Central Valley' },
  { name: 'Sacramento', state: 'CA', stateName: 'California', slug: 'sacramento', population: 525000, metroArea: 'Sacramento metro' },
  { name: 'Mesa', state: 'AZ', stateName: 'Arizona', slug: 'mesa', population: 510000, metroArea: 'Phoenix East Valley' },
  { name: 'Kansas City', state: 'MO', stateName: 'Missouri', slug: 'kansas-city', population: 510000, metroArea: 'Kansas City metro' },
  { name: 'Atlanta', state: 'GA', stateName: 'Georgia', slug: 'atlanta', population: 500000, metroArea: 'Metro Atlanta' },
  { name: 'Omaha', state: 'NE', stateName: 'Nebraska', slug: 'omaha', population: 490000, metroArea: 'Omaha metro' },
  { name: 'Raleigh', state: 'NC', stateName: 'North Carolina', slug: 'raleigh', population: 480000, metroArea: 'Research Triangle' },
  { name: 'Miami', state: 'FL', stateName: 'Florida', slug: 'miami', population: 450000, metroArea: 'South Florida' },

  // Tier 5 — industrial and regional hubs
  { name: 'Minneapolis', state: 'MN', stateName: 'Minnesota', slug: 'minneapolis', population: 430000, metroArea: 'Twin Cities medical-device corridor' },
  { name: 'Tampa', state: 'FL', stateName: 'Florida', slug: 'tampa', population: 410000, metroArea: 'Tampa Bay' },
  { name: 'New Orleans', state: 'LA', stateName: 'Louisiana', slug: 'new-orleans', population: 380000, metroArea: 'Greater New Orleans' },
  { name: 'Cleveland', state: 'OH', stateName: 'Ohio', slug: 'cleveland', population: 370000, metroArea: 'Northeast Ohio manufacturing belt' },
  { name: 'Honolulu', state: 'HI', stateName: 'Hawaii', slug: 'honolulu', population: 345000, metroArea: 'Oahu' },
  { name: 'Pittsburgh', state: 'PA', stateName: 'Pennsylvania', slug: 'pittsburgh', population: 300000, metroArea: 'Pittsburgh robotics corridor' },
  { name: 'Cincinnati', state: 'OH', stateName: 'Ohio', slug: 'cincinnati', population: 310000, metroArea: 'Greater Cincinnati' },
  { name: 'St. Louis', state: 'MO', stateName: 'Missouri', slug: 'st-louis', population: 300000, metroArea: 'St. Louis metro' },
  { name: 'Orlando', state: 'FL', stateName: 'Florida', slug: 'orlando', population: 310000, metroArea: 'Central Florida simulation corridor' },
  { name: 'Detroit', state: 'MI', stateName: 'Michigan', slug: 'detroit', population: 640000, metroArea: 'Detroit automotive manufacturing belt' },

  // Tier 6 — manufacturing and mid-market hubs
  { name: 'Salt Lake City', state: 'UT', stateName: 'Utah', slug: 'salt-lake-city', population: 200000, metroArea: 'Wasatch Front' },
  { name: 'Birmingham', state: 'AL', stateName: 'Alabama', slug: 'birmingham', population: 200000, metroArea: 'Birmingham metro' },
  { name: 'Richmond', state: 'VA', stateName: 'Virginia', slug: 'richmond', population: 230000, metroArea: 'Richmond metro' },
  { name: 'Boise', state: 'ID', stateName: 'Idaho', slug: 'boise', population: 240000, metroArea: 'Treasure Valley' },
  { name: 'Des Moines', state: 'IA', stateName: 'Iowa', slug: 'des-moines', population: 215000, metroArea: 'Central Iowa' },
  { name: 'Spokane', state: 'WA', stateName: 'Washington', slug: 'spokane', population: 230000, metroArea: 'Inland Northwest' },
  { name: 'Charleston', state: 'SC', stateName: 'South Carolina', slug: 'charleston', population: 155000, metroArea: 'Lowcountry aerospace hub' },
  { name: 'Knoxville', state: 'TN', stateName: 'Tennessee', slug: 'knoxville', population: 190000, metroArea: 'East Tennessee' },
  { name: 'Chattanooga', state: 'TN', stateName: 'Tennessee', slug: 'chattanooga', population: 180000, metroArea: 'Tennessee Valley manufacturing corridor' },
  { name: 'Lexington', state: 'KY', stateName: 'Kentucky', slug: 'lexington', population: 320000, metroArea: 'Bluegrass region' },

  // Tier 7 — specialized and smaller metros
  { name: 'Tulsa', state: 'OK', stateName: 'Oklahoma', slug: 'tulsa', population: 410000, metroArea: 'Tulsa metro' },
  { name: 'Akron', state: 'OH', stateName: 'Ohio', slug: 'akron', population: 190000, metroArea: 'Akron polymer corridor' },
  { name: 'Dayton', state: 'OH', stateName: 'Ohio', slug: 'dayton', population: 140000, metroArea: 'Miami Valley aerospace corridor' },
  { name: 'Reno', state: 'NV', stateName: 'Nevada', slug: 'reno', population: 265000, metroArea: 'Truckee Meadows' },
  { name: 'Madison', state: 'WI', stateName: 'Wisconsin', slug: 'madison', population: 270000, metroArea: 'South-Central Wisconsin' },
  { name: 'Huntsville', state: 'AL', stateName: 'Alabama', slug: 'huntsville', population: 215000, metroArea: 'Rocket City aerospace corridor' },
  { name: 'Little Rock', state: 'AR', stateName: 'Arkansas', slug: 'little-rock', population: 200000, metroArea: 'Central Arkansas' },
  { name: 'Savannah', state: 'GA', stateName: 'Georgia', slug: 'savannah', population: 150000, metroArea: 'Coastal Georgia logistics hub' },
  { name: 'Durham', state: 'NC', stateName: 'North Carolina', slug: 'durham', population: 290000, metroArea: 'Research Triangle' },
  { name: 'Rochester', state: 'NY', stateName: 'New York', slug: 'rochester', population: 210000, metroArea: 'Finger Lakes optics corridor' },
  { name: 'Grand Rapids', state: 'MI', stateName: 'Michigan', slug: 'grand-rapids', population: 200000, metroArea: 'West Michigan furniture and manufacturing belt' },
  { name: 'Buffalo', state: 'NY', stateName: 'New York', slug: 'buffalo', population: 275000, metroArea: 'Western New York' },
  { name: 'Hartford', state: 'CT', stateName: 'Connecticut', slug: 'hartford', population: 120000, metroArea: 'Greater Hartford aerospace corridor' },
  { name: 'Providence', state: 'RI', stateName: 'Rhode Island', slug: 'providence', population: 190000, metroArea: 'Providence metro' },
  { name: 'Wichita', state: 'KS', stateName: 'Kansas', slug: 'wichita', population: 395000, metroArea: 'Air Capital of the World' },
];

/** Lookup a city by its URL slug. Returns `undefined` if not found. */
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
