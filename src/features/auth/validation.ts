// Define a generic type for the form state to improve type safety
type FormState = Record<string, any>;

const validationPersonal = {
    fullname: (value: string) => {
        if (value.length > 0 && value.length < 3) {
            return "Nama Lengkap harus diisi minimal 3 karakter";
        }
        return "";
    },
    phone: (value: string) => {
        if (value.length > 0 && (value.length < 8 || value.length > 13)) {
            return "Nomor Telepon tidak valid";
        }
        return "";
    },
    password: (value: string) => {
        if (value.length > 0 && value.length < 6) {
            return "Password harus diisi minimal 6 karakter";
        }
        return "";
    },
    confirm_password: (value: string, formState: FormState) => {
        if (value.length > 0 && value.length < 6) {
            return "Konfirmasi Password harus diisi minimal 6 karakter";
        }
        if (formState.password && value !== formState.password) {
            return "Password dan Konfirmasi Password harus sama";
        }
        return "";
    },
};

const validationInstitution = {
    institution: (value: string) => {
        if (!value) {
            return "Institusi harus diisi";
        }
        return "";
    },
    major: (value: string) => {
        if (!value) {
            return "Jurusan harus diisi";
        }
        return "";
    },
    position: (value: string) => {
        if (!value) {
            return "Posisi harus diisi";
        }
        return "";
    },
    aggreement: (value: boolean) => {
        if (!value) {
            return "Anda harus menyetujui syarat dan ketentuan";
        }
        return "";
    },
};

const validationLogin = {
    phone: (value: string) => {
        if (value.length > 0 && (value.length < 8 || value.length > 13)) {
            return "Nomor Telepon tidak valid";
        }
        return "";
    },
    password: (value: string) => {
        if (!value) {
            return "Password harus diisi";
        }
        return "";
    },
};

export { validationPersonal, validationInstitution, validationLogin };