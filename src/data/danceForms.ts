import bharatanatyamImg from '../assets/cultural/bharatanatyam.jpg';
import kathakImg from '../assets/cultural/kathak.jpg';
import kathakaliImg from '../assets/cultural/kathakali.jpg';
import kuchipudiImg from '../assets/cultural/kuchipudi.jpg';
import odissiImg from '../assets/cultural/odissi.jpg';
import manipuriImg from '../assets/cultural/manipuri.jpg';
import mohiniyattamImg from '../assets/cultural/mohiniyattam.jpg';
import sattriyaImg from '../assets/cultural/sattriya.jpg';
import bhangraImg from '../assets/cultural/bhangra.jpg';
import garbaImg from '../assets/cultural/garba.jpg';
import lavaniImg from '../assets/cultural/lavani.jpg';

export interface DanceForm {
    id: string;
    name: string;
    category: "Classical" | "Folk";
    region: string;
    description: string;
    image: string;
    youtubeUrl: string;
}

export const danceForms: DanceForm[] = [
    {
        id: "bharatanatyam",
        name: "Bharatanatyam",
        category: "Classical",
        region: "Tamil Nadu",
        description: "Known for its fixed upper torso, bent legs in Araimandi, and spectacular footwork combined with a complex vocabulary of hand gestures, eye movements, and facial expressions.",
        image: bharatanatyamImg,
        youtubeUrl: "https://www.youtube.com/watch?v=CMorI8jsQyw"
    },
    {
        id: "kathak",
        name: "Kathak",
        category: "Classical",
        region: "North India (UP)",
        description: "Characterized by intricate footwork synchronized with ghungroo bells, rapid pirouettes (chakkars), and expressive storytelling rooted in both temple traditions and Mughal courts.",
        image: kathakImg,
        youtubeUrl: "https://www.youtube.com/watch?v=v21vGnehunk"
    },
    {
        id: "kathakali",
        name: "Kathakali",
        category: "Classical",
        region: "Kerala",
        description: "Distinguished by elaborately colorful Paccha make-up, majestic headgear (Kireedam), and dramatic martial storytelling depicting epics like the Ramayana and Mahabharata.",
        image: kathakaliImg,
        youtubeUrl: "https://www.youtube.com/watch?v=nUUl5ZraIJg"
    },
    {
        id: "kuchipudi",
        name: "Kuchipudi",
        category: "Classical",
        region: "Andhra Pradesh",
        description: "Features brisk rhythmic footwork and theatrical dialogue, celebrated for the Tarangam where dancers balance gracefully upon the edge of a brass plate.",
        image: kuchipudiImg,
        youtubeUrl: "https://www.youtube.com/watch?v=37QyIKkSWVA"
    },
    {
        id: "odissi",
        name: "Odissi",
        category: "Classical",
        region: "Odisha",
        description: "Distinguished by the sculptural Tribhangi (three-bend) posture, fluid lyrical torso movements, and exquisite silver filigree jewelry honoring temple sculptures of Odisha.",
        image: odissiImg,
        youtubeUrl: "https://www.youtube.com/watch?v=PGrgqMP4mYs"
    },
    {
        id: "manipuri",
        name: "Manipuri",
        category: "Classical",
        region: "Manipur",
        description: "Known for its gentle, lyrical, and serpentine movements. Deeply rooted in devotional Vaishnavism, portraying the divine love of Radha and Krishna in the sacred Raas Leela.",
        image: manipuriImg,
        youtubeUrl: "https://www.youtube.com/watch?v=PFeFV2GR_P4"
    },
    {
        id: "mohiniyattam",
        name: "Mohiniyattam",
        category: "Classical",
        region: "Kerala",
        description: "The dance of the enchantress, characterized by graceful swaying movements like ocean waves, performed in the iconic white and gold kasavu costume with a side hair bun.",
        image: mohiniyattamImg,
        youtubeUrl: "https://www.youtube.com/watch?v=ACHMKH-S8zU"
    },
    {
        id: "sattriya",
        name: "Sattriya",
        category: "Classical",
        region: "Assam",
        description: "Originated in the 15th-century Sattras (monasteries) of Assam founded by Mahapurush Srimanta Sankardev, blending devotional music, rhythmic vitality, and spiritual drama.",
        image: sattriyaImg,
        youtubeUrl: "https://www.youtube.com/watch?v=7gq_Wne_U-g"
    },
    {
        id: "bhangra",
        name: "Bhangra",
        category: "Folk",
        region: "Punjab",
        description: "A high-energy Punjabi harvest dance celebrating spring and vitality with energetic kicks, leaps, and the thunderous pulse of the dhol drum.",
        image: bhangraImg,
        youtubeUrl: "https://www.youtube.com/watch?v=IOr1aFhnkiI"
    },
    {
        id: "garba",
        name: "Garba",
        category: "Folk",
        region: "Gujarat",
        description: "A celebratory circular folk dance of Gujarat inscribed as UNESCO Intangible Cultural Heritage, honoring the divine feminine during the nine nights of Navratri.",
        image: garbaImg,
        youtubeUrl: "https://www.youtube.com/watch?v=4xrxfFkefKw"
    },
    {
        id: "lavani",
        name: "Lavani",
        category: "Folk",
        region: "Maharashtra",
        description: "A vibrant folk theatre and dance tradition from Maharashtra, performed to the pulsating rhythm of the dholki in the traditional nine-yard Nauvari saree.",
        image: lavaniImg,
        youtubeUrl: "https://www.youtube.com/watch?v=zGVS4U3rMyg"
    }
];
