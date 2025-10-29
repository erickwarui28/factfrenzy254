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
  }
];

// Function to get 5 random questions for a game session
export const getRandomQuestions = (): Question[] => {
  const shuffled = [...sampleQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};
