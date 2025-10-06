const validationPersonal = {
    fullname: (value) => {
        if (value.length > 0 && value.length < 3) {
            return "Nama Lengkap harus diisi minimal 3 karakter";
        }
        return "";
    },
    phone: (value) => {
        if (value.length < 8) {
            return "Nomor Telepon tidak valid";
        } else if (value.length < 12) {
            return "";
        } else if (value.length >= 12 && value.length <= 13) {
            return "";
        } else {
            return "Nomor Telepon tidak valid";
        }
    },
    password: (value) => {
        if (value.length > 0 && value.length < 6) {
            return "Password harus diisi minimal 6 karakter";
        }
        return "";
    },
    confirm_password: (value, formState) => {
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
    institution: (value) => {
        if (value === "" && value === null) {
            return "Institusi harus diisi";
        }
        return "";
    },
    major: (value) => {
        if (value === "" && value === null) {
            return "Jurusan harus diisi";
        }
        return "";
    },
    position: (value) => {
        if (value === "" && value === null) {
            return "Posisi harus diisi";
        }
        return "";
    },
    aggreement: (value) => {
        if (value === false) {
            return "Anda harus menyetujui syarat dan ketentuan";
        }
        return "";
    },
};

const validationLogin = {
    phone: (value) => {
        if (value.length < 8) {
            return "Nomor Telepon tidak valid";
        } else if (value.length < 12) {
            return "";
        } else if (value.length >= 12 && value.length <= 13) {
            return "";
        } else {
            return "Nomor Telepon tidak valid";
        }
    },
    password: (value) => {
        if (value === "" && value === null) {
            return "Password harus diisi";
        }
        return "";
    },
};
export { validationPersonal, validationInstitution , validationLogin};