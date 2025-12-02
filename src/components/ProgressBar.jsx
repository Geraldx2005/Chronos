import { motion } from "framer-motion";

export default function ProgressBar({ progress, phase }) {
    return (
        <motion.div
            key="progressBar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full flex flex-col items-center gap-2 mb-2"
        >
            <div className="w-full flex justify-center items-center flex-col">
                <div className="w-full flex justify-center items-center gap-2">
                    <div className="w-64 h-2 bg-nero-700 rounded-full overflow-hidden">
                        <div
                            className="h-3 bg-denim-600 transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <span className="w-10 flex justify-center items-center">{progress}%</span>
                </div>

                <div className="text-gray-200 text-sm">
                    {progress >= 100
                        ? "Completed!"
                        : phase === "qr"
                        ? "Generating QR Codes..."
                        : "Generating PDF..."}
                </div>
            </div>
        </motion.div>
    );
}
