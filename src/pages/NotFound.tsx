import notfoundlogo from "../assets/notfound.png";

const NotFound = () => {
  return (
    <div className="text-6xl flex items-center justify-center h-screen flex-col text-center">
      <img src={notfoundlogo} alt="logo" width={500} />
      <h1 className="font-bold">ERROR NO. 404 </h1>
      <h2>Requested Page Not Found</h2>
    </div>
  );
};

export default NotFound;
