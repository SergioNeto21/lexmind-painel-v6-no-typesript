export const Select = ({ children, onValueChange }) => <div onChange={(e) => onValueChange(e.target.value)}>{children}</div>;
export const SelectTrigger = ({ children, className }) => <div className={`border p-2 rounded ${className}`}>{children}</div>;
export const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
export const SelectContent = ({ children }) => <select>{children}</select>;
export const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;