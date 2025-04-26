document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const questionsContainer = document.querySelector('.questions-container');
    const toggleAnswersBtn = document.getElementById('toggle-answers');
    const searchInput = document.getElementById('search');
    
    // Verificar si los elementos clave existen
    if (!questionsContainer) {
        console.error('No se encontró el contenedor de preguntas (questions-container).');
        return;
    }
    if (!toggleAnswersBtn) {
        console.error('No se encontró el botón de "toggle-answers".');
        return;
    }
    if (!searchInput) {
        console.error('No se encontró el campo de búsqueda (search).');
        return;
    }
    // Todas las 68 preguntas con respuestas y explicaciones
    const questions = [
        // Preguntas 1-10
        {
            number: 1,
            text: "Unir cada tipo de mensaje de DHCP con la descripción correspondiente. (No se utilizan todas las opciones).",
            options: [
                "un cliente iniciando un mensaje para encontrar un servidor DHCP",
                "un servidor DHCP respondiendo a una solicitud inicial de un cliente",
                "el cliente aceptando la dirección IP dada por el servidor DHCP",
                "el servidor DHCP confirmando que la dirección alquilada ha sido aceptada",
                "el cliente liberando la dirección IP",
                "el servidor DHCP negando la solicitud de dirección IP del cliente"
            ],
            answer: [
                "un cliente iniciando un mensaje para encontrar un servidor DHCP - DHCPDISCOVER",
                "un servidor DHCP respondiendo a una solicitud inicial de un cliente - DHCPOFFER",
                "el cliente aceptando la dirección IP dada por el servidor DHCP - DHCPREQUEST",
                "el servidor DHCP confirmando que la dirección alquilada ha sido aceptada - DHCPACK"
            ]
            ,image: ["img/1.jpg"]
        },
        {
            number: 2,
            text: "Una compañía usa servidores de DHCP para asignar direcciones IPv4 dinámicamente a las estaciones de trabajo de los empleados. La duración del arrendamiento de direcciones se establece en 5 días. Un empleado vuelve a la oficina después de una ausencia de una semana. Cuando el empleado arranca la estación de trabajo, esta envía un mensaje para obtener una dirección IP. ¿Qué direcciones de destino de capa 2 y capa 3 contendrá el mensaje?",
            options: [
                "Las direcciones MAC e IPv4 del servidor de DHCP",
                "FF-FF-FF-FF-FF-FF y 255.255.255.255",
                "Las direcciones FF-FF-FF-FF-FF-FF e IPv4 del servidor de DHCP",
                "La dirección MAC del servidor de DHCP y la dirección 255.255.255.255"
            ],
            answer: "FF-FF-FF-FF-FF-FF y 255.255.255.255",
            explanation: "Cuando haya expirado el arrendamiento de una dirección IPv4 asignada de forma dinámica, una estación de trabajo enviará un mensaje DHCPDISCOVER para comenzar el proceso de obtención de una dirección IP válida. Como la estación de trabajo no conoce las direcciones de los servidores DHCP, envía el mensaje por difusión, con las direcciones de destino de FF-FF-FF-FF-FF-FF y 255.255.255.255."
        },
        {
            number: 3,
            text: "¿Qué mensaje utiliza un host IPv4 para responder cuando recibe un mensaje DHCPOFFER de un servidor de DHCP?",
            options: ["DHCPACK", "DHCPDISCOVER", "DHCPREQUEST", "DHCPOFFER"],
            answer: "DHCPREQUEST",
            explanation: "Cuando el cliente recibe el mensaje DHCPOFFER proveniente del servidor, envía un mensaje de difusión DHCPREQUEST. Al recibir el mensaje DHCPREQUEST, el servidor contesta con un mensaje DHCPACK de unidifusión."
        },
        {
            number: 4,
            text: "¿Qué comando, cuando se emite en el modo de configuración de interfaz de un router, habilita la interfaz para adquirir una dirección IPv4 automáticamente de un ISP, cuando se habilita ese enlace al ISP?",
            options: ["service dhcp", "ip address dhcp", "ip helper-address", "ip dhcp pool"],
            answer: "ip address dhcp",
            explanation: "El comando de configuración de interfaz ip address dhcp configura una interfaz de Ethernet como un cliente DHCP. El comando de configuración global service dhcp habilita el proceso del servidor DHCPv4 en el router. El comando ip helper-address se ejecuta para habilitar la retransmisión de DHCP en el router. El comando ip dhcp pool crea el nombre de un conjunto de direcciones que el servidor puede asignar a los hosts."
        },
        {
            number: 5,
            text: "¿Qué conjunto de comandos se debe configurar en un router que es servidor DHCP y que asigna direcciones IPv4 a las LAN 192.168.100.0/23, a la vez que reserva las primeras diez y las últimas direcciones para asignación estática?",
            options: [
                "ip dhcp excluded-address 192.168.100.1 192.168.100.10\nip dhcp excluded-address 192.168.100.254\nip dhcp pool LAN-POOL-100\nnetwork 192.168.100.0 255.255.255.0\nip default-gateway 192.168.100.1",
                "ip dhcp excluded-address 192.168.100.1 192.168.100.9\nip dhcp excluded-address 192.168.101.254\nip dhcp pool LAN-POOL-100\nip network 192.168.100.0 255.255.254.0\nip default-gateway 192.168.100.1",
                "dhcp pool LAN-POOL-100\nip dhcp excluded-address 192.168.100.1 192.168.100.9\nip dhcp excluded-address 192.168.100.254\nnetwork 192.168.100.0 255.255.254.0\ndefault-router 192.168.101.1",
                "ip dhcp excluded-address 192.168.100.1 192.168.100.10\nip dhcp excluded-address 192.168.101.254\nip dhcp pool LAN-POOL-100\nnetwork 192.168.100.0 255.255.254.0\ndefault-router 192.168.100.1"
            ],
            answer: "ip dhcp excluded-address 192.168.100.1 192.168.100.10\nip dhcp excluded-address 192.168.101.254\nip dhcp pool LAN-POOL-100\nnetwork 192.168.100.0 255.255.254.0\ndefault-router 192.168.100.1",
            explanation: "El prefijo /23 es equivalente a una máscara de red de 255.255.254.0. El rango de direcciones IPv4 utilizables de la red varía de 192.168.100.1 a 192.168.101.254, inclusive. Los comandos dhcp pool , ip default-gateway e ip networksoncomandos de configuración de DHCP no válidos."
        },
        {
            number: 6,
            text: "¿Qué clase de mensaje envía un cliente de DHCP cuando vence el arrendamiento de su dirección IP?",
            options: [
                "Un mensaje de difusión DHCPREQUEST",
                "Un mensaje de unidifusión DHCPREQUEST",
                "Un mensaje de unidifusión DHCPDISCOVER",
                "Un mensaje de difusión DHCPDISCOVER"
            ],
            answer: "Un mensaje de unidifusión DHCPREQUEST",
            explanation: "Cuando se vence el tiempo de arrendamiento de la dirección IP del cliente DHCP, se envía un mensaje de unidifusión DHCPREQUEST directamente al servidor de DHCPv4 que originalmente ofreció la dirección IPv4."
        },
        {
            number: 7,
            text: "Una PC host esta tratando rentar una dirección a través de DHCP. ¿Qué mensaje envía el servidor para que el cliente sepa que es capaz de utilizar la información IP proporcionada?",
            options: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPACK", "DHCPNACK"],
            answer: "DHCPACK",
            explanation: "Cuando un host utiliza DHCP para configurar automáticamente una dirección IP, normalmente envía dos mensajes: el mensaje DHCPDISCOVER y el mensaje DHCPREQUEST. Estos dos mensajes generalmente se envían como difusiones para garantizar que todos los servidores DHCP los reciban. Los servidores responden a estos mensajes mediante mensajes DHCPOFFER, DHCPACK y DHCPNACK, dependiendo de las circunstancias."
        },
        {
            number: 8,
            text: "¿Cuál es el resultado cuando los servidores DHCP no están en funcionamiento en una red?",
            options: [
                "Se asignan direcciones IP a las estaciones de trabajo en la red 169.254.0.0/16.",
                "Se asigna la dirección IP 127.0.0.1 a las estaciones de trabajo.",
                "Se asignan direcciones IP a las estaciones de trabajo en la red 10.0.0.0/8.",
                "Se asigna la dirección IP 0.0.0.0 a las estaciones de trabajo."
            ],
            answer: "Se asignan direcciones IP a las estaciones de trabajo en la red 169.254.0.0/16.",
            explanation: "Cuando las estaciones de trabajo se configuran con la obtención automática de direcciones IP pero los servidores DHCP no están disponibles para responder a las solicitudes, una estación de trabajo puede asignarse una dirección IP de la red 169.254.0.0/16."
        },
        {
            number: 9,
            text: "¿Qué opción es un indicio de que una computadora con Windows no recibió una dirección IPv4 de un servidor DHCP?",
            options: [
                "Windows muestra un mensaje de tiempo de espera del DHCP.",
                "La computadora no puede hacer ping a otros dispositivos de la misma red con direcciones IP dentro del rango de 169.254.0.0/16.",
                "La computadora recibe una dirección IP que comienza con 169.254.",
                "La computadora no puede hacer ping a 127.0.0.1."
            ],
            answer: "La computadora recibe una dirección IP que comienza con 169.254.",
            explanation: "Cuando una computadora con Windows no puede comunicarse con un servidor DHCP IPv4, la computadora asigna una dirección IP dentro del rango de 169.254.0.0/16 de forma automática. Se podrá tener acceso a cualquier otro dispositivo dentro de la misma red que reciba una dirección dentro del mismo rango."
        },
        {
            number: 10,
            text: "¿Qué información se puede comprobar con el comando show ip dhcp binding ?",
            options: [
                "Que el servidor DHCP aún recibe los mensajes de detección de DHCPv4.",
                "La cantidad de direcciones IP que permanecen en el conjunto DHCP.",
                "Las direcciones IPv4 que el servidor DHCP asigna a los hosts.",
                "Las direcciones IPv4 que se excluyeron del conjunto DHCPv4."
            ],
            answer: "Las direcciones IPv4 que el servidor DHCP asigna a los hosts.",
            explanation: "El comando show ip dhcp binding muestra una lista de direcciones IPv4 y direcciones MAC de los hosts a los que están asignadas. Con esta información, un administrador puede determinar qué interfaces de host se han asignado a hosts específicos."
        },
        
        // Preguntas 11-20
        {
            number: 11,
            text: "Un dispositivo cliente en un segmento Ethernet necesita una dirección IP para comunicarse en la red. Se configuró y habilitó un servidor DHCP con la dirección IP 192.168.1.1 en la red. ¿De qué manera un dispositivo cliente obtendrá una dirección IP utilizable para esta red?",
            options: [
                "Utilizará una dirección IP configurada estáticamente del conjunto de direcciones IP que ofrece el servidor DHCP.",
                "Enviará un paquete DHCPREQUEST a la dirección IP 255.255.255.255.",
                "Enviará un mensaje DHCPDISCOVER a la dirección física FF-FF-FF-FF-FF-FF.",
                "Enviará un paquete DHCPACK a la dirección del gateway predeterminado."
            ],
            answer: "Enviará un mensaje DHCPDISCOVER a la dirección física FF-FF-FF-FF-FF-FF.",
            explanation: "Al igual que con la asignación de direcciones IP, también hay una dirección MAC especial para fines de difusión: FF-FF-FF-FF-FF-FF. Cuando un cliente DHCP necesita enviar un mensaje DHCP Discover para buscar servidores DHCP, el cliente utilizará esta dirección MAC como la dirección MAC de destino en la trama de Ethernet. Lo hace porque desconoce las direcciones IP y MAC de los servidores DHCP."
        },
        {
            number: 12,
            text: "¿Cuál es la ventaja de configurar un router Cisco como agente de retransmisión?",
            options: [
                "Puede reenviar mensajes de difusión y multidifusión en nombre de los clientes.",
                "Puede proporcionar servicios de retransmisión a varios servicios UDP.",
                "Reduce el tiempo de respuesta de un servidor DHCP.",
                "Permite que los mensajes DHCPDISCOVER pasen sin modificaciones."
            ],
            answer: "Puede proporcionar servicios de retransmisión a varios servicios UDP.",
            explanation: "De manera predeterminada, el comando ip helper-address reenvía los siguientes ocho servicios UDP:\nPuerto 37: Tiempo\nPuerto 49: TACACS\nPuerto 53: DNS\nPuerto 67: cliente DHCP/BOOTP\nPuerto 68: servidor de DHCP/BOOTP\nPuerto 69: TFTP\nPuerto 137: servicio de nombres NetBIOS\nPuerto 138: servicio de datagrama NetBIOS"
        },
        {
            number: 13,
            text: "¿Cuál de estas afirmaciones es verdadera acerca del funcionamiento de DHCP?",
            options: [
                "El mensaje DHCPDISCOVER contiene la dirección IP y la máscara de subred que se deben asignar, la dirección IP del servidor DNS y la dirección IP del gateway predeterminado.",
                "Cuando un dispositivo que está configurado para utilizar DHCP arranca, el cliente transmite un mensaje DHCPDISCOVER para identificar cualquier servidor de DHCP disponible en la red.",
                "Un cliente debe esperar que venza la concesión antes de enviar otro mensaje DHCPREQUEST.",
                "Si el cliente recibe varios mensajes DHCPOFFER de distintos servidores, envía un mensaje DHCPREQUEST unicast al servidor desde el cual elige obtener la información IP."
            ],
            answer: "Cuando un dispositivo que está configurado para utilizar DHCP arranca, el cliente transmite un mensaje DHCPDISCOVER para identificar cualquier servidor de DHCP disponible en la red.",
            explanation: "El cliente transmite un mensaje DHCPDISCOVER para identificar cualquier servidor de DHCP disponible en la red. Un servidor de DHCP responde con un mensaje DHCPOFFER. Este mensaje ofrece al cliente una concesión que contiene información como la dirección IP y la máscara de subred que se asignarán, la dirección IP del servidor DNS y la dirección IP del gateway predeterminado. Una vez que el cliente recibe la concesión, la información recibida debe renovarse por medio de otro mensaje DHCPREQUEST antes del vencimiento de la concesión."
        },
        {
            number: 14,
            text: "Una el propósito con el tipo de mensaje DHCP. (No se utilizan todas las opciones).",
            options: [
                "Se utiliza para identificar cualquier servidor DHCP de una red.",
                "Los servidores lo utilizan para ofrecer una concesión a un cliente.",
                "Lo utiliza un cliente para aceptar una oferta de dirección IP de un servidor específico.",
                "Los servidores lo utilizan para finalizar una concesión exitosa con un cliente.",
                "Lo utiliza un cliente para rechazar una oferta de un servidor.",
                "Se utiliza cuando una concesión ofrecida ya no es válida."
            ],
            answer: [
                "Se utiliza para identificar cualquier servidor DHCP de una red. - DHCPDISCOVER",
                "Los servidores lo utilizan para ofrecer una concesión a un cliente. - DHCPOFFER",
                "Lo utiliza un cliente para aceptar una oferta de dirección IP de un servidor específico. - DHCPREQUEST",
                "Los servidores lo utilizan para finalizar una concesión exitosa con un cliente. - DHCPACK",
                "Se utiliza cuando una concesión ofrecida ya no es válida. - DHCPNAK"
            ]
            ,image: ["img/2.jpg"]
        },
        {
            number: 15,
            text: "Una compañía utiliza el método SLAAC para configurar direcciones IPv6 para las estaciones de trabajo de los empleados. Un administrador de red configuró la dirección IPv6 en la interfaz LAN del router. El estado de la interfaz es UP (Activo). Sin embargo, las estaciones de trabajo en el segmento LAN no obtuvieron el prefijo ni la longitud de prefijo correctos. ¿Qué más se debe configurar en el router que está conectado al segmento LAN para que las estaciones de trabajo obtengan la información?",
            options: [
                "R1(config-if)# ipv6 enable",
                "R1(config-if)# ipv6 nd other-config-flag",
                "R1(config)# ipv6 unicast-routing",
                "R1(config)# ipv6 dhcp pool < nombre del conjunto >"
            ],
            answer: "R1(config)# ipv6 unicast-routing",
            explanation: "Una PC que está configurada para utilizar el método SLAAC obtiene el prefijo IPv6 y la longitud del prefijo de un router. Cuando la PC se inicia, envía un mensaje RS para informar a los routers que necesita información. Un router envía un mensaje RA que incluye la información requerida. Para que un router pueda enviar mensajes RA, debe ser habilitado como router IPv6 mediante el comando unicast ipv6-routing en el modo de configuración global. Las otras opciones no se utilizan para habilitar el routing IPv6 en un router."
        },
        {
            number: 16,
            text: "Un administrador de red configura un router para enviar mensajes RA con el indicador M como 0 y el indicador O como 1. ¿Cuál de estas afirmaciones describe el efecto de esta configuración cuando una computadora intenta configurar su dirección IPv6?",
            options: [
                "Debe comunicarse con un servidor de DHCPv6 para obtener el prefijo, la información de longitud de prefijo y una ID de interfaz que sea aleatoria y única.",
                "Debe usar la información que se incluye en el mensaje RA exclusivamente.",
                "Debe comunicarse con un servidor de DHCPv6 para obtener toda la información que necesita.",
                "Debe usar la información que se incluye en el mensaje RA y comunicarse con un servidor de DHCPv6 para obtener información adicional."
            ],
            answer: "Debe usar la información que se incluye en el mensaje RA y comunicarse con un servidor de DHCPv6 para obtener información adicional.",
            explanation: "Los mensajes RA ICMPv6 contienen dos indicadores para señalar si una estación de trabajo debe utilizar SLAAC, un servidor DHCPv6 o una combinación de ambos para configurar su dirección IPv6. Estos son el indicador M y el indicador O. Cuando ambos indicadores son 0 (valor predeterminado), un cliente solo debe usar la información del mensaje RA. Cuando el indicador M es 0 y el indicador O es 1, un cliente debe utilizar la información del mensaje RA y buscar otros parámetros de configuración (como las direcciones del servidor DNS) en los servidores DHCPv6."
            
        },
        {
            number: 17,
            text: "Consulte la ilustración. Un administrador de red configura un router como servidor de DHCPv6. El administrador emite un comando show ipv6 dhcp pool para verificar la configuración. ¿Cuál de estas afirmaciones explica el motivo por el que el número de clientes activos es 0?",
            options: [
                "El servidor de DHCPv6 no mantiene el estado cuando se implementa DHCPv6 sin estado.",
                "Todavía no se comunicó ningún cliente con el servidor de DHCPv6.",
                "No se proporciona la dirección de gateway predeterminado en el pool.",
                "No se especificó ningún rango de direcciones IPv6 para la configuración del pool de DHCP IPv6."
            ],
            answer: "El servidor de DHCPv6 no mantiene el estado cuando se implementa DHCPv6 sin estado.",
            explanation: "Con la configuración de DHCPv6 sin estado, la cual se indica con el comando ipv6 nd other-config-flag , el servidor de DHCPv6 no mantiene la información de estado, debido a que el servidor de DHCP no administra las direcciones IPv6 de cliente. Dado que los clientes configuran sus direcciones IPv6 mediante la combinación de prefijo/longitud de prefijo y una ID de interfaz autogenerada, la configuración del pool de DHCP IPv6 no necesita especificar el rango de direcciones IPv6 válido. Además, dado que los clientes usan la dirección link-local de la interfaz del router como dirección de gateway predeterminado, no se necesita la dirección de gateway predeterminado."
            ,image: ["img/3.jpg"]
        },
        {
            number: 18,
            text: "Una compañía utiliza el método SLAAC para configurar direcciones IPv6 para las estaciones de trabajo de los empleados. ¿Qué dirección usa un cliente como gateway predeterminado?",
            options: [
                "La dirección de multidifusión de todos los routers",
                "La dirección de unidifusión global de la interfaz del router que está conectada a la red",
                "La dirección local única de la interfaz del router que está conectada a la red",
                "La dirección link-local de la interfaz del router que está conectada a la red"
            ],
            answer: "La dirección link-local de la interfaz del router que está conectada a la red",
            explanation: "Cuando una PC está configurada para usar el método SLAAC para configurar direcciones IPv6, usará la información del prefijo y de longitud del prefijo incluida en el mensaje RA, junto con un ID de interfaz de 64 bits (que se obtuvo mediante el proceso EUI-64 o mediante un número aleatorio generado por el sistema operativo cliente), para formar una dirección IPv6. Utiliza la dirección link-local de la interfaz del router que está conectado al segmento LAN, como su dirección de gateway IPv6 predeterminada."
        },
        {
            number: 19,
            text: "Consulte la exhibición. Un administrador de red configura un router para que funcione con DHCPv6. ¿A qué conclusión se puede llegar en función de los comandos?",
            options: [
                "El router está configurado para funcionar con DHCPv6 con estado, pero la configuración del pool de DHCP está incompleta.",
                "El router está configurado para funcionar con DHCPv6 sin estado.",
                "Los clientes configurarían las ID de interfaz después de 0010.",
                "El nombre del servidor de DHCPv6 es ACAD_CLASS."
            ],
            answer: "El router está configurado para funcionar con DHCPv6 sin estado.",
            explanation: "DHCPv6 sirve para el funcionamiento de DHCPv6 sin estado, que se indica cambiando el indicador O a 1 y dejando el indicador M en su valor predeterminado, que es 0. Por lo tanto, no está configurado para el funcionamiento de DHCPv6 con estado. Aunque el servidor DNS tenga el ID de interfaz 0010, los clientes en funcionamiento de DHCPv6 sin estado configurarán los ID de interfaz por EUI-64 o por un número aleatorio. ACAD_CLASS es el nombre del pool de DHCP, no el nombre del servidor de DHCP."
            ,image: ["img/6.jpg"]
        },
        {
            number: 20,
            text: "Una las descripciones con el tipo de servidor de DHCPv6 correspondiente. (No se utilizan todas las opciones).",
            options: [
                "Los clientes obtienen la dirección IPv6, el servidor DNS y la información de gateway de un servidor DHCPv6.",
                "Los clientes obtienen la dirección IPv6 de un router y otra información, como la dirección del servidor DNS, de un servidor DHCPv6.",
                "Los clientes obtienen la dirección IPv6 de un router y no se contacta a ningún servidor DHCPv6 para obtener otra información.",
                "Los clientes obtienen la dirección IPv6 y el servidor DNS de un router y la información de gateway de un servidor DHCPv6."
            ],
            answer: [
                "Los clientes obtienen la dirección IPv6, el servidor DNS y la información de gateway de un servidor DHCPv6. - Servidor DHCPv6 con estado",
                "Los clientes obtienen la dirección IPv6 de un router y otra información, como la dirección del servidor DNS, de un servidor DHCPv6. - Servidor DHCPv6 sin estado",
                "Los clientes obtienen la dirección IPv6 de un router y no se contacta a ningún servidor DHCPv6 para obtener otra información. - SLAAC"
            ]
            ,image: ["img/5.jpg"]
        },

        // Preguntas 21-30
        {
            number: 21,
            text: "Un administrador de redes está analizando las características admitidas por diferentes protocolos de redundancia de router de primer salto. ¿Qué instrucción describe una característica asociada al protocolo HSRP?",
            options: [
                "Utiliza mensajes del protocolo ICMP (Internet Control Message Protocol, protocolo de mensajes de control de Internet) con el fin de asignar la gateway predeterminada a los hosts.",
                "Permite el equilibrio de carga entre los routers de un grupo de routers redundantes.",
                "El protocolo HSRP utiliza routers activos y de reserva.",
                "El protocolo HSRP es de dominio público."
            ],
            answer: "El protocolo HSRP utiliza routers activos y de reserva.",
            explanation: "El protocolo de redundancia de router de primer salto HSRP es de propiedad exclusiva de Cisco, y admite dispositivos activos y de reserva. Los protocolos VRRPv2 y VRRPv3 son de dominio público. El protocolo GLBP es propiedad exclusiva de Cisco y admite el equilibrio de carga entre los routers de un grupo de routers redundantes."
        },
        {
            number: 22,
            text: "Consulte la ilustración. ¿Qué protocolo se puede configurar en los routers de gateway R1 y R2 para permitir que el tráfico de la LAN interna tenga una carga equilibrada a través de los dos gateways a Internet?",
            options: ["STP", "PVST", "PVST+", "GLBP"],
            answer: "GLBP",
            explanation: "El protocolo de equilibrio de carga grupal (GLBP) permite que varios routers actúen como único gateway predeterminado para los hosts. La carga de GLBP equilibra el tráfico a través de los routers individuales por host."
            ,image: ["img/7.jpg"]
        },
        {
            number: 23,
            text: "Consulte la ilustración. Un ingeniero de red resuelve un problema de conectividad de host en una LAN que utiliza un protocolo de redundancia de primer salto. ¿Qué dirección de gateway IPv4 se debe configurar en el host?",
            options: ["192.168.2.2", "192.168.2.100", "192.168.2.0", "192.168.2.1"],
            answer: "192.168.2.100",
            explanation: "La dirección de gateway predeterminado del host debe ser la dirección IP virtual FHRP (en este caso, GLBP)."
            ,image: ["img/8.jpg"]
        },
        {
            number: 24,
            text: "Consulte la ilustración. ¿Qué dirección MAC de destino se utiliza cuando las tramas se envían de la estación de trabajo al gateway predeterminado?",
            options: [
                "La dirección MAC del router de reserva",
                "La dirección MAC del router virtual",
                "La dirección MAC del router de reenvío",
                "Las direcciones MAC de los routers de reenvío y de reserva"
            ],
            answer: "La dirección MAC del router virtual",
            explanation: "La dirección IP del router virtual actúa como gateway predeterminado para todas las estaciones de trabajo. Por lo tanto, la dirección MAC que devuelve el protocolo ARP (Address Resolution Protocol) a la estación de trabajo será la dirección MAC del router virtual."
            ,image: ["img/9.jpg"]
        },
        {
            number: 25,
            text: "Haga coincidir el número de paso con la secuencia de etapas que se producen durante el proceso de conmutación por error de HSRP. (No se utilizan todas las opciones).",
            options: [
                "El router de reserva deja de recibir mensajes de saludo del router activo.",
                "El router de reserva asume el rol de router activo.",
                "El router de reserva envía mensajes de saludo.",
                "El router activo reanuda el reenvío de paquetes.",
                "El router de reserva envía un mensaje ARP gratuito con su propia dirección MAC física.",
                "El router de reserva envía un mensaje ARP gratuito con la dirección MAC virtual."
            ],
            answer: [
                "1. El router de reserva deja de recibir mensajes de saludo del router activo.",
                "2. El router de reserva asume el rol de router activo.",
                "3. El router de reserva envía un mensaje ARP gratuito con la dirección MAC virtual."
            ]
            ,image: ["img/10.jpg"]
        },
        {
            number: 26,
            text: "Una los tipos de mensaje DHCP con el orden del proceso de DHCPv4. (No se utilizan todas las opciones).",
            options: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPACK", "DHCPREPLY", "DHCPINFORMATION-REQUEST"],
            answer: ["1. DHCPDISCOVER", "2. DHCPOFFER", "3. DHCPREQUEST", "4. DHCPACK"]
            ,image: ["img/11.jpg"]
        },
        {
            number: 27,
            text: "Abra la actividad de PT. Realice las tareas en las instrucciones de la actividad y luego responda la pregunta. ¿Cuál es la palabra clave que se muestra en www.netacad.com?",
            options: ["networking", "IPv6", "switch", "DHCP", "Router", "Cisco"],
            answer: "Router",
            explanation: "Para que el host reciba la dirección del servidor DNS, el host debe utilizar DHCPv6 sin estado. El router esta configurado con el grupo correcto de DHCPv6l, pero le falta el comando ipv6 nd other-config-flag que le señala al host que debe usar DHCPv6 para obtener información de direccion adicional. Este comando se debe agregar a la configuración gigabit0/0 de la interfaz en el router."
            ,image: ["img/12.jpg"]
        },
        {
            number: 28,
            text: "¿Qué protocolo automatiza la asignación de direcciones IP en una red y qué número de puerto utiliza? (Elija dos opciones).",
            options: ["DHCP", "DNS", "SMB", "53", "67", "80"],
            answer: ["DHCP", "67"],
            explanation: "El protocolo DNS utiliza el puerto 53 y traduce los URL por direcciones IP. El protocolo SMB proporciona acceso compartido a archivos e impresoras y utiliza el puerto 445. El protocolo HTTP utiliza el puerto 80. HTTP es un protocolo que se utiliza para la comunicación entre un explorador Web y un servidor."
        },
        {
            number: 29,
            text: "¿Qué comando permite que un administrador de red verifique la dirección IP que se asigna a una dirección MAC determinada?",
            options: [
                "Router# show ip dhcp binding",
                "Router# show running-config I section_dhcp",
                "Router# show ip dhcp server statistics",
                "Router# show ip dhcp pool"
            ],
            answer: "Router# show ip dhcp binding",
            explanation: "El comando show ip dhcp binding mostrará los arrendamientos, incluidas las direcciones IP, las direcciones MAC, el vencimiento del arrendamiento, el tipo de arrendamiento, el ID de cliente y el nombre de usuario."
        },
        {
            number: 30,
            text: "¿Qué mensaje DHCPv4 envía un cliente para aceptar las direcciones IPv4 que ofrece un servidor de DHCP?",
            options: ["Transmisión del DHCPACK", "DHCPACK de unidifusión", "DHCPREQUEST de unidifusión", "Transmisión del DHCPREQUEST"],
            answer: "Transmisión del DHCPREQUEST",
            explanation: "Cuando un cliente DHCP recibe mensajes DHCPOFFER, enviará un mensaje de difusión DHCPREQUEST para dos propósitos. Primero, le indicará al servidor DHCP de oferta que desea aceptar la oferta y vincular la dirección IP. Segundo, le notifica a cualquier otro servidor DHCP de respuesta que sus ofertas se rechazan."
        },

        // Preguntas 31-40
        {
            number: 31,
            text: "Una compañía usa DHCP para administrar la implementación de direcciones IP para las estaciones de trabajo de sus empleados. El departamento de IT implementa múltiples servidores DHCP en el centro de datos y usa agentes de retransmisión de DHCP para facilitar las solicitudes de DHCP de las estaciones de trabajo. Cuales son los dos puertos UDP que se usan para enviar trafico DHCP? (Escoja dos opciones).",
            options: ["23", "68", "80", "53", "67"],
            answer: ["68", "67"],
            explanation: "El protocolo DHCP opera en dos puertos UDP. El puerto UDP 67 es el puerto de destino para los servidores DHCP, y los clientes de DHCP usan el puerto 68"
        },
        {
            number: 32,
            text: "Consulte la exhibición. La PC-A no puede recibir una dirección IPv6 del servidor de DHCPv6 con estado. ¿Cuál es el problema?",
            options: [
                "El comando ipv6 dhcp relay debe utilizar la dirección link-local del servidor de DHCP.",
                "El comando ipv6 nd managed-config-flag debe ser ipv6 nd other-config-flag .",
                "El comando ipv6 nd managed-config-flag se debe aplicar a la interfaz Gig0/1.",
                "El comando ipv6 dhcp relay se debe aplicar a la interfaz Gig0/0."
            ],
            answer: "El comando ipv6 dhcp relay se debe aplicar a la interfaz Gig0/0.",
            explanation: "El comando ipv6 dhcp relay se debe aplicar a la interfaz donde están ubicados los clientes. El comando ipv6 dhcp relay puede utilizar la dirección link-local o de unidifusión global del servidor de DHCPv6, o incluso una dirección de multidifusión. El indicador ipv6 nd managed-config-flag informa a los clientes que deben usar DHCPv6 con estado, y también se aplica a la interfaz en la cual están ubicados los clientes."
            ,image: ["img/13.jpg"]
        },
        {
            number: 33,
            text: "Consulte la ilustración. Un administrador de red implementa el funcionamiento de DHCPv6 sin estado para la compañía. Los clientes configuran las direcciones IPv6 de la forma esperada. Sin embargo, los clientes no obtienen la información de dirección de servidor DNS y de nombre de dominio configurada en el pool de DHCP. ¿Cuál sería la causa del problema?",
            options: [
                "La dirección de servidor DNS no está en la misma red que los clientes.",
                "El router está configurado para la operación SLAAC",
                "No se activó la interfaz GigabitEthernet.",
                "Los clientes no se pueden comunicar con el servidor de DHCPv6, tal como lo demuestra la ausencia de clientes activos."
            ],
            answer: "El router está configurado para la operación SLAAC",
            explanation: "El router está configurado para la operación de SLAAC porque no hay un comando de configuración para cambiar el valor del indicador M y O de RA. De forma predeterminada, los indicadores M y O se configuran en 0. Para permitir la operación de DHCPv6 sin estado, debe ejecutarse el comando de interfaz ipv6 nd other-config-flag . La interfaz GigabitEthernet está en funcionamiento porque los clientes pueden recibir mensajes RA y configurar sus direcciones IPv6 según lo esperado. Además, el hecho de que R1 sea el servidor DHCPv6 y que los clientes están recibiendo mensajes RA indica que los clientes puedan comunicarse con el servidor DHCP. El número de clientes activos es 0 porque el servidor DHCPv6 no mantiene el estado de las direcciones IPv6 de los clientes (no se configura para la operación DHCPv6 con estado.) El tema de la dirección del servidor DNS no es relevante para el problema."
            ,image: ["img/14.jpg"]
        },
        {
            number: 34,
            text: "¿Cual implementación de FHRP es un protocolo propiedad de Cisco que admite el uso de carga compartida de IPv4?",
            options: ["GLBP", "VRRPv3", "GLBP para IPv6", "VRRPV2"],
            answer: "GLBP"
        },
        {
            number: 35,
            text: "Consulte la exhibición. La PC1 está configurada para obtener una dirección IP dinámica del servidor de DHCP. Hace dos semanas que la PC1 se encuentra apagada. Cuando la PC1 arranque e intente solicitar una dirección IP disponible, ¿qué dirección IP de destino colocará en el encabezado IP?",
            options: ["255.255.255.255", "192.168.1.8", "192.168.1.255", "192.168.1.1"],
            answer: "255.255.255.255",
            explanation: "Cuando se inicia un host configurado para la asignación de direcciones IP dinámicas, el dispositivo intenta obtener una dirección IP válida. Envía un mensaje DHCPDISCOVER. Este es un mensaje de difusión porque la dirección del servidor DHCP es desconocida (por diseño). La dirección IP de destino en el encabezado IP es 255.255.255.255 y la dirección MAC de destino es FF: FF: FF: FF: FF: FF."
            ,image: ["img/15.jpg"]
        },
        {
            number: 36,
            text: "¿Qué sucede cuando un técnico en redes emite el comando ip dhcp excluded-address 10.0.15.1 10.0.15.15 en un router Cisco?",
            options: [
                "El router Cisco excluye 15 direcciones IP del arrendamiento a clientes DHCP.",
                "El router Cisco permite que solo las direcciones IP especificadas sean arrendadas a los clientes.",
                "El router Cisco crea automáticamente un grupo DHCP con una máscara de /28.",
                "El router Cisco excluye solo las direcciones IP 10.0.15.1 y 10.0.15.15 del arrendamiento a clientes DHCP."
            ],
            answer: "El router Cisco excluye 15 direcciones IP del arrendamiento a clientes DHCP.",
            explanation: "El comando `ip dhcp excluded-address` está seguido de la primera y la última dirección que se excluirán del arrendamiento a clientes DHCP. En este caso, se excluyen todas las direcciones IP en el rango de 10.0.15.1 a 10.0.15.15, inclusive."
        },
        {
            number: 37,
            text: "Consulte la exhibición. ¿Qué se debe hacer para permitir que la PC-A reciba una dirección IPv6 del servidor de DHCPv6?",
            options: [
                "Agregar la dirección IPv6 2001:DB8:1234:5678::10/64 a la configuración de interfaz del servidor de DHCPv6.",
                "Agregar el comando ipv6 dhcp relay a la interfaz Fa0/0.",
                "Cambiar el comando ipv6 nd managed-config-flag a ipv6 nd other-config-flag .",
                "Configurar el comando ipv6 nd managed-config-flag en la interfaz Fa0/1."
            ],
            answer: "Agregar el comando ipv6 dhcp relay a la interfaz Fa0/0.",
            explanation: "Los mensajes DHCPv6 del cliente se envían a una dirección multicast con alcance link-local, lo que significa que los mensajes no serán reenviados por los routers. Como el cliente y el servidor están en subredes diferentes y en diversas interfaces, el mensaje no llegará al servidor. El router puede configurarse para retransmitir los mensajes DHCPv6 del cliente al servidor configurando el comando `ipv6 dhcp relay` de la interfaz que está conectada con el cliente."
            ,image: ["img/16.jpg"]
        },
        {
            number: 38,
            text: "Consulte la exhibición. Sobre la base del resultado que se muestra, ¿qué clase de direccionamiento IPv6 se está configurando?",
            options: ["DHCPv6 con estado", "SLAAC", "DHCPv6 sin estado", "Link-local estático"],
            answer: "DHCPv6 sin estado",
            explanation: "Los conjuntos de DHCPv6 sin estado se configuran con prefijos de direcciones para los hosts mediante el comando `address`, mientras que los conjuntos DHCPv6 sin estado, por lo general, solo contienen información, como las direcciones del servidor DNS y el nombre de dominio. Los mensajes RA que se envían desde los routers configurados como servidores de DHCPv6 con estado tienen el indicador M configurado en 1 con el comando `ipv6 nd managed-config-flag`, mientras los servidores DHCPv6 sin estado se indican configurando el indicador O en 1 con el comando `ipv6 nd other-config-flag`."
            ,image: ["img/17.jpg"]
        },
        {
            number: 39,
            text: "El grupo de direcciones de un servidor DHCP se configura con 10.3.2.0/24. El administrador de la red reserva 3 direcciones IP para las impresoras. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["255", "249", "241", "251", "252"],
            answer: "251",
            explanation: "Una red /24 tiene $2^{32-24} = 2^8 = 256$ direcciones IP totales. De estas, 2 son direcciones de red y de difusión, lo que deja $256 - 2 = 254$ direcciones de host disponibles. Si se reservan 3 direcciones IP para las impresoras, quedan $254 - 3 = 251$ direcciones IP para asignar a otros hosts."
        },
        {
            number: 40,
            text: "¿Cual implementación FHRP es un protocolo no propietario que depende de ICMP para proveer redundancia de IPv4?",
            options: ["GLBP para IPv6", "GLBP", "IRDP", "VRRPv3"],
            answer: "IRDP"
        },
        // Preguntas 41-50
        {
            number: 41,
            text: "¿Después de que un host ha generado una dirección IPv6 usando el proceso de DHCPv6 o SLAAC, como puede el host verificar que la dirección es única y por lo tanto utilizable?",
            options: [
                "El host envía un mensaje de solicitud echo de ICMPv6 a la dirección aprendida por DHCPv6 o SLAAC y si no reciba respuesta, la direccion se considera unica.",
                "El host revisa el caché del vecino local buscando la direccion aprendida y su la direccion no esta en el caché, es considerada unica.",
                "El host envía una difusión de ARP al enlace local y si ningún host responde, la direccion es considerada unica.",
                "El host envía un mensaje de solicitud de vecino ICMPv6 a la direccion aprendida por DHCPv6 o SLAAC y si no recibe anuncio de vecino de vuelta , la direccion se considera unica."
            ],
            answer: "El host envía un mensaje de solicitud de vecino ICMPv6 a la direccion aprendida por DHCPv6 o SLAAC y si no recibe anuncio de vecino de vuelta , la direccion se considera unica.",
            explanation: "Antes de que un host pueda configurar y usar una direccion IPv6 aprendida a través de SLAAC o DHCP, el host debe verificar que ningún otro host este usando esa direccion. Para verificar que la direccion es de hecho unica, el hosts envía un solicitud ICMPv6 de vecino a la direccion. Si no recibe anuncio de vecino de vuelta, el host considera que la direccion es unica y la configura en la interfaz."
        },
        {
            number: 42,
            text: "¿Cuál enunciado describe HSRP?\u200b",
            options: [
                "Es un protocolo de estándar abierto",
                "Usa ICMP para permitir que los hosts IPv4 ubiquen routers que proporcionan conectividad IPv4 a otras redes IP (no locales).\u200b",
                "Se elige un router como router virtual maestro, mientras que el resto funciona como respaldo en caso de que falle el router virtual maestro.",
                "Se utiliza en un grupo de routers para seleccionar un dispositivo activo y un dispositivo de reserva para darles servicios de enlace a una LAN."
            ],
            answer: "Se utiliza en un grupo de routers para seleccionar un dispositivo activo y un dispositivo de reserva para darles servicios de enlace a una LAN.",
            explanation: "Es VRRP que elige un router como router virtual maestro, mientras que el resto funciona como respaldo en caso de que falle el router virtual maestro. HSRP es un protocolo propiedad de Cisco. IRDP utiliza mensajes ICMP para permitir que los hosts IPv4 localicen routers que proporcionan conectividad IPv4 a otras redes IP (no locales). HSRP selecciona routers activos y de respaldo para proveer servicios de enlace a los hosts en una LAN."
        },
        {
            number: 43,
            text: "Haga coincidir los protocolos FHRP con la descripción apropiada. (No se utilizan todas las opciones).",
            options: [
                "Protocolo propietario de Cisco que proporciona equilibrio de carga para el tráfico IPv4.",
                "Protocolo no propietario que elige un router maestro para el reenvío de paquetes.",
                "Protocolo de detección de routers basado en ICMP.",
                "Protocolo propietario de Cisco que proporciona un router activo y un router de reserva."
            ],
            answer: [
                "Protocolo propietario de Cisco que proporciona equilibrio de carga para el tráfico IPv4. - GLBP",
                "Protocolo no propietario que elige un router maestro para el reenvío de paquetes. - VRRPv2/VRRPv3",
                "Protocolo de detección de routers basado en ICMP. - IRDP",
                "Protocolo propietario de Cisco que proporciona un router activo y un router de reserva. - HSRP"
            ]
            ,image: ["img/18.jpg"]
        },
        {
            number: 44,
            text: "El grupo de direcciones de un servidor DHCP se configura con 10.19.44.0/24. El administrador de la red reserva 3 direcciones IP para los servidores. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["251", "249", "252", "241", "255"],
            answer: "251",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/24 = 254 hosts\n/25 = 126 hosts\n/26 = 62 hosts\n/27 = 30 hosts\n/28 = 14 hosts\n254 - 3 = 251"
        },
        {
            number: 45,
            text: "El grupo de direcciones de un servidor DHCP se configura con 10.19.44.0/24. El administrador de la red reserva 6 direcciones IP para los servidores. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["238", "246", "249", "252", "248"],
            answer: "248",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/24 = 254 hosts\n/25 = 126 hosts\n/26 = 62 hosts\n/27 = 30 hosts\n/28 = 14 hosts\n254 - 6 = 248"
        },
        {
            number: 46,
            text: "Cual implementación FHRP es un protocolo no propietario que soporta balance de carga de IPv6?",
            options: ["GLBP", "GLBP para IPv6", "VRRPv3", "VRRPV2"],
            answer: "GLBP para IPv6"
        },
        {
            number: 47,
            text: "¿Cual implementación de FHRP es un protocolo de elección no exclusivo de IPv4 que tiene un router maestro por grupo?",
            options: ["HSRP para IPv6", "VRRPv3", "HSRP", "VRRPV2"],
            answer: "VRRPV2"
        },
        {
            number: 48,
            text: "Cual es la razon por la cual en un ambiete SOHO un ISP comunmente asigna una direccion DHCP a un router inalambrico?",
            options: [
                "administración fácil de direccion IP",
                "mejor conectividad",
                "mejor rendimiento de la red",
                "configuración sencilla en el cortafuegos del ISP"
            ],
            answer: "administración fácil de direccion IP",
            explanation: "En un ambiente SOHO, un router inalámbrico se conecta a un ISP vía DSL o cable modem. La direccion IP entre el router inalámbrico y el sitio del ISP típicamente es asignada por el ISP a través de DHCP. Esto método facilita el manejo de direcciones IP para los clientes que son asignados dinámicamente de manera que si un cliente se car, la direccion IP asignada puede ser fácilmente re-asignada a otro cliente."
        },
        {
            number: 49,
            text: "Haga coincidir los tipos de mensaje de DHCP con el orden del proceso stateful de DHCPv6 cuando un cliente se conecta por primera vez a la red IPv6. (No se utilizan todas las opciones).",
            options: ["SOLICIT", "ADVERTISE", "INFORMATION-REQUEST", "REPLY", "CONFIRM", "RENEW"],
            answer: ["1. SOLICIT", "2. ADVERTISE", "3. REQUEST", "4. REPLY"]
            ,image: ["img/19.jpg"]
        },
        {
            number: 50,
            text: "Una pequeña cafetería ofrece conexión Wi-Fi gratuita a los clientes. La red incluye un router inalámbrico y un módem DSL que está conectado a la compañía telefónica local. ¿Qué método se utiliza normalmente para configurar la conexión con la compañía telefónica?",
            options: [
                "Establezca el módem DSL como cliente DHCP para obtener una dirección IP pública del router inalámbrico.",
                "Establezca el módem DSL como cliente DHCP para la compañía telefónica y un servidor DHCP para la conexión interna.",
                "Establezca la conexión WAN en el router inalámbrico como cliente DHCP.",
                "Establezca la conexión entre el router inalámbrico y el módem DSL como una red IP privada"
            ],
            answer: "Establezca la conexión WAN en el router inalámbrico como cliente DHCP."
        },
    
        //50-60
        {
            number: 51,
            text: "El grupo de direcciones de un servidor DHCP se configura con 172.21.121.0/25. El administrador de la red reserva 12 direcciones IP para los servidores web. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["104", "118", "112", "115", "114"],
            answer: "114",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/25 = 126 hosts\n126 - 12 = 114"
        },
        {
            number: 52,
            text: "¿Cual implementación FHRP es un protocolo no propietario de elección solo de IPv4 con escalabilidad limitada?",
            options: ["GLBP", "VRRPV2", "IRDP", "GLBP para IPv6"],
            answer: "VRRPV2"
        },
        {
            number: 53,
            text: "El grupo de direcciones de un servidor DHCP se configura con 10.7.30.0/24. El administrador de la red reserva 5 direcciones IP para las impresoras. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["253", "249", "247", "250", "239"],
            answer: "249",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/24 = 254 hosts\n254 - 5 = 249"
        },
        {
            number: 54,
            text: "El grupo de direcciones de un servidor DHCP se configura con 10.92.71.0/25. El administrador de la red reserva 8 direcciones IP para los servidores. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["122", "118", "119", "108", "116"],
            answer: "118",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/25 = 126 hosts\n126 - 8 = 118"
        },
        {
            number: 55,
            text: "El grupo de direcciones de un servidor DHCP se configura con 172.18.93.0/25. El administrador de la red reserva 10 direcciones IP para los servidores web. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["106", "117", "114", "120", "116"],
            answer: "116",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/25 = 126 hosts\n126 - 10 = 116"
        },
        {
            number: 56,
            text: "El grupo de direcciones de un servidor DHCP se configura con 192.168.184.0/26. El administrador de la red reserva 18 direcciones IP para los servidores. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["57", "44", "54", "36", "46"],
            answer: "44",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/26 = 62 hosts\n62 - 18 = 44"
        },
        {
            number: 57,
            text: "El grupo de direcciones de un servidor DHCP se configura con 192.168.234.0/27. El administrador de la red reserva 22 direcciones IP para teléfonos IP. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["10", "0", "8", "21", "18"],
            answer: "8",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/27 = 30 hosts\n30 - 22 = 8"
        },
        {
            number: 58,
            text: "El grupo de direcciones de un servidor DHCP se configura con 172.23.143.0/26. El administrador de la red reserva 14 direcciones IP para servidores de archivos. ¿Cuántas direcciones IP del conjunto quedan para asignar a otros hosts?",
            options: ["58", "48", "50", "61", "40"],
            answer: "48",
            explanation: "Calcular el numero máximo de hosts disponibles para el valor de barra y sustraer las direcciones estáticas requeridas para los dispositivos.\n/26 = 62 hosts\n62 - 14 = 48"
        },
        {
            number: 59,
            text: "¿Cual implementación FHRP es un protocolo propietario de Cisco que permite solo un router en un grupo para enviar paquetes de IPv6?",
            options: ["VRRPv3", "HSRP", "HSRP para IPv6", "VRRPv2"],
            answer: "HSRP para IPv6"
        },
        
            ];
     // Función para aleatorizar un array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
 // Función para renderizar preguntas
 const renderQuestions = (questionsToRender) => {
    questionsContainer.innerHTML = '';

    if (questionsToRender.length === 0) {
        questionsContainer.innerHTML = '<p class="no-results">No se encontraron preguntas que coincidan con tu búsqueda.</p>';
        return;
    }

    questionsToRender.forEach(question => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.dataset.number = question.number;

        const optionsHtml = question.options.map((option, index) => `
            <div class="option">
                <input type="${Array.isArray(question.answer) ? 'checkbox' : 'radio'}" 
                       name="question-${question.number}" 
                       id="q${question.number}-opt${index}" 
                       value="${option}">
                <label for="q${question.number}-opt${index}">${option}</label>
            </div>
        `).join('');
        let imageHtml = '';
if (question.image) {
    if (Array.isArray(question.image)) {
        // Si es un array de imágenes, crea etiquetas <img> para cada una
        imageHtml = question.image.map(imgSrc => `<img src="${imgSrc}" alt="Imagen de la pregunta ${question.number}">`).join('');
    } else {
        // Si es una sola imagen (para compatibilidad con preguntas anteriores)
        imageHtml = `<img src="${question.image}" alt="Imagen de la pregunta ${question.number}">`;
    }
}

        questionEl.innerHTML = `
            <div class="question-header">
                <span class="question-number">Pregunta ${question.number}</span>
                <span class="question-status hidden"></span>
            </div>
            <div class="question-text">${question.text}</div>
            ${imageHtml}
            <div class="options">${optionsHtml}</div>
            <div class="question-footer">
                <button class="show-answer" data-question="${question.number}">
                    Mostrar Respuesta
                </button>
                <div class="answer hidden" id="answer-${question.number}">
                    <div class="answer-content">
                        <strong>Respuesta:</strong> 
                        ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}
                    </div>
                    <div class="explanation">
                        <strong>Explicación:</strong> ${question.explanation}
                    </div>
                </div>
            </div>
        `;

        questionsContainer.appendChild(questionEl);
    });
};

// Event Delegation para manejar clics en respuestas
questionsContainer.addEventListener('click', (e) => {
    // Manejar botones de mostrar respuesta
    if (e.target.classList.contains('show-answer')) {
        const button = e.target;
        const questionNum = button.dataset.question;
        const answerEl = document.getElementById(`answer-${questionNum}`);

        answerEl.classList.toggle('hidden');
        button.textContent = answerEl.classList.contains('hidden')
            ? 'Mostrar Respuesta'
            : 'Ocultar Respuesta';
    }


        // Manejar selección de opciones
        if (e.target.tagName === 'INPUT') {
            const questionEl = e.target.closest('.question');
            const questionNum = questionEl.dataset.number;
            const question = questions.find(q => q.number === parseInt(questionNum));

            // Lógica de validación (ya la tenías)
            let isCorrect;
            if (Array.isArray(question.answer)) {
                const selectedOptions = Array.from(questionEl.querySelectorAll('input:checked')).map(input => input.value);
                isCorrect = selectedOptions.length === question.answer.length && selectedOptions.every(option => question.answer.includes(option));
            } else {
                const selectedOption = e.target.value;
                isCorrect = selectedOption === question.answer;
            }

            // Mostrar retroalimentación (Correcto/Incorrecto)
            const statusEl = questionEl.querySelector('.question-status');
            statusEl.textContent = isCorrect ? 'Correcto' : 'Incorrecto';
            statusEl.classList.remove('hidden');

            // Mostrar la explicación
            const answerEl = document.getElementById(`answer-${questionNum}`);
            console.log('Elemento answer:', answerEl); // Verifica el elemento
            if (answerEl) {
                console.log('Mostrando explicación'); // Verifica si se ejecuta esta línea
                console.log('Contenido de answer-content:', answerEl.querySelector('.answer-content').textContent); // Verifica el contenido
                console.log('Contenido de explanation:', answerEl.querySelector('.explanation').textContent); // Verifica el contenido

                answerEl.classList.remove('hidden');
                questionEl.querySelector('.show-answer').textContent = 'Ocultar Respuesta';

                // Intenta forzar una actualización del DOM
                setTimeout(() => {
                    answerEl.style.display = 'block'; // Asegura que se muestre
                }, 100);
            } else {
                console.log('Elemento answer no encontrado'); // Verifica si se ejecuta esta línea
            }
        }
    });


// Función de búsqueda
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const filteredQuestions = searchTerm
        ? questions.filter(question =>
            question.text.toLowerCase().includes(searchTerm) ||
            (question.explanation || '').toLowerCase().includes(searchTerm) || // Corrección aquí
            question.options.some(opt => opt.toLowerCase().includes(searchTerm)) ||
            question.number.toString().includes(searchTerm)
        )
        : questions;

    renderQuestions(filteredQuestions);
});

// Control para mostrar/ocultar todas las respuestas
toggleAnswersBtn.addEventListener('click', function() {
    const allAnswers = document.querySelectorAll('.answer');
    const isHidden = allAnswers.length > 0
        ? allAnswers[0].classList.contains('hidden')
        : true;

    allAnswers.forEach(answer => answer.classList.toggle('hidden', !isHidden));

    document.querySelectorAll('.show-answer').forEach(button => {
        button.textContent = isHidden ? 'Ocultar Respuesta' : 'Mostrar Respuesta';
    });

    this.textContent = isHidden ? 'Ocultar Todas las Respuestas' : 'Mostrar Todas las Respuestas';
});
// Inicialización: Aleatorizar las preguntas antes de renderizarlas
const shuffledQuestions = shuffleArray([...questions]);
renderQuestions(shuffledQuestions);
// Inicialización

});