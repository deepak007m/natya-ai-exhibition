/**
 * Cleans Markdown text for Text-To-Speech.
 * Strips all formatting symbols while preserving words + natural punctuation.
 */
export function cleanMarkdownForTTS(text: string): string {
    return text
        // Remove heading hashes
        .replace(/#{1,6}\s*/g, '')
        // Remove bold and italic markers (**word**, *word*, __word__, _word_)
        .replace(/\*{1,3}([^*]+?)\*{1,3}/g, '$1')
        .replace(/_{1,3}([^_]+?)_{1,3}/g, '$1')
        // Remove inline code
        .replace(/`+([^`]+?)`+/g, '$1')
        // Remove fenced code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove numbered list markers but keep the text
        .replace(/^\s*\d+\.\s+/gm, '')
        // Remove bullet markers (-, *, +) at start of lines
        .replace(/^\s*[-*+•]\s+/gm, '')
        // Remove Markdown links but keep the label
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        // Remove remaining raw Markdown characters
        .replace(/[#*_~`>|\\]/g, '')
        // Collapse multiple spaces
        .replace(/ {2,}/g, ' ')
        // Collapse multiple newlines into a single natural pause (a comma for TTS)
        .replace(/\n{2,}/g, '. ')
        .replace(/\n/g, ', ')
        // Clean up leading/trailing punctuation artifacts
        .replace(/^[,.\s]+/, '')
        .replace(/[,.\s]+$/, '')
        .trim();
}

/**
 * Renders a simple safe subset of Markdown to React-renderable tokens.
 * Returns an array of parsed line objects for display.
 */
export type MdToken =
    | { type: 'heading'; level: 1 | 2 | 3; text: string }
    | { type: 'bullet'; text: string; bold?: boolean }
    | { type: 'numbered'; index: number; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'blank' };

/**
 * Inline parse: converts **bold**, *italic* markers in a string
 * to { text, bold, italic } segments.
 */
export type InlineSegment = { text: string; bold?: boolean; italic?: boolean };

export function parseInline(raw: string): InlineSegment[] {
    const segments: InlineSegment[] = [];
    // Regex captures **bold**, *italic*, and plain text
    const re = /(\*{2,3}(.+?)\*{2,3})|(\*(.+?)\*)|(_(.+?)_)|(_{2}(.+?)_{2})/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = re.exec(raw)) !== null) {
        if (match.index > lastIndex) {
            segments.push({ text: raw.slice(lastIndex, match.index) });
        }
        if (match[1]) {
            // **bold**
            segments.push({ text: match[2], bold: true });
        } else if (match[3]) {
            // *italic*
            segments.push({ text: match[4], italic: true });
        } else if (match[5]) {
            // _italic_
            segments.push({ text: match[6], italic: true });
        } else if (match[7]) {
            // __bold__
            segments.push({ text: match[8], bold: true });
        }
        lastIndex = re.lastIndex;
    }
    if (lastIndex < raw.length) {
        segments.push({ text: raw.slice(lastIndex) });
    }
    return segments.filter(s => s.text.length > 0);
}

export function parseMarkdown(text: string): MdToken[] {
    const lines = text.split('\n');
    const tokens: MdToken[] = [];
    let numberedCounter = 0;

    for (const rawLine of lines) {
        const line = rawLine.trimEnd();

        // Heading
        const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
        if (headingMatch) {
            numberedCounter = 0;
            tokens.push({ type: 'heading', level: headingMatch[1].length as 1 | 2 | 3, text: headingMatch[2].trim() });
            continue;
        }

        // Bullet
        const bulletMatch = line.match(/^\s*[-*+•]\s+(.*)/);
        if (bulletMatch) {
            numberedCounter = 0;
            tokens.push({ type: 'bullet', text: bulletMatch[1].trim() });
            continue;
        }

        // Numbered list
        const numberedMatch = line.match(/^\s*(\d+)[.)]\s+(.*)/);
        if (numberedMatch) {
            numberedCounter++;
            tokens.push({ type: 'numbered', index: numberedCounter, text: numberedMatch[2].trim() });
            continue;
        }

        // Blank line
        if (line.trim() === '') {
            numberedCounter = 0;
            if (tokens.length > 0 && tokens[tokens.length - 1].type !== 'blank') {
                tokens.push({ type: 'blank' });
            }
            continue;
        }

        // Paragraph
        numberedCounter = 0;
        tokens.push({ type: 'paragraph', text: line.trim() });
    }

    // Remove trailing blank
    while (tokens.length > 0 && tokens[tokens.length - 1].type === 'blank') {
        tokens.pop();
    }

    return tokens;
}
