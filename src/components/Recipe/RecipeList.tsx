const RecipeList = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; quantity?: string }[];
}) => {
  return (
    <div>
      <p className="text-xl font-semibold">{title}</p>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md border-2 border-[#774C2A] py-2">
        {items.map((item, index) => (
          <div>
            <div
              key={index}
              className="flex justify-between p-2 text-lg font-semibold"
            >
              <span className="text-brown-600">
                {index + 1}. {item.name}
              </span>
              {item.quantity && (
                <span className="text-brown-600">{item.quantity}</span>
              )}
            </div>
            {index < items.length - 1 && (
              <hr className="border-t-2 border-[#F3B660] my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
