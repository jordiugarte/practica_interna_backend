let roles = {
  jefe_carrera: [
    {
      nombre: "silabo_subido",
      type: "start",
      days: -10,
      horas_contrato: false,
      message: "El silabo no ha sido revisado"
    },
    {
      nombre: "aula_revisada",
      type: "start",
      days: -10,
      horas_contrato: false,
      message: "El aula no ha sido revisada"
    },
    {
      nombre: "examen_revisado",
      type: "start",
      days: -10,
      horas_contrato: false,
      message: "Los examenes no han sido revisados"
    }
  ],
  asistente: [
    {
      nombre: "contrato_impreso",
      type: "start",
      days: -10,
      horas_contrato: true,
      message: "El contrato no ha sido impreso"
    },
    {
      nombre: "contrato_firmado",
      type: "dependency",
      dependency: "contrato_impreso",
      horas_contrato: true,
      message: "El contrato no ha sido firmado"
    }
  ],
  contabilidad: [
    {
      nombre: "pago_realizado",
      type: "dependency",
      dependency: "pago_realizado",
      message: "El pago no ha sido realizado"
    }
  ],
  registros: [
    {
      nombre: "planilla_lista",
      type: "end",
      days: 0,
      horas_contrato: false,
      message: "La planilla no esta lista"
    },
    {
      nombre: "planilla_firmada",
      type: "dependency",
      dependency: "planilla_lista",
      horas_contrato: false,
      message: "La planilla no ha sido firmada"
    }
  ]
};

module.exports = roles;
