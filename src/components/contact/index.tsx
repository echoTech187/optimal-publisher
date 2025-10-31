import { Icon } from '@iconify/react';
export default function Contact() {
    return (<>
        <div className="scroll-mt-24" id='contacts'>
            <div className='text-center container md:my-12 h-54  p-12 bg-purple-800 max-md:rounded-none rounded-lg w-full  mx-auto text-white'>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Anda memiliki pertanyaan tentang kami?</h2>
                <a href="https://wa.link/gkfaqz" className="flex items-center w-fit mx-auto bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-colors">
                    <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />
                    Hubungi Kami
                </a>
            </div>
        </div>
    </>)
}