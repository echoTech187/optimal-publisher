import Article from "@/app/components/article/page"
import Image from "next/image"


export async function generateStaticParams() {
    const posts = [
        {
            slug: '1',
            title: 'Mengenal CAPD: Cuci Darah Mandiri dan Perawatannya di Rumah',
            description: `<div class="text-left">
			
<p>CAPD <em>(Continuous Ambulatory Peritoneal Dialysis) </em>adalah salah satu jenis dialisis yang&nbsp; dapat dilakukan di rumah bagi penderita gagal ginjal tahap akhir. Berbeda dengan&nbsp; hemodialisis yang membutuhkan kunjungan rutin ke unit cuci darah, CAPD memungkinkan&nbsp; pasien untuk menjalani terapi dialisis secara mandiri di rumah. Sahabat, yuk kita kenal lebih&nbsp; dekat dengan CAPD.&nbsp;</p>



<h5 class="wp-block-heading" id="h-prinsip-kerja-capd-nbsp">Prinsip Kerja CAPD&nbsp;</h5>



<p>CAPD memanfaatkan membran peritoneum (selaput yang melapisi rongga perut) sebagai&nbsp; filter alami untuk membuang sisa metabolisme tubuh dan kelebihan cairan. Dalam prosesnya,&nbsp; cairan dialisis steril dimasukkan ke dalam rongga perut melalui kateter yang dipasang secara&nbsp; permanen. Prinsip kerja secara sederhana adalah sebagai berikut:</p>



<ol>
<li>Pada membran peritoneum perut telah terpasang selang kecil (kateter) melalui operasi kecil yang dilakukan dan direkomendasikan oleh dokter atau nakes lain</li>



<li>Cairan pembersih (cairan dialisat) dimasukkan ke dalam perut melalui selang tersebut</li>



<li>Cairan pembersih akan dibiarkan di dalam perut selama beberapa jam (4-6 jam)</li>



<li>Saat di dalam perut, cairan pembersih akan menyerap kotoran dan air berlebih dari darah lewat selaput perut (peritoneum) yang bertindak seperti saringan alami</li>



<li>Setelah beberapa jam, cairan pembersih yang sudah kotor dikeluarkan dari perut lewat selang</li>



<li>Kemudian cairan pembersih yang baru dimasukkan kembali ke perut, menggantikan cairan yang kotor tadi</li>



<li>Proses memasukkan dan mengeluarkan cairan pembersih ini dilakukan berulang-ulang sekitar 4-5 kali sehari, siang dan malam sehingga darah akan terus dibersihkan dari kotoran dan air berlebih sepanjang hari dan menggantikan pekerjaan ginjal yang sudah tidak berfungsi dengan baik.</li>
</ol>



<h5 class="wp-block-heading" id="h-keuntungan-capd-nbsp">Keuntungan CAPD&nbsp;</h5>



<ol>
<li>Fleksibilitas waktu, dan mobilitas (pergerakan untuk memenuhi kebutuhan aktivitas dalam memelihara kesehatan) yang lebih baik.&nbsp;</li>



<li>Tidak memerlukan akses pembuluh darah seperti pada hemodialisis.</li>



<li>Dapat dilakukan di rumah secara mandiri setelah pelatihan.&nbsp;</li>



<li>Biaya lebih terjangkau dibandingkan hemodialisis.&nbsp;</li>



<li>Kualitas hidup yang lebih baik karena tidak terikat dengan jadwal kunjungan unit cuci&nbsp; darah.&nbsp;</li>
</ol>



<h5 class="wp-block-heading" id="h-perawatan-capd-di-rumah">Perawatan CAPD di Rumah</h5>



<p>Meskipun CAPD dapat dilakukan di rumah, pasien harus memahami pentingnya menjaga&nbsp; sterilitas dan kebersihan selama prosedur. Berikut adalah beberapa hal yang perlu&nbsp; diperhatikan dalam perawatan CAPD di rumah:&nbsp;</p>



<p><strong>Menjaga kebersihan area kerja dan mencuci tangan dengan sabun antiseptik sebelum&nbsp; prosedur.&nbsp;</strong></p>



<ol>
<li>Menggunakan teknik aseptik saat memasang dan melepas kantong dialisis.</li>



<li>Memastikan kantong dialisis tidak bocor atau rusak.&nbsp;</li>



<li>Membuang kantong dialisis bekas dengan benar.&nbsp;</li>



<li>Menjaga kebersihan area sekitar kateter dan melakukan perawatan luka dengan benar.&nbsp;</li>



<li>Mencatat setiap kejadian yang tidak normal dan segera melaporkannya kepada tim&nbsp; medis.&nbsp;</li>
</ol>



<h5 class="wp-block-heading" id="h-pelatihan-dan-pemantauan-nbsp"><strong>Pelatihan dan Pemantauan&nbsp;</strong></h5>



<p>Sebelum memulai CAPD di rumah, Sahabat akan mendapatkan pelatihan lengkap dari tim&nbsp; medis RS pemerintah terdekat terkait prosedur, perawatan, dan penanganan masalah yang mungkin timbul. Selain itu,&nbsp; pemantauan rutin oleh tim medis seperti perawat homecare juga diperlukan untuk memastikan keamanan dan&nbsp; efektivitas terapi CAPD. Keluarga juga dapat meminta bimbingan dan kontrol dari perawat homecare yang memahami prosedur ini.</p>



<p>Dengan memahami prinsip CAPD dan menerapkan perawatan yang benar di rumah, pasien&nbsp; dapat menjalani terapi dialisis dengan lebih nyaman dan fleksibel, sambil mempertahankan&nbsp; kualitas hidup yang lebih baik.</p>



<h5 class="wp-block-heading" id="h-referensi">Referensi</h5>



<p>Adhi, M. H. P. (2022). Implementasi terapi continuous peritoneal dialysis ( CAPD ) untuk&nbsp; pasien penyakit ginjal stadium akhir : Tinjauan Sistematis. <em>Jurnal Penelitian Dan&nbsp; Pemikiran Ilmiah Keperawatan</em>, <em>8</em>(2), 66–73.&nbsp; <a href="https://doi.org/http://dx.doi.org/10.30659/nurscope.8.2.149-156&nbsp;">https://doi.org/http://dx.doi.org/10.30659/nurscope.8.2.149-156&nbsp;</a></p>



<p>Kartika, D. S., Armelia, L., &amp; Arsyad, M. (2022). Karakteristik, Tingkat Kenyamanan dan&nbsp; Keberhasilan pada Pasien Penyakit Ginjal Kronik yang Menjalani Terapi Continuous&nbsp; Ambulatory Peritoneal Dialysis dan Tinjauannya menurut Pandangan Islam&nbsp; Characteristics, Comfort Level and Success in Chronic Kidney Disease Patients&nbsp; Undergoing Continuous Ambulatory Peritoneal Dialysis Therapy and its Review&nbsp; according to Islamic View. <em>Junior Meical Jurnal</em>, <em>1</em>(2), 129–138.&nbsp;</p>



<p>Matongka, H. Y., Sabarulin, &amp; Sepang, J. (2023). Efektifitas penerapan telenursing terhadap&nbsp; kualitas hidup pasien dengan penyakit ginjal kronik yang menjalani continuous&nbsp; ambulatory peritoneal dialisis: systematic review. <em>Nursing Update</em>, <em>14</em>, 351–363.</p>



<p></p>



<p class="has-small-font-size">Editor :<br>Ns. Nurul Fauziah, M.Med.Ed<br>Ns. Najmi Ulfa Misbah, S.Kep</p>
        </div>`,
            image: 'https://blog.appskep.id/wp-content/uploads/2024/05/CAPD-768x432.png',
            userPost: "Pradanis Yanuarinda Imkasari",
            postDate: new Date()

        }];
        
    return posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        image: post.image,
        userPost: post.userPost,
        postDate: post.postDate
    }))
}
export default async function DetailArticle({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const posts = generateStaticParams()
    const article = (await posts).find((post) => post.slug === slug)
    if (!article){
        return(
            <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
                <div className="max-w-[1300px] mx-auto px-4 py-[100px]  rounded-lg mt-12">
                    <div className="mb-12">
                        <h1 className="text-5xl text-gray-700 dark:text-gray-100 leading-tight"> Article Not Found</h1>
                    </div>
                </div>
            </div>
        )
    }
    const { title, image, description, userPost, postDate } = article
    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-700 min-h-screen">
                <div className="max-w-[1300px] mx-auto px-4 py-[100px]  rounded-lg mt-12">
                    <div className="mb-12">
                        <h1 className="text-5xl text-gray-700 dark:text-gray-100 leading-tight"> {title}</h1>
                        <p className="text-lg text-gray-500 font-normal my-2">{userPost} | {postDate.toLocaleDateString('id', {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</p>

                    </div>
                    <Image src={image} alt={title} width={0} height={0} className="size-full" />
                    <div className="text-center text-gray-600 mb-12 dark:text-gray-50 py-12 html_content" dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
            </div>
            <Article />
        </>
    );
}
