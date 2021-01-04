const adjectives = ["Amazing", "Awesome", "Blithesome", "Excellent", "Fabulous", "Fantastic", "Favorable", "Fortuitous", "Great", "Incredible", "Ineffable", "Mirthful", "Outstanding", "Perfect", "Propitious", "Remarkable", "Smart", "Spectacular", "Splendid", "Stellar", "Stupendous", "Super", "Ultimate", "Unbelievable", "Wondrous", "Adaptable", "Adventurous", "Affable", "Affectionate", "Agreeable", "Ambitious", "Amiable", "Amicable", "Amusing", "Brave", "Bright", "Calm", "Careful", "Charming", "Communicative", "Compassionate", "Conscientious", "Considerate", "Convivial", "Courageous", "Courteous", "Creative", "Decisive", "Determined", "Diligent", "Diplomatic", "Discreet", "Dynamic", "Easygoing", "Emotional", "Energetic", "Enthusiastic", "Exuberant", "Faithful", "Fearless", "Forceful", "Frank", "Friendly", "Funny", "Generous", "Gentle", "Good", "Gregarious", "Helpful", "Honest", "Humorous", "Imaginative", "Impartial", "Independent", "Intellectual", "Intelligent", "Intuitive", "Inventive", "Kind", "Loving", "Loyal", "Modest", "Neat", "Nice", "Optimistic", "Passionate", "Patient", "Persistent ", "Pioneering", "Philosophical", "Placid", "Plucky", "Polite", "Powerful", "Practical", "Quick-witted", "Quiet", "Rational", "Reliable", "Reserved", "Resourceful", "Romantic", "Sincere", "Sociable", "Straightforward", "Sympathetic", "Thoughtful", "Tidy", "Tough", "Unassuming", "Understanding", "Versatile", "Warmhearted", "Willing", "Witty"];
const names = ["Bounderby", "Honeythunder", "Rosa", "Barbara", "Sharp", "Berry", "Pott", "Squod", "Fladdock", "Barley", "Limpkins", "Norris", "Tiny", "Dombey", "Arabella", "Turveydrop", "Lambert", "Filer", "Morris", "Present", "Chopkins", "Leeford", "Strong", "Major", "Bobster", "Cleaver", "Borum", "Pugstyles", "May", "Edmund", "Aunt", "Children", "Jenkins", "Chicken", "Tobias", "Dot", "Fanny", "Marion", "Scadder", "Whimple", "Biddy", "Trabb", "Pip", "Fagin", "Johnson", "Simon", "Phib", "Horatio", "Bradley", "Miss", "Simmonds", "Young", "Avenger", "Drood", "Priscilla", "Wegg", "Tupman", "Flintwinch", "Copperfield", "Alfred", "Snewkes", "Kenwigs", "Plornish", "Bart", "Single", "Jobling", "Smauker", "Charley", "Sydney", "Caroline", "Gills", "Bodgers", "Ann", "Harry", "Pawkins", "Shepherd", "Gazingi", "Beadwood", "Mortimer", "Drummle", "Richard", "Tungay", "Tomkins", "Defarge", "Weevle", "Slowboy", "Britain", "Rugg", "Bevan", "Childers", "Lady", "Fielding", "Clickett", "Parent", "Chestle", "Emily", "Gregsbury", "Donny", "Hannibal", "Tutor", "Soldier", "Sheriff", "Critic", "Artiste", "Agent", "Subaltern", "Estimator", "Director", "Realtor", "Ranchers", "Judge", "Traveler", "Sailor", "Brewer", "Chemist", "Undertaker", "Trainer", "Merchant", "Millwright", "Engineer", "Acrobat", "Robber", "Singer", "Auditor", "Cook", "Mortician", "Academic", "Buyer", "Astronomer", "Geologist", "Girlguide", "Accountant", "Technician", "Major", "Hunter", "Paramedic", "Teacher", "Pilot", "Writer", "Prisoner", "Author", "Senator", "Scientist", "Consultant", "Craftsman", "Farmer", "Magician", "Worshipper", "Trustee", "Capitalist", "Actuary", "Appraiser", "Player", "Horseman", "Advisor"];

export function generateRandomUsername() {
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNum = Math.floor(Math.random() * 100);
  return `${randomAdj}${randomName}${randomNum}`;
};