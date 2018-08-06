const path = require("path");

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;

//   return new Promise((resolve, reject) => {
//       graphql(
//         `
//           {
//             allPages {
//               edges {
//                 node {
//                   id
//                   title
//                   slug
//                   template
//                   page_type
//                   navigation {
//                     order
//                     displayTitle
//                   }
//                   content
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           console.log("ERROR CREATING PAGES", result.errors);
//           reject(result.errors);
//         }

//         result.data.allPages.edges.forEach(edge => {
//           const template = path.resolve(
//             `src/templates/${edge.node.template}`
//           );
//           createPage({
//             path: edge.node.slug, // required
//             component: template,
//             layout: "index",
//             context: {
//               slug: edge.node.slug
//             }
//           });
//         });

//         resolve();
//       })
//   });
// };


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-rte/,
            use: loaders.null(),
          },
          {
            test: /mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}