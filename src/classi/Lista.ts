class Lista {
  id: string;
  titolo: string;
  elementi: string[];
  dataUltimaModifica: Date;

  constructor(id:string, titolo: string, elementi: string[], dataUltimaModifica: Date) {
    this.id = id;
    this.titolo = titolo;
    this.elementi = elementi;
    this.dataUltimaModifica = dataUltimaModifica;
  }

}

export default Lista