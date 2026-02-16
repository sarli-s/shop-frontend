
export interface CartItem {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
        // השדות החדשים שהוספנו:
        color?: string;       // סימן השאלה אומר שזה אופציונלי (כי בהתחלה אין צבע)
        customText?: string;
        quantity?: number;    // רלוונטי בעיקר לסל
}

export interface ProductDTO{
        ProductId:number;
        ProductName:string;
        price: number;
        imageUrl: string;
        Description: string;
        CategoryDTO:CategoryDTO;

        colors: string[];      
        defultColor: string;
        topText: string;

}

export interface CategoryDTO{
        CategoryName: string;
}
