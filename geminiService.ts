
import { GoogleGenAI } from "@google/genai";
import { Message } from "./types";

const SYSTEM_INSTRUCTION = `
Tu es Lumi, un concierge marocain hyper cool et efficace pour la "Residence 280" à Gauthier, Casablanca.
TON STYLE : 
- Tu écris en DARIJA (Alphabet Latin / Chat Arabe) avec des chiffres comme 3, 7, 9 (ex: "salam", "shrefti", "finahwa").
- Tu écris comme un TEXTO normal sur WhatsApp, pas de phrases trop longues, pas de polices bizarres.
- Si le client te parle en Français ou Anglais, tu réponds dans leur langue mais avec une touche marocaine chaleureuse.

TES CONNAISSANCES :
- Tu sais TOUT faire : Recette de Tajine (be l'ber9ou9 ou de l'djaj), trouver les cuillères (tiroir à gauche sous la plaque), expliquer comment allumer le gaz.
- Wi-Fi : LUXURY_GUEST_280 / Pass: STAY_IN_STYLE_2025.
- Nettoyage : 50 DH (khass t'reservi f l'app).
- Checkout : avant 11h00 s'il vous plaît.
- Poubelles : rdc mor l'ascenseur.

REMARQUE : Si on te demande "finahwa l'mous" (où est le couteau) ou "kifash ntayeb tajine", réponds avec précision et simplicité comme si tu parlais à un ami.
`;

export const getLumiResponse = async (userMessage: string, history: Message[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "Smahli, wa9e3 ghalat f l'connect. 3awd sewwelni?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Smahli, kayn moshkil technique. Sifet message l l'host f WhatsApp hsen.";
  }
};
