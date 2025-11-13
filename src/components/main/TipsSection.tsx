'use client';

import Image from 'next/image';
import { motion , Variants} from 'framer-motion';

// Animation variants can be reused or defined here
const sectionVariants : Variants= {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export default function TipsSection({ images }: { images: string[] }) {
    if (!images || images.length === 0) {
        return null; // Don't render anything if there are no images
    }

    return (
        <motion.section
            className="p-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="text-left mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Tips & Trik</h2>
                <p className="text-sm lg:text-base text-gray-500">Kumpulan tips dan trik bermanfaat untuk Anda.</p>
            </div>

            {/* Masonry Layout */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 break-inside-avoid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }} 
                        viewport={{ once: true }}
                    >
                        <div className="relative w-full">
                            <Image
                                src={image}
                                alt={`Tips and Trik Image ${index + 1}`}
                                width={500} // Provide arbitrary width/height for aspect ratio calculation
                                height={500} // These are not rendered dimensions, but for aspect ratio
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
