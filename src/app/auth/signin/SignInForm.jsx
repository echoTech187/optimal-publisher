import { useForm } from "@/utils/useForm";
import { validationLogin } from "@/utils/validation";
import { useEffect, useState } from "react";

export default function SignInForm() {
    const [isValid, setIsValid] = useState(false);
    const { form, errors: errros, handleInputChange } = useForm({
        phone: "",
        password: "",
    }, validationLogin);

    useEffect(() => {
        const validate = () => {
            const { phone, password } = form;
            const hasErrors = Object.values(errros).some(error => error !== "");

            if (phone && password && !hasErrors) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        };

        validate();
    })
    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
                <input type="tel" name="phone" id="phone" value={form.phone} onInput={handleInputChange} autoFocus className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={form.password} onInput={handleInputChange} className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
            </div>

        </>
    );
}