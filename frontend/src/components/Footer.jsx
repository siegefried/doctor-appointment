const Footer = () => {
    return (
      <div className="bg-blue-600 py-10">
        <div className="mx-16 flex justify-between items-center">
          <span className="text-3xl text-white font-bold tracking-tight">
            Doc Appt
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
              <p className="cursor-pointer">Privacy Policy</p>
              <p className="cursor-pointer">Terms of Service</p>
          </span>
        </div>
      </div>
    );
  };
  
  export default Footer;