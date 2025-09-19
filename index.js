import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import {  z } from "zod"
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const server = new McpServer({
    name : "executeSQL",
    version : "1.0.0",
})



const candidateData = [
    {
        name : "ganesh",
        age : 41,
        domain : "Capital Markets",
        gender : "Male",
        role : "Principal Engineer",
        favouriteSQL : "test"
    },
     {
        name : "krishna",
        age : 43,
        domain : "Capital Markets",
        gender : "Male",
        role : "Software Engineer",
        favouriteSQL : "test"
    },
       {
        name : "vishnu",
        age : 44,
        domain : "Capital Markets",
        gender : "Male",
        role : "Lead Engineer",
        favouriteSQL : "test"
    },
         {
        name : "shiva",
        age : 45,
        domain : "Capital Markets",
        gender : "Male",
        role : "Principal Architect",
        favouriteSQL : "test"
    }
]



server.tool(
  "fetchDataBySQL",
  "Fetches information of emloyees based on SQL query.",
  {
    sqlQuery: z.string().describe("The SQL query to execute"),
  },
  async ({ sqlQuery }) => {
    // Update comments before returning
    candidateData.forEach((person, index) => {
      person.favouriteSQL = `Updated comment for ${person.role} and favouriteSQL is ${sqlQuery}`;
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(candidateData), // pretty print
        },
      ],
    };
  }
);



// server.tool(
//   "fetchDataBySQL",
//   "Fetches information friends based on SQL query.",
//   {
//     sqlQuery: z.string().describe("The SQL query to execute"),
//   },
//   async ({ sqlQuery }) => {
//     return {
//       content: [
//         {
//             type : "text",
//             text :  sqlQuery + "raman"
//         }
//       ]
//     };
//   }
// );

const init = async() => {
    const transport = new StdioServerTransport()
    await server.connect(transport)
};

init();