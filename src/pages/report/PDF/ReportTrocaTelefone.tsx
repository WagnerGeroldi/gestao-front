import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export function ReportTrocaTelefone(dados: any, teste: string) {
  
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const pdfTitle = [
    {
      text: `Relatório ${teste}`,
      fontSize: 16,
      bold: true,
      alignment: "center",
      margin: [10, 10, 10, 15],
    },
  ];

  const data = dados.map((item: any) => {
    return [
      { text: item.cod, fontSize: 9, alignment: "center" },
      { text: item.nome, fontSize: 9, alignment: "center" },
      { text: item.unidade, fontSize: 9, alignment: "center" },
      { text: item.turma, fontSize: 9, alignment: "center" },
      { text: item.fone_aluno_antigo, fontSize: 9, alignment: "center" },
      { text: item.fone_resp_antigo, fontSize: 9, alignment: "center" },
      { text: item.fone_aluno_novo, fontSize: 9, alignment: "center" },
      { text: item.fone_resp_novo, fontSize: 9, alignment: "center" },
      { text: item.matricula, fontSize: 9, alignment: "center" },
    ];
  });

  const dataInfo = [
    {
      table: {
        headerRows: 1,
        widths: ["*", 200, "*",60, "*", "*","*","*","*"],

        body: [
          [
            { text: "Código", style: "tableHeader", alignment: "center" },
            { text: "Nome", style: "tableHeader", alignment: "center" },
            { text: "Unidade", style: "tableHeader", alignment: "center" },
            { text: "Turma", style: "tableHeader", alignment: "center" },
            { text: "Telefone Aluno", style: "tableHeader", alignment: "center" },
            { text: "Telefone Responsável", style: "tableHeader", alignment: "center" },
            { text: "Telefone Aluno Novo", style: "tableHeader", alignment: "center" },
            { text: "Telefone Responsável Novo", style: "tableHeader", alignment: "center" },
            { text: "Matrícula", style: "tableHeader", alignment: "center" },
          ],
          ...data,
        ],
      },
      layout: {
        fillColor: function (rowIndex: any, node: any, columnIndex: any) {
          return rowIndex % 2 === 0 ? "#CCCCCC" : null;
        },
      },
    },
  ];

  const footerInfo = [
    {
      text: "Unisoft Informática",
      fontSize: 12,
      bold: true,
      alignment: "center",
      margin: [10, 10, 10, 10],
    },
  ];

  const docDefinition: any = {
    pageSize: "A4",
    pageOrientation: 'landscape',
    pageMargins: [20, 40, 40, 20],

    header: [pdfTitle],
    content: [dataInfo],
    footer: [footerInfo],
  };
  pdfMake.createPdf(docDefinition).download(`Relatório ${teste}`);
}
