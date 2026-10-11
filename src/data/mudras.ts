import patakaImg from '../assets/cultural/mudra_pataka.jpg';
import tripatakaImg from '../assets/cultural/mudra_tripataka.jpg';
import ardhapatakaImg from '../assets/cultural/mudra_ardhapataka.jpg';
import kartarimukhaImg from '../assets/cultural/mudra_kartarimukha.jpg';
import mayuraImg from '../assets/cultural/mudra_mayura.jpg';
import ardhachandraImg from '../assets/cultural/mudra_ardhachandra.jpg';
import mushtiImg from '../assets/cultural/mudra_mushti.jpg';
import shikharaImg from '../assets/cultural/mudra_shikhara.jpg';
import kapitthaImg from '../assets/cultural/mudra_kapittha.jpg';
import alapadmaImg from '../assets/cultural/mudra_alapadma.jpg';

export interface Mudra {
    id: string;
    name: string;
    meaning: string;
    description: string;
    image: string;
    imageSource?: string;
}

export const mudras: Mudra[] = [
    {
        id: "pataka",
        name: "Pataka",
        meaning: "Flag",
        description: "All fingers extended, held straight and close together, with the thumb bent slightly to touch the base of the index finger. Used to represent clouds, forest, night, river, horse, or cutting.",
        image: patakaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "tripataka",
        name: "Tripataka",
        meaning: "Three Parts of a Flag",
        description: "Like Pataka, but the ring finger is bent downwards. Used to represent a crown, tree, vajra (weapon), lamp, or an arrow.",
        image: tripatakaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "ardhapataka",
        name: "Ardhapataka",
        meaning: "Half-Flag",
        description: "From Tripataka, the little finger is also bent down along with the ring finger. Represents a bank of a river, a dagger, a tower, or a horn.",
        image: ardhapatakaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "kartarimukha",
        name: "Kartarimukha",
        meaning: "Scissors Face",
        description: "From Tripataka, the index and middle fingers are separated to resemble scissors. Used to represent separation, corner of an eye, lightning, or a creeper.",
        image: kartarimukhaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "mayura",
        name: "Mayura",
        meaning: "Peacock",
        description: "The ring finger touches the tip of the thumb, while the other fingers are extended straight. Represents a peacock, a creeper, a bird, or vomiting.",
        image: mayuraImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "ardhachandra",
        name: "Ardhachandra",
        meaning: "Half-Moon",
        description: "The fingers and thumb are extended, creating a semi-circle shape. Used to represent the phase of the moon, a spear, a plate, or greeting.",
        image: ardhachandraImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "mushti",
        name: "Mushti",
        meaning: "Fist",
        description: "All fingers are folded into a tight fist with the thumb resting over the fingers. Represents grasping, holding weapons, firmness, or fighting.",
        image: mushtiImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "shikhara",
        name: "Shikhara",
        meaning: "Peak / Spire",
        description: "A fist (Mushti) but with the thumb pointed straight up. Used to symbolize a bow, a pillar, a tooth, questioning, or drinking.",
        image: shikharaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "kapittha",
        name: "Kapittha",
        meaning: "Wood Apple",
        description: "From Shikhara, the forefinger is bent over the top of the upright thumb. Used to depict holding flowers, churning, a veil, or an offering.",
        image: kapitthaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    },
    {
        id: "alapadma",
        name: "Alapadma",
        meaning: "Lotus",
        description: "Fingers are spread out and curved outward gracefully like a fully bloomed lotus. Represents a lotus flower, beauty, praise, or the full moon.",
        image: alapadmaImg,
        imageSource: "Wikimedia Commons (Asamyuta Hasta, CC BY-SA)"
    }
];

