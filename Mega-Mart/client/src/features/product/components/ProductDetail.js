import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync, selectProductById } from '../productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync, selectItems } from '../../cart/cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { discountedPrice } from '../../../app/constants';

// Color and Size Definitions
const colors = [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
];

const sizes = [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
];

const highlights = [
  'Hand cut and sewn locally',
  'Dyed with our proprietary colors',
  'Pre-washed & pre-shrunk',
  'Ultra-soft 100% cotton',
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const user = useSelector(selectLoggedInUser);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const items= useSelector(selectItems);
  const params = useParams();


  // Handle adding item to cart
  const handleCart = (e) => {
    e.preventDefault();
    if(items.findIndex((item)=> item.product.id===product.id)<0){
    if (!product) return; // Prevent if product is not defined
    const newItem = {product:product.id, quantity: 1, user: user.id };
    delete newItem['id'];
    dispatch(addToCartAsync(newItem));
    //alert('Items added to cart');
    }
    else{
      alert('Items already in the cart');
    }
  };

  // Fetch product by ID
  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  // Show loading state
  if (!product) {
    return <div>Loading...</div>; // Or any loading spinner/component
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
           
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        {product.images?.[0] ? (  // Use optional chaining here
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div>No image available</div>  // Fallback if no images
                        )}
                    </div>          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        {product.images?.[0] ? (  // Use optional chaining here
                            <img
                                src={product.images[1]}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div>No image available</div>  // Fallback if no images
                        )}
                    </div>            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        {product.images?.[0] ? (  // Use optional chaining here
                            <img
                                src={product.images[2]}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div>No image available</div>  // Fallback if no images
                        )}
                    </div>            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        {product.images?.[0] ? (  // Use optional chaining here
                            <img
                                src={product.images[3]}
                                alt={product.title}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div>No image available</div>  // Fallback if no images
                        )}
                    </div>          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl line-through tracking-tight text-gray-900">
              ${product.price}
            </p>
            <p className="text-3xl tracking-tight text-gray-900">
              ${discountedPrice(product)}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">{color.name}</RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(color.class, 'h-8 w-8 rounded-full border border-black border-opacity-10')}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active, checked }) =>
                          classNames(
                            size.inStock ? 'bg-white shadow-sm' : 'bg-gray-50 opacity-50 cursor-not-allowed',
                            active ? 'ring-2 ring-gray-600' : '',
                            checked ? 'ring-2 ring-gray-600' : '',
                            'relative block cursor-pointer rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Add to cart button */}
              <button
                type="button"
                onClick={handleCart}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>
          </div>

          {/* Product Description */}
          <div className="mt-10 lg:col-span-2 lg:row-span-3 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
              <ul role="list" className="mt-4 list-disc space-y-2 pl-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="text-base text-gray-900">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
