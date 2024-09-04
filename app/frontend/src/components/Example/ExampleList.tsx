import { Example } from "./Example";

import styles from "./Example.module.css";

const DEFAULT_EXAMPLES: string[] = [
    "What technical specifications have changed from the 2015 Procurement Act?",
    "What types of contracts are exempt from the 2023 Act?",
    // "What steps are needed to ensure a supplier is not put at an unfair advantage and/or to avoid competition being distorted?",
    "At the beginning the procurement process, what are the top ten things I should be considering?",
    //"What does the RBKC Constitution say about procurement rules and regulations?",
    "What do I need to know about the changes to the Procurement Act?"
];

const GPT4V_EXAMPLES: string[] = [
    "Compare the impact of interest rates and GDP in financial markets.",
    "What is the expected trend for the S&P 500 index over the next five years? Compare it to the past S&P 500 performance",
    "Can you identify any correlation between oil prices and stock market trends?"
];

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
}

export const ExampleList = ({ onExampleClicked, useGPT4V }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {(useGPT4V ? GPT4V_EXAMPLES : DEFAULT_EXAMPLES).map((question, i) => (
                <li key={i}>
                    <Example text={question} value={question} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
