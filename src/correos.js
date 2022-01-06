const correos = {
    firmar_contrato: {
        asunto: 'Firmar Contrato',
        mensaje: function (materia, inicio, fin)  {
            return `Le informamos que el contrato para la materia: ${materia} dictada en fechas ${inicio} a ${fin} está listo, 
        le rogamos por favor visitar a la asistente administrativa de su facultad para la firma respectiva. 
        En caso de alguna duda al respecto, le rogamos consultar con el jefe de carrera encargado de su materia.`
        }
    },

    firmar_planilla: {
        asunto: 'Firmar Planilla',
        mensaje: function (materia, inicio, fin)  {
            return `Le informamos que la planilla de notas de la materia: ${materia} dictada en fechas ${inicio} a ${fin} está lista 
        y debe ser firmada. En caso de ya haberla firmado, este mensaje indica que la planilla recibió una modificación 
        y es necesario volver a firmarla. Le rogamos por favor visitar al departamento de registros de la División de 
        Admisiones y Asuntos Estudiantiles para este procedimiento. En caso de alguna duda al respecto, le rogamos consultar 
        la división de registros de la Universidad.`
        }
    },

    recoger_cheque: {
        asunto: 'Recoger Cheque',
        mensaje: function (materia, inicio, fin)  {
            return `Le informamos que la planilla de notas de la materia: ${materia} dictada en fechas ${inicio} a ${fin} está lista 
        y debe ser firmada. En caso de ya haberla firmado, este mensaje indica que la planilla recibió una modificación 
        y es necesario volver a firmarla. Le rogamos por favor visitar al departamento de registros de la División de 
        Admisiones y Asuntos Estudiantiles para este procedimiento. En caso de alguna duda al respecto, le rogamos consultar 
        la división de registros de la Universidad.`
        }
    }
};

module.exports = correos;
