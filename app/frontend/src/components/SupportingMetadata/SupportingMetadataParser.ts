import DOMPurify from "dompurify";

type ParsedSupportingMetadataItem = {
    title: string;
    content: string;
};

export function parseSupportingMetadataItem(item: string): ParsedSupportingMetadataItem {
    // Assumes the item starts with the file name followed by : and the content.
    // Example: "sdp_corporate.pdf: this is the content that follows".
    const parts = item.split(": ");
    const title = parts[0];
    const content = DOMPurify.sanitize(parts.slice(1).join(": "));

    return {
        title,
        content
    };
}
