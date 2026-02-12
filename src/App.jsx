import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

/* ======================
   Floating Hearts
   ====================== */
function FloatingHearts() {
  const hearts = Array.from({ length: 18 });
  const height = window.innerHeight;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: height + 40,
            x: Math.random() * window.innerWidth,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            y: -80,
            opacity: [0, 0.45, 0.45, 0],
            scale: [0.8, 1, 1, 0.9],
          }}
          transition={{
            duration: 14 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          className="absolute text-pink-400 text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

export default function ValentineApp() {

  /* ======================
     KEYWORD SETTINGS
     ====================== */
  const correctKeyword = "aug 30"; // change this

  const [inputValue, setInputValue] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  /* ======================
     FLOW CONTROL
     ====================== */
  const [step, setStep] = useState(0);
  const [sealed, setSealed] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  const noTexts = [
    "NO 🙈",
    "pudi papom😜",
    "achooo pavame😏",
    "vaipilla raja 😆",
    "po di en tomatoeee😝",
    "yes kudu di😤",
  ];
  const [noText, setNoText] = useState("NO 🙈");

  /* ======================
     LETTER TEXT
     ====================== */
  const letterText = `My Dearest Love ❤️

Maaa… ithu nammaloda 1st year Valentine’s Day 💖
Pona vaati na unakku ring kuduthen 💍
Intha year konjam different-aa pannanum nu yosichen…
Athaan intha small surprise 🥹

Evalovo sanda, misunderstanding ellam vandhiruku…
Aana ellathayum vida namma love strong-aa iruku 💕
Time poga poga namma love innum adhigam aagitey dhaan iruku.

Naan unaya sila neram hurt pannirukalam…
Words-aalayo, illa care pannama 😔
Aana athu ellam en manasula irunthu pannala maa.
Un mela irukkura love kammi aanathe illa.

Enakku ellame nee dhaan maa…
Life full-aa nee enakku venum di 🫶
Ethana problem vandhaalum senthu face pannalam.

Love you pondaatiii 😘

Forever yours 💖
— Your KD`;

  const finalText = `Indha photo-la irukura indha moment…
adhu verum image illa maa — adhu namma story 💖

Indha kai pidichu nikkura feel,
unkita kedaikira comfort,
evalo peru paathalum unaya maari yaarayum paathathu ila 
unoda kannu athuve pothum evalo kastam vanthalum cross panidalam
ellame naan un kooda vaazha aasai padra antha oru life kaaga kasta padalam ma kandipa 🥹

Un kai pidichu nadakkanum,
un kooda senthu sirikkanum,
un kooda neraya sanda podanum,
un kooda life la settle aaganum ma...

Indha oru vaati illa maa — lifetime full-aa 💍💖

Forever & always,
R ❤️ S`;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center px-4">
      <FloatingHearts />
      {sealed && <Confetti numberOfPieces={180} gravity={0.25} />}

      <AnimatePresence mode="wait">

        {/* ======================
           STEP 0 – KEYWORD PAGE
           ====================== */}
        {step === 0 && (
          <motion.div
            key="keyword"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md z-10"
          >
            <h2 className="text-2xl font-bold text-rose-600 mb-2">
              Unaya epa first time thookune clg la? 😁
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Hint: Unoda birth month avalo tha soluven😅
            </p>

            <motion.input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="border border-rose-300 px-4 py-2 rounded-lg w-full mb-4 text-center"
              placeholder="crct ta soliduvingala madam ?😝"
            />

            {!isCorrect && (
              <Button
                onClick={() => {
                  if (
                    inputValue.trim().toLowerCase() ===
                    correctKeyword.toLowerCase()
                  ) {
                    setIsCorrect(true);
                  } else {
                    setWrongCount((prev) => prev + 1);
                    setShake(true);
                    setTimeout(() => setShake(false), 400);
                  }
                }}
              >
                Check 💌
              </Button>
            )}

            {!isCorrect && wrongCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 font-semibold"
              >
                {wrongCount <= 5 ? (
                  <p className="text-rose-500">{wrongCount} Hug Pending {"🤗".repeat(wrongCount)}
                  </p>
                  ) : (
                    <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-red-500 text-lg"
                    >
                      LONG HUG REQUIRED 🤗💞
                      </motion.p>
                      )}
                      </motion.div>
                      )}
              

            {isCorrect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <p className="text-green-600 font-semibold mb-4">
                  Paravala… correct-a solita 😌💖
                </p>

                <Button onClick={() => setStep(1)}>
                  Open Envelope 💌
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ======================
           STEP 1 – ENVELOPE
           ====================== */}
        {step === 1 && (
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -8, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="cursor-pointer z-10"
            onClick={() => setStep(2)}
          >
            <div className="relative w-72 h-44 bg-white rounded-xl shadow-xl overflow-hidden flex items-center justify-center">

              <div
                className="absolute top-0 left-0 w-0 h-0
                border-l-[144px] border-r-[144px] border-t-[90px]
                border-l-transparent border-r-transparent border-t-rose-200"
              />

              <div className="relative z-10 flex flex-col items-center mt-6">
                <div className="text-4xl mb-2">💌</div>
                <p className="font-semibold text-rose-500">Tap to open</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2 – AGREEMENT */}
        {step === 2 && (
          <motion.div
            key="agreement"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md z-10"
          >
            <h2 className="text-2xl font-bold text-rose-600 mb-6">
              Will you be mine forever? 💍
            </h2>

            <div className="flex justify-center gap-6 relative">
              <Button onClick={() => setStep(3)}>YES 💖</Button>

              <motion.div
                onHoverStart={() =>
                  setNoText(noTexts[Math.floor(Math.random() * noTexts.length)])
                }
                whileHover={{
                  x: Math.random() * 140 - 70,
                  y: Math.random() * 100 - 50,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button variant="outline">{noText}</Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STEP 3 – LETTER */}
        {step === 3 && (
          <motion.div
            key="letter"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white max-w-4xl w-full p-10 rounded-3xl shadow-2xl z-10"
          >
            <h1 className="text-3xl font-bold text-rose-600 mb-6">
              My Dearest Love ❤️
            </h1>

            <TypingByWords text={letterText} onDone={() => setTypingDone(true)} />

            <div className="mt-10 text-center">
              <Button
                disabled={!typingDone}
                onClick={() => {
                  setSealed(true);
                  setStep(4);
                }}
              >
                Seal Agreement ✨
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4 – FINAL */}
        {step === 4 && (
          <motion.div
            key="final"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 rounded-3xl shadow-2xl max-w-5xl w-full z-10"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-rose-600 mb-6">
                  Agreement Sealed ❤️
                </h2>

                <TypingByWords text={finalText} />
              </div>

              <div className="flex-1 flex justify-center">
                <div className="bg-white p-4 pb-8 rounded-xl shadow-2xl rotate-[-2deg]">
                  <img
                    src="/couple-photo.jpg"
                    alt="Our Love"
                    className="w-80 h-80 object-cover rounded-md"
                  />
                  <p className="mt-4 text-center font-semibold font-serif">
                    R ❤️ S
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* =========================
   Typing Component
   ========================= */
function TypingByWords({ text, onDone }) {
  const words = text.split(" ");
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= words.length) {
      onDone && onDone();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed((prev) => prev + (prev ? " " : "") + words[index]);
      setIndex((i) => i + 1);
    }, 260);

    return () => clearTimeout(timer);
  }, [index, words, onDone]);

  return (
    <p className="whitespace-pre-line text-lg text-gray-800 leading-relaxed">
      {displayed}
      <span className="animate-pulse">|</span>
    </p>
  );
}
