export function Checkbox ({checked,onChange,label,id}){
    return <div className = "form-check">
        <input 
        id={id}
            type="checkbox" 
                className="form-check-input"
                checked={checked}
            onChange={(e)=> onChange(e.target.checked)}
            />  
            <label htmlFor={id} className="label-checkbox">{label}</label>  
    </div>
}