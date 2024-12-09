export class CreateEquipmentDto {
    nome: string;
    dataCompra: Date;
    vidaUtil: Date;
    setor: string;
    responsavel?: string; // opcional
  }