// type GenerateHTMLOptions = {
//   title: string
//   columns: string[]
//   headers: string[]
// }

// const formatValue = (key: string, value: any): string => {
//   if (key === "harga_dibayar") {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//     }).format(Number(value))
//   }
//   if (value instanceof Date) {
//     return value.toLocaleDateString("id-ID")
//   }
//   return value ?? "-"
// }

// export const generateDynamicHTML = (
//   data: any[],
//   options: GenerateHTMLOptions
// ): string => {
//   const { title, columns, headers } = options

//   return `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           h1 { text-align: center; }
//           table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//           th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
//           th { background-color: #f4f4f4; }
//         </style>
//       </head>
//       <body>
//         <h1>${title}</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>No</th>
//               ${headers.map((header) => `<th>${header}</th>`).join("")}
//             </tr>
//           </thead>
//           <tbody>
//             ${data
//               .map(
//                 (item, index) => `
//                 <tr>
//                   <td>${index + 1}</td>
//                   ${columns
//                     .map((key) => `<td>${formatValue(key, item[key])}</td>`)
//                     .join("")}
//                 </tr>
//               `
//               )
//               .join("")}
//           </tbody>
//         </table>
//       </body>
//     </html>
//   `
// }
interface ColumnOptions {
  title: string
  columns: string[]
  headers: string[]
}

export function generateDynamicHTML(data: any[], options: ColumnOptions) {
  const { title, columns, headers } = options

  const rows = data.map((item) => {
    const cells = columns.map((col) => {
      const value = item[col]
      if (Array.isArray(value)) {
        return value.join(", ")
      }
      return value ?? "-"
    })
    return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #eee; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <table>
        <thead>
          <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.join("")}
        </tbody>
      </table>
    </body>
    </html>
  `
}

