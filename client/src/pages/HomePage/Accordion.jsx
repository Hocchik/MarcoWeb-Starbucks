import { useState } from "react";

function Accordion() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const items = [
        {
            question: "¿Cómo puedo hacer un pedido en Starbucks?",
            answer: (
                <>
                    <p className="mb-2 text-gray-700 dark:text-gray-700">
                        Es muy sencillo. Visita nuestra tienda o usa la app de Starbucks para personalizar tu bebida, elegir tus snacks favoritos y realizar tu pedido con facilidad.
                    </p>
                </>
            ),
        },
        {
            question: "¿Cómo me convierto en miembro del programa de recompensas?",
            answer: (
                <>
                    <p className="mb-2 text-gray-700 dark:text-gray-700">
                        ¡Es fácil! Solo descarga nuestra app y crea una cuenta. Cada vez que realices una compra, acumularás estrellas que podrás canjear por bebidas y alimentos gratis.
                    </p>
                </>
            ),
        },
        {
            question: "¿Cuál es la política de devolución?",
            answer: (
                <>
                    <p className="mb-2 text-gray-700 dark:text-gray-700">
                        Nuestra política de devolución es sencilla. Si no estás satisfecho con tu bebida, háznoslo saber y haremos lo posible por corregirlo.
                    </p>
                </>
            ),
        },
        {
            question: "¿Se permiten mascotas en las tiendas?",
            answer: (
                <>
                    <p className="mb-2 text-gray-700 dark:text-gray-700">
                        En general, solo se permiten perros de servicio. Sin embargo, consulta con tu tienda local para conocer su política específica.
                    </p>
                </>
            ),
        },
        {
            question: "¿Está permitido fumar en las tiendas?",
            answer: (
                <>
                    <p className="mb-2 text-gray-700 dark:text-gray-700">
                        No, las tiendas de Starbucks son 100% libres de humo. Te agradecemos por respetar esta política para el bienestar de todos.
                    </p>
                </>
            ),
        },
    ];

    return (
        <div id="accordion-color" className=" p-5 rounded-lg" data-accordion="collapse">
            <h1 className=" mb-5 w-96 size-10 text-3xl text-white">Preguntas Frecuentes</h1>
            <div className="rounded">
            {items.map((item, index) => (
                <div key={index}>
                    <h2 id={`accordion-color-heading-${index}`}>
                        <button
                            type="button"
                            className={`flex items-center justify-between w-full p-5 font-medium text-gray-600 border border-b-0 bg-white border-gray-600 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800 dark:border-gray-700 hover:bg-green-400 gap-3`}
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`accordion-color-body-${index}`}
                        >
                            <span>{item.question}</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </button>
                    </h2>
                    <div id={`accordion-color-body-${index}`} className={`${openIndex === index ? 'block' : 'hidden'}`} aria-labelledby={`accordion-color-heading-${index}`}>
                        <div className="p-5 border border-b-0 border-gray-600 dark:border-gray-700 dark:bg-white">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Accordion