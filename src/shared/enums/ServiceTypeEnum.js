export const ServiceTypeEnum = Object.freeze({
    UNICO: 1,
    VARIOUS: 2,
});
  
  export const ServiceTypeLabels = {
    [ServiceTypeEnum.UNICO]: "Único servicio",
    [ServiceTypeEnum.VARIOUS]: "Varios servicios",
  };

  export const ServiceTypeArray = [
    {
        label: ServiceTypeLabels[ServiceTypeEnum.UNICO],
        value: ServiceTypeEnum.UNICO,
    },
    {
        label: ServiceTypeLabels[ServiceTypeEnum.VARIOUS],
        value: ServiceTypeEnum.VARIOUS,
    },
  ];