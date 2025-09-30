import { API_CONFIG, getCurrentUserId } from '../utils/userConfig';

export interface CartItemData {
  userId: string;
  productId: string;
  quantity: number;
  color?: string;
  memory?: string;
}

export interface CartItem {
  id: number;
  product: {
    id: string;
    name: string;
    price: number;
    url_image: string;
  };
  quantity: number;
  color?: string;
  memory?: string;
}

export interface CartResponse {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

class CartService {
  private baseUrl = API_CONFIG.BASE_URL;

 
  async testAPI(): Promise<void> {
    console.log(' Testing API endpoints...');
    
    const endpoints = [
      '/products',
      '/cart',
      '/cart/user123'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        console.log(`📡 ${endpoint}: ${response.status} ${response.statusText}`);
      } catch (error) {
        console.error(` ${endpoint}: Network error`, error);
      }
    }
  }

 
  validatePayload(item: Omit<CartItemData, 'userId'>, userId: string): boolean {
    const requiredFields = ['userId', 'productId', 'quantity'];
    const payload = {
      userId: String(userId),
      productId: String(item.productId),
      quantity: Number(item.quantity)
    };

    const missingFields = requiredFields.filter(field => !payload[field as keyof typeof payload]);
    
    if (missingFields.length > 0) {
      console.error(' Missing required fields:', missingFields);
      return false;
    }

    console.log(' Payload validation passed:', payload);
    return true;
  }


  async checkProduct(productId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`);
      console.log(' Product check response:', response.status);
      return response.ok;
    } catch (error) {
      console.error(' Error checking product:', error);
      return false;
    }
  }

  async getCart(userId?: string): Promise<CartResponse> {
    const id = userId || getCurrentUserId();
    
    console.log(' Fetching cart for user:', id);
    console.log(' GET request to:', `${this.baseUrl}/cart/${id}`);
    
    const response = await fetch(`${this.baseUrl}/cart/${id}`);
    
    console.log(' Cart fetch response status:', response.status);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(' No cart found for user, returning empty cart');
        return {
          items: [],
          totalItems: 0,
          totalPrice: 0
        };
      }
      console.error(' Failed to fetch cart:', response.status, response.statusText);
      throw new Error('Failed to fetch cart');
    }
    
    const cartData = await response.json();
    console.log(' Cart data received:', cartData);
    
    return cartData;
  }


  async addToCart(item: Omit<CartItemData, 'userId'>, userId?: string): Promise<void> {
    const id = userId || getCurrentUserId();
    

    if (!this.validatePayload(item, id)) {
      throw new Error('Payload inválido - campos obrigatórios faltando');
    }
    
   
    const productExists = await this.checkProduct(item.productId);
    if (!productExists) {
      console.warn(' Product may not exist in database:', item.productId);
    }
    
   
    const payload = {
      userId: String(id),                      
      productId: String(item.productId),         
      quantity: Number(item.quantity),         
      ...(item.color && { color: String(item.color) }),       
      ...(item.memory && { memory: String(item.memory) })     
    };

    console.log(' Adding to cart - Payload:', JSON.stringify(payload, null, 2));
    console.log(' API URL:', `${this.baseUrl}/cart`);
    console.log(' Original item data:', item);
    console.log(' Product ID type:', typeof item.productId, 'Value:', item.productId);

    try {
      const response = await fetch(`${this.baseUrl}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log(' Response status:', response.status);
      console.log(' Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorDetails;
        try {
          
          errorDetails = await response.json();
        } catch {
          
          errorDetails = await response.text();
        }
        
        console.error(' Cart API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorDetails,
          sentPayload: payload
        });
        
        
        let errorMessage = 'Erro ao adicionar ao carrinho';
        if (response.status === 400) {
          errorMessage = 'Dados inválidos enviados para o carrinho';
        } else if (response.status === 404) {
          errorMessage = 'Produto não encontrado';
        } else if (response.status === 500) {
          errorMessage = 'Erro interno do servidor';
        }
        
        throw new Error(`${errorMessage} (${response.status})`);
      }

      // 🎯 Vamos também ler a resposta para ver o que foi criado
      let responseData;
      try {
        responseData = await response.json();
        console.log(' Item added to cart successfully. Response:', responseData);
      } catch {
        console.log(' Item added to cart successfully (no response body)');
      }
      
    } catch (error) {
      console.error(' Network/Parse Error:', error);
      throw error;
    }
  }

  
  async updateItemQuantity(cartItemId: number, quantity: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cart/item/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update item quantity');
    }
  }

  async removeItem(cartItemId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cart/item/${cartItemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
  }

 
  async clearCart(userId?: string): Promise<void> {
    const id = userId || getCurrentUserId();
    
    const response = await fetch(`${this.baseUrl}/cart/${id}`, {
      method: 'DELETE',
    });

    // If 404, cart is already empty or doesn't exist - that's fine
    if (!response.ok && response.status !== 404) {
      throw new Error(`Failed to clear cart (${response.status})`);
    }
  }
}


export const cartService = new CartService();