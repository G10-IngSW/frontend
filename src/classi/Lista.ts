class Lista {
  id: string;
  nome: string;
  oggetti: string[];

  constructor(id:string, nome: string, oggetti: string[]) {
    this.id = id;
    this.nome = nome;
    this.oggetti = oggetti;
  }

}

export default Lista