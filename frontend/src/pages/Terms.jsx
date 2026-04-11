import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';

const Terms = () => {
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
                        <Scale className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-outfit">
                        Terms of <span className="text-gradient">Service</span>
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
                            <CheckCircle className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                        </div>
                        <p>
                            By accessing or using Cognify AI, you agree to be bound by these Terms of Service.
                            If you do not agree to all of these terms, do not use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">2. Use of Services</h2>
                        </div>
                        <p>
                            You agree to use Cognify AI only for lawful purposes and in accordance with these Terms.
                            You are responsible for maintaining the confidentiality of your account credentials and for all
                            activities that occur under your account.
                        </p>
                        <p className="opacity-80">
                            Prohibited uses include:
                            - Attempting to reverse engineer the AI models.
                            - Using the service to generate harmful or illegal content.
                            - Interfering with the platform's security or technical infrastructure.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <AlertCircle className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">3. Intellectual Property</h2>
                        </div>
                        <p>
                            The Cognify AI platform, including its software, designs, and brand elements, is the exclusive
                            property of Cognify AI. You retain ownership of the data you upload, but grant us a license to
                            process it for the purpose of providing the service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <Scale className="w-5 h-5 text-indigo-400" />
                            <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
                        </div>
                        <p>
                            Cognify AI provides its services "as is" and "as available". We do not warrant that the AI-generated
                            outputs will be always accurate or error-free. We shall not be liable for any indirect, incidental,
                            or consequential damages arising from your use of the platform.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-sm">
                            Need clarification on our terms? Reach out at <a href="mailto:legal@cognify.ai" className="text-indigo-400 hover:underline">legal@cognify.ai</a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
