import { useState } from "react";

function Footer() {

    const [counts, setCounts] = useState(0);

    return (
    <>
<div className="flex items-end w-full min-h-screen">

    <footer className="w-full text-gray-700 bg-gray-100 body-font">
        <div
            className="container flex flex-col flex-wrap justify-center px-5 pt-10 pb-16 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
            <div className="flex-shrink-0 w-64 mx-auto mb-1 text-center md:mx-0 md:text-left">
                <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
                    <img
                        alt="Your Company"
                        src="https://www.starbucks.pe/icons/logo/Vector.png"
                        className="h-16 w-16"
                    />
                </a>
                <p className="mt-2 text-sm text-gray-500">Siguenos</p>
                <div className="mt-4">
                    <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                        <a className="text-gray-500 cursor-pointer hover:text-gray-700">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                                </path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                                </path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
            <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-32 md:mt-8 md:text-left">
                <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <nav className="mb-10 list-none">
                        <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Sobre Nosotros</h2>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Nuesta Compañía</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Nuestro Café</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Starbucks Stories</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Servicio al Cliente</a>
                        </li>
                    </nav>
                </div>
                <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Nuestra Cultura</h2>
                    <nav className="mb-10 list-none">
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Cultura y Valores</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Trabaja con nosotros</a>
                        </li>
                    </nav>
                </div>
                <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Politícas
                    </h2>
                    <nav className="mb-10 list-none">
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Política de Privacidad App, Web y Starbucks Rewards</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Términos y condiciones de la web, Delivery, Pick Up y Auto Starbucks</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Términos y condiciones de Starbucks Rewards</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Términos y condiciones de promociones</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Preguntas frecuentes</a>
                        </li>
                    </nav>
                </div>
                <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                    <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">Atención al Cliente</h2>
                    <nav className="mb-10 list-none">
                        <li className="mt-3">
                            <p className="text-gray-500 cursor-pointer">Teléfono Lima:</p>
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">(01)505-0050</a>
                        </li>
                        <li className="mt-3">
                            <p className="text-gray-500 cursor-pointer">Teléfono Provincia:</p>
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">(044)779-009</a>
                        </li>
                        <li className="mt-3">
                            <a className="text-gray-500 cursor-pointer hover:text-gray-900">Comprobantes electrónicos</a>
                        </li>
                    </nav>
                </div>
            </div>
        </div>
        <div className="bg-gray-300">
            <div className="container px-5 py-4 mx-auto">
                <p className="text-sm text-gray-700 capitalize xl:text-center">© 2024 Starbucks Coffee Company. All rights reserved. <b onClick={() =>setCounts(counts+1)}>Hocchi</b></p>
            </div>
            {counts>=5? <div className="text-center pb-2">Ingresa al modo <a href="/admin" className="cursor-default" onClick={() =>setCounts(0)}>Admin</a></div>: ''}
        </div>
    </footer>
</div>
</>
    )
}

export default Footer