import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
                        <ShieldCheck className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-outfit">
                        Privacy <span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Last Updated: February 5, 2026
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 space-y-12 text-slate-300 leading-relaxed"
                >
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <Eye className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                        </div>
                        <p>
                            At Cognify AI, we collect information that you provide directly to us when you create an account,
                            upload study materials, or communicate with us. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 opacity-80">
                            <li>Account Identification: Name, email address, and profile preferences.</li>
                            <li>Content Data: Text, documents, and code snippets you upload for AI processing.</li>
                            <li>Usage Data: Information on how you interact with our tools and features.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <Lock className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">2. How We Use Your Data</h2>
                        </div>
                        <p>
                            We use the collected information to provide, maintain, and improve our services. Specifically:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 opacity-80">
                            <li>To generate MCQs, flashcards, and summaries using advanced AI models.</li>
                            <li>To personalize your learning experience and model preferences.</li>
                            <li>To monitor and analyze trends and usage to enhance platform performance.</li>
                            <li>To ensure the security and integrity of our services.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">3. Data Security</h2>
                        </div>
                        <p>
                            We implement industry-standard security measures to protect your data. Your uploaded materials are
                            processed by our AI partners (OpenAI, HuggingFace) according to strict privacy guidelines.
                            We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">4. Your Rights</h2>
                        </div>
                        <p>
                            You have the right to access, update, or delete your personal information at any time.
                            You can manage your data directly through your Dashboard profile or by contacting our support team.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-sm">
                            Questions about our Privacy Policy? Contact us at <a href="mailto:privacy@cognify.ai" className="text-indigo-400 hover:underline">privacy@cognify.ai</a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
