export function Checkbox ({ checked, onChange, label, id }) {
    return (
        <div className="form-check">
            <input 
                id={id}
                type="checkbox" 
                checked={checked}
                onChange={(e)=> onChange(e.target.checked)}
            />  
            <label htmlFor={id} className="label-checkbox" style={{ marginLeft: '2px', verticalAlign: 'left' }}>{label}</label>  
        </div>
    );
}