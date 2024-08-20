import jsPDF from 'jspdf';

export const generateDelegatePDF = (pdfData) => {
  const doc = new jsPDF({
    unit: 'in',
    format: 'letter',
    orientation: 'portrait',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeftTitle = 0.75;  // Margen para los títulos alineados a la derecha
  const marginLeftText = 0.5;  // Margen para los párrafos principales alineados a la izquierda
  const marginLeftSubPoint = 1.1;  // Margen para los subpuntos más alineados a la derecha
  const marginTop = 1;
  const lineHeight = 0.25;
  const titleMarginTop = 0.3; // Margen superior adicional para los títulos
  let currentY = marginTop;

  // Función para agregar el encabezado en cada página
  const addHeader = () => {
    const headerText = 'POLÍTICA DE PRIVACIDAD';
    const headerWidth = doc.getTextWidth(headerText);
    const headerX = (pageWidth - headerWidth) / 2;

    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text(headerText, headerX, marginTop);
    currentY = marginTop + lineHeight + 0.2;

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
  };

  // Añadir el encabezado a la primera página
  addHeader();

  // 1. IDENTIFICACIÓN Y RESPONSABLE DEL TRATAMIENTO DE LOS DATOS
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('1. IDENTIFICACIÓN Y RESPONSABLE DEL TRATAMIENTO DE LOS DATOS.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    `${pdfData.hotel} con domicilio en ${pdfData.direccion} y con NIF ${pdfData.nif} es el responsable de los datos personales recogidos a través de la webapp.`,
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 2;
  doc.text(
    `Si tiene alguna duda o necesita más información sobre el tratamiento de sus datos personales, puede contactar a través de ${pdfData.email}.`,
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 2;
  doc.text(
    `Datos de contacto del Delegado de Protección de Datos: correo electrónico ${pdfData.emailDelegate}, dirección postal ${pdfData.addressDelegate}.`,
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 2;

  // 2. INFORMACIÓN PERSONAL RECOPILADA
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('2. INFORMACIÓN PERSONAL RECOPILADA.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    'Al utilizar la webapp, podemos recopilar y procesar la siguiente información sobre usted:',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight;

  const infoPoints = [
    '- Acceso a la webapp. Determinados accesos a la webapp implicarán la solicitud de alguno de los siguientes datos:',
    '- Nombre y apellidos: para identificarle y personalizar su experiencia en la webapp.',
    '- Número de teléfono o email: para facilitar la comunicación y enviarle notificaciones relacionadas con la webapp.',
    '- Fecha de Check-in y Check-out: para conocer las fechas de su estancia y ofrecerle información relevante.',
    '- Registro de la estancia: nombre, apellido, segundo apellido, sexo, nacionalidad, fecha de nacimiento, ciudad de nacimiento, país de nacimiento, país de residencia, ciudad de residencia, dirección de residencia, tipo de identificación, número de identificación, fecha de identificación, país de identificación, ciudad de emisión, propósito de la estadía, número de visa, firma.',
    '- Participación en encuestas. Si decide participar en las encuestas de satisfacción, recopilamos sus respuestas para evaluar su experiencia y ayudarnos a mejorar los servicios.',
  ];

  infoPoints.forEach((point, index) => {
    const textLines = doc.splitTextToSize(point, 7);
    textLines.forEach((line, lineIndex) => {
      const currentMarginLeft = (index === 0 || index > 3) ? marginLeftText + 0.2 : marginLeftSubPoint;  // Alinea más a la derecha los subpuntos
      doc.text(line, currentMarginLeft, currentY);
      currentY += lineHeight;
    });
    if (index < infoPoints.length - 1) {
      currentY += lineHeight * 0.1; // Espacio adicional entre los puntos
    }

    if (currentY > 10) {
      doc.addPage();
      addHeader(); // Añadir el encabezado en cada nueva página
    }
  });

  // 3. FINALIDAD DEL TRATAMIENTO.
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('3. FINALIDAD DEL TRATAMIENTO.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    'Los datos personales que se recogen a través de la webapp se utilizan para las siguientes finalidades:',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 1;

  const finalityPoints = [
    '- Acceso y uso de la webapp: facilitar el acceso y uso personalizado de la webapp, permitiendo al huésped obtener información relacionada con su estancia, la ciudad y las actividades turísticas disponibles, y comunicarse con el personal del hotel a través del chat incorporado en la webapp.',
    '- Encuestas de satisfacción: durante la estancia o una vez finalizada la misma, el huésped puede ser invitado a participar en una encuesta para evaluar su experiencia y proporcionar feedback.',
    '- Notificaciones: en determinados casos, podemos enviar notificaciones, ya sea por correo electrónico o SMS, relacionadas con mensajes sin leer en el chat o cualquier otra información relevante sobre la estancia.',
    '- Información a las autoridades competentes, según lo requieran las normativas turísticas.',
  ];

  finalityPoints.forEach((point, index) => {
    const textLines = doc.splitTextToSize(point, 7);
    textLines.forEach(line => {
      doc.text(line, marginLeftText + 0.2, currentY);
      currentY += lineHeight;
    });
    if (index < finalityPoints.length - 1) {
      currentY += lineHeight * 0.1; // Espacio adicional entre los puntos
    }

    if (currentY > 10) {
      doc.addPage();
      addHeader(); // Añadir el encabezado en cada nueva página
    }
  });

  // 4. LEGITIMACIÓN DEL TRATAMIENTO.
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('4. LEGITIMACIÓN DEL TRATAMIENTO.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    'La base jurídica que legitima el tratamiento de los datos personales de los huéspedes se fundamenta en:',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 1;

  const legitimacionPoints = [
    '- Ejecución de un contrato en el que el interesado es parte o para la aplicación a petición de este de medidas precontractuales.',
    '- Interés legítimo: en determinadas circunstancias, es posible que tratemos datos personales basándonos en nuestro interés legítimo, siempre y cuando dicho interés no se vea superado por los intereses o derechos y libertades fundamentales del huésped.',
    '- Cumplimiento de una obligación legal: en ciertos casos, el tratamiento de datos personales puede ser necesario para cumplir con obligaciones legales aplicables al hoster.',
  ];

  legitimacionPoints.forEach((point, index) => {
    const textLines = doc.splitTextToSize(point, 7);
    textLines.forEach(line => {
      doc.text(line, marginLeftText + 0.2, currentY);
      currentY += lineHeight;
    });
    if (index < legitimacionPoints.length - 1) {
      currentY += lineHeight * 0.1; // Espacio adicional entre los puntos
    }

    if (currentY > 10) {
      doc.addPage();
      addHeader(); // Añadir el encabezado en cada nueva página
    }
  });

  // 5. CESIÓN DE LOS DATOS.
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('5. CESIÓN DE LOS DATOS.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    'Los datos personales de los huéspedes no serán cedidos ni transferidos a terceros sin el previo consentimiento informado, salvo en los casos previstos por la ley.',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 2;
  doc.text(
    'Sin embargo, para el correcto funcionamiento de la webapp es necesario que ciertos proveedores de servicios accedan a los datos personales de los huéspedes en calidad de encargados del tratamiento. Estos proveedores tienen la obligación de tratar los datos exclusivamente con las finalidades estipuladas por el hoster y bajo las condiciones que se determinen en los correspondientes contratos de encargado del tratamiento.',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 4.5;
  doc.text(
    `Entre estos proveedores se encuentra TheHoster (The Hoster Hospitality S.L. con NIF B56861479 y email de contacto info@thehoster.io), que proporciona la infraestructura y tecnología necesaria para el correcto funcionamiento de la webapp. TheHoster actúa en todo momento como encargado del tratamiento y únicamente procesa los datos según las instrucciones del titular del alojamiento y para las finalidades previstas.`,
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 4;

  // 6. DERECHOS DEL USUARIO.
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('6. DERECHOS DEL USUARIO.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');

  const derechosPoints = [
    'a) Derecho de acceso: tiene derecho a solicitar y obtener confirmación de si se tratan datos personales que le conciernen, así como a acceder a sus datos personales almacenados.',
    'b) Derecho de rectificación: tiene derecho a solicitar la rectificación de sus datos personales si estos fueran inexactos o incompletos.',
    'c) Derecho de supresión: tiene derecho a solicitar la supresión de sus datos personales cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.',
    'd) Derecho de oposición: tiene derecho a oponerse al tratamiento de sus datos personales, por motivos relacionados con su situación particular.',
    'e) Derecho a la limitación del tratamiento: tiene derecho a solicitar la limitación del tratamiento de sus datos personales, en cuyo caso únicamente se conservan para el ejercicio o la defensa de reclamaciones.',
    'f) Derecho a la portabilidad de los datos: tiene derecho a recibir los datos personales que le incumben, que haya facilitado a un responsable del tratamiento, en un formato estructurado, de uso común y lectura mecánica y a transmitirlos a otro responsable del tratamiento.',
    'g) Derecho a no ser objeto de decisiones individuales automatizadas: tiene derecho a no ser objeto de una decisión basada únicamente en el tratamiento automatizado, incluida la elaboración de perfiles, que produzca efectos jurídicos en él o le afecte significativamente de modo similar.',
    'h) Derecho a revocar el consentimiento otorgado.',
    'i) Derecho a reclamar ante la Agencia Española de Protección de Datos cuando el interesado considere que se ha vulnerado los derechos que le son reconocidos por la normativa aplicable en protección de datos.',
  ];

  derechosPoints.forEach((point, index) => {
    const textLines = doc.splitTextToSize(point, 7);
    textLines.forEach(line => {
      doc.text(line, marginLeftText, currentY);
      currentY += lineHeight;
    });
    if (index < derechosPoints.length - 1) {
      currentY += lineHeight * 0.1;
    }

    if (currentY > 10) {
      doc.addPage();
      addHeader(); // Añadir el encabezado en cada nueva página
    }
  });

  // 7. PLAZO DE CONSERVACIÓN DE LOS DATOS.
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('7. PLAZO DE CONSERVACIÓN DE LOS DATOS.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    'Sus datos se almacenan durante el tiempo necesario para realizar los diferentes tratamientos, y al menos, de acuerdo con la normativa turística, por un período de 3 años.',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 2;

  // 8. ENLACES A SITIOS WEB DE TERCEROS.
  doc.setFont('times', 'bold');
  currentY += titleMarginTop; // Añadir margen superior antes del título
  doc.text('8. ENLACES A SITIOS WEB DE TERCEROS.', marginLeftTitle, currentY);
  currentY += lineHeight * 1.5;
  doc.setFont('times', 'normal');
  doc.text(
    'La webapp puede incluir hipervínculos o enlaces que permiten acceder a páginas web de terceros. Los titulares de dichos sitios web dispondrán de sus propias políticas de protección de datos, siendo ellos mismos, en cada caso, responsables de sus propios ficheros y de sus propias prácticas de privacidad.',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );
  currentY += lineHeight * 3;

  // Texto de actualización más abajo
  currentY += lineHeight * 4; // Espacio extra antes del texto de actualización
  doc.text(
    'Esta Política de Privacidad fue actualizada por última vez el 06 de marzo de 2024.',
    marginLeftText,
    currentY,
    { maxWidth: 7 }
  );

  // Guardar el PDF
  doc.save('Politica_de_Privacidad_Delegado.pdf');
};
