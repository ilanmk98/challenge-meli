# Challenge Tecnico Mercado Libre 🚀
## Breve descripción
Se solicito realizar un prototipo para una pagina de detalle de item inspirado en Mercado Libre. La misma debia contar con un FrontEnd (FE) y un BackEnd (BE). 
### Herramientas utilizadas
---
- General
  - Git
  - GitHub
  - Docker
  - Google Chrome
  - Visual Studio Code
  - Notepad++

- BE
  - Java 24
  - Spring Boot 3.5.0
  - JUnit 5
  - Mockito
  - Maven
  - Swagger
  - IntelliJ Idea Community Edition
  - Postman


- FE
  - Next.js 15.2.4
  - Node.js
  - React 18.3.1
  - TypeScript
  - Tailwind CSS
  - Jest
### Proceso de desarrollo
---
Se comenzo realizando el BE, comenzando por la creacion y definicion de las entidades, luego seguido por la creacion de sus abstracciones y repositorios, luego la implementacion de las abstracciones y luego los controladores y los tests. Una vez finalizado el BE se procedio con el desarrollo del FE.
### Arquitectura
---
No se establecieron requisitos no funcionales específicos relacionados con la capacidad de demanda o la escalabilidad de la aplicación. Por lo tanto, se asumió que se trata de una aplicación pequeña, desarrollada con fines de un challenge técnico y sin intención de exponerla a alta demanda. En consecuencia, se optó por una arquitectura monolítica.

En el Back-End se optó por una estructura basada en capas: Controlador → Servicio → Repositorio → JSON. Cada controlador está asociado a una entidad específica, promoviendo la separación de responsabilidades y facilitando el mantenimiento del código.

En el Front-End, se consumen las distintas rutas expuestas por la API y se utilizaron componentes modularizados y reutilizables, con el objetivo de lograr una interfaz fácil de mantener, escalar y extender.


### BE
---
#### Repositorios
Dado que el desafío requería no utilizar bases de datos reales y persistir la información mediante archivos JSON o CSV, se optó por la primera opción. Se crearon archivos JSON para representar los datos de cada entidad necesaria en el BackEnd: CategoriaMedioPago, CategoriaProducto, MedioPago, Producto, SubcategoriaProducto y Vendedor.

El objetivo fue replicar la estructura y el comportamiento de un repositorio tradicional utilizando un ORM como JPA, pero trabajando directamente sobre archivos estáticos. La lógica para leer y mapear los datos desde los archivos JSON se encapsuló dentro de cada repositorio correspondiente, permitiendo exponer la información requerida por los servicios de forma clara y ordenada.

---
#### Servicios
Para cada servicio se definió una interfaz (abstracción) y su respectiva implementación concreta. Esta separación tiene como objetivo reducir el acoplamiento entre componentes y mejorar la calidad y mantenibilidad del código.

---
#### Controladores
Se definieron controladores específicos para cada unidad de negocio (Producto, Vendedor y Medio de Pago), en los cuales se expusieron los endpoints correspondientes siguiendo los principios de una API RESTful. Además, se integró Swagger para documentar cada uno de estos endpoints, facilitando así su comprensión, exploración y prueba.

---
#### DTO
Se optó por utilizar DTOs (Data Transfer Objects) para desacoplar la representación interna de los modelos de negocio respecto a la información expuesta por los controladores.

---
#### Manejador global de excepciones 
Se implementó un manejador global de excepciones con el objetivo de centralizar el tratamiento de errores dentro de la aplicación. 

---
#### Tests
Se utilizó JUnit 5 para realizar los tests de los casos planteados y Mockito para inyectar las simulaciones y poder realizar las pruebas de manera aislada. A su vez, se agregaron tests de integracion en la carpeta integrations, tener en cuenta que el funcionamiento de estos tests, al ser de integracion, dependen tanto de todas las capas de la aplicacion como de los JSON de datos.

### FE
---
#### Estructura
El Frontend fue desarrollado utilizando React, Next.js (App Router) y Tailwind CSS. Se siguió una arquitectura modular que favorece la separación de responsabilidades, la escalabilidad del código y la reutilización de componentes.

/app
Estructura basada en el enrutamiento de Next.js con App Router.
Contiene la ruta dinámica /producto/[id], la cual es responsable de renderizar la página de detalle del producto.
También incluye archivos globales como layout.tsx, not-found.tsx y globals.css.

/components
Carpeta donde se organizan todos los componentes reutilizables.

Componentes agrupados por dominio (e.g. productImageSection, paymentMethodCard, etc.).

Subcarpeta ui con componentes de uso común como botones, loaders, encabezados, etc.

/services
Contiene el archivo api-service.ts, que centraliza las llamadas HTTP al backend. Esto permite desacoplar la lógica de red del resto de la aplicación y facilita su mantenimiento.

---
#### Hooks
- useProductData(productId: string): UseProductDataResult
Gestiona la carga secuencial de datos relacionados a un producto: detalles del producto, vendedor, métodos de pago y productos relacionados. Controla estados de carga (loading), errores (error) y el progreso con currentStep. Usa mapeadores para transformar la data del backend al formato frontend.

- useToast()
Proporciona un sistema de notificaciones tipo toast con control de estados para añadir, actualizar, descartar y eliminar mensajes. Maneja un límite máximo de toasts visibles y tiempos de autodescarte.

- useIsMobile()
Detecta si la ventana actual es móvil según un breakpoint definido (768px). Escucha cambios en el tamaño de la ventana y actualiza el estado booleano isMobile.

---
#### Manejo de tipos de datos
Los tipos de datos se definieron en dos archivos, backend.ts para los datos que se reciben desde el backend y product.ts para los datos como se van a manejar en el frontend. La clase data-mapper.ts se ocupa de la conversion de los mismos.

---
#### Estilos 
Se utilizo Tailwind CSS para poder definir de manera clara y rapida los estilos, complementandolo con RadixUI y lucide-react.

#### Tests
Se aplicaron tests unitarios sobre algunos componentes utilizando Jest con el fin de poder demostrar el correcto funcionamiento de los mismos.


## Endpoint
El endpoint principal de la aplicacion es http://localhost:3000/producto/{id}, donde id es el id de producto que se desea ver, por defecto esta aplicacion ya tiene datos cargados para los id 1,2 y 3.
 
## Desafios afrontados
- El principal desafio afrontado fue el Frontend, debido a mi falta de conocimiento y experiencia en la materia, el cual fue afrontado utilizando IA, con el fin de poder hacer los maquetados iniciales y el consumo de las apis, luego lo pude ir adaptando para hacer que el mismo se parezca mas a lo solicitado.
- Los tests del Frontend fueron uno de los puntos mas dificiles, los cuales fueron afrontados en parte con IA y luego basandome en los anteriores.
- Al no utilizar JPA, la logica agregada en los repositorios correspondia ser testeada, para poder hacer esto investigue y me apoye en IA y tome la decision de usar reflexion, que me resulto interesante y un gran aprendizaje.


### Posibles mejoras
- En caso de que aparezca el requerimiento de que haya que soportar una alta cantidad de request por segundo, seria factible migrar a una estructura de microservicios, dividiendo la aplicacion en estos, agregando un naming server como Eureka, un api gateway, un balanceador de carga con el fin de poder distribuir los requests entre las diversas instancias que se decidan levantar y un servicio de metricas y monitoreo.