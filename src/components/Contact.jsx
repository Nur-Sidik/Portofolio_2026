import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { Mail, Send, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Pesan Portofolio Baru dari ${formData.name}`,
                    from_name: "Portfolio Website Contact",
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setStatusMessage("Pesan berhasil terkirim!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
                setStatusMessage(result.message || "Gagal mengirim pesan, silakan coba lagi.");
            }
        } catch {
            setStatus("error");
            setStatusMessage("Terjadi kendala jaringan saat mengirim pesan.");
        }
    };

    return (
        <section id="contact" className="py-14 sm:py-20 px-3 sm:px-6 max-w-4xl mx-auto scroll-mt-24">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">Get In Touch</h2>
                <p className="text-xs sm:text-sm text-gray-400">
                    Tertarik untuk berdiskusi proyek, tawaran freelance, atau sekadar bertukar ide?
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 bg-surface/40 border border-white/5 p-4 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
                <div className="md:col-span-2 flex flex-col justify-between space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-xl font-semibold text-white">Kontak Langsung</h3>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                            Silakan kirim pesan melalui form ini, isi pesan akan langsung diteruskan ke inbox email saya.
                        </p>

                        <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-gray-300">
                            <div className="flex items-center space-x-2.5">
                                <MapPin size={16} className="text-accent shrink-0" />
                                <span>Yogyakarta, Indonesia</span>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <Mail size={16} className="text-accent shrink-0" />
                                <span className="truncate">{portfolioData.personal.socials.email.replace("mailto:", "")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-[11px] sm:text-xs text-gray-500">
                        © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="md:col-span-3 space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-gray-400 mb-1">Nama</label>
                        <input
                            type="text"
                            required
                            placeholder="Nama Anda"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-background border border-white/10 text-white placeholder-gray-600 text-xs sm:text-sm focus:outline-none focus:border-accent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-background border border-white/10 text-white placeholder-gray-600 text-xs sm:text-sm focus:outline-none focus:border-accent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-gray-400 mb-1">Pesan</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Tuliskan pesan atau kebutuhan proyek Anda..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-background border border-white/10 text-white placeholder-gray-600 text-xs sm:text-sm focus:outline-none focus:border-accent transition resize-none"
                        />
                    </div>

                    {status === "success" && (
                        <div className="flex items-center gap-2 p-2.5 text-xs rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <CheckCircle size={15} className="shrink-0" />
                            <span>{statusMessage}</span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="flex items-center gap-2 p-2.5 text-xs rounded-lg sm:rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
                            <AlertCircle size={15} className="shrink-0" />
                            <span>{statusMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-accent hover:bg-accent/80 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-accent/20 cursor-pointer"
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 size={15} className="animate-spin" /> Mengirim...
                            </>
                        ) : (
                            <>
                                Kirim Pesan <Send size={15} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};