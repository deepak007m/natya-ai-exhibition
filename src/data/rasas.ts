import shringaraImg from '../assets/cultural/rasa_shringara.jpg';
import hasyaImg from '../assets/cultural/rasa_hasya.jpg';
import karunaImg from '../assets/cultural/rasa_karuna.jpg';
import raudraImg from '../assets/cultural/rasa_raudra.jpg';
import veeraImg from '../assets/cultural/rasa_veera.jpg';
import bhayanakaImg from '../assets/cultural/rasa_bhayanaka.jpg';
import bibhatsaImg from '../assets/cultural/rasa_bibhatsa.jpg';
import adbhutaImg from '../assets/cultural/rasa_adbhuta.jpg';
import shantaImg from '../assets/cultural/rasa_shanta.jpg';

export interface Rasa {
  id: string;
  name: string;
  meaning: string;
  description: string;
  example: string;
  image: string;
  imageSource?: string;
}

export const rasas: Rasa[] = [
  {
    id: "shringara",
    name: "Shringara",
    meaning: "Love / Romance",
    description: "The ultimate mood of romance, love, and beauty. Represents the creative force and devotion.",
    example: "Often depicted through gentle, flowing movements and expressive loving glances.",
    image: shringaraImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "hasya",
    name: "Hasya",
    meaning: "Joy / Laughter",
    description: "The mood of joy, mirth, and comedy. It brings lightness and amusement.",
    example: "Expressed with a smiling face, twinkling eyes, and light, rhythmic steps.",
    image: hasyaImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "karuna",
    name: "Karuna",
    meaning: "Compassion / Sorrow",
    description: "The mood of compassion, mercy, and grief. It evokes empathy for the suffering.",
    example: "Shown with downcast eyes, slow movements, and an expression of deep empathy.",
    image: karunaImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "raudra",
    name: "Raudra",
    meaning: "Anger",
    description: "The mood of anger, fury, and wrath. Represents destructive force and righteous indignation.",
    example: "Performed with strong, sharp, stamping movements and fierce, widened eyes.",
    image: raudraImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "veera",
    name: "Veera",
    meaning: "Courage / Heroism",
    description: "The mood of courage, heroism, and bravery. Displays majesty, pride, and valor.",
    example: "Illustrated by an expanded chest, steady gaze, and energetic, grand movements.",
    image: veeraImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "bhayanaka",
    name: "Bhayanaka",
    meaning: "Fear / Terror",
    description: "The mood of fear, terror, and anxiety. Evokes a sense of dread or impending danger.",
    example: "Expressed with trembling limbs, wide fearful eyes, and retreating steps.",
    image: bhayanakaImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "bibhatsa",
    name: "Bibhatsa",
    meaning: "Disgust",
    description: "The mood of disgust and aversion, often related to the grotesque or undesirable.",
    example: "Shown with a wrinkled nose, turned face, and contracting movements.",
    image: bibhatsaImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "adbhuta",
    name: "Adbhuta",
    meaning: "Wonder / Astonishment",
    description: "The mood of wonder, surprise, and amazement at the marvels of the universe.",
    example: "Depicted with wide-open eyes, slightly parted lips, and uplifted expressions.",
    image: adbhutaImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  },
  {
    id: "shanta",
    name: "Shanta",
    meaning: "Peace / Tranquility",
    description: "The mood of peace, tranquility, and serenity. The stillness that contains all other emotions.",
    example: "Expressed with half-closed eyes, relaxed face, and slow, meditative gestures.",
    image: shantaImg,
    imageSource: "Wikimedia Commons (CC BY-SA 4.0)"
  }
];

