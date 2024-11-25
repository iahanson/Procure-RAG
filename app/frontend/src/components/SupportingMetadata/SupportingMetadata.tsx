import { parseSupportingMetadataItem } from "./SupportingMetadataParser";

import styles from "./SupportingMetadata.module.css";

interface Props {
    supportingMetadata: string[] | { text: string[]; images?: { url: string }[] };
}

// function to remove duplicate items from array of categories as often a document will be cited more than once
function removeDups(names: string[]): string[] {
    let unique: Record<string, boolean> = {};
    names.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}

export const SupportingMetadata = ({ supportingMetadata }: Props) => {
    const textItems = Array.isArray(supportingMetadata) ? supportingMetadata : supportingMetadata.text;
    //const uniqueItems = Array.from(new Set(textItems));
    const uniqueItems = textItems.filter((item, index, items) => items.indexOf(item) === index);
    return (
        <ul className={styles.supportingContentNavList}>
            {uniqueItems.map((c, ind) => {
                const parsed = parseSupportingMetadataItem(c);
                return (
                    <li className={styles.supportingContentItem} key={ind}>
                        <h4 className={styles.supportingContentItemHeader}>{parsed.title}</h4>
                        <p className={styles.supportingContentItemText} dangerouslySetInnerHTML={{ __html: parsed.content }} />
                    </li>
                );
            })}
        </ul>
    );
};
