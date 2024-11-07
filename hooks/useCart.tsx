import {
	createContext,
	useState,
	useContext,
	useCallback,
	useEffect,
	use
} from 'react';
import { CartProductType } from '@/app/product/[productId]/ProductDetail';
import { toast } from 'react-hot-toast';

type CartContextType = {
	cartTotalQty: number;
	cartProducts: CartProductType[] | null;
	cartTotalAmount: number;
	handleAddProductToCart: (product: CartProductType) => void;
	handleRemoveProductFromCart: (product: CartProductType) => void;
	handleCartQtyIncrease: (product: CartProductType) => void;
	handleCartQtyDecrease: (product: CartProductType) => void;
	handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
	[propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
	const [cartTotalQty, setCartTotalQty] = useState(0);
	const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
		null
	);
	const [cartTotalAmount, setCartTotalAmount] = useState(0);

	useEffect(() => {
		const cartItems: any = localStorage.getItem('eShopCartItems');
		const cProducts: CartProductType[] | null = JSON.parse(cartItems);
		setCartProducts(cProducts);
	}, []);

	useEffect(() => {
		const getTotal = () => {
			if (cartProducts) {
				const {total, qty} = cartProducts.reduce((acc, item) => {
					const itemTotal = item.price * item.quantity;
					acc.total += itemTotal;
					acc.qty += item.quantity;

					return acc;
				}, {
					total: 0,
					qty: 0
				});
				setCartTotalQty(qty);
				setCartTotalAmount(total);
			}
		}
		getTotal();
	 }, [cartProducts]);

	const handleAddProductToCart = useCallback(
		(product: CartProductType) => {
			let updatedCart;
			if (!cartProducts) {
				updatedCart = [product];
			} else {
				updatedCart = [...cartProducts, product];
			}

			toast.success('Product added to cart');

			localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
			setCartProducts(updatedCart);
		},
		[cartProducts]
	);

	const handleRemoveProductFromCart = useCallback(
		(product: CartProductType) => {
			if (cartProducts) {
				const filteredProducts = cartProducts.filter((item) => {
					return item.id !== product.id;
				});
				setCartProducts(filteredProducts);
				toast.success('Product removed from cart');

				localStorage.setItem(
					'eShopCartItems',
					JSON.stringify(filteredProducts)
				);
			}
		},
		[cartProducts]
	);

	const handleCartQtyIncrease = useCallback(
		(product: CartProductType) => {
			if (product.quantity === 99) {
				return toast.error('Maximum quantity reached');
			}
			let updatedCart;
			if (cartProducts) {
				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
				);
				if (existingIndex > -1) {
					updatedCart = [...cartProducts];
					updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
						.quantity;
					setCartProducts(updatedCart);
					localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
				}
			}
		},
		[cartProducts]
	);

	const handleCartQtyDecrease = useCallback(
		(product: CartProductType) => {
			let updatedCart;
			if (cartProducts) {
				const existingIndex = cartProducts.findIndex(
					(item) => item.id === product.id
				);
				if (existingIndex > -1) {
					updatedCart = [...cartProducts];
					updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
						.quantity;
					setCartProducts(updatedCart);
					localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
				}
			}
		},
		[cartProducts]
	);

	const handleClearCart = useCallback(() => {
		setCartProducts(null);
		setCartTotalQty(0);
		localStorage.setItem('eShopCartItems', JSON.stringify(null));
	}, []);

	const value = {
		cartTotalQty,
		cartProducts,
		cartTotalAmount,
		handleAddProductToCart,
		handleRemoveProductFromCart,
		handleCartQtyIncrease,
		handleCartQtyDecrease,
		handleClearCart
	};

	return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === null) {
		throw new Error('useCart must be used within a CartContextProvider');
	}
	return context;
};
