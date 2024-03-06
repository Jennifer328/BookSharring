

const Footer = () => {
  return (
    <div className="bg-green-600 py-10">
       <div className="container mx-auto flex justify-between items-center flex-col md:flex-row">
         <span className="text-2xl text-white font-bold tracking-tight mb-5">
           BookSharring.com
         </span>

         <span className="text-white font-bold tracking-tight flex flex-col lg:flex-row text-xs gap-4">
           <p className="cursor-pointer">Privacy Policy</p>
           <p className="cursor-pointer">Terms of Service</p>
         </span>
       </div>
    </div>
  )
}

export default Footer
