const ProductImage = ({ imgUrl, brand, model }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <img 
          src={imgUrl} 
          alt={`${brand} ${model}`}
          className="w-full h-full object-contain p-8"
        />
      </div>
    </div>
  );
};

export default ProductImage;