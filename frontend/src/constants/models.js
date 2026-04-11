import { Cpu, Zap, Code2, Brain, Sparkles, BarChart2, Globe, Flame } from 'lucide-react';

export const MODELS = [
    {
        id: 'gpt-4o',
        name: 'OpenAI GPT-4o',
        icon: Flame,
        category: 'premium',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        tag: 'Paid Tier',
        desc: 'Peak Intelligence',
        fullDesc: 'The most capable model in the lineup. Best for complex reasoning, multi-step logic, and high-accuracy requirements.',
        bestFor: ['Complex Logic', 'Advanced Research', 'Flawless MCQs']
    },
    {
        id: 'gpt-4o-mini',
        name: 'OpenAI GPT-4o Mini',
        icon: Globe,
        category: 'premium',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        tag: 'High Value',
        desc: 'Fast & Smart',
        fullDesc: 'A powerful and fast model that offers GPT-4 class intelligence at a significantly higher speed.',
        bestFor: ['Summarization', 'Step-by-step logic', 'Efficient Analysis']
    },

    {
        id: 'llama-3.1',
        name: 'Meta Llama 3.1 8B',
        icon: Cpu,
        category: 'general',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        tag: 'Stable Generalist',
        desc: 'Power & Pedagogy',
        fullDesc: 'The gold standard for academic logic. Highly reliable for generating structured MCQs and pedagogical explanations.',
        bestFor: ['MCQ Generation', 'Deep Summaries', 'Academic Logic']
    },
    {
        id: 'qwen-7b',
        name: 'Qwen 2.5 7B',
        icon: Brain,
        category: 'general',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        tag: 'Reasoning Pro',
        desc: 'Logic & Reasoning',
        fullDesc: 'A powerful reasoning engine that excels at step-by-step deductions. Ideal for mathematics and logical troubleshooting.',
        bestFor: ['Math Problems', 'Deductive Logic', 'Nuanced Text Analysis']
    },
    {
        id: 'qwen-coder',
        name: 'Qwen 2.5 Coder 7B',
        icon: Code2,
        category: 'code',
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        tag: 'Coding Expert',
        desc: 'Code & Architecture',
        fullDesc: 'Specialized for development. Processes syntax and security patterns with high precision.',
        bestFor: ['Code Explanation', 'Security Audits', 'Refactoring']
    },
    {
        id: 'llama-3.2-1b',
        name: 'Llama 3.2 1B (Lite)',
        icon: Zap,
        category: 'general',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        tag: 'Ultra-Fast',
        desc: 'Speed & Conciseness',
        fullDesc: 'Optimized for nearly instant responses. Best for straightforward tasks like flashcards.',
        bestFor: ['Quick Flashcards', 'Concise Summaries', 'Rapid Response']
    },
    {
        id: 'llama-3.2-3b',
        name: 'Llama 3.2 3B',
        icon: BarChart2,
        category: 'data',
        color: 'text-teal-400',
        bg: 'bg-teal-500/10',
        tag: 'Data Specialist',
        desc: 'Insights & Trends',
        fullDesc: 'A lightweight champion for data structures. Identifies hidden patterns and anomalies in datasets.',
        bestFor: ['Trend Detection', 'Anomaly Discovery', 'Dataset Summaries']
    }
];
