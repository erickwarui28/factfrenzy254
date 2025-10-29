import type { Question } from '../../shared/types/api';

export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    question: 'Which animal has the largest eyes relative to its body size?',
    options: ['Elephant', 'Owl', 'Giant Squid', 'Horse'],
    correctAnswer: 2,
    explanation: 'The giant squid has eyes that can reach 10 inches across - about the size of a basketball!',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'What is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'Liechtenstein', 'San Marino'],
    correctAnswer: 1,
    explanation: 'Vatican City covers only 0.17 square miles and is completely surrounded by Rome.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q3',
    question: 'Which planet is known as the "Red Planet"?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    explanation: 'Mars appears red due to iron oxide (rust) on its surface, giving it the nickname "Red Planet".',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    question: 'Who painted the Mona Lisa?',
    options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
    correctAnswer: 1,
    explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503-1519. It\'s now housed in the Louvre Museum.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Leopard', 'Gazelle'],
    correctAnswer: 1,
    explanation: 'Cheetahs can reach speeds of up to 70 mph (113 km/h) in short bursts covering distances up to 1,500 feet.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q6',
    question: 'Which ocean is the largest?',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    correctAnswer: 2,
    explanation: 'The Pacific Ocean covers more than 30% of Earth\'s surface and contains more than half of the planet\'s free water.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q7',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    explanation: 'Au comes from the Latin word "aurum" meaning gold. Ag is silver (from "argentum").',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q8',
    question: 'Which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: 1,
    explanation: 'World War II ended in 1945 with Japan\'s surrender on September 2nd, following the atomic bombings.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: 'q9',
    question: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 1,
    explanation: 'The blue whale can grow up to 100 feet long and weigh up to 200 tons - larger than any dinosaur!',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q10',
    question: 'Which gas makes up most of Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
    correctAnswer: 2,
    explanation: 'Nitrogen makes up about 78% of Earth\'s atmosphere, while oxygen is only about 21%.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q11',
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 2,
    explanation: 'Canberra is Australia\'s capital city, chosen as a compromise between Sydney and Melbourne.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q12',
    question: 'How many hearts does an octopus have?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: 'Octopuses have 3 hearts - two pump blood to the gills, and one pumps blood to the rest of the body.',
    category: 'Animals',
    difficulty: 'hard'
  },
  {
    id: 'q13',
    question: 'What is the smallest bone in the human body?',
    options: ['Femur', 'Stapes', 'Tibia', 'Radius'],
    correctAnswer: 1,
    explanation: 'The stapes (stirrup bone) in the middle ear is the smallest bone, measuring about 3mm.',
    category: 'Science',
    difficulty: 'hard'
  },
  {
    id: 'q14',
    question: 'Which country has the most natural lakes?',
    options: ['Russia', 'Canada', 'Finland', 'United States'],
    correctAnswer: 1,
    explanation: 'Canada has over 2 million lakes, more than any other country in the world.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q15',
    question: 'What is the only mammal that can fly?',
    options: ['Flying Squirrel', 'Bat', 'Flying Fox', 'Sugar Glider'],
    correctAnswer: 1,
    explanation: 'Bats are the only mammals capable of true flight, using their wing membranes.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q16',
    question: 'Which element has the chemical symbol "Fe"?',
    options: ['Fluorine', 'Iron', 'Francium', 'Fermium'],
    correctAnswer: 1,
    explanation: 'Fe is iron, from the Latin word "ferrum". It\'s one of the most abundant elements on Earth.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q17',
    question: 'What is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
    correctAnswer: 1,
    explanation: 'The Nile River is approximately 4,135 miles long, flowing through 11 countries.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q18',
    question: 'Which ancient wonder of the world still exists today?',
    options: ['Hanging Gardens', 'Colossus of Rhodes', 'Great Pyramid', 'Lighthouse of Alexandria'],
    correctAnswer: 2,
    explanation: 'The Great Pyramid of Giza is the only ancient wonder still standing, built around 2580-2560 BC.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: 'q19',
    question: 'What percentage of a watermelon is water?',
    options: ['70%', '80%', '90%', '95%'],
    correctAnswer: 2,
    explanation: 'Watermelons are about 92% water, making them one of the most hydrating fruits.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q20',
    question: 'Which country has the most time zones?',
    options: ['Russia', 'United States', 'China', 'Brazil'],
    correctAnswer: 0,
    explanation: 'Russia spans 11 time zones, more than any other country in the world.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q21',
    question: 'What is the only continent without any reptiles?',
    options: ['Antarctica', 'Australia', 'Europe', 'North America'],
    correctAnswer: 0,
    explanation: 'Antarctica is too cold for reptiles, which are cold-blooded and cannot survive the extreme temperatures.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q22',
    question: 'How many minutes are in a day?',
    options: ['1,440', '1,200', '1,600', '1,800'],
    correctAnswer: 0,
    explanation: 'There are 24 hours × 60 minutes = 1,440 minutes in a day.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q23',
    question: 'Which animal can sleep for up to 22 hours a day?',
    options: ['Sloth', 'Koala', 'Cat', 'Hedgehog'],
    correctAnswer: 1,
    explanation: 'Koalas sleep 18-22 hours per day due to their low-energy eucalyptus diet.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q24',
    question: 'What is the largest desert in the world?',
    options: ['Sahara', 'Arabian', 'Antarctic', 'Gobi'],
    correctAnswer: 2,
    explanation: 'Antarctica is technically the largest desert, covering 5.5 million square miles.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q25',
    question: 'Which planet has the most moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctAnswer: 0,
    explanation: 'Jupiter has over 80 known moons, including the four large Galilean moons.',
    category: 'Science',
    difficulty: 'medium'
  },
  // New Animal Category Questions (q26-q50)
  {
    id: 'q26',
    question: 'How many types of color receptors do mantis shrimp have compared to humans?',
    options: ['3 (same as humans)', '8', '16', '24'],
    correctAnswer: 2,
    explanation: 'Mantis shrimp have 16 types of color receptors compared to humans\' 3, allowing them to see ultraviolet, visible, and polarized light in incredible detail.',
    category: 'Animals',
    difficulty: 'hard'
  },
  {
    id: 'q27',
    question: 'Which microscopic animal can survive in the vacuum of space?',
    options: ['Tardigrade', 'Rotifer', 'Nematode', 'Paramecium'],
    correctAnswer: 0,
    explanation: 'Tardigrades (water bears) can survive extreme conditions including space vacuum, radiation, and temperatures from near absolute zero to 300°F.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q28',
    question: 'What do octopuses use coconut shells for?',
    options: ['Food storage', 'Portable shelters', 'Hunting tools', 'Communication'],
    correctAnswer: 1,
    explanation: 'Octopuses have been observed carrying coconut shell halves and assembling them into portable shelters, demonstrating remarkable tool use and planning.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q29',
    question: 'How often must a hummingbird eat to survive?',
    options: ['Every hour', 'Every 30 minutes', 'Every 10-15 minutes', 'Every 5 minutes'],
    correctAnswer: 2,
    explanation: 'Hummingbirds have such a fast metabolism that they must eat every 10-15 minutes during daylight hours, with hearts beating up to 1,260 times per minute.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q30',
    question: 'Which animal can recognize itself in a mirror?',
    options: ['Dolphin', 'Elephant', 'Chimpanzee', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Elephants, dolphins, and chimpanzees all pass the mirror self-recognition test, showing advanced self-awareness and intelligence.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q31',
    question: 'What unique vocal feature do dolphins have?',
    options: ['Perfect pitch', 'Signature whistles', 'Ultrasonic calls', 'Harmonic singing'],
    correctAnswer: 1,
    explanation: 'Each dolphin develops a unique signature whistle that functions like a name, allowing them to identify and call to specific individuals.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q32',
    question: 'How do emperor penguins find their mates among thousands?',
    options: ['Visual recognition', 'Scent marking', 'Unique calls', 'Dance patterns'],
    correctAnswer: 2,
    explanation: 'Emperor penguins can identify their specific mate among thousands of identical-looking penguins using unique vocal calls.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q33',
    question: 'What can sharks detect that is measured in billionths of a volt?',
    options: ['Brain waves', 'Electrical fields', 'Sound vibrations', 'Chemical traces'],
    correctAnswer: 1,
    explanation: 'Sharks can detect electrical fields as weak as 5 billionths of a volt, allowing them to sense the muscle contractions of hidden prey.',
    category: 'Animals',
    difficulty: 'hard'
  },
  {
    id: 'q34',
    question: 'Why do giraffes have the highest blood pressure of any animal?',
    options: ['Large heart size', 'Pump blood to brain', 'Fast metabolism', 'Thick blood vessels'],
    correctAnswer: 1,
    explanation: 'Giraffes need extremely high blood pressure (280/180 mmHg) to pump blood up their long necks to reach their brains 6 feet above their hearts.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q35',
    question: 'How do honeybees communicate the location of food sources?',
    options: ['Pheromone trails', 'Waggle dances', 'Wing vibrations', 'Color patterns'],
    correctAnswer: 1,
    explanation: 'Honeybees perform waggle dances that communicate both the distance and direction to food sources, with the angle and duration encoding precise location data.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q36',
    question: 'What seasonal change helps Arctic foxes survive?',
    options: ['Hibernation', 'Migration', 'Coat color change', 'Diet switching'],
    correctAnswer: 2,
    explanation: 'Arctic foxes change their coat from brown in summer to white in winter, providing perfect camouflage against both tundra and snow.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q37',
    question: 'What makes the platypus unique among mammals?',
    options: ['Lays eggs', 'Has electroreception', 'Produces venom', 'All of the above'],
    correctAnswer: 3,
    explanation: 'The platypus is the only mammal that lays eggs, has electroreception to detect prey underwater, and produces venom (males only).',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q38',
    question: 'What special ability do chameleon eyes have?',
    options: ['Night vision', 'Telescopic zoom', 'Independent movement', 'Color detection'],
    correctAnswer: 2,
    explanation: 'Chameleons can move their eyes independently, allowing them to look in two different directions simultaneously to watch for prey and predators.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q39',
    question: 'Why do sloths move so slowly?',
    options: ['Poor eyesight', 'Heavy bones', 'Low metabolism', 'Joint problems'],
    correctAnswer: 2,
    explanation: 'Sloths have such a slow metabolism that algae grows on their fur, which actually helps camouflage them in the trees.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q40',
    question: 'What sound phenomenon do pistol shrimp create?',
    options: ['Ultrasonic calls', 'Bubble collapse louder than gunshots', 'Harmonic resonance', 'Infrasonic waves'],
    correctAnswer: 1,
    explanation: 'Pistol shrimp snap their claws to create bubbles that collapse with a sound reaching 200 decibels - louder than a gunshot.',
    category: 'Animals',
    difficulty: 'hard'
  },
  {
    id: 'q41',
    question: 'What adaptation allows owls to fly silently?',
    options: ['Hollow bones', 'Special feather structure', 'Slow wing beats', 'Small body size'],
    correctAnswer: 1,
    explanation: 'Owls have specialized feathers with soft fringes that break up air turbulence, allowing completely silent flight for surprise attacks on prey.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q42',
    question: 'What unique reproductive ability do kangaroos have?',
    options: ['Pause pregnancy', 'Change gender', 'Clone offspring', 'Lay eggs'],
    correctAnswer: 0,
    explanation: 'Kangaroos can pause their pregnancy (diapause) until environmental conditions are favorable, ensuring babies are born when resources are abundant.',
    category: 'Animals',
    difficulty: 'hard'
  },
  {
    id: 'q43',
    question: 'How do woodpeckers avoid brain damage from constant hammering?',
    options: ['Thick skull', 'Special skull structure', 'Slow pecking', 'Soft wood only'],
    correctAnswer: 1,
    explanation: 'Woodpeckers have specialized skull structures including shock-absorbing tissues and a reinforced beak that distribute impact forces away from the brain.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q44',
    question: 'What tools do sea otters use while floating?',
    options: ['Sticks', 'Rocks', 'Shells', 'Seaweed'],
    correctAnswer: 1,
    explanation: 'Sea otters use rocks as tools to crack open shellfish while floating on their backs, often keeping a favorite rock in their armpit pouch.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q45',
    question: 'What is surprising about polar bear fur?',
    options: ['It\'s actually transparent', 'It changes color', 'It\'s waterproof', 'It glows in UV light'],
    correctAnswer: 0,
    explanation: 'Polar bear fur is actually transparent, not white, and their skin underneath is black. The hollow hairs scatter light to appear white.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q46',
    question: 'How do monarch butterflies navigate during migration?',
    options: ['Follow coastlines', 'Use magnetic fields', 'Follow other butterflies', 'Use star patterns'],
    correctAnswer: 1,
    explanation: 'Monarch butterflies use Earth\'s magnetic field along with the sun\'s position to navigate thousands of miles during their multi-generational migration.',
    category: 'Animals',
    difficulty: 'hard'
  },
  {
    id: 'q47',
    question: 'What amazing survival ability do wood frogs have?',
    options: ['Breathe underwater', 'Freeze solid and survive', 'Regenerate limbs', 'Change color'],
    correctAnswer: 1,
    explanation: 'Wood frogs can freeze solid during winter with up to 65% of their body water turning to ice, then thaw out alive in spring.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q48',
    question: 'How precise is bat echolocation?',
    options: ['Can detect objects as thin as human hair', 'Can see through walls', 'Can detect heartbeats', 'Can identify colors'],
    correctAnswer: 0,
    explanation: 'Bat echolocation is so precise they can distinguish objects as thin as human hair and differentiate between materials based on sound reflection.',
    category: 'Animals',
    difficulty: 'medium'
  },
  {
    id: 'q49',
    question: 'What camouflage ability do cuttlefish have?',
    options: ['Become invisible', 'Change color and texture instantly', 'Mimic other animals', 'Create light patterns'],
    correctAnswer: 1,
    explanation: 'Cuttlefish can instantly change both their color and skin texture to perfectly match their surroundings, making them masters of camouflage.',
    category: 'Animals',
    difficulty: 'easy'
  },
  {
    id: 'q50',
    question: 'What makes naked mole rats medically fascinating?',
    options: ['Immune to cancer', 'Never age', 'Regenerate organs', 'Immune to all diseases'],
    correctAnswer: 0,
    explanation: 'Naked mole rats are immune to cancer and can survive 18 minutes without oxygen, making them valuable for medical research on aging and disease.',
    category: 'Animals',
    difficulty: 'hard'
  },
  // New Geography Category Questions (q51-q75)
  {
    id: 'q51',
    question: 'How much deeper is the Mariana Trench compared to Mount Everest\'s height?',
    options: ['About the same', '1.5 times deeper', '2 times deeper', '3 times deeper'],
    correctAnswer: 1,
    explanation: 'The Mariana Trench reaches 36,200 feet deep while Mount Everest is 29,032 feet tall - if Everest were placed in the trench, it would still be over a mile underwater.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q52',
    question: 'What percentage of the world\'s unfrozen fresh water does Lake Baikal contain?',
    options: ['10%', '15%', '20%', '25%'],
    correctAnswer: 2,
    explanation: 'Lake Baikal in Russia contains about 20% of the world\'s unfrozen fresh water - more than all the Great Lakes combined.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q53',
    question: 'At what rate is the Sahara Desert expanding southward each year?',
    options: ['10 miles', '20 miles', '30 miles', '50 miles'],
    correctAnswer: 2,
    explanation: 'The Sahara Desert expands southward at about 30 miles per year due to climate change and overgrazing, threatening the Sahel region.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q54',
    question: 'How many times could Monaco fit inside New York\'s Central Park?',
    options: ['4 times', '6 times', '8 times', '12 times'],
    correctAnswer: 2,
    explanation: 'Monaco is so small (0.78 square miles) that it could fit inside Central Park (1.3 square miles) about 8 times.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q55',
    question: 'Which country has more saunas than cars?',
    options: ['Sweden', 'Norway', 'Finland', 'Iceland'],
    correctAnswer: 2,
    explanation: 'Finland has over 3 million saunas for its 5.5 million people, but only about 2.5 million cars - making it the sauna capital of the world.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q56',
    question: 'What unique environmental status does Bhutan hold?',
    options: ['Carbon neutral', 'Carbon negative', 'Zero waste', 'Renewable energy only'],
    correctAnswer: 1,
    explanation: 'Bhutan is the world\'s only carbon-negative country, absorbing more CO2 than it produces thanks to its constitutional requirement to maintain 60% forest cover.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q57',
    question: 'How much does Mount Everest grow taller each year?',
    options: ['1mm', '4mm', '1cm', '2cm'],
    correctAnswer: 1,
    explanation: 'Mount Everest grows about 4mm (0.16 inches) taller each year due to the ongoing collision between the Indian and Eurasian tectonic plates.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q58',
    question: 'What makes the Caspian Sea geographically unusual?',
    options: ['It\'s the saltiest water body', 'It\'s actually a lake', 'It\'s shrinking rapidly', 'It has no fish'],
    correctAnswer: 1,
    explanation: 'Despite its name, the Caspian Sea is actually the world\'s largest lake by surface area, completely enclosed by land.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q59',
    question: 'What percentage of the world\'s active volcanoes are in the Ring of Fire?',
    options: ['50%', '60%', '75%', '90%'],
    correctAnswer: 2,
    explanation: 'The Ring of Fire around the Pacific Ocean contains about 75% of the world\'s active volcanoes and experiences 90% of earthquakes.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q60',
    question: 'How often does lightning strike the Earth?',
    options: ['10 times per second', '50 times per second', '100 times per second', '200 times per second'],
    correctAnswer: 2,
    explanation: 'Lightning strikes the Earth approximately 100 times per second, or about 8.6 million times per day worldwide.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q61',
    question: 'What unusual sound phenomenon can occur with the Northern Lights?',
    options: ['Musical tones', 'Crackling sounds', 'Whistling winds', 'Thunder-like booms'],
    correctAnswer: 1,
    explanation: 'The Northern Lights can sometimes produce crackling or clapping sounds, though scientists are still studying exactly how this audio phenomenon occurs.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q62',
    question: 'Which country is completely surrounded by Italy?',
    options: ['Vatican City', 'San Marino', 'Monaco', 'Both Vatican City and San Marino'],
    correctAnswer: 3,
    explanation: 'Both Vatican City and San Marino are completely surrounded by Italy, making them enclaves within the Italian territory.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q63',
    question: 'What is unusual about Liechtenstein\'s geographic position?',
    options: ['It\'s an island', 'It\'s doubly landlocked', 'It\'s below sea level', 'It spans two continents'],
    correctAnswer: 1,
    explanation: 'Liechtenstein is doubly landlocked, meaning it\'s surrounded only by other landlocked countries (Austria and Switzerland).',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q64',
    question: 'At what rate is the Dead Sea shrinking each year?',
    options: ['1 foot', '2 feet', '3 feet', '5 feet'],
    correctAnswer: 2,
    explanation: 'The Dead Sea is shrinking by about 3 feet per year due to water diversion from the Jordan River and mineral extraction.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q65',
    question: 'What natural phenomenon can create waves that travel upstream in rivers?',
    options: ['Tidal bores', 'Rogue waves', 'Standing waves', 'Tsunami backwash'],
    correctAnswer: 0,
    explanation: 'Tidal bores occur when ocean tides push up rivers, creating waves that can travel upstream for miles, like the famous bore on the Amazon River.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q66',
    question: 'What causes some sand dunes to "sing"?',
    options: ['Wind patterns', 'Sand grain friction', 'Underground water', 'Temperature changes'],
    correctAnswer: 1,
    explanation: 'Singing sand dunes produce musical tones when sand grains of specific sizes rub together as they slide down the dune face.',
    category: 'Geography',
    difficulty: 'hard'
  },
  {
    id: 'q67',
    question: 'How does the Pacific Ocean compare to all land masses on Earth?',
    options: ['Half the size', 'Same size', 'Larger than all land combined', 'Twice as large'],
    correctAnswer: 2,
    explanation: 'The Pacific Ocean covers about 165 million square kilometers, which is larger than all the land masses on Earth combined.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q68',
    question: 'What is happening to the African continent geologically?',
    options: ['Sinking into ocean', 'Splitting into two', 'Rotating clockwise', 'Shrinking in size'],
    correctAnswer: 1,
    explanation: 'Africa is slowly splitting into two continents along the East African Rift Valley, a process that will take millions of years to complete.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q69',
    question: 'Which geographic feature moves constantly across the Earth?',
    options: ['Equator', 'Magnetic poles', 'Tectonic plates', 'Ocean currents'],
    correctAnswer: 1,
    explanation: 'Earth\'s magnetic poles are constantly moving - the magnetic North Pole moves about 25 miles per year and has accelerated in recent decades.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q70',
    question: 'What extreme daylight phenomenon occurs in polar regions?',
    options: ['Midnight sun', 'Polar night', 'Both midnight sun and polar night', 'Aurora seasons'],
    correctAnswer: 2,
    explanation: 'Polar regions experience both midnight sun (24-hour daylight) in summer and polar night (24-hour darkness) in winter due to Earth\'s tilt.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q71',
    question: 'Which city-state issues its own euros despite its tiny size?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Monaco, Vatican City, and San Marino all issue their own euro coins despite being microstates, making them valuable to collectors.',
    category: 'Geography',
    difficulty: 'medium'
  },
  {
    id: 'q72',
    question: 'What is the Amazon River longer than?',
    options: ['The distance from New York to London', 'The distance from New York to Rome', 'The distance across Australia', 'The distance from Alaska to Florida'],
    correctAnswer: 1,
    explanation: 'The Amazon River is about 4,000 miles long, which is longer than the distance from New York to Rome (approximately 3,600 miles).',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q73',
    question: 'What unique postal service does Vatican City operate?',
    options: ['Fastest delivery in Europe', 'Most reliable postal system', 'Issues its own stamps', 'Free worldwide shipping'],
    correctAnswer: 2,
    explanation: 'Vatican City operates its own postal system and issues distinctive stamps that are highly sought after by collectors worldwide.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q74',
    question: 'Which country is both a city and a nation?',
    options: ['Monaco', 'Vatican City', 'Singapore', 'Luxembourg'],
    correctAnswer: 2,
    explanation: 'Singapore is unique as it\'s both a city and a sovereign nation, making it one of only three city-states in the world.',
    category: 'Geography',
    difficulty: 'easy'
  },
  {
    id: 'q75',
    question: 'What percentage of earthquakes occur along the Ring of Fire?',
    options: ['75%', '80%', '85%', '90%'],
    correctAnswer: 3,
    explanation: 'About 90% of the world\'s earthquakes occur along the Ring of Fire, the horseshoe-shaped zone around the Pacific Ocean.',
    category: 'Geography',
    difficulty: 'medium'
  },
  // New Science Category Questions (q76-q100)
  {
    id: 'q76',
    question: 'How long is a day on Venus compared to its year?',
    options: ['Shorter than its year', 'Same as its year', 'Longer than its year', 'Twice as long as its year'],
    correctAnswer: 2,
    explanation: 'A day on Venus (243 Earth days) is actually longer than its year (225 Earth days) because Venus rotates very slowly on its axis.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q77',
    question: 'How much would a teaspoon of neutron star material weigh on Earth?',
    options: ['1 ton', '1 million tons', '6 billion tons', '1 trillion tons'],
    correctAnswer: 2,
    explanation: 'Neutron stars are so incredibly dense that a single teaspoon of neutron star material would weigh about 6 billion tons on Earth.',
    category: 'Science',
    difficulty: 'hard'
  },
  {
    id: 'q78',
    question: 'How many new cells does your body produce every second?',
    options: ['1 million', '10 million', '25 million', '100 million'],
    correctAnswer: 2,
    explanation: 'Your body is constantly regenerating, producing approximately 25 million new cells every second to replace old and damaged ones.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q79',
    question: 'Why are bananas slightly radioactive?',
    options: ['Uranium content', 'Potassium-40 content', 'Cosmic radiation', 'Pesticide residue'],
    correctAnswer: 1,
    explanation: 'Bananas contain potassium-40, a naturally occurring radioactive isotope, making them one of the most radioactive foods we commonly eat.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q80',
    question: 'What percentage of DNA do humans share with bananas?',
    options: ['25%', '40%', '60%', '80%'],
    correctAnswer: 2,
    explanation: 'Humans share about 60% of their DNA with bananas, highlighting the common evolutionary origins of all life on Earth.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q81',
    question: 'What percentage of your body\'s energy does your brain use?',
    options: ['5%', '10%', '20%', '30%'],
    correctAnswer: 2,
    explanation: 'Despite being only 2% of your body weight, your brain consumes about 20% of your body\'s total energy, mostly for maintaining neurons.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q82',
    question: 'How long does light take to travel from the Sun to Earth?',
    options: ['4 minutes', '8 minutes', '12 minutes', '16 minutes'],
    correctAnswer: 1,
    explanation: 'Light travels at 186,000 miles per second and takes approximately 8 minutes and 20 seconds to reach Earth from the Sun.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q83',
    question: 'What makes quantum entanglement so mysterious?',
    options: ['Particles move faster than light', 'Particles instantly affect each other across vast distances', 'Particles can be in two places at once', 'Particles can travel through time'],
    correctAnswer: 1,
    explanation: 'Quantum entanglement allows particles to instantly influence each other regardless of distance, which Einstein called "spooky action at a distance."',
    category: 'Science',
    difficulty: 'hard'
  },
  {
    id: 'q84',
    question: 'How much faster does sound travel in water compared to air?',
    options: ['2 times faster', '4 times faster', '6 times faster', '10 times faster'],
    correctAnswer: 1,
    explanation: 'Sound travels about 4 times faster in water (1,500 m/s) than in air (343 m/s) because water molecules are more tightly packed.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q85',
    question: 'What do diamond and graphite have in common?',
    options: ['Same hardness', 'Same color', 'Both pure carbon', 'Same crystal structure'],
    correctAnswer: 2,
    explanation: 'Diamond and graphite are both pure carbon but with different atomic arrangements - diamond in a 3D lattice, graphite in layers.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q86',
    question: 'Why does helium make your voice sound higher?',
    options: ['It\'s lighter than air', 'It vibrates vocal cords faster', 'Sound travels faster in helium', 'It compresses vocal cords'],
    correctAnswer: 2,
    explanation: 'Helium is less dense than air, so sound waves travel faster through it, increasing the frequency and pitch of your voice.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q87',
    question: 'What unusual property does water have when it freezes?',
    options: ['It shrinks', 'It expands', 'It changes color', 'It becomes denser'],
    correctAnswer: 1,
    explanation: 'Unlike most substances, water expands when it freezes because ice crystals form a more open structure than liquid water.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q88',
    question: 'Why does honey never spoil?',
    options: ['High sugar content', 'Low water content and acidic pH', 'Natural preservatives', 'Antibacterial enzymes'],
    correctAnswer: 1,
    explanation: 'Honey\'s low water content and acidic pH create an environment where bacteria cannot survive, making it naturally immortal.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q89',
    question: 'What was the first computer "bug"?',
    options: ['A software error', 'An actual insect', 'A hardware malfunction', 'A programming mistake'],
    correctAnswer: 1,
    explanation: 'The first computer "bug" was literally a moth found trapped in a Harvard computer relay in 1947 by Grace Hopper\'s team.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q90',
    question: 'How does smartphone computing power compare to Apollo 11?',
    options: ['Same power', 'Twice as powerful', 'Thousands of times more powerful', 'Millions of times more powerful'],
    correctAnswer: 2,
    explanation: 'A modern smartphone has thousands of times more computing power than the computers that guided Apollo 11 to the Moon.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q91',
    question: 'How much does the entire Internet weigh?',
    options: ['About the same as a strawberry', 'About the same as an apple', 'About the same as a car', 'About the same as a building'],
    correctAnswer: 0,
    explanation: 'The Internet weighs approximately 50 grams (about a strawberry) due to the mass of electrons moving through servers and cables worldwide.',
    category: 'Science',
    difficulty: 'hard'
  },
  {
    id: 'q92',
    question: 'Why must GPS satellites account for Einstein\'s relativity?',
    options: ['Time moves slower in space', 'Time moves faster in space', 'Distance measurements change', 'Gravity affects signals'],
    correctAnswer: 1,
    explanation: 'GPS satellites experience time slightly faster due to weaker gravity, so they must adjust for relativistic effects to maintain accuracy.',
    category: 'Science',
    difficulty: 'hard'
  },
  {
    id: 'q93',
    question: 'What was the original purpose of the first webcam?',
    options: ['Security monitoring', 'Video conferencing', 'Monitoring a coffee pot', 'Weather observation'],
    correctAnswer: 2,
    explanation: 'The first webcam was created at Cambridge University in 1991 to monitor a coffee pot so researchers could check if coffee was available.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q94',
    question: 'How many atoms are in a single drop of water?',
    options: ['Billions', 'Trillions', 'More than drops in the Mediterranean Sea', 'More than stars in the galaxy'],
    correctAnswer: 2,
    explanation: 'A single drop of water contains approximately 1.5 sextillion atoms - more atoms than there are drops of water in the Mediterranean Sea.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q95',
    question: 'What makes Saturn\'s moon Titan unique?',
    options: ['It has oxygen', 'It has lakes of liquid methane', 'It has plant life', 'It has a magnetic field'],
    correctAnswer: 1,
    explanation: 'Titan is the only known celestial body besides Earth with stable liquid on its surface - lakes and rivers of liquid methane and ethane.',
    category: 'Science',
    difficulty: 'easy'
  },
  {
    id: 'q96',
    question: 'How long will footprints on the Moon last?',
    options: ['A few years', 'Hundreds of years', 'Thousands of years', 'Millions of years'],
    correctAnswer: 3,
    explanation: 'With no atmosphere or weather on the Moon, the Apollo astronauts\' footprints will remain preserved for millions of years.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q97',
    question: 'What can stomach acid dissolve?',
    options: ['Wood', 'Plastic', 'Razor blades', 'Glass'],
    correctAnswer: 2,
    explanation: 'Human stomach acid (hydrochloric acid) is so strong it can dissolve razor blades, with a pH between 1.5 and 3.5.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q98',
    question: 'How do the number of possible chess games compare to atoms in the universe?',
    options: ['Fewer chess games', 'About the same', 'More possible chess games', 'Impossible to compare'],
    correctAnswer: 2,
    explanation: 'There are more possible chess games (10^120) than atoms in the observable universe (10^80), making chess incredibly complex.',
    category: 'Science',
    difficulty: 'medium'
  },
  {
    id: 'q99',
    question: 'What effect does gravity have on time?',
    options: ['No effect', 'Time moves slower in stronger gravity', 'Time moves faster in stronger gravity', 'Time stops in strong gravity'],
    correctAnswer: 1,
    explanation: 'According to Einstein\'s relativity, time moves slower in stronger gravitational fields - a phenomenon called gravitational time dilation.',
    category: 'Science',
    difficulty: 'hard'
  },
  {
    id: 'q100',
    question: 'How many molecules are in a glass of water compared to glasses of water in all oceans?',
    options: ['Fewer molecules', 'About the same', 'More molecules', 'Impossible to determine'],
    correctAnswer: 2,
    explanation: 'A glass of water contains more molecules than there are glasses of water in all the world\'s oceans combined - demonstrating the incredible scale of molecular size.',
    category: 'Science',
    difficulty: 'hard'
  },
  // New History and Culture Category Questions (q101-q125)
  {
    id: 'q101',
    question: 'What did Napoleon Bonaparte fear more than anything else?',
    options: ['Heights', 'Cats', 'Water', 'Spiders'],
    correctAnswer: 1,
    explanation: 'Napoleon had ailurophobia - an intense fear of cats. This powerful military leader who conquered much of Europe was terrified of small felines.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q102',
    question: 'What unusual material was the Statue of Liberty originally made to look like?',
    options: ['Gold', 'Silver', 'Copper (shiny)', 'Bronze'],
    correctAnswer: 2,
    explanation: 'The Statue of Liberty was originally shiny copper color when built in 1886, but oxidation over 30 years turned it the green color we see today.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q103',
    question: 'Which ancient civilization invented the first known vending machine?',
    options: ['Romans', 'Greeks', 'Egyptians', 'Chinese'],
    correctAnswer: 1,
    explanation: 'Ancient Greeks invented the first vending machine around 215 BC to dispense holy water in temples when a coin was inserted.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: 'q104',
    question: 'What did Cleopatra use to dissolve a pearl worth millions?',
    options: ['Wine', 'Vinegar', 'Lemon juice', 'Salt water'],
    correctAnswer: 1,
    explanation: 'Cleopatra dissolved a massive pearl in vinegar and drank it to win a bet with Mark Antony about hosting the most expensive dinner in history.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: 'q105',
    question: 'What popular breakfast food was once considered poisonous by Europeans?',
    options: ['Eggs', 'Tomatoes', 'Potatoes', 'Corn'],
    correctAnswer: 1,
    explanation: 'Europeans thought tomatoes were poisonous for 200 years because wealthy people got sick after eating them (the acid leached lead from pewter plates).',
    category: 'Culture',
    difficulty: 'easy'
  },
  {
    id: 'q106',
    question: 'Which spice was once worth more than its weight in gold?',
    options: ['Cinnamon', 'Black pepper', 'Saffron', 'Nutmeg'],
    correctAnswer: 1,
    explanation: 'Black pepper was so valuable in medieval times it was called "black gold" and used as currency, sometimes worth more than gold by weight.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q107',
    question: 'What did ancient Romans use as mouthwash?',
    options: ['Wine', 'Salt water', 'Urine', 'Honey water'],
    correctAnswer: 2,
    explanation: 'Romans believed urine whitened teeth and freshened breath. Portuguese urine was considered the best quality for this purpose.',
    category: 'History',
    difficulty: 'hard'
  },
  {
    id: 'q108',
    question: 'Which modern dance was originally considered scandalous and banned?',
    options: ['Waltz', 'Tango', 'Charleston', 'All of the above'],
    correctAnswer: 3,
    explanation: 'The waltz, tango, and Charleston were all considered scandalous when introduced because they involved close contact between dance partners.',
    category: 'Culture',
    difficulty: 'medium'
  },
  {
    id: 'q109',
    question: 'What did the ancient Mayans use chocolate for besides drinking?',
    options: ['Medicine', 'Currency', 'Religious ceremonies', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Mayans used cacao beans as currency, medicine for various ailments, and in religious rituals - chocolate was considered food of the gods.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q110',
    question: 'Which country has more pyramids than Egypt?',
    options: ['Mexico', 'Sudan', 'Peru', 'China'],
    correctAnswer: 1,
    explanation: 'Sudan has over 250 pyramids compared to Egypt\'s 130. The Sudanese pyramids were built by the Kingdom of Kush between 800 BC and 300 AD.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: 'q111',
    question: 'What unusual job did Walt Disney have before creating Mickey Mouse?',
    options: ['Newspaper cartoonist', 'Ambulance driver', 'Voice actor', 'Art teacher'],
    correctAnswer: 1,
    explanation: 'Walt Disney drove an ambulance in France during World War I when he was just 16 years old, before becoming the world\'s most famous animator.',
    category: 'Culture',
    difficulty: 'medium'
  },
  {
    id: 'q112',
    question: 'Which language has the most words?',
    options: ['English', 'Mandarin', 'Spanish', 'Arabic'],
    correctAnswer: 0,
    explanation: 'English has the most words of any language, with over 1 million words in the Oxford English Dictionary and growing constantly.',
    category: 'Culture',
    difficulty: 'easy'
  },
  {
    id: 'q113',
    question: 'What did the ancient Egyptians use as pillows?',
    options: ['Feathers', 'Sand bags', 'Stone headrests', 'Wooden blocks'],
    correctAnswer: 2,
    explanation: 'Ancient Egyptians used curved stone or wooden headrests as pillows to keep their elaborate hairstyles intact while sleeping.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q114',
    question: 'Which popular board game was originally called "The Landlord\'s Game"?',
    options: ['Scrabble', 'Monopoly', 'Risk', 'Clue'],
    correctAnswer: 1,
    explanation: 'Monopoly was originally "The Landlord\'s Game," created in 1903 by Elizabeth Magie to demonstrate the negative aspects of land monopolism.',
    category: 'Culture',
    difficulty: 'medium'
  },
  {
    id: 'q115',
    question: 'What did Vikings actually wear on their heads?',
    options: ['Horned helmets', 'Simple metal caps', 'Leather helmets', 'No helmets at all'],
    correctAnswer: 1,
    explanation: 'Vikings never wore horned helmets in battle - this is a myth from 19th-century operas. They wore simple, practical metal or leather caps.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q116',
    question: 'Which food was once illegal to eat in the United States?',
    options: ['Chocolate', 'Ice cream', 'Sliced bread', 'Kinder Eggs'],
    correctAnswer: 3,
    explanation: 'Kinder Eggs are banned in the US because of a 1938 law prohibiting non-food items inside food products, though they\'re legal in most other countries.',
    category: 'Culture',
    difficulty: 'easy'
  },
  {
    id: 'q117',
    question: 'What did people use before toilet paper was invented?',
    options: ['Leaves and moss', 'Corn cobs', 'Sponges on sticks', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Throughout history, people used leaves, moss, corn cobs, sponges on sticks, and even seashells before toilet paper was invented in China around 1391.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q118',
    question: 'Which country invented the fortune cookie?',
    options: ['China', 'Japan', 'United States', 'Thailand'],
    correctAnswer: 2,
    explanation: 'Fortune cookies were actually invented in California in the early 1900s by Japanese immigrants, not in China as commonly believed.',
    category: 'Culture',
    difficulty: 'medium'
  },
  {
    id: 'q119',
    question: 'What unusual tax did ancient Romans have to pay?',
    options: ['Window tax', 'Urine tax', 'Beard tax', 'Shadow tax'],
    correctAnswer: 1,
    explanation: 'Emperor Vespasian imposed a tax on urine collection because it was valuable for cleaning clothes and tanning leather, coining "money has no odor."',
    category: 'History',
    difficulty: 'hard'
  },
  {
    id: 'q120',
    question: 'Which popular snack was invented by accident?',
    options: ['Potato chips', 'Chocolate chip cookies', 'Corn flakes', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Potato chips (1853), chocolate chip cookies (1938), and corn flakes (1894) were all invented by accident while trying to make something else.',
    category: 'Culture',
    difficulty: 'easy'
  },
  {
    id: 'q121',
    question: 'What did Albert Einstein\'s last words remain?',
    options: ['Unknown - he spoke in German', 'Recorded for posterity', 'Written down by nurses', 'Captured on audio'],
    correctAnswer: 0,
    explanation: 'Einstein\'s last words are unknown because he spoke them in German to a nurse who only understood English, and they were never translated.',
    category: 'History',
    difficulty: 'medium'
  },
  {
    id: 'q122',
    question: 'Which musical instrument was once considered the devil\'s instrument?',
    options: ['Violin', 'Piano', 'Guitar', 'Drums'],
    correctAnswer: 0,
    explanation: 'The violin was once called "the devil\'s instrument" by the church because of its emotional, seductive sound that could lead people to sin.',
    category: 'Culture',
    difficulty: 'medium'
  },
  {
    id: 'q123',
    question: 'What did the ancient Greeks use to vote people out of the city?',
    options: ['Pottery shards', 'Stone tablets', 'Wooden tokens', 'Metal coins'],
    correctAnswer: 0,
    explanation: 'Ancient Greeks used pottery shards called "ostraka" to vote for ostracism - banishing unpopular politicians from Athens for 10 years.',
    category: 'History',
    difficulty: 'hard'
  },
  {
    id: 'q124',
    question: 'Which color was once reserved only for royalty?',
    options: ['Red', 'Purple', 'Gold', 'Blue'],
    correctAnswer: 1,
    explanation: 'Purple dye was so expensive to produce (from thousands of murex shells) that only royalty could afford it, making purple the color of power.',
    category: 'History',
    difficulty: 'easy'
  },
  {
    id: 'q125',
    question: 'What modern convenience did ancient Romans have that disappeared for 1,000 years?',
    options: ['Central heating', 'Running water', 'Public baths', 'All of the above'],
    correctAnswer: 3,
    explanation: 'Romans had central heating, running water, and public baths - luxuries that largely disappeared in Europe after the fall of Rome and weren\'t common again until the Renaissance.',
    category: 'History',
    difficulty: 'medium'
  }
];

// Function to get 5 random questions for a game session
export const getRandomQuestions = (): Question[] => {
  const shuffled = [...sampleQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

// Export the total number of questions for reference
export const TOTAL_QUESTIONS = sampleQuestions.length;

// Export function to get all questions (for validation/testing purposes)
export const getAllQuestions = (): Question[] => {
  return [...sampleQuestions];
};
