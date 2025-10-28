import { Icon } from '@iconify/react';
export default function Contact() {
    return (<>
        <div className="py-[100px] " id='contacts'>
            <div className='text-center container  h-54  p-12 bg-purple-800 rounded-lg w-full  mx-auto text-white'>
                <h1 className="max-sm:text-base text-2xl font-semibold mb-6">Anda memiliki pertanyaan tentang kami?</h1>
                <a href="https://wa.link/gkfaqz" className="flex items-center w-fit mx-auto bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-transparent hover:text-white border-2 border-transparent hover:border-white transition-colors">
                    <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />
                    Hubungi Kami
                </a>
            </div>
        </div>
    </>)
}