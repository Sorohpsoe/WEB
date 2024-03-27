export function ProductCategoryRow ({name, onClick}) {
    return (
    <tr onClick ={onClick}>
        <th colSpan={2}><strong>{name}</strong></th>
    </tr>
    );
}