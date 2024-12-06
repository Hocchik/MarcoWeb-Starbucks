

function ModalHomePage({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-4 relative">  {/* Aumenté el max-w a 2xl */}
            <button 
            className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
            onClick={onClose}
            >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            </button>

            <div className="flex justify-center mt-6"> {/* Cambié 'justify-between' a 'justify-center' */}
            <iframe 
                className="w-full h-96 rounded-md"  
                src="https://www.youtube.com/embed/hOyE14cTGPk?si=E3PbwKXen1HdrGJP" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            ></iframe>
            </div>
        </div>
        </div>
  )
}

export default ModalHomePage