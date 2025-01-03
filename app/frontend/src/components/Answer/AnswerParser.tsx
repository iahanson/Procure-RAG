import { renderToStaticMarkup } from "react-dom/server";
//import { getCitationFilePath } from "../../api";
import { ChatAppResponse, getCitationFilePath } from "../../api";

type HtmlParsedAnswer = {
    answerHtml: string;
    citations: string[];
    categories: string[];
    contextThoughts: string[];
    contextDomain: string[];
};

//export function parseAnswerToHtml(answer: string, isStreaming: boolean, onCitationClicked: (citationFilePath: string) => void): HtmlParsedAnswer {

// Function to validate citation format and check if dataPoint starts with possible citation
function isCitationValid(contextDataPoints: any, citationCandidate: string): boolean {
    const regex = /^[^\s]+\.[a-zA-Z0-9]+/;
    if (!regex.test(citationCandidate)) {
        return false;
    }
    // Check if contextDataPoints is an object with a text property that is an array
    let dataPointsArray: string[];
    if (Array.isArray(contextDataPoints)) {
        dataPointsArray = contextDataPoints;
    } else if (contextDataPoints && Array.isArray(contextDataPoints.text)) {
        dataPointsArray = contextDataPoints.text;
    } else {
        return false;
    }
    const isValidCitation = dataPointsArray.some(dataPoint => dataPoint.startsWith(citationCandidate));
    if (!isValidCitation) {
        return false;
    }
    return true;
}
export function parseAnswerToHtml(answer: ChatAppResponse, isStreaming: boolean, onCitationClicked: (citationFilePath: string) => void): HtmlParsedAnswer {
    const contextDataPoints = answer.context.data_points;
    const contextThoughts = answer.context.docCategory;
    const contextDomain = answer.context.docDomain;
    const citations: string[] = [];
    const categories: string[] = [];

    // trim any whitespace from the end of the answer after removing follow-up questions
    //let parsedAnswer = answer.trim();
    // Trim any whitespace from the end of the answer after removing follow-up questions
    let parsedAnswer = answer.message.content.trim();

    // Omit a citation that is still being typed during streaming
    if (isStreaming) {
        let lastIndex = parsedAnswer.length;
        for (let i = parsedAnswer.length - 1; i >= 0; i--) {
            if (parsedAnswer[i] === "]") {
                break;
            } else if (parsedAnswer[i] === "[") {
                lastIndex = i;
                break;
            }
        }
        const truncatedAnswer = parsedAnswer.substring(0, lastIndex);
        parsedAnswer = truncatedAnswer;
    }

    const parts = parsedAnswer.split(/\[([^\]]+)\]/g);

    const fragments: string[] = parts.map((part, index) => {
        if (index % 2 === 0) {
            return part;
        } else {
            let citationIndex: number;
            if (!isCitationValid(contextDataPoints, part)) {
                return `[${part}]`;
            }
            if (citations.indexOf(part) !== -1) {
                citationIndex = citations.indexOf(part) + 1;
            } else {
                citations.push(part);
                citationIndex = citations.length;
            }

            const path = getCitationFilePath(part);

            return renderToStaticMarkup(
                <a className="supContainer" title={part} onClick={() => onCitationClicked(path)}>
                    <sup>{citationIndex}</sup>
                </a>
            );
        }
    });

    return {
        answerHtml: fragments.join(""),
        citations,
        categories,
        contextThoughts,
        contextDomain
    };
}
