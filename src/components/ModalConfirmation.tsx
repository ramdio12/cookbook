const ModalConfirmation = () => {
  return (
    <div className="w-full bg-black bg-opacity-40">
      <div className=" mx-auto w-1/3 bg-fuchsia-400 text-center">
        <div>
          <h1 className="text-2xl">Delete Confirmation</h1>
        </div>
        <div>
          <h2>Are you sure you want to delete the recipe?</h2>
        </div>
        <div className="flex gap-2 mx-auto items-center justify-center">
          <button className=" bg-red-600 text-white text-lg px-4 rounded-md">
            Yes
          </button>
          <button className=" bg-blue-600 text-white text-lg px-4 rounded-md">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
