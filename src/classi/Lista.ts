class Lista {
  id: string;
  titolo: string;
  oggetti: string[];
  dataUltimaModifica: Date;

  constructor(id:string, titolo: string, oggetti: string[], dataUltimaModifica: Date) {
    this.id = id;
    this.titolo = titolo;
    this.oggetti = oggetti;
    this.dataUltimaModifica = dataUltimaModifica;
  }

}

export default Lista