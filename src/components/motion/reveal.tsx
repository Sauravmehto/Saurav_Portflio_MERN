"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type RevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "span";
  /** Above-the-fold text animates on mount. Section titles wait until scrolled in. */
  immediate?: boolean;
  /** One word in `text` gets the gradient treatment. */
  gradientWord?: string;
};

/**
 * Word-by-word rise. One copy of the phrase stays in the document, with real
 * spaces, so the heading is not written twice.
 */
export function Reveal({
  text,
  className,
  as: Tag = "span",
  immediate = false,
  gradientWord,
}: RevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const shown = gradientWord === word ? <span className="gradient-text">{word}</span> : word;
        const animated = reduced ? (
          <span className="inline-block">{shown}</span>
        ) : (
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.45em" }}
            {...(immediate
              ? { animate: { opacity: 1, y: 0 } }
              : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.6 } })}
            transition={{ duration: 0.45, delay: 0.08 * i, ease: "easeOut" }}
          >
            {shown}
          </motion.span>
        );

        return (
          <span key={`${word}-${i}`}>
            {animated}
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}
