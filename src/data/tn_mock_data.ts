export interface Constituency {
  id: string;
  name_en: string;
  name_ta: string;
  district: string;
  coordinates: { lat: number; lng: number };
}

export interface PollingBooth {
  id: string;
  constituencyId: string;
  name_en: string;
  name_ta: string;
  address_en: string;
  address_ta: string;
  coordinates: { lat: number; lng: number };
  accessibility: boolean;
}

export const TN_CONSTITUENCIES: Constituency[] = [
  { id: 'tn-11', name_en: 'Dr. Radhakrishnan Nagar', name_ta: 'டாக்டர் ராதாகிருஷ்ணன் நகர்', district: 'Chennai', coordinates: { lat: 13.1234, lng: 80.2872 } },
  { id: 'tn-12', name_en: 'Perambur', name_ta: 'பெரம்பூர்', district: 'Chennai', coordinates: { lat: 13.1118, lng: 80.2458 } },
  { id: 'tn-13', name_en: 'Kolathur', name_ta: 'கொளத்தூர்', district: 'Chennai', coordinates: { lat: 13.1293, lng: 80.2188 } },
  { id: 'tn-14', name_en: 'Villivakkam', name_ta: 'வில்லிவாக்கம்', district: 'Chennai', coordinates: { lat: 13.1075, lng: 80.2078 } },
  // Sample data extended logically
  { id: 'tn-121', name_en: 'Coimbatore South', name_ta: 'கோயம்புத்தூர் தெற்கு', district: 'Coimbatore', coordinates: { lat: 10.9996, lng: 76.9637 } },
  { id: 'tn-190', name_en: 'Madurai Central', name_ta: 'மதுரை மையம்', district: 'Madurai', coordinates: { lat: 9.9252, lng: 78.1198 } },
];

export const MOCK_BOOTHS: PollingBooth[] = [
  {
    id: 'booth-1',
    constituencyId: 'tn-13',
    name_en: 'Govt Higher Secondary School, Kolathur',
    name_ta: 'அரசு மேல்நிலைப் பள்ளி, கொளத்தூர்',
    address_en: 'Main Rd, Kolathur, Chennai 600099',
    address_ta: 'முக்கிய சாலை, கொளத்தூர், சென்னை 600099',
    coordinates: { lat: 13.1290, lng: 80.2190 },
    accessibility: true
  },
  {
    id: 'booth-2',
    constituencyId: 'tn-121',
    name_en: 'Corporation Middle School',
    name_ta: 'மாநகராட்சி நடுநிலைப் பள்ளி',
    address_en: 'Town Hall, Coimbatore 641001',
    address_ta: 'டவுன் ஹால், கோயம்புத்தூர் 641001',
    coordinates: { lat: 10.9980, lng: 76.9620 },
    accessibility: true
  }
];

export const TN_TIMELINE = [
  {
    id: 'notification',
    title_en: 'Issue of Notification',
    title_ta: 'அறிவிப்பு வெளியீடு',
    date: new Date('2024-03-20'),
    description_en: 'Official announcement of the election schedule and start of the formal process.',
    description_ta: 'தேர்தல் கால அட்டவணையின் அதிகாரப்பூர்வ அறிவிப்பு மற்றும் முறையான செயல்முறையின் தொடக்கம்.',
    status: 'completed'
  },
  {
    id: 'nominations',
    title_en: 'Last Date for Nominations',
    title_ta: 'வேட்புமனுக்களுக்கான கடைசி நாள்',
    date: new Date('2024-03-27'),
    description_en: 'Final deadline for candidates to file their nomination papers.',
    description_ta: 'வேட்பாளர்கள் தங்கள் வேட்புமனுக்களை தாக்கல் செய்வதற்கான இறுதி காலக்கெடு.',
    status: 'completed'
  },
  {
    id: 'scrutiny',
    title_en: 'Scrutiny of Nominations',
    title_ta: 'வேட்புமனுக்கள் பரிசீலனை',
    date: new Date('2024-03-28'),
    description_en: 'Verification of filed nomination papers by election officials.',
    description_ta: 'தேர்தல் அதிகாரிகளால் தாக்கல் செய்யப்பட்ட வேட்புமனுக்களின் சரிபார்ப்பு.',
    status: 'completed'
  },
  {
    id: 'polling',
    title_en: 'Polling Day',
    title_ta: 'வாக்குப்பதிவு நாள்',
    date: new Date('2024-04-19'),
    description_en: 'Voting is currently underway. Ensure you have your EPIC card ready.',
    description_ta: 'வாக்குப்பதிவு தற்போது நடைபெற்று வருகிறது. உங்கள் EPIC அட்டை தயாராக இருப்பதை உறுதி செய்யவும்.',
    status: 'active'
  },
  {
    id: 'counting',
    title_en: 'Counting of Votes',
    title_ta: 'வாக்குகள் எண்ணிக்கை',
    date: new Date('2024-06-04'),
    description_en: 'The final stage where votes from EVMs across the state are tallied.',
    description_ta: 'மாநிலம் முழுவதும் உள்ள EVM-களின் வாக்குகள் எண்ணப்படும் இறுதி நிலை.',
    status: 'upcoming'
  }
];
