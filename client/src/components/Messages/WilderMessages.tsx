import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wilderMessages } from "../../data/wilderMessages";
import "../../assets/styles/WilderMessages.css";

const TYPING_SPEED = 75; // ms per character
const DISPLAY_TIME = 6500; // ms message fully shown before switching

export default function WilderMessages() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setDisplayed("");
    setTyping(true);
    const full = wilderMessages[index].message;
    let i = 0;
    const type = () => {
      setDisplayed(full.slice(0, i));
      if (i < full.length) {
        i++;
        setTimeout(type, TYPING_SPEED);
      } else {
        setTyping(false);
      }
    };
    type();
  }, [index]);

  useEffect(() => {
    if (!typing) {
      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % wilderMessages.length);
      }, DISPLAY_TIME);
      return () => clearTimeout(timeout);
    }
  }, [typing]);

  const message = wilderMessages[index];

  return (
    <div className="wilder-message-outer">
      <div className="wilder-message-title">
        <span className="wilder-message-quote-gradient">«</span>
        <span className="wilder-message-title-text">Messages des Wilders</span>
        <span className="wilder-message-quote-gradient">»</span>
      </div>
      <div className="wilder-message-gradient-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="wilder-message-box"
            style={{ margin: 7 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="wilder-message-content">
              <span className="wilder-message-text">{displayed}</span>
              <span className="wilder-message-cursor">{typing ? "|" : ""}</span>
            </div>
            <div className="wilder-message-author">
              {message.author.firstName} {message.author.lastName}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
