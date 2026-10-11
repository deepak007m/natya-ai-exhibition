/**
 * MarkdownMessage renders a safe subset of Markdown to React elements.
 * Supports: headings (h1-h3), bullet lists, numbered lists, paragraphs,
 *           and inline bold/italic. No raw HTML from the AI is rendered.
 */
import React from 'react';
import { parseMarkdown, parseInline, type MdToken, type InlineSegment } from '../utils/textUtils';

interface MarkdownMessageProps {
    text: string;
    className?: string;
}

function RenderInline({ segments }: { segments: InlineSegment[] }) {
    return (
        <>
            {segments.map((seg, i) => {
                if (seg.bold && seg.italic) return <strong key={i}><em>{seg.text}</em></strong>;
                if (seg.bold) return <strong key={i}>{seg.text}</strong>;
                if (seg.italic) return <em key={i}>{seg.text}</em>;
                return <React.Fragment key={i}>{seg.text}</React.Fragment>;
            })}
        </>
    );
}

export function MarkdownMessage({ text, className = '' }: MarkdownMessageProps) {
    const tokens = parseMarkdown(text);

    const elements: React.ReactNode[] = [];
    let listBuffer: MdToken[] = [];
    let listType: 'bullet' | 'numbered' | null = null;

    const flushList = () => {
        if (listBuffer.length === 0) return;

        if (listType === 'numbered') {
            elements.push(
                <ol key={`ol-${elements.length}`} className="list-decimal list-outside pl-5 my-2 space-y-1">
                    {listBuffer.map((item, i) => {
                        if (item.type !== 'numbered') return null;
                        return (
                            <li key={i} className="leading-relaxed text-[15px]">
                                <RenderInline segments={parseInline(item.text)} />
                            </li>
                        );
                    })}
                </ol>
            );
        } else {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-outside pl-5 my-2 space-y-1">
                    {listBuffer.map((item, i) => {
                        if (item.type !== 'bullet') return null;
                        return (
                            <li key={i} className="leading-relaxed text-[15px]">
                                <RenderInline segments={parseInline(item.text)} />
                            </li>
                        );
                    })}
                </ul>
            );
        }
        listBuffer = [];
        listType = null;
    };

    for (const token of tokens) {
        if (token.type === 'bullet') {
            if (listType === 'numbered') flushList();
            listType = 'bullet';
            listBuffer.push(token);
        } else if (token.type === 'numbered') {
            if (listType === 'bullet') flushList();
            listType = 'numbered';
            listBuffer.push(token);
        } else {
            flushList();

            if (token.type === 'blank') {
                // intentional spacer — handled by spacing utilities
            } else if (token.type === 'heading') {
                const Tag = `h${token.level}` as 'h1' | 'h2' | 'h3';
                const sizeClass = token.level === 1
                    ? 'text-[22px] font-semibold'
                    : token.level === 2
                        ? 'text-[19px] font-semibold'
                        : 'text-[17px] font-semibold';
                elements.push(
                    <Tag
                        key={`h-${elements.length}`}
                        className={`font-serif ${sizeClass} text-[#8B2635] mt-4 mb-1 leading-snug`}
                    >
                        <RenderInline segments={parseInline(token.text)} />
                    </Tag>
                );
            } else if (token.type === 'paragraph') {
                elements.push(
                    <p key={`p-${elements.length}`} className="leading-relaxed text-[15px] mb-1">
                        <RenderInline segments={parseInline(token.text)} />
                    </p>
                );
            }
        }
    }
    flushList();

    return (
        <div className={`markdown-message space-y-1 ${className}`}>
            {elements}
        </div>
    );
}
