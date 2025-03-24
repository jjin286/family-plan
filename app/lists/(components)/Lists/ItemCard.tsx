import { Checkbox } from '@mantine/core';

interface Item{
    created_at: string;
    id: number;
    list_id: number;
    text: string | null;
}

export function ItemCard({item}:{item : Item}){
    return(
        <div className="item-card">
            <Checkbox
                defaultChecked
                label={item.text}
                // description={"Description (optional)  "}
                size="md"
            />
        </div>
    );  
}