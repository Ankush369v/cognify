import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Book,
    Terminal,
    Cpu,
    Zap,
    Code2,
    ShieldCheck,
    Globe,
    Layers,
    Server,
    Database,
    Search,
    ChevronRight,
    MessageSquare,
    HelpCircle,
    Eye,
    Fingerprint,
    Scale,
    Lock,
    FileText,
    Activity
} from 'lucide-react';

// Re-implemented previous "section-based" layout for User Guide
const UserGuideSection = ({ icon: Icon, title, children, id }) => (
    <section id={id} className="space-y-4 pb-12 border-b border-white/5 last:border-0 hover:border-indigo-500/10 transition-colors scroll-mt-32">
        <div className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Icon className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold font-outfit tracking-tight">{title}</h2>
        </div>
        <div className="text-slate-400 leading-relaxed text-lg">
            {children}
        </div>
    </section>
);

const UserGuide = () => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="glass-panel p-5 md:p-16 rounded-3xl md:rounded-[2.5rem] border border-white/5 space-y-12"
    >
        <UserGuideSection id="getting-started" icon={Zap} title="Getting Started: Your First 5 Minutes">
            <p className="mb-4 text-justify">
                Welcome to <strong className="text-indigo-400 uppercase">Cognify</strong>—the platform designed for <span className="italic">Intelligence Amplified</span>. 
                Cognify is a comprehensive full-stack ecosystem that unifies AI-powered content generation, interactive data visualization, and automated study tools into a single cloud-synchronized platform, eliminating the need to switch between multiple applications for learning and productivity.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6 mb-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-indigo-400">1.</span> Upload Source
                    </div>
                    <p className="text-sm">Navigate to Dashboard → Create New → Choose your tool.Upload a PDF, paste text, or drop in a CSV file.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-indigo-400">2.</span> Configure AI
                    </div>
                    <p className="text-sm">Select your AI model (Fast vs Premium), set the tone/depth, and add optional custom instructions to guide the output.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-indigo-400">3.</span> Generate & Save
                    </div>
                    <p className="text-sm">Hit Generate and watch the AI work in real-time. Review the output, download it, or save to your library for later.</p>
                </div>
            </div>
            <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10">
                <p className="text-sm"><strong className="text-white">Pro Tip:</strong> Start with a small document (2-3 pages) to understand how the AI interprets your source material before processing larger files.</p>
            </div>
        </UserGuideSection>

        <UserGuideSection id="file-formats" icon={Code2} title="Supported File Formats & Upload Best Practices">
            <p className="mb-4">
                Our multi-modal AI engine can extract meaningful insights from various file types. Each format is optimized for specific use cases.
            </p>
            <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-semibold text-sm">PDF Documents (.pdf)</h4>
                        <p className="text-xs opacity-80">Best for: Textbooks, research papers, legal documents. Our OCR handles scanned PDFs, but native digital PDFs yield better accuracy.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors opacity-50 grayscale">
                    <div className="p-1 bg-white/5 rounded-lg mt-1">
                        <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    </div>
                    <div>
                        <h4 className="text-slate-400 font-semibold text-sm">Microsoft Word (.docx)</h4>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Under Development</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-semibold text-sm">Excel & CSV (.xlsx, .xls, .csv)</h4>
                        <p className="text-xs opacity-80">Best for: Data analysis and visualization. Our Python EDA engine handles multi-sheet workbooks and localized delimiters automatically.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-semibold text-sm">Text Files (.txt, .md)</h4>
                        <p className="text-xs opacity-80">Best for: Code snippets, plain notes, markdown documentation. Fast processing with minimal overhead.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-semibold text-sm">Direct Text Input</h4>
                        <p className="text-xs opacity-80">Best for: Quick tasks where you don't have a file. Paste lecture notes, code, or text directly into the input box (up to 50K characters).</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <p className="text-sm"><strong className="text-amber-400">File Size Limits:</strong> PDFs up to 20MB, Excel up to 10MB. For larger files, consider splitting into sections or using text extraction first.</p>
            </div>
        </UserGuideSection>

        <UserGuideSection id="ai-models" icon={Cpu} title="Understanding AI Models: When to Use What">
            <p className="mb-4">
                Cognify integrates multiple state-of-the-art AI models. Each model category is optimized for specific tasks like logic, coding, or rapid response.
            </p>
            <div className="space-y-6">
                <div className="flex gap-4 items-start p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 font-bold text-xs self-start">GENERAL</div>
                    <div className="flex-1">
                        <h4 className="text-white font-bold mb-2">Meta Llama 3.1 / 3.2 & Qwen 2.5</h4>
                        <p className="text-sm mb-3">Versatile open-source models. Llama 3.1/3.2 provides superior academic logic, while Qwen 2.5 excels at deductive reasoning and step-by-step math problems.</p>
                        <div className="text-xs space-y-1 opacity-80">
                            <p><strong className="text-teal-400">Best For:</strong> MCQ Generation, Deep Summaries, Logical Proofs, Rapid Flashcards (Lite mode).</p>
                            <p><strong className="text-teal-400">Performance:</strong> High reliability for structured data and pedagogical explanations.</p>
                            <p><strong className="text-teal-400">Model Variants:</strong> 8B (Full Power), 3B (Data Analyst), 1B (Ultra-Fast).</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-2xl bg-pink-500/5 border border-pink-500/10">
                    <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 font-bold text-xs self-start">CODER</div>
                    <div className="flex-1">
                        <h4 className="text-white font-bold mb-2">Qwen 2.5 Coder 7B</h4>
                        <p className="text-sm mb-3">Specialized engine for development. Trained on trillions of tokens of code to understand complex syntax and security patterns.</p>
                        <div className="text-xs space-y-1 opacity-80">
                            <p><strong className="text-pink-400">Best For:</strong> Code Explanation, Security Audits, Refactoring, Database Schema Design.</p>
                            <p><strong className="text-pink-400">Expertise:</strong> Processes over 30+ programming languages with high architectural precision.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 font-bold text-xs self-start">PREMIUM</div>
                    <div className="flex-1">
                        <h4 className="text-white font-bold mb-2">OpenAI GPT-4o / GPT-4o Mini</h4>
                        <p className="text-sm mb-3">State-of-the-art reasoning models with superior nuance. Use when absolute accuracy and complex instruction following are required.</p>
                        <div className="text-xs space-y-1 opacity-80">
                            <p><strong className="text-purple-400">Best For:</strong> Advanced Research summaries, Flawless High-Stakes MCQs, Sensitive Data Analysis.</p>
                            <p><strong className="text-purple-400">Output Quality:</strong> Highest fidelity across all benchmarks with minimal hallucination.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                <p className="text-sm"><strong className="text-white">Smart Selection:</strong> Our system intelligently defaults to the most efficient model for your chosen tool, but you can override this in the AI Studio settings.</p>
            </div>
        </UserGuideSection>

        <UserGuideSection id="tools" icon={Book} title="Tool-by-Tool Deep Dive">
            <p className="mb-6">Each tool on the platform is purpose-built for specific academic and professional workflows. Here's how to get the best results from each one.</p>

            <div className="space-y-8">
                {/* MCQ Generator */}
                <div className="border-l-4 border-indigo-500 pl-6 py-2">
                    <h4 className="text-white font-bold mb-2 text-lg">MCQ Generator</h4>
                    <p className="text-sm mb-3">Generate high-quality multiple-choice questions aligned with Bloom's Taxonomy for exam prep and assessments.</p>
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-indigo-400">Key Settings:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 opacity-80">
                            <li><strong>Number of Questions:</strong> Start with 10-15 for quality review before generating bulk sets of 50+.</li>
                            <li><strong>Difficulty (Bloom's Level):</strong> Remember → Understand → Apply → Analyze. Match to your audience's expertise.</li>
                            <li><strong>Question Style:</strong> "Tricky" adds intentional distractors; "Direct" focuses on comprehension.</li>
                        </ul>
                        <p className="italic pt-2 text-xs bg-white/5 p-3 rounded-lg border border-white/5">
                            <strong>Use Case Example:</strong> "Generate 20 'Apply' level MCQs from Chapter 3 focused on use cases, not definitions."
                        </p>
                    </div>
                </div>

                {/* Flashcard Generator */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                    <h4 className="text-white font-bold mb-2 text-lg">Flashcard Generator</h4>
                    <p className="text-sm mb-3">Transform dense notes into active recall flashcards optimized for spaced repetition learning.</p>
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-blue-400">Key Settings:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 opacity-80">
                            <li><strong>Card Style:</strong> "Question/Answer" for conceptual learning. "Term/Definition" for vocabulary. "Scenario-Based" for application testing.</li>
                            <li><strong>Detail Level:</strong> "Brief" for quick review. "Comprehensive" for deep understanding with context.</li>
                        </ul>
                        <p className="italic pt-2 text-xs bg-white/5 p-3 rounded-lg border border-white/5">
                            <strong>Pro Tip:</strong> Use "Comprehensive" mode the first time you study a topic, then regenerate with "Brief" for maintenance review.
                        </p>
                    </div>
                </div>

                {/* Summarizer */}
                <div className="border-l-4 border-emerald-500 pl-6 py-2">
                    <h4 className="text-white font-bold mb-2 text-lg">AI Summarizer</h4>
                    <p className="text-sm mb-3">Condense lengthy documents into executive summaries, key points, or narrative overviews.</p>
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-emerald-400">Key Settings:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 opacity-80">
                            <li><strong>Perspective:</strong> "Technical Expert" preserves jargon. "Business Stakeholder" translates into ROI language. "General Audience" uses ELI5 explanations.</li>
                            <li><strong>Format:</strong> Bullets for scannable lists. Paragraphs for narrative flow. Executive Brief for C-suite presentations.</li>
                        </ul>
                        <p className="italic pt-2 text-xs bg-white/5 p-3 rounded-lg border border-white/5">
                            <strong>Advanced:</strong> Summarize a paper first, then use that summary as input to the Flashcard tool for double-distilled learning efficiency.
                        </p>
                    </div>
                </div>

                {/* Code Analysis */}
                <div className="border-l-4 border-pink-500 pl-6 py-2">
                    <h4 className="text-white font-bold mb-2 text-lg">Code Analysis & Debugging</h4>
                    <p className="text-sm mb-3">Get expert-level code reviews with security audits, performance tuning, and step-by-step logic explanations.</p>
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-pink-400">Key Settings:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 opacity-80">
                            <li><strong>Analysis Depth:</strong> "Quick Scan" for syntax/style. "Deep Security Audit" for production code with vulnerability detection.</li>
                            <li><strong>Output Style:</strong> "Educational" explains the 'why' behind suggestions. "Concise" gives direct fixes.</li>
                        </ul>
                        <p className="italic pt-2 text-xs bg-white/5 p-3 rounded-lg border border-white/5">
                            <strong>Developer Tip:</strong> Include error messages in "Additional Instructions" for laser-focused debugging.
                        </p>
                    </div>
                </div>

                {/* Data Visualizer */}
                <div className="border-l-4 border-teal-500 pl-6 py-2">
                    <h4 className="text-white font-bold mb-2 text-lg">Data Visualizer</h4>
                    <p className="text-sm mb-3">Transform raw datasets into stunning, interactive PowerBI-style dashboards with AI-powered trend analysis.</p>
                    <div className="space-y-2 text-sm">
                        <p><strong className="text-teal-400">Dashbaord Features:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 opacity-80">
                            <li><strong>Dynamic Charting:</strong> Automatically select the best chart type for your data.</li>
                            <li><strong>AI Narrative:</strong> Get contextual explanations and insights for every visual.</li>
                            <li><strong>Multi-Theme Support:</strong> Toggle between Modern Dark, Neon, and Corporate themes.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </UserGuideSection>

        <UserGuideSection id="advanced-prompting" icon={HelpCircle} title="Advanced Prompting: The 'Additional Instructions' Field">
            <p className="mb-4">
                This is where you unlock the full power of Cognify. While our default prompts are engineered for quality,
                the "Additional Instructions" field lets you steer the AI with surgical precision.
            </p>
            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="font-semibold text-white mb-2">Example 1: Targeting Specific Content</p>
                    <p className="text-sm italic opacity-80">"Generate flashcards ONLY from Section 2.3 on Mitochondrial Function. Ignore the intro paragraphs."</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="font-semibold text-white mb-2">Example 2: Audience Calibration</p>
                    <p className="text-sm italic opacity-80">"Write this summary for someone with a Master's degree in Finance who needs to present to non-technical board members."</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="font-semibold text-white mb-2">Example 3: Format Specifications</p>
                    <p className="text-sm italic opacity-80">"Format the quiz as if it's a real NCLEX-style nursing exam with clinical vignettes."</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="font-semibold text-white mb-2">Example 4: Error Fixing Context</p>
                    <p className="text-sm italic opacity-80">"This Python code throws 'IndexError: list index out of range' on line 47. Focus the analysis there."</p>
                </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <p className="text-sm"><strong className="text-rose-400">Common Mistakes to Avoid:</strong> Being too vague ("make it better") or contradictory ("detailed but short"). Be specific and directional.</p>
            </div>
        </UserGuideSection>

        <UserGuideSection id="privacy-security" icon={ShieldCheck} title="Privacy, Security & Your Data">
            <p className="mb-4">We take data sovereignty seriously. Here's exactly what happens when you upload a document:</p>
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-400 font-bold text-xs">1</span>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-1">Encrypted Transit</h4>
                        <p className="text-sm opacity-80">Your file is uploaded via TLS 1.3 encryption to our secure servers. No unencrypted transmission ever occurs.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-400 font-bold text-xs">2</span>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-1">AI Processing (Zero-Training Policy)</h4>
                        <p className="text-sm opacity-80">We send your data to OpenAI/HuggingFace APIs under enterprise agreements that explicitly prohibit model training. Your documents never improve their base models.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-400 font-bold text-xs">3</span>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-1">Optional Persistence</h4>
                        <p className="text-sm opacity-80">Saved outputs in "My Library" are encrypted at rest (AES-256). You control deletion—permanently remove items anytime.</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-sm"><strong className="text-emerald-400">GDPR & Student Privacy:</strong> We are FERPA-aware and EU-compliant. Request a full data export or account deletion via your Profile settings.</p>
            </div>
        </UserGuideSection>

        <UserGuideSection id="library-management" icon={Layers} title="Managing Your Library & Workflows">
            <p className="mb-4">The "My Library" tab is your personal knowledge repository. Here's how power users organize their generated content:</p>
            <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                    <ChevronRight className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <strong className="text-white">Filtering by Type:</strong> <span className="opacity-80">Use the filter dropdown to show only MCQs, Flashcards, or Summaries when reviewing for specific study modes.</span>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <ChevronRight className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <strong className="text-white">Re-generating:</strong> <span className="opacity-80">Found a better source document? Simply re-upload and regenerate—old versions remain in History.</span>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <ChevronRight className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <strong className="text-white">Exporting:</strong> <span className="opacity-80">Every output can be downloaded as PDF, JSON, or plain text for integration with Anki, Notion, or your LMS.</span>
                    </div>
                </div>
                <div className="flex gap-3 items-start">
                    <ChevronRight className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                    <div>
                        <strong className="text-white">Search:</strong> <span className="opacity-80">Use the search bar to find past generations by keyword—e.g., "photosynthesis MCQ" or "Python debugging."</span>
                    </div>
                </div>
            </div>
        </UserGuideSection>

        <div className="pt-8 text-center bg-indigo-500/5 rounded-3xl p-10 border border-indigo-500/10">
            <MessageSquare className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-slate-400 mb-6">Our support team monitors <a href="mailto:support@cognify.ai" className="text-indigo-400 hover:underline">support@cognify.ai</a> and typically responds within 6 hours.</p>
            <a href="mailto:support@cognify.ai" className="btn-primary px-8 py-3 rounded-xl font-bold inline-block">
                Email Support Team
            </a>
        </div>
    </motion.div>
);

const TechnicalDocumentation = () => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-20 p-4"
    >
        {/* Architecture Section */}
        <section id="architecture" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
                <Server className="w-6 h-6 text-indigo-400" />
                <h2 className="text-3xl font-bold text-white font-outfit">Core System Architecture</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                        Cognify AI employs a Microservices-inspired Monolithic architecture designed for low-latency inference and high scalability.
                        The Core Engine orchestrates data flow using <strong className="text-white font-mono text-sm">Node.js (v20+)</strong> and <strong className="text-white font-mono text-sm">Express</strong>, while specialized tasks are delegated to a dedicated <strong className="text-indigo-400 font-mono text-sm">Python Analytics Engine</strong>.
                    </p>
                    <p>
                        The frontend is built on <strong className="text-white font-mono text-sm">React 19</strong>, utilizing concurrent rendering and Framer Motion for a premium, responsive user experience. All session data is persisted via <strong className="text-white font-mono text-sm">MongoDB Atlas</strong>.
                    </p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-slate-900/50 relative overflow-hidden">
                    <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide opacity-70">Data Flow Diagram</h4>
                    <div className="space-y-3 font-mono text-[10px] md:text-xs text-indigo-300">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">[Client]</span>
                            <span className="h-[1px] bg-slate-700 w-8" />
                            <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400">REST API Gateway</span>
                        </div>
                        <div className="pl-20 border-l border-slate-700 ml-4 py-2 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-500" />
                                <span>Auth Middleware (JWT/OAuth)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-500" />
                                <span>Input Sanitization & OCR</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-500" />
                                <span>Model Router (GPT-4o / Llama 3.2 / Qwen)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-500" />
                                <span className="text-teal-400">Python EDA Engine</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">[Result]</span>
                            <span className="h-[1px] bg-slate-700 w-8" />
                            <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-400">JSON Response</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <Database className="w-6 h-6 text-teal-400 mb-4" />
                    <h4 className="text-white font-bold mb-2">Ephemeral Storage</h4>
                    <p className="text-sm text-slate-400">
                        Processed sensitive text is stored in ephemeral memory buffers during active sessions and flushed immediately post-generation. Persistent storage is strictly opt-in via "My Library".
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <Globe className="w-6 h-6 text-blue-400 mb-4" />
                    <h4 className="text-white font-bold mb-2">Inference Routing</h4>
                    <p className="text-sm text-slate-400">
                        We dynamically switch between OpenAI Enterprise APIs and Self-Hosted HuggingFace Endpoints to ensure 99.9% uptime even during provider outages.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <Lock className="w-6 h-6 text-rose-400 mb-4" />
                    <h4 className="text-white font-bold mb-2">Encryption Standards</h4>
                    <p className="text-sm text-slate-400">
                        All data at rest is encrypted using AES-256. TLS 1.3 is enforced for all data in transit, ensuring man-in-the-middle attacks are mitigated.
                    </p>
                </div>
            </div>
        </section>

        {/* Deep Ethics Section */}
        <section id="ethics" className="pt-20 border-t border-white/5 scroll-mt-32">
            <div className="flex items-center gap-3 mb-10">
                <ShieldCheck className="w-6 h-6 text-rose-400" />
                <h2 className="text-3xl font-bold text-white font-outfit">Ethical AI Framework</h2>
            </div>

            <div className="space-y-16">
                {/* Principle 1 */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Fingerprint className="w-5 h-5 text-indigo-400" /> Human-in-the-Loop
                        </h3>
                        <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                    </div>
                    <div className="md:w-2/3 text-slate-400 leading-relaxed">
                        <p className="mb-4">
                            We design our systems to augment human intelligence, not replace it. Our platforms explicitly label all AI-generated content.
                            We encourage users to verify critical information, especially in academic and professional contexts (the "Trust but Verify" protocol).
                        </p>
                        <ul className="space-y-2 text-sm text-slate-500 border-l-2 border-slate-800 pl-4">
                            <li>• Explicit labeling of confidence scores where available.</li>
                            <li>• Designed friction: forcing user review before final export.</li>
                            <li>• Feedback loops allowing users to flag hallucinated content.</li>
                        </ul>
                    </div>
                </div>

                {/* Principle 2 */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-emerald-400" /> Algorithm Transparency
                        </h3>
                        <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                    </div>
                    <div className="md:w-2/3 text-slate-400 leading-relaxed">
                        <p className="mb-4">
                            Cognify provides "Explainable AI" features. For code reviews and data analysis, we don't just give the answer; we provide the "Chain of Thought".
                            Users have the right to understand NOT just 'what' the AI decided, but 'why'.
                        </p>
                        <p className="text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                            "Black box models are dangerous in education. We prioritize models that can articulate their reasoning steps, ensuring pedagogical value."
                        </p>
                    </div>
                </div>

                {/* Principle 3 */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-amber-400" /> Bias & Fairness
                        </h3>
                        <div className="h-1 w-12 bg-amber-500 rounded-full" />
                    </div>
                    <div className="md:w-2/3 text-slate-400 leading-relaxed">
                        <p className="mb-4">
                            We implement adversarial testing against our prompts to minimize representational harm. Our system instructions explicitly forbid the generation of
                            hateful, discriminatory, or non-inclusive content.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-500">
                            <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                                ❌ Blocked: Hate Speech, Self-Harm, PII Generation
                            </div>
                            <div className="p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
                                ✅ Aligned: Academic Objectivity, Inclusive Language
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Academic Credits Section */}
        <section id="credits" className="pt-20 border-t border-white/5 scroll-mt-32">
            <div className="flex items-center gap-3 mb-10">
                <Book className="w-6 h-6 text-indigo-400" />
                <h2 className="text-3xl font-bold text-white font-outfit">Academic Credits</h2>
            </div>
            <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[300px] p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                        <Code2 className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Lead Developer</p>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Ankush Verma</h3>
                    <p className="text-sm text-slate-400 font-mono">ID: 23FE10CSE00100</p>
                </div>
                <div className="flex-1 min-w-[300px] p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:-rotate-12 transition-transform">
                        <Cpu className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Project Guide</p>
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Dr. Tapan Kumar Dey</h3>
                    <p className="text-sm text-slate-400">Dept. of Computer Science & Engineering</p>
                </div>
            </div>
            <div className="mt-8 text-center text-xs text-slate-600 font-bold uppercase tracking-widest">
                Manipal University Jaipur • Problem Based Learning 2026
            </div>
        </section>
    </motion.div>
);

const Documentation = () => {
    const [activeTab, setActiveTab] = useState('guide');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Search content database with natural language support
    const searchableContent = [
        // User Guide - Getting Started
        {
            title: 'Getting Started',
            section: 'User Guide',
            keywords: 'upload pdf configure ai generate save dashboard create new how to start begin first time new user tutorial guide walkthrough intro introduction onboarding setup',
            tab: 'guide',
            sectionId: 'getting-started'
        },

        // File Formats - PDF
        {
            title: 'PDF Documents',
            section: 'File Formats',
            keywords: 'pdf upload file document textbook research paper legal scanned scan ocr read extract text book chapter article reading material what files can i upload supported formats',
            tab: 'guide',
            sectionId: 'file-formats'
        },

        // File Formats - Word (Coming Soon)
        {
            title: 'Word Documents',
            section: 'File Formats',
            keywords: 'docx word microsoft essay support coming soon future update',
            tab: 'guide',
            sectionId: 'file-formats'
        },

        // File Formats - Excel/CSV
        {
            title: 'Excel & CSV',
            section: 'File Formats',
            keywords: 'xlsx csv excel spreadsheet data table numbers analysis chart graph statistics upload file dataset information columns rows what files can i use',
            tab: 'guide',
            sectionId: 'file-formats'
        },

        // AI Models - Fast
        {
            title: 'Fast Models',
            section: 'AI Models',
            keywords: 'llama qwen fast speed quick cheap economical cost-effective free model which ai should i use free tier basic standard affordable budget',
            tab: 'guide',
            sectionId: 'ai-models'
        },

        // AI Models - Premium
        {
            title: 'Premium Models',
            section: 'AI Models',
            keywords: 'gpt-4o o1-mini openai premium best quality accurate high-quality professional advanced better results chatgpt which model to use paid',
            tab: 'guide',
            sectionId: 'ai-models'
        },

        // Tools - MCQ Generator
        {
            title: 'MCQ Generator',
            section: 'Tools',
            keywords: 'mcq multiple choice questions quiz test exam assessment create questions make quiz generate test prepare exam study questions practice questions how to create quiz trivia',
            tab: 'guide',
            sectionId: 'tools'
        },

        // Tools - Flashcards
        {
            title: 'Flashcard Generator',
            section: 'Tools',
            keywords: 'flashcards flash cards study cards memory recall revision review learn remember memorize spaced repetition anki quizlet study better how to study make cards for studying',
            tab: 'guide',
            sectionId: 'tools'
        },

        // Tools - Summarizer
        {
            title: 'AI Summarizer',
            section: 'Tools',
            keywords: 'summary summarize condense shorten brief executive summary tldr too long make shorter key points main ideas overview abstract digest simplify explain reduce length',
            tab: 'guide',
            sectionId: 'tools'
        },

        // Tools - Code Analysis
        {
            title: 'Code Analysis',
            section: 'Tools',
            keywords: 'code review debug debugging fix error bug security audit check code analyze program syntax vulnerability find bugs improve code help with code explain code programming developer',
            tab: 'guide',
            sectionId: 'tools'
        },

        // Tools - Data Visualizer
        {
            title: 'Data Visualizer',
            section: 'Tools',
            keywords: 'data visualization visualize data dashboards charts graphs trends patterns insights powerbi csv excel spreadsheet numbers metrics understand data find insights visualize datasets dashboarding table analytics eda python',
            tab: 'guide',
            sectionId: 'tools'
        },

        // Advanced Prompting
        {
            title: 'Advanced Prompting',
            section: 'User Guide',
            keywords: 'prompting instructions custom prompt how to get better results improve output tips tricks expert advanced techniques additional instructions guide ai steer control specific requirements',
            tab: 'guide',
            sectionId: 'advanced-prompting'
        },

        // Privacy & Security
        {
            title: 'Privacy & Security',
            section: 'User Guide',
            keywords: 'privacy security safe data protection encryption confidential private gdpr ferpa compliance secure is my data safe who can see my files protect information delete data',
            tab: 'guide',
            sectionId: 'privacy-security'
        },

        // Library Management
        {
            title: 'Library Management',
            section: 'User Guide',
            keywords: 'library save history saved items my files past results export download organize filter search manage content workflow previous generations find old work',
            tab: 'guide',
            sectionId: 'library-management'
        },

        // Technical - Architecture
        {
            title: 'System Architecture',
            section: 'Technical',
            keywords: 'architecture system backend infrastructure technical how it works microservices api gateway server database technology stack engineering built',
            tab: 'docs',
            sectionId: 'architecture'
        },

        // Technical - Data Flow
        {
            title: 'Data Flow',
            section: 'Technical',
            keywords: 'data flow process pipeline request response api authentication jwt oauth routing how data moves processing workflow',
            tab: 'docs',
            sectionId: 'architecture'
        },

        // Security - Encryption
        {
            title: 'Encryption',
            section: 'Security',
            keywords: 'encryption secure aes tls https security protocol standards man-in-the-middle attack protection cipher ssl certificate',
            tab: 'docs',
            sectionId: 'architecture'
        },

        // Technical - Storage
        {
            title: 'Ephemeral Storage',
            section: 'Technical',
            keywords: 'storage database memory session temporary persistent save delete data retention how long stored',
            tab: 'docs',
            sectionId: 'architecture'
        },

        // Ethics - Human in Loop
        {
            title: 'Human-in-the-Loop',
            section: 'Ethics',
            keywords: 'human loop ethics ai augment verify trust review responsibility accountability human oversight control',
            tab: 'docs',
            sectionId: 'ethics'
        },

        // Ethics - Transparency
        {
            title: 'Algorithm Transparency',
            section: 'Ethics',
            keywords: 'transparency explainable explain reasoning why how does it work chain of thought interpretable understandable clear open',
            tab: 'docs',
            sectionId: 'ethics'
        },

        // Ethics - Bias
        {
            title: 'Bias & Fairness',
            section: 'Ethics',
            keywords: 'bias fairness discrimination inclusive diversity ethical responsible harmful content hate speech objectivity neutral',
            tab: 'docs',
            sectionId: 'ethics'
        },
    ];

    // Filter search results
    const searchResults = searchQuery.trim()
        ? searchableContent.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keywords.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.section.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Handle keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            // Escape to close
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearchResultClick = (result) => {
        // Switch to the correct tab
        setActiveTab(result.tab);
        setSearchOpen(false);
        setSearchQuery('');

        // Scroll to the specific section after tab switch
        setTimeout(() => {
            const element = document.getElementById(result.sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add a brief highlight effect
                element.classList.add('ring-2', 'ring-indigo-500/50', 'rounded-2xl');
                setTimeout(() => {
                    element.classList.remove('ring-2', 'ring-indigo-500/50', 'rounded-2xl');
                }, 2000);
            }
        }, 300); // Wait for tab animation to complete
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Search Modal */}
            <AnimatePresence>
                {searchOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSearchOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />

                        {/* Search Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
                        >
                            <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                                    <Search className="w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search anything... Try 'Llama 3.2' or 'code review' ✨"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
                                    />
                                    <button
                                        onClick={() => setSearchOpen(false)}
                                        className="text-slate-500 hover:text-white transition-colors text-sm font-mono"
                                    >
                                        ESC
                                    </button>
                                </div>

                                {/* Search Results */}
                                <div className="max-h-96 overflow-y-auto">
                                    {searchQuery.trim() === '' ? (
                                        <div className="p-8 text-center text-slate-500">
                                            <p className="text-sm mb-2">Type what you want to do in plain language...</p>
                                            <p className="text-xs opacity-70 mb-4">Examples: "study better", "fix my code", "is my data safe?"</p>
                                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                                {['generate mcqs', 'visualize data', 'study cards', 'fix bugs', 'privacy'].map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setSearchQuery(tag)}
                                                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white transition-colors"
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : searchResults.length === 0 ? (
                                        <div className="p-8 text-center text-slate-500">
                                            <p className="text-sm">No results found for "{searchQuery}"</p>
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            {searchResults.map((result, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSearchResultClick(result)}
                                                    className="w-full text-left p-4 rounded-xl hover:bg-white/5 transition-colors group"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h4 className="text-white font-semibold mb-1 group-hover:text-indigo-400 transition-colors">
                                                                {result.title}
                                                            </h4>
                                                            <p className="text-xs text-slate-500">
                                                                {result.section} • {result.tab === 'guide' ? 'User Guide' : 'Tech & Ethics'}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Footer Hint */}
                                <div className="p-3 border-t border-white/5 bg-white/5 flex items-center justify-between text-xs text-slate-500">
                                    <span>Use ↑↓ to navigate</span>
                                    <span>Press Enter to select</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Header / Hero */}
            <div className="relative pt-32 pb-20 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,_rgba(99,102,241,0.1)_0%,_transparent_50%)]">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter font-outfit">
                            Knowledge <span className="text-gradient">Base</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                            Comprehensive documentation for students, developers, and AI researchers.
                            Explore how we build and how to grow.
                        </p>

                        {/* Modern Tab Switcher */}
                        <div className="flex justify-center p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl max-w-md mx-auto mb-20">
                            <button
                                onClick={() => setActiveTab('guide')}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'guide' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Book className="w-4 h-4" /> User Guide
                            </button>
                            <button
                                onClick={() => setActiveTab('docs')}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'docs' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <Terminal className="w-4 h-4" /> Tech & Ethics
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 pb-32 relative z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'guide' ? (
                        <UserGuide key="guide" />
                    ) : (
                        <TechnicalDocumentation key="docs" />
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Search Button */}
            <div className="fixed bottom-8 right-8 z-50 group">
                <div className="absolute inset-0 bg-indigo-600/20 blur-xl group-hover:bg-indigo-600/40 transition-all rounded-full" />
                <button
                    onClick={() => setSearchOpen(true)}
                    className="relative bg-slate-900 border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 hover:border-indigo-500/30 transition-all group-hover:scale-105"
                >
                    <Search className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:inline group-hover:text-indigo-400 transition-colors">
                        Quick Search
                    </span>
                    <kbd className="hidden lg:inline-block px-2 py-1 text-[10px] font-mono bg-white/5 rounded border border-white/10 text-slate-500">
                        ⌘K
                    </kbd>
                </button>
            </div>
        </div>
    );
};

export default Documentation;
