import { FormField } from "@/types/program";

const StyledCheckBoxField = ({ field, required = false, value =false, onChange }: { field: FormField; required?: boolean; value: boolean; onChange: (arg0: React.ChangeEvent<HTMLInputElement>) => void; }) => (
    <div className="mb-2 col-span-2 join items-center gap-4" id={`form-${field.name}-address`}>
        <input type="checkbox" name={field.name} id={field.name} value="1" className="checkbox" required={field.required_frontend || required} checked={value} onChange={onChange} />
        <label className="block text-gray-700 text-sm" htmlFor={field.name}>{field.required_frontend && <span className="text-red-500">*)</span>} {field.label}</label>
    </div>
)

export default StyledCheckBoxField;