/**
 * Split full name into two logical parts
 *
 * @param fullTitle full name
 * @returns name and topic
 */
export function parseTitleAndTopic(fullTitle: string /*  TODO: Maybe a description as input? */): {
    title: string;
    topic: string | null;
} {
    fullTitle = fullTitle.replace(/\(.*?\)/g, ''); // Note: Removing things in (brackets)
    const result = /\s*(?<title>.*?)\s*(–|-|~|(#\d+)|(\|)|(:))\s*(?<topic>.*)\s*/.exec(fullTitle);

    if (!result) {
        return {
            title: fullTitle.trim(),
            topic: null,
        };
    }

    let title: string = result.groups!.title!;
    let topic: string | null = result.groups!.topic!;

    if (topic === '') {
        topic = null;
    }

    if (title === '' && topic && topic !== '') {
        return parseTitleAndTopic(topic);
    }

    return { title: title.trim(), topic: topic === null ? null : topic.trim() };
}
