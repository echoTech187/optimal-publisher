import FormProgramPrivate from "@/components/program/private";
import FormProgramReference from "@/components/program/reference";
import FormProgramTextbook from "@/components/program/textbook";
import FormProgramChapter from "@/components/program/chapter";
import FormProgramMonograf from "@/components/program/monograf";
import { User } from "@/types/user";

export default function Pack(props: {data: any, user: User}) {
    const {data, user} =props;
    const isbn = data[0].isbn_program_id;


    // const [showCustomer, setShowCustomer] = useState(false);
    // const [showAdress, setShowAdress] = useState(false);
    // const [packName, setPackName] = useState("");
    // const [selected, setSelected] = useState("");

    // function showFormCustomer(selected: string, pack: string) {
    //     setShowCustomer(true);
    //     setPackName(pack);
    //     if (parseInt(selected) > 0)
    //         setSelected(selected);
    //     else
    //         setSelected("");
    //     if (selected === "full") setShowAdress(true);
    //     else setShowAdress(false);
    //     if (showCustomer) {
    //         location.href = "#shipping-information";
    //     }

    // }
        if (!user) {
        return <div>Loading user data...</div>; // Or some other placeholder
    }
    return (
        <section className="w-full h-full py-[150px]">
            {
                (isbn === 1) ? <FormProgramPrivate data={data[0]} user={user} /> :
                    (isbn === 2) ? <FormProgramReference data={data[0]} user={user} /> :
                        (isbn === 3) ? <FormProgramTextbook data={data[0]} user={user} /> :
                            (isbn === 4) ? <FormProgramChapter data={data[0]} user={user} /> :
                                <FormProgramMonograf data={data[0]} user={user} />
            }

        </section>

    )
}